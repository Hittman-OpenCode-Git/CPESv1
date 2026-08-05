var pack_p2_d_questions = [
  {
    "Part": 2,
    "Section": "D",
    "Topic": "D.001 risk-category-classification",
    "QuestionID": "P2-D-001",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "D-001-risk-classification",
    "Stem": "Apex Manufacturing's CFO identifies four risks: (1) a competitor doubling production capacity, (2) primary raw material supplier in a politically unstable region, (3) interest rates projected to rise 200 bps, and (4) new hazardous waste regulations requiring equipment installation at three plants. Risk (4) is best classified as:",
    "Choices": {
      "A": "Strategic risk",
      "B": "Operational risk",
      "C": "Financial risk",
      "D": "Compliance risk"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Risk (4) -- new hazardous waste regulations requiring equipment installation -- is a compliance risk. Compliance risks arise from laws, regulations, and regulatory requirements. The regulation imposes a mandatory obligation; non-compliance could result in fines, penalties, or legal action. Under COSO ERM, compliance risks are a major category alongside strategic, operational, and financial risks.",
    "ExplanationWrongA": "Strategic risk relates to competitive position and long-term strategy. Risk (1) -- a competitor doubling capacity -- is the strategic risk. Risk (4) arises from regulatory requirements, not competitive dynamics.",
    "ExplanationWrongB": "Operational risk relates to internal processes, people, systems, or external events disrupting operations. Risk (2) -- the supplier in an unstable region -- is the operational risk (supply chain disruption). Risk (4) is regulatory.",
    "ExplanationWrongC": "Financial risk relates to market movements, credit, liquidity. Risk (3) -- rising interest rates -- is the financial risk. Risk (4) stems from regulatory mandates, not financial markets.",
    "ExplanationWrongD": "",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "D.1",
    "BlueprintDomain": "Risk Management",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing strategic risk with compliance risk",
    "Authorities": [
      "COSO Enterprise Risk Management (2017)",
      "COSO Internal Control (2013)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "4 risk types correctly classified",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "D",
    "Topic": "D.002 coso-erm-components",
    "QuestionID": "P2-D-002",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "D-002-coso-erm-governance-culture",
    "Stem": "Regency Industries implements ERM under COSO ERM (2017). The board completes a session defining risk appetite, approving the risk management philosophy, and establishing oversight expectations. These activities fall under which COSO ERM component?",
    "Choices": {
      "A": "Governance and Culture",
      "B": "Strategy and Objective-Setting",
      "C": "Performance",
      "D": "Review and Revision"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "The board's activities -- defining risk appetite, approving philosophy, establishing oversight expectations -- fall under Governance and Culture. This component establishes tone at the top, defines board oversight responsibilities, reinforces organizational culture, and demonstrates commitment to core values. Governance and Culture is the foundation of ERM.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Strategy and Objective-Setting integrates risk into strategy formulation and objective development. The board's risk appetite statement informs strategy, but the act of defining appetite and oversight is governance activity that precedes strategy work.",
    "ExplanationWrongC": "Performance involves identifying, assessing, prioritizing risks and implementing responses. The board's governance activities precede performance. Performance is where management executes risk assessment, not where the board defines the framework.",
    "ExplanationWrongD": "Review and Revision involves monitoring effectiveness and adjusting as conditions change. The board's definition of risk appetite is upfront governance, not a review of existing processes.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "D.2",
    "BlueprintDomain": "Risk Management",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing Governance and Culture with Strategy and Objective-Setting",
    "Authorities": [
      "COSO Enterprise Risk Management (2017)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "5 ERM components verified",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "D",
    "Topic": "D.003 expected-loss-calculation",
    "QuestionID": "P2-D-003",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "D-003-expected-loss",
    "Stem": "Northgate Corporation estimates a cyberattack on its customer database has a 15% probability in the next year. If the attack occurs, financial impact is $2,400,000 including restoration, fines, and lost business. What is the expected loss?",
    "Choices": {
      "A": "$2,400,000",
      "B": "$360,000",
      "C": "$2,040,000",
      "D": "$160,000"
    },
    "CorrectChoice": "B",
    "ExplanationCorrect": "Expected loss = probability x impact = 15% x $2,400,000 = $360,000. This represents the weighted-average loss from this risk over the specified time horizon. Expected loss is fundamental to quantitative risk assessment under COSO ERM, allowing management to prioritize risks and allocate resources proportionately.",
    "ExplanationWrongA": "$2,400,000 is the full impact amount -- total loss if the attack occurs. This ignores probability. Expected loss incorporates both likelihood and magnitude for risk-weighted prioritization.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "$2,040,000 is the difference between total impact and expected loss ($2,400,000 - $360,000). This is not a meaningful risk metric. Expected loss itself is the correct measure.",
    "ExplanationWrongD": "$160,000 appears to be arithmetic error, possibly 15% applied to an incorrect base. Correct: 0.15 x $2,400,000 = $360,000.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "D.3",
    "BlueprintDomain": "Risk Management",
    "FormulaReference": "Expected Loss = Probability x Impact",
    "CommonTrapReference": "Confusing expected loss with total impact",
    "Authorities": [
      "COSO Enterprise Risk Management (2017)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Independent: 0.15 x $2.4M = $360K",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "D",
    "Topic": "D.004 risk-response-strategies",
    "QuestionID": "P2-D-004",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "D-004-risk-transfer-insurance",
    "Stem": "Meridian Fabrication relies on a single overseas supplier in a region with escalating political instability. A supply disruption would cost $850,000. The CFO purchases business interruption insurance covering $800,000 of the loss for a $35,000 annual premium. This is which risk response strategy?",
    "Choices": {
      "A": "Risk acceptance",
      "B": "Risk avoidance",
      "C": "Risk transfer",
      "D": "Risk mitigation"
    },
    "CorrectChoice": "C",
    "ExplanationCorrect": "Purchasing insurance is risk transfer -- shifting financial consequences to a third party. Meridian transfers $800,000 of potential loss to the insurer for a $35,000 premium. The company retains $50,000 of exposure, but the majority of financial impact is contractually shifted to the insurer.",
    "ExplanationWrongA": "Risk acceptance means bearing the financial consequences without action. Meridian is actively transferring the burden to an insurer. Acceptance would be appropriate only if premium exceeds expected loss.",
    "ExplanationWrongB": "Risk avoidance means discontinuing the activity creating the risk -- e.g., stopping use of the specialty alloy or exiting the product line. The CFO chose to continue operations while transferring financial impact, not to avoid the activity.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Risk mitigation reduces likelihood or impact through controls -- e.g., developing alternative suppliers, increasing safety stock. Transfer shifts consequences to another party; mitigation reduces the risk itself. Meridian did not reduce the probability; it insured against financial loss.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "D.4",
    "BlueprintDomain": "Risk Management",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing risk transfer with risk mitigation",
    "Authorities": [
      "COSO Enterprise Risk Management (2017)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Insurance = risk transfer per COSO ERM",
      "Authorities match"
    ]
  },
    {
    "Part": 2,
    "Section": "D",
    "Topic": "D.005 erm-governance-roles",
    "QuestionID": "P2-D-005",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "D-005-erm-governance-board-vs-management",
    "Stem": "Crestview Holdings reviews its ERM oversight against COSO ERM (2017). Which statement best describes the division of risk oversight between the board and management?",
    "Choices": {
      "A": "Management is solely responsible for risk oversight; the board reviews only financial statements and internal controls",
      "B": "The board handles day-to-day identification, assessment, and mitigation of operational risks",
      "C": "The board delegates all risk responsibilities to the internal audit function, which reports to the audit committee",
      "D": "The board has ultimate oversight, approving risk appetite and ensuring management designs effective risk responses"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "Under COSO ERM (2017), the board has ultimate oversight: approving risk appetite, ensuring management implements effective risk practices, and monitoring the overall risk profile. Management handles day-to-day risk identification, assessment, and response. This separation ensures risk management is embedded in operations while maintaining independent governance.",
    "ExplanationWrongA": "The board's role extends well beyond financial statement review. COSO ERM requires the board to approve risk appetite, oversee the ERM framework, and ensure risk responses align with strategy. Limiting the board to financial statements is a governance deficiency.",
    "ExplanationWrongB": "Day-to-day risk management is management's responsibility. The board exercises oversight and sets expectations; management executes. Confusing board oversight with management execution is a common governance error.",
    "ExplanationWrongC": "The internal audit function provides independent assurance but the board cannot delegate its ultimate oversight responsibility. Risk ownership remains with management; oversight remains with the board. Internal audit reports to the board, typically through the audit committee.",
    "ExplanationWrongD": "",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "D.5",
    "BlueprintDomain": "Risk Management",
    "FormulaReference": "",
    "CommonTrapReference": "Confusing board oversight with management execution",
    "Authorities": [
      "COSO Enterprise Risk Management (2017)"
    ],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008)",
      "Non-CC EW slots >=50 chars (DL-026)",
      "No boilerplate (DL-013)",
      "Difficulty justified",
      "Board vs management per COSO ERM",
      "Authorities match"
    ]
  }
];
