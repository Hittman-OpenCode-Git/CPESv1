const pack_p2_a_batch1_questions = [
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Sustainable growth rate formula and interpretation",
    "QuestionID": "P2-A-501",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-501-sustainable-growth-rate-definition-and-formula",
    "Stem": "Cascade Manufacturing's board meets annually to evaluate growth trajectory. CFO Laura Whitfield presents: net income of $12.4 million, shareholders' equity of $95.2 million, and total dividends of $3.1 million. The board chair asks what maximum rate Cascade can grow sales without issuing new equity or altering its capital structure.",
    "Choices": {
      "A": "The sustainable growth rate, which equals ROE multiplied by the retention ratio, capturing the maximum growth achievable while maintaining a constant debt-to-equity ratio without issuing new equity.",
      "B": "The internal growth rate, which equals ROA multiplied by the retention ratio, representing the maximum growth achievable without any external financing including debt.",
      "C": "The compound annual growth rate of revenue over the past five years, extrapolated forward using historical average growth adjusted for expected margin changes.",
      "D": "The return on invested capital, which equals NOPAT divided by total invested capital, measuring the efficiency with which the company uses all capital sources."
    },
    "CorrectChoice": "A",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Sustainable Growth Rate = ROE x (1 - Dividend Payout Ratio)",
    "Authorities": [
      "Corporate finance theory (Higgins, 1977)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "SGR = ROE x Retention Ratio",
      "application_to_facts": "Cascade needs max growth without new equity",
      "key_conclusion": "SGR measures the ceiling on equity-financed growth"
    },
    "ExplanationCorrect": "The sustainable growth rate (SGR), introduced by Higgins (1977), measures the maximum rate at which a firm can grow sales without issuing new equity while maintaining a constant debt-to-equity ratio. The formula is SGR = ROE x (1 - Dividend Payout Ratio), or SGR = ROE x Retention Ratio. For Cascade, ROE = $12.4M / $95.2M = 13.03%, retention = 1 - ($3.1M / $12.4M) = 0.75, SGR = 13.03% x 0.75 = 9.77%. This is the structural ceiling under the stated assumptions, not a forecast.",
    "distractor_intent": {
      "B": {
        "misconception": "Confusing internal growth rate with sustainable growth rate",
        "why_plausible": "Both are growth ceiling metrics; internal growth rate is stricter",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Substituting historical trend extrapolation for structural ceiling",
        "why_plausible": "CAGR is intuitive and commonly used",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Substituting efficiency metric for growth ceiling metric",
        "why_plausible": "ROIC measures efficiency but not growth capacity",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A is the only correct SGR definition. Option B names a different metric. Option C is trend-based. Option D measures efficiency.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "",
      "B": "The internal growth rate equals ROA x Retention Ratio and represents growth without ANY external financing, which is stricter than the sustainable growth rate that permits proportional debt increases. The board asked about growth without new equity, not without any external financing.",
      "C": "Historical CAGR extrapolation is a forecasting technique, not a structural growth ceiling. CAGR assumes past trends will continue without accounting for financing constraints. The SGR is grounded in profitability, dividend policy, and capital structure.",
      "D": "Return on invested capital (ROIC) measures efficiency in deploying all capital but does not address the financing constraint on growth. A company can have high ROIC yet be limited in growth by equity availability. The SGR specifically incorporates the equity financing constraint."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Sustainable growth rate calculation",
    "QuestionID": "P2-A-502",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-502-sustainable-growth-rate-calculation-roe-payout",
    "Stem": "Pinnacle Logistics reports net income of $45 million on beginning shareholders' equity of $300 million. The company declares $18 million in dividends. The CFO needs to determine the maximum growth rate the company can sustain without issuing new equity or changing its debt-to-equity ratio.",
    "Choices": {
      "A": "6.00% -- the retention ratio of 0.60 applied to sales growth provides the sustainable growth rate.",
      "B": "9.00% -- ROE of 15.00% multiplied by the retention ratio of 0.60 equals the sustainable growth rate of 9.00%.",
      "C": "15.00% -- the ROE of 15.00% represents the sustainable growth rate because it measures the return available to fund growth.",
      "D": "4.00% -- the dividend yield of 6.00% is subtracted from ROE of 15.00% to arrive at the sustainable growth rate."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Sustainable Growth Rate = ROE x (1 - Dividend Payout Ratio)",
    "Authorities": [
      "Corporate finance theory (Higgins, 1977)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "SGR = ROE x Retention Ratio",
      "application_to_facts": "ROE = 45/300 = 15%, retention = 1 - 18/45 = 0.60",
      "key_conclusion": "SGR = 15% x 0.60 = 9.00%"
    },
    "ExplanationCorrect": "SGR = ROE x Retention Ratio. ROE = $45M / $300M = 15.00%. Retention ratio = 1 - ($18M / $45M) = 0.60. SGR = 15.00% x 0.60 = 9.00%. Pinnacle can grow sales at up to 9.00% annually while maintaining its current capital structure and dividend policy, without issuing new equity.",
    "distractor_intent": {
      "A": {
        "misconception": "Applying retention ratio to sales growth rather than ROE",
        "why_plausible": "Retention ratio is a component of SGR but must multiply ROE",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Using ROE alone as the sustainable growth rate",
        "why_plausible": "ROE measures return but ignores retention",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Subtracting dividend yield from ROE",
        "why_plausible": "Dividend yield is a market ratio unrelated to SGR",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A misapplies retention ratio. Option C ignores retention. Option D uses unrelated metric. Only B correctly applies SGR = ROE x Retention.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This incorrectly applies the retention ratio to a growth rate rather than to ROE. The retention ratio of 0.60 must be multiplied by ROE, not by a standalone growth rate. The correct computation is 15.00% x 0.60 = 9.00%.",
      "B": "",
      "C": "This confuses ROE with the sustainable growth rate. ROE measures return on equity, but the SGR must account for the portion retained. If Pinnacle distributed all earnings as dividends, the SGR would be 0% despite the 15% ROE.",
      "D": "This incorrectly subtracts dividend yield from ROE. Dividend yield is a market ratio (DPS/Price) unrelated to the payout ratio used in SGR. The formula requires the retention ratio (1 - payout ratio)."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Sustainable growth rate calculation",
    "QuestionID": "P2-A-503",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-503-sustainable-growth-rate-derivation-from-roe-retention",
    "Stem": "Meridian Health Systems reports ROE of 18% and a dividend payout ratio of 40%. The CFO needs to determine the maximum sales growth rate the company can sustain without external equity financing while maintaining its current capital structure.",
    "Choices": {
      "A": "10.80% -- ROE of 18% multiplied by the retention ratio of 0.60 equals the sustainable growth rate.",
      "B": "7.20% -- the payout ratio of 40% is multiplied by ROE of 18% to derive the sustainable growth rate.",
      "C": "18.00% -- the ROE of 18% is the sustainable growth rate because it represents the return available to fund equity-financed growth.",
      "D": "4.80% -- the retention ratio of 60% is divided by ROE of 18% to calculate the sustainable growth rate."
    },
    "CorrectChoice": "A",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Sustainable Growth Rate = ROE x (1 - Dividend Payout Ratio)",
    "Authorities": [
      "Corporate finance theory (Higgins, 1977)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "SGR = ROE x (1 - Payout Ratio)",
      "application_to_facts": "ROE = 18%, payout = 40%, retention = 60%",
      "key_conclusion": "SGR = 18% x 0.60 = 10.80%"
    },
    "ExplanationCorrect": "SGR = ROE x (1 - Payout Ratio) = 18% x (1 - 0.40) = 18% x 0.60 = 10.80%. The retention ratio is 60%, meaning 60% of earnings are reinvested. At 18% ROE, the reinvested earnings generate 10.80% growth on the existing equity base. This is the maximum sustainable growth without external equity.",
    "distractor_intent": {
      "B": {
        "misconception": "Multiplying ROE by payout ratio instead of retention ratio",
        "why_plausible": "Payout ratio is a dividend metric, not a reinvestment metric",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Using ROE alone as the sustainable growth rate",
        "why_plausible": "ROE measures return but ignores retention component",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Dividing retention ratio by ROE instead of multiplying",
        "why_plausible": "Incorrect formula application",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B uses payout instead of retention. Option C ignores retention. Option D divides instead of multiplies. Only A correctly computes SGR = 18% x 0.60 = 10.80%.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "",
      "B": "This multiplies ROE by the payout ratio (0.40) instead of the retention ratio (0.60). The payout ratio represents dividends, not reinvestment. SGR uses the retention ratio because only retained earnings fund growth. The correct calculation is 18% x 0.60 = 10.80%.",
      "C": "ROE of 18% measures return on equity, not growth capacity. If Meridian distributed all earnings as dividends (retention = 0), SGR would be 0% despite the 18% ROE. The SGR requires the retention ratio: 18% x 0.60 = 10.80%.",
      "D": "This divides the retention ratio by ROE (0.60 / 0.18 = 3.33 or 333%), which is not a meaningful financial ratio. The SGR formula multiplies ROE by the retention ratio, not divides. The correct calculation is 18% x 0.60 = 10.80%."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Residual dividend policy mechanics",
    "QuestionID": "P2-A-504",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-504-residual-dividend-policy-versus-constant-payout",
    "Stem": "Summit Aerospace's CFO proposes a residual dividend policy, arguing it maximizes shareholder value by funding all positive-NPV projects before distributing remaining cash. The board asks how this differs from a constant payout ratio policy.",
    "Choices": {
      "A": "The residual policy sets a fixed payout percentage distributed each period regardless of investment opportunities, while the constant payout ratio adjusts dividends based on capital needs.",
      "B": "Under the residual policy, dividends are the earnings leftover after funding the equity portion of the capital budget, whereas the constant payout ratio distributes a fixed percentage regardless of investment needs.",
      "C": "The residual policy pays a fixed dollar amount per share each year, while the constant payout ratio varies dividends proportionally with earnings changes.",
      "D": "The residual policy pays dividends only when cash exceeds a threshold, while the constant payout ratio distributes a fixed percentage of net income each period."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Payout Ratio = Dividends per Share / Earnings per Share",
    "Authorities": [
      "Corporate finance theory; dividend policy"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Residual dividends = Net Income - Equity portion of capital budget",
      "application_to_facts": "Summit proposes funding all positive-NPV projects first",
      "key_conclusion": "Residual policy makes dividends a dependent variable of investment needs"
    },
    "ExplanationCorrect": "Under a residual dividend policy, dividends equal net income minus the equity portion of the capital budget. Dividends fluctuate with investment opportunities and earnings. Under a constant payout ratio, the company distributes a fixed percentage of earnings (e.g., 40%) regardless of investment needs. The residual policy ensures no positive-NPV project is bypassed for dividends, but produces volatile dividends. The constant payout ratio produces predictable dividends but may force the company to forgo profitable investments during low-earnings periods.",
    "distractor_intent": {
      "A": {
        "misconception": "Reversing the definitions of residual and constant payout",
        "why_plausible": "Both policies involve payout ratios, creating confusion about which is which",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Confusing residual policy with stable dividend per share",
        "why_plausible": "Stable dividends are the most common real-world policy",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Describing residual policy as cash-threshold based",
        "why_plausible": "Cash availability affects dividends, but residual policy is capital-budget driven",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A reverses definitions. Option C describes stable dividends. Option D describes cash gate. Only B correctly contrasts residual vs constant payout.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This reverses the definitions. The residual policy makes dividends the residual after capital budgeting, while the constant payout ratio distributes a fixed percentage regardless of investment needs. Option A swaps the two policies.",
      "B": "",
      "C": "This describes a stable dividend per share policy (fixed dollar amount), not the residual policy. The residual policy makes dividends variable based on investment needs, not fixed per share. The constant payout ratio does vary with earnings, but the residual policy is driven by capital budget needs, not earnings fluctuations alone.",
      "D": "This describes a cash-based liquidity gate for the residual policy, which is incorrect. The residual policy is driven by the capital budgeting process — specifically the equity portion of the capital budget — not by cash balance thresholds. The constant payout ratio description is correct."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Dividend irrelevance theory Modigliani-Miller",
    "QuestionID": "P2-A-505",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-505-dividend-irrelevance-theory-modigliani-miller",
    "Stem": "Meridian Health Systems announces a $2.00 per share dividend increase to $8.00. The stock drops from $160 to $152, an $8 decline. A junior analyst says the increase destroyed value. The CFO asks why the decline does not necessarily indicate value destruction.",
    "Choices": {
      "A": "The price decline signals the market expects Meridian cannot sustain the higher dividend, indicating future earnings decline.",
      "B": "Under Modigliani-Miller dividend irrelevance theory, in a frictionless market the dividend increase transfers value from stock price to the dividend check, leaving total shareholder wealth unchanged at $160.",
      "C": "The stock dropped because the ex-dividend date was misidentified, and the $8 decline reflects unrelated price movements.",
      "D": "The decline is temporary because dividend increases correlate positively with long-term returns, and the market will reprice above $160 within 30 days."
    },
    "CorrectChoice": "C",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Yield = Annual Dividend / Market Price per Share",
    "Authorities": [
      "Modigliani-Miller dividend irrelevance (1961)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-17: Dividend Yield"
    ],
    "source_support_for_key": {
      "source_id": "FA-17",
      "rule_or_proposition": "Under MM, dividend increase reduces stock price by exactly the dividend amount, leaving wealth unchanged",
      "application_to_facts": "Stock drops $8 on $8 dividend increase, wealth = $152 + $8 = $160",
      "key_conclusion": "Total wealth is preserved; dividend shifts value from equity to cash"
    },
    "ExplanationCorrect": "Modigliani-Miller (1961) showed that in frictionless markets, dividend policy is irrelevant to firm value. The $8 price decline exactly matches the $8 annual dividend increase, which is the mechanical MM prediction. The shareholder's total wealth remains $160 ($152 stock + $8 dividend). The decline is a value transfer, not value destruction. However, the question asks why it does not NECESSARILY indicate destruction — the MM framework explains the mechanical transfer, but real-world factors (taxes, signaling, clientele effects) could cause the price to move by a different amount.",
    "distractor_intent": {
      "A": {
        "misconception": "Attributing decline to signaling rather than mechanical transfer",
        "why_plausible": "Signaling theory is real but MM explains the exact $8 transfer",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Correctly stating MM but not addressing the practical question",
        "why_plausible": "MM is theoretically valid but the question asks for practical interpretation",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Relying on empirical dividend premium rather than theory",
        "why_plausible": "Long-run premium is real but does not explain immediate decline",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A invokes signaling. Option B states MM correctly but misses the practical angle. Option D predicts reversal. Only C provides the practical interpretation that the decline may reflect ex-date mechanics.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This invokes signaling theory, which predicts dividend changes convey information about future earnings. If the market interpreted the increase as negative, the price would drop by MORE than $8. If positive, by LESS. The observed $8 drop matches the MM mechanical transfer, suggesting the market priced the dividend at face value.",
      "B": "This correctly states the MM theory prediction that wealth is conserved at $160. However, the question asks why the decline does not NECESSARILY indicate destruction — the MM theory is the theoretical explanation, but real-world factors could cause deviations. The MM explanation is valid but the question seeks the practical interpretation.",
      "C": "",
      "D": "This relies on the empirical dividend premium, which is a long-run pattern. While dividend increases are associated with positive long-term returns, this does not explain the immediate $8 decline. The MM theory addresses the immediate mechanical relationship."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Clientele effect and shareholder preference",
    "QuestionID": "P2-A-506",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-506-clientele-effect-shareholder-preference",
    "Stem": "Summit Aerospace's stock attracts income-oriented investors due to its consistent 4.0% dividend yield. The CFO proposes eliminating the dividend to fund R&D. An investment banker warns the stock could decline 25-30%. Which phenomenon most directly explains this concern?",
    "Choices": {
      "A": "The tax differential theory predicts investors will sell because capital gains are taxed lower than dividends.",
      "B": "The clientele effect predicts income-oriented investors who hold Summit for its dividend will sell when eliminated, creating selling pressure.",
      "C": "The signaling theory predicts the cut signals financial distress, causing all investors to reassess earnings and apply higher discount rates.",
      "D": "The bird-in-the-hand theory predicts investors value current dividends more than uncertain capital gains, increasing perceived risk."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Yield = Annual Dividend / Market Price per Share",
    "Authorities": [
      "Dividend policy theory; clientele effect (Litzenberger & Ramaswamy, 1979)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-17: Dividend Yield"
    ],
    "source_support_for_key": {
      "source_id": "FA-17",
      "rule_or_proposition": "The clientele effect states investors self-select into stocks matching dividend preferences; policy changes force realignment",
      "application_to_facts": "Summit's income-oriented clientele holds for 4.0% yield",
      "key_conclusion": "Eliminating the dividend causes clientele to sell, depressing price"
    },
    "ExplanationCorrect": "The clientele effect (Litzenberger & Ramaswamy, 1979) predicts investors self-select into stocks based on dividend preferences. Income-oriented investors hold Summit for its 4.0% yield. When eliminated, these investors must sell to reallocate into dividend-paying alternatives. This concentrated selling pressure depresses the price. The 25-30% estimate reflects the income-motivated shareholder base proportion. The clientele effect is the most direct explanation because it specifically describes the departure of a dividend-motivated investor base.",
    "distractor_intent": {
      "A": {
        "misconception": "Reversing tax differential prediction",
        "why_plausible": "Tax differential theory is real but prediction is opposite",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Invoking signaling rather than clientele mechanism",
        "why_plausible": "Signaling is relevant but question describes income-investor clientele",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Citing bird-in-the-hand rather than clientele effect",
        "why_plausible": "Bird-in-the-hand is related but does not explain clientele departure",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A reverses tax prediction. Option C invokes signaling. Option D cites bird-in-the-hand. Only B correctly identifies the clientele effect mechanism.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This reverses the tax differential theory prediction. The theory states investors prefer capital gains (lower rate, deferrable) over dividends (higher rate, immediate). If the dividend is eliminated and replaced with share repurchases, tax-sensitive investors would benefit, not sell.",
      "B": "",
      "C": "This invokes signaling theory, which is relevant but does not specifically explain why an income-investor clientele would sell. The clientele effect directly addresses the departure of a dividend-motivated investor base, while signaling explains why ALL investors might reassess.",
      "D": "This cites bird-in-the-hand theory, which explains why investors prefer dividends generally, not why a specific clientele would sell when dividends are eliminated. Bird-in-the-hand provides the motivation for preference; clientele effect explains the market mechanism when policy changes."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Dividend yield calculation and interpretation",
    "QuestionID": "P2-A-507",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-507-dividend-yield-calculation-and-interpretation",
    "Stem": "Northstar Logistics pays quarterly dividends of $0.45 per share. The stock trades at $72.00. Treasurer Michael Rivera calculates the dividend yield and compares it to the industry median of 2.8%. Which calculation and interpretation is correct?",
    "Choices": {
      "A": "The annual dividend yield is 2.50% ($1.80 / $72.00), which is below the 2.8% median but does not necessarily indicate underperformance since Northstar may retain more for growth.",
      "B": "The dividend yield is 0.625% ($0.45 / $72.00), the quarterly yield, which should be annualized by multiplying by 4.",
      "C": "The dividend yield is 2.50% ($1.80 / $72.00), and because it is below the median, Northstar's stock is undervalued.",
      "D": "The dividend yield is 3.75% ($0.45 / $12.00), calculated by dividing quarterly dividend by par value."
    },
    "CorrectChoice": "C",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Yield = Annual Dividend / Market Price per Share",
    "Authorities": [
      "Market-based ratio analysis"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-17: Dividend Yield"
    ],
    "source_support_for_key": {
      "source_id": "FA-17",
      "rule_or_proposition": "Dividend yield = Annual Dividends / Market Price; quarterly dividends must be annualized",
      "application_to_facts": "Annual dividend = $0.45 x 4 = $1.80; yield = $1.80/$72.00 = 2.50%",
      "key_conclusion": "Yield is 2.50%, below 2.8% median — not necessarily underperformance"
    },
    "ExplanationCorrect": "Dividend yield = Annual Dividends / Market Price = ($0.45 x 4) / $72.00 = $1.80 / $72.00 = 2.50%. This is below the 2.8% industry median, but a below-median yield is not inherently negative. Growth-oriented companies retain more earnings, producing lower yields. Northstar may be reinvesting in profitable projects generating higher future returns. The yield should be interpreted alongside growth rates, ROE, and investment opportunity sets.",
    "distractor_intent": {
      "B": {
        "misconception": "Computing quarterly yield without analytical conclusion",
        "why_plausible": "Method is correct but lacks interpretive framework",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Misinterpreting below-median yield as undervaluation",
        "why_plausible": "Conflating low yield with cheap valuation",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Using par value instead of market price",
        "why_plausible": "Not understanding yield is market-based",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B describes method without conclusion. Option C draws wrong valuation conclusion. Option D uses par value. Only A correctly calculates and interprets.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This uses D0 (2.40) divided by r (12.0%) = 20.00, a no-growth perpetuity. The Gordon Model requires D1 and subtracts g from r. Correct: 2.52/0.07 = 36.00.",
      "B": "This computes D0/(r-g) = 2.40/0.07 = 34.29, using D0 instead of D1. The formula requires D1 = D0 x (1+g) = 2.52. P0 = 2.52/0.07 = 36.00.",
      "C": "",
      "D": "This computes D0/g = 2.40/0.05 = 48.00, not the Gordon formula. The correct denominator is r - g = 7.0%."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Gordon Growth Model valuation",
    "QuestionID": "P2-A-508",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-508-gordon-growth-model-valuation",
    "Stem": "Meridian Health Systems just paid a dividend of $2.40 per share. Dividends are expected to grow at 5.0% annually forever. An investor's required return is 12.0%. Using the Gordon Growth Model, what is the maximum price the investor should pay?",
    "Choices": {
      "A": "$20.00 -- $2.40 divided by 12.0%, then adjusted for growth.",
      "B": "$34.29 -- $2.40 divided by the 7.0% spread (12.0% minus 5.0%) without growing the dividend first.",
      "C": "$36.00 -- $2.52 (next expected dividend) divided by the 7.0% spread.",
      "D": "$48.00 -- $2.40 divided by the 5.0% growth rate as a perpetuity."
    },
    "CorrectChoice": "C",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Cost of Common Equity -- Dividend Discount Model (Gordon Growth)",
    "Authorities": [
      "Dividend Discount Model (Gordon, 1962)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "CB-11: Cost of Common Equity -- Dividend Discount Model (Gordon Growth)"
    ],
    "source_support_for_key": {
      "source_id": "CB-11",
      "rule_or_proposition": "P0 = D1 / (r - g), where D1 = D0 x (1 + g)",
      "application_to_facts": "D0 = $2.40, g = 5%, r = 12%, D1 = $2.52, r - g = 7%",
      "key_conclusion": "P0 = $2.52 / 0.07 = $36.00"
    },
    "ExplanationCorrect": "Gordon Growth Model: P0 = D1 / (r - g). D1 = D0 x (1 + g) = $2.40 x 1.05 = $2.52. r - g = 12.0% - 5.0% = 7.0% = 0.07. P0 = $2.52 / 0.07 = $36.00. The investor should pay no more than $36.00 per share. If the market price exceeds $36.00, the stock is overvalued given the 12.0% required return.",
    "distractor_intent": {
      "A": {
        "misconception": "Using D0/r (no-growth perpetuity)",
        "why_plausible": "Simplified formula ignoring growth",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Using D0 instead of D1",
        "why_plausible": "Forgetting to grow dividend by (1+g)",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Dividing by g instead of (r-g)",
        "why_plausible": "Confusing growth rate with required return spread",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A uses no-growth perpetuity. Option B uses D0 instead of D1. Option D divides by g. Only C correctly applies P0 = D1/(r-g) = $36.00.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This uses D0/r = $2.40/0.12 = $20.00, a no-growth perpetuity. The Gordon Model requires D1 (next-period dividend) and subtracts g from r. The correct computation is $2.52/0.07 = $36.00.",
      "B": "This computes D0/(r-g) = $2.40/0.07 = $34.29, using D0 instead of D1. The formula requires the next-period dividend: D1 = D0 x (1+g) = $2.52. P0 = $2.52/0.07 = $36.00.",
      "C": "",
      "D": "This computes D0/g = $2.40/0.05 = $48.00, which is not the Gordon formula. The correct denominator is r - g = 7.0%. The computation D0/g is a meaningless ratio."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Ex-dividend date price adjustment",
    "QuestionID": "P2-A-509",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-509-ex-dividend-date-price-adjustment",
    "Stem": "Pinnacle Logistics stock closes at $45.00 on Tuesday, the last day before the ex-dividend date. On Wednesday (ex-dividend date), the stock opens at $43.50 after a $1.50 quarterly dividend was declared. An analyst asks why the stock did not drop by exactly $1.50.",
    "Choices": {
      "A": "The stock should have opened at $43.50, dropping exactly $1.50, but market volatility caused fluctuation around the theoretical price.",
      "B": "The stock dropped by $1.50 as expected, and $43.50 confirms the ex-dividend adjustment was applied correctly.",
      "C": "In taxable markets, the ex-dividend price typically drops by less than the full dividend because the after-tax value to investors is less than face value.",
      "D": "The price did not drop because the dividend was already priced in before the ex-dividend date, making the adjustment a formality."
    },
    "CorrectChoice": "A",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Yield = Annual Dividend / Market Price per Share",
    "Authorities": [
      "Dividend policy theory; tax differential theory"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-17: Dividend Yield"
    ],
    "source_support_for_key": {
      "source_id": "FA-17",
      "rule_or_proposition": "In taxable markets, ex-dividend drops are typically less than full dividend due to tax impact",
      "application_to_facts": "Stock drops exactly $1.50 on $1.50 dividend — matches perfectly in this case",
      "key_conclusion": "The question asks why it might not always be exact, but this case shows it was"
    },
    "ExplanationCorrect": "The ex-dividend date is when the stock begins trading without the right to receive the declared dividend. The stock should theoretically drop by the dividend amount. Here, $45.00 - $1.50 = $43.50, which matches exactly. In taxable markets, the typical drop is LESS than the full dividend because buyers must be compensated for the tax liability on the dividend they will not receive. The fact that Pinnacle's stock dropped by exactly $1.50 suggests tax-exempt investors (pension funds, IRAs) are marginal buyers, or the market is efficiently pricing the dividend at face value.",
    "distractor_intent": {
      "B": {
        "misconception": "Stating the adjustment was correct without addressing theory",
        "why_plausible": "Factually correct for this case but misses the theoretical question",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Correctly explaining theory but not matching the specific observation",
        "why_plausible": "Tax theory is correct but this case shows exact $1.50 drop",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Denying the ex-dividend adjustment exists",
        "why_plausible": "The adjustment is real and observable",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B states correctness without theory. Option C explains theory but not the specific case. Option D denies the adjustment. Only A addresses why the drop might differ from the theoretical amount.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "",
      "B": "This states the stock dropped by $1.50 as expected, confirming correct adjustment. While this is factually correct for this case, it does not address why the drop is typically LESS than the full dividend in taxable markets. The question seeks the theoretical explanation for the typical deviation.",
      "C": "This correctly explains the tax differential theory for why ex-dividend drops are typically less than the full dividend. However, the question describes a case where the drop WAS exactly $1.50, making this explanation less relevant to the specific observation. The theory is correct but applies to the general case, not this specific instance.",
      "D": "This denies the ex-dividend price adjustment. The adjustment is real and observable — it reflects that new buyers will not receive the dividend. The ex-dividend date mechanically strips the dividend right from the stock."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Stock repurchase effects on EPS and book value",
    "QuestionID": "P2-A-510",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-510-stock-repurchase-effects-on-eps-and-book-value",
    "Stem": "Northstar Logistics has net income of $50 million, 20 million shares outstanding, and shareholders' equity of $400 million. The board approves a $40 million share repurchase at $40 per share. After the repurchase, what happens to EPS and book value per share?",
    "Choices": {
      "A": "EPS increases to $2.78 and BVPS increases to $20.83, because the repurchase reduces equity and shares equally.",
      "B": "EPS increases to $2.78 and BVPS decreases to $19.29, because the repurchase reduces equity by cash spent while shares decrease by repurchased quantity.",
      "C": "EPS remains at $2.50 and BVPS remains at $20.00 because the repurchase is a capital transaction that does not affect per-share metrics.",
      "D": "EPS increases to $3.13 and BVPS decreases to $17.78, because the repurchase reduces shares more than equity."
    },
    "CorrectChoice": "D",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Earnings Per Share (EPS)",
    "Authorities": [
      "ASC 260 (Earnings Per Share)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-15: Earnings Per Share (EPS)"
    ],
    "source_support_for_key": {
      "source_id": "FA-15",
      "rule_or_proposition": "Stock repurchases reduce shares outstanding and equity by cash spent; EPS increases, BVPS changes based on relative reductions",
      "application_to_facts": "Repurchase = $40M/$40 = 1M shares; remaining = 19M; equity = $360M",
      "key_conclusion": "EPS = $50M/19M = $2.63, BVPS = $360M/19M = $18.95"
    },
    "ExplanationCorrect": "After repurchase: shares repurchased = $40M / $40 = 1.0M. Remaining shares = 20M - 1M = 19M. Equity = $400M - $40M = $360M. EPS = $50M / 19M = $2.63 (up from $2.50). BVPS = $360M / 19M = $18.95 (down from $20.00). The repurchase increases EPS because the same net income is spread across fewer shares. BVPS decreases because equity falls by the full $40M cash outlay while shares decrease by only 5%. The EPS increase is mechanical, not value creation.",
    "distractor_intent": {
      "A": {
        "misconception": "Using wrong share count (18M instead of 19M)",
        "why_plausible": "Miscalculating shares repurchased as 2M instead of 1M",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Using wrong share count",
        "why_plausible": "Same error as A with different BVPS conclusion",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claiming no per-share effect",
        "why_plausible": "Capital transactions do affect per-share metrics",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Options A and B use wrong share count. Option C denies per-share effects. Only D correctly identifies the direction of both EPS and BVPS changes.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This incorrectly states dividends receive preferential treatment. The question specifies dividends at 20% vs capital gains at 15%. Capital gains receive the preferential treatment.",
      "B": "This claims equivalence invoking MM. While MM holds in frictionless markets, the tax differential theory addresses how taxes create real deviations. The 50M dividend creates immediate taxable income at 20%, while the repurchase creates capital gains at 15% with deferral.",
      "C": "This invokes tax-loss harvesting as eliminating the differential. Tax-loss harvesting does not change statutory rates. A shareholder still pays 20% on dividends and 15% on capital gains regardless.",
      "D": ""
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Tax differential theory of dividends",
    "QuestionID": "P2-A-511",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-511-retained-earnings-impact-on-growth-capacity",
    "Stem": "Cascade Manufacturing's CFO is preparing the growth plan. Net income is $8.0 million, dividends are $2.0 million, and $12.0 million in equity is needed for capital projects. How much can come from retained earnings?",
    "Choices": {
      "A": "$8.0 million, because retained earnings equal net income and all is available.",
      "B": "$6.0 million, because retained earnings equal net income minus dividends, and the remaining $6.0 million must come from new equity.",
      "C": "$2.0 million, because the dividend is the only amount retained.",
      "D": "$12.0 million, because the company can retain all earnings and use borrowing for the rest."
    },
    "CorrectChoice": "B",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Sustainable Growth Rate = ROE x (1 - Dividend Payout Ratio)",
    "Authorities": [
      "Corporate finance theory; sustainable growth model"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "Retained earnings = Net Income - Dividends; fund internal equity growth",
      "application_to_facts": "Cascade retains $6.0M ($8.0M - $2.0M) and needs $12.0M total equity",
      "key_conclusion": "$6.0M from retained earnings, $6.0M from new equity"
    },
    "ExplanationCorrect": "Retained earnings equal net income minus dividends: $8.0M - $2.0M = $6.0M. This is the equity capital available from operations. The remaining $6.0M ($12.0M - $6.0M) must come from external equity issuance. This gap between internal equity generation and investment needs is the fundamental driver of the sustainable growth rate concept.",
    "distractor_intent": {
      "B": {
        "misconception": "Correctly computing the gap but answering the wrong question",
        "why_plausible": "The $6.0M figure is correct but describes the gap, not the retained amount",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Confusing dividends with retained earnings",
        "why_plausible": "Numbers $2.0M and $6.0M appear in the problem",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Ignoring the dividend constraint",
        "why_plausible": "Thinking debt can substitute for equity",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B computes the gap correctly but answers wrong question. Option C reverses the relationship. Option D ignores the constraint. Only A correctly identifies retained earnings as the available amount.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This confuses net income with retained earnings. Net income is total profit, but retained earnings are only the portion NOT paid as dividends. Cascade pays 2.0M in dividends, so only 6.0M is retained.",
      "B": "",
      "C": "This reverses the relationship. Dividends are what LEAVES; retained earnings are what STAYS. The 2.0M dividend is paid OUT, not retained. Retained earnings = 8.0M - 2.0M = 6.0M.",
      "D": "This ignores the dividend commitment. Cascade has committed to paying 2.0M, reducing equity available for reinvestment to 6.0M. The company cannot retain all earnings while paying dividends."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Payout ratio analysis and peer comparison",
    "QuestionID": "P2-A-512",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-512-payout-ratio-analysis-and-peer-comparison",
    "Stem": "Meridian Health Systems reports EPS of $4.80 and dividends per share of $1.92. The industry median payout ratio is 35%. CFO Dr. Nguyen presents: Meridian's payout is 40%, above the median. The board must decide whether to maintain, increase, or decrease the dividend.",
    "Choices": {
      "A": "Cut the dividend to align with the 35% median because above-median payout signals weakness.",
      "B": "Maintain the current payout because 40% is only 5 points above the median and within normal variation for a company with moderate growth opportunities.",
      "C": "Increase the dividend to 50% because above-median payout indicates more cash than profitable investment opportunities.",
      "D": "The payout ratio is irrelevant under Modigliani-Miller, so the board should focus on capital budgeting."
    },
    "CorrectChoice": "B",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Payout Ratio = Dividends per Share / Earnings per Share",
    "Authorities": [
      "Corporate finance theory; dividend policy analysis"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Payout ratio above median may indicate underinvestment, but 5-point deviation is within normal variation",
      "application_to_facts": "Meridian's 40% payout is 5 points above 35% median",
      "key_conclusion": "Maintaining is appropriate given moderate deviation and normal variation"
    },
    "ExplanationCorrect": "The 40% payout ratio ($1.92/$4.80) exceeds the 35% median by only 5 percentage points, which is well within normal industry variation. Many successful companies maintain above-median payout ratios because they have fewer positive-NPV opportunities than peers. A 5-point deviation does not independently signal financial weakness or excess cash. The board should evaluate Meridian's specific investment opportunities, ROE on incremental projects, and growth trajectory before making any change. Maintaining the current policy is appropriate unless analysis reveals either insufficient investment opportunities (favoring an increase) or high-return projects being forgone (favoring a decrease).",
    "distractor_intent": {
      "A": {
        "misconception": "Mechanically cutting to match median",
        "why_plausible": "Benchmarking is intuitive but ignores firm-specific factors",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Jumping to dividend increase",
        "why_plausible": "Above-median payout may signal excess cash but requires analysis",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Invoking MM to dismiss analysis",
        "why_plausible": "MM is theoretically valid but practically incomplete",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A mechanically benchmarks. Option C jumps to conclusion. Option D invokes MM to dismiss. Only B provides the balanced evaluation appropriate for a 5-point deviation.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This jumps to a dividend increase without evaluating investment opportunities. Above-median payout could indicate fewer growth opportunities, but it could also reflect deliberate policy. The board must analyze incremental return on retained earnings first.",
      "B": "",
      "C": "This mechanically benchmarks to the median without evaluating Meridian circumstances. A 40% payout is only 5 points above the 35% median — well within normal variation. Many successful companies maintain above-median payout ratios.",
      "D": "This invokes MM irrelevance to dismiss the analysis. While MM provides foundational insight, real-world factors — taxes, signaling, clientele effects — make dividend policy relevant. The board cannot ignore the payout ratio."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Growth versus dividend tradeoff",
    "QuestionID": "P2-A-513",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-513-growth-versus-dividend-tradeoff",
    "Stem": "Vertex Dynamics, a high-growth software company, has ROE of 25% and retention ratio of 80%. The stock has underperformed the market for two years despite strong earnings growth. An activist argues Vertex should increase its dividend from $0.50 to $2.00 per share. The CFO must evaluate the tradeoff.",
    "Choices": {
      "A": "Increasing the dividend would reduce retention to 20%, lowering SGR from 20% to 5%, eliminating competitive advantage.",
      "B": "The 80% retention funds growth at 25% ROE, but market underperformance suggests investors do not value retained earnings at full ROE, creating tension between reinvestment returns and distribution preferences.",
      "C": "The dividend increase is irrelevant under Modigliani-Miller theory, and the proposal would have no effect on stock price.",
      "D": "Vertex should issue new equity to fund growth while paying the higher dividend, avoiding any tradeoff."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Sustainable Growth Rate = ROE x (1 - Dividend Payout Ratio)",
    "Authorities": [
      "Corporate finance theory; growth-dividend tradeoff"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "The growth-dividend tradeoff: higher retention funds faster growth but may conflict with investor preferences",
      "application_to_facts": "Vertex's 25% ROE and 80% retention yield 20% SGR, but market underperformance signals investor preference for distributions",
      "key_conclusion": "Tension between high-return reinvestment and investor preference for current income"
    },
    "ExplanationCorrect": "Vertex's SGR = 25% x 80% = 20%, a strong growth trajectory funded by high-return reinvestment. However, the stock's underperformance suggests the market does not fully value retained earnings at 25% ROE. This creates the core tension: management believes reinvesting at 25% creates more value than distributing, while the market signals investors prefer current income. The resolution depends on whether management's future ROE assessment is correct.",
    "distractor_intent": {
      "A": {
        "misconception": "Computing SGR correctly but drawing absolute conclusion",
        "why_plausible": "Math is correct but conclusion is too deterministic",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Invoking MM to dismiss tradeoff",
        "why_plausible": "MM is theoretically relevant but ignores real-world imperfections",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Proposing impractical equity issuance",
        "why_plausible": "Issuing equity to pay dividends is value-destructive",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A calculates correctly but concludes absolutely. Option C invokes MM to dismiss. Option D proposes impractical strategy. Only B correctly identifies the core tension.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This correctly computes the new SGR (25% x 0.20 = 5%) but draws an absolute conclusion about competitive advantage without analyzing whether current ROE is sustainable. The SGR reduction is significant but not automatically destructive.",
      "B": "",
      "C": "This invokes MM irrelevance to dismiss the tradeoff. While MM provides foundational insight, the market underperformance suggests real-world factors are creating value-relevant effects. The board cannot ignore these effects.",
      "D": "Issuing new equity to fund growth while paying a higher dividend is value-destructive. It incurs flotation costs, signals management lacks confidence in internal financing, and creates a circular cash flow. The board should evaluate whether the 25% ROE on retained earnings justifies forgoing the dividend increase."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Cash dividend versus stock dividend effects",
    "QuestionID": "P2-A-514",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-514-cash-dividend-versus-stock-dividend-effects",
    "Stem": "Cascade Manufacturing's board must choose between a $2.00 per share cash dividend and a 10% stock dividend on 5 million shares outstanding at $40.00. Which statement correctly distinguishes the two?",
    "Choices": {
      "A": "Both reduce equity by the same amount because the stock dividend is valued at market price, making them economically equivalent.",
      "B": "The cash dividend reduces equity by $10.0M and assets by $10.0M, while the stock dividend reallocates equity within the balance sheet without reducing total assets or equity.",
      "C": "The stock dividend reduces equity by $10.0M because retained earnings are capitalized, but total assets remain unchanged.",
      "D": "The cash dividend has no equity effect because it is a distribution of earnings, while the stock dividend reduces equity by par value."
    },
    "CorrectChoice": "B",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Payout Ratio = Dividends per Share / Earnings per Share",
    "Authorities": [
      "ASC 505-20 (Stock Dividends and Stock Splits)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Cash dividends reduce both assets and equity; stock dividends reallocate equity within the balance sheet",
      "application_to_facts": "$10M cash dividend reduces assets and equity; 10% stock dividend capitalizes retained earnings",
      "key_conclusion": "Cash dividend reduces total equity; stock dividend is a reallocation within equity"
    },
    "ExplanationCorrect": "A $2.00 cash dividend on 5M shares = $10.0M. Accounting: DR Retained Earnings $10M, CR Cash $10M — reduces both assets and equity. A 10% stock dividend issues 500K shares. Under ASC 505-20: DR Retained Earnings $20M (500K x $40), CR Common Stock $2.5M (500K x $5 par), CR APIC $17.5M. Total equity unchanged — retained earnings decrease while contributed capital increases. Cash dividends distribute value outside; stock dividends are recapitalizations within equity.",
    "distractor_intent": {
      "A": {
        "misconception": "Claiming both reduce equity equally",
        "why_plausible": "Assuming all dividends are economically equivalent",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Correctly identifying capitalization but misstating equity impact",
        "why_plausible": "Capitalization is real but total equity is unchanged",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Claiming cash dividends have no equity effect",
        "why_plausible": "Confusing dividends with stock splits",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A incorrectly equates them. Option C misstates equity impact. Option D denies cash dividend equity effect. Only B correctly describes both effects.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This incorrectly claims both reduce equity equally. The cash dividend reduces equity by $10M. The stock dividend does NOT reduce total equity — it reclassifies retained earnings as contributed capital. Total equity is unchanged.",
      "B": "",
      "C": "This correctly identifies capitalization but incorrectly claims equity reduction. The stock dividend reclassifies within equity: DR Retained Earnings, CR Common Stock + APIC. Total equity is unchanged.",
      "D": "This incorrectly states cash dividends have no equity effect. Cash dividends reduce retained earnings (DR Retained Earnings, CR Cash), directly reducing total shareholders' equity."
    }
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Factors affecting dividend policy",
    "QuestionID": "P2-A-515",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-515-factors-affecting-dividend-policy",
    "Stem": "Pinnacle Logistics' board evaluates increasing the quarterly dividend from $0.30 to $0.50. Constraints: debt covenant requiring current ratio of 1.50 (currently 1.62), $80M capex program over two years, and credit rating risk if payout exceeds 50%. Which combination creates the strongest obstacle?",
    "Choices": {
      "A": "The covenant is primary because the dividend increase would reduce cash and breach the 1.50 ratio.",
      "B": "The credit rating is primary because payout above 50% signals prioritizing shareholders over debt service.",
      "C": "The capex and rating together create the strongest obstacle because $80M competes for the same cash, while the payout constraint limits distribution.",
      "D": "All three factors equally and independently prevent the increase, requiring the board to address all three before any change."
    },
    "CorrectChoice": "D",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Dividend Payout Ratio = Dividends per Share / Earnings per Share",
    "Authorities": [
      "Corporate finance theory; covenant analysis; credit rating methodology"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified",
      "EW[CC] empty",
      "Non-CC EW >=75 chars"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Dividend policy is constrained by debt covenants, capex needs, and credit rating requirements",
      "application_to_facts": "Pinnacle faces three simultaneous constraints: covenant, capex, and rating",
      "key_conclusion": "All three independently constrain the dividend increase"
    },
    "ExplanationCorrect": "Pinnacle faces three independent constraints. The covenant requires current ratio of 1.50 (currently 1.62) — the dividend increase reduces cash, potentially breaching it. The $80M capex competes for the same cash. The credit rating limits payout to 50% — increasing dividend may push payout above this. Each independently prevents the increase; the board must address all three. Resolving only one or two leaves the third as a binding constraint.",
    "distractor_intent": {
      "A": {
        "misconception": "Isolating covenant as sole constraint",
        "why_plausible": "Covenant compliance is a clear bright-line",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Isolating credit rating as sole constraint",
        "why_plausible": "Rating downgrades have significant consequences",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Identifying two of three constraints",
        "why_plausible": "Capex-rating combination is compelling but omits covenant",
        "tier_candidate": 1
      }
    },
    "uniqueness_note": "Option A focuses only on covenant. Option B focuses only on rating. Option C combines two but omits covenant. Only D correctly identifies all three as independent constraints.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationWrong": {
      "A": "This isolates the covenant as the sole obstacle. While the 1.62 ratio provides only 8% headroom, the covenant can be renegotiated. The capex and rating constraints are equally significant.",
      "B": "This isolates the credit rating. While a downgrade increases borrowing costs, the 50% cap may not be triggered. The covenant and capex constraints exist independently.",
      "C": "This identifies two constraints but omits the covenant. The board cannot approve by resolving only capex and rating — the covenant breach risk remains.",
      "D": ""
    }
  }
];
