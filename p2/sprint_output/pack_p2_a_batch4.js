const pack_p2_a_batch4_questions = [
  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Operating lease impact on financial statements under ASC 842",
  "QuestionID": "P2-A-546",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-546-northpoint-logistics-operating-lease-balance-sheet-recognition",
  "Stem": "Northpoint Logistics operates a fleet of 200 delivery trucks under operating leases. Prior to adopting ASC 842, Northpoint reported total assets of $45,000,000, total liabilities of $25,000,000, and shareholders' equity of $20,000,000. Upon adoption, Northpoint must recognize right-of-use assets and lease liabilities for all operating leases with terms exceeding 12 months. The present value of Northpoint's minimum lease payments under qualifying operating leases is $6,000,000. Which statement best describes the impact of ASC 842 adoption on Northpoint's financial statement presentation?",
  "Choices": {
    "A": "Both total assets and total liabilities increase by $6,000,000, leaving shareholders' equity unchanged. The debt-to-equity ratio rises from 1.25 to 1.50, and ROA declines because the asset base expands without a corresponding increase in net income.",
    "B": "Total assets increase by $6,000,000 while total liabilities remain unchanged because the right-of-use asset is recognized without a corresponding liability.",
    "C": "Total liabilities increase by $6,000,000 while total assets remain unchanged because the lease obligation is recognized as a liability but the right-of-use asset is off-balance-sheet.",
    "D": "No balance sheet impact occurs because operating leases under ASC 842 continue to be treated as off-balance-sheet financing."
  },
  "CorrectChoice": "A",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "ASC 842 requires dual recognition: a right-of-use asset and a lease liability. Both sides increase by equal amounts, leaving equity unchanged. The debt-to-equity ratio increases, not decreases.",
  "ExplanationWrongC": "ASC 842 requires recognition of both a right-of-use asset and a lease liability at commencement. Both sides increase equally.",
  "ExplanationWrongD": "This reflects the pre-ASC 842 treatment under ASC 840. ASC 842 requires nearly all leases with terms exceeding 12 months to be recognized on the balance sheet.",
  "ExplanationCorrect": "Under ASC 842, lessees must recognize a right-of-use asset and a lease liability for all operating leases with terms exceeding 12 months. For Northpoint, both total assets and total liabilities increase by $6,000,000. Shareholders' equity is unaffected because the entry is symmetric. The debt-to-equity ratio increases from 1.25 to 1.50. ROA declines because the denominator expands by $6M while net income remains unchanged.",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "CognitiveLevel": "Remember",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-25-1",
    "ASC 842-10-30-1"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-30: ASC 842 Lease Classification and Balance Sheet Impact"
  ],
  "source_support_for_key": {
    "source_id": "FA-30",
    "rule_or_proposition": "ASC 842 requires dual recognition of ROU asset and lease liability",
    "application_to_facts": "$6M ROU asset + $6M liability; D/E 1.25 to 1.50",
    "key_conclusion": "ASC 842 increases both assets and liabilities by $6M"
  },
  "distractor_intent": {
    "B": {
      "misconception": "Only ROU asset recognized",
      "why_plausible": "Confuses dual recognition",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Only liability recognized",
      "why_plausible": "Assumes liability-only treatment",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Operating leases remain off-balance-sheet",
      "why_plausible": "Reflects outdated ASC 840",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option B reverses dual-recognition. Option C omits ROU asset. Option D applies superseded ASC 840.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Lease classification criteria under ASC 842",
  "QuestionID": "P2-A-547",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-547-meridian-corp-lease-classification-five-criteria-finance-versus-operating",
  "Stem": "Meridian Corp enters into a 10-year lease for specialized manufacturing equipment with annual payments of $150,000 made at the beginning of each year. The equipment has a fair value of $1,100,000 and an estimated economic life of 12 years. The lease does not transfer ownership, contains no purchase option, and the equipment will revert to the lessor. The incremental borrowing rate is 5%, and the present value of the lease payments is $1,022,000. Which analysis correctly applies the ASC 842 classification criteria?",
  "Choices": {
    "A": "The lease is operating because none of the first four criteria are met — term less than 75% and PV less than 90%.",
    "B": "The lease is finance because PV of $1,022,000 equals 92.9% of fair value, which substantially meets the 90% threshold.",
    "C": "The lease is finance because the term of 10 years represents 83.3% of the 12-year economic life and the PV at 5% is $1,022,000 — both the term test and PV test indicate substantially all economic benefits are transferred.",
    "D": "Classification cannot be determined without the residual value guarantee and end-of-term fair value."
  },
  "CorrectChoice": "C",
  "ExplanationWrongA": "The PV of $1,022,000/$1,100,000 = 92.9%, which exceeds 90%. The term of 10/12 = 83.3% exceeds 75%. Both tests indicate a finance lease.",
  "ExplanationWrongB": "Correct classification but understates the strength of both tests. The PV ratio of 92.9% clearly exceeds 90%, and the term ratio of 83.3% clearly exceeds 75%.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Introduces unnecessary complexity. ASC 842-10-25-2 specifies five criteria. The two quantitative tests are clearly met.",
  "ExplanationCorrect": "Under ASC 842-10-25-2, a lessee classifies a lease as a finance lease when any of five criteria is met. The two quantitative tests: (3) lease term represents a major part of economic life (75% or more), and (4) PV of payments equals substantially all of fair value (90% or more). Meridian: term = 83.3% > 75%, PV ratio = 92.9% > 90%. Both tests independently indicate a finance lease.",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-25-2",
    "ASC 842-10-25-3"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-30: ASC 842 Lease Classification and Balance Sheet Impact"
  ],
  "source_support_for_key": {
    "source_id": "FA-30",
    "rule_or_proposition": "ASC 842 five-criteria test: term/economic-life >= 75% or PV/fair-value >= 90%",
    "application_to_facts": "Term 83.3% > 75%; PV 92.9% > 90%; both met -> finance lease",
    "key_conclusion": "Both quantitative tests exceeded -> finance lease"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Miscalculates PV ratio",
      "why_plausible": "Fails to compute 92.9%",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Understates compliance",
      "why_plausible": "Uses imprecise language",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Claims insufficient data",
      "why_plausible": "Introduces irrelevant factors",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A miscalculates PV. Option B understates. Option D claims insufficient data.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Variable interest entity consolidation and primary beneficiary determination",
  "QuestionID": "P2-A-548",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-548-atlas-manufacturing-vie-primary-beneficiary-consolidation-analysis",
  "Stem": "Atlas Manufacturing sponsors a VIE that acquires and operates commercial real estate. Atlas holds a 5% equity interest, provided a $2,000,000 cash shortfall guarantee, and operates the properties through a wholly-owned management subsidiary. The VIE's total equity is $10,000,000. Two other investors hold 45% and 50% equity. Which analysis correctly determines the primary beneficiary?",
  "Choices": {
    "A": "Atlas is the primary beneficiary because it holds equity and manages properties, giving it power and benefit regardless of the guarantee.",
    "B": "Atlas is the primary beneficiary because it provides management activities that significantly affect the VIE's economic performance and absorbs expected losses through the guarantee. Under ASC 810, these factors establish Atlas as primary beneficiary despite 5% equity.",
    "C": "Atlas is not the primary beneficiary because its 5% equity is smallest.",
    "D": "Atlas is not the primary beneficiary because the guarantee of $2,000,000 is less than total equity of $10,000,000."
  },
  "CorrectChoice": "B",
  "ExplanationWrongA": "Correct conclusion but incorrect reasoning. The 5% equity alone does not establish power or benefit. It is the combination of management authority and loss absorption through the guarantee.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Incorrectly assumes equity percentage determines primary beneficiary. Under ASC 810-10-25-38, the primary beneficiary has (a) power to direct significant activities AND (b) obligation to absorb losses or right to receive benefits.",
  "ExplanationWrongD": "Incorrectly applies a proportional test. ASC 810 does not require a guarantee to represent a majority of equity.",
  "ExplanationCorrect": "Under ASC 810-10-25-38 through 25-42, the primary beneficiary has (a) power to direct activities that most significantly impact the VIE's economic performance AND (b) obligation to absorb losses or right to receive benefits. Atlas satisfies both: its management subsidiary directs property management activities, and the cash shortfall guarantee absorbs losses. Even with 5% equity, the power-and-benefit analysis is qualitative, not proportional.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 810-10-25-38",
    "ASC 810-10-25-42",
    "ASC 810-10-45-16"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-32: Variable Interest Entities and Consolidation"
  ],
  "source_support_for_key": {
    "source_id": "FA-32",
    "rule_or_proposition": "Primary beneficiary = power to direct significant activities + obligation to absorb losses or right to receive benefits",
    "application_to_facts": "Atlas has power (management) + benefit (guarantee) -> primary beneficiary despite 5% equity",
    "key_conclusion": "Atlas is primary beneficiary despite 5% equity"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Equity + management = automatic primary beneficiary",
      "why_plausible": "Oversimplifies power-and-benefit into single-factor test",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Largest equity holder consolidates",
      "why_plausible": "Confuses equity ownership with ASC 810 test",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Guarantee must exceed percentage threshold",
      "why_plausible": "Invents 50% threshold not in ASC 810",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A oversimplifies. Option C applies equity ownership. Option D invents threshold.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Securitization of receivables and derecognition under ASC 860",
  "QuestionID": "P2-A-549",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-549-pacific-plastics-securitization-derecognition-continuing-involvement",
  "Stem": "Pacific Plastics transfers $15,000,000 of trade receivables to an SPE. The SPE issues $12,200,000 in commercial paper. Pacific retains a $2,800,000 subordinated beneficial interest and provides a $1,500,000 recourse obligation for credit losses beyond 2%. Under ASC 860, how should Pacific account for this?",
  "Choices": {
    "A": "Pacific does not derecognize because the recourse obligation constitutes continuing involvement preventing transfer of control. The $15,000,000 remains on the balance sheet, and $12,200,000 is recorded as a secured borrowing.",
    "B": "Pacific derecognizes $15,000,000 and recognizes a $2,800,000 beneficial interest and $1,500,000 recourse liability.",
    "C": "Pacific derecognizes $12,200,000 and retains $2,800,000. The recourse obligation is disclosed but does not affect derecognition.",
    "D": "Pacific derecognizes $15,000,000 because the SPE is a QSPE that is bankruptcy-remote."
  },
  "CorrectChoice": "A",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Assumes derecognition without evaluating control. Pacific retains continuing involvement through recourse and beneficial interest.",
  "ExplanationWrongC": "Applies partial derecognition that does not exist in ASC 860. Derecognition is all-or-nothing.",
  "ExplanationWrongD": "Invokes QSPE status as automatic derecognition trigger. QSPE status does not override the transferor's control-surrender evaluation.",
  "ExplanationCorrect": "Under ASC 860-10-40-5, a transfer is a sale only if the transferor has surrendered control. Pacific retains: (1) a $2,800,000 subordinated beneficial interest, and (2) a $1,500,000 recourse obligation. This continuing involvement prevents surrender of control. The transfer is a secured borrowing. However, this answer (A) correctly identifies the derecognition analysis framework while noting that the facts prevent derecognition.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Understand",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 860-10-40-5",
    "ASC 860-10-40-1",
    "ASC 460-10-25"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-31: Securitization and Receivables Transfer"
  ],
  "source_support_for_key": {
    "source_id": "FA-31",
    "rule_or_proposition": "ASC 860: surrender of control required for derecognition; recourse = continuing involvement = no derecognition",
    "application_to_facts": "$1.5M recourse + $2.8M beneficial interest = continuing involvement -> secured borrowing",
    "key_conclusion": "Transfer is secured borrowing; $15M receivables remain on balance sheet"
  },
  "distractor_intent": {
    "B": {
      "misconception": "Derecognition appropriate with beneficial interest",
      "why_plausible": "Applies sale model without evaluating control",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Partial derecognition permitted",
      "why_plausible": "Splits transfer into sale and borrowing",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "QSPE automatically derecognizes",
      "why_plausible": "Confuses QSPE with derecognition analysis",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A ignores control. Option C applies partial derecognition. Option D invokes QSPE.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Equity method accounting for joint ventures under ASC 323",
  "QuestionID": "P2-A-550",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-550-orion-industries-equity-method-joint-venture-investment-account",
  "Stem": "Orion Industries holds a 30% equity interest in Greenfield Solar LLC. Greenfield reports net income of $1,600,000 and declares dividends of $400,000. Orion's initial investment was $2,400,000. Greenfield has an internally developed patent valued at $800,000 not amortized on its books. Orion's annual amortization of excess basis is $50,000. What balance should Orion report at year-end?",
  "Choices": {
    "A": "$2,710,000, because Orion adds income ($480,000), subtracts amortization ($50,000), and subtracts dividends ($120,000) from the initial investment ($2,400,000).",
    "B": "$2,880,000, because Orion adds income ($480,000) to initial investment and subtracts dividends ($120,000). Patent amortization does not affect the account.",
    "C": "$3,520,000, because Orion records income ($480,000) minus amortization ($50,000) but ignores dividends.",
    "D": "$3,000,000, because Orion adds income ($480,000) to initial investment and treats dividends as income."
  },
  "CorrectChoice": "A",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Ignores patent amortization entirely. Under ASC 323-10-35-6, the investor must amortize excess basis.",
  "ExplanationWrongC": "This arrives at the correct value but uses incorrect reasoning about dividends. Under the equity method, dividends DO reduce the investment balance.",
  "ExplanationWrongD": "Treats dividends as income. Under ASC 323-10-35-6, dividends reduce the investment balance, not income.",
  "ExplanationCorrect": "Under ASC 323-10-35, the equity method requires initial recording at cost with subsequent adjustments. Orion: initial $2,400,000 + share of income ($1,600,000 x 30% = $480,000) - amortization ($50,000) - dividends ($400,000 x 30% = $120,000) = $2,710,000. The correct answer (A) reflects this calculation.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "numeric",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 323-10-35-6",
    "ASC 323-10-35-2"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-33: Equity Method Investment Accounting"
  ],
  "source_support_for_key": {
    "source_id": "FA-33",
    "rule_or_proposition": "Investment = cost + share of income - dividends - excess-basis amortization",
    "application_to_facts": "$2,400,000 + $480,000 - $50,000 - $120,000 = $2,710,000",
    "key_conclusion": "Year-end investment balance is $2,710,000"
  },
  "distractor_intent": {
    "C": {
      "misconception": "Ignores dividends",
      "why_plausible": "Confuses dividend treatment",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Ignores patent amortization",
      "why_plausible": "Overlooks excess basis amortization",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Treats dividends as income",
      "why_plausible": "Confuses equity with cost method",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A ignores dividends. Option B ignores amortization. Option D treats dividends as income.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Throughput arrangement accounting under ASC 606",
  "QuestionID": "P2-A-551",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-551-summit-energy-throughput-arrangement-principal-versus-agent-revenue",
  "Stem": "Summit Energy operates a natural gas processing plant under a throughput arrangement with Clearwater Refining. Summit receives raw gas, processes it, and returns it. Summit charges $3.00 per MCF. During the month, Summit processes 500,000 MCF at a total fee of $1,500,000. The raw gas has a market value of $45,000,000. How should Summit recognize revenue?",
  "Choices": {
    "A": "Summit recognizes $45,000,000 in revenue and $43,500,000 in COGS because Summit controls the gas during processing.",
    "B": "Summit recognizes $0 because the arrangement is a barter transaction.",
    "C": "Summit recognizes $46,500,000 combining the fee and gas value as a single performance obligation.",
    "D": "Summit recognizes $1,500,000 in revenue (the processing fee) because Summit acts as an agent. The raw gas value never belongs to Summit."
  },
  "CorrectChoice": "D",
  "ExplanationWrongA": "Applies principal model when facts indicate agency. Summit receives Clearwater's gas, processes it, and returns it — the gas is Clearwater's property throughout.",
  "ExplanationWrongB": "This analysis correctly identifies Summit as an agent but mischaracterizes the arrangement as barter.",
  "ExplanationWrongC": "Combines gas value and fee into single revenue. The gas belongs to Clearwater — Summit never controls it.",
  "ExplanationWrongD": "",
  "ExplanationCorrect": "Under ASC 606-10-55-36 through 55-40, Summit is an agent because it does not control the gas before transfer. Summit recognizes revenue equal to the processing fee: $1,500,000. The correct answer (D) accurately describes the agent revenue recognition model while the distractors misapply principal treatment, combine unrelated revenue, or mischaracterize as barter.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 606-10-55-36",
    "ASC 606-10-55-40"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-34: Throughput Arrangements and Revenue Recognition"
  ],
  "source_support_for_key": {
    "source_id": "FA-34",
    "rule_or_proposition": "Principal controls good before transfer; agent arranges for another's performance and recognizes net fee",
    "application_to_facts": "Summit processes Clearwater's gas without title or use direction -> agent -> $1.5M fee only",
    "key_conclusion": "Summit is agent; recognizes $1,500,000 processing fee only"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Processing risk = control",
      "why_plausible": "Risk-bearing does not equal control",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Combines gas and fee",
      "why_plausible": "Fails to separate gas from service",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Barter requires cash",
      "why_plausible": "Mischaracterizes service arrangement",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A applies principal model. Option C combines unrelated streams. Option D mischaracterizes as barter.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Satellite tracking arrangement lease identification under ASC 842",
  "QuestionID": "P2-A-552",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-552-orbit-communications-satellite-tracking-arrangement-lease-identification",
  "Stem": "Orbit Communications enters a five-year contract with SkyLink Satellites for transponder capacity. Orbit uses two of twelve transponders. SkyLink owns the satellite and handles maintenance. The satellite is not physically separable and transponders cannot be redeployed. SkyLink can reallocate capacity for technical reasons. Does this arrangement contain a lease under ASC 842?",
  "Choices": {
    "A": "The arrangement contains a finance lease because Orbit controls the transponders for five years.",
    "B": "The arrangement contains an operating lease because the transponders are identified assets used for five years.",
    "C": "The arrangement does not contain a lease because Orbit does not control the identified asset. The transponders are not separable, SkyLink retains reallocation rights, and Orbit cannot direct alternative use.",
    "D": "The arrangement is a service contract because a lease requires a physically distinct asset."
  },
  "CorrectChoice": "C",
  "ExplanationWrongA": "Assumes lease exists and classifies as finance. Under ASC 842-10-15-42, a lease requires control: right to obtain benefits AND right to direct use.",
  "ExplanationWrongB": "Correctly identifies the arrangement as not containing a lease, but the reasoning applies to a different scenario.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Correctly identifies service contract but misstates criterion. The issue is lack of control, not lack of physical distinctness.",
  "ExplanationCorrect": "Under ASC 842-10-15-42, a contract conveys the right to control use of an identified asset only if the customer has (a) right to obtain substantially all benefits and (b) right to direct use. Orbit fails both tests. The correct answer (C) recognizes that while transponders may be identified assets, Orbit lacks the control necessary for lease classification.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-15-42",
    "ASC 842-10-15-43"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-30: ASC 842 Lease Classification and Balance Sheet Impact"
  ],
  "source_support_for_key": {
    "source_id": "FA-30",
    "rule_or_proposition": "Lease requires right to control use of identified asset (benefits + directed use)",
    "application_to_facts": "Orbit lacks control: SkyLink reallocates, transponders not separable -> no lease",
    "key_conclusion": "No lease exists; arrangement is a service contract"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Assumes lease exists",
      "why_plausible": "Jumps to classification without control test",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Confuses identification with control",
      "why_plausible": "Identifies asset but does not test control",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Physically distinct required",
      "why_plausible": "Conflates identification methods",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A skips control test. Option C confuses identification with control. Option D misstates identification.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Sale-leaseback transaction accounting under ASC 842 and ASC 606",
  "QuestionID": "P2-A-553",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-553-vanguard-industrial-sale-leaseback-sale-recognition-and-finance-lease",
  "Stem": "Vanguard Industrial sells its manufacturing facility to Blackstone Capital for $12,000,000 (fair value equals carrying amount). Vanguard immediately enters a 20-year leaseback at $750,000 annual rent. The building has a 30-year remaining useful life. No purchase option exists. Does the transaction qualify as a sale, and how is the leaseback classified?",
  "Choices": {
    "A": "Not a sale because Vanguard retains substantially all use through the 20-year leaseback (66.7% of remaining life).",
    "B": "Qualifies as a sale, but Vanguard must defer all proceeds because the leaseback creates a repurchase option.",
    "C": "Qualifies as a sale. The leaseback is a finance lease because 66.7% substantially meets the 75% threshold.",
    "D": "Qualifies as a sale because fair value equals carrying amount (no profit to defer). The leaseback is an operating lease because the 20-year term is less than 75% of the 30-year remaining life."
  },
  "CorrectChoice": "D",
  "ExplanationWrongA": "Incorrectly applies a control-retention test that does not exist. ASC 842-10-40-5 evaluates ASC 606 sale criteria and leaseback classification separately.",
  "ExplanationWrongB": "Correctly identifies the transaction as a sale but misclassifies the leaseback.",
  "ExplanationWrongC": "Correctly identifies sale but misclassifies leaseback. 20/30 = 66.7% is below the 75% bright-line.",
  "ExplanationWrongD": "",
  "ExplanationCorrect": "Under ASC 842-10-40-5, a sale-leaseback qualifies as a sale when the transfer meets ASC 606 criteria. The building transfers at fair value equal to carrying amount. The leaseback at 66.7% of remaining life is below the 75% bright-line, making it an operating lease. The correct answer (D) properly applies the sale-leaseback framework.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-40-5",
    "ASC 606-10-25-30",
    "ASC 842-10-25-2"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-30: ASC 842 Lease Classification and Balance Sheet Impact"
  ],
  "source_support_for_key": {
    "source_id": "FA-30",
    "rule_or_proposition": "Sale-leaseback: sale when ASC 606 criteria met; leaseback classified under ASC 842 five-criteria test",
    "application_to_facts": "Sale qualifies (FV = carrying amount); leaseback 20/30 = 66.7% < 75% -> operating lease",
    "key_conclusion": "Sale recognized; leaseback is operating at 66.7% of remaining life"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Leaseback prevents sale",
      "why_plausible": "Misapplies nonexistent test",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "66.7% meets 75% threshold",
      "why_plausible": "Uses imprecise language for below-threshold result",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Repurchase option prevents derecognition",
      "why_plausible": "Invokes non-existent option",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A invents test. Option C understates threshold. Option D invokes non-existent option.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Off-balance-sheet financing impact on financial ratios",
  "QuestionID": "P2-A-554",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-554-calypso-energy-off-balance-sheet-spe-consolidation-ratio-impact",
  "Stem": "Calypso Energy operates offshore platforms through an SPE. The SPE holds $200,000,000 in assets financed by $180,000,000 in nonrecourse debt. Calypso guarantees $50,000,000 and provides operational management. Calypso standalone: assets $500,000,000, liabilities $300,000,000, equity $200,000,000, net income $40,000,000. What is the impact of SPE consolidation?",
  "Choices": {
    "A": "D/E improves from 1.50 to 1.38 because SPE equity is added to consolidated equity. ROA unchanged.",
    "B": "D/E deteriorates from 1.50 to 2.18 because SPE's $180,000,000 debt is added to liabilities while only $20,000,000 net assets flow to equity. ROA declines from 8.0% to 5.7%.",
    "C": "D/E unchanged because SPE nonrecourse debt and assets offset. ROA declines due to SPE operating losses.",
    "D": "D/E deteriorates from 1.50 to 1.85 because only Calypso's guarantee is added to liabilities."
  },
  "CorrectChoice": "B",
  "ExplanationWrongA": "Incorrectly adds SPE equity without proportionate debt. Both assets ($200M) and liabilities ($180M) are added.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Incorrectly claims nonrecourse debt offsets assets. Under ASC 810-10-45-16, ALL VIE assets and liabilities are added gross.",
  "ExplanationWrongD": "Incorrectly limits consolidation to guarantee amount. ASC 810 requires consolidating ALL VIE liabilities.",
  "ExplanationCorrect": "Under ASC 810-10-45-16, VIE consolidation adds all assets and liabilities gross. Pre: D/E = $300M/$200M = 1.50. Post: liabilities = $480M; equity = $220M; D/E = 2.18. Pre-ROA = 8.0%. Post: assets = $700M; ROA = 5.7%. Consolidation eliminates the off-balance-sheet advantage.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "numeric",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 810-10-45-16",
    "ASC 810-10-25-38"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-32: Variable Interest Entities and Consolidation"
  ],
  "source_support_for_key": {
    "source_id": "FA-32",
    "rule_or_proposition": "VIE consolidation adds ALL assets and liabilities gross; D/E deteriorates when SPE is leveraged",
    "application_to_facts": "D/E 1.50 -> 2.18; ROA 8.0% -> 5.7%",
    "key_conclusion": "SPE consolidation worsens D/E from 1.50 to 2.18 and ROA from 8.0% to 5.7%"
  },
  "distractor_intent": {
    "A": {
      "misconception": "SPE equity without debt",
      "why_plausible": "Assumes only net assets to equity",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Nonrecourse offsets assets",
      "why_plausible": "Applies incorrect netting",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Only guarantee to liabilities",
      "why_plausible": "Confuses guarantee with consolidation",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A adds equity without debt. Option C applies netting. Option D limits to guarantee.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Operating lease versus finance lease income statement effects under ASC 842",
  "QuestionID": "P2-A-555",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-555-nova-logistics-operating-versus-finance-lease-expense-pattern-front-loading",
  "Stem": "Nova Logistics has two leases. Lease A (finance): $100,000 annual payments, 6% rate, 8-year term, PV ~$620,000. Lease B (operating): same terms. Year 1: finance lease interest ~$37,200; operating lease straight-line expense $100,000. How do first-year expenses differ?",
  "Choices": {
    "A": "Finance lease total ~$137,200 (interest $37,200 + amortization ~$100,000), higher than operating $100,000 in year 1.",
    "B": "Both produce same $100,000 expense because total cash payments are identical.",
    "C": "Finance lease total ~$114,700 in year 1 (ROU amortization ~$77,500 + interest $37,200); operating lease $100,000 straight-line. Finance lease ~$14,700 higher in year 1.",
    "D": "Operating lease higher at ~$137,200 because it includes both ROU amortization and interest."
  },
  "CorrectChoice": "C",
  "ExplanationWrongA": "Overstates by using $100,000 for ROU amortization. The ROU asset of $620,000/8 years = ~$77,500/year.",
  "ExplanationWrongB": "Correctly identifies the expense pattern difference but overstates the year-1 difference.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Incorrectly applies finance lease treatment to operating lease. Operating lease recognizes single straight-line cost.",
  "ExplanationCorrect": "Under ASC 842, finance leases recognize amortization and interest (front-loaded), while operating leases recognize a single straight-line cost. Over the full lease term, both recognize the same total expense, but timing differs. The correct answer (C) properly quantifies the year-1 finance lease expense at approximately ,700 versus the operating lease expense of ,000.",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-25-6",
    "ASC 842-10-35-8"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-30: ASC 842 Lease Classification and Balance Sheet Impact"
  ],
  "source_support_for_key": {
    "source_id": "FA-30",
    "rule_or_proposition": "Finance lease = amortization + interest (front-loaded); operating lease = single straight-line; same total over term",
    "application_to_facts": "Finance year 1: ~$77,500 + $37,200 = ~$114,700; operating: $100,000",
    "key_conclusion": "Finance lease front-loads ~$14,700 more in year 1"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Overstates ROU amortization",
      "why_plausible": "Estimates $100,000 without computing straight-line",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Identical annual expense",
      "why_plausible": "Confuses total over term with annual recognition",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Operating includes amortization and interest",
      "why_plausible": "Applies finance treatment to operating lease",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A overstates amortization. Option B claims identical annual. Option D applies finance to operating.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 ASC 860 transfer of receivables with continuing involvement",
  "QuestionID": "P2-A-556",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-556-heritage-healthcare-receivables-transfer-recourse-and-subordinated-interest",
  "Stem": "Heritage Healthcare transfers $8,000,000 of insured receivables to MedFinance with recourse. Heritage receives $7,200,000 cash and retains a $800,000 subordinated beneficial interest. Heritage provides a recourse obligation guaranteeing 95% of credit losses. Under ASC 860, what treatment applies?",
  "Choices": {
    "A": "Transfer qualifies as a sale because recourse is limited to credit losses. Heritage derecognizes $8,000,000.",
    "B": "Transfer does not qualify as a sale because recourse constitutes continuing involvement preventing surrender of control. $8,000,000 remains; $7,200,000 recorded as secured borrowing.",
    "C": "Transfer qualifies as a sale because MedFinance obtains control and Heritage relinquishes all risks.",
    "D": "Transfer is partially a sale ($7,200,000) and partially a borrowing ($800,000)."
  },
  "CorrectChoice": "B",
  "ExplanationWrongA": "Incorrectly concludes sale. Heritage retains recourse and subordinated interest, both constituting continuing involvement.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Incorrectly claims Heritage relinquishes all risks. The 95% recourse and subordinated interest both represent continuing involvement.",
  "ExplanationWrongD": "Applies partial derecognition that does not exist. ASC 860 is all-or-nothing.",
  "ExplanationCorrect": "Under ASC 860-10-40-5, a transfer is a sale only if the transferor surrendered control. Heritage retains: (1) recourse guaranteeing 95% of credit losses, and (2) $800,000 subordinated interest. Both constitute continuing involvement. The transfer is a secured borrowing.",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "CognitiveLevel": "Analyze",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 860-10-40-5",
    "ASC 460-10-25"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-31: Securitization and Receivables Transfer"
  ],
  "source_support_for_key": {
    "source_id": "FA-31",
    "rule_or_proposition": "Sale requires surrender of control; recourse = continuing involvement = no derecognition",
    "application_to_facts": "95% recourse + $800K subordinated interest = continuing involvement -> secured borrowing",
    "key_conclusion": "Transfer is secured borrowing; $8M receivables remain; $7.2M is liability"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Recourse limited to credit losses permits derecognition",
      "why_plausible": "Assumes limited recourse avoids analysis",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Recourse and interest not continuing involvement",
      "why_plausible": "Overlooks both forms",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Partial derecognition permitted",
      "why_plausible": "Splits transfer into sale and borrowing",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A assumes limited recourse. Option C ignores continuing involvement. Option D applies partial derecognition.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 VIE consolidation impact on debt covenants",
  "QuestionID": "P2-A-557",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-557-vanguard-industrial-vie-consolidation-debt-covenant-compliance-analysis",
  "Stem": "Vanguard Industrial has a debt covenant requiring maximum D/E of 2.50. Standalone: liabilities $300,000,000, equity $150,000,000 (D/E = 2.00). Vanguard is primary beneficiary of a VIE with $100,000,000 in assets, $95,000,000 nonrecourse debt, and $5,000,000 equity. What is the consolidated D/E?",
  "Choices": {
    "A": "Consolidated D/E is 2.55 ($395,000,000/$155,000,000), violating the 2.50 covenant.",
    "B": "D/E remains 2.00 because nonrecourse debt is not Vanguard's obligation.",
    "C": "D/E is 2.44 ($390,000,000/$160,000,000), complying with 2.50.",
    "D": "D/E is 2.19 ($345,000,000/$157,500,000), complying with 2.50. Only 50% of nonrecourse debt consolidated."
  },
  "CorrectChoice": "A",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Incorrectly excludes nonrecourse debt. Under ASC 810-10-45-16, ALL VIE liabilities are consolidated regardless of recourse.",
  "ExplanationWrongC": "Incorrect totals. Correct: liabilities $395M; equity $155M; D/E = 2.55.",
  "ExplanationWrongD": "Incorrectly applies 50% haircut. ASC 810 includes nonrecourse debt at full face amount.",
  "ExplanationCorrect": "Under ASC 810-10-45-16, VIE consolidation adds all assets and liabilities gross. Pre: D/E = 2.00. Post: liabilities = $395M; equity = $155M; D/E = 2.548, rounding to 2.55. This exceeds 2.50, constituting technical default.",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "CognitiveLevel": "Apply",
  "CalculationItem": true,
  "ItemStyle": "numeric",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 810-10-45-16",
    "ASC 810-10-25-38"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-32: Variable Interest Entities and Consolidation"
  ],
  "source_support_for_key": {
    "source_id": "FA-32",
    "rule_or_proposition": "VIE consolidation adds all assets/liabilities gross; nonrecourse debt fully consolidated; covenant evaluated on consolidated basis",
    "application_to_facts": "D/E = $395M/$155M = 2.55 > 2.50 covenant; default triggered",
    "key_conclusion": "VIE consolidation pushes D/E from 2.00 to 2.55, violating 2.50 covenant"
  },
  "distractor_intent": {
    "B": {
      "misconception": "Nonrecourse excluded",
      "why_plausible": "Assumes nonrecourse eliminates from liabilities",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Correct totals, wrong ratio",
      "why_plausible": "Miscalculates ratio",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "50% haircut",
      "why_plausible": "Applies invented haircut",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option B excludes nonrecourse. Option C has ratio error. Option D applies haircut.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 ASC 842 lease modification and remeasurement",
  "QuestionID": "P2-A-558",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-558-atlas-manufacturing-lease-modification-remeasurement-scope-and-accounting",
  "Stem": "Atlas Manufacturing has a 10-year operating lease at $200,000/year. At year 5, Atlas and the lessor modify: extend term by 3 years (8 remaining) and increase payments to $250,000. PV of revised payments: $1,800,000. ROU asset before modification: $1,200,000. How should Atlas account for this modification?",
  "Choices": {
    "A": "Treated as new separate lease because consideration increases 25% and term extends 3 years.",
    "B": "Accounted for as separate contract when modification grants additional right of use and payments increase commensurate with standalone price.",
    "C": "Accounted for by remeasuring lease liability to PV of revised payments ($1,800,000) and adjusting ROU asset by same amount. Not a new lease because underlying asset is the same.",
    "D": "Not a lease modification because original terms remain unchanged."
  },
  "CorrectChoice": "C",
  "ExplanationWrongA": "Incorrectly concludes separate lease. Under ASC 842-10-25-8, modification is separate contract only if additional right of use. Extending same equipment is not additional right.",
  "ExplanationWrongB": "States correct test but reaches wrong conclusion. Extending same equipment is not additional right of use.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Incorrectly denies modification. Extending 3 years and increasing payments is a modification under ASC 842-10-25-1.",
  "ExplanationCorrect": "Under ASC 842-10-25-8 through 25-18, modification is separate contract only if: (a) additional right of use, AND (b) payments increase commensurate with standalone price. Extending same equipment is not additional right — criterion (a) not met. Under ASC 842-10-25-13, lessee remeasures liability to PV of revised payments and adjusts ROU asset equally.",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-25-8",
    "ASC 842-10-25-13",
    "ASC 842-10-25-1"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-30: ASC 842 Lease Classification and Balance Sheet Impact"
  ],
  "source_support_for_key": {
    "source_id": "FA-30",
    "rule_or_proposition": "Modification = separate contract only if additional right of use + commensurate payment increase; otherwise remeasure and adjust",
    "application_to_facts": "Extension of same asset = no additional right -> not separate -> remeasure to $1.8M",
    "key_conclusion": "Not separate contract; remeasure liability and ROU asset within existing lease"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Substantive changes create new lease",
      "why_plausible": "Confuses magnitude with ASC 842 criteria",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "Applies test but reaches wrong conclusion",
      "why_plausible": "States correct test, concludes incorrectly",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Denies modification exists",
      "why_plausible": "Ignores extension and payment increase",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A treats as new lease. Option B applies test incorrectly. Option D denies modification.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Off-balance-sheet financing risk disclosure and analytical adjustments",
  "QuestionID": "P2-A-559",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-559-pinnacle-manufacturing-off-balance-sheet-adjusted-ratios-analyst-perspective",
  "Stem": "Pinnacle Manufacturing standalone: assets $800,000,000, liabilities $400,000,000, equity $400,000,000, net income $60,000,000. Operating leases with PV obligations of $120,000,000 not on balance sheet. A guaranteed SPE with $100,000,000 in assets and $90,000,000 in nonrecourse debt not consolidated. What are the fully-adjusted D/E and ROA?",
  "Choices": {
    "A": "Adjusted D/E 1.45 and ROA 5.5%, reflecting full capitalization of leases and SPE.",
    "B": "Adjusted D/E 1.30 and ROA 6.7%, because only leases are added while SPE offsets.",
    "C": "Adjusted D/E 1.22 and ROA 7.1%, because SPE net assets added to equity while only leases increase liabilities.",
    "D": "Adjusted D/E 1.49 ($610M/$410M) and ROA 5.9% ($60M/$1,020M), because both leases and full SPE debt added to liabilities, SPE assets added to assets, net $10M to equity."
  },
  "CorrectChoice": "D",
  "ExplanationWrongA": "Incorrect equity figure. Adjusted equity should be $410M, not $405M.",
  "ExplanationWrongB": "Incorrectly claims SPE offsets. Under ASC 810, ALL SPE assets and liabilities are added gross.",
  "ExplanationWrongC": "Incorrectly applies netting. Consolidation requires adding all assets and liabilities gross.",
  "ExplanationWrongD": "",
  "ExplanationCorrect": "Under ASC 842 and ASC 810, off-balance-sheet items are adjusted. Standalone: D/E = 1.00; ROA = 7.5%. Adjustments: (1) Operating leases: +$120M to liabilities and assets. (2) SPE: +$100M assets, +$90M debt gross; $10M net to equity. Adjusted: liabilities = $610M; equity = $410M; assets = $1,020M. D/E = 1.49; ROA = 5.9%.",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "CognitiveLevel": "Analyze",
  "CalculationItem": true,
  "ItemStyle": "numeric",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 842-10-25-1",
    "ASC 810-10-45-16"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-32: Variable Interest Entities and Consolidation"
  ],
  "source_support_for_key": {
    "source_id": "FA-32",
    "rule_or_proposition": "Adjustments: capitalize leases (ASC 842) + consolidate VIEs (ASC 810) gross",
    "application_to_facts": "D/E 1.00 -> 1.49; ROA 7.5% -> 5.9%",
    "key_conclusion": "Fully-adjusted D/E ~1.49 and ROA ~5.9% after incorporating all off-balance-sheet obligations"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Wrong equity figure",
      "why_plausible": "Uses incorrect equity adjustment",
      "tier_candidate": 2
    },
    "B": {
      "misconception": "SPE offsets",
      "why_plausible": "Applies netting not permitted by ASC 810",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Only net SPE to equity",
      "why_plausible": "Adds net without gross consolidation",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A has wrong equity. Option B applies netting. Option C uses net without gross.",
  "source_status": "RESOLVED",
  "hold_reason": ""
},

  {
  "Part": 2,
  "schema_version": "1.1",
  "Section": "A",
  "Topic": "A.7 Joint venture equity method versus consolidation under ASC 323 and ASC 810",
  "QuestionID": "P2-A-560",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "a-560-northstar-ventures-joint-venture-equity-method-versus-consolidation-decision",
  "Stem": "Northstar Ventures holds 40% equity in MedTech Innovations. MedTech: assets $50,000,000, liabilities $20,000,000, equity $30,000,000. Net income $5,000,000, dividends $1,500,000. Northstar's initial investment: $10,000,000. Northstar has no VIE variable interest. The JV agreement gives Northstar significant participating rights. Should Northstar use the equity method or consolidate?",
  "Choices": {
    "A": "Northstar must consolidate because 40% + participating rights gives control.",
    "B": "Northstar uses the equity method because 40% + participating rights gives significant influence but not control. Under ASC 323, significant influence is presumed at 20-50% and demonstrated through participating rights.",
    "C": "Northstar uses the cost method because 40% does not exceed 50%. Equity method requires majority interest.",
    "D": "Northstar must consolidate because MedTech is a VIE and Northstar is primary beneficiary by virtue of largest equity interest."
  },
  "CorrectChoice": "B",
  "ExplanationWrongA": "Incorrectly concludes consolidation. Under ASC 810-10-25-1, consolidation requires controlling financial interest (>50% or VIE PBA). 40% + participating rights = significant influence, not control.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Incorrectly states equity method requires majority. Under ASC 323-10-15-6, equity method is required when significant influence exists at 20-50%.",
  "ExplanationWrongD": "Incorrectly concludes VIE consolidation. Facts state Northstar has no VIE variable interest.",
  "ExplanationCorrect": "Under ASC 323-10-15-6, the equity method is required when an investor has significant influence. ASC 323-10-15-7 presumes significant influence at 20-50%. Northstar's 40% + significant participating rights = significant influence. Northstar records: 40% of $5M income = $2M; 40% of $1.5M dividends = $600K. Ending balance: $11,400,000. Consolidation not required.",
  "Difficulty": "Very Difficult",
  "DifficultyScore": 5,
  "CognitiveLevel": "Evaluate",
  "CalculationItem": false,
  "ItemStyle": "select",
  "LOSTag": "A.7",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "Authorities": [
    "ASC 323-10-15-6",
    "ASC 323-10-15-7",
    "ASC 810-10-25-1"
  ],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)"
  ],
  "source_ids": [
    "FA-33: Equity Method Investment Accounting"
  ],
  "source_support_for_key": {
    "source_id": "FA-33",
    "rule_or_proposition": "Equity method: significant influence (20-50% + participating rights); consolidation requires control (>50% or VIE PBA)",
    "application_to_facts": "40% + participating rights = significant influence -> equity method; not control -> no consolidation",
    "key_conclusion": "Equity method appropriate; 40% with participating rights = significant influence, not control"
  },
  "distractor_intent": {
    "A": {
      "misconception": "Participating rights = control",
      "why_plausible": "Confuses significant influence with control",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Equity method requires majority",
      "why_plausible": "Incorrectly requires >50%",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Largest equity = VIE PBA",
      "why_plausible": "Assumes ownership determines PBA",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Option A elevates influence to control. Option C requires majority. Option D assumes ownership determines PBA.",
  "source_status": "RESOLVED",
  "hold_reason": ""
}
];
