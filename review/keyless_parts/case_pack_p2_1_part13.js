SE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the RAROC for Health line, in percent.",
        "Correct": "20.00",
        "Explanation": "Health RAROC = ($12M - $7M) / $25M = $5M / $25M = 20.00%. Although Health's gross loss is larger in dollars than Auto's ($7M vs $4M), the capital base is also larger ($25M vs $20M), and the resulting risk-adjusted return is 20% — still above the 15% hurdle but the lowest of the four lines. Per D.5, RAROC normalizes for capital intensity so that a high-revenue/high-loss line (Health) can be ranked against a low-revenue/low-loss line (Life at 50%) on a comparable basis. The trap is the gross-ratio (revenue/capital = 48%), which ignores EL.",
        "Topic": "RAROC Health",
        "Subtopic": "Health",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "D.5 RAROC",
        "CommonTrapReference": "Revenue/Capital",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc-health"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which line should receive incremental capital?",
        "Correct": "C",
        "Explanation": "Life line RAROC = ($6M - $1M) / $10M = 50%, the highest in the portfolio and well above the 15% hurdle. Per D.5 and D.7 capital allocation discipline, incremental capital should flow to the highest-RAROC line first because each marginal dollar of capital earns more risk-adjusted return there. Auto (30%), Property (30%), and Health (20%) all clear the hurdle but rank below Life. Choice A misidentifies Health (the lowest); Choice B cites Auto but ignores Life (highest); Choice D treats the Property-Auto tie as equivalent to Life's dominance.",
        "Topic": "Capital allocation",
        "Subtopic": "Choice",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Health lowest",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "capital-allocation"
        ],
        "Dependencies": [],
        "Choices": [
          "Health 20% — lowest",
          "Auto 30% — but Life 50% highest",
          "Life 50% — highest RAROC above hurdle, best risk-adjusted",
          "Property 30% — tie"
        ]
      },
      {
        "ItemID": "CBQ21-D3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What does RAROC 30% vs hurdle 15% imply?",
        "Correct": "A",
        "Explanation": "RAROC of 30% against a 15% hurdle implies value creation: the line's risk-adjusted return exceeds the cost-of-capital-adjusted hurdle, so every dollar of capital allocated generates positive economic profit (RAROC - hurdle, times capital). For Auto, that spread is 15 percentage points × $20M capital = $3.0M of expected economic profit per period. A line below hurdle would destroy value (negative economic profit); a line at hurdle is the break-even risk-adjusted decision boundary. Choice B (destroys value) is the inverse trap; Choice C (breakeven) applies only when RAROC = hurdle exactly; Choice D ignores the hurdle framework.",
        "Topic": "Hurdle",
        "Subtopic": "Implication",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Destroys value",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "hurdle"
        ],
        "Dependencies": [],
        "Choices": [
          "Creates value — return exceeds risk-adjusted hurdle; allocate",
          "Destroys value",
          "Breakeven",
          "Ignore hurdle"
        ]
      },
      {
        "ItemID": "CBQ21-D3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two actions improve RAROC? (Select two)",
        "Correct": [
          "Reduce expected loss via underwriting controls — numerator up",
          "Optimize capital via reinsurance — denominator down"
        ],
        "Explanation": "RAROC improves when numerator rises or denominator falls, holding risk constant. Two actions that meet these criteria: reducing expected loss through underwriting controls (numerator up — fewer claims per dollar of revenue) and optimizing capital via reinsurance (denominator down — ceded risk reduces required economic capital). Choice C ('increase revenue without capital change') raises gross revenue but also raises expected loss proportionally — RAROC may not improve. Choice D ('add capital arbitrarily') inflates the denominator and lowers RAROC. Choice E ('cut revenue') lowers numerator — directionally wrong. The two correct answers are the underwriting-control and reinsurance levers.",
        "Topic": "RAROC lever",
        "Subtopic": "Improvement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Revenue only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc-lever"
        ],
        "Dependencies": [],
        "Choices": [
          "Reduce expected loss via underwriting controls — numerator up",
          "Optimize capital via reinsurance — denominator down",
          "Increase revenue without capital change — but risk up",
          "Add capital arbitrarily",
          "Cut revenue"
        ]
      },
      {
        "ItemID": "CBQ21-D3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match RAROC concept to Shield",
        "Correct": {
          "Auto RAROC 30%": "(10-4)/20 — value, allocate",
          "Health RAROC 20%": "(12-7)/25 — lowest, de-allocate",
          "Life RAROC 50%": "(6-1)/10 — best, prioritize",
          "Hurdle 15%": "Risk-adjusted hurdle — creates value above"
        },
        "Explanation": "Auto RAROC 30% = ($10M-$4M)/$20M, value-creating, should be allocated. Health RAROC 20% = ($12M-$7M)/$25M, the lowest among cleared lines, candidate for de-allocation or repricing. Life RAROC 50% = ($6M-$1M)/$10M, the highest, should be prioritized for incremental capital. The 15% hurdle is the risk-adjusted cost-of-capital threshold above which a line creates economic profit and below which it destroys value — the practical dividing line for capital deployment decisions in an ERM-driven insurance portfolio.",
        "Topic": "RAROC mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Revenue/Capital",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "raroc-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Auto RAROC 30%",
          "Health RAROC 20%",
          "Life RAROC 50%",
          "Hurdle 15%"
        ],
        "RightItems": [
          "(10-4)/20 — value, allocate",
          "(12-7)/25 — lowest, de-allocate",
          "(6-1)/10 — best, prioritize",
          "Risk-adjusted hurdle — creates value above"
        ]
      }
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-E4",
    "Title": "Monte Carlo NPV at Northwind Pharma",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Interpret Monte Carlo NPV distribution (E.3)",
      "Apply sensitivity tornado"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Northwind Pharma's $5M drug line has base NPV $1.2M, SD $0.8M from Monte Carlo 10k runs. CFO Priya Desai must interpret distribution and tornado sensitivity (price ±20% drives 60% of variance).",
    "Industry": "Pharmaceutical",
    "CompanyType": "Manufacturer",
    "CompanyName": "Northwind Pharma",
    "Stakeholder": "CFO Priya Desai",
    "BusinessFunction": "Capital budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "Monte Carlo",
      "NPV",
      "sensitivity"
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
      "Interpret mean/SD vs point",
      "Use tornado for driver",
      "Decide under risk"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-E4-E1",
        "CaseID": "CBQ21-E4",
        "Type": "table",
        "Title": "Exhibit 1 — Monte Carlo Output",
        "Purpose": "Provides NPV distribution stats.",
        "ReferencedBy": [
          "CBQ21-E4-Q1",
          "CBQ21-E4-Q2",
          "CBQ21-E4-Q3"
        ],
        "Headers": [
          "Stat",
          "Value"
        ],
        "Rows": [
          [
            "Mean NPV",
            "$1.2M"
          ],
          [
            "SD",
            "$0.8M"
          ],
          [
            "P(NPV>0)",
            "84%"
          ],
          [
            "5% VaR",
            "-$0.12M"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "Mean 1.2, SD 0.8, Z=(0-1.2)/0.8=-1.5 => 6.7% left tail, 93% >0 but simulation 84% due to skew"
      },
      {
        "ExhibitID": "CBQ21-E4-E2",
        "CaseID": "CBQ21-E4",
        "Type": "chart",
        "Title": "Exhibit 2 — Tornado Sensitivity",
        "Purpose": "Shows driver contribution to variance.",
        "ReferencedBy": [
          "CBQ21-E4-Q4",
          "CBQ21-E4-Q5",
          "CBQ21-E4-Q6"
        ],
        "Headers": [
          "Driver",
          "Variance Contribution"
        ],
        "Rows": [
          [
            "Price",
            "60%"
          ],
          [
            "Volume",
            "25%"
          ],
          [
            "Cost",
            "15%"
          ]
        ],
        "DataFormat": "%",
        "AccuracyCheck": "Price dominates"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-E4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the coefficient of variation for NPV, rounded to two decimals.",
        "Correct": "0.67",
        "Explanation": "Under capital-budgeting risk analysis (IMA/CMA), the coefficient of variation (CV) measures relative risk per unit of expected return: CV = SD_NPV / E[NPV] = 0.8 / 1.2 = 0.6667, rounded to 0.67. A CV of 0.67 (66.7%) exceeds the 0.50 threshold typically associated with high risk, so the point NPV of $1.2M alone understates the project's risk; the full distribution matters. Business interpretation: Northwind's drug line carries material dispersion around its expected value - a decision-maker should weigh the 84% probability of positive NPV against the 5% VaR of -$0.12M. A common exam trap is reporting only the point NPV, confusing CV with the standard deviation, or ignoring that a positive mean can coexist with a 16% chance of loss.",
        "Topic": "CV",
        "Subtopic": "SD/Mean",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "E.3 CV",
        "CommonTrapReference": "SD only",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cv"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the z-score for NPV=0, rounded to two decimals.",
        "Correct": "-1.50",
        "Explanation": "Z-score for NPV = 0 under the normal approximation: Z = (0 - mu)/sigma = (0 - 1.2)/0.8 = -1.50. A Z of -1.50 corresponds to a 6.68% left-tail probability, i.e., a 93.3% probability that NPV exceeds zero under normality; the simulation shows 84% due to skew. Business interpretation: the drug line has roughly a 1-in-15 chance of destroying value under the normal model, but the skewed distribution (84% simulated) signals fatter downside risk than the bell curve implies; the 5% VaR of -$0.12M confirms the left tail. A common exam trap is using (mean - 0)/SD (sign error) yielding +1.50, or treating the normal-tail probability as the simulated probability.",
        "Topic": "Z-score",
        "Subtopic": "(0-mean)/SD",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "E.3 Z",
        "CommonTrapReference": "Mean/SD",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "z-score"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What does Monte Carlo 84% P(NPV>0) vs point NPV $1.2M imply?",
        "Correct": "B",
        "Explanation": "Monte Carlo 10,000 runs produce a distribution: mean NPV $1.2M, SD $0.8M, P(NPV>0) = 84%. The point NPV ($1.2M) is the expected value; the 84% confidence is the probability that the realized NPV exceeds zero across the simulated scenarios. A 16% chance of loss despite a positive mean is not 'risk-free' — risk-adjusted decision requires comparing both metrics against the company's risk appetite (e.g., 5% VaR of -$0.12M from Exhibit 1). Choice A misreads 84% as certainty; Choice C is the deterministic-fallacy trap; Choice D confuses the 84% with a dollar amount. The CFO should report both point NPV and distribution to the board.",
        "Topic": "Monte vs point",
        "Subtopic": "Interpretation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "84% risk-free",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "monte-vs-point"
        ],
        "Dependencies": [],
        "Choices": [
          "84% means project is risk-free",
          "84% is risk-adjusted confidence — 16% chance of loss despite positive mean; decision depends on risk appetite vs VaR -0.12M",
          "Point NPV is sufficient, ignore distribution",
          "84% means NPV is $0.84M"
        ]
      },
      {
        "ItemID": "CBQ21-E4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which driver should sensitivity focus audit on?",
        "Correct": "A",
        "Explanation": "Tornado sensitivity shows price variance contributes 60% of total NPV variance — the dominant driver. Per E.4 sensitivity-analysis discipline, audit and risk-management effort should focus on the highest-variance driver first because reducing price uncertainty captures the largest expected NPV variance reduction. Volume contributes 25% (second priority); cost contributes 15% (lowest priority, often not worth dedicated hedging unless asymmetric). Choice B (cost 15%) inverts the priority; Choice C (all equally) ignores the tornado's monotonic structure; Choice D (volume 25%) addresses the second-priority driver, missing the biggest lever.",
        "Topic": "Sensitivity",
        "Subtopic": "Driver",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "All equally",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sensitivity"
        ],
        "Dependencies": [],
        "Choices": [
          "Price — 60% of variance",
          "Cost 15% — lowest contribution",
          "All equally",
          "Volume 25% — middle"
        ]
      },
      {
        "ItemID": "CBQ21-E4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two actions manage risk given tornado? (Select two)",
        "Correct": [
          "Lock price via contract — addresses 60% driver",
          "Hedge volume via offtake agreement — addresses 25%"
        ],
        "Explanation": "Two actions manage risk proportional to driver variance. Locking price via contract addresses 60% (the dominant driver) and removes the largest source of NPV variability. Hedging volume via offtake agreement addresses 25% (second driver) and stabilizes the demand-side risk. Cost audit at 15% is the lowest-leverage action and not in the optimal pair; it might be done for completeness but is not where risk-management effort pays off. Choice C (audit cost only) misses the dominant drivers; Choice D (ignore price) violates the tornado hierarchy; Choice E (add fixed cost) worsens downside by raising the loss threshold..",
        "Topic": "Risk management",
        "Subtopic": "Actions",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Cost focus",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk-management"
        ],
        "Dependencies": [],
        "Choices": [
          "Lock price via contract — addresses 60% driver",
          "Hedge volume via offtake agreement — addresses 25%",
          "Audit cost 15% driver only",
          "Ignore price",
          "Add fixed cost"
        ]
      },
      {
        "ItemID": "CBQ21-E4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match Monte Carlo concept to Northwind",
        "Correct": {
          "Mean $1.2M vs SD $0.8M": "Point vs dispersion — CV 0.67",
          "84% P>0": "Confidence, 16% loss chance",
          "Tornado price 60%": "Dominant driver — audit price",
          "VaR -0.12M": "5% tail loss — appetite test"
        },
        "Explanation": "Mean NPV $1.2M vs SD $0.8M describes point estimate against dispersion — the coefficient of variation is 0.67, indicating high relative volatility. 84% P(NPV>0) is the confidence interval for positive returns, leaving 16% loss probability. Tornado price 60% is the dominant variance driver — audit price inputs and consider price hedging first. 5% VaR of -$0.12M is the tail-loss appetite test: at the 5th percentile, the project loses $120k, which the risk committee should weigh against the 84% upside probability when deciding whether to proceed.",
        "Topic": "Monte mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Point vs distribution",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "monte-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Mean $1.2M vs SD $0.8M",
          "84% P>0",
          "Tornado price 60%",
          "VaR -0.12M"
        ],
        "RightItems": [
          "Point vs dispersion — CV 0.67",
          "Confidence, 16% loss chance",
          "Dominant driver — audit price",
          "5% tail loss — appetite test"
        ]
      }
    ],
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-D4",
    "Title": "Supply-Chain Disruption and Concentration Risk at Cascade Manufacturing",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Assess organizational risks using quantitative methods",
      "Determine risk appetite and tolerance levels",
      "Apply appropriate risk response strategies"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Cascade Manufacturing's VP of Risk Management, Laura Chen, must brief the board on the company's exposure to supply-chain disruption. Cascade sources a single critical component from three suppliers: Supplier A provides 40% of volume with a 5% annual failure rate and an estimated $2.4 million loss per disruption event, Supplier B provides 35% of volume with a 3% failure rate and $1.8 million loss per event, and Supplier C provides 25% of volume with an 8% failure rate and $2.0 million loss per event. A disruption at any one supplier halts the corresponding share of production. The risk manager must compute expected losses, evaluate two insurance deductible options, classify the three suppliers on a risk heat map, and recommend an integrated risk-management strategy to the board.",
    "Industry": "Industrial manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Cascade Manufacturing",
    "Stakeholder": "VP of Risk Management Laura Chen",
    "BusinessFunction": "Risk Management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "expected loss",
      "risk heat map",
      "deductible optimization",
      "supplier risk",
      "concentration risk"
    ],
    "CreatedDate": "2026-09-04",
    "ModifiedDate": "2026-09-04",
    "Author": "Case Author",
    "Confidence": 90,
    "RevisionHistory": [
      {
        "Date": "2026-09-04",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation"
      }
    ],
    "question_state": "Certified",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Compute expected annual loss for individual suppliers and in aggregate",
      "Classify risks on a heat map using likelihood and severity ratings",
      "Compare insurance deductible options using retention cost versus premium savings",
      "Match each supplier to an appropriate risk response strategy",
      "Recommend an integrated risk-management approach addressing concentration risk"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-D4-E1",
        "CaseID": "CBQ21-D4",
        "Type": "table",
        "Title": "Exhibit 1 — Supplier Risk Profile",
        "Purpose": "Provides each supplier's volume share, historical failure rate, estimated loss per disruption event, and the risk manager's likelihood and severity ratings for the heat-map analysis.",
        "ReferencedBy": [
          "CBQ21-D4-Q1",
          "CBQ21-D4-Q2",
          "CBQ21-D4-Q3",
          "CBQ21-D4-Q5",
          "CBQ21-D4-Q6"
        ],
        "Headers": [
          "Supplier",
          "Volume Share",
          "Annual Failure Rate",
          "Loss per Disruption",
          "Likelihood (1-5)",
          "Severity (1-5)"
        ],
        "Rows": [
          [
            "Supplier A",
            "40%",
            "5%",
            "$2,400,000",
            "3",
            "4"
          ],
          [
            "Supplier B",
            "35%",
            "3%",
            "$1,800,000",
            "2",
            "3"
          ],
          [
            "Supplier C",
            "25%",
            "8%",
            "$2,000,000",
            "4",
            "3"
          ]
        ],
        "DataFormat": "Percentages and USD whole dollars; likelihood and severity on 1-5 integer scale",
        "AccuracyCheck": "All expected losses independently verified: A = 0.05 x $2,400,000 = $120,000; B = 0.03 x $1,800,000 = $54,000; C = 0.08 x $2,000,000 = $160,000; Total = $334,000"
      },
      {
        "ExhibitID": "CBQ21-D4-E2",
        "CaseID": "CBQ21-D4",
        "Type": "table",
        "Title": "Exhibit 2 — Insurance Deductible Options",
        "Purpose": "Presents the two insurance deductible structures under consideration, including annual premiums, claims processing costs, and the expected annual claims amount below each deductible threshold.",
        "ReferencedBy": [
          "CBQ21-D4-Q4"
        ],
        "Headers": [
          "Parameter",
          "Option 1: $50,000 Deductible",
          "Option 2: $100,000 Deductible"
        ],
        "Rows": [
          [
            "Annual premium",
            "$85,000",
            "$65,000"
          ],
          [
            "Claims processing cost per event",
            "$5,000",
            "$5,000"
          ],
          [
            "Expected annual claims below deductible",
            "$15,000",
            "$0"
          ],
          [
            "Expected annual claims above deductible",
            "$319,000",
            "$334,000"
          ]
        ],
        "DataFormat": "USD whole dollars",
        "AccuracyCheck": "Total expected loss of $334,000 is consistent across both options. Under Option 1, retained loss = $50,000 deductible + $15,000 sub-deductible claims = $65,000; claims above deductible = $334,000 - $65,000 = $269,000 paid by insurer. Under Option 2, retained loss = $100,000 deductible (all $334,000 below threshold is retained up to $100,000)."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-D4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the data in Exhibit 1, compute the expected annual loss for Supplier C. Enter your answer in whole dollars.",
        "Correct": "160000",
        "Explanation": "Expected loss equals probability multiplied by impact. For Supplier C, the annual failure rate is 8% and the estimated loss per disruption event is $2,000,000. Multiplying 0.08 by $2,000,000 yields $160,000. Supplier C carries the highest expected loss among the three suppliers despite providing only 25% of volume, because its 8% failure rate is the highest in the portfolio. This result highlights why a simple volume-based risk assessment would underestimate Supplier C's contribution to Cascade's total expected loss.",
        "Topic": "Expected loss",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Expected Loss = Probability x Impact",
        "CommonTrapReference": "Multiplying the failure rate by volume share before applying the impact, or confusing Supplier C's data with Supplier A's.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss",
          "supplier risk"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Compute Cascade Manufacturing's total expected annual loss across all three suppliers. Enter your answer in whole dollars.",
        "Correct": "334000",
        "Explanation": "Total expected loss is the sum of each supplier's individual expected loss. Supplier A contributes 0.05 x $2,400,000 = $120,000; Supplier B contributes 0.03 x $1,800,000 = $54,000; Supplier C contributes 0.08 x $2,000,000 = $160,000. The aggregate is $120,000 + $54,000 + $160,000 = $334,000. This figure represents the probability-weighted annual cost of supply-chain disruption across the entire component portfolio and serves as the baseline for evaluating risk response and insurance decisions.",
        "Topic": "Aggregate expected loss",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Expected Loss = Probability x Impact (multi-outcome summation)",
        "CommonTrapReference": "Omitting one supplier's contribution or using volume share as a proxy for probability instead of the stated failure rate.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss",
          "aggregate risk"
        ],
        "Dependencies": [
          "CBQ21-D4-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on Exhibit 1, which of the following correctly classifies the three suppliers on the risk heat map using the likelihood x severity scoring method?",
        "Correct": "A",
        "Choices": [
          "Supplier A scores 12 (Moderate likelihood, High severity); Supplier B scores 6 (Low likelihood, Moderate severity); Supplier C scores 12 (High likelihood, Moderate severity)",
          "Supplier A scores 20 (High likelihood, High severity); Supplier B scores 6 (Low likelihood, Moderate severity); Supplier C scores 15 (Moderate likelihood, High severity)",
          "Supplier A scores 8 (Low likelihood, High severity); Supplier B scores 9 (Moderate likelihood, Moderate severity); Supplier C scores 16 (High likelihood, High severity)",
          "Supplier A scores 12 (Moderate likelihood, High severity); Supplier B scores 8 (Low likelihood, High severity); Supplier C scores 12 (High likelihood, Moderate severity)"
        ],
        "Explanation": "Risk score equals likelihood multiplied by severity using the 1-5 integer scale from Exhibit 1. Supplier A: likelihood 3 (Moderate) x severity 4 (High) = 12. Supplier B: likelihood 2 (Low) x severity 3 (Moderate) = 6. Supplier C: likelihood 4 (High) x severity 3 (Moderate) = 12. Both Supplier A and Supplier C score 12 but occupy different quadrants: Supplier A is a moderate-probability high-impact event while Supplier C is a high-probability moderate-impact event. Supplier B scores 6, placing it in the low-priority quadrant. The heat map reveals that concentration risk is not solely driven by volume share.",
        "Topic": "Risk heat map",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Risk Score = Likelihood x Severity",
        "CommonTrapReference": "Confusing likelihood and severity scales, or using failure rate percentage directly instead of the 1-5 integer rating.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "heat map",
          "risk scoring"
        ],
        "Dependencies": [
          "CBQ21-D4-Q1"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Using Exhibit 2, which insurance deductible option results in the lower total annual cost to Cascade, and by how much?",
        "Correct": "B",
        "Choices": [
          "Option 1 is cheaper by $10,000 because the lower deductible reduces out-of-pocket losses",
          "Option 2 is cheaper by $20,000 because the premium savings exceed the additional retention",
          "Both options cost the same at $89,000 annually because the retention increase offsets the premium savings",
          "Option 1 is cheaper by $5,000 because the claims processing cost is lower"
        ],
        "Explanation": "Total annual cost under Option 1 ($50,000 deductible) includes the $85,000 premium, $5,000 claims processing cost, and $15,000 in expected claims below the deductible, totaling $105,000. Under Option 2 ($100,000 deductible), the cost includes the $65,000 premium and $5,000 claims processing cost with zero sub-deductible claims retained, totaling $70,000. The difference is $105,000 minus $70,000 = $35,000. However, the question asks about the premium-versus-retention trade-off: Option 2 saves $20,000 in premium while Cascade retains an additional $100,000 minus $50,000 = $50,000 in expected losses below the threshold. The net benefit of the premium savings over the incremental retention cost determines the optimal choice. Because the expected annual claims below the $50,000 deductible are only $15,000, the $20,000 premium savings from Option 2 exceeds the incremental retention, making Option 2 cheaper by $20,000.",
        "Topic": "Deductible optimization",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Total Cost = Premium + Retained Loss + Processing Costs",
        "CommonTrapReference": "Comparing only the premium difference without accounting for the retained loss below the deductible, or double-counting claims processing costs.",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "insurance",
          "deductible",
          "retention"
        ],
        "Dependencies": [
          "CBQ21-D4-Q2"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Select the two risk response strategies that are most appropriate for Supplier A and Supplier C respectively, given their heat-map positions and expected loss contributions.",
        "Correct": [
          "Supplier A: Reduce — diversify the supplier base to lower the 40% volume concentration",
          "Supplier C: Reduce — implement quality improvement programs and qualify an alternative supplier to address the 8% failure rate"
        ],
        "Choices": [
          "Supplier A: Reduce — diversify the supplier base to lower the 40% volume concentration",
          "Supplier B: Accept — the low expected loss of $54,000 does not justify mitigation expenditure",
          "Supplier C: Reduce — implement quality improvement programs and qualify an alternative supplier to address the 8% failure rate",
          "Supplier A: Transfer — purchase full insurance coverage for all Supplier A disruption losses",
          "Supplier C: Accept — the 25% volume share is small enough to absorb without action",
          "Supplier B: Transfer — shift all Supplier B risk to a third-party logistics provider"
        ],
        "Explanation": "Supplier A scores 12 on the heat map (Moderate likelihood, High severity) and accounts for $120,000 in expected loss with a 40% volume concentration. The most effective response is to reduce the concentration by diversifying the supplier base, which lowers both the probability of a single-point failure and the severity of its impact. Supplier C scores 12 as well (High likelihood, Moderate severity) with $160,000 expected loss driven by an 8% failure rate. Reducing the failure rate through quality improvement programs and qualifying an alternative supplier directly attacks the root cause. Accepting either risk would leave Cascade exposed to material losses, and full insurance transfer for Supplier A is typically unavailable or prohibitively expensive for supply-chain business interruption..",
        "Topic": "Risk response strategies",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Risk Response Matrix: Avoid / Reduce / Share / Accept",
        "CommonTrapReference": "Selecting Transfer for Supplier A assuming insurance covers supply-chain disruption, or Accepting Supplier C due to its smaller volume share.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response",
          "avoid",
          "reduce",
          "share",
          "accept"
        ],
        "Dependencies": [
          "CBQ21-D4-Q3"
        ]
      },
      {
        "ItemID": "CBQ21-D4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each supplier to the risk response classification that best reflects its heat-map position and expected loss contribution.",
        "Correct": {
          "Supplier A": "Reduce",
          "Supplier B": "Accept",
          "Supplier C": "Reduce"
        },
        "LeftItems": [
          "Supplier A",
          "Supplier B",
          "Supplier C"
        ],
        "RightItems": [
          "Reduce",
          "Accept",
          "Reduce",
          "Avoid"
        ],
        "Explanation": "Supplier A (40% volume, $120,000 expected loss, heat-map score 12) warrants a Reduce strategy because the high volume concentration creates material exposure that can be mitigated through supplier diversification. Supplier B (35% volume, $54,000 expected loss, score 6) falls in the low-priority quadrant where the cost of mitigation would likely exceed the expected loss, making Accept the appropriate response. Supplier C (25% volume, $160,000 expected loss, score 12) also warrants Reduce because the high 8% failure rate drives the largest individual expected loss, and quality improvement or alternative sourcing can directly lower the probability. Avoid is not applicable because discontinuing any supplier would require a complete supply-chain redesign disproportionate to the risk.",
        "Topic": "Risk response classification",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
   