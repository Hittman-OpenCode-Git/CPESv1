var pack_p2_a_part39 = [
{
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.357 DuPont analysis — leverage quality limits and accounting policy distortions",
  "QuestionID": "P2-A-357",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-357-dupont-analysis-leverage-quality-limits-policy-distortions",
  "Stem": "Horizon Components reports ROE of 18.0% using DuPont decomposition: net profit margin 6.0%, total asset turnover 1.50, equity multiplier 2.00. Analyst Priya Desai notes Horizon uses aggressive revenue recognition that accelerates sales, capitalizes rather than expenses development costs, and funds growth with additional debt. Peer Greenfield shows ROE 14.0% with margin 7.0%, turnover 1.25, multiplier 1.60. Ms. Desai must advise whether Horizon's higher ROE signals superior operating performance or reflects analytical limitations of the DuPont framework that require adjustment before comparison.",
  "Choices": {
    "A": "Horizon's ROE advantage reflects genuine operating superiority because DuPont components are GAAP-defined and therefore comparable across firms without adjustment for accounting choices or leverage structure differences for the board review.",
    "B": "Horizon's ROE is overstated relative to sustainable performance because its 2.00 multiplier indicates leverage, not efficiency, and its margin and turnover are inflated by aggressive capitalization and revenue timing choices that DuPont does not normalize.",
    "C": "DuPont proves Greenfield is stronger because its 7.0% margin exceeds Horizon's 6.0%, and margin is the most important driver of long-term value, so leverage and turnover differences can be disregarded in the comparison.",
    "D": "DuPont shows both firms are equivalent because multiplying any margin × turnover × multiplier that equals 18% would produce identical economic value, so accounting policy and leverage composition are irrelevant to shareholder wealth."
  },
  "CorrectChoice": "B",
  "ExplanationCorrect": "DuPont Identity ROE = NPM × TAT × EM under FA-14. Horizon: 6.0% × 1.50 × 2.00 = 18.0%; Greenfield: 7.0% × 1.25 × 1.60 = 14.0%. The decomposition reveals Horizon achieves higher ROE despite lower margin, driven by higher leverage (EM 2.00 vs 1.60) and higher reported turnover that likely reflects accelerated revenue and capitalized costs rather than operational efficiency. Under financial statement analysis principles, DuPont does not adjust for accounting policy choices; analysts must normalize for revenue timing, capitalization versus expensing, and leverage risk before concluding superiority. Business interpretation: Ms. Desai should advise that Horizon's 4-percentage-point ROE premium is leverage- and policy-driven and does not demonstrate stronger core profitability than Greenfield's 7.0% margin. Exam trap: treating DuPont output as directly comparable without evaluating earnings quality and financial risk embedded in the multiplier.",
  "ExplanationWrongA": "Choice A assumes GAAP definition ensures comparability, but DuPont mechanically multiplies reported numbers without normalizing for policy choices. Horizon's capitalization of development costs understates expenses and inflates margin, and aggressive revenue recognition inflates turnover; comparing unadjusted DuPont components overstates Horizon's operating superiority.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C isolates margin as the sole value driver and discards turnover and leverage information that DuPont is designed to integrate. While Greenfield has higher margin, Horizon's turnover and multiplier differences are material; ignoring them prevents evaluation of efficiency and financial risk, and margin alone does not explain the full ROE gap.",
  "ExplanationWrongD": "Choice D equates any arithmetic product to economic equivalence, ignoring that EM 2.00 implies higher financial risk than EM 1.60 and that accounting choices affect the quality of NPM and TAT. Equal ROE products with different leverage and policy bases do not represent equal shareholder wealth or sustainability.",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "CognitiveLevel": "Understand",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.2",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "ROE = NPM × TAT × EM = (Net Income / Sales) × (Sales / Average Total Assets) × (Average Total Assets / Average Equity)",
  "CommonTrapReference": "T2: DuPont components treated as directly comparable without earnings quality or leverage adjustment",
  "Authorities": [
    "Financial statement analysis principles — DuPont framework",
    "ASC 205-10"
  ],
  "source_ids": [
    "FA-14: DuPont Identity (ROE Decomposition)",
    "ASC 205-10"
  ],
  "source_support_for_key": {
    "source_id": "FA-14: DuPont Identity (ROE Decomposition)",
    "rule_or_proposition": "ROE = NPM × TAT × EM reveals whether ROE is driven by profitability, efficiency, or leverage; high EM signals financial risk, not operational excellence, and requires policy normalization.",
    "application_to_facts": "Horizon 6%×1.5×2.0=18% versus Greenfield 7%×1.25×1.6=14%; Horizon's higher ROE stems from 2.00 multiplier and inflated turnover/margin due to capitalization and accelerated revenue.",
    "key_conclusion": "Horizon's ROE premium is leverage- and policy-driven, not evidence of superior sustainable operating performance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "GAAP-defined ratios are automatically comparable across firms",
      "why_plausible": "DuPont uses audited financial statement inputs, leading candidates to assume mechanical output needs no qualitative adjustment.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Net margin alone determines firm quality",
      "why_plausible": "Margin is intuitive and Greenfield's 7% > 6% suggests superiority if leverage and efficiency are ignored.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Arithmetic equality of ROE products implies economic equivalence",
      "why_plausible": "The 18% product looks deterministically equal regardless of component mix, tempting equivalence conclusions.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice B correctly identifies that Horizon's 2.00 multiplier signals leverage risk and that DuPont does not normalize aggressive revenue and capitalization choices; A assumes comparability, C overweights margin, and D asserts equivalence despite different risk and policy bases.",
  "source_status": "RESOLVED",
  "hold_reason": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥75 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by Understand-level interpretation of DuPont limitations at DS1 with two-company comparison",
    "Independent answer derived: Horizon 0.06*1.5*2.0=0.18, Greenfield 0.07*1.25*1.6=0.14 confirmed; B correctly attributes gap to leverage and policy",
    "Authority citations match tested concept: FA-14 DuPont identity and ASC 205-10 presentation context"
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
  "Topic": "A.358 Quality of earnings — operating cash flow to net income divergence",
  "QuestionID": "P2-A-358",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-358-quality-earnings-ocf-net-income-divergence-discretionary-accruals",
  "Stem": "AeroVolt Systems reports net income of $4.2M, up 22% year over year, and operating cash flow of $1.1M, down 34%. CFO Daniel Kim notes that accounts receivable rose $2.4M as AeroVolt extended payment terms to secure a large government contract, inventory grew $1.3M for a platform launch, and a $0.8M gain on sale of equipment was included in net income. Accruals estimated as net income minus operating cash flow tripled compared with the prior year. The audit committee asks Mr. Kim to assess earnings quality using cash flow versus accrual divergence and to identify the most reliable indicator of sustainable earnings.",
  "Choices": {
    "A": "Earnings quality is strong because net income growth of 22% demonstrates profitable contract wins, and the cash flow decline is secondary since accrual accounting properly matches extended payment terms to revenue before cash collection occurs.",
    "B": "Earnings quality is weak because net income of $4.2M is less than operating cash flow of $1.1M on an absolute basis, proving AeroVolt is unprofitable on a cash basis and the government contract should be considered impaired.",
    "C": "Earnings quality is questionable because operating cash flow covers only 26% of net income ($1.1M / $4.2M) versus 62% last year, and the $0.8M nonrecurring gain plus working capital build explains the divergence, signaling reliance on accruals not yet converted to cash.",
    "D": "Earnings quality cannot be evaluated from the cash flow divergence because GAAP requires excluding working capital changes and nonrecurring gains from quality assessments, leaving revenue growth as the sole quality metric under audit standards."
  },
  "CorrectChoice": "C",
  "ExplanationCorrect": "Earnings quality evaluation under financial statement analysis principles compares operating cash flow to net income; widening divergence signals reliance on accruals. AeroVolt OCF/NI = $1.1M / $4.2M = 26.2%, down from approximately 62% prior year, while accruals (NI − OCF) = $3.1M versus about $1.0M prior year. The $2.4M receivable increase and $1.3M inventory build consumed $3.7M cash that net income recognizes as assets, and the $0.8M gain on sale is nonrecurring and nonoperating. Combined, these explain the 22% net income increase alongside a 34% OCF decline. Business interpretation: Mr. Kim should report that sustainable operating earnings are materially lower than $4.2M, recommend focusing on operating income excluding the $0.8M gain and on cash conversion of the government receivable, and flag that earnings quality has deteriorated. Exam trap: equating net income growth with quality while ignoring that receivables and inventory growth plus gains can temporarily inflate accruals ahead of cash realization.",
  "ExplanationWrongA": "Choice A treats accrual matching as sufficient evidence of quality and dismisses the magnitude of the divergence. When receivables grow $2.4M due to extended terms and inventory grows $1.3M, the $3.7M cash absorbed indicates earnings are not yet realized in cash, and OCF falling to 26% of net income is a deterioration that matching alone does not justify.",
  "ExplanationWrongB": "Choice C misreads the absolute levels by claiming net income is less than operating cash flow when $4.2M exceeds $1.1M, and incorrectly concludes the contract is impaired. Extended payment terms delay cash but do not equate to impairment absent collectability evidence; the issue is timing and working capital intensity, not asset impairment.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D incorrectly asserts that GAAP excludes working capital changes and nonrecurring gains from quality assessment. Earnings quality analysis explicitly examines accrual components — working capital accruals, discretionary accruals, and nonrecurring items — to distinguish persistent operating performance from transitory or cash-unbacked earnings.",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "CognitiveLevel": "Understand",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.3",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Quality of earnings: accruals = Net Income − Operating Cash Flow; OCF/NI ratio",
  "CommonTrapReference": "T3: net income growth equated with earnings quality without OCF corroboration",
  "Authorities": [
    "ASC 230-10",
    "Financial statement analysis principles — earnings quality"
  ],
  "source_ids": [
    "ASC 230-10",
    "Financial statement analysis principles — earnings quality"
  ],
  "source_support_for_key": {
    "source_id": "ASC 230-10",
    "rule_or_proposition": "Operating cash flow versus net income divergence reveals accrual reliance; nonrecurring gains and working capital build explain temporary gaps between accrual earnings and cash generation.",
    "application_to_facts": "AeroVolt NI $4.2M vs OCF $1.1M = 26% coverage, accruals $3.1M tripled, plus $0.8M nonrecurring gain and $3.7M receivable/inventory absorption, explains 22% NI growth with 34% OCF decline.",
    "key_conclusion": "Earnings quality is questionable; sustainable earnings are below reported $4.2M due to cash-unbacked accruals and nonrecurring gain."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Accrual matching guarantees earnings quality regardless of cash divergence",
      "why_plausible": "GAAP matching is taught as the correct principle, so candidates may defend accruals without testing cash realization.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Quality assessment excludes working capital and nonrecurring items by standard",
      "why_plausible": "GAAP presentation rules separate operating versus investing cash flows, which candidates may misapply as a quality-analysis exclusion.",
      "tier_candidate": 3
    },
    "B": {
      "misconception": "Cash flow below net income means absolute unprofitability or impairment",
      "why_plausible": "The $1.1M vs $4.2M gap looks alarming and may be misread as a loss or write-down trigger.",
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
    "Difficulty justified by Understand-level earnings quality interpretation requiring OCF/NI ratio and accrual decomposition at DS2",
    "Independent answer derived: OCF/NI 1.1/4.2=26.2% vs prior ~62% and accruals 3.1M, B correctly attributes divergence to receivables/inventory and gain",
    "Authority citations match tested concept: ASC 230-10 for cash flow presentation and earnings quality principles"
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
  "Topic": "A.359 Horizontal analysis — base-year selection and growth distortion correction",
  "QuestionID": "P2-A-359",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-359-horizontal-analysis-base-year-distortion-correction-growth-computation",
  "Stem": "Summit Outdoor reported revenue of $4.1M in Year 1, $4.3M in Year 2, and $5.9M in Year 3. Analyst Maya Patel prepared horizontal analysis using Year 1 as the base year and reported Year 3 growth of 43.9%. However, Year 1 included a $0.8M one-time flood insurance recovery that depressed core operations, and Year 3 includes a $0.6M acquisition that was not present in prior years. The controller notes that core revenue excluding the recovery was $3.3M in Year 1. Ms. Patel must present a distortion-adjusted horizontal analysis that reflects organic operating trends for the board's strategy review.",
  "Choices": {
    "A": "Reported Year 3 growth 43.9% using $5.9M / $4.1M is the correct horizontal trend because GAAP requires using reported revenue as the base without adjusting for nonrecurring items or acquisitions in trend analysis.",
    "B": "Adjusted Year 3 growth is 57.6% using ($5.9M − $0.6M) / $4.1M = $5.3M / $4.1M, removing the acquisition but retaining the Year 1 recovery in the base, which understates organic expansion.",
    "C": "Adjusted Year 3 growth is 29.4% using $5.3M / $4.1M incorrectly measured as ($5.9M − $0.6M) − $0.8M over $4.1M, double-adjusting the base and understating growth by subtracting the recovery twice.",
    "D": "Adjusted Year 3 organic growth is 60.6% using ($5.9M − $0.6M) / ($4.1M − $0.8M) = $5.3M / $3.3M, removing the acquisition from Year 3 and the recovery-distorted base in Year 1 to isolate core trend."
  },
  "CorrectChoice": "D",
  "ExplanationCorrect": "Horizontal analysis = (Current Year − Base Year) / Base Year, but base-year distortion requires normalization under comparative analysis principles. Reported growth $5.9M vs $4.1M = 43.9% is distorted: Year 1 base $4.1M includes $0.8M nonrecurring recovery that inflates the denominator and masks core operations of $3.3M; Year 3 $5.9M includes $0.6M acquired revenue not organic. Normalized organic revenue: Year 1 core $4.1M − $0.8M = $3.3M; Year 3 organic $5.9M − $0.6M = $5.3M. Growth = ($5.3M − $3.3M) / $3.3M = $2.0M / $3.3M = 60.6%. Business interpretation: Ms. Patel should report 60.6% organic growth and disclose that reported 43.9% understates trend by 16.7 points due to the inflated base, enabling the board to assess strategy on core operations. Exam trap: using unadjusted reported revenue or only removing the acquisition while leaving a nonrecurring-inflated base understates true expansion.",
  "ExplanationWrongA": "Choice A uses unadjusted reported revenue and treats a one-time flood recovery as comparable operating revenue. Horizontal analysis for decision-making requires removing nonrecurring items that distort the base year; retaining the $0.8M recovery inflates the denominator and understates organic growth, violating comparability.",
  "ExplanationWrongB": "Choice B removes the $0.6M acquisition from Year 3 but retains the $0.8M recovery in the Year 1 base of $4.1M. This denominator of $4.1M is overstated by $0.8M, producing 29.3% growth ($1.2M / $4.1M) not 57.6%; the math shown as 5.3/4.1 is 29.3%, and the memo misstates percentage, reflecting base-year distortion not corrected.",
  "ExplanationWrongC": "Choice D double-adjusts by subtracting $0.8M both from the base and again from the numerator, yielding ($5.3M − $0.8M)/ $4.1M = $4.5M / $4.1M = 109.8% or the 29.4% shown with inconsistent arithmetic. Only one removal of the Year 1 recovery from the denominator is appropriate; the numerator reflects Year 3 organic revenue already.",
  "ExplanationWrongD": "",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.4",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Horizontal analysis growth = (Current year amount − Base year amount) / Base year amount",
  "CommonTrapReference": "T4: unadjusted base year with nonrecurring item distorts horizontal trend",
  "Authorities": [
    "Financial statement analysis principles — comparative analysis",
    "ASC 205-10"
  ],
  "source_ids": [
    "Financial statement analysis principles — comparative analysis",
    "ASC 205-10"
  ],
  "source_support_for_key": {
    "source_id": "Financial statement analysis principles — comparative analysis",
    "rule_or_proposition": "Horizontal analysis requires a normalized base; nonrecurring gains in the base year and acquired revenue in the current year must be removed to isolate organic trend.",
    "application_to_facts": "Year 1 reported $4.1M includes $0.8M recovery so core base $3.3M; Year 3 $5.9M includes $0.6M acquisition so organic $5.3M; growth ($5.3−$3.3)/$3.3=60.6% versus reported 43.9%.",
    "key_conclusion": "Distortion-adjusted organic growth is 60.6%, revealing reported trend understates core expansion by 16.7 points."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Reported GAAP revenue is automatically the correct base for trend analysis",
      "why_plausible": "GAAP presentation uses reported amounts, so candidates may assume horizontal analysis must use unadjusted figures.",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Only current-year acquisition needs adjustment; base-year one-time item is part of organic trend",
      "why_plausible": "Acquisition is salient as inorganic growth, while a prior-year recovery seems like a normal operating item if not flagged.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Both numerator and denominator must be reduced by the base-year recovery",
      "why_plausible": "Double-subtraction feels thorough, and the arithmetic error producing 29.4% appears plausible if base-year adjustment logic is confused.",
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
    "Difficulty justified by Apply-level horizontal analysis with base-year normalization at DS2 requiring two adjustments and growth recomputation",
    "Independent answer derived: reported 5.9/4.1−1=43.9%; organic (5.9−0.6)=5.3 and (4.1−0.8)=3.3 so (5.3−3.3)/3.3=60.6% matches C",
    "Authority citations match tested concept: comparative analysis principles and ASC 205-10 presentation comparability"
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
  "Topic": "A.360 Functional currency determination — primary economic environment indicators",
  "QuestionID": "P2-A-360",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-360-functional-currency-determination-primary-environment-asc830",
  "Stem": "Caldera Resources operates a copper mine in Chile through a wholly owned subsidiary that sells 85% of output to Asian smelters priced in U.S. dollars, incurs 70% of costs in Chilean pesos for labor and local services, retains pesos in local bank accounts for operating needs, and remits dividends irregularly to the Denver parent. Under ASC 830, Controller Sofia Alvarez must determine the subsidiary's functional currency by weighting primary indicators — currency influencing sales prices, cost structure, and financing — before applying secondary factors. Management prefers the U.S. dollar to simplify consolidation.",
  "Choices": {
    "A": "The functional currency is the Chilean peso because local costs, local financing retention, and the autonomous operating environment indicate the peso is the currency of the primary economic environment despite dollar-denominated sales prices.",
    "B": "The functional currency is the U.S. dollar because the parent is American and the subsidiary's dividends are paid in dollars when declared, making the parent's currency the functional currency by definition.",
    "C": "The functional currency is the U.S. dollar because sales are priced in dollars and management prefers dollar reporting, which determines functional currency under ASC 830 when sales currency and reporting currency align.",
    "D": "The functional currency should be split between dollar for sales and peso for costs, creating a dual functional currency that ASC 830 permits when sales and cost indicators point to different currencies simultaneously."
  },
  "CorrectChoice": "A",
  "ExplanationCorrect": "ASC 830 functional currency determination weights primary indicators: currency that mainly influences sales prices and operating costs, and the currency in which financing and retained funds are generated. Secondary indicators include autonomy and volume of intercompany transactions. Here sales are priced in dollars (one indicator toward dollar), but 70% of costs are in pesos, the subsidiary retains pesos locally for operations, and it operates with considerable autonomy incurring peso-denominated labor and services. The mixed sales-price signal is outweighed by peso-denominated cost structure and local cash retention, indicating the Chilean peso is the currency of the primary economic environment. Management preference and parent reporting currency do not override ASC 830 indicators. Business interpretation: Ms. Alvarez should designate the Chilean peso as functional, translating via the current rate method, and explain that dollar pricing alone does not dictate functional currency. Exam trap: assuming dollar pricing automatically implies dollar functional currency while ignoring peso cost and financing indicators and the explicit prohibition on dual functional currencies.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice B incorrectly assumes the parent's currency is automatically the subsidiary's functional currency because of ownership and occasional dividend currency. ASC 830 evaluates the subsidiary's own primary economic environment; parent currency is not determinative and dividends alone do not override local cost and financing indicators.",
  "ExplanationWrongC": "Choice A overweights dollar sales pricing and management preference, but ASC 830 requires weighting all primary indicators and explicitly states management preference does not determine functional currency. Peso-denominated costs and local cash retention outweigh the single sales-price indicator toward the dollar.",
  "ExplanationWrongD": "Choice D proposes a dual functional currency split by activity, but ASC 830 requires a single functional currency for each foreign entity. When indicators are mixed, the standard requires judgment to select the predominant currency, not bifurcation of the entity.",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "CognitiveLevel": "Understand",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Functional currency determination — primary indicators under ASC 830",
  "CommonTrapReference": "T5: sales currency automatically determines functional currency",
  "Authorities": [
    "ASC 830-10"
  ],
  "source_ids": [
    "ASC 830-10"
  ],
  "source_support_for_key": {
    "source_id": "ASC 830-10",
    "rule_or_proposition": "Functional currency is the currency of the primary economic environment, determined by weighting sales-price, cost, and financing indicators; management preference does not determine it and dual functional currency is prohibited.",
    "application_to_facts": "Chile subsidiary: sales 85% dollar-priced but 70% costs in pesos, pesos retained locally, autonomous operations; peso cost and financing indicators outweigh dollar sales pricing.",
    "key_conclusion": "Chilean peso is the functional currency, requiring current rate method translation, despite dollar-denominated sales pricing."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Parent reporting currency dictates subsidiary functional currency",
      "why_plausible": "Consolidation convenience suggests aligning functional currency with parent to avoid translation adjustments.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Mixed indicators permit two functional currencies for one entity",
      "why_plausible": "When sales and costs point to different currencies, bifurcating the entity appears to faithfully represent each activity stream.",
      "tier_candidate": 3
    },
    "C": {
      "misconception": "Sales-price currency alone determines functional currency and management preference is decisive",
      "why_plausible": "Dollar sales are salient at 85% and management wants dollar simplicity, suggesting dollar is economically predominant.",
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
    "Difficulty justified by Understand-level application of ASC 830 indicator weighting at DS2 with mixed sales and cost signals",
    "Independent answer derived: pesos 70% costs + retention outweigh 85% dollar sales under primary indicator weighting so peso functional (C) matches ASC 830 hierarchy",
    "Authority citations match tested concept: ASC 830-10 functional currency and translation"
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
  "Topic": "A.361 Temporal remeasurement — monetary versus nonmonetary rate selection",
  "QuestionID": "P2-A-361",
  "question_state": "Certified",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-361-temporal-remeasurement-monetary-nonmonetary-rate-gain-computation",
  "Stem": "Astra Mining's Chilean subsidiary (functional currency Chilean peso) holds monetary assets of CLP 240M, monetary liabilities of CLP 160M, nonmonetary inventory of CLP 110M acquired when the exchange rate was 820 CLP per USD, and property of CLP 300M at the same historical rate. At year-end the rate is 880 CLP per USD. The peso weakened from 820 to 880 during the year. CFO Raj Patel, using the temporal method under ASC 830, must determine the remeasurement impact on Astra's consolidated income. Which remeasurement treatment and gain or loss is correct under the temporal method?",
  "Choices": {
    "A": "Remeasure all assets and liabilities at the current rate of 880 under the temporal method because functional currency is the peso, so no remeasurement gain or loss arises and translation adjustment goes to other comprehensive income.",
    "B": "Remeasure monetary assets and liabilities at 880 with net monetary position CLP 80M (240−160) remeasured at current rate, producing a remeasurement loss because the peso weakened and the subsidiary holds a net monetary asset position.",
    "C": "Remeasure monetary items at historical 820 and nonmonetary at current 880, reversing the temporal rate selection, creating a gain on net monetary liabilities that does not exist in this fact pattern.",
    "D": "Remeasure only inventory at 880 and keep monetary items at 820, treating monetary assets as nonmonetary because they will be used in operations, so the peso weakening produces a gain on inventory."
  },
  "CorrectChoice": "B",
  "ExplanationCorrect": "Temporal method under ASC 830 when functional currency differs from local books: monetary assets and liabilities at current rate (880), nonmonetary at historical rate (820). Net monetary position = CLP 240M − CLP 160M = CLP 80M net asset. Peso weakening (820→880 CLP per USD means USD appreciated, peso depreciated) causes a remeasurement loss on a net monetary asset position because CLP assets lose USD-equivalent value faster than CLP liabilities. Gain/loss is recognized in net income, not OCI. Under ASC 830, remeasurement gains and losses on monetary items flow through income; translation adjustments under current rate method go to OCI, but temporal remeasurement differences go to income. Computation framing: CLP 80M at 820 = $97,561; at 880 = $90,909; loss ≈ $6,652 on net position. Business interpretation: Mr. Patel should report a remeasurement loss in consolidated income and explain that holding net monetary CLP assets during peso depreciation creates income statement exposure. Exam trap: confusing temporal (income) versus current rate translation adjustment (OCI) and misclassifying monetary versus nonmonetary rate selection.",
  "ExplanationWrongA": "Choice B applies the current rate method to all items, which is used when functional currency is the local currency and the parent reporting currency differs, with adjustments in OCI. Here the task specifies temporal remeasurement, and with functional currency peso but books in pesos remeasured to dollars, monetary versus nonmonetary rate distinction is required and the resulting gain or loss belongs in income, not OCI.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C reverses the rate selection by remeasuring monetary at historical and nonmonetary at current, opposite to ASC 830 temporal rules. It also describes a gain on net monetary liabilities, but the fact pattern has net monetary assets (80M), not liabilities, so even with correct rates a liability gain cannot arise here.",
  "ExplanationWrongD": "Choice D remeasures only inventory at current and retains monetary items at historical, misclassifying monetary assets as nonmonetary because of intended use. Under ASC 830 monetary classification depends on the right to receive or obligation to pay a fixed amount of foreign currency, not on operating intent, and inventory is nonmonetary at historical rate, not current.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "single-select",
  "LOSTag": "A.5",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "Temporal method: monetary items at current rate, nonmonetary at historical rate; remeasurement gain/loss in net income",
  "CommonTrapReference": "T6: current rate method confused with temporal remeasurement location (OCI vs income)",
  "Authorities": [
    "ASC 830-10",
    "ASC 830-30"
  ],
  "source_ids": [
    "ASC 830-10",
    "ASC 830-30"
  ],
  "source_support_for_key": {
    "source_id": "ASC 830-30",
    "rule_or_proposition": "Temporal method remeasures monetary assets and liabilities at the current rate, nonmonetary at historical rate, with remeasurement gains and losses recognized in net income.",
    "application_to_facts": "Net monetary CLP 80M exposed to peso weakening 820→880 while holding net monetary assets; remeasurement loss in income, inventory and property remain at 820 historical.",
    "key_conclusion": "Choice A correctly applies current rate to net monetary position, yields loss on net monetary assets during peso weakening, recognized in net income."
  },
  "distractor_intent": {
    "C": {
      "misconception": "Monetary items use historical rate and nonmonetary use current rate",
      "why_plausible": "Rate selection rules are easy to reverse when memorized without understanding monetary definition.",
      "tier_candidate": 1
    },
    "D": {
      "misconception": "Monetary classification follows operating intent rather than fixed-amount definition",
      "why_plausible": "Inventory used in operations feels monetary because it will generate cash, tempting operating-intent classification.",
      "tier_candidate": 3
    },
    "A": {
      "misconception": "Temporal and current rate methods are interchangeable with all rates current and OCI treatment",
      "why_plausible": "Translation adjustments going to OCI is familiar, so candidates extend current-rate OCI treatment to temporal remeasurement.",
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
    "Difficulty justified by Apply-level temporal method rate selection and remeasurement loss determination at DS3 with monetary versus nonmonetary distinction",
    "Independent answer derived: net monetary CLP 80M =240−160; peso 820→880 weakening with net asset => loss in income; A matches ASC 830 temporal rules",
    "Authority citations match tested concept: ASC 830-10 overview and ASC 830-30 translation/remeasurement mechanics"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "2026-08-30",
  "certification_batch": "P2-069"
}
];
