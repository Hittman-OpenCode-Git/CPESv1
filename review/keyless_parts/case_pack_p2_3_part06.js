 to Products A and B, leaving segment margin unchanged."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "Outsourcing is generally appropriate only when the supplier's capacity, quality systems, and contract terms mitigate execution risk over a horizon that matches the in-house cost recovery. A defensible evaluation couples the per-hour economics with qualitative safeguards — supplier audits, dual-sourcing, and price-volume commitments — so the qualitative concentration risk is managed, not ignored.",
        "ExplanationWrongA": "Choice A treats single-supplier concentration as inherently disqualifying; a single supplier can be acceptable if it has proven reliability, quality certification, capacity headroom, and contractual volume-flexibility clauses — single source is a risk factor to mitigate, not a categorical exclusion.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "COSO ERM does not automatically disqualify single-product dependence; it requires the entity to identify, assess, and respond to that risk, which can be done through outsourcing controls and contingency planning.",
        "ExplanationWrongD": "Fixed costs do not vanish when a product is outsourced; they are reabsorbed by remaining products, which raises per-unit fixed-cost absorption and can erode the apparent margin advantage of outsourcing.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-D2",
    "Title": "Flash Capital: Operational Risk Appetite and KRI Design for a New Factoring Line",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Distinguish risk capacity from risk appetite and apply the gap to a new product launch",
      "Calibrate key risk indicator (KRI) thresholds using statistical tolerance bands",
      "Design control activities consistent with COSO ERM Principle 10",
      "Evaluate risk response choices between avoidance, mitigation, acceptance, and hedging"
    ],
    "PrimaryCompetency": "Conceptual",
    "EstimatedMinutes": 35,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Capital, the specialty-finance subsidiary of Flash Holdings, is preparing to launch TradeBridge, a $500 million invoice-factoring product line targeting mid-market manufacturers in the DACH region. Treasurer Maya Caldwell has been asked by CFO Mariela Hoffmann to design the operational-risk framework for TradeBridge before launch. Internal Audit has set risk-appetite thresholds that cap delinquency at 3.5% and obligor concentration at 15% of the portfolio; the risk committee has signaled that exceeding either threshold for two consecutive months would force a board-level review. Maya's stress model estimates an expected annual operational loss of $4 million, driven primarily by onboarding fraud, obligor default, and operational errors in collections. She must align the program with COSO ERM Principle 10 (which addresses control activities), design KRIs that trigger meaningful action without flooding the dashboard with noise, and recommend whether to retain the residual exposure or hedge a portion of it through a credit-default swap overlay. The risk committee meets in 14 days and expects a written framework, a KRI dashboard mock-up, and a board-ready recommendation.",
    "Industry": "Specialty Finance / Factoring",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Capital",
    "Stakeholder": "Maya Caldwell, Treasurer",
    "BusinessFunction": "Treasury &amp; Operational Risk",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "risk-appetite",
      "KRI",
      "COSO-ERM",
      "credit-risk",
      "hedging",
      "operational-risk",
      "factoring"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Distinguish risk capacity from risk appetite (D.1)",
      "Calibrate KRI thresholds using statistical tolerance bands (D.2)",
      "Apply COSO ERM Principle 10 in control-activity design (D.3)",
      "Evaluate risk response and hedging decisions for new product launches (D.4)"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-D2-E1",
        "CaseID": "CBQ23-D2",
        "Type": "table",
        "Title": "Exhibit 1 — TradeBridge Exposure, Expected Loss, and Appetite Thresholds",
        "Description": "New product exposure, expected operational loss estimate, and the risk-appetite thresholds set by the risk committee. Concentration and delinquency limits trigger a board review if breached for two consecutive months.",
        "Columns": [
          "Metric",
          "Threshold / Estimate"
        ],
        "Rows": [
          [
            "Total new exposure (TradeBridge)",
            "$500,000,000"
          ],
          [
            "Expected annual operational loss",
            "$4,000,000"
          ],
          [
            "Expected loss ratio (EL / exposure)",
            "0.80%"
          ],
          [
            "Risk-appetite delinquency ceiling",
            "3.5%"
          ],
          [
            "Risk-appetite obligor concentration ceiling",
            "15.0%"
          ],
          [
            "KRI breach escalation rule",
            "Two consecutive months → board review"
          ],
          [
            "Confidence level on EL estimate",
            "70% (one-tailed)"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-D2-E2",
        "CaseID": "CBQ23-D2",
        "Type": "table",
        "Title": "Exhibit 2 — KRIs, Tolerance Bands, and Hedging Cost",
        "Description": "Proposed KRI definitions, observed means, standard deviations, and tolerance bands for TradeBridge. Hedging cost is shown for a partial credit-default swap overlay on the largest 20 obligors.",
        "Columns": [
          "KRI",
          "Observed Mean",
          "Std Dev",
          "Green Band",
          "Amber Band",
          "Red Band"
        ],
        "Rows": [
          [
            "Portfolio delinquency > 60 days",
            "1.6%",
            "0.7%",
            "≤ 2.5%",
            "2.5% – 3.5%",
            "> 3.5%"
          ],
          [
            "Top-obligor concentration",
            "9.0%",
            "3.0%",
            "≤ 10%",
            "10% – 15%",
            "> 15%"
          ],
          [
            "Onboarding fraud-rate (per 1,000 apps)",
            "1.2",
            "0.4",
            "≤ 1.6",
            "1.6 – 2.2",
            "> 2.2"
          ],
          [
            "Operational errors per 10,000 invoices",
            "0.8",
            "0.3",
            "≤ 1.1",
            "1.1 – 1.5",
            "> 1.5"
          ],
          [
            "Hedging cost — 20-obligor CDS overlay (annual)",
            "$1.6M",
            "—",
            "—",
            "—",
            "—"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-D2-Q1",
        "Type": "select",
        "Correct": "Risk capacity is the maximum loss Flash Capital can absorb before breaching internal capital targets, while risk appetite is the amount of risk management is willing to accept in pursuit of the TradeBridge business plan; capacity generally exceeds appetite at launch.",
        "Explanation": "Risk capacity is the objective ceiling ($20M) the entity can survive without threatening solvency; risk appetite is the discretionary amount ($8M) management chooses to accept in pursuit of the TradeBridge business plan. At launch, capacity ($20M) exceeds appetite ($8M) because management deliberately keeps exposure below the survivability ceiling. The month-3 delinquency ($4M expected loss) sits within appetite ($8M) but is approaching it, requiring monitoring — not an immediate breach of capacity ($20M). Choices B, C, and D misstate the definitions: capacity and appetite are not synonymous (B); appetite is set internally by the board, not by regulators (C); both concepts span operational, credit, and market risk rather than splitting by loss type (D).",
        "Topic": "Risk capacity vs appetite",
        "question_state": "Certified",
        "Prompt": "TradeBridge's launch plan projects a $4M expected loss against $500M exposure with a 3.5% delinquency ceiling. The board has set a risk capacity of $20M and a risk appetite of $8M. During month 3, portfolio delinquency hits 3.7% with $4M expected loss. Which statement correctly applies the distinction between risk capacity and risk appetite to this situation?",
        "Choices": [
          "Risk capacity is the maximum loss Flash Capital can absorb before breaching internal capital targets, while risk appetite is the amount of risk management is willing to accept in pursuit of the TradeBridge business plan; capacity generally exceeds appetite at launch.",
          "Risk capacity and risk appetite are synonymous and used interchangeably in committee reports, so no distinction is needed for TradeBridge.",
          "Risk appetite is the upper bound set by regulators, while risk capacity is the internal stretch goal that management targets.",
          "Risk capacity refers only to operational losses, while risk appetite refers only to market losses, so for a factoring product the two concepts collapse into one."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Risk capacity is the objective ceiling the entity can survive without threatening solvency or capital targets; risk appetite is the discretionary amount management chooses to accept in pursuit of strategy. At launch, capacity typically exceeds appetite because management deliberately keeps exposure below the survivability ceiling. TradeBridge's $4M expected loss against $500M exposure and the 3.5% delinquency ceiling illustrates an appetite calibrated well inside capacity.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Capacity and appetite are not synonymous in modern ERM frameworks; conflating them typically produces inconsistent limit-setting and is one of the most common audit findings for new product launches.",
        "ExplanationWrongC": "Risk appetite is set internally by the board, not by regulators; capital and prudential limits are regulators' tools, which constrain capacity rather than define appetite.",
        "ExplanationWrongD": "Both concepts apply across operational, credit, and market risk; restricting capacity to operational loss is a category error that produces under-calibrated risk limits.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-D2-Q2",
        "Type": "select",
        "Correct": "The green-amber boundary at 2.5% sits approximately 1.3 standard deviations above the mean of 1.6%, implying relatively frequent amber triggers and elevated false-positive noise.",
        "Explanation": "The mean is 1.6% and the green-amber boundary is 2.5%, a difference of 0.9 percentage points. At a standard deviation of 0.7 percentage points, that is roughly 0.9 / 0.7 ≈ 1.3 standard deviations. Under a normal distribution, a 1.3σ upper tail corresponds to roughly a 10% one-sided false-positive rate, which is higher than ideal and explains why the band will trip frequently — a common calibration challenge for low-mean KRIs.",
        "Topic": "KRI threshold calibration",
        "question_state": "Certified",
        "Prompt": "Using Exhibit 2 and assuming portfolio delinquency is approximately normally distributed, what is the implied green-amber boundary in number of standard deviations above the observed mean, and what does that imply for false-positive rates?",
        "Choices": [
          "The green-amber boundary at 2.5% sits approximately 1.3 standard deviations above the mean of 1.6%, implying relatively frequent amber triggers and elevated false-positive noise.",
          "The green-amber boundary at 2.5% sits approximately 0.9 standard deviations above the mean of 1.6%, implying a tight band with limited noise.",
          "The green-amber boundary at 2.5% sits exactly 2.0 standard deviations above the mean of 1.6%, implying roughly a 2.5% one-sided false-positive rate.",
          "The green-amber boundary cannot be interpreted in standard deviations because delinquency is not normally distributed under any circumstances."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "The mean is 1.6% and the green-amber boundary is 2.5%, a difference of 0.9 percentage points. At a standard deviation of 0.7 percentage points, that is roughly 0.9 / 0.7 ≈ 1.3 standard deviations. Under a normal distribution, a 1.3σ upper tail corresponds to roughly a 10% one-sided false-positive rate, which is higher than ideal and explains why the band will trip frequently — a common calibration challenge for low-mean KRIs.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "0.9 percentage points divided by a 0.7-percentage-point standard deviation gives about 1.3 standard deviations, not 0.9; the answer mis-states the relationship between the band and the standard deviation.",
        "ExplanationWrongC": "A 2.0-standard-deviation boundary would sit at 1.6% + 2 × 0.7% = 3.0%, not at 2.5%; the 2.5% boundary is closer to 1.3 standard deviations, so the false-positive rate is materially higher than 2.5%.",
        "ExplanationWrongD": "KRI calibration routinely assumes approximate normality under stable operating conditions; the test is whether the underlying assumption is plausible for the metric, not whether the metric is mathematically continuous.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-D2-Q3",
        "Type": "select",
        "Correct": "Implement a four-eyes approval workflow above $250,000 of new obligor exposure, automated system flags for invoice anomalies, segregation of duties between onboarding and collections, and quarterly sample-based quality testing.",
        "Explanation": "COSO ERM Principle 10 calls for control activities that are integrated with risk responses and proportionate to the risk. A four-eyes approval above a defined exposure threshold, system-driven invoice anomaly flags, segregation of duties between onboarding and collections, and periodic quality testing collectively satisfy the principle by aligning preventive, detective, and monitoring controls with the credit and operational risks identified for TradeBridge.",
        "Topic": "Control activity design",
        "question_state": "Certified",
        "Prompt": "Which control-activity design is most consistent with COSO ERM Principle 10 for the TradeBridge onboarding and collections process?",
        "Choices": [
          "Implement a four-eyes approval workflow above $250,000 of new obligor exposure, automated system flags for invoice anomalies, segregation of duties between onboarding and collections, and quarterly sample-based quality testing.",
          "Allow the onboarding analyst to approve any size of obligor up to the $500M portfolio cap so long as the KRI dashboard reads green.",
          "Centralize all onboarding, collections, and exception handling in a single experienced analyst to reduce coordination costs.",
          "Move onboarding, collections, and credit approvals to a shared-services center outside Europe to reduce headcount cost."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "COSO ERM Principle 10 calls for control activities that are integrated with risk responses and proportionate to the risk. A four-eyes approval above a defined exposure threshold, system-driven invoice anomaly flags, segregation of duties between onboarding and collections, and periodic quality testing collectively satisfy the principle by aligning preventive, detective, and monitoring controls with the credit and operational risks identified for TradeBridge.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Unlimited single-analyst approval removes segregation of duties and concentrates fraud and error risk, which is inconsistent with COSO ERM Principle 10 and most regulatory expectations for new product launches.",
        "ExplanationWrongC": "Centralizing onboarding, collections, and exceptions in one analyst concentrates decision rights and weakens segregation of duties; the design conflicts directly with Principle 10's emphasis on proportionate, well-distributed controls.",
        "ExplanationWrongD": "Geographic centralization does not by itself address segregation of duties or anomaly detection, and it can introduce additional operational risk if local regulatory knowledge is lost; the relocation decision should be risk-assessed separately.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-D2-Q4",
        "Type": "select",
        "Correct": "Tier-1 analyst issues an immediate exception report, the head of credit reviews within 24 hours, the risk committee is notified within 48 hours, and a board-level review is triggered if the breach persists for two consecutive months per the appetite statement.",
        "Explanation": "An effective escalation framework pairs immediate operational containment with structured committee oversight. Tier-1 detection within hours, credit-lead review within a day, risk-committee notification within two days, and a board-level trigger linked to the formal appetite statement produce a response that is timely, proportionate, and aligned with governance. The two-consecutive-month rule provides continuity without suppressing real-time visibility.",
        "Topic": "Exception reporting and escalation",
        "question_state": "Certified",
        "Prompt": "TradeBridge has identified a scenario in which obligor concentration breaches 15% on a single counterparty. Which incident-response escalation framework is most appropriate?",
        "Choices": [
          "Tier-1 analyst handles the breach, escalates only if losses exceed $1M; no committee involvement is required at the trigger level.",
          "Tier-1 analyst issues an immediate exception report, the head of credit reviews within 24 hours, the risk committee is notified within 48 hours, and a board-level review is triggered if the breach persists for two consecutive months per the appetite statement.",
          "Wait until quarter-end to bundle the breach into a routine risk report to the audit committee.",
          "Immediately cease all onboarding for TradeBridge until the concentration is unwound through natural runoff."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "An effective escalation framework pairs immediate operational containment with structured committee oversight. Tier-1 detection within hours, credit-lead review within a day, risk-committee notification within two days, and a board-level trigger linked to the formal appetite statement produce a response that is timely, proportionate, and aligned with governance. The two-consecutive-month rule provides continuity without suppressing real-time visibility.",
        "ExplanationWrongA": "Choice A treats a quarterly aggregation approach as equivalent to immediate escalation; the board-approved appetite statement typically requires daily-or-real-time escalation when a red-band KRI is crossed, because delay compounds the magnitude of the breach before corrective action can be taken.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Immediately halting all onboarding typically overreacts to a breach that may be addressable through partial run-off and reallocation; it is not generally the lowest-cost proportionate response.",
        "ExplanationWrongD": "An escalation framework should generally specify roles, timing, and decision rights at each tier rather than relying solely on a dollar threshold; the design in B does that, while A focuses only on financial impact and omits committee oversight.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-D2-Q5",
        "Type": "select",
        "Correct": "Mitigation through the CDS overlay is generally preferable because it preserves the strategic upside of TradeBridge while capping tail loss at the top of the obligor distribution, provided the $1.6M premium is below the expected loss reduction.",
        "Explanation": "Risk avoidance sacrifices the strategic upside of TradeBridge and is rarely the lowest-cost response when targeted mitigation is available. A CDS overlay on the largest 20 obligors addresses the tail of the loss distribution where operational risk is concentrated; it is defensible when the $1.6M premium is less than the expected loss reduction from the hedged book. The framework should quantify that comparison, document basis risk, and review the overlay at the KRI cadence.",
        "Topic": "Risk mitigation selection",
        "question_state": "Certified",
        "Prompt": "The CEO is weighing whether to avoid TradeBridge entirely (risk avoidance) versus launch the product with a $1.6M credit-default swap overlay covering the largest 20 obligors (risk mitigation). Which evaluation is most defensible?",
        "Choices": [
          "Avoidance is generally preferable because any operational risk above zero is unacceptable under Flash Capital's framework.",
          "Mitigation through the CDS overlay is generally preferable because it preserves the strategic upside of TradeBridge while capping tail loss at the top of the obligor distribution, provided the $1.6M premium is below the expected loss reduction.",
          "Avoidance and mitigation are interchangeable, so the choice is purely cosmetic.",
          "Mitigation through hedging is generally preferable because insurance-like instruments have no basis risk under any scenario."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "Risk avoidance sacrifices the strategic upside of TradeBridge and is rarely the lowest-cost response when targeted mitigation is available. A CDS overlay on the largest 20 obligors addresses the tail of the loss distribution where operational risk is concentrated; it is defensible when the $1.6M premium is less than the expected loss reduction from the hedged book. The framework should quantify that comparison, document basis risk, and review the overlay at the KRI cadence.",
        "ExplanationWrongA": "Choice A recommends risk avoidance (declining the new product line); for a $500M exposure with manageable tail risk and strategic upside, avoidance typically forfeits value unnecessarily — risk reduction (controls + monitoring) or risk sharing (insurance/hedging) are generally more proportionate responses.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Avoidance and mitigation differ in cost, residual exposure, and strategic implications; treating them as interchangeable typically produces weak risk governance and is a common audit finding.",
        "ExplanationWrongD": "CDS overlays carry basis risk between the hedged reference entities and the actual obligors; assuming no basis risk overstates the protection and is inconsistent with prudent hedge documentation.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-D2-Q6",
        "Type": "select",
        "Correct": "Hedge the delinquent obligors with the $0.9M overlay while implementing root-cause remediation on onboarding, document the basis risk, and pre-commit to unwinding the hedge once the KRI returns to amber for two consecutive months.",
        "Explanation": "A defensible evaluation combines a near-term hedge to cap further tail loss with root-cause remediation on the onboarding process that drives delinquency. Documenting basis risk and pre-committing to unwind once the KRI returns to amber for two consecutive months ties the mitigation to the appetite statement and supports clean audit-trail reporting.",
        "Topic": "Delinquency response actions",
        "question_state": "Certified",
        "Prompt": "After three months of operation, portfolio delinquency is running at 3.7% — red on the KRI dashboard — while concentration is at 12% and stable. The risk committee must choose between retaining the exposure unchanged or hedging a portion of the delinquent obligors with a $0.9M CDS overlay. Which evaluation best balances the qualitative and quantitative considerations?",
        "Choices": [
          "Retain the exposure unchanged because delinquency breaches happen regularly in a new product and the KRI is therefore unreliable; no further action is required.",
          "Hedge the delinquent obligors with the $0.9M overlay while implementing root-cause remediation on onboarding, document the basis risk, and pre-commit to unwinding the hedge once the KRI returns to amber for two consecutive months.",
          "Terminate TradeBridge immediately because a single red KRI breach is an automatic shutdown signal under the framework.",
          "Hide the KRI breach from the risk committee until quarter-end to avoid an overreaction."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "A defensible evaluation combines a near-term hedge to cap further tail loss with root-cause remediation on the onboarding process that drives delinquency. Documenting basis risk and pre-committing to unwind once the KRI returns to amber for two consecutive months ties the mitigation to the appetite statement and supports clean audit-trail reporting.",
        "ExplanationWrongA": "Choice A treats every red KRI as an automatic shutdown signal; well-designed KRI frameworks distinguish between yellow-band (warning) and red-band (action) thresholds, with proportionate responses (review, mitigation) short of full shutdown for transient breaches.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Suppressing a red-band KRI breach to avoid committee involvement is a governance failure that typically surfaces in internal audit findings and can erode the credibility of the entire risk framework.",
        "ExplanationWrongD": "Dismissing the KRI as unreliable without root-cause analysis ignores the appetite statement and the board's two-consecutive-month rule; the appropriate response is investigation, not dismissal.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ23-E3",
    "Title": "Flash Logistics: Fleet Replacement vs Lease Extension — NPV, IRR, and Real Options Under Capital Rationing",
    "SectionTags": [
      "E"
    ],
    "BlueprintDomain": "Investment Decisions",
    "BlueprintObjectives": [
      "Compute NPV of mutually exclusive capital investment alternatives using after-tax cash flows",
      "Apply MACRS depreciation to derive after-tax operating cash flow for a replacement project",
      "Analyze real-option value embedded in replacement flexibility and sensitivity to WACC",
      "Evaluate NPV vs IRR ranking conflicts and recommend a course of action to the board under capital rationing"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 35,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Logistics operates the European trucking fleet that services Flash Industrial's coatings plant and Flash Foods' cold-chain distribution. The CFO of Flash Holdings, Mariela Hoffmann, is preparing a board paper on whether to replace the aging 250-truck fleet with new alternatively fueled vehicles or to extend the existing operating leases for another eight years. The replacement alternative requires a $180 million capex outlay today and generates an expected operating cash flow of $32 million per year for eight years, with a $20 million salvage value at the end of year eight. The lease-extension alternative costs $28 million per year for eight years. The capital-rationing envelope for the year is $200 million, of which $60 million is already committed to a Flash Tech data-center build, leaving $140 million available. WACC for Flash Logistics is 8.5%, the corporate tax rate is 21%, and the replacement fleet qualifies for a 5-year MACRS depreciation schedule. Mariela must present NPV, IRR, payback, and a real-option overlay that values the flexibility to delay the replacement, and she must reconcile a potential NPV/IRR ranking conflict when leverage is included.",
    "Industry": "Transportation &amp; Logistics",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Logistics",
    "Stakeholder": "Mariela Hoffmann, CFO",
    "BusinessFunction": "Corporate Finance &amp; Capital Budgeting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "NPV",
      "IRR",
      "MACRS",
      "real-options",
      "capital-rationing",
      "mutually-exclusive",
      "sensitivity"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 88,
    "RevisionHistory": [
      {
        "Date": "2026-08-30",
        "Version": "1.0",
        "Author": "Case Author",
        "Summary": "Initial creation under P2-075"
      }
    ],
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Part": 2,
    "Part2OnlyFlag": true,
    "Dependencies": [],
    "LearningObjectives": [
      "Compute NPV of replacement vs lease alternatives on an after-tax basis (E.1)",
      "Apply MACRS depreciation to derive after-tax operating cash flow (E.2)",
      "Analyze real-option value and WACC sensitivity (E.3)",
      "Evaluate NPV/IRR ranking conflicts and recommend a course of action under capital rationing (E.4)"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ23-E3-E1",
        "CaseID": "CBQ23-E3",
        "Type": "table",
        "Title": "Exhibit 1 — Cash-Flow Inputs for the Fleet Decision",
        "Description": "Capex, annual operating cash flow, salvage, lease cost, WACC, tax rate, and capital-rationing envelope for the fleet replacement vs lease extension alternatives.",
        "Columns": [
          "Input",
          "Replacement (Replace)",
          "Lease Extension"
        ],
        "Rows": [
          [
            "Initial outlay (Year 0)",
            "($180,000,000)",
            "$0"
          ],
          [
            "Annual operating cash flow (Years 1–8)",
            "$32,000,000",
            "—"
          ],
          [
            "Lease cost per year (Years 1–8)",
            "—",
            "($28,000,000)"
          ],
          [
            "Salvage value at end of Year 8",
            "$20,000,000",
            "$0"
          ],
          [
            "Depreciation method",
            "5-year MACRS",
            "n/a"
          ],
          [
            "WACC",
            "8.5%",
            "8.5%"
          ],
          [
            "Corporate tax rate",
            "21%",
            "21%"
          ],
          [
            "Capital-rationing envelope (annual)",
            "$200,000,000 total / $140,000,000 available",
            "—"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ23-E3-E2",
        "CaseID": "CBQ23-E3",
        "Type": "table",
        "Title": "Exhibit 2 — MACRS 5-Year Depreciation Schedule and Real-Option Inputs",
        "Description": "IRS MACRS 5-year half-year convention percentages used to compute depreciation tax shields. Real-option inputs value the flexibility to defer the replacement by 12 months.",
        "Columns": [
          "Year",
          "MACRS %",
          "Annual Depreciation ($180M basis)",
          "Real-Option Input",
          "Value"
        ],
        "Rows": [
          [
            "Year 1",
            "20.00%",
            "$36,000,000",
            "Underlying NPV of replacement",
            "$46,500,000"
          ],
          [
            "Year 2",
            "32.00%",
            "$57,600,000",
            "Estimated volatility of project value (σ)",
            "30%"
          ],
          [
            "Year 3",
            "19.20%",
            "$34,560,000",
            "Risk-free rate (1-year)",
            "3.5%"
          ],
          [
            "Year 4",
            "11.52%",
            "$20,736,000",
            "Annual dividend / cash-flow yield (δ)",
            "6.0%"
          ],
          [
            "Year 5",
            "11.52%",
            "$20,736,000",
            "Estimated Black-Scholes defer value (rounded)",
            "$7,200,000"
          ],
          [
            "Year 6",
            "5.76%",
            "$10,368,000",
            "Sensitivity — NPV at WACC 9.5%",
            "≈ $32,000,000"
          ],
          [
            "Book-value at end of Year 8",
            "—",
            "≈ $0",
            "Sensitivity — NPV at WACC 7.5%",
            "≈ $61,500,000"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ23-E3-Q1",
        "Type": "select",
        "Correct": "Approximately $46.5M, computed as the PV of an 8-year annuity of $32M at 8.5%, plus the PV of $20M salvage, minus $180M.",
        "Explanation": "PV of an 8-year annuity of $32M at 8.5% = $32M x 5.621 = about $179.9M; PV of $20M salvage at year 8 = $20M / 1.085^8 = about $11.2M; pre-shield inflows total about $191.1M against the $180M outlay. Including the MACRS shield as presented in the exhibit, total NPV is approximately $46.5M. The correct choice captures the standard annuity-plus-salvage structure with shields.",
        "Topic": "Replacement NPV with tax shields",
        "question_state": "Certified",
        "Prompt": "Using Exhibit 1 and a WACC of 8.5%, what is the approximate NPV of the replacement alternative, reflecting operating cash flows, MACRS tax shields, and the $20M salvage against the $180M outlay?",
        "Choices": [
          "Approximately $46.5M, computed as the PV of an 8-year annuity of $32M at 8.5%, plus the PV of $20M salvage, minus $180M.",
          "Approximately $96.5M, computed as the simple sum of $32M × 8 plus $20M minus $180M.",
          "Approximately $0M, indicating the project just clears its hurdle rate.",
          "Approximately $156M, the undiscounted sum of all inflows."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "PV of an 8-year annuity of $32M at 8.5% = $32M x 5.621 = about $179.9M; PV of $20M salvage at year 8 = $20M / 1.085^8 = about $11.2M; pre-shield inflows total about $191.1M against the $180M outlay. Including the MACRS shield as presented in the exhibit, total NPV is approximately $46.5M. The correct choice captures the standard annuity-plus-salvage structure with shields.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Summing $32M × 8 plus $20M ignores the time value of money and produces $276M of nominal inflows, which is not an NPV calculation.",
        "ExplanationWrongC": "An NPV of approximately zero would imply an IRR roughly equal to WACC; the exhibit suggests a positive NPV once MACRS tax shields are included, not a marginal project.",
        "ExplanationWrongD": "An undiscounted sum is not a capital-budgeting metric; NPV requires discounting future cash flows to present value at WACC.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-E3-Q2",
        "Type": "select",
        "Correct": "Approximately $32.5M, computed as $32M x (1 - 0.21) + $34.56M x 0.21.",
        "Explanation": "After-tax operating cash flow equals (revenue - operating cost) x (1 - tax rate) + depreciation x tax rate. Using $32M as the operating-cash-flow proxy and $34.56M of Year-3 MACRS depreciation: $32M x 0.79 + $34.56M x 0.21 = $25.28M + $7.26M = about $32.5M. The correct $32.5M follows the standard depreciation-shield formulation; the $25.3M intermediate omits the $7.26M shield and is the classic trap.",
        "Topic": "After-tax operating cash flow",
        "question_state": "Certified",
        "Prompt": "Using the MACRS schedule in Exhibit 2 and a 21% tax rate, what is the after-tax operating cash flow in Year 3 of the replacement project, assuming $32M of pre-tax operating cash flow before depreciation?",
        "Choices": [
          "Approximately $32.5M, computed as $32M x (1 - 0.21) + $34.56M x 0.21.",
          "Approximately $32M, because depreciation does not affect cash flow.",
          "Approximately $39.7M, computed as $32M + $34.56M × 0.21.",
          "Approximately $7.3M, computed as $34.56M × 0.21 only."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "After-tax operating cash flow equals (revenue - operating cost) x (1 - tax rate) + depreciation x tax rate. Using $32M as the operating-cash-flow proxy and $34.56M of Year-3 MACRS depreciation: $32M x 0.79 + $34.56M x 0.21 = $25.28M + $7.26M = about $32.5M. The correct $32.5M follows the standard depreciation-shield formulation; the $25.3M intermediate omits the $7.26M shield and is the classic trap.",
        "ExplanationWrongA": "",
        "ExplanationWrongB": "Depreciation reduces taxable income and therefore produces a tax shield; ignoring it understates cash flow when an explicit tax-rate adjustment is part of the analysis.",
        "ExplanationWrongC": "Adding the tax shield to gross operating cash flow without subtracting taxes on operating income double-counts the shield and overstates cash flow.",
        "ExplanationWrongD": "Reporting only the depreciation × tax-rate term ignores after-tax operating income, which is the largest component of after-tax cash flow.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ23-E3-Q3",
        "Type": "select",
        "Correct": "The deferral option adds approximately $7.2M of value, ta