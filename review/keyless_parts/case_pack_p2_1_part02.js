agers accountable for controllable outcomes",
          "Punishing managers for uncontrollable market variances",
          "Retroactively changing the acceptance criteria"
        ],
        "Explanation": "A post-audit improves future decisions by comparing forecasts with actuals, exposing whether estimates were systematically optimistic, and holding managers accountable for the outcomes they control. It is not a punishment tool for uncontrollable market swings, and changing acceptance criteria after the fact destroys the audit's learning value. These three purposes are why Harborview runs post-audits on every project above $1 million. Note: Negative values are shown in parentheses per standard accounting sign convention.",
        "Topic": "Post-audit purposes",
        "Subtopic": "Capital budgeting control",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Understand",
        "CalculationRequired": false,
        "FormulaReference": "ID-10: Post-Audit Variance Analysis (conceptual purposes)",
        "CommonTrapReference": "Treating the post-audit as a punitive or hindsight exercise.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "post-audit"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-E1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each capital budgeting tool to its purpose.",
        "Correct": {
          "NPV": "Primary criterion — measures dollar value added",
          "Profitability index": "Present value of inflows per dollar invested — ranks projects under rationing",
          "Payback": "Liquidity and risk screen — ignores the time value of money",
          "Post-audit": "Compares forecasted and actual results to improve future estimates"
        },
        "LeftItems": [
          "NPV",
          "Profitability index",
          "Payback",
          "Post-audit"
        ],
        "RightItems": [
          "Primary criterion — measures dollar value added",
          "Present value of inflows per dollar invested — ranks projects under rationing",
          "Liquidity and risk screen — ignores the time value of money",
          "Compares forecasted and actual results to improve future estimates"
        ],
        "Explanation": "NPV measures absolute value added and is the primary accept/reject criterion; the profitability index converts a project's present value of inflows into a per-dollar ratio that ranks projects when capital is rationed; payback screens liquidity and risk but ignores the time value of money; and the post-audit closes the loop by comparing forecasts with actuals. Okonkwo's committee presentation uses each tool in exactly this role.",
        "Topic": "Capital budgeting tools",
        "Subtopic": "Tool selection",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Understand",
        "CalculationRequired": false,
        "FormulaReference": "ID-01 NPV; ID-02 PI; ID-03 Payback; ID-10 Post-Audit",
        "CommonTrapReference": "Using payback or PI as the primary criterion where NPV should govern.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "NPV",
          "PI",
          "payback"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-A1",
    "Title": "Liquidity, Leverage, and the Credit Renewal",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Compute and interpret liquidity ratios including the treatment of current portions of long-term debt",
      "Evaluate covenant compliance and prepare a remediation position for a lender"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Harborline Distributors must renew its $4 million revolving credit facility, and First Meridian Bank requires a current ratio of at least 1.50, a quick ratio of at least 1.00, and debt-to-equity no greater than 1.00 at fiscal year-end. Controller Dana Whitfield has assembled the draft balance sheet and operating data and must present the covenant certificate — including a credible remediation plan for any shortfall.",
    "Industry": "Wholesale distribution",
    "CompanyType": "Distributor",
    "CompanyName": "Harborline Distributors",
    "Stakeholder": "Controller Dana Whitfield",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "current ratio",
      "quick ratio",
      "covenants",
      "credit renewal"
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
      "Compute current and quick ratios from a classified balance sheet",
      "Compute days sales outstanding using average receivables",
      "Test covenant thresholds and identify which fail",
      "Formulate an operationally credible remediation commitment"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A1-E1",
        "CaseID": "CBQ21-A1",
        "Type": "table",
        "Title": "Exhibit 1 — Draft Year-End Balance Sheet Extract ($000)",
        "Purpose": "Provides the classified balance sheet amounts used for the current ratio, quick ratio, and debt-to-equity covenant tests.",
        "ReferencedBy": [
          "CBQ21-A1-Q1",
          "CBQ21-A1-Q2",
          "CBQ21-A1-Q4",
          "CBQ21-A1-Q6",
          "CBQ21-A1-Q3",
          "CBQ21-A1-Q5"
        ],
        "Headers": [
          "Line item",
          "Amount"
        ],
        "Rows": [
          [
            "Cash and equivalents",
            "$260"
          ],
          [
            "Accounts receivable",
            "$480"
          ],
          [
            "Inventory",
            "$520"
          ],
          [
            "Prepaid expenses",
            "$40"
          ],
          [
            "Total current assets",
            "$1,300"
          ],
          [
            "Accounts payable",
            "$420"
          ],
          [
            "Accrued liabilities",
            "$130"
          ],
          [
            "Current portion of long-term debt",
            "$250"
          ],
          [
            "Total current liabilities",
            "$800"
          ],
          [
            "Long-term debt",
            "$250"
          ],
          [
            "Shareholders' equity",
            "$1,150"
          ],
          [
            "Net property and equipment",
            "$900"
          ]
        ],
        "DataFormat": "USD thousands",
        "AccuracyCheck": "Total assets 2,200 = current liabilities 800 + long-term debt 250 + equity 1,150; totals foot internally"
      },
      {
        "ExhibitID": "CBQ21-A1-E2",
        "CaseID": "CBQ21-A1",
        "Type": "table",
        "Title": "Exhibit 2 — Operating Data ($000)",
        "Purpose": "Provides sales, cost of goods sold, and prior-year balances for DSO and days-in-inventory analysis supporting the covenant discussion.",
        "ReferencedBy": [
          "CBQ21-A1-Q3",
          "CBQ21-A1-Q5"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net sales (all credit)",
            "$3,650"
          ],
          [
            "Cost of goods sold",
            "$2,560"
          ],
          [
            "Prior-year accounts receivable",
            "$430"
          ],
          [
            "Prior-year inventory",
            "$470"
          ]
        ],
        "DataFormat": "USD thousands; 365-day year convention",
        "AccuracyCheck": "Averages use (beginning + ending)/2; daily sales = 3,650/365 = 10.0"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the current ratio, rounded to two decimals (answers within 0.01 accepted).",
        "Correct": "1.63",
        "Explanation": "Current ratio = Current assets ÷ Current liabilities = $1,300 ÷ $800 = 1.63 (per FA-01). The $250 current portion of long-term debt is properly included in current liabilities under ASC 470-10 because it comes due within twelve months — a classic exclusion error would report 1,300 ÷ 550 = 2.36 and mask the covenant pressure. At 1.63 versus the 1.50 floor, Harborline clears this test with modest headroom.",
        "Topic": "Current ratio",
        "Subtopic": "Covenant measurement",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-01: Current Ratio",
        "CommonTrapReference": "Excluding the current portion of long-term debt from current liabilities.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "current ratio",
          "covenant"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the quick ratio, rounded to two decimals (answers within 0.01 accepted).",
        "Correct": "0.93",
        "Explanation": "Quick ratio = (Cash + Receivables) ÷ Current liabilities = ($260 + $480) ÷ $800 = $740 ÷ $800 = 0.93 (per FA-02). Inventory and prepaids are excluded because they are the least certain to convert to cash quickly. At 0.93 versus the 1.00 floor, Harborline FAILS this covenant by seven points — the shortfall that drives the renewal conversation.",
        "Topic": "Quick ratio",
        "Subtopic": "Covenant measurement",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-02: Quick Ratio",
        "CommonTrapReference": "Including inventory or prepaids in the numerator.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "quick ratio",
          "covenant"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter days sales outstanding (DSO) using average receivables, rounded to one decimal.",
        "Correct": "45.5",
        "Explanation": "DSO = Average receivables ÷ (Net credit sales ÷ 365) = (($480 + $430)/2) ÷ ($3,650/365) = $455 ÷ $10.0 = 45.5 days (per FA-05). Collections run about a month and a half behind sale; whether that is problematic depends on stated terms, but the aging composition matters more than the average — Exhibit 1 shows receivables at roughly 13% of annual sales.",
        "Topic": "Days sales outstanding",
        "Subtopic": "Receivables quality",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-05: Days Sales Outstanding",
        "CommonTrapReference": "Using ending instead of average receivables, or a 360-day year.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "DSO",
          "receivables"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Based on Exhibits 1 and your computations, which covenant position does Harborline present at year-end?",
        "Correct": "B",
        "Choices": [
          "The company passes all three covenants with headroom on each",
          "The company passes the current-ratio and debt-to-equity tests but FAILS the quick-ratio test (0.93 versus 1.00)",
          "The company passes the quick ratio but fails the current-ratio test",
          "The company fails all three covenants"
        ],
        "Explanation": "Current ratio 1.63 ≥ 1.50 PASS; quick ratio 0.93 < 1.00 FAIL; debt-to-equity = ($800 + $250) ÷ $1,150 = 0.91 ≤ 1.00 PASS. Only the quick ratio binds. The pattern matters for the negotiation: the miss is a LIQUIDITY-composition problem (too much of the current asset base sits in inventory), not a solvency or earnings problem — which shapes what remediation the bank will accept.",
        "Topic": "Covenant compliance",
        "Subtopic": "Threshold testing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-01/FA-02/FA-07 composite test",
        "CommonTrapReference": "Testing each ratio against the wrong threshold or miscomputing total debt for D/E.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "covenants",
          "compliance"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which diagnosis best explains the quick-ratio shortfall and points to the fastest compliant fix?",
        "Correct": "D",
        "Choices": [
          "Receivables are uncollectible in material amount and should be written down before certification",
          "The current portion of long-term debt was misclassified and should be moved to non-current liabilities",
          "Equity is sufficient to absorb the shortfall, so the covenant should be renegotiated rather than remediated",
          "Inventory dominates the current asset base — average inventory supports roughly 70.6 days of sales (495 ÷ 2,560 × 365) — so converting slow-moving stock into cash is the fastest path to restoring the quick ratio"
        ],
        "Explanation": "Average inventory of ($520 + $470)/2 = $495 represents 70.6 days of COGS — the heavy tail of the current asset cycle. Because quick assets are $740 against $800 required, converting just $60K of inventory into cash restores the ratio to exactly 1.00. Writing down receivables (A) worsens quick assets; reclassifying the current maturities (B) violates ASC 470-10 presentation; and equity cushions address solvency, not the liquidity composition the quick ratio measures (C).",
        "Topic": "Working capital composition",
        "Subtopic": "Remediation diagnosis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "FA-04: Days Inventory Outstanding",
        "CommonTrapReference": "Confusing solvency (equity) with liquidity (asset composition).",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "inventory",
          "remediation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-A1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which presentation to First Meridian Bank best positions the renewal?",
        "Correct": "C",
        "Choices": [
          "Certify full compliance as computed, since 0.93 rounds to 1.0 at whole-number precision",
          "Disclose the breach and request a waiver without operational changes, relying on the 12-year relationship",
          "Commit to converting at least $60K of identified slow-moving inventory into cash by year-end — restoring the quick ratio to 1.00 — supported by an itemized liquidation schedule, alongside passing results on the other two covenants",
          "Repay the $250K current portion of long-term debt using proceeds drawn on the same revolving facility on the final day of the year"
        ],
        "Explanation": "The credible package pairs the measured breach with a specific, verifiable operational fix: $740 of quick assets plus $60 of converted inventory equals $800, exactly meeting the 1.00 floor. Option A misstates rounding conventions (the covenant tests reported figures). Option B forfeits negotiating leverage by asking for relief without remediation. Option D is circular financing — repaying the bank with the bank's own money leaves total obligations unchanged, violates typical revolver covenants against such usage, and lenders and auditors treat it as ineffective window dressing.",
        "Topic": "Credit negotiation strategy",
        "Subtopic": "Remediation commitment",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Proposing circular year-end financing that lenders treat as window dressing.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "negotiation",
          "window dressing"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-D1",
    "Title": "Quantifying Launch Risk Before the Board",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Compute inherent and residual expected loss under COSO ERM 2017",
      "Classify risk responses (reduce, share, avoid) and test them against risk appetite",
      "Recommend a board-ready risk position"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Kestrel Electronics prepares to launch a connected home device, and risk manager Omar Haddad has facilitated a quantified risk workshop ahead of the board review. The board's risk appetite statement caps EXPECTED loss from any single identified risk at $500,000 annually before management response. Omar must quantify the register, classify the proposed responses, and recommend which actions to fund.",
    "Industry": "Consumer electronics",
    "CompanyType": "Manufacturer",
    "CompanyName": "Kestrel Electronics",
    "Stakeholder": "Risk Manager Omar Haddad",
    "BusinessFunction": "Enterprise risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "expected loss",
      "risk response",
      "risk appetite",
      "COSO ERM"
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
      "Compute expected loss as probability times impact",
      "Distinguish inherent from residual expected loss after mitigation",
      "Match responses to the reduce/share/avoid taxonomy",
      "Test exposure against a quantitative risk appetite threshold"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-D1-E1",
        "CaseID": "CBQ21-D1",
        "Type": "table",
        "Title": "Exhibit 1 — Launch Risk Register (Inherent)",
        "Purpose": "Provides the probability and impact estimates for the three material launch risks, used for expected-loss computation and appetite testing.",
        "ReferencedBy": [
          "CBQ21-D1-Q1",
          "CBQ21-D1-Q3",
          "CBQ21-D1-Q5",
          "CBQ21-D1-Q2"
        ],
        "Headers": [
          "Risk",
          "Description",
          "Probability",
          "Impact"
        ],
        "Rows": [
          [
            "R1",
            "Sole-source chip supply disruption",
            "25%",
            "$4.0M"
          ],
          [
            "R2",
            "Regulatory certification delay",
            "15%",
            "$2.0M"
          ],
          [
            "R3",
            "Warranty claims surge",
            "10%",
            "$1.0M"
          ]
        ],
        "DataFormat": "Probabilities are annual; impacts are estimated pretax effect",
        "AccuracyCheck": "Estimates from facilitated workshop with engineering and legal input"
      },
      {
        "ExhibitID": "CBQ21-D1-E2",
        "CaseID": "CBQ21-D1",
        "Type": "table",
        "Title": "Exhibit 2 — Candidate Responses",
        "Purpose": "Provides the cost and effect of each proposed response so residual risk and net benefit can be computed.",
        "ReferencedBy": [
          "CBQ21-D1-Q2",
          "CBQ21-D1-Q3",
          "CBQ21-D1-Q4",
          "CBQ21-D1-Q6"
        ],
        "Headers": [
          "Response",
          "Applied to",
          "Cost",
          "Effect"
        ],
        "Rows": [
          [
            "Dual-source chip contract",
            "R1",
            "$150K per year",
            "Cuts disruption probability to 10%"
          ],
          [
            "Warranty insurance policy",
            "R3",
            "$80K per year",
            "Transfers losses above $100K retained"
          ],
          [
            "Delay launch one quarter",
            "All",
            "Deferred margin (not quantified)",
            "Defers all three risks for the period"
          ]
        ],
        "DataFormat": "USD; probabilities annual",
        "AccuracyCheck": "Dual-source effect applies only to likelihood; impact unchanged at $4.0M"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-D1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the INHERENT expected loss for R1 (sole-source chip disruption), in dollars.",
        "Correct": "1000000",
        "Explanation": "Expected loss = Probability × Impact (RM-01) = 0.25 × $4,000,000 = $1,000,000. This is the pre-response benchmark: absent any action, the market prices R1 as a $1M-per-year drag in expectation. Expected loss is a long-run weighted average — not the worst case — and it is the figure the board's $500K appetite threshold tests FIRST.",
        "Topic": "Expected loss",
        "Subtopic": "Inherent risk quantification",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-01: Expected Loss",
        "CommonTrapReference": "Using worst-case impact instead of the probability-weighted expectation.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "expected loss",
          "inherent risk"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the RESIDUAL expected loss for R1 after implementing the dual-source contract, in dollars.",
        "Correct": "400000",
        "Explanation": "Residual expected loss = revised probability × unchanged impact = 0.10 × $4,000,000 = $400,000 (RM-03 logic: controls reduce the risk level). Dual sourcing attacks LIKELIHOOD only — the impact stays $4.0M because a disruption still halts production when it occurs. Residual risk rarely reaches zero; it settles at the level the control can economically reach.",
        "Topic": "Residual expected loss",
        "Subtopic": "Control effectiveness",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "RM-03: Residual Risk",
        "CommonTrapReference": "Reducing the impact as well as the probability when only likelihood changed.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "residual risk",
          "controls"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the net year-one economic benefit of the dual-source contract, in dollars.",
        "Correct": "450000",
        "Explanation": "Benefit = inherent EL − residual EL = $1,000,000 − $400,000 = $600,000 of expected-loss avoidance. Net benefit = $600,000 − $150,000 annual contract cost = +$450,000. The control pays for itself four-fold in expectation — the standard cost-benefit test for funding a risk response, before considering tail-risk preference beyond the expected value.",
        "Topic": "Mitigation cost-benefit",
        "Subtopic": "Response funding decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "RM-01 extension: net benefit = EL avoided − control cost",
        "CommonTrapReference": "Comparing the contract cost to the IMPACT rather than to the expected-loss reduction.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cost-benefit",
          "mitigation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Classify each proposed response under the COSO ERM risk-response taxonomy.",
        "Correct": "B",
        "Choices": [
          "Dual sourcing = share; insurance = reduce; delay = accept",
          "Dual sourcing = REDUCE (lowers likelihood); insurance = SHARE (transfers excess loss); launch delay = AVOID (declines the exposed activity for the period)",
          "Dual sourcing = avoid; insurance = avoid; delay = reduce",
          "All three are variations of acceptance with contingency planning"
        ],
        "Explanation": "The taxonomy turns on mechanism. Dual sourcing changes the odds of the event — REDUCE. Insurance leaves the event's frequency untouched and transfers severity above the retention to a carrier — SHARE. Delaying the launch declines the exposure for that period entirely — AVOID (a temporary form; permanent avoidance would cancel the launch). Acceptance would mean keeping R1 at 25% with contingency funds set aside, which no proposal does.",
        "Topic": "Risk response classification",
        "Subtopic": "COSO ERM taxonomy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Calling insurance 'reduce' — it changes who bears the loss, not whether the event occurs.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "reduce",
          "share",
          "avoid"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Against the board's appetite cap of $500K expected loss per initiative, which risk(s) require action BEFORE launch?",
        "Correct": "C",
        "Choices": [
          "All three risks breach the appetite threshold",
          "Each response cost sits below $500,000, so no funded action changes the appetite position",
          "Only R1 breaches — inherent expected loss of $1.0M exceeds the $500K cap; R2 ($300K) and R3 ($100K) sit inside appetite",
          "R1 and R2 both breach because their combined expected loss exceeds $500K"
        ],
        "Explanation": "Appetite tests compare each risk's EXPECTED loss to the threshold: R1 = $1.0M > $500K BREACH; R2 = 0.15 × $2.0M = $300K OK; R3 = 0.10 × $1.0M = $100K OK. Impacts alone are not the appetite metric (A confuses impact with expectation), and the cap reads on each single identified risk - aggregation is a separate portfolio question (D). Only R1 demands funded response before launch; after dual sourcing its residual of $400K moves inside appetite.",
        "Topic": "Risk appetite testing",
        "Subtopic": "Threshold escalation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "RM-01 applied per risk against stated appetite",
        "CommonTrapReference": "Comparing impact instead of expected loss to the appetite threshold.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "appetite",
          "thresholds"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which board recommendation best integrates the quantified analysis?",
        "Correct": "B",
        "Choices": [
          "Delay the launch one quarter regardless of cost, because any risk above zero appetite is unacceptable",
          "Fund the dual-source contract now — residual R1 expected loss of $400K moves inside the $500K appetite and the $450K net benefit is strongly positive — while monitoring R2 and R3 quarterly against the threshold",
          "Purchase warranty insurance immediately because transferring risk is typically the preferred response",
          "Take no action: expected losses are averages, so no single year will realize them"
        ],
        "Explanation": "The analysis converges on one action: R1 is the sole appetite breach, the dual-source response brings it inside appetite, and its $450K net benefit clears the funding hurdle — the definition of a value-adding control. Delay (A) destroys launch economics to cure risks already inside appetite. Insurance (C) targets R3, which is not the breach, and 'typically preferred' misstates the taxonomy. Waiting (D) ignores that appetite governs EXPOSURE, not realized outcomes — the breach exists today.",
        "Topic": "Board risk recommendation",
        "Subtopic": "Response selection",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Recommending responses for risks that already sit inside appetite.",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "recommendation",
          "board reporting"
        ],
        "Dependencies": []
      }
    ],
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-B2",
    "Title": "Financing the Expansion",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute component costs of capital including tax effects",
      "Compute weighted average cost of capital at market-value weights",
      "Evaluate how incremental financing changes the marginal hurdle rate"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Northstar Capital's board approved a $40 million capacity expansion, and CFO Priya Nair must present the funding plan. The treasury team has compiled current market values and component-cost inputs, and the committee expects the proposal to state the applicable hurdle rate and defend the financing mix.",
    "Industry": "Industrial services",
    "CompanyType": "Service provider",
    "CompanyName": "Northstar Capital",
    "Stakeholder": "CFO Priya Nair",
    "BusinessFunction": "Capital structure planning",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "WACC",
      "CAPM",
      "cost of capital",
      "financing mix"
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
      "Compute after-tax cost of debt, cost of preferred, and CAPM cost of equity",
      "Weight components at market values to compute WACC",
      "Explain why incremental financing shifts the marginal cost of capital"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B2-E1",
        "CaseID": "CBQ21-B2",
        "Type": "table",
        "Title": "Exhibit 1 — Current Capital Structure (Market Values)",
        "Purpose": "Provides the market-value weights and component inputs for the WACC computation.",
        "ReferencedBy": [
          "CBQ21-B2-Q1",
          "CBQ21-B2-Q2",
          "CBQ21-B2-Q3",
          "CBQ21-B2-Q4"
        ],
        "Headers": [
          "Component",
          "Market value",
          "Input"
        ],
        "Rows": [
          [
            "Long-term debt",
            "$60M",
            "Yield to maturity 6.0%"
          ],
          [
            "Preferred stock",
            "$20M",
            "Annual dividend $2.50 per share; market price $25"
          ],
          [
            "Common equity",
            "$120M",
            "Beta 1.20"
          ],
          [
            "Total capital",
            "$200M",
            ""
          ]
        ],
        "DataFormat": "USD millions except per-share amounts",
        "AccuracyCheck": "Weights: 30% debt, 10% preferred, 60% equity"
      },
      {
        "ExhibitID": "CBQ21-B2-E2",
        "CaseID": "CBQ21-B2",
        "Type": "table",
        "Title": "Exhibit 2 — Market Parameters",
        "Purpose": "Provides the tax rate and equity-market parameters required for component-cost formulas.",
        "ReferencedBy": [
          "CBQ21-B2-Q1",
          "CBQ21-B2-Q3",
          "CBQ21-B2-Q5",
          "CBQ21-B2-Q6"
        ],
        "Headers": [
          "Parameter",
          "Value"
        ],
        "Rows": [
          [
            "Marginal tax rate",
            "25%"
          ],
          [
            "Risk-free rate",
            "4.0%"
          ],
          [
            "Market risk premium",
            "5.5%"
          ]
        ],
        "DataFormat": "Percentages",
        "AccuracyCheck": "Inputs consistent with CAPM notation Rf + beta x MRP"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the AFTER-TAX cost of debt in percent, rounded to two decimals.",
        "Correct": "4.50",
        "Explanation": "Interest is tax-deductible, so the effective cost of debt = pre-tax yield × (1 − t) = 6.0% × (1 − 0.25) = 4.50% (per CB-07). Only the after-tax figure belongs inside the WACC — using the 6.0% coupon-side yield overstates the debt component by a third and biases the whole average upward.",
        "Topic": "After-tax cost of debt",
        "Subtopic": "Tax shield",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-07: After-Tax Cost of Debt = Rd x (1 - t)",
        "CommonTrapReference": "Entering the pre-tax yield directly into WACC.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "debt",
          "tax shield"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the cost of preferred stock in percent, rounded to two decimals.",
        "Correct": "10.00",
        "Explanation": "Cost of preferred = annual dividend ÷ market price = $2.50 ÷ $25.00 = 10.00% (per CB-06). Preferred dividends carry NO tax shield — they are paid from after-tax dollars — so unlike debt there is no (1 − t) adjustment here; applying one is the classic error.",
        "Topic": "Cost of preferred stock",
        "Subtopic": "Dividend yield method",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-06: Rp = Dp / Pp",
        "CommonTrapReference": "Applying the (1 - t) adjustment to preferred stock.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "preferred"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the CAPM cost of common equity in percent, rounded to two decimals.",
        "Correct": "10.60",
        "Explanation": "CAPM: Re = Rf + beta × MRP = 4.0% + 1.20 × 5.5% = 4.0% + 6.6% = 10.60% (per CB-04). This is the return shareholders require for Northstar's systematic risk — the benchmark the business must beat on every incremental dollar of equity-funded investment.",
        "Topic": "Cost of equity",
        "Subtopic": "CAPM",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "CB-04: Re = Rf + b(Rm - Rf)",
        "CommonTrapReference": "Multiplying beta by the market RETURN instead of the risk premium.",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "CAPM"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_d