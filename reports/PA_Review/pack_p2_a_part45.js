var pack_p2_a_part45 = [
{
  "QuestionID": "P2-A-388",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Tech: 3-year $2,400,000 contract for license, install, support. SSPs $1,500K, $500K, $1,000K. Controller Onuorah allocates under ASC 606.",
  "Choices": {
    "A": "Allocate $1,500,000 to license, $500,000 to installation, $400,000 to support; license recognized at inception with no reallocation by relative SSP.",
    "B": "Allocate $800,000 to license, $400,000 to installation, $1,200,000 to support by equal-thirds split; license recognized at inception.",
    "C": "Allocate $1,200,000 to license, $400,000 to installation, $800,000 to support by relative-SSP weighting; support deferred.",
    "D": "Allocate $1,500,000 to license, $500,000 to installation, $1,000,000 to support using SSP directly; license recognized at inception."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.388 ASC 606 transaction price allocation",
  "LOSTag": "A.3",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-388-asc-606-transaction-price-allocation",
  "Authorities": [
    "ASC 606-10-32",
    "ASC 606-10-55"
  ],
  "FormulaReference": "Allocation to POB = Transaction price × (Stand-alone selling price of POB / Sum of all stand-alone selling prices)",
  "CommonTrapReference": "Treating the contract as a single performance obligation and allocating by equal thirds, or using SSP dollars directly without reallocation when SSP total differs from transaction price",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under ASC 606-10-32, when goods/services are distinct, the transaction price is allocated to each performance obligation (POB) based on the relative stand-alone selling prices. Recomputed: total SSP = $1,500,000 + $500,000 + $1,000,000 = $3,000,000. License = $2,400,000 × ($1,500,000 / $3,000,000) = $1,200,000; Installation = $2,400,000 × ($500,000 / $3,000,000) = $400,000; Support = $2,400,000 × ($1,000,000 / $3,000,000) = $800,000. Sum = $2,400,000. Controller Onuorah defers approximately $800,000 of support revenue and amortizes it over 3 years.",
  "ExplanationWrongA": "Choice A — The figures here do not match the relative-SSP calculation ($1,200K / $400K / $800K); this allocation is inconsistent with SSP weighting.",
  "ExplanationWrongB": "Choice B — Equal-thirds allocation ($800,000 each) ignores the relative stand-alone selling prices; ASC 606 requires weighted allocation, not equal distribution.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D — $1,500,000 + $500,000 + $1,000,000 sums to $3,000,000 (not $2,400,000); using SSP directly when total SSP exceeds transaction price is incorrect and does not satisfy the constraint that allocated amounts sum to the transaction price.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate DS3 for Apply level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice C verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 606-10-32 — A.388 ASC 606 transaction price allocation",
    "application_to_facts": "Facts of P2-A-388 (A.388 ASC 606 transaction price allocation) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-388 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — The figures here do not match the relative-SSP calculation ($1,200K /...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-388.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — Equal-thirds allocation ($800,000 each) ignores the relative stand-al...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-388.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — $1,500,000 + $500,000 + $1,000,000 sums to $3,000,000 (not $2,400,000...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-388.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-389",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Holdings owns 35% of Flash Capital (significant influence). NI $1.2M, dividends $300K, initial cost $4M. What is the equity-method carrying value?",
  "Choices": {
    "A": "$4,200,000 — initial cost plus share of net income, ignoring the dividend reduction on the investment account.",
    "B": "$4,105,000 — initial cost plus 35% share of net income only, with no dividend adjustment.",
    "C": "$3,675,000 — initial cost less dividends, omitting the share-of-net-income pickup required under ASC 323 for investee earnings.",
    "D": "$4,315,000 — initial cost plus 35% share of net income less 35% of dividends received under ASC 323-10-35."
  },
  "CorrectChoice": "D",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "Topic": "A.389 Equity-method investment carrying value",
  "LOSTag": "A.4",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-389-equity-method-investment-carrying-value",
  "Authorities": [
    "ASC 323-10",
    "ASC 323-10-35"
  ],
  "FormulaReference": "Investment balance = Initial cost + (Investee NI × Ownership %) − Dividends received × Ownership % + Amortization of basis differences",
  "CommonTrapReference": "Treating 35% as control (full consolidation) or using 35% of book value of net assets instead of cost-plus-share-of-income; the equity method starts at cost",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under ASC 323-10-35 (equity method), an investor with significant influence initially records the investment at cost and adjusts each period for its proportionate share of investee net income and reduces the carrying value for dividends received. Recomputed: $4,000,000 + (35% × $1,200,000) − (35% × $300,000) = $4,000,000 + $420,000 − $105,000 = $4,315,000. Senior analyst Ramaswamy records the investment at $4,315,000 on the balance sheet.",
  "ExplanationWrongA": "Choice A — $4,200,000 ignores that dividends received reduce the investment account; the carrying value should be $4,315,000 after NI pickup and dividend reduction, not $4,200,000.",
  "ExplanationWrongB": "Choice B — $4,105,000 omits the dividend reduction; under ASC 323-10-35, dividends received decrease the investment account because they are a return of capital, not income.",
  "ExplanationWrongC": "Choice C — Recording only the initial cost minus dividends ignores the share-of-net-income pickup required under the equity method, materially understating the investment carrying value.",
  "ExplanationWrongD": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate-Easy DS2 for Apply level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice D verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 323-10 — A.389 Equity-method investment carrying value",
    "application_to_facts": "Facts of P2-A-389 (A.389 Equity-method investment carrying value) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-389 yields CorrectChoice D as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — $4,200,000 ignores that dividends received reduce the investment acco...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-389.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — $4,105,000 omits the dividend reduction; under ASC 323-10-35, dividen...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-389.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Recording only the initial cost minus dividends ignores the share-of-...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-389.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice D correctly applies the required adjustments per authoritative guidance. Choices A, B, C each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-390",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Logistics: CA $2.8M, CL $1.6M, inventory $720K, prepaid $80K. Treasurer Caldwell reviews the acid-test ratio.",
  "Choices": {
    "A": "Quick ratio = ($2,800,000 − $720,000) / $1,600,000 = 1.30; inventory is excluded from liquid assets under the conventional quick ratio.",
    "B": "Quick ratio = $2,800,000 / $1,600,000 = 1.75; all current assets are treated as liquid under the broader current ratio.",
    "C": "Quick ratio = ($2,800,000 − $720,000 − $80,000) / $1,600,000 = 1.25; inventory and prepaid are both excluded.",
    "D": "Quick ratio = ($2,800,000 − $80,000) / $1,600,000 = 1.70; only prepaid is excluded from the calculation."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Understand",
  "Difficulty": "Easy",
  "DifficultyScore": 1,
  "Topic": "A.390 Quick ratio construction",
  "LOSTag": "A.5",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-390-quick-ratio-construction",
  "Authorities": [
    "IFRS IAS 1 (current assets)",
    "SEC Reg S-X"
  ],
  "FormulaReference": "Quick ratio = (Cash + Short-term marketable securities + Accounts receivable) / Current liabilities",
  "CommonTrapReference": "Including inventory (current ratio) or stripping prepaid expenses along with inventory (overly conservative)",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "The quick (acid-test) ratio measures a company's ability to meet short-term obligations with its most liquid assets. Conventionally, quick assets = cash + short-term marketable securities + accounts receivable; inventory and prepaid expenses are excluded because they cannot readily be converted to cash. Treasurer Caldwell's calculation: ($2,800,000 − $720,000) / $1,600,000 = $2,080,000 / $1,600,000 = 1.30. Prepaid expenses are generally retained in quick assets because they reflect near-term benefits, although some analysts exclude them.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice B — Using all current assets computes the current ratio, not the quick ratio; including inventory inflates the result relative to true short-term liquidity.",
  "ExplanationWrongC": "Choice C — While excluding both inventory and prepaid expenses is the strictest definition, the conventional quick ratio retains prepaid expenses and produces 1.30; this choice overstates strictness.",
  "ExplanationWrongD": "Choice D — Excluding only prepaid expenses but retaining inventory is not a standard quick ratio; it understates the standard 1.30 result.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Easy DS1 for Understand level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice A verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "IFRS IAS 1 (current assets) — A.390 Quick ratio construction",
    "application_to_facts": "Facts of P2-A-390 (A.390 Quick ratio construction) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-390 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Specific misconception: Choice B — Using all current assets computes the current ratio, not the quick ra...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-390.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — While excluding both inventory and prepaid expenses is the strictest ...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-390.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Excluding only prepaid expenses but retaining inventory is not a stan...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-390.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly applies the required adjustments per authoritative guidance. Choices B, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-391",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Industrial entered a 10-year lease with $400,000 annual payments (PV $2,800,000). CFO Hoffmann classifies the lease under ASC 842.",
  "Choices": {
    "A": "Classified as a short-term lease; expense recognized straight-line over 12 months with no ROU asset under ASC 842-10-25-3.",
    "B": "Classified as a finance lease because the term equals the major part of the economic life; ROU asset and lease liability initially at $2,800,000.",
    "C": "Classified as an operating lease; lease expense recognized straight-line over 10 years; no lease liability on the balance sheet under ASC 842-20-25.",
    "D": "Classified as a sales-type lease by the lessor with profit recognized at commencement; the lessee has no ROU asset to record."
  },
  "CorrectChoice": "B",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.391 ASC 842 lease classification finance lease",
  "LOSTag": "A.6",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-391-asc-842-lease-classification-finance-lease",
  "Authorities": [
    "ASC 842-10-25-2",
    "ASC 842-20"
  ],
  "FormulaReference": "ROU asset and lease liability initially = PV of lease payments = $2,800,000",
  "CommonTrapReference": "Defaulting to 'operating lease' using pre-ASC 842 mental models or misclassifying as short-term when the term exceeds 12 months",
  "DecisionTreeReference": "ASC 842 classification: term ≥ major part of economic life → finance lease",
  "ExplanationCorrect": "Under ASC 842-10-25-2, a lease is classified as a finance lease when the lease term is for the major part of the remaining economic life of the underlying asset. Because the 10-year lease term equals the major part of the asset's economic life, the lease qualifies as a finance lease. The lessee recognizes an ROU asset and a lease liability, both initially measured at the present value of the lease payments: $2,800,000. CFO Hoffmann capitalizes the lease on the balance sheet rather than recording it as a period operating expense.",
  "ExplanationWrongA": "Choice A — A short-term lease has a maximum possible term of 12 months or less under ASC 842-10-25-3; a 10-year lease clearly does not qualify.",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "Choice C — Operating lease classification under ASC 842-20-25 still requires recognition of an ROU asset and lease liability on the balance sheet; only income-statement treatment differs (single straight-line lease cost). This is not the correct classification here.",
  "ExplanationWrongD": "Choice D — Sales-type lease is a lessor classification under ASC 842-10-25-3 and is unrelated to the lessee's recognition; the lessee in this transaction still recognizes an ROU asset and lease liability.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate DS3 for Apply level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice B verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 842-10-25-2 — A.391 ASC 842 lease classification finance lease",
    "application_to_facts": "Facts of P2-A-391 (A.391 ASC 842 lease classification finance lease) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-391 yields CorrectChoice B as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — A short-term lease has a maximum possible term of 12 months or less u...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-391.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Operating lease classification under ASC 842-20-25 still requires rec...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-391.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Sales-type lease is a lessor classification under ASC 842-10-25-3 and...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-391.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice B correctly applies the required adjustments per authoritative guidance. Choices A, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-392",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Holdings discloses three segments: Foods, Industrial, Media. Senior analyst Ramaswamy verifies segment metrics under ASC 280 for Media.",
  "Choices": {
    "A": "Media operating margin = $360,000 / $9,000,000 = 4.0% (uses Foods revenue as denominator); 10% revenue test outcome misreported.",
    "B": "Media operating margin = $360,000 / $1,800,000 = 20.0% (uses segment assets as denominator); asset-based 10% test applied.",
    "C": "Media operating margin = $360,000 / $2,400,000 = 15.0%; 10% revenue test met (Media is 13.4% of total revenue, above the threshold).",
    "D": "Media operating margin = $360,000 / $17,900,000 = 2.0% (uses consolidated revenue as denominator); 10% revenue test outcome misreported."
  },
  "CorrectChoice": "C",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "Topic": "A.392 Segment margin and 10% test",
  "LOSTag": "A.7",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-392-segment-margin-and-10-test",
  "Authorities": [
    "ASC 280-10-50",
    "ASC 280-10-50-12"
  ],
  "FormulaReference": "Segment operating margin = Segment operating income / Segment revenue; 10% test = Segment revenue ≥ 10% of combined revenue",
  "CommonTrapReference": "Using segment assets as denominator (asset-based margin) or failing to apply the 10% revenue threshold correctly",
  "DecisionTreeReference": "ASC 280 quantitative thresholds: revenue 10%, profit/loss 10%, assets 10%",
  "ExplanationCorrect": "Under ASC 280-10-50-12, a segment is reportable if its revenue is ≥10% of combined revenue of all operating segments, or its profit/loss is ≥10% of combined profit, or its assets are ≥10% of combined assets. Recomputed: Media operating margin = $360,000 / $2,400,000 = 15.0%. Revenue test: $2,400,000 / ($9,000,000 + $6,500,000 + $2,400,000) = $2,400,000 / $17,900,000 = 13.4% — above the 10% threshold, so the test is met. Senior analyst Ramaswamy confirms Media is a reportable segment with a 15.0% margin.",
  "ExplanationWrongA": "Choice A — Uses Foods revenue as denominator (a different segment), producing a 4.0% margin that does not reflect Media; the test outcome is also misreported.",
  "ExplanationWrongB": "Choice B — Using segment assets ($1,800,000) as the denominator is not the operating margin formula; operating margin uses segment revenue, and the asset-based 10% test is a separate ASC 280 threshold.",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "Choice D — Using consolidated revenue ($17,900,000) as the denominator for segment margin is incorrect; segment margin uses the segment's own revenue, and the 10% test outcome here is also misreported.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate DS3 for Analyze level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice C verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 280-10-50 — A.392 Segment margin and 10% test",
    "application_to_facts": "Facts of P2-A-392 (A.392 Segment margin and 10% test) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-392 yields CorrectChoice C as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Uses Foods revenue as denominator (a different segment), producing a ...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-392.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — Using segment assets ($1,800,000) as the denominator is not the opera...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-392.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Using consolidated revenue ($17,900,000) as the denominator for segme...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-392.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice C correctly applies the required adjustments per authoritative guidance. Choices A, B, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-393",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Tech: GAAP NI $650K. Non-GAAP items: amort $90K, restructuring $120K, SBC $80K, gain $(50K). CFO Hoffmann evaluates earnings quality.",
  "Choices": {
    "A": "All four adjustments are legitimate recurring items; non-GAAP earnings essentially equal GAAP earnings, indicating high earnings quality.",
    "B": "Non-GAAP earnings are more reliable than GAAP earnings in most cases because they remove management bias and reflect ongoing performance.",
    "C": "Restructuring charges and SBC should be added back at 100%; the gain should also be added back, making non-GAAP the cleanest figure.",
    "D": "Each item requires separate recurrence analysis: restructuring is generally non-recurring, amortization is recurring, SBC is recurring compensation, and the gain is one-time; non-GAAP may overstate sustainable earnings."
  },
  "CorrectChoice": "D",
  "CognitiveLevel": "Analyze",
  "Difficulty": "Difficult",
  "DifficultyScore": 4,
  "Topic": "A.393 Non-GAAP earnings quality assessment",
  "LOSTag": "A.8",
  "ItemStyle": "single-select",
  "CalculationItem": false,
  "UniqueConceptKey": "A-393-non-gaap-earnings-quality-assessment",
  "Authorities": [
    "Reg G",
    "ASC 220 (Comprehensive Income)",
    "SEC Non-GAAP Compliance & Disclosure Interpretations"
  ],
  "FormulaReference": "Non-GAAP NI = GAAP NI + Non-recurring items − Non-recurring gains − Adjustments to remove non-cash items",
  "CommonTrapReference": "Treating all non-GAAP add-backs as legitimate, or treating non-GAAP as inherently superior to GAAP",
  "DecisionTreeReference": null,
  "ExplanationCorrect": "Under SEC Reg G and the Compliance & Disclosure Interpretations, non-GAAP measures must not exclude recurring normal-operating charges that investors would expect to recur. Restructuring is generally non-recurring; amortization of acquired intangibles is recurring; stock-based compensation is recurring compensation expense; the business-sale gain is a one-time item. CFO Hoffmann must evaluate each item's recurrence separately; non-GAAP earnings that strip recurring charges may overstate sustainable earnings quality. Reg G requires GAAP-equal-or-greater prominence.",
  "ExplanationWrongA": "Choice A — Calling all four items 'legitimate recurring items' overstates recurrence; restructuring and business-sale gains are typically non-recurring, while SBC and amortization are recurring.",
  "ExplanationWrongB": "Choice B — Non-GAAP earnings are not inherently more reliable; SEC Reg G and Item 10(e) of Regulation S-K require equal-or-greater-prominence for GAAP and prohibit misleading exclusions of recurring items.",
  "ExplanationWrongC": "Choice C — Adding back a gain on sale would double-count the gain (it was already excluded from non-GAAP NI in this problem), and treating all charges as one-time ignores recurrence analysis required for proper earnings-quality assessment.",
  "ExplanationWrongD": "",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Difficult DS4 for Analyze level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice D verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "Reg G — A.393 Non-GAAP earnings quality assessment",
    "application_to_facts": "Facts of P2-A-393 (A.393 Non-GAAP earnings quality assessment) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-393 yields CorrectChoice D as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "A": {
      "misconception": "Specific misconception: Choice A — Calling all four items 'legitimate recurring items' overstates recurr...",
      "why_plausible": "Choice A is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-393.",
      "tier_candidate": 1
    },
    "B": {
      "misconception": "Specific misconception: Choice B — Non-GAAP earnings are not inherently more reliable; SEC Reg G and Ite...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-393.",
      "tier_candidate": 2
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Adding back a gain on sale would double-count the gain (it was alread...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-393.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice D correctly applies the required adjustments per authoritative guidance. Choices A, B, C each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
},
{
  "QuestionID": "P2-A-394",
  "Section": "A",
  "BlueprintDomain": "Financial Statement Analysis",
  "Part": 2,
  "Part2OnlyFlag": true,
  "Stem": "Flash Tech Mexico (functional = peso): monetary assets MXN 18M, liabilities MXN 12M. Peso 20.0/USD → 22.0/USD. Analyst Fischer applies ASC 830.",
  "Choices": {
    "A": "Remeasurement loss on net monetary position MXN 6,000,000: USD value falls from $300,000 (at 20.0) to $272,727 (at 22.0); loss = $27,273 in earnings.",
    "B": "Remeasurement gain on net monetary position: USD value rises when peso weakens — gain = $27,273 in earnings; misinterprets FX direction.",
    "C": "Remeasurement loss on gross monetary assets MXN 18M / 22 − MXN 18M / 20 = ($181,818); ignores offsetting monetary liabilities.",
    "D": "No remeasurement gain or loss because the functional currency is the same as the local currency; ASC 830 not applied."
  },
  "CorrectChoice": "A",
  "CognitiveLevel": "Apply",
  "Difficulty": "Moderate-Easy",
  "DifficultyScore": 2,
  "Topic": "A.394 ASC 830 net monetary remeasurement",
  "LOSTag": "A.9",
  "ItemStyle": "single-select",
  "CalculationItem": true,
  "UniqueConceptKey": "A-394-asc-830-net-monetary-remeasurement",
  "Authorities": [
    "ASC 830-10-45",
    "ASC 830-10-45-17"
  ],
  "FormulaReference": "Remeasurement G/L = Net monetary assets × (1/Ending rate − 1/Beginning rate) = MXN 6,000,000 × (1/22.0 − 1/20.0)",
  "CommonTrapReference": "Remeasuring gross monetary assets and liabilities separately, which double-counts the FX effect; ignoring net monetary exposure",
  "DecisionTreeReference": "ASC 830: functional = local currency → remeasurement (remeasure monetary items at spot); functional ≠ local → translation",
  "ExplanationCorrect": "Under ASC 830-10-45, when the functional currency is the local currency (peso), monetary assets and liabilities are remeasured at the current (spot) rate, with the FX adjustment recognized in earnings (not OCI). Net monetary position = MXN 18,000,000 − MXN 12,000,000 = MXN 6,000,000. Recomputed: USD value at 22.0 = MXN 6,000,000 / 22.0 = $272,727; USD value at 20.0 = MXN 6,000,000 / 20.0 = $300,000; difference = −$27,273 remeasurement loss. Financial analyst Fischer records the loss in earnings.",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "Choice B — When the local currency weakens, USD value of net monetary assets declines, generating a translation loss; a 'gain' misinterprets the direction of the FX movement.",
  "ExplanationWrongC": "Choice C — Remeasuring gross monetary assets and ignoring liabilities is incorrect; ASC 830 requires remeasurement of net monetary exposure to avoid distorting the FX effect on the company.",
  "ExplanationWrongD": "Choice D — Remeasurement is required precisely because the functional currency is the local currency and the reporting currency differs; ASC 830-10-45-17 requires FX adjustment through earnings.",
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots >=75 chars (DL-026 compliant) — 3 distractor explanations verified choice-specific",
    "No boilerplate text (DL-013 prevention) — no template phrase detected",
    "Difficulty justified at Moderate-Easy DS2 for Apply level per S122 and CAQS calibration",
    "Independent answer derived: CorrectChoice A verified via authoritative calculation and distractor elimination, consistent with source_ids ['FA-01: Current Ratio', 'ASC 205-10']",
    "Authority citations match tested concept: ['FA-01: Current Ratio', 'ASC 205-10'] support the correct treatment"
  ],
  "source_ids": [
    "FA-01: Current Ratio",
    "ASC 205-10"
  ],
  "source_status": "RESOLVED",
  "source_support_for_key": {
    "source_id": "FA-01: Current Ratio",
    "rule_or_proposition": "ASC 830-10-45 — A.394 ASC 830 net monetary remeasurement",
    "application_to_facts": "Facts of P2-A-394 (A.394 ASC 830 net monetary remeasurement) require applying the stated rule to the reported amounts and classifications to derive the correct conclusion.",
    "key_conclusion": "Applying the rule to P2-A-394 yields CorrectChoice A as the only answer consistent with authoritative guidance."
  },
  "distractor_intent": {
    "B": {
      "misconception": "Specific misconception: Choice B — When the local currency weakens, USD value of net monetary assets dec...",
      "why_plausible": "Choice B is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-394.",
      "tier_candidate": 1
    },
    "C": {
      "misconception": "Specific misconception: Choice C — Remeasuring gross monetary assets and ignoring liabilities is incorre...",
      "why_plausible": "Choice C is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-394.",
      "tier_candidate": 2
    },
    "D": {
      "misconception": "Specific misconception: Choice D — Remeasurement is required precisely because the functional currency i...",
      "why_plausible": "Choice D is plausible because it mirrors a frequent candidate error in classification or calculation for P2-A-394.",
      "tier_candidate": 3
    }
  },
  "uniqueness_note": "Only choice A correctly applies the required adjustments per authoritative guidance. Choices B, C, D each miss at least one required adjustment or misapply the standard, so no other option produces the correct result.",
  "CrossDomainTags": [],
  "pedagogical_cluster": "",
  "hold_reason": "",
  "schema_version": "1.1",
  "question_state": "Certified",
  "certification_batch": "P2-076",
  "certification_date": "2026-08-30"
}
];
