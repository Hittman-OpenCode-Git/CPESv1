contribution margin = Σ (CM_i × Mix_i) = (50 × 0.40) + (80 × 0.30) + (40 × 0.20) + (120 × 0.10) = 20 + 24 + 8 + 12 = $64 per ton. Per DA-01, WACM blends individual ore CMs by sales-mix proportions to produce a single CM figure for breakeven, DOL, and margin-of-safety calculations across multi-product operations. The mix assumption (40/30/20/10) is critical — if it shifts, WACM shifts. A common trap is computing the simple arithmetic average of CMs ((50+80+40+120)/4 = 72.50), which ignores mix; another is computing tonnage-weighted CM ($640,000 / 10,000 tons = $64, correct but arrived at by accident).",
        "Topic": "WACM",
        "Subtopic": "Weighted mix",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-01",
        "CommonTrapReference": "Simple avg",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "wacm"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the breakeven tons per month, rounded to nearest ton.",
        "Correct": "7500",
        "Explanation": "Breakeven tons = Fixed Costs / WACM = $480,000 / $64 per ton = 7,500 tons per month (DA-02). Per DA-02, breakeven in units is total fixed costs divided by weighted-average CM per unit, which yields the volume at which total CM exactly covers fixed costs and operating income is zero. For Greenstone this is well below the 10,000-ton budget, confirming positive budgeted operating income. A common trap uses a single ore's CM (e.g., copper CM $50 → 9,600 tons) or computes breakeven dollars ($480,000 / 0.10 CM ratio = $4.8M revenue); both are wrong units.",
        "Topic": "Breakeven",
        "Subtopic": "Composite BE",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "DA-02",
        "CommonTrapReference": "Single ore CM",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "breakeven"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the DOL at the 10k-ton budget, rounded to two decimals.",
        "Correct": "4.00",
        "Explanation": "Degree of operating leverage at the 10,000-ton budget = Contribution Margin / Operating Income = $640,000 / $160,000 = 4.00 (FA-19). DOL measures how a percentage change in sales volume translates to a percentage change in operating income; DOL of 4.0 means a 10% volume change produces a 40% OI change in the same direction. With most ore tonnage locked at the budget mix, the hoist-hours capacity is the binding constraint, amplifying volume sensitivity into OI. A common trap divides CM by FC ($640,000 / $480,000 = 1.33) instead of by OI, or computes total-CM ratio against revenue.",
        "Topic": "DOL",
        "Subtopic": "Leverage",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-19",
        "CommonTrapReference": "CM/FC",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "dol"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the margin of safety at budget?",
        "Correct": "A",
        "Choices": [
          "2,500 tons, 25% buffer",
          "7,500 tons, 75%",
          "10,000 tons, 100%",
          "0 tons"
        ],
        "Explanation": "Margin of safety = Budget tons - Breakeven tons = 10,000 - 7,500 = 2,500 tons, or 2,500 / 10,000 = 25% of budget volume. MoS is the buffer above breakeven before losses begin — a 25% volume cushion means sales could fall 25% before the operation turns unprofitable (FA-23 / DA-03). For Greenstone this cushion is meaningful but not large given ore-price and hoist-capacity volatility. Choice B (7,500 tons, 75%) confuses breakeven itself with the buffer above it; Choice C (10,000 tons, 100%) misuses budget as buffer. A common trap treats breakeven dollars as margin of safety.",
        "Topic": "Margin of safety",
        "Subtopic": "Buffer",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "BE as MoS",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "margin-of-safety"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two statements about WACM under this constraint are correct? (Select two)",
        "Correct": [
          "WACM 64 assumes mix holds; if nickel demand falls, WACM falls",
          "Shaft 12k hrs may truncate tons below BE if cobalt heavy"
        ],
        "Choices": [
          "WACM 64 assumes mix holds; if nickel demand falls, WACM falls",
          "WACM is fixed property",
          "Shaft 12k hrs may truncate tons below BE if cobalt heavy",
          "DOL 4 means 10% price →40% OI",
          "MoS dollars = BE sales"
        ],
        "Explanation": "WACM 64 assumes the 40/30/20/10 mix holds; if nickel demand falls, WACM falls because high-CM nickel weight drops, and the 12,000-hour shaft may truncate feasible tons below the 7,500-ton breakeven if cobalt-heavy mix consumes 3 hrs/ton. Margin of safety is buffer before losses, not the breakeven itself, and must be computed at mix.",
        "Topic": "Analysis",
        "Subtopic": "Analysis",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Unit vs revenue mix",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "analysis"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C6-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each CVP concept to Greenstone",
        "Correct": {
          "WACM 64": "Blend 50/80/40/120 at mix",
          "BE 7,500": "FC/WACM composite",
          "DOL 4.0": "CM/OI — 10% volume →40% OI",
          "Hoist 12k hrs": "Capacity may truncate mix"
        },
        "LeftItems": [
          "WACM 64",
          "BE 7,500",
          "DOL 4.0",
          "Hoist 12k hrs"
        ],
        "RightItems": [
          "Blend 50/80/40/120 at mix",
          "FC/WACM composite",
          "CM/OI — 10% volume →40% OI",
          "Capacity may truncate mix"
        ],
        "Explanation": "WACM 64 blends 50/80/40/120 at the 40/30/20/10 mix, breakeven 7,500 tons is FC/WACM composite at that mix, DOL 4.0 means 10% volume changes OI 40%, and the 12,000-hour hoist may truncate the mix before breakeven if cobalt's 3 hrs/ton dominates the shaft capacity.",
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
    "certification_session": "P2-PACK1-CERT",
    "certification_date": "2026-09-04"
  },
  {
    "CaseID": "CBQ21-F4",
    "Title": "ESG Assurance at Pinnacle University",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Assess ESG reporting (F.7)",
      "Apply whistleblower"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Pinnacle University's $900M endowment claims carbon-neutral across Scope 1-3, but assurance covers only 40% of assets. CFO Amir Hassan must advise the audit committee on the claim and the donor's $25M conditional gift.",
    "Industry": "Education",
    "CompanyType": "Non-profit",
    "CompanyName": "Pinnacle University",
    "Stakeholder": "CFO Amir Hassan",
    "BusinessFunction": "Finance / Sustainability",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "ESG",
      "assurance"
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
      "Distinguish assurance levels",
      "Apply materiality",
      "Sequence whistleblower"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F4-E1",
        "CaseID": "CBQ21-F4",
        "Type": "text",
        "Title": "Exhibit 1 — Donor Report Claim",
        "Purpose": "Provides carbon-neutral claim and assurance scope.",
        "ReferencedBy": [
          "CBQ21-F4-Q1",
          "CBQ21-F4-Q3",
          "CBQ21-F4-Q6"
        ],
        "Body": "Headline: 'Pinnacle endowment carbon-neutral Scope 1-3.' Footnote: assurance covers listed equities (40% AUM); private holdings, real estate, offsets unaudited. Donor: 'Defer $25M if report overstates.'"
      },
      {
        "ExhibitID": "CBQ21-F4-E2",
        "CaseID": "CBQ21-F4",
        "Type": "text",
        "Title": "Exhibit 2 — IMA and Assurance Framework",
        "Purpose": "Summarizes IMA credibility and ISAE 3000.",
        "ReferencedBy": [
          "CBQ21-F4-Q1",
          "CBQ21-F4-Q2",
          "CBQ21-F4-Q4",
          "CBQ21-F4-Q5"
        ],
        "Body": "IMA Credibility: fair disclosure, disclose fully. ISAE 3000: limited (negative, less evidence) vs reasonable (positive, audit-like). Material ESG omission = greenwash. Whistleblower: SOX806 via audit committee."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which IMA standard is MOST implicated by the carbon-neutral headline with 40% assurance?",
        "Correct": "B",
        "Choices": [
          "Confidentiality",
          "Credibility — fair disclosure requires headline match assurance scope; 60% unaudited misleads",
          "Competence",
          "Integrity only if intent proven"
        ],
        "Explanation": "The carbon-neutral headline claims portfolio-wide Scope 1-3 coverage, but assurance is limited to 40% AUM (listed equities only). IMA Credibility (fourth standard) requires fair and full disclosure of all relevant information — communicating 'carbon-neutral' when 60% of the endowment is unaudited misleads donors and beneficiaries. The headline-scope mismatch is a greenwashing exposure that the audit committee and donors should see. Choice A (Confidentiality) governs how information moves through proper channels, not what may be claimed; Choice C (Competence) is technical expertise, not communication fairness. The donor's '$25M if overstates' is exactly the credibility test.",
        "Topic": "IMA credibility",
        "Subtopic": "ESG disclosure",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Confidentiality",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ima-credibility"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the correct description of the assurance gap?",
        "Correct": "C",
        "Choices": [
          "Reasonable on 100% — fully supported",
          "No assurance needed",
          "Limited on 40% — negative form, insufficient for portfolio-wide claim; need reasonable or expanded scope",
          "Limited equals reasonable"
        ],
        "Explanation": "ISAE 3000 distinguishes limited assurance (negative form — 'nothing came to our attention indicating material misstatement', based on limited evidence) from reasonable assurance (positive form — 'in our opinion, the statement is fairly presented', based on extensive evidence analogous to an audit). Pinnacle's 40% scope received only limited assurance, which is insufficient evidentiary support for a portfolio-wide carbon-neutral claim. The choice is to expand assurance scope to 100% with reasonable assurance, or qualify the headline to reflect the actual coverage ('40% assured, 60% unaudited'). Choice A (reasonable on 100%) describes the upgrade path; Choice B (no assurance) ignores the question; Choice D conflates the two assurance types.",
        "Topic": "Assurance levels",
        "Subtopic": "Gap",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Limited=reasonable",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "assurance-levels"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "How should the $25M conditional gift be treated?",
        "Correct": "A",
        "Choices": [
          "Disclose contingency and avoid recognizing; do not inflate claim to secure gift",
          "Recognize $25M immediately",
          "Book as liability until verified",
          "Defer until lawsuit"
        ],
        "Explanation": "Under ASC 958 (Not-for-Profit Entities) and ASC 450 (Contingencies), a conditional gift with a measurable barrier (the donor's '$25M if report overstates') is not recognized as revenue until the barrier is met. Recognition requires unconditional promise or completed transfer; a conditional promise is disclosed, not booked, until the condition is substantially met. Recognizing $25M immediately to 'secure the gift' violates ASC 958-605 and inflates the donor-reporting claim that triggered the condition in the first place. The CEO's pressure compounds the credibility risk (IMA Credibility). Disclose the contingency and avoid recognition until verification. Choice B (recognize) is the GAAP failure; Choice C (book as liability) mischaracterizes; Choice D (defer until lawsuit) ignores disclosure.",
        "Topic": "Gift contingency",
        "Subtopic": "Ethics",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Recognize conditional",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "gift-contingency"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is Amir's correct first step under IMA resolution when VP pressures claim?",
        "Correct": "B",
        "Choices": [
          "Publish as drafted",
          "Escalate to audit committee with Exhibit 1, bypassing involved VP",
          "Confront donor",
          "Resign immediately"
        ],
        "Explanation": "IMA resolution (Statement of Ethical Professional Practice, 'Resolve Ethical Conflicts' subsection) starts with the immediate supervisor unless that person appears involved in the conflict. Here the VP of Sales authored the return-rights instruction that drives the credibility concern, so direct confrontation both fails procedurally and risks tipping the counterparty. Escalation moves to next-level management or the audit committee with contemporaneous documentation (email, memo, dates). Resignation is the last resort only after channels are exhausted. Choice A (publish as drafted) abandons the framework; Choice C (confront donor) compounds the issue; Choice D (resign immediately) bypasses available internal channels. SOX 806 protects this escalation path.",
        "Topic": "IMA resolution",
        "Subtopic": "Escalation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Supervisor-first",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ima-resolution"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three controls address greenwash and pressure? (Select three)",
        "Correct": [
          "Expand assurance to 100% or qualify headline to '40% assured'",
          "Audit-committee ESG oversight with management certification",
          "Anonymous hotline with non-retaliation (SOX806)"
        ],
        "Choices": [
          "Expand assurance to 100% or qualify headline to '40% assured'",
          "Audit-committee ESG oversight with management certification",
          "Anonymous hotline with non-retaliation (SOX806)",
          "Recognize $25M early",
          "Restrict donor access to drafts"
        ],
        "Explanation": "Expand assurance to 100% or qualify the carbon-neutral headline to '40% assured, 60% unaudited' so donors see scope, charter audit-committee ESG oversight with management certification analogous to SOX 302, and maintain an anonymous hotline with non-retaliation training under SOX 806. Recognizing the $25M conditional gift early would violate ASC 958..",
        "Topic": "Controls",
        "Subtopic": "Difficult",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "Early recognition",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-F4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each Pinnacle fact to treatment",
        "Correct": {
          "Carbon-neutral 40% assured": "Qualify to scope or expand to reasonable",
          "Donor $25M conditional": "Disclose contingency, do not recognize",
          "ISAE 3000 levels": "Limited negative vs reasonable positive",
          "IMA credibility": "Fair disclosure — headline must match evidence"
        },
        "LeftItems": [
          "Carbon-neutral 40% assured",
          "Donor $25M conditional",
          "ISAE 3000 levels",
          "IMA credibility"
        ],
        "RightItems": [
          "Qualify to scope or expand to reasonable",
          "Disclose contingency, do not recognize",
          "Limited negative vs reasonable positive",
          "Fair disclosure — headline must match evidence"
        ],
        "Explanation": "Carbon-neutral claim with 40% assurance must be qualified to scope or expanded to reasonable assurance; the $25M conditional gift is disclosed, not recognized until the barrier is met; ISAE 3000 distinguishes limited negative vs reasonable positive assurance; IMA credibility requires fair disclosure where the headline matches the evidence base.",
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
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-B5",
    "Title": "Dividend and Repurchase at Orchard Capital",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Evaluate dividend policy and repurchase (B.7)",
      "Compute payout and accretion"
    ],
    "PrimaryCompetency": "Analysis",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Orchard Capital earned $14M, has $8M in positive-NPV projects, 2M shares at $30, and can pay residual dividend or repurchase 200k shares. Treasurer Maya Sullivan must advise.",
    "Industry": "Investment",
    "CompanyType": "Holding",
    "CompanyName": "Orchard Capital",
    "Stakeholder": "Treasurer Maya Sullivan",
    "BusinessFunction": "Treasury",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "dividend",
      "repurchase"
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
      "Compute residual payout",
      "Compute accretion",
      "Apply signaling"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B5-E1",
        "CaseID": "CBQ21-B5",
        "Type": "table",
        "Title": "Exhibit 1 — Earnings and Projects",
        "Purpose": "Provides earnings, projects, shares for payout.",
        "ReferencedBy": [
          "CBQ21-B5-Q1",
          "CBQ21-B5-Q2",
          "CBQ21-B5-Q3"
        ],
        "Headers": [
          "Item",
          "Amount"
        ],
        "Rows": [
          [
            "Net income",
            "$14.0M"
          ],
          [
            "Positive-NPV projects",
            "$8.0M"
          ],
          [
            "Shares outstanding",
            "2.0M"
          ],
          [
            "Market price",
            "$30"
          ]
        ],
        "DataFormat": "USD millions",
        "AccuracyCheck": "Residual =14-8=6M"
      },
      {
        "ExhibitID": "CBQ21-B5-E2",
        "CaseID": "CBQ21-B5",
        "Type": "text",
        "Title": "Exhibit 2 — Policy Considerations",
        "Purpose": "Summarizes residual vs stable signaling.",
        "ReferencedBy": [
          "CBQ21-B5-Q4",
          "CBQ21-B5-Q5",
          "CBQ21-B5-Q6"
        ],
        "Body": "Residual: payout = earnings - investments. Stable: smooth dividend, signals confidence. Repurchase accretive if P/E < 1/(cost of equity)."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B5-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the residual dividend, in dollars.",
        "Correct": "3.00",
        "Explanation": "Residual dividend = (Net Income - Positive-NPV Investments) / Shares = ($14M - $8M) / 2M = $6M / 2M = $3.00 per share. The residual model (B.7) preserves shareholder value by funding all positive-NPV projects first and distributing only the leftover earnings. For Orchard Capital the residual $3.00 is the maximum sustainable dividend that funds the $8M project slate without external equity or changed capital structure. Choice A is the gross payout $14M / 2M = $7.00 (ignores investment opportunity); Choice C is the stable $2 Maya is considering (would retain $4M excess, suboptimal signaling); Choice D is hoarding cash (zero payout).",
        "Topic": "Residual dividend",
        "Subtopic": "Earnings-projects",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.7 residual",
        "CommonTrapReference": "Gross payout",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "residual-dividend"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B5-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the repurchase accretion in EPS, in dollars (EPS after - before), rounded to cents.",
        "Correct": "0.78",
        "Explanation": "Before EPS =14,000,000/2,000,000=7.00. Repurchase 200,000 shares at $30 = $6,000,000 cash used, shares 1,800,000, EPS post =14,000,000/1,800,000=7.78. Accretion =7.78-7.00=0.78. The $6M is assumed from existing liquidity (no forgone interest in this residual case); if cash earned 5% pre-tax, accretion would be (14,000,000-225,000)/1,800,000=7.65 vs 7.00 =0.65, still not 0.20, which ignores share math.",
        "Topic": "Repurchase",
        "Subtopic": "Accretion",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "B.7 repurchase",
        "CommonTrapReference": "Shares repurchased vs income",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "repurchase"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-B5-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which payout policy fits Orchard's growth?",
        "Correct": "B",
        "Explanation": "Residual $3.00 fits Orchard's growth profile: it funds the full $8M project slate, distributes the remaining $6M to shareholders, and avoids external equity issuance. The residual policy is growth-aligned because it lets investment opportunities drive the dividend dollar. Stable $5 (Choice C) exceeds the residual and would require issuing new equity or cutting projects. Stable $2 (implied elsewhere) would retain $4M excess that could fund additional growth — sub-optimal signaling unless the board has a stated accumulation phase. Zero payout (Choice D) hoards cash without a stated strategic rationale. 100% payout (Choice A) ignores project NPV entirely.",
        "Topic": "Payout choice",
        "Subtopic": "Policy",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "100% payout",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "payout-choice"
        ],
        "Dependencies": [],
        "Choices": [
          "100% payout — ignores projects",
          "Residual $3 — funds $8M projects, distributes remainder, avoids external equity",
          "Stable $5 — exceeds residual, must issue equity",
          "Zero payout — hoard cash"
        ]
      },
      {
        "ItemID": "CBQ21-B5-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the signaling effect of a stable $2 dividend vs residual $3?",
        "Correct": "A",
        "Explanation": "Stable $2.00 signals management's confidence that future earnings can sustain the dividend even through cyclical downturns; the trade-off is retaining $4M of excess earnings that could fund additional growth or repurchase. Residual $3.00 signals the opposite — that attractive investment opportunities exist — but introduces payout volatility that some income-oriented shareholders dislike. The right choice for Orchard depends on shareholder mix: growth-oriented investors prefer residual (signaling growth); income-oriented investors prefer stable (signaling confidence). Choice B reverses the standard interpretation; Choice C is always false; Choice D ignores signaling theory entirely. Modigliani-Miller dividend irrelevance assumes no signaling, taxes, or information asymmetry.",
        "Topic": "Signaling",
        "Subtopic": "Effect",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Residual signals confidence",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "signaling"
        ],
        "Dependencies": [],
        "Choices": [
          "Stable signals confidence, reduces volatility; residual signals investment opportunities but payout varies",
          "Residual signals confidence",
          "Stable always higher",
          "No signaling"
        ]
      },
      {
        "ItemID": "CBQ21-B5-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two factors support repurchase over dividend here? (Select two)",
        "Correct": [
          "Undervalued stock — repurchase accretive",
          "Shareholder tax deferral vs dividend tax now"
        ],
        "Explanation": "Two factors support repurchase here. First, the stock is undervalued — repurchasing below intrinsic value is mathematically accretive (per-share earnings rise as the share count falls against a fixed earnings numerator). Second, repurchase defers shareholder tax relative to dividends — capital gains are taxed only on sale at the holder's election, while dividends are taxed in the current period at ordinary income rates for many holders. These two together (accretion + tax deferral) are the canonical repurchase advantages. Choice C ('repurchase always higher payout') is the absolute-language trap; Choice D ('dividend signals growth') reverses standard signaling theory; Choice E ('repurchase requires no cash') is factually false — repurchase uses cash..",
        "Topic": "Repurchase",
        "Subtopic": "Factors",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Tax",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "repurchase"
        ],
        "Dependencies": [],
        "Choices": [
          "Undervalued stock — repurchase accretive",
          "Shareholder tax deferral vs dividend tax now",
          "Repurchase always higher payout",
          "Dividend signals growth",
          "Repurchase requires no cash"
        ]
      },
      {
        "ItemID": "CBQ21-B5-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match payout concept to Orchard",
        "Correct": {
          "Residual $3.00": "14-8=6/2M — earnings minus investments",
          "Repurchase 200k": "accretion $0.78 — EPS rises from $7.00 to $7.78 as share count drops 10% while earnings stay flat",
          "Stable $2.00": " smooth, signals — retain $4M buffer",
          "SGR link": " retention  (1-payout/14) × ROE"
        },
        "Explanation": "Residual $3.00 maps to earnings minus investments ($14M - $8M = $6M residual / 2M shares). Repurchase 200k shares accretes EPS from $7.00 to ~$7.78 (post-repurchase share count 1.8M, $14M / 1.8M), an EPS accretion of approximately $0.78 that derives from buying below intrinsic P/E. Stable $2.00 smooths the payout, signals confidence, and retains the $4M excess for opportunistic use. SGR link is the Higgins formula ROE × retention, where retention = 1 - payout/earnings — connecting the dividend decision to internally-fundable growth.",
        "Topic": "Payout mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Residual vs stable",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "payout-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "Residual $3.00",
          "Repurchase 200k",
          "Stable $2.00",
          "SGR link"
        ],
        "RightItems": [
          "14-8=6/2M — earnings minus investments",
          "accretion $0.78 — EPS rises from $7.00 to $7.78 as share count drops 10% while earnings stay flat",
          " smooth, signals — retain $4M buffer",
          " retention  (1-payout/14) × ROE"
        ]
      }
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-D3",
    "Title": "RAROC and Capital Allocation at Shield Insurance",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Compute RAROC and risk-adjusted return (D.5)",
      "Allocate economic capital"
    ],
    "PrimaryCompetency": "Evaluate",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Shield Insurance allocates $20M economic capital across four lines. CRO Anika Patel must compute RAROC and recommend allocation under appetite 15% hurdle.",
    "Industry": "Insurance",
    "CompanyType": "Service provider",
    "CompanyName": "Shield Insurance",
    "Stakeholder": "CRO Anika Patel",
    "BusinessFunction": "Risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "RAROC",
      "economic capital"
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
      "Compute RAROC",
      "Compare to hurdle",
      "Recommend allocation"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-D3-E1",
        "CaseID": "CBQ21-D3",
        "Type": "table",
        "Title": "Exhibit 1 — Line Performance ($ millions)",
        "Purpose": "Provides revenue, EL, capital for RAROC.",
        "ReferencedBy": [
          "CBQ21-D3-Q1",
          "CBQ21-D3-Q2",
          "CBQ21-D3-Q3"
        ],
        "Headers": [
          "Line",
          "Revenue",
          "Expected Loss",
          "Economic Capital"
        ],
        "Rows": [
          [
            "Auto",
            "10.0",
            "4.0",
            "20.0"
          ],
          [
            "Property",
            "8.0",
            "3.5",
            "15.0"
          ],
          [
            "Life",
            "6.0",
            "1.0",
            "10.0"
          ],
          [
            "Health",
            "12.0",
            "7.0",
            "25.0"
          ]
        ],
        "DataFormat": "USD millions, %",
        "AccuracyCheck": "Auto (10-4)/20=30%"
      },
      {
        "ExhibitID": "CBQ21-D3-E2",
        "CaseID": "CBQ21-D3",
        "Type": "text",
        "Title": "Exhibit 2 — Hurdle and Appetite",
        "Purpose": "Provides hurdle 15% and capacity.",
        "ReferencedBy": [
          "CBQ21-D3-Q4",
          "CBQ21-D3-Q5",
          "CBQ21-D3-Q6"
        ],
        "Body": "Hurdle 15% RAROC, capacity $80M, appetite 70% of capacity."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-D3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the RAROC for Auto line, in percent.",
        "Correct": "30.00",
        "Explanation": "RAROC (Risk-Adjusted Return on Capital) = (Revenue - Expected Loss) / Economic Capital = ($10.0M - $4.0M) / $20.0M = $6.0M / $20.0M = 30.00%. The metric measures risk-adjusted profitability per unit of economic capital deployed, allowing like-for-like comparison across lines with different risk profiles. For Auto, 30% comfortably exceeds the 15% hurdle, signaling value creation. The common trap (Revenue/Capital = $10/$20 = 50%) ignores expected loss entirely and overstates risk-adjusted return — a frequent exam error that double-counts revenue without subtracting the loss provision.",
        "Topic": "RAROC",
        "Subtopic": "Auto",
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
          "raroc"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-D3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CA