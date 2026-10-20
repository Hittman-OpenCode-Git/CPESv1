ge overflow)",
            "$78,000",
            "Three-year sublease offered; tenant begins paying 30 days after vacancy"
          ],
          [
            "Expand finished-goods racking for other product lines",
            "$0",
            "No direct rental cash flow; supports modest carrying-cost savings already reflected elsewhere"
          ],
          [
            "Hold bay vacant pending future expansion",
            "$0",
            "No cash benefit; defers decision one budget cycle"
          ]
        ],
        "DataFormat": "Currency in USD; annual net cash benefit in whole dollars.",
        "AccuracyCheck": "Verified: the sublease at $78,000 per year is the highest-value alternative use, so it sets the opportunity cost; the two internal options contribute no incremental rental cash."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using Exhibit 1, what is the total annual relevant cost of continuing to manufacture the PX-7 module in-house? Exclude any opportunity cost of the released space and round to the nearest whole dollar.",
        "Correct": "864000",
        "Explanation": "Relevant-cost (differential) analysis includes only future costs that differ between alternatives. The relevant cost of making equals direct materials $336,000 + direct labor $192,000 + variable overhead $120,000 + avoidable fixed overhead $216,000 = $864,000. The $252,000 of depreciation and corporate allocations continues even if production stops, so it is excluded; likewise the $46.50 full absorption figure overstates the truly avoidable burden of $36.00 per unit. Verification performed twice: 336,000 + 192,000 + 120,000 + 216,000 = 864,000. The common trap is sweeping unavoidable allocated overhead into the analysis simply because it sits on the product-cost summary, which inflates apparent savings from outsourcing by $252,000.",
        "Topic": "Relevant costs",
        "Subtopic": "Avoidable versus unavoidable costs",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Relevant cost of making = avoidable variable costs + avoidable fixed costs",
        "CommonTrapReference": "Including unavoidable allocated fixed overhead in the relevant-cost pool",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing",
          "avoidable costs"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Incorporating the best alternative use of the assembly bay from Exhibit 3 and the quotation in Exhibit 2, what is the net annual financial disadvantage of accepting Vantage's offer? Enter the amount as a positive whole dollar.",
        "Correct": "162000",
        "Explanation": "Under differential analysis with opportunity cost, net cost of buying = (24,000 units x $46.00) - $78,000 sublease income = $1,104,000 - $78,000 = $1,026,000, while the relevant cost of making from Exhibit 1 is $864,000. Buying is therefore worse by $1,026,000 - $864,000 = $162,000 per year. Cross-check using the equivalent presentation that adds the forgone rent to the make side: $864,000 + $78,000 = $942,000 versus $1,104,000 of purchase cost, again a $162,000 gap, confirming the result. The classic error compares the $46.00 quote to the $46.50 full cost and concludes a $12,000 saving ($0.50 x 24,000) when the correct comparison shows a $162,000 loss.",
        "Topic": "Opportunity cost",
        "Subtopic": "Net advantage or disadvantage of an alternative",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Net disadvantage of buying = net purchase cost - relevant cost of making",
        "CommonTrapReference": "Comparing quote to full absorption cost and ignoring the $78,000 sublease",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "differential analysis",
          "opportunity cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Which statement correctly identifies the cost inputs relevant to the outsourcing recommendation?",
        "Choices": [
          "All $1,116,000 of recorded manufacturing cost, because every element disappears once production ends",
          "Direct materials, direct labor, variable overhead, avoidable fixed overhead, and the $78,000 of sublease income given up if production continues",
          "Direct materials, direct labor, and variable overhead only, because the fixed overhead pool cannot change within the decision horizon",
          "The $46.00 purchase price compared with the $46.50 full cost per unit, together with the $252,000 of unavoidable corporate allocations"
        ],
        "Correct": "B",
        "Explanation": "Relevance requires that a cost be future and differential between alternatives. Option B captures exactly that set: the $864,000 of avoidable manufacturing cost (verified: 336,000 + 192,000 + 120,000 + 216,000) plus the $78,000 opportunity cost of the sublease, matching Exhibit 3's highest-value alternative use. Option A fails because the $252,000 unavoidable allocation persists under either choice, as Exhibit 1 states. Option C wrongly discards the $216,000 avoidable fixed slice, which does disappear with discontinuation. Option D mixes irrelevant data twice: it benchmarks against full absorption cost and re-adds the very allocations that do not differ, double-counting about $264,000 of distortion relative to the correct $942,000 total make-side burden.",
        "Topic": "Cost relevance",
        "Subtopic": "Identifying differential costs in outsourcing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating all recorded product cost as differential or all fixed cost as irrelevant",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "relevant costing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "At what purchase price per unit from Vantage would Kestrel be financially indifferent between making and buying the module, after considering the sublease alternative?",
        "Choices": [
          "$36.00 per unit",
          "$32.75 per unit",
          "$43.25 per unit",
          "$39.25 per unit"
        ],
        "Correct": "D",
        "Explanation": "Set the net cost of buying equal to the relevant cost of making: 24,000 x P - $78,000 = $864,000, so 24,000P = $942,000 and P = $39.25. Verification: 24,000 x $39.25 = $942,000; $942,000 - $78,000 = $864,000, which ties to Exhibit 1's avoidable cost. Any quote below $39.25 makes purchasing cheaper; above it, making wins. The distractors map to real errors: $36.00 omits the $3.25 per-unit opportunity charge ($78,000 / 24,000); $32.75 subtracts instead of adds it ($36.00 - $3.25); and $43.25 wrongly starts from the $46.50 full cost and deducts the same $3.25, anchoring on data that includes $10.50 of unavoidable overhead per unit.",
        "Topic": "Indifference analysis",
        "Subtopic": "Break-even purchase price",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": true,
        "FormulaReference": "Indifference price = (relevant make cost + opportunity cost) / units",
        "CommonTrapReference": "Omitting the per-unit opportunity cost or anchoring on full absorption cost",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "indifference point",
          "opportunity cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which THREE statements describe valid considerations Dana should raise with management alongside the quantitative analysis? Select exactly three.",
        "Choices": [
          "Vantage holds its quoted price firm for three years, stabilizing a major input cost against market volatility",
          "Internal quality records indicate supplier-built modules have historically shown a higher defect rate, raising expected warranty exposure",
          "The assembly team holds proprietary calibration expertise that would be difficult to rebuild if the supplier relationship failed",
          "Unavoidable fixed overhead of $252,000 will be eliminated once in-house production ends",
          "Because recorded manufacturing cost falls from $1,116,000 to $1,104,000 under the quote, qualitative factors cannot change the decision"
        ],
        "Correct": [
          "Vantage holds its quoted price firm for three years, stabilizing a major input cost against market volatility",
          "Internal quality records indicate supplier-built modules have historically shown a higher defect rate, raising expected warranty exposure",
          "The assembly team holds proprietary calibration expertise that would be difficult to rebuild if the supplier relationship failed"
        ],
        "Explanation": "Sound evaluation pairs the $162,000 quantitative disadvantage with strategic evidence. The first statement reflects Exhibit 2's contractual price hold, a genuine risk-transfer benefit; the second flags a quality-driven cost not captured in the model; the third warns about irreversible loss of tacit capability that could raise future switching costs. The fourth statement is factually wrong because unavoidable means the $252,000 persists under either alternative, by definition and per Exhibit 1. The fifth misreads the numbers: the apparent $12,000 recorded-cost saving reverses into a $162,000 economic loss once opportunity cost enters, and even where arithmetic favored buying, qualitative factors could still overturn it. Verification anchor: $1,104,000 - $78,000 = $1,026,000 versus $864,000 to make. This explanation directly addresses why the selected choice is correct based on the exhibit data.",
        "Topic": "Qualitative factors",
        "Subtopic": "Strategic considerations in outsourcing",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assuming recorded-cost comparisons settle decisions that carry quality and capability risk",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "qualitative analysis",
          "strategic sourcing"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C2-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each decision element from the PX-7 analysis to the value or label it carries in the exhibits. Each right-side item is used at most once; some are distractors.",
        "LeftItems": [
          "Avoidable fixed overhead",
          "Opportunity cost of released space",
          "Indifference purchase price per unit",
          "Irrelevant recorded cost element"
        ],
        "RightItems": [
          "$216,000",
          "$78,000",
          "$39.25",
          "$252,000",
          "$46.50",
          "$1,116,000"
        ],
        "Correct": {
          "Avoidable fixed overhead": "$216,000",
          "Opportunity cost of released space": "$78,000",
          "Indifference purchase price per unit": "$39.25",
          "Irrelevant recorded cost element": "$252,000"
        },
        "Explanation": "Each mapping follows directly from the verified figures: line supervision and equipment leases of $216,000 vanish if production stops, making them the avoidable fixed block; the Meridian sublease at $78,000 per year is the best alternative use of the bay, hence the opportunity cost; setting 24,000P - 78,000 = 864,000 yields the $39.25 indifference price; and the $252,000 depreciation-and-allocation layer continues regardless of the choice, marking it irrelevant. The unused distractors are the $46.50 full unit cost, which embeds both relevant and irrelevant layers, and the $1,116,000 total recorded cost, which no single element represents. Arithmetic check repeated: 216,000 + 252,000 = 468,000 total fixed overhead, consistent with Exhibit 1's rows.",
        "Topic": "Decision elements",
        "Subtopic": "Mapping concepts to values",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Assigning the full unit cost or total recorded cost to a single decision element",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "cost classification"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-D3",
    "Title": "Enterprise Risk Register Refresh",
    "SectionTags": [
      "D"
    ],
    "BlueprintDomain": "Risk Management",
    "BlueprintObjectives": [
      "Assess inherent and residual risk using likelihood and impact scales",
      "Evaluate risk scores against board-approved risk appetite thresholds",
      "Select appropriate risk responses across accept, reduce, share, and avoid categories"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 28,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Harborview Logistics, a Tacoma-based third-party logistics provider serving Pacific Northwest importers, is rebuilding its enterprise risk register after a ransomware attack disabled a competitor's dispatch platform for nine days. Chief Risk Officer Priya Raman must present scored inherent and residual ratings for the four priority risks, identify any position that breaches the board-approved appetite statement, and recommend a treatment response for each exception ahead of the October board meeting. The board has warned that unexplained appetite breaches will trigger an external assurance review.",
    "Industry": "Third-party logistics",
    "CompanyType": "Service provider",
    "CompanyName": "Harborview Logistics",
    "Stakeholder": "Priya Raman, Chief Risk Officer",
    "BusinessFunction": "Enterprise risk management",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "ERM",
      "risk register",
      "risk appetite",
      "COSO ERM"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 93,
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
      "Compute inherent and residual risk scores from likelihood and impact ratings",
      "Interpret residual scores against a quantified risk appetite statement",
      "Match risk responses to score drivers and control maturity",
      "Design governance practices that keep a risk register decision-useful"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-D3-E1",
        "CaseID": "CBQ22-D3",
        "Type": "table",
        "Title": "Enterprise Risk Register - FY2027 Refresh (Priority Risks)",
        "Purpose": "Supplies the likelihood and impact ratings before controls and after controls for each priority risk, together with the key controls credited, feeding every scoring, appetite, and response item.",
        "ReferencedBy": [
          "CBQ22-D3-Q1",
          "CBQ22-D3-Q2",
          "CBQ22-D3-Q3",
          "CBQ22-D3-Q4",
          "CBQ22-D3-Q6"
        ],
        "Headers": [
          "Risk ID",
          "Risk Description",
          "Inherent Likelihood (1-5)",
          "Inherent Impact (1-5)",
          "Key Controls In Place",
          "Residual Likelihood (1-5)",
          "Residual Impact (1-5)"
        ],
        "Rows": [
          [
            "R-01",
            "Cyberattack disabling the transportation management system",
            "4",
            "5",
            "Multi-factor authentication, network segmentation, tested backup recovery",
            "2",
            "5"
          ],
          [
            "R-02",
            "Port congestion delaying Puget Sound container pickup windows",
            "4",
            "3",
            "Dual-carrier drayage contracts, dynamic appointment scheduling",
            "3",
            "2"
          ],
          [
            "R-03",
            "Diesel price spikes compressing dedicated-lane margins",
            "3",
            "4",
            "Twelve-month fixed-price fuel contracts covering 70 percent of burn",
            "2",
            "3"
          ],
          [
            "R-04",
            "Cargo theft from yards and trailers",
            "3",
            "4",
            "GPS trailer locks, fenced yards, driver theft-awareness training",
            "2",
            "3"
          ]
        ],
        "DataFormat": "Likelihood and impact on defined 1-to-5 scales; one row per priority risk.",
        "AccuracyCheck": "Verified twice: inherent scores 4x5=20, 4x3=12, 3x4=12, 3x4=12; residual scores 2x5=10, 3x2=6, 2x3=6, 2x3=6; only R-01 residual (10) exceeds the appetite ceiling of 8."
      },
      {
        "ExhibitID": "CBQ22-D3-E2",
        "CaseID": "CBQ22-D3",
        "Type": "text",
        "Title": "Board Risk Appetite Statement (Excerpt)",
        "Purpose": "Defines the scoring anchors and the quantified appetite bands against which residual scores are judged, governing which risks require additional treatment.",
        "ReferencedBy": [
          "CBQ22-D3-Q3",
          "CBQ22-D3-Q4",
          "CBQ22-D3-Q5"
        ],
        "Body": "Adopted by the Harborview Logistics board of directors, March 2027.\n\nScoring anchors. Likelihood: 1 = remote (less than once in five years); 2 = unlikely (about once in five years); 3 = possible (about once in two years); 4 = likely (roughly annually); 5 = almost certain (multiple times per year). Impact: 1 = negligible (<$25,000 or no service disruption); 3 = material ($250,000-$999,000 or disruption up to 48 hours); 5 = severe (>$2,500,000 or disruption beyond 96 hours).\n\nAppetite bands. Residual score 9 or higher: outside appetite; an additional response with named owner and dated milestone is required before the next board cycle. Residual score 6 to 8: inside appetite but subject to active monitoring, quarterly key-risk-indicator review, and a named accountable owner. Residual score 5 or below: acceptable; periodic reassessment at the annual refresh.\n\nReporting expectation. Exceptions are reported with the driver of the score (likelihood versus impact), the controls credited, and the recommended response category."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-D3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Using the register's scales, what is the inherent risk score for cargo theft from yards and trailers (R-04)? Enter a whole number.",
        "Correct": "12",
        "Explanation": "Under COSO ERM practice, inherent risk is scored before considering controls as likelihood times impact. The register rates R-04 at inherent likelihood 3, meaning roughly an annual occurrence industry-wide, and inherent impact 4, reflecting losses approaching seven figures across a loaded trailer and customer penalties. Multiplying gives 3 x 4 = 12. Scoring inherently first establishes the baseline from which control effectiveness is later demonstrated; blending judgments about existing controls into the inherent rating hides mitigation value and is the most common register-building error. Verification: 3 x 4 = 12, and the same discipline produces 20 for R-01, 12 for R-02, and 12 for R-03, matching every row of Exhibit 1.",
        "Topic": "Risk assessment",
        "Subtopic": "Inherent risk scoring",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Inherent risk score = likelihood rating x impact rating",
        "CommonTrapReference": "Mixing control-effectiveness judgments into the inherent score",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "inherent risk",
          "risk scoring"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "After crediting the controls listed for R-01, what is the residual risk score for the cyberattack on the transportation management system? Enter a whole number.",
        "Correct": "10",
        "Explanation": "Residual risk equals residual likelihood multiplied by residual impact after controls take effect. Multi-factor authentication, segmentation, and tested backups cut the success frequency of intrusion attempts, moving residual likelihood from 4 down to 2, while impact stays at 5 because a successful attack still halts dispatch beyond the 96-hour severe threshold. The residual score is therefore 2 x 5 = 10, half the inherent 4 x 5 = 20. Verification repeated: 2 x 5 = 10. Controls usually move likelihood faster than catastrophic impact, so a residual score implying the impact dimension also collapsed (for example 2 x 2) should trigger challenge in review, since backup recovery shortens downtime but cannot prevent a severe event from occurring once defenses fail.",
        "Topic": "Risk assessment",
        "Subtopic": "Residual risk scoring",
        "Difficulty": "Moderate-Easy",
        "DifficultyScore": 2,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Residual risk score = residual likelihood x residual impact",
        "CommonTrapReference": "Assuming strong preventive controls also shrink catastrophic impact ratings",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "residual risk",
          "cyber risk"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Applying the appetite bands in the board statement to the refreshed register, which risk sits outside appetite after controls and requires an additional response before the October board cycle?",
        "Choices": [
          "Cyberattack disabling the transportation management system, whose residual score of 10 exceeds the ceiling of 8",
          "Port congestion on Puget Sound pickup windows, residual 6, inside the monitored band",
          "Diesel price spikes compressing dedicated-lane margins, residual 6, inside the monitored band",
          "Cargo theft from yards and trailers, residual 6, inside the monitored band"
        ],
        "Correct": "A",
        "Explanation": "The board statement fixes the boundary at residual 8: scores of 9 or above fall outside appetite and demand further treatment with a named owner and dated milestone, while 6 through 8 remain inside but monitored, and 5 or below is acceptable. Only R-01 breaches the line, at 2 x 5 = 10, because its impact dimension stays severe even after excellent likelihood-reducing controls. R-02 lands at 3 x 2 = 6, R-03 at 2 x 3 = 6, and R-04 at 2 x 3 = 6, all within tolerance. Verification: 10 > 8 while 6 <= 8 for the others. Testing inherent rather than residual scores against the bands would falsely push R-02 and R-03 (both inherent 12) onto the exception list and overstate the assurance workload.",
        "Topic": "Risk appetite",
        "Subtopic": "Post-control exceptions",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Testing inherent instead of residual scores against appetite bands",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "risk appetite",
          "governance"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Given R-01's position after current controls, which response should Priya recommend to the board?",
        "Choices": [
          "Accept the exposure because the inherent score has been stable across two consecutive refreshes",
          "Share by raising cyber insurance limits alone while leaving the control roadmap frozen",
          "Avoid by exiting digital freight brokerage and returning to manual phone-based dispatch",
          "Reduce further by funding the remaining zero-trust phases, tabletop incident-response drills, and vendor-access reviews"
        ],
        "Correct": "D",
        "Explanation": "Response selection follows the score's driver. A residual of 10 cannot be accepted under the stated appetite, ruling out passive retention. Avoidance would abandon a core revenue channel disproportionate to the exposure, and sharing through higher insurance limits leaves the breach trajectory untouched while premiums rise; insurers increasingly condition limits on demonstrated control maturity anyway. Because likelihood is already well controlled at 2, further reduction targets containment and recovery speed through zero-trust completion, exercised playbooks, and vendor governance, which either pulls impact resilience up or pushes likelihood toward 1, moving 2 x 5 = 10 back inside the ceiling of 8. Verification: reaching residual 8 requires 2 x 4 or 1 x 5, both achievable through impact-side hardening alone.",
        "Topic": "Risk response",
        "Subtopic": "Treatment selection for exceptions",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Selecting insurance alone for an exception driven by unreduced impact",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "risk response",
          "mitigation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which THREE actions would most strengthen the credibility of the refreshed register when Priya presents it to the board? Select exactly three.",
        "Choices": [
          "Anchor every rating to the published scale definitions and document the rationale for each movement from inherent to residual",
          "Round all residual scores down by one point to reflect management optimism about the control environment",
          "Assign a named executive owner and a dated treatment milestone to every risk scored 6 or higher",
          "Refresh key-risk-indicator dashboards quarterly so trend movements trigger reassessment between annual cycles",
          "Present only the four priority risks and withhold the remainder of the inventory to keep the board deck short"
        ],
        "Correct": [
          "Anchor every rating to the published scale definitions and document the rationale for each movement from inherent to residual",
          "Assign a named executive owner and a dated treatment milestone to every risk scored 6 or higher",
          "Refresh key-risk-indicator dashboards quarterly so trend movements trigger reassessment between annual cycles"
        ],
        "Explanation": "Register credibility rests on traceability, accountability, and monitoring. Anchoring scores to the adopted definitions lets two assessors reach the same number and survives audit challenge; ownership with dated milestones operationalizes the board's own requirement for monitored-band risks; and quarterly indicator refresh catches drift before the annual cycle, converting the register from a static artifact into a live control. Deflating scores to signal confidence corrupts the appetite test the board relies on and invites the external assurance review flagged in the scenario. Withholding most of the inventory defeats enterprise-wide visibility and hides aggregate concentration effects. Consistency check: every band in Exhibit 2 presumes honest scores, so any systematic bias invalidates the exception logic applied to R-01's residual 10.",
        "Topic": "Risk governance",
        "Subtopic": "Register quality practices",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Treating score presentation choices as neutral rather than governance-relevant",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "ERM governance",
          "board reporting"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-D3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match each COSO ERM response category to the example that best illustrates it for Harborview. Each right-side item is used at most once; one is a distractor.",
        "LeftItems": [
          "Risk acceptance",
          "Risk reduction",
          "Risk sharing",
          "Risk avoidance"
        ],
        "RightItems": [
          "Retaining port congestion within the monitored band with quarterly indicator review",
          "Adding telematics locks and dual-carrier drayage contracts to cut theft and delay exposure",
          "Buying cargo liability coverage backed by contractual indemnities from owner-operators",
          "Exiting the refrigerated pharmaceutical vertical entirely after an appetite breach",
          "Doubling marketing spend in the highest-scoring risk segment to grow share"
        ],
        "Correct": {
          "Risk acceptance": "Retaining port congestion within the monitored band with quarterly indicator review",
          "Risk reduction": "Adding telematics locks and dual-carrier drayage contracts to cut theft and delay exposure",
          "Risk sharing": "Buying cargo liability coverage backed by contractual indemnities from owner-operators",
          "Risk avoidance": "Exiting the refrigerated pharmaceutical vertical entirely after an appetite breach"
        },
        "Explanation": "COSO ERM sorts responses by their effect on exposure. Acceptance keeps the risk without new treatment, which fits congestion held inside appetite with monitoring; reduction applies controls or process changes that lower likelihood or impact, matching added physical and carrier safeguards; sharing transfers part of the exposure to another party through insurance or indemnities; and avoidance exits the activity generating the risk altogether, as exiting the pharma vertical would. The distractor describes deliberately increasing exposure for growth reasons, which is pursuing risk for return, a portfolio strategy decision rather than one of the four treatment responses. Cross-check: each matched example mirrors a control or posture already visible in Exhibit 1 or the appetite statement, keeping the case internally consistent.",
        "Topic": "Risk responses",
        "Subtopic": "Response category mapping",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Classifying growth-oriented risk pursuit as a treatment response",
        "EstimatedMinutes": 6,
        "ExplanationVersion": 1,
        "Tags": [
          "COSO ERM",
          "response categories"
        ],
        "Dependencies": []
      }
    ],
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-F2",
    "Title": "Covenant Pressure and Invoice Deferral",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Identify violations of the IMA Statement of Ethical Professional Practice in reporting-pressure situations",
      "Apply the IMA resolution model, including escalation beyond the involved supervisor",
      "Evaluate documentation and communication duties when integrity is threatened"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "ScenarioText": "Atlas Greenhouses, a Colorado wholesale grower operating 40 acres under glass, tests a 1.40 minimum current ratio covenant at each quarter end, and Controller Daniel Reyes, CPA, has identified $310,000 of June supplier invoices still awaiting entry two days before June 30 close. Chief Financial Officer Sandra Kimball instructs Daniel to hold the invoices until July 8 so the quarter reports a compliant ratio, noting the relationship manager has already been told the covenant passes. Facing direct pressure from his supervisor, Daniel must quantify the effect of the deferral, identify the standards implicated, and execute the resolution steps his professional certification requires.",
    "Industry": "Commercial horticulture",
    "CompanyType": "Grower-producer",
    "CompanyName": "Atlas Greenhouses",
    "Stakeholder": "Daniel Reyes, Corporate Controller",
    "BusinessFunction": "Financial reporting and treasury compliance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "IMA ethics",
      "covenant compliance",
      "cut-off",
      "escalation"
    ],
    "CreatedDate": "2026-08-26",
    "ModifiedDate": "2026-08-26",
    "Author": "P2-064 authoring wave",
    "Confidence": 93,
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
      "Quantify how period-cut-off manipulation distorts covenant ratios",
      "Link specific conduct to the IMA standards of ethical professional practice",
      "Sequence escalation correctly when the pressure originates with the immediate supervisor",
      "Document and communicate an ethics conflict in a defensible manner"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F2-E1",
        "CaseID": "CBQ22-F2",
        "Type": "table",
        "Title": "Quarter-End Financial Snapshot - June 30, 2027 (Before Disputed Entries)",
        "Purpose": "Provides the balance-sheet inputs and covenant threshold used to compute the corrected ratio, the distortion caused by deferral, and the breach conclusion.",
        "ReferencedBy": [
          "CBQ22-F2-Q1",
          "CBQ22-F2-Q2",
          "CBQ22-F2-Q3"
        ],
        "Headers": [
          "Line Item",
          "Amount"
        ],
        "Rows": [
          [
            "Current assets at June 30 (preliminary, complete)",
            "$4,200,000"
          ],
          [
            "Current liabilities recorded through June 29 close",
            "$2,800,000"
          ],
          [
            "June supplier invoices received but held for July entry",
            "$310,000"
          ],
          [
            "Loan covenant minimum current ratio",
            "1.40"
          ],
          [
            "Ratio implied if held invoices were entered as of June 30",
            "1.35"
          ]
        ],
        "DataFormat": "Currency in USD, whole dollars; ratio to two decimals.",
        "AccuracyCheck": "Verified twice: corrected liabilities $2,800,000 + $310,000 = $3,110,000; corrected ratio $4,200,000 / $3,110,000 = 1.35 (two decimals), which breaches the 1.40 covenant; reported ratio absent entry = $4,200,000 / $2,800,000 = 1.50."
      },
      {
        "ExhibitID": "CBQ22-F2-E2",
        "CaseID": "CBQ22-F2",
        "Type": "email",
        "Title": "Instruction from CFO Sandra Kimball",
        "Purpose": "Documents the directive creating the ethical conflict, including the timing instruction and the external representation already made to the lender, which frame the escalation and documentation items.",
        "ReferencedBy": [
          "CBQ22-F2-Q3",
          "CBQ22-F2-Q4",
          "CBQ22-F2-Q5",
          "CBQ22-F2-Q6"
        ],
        "Body": "From: Sandra Kimball, Chief Financial Officer, Atlas Greenhouses\nTo: Daniel Reyes, Corporate Controller\nSent: June 28, 2027, 4:52 PM\nSubject: Quarter-end close instruction\n\nDaniel, hold the Bergstrom Supply and Canopy Irrigation invoices until July 8. Entering them now drops us to about 1.35 and puts the covenant call with First Ridge Bank at risk, and I have already told our relationship manager we expect to certify comfortably above 1.40. Payables processing will simply prioritize other batches this week. Do not prepare a separate accrual schedule for these two vendors. I want the flash report showing 1.50 on Thursday. This direction comes from me, so there is nothing further you need to escalate internally.\n\nSandra"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F2-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "If the held supplier invoices were properly recorded as of June 30, what current ratio would Atlas report? Round to two decimal places.",
        "Correct": "1.35",
        "Explanation": "Accrual accountin