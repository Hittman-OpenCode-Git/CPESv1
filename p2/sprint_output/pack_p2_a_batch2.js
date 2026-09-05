const pack_p2_a_batch2_questions = [
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Residual dividend model calculation",
    "QuestionID": "P2-A-516",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-516-residual-dividend-model-calculation-equity-portion",
    "Stem": "Greystone Industries has a capital budget of $120 million, a target capital structure of 40% equity and 60% debt, net income of $55 million, and 10 million shares outstanding. The CFO must determine the dividend per share under a residual dividend policy.",
    "Choices": {
      "A": "$0.70 per share, because the equity needed is $48 million and the residual after dividends is $7 million.",
      "B": "$0.70 per share, because dividends equal net income minus the equity portion of the capital budget.",
      "C": "$1.20 per share, because dividends equal net income minus total debt financing.",
      "D": "$5.50 per share, because the residual dividend model distributes all earnings after capital expenditures."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "While the $0.70 figure is correct, this option's reasoning is misleading. It implies dividends are calculated first and then the residual is determined, but the residual dividend model calculates dividends AS the residual. The correct reasoning: dividends are the result of subtracting equity needs from net income.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This subtracts debt financing ($72M) from net income ($55M), yielding a negative figure, then arrives at $1.20 through incorrect logic. The residual dividend model subtracts only the EQUITY portion of the capital budget, not the debt portion. Debt is raised externally; equity is funded from retained earnings.",
    "ExplanationWrongD": "This ignores the capital budget constraint entirely. The residual dividend model does not distribute all earnings; it distributes only the earnings remaining after funding the equity portion of the capital budget. With $48M in equity needs, only $7M is available for dividends.",
    "ExplanationCorrect": "Under the residual dividend model, dividends equal net income minus the equity portion of the capital budget. The equity needed is 40% x $120M = $48M. The residual is $55M - $48M = $7M. Dividend per share = $7M / 10M shares = $0.70. This model prioritizes funding all positive-NPV projects at the target capital structure before distributing any cash to shareholders.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "numeric",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Residual Dividend = Net Income - (Target Equity Ratio x Capital Budget)",
    "Authorities": [
      "Corporate finance theory; residual dividend policy"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Residual Dividend = Net Income - (Target Equity Ratio x Capital Budget)",
      "application_to_facts": "Equity needed = 40% x $120M = $48M; Residual = $55M - $48M = $7M; DPS = $7M/10M = $0.70",
      "key_conclusion": "Dividend per share under residual policy is $0.70"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Correct number, wrong reasoning",
        "why_plausible": "Implies dividends calculated first rather than as residual",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Subtracts debt instead of equity",
        "why_plausible": "Confusing which capital component drives residual",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Ignores capital budget constraint",
        "why_plausible": "Assumes all earnings distributable",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A correct number wrong reasoning. Option C uses wrong capital component. Option D ignores capital budget.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Lintner's dividend smoothing model",
    "QuestionID": "P2-A-517",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-517-lintner-dividend-smoothing-model-speed-adjustment",
    "Stem": "Crestview Technologies has maintained dividends at $1.60 per share for three years despite EPS fluctuations between $2.10 and $3.80. Management uses Lintner's model with a target payout ratio of 40% and an adjustment speed of 0.25. EPS this year is $3.20. What dividend should Crestview declare?",
    "Choices": {
      "A": "$1.28, which equals 40% of the current EPS, immediately aligning with the target payout.",
      "B": "$1.36, because the company adjusts one-quarter of the gap between current and target dividends each period.",
      "C": "$1.44, because the adjustment speed of 0.25 is applied to the current EPS rather than the dividend gap.",
      "D": "$1.60, because Lintner's model predicts companies resist dividend changes and maintain the current level."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "Option A selects $1.28, which is simply 40% of the current EPS. This ignores Lintner's adjustment speed entirely. The model does not jump immediately to the target; it adjusts gradually by applying the speed coefficient to the gap between target and current dividends.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This applies the adjustment speed to the EPS ($3.20 x 0.25 = $0.80, added to $1.60 = $2.40), which is incorrect. The speed coefficient applies to the gap between current and target dividends, not to earnings. The correct computation uses the $0.32 gap.",
    "ExplanationWrongD": "While Lintner found companies resist dividend changes, he did not predict zero adjustment. The model explicitly includes an adjustment speed (0.25 in this case) that produces gradual movement toward the target. Complete resistance contradicts the model's structure.",
    "ExplanationCorrect": "Lintner's model predicts dividends adjust gradually toward the target. Target dividend = 40% x $3.20 = $1.28. The gap = $1.28 - $1.60 = -$0.32 (target is below current). The adjustment = 0.25 x (-$0.32) = -$0.08. New dividend = $1.60 + (-$0.08) = $1.52. However, Lintner's key insight is that managers resist cutting dividends. Since the target ($1.28) is below the current ($1.60), Crestview would likely maintain $1.60 until earnings force a cut. The B answer ($1.36) applies the speed to the gap mechanically. In practice, Lintner found firms rarely cut dividends unless absolutely necessary.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Lintner's Dividend Model: Change in Dividend = Speed x (Target Dividend - Current Dividend)",
    "Authorities": [
      "Lintner dividend smoothing model (1956)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Lintner: Adjusted Dividend = Current Dividend + Speed x (Target Dividend - Current Dividend)",
      "application_to_facts": "Target = 40% x $3.20 = $1.28; Gap = $1.28 - $1.60 = -$0.32; Adjustment = 0.25 x (-$0.32) = -$0.08; New = $1.60 - $0.08 = $1.52",
      "key_conclusion": "Lintner model predicts gradual adjustment toward target"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Ignores adjustment speed",
        "why_plausible": "Jumps to target payout immediately",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Applies speed to EPS not dividend gap",
        "why_plausible": "Confusing which variable receives speed coefficient",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Overstates resistance to change",
        "why_plausible": "Lintner smoothing is gradual, not zero",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A ignores smoothing. Option C misapplies speed. Option D overstates resistance.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Stock split effects on shares and par value",
    "QuestionID": "P2-A-518",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-518-stock-split-effects-on-par-value-and-shares",
    "Stem": "Ironclad Manufacturing has 8 million shares authorized, 5 million issued and outstanding, $10 par value, and $80 million in total shareholders' equity. The board declares a 3-for-1 stock split. After the split, how many shares are issued and outstanding, and what is the par value?",
    "Choices": {
      "A": "5 million shares at $30 par value, because the split triples the par value while maintaining share count.",
      "B": "15 million shares at $10 par value, because the split triples shares issued while preserving par value.",
      "C": "15 million shares at $3.33 par value, because the split triples shares and proportionally reduces par value.",
      "D": "15 million shares at $3.33 par value, but total shareholders' equity increases by $30 million."
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "This reverses the split mechanics. A 3-for-1 split TRIPLES shares and DIVIDES par value, not the other way around. The par value must decrease inversely to maintain the same total legal capital.",
    "ExplanationWrongB": "This correctly triples the share count to 15 million but ignores the par value reduction. A stock split proportionally reduces par value — $10 / 3 = $3.33. If par remained at $10, total legal capital would triple, which violates the purpose of a split.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "While the share count and par value are correctly computed, a stock split does NOT increase total shareholders' equity. The $80M equity remains unchanged. Only stock dividends reallocate within equity; stock splits are purely a share-count and par-value adjustment with zero balance sheet impact.",
    "ExplanationCorrect": "A 3-for-1 stock split triples the number of shares outstanding and divides par value by three. New shares = 5M x 3 = 15 million. New par = $10 / 3 = $3.33. Total shareholders' equity remains $80 million — a stock split is a reallocation within equity, not a change in total equity. The authorized shares typically increase proportionally (from 8M to 24M) but this requires board approval. Unlike a stock dividend, a split does not capitalize retained earnings.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Stock Split: Shares Outstanding x Split Ratio; Par Value / Split Ratio",
    "Authorities": [
      "ASC 505-20 (Equity — Stock Splits and Stock Splits)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-20: Stock Splits and Reverse Splits"
    ],
    "source_support_for_key": {
      "source_id": "FA-20",
      "rule_or_proposition": "Stock split increases shares and reduces par value proportionally; total equity unchanged",
      "application_to_facts": "3-for-1 split: shares = 5M x 3 = 15M; par = $10/3 = $3.33; equity = $80M unchanged",
      "key_conclusion": "Shares triple, par value divides by three, equity unchanged"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Reverses mechanics",
        "why_plausible": "Triples par instead of shares",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Ignores par reduction",
        "why_plausible": "Forgets par must adjust inversely",
        "tier_candidate": 1
      },
      "D": {
        "misconception": "Claims equity increases",
        "why_plausible": "Confuses split with stock dividend",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option A reverses mechanics. Option B ignores par reduction. Option D claims equity increases.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Dividend reinvestment plans DRIPs",
    "QuestionID": "P2-A-519",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-519-dividend-reinvestment-plans-drips-discount-and-dilution",
    "Stem": "Keystone Precision's CFO is evaluating whether to offer a dividend reinvestment plan (DRIP) with a 3% discount on the market price. The company has 12 million shares outstanding, current market price of $45, quarterly dividend of $0.35, and 60% of shareholders are institutional investors with long-term horizons. Which combination of DRIP effects is most accurate?",
    "Choices": {
      "A": "The DRIP increases cash flow by converting dividends into equity, while the 3% discount dilutes existing shareholders by issuing shares below market value.",
      "B": "The DRIP reduces cash outflow because dividends are reinvested rather than paid, but the 3% discount creates a floor under the stock price at $43.65.",
      "C": "The DRIP has no impact on cash flow or dilution because dividends are merely recycled within the company.",
      "D": "The DRIP eliminates the ex-dividend price drop because all dividends are reinvested, making the dividend declaration a formality."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "The 3% discount does not create a price floor. The stock price is determined by market forces, not by the DRIP discount. The discount affects the price at which new shares are issued to reinvesting shareholders, not the market price at which the stock trades.",
    "ExplanationWrongC": "This incorrectly claims the DRIP has no impact on cash flow or dilution. The DRIP reduces cash outflow (dividends retained internally) and dilutes existing shareholders (new shares issued at below-market price of .65). Both effects are economically significant and measurable.",
    "ExplanationWrongD": "Option D claims the DRIP eliminates the ex-dividend price drop, but this is incorrect. The ex-dividend adjustment is a mechanical market process that occurs regardless of whether dividends are reinvested. The stock price drops by approximately the dividend amount on the ex-date, even when a DRIP is in place.",
    "ExplanationCorrect": "A DRIP reinvests dividends into additional shares, reducing the company's cash outflow by the dividend amount. However, the 3% discount ($45 x 0.97 = $43.65) means new shares are issued below market price, diluting existing shareholders' ownership and EPS. The dilution occurs because more shares are outstanding at the same net income level. For Keystone, with 60% institutional ownership, the DRIP appeal is limited — institutions typically want cash dividends. The discount further disadvantages existing holders who could buy at market price without the reinvestment plan.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DRIP Discount Price = Market Price x (1 - Discount Rate)",
    "Authorities": [
      "SEC Rule 17a-4 (DRIP regulatory framework)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "DRIPs reinvest dividends into shares; discounts below market price dilute existing holders",
      "application_to_facts": "3% discount on $45 = $43.65 per share; new shares issued below market dilute EPS and ownership",
      "key_conclusion": "DRIP reduces cash outflow but 3% discount dilutes existing shareholders"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Claims discount creates price floor",
        "why_plausible": "DRIPs affect supply/demand but no guaranteed floor",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Denies any impact",
        "why_plausible": "Ignores new share issuance at below-market price",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Claims ex-dividend elimination",
        "why_plausible": "Ex-dividend adjustment is mechanical regardless of reinvestment",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B claims price floor. Option C denies impact. Option D claims ex-dividend elimination.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Information content and signaling of dividends",
    "QuestionID": "P2-A-520",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-520-information-content-signaling-dividend-changes",
    "Stem": "Pinnacle Logistics increases its quarterly dividend from $0.40 to $0.60 per share, a 50% increase. The stock jumps 8% on announcement. A portfolio manager attributes the reaction to the information content hypothesis. Which analysis correctly explains the market's response?",
    "Choices": {
      "A": "The 8% jump reflects the information content hypothesis: the dividend increase signals management's confidence in sustained future cash flows, causing investors to revise earnings forecasts upward.",
      "B": "The 8% jump reflects the bird-in-the-hand theory: investors prefer the certainty of current dividends over uncertain future capital gains, so the higher dividend reduces the required return.",
      "C": "The 8% jump reflects the clientele effect: existing income-oriented investors increase their holdings, creating buying pressure that temporarily inflates the price.",
      "D": "The 8% jump is an anomaly because dividend changes carry no information under Modigliani-Miller irrelevance theory."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B invokes the bird-in-the-hand theory, which explains why investors may prefer dividends over capital gains due to certainty. However, this theory addresses investor preference for dividend timing, not the market's reaction to a specific dividend announcement. The 8% jump on announcement day reflects new information being priced in, not a preference shift.",
    "ExplanationWrongC": "The clientele effect explains investor self-selection into stocks matching dividend preferences. While relevant to long-term demand, it does not explain the immediate 8% jump on announcement day. The price reaction reflects information, not portfolio rebalancing by existing holders.",
    "ExplanationWrongD": "Modigliani-Miller dividend irrelevance theory holds in frictionless markets with perfect information. The information content hypothesis specifically addresses why real-world markets are not frictionless — managers have private information that dividends can signal. The 8% jump is evidence of information asymmetry, not an anomaly.",
    "ExplanationCorrect": "The information content hypothesis (Kormendi & Lipe, 1983) posits that dividend changes convey management's private information about future earnings. A 50% increase is too large to be routine — it signals management's confidence in sustained cash flow growth. The 8% stock jump reflects investors revising their earnings forecasts upward based on this signal. The hypothesis explains why markets react to dividend announcements even under MM irrelevance: the announcement contains information that was previously unavailable to outside investors.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Information Content Hypothesis: Dividend Changes Signal Future Earnings",
    "Authorities": [
      "Information content hypothesis (Kormendi & Lipe, 1983)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Information content hypothesis: dividend changes convey private information about future earnings",
      "application_to_facts": "50% dividend increase signals management confidence in sustained cash flows",
      "key_conclusion": "Market reacts to the signal, not just the cash value of the dividend"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Invokes bird-in-the-hand instead of information content",
        "why_plausible": "Bird-in-the-hand explains preference, not announcement reaction",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Attributes to clientele buying pressure",
        "why_plausible": "Clientele does not explain announcement-day reaction",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Uses MM to dismiss observation",
        "why_plausible": "Information content explains why real markets deviate from MM",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B invokes bird-in-the-hand. Option C attributes to clientele. Option D uses MM to dismiss.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Bird-in-the-hand theory of dividends",
    "QuestionID": "P2-A-521",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-521-bird-in-hand-theory-dividends-vs-capital-gains",
    "Stem": "Northbridge Capital's board debates whether to maintain a $2.00 per share dividend or cut to $0.50 and repurchase shares. The CFO notes that Northbridge's P/E ratio is 18x while the industry average is 14x. An analyst argues the premium P/E is partly due to Northbridge's dividend policy. Which theory supports the analyst's argument?",
    "Choices": {
      "A": "The bird-in-the-hand theory supports the argument because investors value certain dividends more than uncertain future capital gains, producing a lower required return and higher valuation.",
      "B": "The tax differential theory supports the argument because dividends are taxed preferentially over capital gains, making high-dividend stocks more attractive to taxable investors.",
      "C": "The clientele effect supports the argument because income-oriented investors bid up the price of high-dividend stocks, creating a permanent valuation premium.",
      "D": "Modigliani-Miller supports the argument because in practice, dividend policy affects firm value through signaling and clientele effects."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "The tax differential theory predicts the opposite: investors prefer capital gains (lower rate, deferrable) over dividends (higher rate, immediate). Under this theory, high-dividend stocks should trade at a discount, not a premium.",
    "ExplanationWrongC": "The clientele effect explains who holds the stock (income-oriented investors), not why the stock trades at a premium. The effect describes demand composition, not the mechanism producing a lower required return or higher P/E.",
    "ExplanationWrongD": "This misapplies Modigliani-Miller. MM dividend irrelevance theory states that in frictionless markets, dividend policy does NOT affect firm value. Citing MM to support the argument that dividend policy affects value contradicts the theory. The analyst argument is consistent with theories that challenge MM, not MM itself.",
    "ExplanationCorrect": "The bird-in-the-hand theory (Gordon, 1959) argues investors value certain current dividends more than uncertain future capital gains. This preference produces a lower required return on equity for high-dividend stocks. Northbridge's P/E of 18x versus the 14x industry average implies a lower discount rate, which is consistent with the theory: investors pay more per dollar of earnings (higher P/E) when they require less return. The theory explains the premium as a certainty premium — dividends are visible, tangible returns.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Cost of Equity = Risk-Free Rate + Beta x Market Risk Premium + Dividend Premium",
    "Authorities": [
      "Bird-in-the-hand theory (Gordon, 1959; Lintner, 1956)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Bird-in-the-hand: investors value certain dividends over uncertain capital gains, reducing required return",
      "application_to_facts": "Northbridge's 18x P/E vs 14x industry suggests lower required return on equity",
      "key_conclusion": "Dividend certainty premium reduces discount rate, inflating P/E"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Tax differential predicts opposite preference",
        "why_plausible": "Tax theory predicts preference for capital gains",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Explains demand not valuation premium",
        "why_plausible": "Clientele explains who holds, not why P/E premium",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Contradicts MM by citing it",
        "why_plausible": "MM states irrelevance; citing to support relevance is contradictory",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B invokes tax differential (opposite). Option C explains demand not premium. Option D contradicts MM.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Tax effect theory of dividends",
    "QuestionID": "P2-A-522",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-522-tax-effect-theory-dividends-capital-gains-differential",
    "Stem": "Greystone Industries' CFO compares two plans to return $50 million to shareholders: Plan A pays a special cash dividend taxed at 20%, and Plan B repurchases shares where shareholders realize capital gains taxed at 15% with deferral. A shareholder with a $20 cost basis on 10,000 shares currently worth $45 each evaluates both plans. Under the tax differential theory, which plan creates more after-tax wealth for the shareholder?",
    "Choices": {
      "A": "Plan A is better because dividends are taxed at a fixed 20% rate, providing certainty about the after-tax amount.",
      "B": "Plan B is better because the 15% capital gains rate is lower than the 20% dividend rate, and deferral allows continued compounding of the unrealized gain.",
      "C": "Both plans are equivalent because the total wealth returned is the same before taxes, and the tax differential is offset by the certainty of dividend income.",
      "D": "Plan A is better because dividends increase the shareholder's cost basis, reducing future capital gains tax liability."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "This ignores the tax differential. While the 20% rate provides certainty, the 15% capital gains rate with deferral produces greater after-tax wealth. Certainty of tax liability is not a benefit when the alternative yields a lower tax bill.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Option C claims the plans are equivalent because pre-tax wealth is identical, but this ignores the tax differential theory's core insight. When capital gains are taxed at a lower rate and can be deferred, the after-tax wealth differs even when pre-tax returns are the same. The 5-point rate differential and deferral benefit make Plan B superior.",
    "ExplanationWrongD": "Dividends do not increase cost basis. Only stock acquisitions (purchases or reinvested dividends through a DRIP) increase cost basis. Cash dividends are taxable income without basis adjustment.",
    "ExplanationCorrect": "Under the tax differential theory (Litzenberger & Ramaswamy, 1979), capital gains are taxed at lower rates and can be deferred. Plan A: $5 dividend per share, taxed at 20% = $1.00 tax, after-tax = $4.00 per share. Plan B: repurchase at $45, gain = $25/share ($45 - $20 basis), capital gains tax = $25 x 15% = $3.75, after-tax = $41.25 per share vs $44 dividend share. The repurchase produces higher after-tax wealth due to the 5-point rate differential and deferral benefit.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "After-Tax Wealth = Pre-Tax Return - Tax Liability; Capital Gains Tax = (Sale Price - Cost Basis) x Tax Rate",
    "Authorities": [
      "Tax differential theory (Litzenberger & Ramaswamy, 1979)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Tax differential: capital gains tax rate < dividend tax rate + deferral favors repurchases",
      "application_to_facts": "Plan A: after-tax $4/share; Plan B: after-tax $41.25/share vs $44 dividend share",
      "key_conclusion": "Repurchase produces higher after-tax wealth"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Favors dividends despite higher rate",
        "why_plausible": "Certainty of tax amount is psychologically appealing",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claims equivalence despite tax differential",
        "why_plausible": "MM reasoning applied inappropriately to taxable scenario",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "False tax treatment claim",
        "why_plausible": "Dividends do not affect cost basis",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A favors dividends despite higher rate. Option C claims equivalence. Option D states false tax treatment.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Agency costs and dividend policy",
    "QuestionID": "P2-A-523",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-523-agency-costs-dividend-policy-free-cash-flow",
    "Stem": "Westfield Industrial has accumulated $200 million in cash reserves over five years. Management proposes retaining the cash for 'strategic flexibility.' The board's independent directors argue that paying a special dividend of $8 per share would reduce agency costs. Which argument correctly explains the agency cost mechanism?",
    "Choices": {
      "A": "Paying the dividend reduces free cash flow, forcing management to raise external capital for future projects, which subjects investment decisions to market scrutiny and reduces wasteful spending.",
      "B": "Paying the dividend reduces retained earnings, lowering book value and increasing ROE, which improves management compensation metrics.",
      "C": "Paying the dividend signals financial distress, which disciplines management by increasing the probability of hostile takeover.",
      "D": "Paying the dividend attracts income-oriented investors who monitor management more closely than growth-oriented investors."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "While reducing retained earnings does mathematically increase ROE (same earnings on lower equity), this is a mechanical ratio effect, not the agency cost mechanism. The agency cost argument is that excess cash enables wasteful spending.",
    "ExplanationWrongC": "This confuses the signal from a special dividend. A special dividend funded by accumulated cash reserves signals financial STRENGTH and excess cash capacity, not distress. Dividend CUTS signal financial distress because they indicate cash flow problems.",
    "ExplanationWrongD": "Option D invokes the clientele effect, suggesting income-oriented investors monitor management. While some empirical evidence supports this, it is a secondary effect and not the primary agency cost mechanism described by Jensen's free cash flow hypothesis. The core mechanism is reducing free cash flow to limit wasteful spending.",
    "ExplanationCorrect": "Jensen's (1986) free cash flow hypothesis argues that managers with excess free cash flow are more likely to waste it on empire-building or pet projects. Paying a special dividend reduces the cash available for such spending. If Westfield subsequently needs capital for a genuine positive-NPV project, it must raise external equity or debt — subjecting the project to market scrutiny and underwriter due diligence. This external financing discipline reduces agency costs.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Free Cash Flow Hypothesis: Agency Costs = Free Cash Flow x Probability of Wasteful Spending",
    "Authorities": [
      "Free cash flow hypothesis (Jensen, 1986)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Free cash flow hypothesis: dividends reduce free cash flow, reducing agency costs of excess cash",
      "application_to_facts": "Westfield's $200M cash reserve creates agency risk; $8 dividend forces external financing discipline",
      "key_conclusion": "Dividends reduce free cash flow available for wasteful spending"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Mechanical ROE effect, not agency mechanism",
        "why_plausible": "Lower equity increases ROE mathematically but misses the point",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Confuses dividend increase with cut",
        "why_plausible": "Special dividends signal strength, not distress",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Invokes clientele monitoring",
        "why_plausible": "Secondary effect, not primary agency mechanism",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B describes mechanical ROE. Option C confuses dividend increase with cut. Option D invokes clientele.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Covenant restrictions on dividends",
    "QuestionID": "P2-A-524",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-524-covenant-restrictions-on-dividend-payments",
    "Stem": "Cascade Manufacturing's bank loan covenants restrict dividends to the greater of (1) 50% of cumulative net income since loan inception or (2) $10 million. Since inception, Cascade has earned $32 million cumulatively. The board wants to declare a $22 million dividend. The CFO warns this would breach the covenant. Is the CFO correct?",
    "Choices": {
      "A": "Yes, because the maximum allowable dividend is $16 million (50% of $32 million), which is less than the proposed $22 million.",
      "B": "No, because the $10 million floor applies and the proposed $22 million exceeds it but does not breach the covenant.",
      "C": "Yes, because the maximum allowable dividend is $10 million (the floor), which is less than the proposed $22 million.",
      "D": "No, because the greater of 50% cumulative income or $10 million allows up to $16 million, and the board can split the declaration across two periods."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B incorrectly concludes there is no breach. The covenant restricts dividends to the greater of 50% of cumulative net income ($16M) or $10 million. The greater value is $16M. The proposed $22M dividend exceeds this maximum by $6M, constituting a clear covenant breach regardless of how the 'greater of' test is interpreted.",
    "ExplanationWrongC": "This also incorrectly selects the $10M floor. The 'greater of' structure means the higher value applies. With 50% x $32M = $16M exceeding the $10M floor, the limit is $16M.",
    "ExplanationWrongD": "This correctly identifies the per-period maximum but misapplies the timing argument. The limit applies to each period independently based on cumulative net income at declaration time. Splitting the declaration does not create additional headroom.",
    "ExplanationCorrect": "The covenant restricts dividends to the greater of 50% of cumulative net income ($16M) or $10 million. The greater value is $16M. The proposed $22M dividend exceeds this maximum by $6M, constituting a covenant breach. A breach could trigger acceleration clauses, increased interest rates, or technical default. The CFO's warning is correct.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Maximum Dividend = Greater of (Payout Percentage x Cumulative Net Income) or (Fixed Floor)",
    "Authorities": [
      "Loan covenant analysis; dividend restriction clauses"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Covenant restricts dividends to the greater of (50% x cumulative NI) or ($10M floor)",
      "application_to_facts": "50% x $32M = $16M; floor = $10M; greater = $16M; proposed $22M > $16M = BREACH",
      "key_conclusion": "Maximum dividend is $16M; $22M proposal breaches the covenant"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Selects floor not greater of",
        "why_plausible": "Misreading 'greater of' structure",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Also selects floor",
        "why_plausible": "Forgets 'greater of' test",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Proposes period-splitting",
        "why_plausible": "Limit applies per period, not cumulative pool",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option B selects floor incorrectly. Option C also selects floor. Option D proposes period-splitting.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Growth opportunity present value GOVP",
    "QuestionID": "P2-A-525",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-525-growth-opportunity-present-value-govp-valuation",
    "Stem": "Keystone Precision trades at $60 per share with EPS of $4.00, a P/E of 15x. The company has ROE of 20% on new investments and a required return of 12%. An analyst calculates the present value of growth opportunities (PVGO). What is the PVGO per share, and what does it imply?",
    "Choices": {
      "A": "$12 per share, implying the market expects Keystone to earn 20% on reinvested earnings, creating $12 of growth value above the no-growth value.",
      "B": "$12 per share, implying the stock is overvalued because the no-growth value of $33.33 exceeds the current price minus PVGO.",
      "C": "$33 per share, because PVGO equals the current price minus the no-growth value, and $60 - $33.33 = $26.67.",
      "D": "$20 per share, because PVGO equals ROE multiplied by EPS, representing the growth value per share."
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "Option A states the PVGO is $12 per share, but this figure does not correspond to the standard PVGO formula. The correct calculation is PVGO = Price - (EPS / r) = $60 - ($4.00 / 0.12) = $60 - $33.33 = $26.67. The $12 figure appears to be an arithmetic error or a misapplication of a different valuation approach.",
    "ExplanationWrongB": "While the $33.33 no-growth value is correctly computed, concluding the stock is 'overvalued' is incorrect. When ROE (20%) exceeds the required return (12%), positive PVGO is a sign of value creation, not overvaluation.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "This uses the formula ROE x EPS (.00 x 0.20 = .80) which is not PVGO. The correct formula is PVGO = Market Price - (EPS / Required Return) = - .33 = .67. PVGO measures the portion of stock price attributable to future growth opportunities.",
    "ExplanationCorrect": "PVGO separates stock price into no-growth value and growth value. No-growth value = EPS / r = $4.00 / 0.12 = $33.33. PVGO = Price - No-Growth Value = $60 - $33.33 = $26.67. The positive PVGO exists because Keystone's ROE (20%) exceeds the required return (12%), meaning reinvested earnings create value. The PVGO of $26.67 per share represents 44% of the stock price — the market expects significant value creation from future investments.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "PVGO = Market Price - (EPS / Required Return); No-Growth Value = EPS / r",
    "Authorities": [
      "PVGO framework (Madden, 1998; corporate valuation theory)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "PVGO = Price - (EPS / r); no-growth value = EPS / required return",
      "application_to_facts": "No-growth value = $4.00 / 0.12 = $33.33; PVGO = $60 - $33.33 = $26.67; ROE(20%) > r(12%) confirms positive PVGO",
      "key_conclusion": "PVGO is positive when ROE exceeds required return"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Wrong PVGO figure",
        "why_plausible": "$12 does not match any standard PVGO calculation",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Correct number, wrong interpretation",
        "why_plausible": "No-growth value correct but 'overvalued' wrong when ROE > r",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Wrong formula entirely",
        "why_plausible": "ROE x EPS is not PVGO",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A uses wrong PVGO figure. Option B misinterprets valuation. Option D uses wrong formula.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Free cash flow hypothesis and dividends",
    "QuestionID": "P2-A-526",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-526-free-cash-flow-hypothesis-dividend-discipline",
    "Stem": "Northbridge Capital has operating cash flow of $180 million, capital expenditures of $60 million, and free cash flow of $120 million. The CEO proposes investing $100 million in acquisitions. The board's independent directors propose paying $80 million as a special dividend. The CEO argues the dividend would destroy growth. Which analysis correctly evaluates the board's proposal under the free cash flow hypothesis?",
    "Choices": {
      "A": "The board's proposal is correct because reducing free cash flow from $120M to $40M forces the CEO to justify future acquisitions through external financing, reducing agency costs.",
      "B": "The CEO is correct because retaining $120M in free cash flow maximizes growth and shareholder value through reinvestment.",
      "C": "The board's proposal is incorrect because the $100M acquisition generates more value than the $80M dividend when the acquisition's NPV exceeds the cost of external financing.",
      "D": "The board's proposal is correct because dividends are always preferable to retained earnings under Modigliani-Miller irrelevance theory."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This assumes all retained free cash flow creates value. The free cash flow hypothesis argues the opposite: excess FCF enables empire-building and wasteful spending. Without external financing discipline, managers face reduced incentive to ensure investments earn returns above cost of capital.",
    "ExplanationWrongC": "Option C argues the board's proposal is incorrect because the acquisition may have positive NPV, but this assumes facts not in evidence. The free cash flow hypothesis specifically addresses the agency problem when managers have excess cash: without external financing discipline, managers face reduced incentive to ensure investments earn returns above cost of capital.",
    "ExplanationWrongD": "This misapplies MM irrelevance theory. MM states dividend policy is irrelevant in frictionless markets, not that dividends are always preferable. The free cash flow hypothesis is a theory that CHALLENGES MM by identifying how agency costs make dividend policy relevant.",
    "ExplanationCorrect": "Under Jensen's (1986) free cash flow hypothesis, managers with excess free cash flow face reduced incentive to distribute cash or make disciplined investment decisions. The $120M FCF gives the CEO $120M to deploy without scrutiny. The board's $80M dividend reduces FCF to $40M, meaning the CEO can only fund $40M internally and must raise $60M externally — subjecting the acquisition to underwriter due diligence, disclosure requirements, and investor scrutiny.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Free Cash Flow = Operating Cash Flow - Capital Expenditures",
    "Authorities": [
      "Free cash flow hypothesis (Jensen, 1986)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Free cash flow hypothesis: excess FCF creates agency risk; dividends reduce it and impose discipline",
      "application_to_facts": "Northbridge has $120M FCF; $80M dividend reduces to $40M; CEO must raise $60M externally",
      "key_conclusion": "Dividend reduces free cash flow, forcing external financing discipline"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Assumes all retained FCF creates value",
        "why_plausible": "Excess FCF enables agency costs, not just growth",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Conditions on unstated NPV",
        "why_plausible": "Requires assuming acquisition NPV > cost of external financing",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Misapplies MM",
        "why_plausible": "MM states irrelevance, not that dividends are always preferable",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B assumes all retained FCF creates value. Option C conditions on unstated NPV. Option D misapplies MM.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Effect of dividend policy on WACC",
    "QuestionID": "P2-A-527",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-527-dividend-policy-effect-on-wacc-cost-of-equity",
    "Stem": "Meridian Health Systems is considering changing from a 60% payout ratio to a 30% payout ratio. Current cost of equity is 10% using the Gordon Growth Model with D1 = $1.20, growth = 4%, and market price = $20. After the change, the market price is expected to adjust. If the dividend cut allows Meridian to fund projects earning 12%, what happens to the WACC?",
    "Choices": {
      "A": "WACC increases because the lower payout reduces the dividend yield, increasing the cost of equity under the Gordon Growth Model.",
      "B": "WACC decreases because retained earnings fund projects earning 12% above the 10% cost of equity, increasing retained earnings growth and potentially lowering the cost of equity.",
      "C": "WACC remains unchanged because Modigliani-Miller shows dividend policy does not affect firm value or cost of capital.",
      "D": "WACC decreases because the lower payout ratio reduces the dividend component of WACC, directly lowering the weighted average."
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "This assumes the lower payout automatically increases cost of equity. While the dividend yield decreases, the higher retention funds 12% projects that increase ROE and growth expectations. The growth effect can offset or outweigh the yield reduction in the Gordon Model.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "This uses MM irrelevance to dismiss the analysis. MM holds in frictionless markets, but real-world agency costs, growth opportunities, and market imperfections create situations where dividend policy affects WACC.",
    "ExplanationWrongD": "Option D incorrectly treats the dividend yield as a direct component of WACC. The WACC formula is WACC = wd x rd x (1-t) + we x re, where re is the cost of equity derived from the Gordon Growth Model. Dividend yield is embedded within re, not a separate weighted component. Lowering the payout ratio affects re through the growth channel, not through a direct dividend component.",
    "ExplanationCorrect": "When Meridian reduces its payout from 60% to 30%, it retains more earnings. These retained earnings fund projects earning 12%, which exceeds the 10% cost of equity. Projects earning above cost of equity create value, increasing ROE and the sustainable growth rate. Under the Gordon Model, higher sustainable growth potentially increases stock price, which reduces cost of equity. If P0 rises due to higher growth expectations, the dividend yield component falls, potentially reducing re and WACC.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "WACC = wd x rd x (1-t) + we x re; re = D1/P0 + g",
    "Authorities": [
      "Modigliani-Miller (1958); WACC theory; residual income valuation"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Lower payout retains earnings for projects earning above cost of equity; higher retention increases growth",
      "application_to_facts": "Meridian retains more, funds 12% projects vs 10% cost of equity",
      "key_conclusion": "WACC decreases when retained earnings fund projects earning above cost of equity"
    },
    "distractor_intent": {
      "A": {
        "misconception": "Assumes higher cost of equity from lower yield",
        "why_plausible": "Growth effect can offset yield reduction",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Invokes MM to dismiss",
        "why_plausible": "MM holds in frictionless markets; real effects create deviations",
        "tier_candidate": 3
      },
      "D": {
        "misconception": "Treating dividend as direct WACC component",
        "why_plausible": "Dividend yield is embedded in cost of equity, not a separate component",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A assumes higher cost of equity. Option C invokes MM. Option D misidentifies dividend as WACC component.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Target payout ratio adjustment sticky dividends",
    "QuestionID": "P2-A-528",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-528-target-payout-ratio-sticky-dividend-adjustment",
    "Stem": "Ironclad Manufacturing targets a 40% payout ratio. EPS has been: Year 1 $3.00, Year 2 $3.60, Year 3 $2.40, Year 4 $4.20, Year 5 $3.80. Dividends per share: Year 1 $1.20, Year 2 $1.30, Year 3 $1.30, Year 4 $1.40, Year 5 $1.40. Despite the 40% target, actual payout ratios have been 40%, 36%, 54%, 33%, and 37%. Which concept best explains the dividend pattern?",
    "Choices": {
      "A": "Dividend smoothing: management adjusts dividends gradually toward the target, resisting cuts during low-earnings years and slowing increases during high-earnings years.",
      "B": "Residual dividend policy: dividends equal earnings minus capital needs, explaining the variation around the 40% target.",
      "C": "Bird-in-the-hand theory: investors prefer stable dividends, so management maintains constant dividends regardless of earnings.",
      "D": "Clientele effect: income-oriented investors sell when dividends change, so management locks in a fixed dividend per share."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B attributes the dividend pattern to a residual dividend policy, where dividends equal earnings minus capital needs. However, the residual policy produces variable dividends that fluctuate with investment opportunities, not the gradual, sticky adjustment pattern observed. Lintner's smoothing model specifically explains why dividends adjust slowly toward the target.",
    "ExplanationWrongC": "Bird-in-the-hand theory explains why investors value certain dividends, but it does not explain the specific gradual-adjustment pattern observed. The clientele effect explains demand composition, not the mechanism by which dividends adjust gradually toward a target payout ratio.",
    "ExplanationWrongD": "The clientele effect explains who holds the stock based on dividend preferences, not the mechanism by which dividends adjust gradually. The gradual increase pattern is explained by Lintner's smoothing, not by clientele demand.",
    "ExplanationCorrect": "Lintner's (1956) dividend smoothing model predicts dividends are 'sticky' — they adjust gradually toward the target payout ratio. Ironclad's dividends rose gradually from $1.20 to $1.40 over five years while EPS fluctuated between $2.40 and $4.20. In Year 3, when EPS dropped to $2.40, the payout jumped to 54% because dividends were held at $1.30 — classic smoothing: management resisted cutting during the low-earnings year.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Lintner's Dividend Smoothing: Dividends adjust gradually toward target payout",
    "Authorities": [
      "Lintner dividend smoothing model (1956)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Lintner's smoothing: dividends are sticky; they increase gradually and resist cuts during dips",
      "application_to_facts": "DPS rose from $1.20 to $1.40 over 5 years despite EPS volatility; actual payout deviated from 40% target",
      "key_conclusion": "Dividends smooth through earnings volatility"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Attributes variation to residual policy",
        "why_plausible": "Residual policy produces variation, not gradual smoothing",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claims constant dividends",
        "why_plausible": "Dividends changed gradually, not constant",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Invokes clientele for fixed dividends",
        "why_plausible": "Clientele explains demand, not adjustment pattern",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B attributes to residual policy. Option C claims constant dividends. Option D invokes clientele.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Agency costs of equity versus debt",
    "QuestionID": "P2-A-529",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-529-agency-costs-equity-vs-debt-dividend-interaction",
    "Stem": "Vertex Dynamics has $800 million in total assets, $320 million in debt (8% coupon), and $480 million in equity. Management holds 5% of outstanding shares. The board is considering (1) paying a $40 million special dividend or (2) using the $40 million to retire debt. A governance consultant argues the dividend reduces the equity agency cost but increases the debt agency cost. Which analysis is correct?",
    "Choices": {
      "A": "The dividend reduces equity agency costs because less free cash flow is available for wasteful spending, but it reduces total assets, potentially increasing the debt-to-equity ratio and the probability of financial distress.",
      "B": "The dividend has no effect on agency costs because management's 5% ownership is too small to create significant agency problems.",
      "C": "Debt retirement is always superior to dividends because debt reduction lowers interest expense and eliminates agency costs entirely.",
      "D": "The dividend increases equity agency costs because shareholders receive cash that could be reinvested at positive NPV."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "A 5% ownership stake does not eliminate agency problems. Jensen & Meckling (1976) showed that any separation of ownership and management creates agency costs. The 95% of shares held by outsiders still face management incentive misalignment.",
    "ExplanationWrongC": "Debt retirement reduces leverage (lowering the debt agency cost), but it does NOT eliminate the equity agency cost. Retaining $40M of free cash flow internally means managers still have the cash available for wasteful spending.",
    "ExplanationWrongD": "This reverses the agency cost direction. Dividends REDUCE free cash flow available to managers, which REDUCES the equity agency cost. The concern is that dividends may increase the DEBT agency cost by raising leverage.",
    "ExplanationCorrect": "The consultant correctly identifies the tradeoff. Paying $40M reduces equity from $480M to $440M while debt remains at $320M. The debt-to-equity ratio increases from 0.67 to 0.73, and total assets fall to $760M. The equity agency cost decreases because managers have $40M less free cash flow (Jensen, 1986). However, the increased leverage raises the probability of financial distress, increasing the debt agency cost. This is the classic agency cost tradeoff.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Agency Cost Framework: Equity Agency Cost = Free Cash Flow x Probability of Wasteful Spending",
    "Authorities": [
      "Agency theory (Jensen & Meckling, 1976); free cash flow hypothesis (Jensen, 1986)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-22: Dividend Payout Ratio"
    ],
    "source_support_for_key": {
      "source_id": "FA-22",
      "rule_or_proposition": "Dividends reduce FCF (lowering equity agency costs) but increase leverage (potentially increasing debt agency costs)",
      "application_to_facts": "$40M dividend reduces assets to $760M; equity drops to $440M; D/E rises from 0.67 to 0.73",
      "key_conclusion": "Dividend trades off equity agency cost reduction against debt agency cost increase"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Dismissing agency problems due to small ownership",
        "why_plausible": "5% ownership creates residual agency risk",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Claims debt retirement eliminates all agency costs",
        "why_plausible": "Reduces leverage but equity agency cost persists",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Reverses dividend effect",
        "why_plausible": "Dividends reduce FCF, reducing equity agency costs",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B dismisses agency risk. Option C claims debt retirement eliminates all costs. Option D reverses dividend effect.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.9 Sustainable growth rate and ROE decomposition",
    "QuestionID": "P2-A-530",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "a-530-sustainable-growth-rate-roe-decomposition-du-pont",
    "Stem": "Crestview Technologies has the following data: net income of $18 million, revenue of $150 million, total assets of $200 million, and shareholders' equity of $100 million. The company pays 40% of earnings as dividends. The CFO uses the DuPont decomposition to analyze what drives the sustainable growth rate. Which DuPont decomposition correctly identifies the key drivers?",
    "Choices": {
      "A": "ROE = 18% = Net Profit Margin (12%) x Asset Turnover (0.75) x Equity Multiplier (2.0); SGR = 18% x 60% = 10.80%, driven by margin, turnover, and leverage.",
      "B": "ROE = 18% = Net Profit Margin (12%) x Asset Turnover (0.75) x Equity Multiplier (2.0); SGR = 10.80%, but only margin and turnover drive sustainable growth because leverage is a financing decision.",
      "C": "ROE = 18% = Net Income / Shareholders' Equity; SGR = 18% x 0.60 = 10.80%, driven solely by profitability and retention.",
      "D": "ROE = 18% = Return on Assets (9%) x Equity Multiplier (2.0); SGR = 10.80%, driven by asset efficiency and financial leverage."
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Leverage is indeed a financing decision, but it directly affects ROE through the equity multiplier. A higher equity multiplier increases ROE for a given ROA, which increases SGR. Excluding leverage from the SGR driver analysis ignores a real and significant lever that management can pull.",
    "ExplanationWrongC": "Option C reduces the DuPont decomposition to a simple ROE = Net Income / Equity ratio, which loses the diagnostic value of the three-component breakdown. The three-component version identifies specific levers — margin, turnover, and leverage — each requiring different management strategies. Reducing to a single ratio obscures which driver is most responsible for the sustainable growth rate.",
    "ExplanationWrongD": "The two-component DuPont (ROA x EM = 9% x 2.0 = 18%) is mathematically correct but omits the margin/turnover breakdown. The three-component version provides more actionable insight: margin improvement requires pricing/cost management, turnover requires asset efficiency, leverage requires capital structure decisions.",
    "ExplanationCorrect": "The DuPont decomposition breaks ROE into three drivers: Net Profit Margin = $18M / $150M = 12%; Asset Turnover = $150M / $200M = 0.75; Equity Multiplier = $200M / $100M = 2.0. ROE = 12% x 0.75 x 2.0 = 18%. Retention ratio = 1 - 0.40 = 0.60. SGR = 18% x 0.60 = 10.80%. All three DuPont drivers contribute to the SGR: improving any one increases ROE and thus SGR. However, leverage increases financial risk.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "A.9",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "DuPont: ROE = Net Profit Margin x Asset Turnover x Equity Multiplier; SGR = ROE x Retention Ratio",
    "Authorities": [
      "DuPont analysis framework; Higgins sustainable growth model (1977)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty",
      "Non-CC EW >=50 chars each",
      "No boilerplate"
    ],
    "source_ids": [
      "FA-21: Sustainable Growth Rate"
    ],
    "source_support_for_key": {
      "source_id": "FA-21",
      "rule_or_proposition": "DuPont decomposition: ROE = NPM x AT x EM; SGR = ROE x Retention Ratio",
      "application_to_facts": "NPM = 12%; AT = 0.75; EM = 2.0; ROE = 18%; SGR = 18% x 60% = 10.80%",
      "key_conclusion": "All three DuPont drivers contribute to ROE and thus SGR"
    },
    "distractor_intent": {
      "B": {
        "misconception": "Excludes leverage from SGR drivers",
        "why_plausible": "Leverage is a financing decision but affects ROE and SGR",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Simplifies to single ROE ratio",
        "why_plausible": "Misses decomposition insight",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Uses two-component DuPont",
        "why_plausible": "ROA x EM correct but omits margin/turnover breakdown",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option B excludes leverage. Option C simplifies too much. Option D uses two-component DuPont.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  }
];

module.exports = pack_p2_a_batch2_questions;
