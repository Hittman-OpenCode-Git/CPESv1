var pack_p2_e_questions = [
  {
    "Part": 2,
    "Section": "E",
    "Topic": "E.001 npv-equipment-investment",
    "QuestionID": "P2-E-001",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "E-001-npv-sunk-cost",
    "Stem": "Crestline Industries evaluates new equipment costing $200,000, 5-year life, zero salvage. Annual after-tax cash inflows: $58,000. A prior $15,000 feasibility study was expensed. Required return is 9%. PV annuity factor for 5 years at 9% is 3.8896. What is the NPV?",
    "Choices": {
      "A": "$25,600",
      "B": "$90,000",
      "C": "$10,600",
      "D": "-$25,600"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "NPV = PV inflows - investment. PV inflows = $58,000 x 3.8896 = $225,597. NPV = $225,597 - $200,000 = $25,600 (rounded). The $15,000 feasibility study is a sunk cost incurred and expensed before the decision; sunk costs are irrelevant to NPV. Only incremental future cash flows that differ between accept and reject alternatives are included.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "$90,000 is undiscounted net cash flow: $58,000 x 5 - $200,000 = $90,000. This ignores the time value of money entirely. NPV requires discounting future cash flows at the required rate of return.",
    "ExplanationWrongC": "$10,600 incorrectly deducts the $15,000 sunk cost from NPV: $25,600 - $15,000 = $10,600. Sunk costs are costs already incurred that cannot be recovered; they are irrelevant to capital budgeting decisions.",
    "ExplanationWrongD": "-$25,600 reverses the formula: $200,000 - $225,597 = -$25,597. The correct NPV formula is PV inflows minus investment, not investment minus inflows.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "E.1",
    "BlueprintDomain": "Investment Decisions",
    "FormulaReference": "NPV = PV of Future Cash Flows - Initial Investment",
    "CommonTrapReference": "Including sunk costs in NPV analysis",
    "Authorities": [
      "IMA CMA Part 2 LO E.1"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Independent: $58K x 3.8896 = $225.6K; NPV=$25.6K",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "E",
    "Topic": "E.002 npv-vs-irr-mutually-exclusive",
    "QuestionID": "P2-E-002",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "E-002-npv-irr-conflict",
    "Stem": "Bennett Corp must select one of two mutually exclusive projects. Alpha: $100K investment, NPV $28K, IRR 22%. Beta: $500K investment, NPV $45K, IRR 16%. Cost of capital is 10%. Sufficient funds exist for either project. Which should Bennett select?",
    "Choices": {
      "A": "Alpha, because IRR of 22% exceeds Beta's 16%",
      "B": "Beta, because NPV of $45K exceeds Alpha's $28K",
      "C": "Neither -- IRR and NPV rankings conflict, no decision possible",
      "D": "Alpha, because profitability index of 1.28 exceeds Beta's 1.09"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "For mutually exclusive projects with conflicting NPV and IRR rankings, NPV should be used. NPV measures absolute dollar wealth created and assumes reinvestment at the cost of capital (more realistic than IRR's implicit reinvestment at IRR itself). Beta creates $45K in shareholder wealth vs. Alpha's $28K -- a $17K advantage. The IRR conflict arises because projects differ in scale. The goal is to maximize firm value, not rate of return.",
    "ExplanationWrongA": "Selecting Alpha for higher IRR is incorrect for mutually exclusive projects. IRR assumes reinvestment at 22%, which may be unrealistic. IRR is a percentage measure that does not capture absolute value creation. A smaller project with high IRR can create less total wealth than a larger project with lower IRR.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "The NPV vs IRR conflict is well-documented and resolved: NPV is the primary decision criterion for mutually exclusive projects. The conflict does not invalidate the analysis; it signals projects with different scale or cash flow timing.",
    "ExplanationWrongD": "Alpha's PI = ($100K+$28K)/$100K = 1.28 vs. Beta's 1.09. PI is most useful for capital rationing, not mutually exclusive projects without capital constraints. For mutually exclusive projects, NPV is the correct criterion.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "E.2",
    "BlueprintDomain": "Investment Decisions",
    "FormulaReference": "NPV vs IRR for Mutually Exclusive Projects",
    "CommonTrapReference": "Using IRR instead of NPV for mutually exclusive projects",
    "Authorities": [
      "IMA CMA Part 2 LO E.2"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Independent: NPV_B > NPV_A, scale conflict explained",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "E",
    "Topic": "E.003 payback-period",
    "QuestionID": "P2-E-003",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "E-003-payback-limitations",
    "Stem": "Rockwell Industries evaluates a project costing $240,000 with uniform annual after-tax cash inflows of $80,000 for 5 years. What is the payback period and its primary limitation?",
    "Choices": {
      "A": "3.0 years; overstates early-year cash inflows",
      "B": "4.0 years; ignores cash flows beyond the payback period",
      "C": "3.0 years; ignores the time value of money",
      "D": "3.0 years; requires a predetermined discount rate"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Payback = $240,000 / $80,000 = 3.0 years. The primary limitation is ignoring the time value of money -- treating a dollar in year 3 the same as a dollar in year 1. Other limitations include ignoring cash flows after the payback period and requiring an arbitrary cutoff, but failure to discount is the most fundamental theoretical weakness.",
    "ExplanationWrongA": "Payback of 3.0 years is correct but the limitation is wrong. Payback does not overstate early-year cash flows; it underweights them by treating all pre-payback cash flows equally regardless of timing -- a consequence of ignoring time value of money.",
    "ExplanationWrongB": "Payback is 3.0 years, not 4.0. While it is true that payback ignores post-payback cash flows, the payback period itself is miscalculated in this choice.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Payback of 3.0 years is correct but the limitation is wrong. Payback does NOT require a discount rate -- this is precisely a weakness. Because it lacks a required rate of return, it cannot distinguish between projects with different risk levels.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "E.3",
    "BlueprintDomain": "Investment Decisions",
    "FormulaReference": "Payback Period = Initial Investment / Annual Cash Inflow",
    "CommonTrapReference": "Confusing simple payback limitations with discounted payback",
    "Authorities": [
      "IMA CMA Part 2 LO E.3"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Independent: $240K/$80K=3.0 years",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "E",
    "Topic": "E.004 profitability-index-capital-rationing",
    "QuestionID": "P2-E-004",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "E-004-pi-capital-rationing",
    "Stem": "Westgate Corp has a $500K capital budget and evaluates projects: W ($200K, NPV $36K, PI 1.18), X ($300K, NPV $75K, PI 1.25), Y ($250K, NPV $47.5K, PI 1.19), Z ($100K, NPV $15K, PI 1.15). Under PI ranking with capital rationing, which combination maximizes NPV?",
    "Choices": {
      "A": "X and Y -- highest individual NPVs",
      "B": "X and Z -- smallest number of projects",
      "C": "Y, W, and Z -- smallest individual investments",
      "D": "X and W -- PI ranking: X first (1.25), then W (1.18) fits remaining $200K"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "PI ranking: X(1.25), Y(1.19), W(1.18), Z(1.15). Select X ($300K, $200K remaining). Y ($250K) exceeds remaining budget. W ($200K) fits exactly. Combined: $500K investment, NPV = $75K + $36K = $111K. No other combination within budget produces higher total NPV.",
    "ExplanationWrongA": "X and Y have highest individual NPVs but combined investment of $550K exceeds the $500K budget. Capital rationing means the constraint is binding.",
    "ExplanationWrongB": "X+Z uses $400K of $500K and generates NPV of $90K -- $21K less than optimal. Selecting by number of projects is arbitrary. Capital rationing maximizes total NPV within the budget.",
    "ExplanationWrongC": "Y+W+Z = $550K investment, exceeds the $500K budget. Even if the budget were larger, this approach ignores PI methodology which ranks by return per dollar.",
    "ExplanationWrongD": "",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "E.4",
    "BlueprintDomain": "Investment Decisions",
    "FormulaReference": "Profitability Index = PV of Future Cash Flows / Initial Investment",
    "CommonTrapReference": "Using NPV ranking instead of PI ranking under capital constraints",
    "Authorities": [
      "IMA CMA Part 2 LO E.4"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Independent: PI ranking verified, X+W=$111K NPV",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "E",
    "Topic": "E.005 sensitivity-vs-scenario",
    "QuestionID": "P2-E-005",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "E-005-risk-analysis-techniques",
    "Stem": "Marlin Corp's planning team evaluates a proposed project with uncertainty around sales volume, selling price, variable cost, and initial investment. The CFO wants to know which single variable, when changed across its range while holding others constant, most impacts NPV. Which technique is appropriate?",
    "Choices": {
      "A": "Sensitivity analysis",
      "B": "Scenario analysis",
      "C": "Monte Carlo simulation",
      "D": "Decision tree analysis"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "Sensitivity analysis examines how changes in a single variable affect NPV while holding others constant. By varying each input one at a time across its plausible range, management identifies which variable has the greatest impact. This focuses monitoring and mitigation efforts on the most critical drivers. The technique is straightforward and provides clear insight into individual variable impact.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Scenario analysis examines simultaneous changes in multiple variables under a coherent narrative (best, base, worst case). It does not isolate individual variable impact. The CFO's specific request requires sensitivity analysis, not scenario analysis.",
    "ExplanationWrongC": "Monte Carlo simulation assigns probability distributions to multiple variables and runs thousands of iterations. While more sophisticated, it does not directly answer which individual variable has the greatest impact. It provides a comprehensive risk profile, not marginal variable effects.",
    "ExplanationWrongD": "Decision tree analysis is for sequential decisions where later choices depend on earlier outcomes. It is appropriate for staged investments, abandonment options, or follow-on opportunities. The CFO's situation involves simultaneous input uncertainty for a single-stage project.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "E.5",
    "BlueprintDomain": "Investment Decisions",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing sensitivity analysis with scenario analysis or Monte Carlo simulation",
    "Authorities": [
      "IMA CMA Part 2 LO E.5"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Sensitivity = one variable at a time",
      "Authorities match"
    ]
  }
];
