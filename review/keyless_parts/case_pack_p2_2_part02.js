  "Subtopic": "Signal convergence",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Weighing each red flag in isolation instead of reading the pattern.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "red flags",
          "normalization"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which additional artifact would MOST directly confirm channel stuffing as the driver?",
        "Correct": "A",
        "Choices": [
          "Distributor-level sell-through data showing inventory piling up at customers alongside the quarter-end shipment spike — or documented return-rights/side-letter arrangements matching the receivables surge",
          "A lower effective tax rate relative to the statutory rate",
          "Increased capital expenditures on distribution centers",
          "A higher dividend payout declared in the same quarter"
        ],
        "Explanation": "Channel stuffing leaves a specific fingerprint: goods sitting at distributors unsold (sell-in outrunning sell-through) and often contractual rights making those 'sales' reversible. Sell-through data or side letters convert suspicion into evidence. Tax rate (B) speaks to a different quality dimension, capex (C) is balance-sheet investment unrelated to the receivables bulge, and dividends (D) would if anything drain cash further without explaining who holds the goods.",
        "Topic": "Evidence gathering",
        "Subtopic": "Channel stuffing confirmation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Accepting aggregate growth data where distributor-level sell-through is decisive.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "evidence"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which valuation stance should Jordan's note take?",
        "Correct": "B",
        "Choices": [
          "Apply the peer multiple to the full $24.0M reported figure since GAAP statements govern comparability",
          "Value Riverbend on the $22.5M core base ONLY with cash-flow verification conditions attached — aging detail, sell-through evidence, and OCF tracking across coming quarters — applying a discount for unresolved earnings-quality risk until the divergence closes",
          "Exclude Riverbend from coverage permanently because red flags were identified",
          "Value on operating cash flow of $14.4M alone, ignoring earnings entirely"
        ],
        "Explanation": "The disciplined endpoint prices what is PROVEN and discounts what is not: core earnings of $22.5M represent sustainable operations, while the unexplained gap between accrual and cash — and between receivables and sales — is risk to be monitored through specific verifiable milestones. Multiplying reported income (A) capitalizes possibly overstated dollars; blacklisting (C) overreacts to signals that are not proof; cash-only valuation (D) discards the real earnings power a resolved picture might support. Conditional valuation aligns price with evidence.",
        "Topic": "Valuation stance",
        "Subtopic": "Risk-adjusted conclusion",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Paying peer multiples for earnings that cash flows have not confirmed.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "valuation"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-D2",
    "Title": "Vendor Breach: Quantifying the Response",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Compute inherent and residual expected loss for a third-party cyber event",
      "Classify responses within the COSO ERM reduce/share/avoid taxonomy",
      "Fund and sequence responses consistent with board risk appetite"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Crestline Steel's payroll processor reports a compromise exposing employee records, and risk lead Sofia Andrade must quantify exposure and fund responses before the next audit-committee meeting. The board's appetite caps residual EXPECTED loss per event class at $250,000 annually.",
    "Industry": "Steel services",
    "CompanyType": "Manufacturer",
    "CompanyName": "Crestline Steel",
    "Stakeholder": "Risk Lead Sofia Andrade",
    "BusinessFunction": "Enterprise risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "cyber risk",
      "expected loss",
      "risk response",
      "appetite"
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
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Quantify inherent versus residual expected loss for controls and insurance",
      "Apply the appetite threshold to rank required actions",
      "Sequence reduce-first, share-second response architecture"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D2-E1",
        "CaseID": "CBQ22-D2",
        "Type": "table",
        "Title": "Exhibit 1 — Exposure Profile (Annual)",
        "Purpose": "Provides the probability and impact inputs for inherent expected-loss computation.",
        "ReferencedBy": [
          "CBQ22-D2-Q1",
          "CBQ22-D2-Q3",
          "CBQ22-D2-Q5"
        ],
        "Headers": [
          "Factor",
          "Value"
        ],
        "Rows": [
          [
            "Impact if major breach realized",
            "$3,000,000"
          ],
          [
            "Annual probability under current controls",
            "15%"
          ],
          [
            "Board residual-appetite cap per event class",
            "$250,000"
          ]
        ],
        "DataFormat": "USD; probabilities annual",
        "AccuracyCheck": "Impact estimate includes notification, monitoring, legal, and regulatory response"
      },
      {
        "ExhibitID": "CBQ22-D2-E2",
        "CaseID": "CBQ22-D2",
        "Type": "table",
        "Title": "Exhibit 2 — Candidate Responses",
        "Purpose": "Provides cost and effect of each candidate so residual risk and net benefit can be computed and classified.",
        "ReferencedBy": [
          "CBQ22-D2-Q2",
          "CBQ22-D2-Q3",
          "CBQ22-D2-Q4",
          "CBQ22-D2-Q5",
          "CBQ22-D2-Q6"
        ],
        "Headers": [
          "Response",
          "Cost",
          "Effect"
        ],
        "Rows": [
          [
            "Enhanced MFA + continuous monitoring on the vendor connection",
            "$60K per year",
            "Cuts annual probability to 6%"
          ],
          [
            "Cyber liability insurance",
            "$90K per year",
            "Transfers losses above a $750K retained layer to the carrier"
          ],
          [
            "Terminate vendor; bring payroll fully in-house",
            "Multi-year build estimated well above both options",
            "Eliminates this vendor event class entirely"
          ]
        ],
        "DataFormat": "USD annual unless noted",
        "AccuracyCheck": "MFA effect applies to likelihood only; impact unchanged"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the INHERENT annual expected loss, in dollars.",
        "Correct": "450000",
        "Explanation": "Expected loss = probability × impact = 0.15 × $3,000,000 = $450,000 (RM-01) — the pre-action benchmark. It already breaches the board's $250,000 residual cap, so doing nothing is not among the compliant options Sofia can present.",
        "Topic": "Inherent expected loss",
        "Subtopic": "Cyber quantification",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01: Expected Loss = P x I",
        "CommonTrapReference": "Benchmarking against worst-case impact rather than the weighted expectation.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the RESIDUAL annual expected loss under the enhanced-MFA option, in dollars.",
        "Correct": "180000",
        "Explanation": "Residual = revised probability × unchanged impact = 0.06 × $3,000,000 = $180,000. MFA and monitoring attack LIKELIHOOD — they make the event less likely to occur but change nothing about its $3M severity when it does. At $180K the position sits INSIDE the board's $250K cap for the first time.",
        "Topic": "Residual expected loss",
        "Subtopic": "Control effect",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-03: Residual Risk",
        "CommonTrapReference": "Assuming controls also shrink impact severity.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "residual risk",
          "MFA"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the net YEAR-ONE economic benefit of the enhanced-MFA program, in dollars.",
        "Correct": "210000",
        "Explanation": "Expected-loss avoided = $450,000 − $180,000 = $270,000; minus the $60,000 annual control cost → net benefit +$210,000. The control pays for itself more than four-fold in expectation while simultaneously curing the appetite breach — the strongest possible funding case the committee can receive.",
        "Topic": "Mitigation cost-benefit",
        "Subtopic": "Control funding",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Net benefit = EL avoided − control cost",
        "CommonTrapReference": "Weighing the $60K cost against the $3M IMPACT instead of the expected-loss reduction.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cost-benefit"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Classify the three candidate responses in the COSO ERM taxonomy.",
        "Correct": "D",
        "Choices": [
          "MFA = share; insurance = avoid; in-house conversion = reduce",
          "MFA = avoid; insurance = reduce; in-house conversion = accept",
          "All three constitute acceptance with different funding mechanisms",
          "MFA = REDUCE (lowers likelihood); insurance = SHARE (transfers severity above retention); in-house conversion = AVOID (eliminates the vendor event class)"
        ],
        "Explanation": "Mechanism determines classification. MFA changes HOW OFTEN the event happens — reduce. Insurance changes WHO PAYS above the retention — share. Killing the vendor relationship removes the exposure class altogether — avoid, here at prohibitive operational cost, which is exactly why avoidance sits unused on the list. Acceptance would mean retaining the 15%/450K profile unfunded, which no proposal does.",
        "Topic": "Response taxonomy",
        "Subtopic": "Classification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Labeling insurance as risk reduction — frequency is untouched.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "taxonomy"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Insurance alone carries a $90K premium and transfers losses above the $750K retention. Which evaluation of insurance AS THE PRIMARY response is correct?",
        "Correct": "B",
        "Choices": [
          "Insurance is sufficient alone: transferring everything above $750K means Crestline bears no material exposure",
          "Insurance leaves the 15% likelihood untouched — the event still occurs with operational, reputational, and regulatory consequences inside the retention layer — so it complements but cannot substitute for reducing likelihood; the compliant primary action is the MFA program at $180K residual",
          "Insurance fails the appetite test because premiums count as expected loss",
          "Insurance and MFA are interchangeable since both appear in Exhibit 2"
        ],
        "Explanation": "Sharing redistributes SEVERITY; it does nothing about FREQUENCY — the breach still happens, still disrupts payroll, still reaches regulators and headlines, all within the retained first layer and beyond the policy's scope. The board cap reads on RESIDUAL expected loss of the event class as experienced by the firm; likelihood-reduction (MFA, $180K) addresses it directly and earns a positive net benefit, while insurance works best layered behind likelihood reduction for tail severities. Premiums are a cost item, not expected loss (C) — the failure mode is substitution, not accounting.",
        "Topic": "Share versus reduce",
        "Subtopic": "Response sequencing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Buying transfer first and calling the likelihood problem solved.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "insurance",
          "sequencing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What should Sofia recommend to the audit committee?",
        "Correct": "A",
        "Choices": [
          "Fund the enhanced-MFA program immediately — net benefit +$210K and residual of $180K restores compliance with the $250K cap — and evaluate cyber insurance NEXT cycle as a tail-severity complement once likelihood reduction is embedded",
          "Buy only the insurance policy this cycle and defer all control spending to next year's budget",
          "Terminate the payroll vendor now despite the migration cost, since any breach risk is unacceptable",
          "Take no funded action but add the exposure to the watchlist and re-present annually"
        ],
        "Explanation": "The recommendation follows the arithmetic and the taxonomy: likelihood-reduction first (it cures the breach of appetite AND pays for itself), tail-transfer second (insurance priced as a complement once the root cause is contained), avoidance rejected on cost-benefit grounds. Deferring controls for insurance-only (B) leaves frequency untouched and the root cause live; termination (C) spends multi-year money to solve a problem $60K annually now contains; watchlisting (D) manages optics while the firm remains $200K outside its own appetite line.",
        "Topic": "Committee recommendation",
        "Subtopic": "Response sequencing",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Funding visibility (watchlists) instead of exposure reduction.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-C1",
    "Title": "Bottleneck Product Mix Under Uncertainty",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Determine the profit-maximizing product mix under a single constrained resource",
      "Compute expected monetary values of scheduling alternatives across discrete demand states",
      "Calculate the expected value of perfect information and apply it to a purchased-forecast decision"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Kestrel Peak Outfitters manufactures technical backpacks at its Boise plant, where the stitching line is the binding constraint at 12,000 machine hours per season. CFO Dana Whitfield must recommend to the operations committee—before the spring booking cycle—how to commit the line between the high-margin Cascade 65L and the lighter Alpine 40L while trail demand is uncertain. Treasury's scenario model attaches probabilities to strong, moderate, and soft demand states and estimates season contribution under a Cascade-priority versus an Alpine-priority schedule. Summit Research Partners has offered a study that would identify the demand state with certainty for a $5,500 fee. Dana needs the optimal planning mix, the expected value of each schedule, and the value of perfect information before Friday's committee vote.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C1-E1",
        "CaseID": "CBQ22-C1",
        "Type": "table",
        "Title": "Exhibit 1 — Product Economics and Stitching-Line Capacity",
        "Purpose": "Supplies contribution margins, machine-hour requirements, demand ceilings, and bottleneck capacity used to rank products and build the planning-case mix for Q1.",
        "ReferencedBy": [
          "CBQ22-C1-Q1",
          "CBQ22-C1-Q5"
        ],
        "Headers": [
          "Item",
          "Contribution margin per unit",
          "Machine hours per unit",
          "Maximum seasonal demand (units)",
          "Maximum contribution if demand fully met"
        ],
        "Rows": [
          [
            "Alpine 40L",
            "$60",
            "2.0",
            "6,000",
            "$360,000"
          ],
          [
            "Cascade 65L",
            "$96",
            "3.0",
            "3,000",
            "$288,000"
          ],
          [
            "Stitching line (bottleneck) capacity",
            "—",
            "12,000 hours per season",
            "—",
            "—"
          ]
        ],
        "DataFormat": "USD whole dollars; hours in decimals; units in whole units",
        "AccuracyCheck": "Maximum contribution = CM per unit × maximum seasonal demand: Alpine 6,000 × $60 = $360,000; Cascade 3,000 × $96 = $288,000; both verified."
      },
      {
        "ExhibitID": "CBQ22-C1-E2",
        "CaseID": "CBQ22-C1",
        "Type": "table",
        "Title": "Exhibit 2 — Season Contribution by Demand State and Schedule Commitment",
        "Purpose": "Provides the payoff matrix and state probabilities used for expected-value, perfect-information, and regret analysis in Q2 through Q6.",
        "ReferencedBy": [
          "CBQ22-C1-Q2",
          "CBQ22-C1-Q3",
          "CBQ22-C1-Q4",
          "CBQ22-C1-Q5",
          "CBQ22-C1-Q6"
        ],
        "Headers": [
          "Demand state",
          "Probability",
          "Cascade-priority schedule (annual contribution)",
          "Alpine-priority schedule (annual contribution)"
        ],
        "Rows": [
          [
            "Strong trail demand",
            "0.40",
            "$388,000",
            "$366,000"
          ],
          [
            "Moderate trail demand",
            "0.35",
            "$374,000",
            "$361,000"
          ],
          [
            "Soft trail demand",
            "0.25",
            "$330,000",
            "$346,000"
          ]
        ],
        "DataFormat": "Probabilities in decimals summing to 1.00; USD whole dollars",
        "AccuracyCheck": "Probabilities total 1.00. EV(Cascade-priority) = $368,600; EV(Alpine-priority) = $359,250; both recomputed from the table."
      },
      {
        "ExhibitID": "CBQ22-C1-E3",
        "CaseID": "CBQ22-C1",
        "Type": "email",
        "Title": "Exhibit 3 — Research Offer from Summit Research Partners",
        "Purpose": "Documents the $5,500 fee for the certainty-equivalent demand study that Q4 evaluates against the EVPI.",
        "ReferencedBy": [
          "CBQ22-C1-Q4"
        ],
        "Body": "From: M. Okafor, Client Director, Summit Research Partners\nTo: Dana Whitfield, CFO, Kestrel Peak Outfitters\nSubject: Syndicated Trail-Demand Signal Study — Spring Season\n\nDana — our syndicated panel can identify your spring demand state (strong / moderate / soft) with certainty before your stitching schedule is locked. Delivery is five business days from engagement, ahead of your booking cutoff. The flat fee is $5,500 for the season. If the committee wants the read, we need a signed order by Wednesday.",
        "DataFormat": "Business email text; USD whole dollars",
        "AccuracyCheck": "Fee stated once at $5,500; timing consistent with scenario lock date."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Under the Strong-demand planning case, determine the total seasonal contribution margin from the profit-maximizing mix of Alpine 40L and Cascade 65L packs given the 12,000-hour stitching-line constraint. Enter the amount in whole dollars (tolerance ±$1).",
        "Correct": "378000",
        "Explanation": "The governing principle is constrained-resource optimization: when capacity binds, rank products by contribution margin per unit of the scarce resource rather than per unit sold. Cascade 65L earns $96 over 3.0 hours = $32.00 per stitching-hour; Alpine 40L earns $60 over 2.0 hours = $30.00 per hour, so Cascade is scheduled first. Cascade demand of 3,000 units absorbs 9,000 hours, leaving 3,000 hours: 3,000 ÷ 2.0 = 1,500 Alpine units (within its 6,000-unit ceiling). Total contribution = (3,000 × $96) + (1,500 × $60) = $288,000 + $90,000 = $378,000. A common trap is ranking by total margin per unit and filling the line with Alpine 40L, which consumes all 12,000 hours for only $360,000 and sacrifices $18,000 of contribution.",
        "Topic": "Constrained-resource product mix",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute the expected annual contribution of the Cascade-priority schedule across the three demand states (expected value without perfect information). Round to the nearest whole dollar (tolerance ±$1).",
        "Correct": "368600",
        "Explanation": "Expected value weights each state's payoff by its probability: EV = Σ(Pi × Outcomei) = (0.40 × $388,000) + (0.35 × $374,000) + (0.25 × $330,000) = $155,200 + $130,900 + $82,500 = $368,600. The probabilities sum to 1.00 as required. For contrast, the Alpine-priority alternative is worth (0.40 × $366,000) + (0.35 × $361,000) + (0.25 × $346,000) = $146,400 + $126,350 + $86,500 = $359,250, so committing to Cascade-priority maximizes expected contribution. A common trap is averaging the three payoffs equally ($364,000 here) instead of applying probabilities—the simple mean ignores management's view of state likelihoods and misstates the decision basis.",
        "Topic": "Expected monetary value",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-10",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the expected value of perfect information about next season's demand state?",
        "Correct": "B",
        "Choices": {
          "A": "$9,350, the gap between the two schedules' expected contributions",
          "B": "$4,000, the probability-weighted gain from switching schedules with hindsight",
          "C": "$16,000, the soft-state contribution spread between the two commitments",
          "D": "$42,000, the range between the best and worst outcomes across states"
        },
        "Explanation": "EVPI = EV with perfect information − EV without it (DA-11). With perfect foresight the committee picks the better schedule state by state and expects (0.40 × $388,000) + (0.35 × $374,000) + (0.25 × $346,000) = $155,200 + $130,900 + $86,500 = $372,600; without it the best commitment is worth $368,600. EVPI = $372,600 − $368,600 = $4,000, which equals the weighted regret of being locked into Cascade-priority in the soft state (0.25 × $16,000). Choice A subtracts the two schedules' unconditional EVs ($368,600 − $359,250 = $9,350)—that measures how much the winner beats the loser, not what information is worth.",
        "Topic": "Value of perfect information",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "DA-11",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Summit Research Partners offers a syndicated study that would reveal the demand state with certainty before the schedule is locked. Based strictly on expected-value logic, what should the operations committee do?",
        "Correct": "D",
        "Choices": {
          "A": "Accept the offer, because perfect information raises expected contribution by $9,350, well above the $5,500 fee",
          "B": "Accept the offer, because removing exposure to the soft-demand outcome alone adds $16,000 of expected contribution",
          "C": "Decline the offer, because maximizing expected value makes external demand research redundant in every form",
          "D": "Decline the offer, because the $5,500 fee exceeds the $4,000 expected value of perfect information"
        },
        "Explanation": "Perfect information is worth at most its EVPI of $4,000, so paying $5,500 destroys $1,500 of expected value even though the forecast is flawless. Because no forecast can outperform perfect information, the EVPI caps what any forecasting product can rationally command; the constructive path is to negotiate the fee below $4,000 or act on internal booking indicators. Choice A misuses the $9,350 winner-versus-loser gap as an information value; choice B treats eliminating one state's exposure as free when hindsight switching gains only $16,000 × 0.25 = $4,000 on average; choice C overreaches—research priced below EVPI can add value. The trap is anchoring on gross state swings instead of probability-weighted regret.",
        "Topic": "Purchased forecast versus EVPI",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "DA-11",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three statements about Kestrel Peak's scheduling decision are correct? Select exactly three.",
        "Correct": [
          "Ranking the packs by contribution margin per stitching-hour, rather than per unit, is what drives the Cascade-priority recommendation",
          "The $4,000 EVPI is the maximum fee the committee should rationally pay for a forecast of the demand state",
          "A forecast fee above $4,000 would reduce the expected value of the schedule decision, however accurate the forecast proves"
        ],
        "Choices": {
          "A": "Ranking the packs by contribution margin per stitching-hour, rather than per unit, is what drives the Cascade-priority recommendation",
          "B": "Choosing Cascade-priority guarantees the highest possible payoff in the season actually experienced",
          "C": "The $4,000 EVPI is the maximum fee the committee should rationally pay for a forecast of the demand state",
          "D": "Cascade-priority delivers the higher realized contribution regardless of which demand state occurs",
          "E": "A forecast fee above $4,000 would reduce the expected value of the schedule decision, however accurate the forecast proves"
        },
        "Explanation": "Statement A restates the bottleneck principle behind Exhibit 1: $32.00 versus $30.00 per hour ranks Cascade first even though Alpine leads on per-unit margin. Statement C applies the EVPI ceiling from DA-11, and statement E follows because net expected value equals the decision's EV minus the information fee—any price above $4,000 leaves the firm worse off than deciding unaided. Statements B and D confuse maximizing expected value with dominating realized payoffs: in the soft state Cascade-priority returns $330,000 against Alpine-priority's $346,000. Candidates frequently treat the EV-maximizing alternative as a sure thing; EV is a long-run average across repetitions, not a promise about any single season.",
        "Topic": "Decision-analysis interpretation",
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
        "ItemID": "CBQ22-C1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each decision-analysis quantity from the Kestrel Peak engagement to its correct value or basis.",
        "LeftItems": [
          "Expected value without perfect information",
          "Expected value with perfect information",
          "Expected value of perfect information",
          "Ranking basis under the stitching constraint"
        ],
        "RightItems": [
          "$368,600",
          "$372,600",
          "$4,000",
          "Contribution margin per bottleneck machine hour",
          "$359,250",
          "$30.00 per hour",
          "Total contribution margin per unit sold"
        ],
        "Correct": {
          "Expected value without perfect information": "$368,600",
          "Expected value with perfect information": "$372,600",
          "Expected value of perfect information": "$4,000",
          "Ranking basis under the stitching constraint": "Contribution margin per bottleneck machine hour"
        },
        "Explanation": "Each pairing traces to the computed record: the superior commitment (Cascade-priority) carries an expected value of $368,600; adding perfect foresight lets the committee switch to Alpine-priority in the soft state, lifting the expectation to $372,600; their difference, $4,000, is the EVPI ceiling for any forecast. Under the binding stitching line the correct ranking basis is contribution margin per bottleneck hour—Cascade $32.00 versus Alpine $30.00—not margin per unit. Distractors: $359,250 is the losing schedule's expected value, $30.00 per hour belongs to Alpine, and ranking on total contribution per unit sold is precisely the misconception that produces the inferior Alpine-first plan.",
        "Topic": "Decision-analysis recap",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      }
    ],
    "Industry": "Outdoor gear manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Kestrel Peak Outfitters",
    "Stakeholder": "Dana Whitfield, Chief Financial Officer",
    "BusinessFunction": "Cost accounting",
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
      "Apply contribution margin per scarce-resource hour to sequence production under a bottleneck",
      "Weight state payoffs by probabilities to compute expected monetary value",
      "Derive EVPI and use it to accept or decline a purchased forecast"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-E1",
    "Title": "Capital Rationing and Replacement Analysis",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Select the NPV-maximizing project package subject to a capital rationing constraint with indivisible projects",
      "Compute equivalent annual annuities to compare mutually exclusive assets with unequal lives",
      "Evaluate why profitability-index ranking fails under indivisibility"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Bluewater Cold Chain operates refrigerated distribution hubs in three port cities and funds discretionary projects from a single annual envelope. VP of Finance Priya Raman faces a hard board ceiling of $1,300,000, while five indivisible improvement projects each clear the corporate hurdle rate on a stand-alone basis. Separately, the failing refrigeration compressor at the Newark hub must be replaced by one of two mutually exclusive units whose service lives differ. Before Thursday's investment committee, Priya must identify the NPV-maximizing affordable package, explain why the treasury staff's profitability-index shortcut missed it, and settle the compressor choice on a comparable annualized basis.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-E1-E1",
        "CaseID": "CBQ22-E1",
        "Type": "table",
        "Title": "Exhibit 1 — Discretionary Project Menu (Independent Except Where Noted)",
        "Purpose": "Lists each project's outlay, NPV, and profitability index for the rationing search in Q1, the PI-rule critique in Q4, the feasibility statements in Q5, and the match items in Q6.",
        "ReferencedBy": [
          "CBQ22-E1-Q1",
          "CBQ22-E1-Q4",
          "CBQ22-E1-Q5",
          "CBQ22-E1-Q6"
        ],
        "Headers": [
          "Project",
          "Scope",
          "Initial outlay",
          "NPV at 10%",
          "Profitability index"
        ],
        "Rows": [
          [
            "P1 — ASRS racking conversion",
            "Automated storage and retrieval for slow-moving pallets",
            "$620,000",
            "$148,800",
            "1.24"
          ],
          [
            "P2 — Fleet telematics retrofit",
            "Route telemetry for 12 refrigerated tractors",
            "$340,000",
            "$95,200",
            "1.28"
          ],
          [
            "P3 — Rooftop solar plus storage",
            "1.2 MW array with battery buffer at Newark hub",
            "$480,000",
            "$129,600",
            "1.27"
          ],
          [
            "P4 — Dock-door automation",
            "Two powered high-speed doors at Portland hub",
            "$260,000",
            "$54,600",
            "1.21"
          ],
          [
            "P5 — WMS re-platform",
            "Warehouse management system upgrade, all hubs",
            "$300,000",
            "$78,000",
            "1.26"
          ]
        ],
        "DataFormat": "USD whole dollars; PI to two decimals",
        "AccuracyCheck": "PI = (Outlay + NPV) ÷ Outlay recomputed per row: P1 768,800/620,000 = 1.24; P2 435,200/340,000 = 1.28; P3 609,600/480,000 = 1.27; P4 314,600/260,000 = 1.21; P5 378,000/300,000 = 1.26."
      },
      {
        "ExhibitID": "CBQ22-E1-E2",
        "CaseID": "CBQ22-E1",
        "Type": "table",
        "Title": "Exhibit 2 — Newark Compressor Replacement Candidates",
        "Purpose": "Provides outlays, savings, lives, and salvage for the mutually exclusive EAA comparison in Q2, Q3, and Q6.",
        "ReferencedBy": [
          "CBQ22-E1-Q2",
          "CBQ22-E1-Q3",
          "CBQ22-E1-Q6"
        ],
        "Headers": [
          "Replacement option