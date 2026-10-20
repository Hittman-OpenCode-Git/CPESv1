tion_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the total degree of leverage (TDTL), rounded to two decimals.",
        "Correct": "4.17",
        "Explanation": "Total leverage multiplies operating and financial fixity: TDTL = DOL x DFL. From Exhibit 1, DOL = CM / OI = 50.0 / 20.0 = 2.50 and DFL = OI / (OI - Interest) = 20.0 / (20.0 - 8.0) = 20.0 / 12.0 = 1.6667. TDTL = 2.50 x 1.6667 = 4.1667, rounded to 4.17. For Controller Wu this means a 1% change in sales moves pre-tax income by about 4.17% — small demand misses hit coverage hard. A common trap is adding DOL + DFL instead of multiplying; with rounded inputs that sum coincidentally also reads 4.17 here, but the economics are multiplicative (combined amplification), not additive.",
        "Topic": "TDTL",
        "Subtopic": "DOL×DFL",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "FA-21",
        "CommonTrapReference": "Add DOL+DFL",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "tdtl"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-A4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Does Sentinel pass the FCC covenant and what does leverage imply?",
        "Correct": "A",
        "Explanation": "Sentinel passes: actual FCC 1.92 exceeds the 1.80 minimum in Exhibit 2, so choice A is correct. But passing is thin comfort — with TDTL at 4.17 (Q3), every 1% sales shortfall cuts pre-tax income by over 4%, which can push coverage below covenant quickly; Wu must monitor, hence the second half of A. Choice B misreads the inequality (1.92 is greater than 1.80, not less). Choice C is dangerous: leverage is precisely what makes a passing ratio fragile. Choice D blames DOL alone when DFL (1.67) contributes equally to the combined 4.17.",
        "Topic": "FCC and leverage",
        "Subtopic": "Covenant",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Pass and irrelevant",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fcc-and-leverage"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Pass 1.92 >1.80 but high TDTL 4.17 means small sales miss hits coverage hard — monitor",
          "B": "Fail — 1.92 <1.80",
          "C": "Pass and leverage irrelevant",
          "D": "Fail due to DOL alone"
        }
      },
      {
        "ItemID": "CBQ22-A4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two actions reduce leverage risk? (Select two)",
        "Correct": [
          "Shift fixed to variable via outsourcing — lowers DOL",
          "Refinance fixed debt to variable — lowers DFL"
        ],
        "Explanation": "Leverage falls only when fixity falls. Choice A converts fixed operating cost to variable (outsourcing), which lowers DOL — correct. Choice B converts fixed-rate debt to variable-rate, which lowers DFL — correct. Choices C and D do the opposite: adding fixed costs or debt raises DOL and DFL respectively. Choice E cuts price, which shrinks contribution margin and raises DOL (same fixed base over a smaller CM). The trap is treating all cost-cutting as de-leveraging: only reductions in FIXED commitments (or fixed-to-variable conversion) lower leverage.",
        "Topic": "Leverage reduction",
        "Subtopic": "Actions",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Debt vs fixed",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "leverage-reduction"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Shift fixed to variable via outsourcing — lowers DOL",
          "B": "Refinance fixed debt to variable — lowers DFL",
          "C": "Increase fixed costs",
          "D": "Add debt",
          "E": "Cut price"
        }
      },
      {
        "ItemID": "CBQ22-A4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match leverage concept to Sentinel",
        "Correct": {
          "DOL 2.50": "CM/OI — operating fixity",
          "DFL 1.67": "OI/(OI-I) — financial fixity",
          "TDTL 4.17": "DOL×DFL — combined",
          "FCC 1.92": "(OI+lease)/(I+lease+principal) — covenant"
        },
        "Explanation": "Each concept maps to its Sentinel measure from Q1-Q4. DOL 2.50 = CM / OI (50.0 / 20.0), the operating-fixity gauge. DFL 1.67 = OI / (OI - Interest) = 20.0 / 12.0, the financial-fixity gauge. TDTL 4.17 = DOL x DFL, the combined amplifier. FCC 1.92 = (OI + lease) / (interest + lease + principal) per the Exhibit 2 AccuracyCheck, the covenant test. The mapping trap is crossing the formulas (e.g., attaching interest to DOL or sales to DFL); each ratio has exactly one numerator-denominator pair.",
        "Topic": "Leverage mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "DOL vs DFL",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "leverage-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "DOL 2.50",
          "DFL 1.67",
          "TDTL 4.17",
          "FCC 1.92"
        ],
        "RightItems": [
          "CM/OI — operating fixity",
          "OI/(OI-I) — financial fixity",
          "DOL×DFL — combined",
          "(OI+lease)/(I+lease+principal) — covenant"
        ]
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-C3",
    "Title": "Joint Costs at ChemCore Industries — NRV and Further Processing",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Allocate joint costs via NRV (C.2)",
      "Apply sell-or-process-further"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "ChemCore processes 10k gallons of joint chemical into three outputs with joint cost $120k, NRVs $80k/$60k/$40k, and further processing options for two.",
    "Industry": "Chemicals",
    "CompanyType": "Manufacturer",
    "CompanyName": "ChemCore Industries",
    "Stakeholder": "Ops Mgr Henrik Dahl",
    "BusinessFunction": "Operations",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "joint",
      "NRV",
      "sell-or-process"
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
      "Allocate joint via NRV",
      "Decide further processing",
      "Explain sunk nature"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C3-E1",
        "CaseID": "CBQ22-C3",
        "Type": "table",
        "Title": "Exhibit 1 — Joint Products and NRV",
        "Purpose": "Provides NRV for allocation.",
        "ReferencedBy": [
          "CBQ22-C3-Q1",
          "CBQ22-C3-Q2",
          "CBQ22-C3-Q6"
        ],
        "Headers": [
          "Product",
          "NRV"
        ],
        "Rows": [
          [
            "A",
            "$80,000"
          ],
          [
            "B",
            "$60,000"
          ],
          [
            "C",
            "$40,000"
          ],
          [
            "Total",
            "$180,000"
          ]
        ],
        "DataFormat": "USD",
        "AccuracyCheck": "NRV sum 180k; A 44.4% of joint"
      },
      {
        "ExhibitID": "CBQ22-C3-E2",
        "CaseID": "CBQ22-C3",
        "Type": "table",
        "Title": "Exhibit 2 — Further Processing",
        "Purpose": "Provides incremental rev/cost beyond split.",
        "ReferencedBy": [
          "CBQ22-C3-Q3",
          "CBQ22-C3-Q4",
          "CBQ22-C3-Q5"
        ],
        "Headers": [
          "Product",
          "Incremental Revenue",
          "Incremental Cost"
        ],
        "Rows": [
          [
            "A",
            "$25,000",
            "$18,000"
          ],
          [
            "B",
            "$15,000",
            "$20,000"
          ]
        ],
        "DataFormat": "USD beyond split",
        "AccuracyCheck": "A +7k, B -5k"
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C3-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter joint cost allocated to Product A via NRV, in dollars.",
        "Correct": "53333",
        "Explanation": "Under the NRV (net realizable value) method, joint cost is allocated across products in proportion to each product's relative NRV, because NRV approximates the final sale value that each output can support once separable costs are deducted. Exhibit 1 gives NRVs of $80,000 for Product A, $60,000 for B, and $40,000 for C, totalling $180,000. Allocation to A = $120,000 x ($80,000 / $180,000) = $53,333. Recomputed independently: 120,000 / 180,000 = 0.6667, and 0.6667 x 0.80 = 0.5333, giving $53,333. Product A therefore absorbs 44.4% of the joint cost, the largest share because it carries the highest NRV. A common trap is allocating on physical output weight, which is appropriate for a homogeneous joint process but not for chemically distinct outputs whose sale values differ; here the products differ, so NRV is the relevant basis.",
        "Topic": "NRV allocation",
        "Subtopic": "A",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "C.2 NRV",
        "CommonTrapReference": "Tons",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "nrv-allocation"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C3-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter joint cost allocated to Product B, in dollars.",
        "Correct": "40000",
        "Explanation": "NRV allocation is proportional: each product absorbs joint cost by its NRV share. From Exhibit 1, total NRV = 80,000 + 60,000 + 40,000 = 180,000. Product B share = 60,000 / 180,000 = one-third. Allocation = 120,000 x (60,000 / 180,000) = 120,000 / 3 = 40,000. For reporting, ChemCore capitalizes $40,000 of joint cost into B's inventory; the $120,000 joint total is sunk for any sell-or-process decision (Q3-Q5). The trap is allocating by sales value without deducting separable costs (NRV, not gross value) or splitting evenly by volume.",
        "Topic": "NRV B",
        "Subtopic": "B",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "C.2 NRV",
        "CommonTrapReference": "Sales value w/o NRV",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "nrv-b"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C3-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Should Product A be processed further?",
        "Correct": "A",
        "Explanation": "Yes — process further (choice A). The sell-or-process rule compares only incremental amounts beyond split-off: incremental revenue $25,000 less incremental cost $18,000 = +$7,000, so processing adds profit. The $53,333 of allocated joint cost is sunk and irrelevant however it was computed. Choices B and D commit the sunk-cost fallacy by letting the joint allocation veto a profitable incremental step; choice C makes processing conditional on joint cost, which by definition cannot change the incremental answer.",
        "Topic": "Further A",
        "Subtopic": "Decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Joint cost makes loss",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "further-a"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — incremental $7k (25k-18k) adds profit; joint $53k irrelevant",
          "B": "No — joint cost makes it loss",
          "C": "Yes only if joint is low",
          "D": "No — incremental 25k < joint 53k"
        }
      },
      {
        "ItemID": "CBQ22-C3-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Should Product B be processed further?",
        "Correct": "B",
        "Explanation": "No — sell at split-off (choice B). Incremental revenue $15,000 less incremental cost $20,000 = -$5,000: further processing destroys value, so B is sold as-is. Choice A processes at a $5,000 loss. Choices C and D drag joint cost into the decision, but joint cost is sunk at split-off and cannot make a negative incremental margin positive (or vice versa). The exam trap is symmetry bias: because A should be processed further does not mean B should be.",
        "Topic": "Further B",
        "Subtopic": "Decision",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Always process",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "further-b"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — 15k-20k = -5k still process",
          "B": "No — incremental -5k, sell at split",
          "C": "Yes — joint low",
          "D": "Indifferent"
        }
      },
      {
        "ItemID": "CBQ22-C3-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which two statements about joint costs are correct? (Select two)",
        "Correct": [
          "Joint cost is sunk for sell-or-process decisions — only incremental beyond split matters",
          "NTV determines incremental profit"
        ],
        "Explanation": "Two statements hold. Joint cost is sunk for sell-or-process decisions — only incremental revenue and cost beyond split-off matter (Q3-Q4 prove it: +$7k for A, -$5k for B, decided without any joint figure). And the incremental (net) test value determines profit impact. Choice B is wrong: NRV allocation changes reported product cost but never the incremental math. Choice C is wrong twice over: 'always' is an absolute cue, and physical measure ignores value. Choice D restates the sunk-cost fallacy the item tests.",
        "Topic": "Joint nature",
        "Subtopic": "Correct",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Joint relevant",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "joint-nature"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Joint cost is sunk for sell-or-process decisions — only incremental beyond split matters",
          "B": "NRV allocation affects further-processing decision",
          "C": "Physical measure is always best for NRV",
          "D": "Joint cost should be allocated to decide further processing",
          "E": "NTV determines incremental profit"
        }
      },
      {
        "ItemID": "CBQ22-C3-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match ChemCore concept to treatment",
        "Correct": {
          "A allocation 53,333": "120k×80/180 — NRV% of joint",
          "B allocation 40,000": "120k×60/180",
          "A further +7k": "25k-18k — process",
          "B further -5k": "15k-20k — sell at split"
        },
        "Explanation": "Each mapping restates a Q1-Q5 result. A allocation 53,333 = 120,000 x (80,000 / 180,000), B allocation 40,000 = 120,000 x (60,000 / 180,000): NRV-proportional shares of the $120,000 joint total. A further +7k = 25,000 - 18,000, so process. B further -5k = 15,000 - 20,000, so sell at split. The mapping trap is pairing a product with the other's allocation or attaching the wrong sign to the further-processing call; check each leg against its own exhibit row.",
        "Topic": "Joint mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "NRV vs further",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "joint-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "A allocation 53,333",
          "B allocation 40,000",
          "A further +7k",
          "B further -5k"
        ],
        "RightItems": [
          "120k×80/180 — NRV% of joint",
          "120k×60/180",
          "25k-18k — process",
          "15k-20k — sell at split"
        ]
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-F4",
    "Title": "FCPA and Books-and-Records at Veridian Global",
    "SectionTags": [
      "F"
    ],
    "BlueprintDomain": "Professional Ethics",
    "BlueprintObjectives": [
      "Apply FCPA anti-bribery and books-and-records (F.6)",
      "Evaluate facilitating vs bribe"
    ],
    "PrimaryCompetency": "Judgment",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "Veridian Global's agent in Indonesia paid $80k to a customs official to expedite a $1.2M contract and booked it as 'consulting fees.' Compliance Officer Elena Ruiz must assess FCPA exposure and SOX404 deficiency.",
    "Industry": "Consumer goods",
    "CompanyType": "Service provider",
    "CompanyName": "Veridian Global",
    "Stakeholder": "Compliance Officer Elena Ruiz",
    "BusinessFunction": "Compliance",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "FCPA",
      "books-and-records"
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
      "Distinguish anti-bribery vs books",
      "Evaluate facilitating exception",
      "Assess control deficiency"
    ],
    "Part": 2,
    "Part2OnlyFlag": true,
    "question_state": "Certified",
    "certification_session": "P2-HAND-SOLVE-WAVE",
    "certification_date": "2026-09-30",
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-F4-E1",
        "CaseID": "CBQ22-F4",
        "Type": "email",
        "Title": "Exhibit 1 — Agent Email",
        "Purpose": "Provides payment description.",
        "ReferencedBy": [
          "CBQ22-F4-Q1",
          "CBQ22-F4-Q2",
          "CBQ22-F4-Q3"
        ],
        "Body": "Agent: 'Paid $80k to customs to release shipment for $1.2M contract. Invoiced as consulting fees per your template.' Manager approved without inquiry."
      },
      {
        "ExhibitID": "CBQ22-F4-E2",
        "CaseID": "CBQ22-F4",
        "Type": "text",
        "Title": "Exhibit 2 — FCPA and SOX404 Framework",
        "Purpose": "Summarizes FCPA provisions and control deficiency levels.",
        "ReferencedBy": [
          "CBQ22-F4-Q4",
          "CBQ22-F4-Q5",
          "CBQ22-F4-Q6"
        ],
        "Body": "FCPA: anti-bribery (foreign official, corrupt intent) + books-and-records (accurate books, controls) + internal controls. Facilitating: routine gov action (e.g., stamping), not discretionary contract award. SOX404: material weakness = reasonable possibility of material misstatement; significant deficiency less severe."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-F4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Does the $80k violate FCPA anti-bribery?",
        "Correct": "A",
        "Explanation": "Yes — choice A. The $80,000 hits every anti-bribery element in Exhibit 2: paid to a foreign official (customs), for a discretionary act (awarding the $1.2M contract, not routine stamping), with corrupt intent shown by the 'consulting fees' disguise. Choice B describes the facilitating exception, which covers only routine non-discretionary acts and cannot shelter a contract award. Choice C is wrong on the law: payment size never determines bribery (fixed DL-003 absolute). Choice D inverts jurisdiction: the FCPA polices payments to FOREIGN officials, not US ones.",
        "Topic": "Anti-bribery",
        "Subtopic": "Violation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Facilitating trap",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "anti-bribery"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — payment to foreign official for discretionary contract award with corrupt intent, not routine",
          "B": "No — facilitating payment for routine stamping only, this is discretionary contract",
          "C": "No — amount small is not automatically immaterial",
          "D": "Only if US official"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q2",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Does booking as 'consulting fees' violate books-and-records?",
        "Correct": "A",
        "Explanation": "Yes — choice A. Booking the $80,000 bribe as 'consulting fees' falsifies the books, which is a standalone books-and-records violation independent of whether anti-bribery is proven — the email plus the manager's no-inquiry approval documents both the misclassification and the control failure. Choice B treats a label as substance; books must reflect transactions faithfully. Choice C invents a materiality floor the provision has none. Choice D confuses approval with accuracy: a manager's sign-off cannot true up a false description.",
        "Topic": "Books-and-records",
        "Subtopic": "Violation",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Reasonable label",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "books-and-records"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — inaccurate books, misclassifies bribe, second FCPA violation even if anti-bribery not proven",
          "B": "No — consulting is reasonable label",
          "C": "Only if material",
          "D": "No — manager approved"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q3",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "Is facilitating exception available for the $80k?",
        "Correct": "B",
        "Explanation": "No — choice B. The facilitating exception is narrow: routine, non-discretionary government acts such as stamping or scheduling. Securing a $1.2M contract award is discretionary by definition, so no payment structure or label can squeeze it into the exception. Choices A and C try to stretch 'facilitating' to any customs payment or any small payment; choice D imagines bookkeeping can launder substance. The exam trap is treating the exception as a dollar threshold rather than an act-type test.",
        "Topic": "Facilitating",
        "Subtopic": "Exception",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Analyze",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Any customs",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "facilitating"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Yes — any customs payment is facilitating",
          "B": "No — facilitating covers only routine non-discretionary acts (e.g., stamping), not securing $1.2M contract award",
          "C": "Yes — $80k is small",
          "D": "Yes — if booked correctly"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q4",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "select",
        "Prompt": "What is the SOX404 implication of the template that auto-books agent fees as consulting?",
        "Correct": "B",
        "Explanation": "Choice B: a material weakness or significant deficiency. The template that auto-books agent fees as consulting, combined with the manager approving without inquiry, overrides proper classification — Exhibit 2's test is reasonable possibility of material misstatement, which mislabeled bribery payments plus inattentive review squarely meet. Choice A mistakes automation for control (a template that encodes the wrong treatment is a deficiency, not a control). Choice C understates: this is not disclosure-only. Choice D wrongly walls FCPA off from SOX; corrupt payments flowing through false books are exactly what 404 controls must catch.",
        "Topic": "SOX404",
        "Subtopic": "Deficiency",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "No deficiency",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "sox404"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "No deficiency — template is control",
          "B": "Material weakness or significant deficiency — reasonable possibility of material misstatement due to override of proper classification and manager inattention",
          "C": "Only disclosure deficiency",
          "D": "No impact — FCPA not SOX"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q5",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "multi",
        "Prompt": "Which three controls address Veridian's risks? (Select three)",
        "Correct": [
          "Enhanced due diligence on third-party agents with red-flag screening",
          "Prohibit template auto-booking; require invoice + proof of service + approval",
          "Anti-bribery training and hotline with non-retaliation"
        ],
        "Explanation": "Three controls fit Veridian's specific failures. Enhanced third-party due diligence with red-flag screening (A) would have caught the agent arrangement before payment. Prohibiting template auto-booking and requiring invoice plus proof of service plus approval (B) kills the misclassification channel. Anti-bribery training with a non-retaliation hotline (C) gives staff a reporting path around an incurious manager. Choice D defers compliance to an arbitrary dollar threshold the FCPA has none. Choice E institutionalizes the violation by mandating the false label.",
        "Topic": "Controls",
        "Subtopic": "Correct",
        "Difficulty": "Difficult",
        "DifficultyScore": 4,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Template control",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "controls"
        ],
        "Dependencies": [],
        "Choices": {
          "A": "Enhanced due diligence on third-party agents with red-flag screening",
          "B": "Prohibit template auto-booking; require invoice + proof of service + approval",
          "C": "Anti-bribery training and hotline with non-retaliation",
          "D": "Defer FCPA until contract >$5M",
          "E": "Book all agent fees as consulting by default"
        }
      },
      {
        "ItemID": "CBQ22-F4-Q6",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "match",
        "Prompt": "Match Veridian fact to treatment",
        "Correct": {
          "$80k to customs for $1.2M contract": "Anti-bribery violation — discretionary award",
          "Booked as consulting fees": "Books-and-records violation — inaccurate books",
          "Facilitating claim": "Only routine non-discretionary, not contract award",
          "Template auto-book": "Control deficiency — material weakness/ significant"
        },
        "Explanation": "Each fact maps to its Exhibit 2 treatment. The $80k for the $1.2M contract is an anti-bribery violation (foreign official, discretionary award, corrupt intent). Booking it as consulting fees is a books-and-records violation (inaccurate books). The facilitating claim fails because only routine non-discretionary acts qualify, not contract awards. The template auto-book is a control deficiency at material-weakness/significant-deficiency level (override plus inattention creating reasonable possibility of material misstatement). The mapping trap is swapping the two FCPA prongs or downgrading the template to a disclosure footnote.",
        "Topic": "FCPA mapping",
        "Subtopic": "Integration",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Evaluate",
        "CalculationRequired": false,
        "FormulaReference": "",
        "CommonTrapReference": "Facilitating",
        "DecisionTreeReference": "",
        "EstimatedMinutes": 5,
        "ExplanationVersion": 1,
        "Tags": [
          "fcpa-mapping"
        ],
        "Dependencies": [],
        "LeftItems": [
          "$80k to customs for $1.2M contract",
          "Booked as consulting fees",
          "Facilitating claim",
          "Template auto-book"
        ],
        "RightItems": [
          "Anti-bribery violation — discretionary award",
          "Books-and-records violation — inaccurate books",
          "Only routine non-discretionary, not contract award",
          "Control deficiency — material weakness/ significant"
        ]
      }
    ],
    "certification_batch": "P2-HAND-SOLVE-WAVE"
  },
  {
    "CaseID": "CBQ22-C4",
    "Title": "Target Costing at SmartSense Electronics",
    "SectionTags": [
      "C"
    ],
    "BlueprintDomain": "Decision Analysis",
    "BlueprintObjectives": [
      "Compute allowable cost from market price and target margin",
      "Determine value-engineering gap and prioritize cost-reduction candidates",
      "Apply life-cycle pricing to evaluate long-run profitability of a new product",
      "Identify relevant costs in a target-costing framework"
    ],
    "PrimaryCompetency": "Calculation",
    "EstimatedMinutes": 30,
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "ScenarioText": "SmartSense Electronics is launching a new IoT temperature sensor. Market research indicates a competitive selling price of $48.00 per unit, and SmartSense requires a 35% gross margin to meet its return-on-investment hurdle. The engineering team's current cost estimate is $37.50 per unit. CFO Diane Wu must evaluate whether the product can meet the target cost, which components offer the greatest value-engineering opportunities, and how life-cycle costs affect the go-forward recommendation.",
    "Industry": "Consumer electronics",
    "CompanyType": "Manufacturer",
    "CompanyName": "SmartSense Electronics",
    "Stakeholder": "CFO Diane Wu",
    "BusinessFunction": "Cost accounting",
    "QuestionCount": 6,
    "ExhibitCount": 2,
    "ProductionStatus": "Draft",
    "Version": "1.0",
    "Tags": [
      "target costing",
      "value engineering",
      "life-cycle pricing",
      "gross margin"
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
    "question_state": "Archived",
    "archive_batch": "DL-P2-024-DEDUP",
    "archive_date": "2026-09-30",
    "archive_reason": "DL-P2-024 whole-case duplicate; survivor retained in p2/case_pack_p2_authored.js or p2/case_pack_p2_C4_C8.js",
    "certification_date": "2026-09-05",
    "certification_session": "P2-CERT-AUDIT-CASE",
    "Part": 2,
    "Part2OnlyFlag": true,
    "LearningObjectives": [
      "Derive allowable cost from target price and required margin",
      "Compute the value-engineering gap between current and allowable cost",
      "Evaluate which cost components to reduce using value-engineering analysis",
      "Integrate life-cycle costs into a target-costing decision"
    ],
    "Exhibits": [
      {
        "ExhibitID": "CBQ22-C4-E1",
        "CaseID": "CBQ22-C4",
        "Type": "table",
        "Title": "Exhibit 1 — Current Cost Build",
        "Purpose": "Provides the component-level cost breakdown of the proposed IoT sensor, used to compute the total current cost and identify value-engineering targets.",
        "ReferencedBy": [
          "CBQ22-C4-Q1",
          "CBQ22-C4-Q2",
          "CBQ22-C4-Q5"
        ],
        "Headers": [
          "Component",
          "Current Cost per Unit"
        ],
        "Rows": [
          [
            "Temperature sensor module",
            "$12.80"
          ],
          [
            "Printed circuit board (PCB)",
            "$8.40"
          ],
          [
            "Housing and connectors",
            "$5.60"
          ],
          [
            "Assembly labor",
            "$6.20"
          ],
          [
            "Quality testing",
            "$2.80"
          ],
          [
            "Packaging and shipping prep",
            "$1.70"
          ],
          [
            "Total",
            "$37.50"
          ]
        ],
        "DataFormat": "USD per unit; totals verified as sum of components",
        "AccuracyCheck": "12.80 + 8.40 + 5.60 + 6.20 + 2.80 + 1.70 = 37.50 — confirmed"
      },
      {
        "ExhibitID": "CBQ22-C4-E2",
        "CaseID": "CBQ22-C4",
        "Type": "text",
        "Title": "Exhibit 2 — Market Research Summary",
        "Purpose": "Provides competitive pricing context and life-cycle cost data needed for the life-cycle pricing evaluation.",
        "ReferencedBy": [
          "CBQ22-C4-Q3",
          "CBQ22-C4-Q4",
          "CBQ22-C4-Q6"
        ],
        "Body": "SmartSense's market research indicates that the competitive wholesale price for comparable IoT temperature sensors is $48.00 per unit. Two major competitors (TempTrak and SensiCore) already sell at this price point with similar specifications. SmartSense expects to sell 180,000 units over a 3-year product life. Beyond the manufacturing cost of $37.50 per unit, the following life-cycle costs have been identified: $420,000 in upfront tooling and模具 (mold) design, $180,000 in initial regulatory certification, $96,000 per year in warranty reserves (3-year life), and $0.85 per unit in end-of-life recycling compliance. The company's required return on investment for new products is 15% on total life-cycle costs."
      }
    ],
    "Items": [
      {
        "ItemID": "CBQ22-C4-Q1",
        "question_state": "Certified",
        "certification_batch": "GOAL-1-P2-CASE-CLOSE",
        "certification_date": "2026-10-18",
        "Type": "numeric",
        "Prompt": "Enter the allowable cost per unit for SmartSense's sensor, given the market price and required gross margin.",
        "Correct": "31.20",
        "Explanation": "Under target costing, the allowable cost equals the market price multiplied by one minus the target gross margin percentage. Allowable cost = $48.00 × (1 − 0.35) = $48.00 × 0.65 = $31.20. This means SmartSense must reduce its per-unit cost from $37.50 to $31.20 — a reduction of $6.30 — to achieve the required 35% margin at the market-clearing price. The allowable cost is the ceiling; any cost above it erodes the target return.",
        "Topic": "Target costing",
        "Subtopic": "Allowable cost computation",
        "Difficulty": "Moderate",
        "DifficultyScore": 3,
        "CognitiveLevel": "Apply",
        "CalculationRequired": true,
        "FormulaReference": "Allowable Cost = Market Price × (1 − Target Gross Margin %)",
        "EstimatedMinutes": 4,
        "ExplanationVersion": 1,
        "Tags": [
          "target costing",
          "allowable cost"
        ],
        "Dependencies": []
      },
      {
        "ItemID": "CBQ22-C4-Q2",
        "questi