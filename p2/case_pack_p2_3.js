var casePackP2_3 = [
{
 "CaseID": "CBQ23-C1",
 "Title": "Make-or-Buy Under a Binding Constraint",
 "SectionTags": [
  "C"
 ],
 "BlueprintDomain": "Decision Analysis",
 "BlueprintObjectives": [
  "Identify relevant costs for an outsourcing decision including avoidable fixed costs",
  "Value capacity released on a constrained resource",
  "Integrate quantitative and qualitative factors into a sourcing recommendation"
 ],
 "PrimaryCompetency": "Analysis",
 "EstimatedMinutes": 30,
 "Difficulty": "Difficult",
 "DifficultyScore": 4,
 "ScenarioText": "Atlas Fabrication produces 30,000 brackets a year on its most constrained machining line. An outside supplier has quoted $24 per bracket delivered, and plant manager Luis Ortega must decide whether outsourcing the bracket — and redeploying the freed machine hours to high-margin Product Z — beats continuing to make it in-house.",
 "Industry": "Precision metal fabrication",
 "CompanyType": "Manufacturer",
 "CompanyName": "Atlas Fabrication",
 "Stakeholder": "Plant Manager Luis Ortega",
 "BusinessFunction": "Operations strategy",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "make-or-buy",
  "constraint",
  "opportunity cost"
 ],
 "CreatedDate": "2026-08-24",
 "ModifiedDate": "2026-08-24",
 "Author": "AI",
 "Confidence": 90,
 "RevisionHistory": [
  {
   "Date": "2026-08-24",
   "Version": "1.0",
   "Author": "AI",
   "Summary": "Initial creation"
  }
 ],
 "question_state": "Certified",
    "certification_session": "P2-059",
 "Part": 2,
 "Part2OnlyFlag": true,
 "LearningObjectives": [
  "Separate avoidable from unavoidable costs in a make-or-buy analysis",
  "Compute the opportunity value of constraint-hours released",
  "Compare net relevant benefits across alternatives",
  "Weigh supplier-risk factors in the final recommendation"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ23-C1-E1",
   "CaseID": "CBQ23-C1",
   "Type": "table",
   "Title": "Exhibit 1 — Bracket Cost Structure (Annual, 30,000 Units)",
   "Purpose": "Provides the in-house cost elements and the outside quote for the relevant-cost comparison.",
   "ReferencedBy": [
    "CBQ23-C1-Q1",
    "CBQ23-C1-Q2",
    "CBQ23-C1-Q4"
   ],
   "Headers": [
    "Cost element",
    "Amount"
   ],
   "Rows": [
    [
     "Variable manufacturing cost",
     "$18.00 per unit"
    ],
    [
     "Allocated corporate fixed cost",
     "$6.00 per unit (unavoidable)"
    ],
    [
     "Dedicated supervisor salary",
     "$45,000 per year (avoidable if outsourced)"
    ],
    [
     "Outside supplier quote",
     "$24.00 per unit delivered"
    ]
   ],
   "DataFormat": "USD; annual volume 30,000 units",
   "AccuracyCheck": "Avoidable supervision per unit = $45,000 ÷ 30,000 = $1.50"
  },
  {
   "ExhibitID": "CBQ23-C1-E2",
   "CaseID": "CBQ23-C1",
   "Type": "table",
   "Title": "Exhibit 2 — Constraint Capacity and Alternative Uses",
   "Purpose": "Provides the machine-hour consumption of the bracket and the contribution available from redeploying freed hours to Product Z, plus floor-space rental potential.",
   "ReferencedBy": [
    "CBQ23-C1-Q3",
    "CBQ23-C1-Q6",
    "CBQ23-C1-Q5"
   ],
   "Headers": [
    "Factor",
    "Value"
   ],
   "Rows": [
    [
     "Constraint line capacity",
     "40,000 hours"
    ],
    [
     "Machine hours per bracket",
     "0.5 hours"
    ],
    [
     "Hours freed if outsourced",
     "15,000 hours"
    ],
    [
     "Product Z contribution margin",
     "$36.00 per constraint-hour"
    ],
    [
     "Vacated floor-space rental",
     "$20,000 per year"
    ]
   ],
   "DataFormat": "USD; Product Z demand absorbs all 15,000 freed hours",
   "AccuracyCheck": "30,000 units x 0.5 hr = 15,000 hours; 40,000 - 15,000 = 25,000 hours used by other products"
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ23-C1-Q1",
   "Type": "numeric",
   "Prompt": "Enter Atlas's RELEVANT in-house cost per bracket (the cost avoidable by outsourcing), rounded to two decimals.",
   "Correct": "19.50",
   "Explanation": "Relevant cost = variable cost + avoidable fixed cost = $18.00 + ($45,000 ÷ 30,000) = $18.00 + $1.50 = $19.50. The $6.00 allocated corporate fixed cost is UNAVOIDABLE — it continues whether brackets are made or bought — so it is excluded from the decision entirely (per IMA relevant-costing guidance). Only future costs that DIFFER between alternatives enter the analysis.",
   "Topic": "Relevant cost identification",
   "Subtopic": "Avoidable versus allocated costs",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "Relevant cost = variable cost + avoidable fixed costs",
   "CommonTrapReference": "Loading allocated corporate overhead into the in-house comparison.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "relevant costing"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C1-Q2",
   "Type": "numeric",
   "Prompt": "Enter the outsourcing PREMIUM per unit before considering released-capacity effects, rounded to two decimals.",
   "Correct": "4.50",
   "Explanation": "Premium = outside quote − relevant in-house cost = $24.00 − $19.50 = $4.50 per unit. On its face, buying costs $4.50 more per bracket — but this is only the FIRST layer of the decision, because outsourcing also frees scarce machine time whose alternative use carries real value.",
   "Topic": "Outsourcing premium",
   "Subtopic": "First-layer comparison",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "",
   "CommonTrapReference": "Comparing the quote against full absorption cost of $24.00 instead of relevant cost.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "outsourcing"
   ],
   "Dependencies": [
    "CBQ23-C1-Q1"
   ]
  },
  {
   "ItemID": "CBQ23-C1-Q3",
   "Type": "numeric",
   "Prompt": "Enter the net ANNUAL advantage of outsourcing (including released-capacity and rental effects), in dollars.",
   "Correct": "425000",
   "Explanation": "Benefits of outsourcing: freed constraint-hours earn 15,000 × $36.00 = $540,000 producing Product Z, plus $20,000 of floor-space rent — total $560,000. Cost: premium of $4.50 × 30,000 = $135,000. Net advantage = $560,000 − $135,000 = +$425,000. The constraint is what transforms a money-losing premium into a strongly profitable move: those hours are worth far more making Z than saving $6.00 of avoided variable content on brackets.",
   "Topic": "Net benefit of outsourcing",
   "Subtopic": "Opportunity cost of capacity",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": true,
   "FormulaReference": "Net = (freed hours × CM/hour + rent) − (premium × units)",
   "CommonTrapReference": "Omitting the opportunity value of freed constraint-hours — the largest term in the analysis.",
   "EstimatedMinutes": 6,
   "ExplanationVersion": 1,
   "Tags": [
    "opportunity cost",
    "constraint"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C1-Q4",
   "Type": "select",
   "Prompt": "Which cost element is IRRELEVANT to the make-or-buy decision?",
   "Correct": "B",
   "Choices": [
    "The $18.00 per-unit variable manufacturing cost",
    "The $6.00 per-unit allocated corporate fixed cost, because it continues under either alternative",
    "The $45,000 dedicated supervisor salary, because supervision is always fixed",
    "The $24.00 outside quote"
   ],
   "Explanation": "Unavoidable allocated costs fail the relevance test — they are incurred whichever way Luis decides, so they cannot differ between alternatives. Variable cost, avoidable supervision, and the outside quote are precisely the future differential items that DO change with the decision. Supervision here is specifically avoidable, so option C's blanket 'fixed means keep' reasoning misapplies cost behavior to a decision context.",
   "Topic": "Cost relevance test",
   "Subtopic": "Allocated costs",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Understand",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Treating every cost printed on the product's standard cost card as decision-relevant.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "relevance"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C1-Q5",
   "Type": "select",
   "Prompt": "Which qualitative factor deserves the MOST weight before executing the outsourcing?",
   "Correct": "B",
   "Choices": [
    "Losing the $6.00 per-unit allocation from corporate overhead",
    "Single-supplier dependency — disruption or quality failure at one source would idle the constrained line's replacement volume; mitigate through dual qualification, contractual SLAs with audit rights, and safety stock during transition",
    "Depreciation on the vacated machining equipment will now be unabsorbed",
    "The union contract requires brackets to be made in-house"
   ],
   "Explanation": "Outsourcing concentrates production risk in one external party while the freed hours have ALREADY been committed to Product Z — a supplier failure now damages two revenue streams at once. The mitigations (qualified second source, service-level agreements with audit rights, transition safety stock) directly address that exposure. The overhead allocation (A) is irrelevant by construction; depreciation (C) continues regardless and is non-cash; the union claim (D) is asserted without support in the exhibits and would be a legal constraint, not an economic one.",
   "Topic": "Sourcing risk",
   "Subtopic": "Qualitative factors",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Letting bookkeeping artifacts outweigh operational exposure in sourcing decisions.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "supplier risk"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C1-Q6",
   "Type": "select",
   "Prompt": "What should Luis recommend to the executive committee?",
   "Correct": "C",
   "Choices": [
    "Continue making brackets in-house because the outside quote exceeds the standard cost card total of $24.00",
    "Outsource immediately and leave the vacated space idle until Product Z demand materializes",
    "OUTSOURCE — the net annual advantage is $425,000 — CONTINGENT on qualifying a second supplier and signing an SLA with audit rights and a transition safety-stock period before the line conversion",
    "Outsource and eliminate the supervisor position effective immediately, transferring quality oversight to the supplier"
   ],
   "Explanation": "The economics are decisive (+$425K) but the execution conditions protect them: dual qualification prevents the single-source failure mode from converting a contribution gain into a double loss, and the SLA makes supplier performance enforceable. Option A compares the quote to FULL cost ($24.00 standard includes the irrelevant allocation) — a tie that ignores $560K of opportunity benefits. Leaving space idle (B) forfeits $20K of rent plus all Product Z contribution. Immediate termination of the supervisor (D) removes the transition-period quality bridge precisely when process knowledge transfer matters most.",
   "Topic": "Sourcing recommendation",
   "Subtopic": "Conditional implementation",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Presenting the quantitative answer without the conditions that secure it operationally.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "recommendation"
   ],
   "Dependencies": []
  }
 ]
},
{
 "CaseID": "CBQ23-E1",
 "Title": "Automation Investment Evaluation",
 "SectionTags": [
  "E"
 ],
 "BlueprintDomain": "Investment Decisions",
 "BlueprintObjectives": [
  "Compute after-tax operating cash flows incorporating the depreciation tax shield",
  "Evaluate a project using NPV, payback, and profitability index",
  "Stress-test the recommendation through sensitivity analysis"
 ],
 "PrimaryCompetency": "Calculation",
 "EstimatedMinutes": 30,
 "Difficulty": "Moderate",
 "DifficultyScore": 3,
 "ScenarioText": "Willow Textiles' CFO Anita Rao proposes automating the finishing line: installed cost $500,000, five-year straight-line life to zero salvage for books, pre-tax labor savings of $160,000 per year offset by $10,000 of added maintenance, and estimated salvage proceeds of $60,000 at the end of year five. With a 25% tax rate and 10% WACC, she must present NPV, payback, and profitability index — and defend the recommendation under savings uncertainty.",
 "Industry": "Textile manufacturing",
 "CompanyType": "Manufacturer",
 "CompanyName": "Willow Textiles",
 "Stakeholder": "CFO Anita Rao",
 "BusinessFunction": "Capital budgeting",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "NPV",
  "payback",
  "profitability index",
  "after-tax cash flow"
 ],
 "CreatedDate": "2026-08-24",
 "ModifiedDate": "2026-08-24",
 "Author": "AI",
 "Confidence": 90,
 "RevisionHistory": [
  {
   "Date": "2026-08-24",
   "Version": "1.0",
   "Author": "AI",
   "Summary": "Initial creation"
  }
 ],
 "question_state": "Certified",
    "certification_session": "P2-059",
 "Part": 2,
 "Part2OnlyFlag": true,
 "LearningObjectives": [
  "Build after-tax cash flow using the depreciation tax shield",
  "Discount project flows and compute NPV with terminal salvage",
  "Interpret payback and profitability index alongside NPV",
  "Test decision robustness to input sensitivity"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ23-E1-E1",
   "CaseID": "CBQ23-E1",
   "Type": "table",
   "Title": "Exhibit 1 — Project Inputs",
   "Purpose": "Provides every input required for the after-tax cash flow build and evaluation metrics.",
   "ReferencedBy": [
    "CBQ23-E1-Q1",
    "CBQ23-E1-Q2",
    "CBQ23-E1-Q3",
    "CBQ23-E1-Q6",
    "CBQ23-E1-Q5"
   ],
   "Headers": [
    "Input",
    "Value"
   ],
   "Rows": [
    [
     "Installed cost (depreciable)",
     "$500,000"
    ],
    [
     "Life / convention",
     "5 years straight-line to zero"
    ],
    [
     "Pre-tax labor savings",
     "$160,000 per year"
    ],
    [
     "Added maintenance",
     "$10,000 per year"
    ],
    [
     "Salvage at end of year 5",
     "$60,000"
    ],
    [
     "Tax rate",
     "25%"
    ],
    [
     "WACC",
     "10%"
    ]
   ],
   "DataFormat": "USD; annual figures for years 1-5",
   "AccuracyCheck": "Straight-line charge = 500,000/5 = 100,000 per year"
  },
  {
   "ExhibitID": "CBQ23-E1-E2",
   "CaseID": "CBQ23-E1",
   "Type": "text",
   "Title": "Exhibit 2 — Discount Factors at 10%",
   "Purpose": "Provides present-value factors so computations need no tables beyond the exhibit.",
   "ReferencedBy": [
    "CBQ23-E1-Q2",
    "CBQ23-E1-Q4",
    "CBQ23-E1-Q6"
   ],
   "Body": "PVIFA(10%, 5 years) = 3.7908\nPVIF(10%, year 5) = 0.6209"
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ23-E1-Q1",
   "Type": "numeric",
   "Prompt": "Enter the annual AFTER-TAX operating cash flow (years 1-5), in dollars.",
   "Correct": "137500",
   "Explanation": "After-tax cash flow = (pre-tax cash savings) × (1 − t) + (depreciation × t) = ($160,000 − $10,000) × 0.75 + ($100,000 × 0.25) = $112,500 + $25,000 = $137,500 (per ID-06). Depreciation never leaves the company as cash — only its tax SHIELD enters the flow, which is why the $100,000 book charge contributes just $25,000. Treating depreciation as a cash outflow (or ignoring the shield entirely) are the two classic errors on this build.",
   "Topic": "After-tax cash flow",
   "Subtopic": "Depreciation tax shield",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "ID-06: ATCF = (Rev − Cash Exp)(1−t) + Depr × t",
   "CommonTrapReference": "Treating depreciation as a cash outflow, or omitting its tax shield.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "tax shield",
    "ATCF"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-E1-Q2",
   "Type": "numeric",
   "Prompt": "Enter the project NPV in dollars (answers within ±$1,000 accepted).",
   "Correct": "49170",
   "Explanation": "PV of operating flows = $137,500 × PVIFA(10%,5) = $137,500 × 3.7908 = $521,235. Terminal salvage arrives at year 5 with book value zero, so the full $60,000 is taxable: after-tax salvage = $60,000 × 0.75 = $45,000; PV = $45,000 × 0.6209 = $27,941. NPV = −$500,000 + $521,235 + $27,941 ≈ +$49,176 → ACCEPT (positive NPV adds shareholder value at the 10% hurdle). Forgetting the salvage term, or taxing it a second time, swings the answer by roughly $28K.",
   "Topic": "Net present value",
   "Subtopic": "Terminal salvage treatment",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "ID-01: NPV = Σ CFt/(1+r)^t − I0",
   "CommonTrapReference": "Omitting after-tax salvage, or discounting it at the wrong factor year.",
   "EstimatedMinutes": 6,
   "ExplanationVersion": 1,
   "Tags": [
    "NPV",
    "salvage"
   ],
   "Dependencies": [
    "CBQ23-E1-Q1"
   ]
  },
  {
   "ItemID": "CBQ23-E1-Q3",
   "Type": "numeric",
   "Prompt": "Enter the simple payback period in years, rounded to two decimals.",
   "Correct": "3.64",
   "Explanation": "Payback = initial investment ÷ annual cash flow = $500,000 ÷ $137,500 = 3.64 years (per ID-03). Payback says nothing about VALUE — flows after year 3.64 (including the salvage) are invisible to it — but boards use it as a liquidity and risk screen: capital tied up for under four years on a five-year asset sits inside many manufacturers' tolerance.",
   "Topic": "Payback period",
   "Subtopic": "Liquidity screen",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "ID-03: Payback = I0 ÷ uniform annual CF",
   "CommonTrapReference": "Using pre-tax savings ($150,000 → 3.33 yrs) instead of after-tax cash flow.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "payback"
   ],
   "Dependencies": [
    "CBQ23-E1-Q1"
   ]
  },
  {
   "ItemID": "CBQ23-E1-Q4",
   "Type": "select",
   "Prompt": "Which statement about the profitability index is correct?",
   "Correct": "A",
   "Choices": [
    "PI = (PV of inflows ÷ investment) = ($521,235 + $27,941) ÷ $500,000 ≈ 1.10 — each invested dollar returns about $1.10 of present value; PI > 1 ⇔ NPV > 0, and PI ranks capital use when funds are rationed",
    "PI equals NPV divided by investment (0.10 here), signaling rejection",
    "PI ignores the time value of money, unlike payback",
    "A PI below 1.0 can still justify acceptance when payback is short"
   ],
   "Explanation": "The profitability index scales NPV machinery into a ratio: PV of ALL inflows (operating plus terminal) over the outlay. At roughly 1.10, Willow receives $1.10 of present value per dollar committed — consistent with the positive $49K NPV. Its distinct virtue appears under CAPITAL RATIONING: ranking candidates by PI spreads limited dollars where they generate the most value per dollar. A sub-1.0 PI mathematically guarantees negative NPV (option D's payback logic conflates liquidity with value), and option A vs B turns on including the +1.0 base in the numerator.",
   "Topic": "Profitability index",
   "Subtopic": "Ratio interpretation",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "ID-02: PI = PV of future CFs ÷ I0",
   "CommonTrapReference": "Computing NPV/I0 and calling it PI.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "profitability index"
   ],
   "Dependencies": [
    "CBQ23-E1-Q2"
   ]
  },
  {
   "ItemID": "CBQ23-E1-Q5",
   "Type": "select",
   "Prompt": "Why does Anita lead with NPV rather than IRR for this proposal?",
   "Correct": "B",
   "Choices": [
    "IRR is always larger than NPV, so it flatters the project before the committee",
    "NPV measures dollars of value created assuming interim flows reinvest at the 10% opportunity cost — an achievable assumption — while IRR's embedded reinvestment rate and scale blindness can misstate and misrank projects",
    "NPV ignores the time value of money whereas IRR captures it",
    "The two methods always agree on both acceptance and ranking, so the choice is cosmetic"
   ],
   "Explanation": "For a single conventional project the accept/reject verdicts coincide — but the PRESENTATION question is which metric communicates value honestly. NPV's reinvestment assumption (the WACC) is executable in practice; IRR assumes the same flows compound AT the IRR, an aggressive claim when rates are mid-teens. NPV also states absolute value created ($49K) rather than a rate that says nothing about size, and it sidesteps the multiple-root problems unconventional flow patterns create. Committees still ask for IRR — the strong presenter supplies both, anchored on NPV.",
   "Topic": "NPV versus IRR",
   "Subtopic": "Method selection",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Presenting IRR's reinvestment assumption as if it were neutral.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "NPV",
    "IRR"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-E1-Q6",
   "Type": "select",
   "Prompt": "Which recommendation best integrates the metrics and the savings sensitivity?",
   "Correct": "A",
   "Choices": [
    "ACCEPT — NPV ≈ +$49K, PI ≈ 1.10, payback 3.64 years; even at labor savings 10% BELOW plan (ATCF falls to $126,250), NPV stays positive at roughly +$6.5K, though the cushion thins — lock in service contracts and training before cutover",
    "REJECT — payback of 3.64 years exceeds the informal three-year target regardless of NPV",
    "ACCEPT because payback is under four years, whatever the NPV sign",
    "REJECT — the salvage estimate is speculative and any uncertainty invalidates the model"
   ],
   "Explanation": "The decision survives its own stress test: shaving savings 10% drops annual ATCF from $137,500 to $126,250 ((145,000 × 0.75) + 25,000) and NPV to approximately +$6,500 — still positive, but thin enough to warrant protecting the savings stream (maintenance/service agreements, operator training) rather than celebrating. Rejecting on an informal payback rule (B) discards a positive-NPV asset — payback is a screen, not a verdict. Accepting on payback alone (C) inverts that error. Uncertainty (D) is managed with sensitivity and contracts, not by refusing to model.",
   "Topic": "Investment recommendation",
   "Subtopic": "Robustness",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Letting a screening rule override the value metric the committee exists to maximize.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "recommendation",
    "sensitivity"
   ],
   "Dependencies": [
    "CBQ23-E1-Q2"
   ]
  }
 ]
}
,
{
 "CaseID": "CBQ23-C2",
 "Title": "The Full-Capacity Order Negotiation",
 "SectionTags": [
  "C"
 ],
 "BlueprintDomain": "Decision Analysis",
 "BlueprintObjectives": [
  "Apply opportunity cost of displaced sales to a special-order decision at full capacity",
  "Compute the minimum acceptable price for a capacity-consuming order",
  "Structure a counterproposal that preserves contribution economics"
 ],
 "PrimaryCompetency": "Analysis",
 "EstimatedMinutes": 30,
 "Difficulty": "Difficult",
 "DifficultyScore": 4,
 "ScenarioText": "Hartwell Textiles runs 9,800 of its 10,000-unit monthly capacity, selling to regular customers at $80 with variable cost of $48. A national retailer requests 1,200 units per month for three months at $65 — and wants an answer before month-end. Controller Dana Walsh must quantify the true economics and arm the sales team with a defensible counterposition.",
 "Industry": "Textile manufacturing",
 "CompanyType": "Manufacturer",
 "CompanyName": "Hartwell Textiles",
 "Stakeholder": "Controller Dana Walsh",
 "BusinessFunction": "Pricing decisions",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "special order",
  "opportunity cost",
  "capacity",
  "minimum price"
 ],
 "CreatedDate": "2026-08-24",
 "ModifiedDate": "2026-08-24",
 "Author": "AI",
 "Confidence": 90,
 "RevisionHistory": [
  {
   "Date": "2026-08-24",
   "Version": "1.0",
   "Author": "AI",
   "Summary": "Initial creation"
  }
 ],
 "question_state": "Certified",
    "certification_session": "P2-059",
 "Part": 2,
 "Part2OnlyFlag": true,
 "LearningObjectives": [
  "Compute incremental margin on a special order ignoring displacement",
  "Quantify the opportunity cost of displaced regular sales",
  "Derive the minimum acceptable price covering variable cost plus opportunity cost"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ23-C2-E1",
   "CaseID": "CBQ23-C2",
   "Type": "table",
   "Title": "Exhibit 1 — Capacity and Regular Economics (Monthly)",
   "Purpose": "Provides capacity utilization and regular-customer economics needed to identify displaced volume.",
   "ReferencedBy": [
    "CBQ23-C2-Q1",
    "CBQ23-C2-Q2",
    "CBQ23-C2-Q4"
   ],
   "Headers": [
    "Factor",
    "Value"
   ],
   "Rows": [
    [
     "Monthly capacity",
     "10,000 units"
    ],
    [
     "Current production (regular customers)",
     "9,800 units"
    ],
    [
     "Regular selling price",
     "$80 per unit"
    ],
    [
     "Variable cost per unit",
     "$48 per unit"
    ]
   ],
   "DataFormat": "USD; monthly figures",
   "AccuracyCheck": "Idle capacity = 10,000 - 9,800 = 200 units"
  },
  {
   "ExhibitID": "CBQ23-C2-E2",
   "CaseID": "CBQ23-C2",
   "Type": "text",
   "Title": "Exhibit 2 — Retailer Request",
   "Purpose": "States the special-order terms under negotiation.",
   "ReferencedBy": [
    "CBQ23-C2-Q1",
    "CBQ23-C2-Q3",
    "CBQ23-C2-Q5",
    "CBQ23-C2-Q6"
   ],
   "Body": "The retailer requests 1,200 units per month for three consecutive months at $65 per unit, delivered. It positions the price as final: 'we can buy elsewhere.' No commitment beyond the three months is offered."
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ23-C2-Q1",
   "Type": "numeric",
   "Prompt": "Enter the MONTHLY incremental contribution margin the order would add if idle capacity were unlimited, in dollars.",
   "Correct": "20400",
   "Explanation": "Contribution = 1,200 units × ($65 − $48) = $20,400 per month. This is the number the order's champions will quote — and it is genuinely what the order adds IF no regular sales are sacrificed. Whether that condition holds is the entire analytical question.",
   "Topic": "Special order margin",
   "Subtopic": "Incremental contribution",
   "Difficulty": "Moderate-Easy",
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "Incremental CM = units x (price - VC)",
   "CommonTrapReference": "Stopping the analysis at this figure without checking capacity.",
   "EstimatedMinutes": 4,
   "ExplanationVersion": 1,
   "Tags": [
    "contribution margin"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C2-Q2",
   "Type": "numeric",
   "Prompt": "Enter the MONTHLY opportunity cost of the regular sales that must be displaced, in dollars.",
   "Correct": "32000",
   "Explanation": "Idle capacity covers only 200 of the 1,200 requested units; the remaining 1,000 displace regular sales. Lost contribution = 1,000 × ($80 − $48) = $32,000 per month. This is REAL economic sacrifice — regular customers pay $80 for exactly the same machine time the order would consume at $65.",
   "Topic": "Opportunity cost",
   "Subtopic": "Displaced sales",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": true,
   "FormulaReference": "Lost CM = displaced units x (regular price - VC)",
   "CommonTrapReference": "Assuming the whole order fits into the 200-unit idle sliver.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "opportunity cost"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C2-Q3",
   "Type": "numeric",
   "Prompt": "Enter the NET monthly effect of accepting the order as offered, in dollars (use a minus sign if negative).",
   "Correct": "-11600",
   "Explanation": "Net = incremental contribution − lost regular contribution = $20,400 − $32,000 = −$11,600 per month. Accepting as offered converts $32,000 of $80-sales into $20,400 of $65-sales while consuming identical scarce machine time — an $11,600 monthly step backward dressed as new business.",
   "Topic": "Special order net effect",
   "Subtopic": "Full-capacity decision",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": true,
   "FormulaReference": "Net = incremental CM - lost CM",
   "CommonTrapReference": "Accepting because price exceeds variable cost at full capacity.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "net effect"
   ],
   "Dependencies": [
    "CBQ23-C2-Q1",
    "CBQ23-C2-Q2"
   ]
  },
  {
   "ItemID": "CBQ23-C2-Q4",
   "Type": "numeric",
   "Prompt": "Enter the MINIMUM acceptable price per unit for the full 1,200-unit order, rounded to two decimals.",
   "Correct": "74.67",
   "Explanation": "The floor must cover variable cost PLUS the opportunity cost spread across every unit ordered: ($48 × 1,200 + $32,000) ÷ 1,200 = ($57,600 + $32,000) ÷ 1,200 = $89,600 ÷ 1,200 = $74.67. At anything below $74.67 Hartwell is literally paying to displace its best customers. Note this exceeds even the midpoint between $48 and $80 — full-capacity orders are expensive to serve.",
   "Topic": "Minimum acceptable price",
   "Subtopic": "Opportunity-cost pricing",
   "Difficulty": "Very Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Apply",
   "CalculationRequired": true,
   "FormulaReference": "Floor = [VC x Q + Lost CM] / Q",
   "CommonTrapReference": "Quoting variable cost ($48) as the floor when capacity binds.",
   "EstimatedMinutes": 6,
   "ExplanationVersion": 1,
   "Tags": [
    "minimum price"
   ],
   "Dependencies": [
    "CBQ23-C2-Q2"
   ]
  },
  {
   "ItemID": "CBQ23-C2-Q5",
   "Type": "select",
   "Prompt": "Which counterproposal preserves Hartwell's economics while keeping the relationship alive?",
   "Correct": "B",
   "Choices": [
    "Accept the full 1,200 units at $65 since three months of volume strengthens the retail partnership",
    "Fulfill only the 200 truly-idle units at any price at or above $48 variable cost, and price any quantity beyond 200 at regular-list economics (or decline that portion) — explaining plainly that peak-season capacity is committed",
    "Reject categorically without counterproposal, citing policy against below-list orders",
    "Match a competitor's rumored $60 price to prevent the retailer from switching future volume"
   ],
   "Explanation": "The split structure prices each unit at its TRUE opportunity cost: idle units genuinely cost only $48 to serve, so any price above that adds pure contribution, while displaced units consume $80-worth of machine time and cannot be discounted without destroying value. Categorical rejection (C) forfeits the free $200-unit contribution out of pride; matching rumors (D) deepens losses by $15 per unit versus the offer already on the table; blanket acceptance (A) institutionalizes the −$11,600 monthly leak.",
   "Topic": "Counterproposal design",
   "Subtopic": "Tiered capacity pricing",
   "Difficulty": "Difficult",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Treating all units in an order as having identical opportunity cost.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "counteroffer"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-C2-Q6",
   "Type": "select",
   "Prompt": "Which recommendation should Dana deliver to the sales VP?",
   "Correct": "D",
   "Choices": [
    "Accept at $65 — revenue growth justifies temporary margin pressure during peak season",
    "Accept at $65 but ask production to add a weekend shift at premium overtime to protect regular customers",
    "Present the minimum-price analysis ($74.67) and refuse any discussion below it, ending negotiations",
    "DECLINE the 1,200 at $65 as structured, present the tiered counter (idle units from $48; displaced units at regular economics), and share the capacity outlook honestly — positioning Hartwell as a disciplined partner rather than a distressed seller"
   ],
   "Explanation": "The recommendation executes the arithmetic through the relationship lens: declining the unprofitable structure protects $32,000/month of superior contribution, the tiered counter captures every dollar of genuinely available capacity, and transparent capacity communication converts 'no' into 'here is what works' — preserving the customer for periods when slack returns. Overtime (B) introduces a NEW relevant cost (premium wages) that likely pushes the true floor higher still, not lower. Hard refusal (C) wins the argument and loses the account.",
   "Topic": "Negotiation recommendation",
   "Subtopic": "Relationship-preserving refusal",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Framing capacity constraints as inflexibility instead of economics.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "recommendation"
   ],
   "Dependencies": []
  }
 ]
},
{
 "CaseID": "CBQ23-F2",
 "Title": "Misappropriation at the Branch",
 "SectionTags": [
  "F"
 ],
 "BlueprintDomain": "Professional Ethics",
 "BlueprintObjectives": [
  "Map fraud evidence to the fraud triangle and identify the control-addressable element",
  "Apply IMA obligations when discovering suspected asset misappropriation",
  "Design governance and anti-fraud program remediation"
 ],
 "PrimaryCompetency": "Judgment",
 "EstimatedMinutes": 30,
 "Difficulty": "Difficult",
 "DifficultyScore": 4,
 "ScenarioText": "Controller Elena Vasquez of Harborline Distributors discovers that a branch manager appears to have routed roughly $180,000 over two years to a fictitious vendor he controls — fake invoices approved solely by him, paid to an account he opened. The audit committee meets Thursday; the branch manager is scheduled to present his quarterly results. Elena must decide her immediate actions and the governance remediation she will propose.",
 "Industry": "Wholesale distribution",
 "CompanyType": "Distributor",
 "CompanyName": "Harborline Distributors",
 "Stakeholder": "Controller Elena Vasquez",
 "BusinessFunction": "Internal control",
 "QuestionCount": 6,
 "ExhibitCount": 2,
 "ProductionStatus": "Draft",
 "Version": "1.0",
 "Tags": [
  "fraud triangle",
  "asset misappropriation",
  "vendor fraud",
  "governance"
 ],
 "CreatedDate": "2026-08-24",
 "ModifiedDate": "2026-08-24",
 "Author": "AI",
 "Confidence": 90,
 "RevisionHistory": [
  {
   "Date": "2026-08-24",
   "Version": "1.0",
   "Author": "AI",
   "Summary": "Initial creation"
  }
 ],
 "question_state": "Certified",
    "certification_session": "P2-059",
 "Part": 2,
 "Part2OnlyFlag": true,
 "LearningObjectives": [
  "Decompose fraud facts into pressure, opportunity, and rationalization",
  "Sequence IMA-compliant actions upon discovery of suspected misappropriation",
  "Prioritize control remediation addressing the opportunity leg",
  "Specify investigation governance boundaries for management accountants"
 ],
 "Exhibits": [
  {
   "ExhibitID": "CBQ23-F2-E1",
   "CaseID": "CBQ23-F2",
   "Type": "table",
   "Title": "Exhibit 1 — Evidence Summary",
   "Purpose": "Provides the factual pattern Elena has assembled for committee review.",
   "ReferencedBy": [
    "CBQ23-F2-Q1",
    "CBQ23-F2-Q3",
    "CBQ23-F2-Q4"
   ],
   "Headers": [
    "Finding",
    "Detail"
   ],
   "Rows": [
    [
     "Vendor record",
     "'Northgate Supply' created 26 months ago; address matches branch manager's storage unit; phone matches his mobile"
    ],
    [
     "Invoice pattern",
     "14 invoices, $8K-$22K, all approved solely by branch manager; no receiving documents; generic service descriptions"
    ],
    [
     "Payments",
     "All wired to one external account opened same month as vendor setup"
    ],
    [
     "Personal context",
     "Branch manager recently disclosed significant personal debts in unrelated conversation"
    ]
   ]
  },
  {
   "ExhibitID": "CBQ23-F2-E2",
   "CaseID": "CBQ23-F2",
   "Type": "text",
   "Title": "Exhibit 2 — Framework References",
   "Purpose": "Summarizes the frameworks governing Elena's response.",
   "ReferencedBy": [
    "CBQ23-F2-Q2",
    "CBQ23-F2-Q5",
    "CBQ23-F2-Q6"
   ],
   "Body": "Fraud triangle: pressure (incentive/need), opportunity (control gap), rationalization (justification).\nIMA Statement: escalate suspected misconduct to appropriate authorities within the organization; do not engage in activities discrediting the profession; confidentiality bounds disclosure channels.\nGovernance practice: audit committee directs investigations via counsel and forensic specialists; management preserves evidence; crime/fidelity insurers require prompt notice; regulators or law enforcement engaged by the committee, not individual managers."
  }
 ],
 "Items": [
  {
   "ItemID": "CBQ23-F2-Q1",
   "Type": "select",
   "Prompt": "Mapped to the fraud triangle, which element does the EVIDENCE most directly expose — and which is the only leg remediation can reliably address?",
   "Correct": "A",
   "Choices": [
    "Opportunity — sole-approval authority over a vendor he controlled; opportunity is the leg that controls and segregation directly remove. Pressure (his disclosed debts) and rationalization (unknowable inner justification) are personal states no internal control eliminates",
    "Pressure — the debts prove fraudulent intent and should anchor the referral package",
    "Rationalization — his performance reviews will reveal the justification narrative",
    "All three legs are equally controllable through policy statements"
   ],
   "Explanation": "The exhibits establish HOW the fraud became possible: one person could create a vendor, approve its invoices, and trigger payment — a closed loop of opportunity. Pressure and rationalization matter for understanding the actor but are private mental and personal conditions; anti-fraud architecture targets the OPPORTUNITY leg because that is the only one a control system touches (dual authorization, vendor-master change controls, analytics). Leading with the debt disclosure (B) invites defamation exposure while missing the systemic fix.",
   "Topic": "Fraud triangle",
   "Subtopic": "Opportunity mapping",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Building the case on motive while neglecting the control failure that enabled the act.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "fraud triangle"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-F2-Q2",
   "Type": "select",
   "Prompt": "What are Elena's correct IMMEDIATE actions upon completing her evidence assembly?",
   "Correct": "B",
   "Choices": [
    "Interview the branch manager directly to hear his explanation before escalating",
    "Secure copies of the evidence, restrict further payments to the vendor, and escalate confidentially to the audit committee chair — who directs any investigation through counsel and forensic specialists — taking care not to alert or confront the manager herself",
    "Notify law enforcement personally and freeze the branch manager's employment",
    "Circulate her findings to the branch's senior staff to corroborate details informally"
   ],
   "Explanation": "Discovery duties run UPWARD through governed channels: preserve evidence integrity, stop ongoing losses operationally, and hand direction to those empowered to investigate — the audit committee acting through counsel. Direct confrontation (A) tips the suspect, contaminates testimony, and exceeds a controller's role; self-directed law-enforcement contact and employment action (C) belong to the committee after legal advice; informal circulation (D) spreads confidential allegations without privilege protection.",
   "Topic": "Discovery response",
   "Subtopic": "Escalation discipline",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Apply",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Playing detective — interviewing suspects and broadcasting findings before governance engages.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "escalation"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-F2-Q3",
   "Type": "select",
   "Prompt": "Which REMEDIATION should Elena propose as the highest-priority control fix?",
   "Correct": "C",
   "Choices": [
    "Annual ethics attestation for all branch staff",
    "Institute dual authorization for new-vendor master-data creation plus system-enforced separation of vendor setup from invoice approval, supplemented by periodic data-analytics matching of vendor addresses, banking details, and employee records",
    "Raise the branch manager's compensation to reduce financial pressure",
    "Require original paper invoices for all purchases above $5,000"
   ],
   "Explanation": "The scheme lived entirely inside ONE broken control point: unchecked vendor-master authority combined with single-signature approval. Closing that loop — dual authorization on master-data changes, enforced segregation between setup and approval, and analytics screening vendor records against employee data (addresses, bank accounts, phones) — removes the exact mechanism used. Attestations (A) and compensation (B) target pressure and culture, useful but indirect; paper invoices (D) add paperwork without breaking the approval monopoly that actually failed.",
   "Topic": "Control remediation",
   "Subtopic": "Vendor master controls",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Proposing cultural remedies where a structural control gap did the damage.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "controls",
    "remediation"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-F2-Q4",
   "Type": "select",
   "Prompt": "Which action would VIOLATE proper investigation boundaries if Elena took it now?",
   "Correct": "C",
   "Choices": [
    "Preserving system logs, invoice images, and wire records under restricted access",
    "Noting in working papers that suspicion is unresolved and labels remain provisional",
    "Conducting a covert forensic interview of the branch manager herself to 'get his side on record' before Thursday",
    "Confirming with the bank — through counsel once engaged — the beneficial owner of the external account"
   ],
   "Explanation": "Forensic interviews belong to trained investigators operating under counsel's direction and legal privilege; a controller confronting the suspect risks tipping him off, tainting admissions, and creating liability — precisely why Exhibit 2 assigns investigation direction to the committee. Evidence preservation (A) and provisional language (B) are model practice, and beneficial-owner verification (D) is investigative work properly executed THROUGH counsel, not personally.",
   "Topic": "Investigation boundaries",
   "Subtopic": "Role limits",
   "Difficulty": "Moderate",
   "DifficultyScore": 3,
   "CognitiveLevel": "Analyze",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Crossing from evidence custodian into amateur investigator.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "investigation"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-F2-Q5",
   "Type": "select",
   "Prompt": "Which committee-level response package is complete and correctly sequenced?",
   "Correct": "B",
   "Choices": [
    "Terminate the manager immediately upon Elena's verbal summary, then investigate afterward if funds are unrecovered",
    "Engage forensic specialists and counsel through the audit committee; issue litigation-hold/evidence-preservation notices; place payment blocks; notify the crime/fidelity carrier within policy deadlines; assess whether any filed statements require correction; decide law-enforcement referral on counsel's advice",
    "Publicly announce the fraud to reassure employees, then determine the facts",
    "Handle everything internally without insurer notice to protect renewal premiums"
   ],
   "Explanation": "Governed response runs specialist-first and deadline-aware: counsel preserves privilege and steers the investigation; preservation notices prevent spoliation; payment blocks stop ongoing loss; carriers can DENY claims for late notice, making timely insurer notification a cash recovery issue; financial-statement impact assessment protects reporting integrity; and referral decisions carry legal consequences best made on advice. Terminate-first (A) burns evidence and due process; publicity-before-facts (C) multiplies liability; premium-driven silence (D) trades recoverable funds for optics.",
   "Topic": "Governance response",
   "Subtopic": "Committee sequencing",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Missing insurer notice deadlines that forfeit otherwise valid recovery.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "governance",
    "response"
   ],
   "Dependencies": []
  },
  {
   "ItemID": "CBQ23-F2-Q6",
   "Type": "select",
   "Prompt": "Which ANTI-FRAUD PROGRAM design best prevents recurrence network-wide?",
   "Correct": "D",
   "Choices": [
    "Mandate annual signed ethics codes at every location and declare the program complete",
    "Increase branch manager base salaries company-wide to reduce financial pressure",
    "Concentrate all vendor approvals in corporate headquarters with no branch input, maximizing central control",
    "A layered program: enforced segregation of vendor-setup and payment approval, continuous data-analytics matching of vendors to employee data, a monitored anonymous hotline with non-retaliation guarantees, tone-at-top messaging backed by visible consequence management, and periodic fraud-risk assessments refreshed as processes change"
   ],
   "Explanation": "Sustainable prevention is LAYERED because the triangle has three legs and schemes adapt: structural controls kill today's opportunity, analytics catch tomorrow's variant, hotlines surface what systems miss (consistently the top detection method), tone determines whether people use any of it, and risk assessments keep the program current as the business changes. Codes alone (A) document intent without changing behavior; salaries (B) address one pressure among many and cannot be calibrated against unknown needs; total centralization (C) cripples operations and simply relocates the trust question.",
   "Topic": "Anti-fraud program design",
   "Subtopic": "Layered prevention",
   "Difficulty": "Difficult",
   "DifficultyScore": 4,
   "CognitiveLevel": "Evaluate",
   "CalculationRequired": false,
   "FormulaReference": "",
   "CommonTrapReference": "Equating a signed code of conduct with a functioning control environment.",
   "EstimatedMinutes": 5,
   "ExplanationVersion": 1,
   "Tags": [
    "prevention",
    "program design"
   ],
   "Dependencies": []
  }
 ]
},
  {
    "CaseID": "CBQ23-A1",
    "Title": "Acquisition Diligence Ratio Workup",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Calculate liquidity and leverage ratios from condensed audited financial statements",
      "Evaluate the effect of off-balance-sheet obligations on adjusted leverage",
      "Explain foreign-currency translation treatment for a foreign subsidiary under ASC 830"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Ridgeway Capital Partners has signed a letter of intent to acquire Halvorsen Tooling Corporation, a closely held manufacturer of precision cutting tools with $118 million in annual sales, and expects six weeks of exclusivity before signing. Priya Raman, Ridgeway's director of due diligence, has circulated Halvorsen's condensed statements alongside counsel's schedule of contingent and off-balance-sheet items. The credit committee wants baseline liquidity and leverage metrics, a first-cut adjusted leverage figure that credits the parent guarantee of the Mexican subsidiary's plant financing, and confirmation of how the peso translation deficit is treated before the pricing model is rerun. Complete the requested workup from the exhibits provided.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A1-E1",
        "CaseID": "CBQ23-A1",
        "Type": "table",
        "Title": "Exhibit 1 — Condensed Balance Sheet, December 31, 2025",
        "Purpose": "Provides current asset and current liability components for the current ratio (Q1), total liabilities and equity for adjusted debt-to-equity (Q3), and classification anchors for the matching item (Q6).",
        "ReferencedBy": [
          "CBQ23-A1-Q1",
          "CBQ23-A1-Q3",
          "CBQ23-A1-Q6"
        ],
        "Headers": [
          "Line item",
          "Amount ($000s)"
        ],
        "Rows": [
          [
            "Cash and cash equivalents",
            "8,400"
          ],
          [
            "Marketable securities",
            "2,600"
          ],
          [
            "Accounts receivable, net",
            "19,500"
          ],
          [
            "Inventories",
            "14,700"
          ],
          [
            "Prepaid expenses",
            "1,800"
          ],
          [
            "Total current assets",
            "47,000"
          ],
          [
            "Accounts payable",
            "12,300"
          ],
          [
            "Accrued expenses",
            "4,200"
          ],
          [
            "Current portion of long-term debt",
            "3,500"
          ],
          [
            "Total current liabilities",
            "20,000"
          ],
          [
            "Long-term debt",
            "40,000"
          ],
          [
            "Other non-current liabilities",
            "12,000"
          ],
          [
            "Total liabilities",
            "72,000"
          ],
          [
            "Total shareholders' equity",
            "60,000"
          ]
        ],
        "DataFormat": "USD thousands, whole amounts",
        "AccuracyCheck": "Current assets: 8,400 + 2,600 + 19,500 + 14,700 + 1,800 = 47,000. Current liabilities: 12,300 + 4,200 + 3,500 = 20,000. Total liabilities: 20,000 + 40,000 + 12,000 = 72,000."
      },
      {
        "ExhibitID": "CBQ23-A1-E2",
        "CaseID": "CBQ23-A1",
        "Type": "table",
        "Title": "Exhibit 2 — Selected Income Statement Data, Fiscal Year 2025",
        "Purpose": "Supplies the derivation path from net sales to EBIT and interest expense for the times-interest-earned computation (Q2).",
        "ReferencedBy": [
          "CBQ23-A1-Q2"
        ],
        "Headers": [
          "Line item",
          "Amount ($000s)"
        ],
        "Rows": [
          [
            "Net sales",
            "118,000"
          ],
          [
            "Cost of goods sold",
            "76,700"
          ],
          [
            "Gross profit",
            "41,300"
          ],
          [
            "Operating expenses",
            "24,600"
          ],
          [
            "Operating income (EBIT)",
            "16,700"
          ],
          [
            "Interest expense",
            "4,175"
          ],
          [
            "Income before income taxes",
            "12,525"
          ]
        ],
        "DataFormat": "USD thousands, whole amounts",
        "AccuracyCheck": "118,000 - 76,700 = 41,300; 41,300 - 24,600 = 16,700; 16,700 - 4,175 = 12,525."
      },
      {
        "ExhibitID": "CBQ23-A1-E3",
        "CaseID": "CBQ23-A1",
        "Type": "table",
        "Title": "Exhibit 3 — Off-Balance-Sheet Items and FX Translation Note",
        "Purpose": "Lists unrecorded obligations for the adjusted-leverage computation (Q3), the multi-select debt-like screening (Q5), and the AOCI translation item underlying the ASC 830 question (Q4) and matching item (Q6).",
        "ReferencedBy": [
          "CBQ23-A1-Q3",
          "CBQ23-A1-Q4",
          "CBQ23-A1-Q5",
          "CBQ23-A1-Q6"
        ],
        "Headers": [
          "Item",
          "Amount ($000s)",
          "Diligence note"
        ],
        "Rows": [
          [
            "Parent guarantee of Halvorsen de Mexico bank debt (wholly owned subsidiary)",
            "6,000",
            "Buyer credit policy treats guaranteed affiliated debt as debt-like"
          ],
          [
            "Unfunded vested pension obligation (2025 actuarial valuation)",
            "4,500",
            "Buyer credit policy treats unfunded vested benefits as debt-like"
          ],
          [
            "Non-cancelable take-or-pay resin supply contract priced above market",
            "(1,800)",
            "Negative fair value; buyer credit policy treats onerous contracts as debt-like"
          ],
          [
            "Cumulative foreign-currency translation adjustment on Mexican subsidiary (AOCI)",
            "(2,100)",
            "Peso is the functional currency; adjustment reported in other comprehensive income"
          ]
        ],
        "DataFormat": "USD thousands; parenthesized amounts are deficits or liabilities",
        "AccuracyCheck": "Amounts are standalone estimates from counsel and actuaries; no summation required. Only items flagged debt-like enter the Q3 adjustment."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A1-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, calculate Halvorsen's current ratio at December 31, 2025. Round to two decimal places (accept 2.34 to 2.36) and enter a plain number.",
        "Correct": "2.35",
        "Explanation": "The current ratio (catalog FA-01) divides current assets by current liabilities. Current assets total $47.0 million (cash 8,400 + marketable securities 2,600 + receivables 19,500 + inventories 14,700 + prepaids 1,800), and current liabilities total $20.0 million (payables 12,300 + accruals 4,200 + current portion of long-term debt 3,500), so 47,000 / 20,000 = 2.35. For Ridgeway's diligence file, 2.35x signals comfortable short-term coverage for a tooling maker with seasonal working-capital swings. A common error is excluding the current portion of long-term debt from current liabilities, which would overstate liquidity to 2.53x and mislead the credit committee.",
        "Topic": "Current ratio",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q2",
        "Type": "numeric",
        "Prompt": "Using Exhibit 2, calculate Halvorsen's fiscal 2025 times interest earned. Round to two decimal places (accept 3.99 to 4.01) and enter a plain number.",
        "Correct": "4.00",
        "Explanation": "Times interest earned (catalog FA-08) divides EBIT by interest expense. Derive EBIT from the extract: net sales 118,000 - COGS 76,700 - operating expenses 24,600 = 16,700. Coverage = 16,700 / 4,175 = 4.00x, meaning operating earnings cover the interest burden four times - adequate at plan but thin in a cyclical trough. A frequent mistake is using income before taxes (12,525) or net income in the numerator, which understates coverage because interest is already deducted before those subtotals are reached.",
        "Topic": "Times interest earned",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q3",
        "Type": "select",
        "Prompt": "Per the term sheet, Ridgeway's preliminary adjusted-leverage measure treats only the parent guarantee of the Mexican subsidiary's bank debt as debt-like. Using Exhibits 1 and 3, what is adjusted debt-to-equity?",
        "Correct": "C",
        "Choices": {
          "A": "1.20 - reported liabilities without any adjustment",
          "B": "1.25 - half of the guarantee added on a probable-loss basis",
          "C": "1.30 - full guarantee of $6.0 million added to total liabilities",
          "D": "1.34 - guarantee plus the absolute value of the AOCI translation deficit"
        },
        "Explanation": "Adjusted debt-to-equity (catalog FA-07) adds the guaranteed affiliated debt to reported obligations: (72,000 + 6,000) / 60,000 = 78,000 / 60,000 = 1.30 versus the unadjusted 72,000 / 60,000 = 1.20. A parent guarantee is a present obligation a change-of-control lender would price as debt, so the full amount belongs in the first-cut capitalization. Candidates err by stopping at reported leverage or by sweeping the peso translation deficit into debt; under ASC 830 that deficit is an equity measurement item in AOCI, not a liability, so option D double-counts an equity component.",
        "Topic": "Adjusted debt-to-equity",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-07",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q4",
        "Type": "select",
        "Prompt": "Halvorsen de Mexico keeps its books in pesos, which is its functional currency. Based on the Exhibit 3 note, which statement correctly describes the U.S. GAAP treatment of the $(2.1) million translation adjustment?",
        "Correct": "B",
        "Choices": {
          "A": "Monetary accounts are remeasured at historical exchange rates and resulting gains are reported in net income",
          "B": "Balance-sheet accounts are translated at the current rate and the translation adjustment is reported in other comprehensive income until disposal or substantial liquidation",
          "C": "Translation adjustments are recognized in earnings each period the exchange rate changes",
          "D": "Balance-sheet translation uses the weighted-average income-statement rate"
        },
        "Explanation": "ASC 830 prescribes the current-rate method when the local currency is the foreign operation's functional currency, as with Halvorsen de Mexico's peso books. Assets and liabilities translate at the period-end current rate, income-statement items at weighted-average rates, and the resulting translation adjustment bypasses earnings, accumulating in AOCI until sale or substantial liquidation. That is why the $2.1 million deficit never touched net income. The classic trap is confusing translation with remeasurement: remeasurement applies the temporal method when the U.S. dollar is the functional currency, pushing gains and losses through earnings each period.",
        "Topic": "Foreign-currency translation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q5",
        "Type": "multi",
        "Prompt": "Ridgeway's buyer credit policy treats unrecorded obligations as debt-like when computing adjusted capitalization. Select the three items from Exhibit 3 that qualify.",
        "Correct": [
          "Parent guarantee of Halvorsen de Mexico bank debt (wholly owned subsidiary)",
          "Unfunded vested pension obligation (2025 actuarial valuation)",
          "Non-cancelable take-or-pay resin supply contract priced above market"
        ],
        "Choices": {
          "A": "Parent guarantee of Halvorsen de Mexico bank debt (wholly owned subsidiary)",
          "B": "Unfunded vested pension obligation (2025 actuarial valuation)",
          "C": "Operating lease liabilities of $7.2 million recorded in total liabilities",
          "D": "Non-cancelable take-or-pay resin supply contract priced above market",
          "E": "Accrued warranty liability of $2.3 million recorded in current liabilities"
        },
        "Explanation": "Debt-like adjustments capture obligations a buyer economically assumes at closing that sit outside reported debt. The $6.0 million subsidiary-debt guarantee, the $4.5 million unfunded vested pension obligation, and the take-or-pay contract carrying a negative $1.8 million fair value are each unrecorded commitments, so all three join the adjusted capitalization. By contrast, operating lease liabilities and the accrued warranty liability are already inside the $72.0 million of reported liabilities on Exhibit 1; adding them again would double-count and inflate the purchase-price adjustment demanded from sellers.",
        "Topic": "Debt-like adjustments",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A1-Q6",
        "Type": "match",
        "Prompt": "Match each balance-sheet or diligence item to its correct treatment in the ratio workup.",
        "LeftItems": [
          "Current portion of long-term debt",
          "Prepaid expenses",
          "Guarantee of the Mexican subsidiary's debt",
          "Cumulative peso translation adjustment"
        ],
        "RightItems": [
          "Included in current liabilities when computing the current ratio",
          "Excluded from the quick ratio numerator",
          "Treated as debt-like in the adjusted leverage calculation",
          "Reported in accumulated other comprehensive income, not earnings",
          "Remeasured under the temporal method with gains in net income"
        ],
        "Correct": {
          "Current portion of long-term debt": "Included in current liabilities when computing the current ratio",
          "Prepaid expenses": "Excluded from the quick ratio numerator",
          "Guarantee of the Mexican subsidiary's debt": "Treated as debt-like in the adjusted leverage calculation",
          "Cumulative peso translation adjustment": "Reported in accumulated other comprehensive income, not earnings"
        },
        "Explanation": "Each classification drives a different diligence conclusion. The $3.5 million current portion of long-term debt belongs in current liabilities, depressing both the current and quick ratios. Prepaid expenses are current assets but drop out of the quick ratio because they convert to expense rather than cash. The Mexican debt guarantee enters the debt-like schedule feeding the 1.30x adjusted leverage. The cumulative peso translation adjustment sits in AOCI under ASC 830 and is released to earnings only on disposal; the temporal-method distractor would apply only if the U.S. dollar were the subsidiary's functional currency.",
        "Topic": "Ratio classification treatments",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Precision cutting tools",
    "CompanyType": "Manufacturer",
    "CompanyName": "Halvorsen Tooling Corporation",
    "Stakeholder": "Priya Raman, Director of Due Diligence, Ridgeway Capital Partners",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "CreatedDate": "2026-08-25",
    "ModifiedDate": "2026-08-25",
    "Author": "P2-061 authoring wave",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-25",
        "Version": "1.0",
        "Author": "P2-061 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute current ratio and times interest earned from condensed statements",
      "Adjust leverage for guarantees and other debt-like exposures",
      "Distinguish translation under ASC 830 from temporal-method remeasurement"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ23-B1",
    "Title": "Dividend Policy and Covenant Constraints",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute dividend payout and interest-coverage ratios under alternative capital-return policies",
      "Evaluate a share repurchase against a special dividend within debt-covenant and liquidity limits",
      "Assess the signaling and flexibility properties of dividends versus buybacks for the board"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Bellhaven Components Inc., a manufacturer of commercial HVAC control systems, enters the annual renewal of its $250 million revolver facing a times-interest-earned covenant floor of 4.0x tested quarterly. CFO Elena Marsh has brought four costed capital-return options to the board finance committee after stronger margins pushed free cash flow above the investment plan's needs. The committee must weigh a higher regular dividend, a $60 million repurchase funded partly with new borrowing, a $2.00 per-share special dividend, and a combination, all without breaching the covenant or the $40 million treasury cash minimum. Recommend a course supported by the pro forma figures in the exhibits.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-B1-E1",
        "CaseID": "CBQ23-B1",
        "Type": "email",
        "Title": "Exhibit 1 — Board Finance Committee Memorandum",
        "Purpose": "Establishes covenant mechanics, the treasury cash policy, and the renewal context consumed by Q4 and Q6.",
        "ReferencedBy": [
          "CBQ23-B1-Q4",
          "CBQ23-B1-Q6"
        ],
        "Body": "From: Elena Marsh, Chief Financial Officer. To: Board Finance Committee. Re: Capital return ahead of revolver renewal. Lenders test the times-interest-earned covenant quarterly using trailing-twelve-month EBIT divided by interest expense; the floor remains 4.0x through renewal. Treasury policy requires a $40 million minimum operating-cash balance at each quarter-end. The treasurer confirms the proposed term loan would be fully drawn at closing, unlike our committed revolver, which stays undrawn until we elect to borrow. Please evaluate the alternatives in Exhibit 2 against these constraints before the pre-renewal lender meeting."
      },
      {
        "ExhibitID": "CBQ23-B1-E2",
        "CaseID": "CBQ23-B1",
        "Type": "table",
        "Title": "Exhibit 2 — Costed Capital-Return Alternatives (Year 1)",
        "Purpose": "Provides outlays, financing sources, and interest impacts used in the pro forma coverage ranking (Q3), the repurchase-versus-dividend evaluation (Q4), the multi-select constraint check (Q5), and matching characterizations (Q6).",
        "ReferencedBy": [
          "CBQ23-B1-Q2",
          "CBQ23-B1-Q3",
          "CBQ23-B1-Q4",
          "CBQ23-B1-Q5",
          "CBQ23-B1-Q6"
        ],
        "Headers": [
          "Alternative",
          "Cash outlay (Year 1)",
          "Financing source",
          "Annual interest impact",
          "Committee notes"
        ],
        "Rows": [
          [
            "Option 1: Raise regular quarterly dividend from $0.40 to $0.50",
            "$12,000,000 incremental ($0.40 per share x 30,000,000 shares)",
            "Operating cash flow",
            "None",
            "Recurring commitment investors will expect to sustain"
          ],
          [
            "Option 2: $60,000,000 open-market repurchase",
            "$60,000,000 (about 2,068,966 shares at an assumed average price of $29.00)",
            "$35,000,000 excess cash plus $25,000,000 term loan at 8.0%",
            "$2,000,000",
            "Retires about 6.9% of shares outstanding"
          ],
          [
            "Option 3: Special dividend of $2.00 per share",
            "$60,000,000",
            "Excess cash",
            "None",
            "One-time distribution; leaves cash of $35,000,000 versus the $40,000,000 policy minimum"
          ],
          [
            "Option 4: Option 1 dividend increase plus $30,000,000 repurchase",
            "$42,000,000",
            "$27,000,000 excess cash plus $15,000,000 term loan at 8.0%",
            "$1,200,000",
            "Blended signal; smaller share-count reduction"
          ]
        ],
        "DataFormat": "USD whole dollars except per-share amounts",
        "AccuracyCheck": "Interest: 25,000,000 x 8.0% = 2,000,000; 15,000,000 x 8.0% = 1,200,000. Shares retired under Option 2: 60,000,000 / 29.00 = 2,068,966 (6.90% of 30,000,000)."
      },
      {
        "ExhibitID": "CBQ23-B1-E3",
        "CaseID": "CBQ23-B1",
        "Type": "table",
        "Title": "Exhibit 3 — Financial Summary (Trailing Twelve Months)",
        "Purpose": "Supplies EBIT, interest, cash, share count, dividend, EPS, and covenant-floor values for the payout computation (Q1), coverage computations (Q2, Q3), and constraint testing (Q5).",
        "ReferencedBy": [
          "CBQ23-B1-Q1",
          "CBQ23-B1-Q2",
          "CBQ23-B1-Q3",
          "CBQ23-B1-Q5"
        ],
        "Headers": [
          "Measure",
          "Value"
        ],
        "Rows": [
          [
            "EBIT (trailing twelve months)",
            "$88,000,000"
          ],
          [
            "Interest expense (trailing twelve months)",
            "$18,000,000"
          ],
          [
            "Times interest earned, current",
            "4.89x"
          ],
          [
            "Unrestricted cash, current",
            "$95,000,000"
          ],
          [
            "Shares outstanding",
            "30,000,000"
          ],
          [
            "Current annual dividend per share",
            "$1.60"
          ],
          [
            "Expected earnings per share, next year",
            "$3.20"
          ],
          [
            "Covenant floor, times interest earned",
            "4.00x"
          ]
        ],
        "DataFormat": "USD; ratios to two decimals",
        "AccuracyCheck": "Current TIE = 88,000,000 / 18,000,000 = 4.888... shown as 4.89x rounded. Payout = 1.60 / 3.20 = 50.0%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-B1-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 3, calculate Bellhaven's expected dividend payout ratio for next year on the current quarterly dividend of $0.40. Express as a percentage rounded to one decimal place (accept 49.9 to 50.1) and enter a plain number.",
        "Correct": "50.0",
        "Explanation": "The dividend payout ratio (catalog FA-22) is dividends per share divided by earnings per share. Bellhaven pays $0.40 quarterly, or $1.60 annually, against expected EPS of $3.20, so payout = 1.60 / 3.20 = 50.0%. The retention ratio is the complement at 50.0%, the slice funding internal growth before any policy change. Marsh's redesign debate turns on this split because raising the payout locks in recurring outflows. A common error divides total dividends by revenue or confuses payout with dividend yield, which uses market price rather than earnings in the denominator.",
        "Topic": "Dividend payout ratio",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-22",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q2",
        "Type": "numeric",
        "Prompt": "If Bellhaven executes Option 2 in full, calculate pro forma times interest earned using Exhibits 2 and 3. Round to two decimal places (accept 4.39 to 4.41) and enter a plain number.",
        "Correct": "4.40",
        "Explanation": "Pro forma TIE (catalog FA-08) holds trailing EBIT constant at $88.0 million because a buyback does not touch operations, then rebuilds interest: existing $18.0 million plus the new $25.0 million term loan at 8.0% adding $2.0 million gives $20.0 million total. Coverage = 88.0 / 20.0 = 4.40x, clearing the 4.00x floor with modest headroom. Only the borrowed tranche raises interest since the remaining $35.0 million comes from excess cash. The typical trap is charging the full $60.0 million outflow against EBIT or forgetting that dividends, unlike interest, do not enter this coverage test.",
        "Topic": "Pro forma interest coverage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q3",
        "Type": "select",
        "Prompt": "Using Exhibits 2 and 3, which option produces the lowest pro forma times interest earned while still remaining above the 4.0x covenant floor?",
        "Correct": "B",
        "Choices": {
          "A": "Option 1 - dividend increase, pro forma TIE 4.89x",
          "B": "Option 2 - $60 million repurchase with the 8.0% term loan, pro forma TIE 4.40x",
          "C": "Option 3 - special dividend funded from excess cash, pro forma TIE 4.89x",
          "D": "Option 4 - dividend increase plus $30 million repurchase, pro forma TIE 4.58x"
        },
        "Explanation": "Each option's coverage follows from what moves the TIE fraction. Options 1 and 3 pay dividends only, leaving EBIT and interest untouched, so coverage stays at 88.0 / 18.0 = 4.89x. Option 2 adds $2.0 million of interest for 88.0 / 20.0 = 4.40x, and Option 4 adds $1.2 million for 88.0 / 19.2 = 4.58x. All four clear the 4.00x floor, so the lowest compliant coverage is Option 2 at 4.40x. Analysts sometimes mis-rank the combination below Option 2 by overlooking its smaller loan draw, or they flag Option 2 as a breach when it actually retains 0.40x of headroom.",
        "Topic": "Covenant headroom ranking",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-08",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q4",
        "Type": "select",
        "Prompt": "The committee asks why the Option 2 repurchase is preferable to the Option 3 special dividend of equal cost. Which statement best supports the repurchase?",
        "Correct": "D",
        "Choices": {
          "A": "Special dividends receive more favorable tax treatment for every shareholder group",
          "B": "A repurchase commits the board to sustain identical cash outflows in future years",
          "C": "The special dividend improves times interest earned by reducing reported liabilities",
          "D": "The repurchase returns cash flexibly, retires roughly 2.07 million shares to support EPS, and can be paced without disturbing a perceived permanent dividend commitment"
        },
        "Explanation": "Against a special dividend of equal cost, the open-market repurchase offers three structural advantages: spending can be accelerated, slowed, or suspended as conditions shift; retiring about 2,068,966 shares (roughly 6.9% of 30.0 million outstanding) supports the EPS trajectory; and investors read repurchases as flexible rather than as a permanent commitment the way a higher regular dividend would be. Tax outcomes differ by shareholder and jurisdiction, so option A overgeneralizes. Dividends bypass the income statement entirely, so option C is wrong, and option B describes the opposite of repurchase flexibility.",
        "Topic": "Repurchase versus special dividend",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q5",
        "Type": "multi",
        "Prompt": "Which three statements correctly justify approving Option 2 under the constraints in Exhibits 1 through 3? Select exactly three.",
        "Correct": [
          "Pro forma times interest earned of 4.40x remains above the 4.00x covenant floor",
          "Post-buyback unrestricted cash of $60,000,000 stays above the $40,000,000 treasury minimum",
          "Retiring about 2,068,966 shares advances the board's EPS objective"
        ],
        "Choices": {
          "A": "Pro forma times interest earned of 4.40x remains above the 4.00x covenant floor",
          "B": "Post-buyback unrestricted cash of $60,000,000 stays above the $40,000,000 treasury minimum",
          "C": "Retiring about 2,068,966 shares advances the board's EPS objective",
          "D": "Deductible interest on the term loan makes the repurchase costless to the company",
          "E": "A special dividend signals stronger long-term earnings confidence than a comparable repurchase program"
        },
        "Explanation": "Option 2 survives every constraint in the packet. Pro forma coverage of 4.40x exceeds the 4.00x floor; unrestricted cash falls from $95.0 million by the $35.0 million cash tranche to $60.0 million, comfortably above the $40.0 million treasury minimum; and retiring about 2.07 million shares supports the EPS objective. Option D overstates the case, because deductible interest merely lowers the after-tax cost of the loan rather than eliminating it. Option E reverses the conventional reading: special distributions are commonly viewed as one-time events, while steady repurchases are often interpreted as ongoing confidence in cash generation.",
        "Topic": "Capital-return constraint testing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-B1-Q6",
        "Type": "match",
        "Prompt": "Match each element of the capital-return package to its correct characterization.",
        "LeftItems": [
          "Times interest earned covenant",
          "Quarterly dividend increase",
          "Open-market share repurchase",
          "New $25 million term loan at 8.0%"
        ],
        "RightItems": [
          "Tested quarterly on trailing-twelve-month EBIT divided by interest expense",
          "Creates a recurring cash commitment that investors expect the company to sustain",
          "Returns cash with flexibility while reducing shares outstanding",
          "Adds $2.0 million of annual interest expense when fully drawn at closing",
          "Remains undrawn until the treasurer elects to borrow under the facility"
        ],
        "Correct": {
          "Times interest earned covenant": "Tested quarterly on trailing-twelve-month EBIT divided by interest expense",
          "Quarterly dividend increase": "Creates a recurring cash commitment that investors expect the company to sustain",
          "Open-market share repurchase": "Returns cash with flexibility while reducing shares outstanding",
          "New $25 million term loan at 8.0%": "Adds $2.0 million of annual interest expense when fully drawn at closing"
        },
        "Explanation": "The covenant is tested quarterly on trailing-twelve-month EBIT over interest expense, so the 4.0x floor binds before the annual renewal negotiation even arrives. Raising the regular dividend creates a recurring commitment the market expects Bellhaven to sustain, making later reductions reputationally costly. The open-market repurchase delivers cash with flexibility while shrinking the share count toward the EPS objective. The new term loan is fully drawn at closing, adding $2.0 million of annual interest; the undrawn-facility description fits a committed revolver, which is precisely why it serves as the distractor here.",
        "Topic": "Capital-return mechanics",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Commercial HVAC control systems",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bellhaven Components Inc.",
    "Stakeholder": "Elena Marsh, Chief Financial Officer",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "CreatedDate": "2026-08-25",
    "ModifiedDate": "2026-08-25",
    "Author": "P2-061 authoring wave",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-25",
        "Version": "1.0",
        "Author": "P2-061 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute payout ratios and pro forma interest coverage under financing alternatives",
      "Rank capital-return options against covenant floors and liquidity policies",
      "Weigh flexibility and signaling differences between dividends and repurchases"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ23-D1",
    "Title": "ERM Risk Assessment Workshop",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Score risk-register entries using likelihood and impact scales under COSO ERM 2017",
      "Compute residual risk after planned control actions and test it against board risk appetite",
      "Select a risk response using costed alternatives and identify leading key risk indicators"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Juniper Medical Distribution, a distributor of medical supplies operating a regional repackaging line, convened a two-day ERM workshop led by Chief Risk Officer Marcus Oyelaran after a near-miss resin shortage idled that line for nine days. The executive committee scored the refreshed risk register on five-point likelihood and impact scales, quantified the effect of planned controls, and priced response alternatives for the ransomware exposure flagged by internal audit. Remaining decisions are to confirm inherent and residual scores, lock the cost-justified response for the cyber exposure against the board's technology appetite ceiling, and approve leading indicators for the top supply risk. Finalize the register outputs from the exhibits provided.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-D1-E1",
        "CaseID": "CBQ23-D1",
        "Type": "table",
        "Title": "Exhibit 1 — Enterprise Risk Register (Workshop Output)",
        "Purpose": "Provides likelihood, impact, inherent scores, planned-control reductions, and residual scores consumed by Q1, Q2, Q4, Q5, and the principle matching in Q6.",
        "ReferencedBy": [
          "CBQ23-D1-Q1",
          "CBQ23-D1-Q2",
          "CBQ23-D1-Q4",
          "CBQ23-D1-Q5",
          "CBQ23-D1-Q6"
        ],
        "Headers": [
          "Risk ID",
          "Risk description",
          "Likelihood (1-5)",
          "Impact (1-5)",
          "Inherent score",
          "Planned controls",
          "Score reduction",
          "Residual score"
        ],
        "Rows": [
          [
            "R-01",
            "Single-source resin supply disruption for repackaging line",
            "4",
            "5",
            "20",
            "Dual-source qualification plus quarterly supplier audits",
            "9",
            "11"
          ],
          [
            "R-02",
            "Ransomware attack on ERP and order-management platform",
            "3",
            "5",
            "15",
            "Accelerated patch cadence only",
            "3",
            "12"
          ],
          [
            "R-03",
            "Product recall from contamination in repackaged lots",
            "2",
            "5",
            "10",
            "Expanded HACCP testing at receiving and release",
            "4",
            "6"
          ],
          [
            "R-04",
            "Attrition of food-safety and quality-assurance scientists",
            "4",
            "2",
            "8",
            "Retention incentives and cross-training program",
            "2",
            "6"
          ]
        ],
        "DataFormat": "Ordinal scales 1-5; scores are integers",
        "AccuracyCheck": "Inherent = likelihood x impact: 4x5=20, 3x5=15, 2x5=10, 4x2=8. Residual = inherent - reduction: 20-9=11, 15-3=12, 10-4=6, 8-2=6."
      },
      {
        "ExhibitID": "CBQ23-D1-E2",
        "CaseID": "CBQ23-D1",
        "Type": "table",
        "Title": "Exhibit 2 — R-02 Cyber Response Alternatives (Annualized)",
        "Purpose": "Costs each response option for the ransomware risk so Q3 can rank them on expected-cost grounds and Q4 can confirm the resulting appetite position.",
        "ReferencedBy": [
          "CBQ23-D1-Q3",
          "CBQ23-D1-Q4"
        ],
        "Headers": [
          "Option",
          "Annual cost",
          "Residual score effect",
          "Retained expected annual loss"
        ],
        "Rows": [
          [
            "Accept current residual exposure",
            "$0",
            "Stays at 12",
            "$1,500,000"
          ],
          [
            "Mitigate: immutable backups, network segmentation, managed detection service",
            "$400,000",
            "Falls from 12 to 6",
            "$450,000"
          ],
          [
            "Transfer: cyber liability policy with $500,000 deductible",
            "$600,000 premium",
            "Falls from 12 to 8",
            "$550,000 after deductible"
          ],
          [
            "Avoid: retire the digital ordering platform",
            "$3,200,000 forgone contribution margin",
            "Eliminated (0)",
            "$0"
          ]
        ],
        "DataFormat": "USD whole dollars; ordinal scores integers",
        "AccuracyCheck": "Mitigate net benefit = (1,500,000 - 450,000) - 400,000 = 650,000. Transfer net benefit = 1,500,000 - (600,000 + 550,000) = 350,000. Avoid sacrifices $3,200,000 of contribution."
      },
      {
        "ExhibitID": "CBQ23-D1-E3",
        "CaseID": "CBQ23-D1",
        "Type": "email",
        "Title": "Exhibit 3 — CRO Workshop Close-Out Note",
        "Purpose": "States the board-approved appetite ceilings used to judge R-02's post-response position (Q4) and frames the committee reporting duty reflected in the principle matching (Q6).",
        "ReferencedBy": [
          "CBQ23-D1-Q4",
          "CBQ23-D1-Q6"
        ],
        "Body": "From: Marcus Oyelaran, Chief Risk Officer. To: Executive Committee. Colleagues - the board-approved statement sets residual-risk appetite ceilings by class: technology and cyber at 9, operational and supply at 12, and strategic at 14. Per COSO ERM 2017, those ceilings are set when we define risk appetite (Principle 7), severity is assessed on a residual basis after controls (Principle 11), and I owe the committee an aggregated portfolio view of all major risks against strategy (Principle 14). Please close out scoring, lock a cost-justified response for R-02, and bring forward leading indicators for R-01 at our next session."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-D1-Q1",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute the inherent risk score for R-01 on the enterprise five-by-five matrix. Enter an integer (accept 19 to 21).",
        "Correct": "20",
        "Explanation": "Inherent scoring under COSO ERM 2017 multiplies ordinal likelihood by ordinal impact (catalog RM-02), operationalizing Principle 10 (Identifies Risk) as input to Principle 11 (Assesses Severity of Risk). R-01 scores 4 x 5 = 20, placing single-source resin dependency in the highest band before any control credit. Multiplication matters: summing 4 + 5 = 9 would bury a near-certain, severe event in the middle of the heat map. The integer scale is deliberate because register scores feed prioritization thresholds rather than dollar forecasts.",
        "Topic": "Inherent risk scoring",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q2",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, compute the residual risk score for R-01 after the planned dual-sourcing and audit controls. Enter an integer (accept 10 to 12).",
        "Correct": "11",
        "Explanation": "Residual risk (catalog RM-03) nets planned-control mitigation against inherent severity, reflecting Principle 11's requirement to assess severity on a residual basis. For R-01, dual-source qualification and quarterly supplier audits remove 9 points from the inherent 20, leaving 20 - 9 = 11. Eleven sits inside the operational appetite ceiling of 12, so acceptance with key-risk-indicator monitoring is defensible. Reversing the subtraction or expecting residual risk to reach zero are the standard errors; no control suite eliminates uncertainty entirely.",
        "Topic": "Residual risk computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-03",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q3",
        "Type": "select",
        "Prompt": "Based on the annualized economics in Exhibit 2, which response option should the committee select for R-02 on cost-benefit grounds?",
        "Correct": "A",
        "Choices": {
          "A": "Mitigate - fund the $400,000 control package; net expected benefit about $650,000 and residual falls to 6",
          "B": "Accept - retain residual 12 with no incremental spending",
          "C": "Transfer - rely on the cyber policy at a $600,000 premium",
          "D": "Avoid - retire the digital ordering platform"
        },
        "Explanation": "Response economics compare each option's annual cost against retained expected loss, consistent with Principle 13 (Implements Risk Responses). Accepting retains $1,500,000 at residual 12. Full mitigation costs $400,000 and cuts retained loss to $450,000, a net benefit of (1,500,000 - 450,000) - 400,000 = $650,000, while dropping residual to 6. Insurance totals $600,000 premium plus $550,000 retained for $1,150,000, a net benefit of only $350,000, and exiting the platform sacrifices $3,200,000 of contribution. Mitigation dominates on cost-benefit and restores appetite compliance simultaneously.",
        "Topic": "Risk response selection",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "RM-01",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q4",
        "Type": "select",
        "Prompt": "After funding the response chosen in Q3, R-02's residual score falls to 6. Using Exhibits 1 through 3, which conclusion is correct under COSO ERM 2017?",
        "Correct": "C",
        "Choices": {
          "A": "The score still breaches the technology ceiling of 9, so operations should wind down the platform anyway",
          "B": "Once the new controls pass internal audit, residual risk drops to zero and monitoring can stop",
          "C": "The score sits inside the technology ceiling of 9, so continue monitoring through KRIs while recognizing residual risk persists after controls under Principle 11",
          "D": "Appetite ceilings apply only to inherent scores, so the comparison to the ceiling is irrelevant"
        },
        "Explanation": "With the funded package in place, R-02's residual score drops from 12 to 6, inside the board's technology-and-cyber ceiling of 9 set when management helped the board define risk appetite under Principle 7. The correct posture is continued monitoring through KRIs and periodic reassessment, acknowledging that controls reduce rather than remove uncertainty, which is why Principle 11 assesses severity on a residual basis. Claiming zero residual once an audit passes misstates control assurance; restricting appetite tests to inherent scores contradicts Principle 11; and winding down the platform ignores that mitigation already restored compliance at far less cost than avoidance.",
        "Topic": "Appetite and residual monitoring",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q5",
        "Type": "multi",
        "Prompt": "Oyelaran asked for leading key risk indicators for R-01. Which three candidates qualify? Select exactly three.",
        "Correct": [
          "Percentage of resin spend concentrated in the top three suppliers trending upward",
          "Average financial-health score of critical suppliers declining quarter over quarter",
          "On-time-in-full delivery rate from qualified suppliers deteriorating month over month"
        ],
        "Choices": {
          "A": "Percentage of resin spend concentrated in the top three suppliers trending upward",
          "B": "Average financial-health score of critical suppliers declining quarter over quarter",
          "C": "On-time-in-full delivery rate from qualified suppliers deteriorating month over month",
          "D": "Total product-liability insurance premium paid last fiscal year",
          "E": "Percentage of staff completing annual ethics training"
        },
        "Explanation": "Effective KRIs are measurable, forward-looking, and tied to the drivers of the specific risk. Rising concentration in the top three suppliers, declining supplier financial-health scores, and deteriorating on-time-in-full performance each predict a resin disruption before it strikes, letting Juniper trigger contingency playbooks early. Last fiscal year's insurance premium is a lagging cost artifact of a different risk-transfer decision, and ethics-training completion monitors conduct culture rather than logistics fragility, so neither would warn Oyelaran's team ahead of a supply interruption.",
        "Topic": "Key risk indicator selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-D1-Q6",
        "Type": "match",
        "Prompt": "Match each workshop artifact to the COSO ERM 2017 principle it exemplifies.",
        "LeftItems": [
          "Scoring likelihood x impact before and after controls",
          "Ranking risks against the board's appetite ceilings",
          "Choosing among accept, avoid, mitigate, and transfer alternatives",
          "Aggregating all major risks into a single view for the executive committee"
        ],
        "RightItems": [
          "Principle 11 - Assesses Severity of Risk",
          "Principle 12 - Prioritizes Risks",
          "Principle 13 - Implements Risk Responses",
          "Principle 14 - Develops Portfolio View",
          "Principle 7 - Defines Risk Appetite"
        ],
        "Correct": {
          "Scoring likelihood x impact before and after controls": "Principle 11 - Assesses Severity of Risk",
          "Ranking risks against the board's appetite ceilings": "Principle 12 - Prioritizes Risks",
          "Choosing among accept, avoid, mitigate, and transfer alternatives": "Principle 13 - Implements Risk Responses",
          "Aggregating all major risks into a single view for the executive committee": "Principle 14 - Develops Portfolio View"
        },
        "Explanation": "The workshop artifacts map cleanly onto the Performance component of COSO ERM 2017. Scoring likelihood and impact before and after controls instantiates Principle 11; ranking risks against appetite ceilings instantiates Principle 12; choosing among accept, avoid, mitigate, and transfer instantiates Principle 13; and the consolidated committee view instantiates Principle 14 (Develops Portfolio View). Setting the thresholds themselves belongs to Principle 7 within Strategy and Objective-Setting, which is why that label is reserved as the distractor rather than paired with the ranking activity that consumes its output.",
        "Topic": "COSO ERM 2017 principles",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Medical supplies distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Juniper Medical Distribution",
    "Stakeholder": "Marcus Oyelaran, Chief Risk Officer",
    "BusinessFunction": "Strategic planning",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "CreatedDate": "2026-08-25",
    "ModifiedDate": "2026-08-25",
    "Author": "P2-061 authoring wave",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-08-25",
        "Version": "1.0",
        "Author": "P2-061 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Apply likelihood-times-impact scoring to a risk register",
      "Derive residual risk after planned controls and test it against appetite ceilings",
      "Rank costed risk responses and select leading indicators for priority risks"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  }
