const fs = require('fs');
const path = require('path');

const FILE = path.resolve(__dirname, '..', 'p2', 'case_pack_p2_1.js');
const raw = fs.readFileSync(FILE, 'utf8');

// Parse current array
const m = raw.match(/(?:var|let|const)\s+(casePackP2_\d+)\s*=\s*\[/);
const arrStart = raw.indexOf('[', m.index);
let depth=0, pos=arrStart, inString=false, stringChar='', escape=false;
do {
  const ch=raw[pos];
  if(escape){escape=false;pos++;continue;}
  if(inString){if(ch==='\\'){escape=true;pos++;continue;} if(ch===stringChar){inString=false;pos++;continue;} pos++;continue;}
  if(ch==='"'||ch==='\''){inString=true;stringChar=ch;pos++;continue;}
  if(ch==='[')depth++;
  if(ch===']')depth--;
  pos++;
} while(depth>0 && pos<raw.length);
const arrText = raw.slice(arrStart, pos);
const cases = JSON.parse(arrText);

// Read D4 from case_pack_p2_4.js
const d4raw = fs.readFileSync(path.resolve(__dirname, '..', 'p2', 'case_pack_p2_4.js'), 'utf8');
const d4m = d4raw.match(/casePackP2_4\s*=\s*\[/);
const d4arrStart = d4raw.indexOf('[', d4m.index);
let d4depth=0, d4pos=d4arrStart, d4inStr=false, d4strCh='', d4esc=false;
do {
  const ch=d4raw[d4pos];
  if(d4esc){d4esc=false;d4pos++;continue;}
  if(d4inStr){if(ch==='\\'){d4esc=true;d4pos++;continue;} if(ch===d4strCh){d4inStr=false;d4pos++;continue;} d4pos++;continue;}
  if(ch==='"'||ch==='\''){d4inStr=true;d4strCh=ch;d4pos++;continue;}
  if(ch==='[')d4depth++;
  if(ch===']')d4depth--;
  d4pos++;
} while(d4depth>0 && d4pos<d4raw.length);
const d4arr = JSON.parse(d4raw.slice(d4arrStart, d4pos));
const d4case = d4arr[0]; // single case

// Read F5 from case_pack_p2_1_CBQ21-F5.js (raw JSON object)
const f5raw = fs.readFileSync(path.resolve(__dirname, '..', 'p2', 'case_pack_p2_1_CBQ21-F5.js'), 'utf8');
const f5case = JSON.parse(f5raw);

// Read B6, C7, E5 from their respective task-output files
// B6: inline JSON (from subagent output)
const b6case = {
  "CaseID": "CBQ21-B6",
  "Title": "Covered Interest Arbitrage and the FX Hedge Decision",
  "SectionTags": ["B"],
  "BlueprintDomain": "Corporate Finance",
  "BlueprintObjectives": [
    "Apply international finance concepts including forward premiums and covered interest arbitrage",
    "Compare hedging alternatives for foreign-currency receivables"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Vantage Precision Components, a mid-size manufacturer of aerospace valve assemblies headquartered in Detroit, has invoiced its German distributor GEKO Luftfahrt GmbH for €5,000,000 due in 90 days. CFO Linda Hargrove must present the treasury committee with a recommendation on how to manage the euro exposure. The three options on the table are a forward contract, a money-market hedge, or remaining unhedged and accepting whatever spot rate prevails at settlement.",
  "Industry": "Aerospace manufacturing",
  "CompanyType": "Manufacturer",
  "CompanyName": "Vantage Precision Components",
  "Stakeholder": "CFO Linda Hargrove",
  "BusinessFunction": "Treasury",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": ["FX", "forward hedge", "money-market hedge", "covered interest arbitrage"],
  "CreatedDate": "2026-09-04",
  "ModifiedDate": "2026-09-04",
  "Author": "Case Author",
  "Confidence": 90,
  "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
  "question_state": "Unprocessed",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Dependencies": [],
  "LearningObjectives": [
    "Calculate the annualized forward premium on a foreign currency",
    "Compute the USD proceeds of a money-market hedge on a euro receivable",
    "Compare forward, money-market, and unhedged alternatives for FX exposure",
    "Identify the condition under which covered interest arbitrage is profitable",
    "Evaluate which market factors determine hedge superiority",
    "Formulate a board-level FX hedging recommendation"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-B6-E1",
      "CaseID": "CBQ21-B6",
      "Type": "table",
      "Title": "Exhibit 1 — Market FX and Interest Rates",
      "Purpose": "Provides spot rate, 90-day forward rate, and annualized borrowing and deposit rates in USD and EUR for forward premium, money-market hedge, and arbitrage computations.",
      "ReferencedBy": ["CBQ21-B6-Q1","CBQ21-B6-Q2","CBQ21-B6-Q3","CBQ21-B6-Q4","CBQ21-B6-Q5"],
      "Headers": ["Item","Value"],
      "Rows": [
        ["Spot rate (USD per EUR)","1.0850"],
        ["90-day forward rate (USD per EUR)","1.0920"],
        ["EUR 90-day deposit rate (annualized)","3.50%"],
        ["USD 90-day deposit rate (annualized)","4.80%"],
        ["EUR 90-day borrowing rate (annualized)","5.50%"],
        ["USD 90-day borrowing rate (annualized)","6.25%"]
      ],
      "DataFormat": "FX rates as USD/EUR; interest rates annualized on 360-day basis",
      "AccuracyCheck": "Forward premium = 2.60% annualized; rate differential = 1.30% annualized"
    },
    {
      "ExhibitID": "CBQ21-B6-E2",
      "CaseID": "CBQ21-B6",
      "Type": "contract",
      "Title": "Exhibit 2 — Sales Contract Terms",
      "Purpose": "Establishes the receivable amount, currency, settlement date, and late-payment terms.",
      "ReferencedBy": ["CBQ21-B6-Q3","CBQ21-B6-Q6"],
      "Headers": [],
      "Rows": [],
      "Body": "Vantage Precision Components shipped aerospace valve assemblies to GEKO Luftfahrt GmbH under Invoice 2026-INV-0847. Amount: EUR 5,000,000, payable within 90 days of August 1 shipment (due November 1). Late payment accrues interest at EURIBOR plus 200 bps. Title transfers on delivery."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-B6-Q1", "Type": "numeric",
      "Prompt": "Enter the annualized forward premium on the euro, expressed as a percentage rounded to two decimals. Use the 360-day year convention.",
      "Correct": "2.60",
      "Explanation": "Forward premium = (Forward - Spot) / Spot x (360/Days) x 100 = (1.0920 - 1.0850) / 1.0850 x (360/90) x 100 = (0.0070/1.0850) x 4 x 100 = 0.6452% x 4 = 2.60% annualized. A positive result means the euro trades at a forward premium against the dollar. The 360-day convention is standard in FX markets. A common error is using 365 days, yielding 2.56% and misstating the premium. This magnitude exceeds the USD-EUR deposit rate differential (4.80% - 3.50% = 1.30%) and drives the hedge comparison in subsequent questions.",
      "Topic": "Forward premium", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Apply", "CalculationRequired": true,
      "FormulaReference": "CB-09: Forward/FX Premium or Discount",
      "CommonTrapReference": "Using 365 days instead of 360 (FX convention)."
    },
    {
      "ItemID": "CBQ21-B6-Q2", "Type": "numeric",
      "Prompt": "Compute the guaranteed USD proceeds under a money-market hedge of the €5,000,000 receivable. Round to nearest whole dollar.",
      "Correct": "5426762",
      "Explanation": "Money-market hedge: (1) Borrow EUR today: €5,000,000 / (1 + 0.055 x 90/360) = €5,000,000 / 1.01375 = €4,942,316. (2) Convert at spot: €4,942,316 x 1.0850 = $5,362,413. (3) Invest USD 90 days: $5,362,413 x (1 + 0.048 x 90/360) = $5,362,413 x 1.012 = $5,426,762. The forward hedge yields €5,000,000 x 1.0920 = $5,460,000, which is $33,238 higher. A common error is using the EUR deposit rate instead of the EUR borrowing rate for the loan principal, understating proceeds.",
      "Topic": "Money-market hedge", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Apply", "CalculationRequired": true,
      "FormulaReference": "CB-09: Money-market hedge framework",
      "CommonTrapReference": "Using EUR deposit rate instead of EUR borrowing rate for loan principal."
    },
    {
      "ItemID": "CBQ21-B6-Q3", "Type": "select",
      "Prompt": "Which hedging alternative yields the highest guaranteed USD proceeds for the €5,000,000 receivable?",
      "Correct": "A",
      "Choices": [
        "Forward hedge at $5,460,000 — the forward premium exceeds the interest rate differential, making the forward contract more valuable than the money-market hedge",
        "Money-market hedge at $5,426,762 — borrowing EUR at the lower rate and investing in USD earns a higher net return",
        "Remaining unhedged — the positive forward premium signals EUR appreciation, guaranteeing a higher spot rate at settlement",
        "Money-market hedge at $5,460,000 — the forward contract introduces counterparty risk that the money-market hedge eliminates"
      ],
      "Explanation": "The forward hedge locks in €5,000,000 x 1.0920 = $5,460,000, which is $33,238 higher than the money-market hedge of $5,426,762. The forward hedge wins because the forward premium (2.60%) exceeds the interest rate differential (4.80% - 3.50% = 1.30%). When the forward premium exceeds the rate differential, the forward rate offers more value than the synthetic rate replicable through borrowing and investing. Remaining unhedged is not guaranteed — the future spot rate is uncertain.",
      "Topic": "Hedge comparison", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Analyze", "CalculationRequired": true,
      "FormulaReference": "CB-09: Forward/FX Premium or Discount",
      "CommonTrapReference": "Selecting money-market hedge by confusing EUR deposit rate with EUR borrowing rate."
    },
    {
      "ItemID": "CBQ21-B6-Q4", "Type": "select",
      "Prompt": "Under the current rates, covered interest arbitrage would be profitable. Which condition best explains why?",
      "Correct": "A",
      "Choices": [
        "The forward premium of 2.60% exceeds the USD-EUR deposit rate differential of 1.30%, so borrowing EUR, converting at spot, investing in USD, and selling EUR forward generates a return above the USD deposit rate",
        "The spot rate of 1.0850 is below the forward rate of 1.0920, so purchasing EUR forward and selling EUR spot simultaneously yields a riskless profit of $0.007 per EUR",
        "The EUR borrowing rate of 5.50% is below the USD deposit rate of 4.80%, so borrowing EUR and investing in USD generates a positive carry without forward cover",
        "The USD borrowing rate of 6.25% exceeds the EUR deposit rate of 3.50%, creating a profit opportunity by borrowing USD and investing in EUR"
      ],
      "Explanation": "Covered interest arbitrage is profitable when the forward premium exceeds the interest rate differential. Here, the annualized forward premium on EUR is 2.60%, while the USD-EUR deposit rate differential is only 1.30%. A trader could borrow EUR, convert at spot, invest in USD, and sell EUR forward to lock in a return exceeding the USD deposit rate. Option B describes a simple forward-spot spread but ignores borrowing and investing costs. Option C is factually wrong: EUR borrowing rate (5.50%) exceeds USD deposit rate (4.80%). Option D borrows the higher-rate currency and invests in the lower-rate currency — a loss.",
      "Topic": "Covered interest arbitrage", "Difficulty": "Difficult", "DifficultyScore": 4,
      "CognitiveLevel": "Analyze", "CalculationRequired": false,
      "FormulaReference": "CB-09: Interest rate parity",
      "CommonTrapReference": "Confusing the direction of the arbitrage — profitable strategy borrows low-rate currency."
    },
    {
      "ItemID": "CBQ21-B6-Q5", "Type": "multi",
      "Prompt": "Which two factors most directly determine why the forward hedge yields higher proceeds than the money-market hedge? (Select two.)",
      "Correct": [
        "The forward rate of 1.0920, which is the locked-in conversion price under the forward contract",
        "The EUR-USD deposit rate differential of 1.30%, which determines the synthetic rate achievable through the money-market hedge"
      ],
      "Choices": [
        "The forward rate of 1.0920, which is the locked-in conversion price under the forward contract",
        "The EUR-USD deposit rate differential of 1.30%, which determines the synthetic rate achievable through the money-market hedge",
        "The spot rate of 1.0850, which sets the initial conversion amount under both hedges",
        "The USD borrowing rate of 6.25%, which determines the cost of the forward contract premium",
        "The EUR borrowing rate of 5.50%, which sets the floor for the money-market hedge proceeds"
      ],
      "Explanation": "The forward hedge is superior because the forward rate (1.0920) determines the guaranteed USD proceeds under the forward contract, and the interest rate differential (USD deposit 4.80% minus EUR deposit 3.50% = 1.30%) determines the synthetic exchange rate achievable through the money-market hedge. When the forward premium (2.60%) exceeds this differential (1.30%), the forward contract offers more value. The spot rate affects both hedges equally and does not explain the difference.",
      "Topic": "Hedge factor analysis", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Analyze", "CalculationRequired": false,
      "FormulaReference": "CB-09: Interest rate parity",
      "CommonTrapReference": "Selecting spot rate as a differentiator — it affects both hedges equally."
    },
    {
      "ItemID": "CBQ21-B6-Q6", "Type": "match",
      "Prompt": "Match each hedging concept to its correct characterization for Vantage's €5,000,000 receivable.",
      "Correct": {
        "Forward hedge proceeds": "$5,460,000",
        "Money-market hedge proceeds": "$5,426,762",
        "Forward premium (annualized)": "2.60%",
        "Arbitrage condition": "Forward premium exceeds rate differential",
        "Unhedged risk": "EUR depreciation below 1.0850 at settlement"
      },
      "LeftItems": ["Forward hedge proceeds","Money-market hedge proceeds","Forward premium (annualized)","Arbitrage condition","Unhedged risk"],
      "RightItems": ["$5,460,000","$5,426,762","2.60%","Forward premium exceeds rate differential","EUR depreciation below 1.0850 at settlement"],
      "Explanation": "Forward hedge proceeds = €5,000,000 x 1.0920 = $5,460,000. Money-market hedge yields $5,426,762 after borrowing EUR, converting at spot, and investing in USD. Forward premium is 2.60% annualized. Covered interest arbitrage is profitable when forward premium exceeds the rate differential (2.60% > 1.30%). Unhedged exposure risks EUR depreciation below the spot rate of 1.0850, reducing the USD value at settlement.",
      "Topic": "FX hedging integration", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate", "CalculationRequired": true,
      "FormulaReference": "CB-09: Forward/FX Premium or Discount",
      "CommonTrapReference": "Confusing money-market hedge proceeds with forward hedge proceeds."
    }
  ]
};

const c7case = {
  "CaseID": "CBQ21-C7",
  "Title": "Two-Constraint Product Mix and the Shadow Price at Velox Precision",
  "SectionTags": ["C"],
  "BlueprintDomain": "Decision Analysis",
  "BlueprintObjectives": ["C.5 — Capacity constraints and product mix"],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ScenarioText": "Velox Precision manufactures two products—Alpha and Beta—at its Midwest facility. Each requires CNC machining and final inspection, both capacity-constrained. The plant manager must determine the optimal product mix and evaluate whether acquiring additional CNC hours at $15/hr would be profitable.",
  "Industry": "Precision manufacturing",
  "CompanyType": "Manufacturer",
  "CompanyName": "Velox Precision",
  "Stakeholder": "Plant Manager",
  "BusinessFunction": "Operations",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": ["shadow price","linear programming","product mix","capacity constraint"],
  "CreatedDate": "2026-09-04",
  "ModifiedDate": "2026-09-04",
  "Author": "Case Author",
  "Confidence": 90,
  "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
  "question_state": "Unprocessed",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Dependencies": [],
  "LearningObjectives": [
    "Compute contribution margin per unit of a constrained resource",
    "Determine the optimal product mix using the corner-point method",
    "Identify binding versus non-binding constraints",
    "Calculate the shadow price of a binding resource constraint",
    "Evaluate capacity expansion decisions by comparing shadow price to acquisition cost"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-C7-E1",
      "CaseID": "CBQ21-C7",
      "Type": "table",
      "Title": "Exhibit 1 — Production Resource Requirements",
      "Purpose": "Provides per-unit resource requirements, CMs, and monthly capacity for CNC machining and inspection.",
      "ReferencedBy": ["CBQ21-C7-Q1","CBQ21-C7-Q2","CBQ21-C7-Q3","CBQ21-C7-Q4","CBQ21-C7-Q5","CBQ21-C7-Q6"],
      "Headers": ["Resource","Alpha (per unit)","Beta (per unit)","Monthly Capacity"],
      "Rows": [
        ["CNC machining hours","4","2","120"],
        ["Inspection hours","2","4","80"],
        ["Contribution margin","$60","$48","—"]
      ]
    },
    {
      "ExhibitID": "CBQ21-C7-E2",
      "CaseID": "CBQ21-C7",
      "Type": "table",
      "Title": "Exhibit 2 — Market Demand and Expansion Options",
      "Purpose": "Provides demand limits and cost of acquiring additional CNC machining hours.",
      "ReferencedBy": ["CBQ21-C7-Q2","CBQ21-C7-Q5","CBQ21-C7-Q6"],
      "Headers": ["Parameter","Value"],
      "Rows": [
        ["Maximum monthly demand — Alpha","20 units"],
        ["Maximum monthly demand — Beta","15 units"],
        ["Cost of additional CNC machining hour","$15 per hour"],
        ["Additional inspection hours available","Not available from current supplier"]
      ]
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-C7-Q1", "Type": "numeric",
      "Prompt": "What is the contribution margin per inspection hour for product Alpha? Round to two decimals.",
      "Correct": "30.00",
      "Explanation": "Alpha generates $60 CM per unit and requires 2 inspection hours per unit. CM per inspection hour = $60 / 2 = $30.00. For comparison, Beta yields $48 / 4 = $12.00 per inspection hour. Alpha is 2.5 times more efficient at converting inspection hours into contribution margin. This per-unit-of-resource analysis is the first step when a single resource is scarce, though with two constraints the final mix requires simultaneous consideration of all resource limits.",
      "Topic": "Contribution margin per constrained resource", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Apply", "CalculationRequired": true,
      "FormulaReference": "CM per unit of constrained resource",
      "CommonTrapReference": "Using the wrong resource denominator (e.g., CNC hours instead of inspection hours)."
    },
    {
      "ItemID": "CBQ21-C7-Q2", "Type": "numeric",
      "Prompt": "At the optimal product mix, what is the total monthly contribution margin? Enter as a whole number.",
      "Correct": "1680",
      "Explanation": "The feasible region has five corner points: (0,0), (20,0), (20,10), (10,15), and (0,15). Evaluating Z = 60A + 48B: $0, $1,200, $1,680, $1,320, and $720 respectively. The maximum occurs at 20 Alpha and 10 Beta for total CM of $1,680. At this point, inspection hours = 2(20) + 4(10) = 80 (fully consumed), CNC hours = 4(20) + 2(10) = 100 out of 120 available. The Alpha demand constraint at 20 units is also binding.",
      "Topic": "Optimal product mix — corner-point method", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Apply", "CalculationRequired": true,
      "FormulaReference": "Linear programming — corner-point method",
      "CommonTrapReference": "Evaluating only interior points and missing corner solutions."
    },
    {
      "ItemID": "CBQ21-C7-Q3", "Type": "select",
      "Prompt": "At the optimal product mix, which resource constraint is binding?",
      "Correct": "B",
      "Choices": [
        "CNC machining hours, because all 120 hours are consumed",
        "Inspection hours, because all 80 hours are consumed",
        "Both CNC machining and inspection hours are fully consumed",
        "Neither resource constraint is binding; both have remaining capacity"
      ],
      "Explanation": "At the optimal mix of 20 Alpha and 10 Beta, CNC hours used = 4(20) + 2(10) = 100 out of 120 available, leaving 20 hours of slack. Inspection hours used = 2(20) + 4(10) = 80 out of 80 available, leaving zero slack. A constraint is binding when it holds with equality at the optimal solution. Since inspection hours are fully consumed, inspection is the binding constraint. The CNC constraint is non-binding, meaning additional CNC hours would not increase the objective function value.",
      "Topic": "Binding versus non-binding constraints", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Analyze", "CalculationRequired": false,
      "FormulaReference": "Linear programming — constraint slack analysis",
      "CommonTrapReference": "Assuming the first-listed constraint is the binding one."
    },
    {
      "ItemID": "CBQ21-C7-Q4", "Type": "select",
      "Prompt": "What is the shadow price of one additional inspection hour?",
      "Correct": "C",
      "Choices": [
        "$0.00 per hour",
        "$6.00 per hour",
        "$12.00 per hour",
        "$30.00 per hour"
      ],
      "Explanation": "Shadow price = increase in total CM from one additional unit of the binding constraint. Increasing inspection from 80 to 81 hours with Alpha at 20 units (demand binding): 2(20) + 4B = 81, so B = 10.25. New total CM = 60(20) + 48(10.25) = $1,692. Shadow price = $1,692 - $1,680 = $12.00 per inspection hour. This holds as long as the same constraints remain binding (up to about 100 hours, when Beta demand becomes binding).",
      "Topic": "Shadow price computation", "Difficulty": "Difficult", "DifficultyScore": 4,
      "CognitiveLevel": "Analyze", "CalculationRequired": true,
      "FormulaReference": "Linear programming — shadow price",
      "CommonTrapReference": "Confusing CM per inspection hour ($30) with the shadow price ($12)."
    },
    {
      "ItemID": "CBQ21-C7-Q5", "Type": "multi",
      "Prompt": "Which statements about Velox's capacity situation are correct? (Select all that apply.)",
      "Correct": ["A","C","E"],
      "Choices": [
        "The shadow price of CNC machining hours is $0.00 per hour",
        "Acquiring additional CNC machining hours at $15 per hour would increase total CM",
        "At the optimal mix, 20 CNC machining hours remain unused",
        "The optimal product mix is 20 Alpha and 15 Beta",
        "The shadow price of inspection hours is $12.00 per hour"
      ],
      "Explanation": "A is correct: CNC has 20 hours of slack at the optimal mix, so its shadow price is zero — additional CNC hours have no marginal value. B is incorrect: acquiring CNC at $15/hr when the shadow price is $0 increases costs without increasing CM. C is correct: 4(20) + 2(10) = 100 CNC hours used out of 120 available, leaving 20 unused. D is incorrect: the optimal mix is 20 Alpha and 10 Beta, not 15 Beta; producing 15 Beta would require reducing Alpha due to inspection constraint. E is correct: the shadow price of the binding inspection constraint is $12.00/hr.",
      "Topic": "Shadow price interpretation", "Difficulty": "Difficult", "DifficultyScore": 4,
      "CognitiveLevel": "Analyze", "CalculationRequired": false,
      "FormulaReference": "Linear programming — shadow price and slack",
      "CommonTrapReference": "Assuming all capacity has positive value."
    },
    {
      "ItemID": "CBQ21-C7-Q6", "Type": "match",
      "Prompt": "Match each resource metric to its value at the optimal product mix.",
      "Correct": {
        "CNC machining hours used": "100 hours",
        "Inspection hours used": "80 hours",
        "CNC machining hours slack": "20 hours",
        "Shadow price of inspection hours": "$12.00 per hour"
      },
      "LeftItems": ["CNC machining hours used","Inspection hours used","CNC machining hours slack","Shadow price of inspection hours"],
      "RightItems": ["100 hours","80 hours","20 hours","$12.00 per hour"],
      "Explanation": "At 20 Alpha and 10 Beta: CNC used = 4(20) + 2(10) = 100 hours. Inspection used = 2(20) + 4(10) = 80 hours (fully consumed). CNC slack = 120 - 100 = 20 hours. Shadow price of inspection = $12.00/hr (the marginal value of one additional inspection hour). Velox should prioritize expanding inspection capacity if available below $12/hr, and should not acquire additional CNC hours at any positive cost given current demand and resource structure.",
      "Topic": "Integrated resource analysis", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate", "CalculationRequired": false,
      "FormulaReference": "Linear programming — resource utilization and shadow price",
      "CommonTrapReference": "Confusing resource used with resource available."
    }
  ]
};

const e5case = {
  "CaseID": "CBQ21-E5",
  "Title": "Deferral and Abandonment Options at Ironridge Mining",
  "SectionTags": ["E"],
  "BlueprintDomain": "Investment Decisions",
  "BlueprintObjectives": [
    "Evaluate real options including deferral, abandonment, and expansion",
    "Compute option-adjusted net present value",
    "Analyze mutually exclusive option interactions"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "ScenarioText": "Ironridge Mining is evaluating a copper mine with a 10-year life. Base-case NPV (without options) is −$8M at 12% WACC. Management has: (a) a deferral option — wait 2 years to see copper prices, then decide; value = $6M; (b) an abandonment option — sell equipment for $4M after year 3; value = $3M; (c) an expansion option — double capacity after year 5 if demand is strong; value = $5M. The CFO must compute option-adjusted NPV and recommend whether to proceed, defer, or reject.",
  "Industry": "Mining and natural resources",
  "CompanyType": "Manufacturer",
  "CompanyName": "Ironridge Mining",
  "Stakeholder": "CFO",
  "BusinessFunction": "Corporate Finance",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "Tags": ["real options","deferral","abandonment","expansion","option-adjusted NPV"],
  "CreatedDate": "2026-09-04",
  "ModifiedDate": "2026-09-04",
  "Author": "Case Author",
  "Confidence": 90,
  "RevisionHistory": [{"Date":"2026-09-04","Version":"1.0","Author":"Case Author","Summary":"Initial creation"}],
  "question_state": "Unprocessed",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Dependencies": [],
  "LearningObjectives": [
    "Compute option-adjusted NPV by summing static NPV and embedded option values",
    "Distinguish deferral, abandonment, and expansion options",
    "Identify mutually exclusive real options",
    "Perform sensitivity analysis on individual option values",
    "Formulate an integrated investment recommendation"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-E5-E1",
      "CaseID": "CBQ21-E5",
      "Type": "table",
      "Title": "Exhibit 1 — Copper Mine Project Financial Summary",
      "Purpose": "Provides base-case financial parameters including static NPV before options.",
      "ReferencedBy": ["CBQ21-E5-Q1","CBQ21-E5-Q2","CBQ21-E5-Q4"],
      "Headers": ["Parameter","Value"],
      "Rows": [
        ["Initial investment","$50,000,000"],
        ["Annual after-tax cash flows (years 1–10)","$7,440,000"],
        ["Discount rate (WACC)","12%"],
        ["Project life","10 years"],
        ["Static NPV (no options)","($8,000,000)"]
      ]
    },
    {
      "ExhibitID": "CBQ21-E5-E2",
      "CaseID": "CBQ21-E5",
      "Type": "table",
      "Title": "Exhibit 2 — Real Option Valuations",
      "Purpose": "Provides estimated value, exercise trigger, and exercise price/condition for each real option.",
      "ReferencedBy": ["CBQ21-E5-Q1","CBQ21-E5-Q2","CBQ21-E5-Q3","CBQ21-E5-Q4","CBQ21-E5-Q5","CBQ21-E5-Q6"],
      "Headers": ["Option","Type","Exercise Point","Exercise Price/Condition","Estimated Value"],
      "Rows": [
        ["Deferral","Timing (call on waiting)","Year 2","Commit $50M or walk away","$6,000,000"],
        ["Abandonment","Put (salvage floor)","Year 3","Sell equipment for $4,000,000","$3,000,000"],
        ["Expansion","Call on additional capacity","Year 5","Invest $30,000,000 to double capacity","$5,000,000"]
      ]
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-E5-Q1", "Type": "numeric",
      "Prompt": "Compute the option-adjusted NPV considering all three real options. Enter your answer in dollars.",
      "Correct": "6000000",
      "Explanation": "Option-adjusted NPV = Static NPV + Sum of option values = ($8,000,000) + $6,000,000 + $3,000,000 + $5,000,000 = $6,000,000. Since the result is positive, the project creates value when all embedded options are considered. A common error is using only the static NPV and rejecting the project, ignoring the substantial value in management's flexibility to defer, abandon, or expand.",
      "Topic": "Real options — option-adjusted NPV", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Apply", "CalculationRequired": true,
      "FormulaReference": "Option-adjusted NPV = Static NPV + Σ(option values)",
      "CommonTrapReference": "Using only static NPV and ignoring embedded options."
    },
    {
      "ItemID": "CBQ21-E5-Q2", "Type": "numeric",
      "Prompt": "Compute the option-adjusted NPV considering only the deferral and abandonment options (exclude expansion). Enter in dollars.",
      "Correct": "1000000",
      "Explanation": "Option-adjusted NPV = ($8,000,000) + $6,000,000 + $3,000,000 = $1,000,000. Even without the expansion option, the combined deferral and abandonment values ($9,000,000) exceed the $8,000,000 static NPV shortfall by $1,000,000. This demonstrates the project's viability does not depend on a single option but on the aggregate flexibility available to management.",
      "Topic": "Real options — partial option-adjusted NPV", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Apply", "CalculationRequired": true,
      "FormulaReference": "Option-adjusted NPV = Static NPV + Σ(option values)",
      "CommonTrapReference": "Forgetting to exclude the expansion option value when the question asks for deferral + abandonment only."
    },
    {
      "ItemID": "CBQ21-E5-Q3", "Type": "select",
      "Prompt": "Which pair of real options is most likely mutually exclusive for Ironridge Mining?",
      "Correct": "B",
      "Choices": [
        "Deferral and expansion",
        "Deferral and abandonment",
        "Abandonment and expansion",
        "All three options can be exercised simultaneously regardless of management's initial decision"
      ],
      "Explanation": "The deferral and abandonment options are mutually exclusive because exercising the deferral option means management has not yet committed capital. If management defers, there is no operational asset to abandon at year 3 — the abandonment option applies only after the project has commenced and equipment has been purchased. Understanding which options are mutually exclusive is critical because adding the values of non-independent options overstates the true flexibility embedded in the project.",
      "Topic": "Real options — mutually exclusive options", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Analyze", "CalculationRequired": false,
      "FormulaReference": "Real options theory",
      "CommonTrapReference": "Selecting all options as simultaneously exercisable without considering operational reality."
    },
    {
      "ItemID": "CBQ21-E5-Q4", "Type": "select",
      "Prompt": "The expansion option's value declines from $5M to $2M due to lower copper demand. Deferral ($6M) and abandonment ($3M) unchanged. Which statement best describes the revised project?",
      "Correct": "A",
      "Choices": [
        "Option-adjusted NPV falls to $3M, but the project remains acceptable because deferral and abandonment alone exceed the static NPV shortfall",
        "Option-adjusted NPV falls to $1M, making the project only marginally acceptable",
        "Option-adjusted NPV falls to negative $2M, and the project should be rejected",
        "Option-adjusted NPV remains at $6M because the deferral option fully compensates for the reduced expansion value"
      ],
      "Explanation": "Revised option-adjusted NPV = ($8M) + $6M + $3M + $2M = $3M. The project remains acceptable because deferral and abandonment alone ($9M) exceed the $8M shortfall by $1M. The expansion provides an additional $2M cushion but is not critical to acceptance. A candidate who computes negative $2M has likely subtracted the $3M reduction rather than adding the remaining $2M expansion value.",
      "Topic": "Real options — sensitivity analysis", "Difficulty": "Difficult", "DifficultyScore": 4,
      "CognitiveLevel": "Analyze", "CalculationRequired": true,
      "FormulaReference": "Option-adjusted NPV = Static NPV + Σ(option values)",
      "CommonTrapReference": "Subtracting the reduction instead of adding the remaining option value."
    },
    {
      "ItemID": "CBQ21-E5-Q5", "Type": "multi",
      "Prompt": "Which statements about the relative value of Ironridge's real options are correct? (Select all that apply.)",
      "Correct": ["A","B","C"],
      "Choices": [
        "The deferral option contributes the most value at $6,000,000",
        "The abandonment option contributes the least value at $3,000,000",
        "The expansion option at $5,000,000 exceeds the abandonment option by $2,000,000",
        "The deferral option alone exceeds the sum of the abandonment and expansion options",
        "All three options together contribute $16,000,000"
      ],
      "Explanation": "A is correct: deferral at $6M is the most valuable single option. B is correct: abandonment at $3M is the least valuable. C is correct: expansion $5M exceeds abandonment $3M by $2M. D is incorrect: deferral $6M does NOT exceed abandonment + expansion ($8M). E is incorrect: total is $6M + $3M + $5M = $14M, not $16M.",
      "Topic": "Real options — relative option values", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Analyze", "CalculationRequired": false,
      "FormulaReference": "Real options theory",
      "CommonTrapReference": "Confusing deferral option value with total option value, or miscounting the sum."
    },
    {
      "ItemID": "CBQ21-E5-Q6", "Type": "match",
      "Prompt": "Match each decision scenario to the appropriate recommendation for Ironridge's board.",
      "Correct": {
        "All three options exercisable": "Option-adjusted NPV is $6M; recommend acceptance",
        "Expansion drops to $2M": "Option-adjusted NPV is $3M; project remains acceptable",
        "Only one option can be exercised": "No single option offsets the $8M shortfall; reject unless options can be combined",
        "Deferral drops to $2M": "Option-adjusted NPV is $2M; acceptable but with reduced margin"
      },
      "LeftItems": ["All three options exercisable","Expansion drops to $2M","Only one option can be exercised","Deferral drops to $2M"],
      "RightItems": ["Option-adjusted NPV is $6M; recommend acceptance","Option-adjusted NPV is $3M; project remains acceptable","No single option offsets the $8M shortfall; reject unless options can be combined","Option-adjusted NPV is $2M; acceptable but with reduced margin"],
      "Explanation": "All three: ($8M) + $6M + $3M + $5M = $6M → accept. Expansion $2M: ($8M) + $6M + $3M + $2M = $3M → acceptable. One option only: best case is deferral $6M, yielding ($8M) + $6M = ($2M) → still negative, reject. Deferral $2M: ($8M) + $2M + $3M + $5M = $2M → positive but thin margin.",
      "Topic": "Real options — integrated recommendation", "Difficulty": "Moderate", "DifficultyScore": 3,
      "CognitiveLevel": "Evaluate", "CalculationRequired": true,
      "FormulaReference": "Option-adjusted NPV",
      "CommonTrapReference": "Thinking a single option can offset the entire static NPV shortfall."
    }
  ]
};

// Append all 5 cases
cases.push(d4case, f5case, b6case, c7case, e5case);
console.log('Total cases now:', cases.length);

// Serialise
function serializeCase(c, indent) {
  const nl = '\n';
  const pad = ' '.repeat(indent);
  let s = '  {';
  for (const key of Object.keys(c)) {
    const val = c[key];
    if (key === 'Items' || key === 'Exhibits') {
      s += nl + pad + JSON.stringify(key) + ': [';
      for (let i = 0; i < val.length; i++) {
        s += nl + pad + '  ' + JSON.stringify(val[i], null, 2).replace(/\n/g, nl + pad + '  ');
        s += i < val.length - 1 ? ',' : '';
      }
      s += nl + pad + ']';
    } else {
      s += nl + pad + JSON.stringify(key) + ': ' + JSON.stringify(val);
    }
    s += ',';
  }
  s = s.replace(/,$/, '');
  s += nl + '  }';
  return s;
}

let newArrayText = '[\n';
for (let i = 0; i < cases.length; i++) {
  newArrayText += serializeCase(cases[i], 4);
  newArrayText += i < cases.length - 1 ? ',\n' : '\n';
}
newArrayText += ']';

// Write: replace array in raw file
const before = raw.slice(0, arrStart);
const after = raw.slice(arrStart + arrText.length);
fs.writeFileSync(FILE, before + newArrayText + after, 'utf8');
console.log('Wrote', FILE, ':', fs.statSync(FILE).size, 'bytes');
