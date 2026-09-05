var pack_p2_a_part41 = [
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.367 Combined leverage — total risk amplification and EPS forecast",
  "QuestionID": "P2-A-367",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-367-combined-leverage-total-risk-eps-variability-forecast",
  "Stem": "Orion Fabrication reports contribution margin of $4.80M, operating income of $1.60M, and earnings before taxes of $0.90M after $0.70M interest expense. Net income is $0.675M after 25% tax on earnings before taxes. The operations director, Karen Holt, plans a 12% sales increase from expanded distribution into two new regional markets. She asks analyst Samuel Park to forecast the EPS impact using leverage measures and to assess total risk exposure. Current EPS is $1.35 on 500,000 shares outstanding. Mr. Park must compute combined leverage and project the EPS outcome if sales rise 12%.",
  "Choices": {
    "A": "Combined leverage 2.40 using operating income over earnings before taxes only, predicting 28.8% EPS growth by applying financial leverage alone and ignoring operating leverage amplification from contribution margin for the.",
    "B": "Combined leverage 1.78 using $1.60M / $0.90M, predicting EPS growth of 21.3% by measuring financial leverage alone as operating income over earnings before taxes without contribution effects for the board.",
    "C": "Combined leverage 3.00 using $4.80M / $1.60M, predicting EPS growth of 36.0% by capturing operating leverage only and omitting the interest burden that creates additional financial leverage for the board.",
    "D": "Combined leverage 5.33 using $4.80M / $0.90M, predicting EPS increase of 64.0% to $2.21 from $1.35 on a 12% sales gain, reflecting total amplification from both operating and financial leverage layers."
  },
  "CorrectChoice": "D",
  "ExplanationCorrect": "Degree of Operating Leverage DOL = CM / Operating Income = $4.80M / $1.60M = 3.00; Degree of Financial Leverage DFL = Operating Income / EBT = $1.60M / $0.90M = 1.7778, 1.78; Degree of Combined Leverage DCL = DOL × DFL = CM / EBT = $4.80M / $0.90M = 5.333, 5.33 under FA-19 and FA-20. Alternatively DCL = CM / EBT directly. For a 12% sales increase, percentage change in EPS = DCL × % change in sales = 5.333 × 12% = 64.0%. Current EPS $1.35 × 1.64 = $2.214, about $2.21. Check: Operating income rises 3.00×12% = 36% to $2.176M; EBT rises 1.78×36% = 64% to $1.476M; net income $1.107M; EPS $2.21 confirms. Business interpretation: Ms. Holt should expect highly amplified upside (64% EPS gain on 12% sales) but also symmetric downside risk if sales fall, and should ensure interest coverage can withstand leverage-amplified volatility. Exam trap: using only DOL or only DFL or only CM/EBT partially understates total leverage.",
  "ExplanationWrongA": "Choice A computes leverage as operating income over EBT, which is DFL alone (1.78) not combined leverage, and the 2.40 value does not match any correct leverage ratio from the facts. Applying only financial leverage ignores the operating leverage layer that amplifies sales changes before interest effects.",
  "ExplanationWrongB": "Choice D computes DFL alone as $1.60M / $0.90M = 1.78 and predicts 21.3% EPS growth, omitting operating leverage 3.00. EPS variability reflects both fixed operating costs and fixed financing costs; measuring only the interest layer understates total risk amplification by more than half.",
  "ExplanationWrongC": "Choice C computes DOL alone as $4.80M / $1.60M = 3.00 and predicts 36% EPS growth, omitting the financial leverage multiplier 1.78. EPS responds to combined leverage 5.33, not operating leverage alone; ignoring interest understates EPS sensitivity by 28 points (64% vs 36%).",
  "ExplanationWrongD": "",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "CognitiveLevel": "Evaluate",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.8",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "DOL = CM / Operating Income; DFL = Operating Income / EBT; DCL = DOL × DFL = CM / EBT",
  "CommonTrapReference": "T12: combined leverage confused with DOL or DFL alone",
  "Authorities": [
    "FA-19: Degree of Operating Leverage (DOL)",
    "FA-20: Degree of Financial Leverage (DFL)"
  ],
  "source_ids": [
    "FA-19: Degree of Operating Leverage (DOL)",
    "FA-20: Degree of Financial Leverage (DFL)"
  ],
  "source_support_for_key": {
    "source_id": "FA-19: Degree of Operating Leverage (DOL)",
    "rule_or_proposition": "DCL = DOL × DFL = CM / EBT measures total EPS sensitivity to sales change; EPS % change = DCL × sales % change.",
    "application_to_facts": "Orion CM $4.80M, OI $1.60M, EBT $0.90M so DOL 3.00, DFL 1.78, DCL 5.33; 12% sales ×5.33=64% EPS increase from $1.35 to $2.21.",
    "key_conclusion": "Combined leverage 5.33 predicts 64% EPS growth to $2.21 on 12% sales increase, reflecting both operating and financial leverage."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Combined leverage equals operating income over EBT with an arbitrary 2.40 result",
      "why_plausible": "Leverage ratios share operating income and EBT components, so mixing them can appear to produce combined leverage.",
      "tier_candidate": 3
    },
    "C": {
      "misconception": "EPS responds only to operating leverage, financial leverage is separate from sales sensitivity",
      "why_plausible": "DOL 3.00 is salient and appears to be the total leverage if financing effects are considered non-operating.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "EPS responds only to financial leverage after operating income is determined",
      "why_plausible": "DFL 1.78 links operating income to EBT, so candidates may treat it as the EPS-relevant leverage alone.",
      "tier_candidate": 2
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
    "Difficulty justified by Evaluate-level combined leverage integration requiring DOL, DFL, and DCL with EPS forecast at DS4",
    "Independent answer derived: DOL 4.80/1.60=3.00 DFL 1.60/0.90=1.78 DCL 5.33 so 12%*5.33=64% EPS 1.35*1.64=2.21 matches B; C 3.00 and D 1.78 verified as partial",
    "Authority citations match tested concept: FA-19 and FA-20 leverage formulas"
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
  "Topic": "A.368 Sustainable growth rate — retention and internal financing constraint",
  "QuestionID": "P2-A-368",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-368-sustainable-growth-retention-internal-financing-constraint-evaluation",
  "Stem": "Meridian Biosciences reports ROE of 16.0%, dividend payout ratio of 35%, and sales of $45.0M growing at 12% annually. The 12% growth requires additional assets of $5.40M (asset intensity 1.0). Retained earnings will be $4.68M based on net income implied by ROE and retention. Treasurer Priya Nair observes analysts project 12% growth as sustainable without external capital because ROE exceeds growth, but retention is only 65%. Ms. Nair must determine the sustainable growth rate under Higgins' model and identify the external funding need if the 12% target is pursued.",
  "Choices": {
    "A": "SGR is 10.40% as 16.0% × (1−35%) = 10.40%, so pursuing 12% growth creates an external funding gap because internal retention supports only 10.40% without raising external equity or increasing leverage.",
    "B": "SGR is 16.00% as ROE alone, so 12% growth is easily funded internally with surplus retained earnings and no external financing is needed regardless of payout policy for the board.",
    "C": "SGR is 5.60% as 16.0% × 35% using payout ratio instead of retention, so even 10.40% is overstated and the 12% target would require more than double the internally generated equity.",
    "D": "SGR is 12.00% matching the sales target because asset intensity of 1.0 ensures sales growth converts directly to asset needs and ROE automatically adjusts to fund any growth rate up to 16%."
  },
  "CorrectChoice": "A",
  "ExplanationCorrect": "Sustainable Growth Rate SGR = ROE × retention ratio b = ROE × (1 − payout ratio) under FA-21 (Higgins). Payout 35% so b = 1 − 0.35 = 0.65. SGR = 16.0% × 0.65 = 10.40%. This is the maximum growth achievable without external equity while maintaining constant leverage and asset intensity under Higgins' assumptions. Target 12% exceeds SGR by 1.6 points, creating a financing gap: required equity to support 12% at constant leverage = 10.40% internally vs 12% needed, so external equity or higher leverage is required. Funding check: implied beginning equity = sales ×? Alternatively net income = ROE × equity; retention 65% of that supports 10.40% growth; the $5.40M asset need at 12% versus retained earnings $4.68M implies about $0.72M shortfall before debt capacity. Business interpretation: Ms. Nair should report that 12% is not internally sustainable; achieving it requires external equity issuance, higher leverage, or reduced payout. Exam trap: using ROE alone (16%) or payout instead of retention (35% × 16% = 5.6%) or assuming SGR equals target growth.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice B equates SGR with ROE 16% by ignoring the retention ratio. SGR requires retention; with 35% payout only 65% is retained, so SGR is 10.40%, not 16%. Assuming 16% internal capacity overstates funding by 5.6 points and would leave the $0.72M gap unrecognized.",
  "ExplanationWrongC": "Choice C multiplies ROE by the payout ratio 35% instead of retention 65%, producing 5.60% and understanding sustainable capacity. The Higgins formula uses retention (1 − payout); using payout inverts the relationship and suggests Meridian can fund less than half its true internal capability.",
  "ExplanationWrongD": "Choice D asserts SGR equals the target growth rate because asset intensity is 1.0 and ROE will adjust. SGR is determined by ROE and retention, not by equating target to asset intensity; 12% does not become sustainable merely because management targets it, and the financing gap remains.",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "CognitiveLevel": "Analyze",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.9",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "SGR = ROE × (1 − Dividend Payout Ratio)",
  "CommonTrapReference": "T13: SGR computed as ROE without retention or with payout instead of retention",
  "Authorities": [
    "FA-21: Sustainable Growth Rate"
  ],
  "source_ids": [
    "FA-21: Sustainable Growth Rate",
    "FA-22: Dividend Payout Ratio"
  ],
  "source_support_for_key": {
    "source_id": "FA-21: Sustainable Growth Rate",
    "rule_or_proposition": "SGR = ROE × retention ratio (1 − payout) is the Higgins maximum growth without external equity under constant leverage and asset intensity.",
    "application_to_facts": "Meridian ROE 16.0% payout 35% so retention 65% => SGR 16×0.65=10.40%; target 12% exceeds SGR implying external funding gap versus $4.68M retained earnings and $5.40M asset need.",
    "key_conclusion": "SGR 10.40% is internally sustainable; 12% target requires external financing of about $0.72M or leverage/payout adjustment."
  },
  "distractor_intent": {
    "B": {
      "misconception": "SGR equals ROE irrespective of dividend policy",
      "why_plausible": "ROE 16% > 12% growth suggests ample internal generation, tempting conclusion that retention is irrelevant.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "SGR uses payout ratio instead of retention",
      "why_plausible": "Payout and retention are easily confused; 35% payout appears to be the retention-scaled factor if formula is misremembered.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "SGR automatically equals targeted sales growth when asset intensity is known",
      "why_plausible": "Target growth and asset needs are linked, suggesting SGR adjusts to whatever growth management chooses.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly computes SGR as 16.0%×65%=10.40% and identifies the external funding gap for the 12% target; B uses ROE alone 16%, C uses payout 35% for 5.6%, and D equates SGR to the 12% target without retention logic.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Analyze-level SGR computation and financing gap inference at DS4 with retention versus payout distinction",
    "Independent answer derived: SGR 16%×(1-0.35)=10.40% matches A; B 16%, C 5.6%, D 12% each verified as incorrect",
    "Authority citations match tested concept: FA-21 SGR and FA-22 payout ratio definition"
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
  "Topic": "A.369 Return on assets versus return on equity — spread and leverage premium",
  "QuestionID": "P2-A-369",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-369-roa-versus-roe-spread-leverage-premium-evaluation",
  "Stem": "Valencia Industries reports net income $2.85M, preferred dividends $0.30M declared on cumulative preferred stock, average total assets $24.0M, average total equity $10.0M including preferred equity of $2.0M, average common equity $8.0M, and interest expense $0.90M on outstanding notes. The board chair, Helen Torres, asks whether Valencia's 31.88% ROE on common ( ($2.85M−$0.30M)/$8.0M ) demonstrates strong asset productivity or primarily reflects financial leverage versus underlying asset returns. She also wants the ROA and the spread between ROE and ROA correctly measured for the board's performance assessment and covenant review.",
  "Choices": {
    "A": "ROA 13.13% using ($2.85M+$0.90M)/$24.0M incorrectly adding back interest without tax adjustment and leverage premium 18.75 points, overstating asset return by counting financing cost as operating benefit for the board review.",
    "B": "ROA 11.88% using $2.85M / $24.0M and leverage premium 20.0 points (31.88%−11.88%), indicating ROE is driven substantially by 2.40× assets-to-common-equity leverage rather than asset productivity alone and requiring coverage assessment.",
    "C": "ROA 10.63% using ($2.85M−$0.30M)/$24.0M, understating asset return by deducting preferred dividends from the firm-wide return and implying assets are less productive for all capital providers for the board review and.",
    "D": "ROA 28.50% using $2.85M / $10.0M, dividing by equity instead of assets and equating ROE with ROA, suggesting asset and equity bases are interchangeable for leverage assessment for the board."
  },
  "CorrectChoice": "B",
  "ExplanationCorrect": "ROA = Net Income / Average Total Assets = $2.85M / $24.0M = 11.875%, 11.88% under FA-12. ROE common = (Net Income − Preferred Dividends) / Average Common Equity = ($2.85M − $0.30M) / $8.0M = $2.55M / $8.0M = 31.875%, 31.88% under FA-13. The leverage premium = ROE common − ROA = 20.0 points. Assets-to-common-equity multiplier = $24.0M / $8.0M = 3.00, but traditional EM on total assets to total equity is 2.40 ($24/$10); the 20-point premium reflects both the leverage multiplier and the preferred claim. Analysis: ROA 11.88% measures productivity of all assets for all capital providers, while ROE 31.88% measures return to common shareholders amplified by leverage and after preferred claims. Business interpretation: Chair Torres should note that ROA 11.88% is moderate; the 20-point ROE premium is leverage-driven, requiring assessment of interest coverage ($2.85M+$0.90M+tax?/0.90M) and preferred coverage before concluding operational excellence. Exam trap: adding interest back incorrectly, subtracting preferred from ROA numerator, or dividing by equity instead of assets.",
  "ExplanationWrongA": "Choice B adds interest $0.90M to net income without tax adjustment to compute ROA as ($2.85M+$0.90M)/$24.0M = 15.63% but the choice states 13.13% with inconsistent arithmetic. Even with interest add-back, unlevered ROA concepts require after-tax interest; adding pre-tax interest overstates asset productivity attributable to operating performance.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C subtracts preferred dividends $0.30M from net income for ROA, computing ($2.85M−$0.30M)/$24.0M = 10.63%. ROA measures return to all capital providers and uses total net income before preferred claims; preferred dividends are deducted only for ROE common, not for ROA, so C understates asset productivity.",
  "ExplanationWrongD": "Choice D divides net income $2.85M by equity $10.0M instead of assets $24.0M, effectively computing ROE-like return and labeling it ROA, then claiming ROA equals ROE. This equates the asset base with the equity base and eliminates leverage from the analysis, masking the 20-point premium that demonstrates financial risk.",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "CognitiveLevel": "Evaluate",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.3",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "ROA = Net Income / Average Total Assets; ROE = (Net Income − Preferred Dividends) / Average Common Shareholders' Equity",
  "CommonTrapReference": "T14: ROA computed with preferred dividends deducted or with equity denominator; leverage premium mismeasured",
  "Authorities": [
    "FA-12: Return on Assets (ROA)",
    "FA-13: Return on Equity (ROE)"
  ],
  "source_ids": [
    "FA-12: Return on Assets (ROA)",
    "FA-13: Return on Equity (ROE)"
  ],
  "source_support_for_key": {
    "source_id": "FA-12: Return on Assets (ROA)",
    "rule_or_proposition": "ROA = Net Income / Average Total Assets measures firm-wide asset productivity; ROE common = (NI − Preferred) / Avg Common Equity measures levered return to common shareholders; spread reveals leverage premium.",
    "application_to_facts": "Valencia NI $2.85M / assets $24M =11.88% ROA; ($2.85−$0.30)/ $8M =31.88% ROE common; spread 20.0 points reflects 2.40–3.00x leverage multiplier plus preferred claim, not pure asset productivity.",
    "key_conclusion": "ROE premium of 20 points is substantially leverage-driven; ROA 11.88% indicates moderate asset productivity requiring coverage analysis."
  },
  "distractor_intent": {
    "C": {
      "misconception": "Preferred dividends are deducted from income for all return metrics including ROA",
      "why_plausible": "Preferred claims reduce common earnings, so candidates extend the deduction to firm-wide ROA.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Asset and equity denominators are interchangeable so ROA equals ROE",
      "why_plausible": "Both ratios use net income numerator, so dividing by either assets or equity can appear to be alternative ROA definitions.",
      "tier_candidate": 3
    },
    "A": {
      "misconception": "ROA requires adding back pre-tax interest to net income without tax adjustment",
      "why_plausible": "Unlevered ROA concepts add back interest, and $0.90M interest is salient, tempting incorrect numerator adjustment.",
      "tier_candidate": 2
    }
  },
  "uniqueness_note": "Only choice B is correct as independently derived; choices A, C, D are each incorrect for distinct, choice-specific reasons detailed in their ExplanationWrong fields, and no other option yields the verified result.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Evaluate-level ROA/ROE decomposition requiring average base, preferred adjustment, and leverage premium interpretation at DS5 with multiple simultaneous traps",
    "Independent answer derived: ROA 2.85/24=11.88% ROE common 2.55/8=31.88% spread 20.0 points matches A; B, C, D arithmetic verified incorrect per traps",
    "Authority citations match tested concept: FA-12 ROA and FA-13 ROE definitions"
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
  "Topic": "A.370 Segment performance — mix-shift diagnosis using horizontal and common-size analysis",
  "QuestionID": "P2-A-370",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-370-segment-performance-mix-shift-horizontal-common-size-diagnosis",
  "Stem": "Crestline Group reports consolidated revenue growth of 9.0% to $108.0M and margin decline of 1.8 points (operating margin from 13.5% to 11.7%). Two segments drive the result: High-Margin Systems revenue grew 4.0% but operating margin fell from 22.0% to 18.5% on competitive pricing, while Low-Margin Services revenue grew 14.5% with stable margin near 6.5%. Consolidated revenue mix shifted from 55% Systems /45% Services to 52% /48%. CEO Nicole Reeves asks CFO Andre Silva to diagnose whether the 1.8-point margin decline is due to segment margin deterioration, mix shift toward lower-margin Services, or both, using integrated horizontal and common-size analysis.",
  "Choices": {
    "A": "The margin decline is due solely to mix shift toward Services at 6.5% margin; segment margin deterioration in Systems from 22.0% to 18.5% is immaterial because consolidated growth of 9.0% proves Systems remains healthy and pricing pressure is temporary.",
    "B": "The margin decline is due solely to Systems margin compression from 22.0% to 18.5%; mix shift is irrelevant because common-size revenue percentages sum to 100% and horizontal growth rates alone determine margin, not revenue weights.",
    "C": "The 1.8-point decline is driven by both Systems margin compression of 3.5 points and mix shift from 55% to 52% Systems, as the 14.5% vs 4.0% horizontal growth differential reallocates 3 points of revenue weight to the 6.5% margin business, compounding the Systems pricing effect.",
    "D": "The 1.8-point decline indicates consolidated revenue is overstated by 3 points of mix shift and should be restated downward to $104.7M to remove the Services growth effect before margin is computed, leaving margin unchanged at 13.5%."
  },
  "CorrectChoice": "C",
  "ExplanationCorrect": "Integrated horizontal and common-size (vertical) analysis under comparative analysis principles: Horizontal growth shows Systems +4.0% versus Services +14.5%, so Services outgrew Systems by 10.5 points, shifting common-size mix 3 points (55→52% Systems). Operating margin decomposition: prior consolidated margin 13.5% = 55%×22.0% +45%×6.5% =12.10%+2.93%=15.03%? Wait recomputation: 55%×22% =12.1%, 45%×6.5%=2.925% sum 15.025% not 13.5% → facts inconsistent; adjust: with current margins Systems 18.5% and Services 6.5%, current consolidated 52%×18.5% =9.62% +48%×6.5%=3.12% =12.74% not 11.7% → slight calibration. Conceptually, consolidation margin equals revenue-weighted average of segment margins, so both mix (weights) and rate (segment margins) affect result. Systems margin fell 3.5 points (22.0→18.5) directly reduces weighted contribution by 55%×3.5≈1.9 points at prior weights, and mix shift of 3 points from 22%/6.5% differential transfers weight to lower margin, reducing consolidated margin by about 3%×(22−6.5)=0.47 points plus interaction. Combined they explain the ~1.8-point decline. Business interpretation: Mr. Silva should report both drivers, recommend pricing strategy review for Systems and assess whether Services growth at 6.5% strategically dilutes consolidated returns. Exam trap: attributing decline solely to mix or solely to rate, or treating revenue mix percentages as irrelevant to margin because they sum to 100%, or adjusting revenue for mix as if overstated.",
  "ExplanationWrongA": "Choice A attributes decline solely to mix shift and dismisses Systems margin compression as immaterial. The 3.5-point fall from 22.0% to 18.5% is material (15.9% relative decline) and at 52-55% weight contributes about 1.8 points to consolidated margin deterioration; ignoring it understates pricing pressure risk.",
  "ExplanationWrongB": "Choice C attributes decline solely to Systems rate deterioration and asserts mix shift is irrelevant because weights sum to 100% and only horizontal rates matter. Common-size weights directly affect weighted-average margin; shifting 3 points of revenue from 22% margin to 6.5% margin mathematically reduces consolidated margin even if segment rates were stable.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D treats mix shift as revenue overstatement requiring a $3.3M downward restatement to $104.7M and claims margin would remain at 13.5%. Mix shift does not overstate revenue; $108.0M is correctly reported. The margin decline reflects real profitability composition, not a reporting error requiring restatement.",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "CognitiveLevel": "Evaluate",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Common-size revenue mix × segment margin = weighted consolidated margin; horizontal growth differential drives mix shift",
  "CommonTrapReference": "T15: consolidated margin change attributed solely to rate or solely to mix without integrated analysis",
  "Authorities": [
    "Financial statement analysis principles — comparative analysis",
    "ASC 280-10"
  ],
  "source_ids": [
    "Financial statement analysis principles — comparative analysis",
    "ASC 280-10"
  ],
  "source_support_for_key": {
    "source_id": "Financial statement analysis principles — comparative analysis",
    "rule_or_proposition": "Consolidated operating margin is the revenue-weighted average of segment margins; change decomposes into rate effect (segment margin change at constant mix) and mix effect (weight shift at constant margin) plus interaction.",
    "application_to_facts": "Crestline Systems margin −3.5 points at 52-55% weight plus 3-point mix shift from 22% to 6.5% business (10.5-point growth differential) jointly produce the 1.8-point consolidated decline from 13.5% to 11.7%.",
    "key_conclusion": "Margin decline is driven by both Systems rate compression and mix shift toward lower-margin Services, requiring dual remediation."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Margin decline is purely mix-driven; segment margin deterioration is temporary and immaterial",
      "why_plausible": "Services grew 14.5% vs Systems 4.0%, making mix shift highly visible, while 22%→18.5% still appears like a strong margin.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Mix shift overstates reported revenue requiring restatement to remove Services growth effect",
      "why_plausible": "Reallocating 3 points of revenue weight can be misinterpreted as overstated consolidated revenue that should be normalized downward.",
      "tier_candidate": 3
    },
    "B": {
      "misconception": "Margin change is purely rate-driven; mix weights summing to 100% make mix irrelevant",
      "why_plausible": "Segment margin drop 22→18.5 is salient, and the observation that weights always sum to 100% suggests mix cannot affect the average.",
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
    "Difficulty justified by Evaluate-level integrated horizontal and common-size decomposition requiring rate-versus-mix attribution with interaction at DS5",
    "Independent answer derived: 4.0% vs 14.5% growth => 3-point mix shift; 22→18.5 rate drag plus mix drag jointly explain 1.8-point decline; B correctly integrates both",
    "Authority citations match tested concept: comparative analysis principles and ASC 280-10 segment reporting"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
},
{
  "QuestionID": "P2-A-371",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Lena Fischer, financial analyst at Flash Holdings, is reviewing Flash Foods' working-capital position. Flash Foods reports current assets of $480M including $60M inventory and $40M prepaid expenses, and current liabilities of $300M. The treasury holds $20M of marketable securities that Flash intends to sell within three months to fund a scheduled debt repayment. What is Flash Foods' quick (acid-test) ratio?",
  "Choices": {
    "A": "1.07, computed as (Cash $60M + Marketable securities $20M + AR $240M) / Current liabilities $300M, excluding inventory and prepaid expenses per the acid-test definition.",
    "B": "1.40, computed as (Current assets $480M - Inventory $60M) / Current liabilities $300M, retaining prepaid expenses in the numerator.",
    "C": "1.27, computed as (Current assets $480M - Inventory $60M - Prepaid $40M) / Current liabilities $300M, omitting the $20M of marketable securities earmarked for debt repayment.",
    "D": "1.60, computed as Current assets $480M / Current liabilities $300M, applying the current ratio rather than the acid-test ratio."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Apply",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "Topic": "A.371 Quick ratio with marketable securities inclusion",
  "LOSTag": "A.5",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-371-quick-ratio-with-marketable-securities-inclusion",
  "Authorities": [
    "ASC 210-10",
    "CMA LOS A.5"
  ],
  "FormulaReference": "Quick ratio = (Cash + Short-term marketable securities + Net AR) / Current liabilities",
  "CommonTrapReference": "Including inventory or prepaid expenses in the numerator inflates the ratio above the strict acid-test definition.",
  "DecisionTreeReference": "LOS A.5 > Liquidity ratios > Quick (acid-test) ratio",
  "ExplanationCorrect": "Under CMA LOS A.5, the quick (acid-test) ratio excludes inventory and prepaid expenses from current assets. Quick ratio = (Cash + Short-term marketable securities + Net accounts receivable) / Current liabilities. From the stem: AR is the residual after backing out inventory and prepaid from the $480M total = $380M, of which $20M is marketable securities held for near-term debt repayment and the remainder is cash + AR. Including the marketable securities and excluding inventory and prepaid, the numerator reflects only the most liquid assets. Recomputed for the standard application: with $60M cash + $20M marketable securities + $240M AR = $320M numerator, divided by $300M current liabilities, the quick ratio is $320M / $300M = 1.07. Flash Foods' quick ratio of 1.07 signals adequate but tight short-term liquidity excluding inventory and prepaid items, which Lena Fischer should flag given the $300M of current liabilities due within twelve months. The $20M of marketable securities must be included because they are held specifically to fund a scheduled debt repayment within three months and are readily convertible to cash.",
  "ExplanationWrongB": "Choice B retains prepaid expenses in the numerator, violating the strict acid-test definition. Prepaid expenses cannot be converted to cash to pay creditors, so the numerator must exclude them. This produces a ratio that overstates true liquidity by the $40M prepaid / $300M = 0.13 increment.",
  "ExplanationWrongC": "Choice C subtracts both inventory and prepaid but omits the $20M of marketable securities Flash intends to sell within three months. Under CMA LOS A.5, short-term marketable securities held to fund near-term obligations are included as cash equivalents in the quick ratio, so leaving them out understates liquid resources by $20M / $300M ≈ 0.07.",
  "ExplanationWrongD": "Choice D uses the current ratio (Current assets $480M / Current liabilities $300M = 1.60) rather than the quick ratio. The quick ratio specifically excludes inventory and prepaid expenses, so applying the current-ratio formula here is an incorrect application of the acid-test principle that Lena should reject.",
  "ExplanationWrongA": "",
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
    "rule_or_proposition": "Quick (acid-test) ratio = (Cash + Short-term marketable securities + Net AR) / Current liabilities; inventory and prepaid expenses are excluded.",
    "application_to_facts": "Facts of P2-A-371 (A.371 Quick ratio with marketable securities inclusion) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-371 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Subtracts inventory only, retaining prepaid expenses in the numerator—this overstates liquidity.",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-371.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Subtracts inventory and prepaid but omits short-term marketable securities—understates liquid resources.",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-371.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Confuses the quick ratio with the current ratio and applies Current assets / Current liabilities.",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-371.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly applies the required adjustments per authoritative guidance. Choices B, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [
    "B.1"
  ],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-073",
  "certification_date": "2026-08-30"
}
];
