when project lives differ.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "The three projects do NOT have similar IRRs or NPVs; Alpha IRR is meaningfully higher than Beta's, and Gamma NPV is meaningfully higher than Alpha's. The criteria conflict on the Alpha-vs-Gamma ordering — that is the analytically interesting case.",
        "ExplanationWrongD": "IRR is fully computable for projects with terminal value — the terminal value is just a year-N cash flow. The IRR criterion is meaningful; it is the ranking that is unreliable for mutually exclusive projects.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ21-E3-Q6",
        "Type": "select",
        "Correct": "Gamma's terminal value ($14M at year 7) is nearer-term and more auditable than Beta's ($6M at year 10) for a specialty line facing technology risk; combined with Gamma's highest NPV ($15.02M) and top customer-base score, the nearer horizon and superior quantified value outweigh Beta's qualitative edge.",
        "Explanation": "The strongest counter-argument is that NPV is only as reliable as its terminal-value assumption. Gamma's $14M terminal value falls at year 7, three years sooner than Beta's $6M salvage estimate on a specialty-alloy line facing technology risk — nearer-horizon terminals carry materially less forecasting risk. On the quantified side, Gamma leads with the highest NPV ($15.02M vs $12.30M) and the top customer-base expansion score among the board's stated alignment factors. The $2.7M NPV gap alone is thin enough to debate, which is why the defense rests on the horizon-plus-customer differentiation rather than the gap itself. Acquisitions are not 'typically preferable' — Beta's longer tail and ESG contribution are real arguments — but on this specific case, the nearer horizon and stronger customer-base expansion justify Gamma.",
        "Topic": "Terminal value credibility",
        "question_state": "Certified",
        "Prompt": "CFO Hoffmann recommends Gamma. The board pushes back, asking why a $48M acquisition (no debt assumed, all-equity) is preferable to Beta (organic capex in Tennessee) given Beta's higher qualitative score and ESG contribution. Evaluate the strongest single counter-argument Hoffmann can deploy to defend Gamma.",
        "Choices": [
          "Gamma's NPV is only $2.7M higher than Beta's; this gap is within the noise of any DCF analysis and cannot be defended to the board.",
          "Gamma's terminal value ($14M at year 7) is nearer-term and more auditable than Beta's ($6M at year 10) for a specialty line facing technology risk; combined with Gamma's highest NPV ($15.02M) and top customer-base score, the nearer horizon and superior quantified value outweigh Beta's qualitative edge.",
          "Gamma is better because acquisitions are categorically preferable to organic capex — M&A delivers instant scale and synergies.",
          "Beta is actually the correct answer and Hoffmann should defer to the board's qualitative preference."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Very Difficult",
        "DifficultyScore": 5,
        "ExplanationCorrect": "The strongest counter-argument is that NPV is only as reliable as its terminal-value assumption. Gamma's $14M terminal value falls at year 7, three years sooner than Beta's $6M salvage estimate on a specialty-alloy line facing technology risk — nearer-horizon terminals carry materially less forecasting risk. On the quantified side, Gamma leads with the highest NPV ($15.02M vs $12.30M) and the top customer-base expansion score among the board's stated alignment factors. The $2.7M NPV gap alone is thin enough to debate, which is why the defense rests on the horizon-plus-customer differentiation rather than the gap itself. Acquisitions are not 'typically preferable' — Beta's longer tail and ESG contribution are real arguments — but on this specific case, the nearer horizon and stronger customer-base expansion justify Gamma.",
        "ExplanationWrongA": "NPV gap within noise is wrong — the $2.7M gap is real and the qualitative differentiation (customer reach, terminal-value credibility) compounds rather than dissipates the difference. DCF noise bands apply to the NPV point estimate, not to the combined NPV-plus-qualitative case for selection.",
        "ExplanationWrongB": "",
        "ExplanationWrongC": "Acquisitions are not categorically preferable to organic capex; the answer must rest on this project's specific economics and strategic context, not a categorical claim.",
        "ExplanationWrongD": "CFO Hoffmann is the analytic authority on capital allocation; she should not capitulate to the board's qualitative preference when quantitative and contextual analysis support Gamma. The defensible move is to deploy the strongest counter-argument, not to defer.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-A4",
    "Title": "Flash Foods: Post-Acquisition Integration Accounting and Goodwill Impairment",
    "SectionTags": [
      "A"
    ],
    "BlueprintDomain": "Financial Statement Analysis",
    "BlueprintObjectives": [
      "Allocate acquisition price to fair value of identifiable assets under ASC 805",
      "Test goodwill for impairment using ASC 350 qualitative and quantitative assessments",
      "Apply ASC 280 operating-segment disclosure thresholds",
      "Reconcile intercompany balances and segment profit after a business combination"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Flash Foods, a packaged-grocery subsidiary of Flash Holdings, completed the acquisition of a regional bakery chain on 1 January of the current fiscal year. CFO Mariela Hoffmann must integrate the target into the consolidated financial statements. The purchase consideration was $180 million in cash. Under ASC 805, the acquisition method requires the acquirer to allocate the purchase price to the fair value of identifiable assets acquired and liabilities assumed, with the residual recognized as goodwill. The purchase price allocation resulted in a $50 million fair-value uplift to property, plant, and equipment (PPE), a $25 million allocation to identifiable intangible assets (primarily customer relationships and a brand name), and $20 million of residual goodwill. Mariela is now three years past the acquisition date and is preparing for the annual goodwill impairment test under ASC 350-20-35. Bakery-segment EBITDA has declined 18% versus the acquisition-date projection because of commodity-cost volatility. Mariela must decide whether the qualitative assessment supports the conclusion that it is \"not more likely than not\" that the reporting unit's fair value is less than its carrying amount, or whether a full quantitative goodwill impairment test is required. In parallel, controller Adaeze Onuorah is preparing the first post-acquisition ASC 280 segment disclosure and needs to confirm whether the bakery chain now constitutes a separately reportable operating segment given the 10% revenue, profit, and asset thresholds. Mariela has asked Adaeze to evaluate intercompany flour-supply transactions between Flash Foods and the bakery unit that must be eliminated in consolidation.",
    "Industry": "Packaged Foods and Bakery Manufacturing",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Foods",
    "Stakeholder": "Mariela Hoffmann, CFO of Flash Foods",
    "BusinessFunction": "Corporate Financial Reporting and Consolidation",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "ASC 805 acquisition method",
      "ASC 350 goodwill impairment",
      "ASC 280 segment reporting",
      "fair value allocation",
      "intercompany elimination",
      "post-merger integration",
      "Flash Foods"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 89,
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
      "Compute residual goodwill under the acquisition method given fair-value uplifts",
      "Apply the qualitative-step framework of ASC 350-20-35 to assess impairment indicators",
      "Evaluate operating-segment reporting using ASC 280 quantitative thresholds",
      "Identify intercompany transactions requiring elimination in consolidation"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-A4-E1",
        "CaseID": "CBQ21-A4",
        "Type": "table",
        "Title": "Exhibit 1 — Purchase Price Allocation for Regional Bakery Acquisition",
        "Description": "Allocation of $180M consideration to identifiable assets and residual goodwill under ASC 805.",
        "Columns": [
          "Component",
          "Amount ($M)"
        ],
        "Rows": [
          [
            "Cash purchase consideration",
            "180.0"
          ],
          [
            "Fair-value uplift to PPE",
            "50.0"
          ],
          [
            "Identifiable intangible assets",
            "25.0"
          ],
          [
            "Residual goodwill",
            "20.0"
          ],
          [
            "Net book value of assets acquired",
            "85.0"
          ],
          [
            "Acquisition-date projected EBITDA (annual)",
            "32.0"
          ],
          [
            "Current-year EBITDA (Year 3)",
            "26.2"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-A4-E2",
        "CaseID": "CBQ21-A4",
        "Type": "table",
        "Title": "Exhibit 2 — Flash Foods Consolidated Segment Metrics (Year 3 Post-Acquisition)",
        "Description": "Segment results used to evaluate ASC 280 reporting thresholds for the bakery chain.",
        "Columns": [
          "Segment",
          "Revenue ($M)",
          "Operating Profit ($M)",
          "Identifiable Assets ($M)"
        ],
        "Rows": [
          [
            "Flash Foods — Grocery",
            "1,420.0",
            "156.0",
            "1,180.0"
          ],
          [
            "Flash Foods — Bakery (acquired)",
            "180.0",
            "11.0",
            "220.0"
          ],
          [
            "Flash Foods — Snacks",
            "310.0",
            "38.0",
            "275.0"
          ],
          [
            "Flash Foods — Frozen",
            "210.0",
            "22.0",
            "180.0"
          ],
          [
            "Consolidated totals",
            "2,120.0",
            "227.0",
            "1,855.0"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-A4-Q1",
        "Type": "select",
        "Correct": "$20 million, the residual after allocating fair value to identifiable net assets ($180M less $85M less $50M less $25M)",
        "Explanation": "Under ASC 805-10-30, the acquisition method requires the acquirer to recognize goodwill as of the acquisition date measured as the excess of the consideration transferred over the net of the acquisition-date amounts of the identifiable assets acquired and liabilities assumed, measured at fair value. Applied to the scenario, $180M consideration less ($85M book value of identifiable net assets + $50M PPE fair-value uplift + $25M intangible allocation = $160M fair value of identifiable net assets) yields $20M residual. The correct answer recognizes goodwill as the residual. A common trap is to capitalize only identifiable intangibles or to record the entire purchase price as goodwill; both ignore the requirement to allocate fair value first.",
        "Topic": "Goodwill measurement in acquisition",
        "question_state": "Certified",
        "Prompt": "Under ASC 805, Flash Foods paid $180M cash for the regional bakery chain. The acquired net assets had a book value of $85M, with fair-value uplifts of $50M to PPE and $25M to identifiable intangibles. Mariela Hoffmann must record goodwill on the acquisition date. What amount of goodwill should Flash Foods recognize?",
        "Choices": [
          "$25 million, equal to the identifiable intangible uplift only",
          "$75 million, equal to the fair-value uplifts in aggregate",
          "$20 million, the residual after allocating fair value to identifiable net assets ($180M less $85M less $50M less $25M)",
          "$180 million, equal to the total purchase consideration transferred"
        ],
        "CorrectChoice": "C",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "Under ASC 805-10-30, the acquisition method requires the acquirer to recognize goodwill as of the acquisition date measured as the excess of the consideration transferred over the net of the acquisition-date amounts of the identifiable assets acquired and liabilities assumed, measured at fair value. Applied to the scenario, $180M consideration less ($85M book value of identifiable net assets + $50M PPE fair-value uplift + $25M intangible allocation = $160M fair value of identifiable net assets) yields $20M residual. The correct answer recognizes goodwill as the residual. A common trap is to capitalize only identifiable intangibles or to record the entire purchase price as goodwill; both ignore the requirement to allocate fair value first.",
        "ExplanationWrongA": "Choosing $25M would record only the intangible allocation as goodwill, ignoring PPE fair-value uplift and the consideration-paid framework under ASC 805.",
        "ExplanationWrongB": "Choosing $75M would sum the fair-value uplifts themselves, but that total is part of allocated fair value, not the unallocated residual that becomes goodwill.",
        "ExplanationWrongD": "Choosing $180M treats the full consideration as goodwill and skips the ASC 805 requirement to first measure identifiable assets and liabilities at fair value.",
        "ExplanationWrongC": "",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ21-A4-Q2",
        "Type": "select",
        "Correct": "The bakery segment fails the revenue and profit thresholds but exceeds the 10% asset threshold (11.9%), so it is reportable.",
        "Explanation": "ASC 280-10-50 requires a segment to be reported separately if any of three 10% tests is met: revenue ≥10% of combined revenue, absolute profit/loss ≥10% of combined profit/loss, or identifiable assets ≥10% of combined assets. Applied to Exhibit 2, bakery revenue of $180M is 8.5% (just below 10%), bakery operating profit of $11M is 4.8%, and bakery identifiable assets of $220M is 11.9%, which exceeds the asset threshold. Therefore the bakery segment is reportable. Interpretation: the bakery's asset base, inflated by the $50M PPE fair-value uplift and $25M intangibles, drives separability rather than current-period profit. A common trap is to test only revenue, missing the asset threshold that ASC 280 applies in parallel.",
        "Topic": "Business combination assessment",
        "question_state": "Certified",
        "Prompt": "Using Exhibit 2, Adaeze Onuorah must determine whether the acquired bakery chain constitutes a separately reportable operating segment under ASC 280. The quantitative thresholds are 10% of combined revenue, 10% of combined operating profit (absolute), and 10% of combined identifiable assets. What is the correct conclusion?",
        "Choices": [
          "The bakery segment fails the revenue and profit thresholds but exceeds the 10% asset threshold (11.9%), so it is reportable.",
          "The bakery segment exceeds at least the 10% revenue and 10% asset thresholds, so it is reportable.",
          "Because all three segments above the threshold are reportable, the bakery fails the 75% revenue coverage test and must be reported.",
          "Acquired businesses are exempt from the 10% test for three years following the acquisition, so the bakery is not reportable."
        ],
        "CorrectChoice": "A",
        "CognitiveLevel": "Apply",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "ExplanationCorrect": "ASC 280-10-50 requires a segment to be reported separately if any of three 10% tests is met: revenue ≥10% of combined revenue, absolute profit/loss ≥10% of combined profit/loss, or identifiable assets ≥10% of combined assets. Applied to Exhibit 2, bakery revenue of $180M is 8.5% (just below 10%), bakery operating profit of $11M is 4.8%, and bakery identifiable assets of $220M is 11.9%, which exceeds the asset threshold. Therefore the bakery segment is reportable. Interpretation: the bakery's asset base, inflated by the $50M PPE fair-value uplift and $25M intangibles, drives separability rather than current-period profit. A common trap is to test only revenue, missing the asset threshold that ASC 280 applies in parallel.",
        "ExplanationWrongA": "",
        "ExplanationWrongC": "Invoking the 75% revenue-coverage test is an ASC 280 practical limit, not a fail-the-test mechanism, and is misapplied here because the bakery only needs to meet one 10% test.",
        "ExplanationWrongD": "ASC 280 provides no three-year exemption for acquired businesses; the 10% tests apply in every reporting period following the acquisition.",
        "ExplanationWrongB": "Choice B reaches the right conclusion for the wrong reason: bakery revenue of $180M is 8.5% of combined revenue, below the 10% threshold — only the asset test (11.9%) is met. Selecting B endorses a false computation even where the verdict coincides.",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ21-A4-Q3",
        "Type": "select",
        "Correct": "The qualitative assessment considers macroeconomic, industry, and reporting-unit-specific factors to determine whether it is not more likely than not that fair value is below carrying amount.",
        "Explanation": "ASC 350-20-35-3 permits an entity to first perform a qualitative assessment of whether it is not more likely than not (i.e., less than 50% likelihood) that the fair value of a reporting unit is less than its carrying amount, considering events and circumstances such as macroeconomic conditions, industry and market considerations, cost factors, and reporting-unit-specific operating trends. Applied to Flash Foods, an 18% EBITDA decline is a relevant negative indicator but is only one factor, not a stand-alone trigger. Interpretation: the qualitative step is a holistic weighing process, and management must document the weight of evidence. A common trap is to treat a single negative trend as automatically conclusive of impairment.",
        "Topic": "Goodwill impairment qualitative assessment",
        "question_state": "Certified",
        "Prompt": "Three years after the acquisition, bakery-segment EBITDA has declined 18% from the acquisition-date projection of $32M. Mariela Hoffmann must assess goodwill impairment under ASC 350-20-35. Which analysis of the qualitative assessment is most appropriate?",
        "Choices": [
          "The 18% EBITDA shortfall is, by itself, determinative evidence of impairment, and a full quantitative test is mandatory.",
          "The qualitative assessment may be skipped because any negative trend automatically requires a quantitative goodwill impairment test.",
          "The qualitative assessment considers macroeconomic, industry, and reporting-unit-specific factors to determine whether it is not more likely than not that fair value is below carrying amount.",
          "ASC 350 allows a qualitative assessment only in the year of acquisition; thereafter, quantitative testing is required annually."
        ],
        "CorrectChoice": "C",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 350-20-35-3 permits an entity to first perform a qualitative assessment of whether it is not more likely than not (i.e., less than 50% likelihood) that the fair value of a reporting unit is less than its carrying amount, considering events and circumstances such as macroeconomic conditions, industry and market considerations, cost factors, and reporting-unit-specific operating trends. Applied to Flash Foods, an 18% EBITDA decline is a relevant negative indicator but is only one factor, not a stand-alone trigger. Interpretation: the qualitative step is a holistic weighing process, and management must document the weight of evidence. A common trap is to treat a single negative trend as automatically conclusive of impairment.",
        "ExplanationWrongA": "Treating the EBITDA decline as determinative overlooks the qualitative-assessment framework, which weighs multiple indicators before a quantitative test becomes mandatory.",
        "ExplanationWrongB": "Skipping the qualitative assessment is contrary to ASC 350-20-35, which explicitly permits it as an optional first step in the annual test.",
        "ExplanationWrongD": "ASC 350 imposes no year-of-acquisition limit on the qualitative assessment; reporting entities may elect it in any subsequent annual test.",
        "ExplanationWrongC": "",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ21-A4-Q4",
        "Type": "select",
        "Correct": "Eliminate the $2M of unrealized intercompany profit still embedded in ending inventory to prevent overstating consolidated assets and profit.",
        "Explanation": "ASC 810-10-45 requires elimination of all intercompany balances, transactions, revenues, and expenses in the consolidated financial statements, including the deferred profit element. Applied to Flash Foods, the $14M sale and $14M cost of sales must be eliminated in their entirety, and the $2M markup still residing in the bakery's ending inventory must be removed because that profit is unrealized from the consolidated group's perspective. Interpretation: leaving the deferred profit on the books overstates consolidated inventory and consolidated net income. A common trap is to defer the elimination to the period of external sale, which would still overstate the current period.",
        "Topic": "Intercompany profit elimination",
        "question_state": "Certified",
        "Prompt": "During consolidation, the bakery segment purchased $14M of flour annually from Flash Foods' Grocery segment at a markup that produced $2M of intercompany profit still sitting in ending inventory. How should Adaeze Onuorah eliminate this intercompany activity in consolidation?",
        "Choices": [
          "Eliminate $14M of revenue and $14M of cost of sales, with no further adjustment because inventory is sold to third parties.",
          "Eliminate the $2M of unrealized intercompany profit still embedded in ending inventory to prevent overstating consolidated assets and profit.",
          "Leave the $2M in place because intercompany profit is recognized only when the related inventory is sold externally.",
          "Reclassify the $2M to noncontrolling interest in equity rather than eliminate it from consolidated profit."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Analyze",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 810-10-45 requires elimination of all intercompany balances, transactions, revenues, and expenses in the consolidated financial statements, including the deferred profit element. Applied to Flash Foods, the $14M sale and $14M cost of sales must be eliminated in their entirety, and the $2M markup still residing in the bakery's ending inventory must be removed because that profit is unrealized from the consolidated group's perspective. Interpretation: leaving the deferred profit on the books overstates consolidated inventory and consolidated net income. A common trap is to defer the elimination to the period of external sale, which would still overstate the current period.",
        "ExplanationWrongA": "Eliminating only revenue and cost of sales without removing the unrealized markup leaves $2M of phantom profit in consolidated inventory and net income.",
        "ExplanationWrongC": "Deferring elimination until external sale violates the requirement under ASC 810 to remove unrealized intercompany profit in the period it arises for consolidation purposes.",
        "ExplanationWrongD": "Reclassifying to noncontrolling interest is inappropriate because Flash Foods owns 100% of the bakery and there is no noncontrolling-interest counterparty to recognize.",
        "ExplanationWrongB": "",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ21-A4-Q5",
        "Type": "select",
        "Correct": "Document the qualitative assessment weighing negative indicators (EBITDA decline) against neutral or positive factors and conclude whether it is not more likely than not that fair value is below carrying amount; quantitative test only if that conclusion cannot be reached.",
        "Explanation": "ASC 350-20-35-3 allows management to perform a qualitative assessment as a screening step. When negative indicators such as an 18% EBITDA shortfall appear, management must weigh those against positive factors such as the long-term growth outlook, recoverable PPE fair value, and recent acquisitions to determine whether it is not more likely than not (less than 50% likelihood) that fair value is below carrying amount. If the qualitative assessment cannot support that conclusion, a quantitative test is required. Interpretation: the qualitative step avoids unnecessary valuation costs when no impairment is more likely than not, while protecting auditability when the indicators are mixed. A common trap is to either always do the quantitative test (wasting audit cost) or skip it when indicators are negative (missing required evidence).",
        "Topic": "Impairment documentation",
        "question_state": "Certified",
        "Prompt": "Mariela Hoffmann must choose between completing only the ASC 350-20-35 qualitative assessment and proceeding directly to a quantitative goodwill impairment test for the bakery reporting unit. Which recommendation best balances cost, auditability, and the 18% EBITDA shortfall?",
        "Choices": [
          "typically perform the quantitative test, because auditors will not accept the qualitative assessment in any circumstance.",
          "Skip the qualitative step only when no impairment indicators are present; otherwise a quantitative test is required.",
          "Document the qualitative assessment weighing negative indicators (EBITDA decline) against neutral or positive factors and conclude whether it is not more likely than not that fair value is below carrying amount; quantitative test only if that conclusion cannot be reached.",
          "Reclassify the bakery reporting unit as held-for-sale to avoid the impairment test altogether."
        ],
        "CorrectChoice": "C",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 350-20-35-3 allows management to perform a qualitative assessment as a screening step. When negative indicators such as an 18% EBITDA shortfall appear, management must weigh those against positive factors such as the long-term growth outlook, recoverable PPE fair value, and recent acquisitions to determine whether it is not more likely than not (less than 50% likelihood) that fair value is below carrying amount. If the qualitative assessment cannot support that conclusion, a quantitative test is required. Interpretation: the qualitative step avoids unnecessary valuation costs when no impairment is more likely than not, while protecting auditability when the indicators are mixed. A common trap is to either always do the quantitative test (wasting audit cost) or skip it when indicators are negative (missing required evidence).",
        "ExplanationWrongA": "Auditors generally accept a well-documented qualitative assessment under ASC 350; mandating a quantitative test in all circumstances ignores the standard's express permission.",
        "ExplanationWrongB": "ASC 350 does not require a quantitative test whenever any negative indicator exists; the qualitative assessment is precisely designed to weigh mixed evidence before deciding.",
        "ExplanationWrongD": "Held-for-sale classification is appropriate only when the criteria in ASC 360-10-45 are met, and reclassification does not eliminate the goodwill impairment analysis for a continuing reporting unit.",
        "ExplanationWrongC": "",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      },
      {
        "ItemID": "CBQ21-A4-Q6",
        "Type": "select",
        "Correct": "Disclose segment revenue, segment profit/loss, segment assets, and the basis of measurement, including reconciliations to consolidated totals.",
        "Explanation": "ASC 280-10-50 requires disclosure of revenue, profit/loss, and assets for each reportable segment, plus the basis of measurement and reconciliations to consolidated totals, so users can evaluate the segment's contribution and management's resource allocation. Applied to Flash Foods, expanding to four reportable segments requires full quantitative disclosures and clear reconciliation. Interpretation: minimal disclosure fails the standard's 'full segment disclosure' objective and reduces decision-usefulness for analysts. A common trap is to treat segment disclosure as competitive-sensitive and therefore omit required line items, which is not permitted by the standard.",
        "Topic": "Segment disclosure under ASC 280",
        "question_state": "Certified",
        "Prompt": "Mariela is considering how aggressively to expand segment disclosure under ASC 280 now that the bakery chain is reportable. Which disclosure strategy is most consistent with the standard and the information needs of capital providers?",
        "Choices": [
          "Report only segment revenue and total assets to minimize disclosure burden and protect competitive information.",
          "Disclose segment revenue, segment profit/loss, segment assets, and the basis of measurement, including reconciliations to consolidated totals.",
          "Report segment profit only when it exceeds 5% of consolidated profit, to limit the number of separately disclosed metrics.",
          "Omit any disclosure because the bakery acquisition is fully consolidated and segment data is therefore redundant."
        ],
        "CorrectChoice": "B",
        "CognitiveLevel": "Evaluate",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "ExplanationCorrect": "ASC 280-10-50 requires disclosure of revenue, profit/loss, and assets for each reportable segment, plus the basis of measurement and reconciliations to consolidated totals, so users can evaluate the segment's contribution and management's resource allocation. Applied to Flash Foods, expanding to four reportable segments requires full quantitative disclosures and clear reconciliation. Interpretation: minimal disclosure fails the standard's 'full segment disclosure' objective and reduces decision-usefulness for analysts. A common trap is to treat segment disclosure as competitive-sensitive and therefore omit required line items, which is not permitted by the standard.",
        "ExplanationWrongA": "Disclosing only revenue and assets omits segment profit/loss, which ASC 280-10-50 explicitly requires for each reportable operating segment.",
        "ExplanationWrongC": "ASC 280 contains no 5% profit threshold that limits disclosure; once a segment is reportable, the full set of required disclosures applies.",
        "ExplanationWrongD": "Omitting segment disclosure is not permitted under ASC 280 simply because the segments are consolidated; the standard exists precisely to disaggregate consolidated results.",
        "ExplanationWrongB": "",
        "certification_batch": "P2-HAND-SOLVE-WAVE",
        "certification_date": "2026-09-30"
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ21-B4",
    "Title": "Flash Industrial: Acquisition Financing, WACC, and Rating-Agency Considerations",
    "SectionTags": [
      "B"
    ],
    "BlueprintDomain": "Corporate Finance",
    "BlueprintObjectives": [
      "Compute WACC under a new capital structure with target debt weight",
      "Apply rating-agency notching methodology to a debt issuance",
      "Analyze pecking-order vs static-tradeoff implications for financing choice",
      "Evaluate optimal leverage and financing-mix decisions for an acquisition"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "ScenarioText": "Flash Industrial, a mid-cap specialty-chemicals subsidiary of Flash Holdings, is evaluating a $220 million acquisition of a complementary resin manufacturer. Treasurer Maya Caldwell must present the financing structure to the Flash Holdings board. The proposed capital structure is 60% debt / 40% equity, financed through a new senior unsecured term loan (the debt portion) and a rights-offering equity issuance. Pre-deal Flash Industrial carried a debt-to-equity (D/E) ratio of 0.8 and a BBB+ rating from Standard & Poor's; the post-deal D/E is projected to rise to 1.4, which would, in Maya's analysis, yield a downgrade to A-. The current pre-tax cost of debt is 5.2%, the equity cost of capital is 10.8%, the corporate marginal tax rate is 25%, and the analyst consensus beta is 1.25. The board has asked Maya to defend the WACC calculation under both pre-deal and post-deal capital structures, to assess the rating-agency notching impact, and to articulate whether pecking-order theory or static-tradeoff theory better justifies the chosen financing mix. Maya is also concerned about the marginal tax shield at the new rating, because interest deductibility is preserved under the corporate tax code but the higher required yield partially offsets the shield. The CFO has asked Maya to evaluate the alternative of funding the $220M entirely with an asset sale of a non-core packaging line versus the debt/equity mix, since the asset-sale alternative would preserve the BBB+ rating.",
    "Industry": "Specialty Chemicals and Resin Manufacturing",
    "CompanyType": "Subsidiary",
    "CompanyName": "Flash Industrial",
    "Stakeholder": "Maya Caldwell, Treasurer of Flash Industrial",
    "BusinessFunction": "Corporate Treasury and Capital Markets",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "WACC calculation",
      "target capital structure",
      "rating-agency notching",
      "pecking-order theory",
      "static-tradeoff theory",
      "debt tax shield",
      "Flash Industrial"
    ],
    "CreatedDate": "2026-08-30",
    "ModifiedDate": "2026-08-30",
    "Author": "Case Author",
    "Confidence": 87,
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
      "Compute post-acquisition WACC given a new debt weight and cost of debt",
      "Apply rating-agency notching rules to anticipate a credit-rating change",
      "Distinguish pecking-order from static-tradeoff implications for financing choice",
      "Evaluate financing alternatives (debt/equity vs asset sale) on cost and rating impact"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ21-B4-E1",
        "CaseID": "CBQ21-B4",
        "Type": "table",
        "Title": "Exhibit 1 — Flash Industrial Pre- and Post-Acquisition Capital Structure",
        "Description": "Capital structure inputs for WACC computation under both pre- and post-acquisition scenarios.",
        "Columns": [
          "Input",
          "Pre-Acquisition",
          "Post-Acquisition"
        ],
        "Rows": [
          [
            "Total assets / capital ($M)",
            "1,500.0",
            "1,720.0"
          ],
          [
            "Debt weight (D/V)",
            "0.444",
            "0.600"
          ],
          [
            "Equity weight (E/V)",
            "0.556",
            "0.400"
          ],
          [
            "Pre-tax cost of debt (Kd)",
            "5.20%",
            "6.40%"
          ],
          [
            "Cost of equity (Ke)",
            "10.80%",
            "11.50%"
          ],
          [
            "Marginal tax rate (T)",
            "25%",
            "25%"
          ],
          [
            "Beta (β)",
            "1.25",
            "1.30"
          ],
          [
            "S&P credit rating",
            "BBB+",
            "A-"
          ]
        ]
      },
      {
        "ExhibitID": "CBQ21-B4-E2",
        "CaseID": "CBQ21-B4",
        "Type": "table",
        "Title": "Exhibit 2 — Rating-Agency Notching Matrix for Senior Unsecured Debt",
        "Description": "Standard notching adjustments applied by S&P-style methodologies based on financial leverage.",
        "Columns": [
          "Notch Rule",
          "Description",
          "Indicative Adjustment"
        ],
        "Rows": [
          [
            "D/E > 1.0 with FFO/Debt < 40%",
            "Trigger one-notch downgrade",
            "-1"
          ],
          [
            "Subordinated vs senior debt",
            "Subordinated debt typically two notches below senior",
            "-2"
          ],
          [
            "Parent guarantee uplift",
            "Operating-subsidiary debt guaranteed by Flash Holdings",
            "+1"
          ],
          [
            "Recovery rating for secured",
            "Secured debt uplifts two notches above senior unsecured",
            "+2"
          ]
        ]
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ21-B4-Q1",
        "Type": "select",
        "Correct": "7.48%",
        "Explanation": "WACC is the weighted average of the after-tax cost of debt and the cost of equity: WACC = (D/V) x Kd x (1 - T) + (E/V) x Ke. Exhibit 1 gives the post-acquisition capital structure as D/V = 0.600, E/V = 0.400, pre-tax Kd = 6.40%, Ke = 11.50%, and a marginal tax rate of 25%. The debt component = 0.600 x 6.40% x (1 - 0.25) = 0.600 x 4.80% = 2.88%. The equity component = 0.400 x 11.50% = 4.60%. WACC = 2.88% + 4.60% = 7.48%. Recomputed independently: 0.60 x 6.40 x 0.75 = 2.88, plus 0.40 x 11.50 = 4.60, giving 7.48%. Interpretation: weighting toward debt lowers the blended cost because debt is cheaper after tax, but the rise in Kd from 5.20% to 6.40% as the rating slips from BBB+ to A- partly offsets that benefit, so the shield is not free. A common trap is omitting the (1 - T) 