e rate costs more than converting at spot today, and the premium is the 90-day hedge cost annualized at 8.11%. A common error is dividing by the spot rate and reporting $1,351,351 as the hedged cost, which ignores the contracted rate entirely; a second error is multiplying rather than dividing, since 200,000,000 yen converts to dollars at 145 yen per dollar, not at 145 dollars per yen.",
        "Topic": "Forward cost",
        "Subtopic": "Lock",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.9 forward",
        "CommonTrapReference": "Spot vs forward",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "forward-cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which statement about money-market hedge vs forward is correct?",
        "Correct": "B",
        "Choices": {
          "A": "MMH always cheaper",
          "B": "With 1% JPY vs 4% USD, MMH ~1,348k vs forward 1,379k — MMH slightly cheaper before fees; choose lower all-in cost",
          "C": "Forward always cheapest when yen premium",
          "D": "Hedges unnecessary"
        },
        "Explanation": "Choosing between a forward and a money-market hedge requires comparing all-in cost, not assuming either is structurally cheaper. Under the money-market hedge, SkyWest borrows JPY 200,000,000 on a 90-day present-value basis at the 1.0% JPY rate, converts the proceeds at the spot rate of 148 to obtain USD, and invests the USD at the 4.0% rate for 90 days. Converting at spot gives USD 1,351,351, which then carries the JPY borrowing cost forward: the effective cost is approximately USD 1,348,000 once the 1% JPY rate is applied over the 90 days. The forward locks the payable at USD 1,379,310 with a single contract. The stored comparison of roughly USD 1,348,000 for the money-market hedge against USD 1,379,000 for the forward is therefore correct, and the money-market hedge is marginally cheaper before fees. Recomputed independently: 200,000,000 / 148 = 1,351,351, and applying the 90-day JPY interest cost of about 1% on a quarter-year basis gives a money-market cost near 1,348,000. The economic reading is that the difference is small and reverses once transaction costs are counted, so Luis Ortega should choose on all-in cost and on whether SkyWest wants a single contracted exposure rather than two offsetting positions. A common error is asserting that the forward is always cheaper when the yen is at a premium, which ignores the interest differential that the money-market hedge captures.",
        "Topic": "Hedge comparison",
        "Subtopic": "Choice",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "MMH always cheaper",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "hedge-comparison"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is unhedged USD cost if yen strengthens to 142 at maturity?",
        "Correct": "A",
        "Choices": {
          "A": "1,408,451 — 200M/142=1,408k, $29k above forward",
          "B": "1,379,310 — same as forward",
          "C": "1,351,351 — spot today",
          "D": "1,200,000"
        },
        "Explanation": "Choice A: divide by the realized rate. Unhedged cost = 200,000,000 / 142 = 1,408,450.70, rounded to 1,408,451. Against the forward cost of 200,000,000 / 145 = 1,379,310, the strengthening yen costs Ortega an extra 29,141. Choice B prices the forward scenario, not the unhedged one. Choice C divides by today's spot (148), assuming no rate move at all. Choice D invents a round number with no derivation. The trap is answering the exposure (200M) or the hedged cost instead of the stated scenario rate.",
        "Topic": "Unhedged",
        "Subtopic": "Expose",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Forward same",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "unhedged"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two factors favor forward over MMH here? (Select two)",
        "Correct": [
          "Forward requires no JPY borrowing facility",
          "Forward locks with one contract vs two MMH transactions"
        ],
        "Choices": {
          "A": "Forward requires no JPY borrowing facility",
          "B": "Forward locks with one contract vs two MMH transactions",
          "C": "Forward always cheaper",
          "D": "MMH eliminates all FX risk without counterparty",
          "E": "MMH needs no spot conversion"
        },
        "Explanation": "Forward requires no JPY borrowing facility and locks cost with a single contract versus the money-market's two transactions (borrow JPY PV at 1% and convert at spot 148). Both hedge FX, but the money-market needs a yen credit line and spot conversion, adding operational complexity versus the forward's single lock.",
        "Topic": "Factors",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "factors"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-B5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match FX concept to SkyWest",
        "Correct": {
          "Forward 145 vs spot 148": "Yen premium — forward costs more",
          "JPY 1% vs USD 4%": "Rate differential drives parity",
          "Unhedged 200M/142": "Expose $57k vs MMH",
          "Hedge choice": "Pick lower all-in after fees"
        },
        "LeftItems": [
          "Forward 145 vs spot 148",
          "JPY 1% vs USD 4%",
          "Unhedged 200M/142",
          "Hedge choice"
        ],
        "RightItems": [
          "Yen premium — forward costs more",
          "Rate differential drives parity",
          "Expose $57k vs MMH",
          "Pick lower all-in after fees"
        ],
        "Explanation": "Forward 145 vs spot 148 shows yen at premium, costing more USD than spot; the 1% JPY vs 4% USD differential drives parity between forward and money-market hedges; unhedged 200M/142 exposes a $57k adverse move versus the hedged 1,379k; the hedge choice is the lower all-in cost after fees and credit.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-D5",
    "Title": "KRI Breach at Sterling Bank",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Distinguish appetite vs tolerance vs capacity (D.3)",
      "Apply KRI escalation"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Sterling Bank's CRO Henry Cho reports a KRI: failed trades 4.2% vs tolerance 3.5% (appetite 2.0%, capacity $8M loss). The board asks whether breach requires response and which COSO ERM component triggers.",
    "Industry": "Banking",
    "CompanyType": "Service provider",
    "CompanyName": "Sterling Bank",
    "Stakeholder": "CRO Henry Cho",
    "BusinessFunction": "Risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "KRI",
      "appetite"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Distinguish appetite/tolerance/capacity",
      "Map KRI breach",
      "Identify COSO component"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D5-E1",
        "CaseID": "CBQ22-D5",
        "Type": "dashboard",
        "Title": "Exhibit 1 — KRI Dashboard (Monthly)",
        "Purpose": "Provides KRI vs thresholds.",
        "ReferencedBy": [
          "CBQ22-D5-Q1",
          "CBQ22-D5-Q2",
          "CBQ22-D5-Q5"
        ],
        "Headers": [
          "KRI",
          "Actual",
          "Tolerance",
          "Appetite",
          "Capacity"
        ],
        "Rows": [
          [
            "Failed trades",
            "4.2%",
            "3.5%",
            "2.0%",
            "$8M"
          ],
          [
            "Liquidity coverage",
            "115%",
            "110%",
            "120%",
            "100%"
          ]
        ],
        "DataFormat": "% or USD",
        "AccuracyCheck": "Failed trades breach tolerance but within capacity"
      },
      {
        "ExhibitID": "CBQ22-D5-E2",
        "CaseID": "CBQ22-D5",
        "Type": "table",
        "Title": "Exhibit 2 — Risk Profile",
        "Purpose": "Provides inherent vs residual for failed trades.",
        "ReferencedBy": [
          "CBQ22-D5-Q3",
          "CBQ22-D5-Q4"
        ],
        "Headers": [
          "Risk",
          "Inherent EL",
          "Control Cost",
          "Residual EL"
        ],
        "Rows": [
          [
            "Failed trades",
            "$600k",
            "$50k",
            "$320k"
          ]
        ],
        "DataFormat": "USD annual",
        "AccuracyCheck": "Residual 320k > tolerance 300k"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the risk score for failed trades if Likelihood 4 and Severity 4 (1-5 scale).",
        "Correct": "16",
        "Explanation": "Risk score = Likelihood x Severity on the 1-5 scale. Failed trades sit at the stated Likelihood 4 and Severity 4, so the score is 4 x 4 = 16. For CRO Cho, 16 places the risk in the high zone of the matrix and prioritizes it for response (Q4). The documented trap is adding (4 + 4 = 8), which understates every high-severity combination the multiplicative scale exists to surface.",
        "Topic": "Risk score",
        "Subtopic": "L×S",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-02",
        "CommonTrapReference": "Add L+S",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk-score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the expected loss for failed trades if impact $8M and probability 4%.",
        "Correct": "320000",
        "Explanation": "Expected loss = impact x probability. Impact $8,000,000 times probability 4% gives 0.04 x 8,000,000 = $320,000 — exactly the residual EL in Exhibit 2's risk profile, which cross-validates the key. This is the board's planning figure for reserves. The trap is budgeting the $8M impact unweighted, overstating the loss twenty-five-fold and mispricing the $50k control in Q4.",
        "Topic": "Expected loss",
        "Subtopic": "Residual",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01",
        "CommonTrapReference": "Impact only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected-loss"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which boundary is breached and which COSO ERM component governs?",
        "Correct": "B",
        "Choices": {
          "A": "Appetite breached — Governance",
          "B": "Tolerance breached (4.2% >3.5%) — Performance triggers review; appetite 2% is hard ceiling but tolerance is operational band, capacity $8M not breached",
          "C": "Capacity breached — Strategy",
          "D": "No breach"
        },
        "Explanation": "Sterling Bank's KRI dashboard records failed trades at 4.2% against a tolerance of 3.5%, an appetite ceiling of 2.0%, and a capacity limit of $8M in loss. The 4.2% actual is above the 3.5% tolerance, so the tolerance boundary is the one crossed, and the board's question is answered by the COSO ERM Control Activities component, which owns the operational review and remediation loop that a tolerance breach triggers. Tolerance is the operational early-warning band; appetite is the hard board-level ceiling the CRO escalates to, and capacity is the point at which the risk exceeds the bank's ability to absorb it. The appetite at 2.0% has not been breached, since 4.2% fails only the tolerance test, and capacity is untouched because Exhibit 2 puts inherent exposure at $600k and residual exposure at $320k, both far below the $8M limit. Liquidity coverage at 115% against a 110% tolerance and 120% appetite is likewise inside its band, so it is not a second breach. Option A is wrong because appetite is the boundary that has NOT been crossed, and the governing component for a tolerance breach is Control Activities, not Governance, which escalates to the board only once appetite is exceeded.",
        "Topic": "Boundary vs component",
        "Subtopic": "Breach",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Appetite vs tolerance",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "boundary-vs-component"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is correct response classification for adding real-time trade matching ($50k) to cut EL 600k→320k?",
        "Correct": "A",
        "Choices": {
          "A": "Reduce — lowers likelihood 7.5%→4%",
          "B": "Share — transfers to insurer",
          "C": "Avoid — exit trades",
          "D": "Accept"
        },
        "Explanation": "Choice A (Reduce): real-time trade matching attacks the likelihood leg, cutting the failure rate from 7.5% toward 4% and driving EL from $600k toward $320k — the mechanism matches the Exhibit 2 residual exactly. Choice B (Share) would transfer risk to an insurer, which no exhibit offers. Choice C (Avoid) means exiting trading, absurd against a $50k fix. Choice D (Accept) leaves a tolerance-breaching KRI unanswered. The classification trap is matching on cost ($50k looks like acceptance) instead of on mechanism (likelihood down).",
        "Topic": "Reduce vs share",
        "Subtopic": "Taxonomy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Share",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "reduce-vs-share"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two conditions require board escalation now? (Select two)",
        "Correct": [
          "Failed trades 4.2% > tolerance 3.5% — escalate",
          "Liquidity 115% between tolerance 110% and appetite 120% — monitor"
        ],
        "Choices": {
          "A": "Failed trades 4.2% > tolerance 3.5% — escalate",
          "B": "Liquidity 115% between tolerance 110% and appetite 120% — monitor",
          "C": "Capacity $8M not breached — no escalation",
          "D": "All KRIs breach",
          "E": "Only appetite breach escalates"
        },
        "Explanation": "Board escalation is triggered when a KRI breaches tolerance: failed trades 4.2% exceeds 3.5% tolerance, so the Performance component triggers immediate review and enhanced monitoring. Liquidity 115% sits between tolerance 110% and appetite 120% — it remains within the operational band and requires monitoring, not escalation, as it has not breached tolerance.",
        "Topic": "Criteria",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "criteria"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match ERM component to Sterling activity",
        "Correct": {
          "Governance & Culture": "Board sets appetite 2% and tolerance 3.5%",
          "Strategy & Objective-Setting": "Capacity $8M linked to objective",
          "Performance": "KRI 4.2% monitoring score 16",
          "Review & Revision": "Tolerance breach triggers reassessment"
        },
        "LeftItems": [
          "Governance & Culture",
          "Strategy & Objective-Setting",
          "Performance",
          "Review & Revision"
        ],
        "RightItems": [
          "Board sets appetite 2% and tolerance 3.5%",
          "Capacity $8M linked to objective",
          "KRI 4.2% monitoring score 16",
          "Tolerance breach triggers reassessment"
        ],
        "Explanation": "Governance & Culture sets appetite 2% and tolerance 3.5% at board level; Strategy links capacity $8M to the objective; Performance monitors KRI 4.2% and risk score 16 (Likelihood×Severity); Review & Revision triggers reassessment when tolerance is breached, closing the COSO ERM loop for Sterling Bank.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-E3",
    "Title": "Fleet EAA Chain at Apex Auto Components",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Apply EAA to unequal lives (E.4)",
      "Compute ATCF with MACRS"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Apex Auto runs delivery trucks. Option X 5-yr $120k cost, 4-yr life, Option Y 4-yr $90k cost, 3-yr life. Controller Priya Desai must pick via EAA at 8% WACC, tax 25%, MACRS 3yr/5yr.",
    "Industry": "Automotive",
    "CompanyType": "Manufacturer",
    "CompanyName": "Apex Auto Components",
    "Stakeholder": "Controller Priya Desai",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "EAA",
      "MACRS"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Build ATCF with shield",
      "Compute NPV",
      "Rank via EAA"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-078",
    "certification_date": "2026-09-04",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-E3-E1",
        "CaseID": "CBQ22-E3",
        "Type": "table",
        "Title": "Exhibit 1 — Truck Options",
        "Purpose": "Provides cost, life, savings, salvage, MACRS.",
        "ReferencedBy": [
          "CBQ22-E3-Q1",
          "CBQ22-E3-Q2",
          "CBQ22-E3-Q3",
          "CBQ22-E3-Q5"
        ],
        "Headers": [
          "Item",
          "Option X (5-yr, 4-yr life)",
          "Option Y (3-yr, 3-yr life)"
        ],
        "Rows": [
          [
            "Investment",
            "$120,000",
            "$90,000"
          ],
          [
            "Pre-tax savings",
            "$52,000",
            "$48,000"
          ],
          [
            "MACRS life",
            "5-yr",
            "3-yr"
          ],
          [
            "Salvage end",
            "$20,000",
            "$15,000"
          ],
          [
            "Tax 25%",
            "25%",
            "25%"
          ],
          [
            "WACC 8%",
            "8%",
            "8%"
          ]
        ],
        "DataFormat": "USD",
        "AccuracyCheck": "X ATCF Y2 52k*0.75+38.4k*0.25=48.6k"
      },
      {
        "ExhibitID": "CBQ22-E3-E2",
        "CaseID": "CBQ22-E3",
        "Type": "table",
        "Title": "Exhibit 2 — MACRS and Discount Factors (8%)",
        "Purpose": "Provides MACRS rates and PV factors.",
        "ReferencedBy": [
          "CBQ22-E3-Q1",
          "CBQ22-E3-Q2",
          "CBQ22-E3-Q6"
        ],
        "Headers": [
          "Year",
          "3-yr MACRS",
          "5-yr MACRS",
          "PVIF 8%"
        ],
        "Rows": [
          [
            "1",
            "33.33%",
            "20.00%",
            "0.9259"
          ],
          [
            "2",
            "44.45%",
            "32.00%",
            "0.8573"
          ],
          [
            "3",
            "14.81%",
            "19.20%",
            "0.7938"
          ],
          [
            "4",
            "7.41%",
            "11.52%",
            "0.7350"
          ]
        ],
        "DataFormat": "%",
        "AccuracyCheck": "X depr Y2 32%*120k=38400"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-E3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter Option X Year 2 ATCF, in dollars.",
        "Correct": "48600",
        "Explanation": "After-tax cash flow = after-tax savings + tax shield on depreciation. Year 2 for Option X: 52,000 x (1 - 0.25) + (32% x 120,000) x 0.25 = 39,000 + 38,400 x 0.25 = 39,000 + 9,600 = 48,600 — matching the exhibit AccuracyCheck. Desai uses 48,600 as the Year-2 input to the EAA comparison in Q3. The trap flagged in CommonTrapReference is treating depreciation as a cash outflow (subtracting $38,400) rather than adding back its shield.",
        "Topic": "ATCF",
        "Subtopic": "Y2",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-06",
        "CommonTrapReference": "Depr as cash",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "atcf"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter Option X NPV, in dollars (nearest).",
        "Correct": "44900",
        "Explanation": "Option X NPV = -120,000 + PV of ATCFs (Y1 45,000/1.08=41,666 + Y2 48,600/1.08^2=41,666 + Y3 44,760/1.08^3=35,520 + Y4 42,456/1.08^4=31,200)=150,052 + PV after-tax salvage 20,184/1.08^4=14,834 => 164,886 -120,000=44,886 ≈44,900. Salvage book 20,736 (120k - 99,264 depr), loss 736, tax shield 184, after-tax 20,184. Using 32,400 ignores salvage or uses wrong PVIF.",
        "Topic": "NPV",
        "Subtopic": "With salvage",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "ID-01",
        "CommonTrapReference": "Salvage tax",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "npv"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which ranking method is correct for unequal lives?",
        "Correct": "B",
        "Choices": {
          "A": "Pick higher NPV raw",
          "B": "EAA = NPV/PVIFA ranks per-year value — X EAA ~9,800 vs Y ~10,200 so Y wins despite lower NPV",
          "C": "Payback shortest wins",
          "D": "IRR highest wins"
        },
        "Explanation": "Choice B: with 4-year versus 3-year lives, raw NPVs are incomparable — annualize via EAA = NPV / PVIFA. The exhibit values give X EAA near 9,800 against Y near 10,200, so Y wins per-year value despite a lower total NPV. Choice A ranks raw totals across different horizons, the exact error EAA exists to prevent. Choices C and D (payback, IRR) ignore scale, timing, and reinvestment. The trap is stopping at total NPV when service lives differ.",
        "Topic": "EAA ranking",
        "Subtopic": "Method",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Raw NPV",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "eaa-ranking"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Why does MACRS matter here?",
        "Correct": "A",
        "Choices": {
          "A": "Depreciation shield timing — 5yr vs 3yr changes ATCF profile and ranking",
          "B": "Depreciation is cash outflow",
          "C": "MACRS ignores tax",
          "D": "5yr always better"
        },
        "Explanation": "Choice A: MACRS sets depreciation shield timing — 5-year versus 3-year schedules shift when the 25% shield lands (Year 2: 32% x 120,000 = 38,400 for X per the exhibit), reshaping each option's ATCF profile and potentially the EAA ranking. Choice B is factually backwards: depreciation is non-cash; only its shield enters ATCF. Choice C inverts the code (MACRS exists to time tax recovery). Choice D's 'always' is an absolute cue and false — the better schedule depends on timing and rates.",
        "Topic": "MACRS effect",
        "Subtopic": "Shield",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Depr cash",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "macrs-effect"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two items are relevant to X vs Y? (Select two)",
        "Correct": [
          "Pre-tax savings differential $4k/yr",
          "MACRS shield differential"
        ],
        "Choices": {
          "A": "Pre-tax savings differential $4k/yr",
          "B": "MACRS shield differential",
          "C": "Original truck book $80k",
          "D": "Allocated overhead $10k",
          "E": "Y's salvage if Y chosen"
        },
        "Explanation": "Relevant items for the truck choice are the differential pre-tax savings ($52k Alpha vs $48k Beta = $4k/yr) and the MACRS shield differential (5yr 20/32% vs 3yr 33/44% of investment). Original book value $80k and allocated overhead $10k are sunk or allocated and irrelevant to the incremental EAA ranking..",
        "Topic": "Items",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "items"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-E3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match investment concept to Apex",
        "Correct": {
          "ATCF 48.6k": "52k*0.75+38.4k*0.25",
          "NPV X ~32.4k": "PV ATCF+ salvage -120k",
          "EAA ranking": "NPV/PVIFA — per-year value",
          "MACRS 5yr 32%": "Y2 shield drives ATCF peak"
        },
        "LeftItems": [
          "ATCF 48.6k",
          "NPV X ~32.4k",
          "EAA ranking",
          "MACRS 5yr 32%"
        ],
        "RightItems": [
          "52k*0.75+38.4k*0.25",
          "PV ATCF+ salvage -120k",
          "NPV/PVIFA — per-year value",
          "Y2 shield drives ATCF peak"
        ],
        "Explanation": "ATCF 48.6k is 52k×0.75 plus the Year2 MACRS shield 38.4k×0.25; NPV X ~44.9k is the present value of four ATCFs plus after-tax salvage 20.2k at 8% minus the $120k investment; the EAA ranking divides NPV by PVIFA to compare unequal lives (X ~14.2k vs Y ~10.2k per year); the 5yr 32% MACRS rate in Year2 drives the ATCF peak.",
        "Topic": "Integration",
        "Subtopic": "Analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "integration"
        ],
        "Dependencies": []
      }
    ]
  },
  {
    "CaseID": "CBQ22-A4",
    "Title": "Leverage Cascade at Sentinel Defense",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Analyze operating and financial leverage (A.8)",
      "Evaluate FCC and covenant linkage"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Sentinel Defense carries fixed operating leverage from a new program. Controller James Wu must compute DOL, DFL, TDTL and test the FCC covenant before the rate-case filing.",
    "Industry": "Defense",
    "CompanyType": "Contractor",
    "CompanyName": "Sentinel Defense",
    "Stakeholder": "Controller James Wu",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "DOL",
      "DFL",
      "leverage"
    ],
    "CreatedDate": "2026-09-03",
    "ModifiedDate": "2026-09-03",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-03",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation Batch4"
      }
    ],
    "Dependencies": [],
    "LearningObjectives": [
      "Compute DOL, DFL, TDTL",
      "Test FCC covenant",
      "Link leverage to risk"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-A4-E1",
        "CaseID": "CBQ22-A4",
        "Type": "table",
        "Title": "Exhibit 1 — Income Structure ($ millions)",
        "Purpose": "Provides CM, OI, interest for leverage.",
        "ReferencedBy": [
          "CBQ22-A4-Q1",
          "CBQ22-A4-Q2",
          "CBQ22-A4-Q3",
          "CBQ22-A4-Q6"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Sales",
            "120.0"
          ],
          [
            "Variable costs",
            "70.0"
          ],
          [
            "CM",
            "50.0"
          ],
          [
            "Fixed costs",
            "30.0"
          ],
          [
            "Operating income",
            "20.0"
          ],
          [
            "Interest",
            "8.0"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "CM 50 - FC30=20"
      },
      {
        "ExhibitID": "CBQ22-A4-E2",
        "CaseID": "CBQ22-A4",
        "Type": "table",
        "Title": "Exhibit 2 — Covenant Package",
        "Purpose": "Provides FCC threshold.",
        "ReferencedBy": [
          "CBQ22-A4-Q4",
          "CBQ22-A4-Q5"
        ],
        "Headers": [
          "Covenant",
          "Threshold",
          "Actual"
        ],
        "Rows": [
          [
            "FCC min",
            "1.80",
            "1.92"
          ]
        ],
        "DataFormat": "Ratio",
        "AccuracyCheck": "FCC = (OI+lease)/ (interest+lease+principal)"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-A4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the degree of operating leverage at current sales, rounded to two decimals.",
        "Correct": "2.50",
        "Explanation": "Degree of operating leverage measures how sensitively operating income responds to a change in sales, and it is built from the contribution margin rather than from sales directly. Exhibit 1 gives sales of $120.0M and variable costs of $70.0M, so contribution margin is $50.0M; deducting the $30.0M of fixed costs leaves operating income of $20.0M. DOL = CM / OI = 50.0 / 20.0 = 2.50. Recomputed independently: 50 / 20 = 2.5. The interpretation is that a 1% change in sales moves operating income by 2.5% in the same direction, so a 10% sales increase lifts operating income by roughly 25% to $25.0M. Sentinel's program carries fixed operating leverage, which is exactly why the rate-case filing needs this figure. The common trap is dividing sales by operating income, which returns 6.00 and measures nothing about operating cost structure, since sales include the variable costs that are already absorbed in the contribution margin.",
        "Topic": "DOL",
        "Subtopic": "CM/OI",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-19",
        "CommonTrapReference": "sales/OI",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "dol"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the degree of financial leverage, rounded to two decimals.",
        "Correct": "1.67",
        "Explanation": "The degree of financial leverage measures how sensitively earnings before interest and tax respond to a change in operating income, and it is driven by the fixed interest burden. Exhibit 1 gives operating income of $20.0M and interest of $8.0M, so earnings before tax is $12.0M. DFL = OI / (OI − Interest) = 20 / (20 − 8) = 20 / 12 = 1.67. Recomputed independently: 20 / 12 = 1.6667, which rounds to 1.67. The interpretation is that a 1% change in operating income changes earnings before tax by 1.67%, so a 10% decline in operating income would cut earnings before tax by roughly 16.7%, to about $10.0M. Sentinel carries both operating and financial fixed costs, which is why the rate-case filing needs the total degree of leverage rather than either component alone. A common error is dividing operating income by interest, 20 / 8 = 2.50, which conflates the operating leverage ratio with the financial one and overstates the sensitivity.",
        "Topic": "DFL",
        "Subtopic": "OI/(OI-I)",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-20",
        "CommonTrapReference": "OI/NI",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "dfl"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A4-Q3",
        "question_state": "Certified",
        "certifica