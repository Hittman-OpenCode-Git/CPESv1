[
  {
    "QuestionID": "P2-B-546",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Modigliani-Miller Proposition I without taxes",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Meridian Capital Partners, an all-equity firm with a market value of $500 million, is considering restructuring to 40% debt. Under Modigliani-Miller Proposition I without taxes, what happens to Meridian's total firm value after the restructuring?",
    "Choices": {
      "A": "It remains $500 million because firm value is determined solely by operating assets and is independent of capital structure",
      "B": "It increases to $550 million because the lower-cost debt component reduces the weighted average cost of capital",
      "C": "It decreases to $450 million because the financial risk introduced by debt reduces overall firm value",
      "D": "It increases proportionally to the debt amount, reaching $833 million because leverage amplifies equity value"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Modigliani-Miller Proposition I (no taxes) states that the total value of a firm is independent of its capital structure. In a world with no taxes, no bankruptcy costs, and no agency costs, firm value is determined entirely by its real assets and the cash flows they generate. Shifting from 100% equity to 40% debt simply redistributes cash flows between debt and equity holders without changing the total pie. Meridian's value remains $500 million regardless of the debt-equity mix. The cost of equity increases with leverage to exactly offset the benefit of cheaper debt, keeping WACC constant.",
    "ExplanationWrongB": "This choice confuses M&M Proposition I with Proposition II. While adding lower-cost debt may seem to reduce WACC, M&M Proposition I (no taxes) shows the cost of equity rises by exactly enough to offset the debt benefit, leaving WACC and firm value unchanged. The firm value increase only occurs when corporate taxes create an interest tax shield.",
    "ExplanationWrongC": "Financial distress costs and the resulting value reduction are addressed by the trade-off theory, which extends M&M by adding bankruptcy costs. Under pure M&M Proposition I without taxes, there are no bankruptcy costs or financial distress effects to reduce firm value. The proposition assumes perfect capital markets.",
    "ExplanationWrongD": "This confuses the equity value per share with total firm value and misapplies leverage effects. While leverage can magnify returns to equity holders, it does not change total firm value under M&M Proposition I without taxes. The $833 million figure has no basis in the proposition.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember",
    "CalculationItem": false,
    "FormulaReference": "CB-05",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Confusing M&M with and without taxes",
    "EstimatedMinutes": 2,
    "ExplanationVersion": 1,
    "Tags": [
      "Modigliani-Miller",
      "capital structure",
      "Proposition I",
      "firm value"
    ],
    "distractor_intent": {
      "B": {
        "misconception": "Students may assume lower-cost debt automatically reduces WACC and increases firm value",
        "why_plausible": "In practice, adding cheap debt often does reduce WACC when taxes exist, creating availability bias",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may conflate real-world financial distress with M&M's perfect-market assumptions",
        "why_plausible": "Financial risk is a real concern, but M&M Proposition I abstracts from it entirely",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may confuse equity value magnification with total firm value change",
        "why_plausible": "Leverage does magnify equity returns, but total firm value is unchanged under M&M I",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Modigliani-Miller Proposition I (1958)"
    ],
    "source_support_for_key": {
      "A": "M&M Proposition I without taxes: V_L = V_U — firm value is invariant to capital structure in perfect markets",
      "B": "WACC remains constant under M&M I without taxes; cost of equity rises to offset cheaper debt",
      "C": "Financial distress costs are introduced by trade-off theory, not by pure M&M Proposition I",
      "D": "Leverage magnifies equity returns but does not change total firm value under M&M I"
    },
    "ExplanationWrongA": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-546-mm1-no-tax-firm-value",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice B assumes WACC falls with cheap debt (ignores cost-of-equity offset). Choice C introduces financial distress (trade-off theory, not pure M&M). Choice D conflates equity magnification with total firm value.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-547",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Trade-off theory of capital structure",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "CFO Laura Vasquez of Harborview Medical Devices is presenting the company's capital structure policy to the board. Harborview currently operates at 25% debt and is evaluating whether to increase leverage to 40%. Under the trade-off theory, which statement BEST describes the framework Vasquez should use?",
    "Choices": {
      "A": "Debt should be minimized at all times because any level of borrowing introduces unnecessary financial risk",
      "B": "The optimal capital structure balances the marginal tax shield benefit of debt against the marginal expected cost of financial distress",
      "C": "The firm should always prefer equity financing because it avoids all obligations to debtholders",
      "D": "Capital structure is irrelevant to firm value because investors can replicate any leverage decision on their own"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The trade-off theory posits that an optimal capital structure exists where the marginal benefit of an additional dollar of debt (the interest tax shield) equals the marginal cost (expected bankruptcy and financial distress costs). As Harborview increases debt from 25% to 40%, the tax shields provide increasing value, but the probability and expected cost of financial distress also rise. The optimal point is where these marginal forces balance. Below the optimum, the tax shield benefit exceeds the distress cost, so adding debt increases value. Above it, distress costs dominate.",
    "ExplanationWrongA": "Minimizing debt ignores the tax shield benefit entirely. The trade-off theory explicitly recognizes that debt provides value through interest tax deductibility. A firm that always minimizes debt leaves tax shield value on the table and operates below its optimal leverage ratio.",
    "ExplanationWrongC": "Preferring equity avoids financial distress but also forfeits the interest tax shield. The trade-off theory recognizes that a mix of debt and equity can create more value than an all-equity structure because debt interest is tax-deductible, reducing the firm's tax burden.",
    "ExplanationWrongD": "This is M&M Proposition I without taxes — not the trade-off theory. The trade-off theory explicitly builds on M&M by adding taxes and bankruptcy costs, concluding that capital structure IS relevant to firm value in the presence of these market imperfections.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "FormulaReference": "",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Confusing trade-off theory with M&M without taxes",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "trade-off theory",
      "tax shield",
      "bankruptcy costs",
      "optimal leverage"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may overemphasize financial risk and ignore the tax benefits of debt",
        "why_plausible": "Risk aversion is intuitive, but the trade-off theory explicitly weighs risk against tax benefits",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may think equity is always safer and therefore always preferable",
        "why_plausible": "Equity avoids fixed obligations, but the tax deductibility of interest makes debt valuable up to a point",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may apply M&M Proposition I without taxes to a trade-off theory question",
        "why_plausible": "M&M without taxes is a foundational concept, but the trade-off theory adds taxes and distress costs that make capital structure relevant",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Trade-off Theory (Kraus-Litzenberger, 1973)"
    ],
    "source_support_for_key": {
      "A": "Trade-off theory recognizes tax shield benefits — minimizing debt ignores this value source",
      "B": "Optimal leverage balances marginal tax shield benefit against marginal expected financial distress cost",
      "C": "Equity-only structure forfeits the interest tax shield, which is a key value driver in the trade-off framework",
      "D": "M&M without taxes makes capital structure irrelevant; trade-off theory adds taxes and distress costs, making it relevant"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-547-tradeoff-optimal-leverage",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A ignores tax shield benefits entirely. Choice C avoids all debt obligations but forfeits interest tax deductibility. Choice D applies M&M without taxes, ignoring the trade-off framework's addition of taxes and bankruptcy costs.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-548",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Pecking order theory",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "NorthStar Precision, a mid-size aerospace manufacturer, needs to raise $80 million for a new production facility. The firm currently has strong retained earnings. According to pecking order theory, which financing source should NorthStar use FIRST?",
    "Choices": {
      "A": "New equity issuance, because it provides the largest pool of available capital and avoids fixed obligations",
      "B": "Retained earnings, because internal financing avoids the adverse selection costs associated with issuing new securities",
      "C": "Subordinated debt, because it carries a lower interest rate than senior debt and preserves financial flexibility",
      "D": "Convertible bonds, because they combine the tax advantages of debt with the flexibility of equity conversion"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Pecking order theory (Myers-Majluf, 1984) states that firms prefer internal financing (retained earnings) first, then debt, and finally equity as a last resort. The ordering reflects information asymmetry: managers have superior information about firm value, and issuing equity signals that management believes the stock is overvalued. This adverse selection cost makes equity the most expensive source in terms of signaling. NorthStar, with strong retained earnings, should use internal funds first. If retained earnings are insufficient, the firm would then consider debt before equity.",
    "ExplanationWrongA": "Pecking order theory explicitly ranks equity as the LAST resort, not the first. New equity issuance carries the highest adverse selection cost because investors interpret it as a signal that management believes the stock is overvalued. The theory predicts firms avoid equity financing whenever possible.",
    "ExplanationWrongC": "Pecking order ranks debt above equity but below internal financing. The question asks for the FIRST source when retained earnings are available, which is internal financing. Subordinated debt would only be considered after retained earnings are exhausted.",
    "ExplanationWrongD": "Convertible bonds are still a form of external financing and carry adverse selection costs. Under pecking order theory, they would not be preferred over retained earnings. The conversion feature does not eliminate the information asymmetry problem at issuance.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "FormulaReference": "",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 14: Reversing the pecking order sequence",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "pecking order",
      "information asymmetry",
      "adverse selection",
      "financing hierarchy"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may think equity is preferred because it avoids fixed obligations",
        "why_plausible": "Equity flexibility is real, but pecking order ranks it last due to adverse selection costs",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may rank debt above equity but forget internal financing comes first",
        "why_plausible": "The debt-equity ordering is correct, but pecking order places retained earnings above both",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may see convertible bonds as a hybrid that bypasses the pecking order",
        "why_plausible": "Convertibles have appealing features but remain external financing subject to adverse selection",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Pecking Order Theory (Myers-Majluf, 1984)"
    ],
    "source_support_for_key": {
      "A": "Equity is ranked last in pecking order due to highest adverse selection cost",
      "B": "Retained earnings are the first choice because they avoid information asymmetry costs of external financing",
      "C": "Debt ranks second, but only after retained earnings are exhausted",
      "D": "Convertible bonds are external financing and carry adverse selection costs despite their hybrid nature"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-548-pecking-order-retained-earnings",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A ranks equity first (reverses pecking order). Choice C ranks debt above internal financing. Choice D treats convertibles as bypassing adverse selection (they do not).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-549",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 CAPM for cost of equity",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Cascade Manufacturing's CFO, Robert Tanaka, is computing the cost of equity for the firm's WACC calculation. Cascade's common stock has a beta of 1.4. The current risk-free rate on 10-year Treasury bonds is 3.0%, and the expected market risk premium is 6.0%. Using the Capital Asset Pricing Model, what is Cascade's cost of equity?",
    "Choices": {
      "A": "9.00% — the risk-free rate plus the market risk premium, ignoring the beta multiplier",
      "B": "10.20% — the risk-free rate plus the beta times the risk-free rate",
      "C": "11.40% — the risk-free rate plus the beta times the market risk premium",
      "D": "12.60% — the beta times the market return with no risk-free adjustment"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The Capital Asset Pricing Model (CAPM) formula is: R_e = R_f + β × (R_m − R_f). The market risk premium (R_m − R_f) is given directly as 6.0%. Substituting: R_e = 3.0% + 1.4 × 6.0% = 3.0% + 8.4% = 11.40%. The key is recognizing that the 6.0% is already the premium (excess return over the risk-free rate), not the market return itself. Using the premium directly avoids the common error of adding the risk-free rate twice.",
    "ExplanationWrongA": "This adds the risk-free rate and the market risk premium directly (3.0% + 6.0% = 9.00%), ignoring the role of beta in scaling the premium. CAPM requires multiplying the market risk premium by beta: R_e = R_f + β × (R_m − R_f). A beta of 1.4 amplifies the 6.0% premium to 8.4%, not 6.0%. Ignoring beta's scaling role significantly understates the cost of equity for above-market-risk firms.",
    "ExplanationWrongB": "This computes R_f + β × R_f = 3.0% + 1.4 × 3.0% = 7.20%, but the answer 10.20% suggests an arithmetic error. Regardless, multiplying beta by the risk-free rate has no basis in CAPM. The beta must be multiplied by the market risk premium.",
    "ExplanationWrongD": "This ignores the risk-free rate entirely and uses an incorrect formulation: β × R_m. CAPM requires the risk-free rate as the baseline return, with the risk premium added on top. Omitting the risk-free rate understates the required return for zero-risk investments.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "FormulaReference": "CB-04: Capital Asset Pricing Model (CAPM)",
    "DecisionTreeReference": "Cost of Capital",
    "CommonTrapReference": "Trap 10: Using market return instead of market risk premium",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "CAPM",
      "cost of equity",
      "beta",
      "market risk premium"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may multiply beta by total market return instead of the risk premium",
        "why_plausible": "The formula notation R_m can be confused with (R_m − R_f), especially when the premium is given directly",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may multiply beta by the risk-free rate, confusing the premium component",
        "why_plausible": "The risk-free rate appears in both the base and premium terms, creating substitution confusion",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may omit the risk-free rate, treating CAPM as a pure risk-loading model",
        "why_plausible": "The risk-free rate is sometimes overlooked when focus is on the beta and premium",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "CAPM (Sharpe, 1964; Lintner, 1965)",
      "CB-04 FORMULA_MASTER"
    ],
    "source_support_for_key": {
      "A": "CAPM multiplies beta by the market risk premium (R_m − R_f), not the total market return R_m",
      "B": "Beta must be multiplied by the market risk premium, not the risk-free rate",
      "C": "R_e = 3.0% + 1.4 × 6.0% = 11.40% — correct application of CAPM with the given premium",
      "D": "The risk-free rate is the required baseline return; omitting it understates the cost of equity"
    },
    "ExplanationWrongC": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-549-capm-cost-of-equity-calc",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A sums R_f + MRP without beta (9.00%). Choice B multiplies beta by R_f instead of MRP (10.20%). Choice D omits R_f entirely (12.60%).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-550",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Cost of debt after-tax adjustment",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Pinnacle Industries is issuing 10-year bonds with a yield to maturity of 7.5%. The firm's marginal corporate tax rate is 25%. What is the after-tax cost of debt that Pinnacle should use in its WACC calculation?",
    "Choices": {
      "A": "7.50% — the yield to maturity is the correct cost of debt before any tax adjustment",
      "B": "6.25% — the pre-tax cost multiplied by the tax rate",
      "C": "1.88% — the tax shield alone, calculated as the pre-tax cost times the tax rate",
      "D": "5.63% — the pre-tax cost multiplied by (1 minus the tax rate)"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "The after-tax cost of debt equals the pre-tax yield to maturity multiplied by (1 − t). Pinnacle's after-tax cost = 7.5% × (1 − 0.25) = 7.5% × 0.75 = 5.625%, rounded to 5.63%. The tax deductibility of interest payments reduces the effective cost of debt to the firm. This adjustment is applied in the WACC formula as: WACC = (E/V × R_e) + (D/V × R_d × (1 − t)). The YTM (7.5%) is used rather than the coupon rate because YTM reflects the current market-required return on the debt.",
    "ExplanationWrongA": "Using the pre-tax cost of debt in WACC ignores the interest tax shield. The after-tax adjustment is essential because interest payments are tax-deductible, reducing the effective cost to the firm. Omitting this adjustment overstates WACC and may lead to rejecting value-creating projects.",
    "ExplanationWrongB": "This multiplies the pre-tax cost by the tax rate (7.5% × 0.25 = 1.875%), yielding the tax shield amount, not the after-tax cost. The correct formula is R_d × (1 − t), not R_d × t.",
    "ExplanationWrongC": "This is the tax shield itself (7.5% × 0.25 = 1.875%), not the after-tax cost of debt. The after-tax cost is the pre-tax cost minus the tax shield: 7.5% − 1.875% = 5.625%.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "FormulaReference": "CB-07: Cost of Debt (After-Tax)",
    "DecisionTreeReference": "Cost of Capital",
    "CommonTrapReference": "Trap 10: Forgetting (1 − t) on cost of debt",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "after-tax cost of debt",
      "tax shield",
      "WACC",
      "yield to maturity"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may use the pre-tax cost directly, forgetting the tax deductibility of interest",
        "why_plausible": "The YTM is prominently stated, and the tax adjustment is easy to overlook under time pressure",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may multiply by the tax rate instead of (1 − tax rate)",
        "why_plausible": "The formula R_d × t gives the tax shield, a related but different quantity",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may report the tax shield instead of the after-tax cost",
        "why_plausible": "The tax shield is a meaningful intermediate calculation but not the final answer",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "CB-07 FORMULA_MASTER",
      "IRC §163 interest deductibility"
    ],
    "source_support_for_key": {
      "A": "Pre-tax cost ignores the interest tax shield — WACC requires after-tax cost of debt",
      "B": "R_d × t yields the tax shield, not the after-tax cost; the correct formula is R_d × (1 − t)",
      "C": "The tax shield (1.875%) is the amount saved, not the cost remaining after the shield",
      "D": "7.5% × (1 − 0.25) = 5.63% — correct after-tax cost of debt for WACC"
    },
    "ExplanationWrongD": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-550-after-tax-cost-of-debt",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A uses pre-tax YTM (7.50%). Choice B multiplies by tax rate yielding tax shield (6.25%). Choice C reports only the tax shield (1.88%).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-551",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Cost of preferred stock",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Greenfield Renewables plans to issue preferred stock with an annual dividend of $4.50 per share. The expected market price is $50.00 per share, and flotation costs are $5.00 per share. What is the cost of preferred stock for Greenfield's WACC?",
    "Choices": {
      "A": "10.00% — the annual dividend divided by the net proceeds per share",
      "B": "9.00% — the annual dividend divided by the market price before flotation costs",
      "C": "8.18% — the annual dividend divided by the market price minus flotation costs and taxes",
      "D": "11.11% — the annual dividend divided by the net proceeds, adjusted for the tax rate"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The cost of preferred stock is calculated as: R_p = D_p / P_p, where D_p is the annual dividend and P_p is the net proceeds per share (market price minus flotation costs). R_p = $4.50 / ($50.00 − $5.00) = $4.50 / $45.00 = 10.00%. Unlike debt, preferred stock dividends are NOT tax-deductible, so there is no (1 − t) adjustment. The net proceeds reflect the actual capital received after issuance costs.",
    "ExplanationWrongB": "This uses the gross market price ($50.00) instead of net proceeds ($45.00). Flotation costs reduce the capital the firm actually receives, so the cost of preferred stock must be computed on net proceeds. Ignoring flotation costs understates the true cost.",
    "ExplanationWrongC": "This incorrectly applies a tax adjustment to preferred stock. Preferred dividends are NOT tax-deductible — they are paid from after-tax income. The (1 − t) adjustment applies only to debt interest, not preferred dividends. This answer also miscomputes the denominator.",
    "ExplanationWrongD": "This applies a tax adjustment that does not exist for preferred stock. Preferred dividends are not tax-deductible, so there is no (1 − t) factor. The correct calculation is simply D_p / net proceeds without any tax adjustment.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "FormulaReference": "CB-06: Cost of Preferred Stock",
    "DecisionTreeReference": "Cost of Capital",
    "CommonTrapReference": "Trap 10: Applying tax shield to preferred stock dividends",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "preferred stock",
      "cost of capital",
      "flotation costs",
      "WACC component"
    ],
    "distractor_intent": {
      "B": {
        "misconception": "Students may forget to subtract flotation costs from the market price",
        "why_plausible": "Flotation costs are easily overlooked, especially when the market price is prominently stated",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may apply the (1 − t) tax adjustment to preferred stock as if it were debt",
        "why_plausible": "The tax adjustment is required for debt, and students may over-generalize it to all WACC components",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may believe preferred dividends receive tax treatment similar to debt interest",
        "why_plausible": "Both preferred stock and debt involve fixed payments, but only debt interest is tax-deductible",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "CB-06 FORMULA_MASTER"
    ],
    "source_support_for_key": {
      "A": "R_p = $4.50 / $45.00 = 10.00% — correct calculation using net proceeds",
      "B": "Using gross price ignores flotation costs, understating the true cost of preferred stock",
      "C": "Preferred dividends are not tax-deductible — no (1 − t) adjustment applies",
      "D": "No tax adjustment exists for preferred stock; the correct formula is D_p / net proceeds only"
    },
    "ExplanationWrongA": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-551-cost-preferred-stock",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice B ignores flotation costs (uses $50 instead of $45). Choice C applies incorrect tax adjustment to preferred dividends. Choice D applies non-existent tax adjustment to net proceeds.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-552",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 WACC calculation with preferred stock",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Summit Electronics needs to compute its weighted average cost of capital. The firm's capital structure consists of common equity (market value $60 million, cost of equity 14.75%), preferred stock (market value $10 million, cost of preferred 8.0%), and long-term debt (market value $30 million, pre-tax cost of debt 6.0%). Summit's marginal tax rate is 25%. What is Summit's WACC?",
    "Choices": {
      "A": "11.45% — weighting equity at 60%, preferred at 10%, and debt at 30%, using the pre-tax cost of debt",
      "B": "10.95% — weighting all components by market value but omitting preferred stock from the calculation",
      "C": "10.65% — weighting by book value proportions instead of market value",
      "D": "11.00% — weighting equity at 60%, preferred at 10%, and debt at 30%, using the after-tax cost of debt"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "WACC = (E/V × R_e) + (P/V × R_p) + (D/V × R_d × (1 − t)). Total value V = $60M + $10M + $30M = $100M. Weights: E/V = 60%, P/V = 10%, D/V = 30%. After-tax cost of debt = 6.0% × (1 − 0.25) = 4.50%. WACC = (0.60 × 14.75%) + (0.10 × 8.0%) + (0.30 × 4.50%) = 8.85% + 0.80% + 1.35% = 11.00%. The market value weights reflect the firm's current capital proportions, and the after-tax cost of debt incorporates the interest tax shield.",
    "ExplanationWrongA": "Using the pre-tax cost of debt (6.0%) instead of the after-tax cost (4.50%) overstates the WACC. The correct WACC with pre-tax debt would be (0.60 × 14.75%) + (0.10 × 8.0%) + (0.30 × 6.0%) = 8.85% + 0.80% + 1.80% = 11.45%. This is a classic WACC error — the interest tax shield must be incorporated.",
    "ExplanationWrongB": "Omitting preferred stock from the WACC calculation understates the true cost of capital. Preferred stock has a distinct cost (8.0%) and represents 10% of the capital structure. Ignoring it produces an incorrect WACC that does not reflect the firm's actual financing costs.",
    "ExplanationWrongC": "WACC should be calculated using market value weights, not book value. Book values reflect historical costs and may differ significantly from current market values. Using book values can produce a WACC that does not reflect the firm's true cost of capital at current market conditions.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "FormulaReference": "CB-05: Weighted Average Cost of Capital (WACC)",
    "DecisionTreeReference": "Cost of Capital",
    "CommonTrapReference": "Trap 10: Using pre-tax cost of debt in WACC",
    "EstimatedMinutes": 4,
    "ExplanationVersion": 1,
    "Tags": [
      "WACC",
      "cost of capital",
      "capital structure weights",
      "after-tax cost of debt"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may forget to apply the (1 − t) tax adjustment to the cost of debt",
        "why_plausible": "The pre-tax cost of debt is prominently stated and easy to use directly in the formula",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may omit preferred stock, treating the firm as all equity and debt",
        "why_plausible": "Preferred stock is a smaller component and may be overlooked in the calculation",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may use book value weights instead of market value weights",
        "why_plausible": "Book values are readily available from financial statements but do not reflect current market conditions",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "CB-05 FORMULA_MASTER"
    ],
    "source_support_for_key": {
      "A": "Pre-tax cost of debt overstates WACC by ignoring the interest tax shield",
      "B": "Omitting preferred stock understates the true cost of capital — all components must be weighted",
      "C": "Market value weights reflect current capital structure; book values may be outdated",
      "D": "WACC = (0.60 × 14.75%) + (0.10 × 8.0%) + (0.30 × 4.50%) = 11.00% using after-tax debt"
    },
    "ExplanationWrongD": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-552-wacc-with-preferred-stock",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A uses pre-tax cost of debt (11.45%). Choice B omits preferred stock entirely (10.95%). Choice C uses book value weights (10.65%).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-553",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Flotation costs and WACC",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Copper Ridge Mining is issuing new common stock to fund an expansion project. The stock's cost of equity (without flotation) is 14.0%, and the flotation costs on the new issue are 8% of the proceeds. The firm's capital structure is 60% equity and 40% debt (market values), with an after-tax cost of debt of 4.5%. What is Copper Ridge's WACC adjusted for flotation costs?",
    "Choices": {
      "A": "10.93% — the flotation-adjusted cost of equity is 15.22%, weighted at 60% with after-tax debt at 40%",
      "B": "10.08% — the unadjusted cost of equity (14.0%) weighted at 60% with after-tax debt at 40%",
      "C": "9.27% — the flotation cost is subtracted from the cost of equity before weighting",
      "D": "11.52% — the flotation cost is added as a separate component to the WACC"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "When a firm issues new equity, flotation costs increase the effective cost of equity. The flotation-adjusted cost of equity = R_e / (1 − f) = 14.0% / (1 − 0.08) = 14.0% / 0.92 = 15.22%. WACC = (0.60 × 15.22%) + (0.40 × 4.5%) = 9.13% + 1.80% = 10.93%. The question explicitly states the firm is issuing new common stock, so the flotation adjustment is required. The unadjusted WACC of 10.08% (Choice B) would only apply if the firm used retained earnings instead of issuing new shares.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This uses the unadjusted cost of equity (14.0%), which applies only when the firm uses retained earnings (internal equity). The stem specifies the firm is issuing new common stock, so flotation costs must be applied. The flotation-adjusted cost of equity is 14.0% / (1 − 0.08) = 15.22%, yielding a higher WACC of 10.93%.",
    "ExplanationWrongC": "This incorrectly subtracts the flotation cost percentage from the cost of equity (14.0% − 8% = 6.0%), which has no theoretical basis. Flotation costs reduce net proceeds, which increases the effective cost of equity — the adjustment is a division, not a subtraction.",
    "ExplanationWrongD": "Flotation costs are not a separate WACC component. They are incorporated by adjusting the cost of equity upward to reflect the reduced net proceeds from the new issue. Adding 8% as a separate component would double-count the flotation effect.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "FormulaReference": "CB-05: WACC; flotation cost adjustment: R_e / (1 − f)",
    "DecisionTreeReference": "Cost of Capital",
    "CommonTrapReference": "Trap 10: Subtracting flotation cost instead of dividing",
    "EstimatedMinutes": 5,
    "ExplanationVersion": 1,
    "Tags": [
      "flotation costs",
      "WACC",
      "cost of equity",
      "new issue"
    ],
    "distractor_intent": {
      "B": {
        "misconception": "Students may use the unadjusted cost of equity, ignoring the flotation adjustment for new issues",
        "why_plausible": "The pre-flotation cost is prominently stated, and the new-issue context may be overlooked",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may subtract the flotation percentage from the cost of equity",
        "why_plausible": "Subtraction is a simpler operation than division, creating a plausible but incorrect adjustment",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may treat flotation costs as a separate WACC component",
        "why_plausible": "Adding a new line item feels like a direct way to incorporate costs, but it double-counts the effect",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "CB-05 FORMULA_MASTER",
      "Flotation cost adjustment theory"
    ],
    "source_support_for_key": {
      "A": "Flotation-adjusted R_e = 14.0% / 0.92 = 15.22%; WACC = (0.60 × 15.22%) + (0.40 × 4.5%) = 10.93%",
      "B": "Unadjusted WACC (10.08%) applies only to retained earnings, not new equity issuance",
      "C": "Division by (1 − f), not subtraction, is the correct flotation adjustment",
      "D": "Flotation costs adjust the cost of equity, not as a separate WACC component"
    },
    "ExplanationWrongA": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-553-flotation-adjusted-wacc",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice B ignores flotation (uses unadjusted R_e for retained earnings). Choice C subtracts flotation instead of dividing. Choice D adds flotation as a separate WACC component.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-554",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Agency cost of debt versus equity",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Vanguard Industrial has a significant amount of outstanding debt and is considering a new project with higher-than-usual risk. The bondholders are concerned that shareholders may pursue risky projects that could increase equity value at the expense of debt holders. Which agency cost of debt does this scenario MOST closely describe?",
    "Choices": {
      "A": "The underinvestment problem, where shareholders reject positive-NPV projects because the benefits accrue primarily to bondholders",
      "B": "The asset substitution problem, where shareholders have an incentive to undertake riskier projects that could transfer wealth from bondholders to equity holders",
      "C": "The claim dilution problem, where issuing additional debt of equal priority reduces the value of existing bonds",
      "D": "The monitoring cost problem, where bondholders impose restrictive covenants that reduce the firm's operational flexibility"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "The asset substitution problem (also called risk-shifting) occurs when shareholders have an incentive to pursue riskier projects that could transfer wealth from bondholders to equity holders. The scenario explicitly describes this: Vanguard is considering a project with higher-than-usual risk, and bondholders are concerned that shareholders may pursue risky projects to increase equity value at their expense. When a firm is highly leveraged, equity holders have an option-like payoff — they capture the upside of risky projects while bondholders bear the downside risk. This misalignment of incentives is the classic asset substitution agency cost of debt.",
    "ExplanationWrongA": "The underinvestment problem involves shareholders REJECTING positive-NPV projects because the benefits would accrue primarily to bondholders (debt overhang). The scenario describes the opposite: shareholders pursuing riskier projects, not rejecting good ones. Underinvestment is about project rejection; asset substitution is about risk-seeking.",
    "ExplanationWrongC": "Claim dilution occurs when a firm issues additional debt with equal or higher priority, reducing the recovery rate for existing bondholders. The scenario describes risk-taking behavior related to project selection, not the issuance of additional debt.",
    "ExplanationWrongD": "Monitoring costs and restrictive covenants are mechanisms to mitigate agency costs, not the agency cost itself. Bondholder-imposed covenants are a response to agency problems, not the problem described in the scenario.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "FormulaReference": "",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Confusing asset substitution with underinvestment",
    "EstimatedMinutes": 4,
    "ExplanationVersion": 1,
    "Tags": [
      "agency costs",
      "underinvestment",
      "debt overhang",
      "bondholder equity conflict"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may confuse risk-seeking (asset substitution) with project rejection (underinvestment)",
        "why_plausible": "Both are agency costs of debt, but the scenario describes pursuing risky projects, not rejecting good ones",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may think the agency cost relates to issuing more debt",
        "why_plausible": "Claim dilution is a real agency cost but involves debt issuance, not project selection behavior",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may confuse agency costs with mechanisms to mitigate them",
        "why_plausible": "Covenants and monitoring are related concepts but are responses to, not examples of, the agency problem",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Agency Theory (Jensen-Meckling, 1976)"
    ],
    "source_support_for_key": {
      "A": "Underinvestment involves rejecting positive-NPV projects — the scenario describes risk-seeking, the opposite behavior",
      "B": "Asset substitution involves shareholders pursuing riskier projects to transfer wealth from bondholders — matches the scenario exactly",
      "C": "Claim dilution involves issuing additional debt, not project selection behavior",
      "D": "Monitoring costs are mitigation mechanisms, not the agency cost described in the scenario"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-554-asset-substitution-agency-cost",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A describes underinvestment (rejecting positive-NPV projects), the opposite of the scenario. Choice C describes claim dilution (issuing additional debt). Choice D describes monitoring costs (a mitigation mechanism, not the agency cost itself).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-555",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Target versus actual capital structure",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Sterling Logistics has a target capital structure of 50% equity and 50% debt based on market values. However, after a recent equity issuance, the actual capital structure shifted to 65% equity and 35% debt. For WACC estimation, which capital structure weights should Sterling use?",
    "Choices": {
      "A": "The actual weights of 65% equity and 35% debt, because they reflect the current market reality",
      "B": "The target weights of 50% equity and 50% debt, because WACC should reflect the firm's long-term optimal financing mix",
      "C": "An average of the target and actual weights to balance historical and current proportions",
      "D": "The book value weights, because they are more stable and verifiable than market values"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "For WACC estimation, the target capital structure weights should be used because WACC represents the firm's long-term marginal cost of capital. The target weights reflect the firm's optimal financing mix and the proportions it intends to maintain. Sterling's actual weights (65% equity, 35% debt) deviate from the target (50/50) due to a recent equity issuance, but this is a temporary fluctuation. Using target weights ensures the WACC estimate reflects the long-term financing policy rather than short-term market movements. The theoretical rationale is that WACC should be calculated at the point the firm plans to operate, not at a temporary deviation from that target.",
    "ExplanationWrongA": "Using actual weights captures a temporary fluctuation, not the firm's long-term financing policy. The recent equity issuance shifted actual weights away from the target, but this deviation is expected to correct over time as the firm rebalances.",
    "ExplanationWrongC": "A blended approach introduces subjectivity without theoretical support. The WACC is meant to represent the firm's long-term cost of capital, not a weighted average of historical and target proportions. Using target weights is the theoretically correct approach and avoids the ambiguity of choosing blending ratios.",
    "ExplanationWrongD": "Book value weights reflect historical costs and may differ substantially from both market values and target proportions. Market-based weights are preferred because they reflect current economic values and the firm's financing objectives.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "FormulaReference": "CB-05: WACC",
    "DecisionTreeReference": "Cost of Capital",
    "CommonTrapReference": "Trap 10: Using actual weights instead of target weights in WACC",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "target capital structure",
      "WACC weights",
      "market value weights",
      "capital structure policy"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may think current market weights always reflect the most relevant data",
        "why_plausible": "Current weights are observable and concrete, but they may reflect temporary deviations from the target",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may strictly follow the theoretical target-weight approach",
        "why_plausible": "Target weights are theoretically preferred, but a blended approach is practical during transitions",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may prefer book values for their stability and verifiability",
        "why_plausible": "Book values are audited and stable, but they do not reflect current market conditions or the firm's financing objectives",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "CB-05 FORMULA_MASTER",
      "WACC estimation best practices"
    ],
    "source_support_for_key": {
      "A": "Actual weights reflect temporary deviations, not the firm's long-term financing policy",
      "B": "Target weights reflect the optimal financing mix — WACC should be calculated at the target proportions",
      "C": "A blended approach lacks theoretical support and introduces subjective blending ratios",
      "D": "Book value weights do not reflect current market values or the firm's financing objectives"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-555-target-vs-actual-weights",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A uses actual (temporary) weights. Choice C blends target and actual (no theoretical basis). Choice D uses book value weights (historical, not market-based).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-556",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Trade-off theory — tax shield versus bankruptcy costs",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Redwood Technologies has no debt and is evaluating whether to issue $200 million in bonds to repurchase shares. The CFO estimates the present value of the interest tax shields at $50 million, while the expected present value of financial distress costs is $15 million. Under the trade-off theory, what is the NET effect on Redwood's firm value?",
    "Choices": {
      "A": "Firm value increases by $50 million because the tax shield is the dominant consideration in the trade-off theory",
      "B": "Firm value increases by $35 million because the net value is the tax shield benefit minus the expected distress costs",
      "C": "Firm value decreases by $15 million because financial distress costs always exceed the tax benefit",
      "D": "Firm value is unchanged because the tax shield and distress costs exactly offset each other"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Under the trade-off theory, V_L = V_U + PV(tax shields) − PV(distress costs). The net effect on firm value = $50M − $15M = $35M increase. Redwood's firm value would rise by $35 million, reflecting the tax shield benefit that exceeds the expected distress costs. This is the core insight of the trade-off theory: the optimal capital structure is found where the marginal tax benefit of debt equals the marginal expected distress cost, and at $35M net, the tax shield dominates.",
    "ExplanationWrongA": "This ignores the financial distress cost entirely. The trade-off theory considers BOTH the tax shield and distress costs. While the tax shield is positive, the $15 million distress cost reduces the net benefit to $35 million, not $50 million.",
    "ExplanationWrongC": "The scenario states PV(tax shields) = $50M and PV(distress costs) = $15M. The tax benefit exceeds the distress cost by $35 million. Claiming distress costs always exceed tax benefits contradicts the given data and the trade-off theory.",
    "ExplanationWrongD": "The tax shield and distress costs do not offset each other exactly. The tax shield ($50M) exceeds distress costs ($15M) by $35M, producing a net positive effect on firm value. Exact offset would require PV(tax shields) = PV(distress costs).",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "FormulaReference": "CB-05: WACC; Trade-off theory: V_L = V_U + PV(tax shields) − PV(distress costs)",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Ignoring one side of the trade-off",
    "EstimatedMinutes": 3,
    "ExplanationVersion": 1,
    "Tags": [
      "trade-off theory",
      "tax shield",
      "financial distress",
      "firm value"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may focus only on the tax benefit and ignore distress costs",
        "why_plausible": "The $50M tax shield is larger and more prominent, creating anchoring bias toward the benefit",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may correctly calculate the net but misinterpret the question's framing",
        "why_plausible": "The arithmetic is correct ($35M), but the question asks about the net effect considering both forces",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may assume distress costs always dominate or that the firm should avoid debt",
        "why_plausible": "Financial risk is salient, but the trade-off theory explicitly balances both forces",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Trade-off Theory (Kraus-Litzenberger, 1973)"
    ],
    "source_support_for_key": {
      "A": "Ignoring distress costs overstates the net benefit; the trade-off considers both forces",
      "B": "Net value = $50M tax shield − $15M distress cost = $35M increase in firm value",
      "C": "The data shows tax shield exceeds distress cost; distress costs do not always dominate",
      "D": "The forces do not exactly offset; the $35M net positive is the trade-off result"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-556-tradeoff-net-tax-shield",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A reports only the tax shield ($50M), ignoring distress costs. Choice C reports only distress costs ($15M) as a decrease. Choice D claims exact offset (zero net effect).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-557",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 EBIT-EPS indifference analysis",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Apex Chemicals is choosing between two financing alternatives for a $100 million expansion. Alternative 1 issues 5 million new shares at $20 each. Alternative 2 issues $100 million in bonds at 8% interest. Apex currently has 10 million shares outstanding and faces a 25% tax rate. At what EBIT level are the EPS figures for both alternatives equal?",
    "Choices": {
      "A": "$20 million — the EBIT level where the equity alternative begins to outperform debt",
      "B": "$24 million — the EBIT level where both alternatives produce identical earnings per share",
      "C": "$16 million — the EBIT level where the debt alternative begins to outperform equity",
      "D": "$32 million — the EBIT level where EPS under both alternatives equals $1.20"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "At the indifference point, EPS₁ = EPS₂. Alternative 1: shares = 10M + 5M = 15M, interest = $0. EPS₁ = EBIT(1 − 0.25) / 15M = 0.75 × EBIT / 15M. Alternative 2: shares = 10M, interest = $100M × 8% = $8M. EPS₂ = (EBIT − $8M)(1 − 0.25) / 10M = 0.75(EBIT − $8M) / 10M. Setting equal: 0.75 × EBIT / 15M = 0.75(EBIT − $8M) / 10M. Cancel 0.75: EBIT / 15M = (EBIT − $8M) / 10M. Cross-multiply: 10M × EBIT = 15M × (EBIT − $8M). 10EBIT = 15EBIT − $120M. $120M = 5EBIT. EBIT = $24M. At $24M: EPS₁ = $24M × 0.75 / 15M = $1.20; EPS₂ = ($24M − $8M) × 0.75 / 10M = $1.20.",
    "ExplanationWrongA": "At $20M EBIT, the equity alternative produces higher EPS. EPS₁ = $20M × 0.75 / 15M = $1.00; EPS₂ = ($20M − $8M) × 0.75 / 10M = $0.90. Equity is better at $20M, but this is below the indifference point of $24M.",
    "ExplanationWrongC": "At $16M EBIT, equity clearly outperforms debt. EPS₁ = $16M × 0.75 / 15M = $0.80; EPS₂ = ($16M − $8M) × 0.75 / 10M = $0.60. This is well below the indifference point, not a crossover threshold.",
    "ExplanationWrongD": "While both alternatives do produce EPS of $1.20 at the indifference point, the corresponding EBIT level is $24M, not $32M. At $32M EBIT: EPS₁ = $32M × 0.75 / 15M = $1.60; EPS₂ = ($32M − $8M) × 0.75 / 10M = $1.80. Debt clearly outperforms equity at $32M.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": true,
    "FormulaReference": "EBIT-EPS Indifference: EBIT* = [I₂ × N₁ − I₁ × N₂] / (N₁ − N₂)",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Forgetting to apply (1 − t) to both numerators",
    "EstimatedMinutes": 6,
    "ExplanationVersion": 1,
    "Tags": [
      "EBIT-EPS",
      "indifference analysis",
      "financing decision",
      "leverage"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may confuse below the indifference point with the crossover region",
        "why_plausible": "At $20M, equity is better, but the debt alternative begins outperforming at $24M",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may select the indifference point itself rather than the crossover threshold",
        "why_plausible": "The indifference point ($24M) is a prominent calculation, but the question asks where debt begins to outperform",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may verify the EPS but misstate the EBIT level",
        "why_plausible": "The $1.20 EPS is correct at the indifference point, but the EBIT is $24M, not $32M",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "EBIT-EPS Analysis Framework"
    ],
    "source_support_for_key": {
      "A": "At $20M EBIT, EPS₁ = $1.00 and EPS₂ = $0.90 — equity is better, not the debt crossover",
      "B": "At $24M, EPS₁ = EPS₂ = $1.20 — this is the indifference point where both alternatives produce identical EPS",
      "C": "At $16M, EPS₁ = $0.80 and EPS₂ = $0.60 — equity outperforms, not a crossover point",
      "D": "EPS of $1.20 is correct at the indifference point, but the corresponding EBIT is $24M, not $32M"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-557-ebit-eps-indifference-calc",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A is below the indifference point ($20M < $24M). Choice C is well below ($16M). Choice D states correct EPS but wrong EBIT level ($32M ≠ $24M).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-558",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 Optimal capital structure determination",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Executive summary: FivePoints Energy's CFO has compiled the following data for different debt ratios. At 0% debt, WACC is 12.0%. At 20% debt, WACC is 10.8%. At 40% debt, WACC is 10.2%. At 60% debt, WACC is 10.5%. At 80% debt, WACC is 11.8%. Based on this data, at which debt ratio does FivePoints achieve its optimal capital structure?",
    "Choices": {
      "A": "0% debt, because zero leverage eliminates all financial risk",
      "B": "20% debt, because the initial reduction in WACC from 12.0% to 10.8% is the largest single improvement",
      "C": "40% debt, because it produces the lowest WACC of 10.2%, maximizing firm value",
      "D": "80% debt, because the high interest tax shields provide the greatest tax benefit"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "The optimal capital structure is the debt ratio that minimizes WACC, which maximizes firm value. Among the given data points, 40% debt produces the lowest WACC at 10.2%. At lower debt ratios (0%, 20%), the firm has not fully exploited the tax shield benefit. At higher debt ratios (60%, 80%), the increasing probability and expected cost of financial distress cause WACC to rise. The U-shaped WACC curve is a hallmark of the trade-off theory: WACC initially falls as tax shields are captured, reaches a minimum at the optimal point, and then rises as distress costs dominate.",
    "ExplanationWrongA": "Zero debt forfeits all tax shields available through leverage. The data shows WACC declines from 12.0% at 0% debt to 10.2% at 40% debt, demonstrating that adding debt reduces the firm's cost of capital by capturing interest tax shields. Avoiding all leverage leaves value on the table.",
    "ExplanationWrongB": "While the improvement from 12.0% to 10.8% is large, the WACC continues to fall at 40% debt. The optimal point is where WACC is minimized, not where the marginal improvement is largest.",
    "ExplanationWrongD": "At 80% debt, WACC rises to 11.8%, nearly as high as the all-equity level. The excessive financial distress costs at this leverage level overwhelm the tax shield benefits.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "FormulaReference": "CB-05: WACC",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Confusing largest marginal improvement with minimum WACC",
    "EstimatedMinutes": 4,
    "ExplanationVersion": 1,
    "Tags": [
      "optimal capital structure",
      "WACC minimization",
      "trade-off theory",
      "U-shaped curve"
    ],
    "distractor_intent": {
      "B": {
        "misconception": "Students may confuse the largest marginal improvement with the optimal point",
        "why_plausible": "The 1.2% drop from 0% to 20% is the biggest single improvement, but WACC continues falling",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may correctly identify 40% but misstate the reasoning",
        "why_plausible": "40% is indeed the minimum WACC, making this a close distractor",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may think more debt always means more tax benefit",
        "why_plausible": "Tax shields increase with debt, but distress costs eventually dominate at high leverage",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Trade-off Theory (Kraus-Litzenberger, 1973)",
      "CB-05 FORMULA_MASTER"
    ],
    "source_support_for_key": {
      "A": "Zero debt forfeits all tax shields; WACC at 0% (12.0%) is higher than at 40% (10.2%)",
      "B": "The optimal point is minimum WACC, not the largest marginal improvement; 40% gives 10.2% vs 20% at 10.8%",
      "C": "40% debt produces the lowest WACC (10.2%), maximizing firm value per the trade-off theory",
      "D": "At 80% debt, WACC rises to 11.8% — distress costs overwhelm tax benefits at extreme leverage"
    },
    "ExplanationWrongC": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-558-optimal-capital-structure-wacc",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A chooses zero debt (forfeits tax shields). Choice B chooses largest marginal improvement, not minimum WACC. Choice D chooses maximum leverage (distress costs dominate).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-559",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 M&M propositions with versus without taxes",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "Consultant Michael Torres is advising Lakeview Precision on whether to add debt to its all-equity capital structure. Lakeview has an EBIT of $30 million, a corporate tax rate of 25%, and currently has 10 million shares outstanding at $40 per share. Torres needs to explain how the Modigliani-Miller propositions change when corporate taxes are introduced. Which statement correctly describes the effect of taxes on M&M Proposition I?",
    "Choices": {
      "A": "Firm value is still independent of capital structure because taxes affect all firms equally regardless of leverage",
      "B": "Firm value increases with debt because the interest tax shield creates value that does not exist in the no-tax world",
      "C": "Firm value decreases with debt because taxes reduce the cash flows available to all investors",
      "D": "Firm value is maximized at 100% debt because the interest tax shield provides unlimited value"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "M&M Proposition I with taxes states: V_L = V_U + T_c × D, where T_c is the corporate tax rate and D is the market value of debt. The interest tax shield (T_c × D) creates value because interest payments are tax-deductible, reducing the firm's tax burden. This value does not exist in the no-tax world. For Lakeview, if it issues $200 million in debt, the PV of the tax shield = 0.25 × $200M = $50 million, increasing firm value by that amount. Unlike M&M without taxes, capital structure IS relevant when taxes exist.",
    "ExplanationWrongA": "This confuses M&M Proposition I without taxes (where value is independent of structure) with the version with taxes. When corporate taxes exist, the interest tax shield creates value that is NOT available to an all-equity firm.",
    "ExplanationWrongC": "Taxes do reduce after-tax cash flows, but the interest tax shield partially offsets this by reducing the tax bill. Debt interest is deducted before taxes, while equity dividends are paid after taxes. This asymmetry means adding debt INCREASES the total cash flow available to investors.",
    "ExplanationWrongD": "While M&M Proposition I with taxes technically suggests firm value is maximized at 100% debt, this ignores financial distress costs that arise at high leverage levels. The trade-off theory extends M&M by adding bankruptcy costs.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "FormulaReference": "M&M Proposition I with taxes: V_L = V_U + T_c × D",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Applying M&M without taxes to a world with taxes",
    "EstimatedMinutes": 5,
    "ExplanationVersion": 1,
    "Tags": [
      "M&M with taxes",
      "interest tax shield",
      "firm value",
      "capital structure relevance"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may apply M&M without taxes to a scenario where taxes exist",
        "why_plausible": "M&M without taxes is the foundational proposition, and students may not adjust for the tax world",
        "tier_candidate": "distractor"
      },
      "C": {
        "misconception": "Students may think taxes uniformly reduce value regardless of financing",
        "why_plausible": "Taxes are a cost, but the interest deduction creates an asymmetric benefit for debt financing",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may take the M&M with-tax result to its logical extreme without considering distress costs",
        "why_plausible": "M&M with taxes does suggest more debt is better, but the trade-off theory limits this with bankruptcy costs",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "Modigliani-Miller Proposition I with Taxes (1963)"
    ],
    "source_support_for_key": {
      "A": "M&M without taxes makes value independent; with taxes, the tax shield creates value that depends on leverage",
      "B": "V_L = V_U + T_c × D — the interest tax shield adds value that does not exist in the no-tax world",
      "C": "The interest tax deduction reduces the firm's tax bill, increasing total investor cash flows",
      "D": "While M&M with taxes suggests unlimited debt value, trade-off theory adds distress costs that limit optimal leverage"
    },
    "ExplanationWrongB": "",
    "ItemStyle": "single-select",
    "UniqueConceptKey": "b-559-mm-with-taxes-proposition",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice A applies M&M without taxes (value independent). Choice C claims taxes reduce value with debt (ignores interest deduction). Choice D extends to 100% debt without distress costs (trade-off theory limitation).",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "QuestionID": "P2-B-560",
    "question_state": "Unprocessed",
    "Part": 2,
    "Section": "B",
    "Topic": "B.3 EBIT-EPS indifference — leverage decision evaluation",
    "LOSTag": "B.3",
    "Part2OnlyFlag": true,
    "Stem": "CFO Diane Kowalski of Meridian Foods must choose between issuing 4 million new shares at $25 each or $100 million in 7% bonds to fund a $100 million acquisition. Meridian currently has 8 million shares outstanding and pays a 30% corporate tax rate. Kowalski's projected EBIT from the acquisition is $20 million. Given the indifference EBIT of $21 million, which financing alternative should Kowalski recommend and why?",
    "Choices": {
      "A": "The equity alternative, because the projected EBIT of $20 million is below the indifference point, making equity the better EPS choice",
      "B": "The debt alternative, because the projected EBIT of $20 million is above the indifference point, making debt the better EPS choice",
      "C": "The equity alternative, because avoiding interest payments eliminates financial risk entirely",
      "D": "The debt alternative, because the 7% interest rate is lower than the firm's cost of equity"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "At the indifference EBIT of $21 million, both alternatives produce equal EPS. When projected EBIT ($20 million) is BELOW the indifference point, the equity alternative produces higher EPS because the fixed interest cost of the debt alternative is not offset by the leverage benefit. Equity EPS = $20M × (1 − 0.30) / (8M + 4M) = $14M / 12M = $1.17. Debt EPS = ($20M − $7M) × (1 − 0.30) / 8M = $9.1M / 8M = $1.14. Equity produces higher EPS ($1.17 > $1.14). Kowalski should recommend equity when projected EBIT falls below the indifference threshold.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "This incorrectly states that projected EBIT ($20M) is above the indifference point ($21M). In fact, $20M is BELOW $21M. Below the indifference point, the equity alternative produces higher EPS.",
    "ExplanationWrongC": "While equity does avoid interest payments, it does not eliminate financial risk entirely. Equity holders still face residual risk from the firm's operations. The correct rationale for choosing equity is the EPS comparison below the indifference point.",
    "ExplanationWrongD": "While the 7% interest rate may indeed be lower than the cost of equity, this comparison alone does not determine the optimal financing choice. The EBIT-EPS analysis accounts for both the cost differential and the leverage effect.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "FormulaReference": "EBIT-EPS Indifference Analysis",
    "DecisionTreeReference": "Capital Structure",
    "CommonTrapReference": "Trap 12: Confusing above/below the indifference point",
    "EstimatedMinutes": 6,
    "ExplanationVersion": 1,
    "Tags": [
      "EBIT-EPS",
      "financing decision",
      "leverage",
      "indifference analysis"
    ],
    "distractor_intent": {
      "A": {
        "misconception": "Students may correctly identify equity as better but select the wrong reasoning focus",
        "why_plausible": "The equity alternative is indeed better, but the explanation should emphasize the EPS comparison",
        "tier_candidate": "distractor"
      },
      "B": {
        "misconception": "Students may misread whether projected EBIT is above or below the indifference point",
        "why_plausible": "The comparison requires careful attention to the direction of the inequality",
        "tier_candidate": "distractor"
      },
      "D": {
        "misconception": "Students may use a simple cost comparison instead of the full EBIT-EPS framework",
        "why_plausible": "Comparing interest rate to cost of equity is intuitive but ignores the dilution effect of new shares",
        "tier_candidate": "distractor"
      }
    },
    "source_ids": [
      "IMA Learning Outcome B.3",
      "EBIT-EPS Analysis Framework"
    ],
    "source_support_for_key": {
      "A": "At $20M EBIT (below $21M indifference), equity EPS ($1.17) > debt EPS ($1.14) — equity is better",
      "B": "$20M is below, not above, the indifference point of $21M — the inequality direction is reversed",
      "C": "Equity avoids interest but does not eliminate all financial risk; the EPS comparison is the correct rationale",
      "D": "A simple cost comparison ignores share dilution; the full EBIT-EPS analysis is the correct decision framework"
    },
    "ItemStyle": "numeric",
    "UniqueConceptKey": "b-560-ebit-eps-leverage-decision",
    "BlueprintDomain": "Corporate Finance",
    "schema_version": "1.1",
    "uniqueness_note": "Choice B reverses the above/below inequality ($20M < $21M, not >). Choice C claims equity eliminates all financial risk (it does not). Choice D uses simple cost comparison instead of EBIT-EPS framework.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  }
]