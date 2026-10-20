ied supplier. The committee wants a single quantified recommendation that respects the capacity constraint. Dana's briefing must separate avoidable from allocated costs before any commitment is made.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-C2-E1",
        "CaseID": "CBQ21-C2",
        "Type": "table",
        "Title": "Exhibit 1 - Product Line Operating Data and Machining Capacity",
        "Purpose": "Provides volumes, prices, unit variable costs, unit contribution margins, and machine-hour consumption for both lines; supports the segment computations (Q1, Q2), the outsourcing comparison (Q3), the combined recommendation and capacity feasibility check (Q4), and the special-order relevance reasoning (Q5, Q6).",
        "ReferencedBy": [
          "CBQ21-C2-Q1",
          "CBQ21-C2-Q2",
          "CBQ21-C2-Q3",
          "CBQ21-C2-Q4",
          "CBQ21-C2-Q5",
          "CBQ21-C2-Q6"
        ],
        "Headers": [
          "Product line",
          "Annual volume (units)",
          "Price per unit",
          "Variable cost per unit",
          "Contribution margin per unit",
          "Machine hours per unit",
          "Annual machine hours consumed"
        ],
        "Rows": [
          [
            "V-200 valve assemblies",
            "24,000",
            "$92",
            "$58",
            "$34",
            "2.0",
            "48,000"
          ],
          [
            "F-100 standard fittings",
            "30,000",
            "$36",
            "$22",
            "$14",
            "0.4",
            "12,000"
          ],
          [
            "Machining center capacity check",
            "-",
            "-",
            "-",
            "-",
            "-",
            "60,000 available; 60,000 consumed"
          ]
        ],
        "DataFormat": "USD whole dollars except per-unit amounts in dollars; hours in whole machine hours.",
        "AccuracyCheck": "Unit margins verified: 92 - 58 = 34; 36 - 22 = 14. Hours verified: 24,000 x 2.0 = 48,000; 30,000 x 0.4 = 12,000; 48,000 + 12,000 = 60,000, equaling available capacity."
      },
      {
        "ExhibitID": "CBQ21-C2-E2",
        "CaseID": "CBQ21-C2",
        "Type": "table",
        "Title": "Exhibit 2 - F-100 Profitability Detail and Transaction Terms",
        "Purpose": "Details F-100 contribution margin, the traceable fixed-cost breakdown, the corporate allocation, the supplier quote and retained supervision cost, and the special-order terms; feeds the segment result and drop penalty (Q1, Q2), the outsourcing advantage (Q3), the combined recommendation (Q4), and the matching values (Q6).",
        "ReferencedBy": [
          "CBQ21-C2-Q1",
          "CBQ21-C2-Q2",
          "CBQ21-C2-Q3",
          "CBQ21-C2-Q4",
          "CBQ21-C2-Q5",
          "CBQ21-C2-Q6"
        ],
        "Headers": [
          "Item",
          "Amount or terms"
        ],
        "Rows": [
          [
            "F-100 contribution margin (30,000 units x $14)",
            "$420,000"
          ],
          [
            "Traceable fixed: dedicated equipment lease",
            "$148,000"
          ],
          [
            "Traceable fixed: line-specific marketing",
            "$120,000"
          ],
          [
            "Total traceable fixed costs (avoidable if line ends)",
            "$268,000"
          ],
          [
            "Allocated corporate fixed costs charged to F-100 segment",
            "$210,000"
          ],
          [
            "Supplier quote: outsourced F-100 supply price per unit (delivered)",
            "$25"
          ],
          [
            "Line supervision cost retained if production is outsourced",
            "$32,000"
          ],
          [
            "Export offer: 6,000 V-200 units at $70 per unit; requires 2.0 machine hours per unit (12,000 hours total)",
            "One-time order; no incremental fixed cost"
          ]
        ],
        "DataFormat": "USD whole dollars except the per-unit supply price; terms column states transaction conditions.",
        "AccuracyCheck": "Traceable fixed verified: 148,000 + 120,000 = 268,000. Reported segment result verified: 420,000 - 268,000 - 210,000 = -58,000. Special-order hours verified: 6,000 x 2.0 = 12,000, exactly the hours freed by outsourcing F-100."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-C2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibits 1 and 2, compute F-100's segment result as currently reported (contribution margin less traceable fixed costs less allocated corporate fixed costs). Enter the LOSS as a positive whole dollar amount (tolerance +/- $1).",
        "Correct": "58000",
        "Explanation": "The reported segment result nets F-100's contribution margin against both traceable and allocated fixed costs: 420,000 - 268,000 - 210,000 = a 58,000 loss. This reported loss anchors the drop proposal now before the Executive Committee. Contribution margin itself is 30,000 units x (36 - 22) = 420,000, which more than covers the traceable costs the company would actually shed. In the briefing, present the 58,000 figure only as the reported result and label the 210,000 allocation as a common cost that persists regardless of the line's fate. The trap is letting an allocation drive a decision that cannot change it - the classic segment-reporting distortion tested on the CMA exam.",
        "Topic": "Segment reporting",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "If F-100 were dropped outright with no replacement use of the freed machine hours, by how many dollars would Corvid's annual operating income decrease? Enter as a positive whole dollar amount (tolerance +/- $1).",
        "Correct": "152000",
        "Explanation": "Dropping F-100 removes its contribution margin of 420,000 and saves only the traceable, avoidable fixed costs of 268,000 (equipment lease 148,000 plus line-specific marketing 120,000), so operating income falls by 152,000 per year (420,000 - 268,000). The allocated 210,000 stays with the company either way and is excluded from the computation. This 152,000 penalty explains why the raw reported segment loss understates the line's true economic value to Corvid. The trap is equating elimination of a reported segment loss with an equivalent operating-income gain; the loss figure includes unavoidable common costs that no decision can recover.",
        "Topic": "Avoidable cost analysis",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Dependencies": []
      },
      {
        "ItemID": "CBQ21-C2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Before considering any use of the freed machine hours, what is the annual dollar advantage of outsourcing F-100 production versus continuing to manufacture it, based on Exhibits 1 and 2?",
        "Correct": "C",
        "Choices": [
          "356,000 advantage - the swing from the reported 58,000 segment loss to the positive outsourced margin.",
          "90,000 disadvantage - the added 3 per unit purchase cost across 30,000 units.",
          "146,000 advantage - avoided traceable fixed costs of 268,000, less 90,000 of added purchase cost, less 32,000 of retained supervision.",
          "178,000 advantage - the correct computation without subtracting the 32,000 of retained supervision."
        ],
        "Explanation": "Outsourcing converts F-100 into a purchased-for-resale item: margin becomes 30,000 x (36 - 25) = 330,000, and 32,000 of supervision remains, giving 298,000 net versus 152,000 earned today - an annual advantage of 146,000. Cross-check: avoided traceable fixed 268,000, less added purchase cost of 3 per unit (90,000), less retained supervision 32,000 = 146,000; both routes agree. The 356,000 swing overstates the case because it credits the line with escaping allocated costs it rarely truly absorbed, and 178,000 forgets the supervisors kept on payroll. The trap is anchoring on the reported segment loss instead of comparing incremental streams.",
        "Topic": "Outsourcing relevant costs",
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
        "ItemID": "CBQ21-C2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which combined course of action should Dana Whitfield recommend to the Executive Committee, and what is its total annual operating-income effect versus the status quo?",
        "Correct": "A",
        "Choices": [
          "Outsource F-100 production and accept the export order; combined annual operating income improves by 218,000.",
          "Drop F-100 production and accept the export order; combined annual operating income improves by 218,000.",
          "Continue manufacturing F-100 and reject the export order because 70 is below the 92 list price on regular valve sales.",
          "Drop F-100 production without replacement activity; eliminating the reported 58,000 segment loss raises operating income by that amount."
        ],
        "Explanation": "The binding constraint is 60,000 machine hours, fully consumed (48,000 by V-200, 12,000 by F-100). Outsourcing releases 12,000 hours, exactly enough for the 6,000-unit export order at 2.0 hours each, so the order carries zero opportunity cost. The combined plan lifts operating income by 146,000 (outsourcing advantage) plus 72,000 (order contribution of 6,000 x (70 - 58)) = 218,000. Dropping instead of outsourcing destroys 152,000 of net contribution to free the same hours, making option B inferior despite its identical-sounding total, and option D actually reduces income by 152,000. The trap is evaluating the three actions in isolation when the shared capacity constraint links them.",
        "Topic": "Combined decision evaluation",
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
        "ItemID": "CBQ21-C2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three considerations justify accepting the export order at 70 dollars per unit? Select the three appropriate statements.",
        "Correct": [
          "The order consumes machine hours freed by the outsourcing arrangement, so its opportunity cost is zero.",
          "The 70 offer price exceeds the 58 variable manufacturing cost per unit, generating positive contribution of 12 per unit.",
          "As a one-time transaction with an export distributor, the order is unlikely to disturb the 92 list price earned on regular V-200 sales."
        ],
        "Choices": [
          "The order consumes machine hours freed by the outsourcing arrangement, so its opportunity cost is zero.",
          "The 70 offer price exceeds the 58 variable manufacturing cost per unit, generating positive contribution of 12 per unit.",
          "Allocating 210,000 of corporate fixed costs across the special-order units lowers their apparent profitability and should block acceptance.",
          "As a one-time transaction with an export distributor, the order is unlikely to disturb the 92 list price earned on regular V-200 sales.",
          "Extending the same 70 price to regular domestic customers next year would expand V-200 market share durably."
        ],
        "Explanation": "At 70 versus 58 variable cost, each special unit contributes 12 on capacity whose alternative use has already been monetized through outsourcing, so the order faces zero opportunity cost (A) and price exceeds incremental variable cost (B). Because the buyer is a one-time export channel, erosion of the 92 list price is limited (D). Option C applies allocation thinking that is irrelevant to short-run capacity decisions, and option E describes precisely the channel-damage risk that the one-time structure avoids. The trap is applying full-cost logic - loading fixed cost or allocations per unit - onto a marginal-capacity pricing decision.",
        "Topic": "Special order relevance",
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
        "ItemID": "CBQ21-C2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each decision element to its correct dollar effect for the coming year, based on the case analysis.",
        "LeftItems": [
          "F-100 segment result as currently reported",
          "Annual penalty if F-100 is dropped outright with no replacement use of capacity",
          "Annual advantage of outsourcing F-100 before considering freed capacity",
          "Contribution margin generated by the export order"
        ],
        "RightItems": [
          "$58,000 segment loss",
          "$152,000 decrease",
          "$146,000 advantage",
          "$72,000 contribution",
          "$80,000 decrease"
        ],
        "Correct": {
          "F-100 segment result as currently reported": "$58,000 segment loss",
          "Annual penalty if F-100 is dropped outright with no replacement use of capacity": "$152,000 decrease",
          "Annual advantage of outsourcing F-100 before considering freed capacity": "$146,000 advantage",
          "Contribution margin generated by the export order": "$72,000 contribution"
        },
        "Explanation": "Each figure traces to the analysis: reported segment loss 58,000 (420,000 - 268,000 - 210,000); drop-without-replacement penalty 152,000 (420,000 - 268,000); outsourcing advantage 146,000 (298,000 net outsourced margin versus 152,000 insourced); order contribution 72,000 (6,000 units x 12). The unused 80,000-decrease figure belongs to the wrong combination - dropping F-100 while still taking the order nets 72,000 - 152,000 = negative 80,000. Pairing each element with its isolated effect lets the committee see why sequencing matters; the trap is letting the reported-loss anchor contaminate the incremental arithmetic.",
        "Topic": "Decision quantification",
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
    "Industry": "Industrial valves and fittings manufacturing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Corvid Precision Components",
    "Stakeholder": "Dana Whitfield, Corporate Controller",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
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
      "Identify avoidable versus allocated costs in keep-or-drop analyses",
      "Quantify outsourcing advantages using incremental contribution streams",
      "Sequence linked decisions under a binding capacity constraint and state the combined dollar effect"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-F1",
    "Title": "Misclassification Pressure and Escalation",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Quantify the financial-statement impact of an improper expense capitalization directed by senior management",
      "Identify the IMA Statement of Ethical Professional Practice standard breached by misleading classification",
      "Apply the IMA conflict-resolution pathway and SOX obligations, including documentation duties and escalation to those charged with governance"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Bluepine Foods, Inc., a frozen-meal manufacturer, is refinancing a 40,000,000 dollar term loan whose lenders will reprice off adjusted EBITDA trends. CFO Diane Kessler directed Corporate Controller Marcus Reyes to record the full 750,000 dollar plant-overhaul invoice package within Machinery and Equipment and to revisit the treatment after the year-end audit. Marcus determined that only 520,000 dollars qualifies for capitalization under ASC 360, leaving 230,000 dollars of routine maintenance improperly capitalized. He must quantify the misstatement and resolve the directive under the IMA Statement of Ethical Professional Practice and the Sarbanes-Oxley framework.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-F1-E1",
        "CaseID": "CBQ21-F1",
        "Type": "email",
        "Title": "Exhibit 1 - Email from CFO Diane Kessler to Controller Marcus Reyes",
        "Purpose": "Establishes the management directive, its refinancing motive, the timing pressure, and the concealment instruction; frames every item's ethical analysis from quantification (Q1, Q2) through escalation and documentation duties (Q3-Q6).",
        "ReferencedBy": [
          "CBQ21-F1-Q1",
          "CBQ21-F1-Q2",
          "CBQ21-F1-Q3",
          "CBQ21-F1-Q4",
          "CBQ21-F1-Q5",
          "CBQ21-F1-Q6"
        ],
        "Body": "From: Diane Kessler, Chief Financial Officer\nTo: Marcus Reyes, Corporate Controller\nSubject: Overhaul invoice package - accounting treatment\n\nMarcus,\n\nWe close the term-loan refinancing in six weeks, and the lenders will reprice off our adjusted EBITDA trend. Record the full 750,000 Line 2 press invoice package to Machinery and Equipment this quarter. We can revisit the classification once the audit is behind us.\n\nPlease keep this between us until then; the plant controllers do not need the distraction. Our guidance range to the board, our covenant headroom, and our incentive targets all depend on hitting the number.\n\nDiane"
      },
      {
        "ExhibitID": "CBQ21-F1-E2",
        "CaseID": "CBQ21-F1",
        "Type": "table",
        "Title": "Exhibit 2 - Invoice Package Classification Schedule",
        "Purpose": "Splits the invoice package between capitalizable overhaul work and routine maintenance, states proper treatments, and provides division operating income and the effective tax rate; supplies the quantification inputs for Q1 and Q2 and context for the qualitative items.",
        "ReferencedBy": [
          "CBQ21-F1-Q1",
          "CBQ21-F1-Q2",
          "CBQ21-F1-Q3",
          "CBQ21-F1-Q4",
          "CBQ21-F1-Q5",
          "CBQ21-F1-Q6"
        ],
        "Headers": [
          "Invoice component",
          "Amount",
          "Proper treatment under ASC 360"
        ],
        "Rows": [
          [
            "Major overhaul - Line 2 press (extends useful life)",
            "$520,000",
            "Capitalize to Machinery and Equipment; depreciate over remaining life"
          ],
          [
            "Routine maintenance and calibration - multiple plants",
            "$230,000",
            "Expense as incurred; benefits current period"
          ],
          [
            "Total recorded to Machinery and Equipment per CFO direction",
            "$750,000",
            "Only the overhaul portion qualifies for capitalization"
          ],
          [
            "Preliminary division operating income (before any correction)",
            "$4,100,000",
            "Misclassification inflates this measure"
          ],
          [
            "Effective tax rate for the period",
            "25%",
            "Applies to quantify after-tax effects"
          ]
        ],
        "DataFormat": "USD whole dollars; tax rate in percent.",
        "AccuracyCheck": "Package reconciles: 520,000 + 230,000 = 750,000 recorded to Machinery and Equipment; the 230,000 routine-maintenance component is the entire misstatement because the 520,000 overhaul was properly capitalized."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-F1-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Per the classification analysis in Exhibit 2, and disregarding any related depreciation effects, by how many dollars does the CFO's directive overstate Bluepine's operating income this period? Enter as a whole dollar amount (tolerance +/- $1).",
        "Correct": "230000",
        "Explanation": "ASC 360 permits capitalization only for expenditures that extend an asset's useful life or increase its capacity; routine maintenance benefits only the current period and must be expensed as incurred. Of the 750,000 package, 520,000 qualifies as a major overhaul, leaving 230,000 improperly capitalized. Operating income is therefore overstated by the full 230,000, roughly 5.6 percent of the 4,100,000 preliminary division operating income - large enough to matter for covenant EBITDA and bonus targets. The trap is assuming an invoice package shares a single accounting treatment; mixed packages must be evaluated component by component before posting.",
        "Topic": "Expense misclassification",
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
        "ItemID": "CBQ21-F1-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Bluepine's 25 percent effective tax rate from Exhibit 2, by how many dollars is NET income overstated by the misclassification? Round to the nearest whole dollar (tolerance +/- $1).",
        "Correct": "172500",
        "Explanation": "With a 25 percent effective rate, the tax effect of the 230,000 pre-tax overstatement is 57,500 (230,000 x 0.25), so net income is overstated by 172,500 (230,000 x 0.75). Taxes do not excuse the misclassification; they merely scale its after-tax footprint, and lenders frequently define covenant EBITDA without tax effects anyway, keeping the full 230,000 in view. Marcus needs both measures when he briefs the audit committee: 230,000 overstating operating income and 172,500 overstating net income. The trap is stopping at the pre-tax figure and leaving governance without the bottom-line magnitude they will ask about first.",
        "Topic": "After-tax misstatement",
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
        "ItemID": "CBQ21-F1-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which principle within the IMA Statement of Ethical Professional Practice is most directly compromised by recording routine maintenance as machinery and equipment?",
        "Correct": "B",
        "Choices": [
          "Competence, because the plant engineering staff lacked the training to perform the overhaul work properly.",
          "Credibility, because the classification presents financial information that fails to communicate fairly and objectively the sources and composition of reported operating income.",
          "Confidentiality, because the invoice amounts were discussed with plant controllers outside the corporate finance function.",
          "Integrity, because the controller accepted gifts from the overhaul vendor during the contract negotiation."
        ],
        "Explanation": "The IMA Credibility standard requires members to communicate information fairly and objectively and to disclose all relevant information that could reasonably influence a user's understanding. Reclassifying maintenance as machinery changes what reported operating income appears to consist of and misleads EBITDA users - squarely a credibility failure. Competence concerns professional expertise and lawful performance, confidentiality protects unauthorized disclosure, and integrity is implicated by the pressure itself even though the defect in the reported numbers is credibility. The trap is defaulting to integrity terminology for every ethical conflict; classify by the specific duty the conduct breaches.",
        "Topic": "IMA credibility standard",
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
        "ItemID": "CBQ21-F1-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "After completing his written analysis, what is Marcus's appropriate first course of action under the IMA resolution pathway?",
        "Correct": "C",
        "Choices": [
          "Resign immediately and file a retaliation claim under SOX Section 806 without raising the issue inside Bluepine.",
          "Comply with the CFO's direction, since certification responsibility rests with the CEO and CFO rather than the controller.",
          "Present the facts through Bluepine's established ethics escalation channel, advancing past the CFO to the audit committee because the CFO is implicated in the directive.",
          "Discuss the reclassification informally with controllers at competing companies to gauge prevailing industry practice."
        ],
        "Explanation": "Under the IMA resolution pathway, the first step is the organization's own established policy: present the facts to the next-higher managerial level not involved in the conflict. Because CFO Kessler originated the directive, escalation moves past her to those charged with governance - the audit committee or its chair - through Bluepine's ethics mechanism. Immediate resignation forfeits the chance to correct the misstatement internally, compliance leaves the controller complicit while transferring certification exposure upward, and external shop talk breaches confidentiality and accomplishes nothing. The trap is treating resignation or leaking as opening moves; the standards sequence internal escalation first.",
        "Topic": "Ethical conflict resolution",
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
        "ItemID": "CBQ21-F1-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three responses represent appropriate professional conduct for Marcus under the IMA Statement and the SOX framework? Select the three appropriate actions.",
        "Correct": [
          "Record the classification analysis, supporting invoices, and management directives contemporaneously in the accounting workpapers.",
          "Quantify the misstatement's effect on operating income, net income, and covenant metrics so the audit committee understands its magnitude.",
          "Escalate through Bluepine's established ethics channel and, if unresolved, present the matter to the audit committee."
        ],
        "Choices": [
          "Postpone any correcting entry until the term-loan refinancing closes so the stronger EBITDA presentation is preserved through negotiations.",
          "Record the classification analysis, supporting invoices, and management directives contemporaneously in the accounting workpapers.",
          "Quantify the misstatement's effect on operating income, net income, and covenant metrics so the audit committee understands its magnitude.",
          "Remove the CFO's email from the accounting files once the external auditors request invoice support.",
          "Escalate through Bluepine's established ethics channel and, if unresolved, present the matter to the audit committee."
        ],
        "Explanation": "Contemporaneous documentation (B), quantified impact (C), and escalation through recognized channels (E) align with IMA guidance and preserve the evidentiary record that SOX contemplates. Deferring correction until the refinancing closes knowingly maintains a misstatement through a financing event, and destroying or withholding the CFO's email once auditors ask would constitute obstruction of the kind SOX Section 802 criminalizes. The trap is believing that private discomfort plus eventual quiet correction satisfies a controller's duties; the standards demand affirmative communication through proper channels, supported by a documented record.",
        "Topic": "Ethical response actions",
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
        "ItemID": "CBQ21-F1-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each professional duty or protection to the framework provision that establishes it.",
        "LeftItems": [
          "Communicating complete information fairly and objectively to financial statement users",
          "Officer certification of financial reports and disclosure controls in each periodic report",
          "Employment protection for individuals who report suspected securities law violations",
          "Criminal penalties for altering or destroying records to impede an official proceeding"
        ],
        "RightItems": [
          "IMA Statement of Ethical Professional Practice - Credibility standard",
          "SOX Section 302 - Corporate responsibility for financial reports",
          "SOX Section 806 - Whistleblower protection",
          "SOX Section 802 - Criminal document alteration penalties",
          "SOX Section 404 - Management assessment of internal controls"
        ],
        "Correct": {
          "Communicating complete information fairly and objectively to financial statement users": "IMA Statement of Ethical Professional Practice - Credibility standard",
          "Officer certification of financial reports and disclosure controls in each periodic report": "SOX Section 302 - Corporate responsibility for financial reports",
          "Employment protection for individuals who report suspected securities law violations": "SOX Section 806 - Whistleblower protection",
          "Criminal penalties for altering or destroying records to impede an official proceeding": "SOX Section 802 - Criminal document alteration penalties"
        },
        "Explanation": "Map each duty to its source: fair, objective communication of complete information is the IMA Credibility standard; officer certification of reports and disclosure controls each period sits in SOX Section 302; employment protection for reporting suspected securities violations is SOX Section 806; and criminal penalties for altering records to impede proceedings sit in SOX Section 802. Section 404 - management's internal-control assessment - is genuine law but matches none of the listed duties, making it the decoy. The trap is memorizing section numbers in isolation; anchor each provision to the specific obligation or protection it creates.",
        "Topic": "Governance frameworks",
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
    "Industry": "Frozen food processing",
    "CompanyType": "Manufacturer",
    "CompanyName": "Bluepine Foods, Inc.",
    "Stakeholder": "Marcus Reyes, Corporate Controller",
    "BusinessFunction": "Financial reporting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
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
      "Quantify pre-tax and after-tax effects of improperly capitalized period costs",
      "Classify ethical breaches against the IMA Statement's four standards",
      "Sequence the IMA resolution pathway and identify the SOX provisions governing certification, documentation, and whistleblower protection"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-065",
    "certification_date": "2026-08-26"
  },
  {
    "CaseID": "CBQ21-A3",
    "Title": "DuPont Diagnosis for Board Review",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Calculate profitability, activity, and leverage ratios from condensed financial statements",
      "Decompose return on equity with the DuPont framework",
      "Interpret year-over-year component trends for governance reporting"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Northwind Ceramics, a mid-sized producer of glazed porcelain tile, watched return on equity slide even though sales grew during FY2025. Board chair Alan Whitfield has asked CFO Elena Marsh to explain the decline using DuPont decomposition ahead of the autumn strategy session, so the board can judge whether softer margins or balance-sheet choices deserve priority attention.",
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A3-E1",
        "CaseID": "CBQ21-A3",
        "Type": "email",
        "Title": "Exhibit 1 - Finance Committee Request",
        "Purpose": "Frames the board task: attribute the ROE decline by DuPont component and assess coverage soundness.",
        "ReferencedBy": [
          "CBQ21-A3-Q3",
          "CBQ21-A3-Q5",
          "CBQ21-A3-Q6"
        ],
        "Body": "From: Alan Whitfield, Chair, Finance Committee, Northwind Ceramics Board of Directors. To: Elena Marsh, CFO. Subject: ROE walk for the autumn strategy session. Elena - the committee wants a clear walk from last year's return on equity to this year's before we meet. Please come prepared to show which DuPont component moved the needle, what the balance sheet contributed, and whether our coverage position remains sound. Keep it brief, and attach the condensed statements as support."
      },
      {
        "ExhibitID": "CBQ21-A3-E2",
        "CaseID": "CBQ21-A3",
        "Type": "table",
        "Title": "Exhibit 2 - Condensed Income Statements",
        "Purpose": "Provides sales, operating income, interest, tax, and net income for both fiscal years consumed by margin, DuPont, and coverage computations.",
        "ReferencedBy": [
          "CBQ21-A3-Q1",
          "CBQ21-A3-Q2",
          "CBQ21-A3-Q3",
          "CBQ21-A3-Q4",
          "CBQ21-A3-Q5",
          "CBQ21-A3-Q6"
        ],
        "Headers": [
          "Line Item",
          "FY2025",
          "FY2024"
        ],
        "Rows": [
          [
            "Net sales",
            "$12,500,000",
            "$11,800,000"
          ],
          [
            "Operating income (EBIT)",
            "$1,240,000",
            "$1,440,000"
          ],
          [
            "Interest expense",
            "$240,000",
            "$260,000"
          ],
          [
            "Income before income taxes",
            "$1,000,000",
            "$1,180,000"
          ],
          [
            "Income tax expense (25%)",
            "$250,000",
            "$295,000"
          ],
          [
            "Net income",
            "$750,000",
            "$885,000"
          ]
        ],
        "DataFormat": "US dollars, whole dollars; fiscal years ended December 31",
        "AccuracyCheck": "EBIT minus interest equals pre-tax income in both years; tax at 25% reconciles to net income ($1,000,000 x 0.75 = $750,000; $1,180,000 x 0.75 = $885,000). Verified twice."
      },
      {
        "ExhibitID": "CBQ21-A3-E3",
        "CaseID": "CBQ21-A3",
        "Type": "table",
        "Title": "Exhibit 3 - Condensed Balance Sheets",
        "Purpose": "Provides year-end assets, liabilities, and equity used for turnover, equity multiplier, and return on equity.",
        "ReferencedBy": [
          "CBQ21-A3-Q2",
          "CBQ21-A3-Q3",
          "CBQ21-A3-Q5",
          "CBQ21-A3-Q6"
        ],
        "Headers": [
          "Line Item",
          "FY2025",
          "FY2024"
        ],
        "Rows": [
          [
            "Total assets",
            "$8,000,000",
            "$7,200,000"
          ],
          [
            "Total liabilities",
            "$3,200,000",
            "$2,800,000"
          ],
          [
            "Total shareholders' equity",
            "$4,800,000",
            "$4,400,000"
          ]
        ],
        "DataFormat": "US dollars, whole dollars; year-end balances are the stated measurement basis",
        "AccuracyCheck": "Liabilities plus equity equals total assets in both years ($3,200,000 + $4,800,000 = $8,000,000; $2,800,000