,
  {
    "CaseID": "CBQ23-A2",
    "Title": "Earnings Quality and Accruals Gap Review",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Assess earnings quality using the relationship between net income and cash flow from operations",
      "Prepare and interpret common-size income statements to isolate margin drivers",
      "Evaluate working capital changes as indicators of accrual risk and potential manipulation"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Bright Meadow Foods, a family-owned organic food producer, has scheduled a renewal of its $12 million revolving credit facility with First Cascadia Bank. The bank credit committee asked for an earnings-quality assessment after noticing reported profits growing faster than operating cash flow. Priya Raman, controller of Bright Meadow Foods, must present an accruals-gap and common-size trend analysis together with recommended follow-up procedures to the audit committee before the facility renewal meeting.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-A2-E1",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Common-Size Income Statement Data ($ thousands)",
        "Purpose": "Provides the dollar amounts and percent-of-sales figures consumed by Q3 margin analysis and Q6 common-size matches; net sales is the common-size base for every ratio.",
        "ReferencedBy": [
          "CBQ23-A2-Q3",
          "CBQ23-A2-Q6"
        ],
        "Headers": [
          "Line item",
          "FY2025 $000s",
          "FY2025 % of sales",
          "FY2024 $000s",
          "FY2024 % of sales"
        ],
        "Rows": [
          [
            "Net sales",
            "48000",
            "100.0",
            "42000",
            "100.0"
          ],
          [
            "Cost of goods sold",
            "31680",
            "66.0",
            "27300",
            "65.0"
          ],
          [
            "Gross profit",
            "16320",
            "34.0",
            "14700",
            "35.0"
          ],
          [
            "Selling, general and administrative",
            "9600",
            "20.0",
            "8400",
            "20.0"
          ],
          [
            "Operating income",
            "6720",
            "14.0",
            "6300",
            "15.0"
          ],
          [
            "Interest expense",
            "960",
            "2.0",
            "840",
            "2.0"
          ],
          [
            "Income before income taxes",
            "5760",
            "12.0",
            "5460",
            "13.0"
          ]
        ],
        "DataFormat": "Dollar columns in thousands of USD; percentage columns rounded to one decimal place.",
        "AccuracyCheck": "Arithmetic verified twice: 48000-31680=16320; 16320-9600=6720; 6720-960=5760; FY2024: 42000-27300=14700; 14700-8400=6300; 6300-840=5460."
      },
      {
        "ExhibitID": "CBQ23-A2-E2",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Indirect-Method Inputs, FY2025 ($ thousands)",
        "Purpose": "Supplies every input needed by Q1 to rebuild FY2025 cash flow from operations and by Q2 to measure the accruals gap.",
        "ReferencedBy": [
          "CBQ23-A2-Q1",
          "CBQ23-A2-Q2"
        ],
        "Headers": [
          "Input to indirect method",
          "FY2025 amount ($ thousands)"
        ],
        "Rows": [
          [
            "Net income",
            "4320"
          ],
          [
            "Depreciation and amortization",
            "1200"
          ],
          [
            "Increase in accounts receivable",
            "900"
          ],
          [
            "Increase in inventories",
            "1150"
          ],
          [
            "Increase in accounts payable",
            "350"
          ]
        ],
        "DataFormat": "Amounts in thousands of USD; increases stated as positive values with direction implied by the row label.",
        "AccuracyCheck": "Arithmetic verified twice: CFO = 4320+1200-900-1150+350 = 3820; accruals check = 900+1150-350-1200 = 500 = 4320-3820."
      },
      {
        "ExhibitID": "CBQ23-A2-E3",
        "CaseID": "CBQ23-A2",
        "Type": "table",
        "Title": "Three-Year Earnings-Quality Trend ($ thousands)",
        "Purpose": "Provides net income and cash flow from operations for three years so Q4 can compute the coverage trend and Q6 can distinguish FY2025 measures from prior-year levels.",
        "ReferencedBy": [
          "CBQ23-A2-Q4",
          "CBQ23-A2-Q5",
          "CBQ23-A2-Q6"
        ],
        "Headers": [
          "Measure",
          "FY2025",
          "FY2024",
          "FY2023"
        ],
        "Rows": [
          [
            "Net income",
            "4320",
            "4095",
            "3720"
          ],
          [
            "Cash flow from operations",
            "3820",
            "3980",
            "3610"
          ]
        ],
        "DataFormat": "Amounts in thousands of USD as reported in audited statements.",
        "AccuracyCheck": "Coverage ratios verified twice: 3610/3720=97.0%; 3980/4095=97.2%; 3820/4320=88.4%."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-A2-Q1",
        "Type": "numeric",
        "Prompt": "Using the inputs in Exhibit 2 and the indirect method, compute Bright Meadow Foods FY2025 cash flow from operations in thousands of dollars. Enter your answer as a whole number with no commas or decimals.",
        "Correct": "3820",
        "Explanation": "Under ASC 230, the indirect method reconciles net income to cash flow from operations by removing noncash items and working capital movements. Starting with net income of $4,320 thousand, Bright Meadow adds back depreciation and amortization of $1,200 thousand, subtracts the $900 thousand accounts receivable increase and the $1,150 thousand inventory increase, and adds the $350 thousand accounts payable increase: 4320+1200-900-1150+350 = $3,820 thousand. Verification: the accruals bridge nets to 900+1150-350-1200 = $500 thousand, which equals net income less CFO (4320-3820), confirming internal consistency. In business terms only about 88 cents of each profit dollar converted to cash because growth was financed through slower customer payments and heavier stock on hand. A common trap is deducting the accounts payable increase; a payable increase supplies cash and must be added back.",
        "Topic": "Statement of cash flows",
        "Subtopic": "Indirect method reconciliation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Statement of cash flows - indirect method",
        "CommonTrapReference": "Adding the accounts payable increase as a deduction in the indirect-method reconciliation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "accruals",
          "indirect method",
          "ASC 230"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q2",
        "Type": "numeric",
        "Prompt": "Express Bright Meadow Foods FY2025 accruals gap as a percentage of net income, rounded to one decimal place. Enter digits only, for example 12.3.",
        "Correct": "11.6",
        "Explanation": "The accruals gap measures how much of reported profit has not yet converted to operating cash. Applying the formula (net income - CFO) / net income using the Q1 result: (4320-3820)/4320 = 500/4320 = 0.11574, or 11.6 percent rounded to one decimal place. Verification: 500/4320 recomputed independently gives 0.115741, identical after rounding. Nearly twelve cents of every reported FY2025 profit dollar is accrued rather than cash-backed, versus roughly 3 percent in FY2024 (115/4095), a deterioration the lender will probe during renewal. A common trap is dividing the $500 thousand gap by cash flow from operations instead of net income, which overstates the ratio at 13.1 percent.",
        "Topic": "Earnings quality",
        "Subtopic": "Accruals ratio measurement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Accruals ratio",
        "CommonTrapReference": "Dividing the accruals gap by CFO instead of net income, overstating the ratio",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "earnings quality",
          "accruals"
        ],
        "Dependencies": [
          "CBQ23-A2-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-A2-Q3",
        "Type": "select",
        "Prompt": "Based on the common-size income statement in Exhibit 1, which conclusion best describes the source of Bright Meadow Foods FY2025 margin change?",
        "Choices": [
          "Gross margin held steady while selling, general and administrative costs grew faster than sales, compressing operating margin.",
          "Operating margin declined 1.0 percentage point because gross margin contracted while SG&A and interest expense were unchanged as a percent of sales.",
          "Operating margin improved because gross margin expanded despite flat SG&A spending.",
          "Interest expense rose from 2.0 percent to 3.0 percent of sales and drove the operating margin decline."
        ],
        "Correct": "B",
        "Explanation": "Vertical (common-size) analysis expresses each income statement line as a percentage of net sales, isolating structural shifts from volume growth. Gross margin compressed from 35.0 to 34.0 percent (14700/42000 versus 16320/48000) while SG&A held at 20.0 percent (9600/48000 = 8400/42000) and interest held at 2.0 percent, so the entire 1.0-point decline in operating margin from 15.0 to 14.0 percent traces to cost of goods sold rising from 65.0 to 66.0 percent of sales. Verification: 34.0 minus 20.0 minus 2.0 equals 12.0 percent pretax margin, matching 5760/48000. The pattern indicates pricing pressure or input-cost inflation absorbed at the gross-margin line rather than overhead creep. A common trap is blaming SG&A leverage; its common-size ratio is unchanged year over year, and interest actually stayed flat at 2.0 percent.",
        "Topic": "Financial statement analysis",
        "Subtopic": "Common-size trend interpretation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Common-size analysis",
        "CommonTrapReference": "Attributing margin decline to SG&A when its common-size ratio is unchanged",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "common-size",
          "margin analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q4",
        "Type": "select",
        "Prompt": "Which observation from Exhibit 3 provides the strongest evidence of deteriorating earnings quality at Bright Meadow Foods in FY2025?",
        "Choices": [
          "Cash flow from operations remained positive throughout the three-year period.",
          "Net income increased in each of the last three fiscal years.",
          "Depreciation and amortization is a noncash charge that should be excluded from any earnings-quality assessment.",
          "CFO covered about 97 percent of net income in FY2023 and FY2024 but only 88.4 percent in FY2025 as receivables and inventories surged."
        ],
        "Correct": "D",
        "Explanation": "Horizontal review of the coverage trend is the core earnings-quality diagnostic: CFO covered 97.0 percent of net income in FY2023 (3610/3720) and 97.2 percent in FY2024 (3980/4095), but only 88.4 percent in FY2025 (3820/4320). Verification: each ratio recomputed independently reproduces 0.970, 0.972, and 0.884 respectively. Coupled with the receivable and inventory build disclosed among the indirect-method inputs, the pattern indicates profit recognized ahead of cash, the classic precursor to channel stuffing or accumulating obsolete stock ahead of a refinancing. A common trap is treating persistently positive CFO or rising net income as proof of quality; the level alone misses deterioration, so direction and composition matter more than sign.",
        "Topic": "Earnings quality",
        "Subtopic": "Cash conversion trend analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reading positive operating cash flow as proof of earnings quality without trend analysis",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "coverage trend",
          "red flags"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-A2-Q5",
        "Type": "multi",
        "Prompt": "Which three follow-up actions should Priya Raman recommend to the audit committee based on the FY2025 earnings-quality findings? Select exactly three.",
        "Choices": [
          "Request an aging of the accounts receivable increase and confirm whether customer terms were extended to pull shipments into FY2025.",
          "Ask management to reconcile the inventory build to open purchase commitments and reassess obsolescence reserve adequacy.",
          "Direct a restatement of prior-year financial statements to correct the decline in gross margin.",
          "Propose a credit-facility covenant requiring quarterly reporting of CFO-to-net-income coverage.",
          "Close the review because cash flow from operations remains positive."
        ],
        "Correct": [
          "Request an aging of the accounts receivable increase and confirm whether customer terms were extended to pull shipments into FY2025.",
          "Ask management to reconcile the inventory build to open purchase commitments and reassess obsolescence reserve adequacy.",
          "Propose a credit-facility covenant requiring quarterly reporting of CFO-to-net-income coverage."
        ],
        "Explanation": "Each accepted action targets a documented accrual-risk vector from the exhibits. Requesting the receivable aging tests whether terms were extended to pull revenue into FY2025 against the $900 thousand build; reconciling the inventory build to purchase commitments addresses the $1,150 thousand accumulation before it becomes obsolete stock; and a covenant keyed to quarterly CFO-to-net-income coverage institutionalizes monitoring around the fall from 97.2 to 88.4 percent. Verification: each recommendation maps one-to-one to an exhibit figure used earlier in the case. Restatement is unwarranted because a declining gross margin is a performance outcome, not an identified GAAP error, and positive CFO does not neutralize a widening accruals gap. A common trap is recommending sweeping restatement without first identifying a specific accounting violation.",
        "Topic": "Audit committee governance",
        "Subtopic": "Follow-up procedures on accrual risk",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Recommending restatement without identifying a specific GAAP violation",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "governance",
          "covenant"
        ],
        "Dependencies": [
          "CBQ23-A2-Q4"
        ]
      },
      {
        "ItemID": "CBQ23-A2-Q6",
        "Type": "match",
        "Prompt": "Match each FY2025 analytical measure to its computed value for the audit-committee handout.",
        "LeftItems": [
          "Accruals gap, FY2025",
          "CFO-to-net-income coverage, FY2025",
          "Change in gross margin, FY2024 to FY2025",
          "Operating margin, FY2025"
        ],
        "RightItems": [
          "$500 thousand",
          "88.4%",
          "-1.0 percentage points",
          "14.0%",
          "$3,820 thousand",
          "97.2%"
        ],
        "Correct": {
          "Accruals gap, FY2025": "$500 thousand",
          "CFO-to-net-income coverage, FY2025": "88.4%",
          "Change in gross margin, FY2024 to FY2025": "-1.0 percentage points",
          "Operating margin, FY2025": "14.0%"
        },
        "Explanation": "The matched values come directly from the computed metrics: the FY2025 accruals gap is 4320-3820 = $500 thousand; coverage is 3820/4320 = 88.4 percent; gross margin moved from 35.0 to 34.0 percent of sales, a change of -1.0 percentage points; and operating margin is 6720/48000 = 14.0 percent. Verification: each pairing was recalculated from raw exhibit dollars rather than copied from narrative text. The distractors are adjacent-but-wrong measures: 97.2 percent is FY2024 coverage and $3,820 thousand is the CFO level rather than the gap. Precision matters because the bank minutes will cite these exact figures. A common trap is confusing the dollar accruals gap with the percentage coverage measure when skimming the handout.",
        "Topic": "Analytical measures synthesis",
        "Subtopic": "Metric computation and matching",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Confusing the dollar accruals gap with the percentage coverage measure",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "synthesis",
          "metrics"
        ],
        "Dependencies": [
          "CBQ23-A2-Q2"
        ]
      }
    ],
    "Industry": "Organic food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bright Meadow Foods",
    "Stakeholder": "Priya Raman, Controller",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "earnings quality",
      "accruals",
      "common-size",
      "credit facility"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
    "RevisionHistory": [
      {
        "Date": "2026-08-26",
        "Version": "1.0",
        "Author": "P2-064 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Rebuild cash flow from operations under the indirect method",
      "Quantify an accruals gap and interpret it as an earnings-quality signal",
      "Read common-size statements to isolate the source of margin compression",
      "Recommend audit-committee follow-up procedures tied to specific red flags"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ23-E2",
    "Title": "Mutually Exclusive Line Investment Decision",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Evaluate capital investment proposals using net present value with stated discount factors",
      "Determine annual after-tax operating cash flows including the depreciation tax shield",
      "Apply the NPV criterion to choose between mutually exclusive projects of unequal scale"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Redstone Medical Devices plans to convert an idle production bay into one of two new lines and can fund only a single project this fiscal year. CFO Marcus Whitfield must recommend either Project Atlas, an automated endoscopy display assembly line, or Project Delta, a compact trocar molding cell, to the Capital Review Committee. The committee requested net present values at the corporate 10 percent cost of capital, an internal-rate-of-return comparison, and confirmation that no sunk or allocated costs distort the cash flow build before Friday vote.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E2-E1",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "Project Cash Flow Assumptions",
        "Purpose": "Provides the outlays, revenue, cost, depreciation, tax, and salvage inputs consumed by Q1 and Q2 to build each project after-tax cash flows and NPVs, and referenced in Q5 diligence checks.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q5"
        ],
        "Headers": [
          "Assumption",
          "Project Atlas",
          "Project Delta"
        ],
        "Rows": [
          [
            "Initial investment, Year 0",
            "$900,000",
            "$400,000"
          ],
          [
            "Incremental annual revenue",
            "$1,250,000",
            "$520,000"
          ],
          [
            "Annual cash operating costs",
            "$950,000",
            "$360,000"
          ],
          [
            "Annual EBITDA",
            "$300,000",
            "$160,000"
          ],
          [
            "Straight-line depreciation over 5 years",
            "$180,000",
            "$80,000"
          ],
          [
            "Tax rate",
            "30%",
            "30%"
          ],
          [
            "After-tax salvage, Year 5 (equals book value)",
            "$60,000",
            "$0"
          ]
        ],
        "DataFormat": "USD; percentages as stated rates; five-year horizon for both projects.",
        "AccuracyCheck": "Subtotals verified twice: 1250000-950000=300000; 520000-360000=160000; depreciation equals investment divided by 5 for both projects."
      },
      {
        "ExhibitID": "CBQ23-E2-E2",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "Discount Factors Used for This Evaluation",
        "Purpose": "States the exact present-value factors required for Q1 and Q2 NPV computations and the 12 percent factors proposed for the Q5 sensitivity stress test.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q5"
        ],
        "Headers": [
          "Discounting input",
          "Factor at 10%",
          "Factor at 12%"
        ],
        "Rows": [
          [
            "Five-year annuity, Years 1 through 5",
            "3.791",
            "3.605"
          ],
          [
            "Single payment received in Year 5",
            "0.621",
            "0.567"
          ]
        ],
        "DataFormat": "Factors carried to three decimal places as published in the corporate finance manual.",
        "AccuracyCheck": "Factor application verified twice: 264000 x 3.791 = 1000824 and 60000 x 0.621 = 37260; stress case 264000 x 3.605 + 60000 x 0.567 = 985740."
      },
      {
        "ExhibitID": "CBQ23-E2-E3",
        "CaseID": "CBQ23-E2",
        "Type": "text",
        "Title": "Memorandum from the Chief Financial Officer",
        "Purpose": "Establishes the mutually exclusive constraint, the 10 percent hurdle rate, and the sunk-cost and allocation caveats consumed by Q3, Q4, and Q5 reasoning.",
        "ReferencedBy": [
          "CBQ23-E2-Q3",
          "CBQ23-E2-Q4",
          "CBQ23-E2-Q5"
        ],
        "Body": "From: Marcus Whitfield, Chief Financial Officer. To: Capital Review Committee. Engineering confirmed the idle bay and validation staff can support only one launch this fiscal year, so Project Atlas and Project Delta are strictly mutually exclusive. The corporate hurdle rate remains 10 percent and the tax advisor confirmed the 30 percent effective rate. Two reminders from our policy manual: the $150,000 feasibility study completed last spring is sunk and stays out of Year 0, and projections must exclude allocated corporate overhead that will not change if a line is added. The fixed-asset schedule shows Atlas Year 5 salvage equal to book value, so no taxable gain or loss arises on disposal."
      },
      {
        "ExhibitID": "CBQ23-E2-E4",
        "CaseID": "CBQ23-E2",
        "Type": "table",
        "Title": "After-Tax Cash Flow Build ($ per year)",
        "Purpose": "Shows the derivation of each project level annual after-tax operating cash flow consumed by Q1, Q2, and Q6 matches.",
        "ReferencedBy": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2",
          "CBQ23-E2-Q6"
        ],
        "Headers": [
          "Build step",
          "Project Atlas",
          "Project Delta"
        ],
        "Rows": [
          [
            "EBITDA",
            "$300,000",
            "$160,000"
          ],
          [
            "Less depreciation",
            "$180,000",
            "$80,000"
          ],
          [
            "Taxable income",
            "$120,000",
            "$80,000"
          ],
          [
            "Income tax at 30%",
            "$36,000",
            "$24,000"
          ],
          [
            "Net income",
            "$84,000",
            "$56,000"
          ],
          [
            "Add back depreciation",
            "$180,000",
            "$80,000"
          ],
          [
            "Annual after-tax operating cash flow",
            "$264,000",
            "$136,000"
          ]
        ],
        "DataFormat": "USD per year for Years 1 through 5; column sums tie to Exhibit 1 inputs.",
        "AccuracyCheck": "Build verified twice via shortcut formula: 300000x0.70+180000x0.30=264000 and 160000x0.70+80000x0.30=136000."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E2-Q1",
        "Type": "numeric",
        "Prompt": "Using the Exhibit 4 build and the factors in Exhibit 2 (annuity factor for the level stream, single-sum factor for salvage), compute Project Atlas net present value at the 10 percent cost of capital. Enter whole dollars with no commas or decimals.",
        "Correct": "138084",
        "Explanation": "Net present value discounts each incremental after-tax cash flow at the stated 10 percent factors. Atlas level stream is $264,000 per year (300000x0.70 + 180000x0.30) and Year 5 also carries the $60,000 salvage whose book value equals proceeds, so no tax adjusts it. NPV = -900000 + 264000x3.791 + 60000x0.621 = -900000 + 1000824 + 37260 = $138,084. Verification: undiscounted inflows of 264000x5 + 60000 = $1,380,000 comfortably exceed the $900,000 outlay, corroborating the positive result. The positive NPV means Atlas adds shareholder value above the hurdle rate. A common trap is taxing the salvage proceeds despite zero gain, or dropping the depreciation tax shield when converting net income back to operating cash flow.",
        "Topic": "Capital budgeting",
        "Subtopic": "Net present value computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Present Value",
        "CommonTrapReference": "Omitting the depreciation tax shield from the annual after-tax cash flow build",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "tax shield"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E2-Q2",
        "Type": "numeric",
        "Prompt": "Compute Project Delta net present value at the 10 percent cost of capital using its Exhibit 4 after-tax cash flow and the Exhibit 2 annuity factor. Delta carries no salvage. Enter whole dollars with no commas or decimals.",
        "Correct": "115576",
        "Explanation": "Delta follows the same mechanics without terminal value: level after-tax cash flow of $136,000 per year (160000x0.70 + 80000x0.30) discounted with the five-year annuity factor. NPV = -400000 + 136000x3.791 = -400000 + 515576 = $115,576. Verification: the undiscounted stream totals 136000x5 = $680,000, roughly 1.7 times the outlay, consistent with a strongly positive NPV. Delta earns a spectacular percentage return, yet on its small base the dollar value creation trails Atlas. A common trap is applying a different discount rate to Delta because it looks riskier; both projects face the same corporate 10 percent hurdle in this evaluation unless the committee formally re-rates risk.",
        "Topic": "Capital budgeting",
        "Subtopic": "Scale effects on NPV ranking",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net Present Value",
        "CommonTrapReference": "Applying a project-specific discount rate when the corporate hurdle rate governs",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "mutually exclusive"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-E2-Q3",
        "Type": "select",
        "Prompt": "Which recommendation should Marcus Whitfield bring to the Capital Review Committee?",
        "Choices": [
          "Fund Project Atlas because its net present value of $138,084 exceeds Delta $115,576 at the 10 percent cost of capital.",
          "Fund Project Delta because its internal rate of return near 20 percent exceeds Atlas near 14 percent.",
          "Fund Project Delta because its profitability index of 1.29 beats Atlas 1.15.",
          "The choice is immaterial because both projects clear the hurdle rate."
        ],
        "Correct": "A",
        "Explanation": "For mutually exclusive projects the NPV rule governs: fund whichever project adds more dollar value at the cost of capital. Atlas NPV of $138,084 exceeds Delta $115,576, so Redstone funds Atlas even though Delta smaller investment makes its IRR near 20 percent and PI of 515576/400000 = 1.29 look superior to Atlas near 14 percent and 1038084/900000 = 1.15. Verification: both NPVs were recomputed in Q1 and Q2 and the PI ratios re-divide the same discounted inflow totals. Ranking by IRR or PI embeds scale bias whenever outlays differ by more than double, and the idle-bay constraint means the firm cannot simply take both. A common trap is defaulting to the highest-percentage metric without asking whether the forgone dollar spread can be redeployed at the hurdle rate.",
        "Topic": "Investment decision criteria",
        "Subtopic": "Mutually exclusive project selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Choosing the highest IRR for mutually exclusive projects of unequal scale",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "decision rule",
          "scale bias"
        ],
        "Dependencies": [
          "CBQ23-E2-Q1",
          "CBQ23-E2-Q2"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q4",
        "Type": "select",
        "Prompt": "Which statement about the internal rate of return comparison is most accurate for this decision?",
        "Choices": [
          "The internal rate of return assumes interim cash flows are reinvested at the cost of capital.",
          "When projects are mutually exclusive, internal rate of return and net present value select the same project whenever scale differs.",
          "Project Delta posts the higher internal rate of return because of its smaller outlay, yet net present value at the stated 10 percent rate governs the mutually exclusive choice.",
          "Project Atlas must be rejected because its simple payback period exceeds Delta payback period."
        ],
        "Correct": "C",
        "Explanation": "IRR is the rate that sets NPV to zero: Delta solves 400000 = 136000 times an annuity factor of 2.94, placing IRR near 20 percent, while Atlas solves 900000 = 264000 times roughly 3.41 plus salvage, near 14 percent. Because the projects differ in scale, IRR reinvestment assumptions distort the ranking, and NPV computed at the stated 10 percent rate correctly identifies wealth maximization. Verification: interpolating between published annuity factors confirms Delta between the 20 and 22 percent rows while Atlas sits just above 14 percent. It is NPV, not IRR, that assumes reinvestment at the cost of capital, and payback ignores time value plus post-payback flows entirely. A common trap is assuming the two criteria agree for mutually exclusive projects; scale differences routinely split them.",
        "Topic": "Investment decision criteria",
        "Subtopic": "IRR versus NPV conflict",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming NPV and IRR agree when projects are mutually exclusive",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "IRR",
          "reinvestment assumption"
        ],
        "Dependencies": [
          "CBQ23-E2-Q3"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q5",
        "Type": "multi",
        "Prompt": "Before the board vote, which three steps represent sound additional diligence on Project Atlas? Select exactly three.",
        "Choices": [
          "Stress-test the recommendation by recomputing Atlas NPV at a 12 percent discount rate using the alternate factors in Exhibit 2.",
          "Confirm the $60,000 salvage estimate and that salvage equals book value so no taxable gain arises in Year 5.",
          "Approve both projects since each NPV is positive and they serve different product lines.",
          "Add the $150,000 feasibility study completed last spring to the Year 0 investment outlay.",
          "Verify that projected costs exclude allocations of existing corporate overhead that will not change if the line launches."
        ],
        "Correct": [
          "Stress-test the recommendation by recomputing Atlas NPV at a 12 percent discount rate using the alternate factors in Exhibit 2.",
          "Confirm the $60,000 salvage estimate and that salvage equals book value so no taxable gain arises in Year 5.",
          "Verify that projected costs exclude allocations of existing corporate overhead that will not change if the line launches."
        ],
        "Explanation": "Sound capital governance tests fragility and input integrity before approval. Recomputing at 12 percent gives 264000x3.605 + 60000x0.567 - 900000 = 951720 + 34020 - 900000 = $85,740, confirming the decision survives a steeper hurdle; verification of this arithmetic appears in the Exhibit 2 accuracy note. Validating salvage matters because equality with book value is what keeps Year 5 free of tax adjustment, and scrubbing allocations honors the incremental-cash-flow principle set out in the CFO memo. Funding both projects contradicts the mutually exclusive premise, and the feasibility study is sunk, so adding it would distort Year 0 by $150,000 with no decision relevance. A common trap is treating historical study costs as relevant simply because they attach to the winning project.",
        "Topic": "Capital budgeting governance",
        "Subtopic": "Sensitivity and data integrity checks",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Including the sunk feasibility study in the Year 0 investment outlay",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity",
          "sunk cost"
        ],
        "Dependencies": [
          "CBQ23-E2-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-E2-Q6",
        "Type": "match",
        "Prompt": "Match each decision quantity to its correct value for the committee minutes.",
        "LeftItems": [
          "Project Atlas net present value at 10%",
          "Project Delta net present value at 10%",
          "Atlas annual after-tax operating cash flow",
          "Present value of Atlas Year 5 salvage"
        ],
        "RightItems": [
          "$138,084",
          "$115,576",
          "$264,000",
          "$37,260",
          "$1,380,000",
          "$515,576"
        ],
        "Correct": {
          "Project Atlas net present value at 10%": "$138,084",
          "Project Delta net present value at 10%": "$115,576",
          "Atlas annual after-tax operating cash flow": "$264,000",
          "Present value of Atlas Year 5 salvage": "$37,260"
        },
        "Explanation": "Each pairing isolates a distinct decision quantity: Atlas NPV = -900000 + 264000x3.791 + 60000x0.621 = $138,084; Delta NPV = -400000 + 136000x3.791 = $115,576; Atlas annual after-tax cash flow = 300000x0.70 + 180000x0.30 = $264,000; and the Year 5 salvage present value = 60000x0.621 = $37,260. Verification: every figure traces to a calculation performed earlier in the case rather than to narrative assertion. The distractors are nearby-but-wrong aggregates: $1,380,000 is Atlas undiscounted five-year total inflow and $515,576 is Delta discounted inflow before subtracting the initial outlay. Precision matters because the minutes and the facility covenant schedule will cite these exact amounts. A common trap is quoting undiscounted totals as though they were net present values.",
        "Topic": "Decision metrics synthesis",
        "Subtopic": "Metric-to-value matching",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Quoting undiscounted cash flow totals as net present values",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "synthesis",
          "metrics"
        ],
        "Dependencies": [
          "CBQ23-E2-Q2"
        ]
      }
    ],
    "Industry": "Medical devices",
    "CompanyType": "Manufacturer",
    "CompanyName": "Redstone Medical Devices",
    "Stakeholder": "Marcus Whitfield, Chief Financial Officer",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 4,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "capital budgeting",
      "NPV",
      "IRR",
      "mutually exclusive"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
    "RevisionHistory": [
      {
        "Date": "2026-08-26",
        "Version": "1.0",
        "Author": "P2-064 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Build annual after-tax project cash flows from EBITDA, depreciation, and tax inputs",
      "Compute NPV with stated annuity and single-sum discount factors",
      "Resolve NPV-versus-IRR conflicts for mutually exclusive projects",
      "Identify sunk costs and non-incremental allocations that must stay out of project analysis"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  },
  {
    "CaseID": "CBQ23-F3",
    "Title": "FCPA Classification and Books-and-Records Duties",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Distinguish FCPA anti-bribery violations from permissible facilitating payments for routine governmental actions",
      "Apply the books-and-records provisions to mischaracterized payments",
      "Formulate compliance remediation consistent with the IMA Statement of Ethical Professional Practice"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Meridian Solar Components, a US-listed solar equipment maker, is launching distribution in a Southeast Asian growth market through a commissioned distributor. Regional director Ravi Chandran has proposed contingent payments to secure the state power authority module certification, and internal audit director Lena Fischer has flagged undocumented customs-expediting entries in the new subsidiary ledger. Chief Compliance Officer Alicia Grant must classify the payments under the Foreign Corrupt Practices Act, quantify the documentation gaps, and recommend corrective action to the audit committee.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-F3-E1",
        "CaseID": "CBQ23-F3",
        "Type": "text",
        "Title": "Email from the Regional Director",
        "Purpose": "Documents the proposed certification payment terms, the routine customs request, and the suggested ledger description consumed by Q1, Q3, Q4, and Q5 analysis.",
        "ReferencedBy": [
          "CBQ23-F3-Q1",
          "CBQ23-F3-Q3",
          "CBQ23-F3-Q4"
        ],
        "Body": "From: Ravi Chandran, Regional Director, Asia-Pacific. To: Alicia Grant, Chief Compliance Officer. Subject: Market entry items needing sign-off. The state power authority controls module certification, and approval rests in the discretion of the senior procurement officer assigned to our file. To keep the launch date, we propose paying him $25,000 upon signing the agency agreement plus a success fee equal to 2 percent of first-year orders, which we forecast at $1,800,000. He prefers the funds routed through his family consulting firm, booked as market development consulting fees like last quarter. Separately, the port clerk asks $150 per container to release our already-certified modules within normal clearance windows instead of the multi-week queue."
      },
      {
        "ExhibitID": "CBQ23-F3-E2",
        "CaseID": "CBQ23-F3",
        "Type": "table",
        "Title": "Customs Expediting Ledger Summary, First Quarter",
        "Purpose": "Summarizes the subsidiary-ledger expediting activity so Q2 can quantify the unsupported population and Q5 can anchor the documentation remediation.",
        "ReferencedBy": [
          "CBQ23-F3-Q2",
          "CBQ23-F3-Q5"
        ],
        "Headers": [
          "Category",
          "Number of entries",
          "Total amount"
        ],
        "Rows": [
          [
            "Entries with attached customs release documents",
            "3",
            "$2,305"
          ],
          [
            "Entries lacking any supporting documentation",
            "11",
            "$3,575"
          ],
          [
            "Total customs expediting ledger activity",
            "14",
            "$5,880"
          ]
        ],
        "DataFormat": "Counts and USD totals for the first quarter of subsidiary operation.",
        "AccuracyCheck": "Totals verified twice: 3+11=14 entries and 2305+3575=5880 dollars; average of unsupported subset = 3575/11 = 325 exactly."
      },
      {
        "ExhibitID": "CBQ23-F3-E3",
        "CaseID": "CBQ23-F3",
        "Type": "text",
        "Title": "Policy Excerpt: Anti-Corruption Standards",
        "Purpose": "States the governing definitions and duties consumed by Q3, Q4, and Q6 classifications and by the Q5 remediation plan.",
        "ReferencedBy": [
          "CBQ23-F3-Q3",
          "CBQ23-F3-Q4",
          "CBQ23-F3-Q6"
        ],
        "Body": "Meridian Code of Conduct, Section 7. The company complies with the US Foreign Corrupt Practices Act. Anti-bribery: no employee or agent may offer anything of value to a foreign official to influence a discretionary governmental act or to obtain or retain business. Facilitating payments: payments to expedite routine, nondiscretionary governmental actions such as processing permits or releasing qualified shipments are subject to legal review and strict limits. Books and records: all transactions must be recorded accurately and fairly in reasonable detail, with no undisclosed or off-book accounts, and no payment may be characterized inconsistently with its purpose. Internal controls: assets may not be applied to undisclosed purposes, and suspected violations must be escalated to Compliance and the General Counsel immediately."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-F3-Q1",
        "Type": "numeric",
        "Prompt": "From the proposal in Exhibit 1, compute the total contingent consideration Ravi Chandran proposed for the certification approval, combining the fixed payment with the success fee on projected first-year orders. Enter whole dollars with no commas or decimals.",
        "Correct": "61000",
        "Explanation": "Contingent compensation tied to a government approval is measured on its full economics. The success fee equals 2 percent of projected first-year orders: 0.02 x 1800000 = $36,000, which combined with the $25,000 signature payment yields total contingent consideration of $61,000. Verification: 25000 + 36000 = 61000 restated component-wise. Quantifying the full package matters because FCPA liability attaches to anything of value offered to influence a discretionary official act regardless of how installments are labeled or timed, and the success-fee structure is what reveals the intent to purchase the approval. A common trap is analyzing the $25,000 alone and ignoring the contingent fee that completes the corrupt arrangement.",
        "Topic": "Anti-corruption compliance",
        "Subtopic": "Valuing improper payment packages",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Valuing only the fixed installment and ignoring the contingent success fee",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "FCPA",
          "contingent fees"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F3-Q2",
        "Type": "numeric",
        "Prompt": "Using the ledger summary in Exhibit 2, compute the average amount of the eleven customs-expediting entries that lack supporting documentation, rounded to the nearest whole dollar.",
        "Correct": "325",
        "Explanation": "Documentation completeness is tested by averaging the unsupported population: eleven entries totaling $3,575 yield 3575/11 = $325 per entry, while the three supported entries total $2,305 and reconcile the ledger (2305 + 3575 = 5880). Verification: 11 x 325 = 3575 confirms exact divisibility before rounding. Sizing each unsupported entry supports the materiality assessment under the books-and-records provisions, which require transactions to be recorded accurately and fairly in reasonable detail irrespective of amount. A common trap is averaging across all fourteen entries including documented ones, which dilutes the signal to $420 per entry and understates the concentration of unsupported disbursements flagged by internal audit.",
        "Topic": "Books-and-records compliance",
        "Subtopic": "Documentation gap quantification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "CommonTrapReference": "Averaging across all ledger entries instead of the undocumented subset",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "audit",
          "documentation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F3-Q3",
        "Type": "select",
        "Prompt": "How should Alicia Grant classify the proposed certification-linked payment package under the Foreign Corrupt Practices Act?",
        "Choices": [
          "A marketing expenditure permitted so long as it stays below a fixed share of first-year revenue.",
          "A permissible facilitating payment because the certification process resembles a routine filing.",
          "A bribe prohibited by the FCPA anti-bribery provisions because it targets a discretionary certification decision to obtain market entry.",
          "A political contribution outside the scope of the FCPA."
        ],
        "Correct": "C",
        "Explanation": "The FCPA anti-bribery provisions prohibit offering anything of value to a foreign official to influence a discretionary act and obtain or retain business. Certification by the state power authority is a non-routine, discretionary qualification that gates market entry, and the $25,000 plus 2 percent success fee is expressly contingent on approval, establishing corrupt purpose; routing it through a family consulting firm deepens rather than cures the problem. Verification: the classification maps each element of the exhibit to a statutory element, discretion of the official, contingency of the fee, and business objective of the payment. Facilitating payments cover only nondiscretionary routine actions, no share-of-revenue safe harbor exists, and political-contribution exemptions do not reach procurement officials. A common trap is assuming an expediting label sanitizes a payment aimed at a discretionary decision.",
        "Topic": "FCPA anti-bribery provisions",
        "Subtopic": "Facilitating payment versus bribe",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Labeling a discretionary-approval payoff as routine expediting",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "bribery",
          "discretionary acts"
        ],
        "Dependencies": [
          "CBQ23-F3-Q1"
        ]
      },
      {
        "ItemID": "CBQ23-F3-Q4",
        "Type": "select",
        "Prompt": "How should the $150 payment to the port clerk be treated under the FCPA?",
        "Choices": [
          "A prohibited bribe, since any payment to a foreign government employee falls within the anti-bribery provisions.",
          "A facilitating payment that fits the anti-bribery exception for routine, non-discretionary governmental actions, and one that must still be recorded accurately in the books.",
          "An item exempt from recordkeeping requirements because the amount is immaterial.",
          "A gratuity wholly outside FCPA scrutiny because the shipped modules were already certified."
        ],
        "Correct": "B",
        "Explanation": "The $150 paid to a port clerk to release already-certified containers fits the FCPA facilitating-payment exception because customs clearance is a routine, non-discretionary governmental action and no advantage beyond expeditious performance is sought. However, the exception shields the payment only from the anti-bribery charge: the books-and-records and internal-controls provisions still apply, so the disbursement must be described accurately in the ledger and supported by documentation. Verification: the analysis separates the statutory layers, exception on the antibribery side, continuing duty on the recordkeeping side, mirroring the policy excerpt language. Size does not exempt a transaction from recordkeeping, and treating every government touchpoint as a bribe misstates the statute. A common trap is concluding that the facilitating-payment exception removes all related compliance duties.",
        "Topic": "FCPA facilitating payments",
        "Subtopic": "Scope of the routine-action exception",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Concluding the facilitating-payment exception removes recordkeeping duties",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "facilitating payments",
          "recordkeeping"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ23-F3-Q5",
        "Type": "multi",
        "Prompt": "Which three courses of action should Alicia Grant pursue in response to these findings? Select exactly three.",
        "Choices": [
          "Refuse the certification-linked payment and escalate the matter to the General Counsel and the audit committee.",
          "Record the $25,000 as market development consulting fees to preserve the distributor relationship.",
          "Require retrospective documentation for the eleven unsupported expediting entries and reclassify any amounts that cannot be substantiated.",
          "Adopt a policy prohibiting facilitation payments worldwide and train Asia-Pacific staff on the books-and-records provisions.",
          "Route future government-related disbursements through an offshore entity so they avoid consolidation in the general ledger."
        ],
        "Correct": [
          "Refuse the certification-linked payment and escalate the matter to the General Counsel and the audit committee.",
          "Require retrospective documentation for the eleven unsupported expediting entries and reclassify any amounts that cannot be substantiated.",
          "Adopt a policy prohibiting facilitation payments worldwide and train Asia-Pacific staff on the books-and-records provisions."
        ],
        "Explanation": "Integrity and credibility obligations under the IMA Statement of Ethical Professional Practice require Alicia to decline participation in an improper payment, escalate through established channels, and communicate findings credibly. Compelling retrospective documentation and reclassifying the eleven unsupported entries restores accurate records for the $3,575 population; adopting a global prohibition with training closes the control gap prospectively and aligns the subsidiary with the code excerpt. Booking the payoff as consulting fees falsifies records, and offshore routing circumvents the internal-accounting-controls provisions, compounding rather than curing exposure. Verification: each accepted action pairs a finding from Exhibits 1 and 2 with a duty from Exhibit 3. A common trap is treating relationship preservation as justification for mischaracterized entries.",
        "Topic": "Ethics escalation and remediation",
        "Subtopic": "IMA standards in practice",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Justifying mischaracterized entries to preserve a distributor relationship",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ethics",
          "remediation"
        ],
        "Dependencies": [
          "CBQ23-F3-Q3"
        ]
      },
      {
        "ItemID": "CBQ23-F3-Q6",
        "Type": "match",
        "Prompt": "Match each conduct item from the expansion file to its correct compliance classification for the audit-committee report.",
        "LeftItems": [
          "Payment to win discretionary module certification",
          "Payment to expedite routine customs release",
          "Booking the payoff as consulting fees",
          "Holding government payments in an offshore account"
        ],
        "RightItems": [
          "FCPA anti-bribery violation",
          "Facilitating payment requiring accurate records",
          "Books-and-records violation",
          "Internal accounting controls violation",
          "Ordinary-course warranty matter",
          "Local charitable contribution"
        ],
        "Correct": {
          "Payment to win discretionary module certification": "FCPA anti-bribery violation",
          "Payment to expedite routine customs release": "Facilitating payment requiring accurate records",
          "Booking the payoff as consulting fees": "Books-and-records violation",
          "Holding government payments in an offshore account": "Internal accounting controls violation"
        },
        "Explanation": "Classification turns on purpose and record treatment: the certification-linked payment seeks a discretionary act and violates the FCPA anti-bribery provisions; the routine customs payment qualifies as a facilitating payment that must still be recorded accurately; describing a bribe as consulting fees breaches the books-and-records provisions because the characterization conceals the purpose; and parking government payments offshore breaches the internal-controls requirement to safeguard assets and maintain accountability. Verification: each left item draws its classification from a distinct provision cited in the Exhibit 3 policy excerpt. Warranty claims and charitable donations are unrelated categories included as distractors. Precise labeling drives the corrective-action plan the committee will approve. A common trap is merging anti-bribery and recordkeeping analysis into a single undifferentiated category.",
        "Topic": "Compliance classification synthesis",
        "Subtopic": "Provision-to-conduct mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Merging anti-bribery and books-and-records analysis into one category",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "classification",
          "synthesis"
        ],
        "Dependencies": [
          "CBQ23-F3-Q4"
        ]
      }
    ],
    "Industry": "Solar energy equipment",
    "CompanyType": "Manufacturer",
    "CompanyName": "Meridian Solar Components",
    "Stakeholder": "Alicia Grant, Chief Compliance Officer",
    "BusinessFunction": "Ethics and compliance",
    "QuestionCount": 6,
    "ExhibitCount": 3,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FCPA",
      "facilitating payments",
      "books and records",
      "IMA ethics"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 95,
    "RevisionHistory": [
      {
        "Date": "2026-08-26",
        "Version": "1.0",
        "Author": "P2-064 authoring wave",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Distinguish bribes from facilitating payments using discretion and routine-action tests",
      "Recognize books-and-records duties that survive the facilitating-payment exception",
      "Quantify documentation gaps for materiality assessment",
      "Design escalation and remediation steps consistent with IMA ethical standards"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Unprocessed"
  }
];
