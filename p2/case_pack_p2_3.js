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
}
];
