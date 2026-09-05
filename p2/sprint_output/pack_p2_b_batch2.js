const pack_p2_b_batch2_questions = [
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Spot rate and cross-rate calculation",
    "QuestionID": "P2-B-516",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-516-spot-rate-cross-rate",
    "Stem": "Meridian Exports, a São Paulo-based agricultural commodity trader, receives USD 850,000 from a U.S. buyer and needs to convert the proceeds into euros to pay a European supplier. Treasury Analyst Luísa Ferreira observes the following rates: USD/BRL 5.4200 (bid) / 5.4250 (ask), EUR/BRL 6.1800 (bid) / 6.1860 (ask). What is the amount in euros Meridian will receive after conversion through the Brazilian real?",
    "Choices": {
      "A": "€749,819 — the USD amount divided by the EUR/BRL mid-rate (6.1830).",
      "B": "€755,816 — the USD amount multiplied by the USD/BRL bid (5.4200) then divided by the EUR/BRL ask (6.1860).",
      "C": "€744,954 — the USD amount converted to BRL at the bank's USD/BRL bid (5.4200), then divided by the EUR/BRL ask (6.1860).",
      "D": "€741,033 — the USD amount divided by the product of USD/BRL and EUR/BRL mid-rates."
    },
    "CorrectChoice": "C",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; cross-rate arbitrage"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Cross-rate conversion requires selling one currency at the bank's bid and buying another at the bank's ask.",
      "application_to_facts": "USD 850,000 × 5.4200 / 6.1860 = BRL 4,607,000 / 6.1860 = €744,954.",
      "key_conclusion": "The correct conversion yields approximately €744,954."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using mid-rates ignores the bid-ask spread",
        "why_plausible": "Mid-rate is commonly quoted and seems neutral",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "Reversing the bid-ask on the EUR/BRL leg",
        "why_plausible": "Multiply-then-divide structure seems logical",
        "tier_candidate": 1
      },
      "D": {
        "misconception": "Multiplying cross-rates as multiplicative factors",
        "why_plausible": "Combining rates into a single product is intuitive",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option C applies bid on USD sale and ask on EUR purchase. Option A ignores spread. Option B reverses EUR leg. Option D multiplies incorrectly.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "The bank buys Meridian's USD at the USD/BRL bid (5.4200) and sells EUR at the EUR/BRL ask (6.1860). USD 850,000 × 5.4200 = BRL 4,607,000. Dividing by the EUR/BRL ask: BRL 4,607,000 / 6.1860 = €744,954.",
    "ExplanationWrongA": "Mid-rates average the bid and ask but ignore the spread the bank actually charges. The bank does not transact at mid-rate.",
    "ExplanationWrongB": "This applies the EUR/BRL ask where the bid should be used. When Meridian buys euros, the bank sells at the higher ask price.",
    "ExplanationWrongD": "Multiplying USD/BRL and EUR/BRL into a single product conflates the two legs. Cross-rate conversion requires two steps: convert to BRL, then to EUR.",
    "ExplanationWrongC": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Covered interest rate parity forward rate",
    "QuestionID": "P2-B-517",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-517-covered-interest-rate-parity",
    "Stem": "Pinnacle Manufacturing, a U.S.-based firm, expects to receive EUR 2,400,000 in 90 days from a German customer. The current spot rate is EUR/USD 1.0920. The U.S. 90-day risk-free rate is 4.50% annualized and the eurozone 90-day risk-free rate is 3.00% annualized. Treasury Director Sarah Whitfield wants to lock in the dollar proceeds using a forward contract. Under covered interest rate parity, what is the 90-day forward rate (EUR/USD)?",
    "Choices": {
      "A": "1.0881 — the spot rate adjusted downward by the interest rate differential.",
      "B": "1.0961 — the spot rate multiplied by the ratio of U.S. to eurozone interest factors for the 90-day period.",
      "C": "1.0883 — the spot rate divided by the U.S. interest factor and multiplied by the eurozone interest factor.",
      "D": "1.0920 — the forward rate equals the spot rate because parity only holds when rates are equal."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; interest rate parity"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "F = S × (1 + r_domestic × Days/360) / (1 + r_foreign × Days/360).",
      "application_to_facts": "F = 1.0920 × 1.01125 / 1.0075 = 1.0961.",
      "key_conclusion": "The 90-day forward rate is approximately 1.0961."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Applying interest differential in wrong direction",
        "why_plausible": "Forward discount seems intuitive when U.S. rates exceed eurozone rates",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Inverting the interest rate ratio",
        "why_plausible": "Division/multiplication structure mirrors B but reverses numerator",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Assuming forward equals spot regardless of rate differentials",
        "why_plausible": "Some assume parity implies no forward premium",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B correctly applies the interest rate ratio. Option A reverses differential direction. Option C inverts the ratio. Option D incorrectly assumes parity eliminates the premium.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "F = S × (1 + r_USD × 90/360) / (1 + r_EUR × 90/360) = 1.0920 × 1.01125 / 1.0075 ≈ 1.0961. Since U.S. rates exceed eurozone rates, the euro trades at a forward premium.",
    "ExplanationWrongA": "This applies the interest differential in reverse. Under parity, the higher-rate currency (USD) trades at a forward discount.",
    "ExplanationWrongC": "This inverts the ratio, dividing by the U.S. factor and multiplying by the eurozone factor. The correct formula places the domestic rate in the numerator.",
    "ExplanationWrongD": "Parity means the forward premium offsets the interest differential, not that forward equals spot. When rates differ, forward must differ from spot.",
    "ExplanationWrongB": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Forward premium/discount — parity implication on forward vs. spot",
    "QuestionID": "P2-B-518",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-518-parity-forward-spot-implication",
    "Stem": "Caldwell & Partners, a UK-based asset management firm, is advising a client on currency hedging for a EUR-denominated bond portfolio. The current spot rate is GBP/EUR 1.1750. The UK 180-day risk-free rate is 5.0% annualized and the eurozone 180-day risk-free rate is 3.5% annualized. Under covered interest rate parity, which statement about the 180-day forward rate is correct?",
    "Choices": {
      "A": "The forward rate equals spot because interest rate parity ensures no arbitrage opportunity exists.",
      "B": "The forward rate is below spot, reflecting the euro's forward discount due to the eurozone's lower interest rate.",
      "C": "The forward rate is above spot, reflecting the euro's forward premium because the eurozone rate exceeds the UK rate.",
      "D": "The forward rate is below spot, reflecting the pound's forward discount because the UK rate exceeds the eurozone rate, making the pound more expensive forward."
    },
    "CorrectChoice": "D",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; interest rate parity"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Under interest rate parity, the higher-rate currency trades at a forward discount. UK rate (5.0%) > eurozone rate (3.5%), so GBP trades at a forward discount against EUR.",
      "application_to_facts": "F = S × (1 + r_EUR × 180/360) / (1 + r_GBP × 180/360). Since r_GBP > r_EUR, F < S. GBP/EUR forward < 1.1750.",
      "key_conclusion": "The pound trades at a forward discount; the forward rate is below spot."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Assuming parity implies forward equals spot",
        "why_plausible": "No-arbitrage condition is often misunderstood as rate equality",
        "tier_candidate": 3
      },
      "B": {
        "misconception": "Correct direction but wrong currency attribution",
        "why_plausible": "The euro is at a premium, not a discount; the pound is at a discount",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Reversing the premium/discount direction",
        "why_plausible": "Eurozone has the lower rate, so EUR should be at a premium, not GBP",
        "tier_candidate": 2
      }
    },
    "uniqueness_note": "Option D correctly identifies the pound's forward discount. Option A incorrectly assumes forward equals spot. Option B misattributes the discount to the euro. Option C reverses the direction.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Under interest rate parity, the currency with the higher interest rate trades at a forward discount. The UK rate (5.0%) exceeds the eurozone rate (3.5%), so the pound must trade at a forward discount against the euro. The GBP/EUR forward rate is below the spot rate of 1.1750.",
    "ExplanationWrongA": "Interest rate parity ensures no arbitrage, but it does not imply the forward equals spot. Parity requires the forward premium/discount to exactly offset the interest differential.",
    "ExplanationWrongB": "The eurozone has the lower rate, so the euro trades at a forward premium (not discount). The pound, with the higher rate, trades at a discount. This option misattributes the direction.",
    "ExplanationWrongC": "The eurozone rate (3.5%) is lower than the UK rate (5.0%), so the euro should be at a premium, not the pound. This option reverses the premium/discount direction.",
    "ExplanationWrongD": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Transaction exposure — unhedged vs. hedged outcomes",
    "QuestionID": "P2-B-519",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-519-transaction-exposure-unhedged",
    "Stem": "Greenfield Logistics, a U.S. freight company, has a EUR 1,200,000 payable due in 90 days to a German carrier. The current spot rate is EUR/USD 1.0950. Greenfield's CFO, Angela Torres, is evaluating whether to remain unhedged or enter a 90-day forward contract at EUR/USD 1.0890. If the spot rate in 90 days is EUR/USD 1.0680, which statement correctly describes the outcome?",
    "Choices": {
      "A": "Remaining unhedged results in a USD 32,400 favorable variance because the payable costs fewer dollars when the euro weakens.",
      "B": "The forward contract produces a USD 32,400 unfavorable variance because the locked-in rate exceeds the eventual spot rate.",
      "C": "The forward contract produces a USD 7,200 favorable variance because the locked-in rate is lower than the original spot rate.",
      "D": "Both the unhedged position and the forward contract produce identical dollar costs because the forward rate embeds the expected spot rate."
    },
    "CorrectChoice": "A",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; transaction exposure management"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Transaction exposure on a payable is favorable when the foreign currency weakens.",
      "application_to_facts": "Unhedged: EUR 1,200,000 × 1.0680 = USD 1,281,600. At original spot: USD 1,314,000. Favorable variance = USD 32,400.",
      "key_conclusion": "Remaining unhedged produces a USD 32,400 favorable variance."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Comparing forward to eventual spot instead of original spot",
        "why_plausible": "Forward exceeds eventual spot but comparison base is wrong",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Measuring hedging benefit instead of unhedged favorable variance",
        "why_plausible": "Forward vs original spot measures hedging advantage",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Assuming forward equals expected spot",
        "why_plausible": "Unbiasedness hypothesis confuses forward with expected spot",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A correctly identifies favorable variance from unhedged exposure. Option B misapplies comparison base. Option C measures wrong variance. Option D incorrectly assumes forward equals expected spot.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Unhedged: EUR 1,200,000 × 1.0680 = USD 1,281,600. At original spot: USD 1,314,000. Favorable variance = USD 32,400. When the foreign currency weakens, a dollar-based firm's foreign-currency payable costs fewer dollars.",
    "ExplanationWrongB": "The forward contract cost is EUR 1,200,000 × 1.0890 = USD 1,306,800. Compared to original spot, the forward saves USD 7,200 — a favorable variance, not unfavorable.",
    "ExplanationWrongC": "While the forward rate (1.0890) is below the original spot (1.0950), this measures hedging benefit, not the favorable variance from unhedged exposure which is USD 32,400.",
    "ExplanationWrongD": "The forward contract locks in a fixed rate regardless of actual future spot, while the unhedged position is exposed to whatever the spot rate turns out to be.",
    "ExplanationWrongA": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Currency exposure types — economic exposure definition",
    "QuestionID": "P2-B-520",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-520-economic-exposure-definition",
    "Stem": "Serenova Pharmaceuticals, a U.S.-based multinational, manufactures drugs in Ireland and sells them throughout Europe. The Irish subsidiary invoices in euros, maintains euro-denominated bank accounts, and pays employees in euros. Serenova's consolidated financial statements are reported in U.S. dollars. The CFO, David Chen, is reviewing which types of currency exposure affect the company. Which exposure captures the long-term impact of exchange rate changes on Serenova's competitive position and future cash flows?",
    "Choices": {
      "A": "Transaction exposure — the euro-denominated payables create a risk that the dollar cost of settling obligations will change before payment.",
      "B": "Translation exposure — the euro-denominated assets and liabilities generate gains or losses when consolidated into dollar financial statements.",
      "C": "Economic exposure — the long-term competitive position of Serenova changes as exchange rates alter the relative cost structure of Irish manufacturing.",
      "D": "Operating exposure — the hedged positions on the euro receivables eliminate all currency risk from the Irish subsidiary."
    },
    "CorrectChoice": "C",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "Authorities": [
      "International finance theory; FASB ASC 830"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Economic exposure measures how exchange rate changes affect a firm's long-term competitive position and future cash flows.",
      "application_to_facts": "Irish manufacturing cost structure in euros, combined with consolidated dollar reporting, means EUR/USD movements alter competitive positioning.",
      "key_conclusion": "Economic exposure captures the long-term competitive impact of exchange rate changes."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Transaction exposure relates to contractual cash flows, not long-term competition",
        "why_plausible": "Both involve foreign currency but transaction exposure is short-term",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Translation exposure is accounting consolidation, not competitive impact",
        "why_plausible": "Translation is an accounting mechanism, not a competitive effect",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Hedging cash flows does not eliminate economic exposure",
        "why_plausible": "Economic exposure persists regardless of whether cash flows are hedged",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option C correctly defines economic exposure. Option A describes transaction exposure. Option B describes translation exposure. Option D incorrectly assumes hedging eliminates all exposure.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Economic exposure measures how exchange rate changes affect a firm's long-term competitive position and future cash flows. The Irish subsidiary's euro-denominated cost structure means EUR/USD movements alter Serenova's relative cost competitiveness — economic exposure.",
    "ExplanationWrongA": "Transaction exposure relates to contractual obligations — the risk that rates change between transaction initiation and settlement. It is short-term, not long-term competitive impact.",
    "ExplanationWrongB": "Translation exposure is the accounting mechanism for consolidating foreign-currency balance sheet items. It is not a competitive effect.",
    "ExplanationWrongD": "Hedging specific cash flows addresses transaction exposure but does not eliminate economic exposure, which arises from structural cost advantages/disadvantages.",
    "ExplanationWrongC": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Hedging strategy selection — put option vs. forward vs. money market",
    "QuestionID": "P2-B-521",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-521-hedging-strategy-selection",
    "Stem": "Albion Beverages, a UK spirits manufacturer, will receive JPY 450,000,000 in 60 days from a Japanese distributor. The current spot rate is GBP/JPY 192.50. Albion's treasury team has obtained the following: a 60-day forward contract at GBP/JPY 191.80, a 60-day put option on GBP/JPY with a strike of 192.00 costing GBP 120,000, and a money market hedge involving borrowing JPY at 2.5% annualized and converting at spot. Albion's GBP cost of capital is 8% annualized. The CFO, Rebecca Sinclair, wants the strategy that provides downside protection while preserving upside potential if the yen appreciates. Which approach should Albion select?",
    "Choices": {
      "A": "The forward contract, because it locks in GBP/JPY 191.80 and eliminates all currency risk at zero upfront cost.",
      "B": "The put option, because it provides a floor exchange rate of 192.00 while allowing Albion to benefit if the yen strengthens beyond that level.",
      "C": "The money market hedge, because converting at the spot rate of 192.50 provides a better rate than the forward and eliminates all risk.",
      "D": "Remain unhedged, because the expected future spot rate based on interest rate parity equals the forward rate, making hedging unnecessary."
    },
    "CorrectChoice": "B",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; hedging strategy theory"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "A put option provides downside protection (floor rate) while preserving upside if the foreign currency appreciates.",
      "application_to_facts": "Put option strikes at 192.00, guaranteeing minimum rate while allowing participation in yen appreciation.",
      "key_conclusion": "The put option is the only strategy providing both downside protection and upside participation."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Forward eliminates all risk including upside",
        "why_plausible": "Zero cost seems optimal but requirement asks for upside preservation",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Money market eliminates risk but no upside",
        "why_plausible": "Spot rate exceeds forward but conversion happens now",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Unhedged preserves upside but no downside protection",
        "why_plausible": "Parity suggests forward equals expected spot but ignores downside requirement",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B provides both downside protection and upside participation. Option A eliminates upside. Option C provides no upside. Option D provides no downside protection.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "A put option grants the right to sell GBP at 192.00. If yen weakens beyond 192.00, Albion exercises the put. If yen strengthens, Albion converts at the more favorable spot rate. The GBP 120,000 premium is the cost of asymmetric protection.",
    "ExplanationWrongA": "The forward eliminates all risk including the possibility of benefiting from yen appreciation. The question explicitly requires preserving upside.",
    "ExplanationWrongC": "The money market hedge converts at today's spot rate (192.50), eliminating risk but also eliminating upside regardless of where the rate moves.",
    "ExplanationWrongD": "While the unbiasedness hypothesis suggests forward equals expected spot, this does not mean hedging is unnecessary. The question requires downside protection.",
    "ExplanationWrongB": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Transfer pricing — comparable uncontrolled transaction benchmark",
    "QuestionID": "P2-B-522",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-522-transfer-pricing-cup-benchmark",
    "Stem": "Calderón Consumer Products, a Mexican subsidiary of a U.S. parent, manufactures personal care products sold exclusively within Mexico. The Mexican SAT (tax authority) audits Calderón's transfer pricing and notes that the U.S. parent charges a royalty fee of 8% of net sales for use of proprietary formulations. The SAT's analysis shows that comparable uncontrolled licensing agreements in the Mexican personal care industry carry royalty rates of 4–6% of net sales. Which transfer pricing standard is the SAT applying, and what is the likely adjustment?",
    "Choices": {
      "A": "The arm's length principle requires the royalty to be reduced to the 4–6% comparable range, because unrelated parties in comparable transactions pay only 4–6%.",
      "B": "The cost-plus method requires the royalty to be set at the parent's formulation development cost plus a reasonable markup, regardless of industry comparables.",
      "C": "The profit split method requires the royalty to allocate combined profit between parent and subsidiary based on their relative contributions.",
      "D": "The resale price method requires the royalty to be deducted from the subsidiary's resale price to determine an appropriate gross margin."
    },
    "CorrectChoice": "A",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "Authorities": [
      "OECD Transfer Pricing Guidelines; Mexican transfer pricing rules (LISR Art. 179-184)"
    ],
    "source_ids": [
      "DA-09: Transfer Price (Minimum)"
    ],
    "source_support_for_key": {
      "source_id": "DA-09",
      "rule_or_proposition": "The arm's length principle requires controlled transaction terms to be consistent with comparable uncontrolled transactions.",
      "application_to_facts": "SAT identifies comparable licensing agreements at 4–6%. Calderón's 8% exceeds this range.",
      "key_conclusion": "The arm's length principle requires reducing the royalty to the 4–6% comparable range."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Cost-plus ignores market-based comparables",
        "why_plausible": "Cost-plus valid but SAT analysis is market-based",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Profit split for when neither party benchmarkable independently",
        "why_plausible": "SAT has comparable market data, making profit split unnecessary",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Resale price applies to product resale, not royalties",
        "why_plausible": "Resale price valid but for distribution, not royalty pricing",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A applies arm's length using SAT comparable data. Option B uses cost-plus. Option C uses profit split. Option D applies resale price to royalties.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "The arm's length principle requires the royalty rate to be consistent with comparable uncontrolled transactions. SAT's analysis shows comparable agreements at 4–6%. Calderón's 8% exceeds this range, triggering a downward adjustment.",
    "ExplanationWrongB": "The cost-plus method uses the parent's development cost plus markup, but the SAT's analysis is market-based (comparable royalty rates), not cost-based.",
    "ExplanationWrongC": "Profit split allocates combined profit when neither party can be benchmarked independently. Here, the SAT has comparable market data.",
    "ExplanationWrongD": "Resale price works backward from resale price minus margin. It applies to product resale, not intangible licensing royalties.",
    "ExplanationWrongA": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Net transaction exposure calculation",
    "QuestionID": "P2-B-523",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-523-net-transaction-exposure",
    "Stem": "Northstar Equipment, a Canadian manufacturer of industrial pumps, sells to distributors in France and Germany. In the current quarter, Northstar has EUR 8,500,000 in receivables from French customers and EUR 3,200,000 in payables to a German component supplier. The CFO, Pierre Dumont, needs to determine the net euro exposure before deciding on a hedging strategy. What is Northstar's net euro transaction exposure?",
    "Choices": {
      "A": "EUR 11,700,000 — the sum of receivables and payables, because both represent euro-denominated contractual obligations.",
      "B": "EUR 5,300,000 — the receivables minus the payables, representing the net euro position that must be hedged.",
      "C": "EUR 8,500,000 — only the receivables represent transaction exposure because payables are naturally offset by future receivables.",
      "D": "EUR 0 — the payables naturally hedge the receivables, eliminating all euro exposure without additional hedging instruments."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; transaction exposure management"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Net transaction exposure = receivables − payables.",
      "application_to_facts": "EUR 8,500,000 − EUR 3,200,000 = EUR 5,300,000 net receivable.",
      "key_conclusion": "Northstar has a net EUR 5,300,000 receivable exposure."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Adding instead of netting",
        "why_plausible": "Total euro transactions seem relevant but exposure is net",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Ignoring payables offset",
        "why_plausible": "Receivables primary concern but payables offset partially",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Assuming perfect offset",
        "why_plausible": "Natural hedging real but amounts differ by EUR 5,300,000",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B correctly nets receivables against payables. Option A adds them. Option C ignores payables. Option D assumes perfect offset.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Net exposure = EUR 8,500,000 − EUR 3,200,000 = EUR 5,300,000. This net receivable means Northstar must sell EUR 5,300,000 and buy CAD.",
    "ExplanationWrongA": "Adding (EUR 11,700,000) double-counts. Payables are a natural offset — they represent euros Northstar will spend.",
    "ExplanationWrongC": "Payables provide a partial natural hedge. Ignoring EUR 3,200,000 overstates exposure by EUR 3,200,000.",
    "ExplanationWrongD": "Receivables and payables differ by EUR 5,300,000, so they do not perfectly offset.",
    "ExplanationWrongB": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Transfer pricing — least defensible method when authorities disagree",
    "QuestionID": "P2-B-524",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-524-transfer-pricing-least-defensible",
    "Stem": "Apex Medical Devices, a U.S. parent company, sells finished medical devices to its wholly owned subsidiary in France. The French subsidiary also sells to unrelated third parties in the EU. The IRS wants Apex to increase the transfer price to maximize U.S. taxable income, while the French Direction Générale des Finances Publiques (DGFP) wants the transfer price decreased to maximize French taxable income. Transfer Pricing Director Marie Laurent must select the method least likely to satisfy both authorities simultaneously. Which approach provides the weakest defense when authorities disagree from opposite directions?",
    "Choices": {
      "A": "The cost-plus method using Apex's total production cost plus a 25% markup, because both authorities accept cost-based approaches as objective.",
      "B": "The comparable uncontrolled price method using the actual prices Apex charges to unrelated distributors in similar markets, because market data is objective and verifiable.",
      "C": "The resale price method using the French subsidiary's resale margin to unrelated EU customers, because it reflects the value-added by the subsidiary.",
      "D": "The transactional net margin method comparing the subsidiary's operating margin to comparable French medical device distributors, because net margins are indirect measures subject to cost allocation disputes."
    },
    "CorrectChoice": "D",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "Authorities": [
      "OECD Transfer Pricing Guidelines; IRS IRC §482"
    ],
    "source_ids": [
      "DA-09: Transfer Price (Minimum)"
    ],
    "source_support_for_key": {
      "source_id": "DA-09",
      "rule_or_proposition": "TNM uses indirect net margin measures that are harder for either authority to verify independently and more susceptible to cost allocation disputes.",
      "application_to_facts": "Net margins are influenced by overhead allocation, accounting practices, and other factors beyond the transfer price itself.",
      "key_conclusion": "TNM provides the weakest defense when authorities disagree because its indirect measures are hardest to verify."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Cost-plus is a reasonable defense even if markup is disputed",
        "why_plausible": "Cost-based approaches provide a verifiable starting point even if the markup is contested",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "CUP is the strongest defense, not the weakest",
        "why_plausible": "Market data is the most objective, making this the strongest rather than weakest",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Resale price may undervalue parent but provides a clear benchmark",
        "why_plausible": "Resale margin is observable even if the allocation between parent and subsidiary is debated",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option D correctly identifies TNM as the weakest defense due to indirect measures. Option A provides a reasonable starting point. Option B is the strongest defense. Option C provides an observable benchmark.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "The transactional net margin method compares net profit margins, which are indirect measures subject to overhead allocation, accounting practice differences, and other confounding factors. When authorities disagree from opposite directions, TNM's indirectness makes it hardest to defend because neither authority can independently verify the net margin benchmark without deep access to both parties' financials.",
    "ExplanationWrongA": "Cost-plus provides a verifiable starting point (production cost + markup). While the markup level is disputed, the cost base is objective. This is a reasonable defense, not the weakest.",
    "ExplanationWrongB": "CUP is the strongest defense when market data exists. It uses observable transaction prices that both authorities can independently verify. It is not the weakest approach.",
    "ExplanationWrongC": "Resale price provides an observable benchmark (resale margin). While the allocation between parent and subsidiary is debated, the margin itself is verifiable from the subsidiary's financials.",
    "ExplanationWrongD": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Translation exposure — balance sheet method",
    "QuestionID": "P2-B-525",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-525-translation-exposure-balance-sheet",
    "Stem": "Sterling Dynamics, a U.S. engineering firm, operates a wholly owned subsidiary in the United Kingdom. The subsidiary's balance sheet at year-end reports the following in British pounds: total assets of GBP 40,000,000, total liabilities of GBP 16,000,000, and shareholders' equity of GBP 24,000,000. The spot exchange rate at year-end is GBP/USD 1.2800. The prior year-end rate was GBP/USD 1.3200. Under the current rate method, what is the translation gain or loss on the UK subsidiary's net assets for the year?",
    "Choices": {
      "A": "USD 1,280,000 gain — the GBP 24,000,000 net assets multiplied by the year-end rate of 1.2800.",
      "B": "USD 960,000 loss — the GBP 24,000,000 net assets multiplied by the rate decrease of 0.0400.",
      "C": "USD 1,600,000 loss — the GBP 40,000,000 total assets translated at both rates.",
      "D": "USD 0 — translation gains or losses are reported in AOCI and do not affect net income."
    },
    "CorrectChoice": "B",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; FASB ASC 830"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Translation gain/loss = Net Assets × (Current Rate − Prior Rate).",
      "application_to_facts": "GBP 24,000,000 × (1.2800 − 1.3200) = GBP 24,000,000 × (−0.0400) = USD 960,000 loss.",
      "key_conclusion": "The translation loss is USD 960,000."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Calculating translated value instead of gain/loss",
        "why_plausible": "USD 30,720,000 is the translated value, not the change",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Using total assets instead of net assets",
        "why_plausible": "Total assets translated but exposure measured on net assets",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Confounding reporting location with economic impact",
        "why_plausible": "AOCI reporting doesn't eliminate economic impact",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option B correctly calculates translation loss on net assets. Option A reports translated value. Option C uses total assets. Option D confuses OCI with economic impact.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Net assets = GBP 40M − GBP 16M = GBP 24M. Translation loss = GBP 24M × (1.2800 − 1.3200) = USD 960,000 loss. When foreign currency weakens, USD value of net assets decreases.",
    "ExplanationWrongA": "USD 30,720,000 is the translated value at year-end (GBP 24M × 1.2800), not the gain or loss.",
    "ExplanationWrongC": "Translation exposure is measured on net assets (assets minus liabilities), not total assets. Using total assets overstates the exposure.",
    "ExplanationWrongD": "While reported in AOCI, translation gains/losses represent real economic impact on consolidated equity.",
    "ExplanationWrongB": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Transaction exposure — realized gain or loss on payable",
    "QuestionID": "P2-B-526",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-526-transaction-exposure-realized-gain",
    "Stem": "Monarch Industries, a Canadian manufacturer of precision tools, purchased equipment from a Swiss supplier for CHF 6,200,000. The payable was recorded on October 1 when the spot rate was CAD/CHF 1.4200. Monarch settled the payable on November 30 when the spot rate was CAD/CHF 1.3850. What transaction gain or loss does Monarch recognize on the income statement for the quarter?",
    "Choices": {
      "A": "CAD 217,000 gain — the Canadian dollar strengthened, so fewer CAD are needed to settle the CHF payable.",
      "B": "CAD 217,000 loss — the Canadian dollar weakened, so more CAD are needed to settle the CHF payable.",
      "C": "CAD 350,000 gain — the CHF 6,200,000 payable decreased in CAD value from CAD 8,804,000 to CAD 8,587,000.",
      "D": "CAD 350,000 loss — the settlement rate is lower than the recording rate, creating an unfavorable transaction."
    },
    "CorrectChoice": "A",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; IAS 21 / ASC 830"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "For a payable, a lower settlement rate is favorable (fewer home-currency units needed).",
      "application_to_facts": "Recording: CHF 6,200,000 × 1.4200 = CAD 8,804,000. Settlement: × 1.3850 = CAD 8,587,000. Gain = CAD 217,000.",
      "key_conclusion": "Monarch recognizes a CAD 217,000 transaction gain."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Confusing gain/loss direction on payable",
        "why_plausible": "Lower rate means fewer CAD needed — a gain, not loss",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Correct direction but wrong amount",
        "why_plausible": "CAD 350,000 is not the correct amount; actual gain is CAD 217,000",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Interpreting lower rate as unfavorable",
        "why_plausible": "Lower rate seems bad but for payable means fewer CAD needed",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A correctly calculates CAD 217,000 gain. Option B reverses direction. Option C states wrong amount. Option D incorrectly calls lower rate unfavorable.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Recording: CHF 6,200,000 × 1.4200 = CAD 8,804,000. Settlement: × 1.3850 = CAD 8,587,000. Gain = CAD 217,000. CAD strengthened, so fewer CAD needed.",
    "ExplanationWrongB": "Lower CAD/CHF means each CHF costs fewer CAD. Payable costs fewer CAD at settlement — a gain, not loss.",
    "ExplanationWrongC": "CAD 350,000 is incorrect. Actual gain is CAD 217,000 (CHF 6,200,000 × 0.035).",
    "ExplanationWrongD": "Lower settlement rate on payable is favorable — fewer CAD needed to settle the same CHF obligation.",
    "ExplanationWrongA": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Foreign currency borrowing analysis — cost comparison",
    "QuestionID": "P2-B-527",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-527-foreign-currency-borrowing",
    "Stem": "Horizon Renewables, a Brazilian energy company, needs to borrow BRL 50,000,000 for a 2-year infrastructure project. The domestic (Brazilian) borrowing rate is 14.5% annualized. A European bank offers a loan denominated in euros at 5.8% annualized. The current spot rate is EUR/BRL 6.1500. CFO Beatriz Almeida expects the Brazilian real to depreciate by approximately 3% per year against the euro over the 2-year loan term. What is the approximate all-in cost in BRL terms of the euro-denominated loan, and should Horizon accept it?",
    "Choices": {
      "A": "8.8% all-in cost — the euro interest rate of 5.8% plus the 3% expected depreciation, which is significantly cheaper than the 14.5% domestic rate.",
      "B": "14.5% all-in cost — the domestic and foreign rates are equivalent when expected depreciation is included, so Horizon should be indifferent.",
      "C": "11.8% all-in cost — the euro interest rate compounded with expected depreciation over 2 years, still cheaper than the domestic rate.",
      "D": "17.5% all-in cost — the euro interest rate plus cumulative depreciation over 2 years, making the foreign loan more expensive than domestic borrowing."
    },
    "CorrectChoice": "A",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-09: Forward/FX Premium or Discount",
    "Authorities": [
      "International finance theory; interest rate parity"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "All-in cost of foreign borrowing = foreign interest rate + expected depreciation.",
      "application_to_facts": "5.8% + 3% = 8.8%, vs. domestic 14.5%.",
      "key_conclusion": "Euro loan all-in cost ~8.8% is significantly cheaper than 14.5% domestic."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Assuming parity holds exactly",
        "why_plausible": "Parity suggests equilibration but 3% depreciation < 8.7% differential",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Compounding depreciation unnecessarily",
        "why_plausible": "Compounding seems precise but annual rate is standard",
        "tier_candidate": 1
      },
      "D": {
        "misconception": "Adding cumulative depreciation distorts comparison",
        "why_plausible": "Mixes 2-year cumulative with annual rate",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option A correctly uses annual interest plus annual depreciation. Option B assumes parity eliminates differential. Option C compounds unnecessarily. Option D mixes cumulative with annual.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "All-in cost ≈ 5.8% + 3% = 8.8%, significantly cheaper than 14.5% domestic rate. The 3% expected depreciation is less than the 8.7% interest differential.",
    "ExplanationWrongB": "Parity suggests forward premium offsets interest differential, but 3% depreciation < 8.7% differential — foreign loan is genuinely cheaper.",
    "ExplanationWrongC": "All-in cost uses annual rate: 5.8% + 3% = 8.8%. Compounding produces cumulative figure but comparison should be annualized.",
    "ExplanationWrongD": "Cumulative depreciation (~6.09%) plus 2-year interest gives ~17.7%, but this mixes cumulative with annual. Correct comparison: 8.8% vs. 14.5% annual.",
    "ExplanationWrongA": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Cross-border capital budgeting — country risk premium",
    "QuestionID": "P2-B-528",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-528-cross-border-capital-budgeting",
    "Stem": "Pinnacle Automotive, a German car manufacturer, is evaluating a 10-year investment in an assembly plant in India. The project's expected free cash flows are denominated in Indian rupees (INR). The project's beta is 1.2, the German risk-free rate is 2.8%, the Indian equity risk premium is 8.5%, and the country risk premium for India is 2.5%. The CFO, Hans Müller, uses the CAPM to compute the project's cost of equity in euro terms. What discount rate should Pinnacle apply to the INR-denominated cash flows?",
    "Choices": {
      "A": "12.2% — the German risk-free rate plus beta times the German equity risk premium, because the parent's home-country rate is always used for foreign projects.",
      "B": "13.0% — the Indian risk-free rate plus beta times the Indian equity risk premium, adjusted for the country risk premium.",
      "C": "16.0% — the German risk-free rate (2.8%) plus beta (1.2) times the sum of the Indian equity risk premium (8.5%) and the country risk premium (2.5%).",
      "D": "11.3% — the German risk-free rate plus beta times the Indian equity risk premium, without the country risk premium."
    },
    "CorrectChoice": "C",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "FormulaReference": "CB-04: Capital Asset Pricing Model (CAPM)",
    "Authorities": [
      "CAPM (Sharpe, 1964; Lintner, 1965); international CAPM extensions"
    ],
    "source_ids": [
      "CB-04: Capital Asset Pricing Model (CAPM)"
    ],
    "source_support_for_key": {
      "source_id": "CB-04",
      "rule_or_proposition": "Cross-border CAPM: R_e = R_f_home + β(R_m_host + CRP).",
      "application_to_facts": "R_e = 2.8% + 1.2 × (8.5% + 2.5%) = 2.8% + 13.2% = 16.0%.",
      "key_conclusion": "Discount rate is 16.0%, matching option C."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Using home-country equity risk premium",
        "why_plausible": "Home rates familiar but project risk is in India",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Using Indian risk-free rate instead of German",
        "why_plausible": "Project in India but CAPM uses home risk-free rate",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Omitting country risk premium",
        "why_plausible": "CRP often overlooked but captures sovereign risk",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option C correctly applies CAPM with home risk-free, host equity premium, and CRP. Option A uses wrong equity premium. Option B uses wrong risk-free rate. Option D omits CRP.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "R_e = R_f_home + β × (R_m_host + CRP) = 2.8% + 1.2 × (8.5% + 2.5%) = 2.8% + 13.2% = 16.0%. Option C correctly applies the CAPM formula.",
    "ExplanationWrongA": "German equity risk premium ignores higher systematic risk of Indian market.",
    "ExplanationWrongB": "CAPM for foreign projects uses home risk-free rate (Germany, 2.8%) because parent financing is in euros.",
    "ExplanationWrongD": "CRP (2.5%) captures sovereign, political, and capital control risk. Omitting it understates required return by 3.0%.",
    "ExplanationWrongC": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Political risk assessment — insurance and mitigation",
    "QuestionID": "P2-B-529",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-529-political-risk-assessment",
    "Stem": "Vanguard Infrastructure Partners, a U.S. private equity firm, is considering a $200 million investment in a toll road project in Nigeria. The Nigerian government has a history of currency controls and occasional asset seizures. Vanguard's risk manager, Kevin Okafor, must recommend the most effective risk mitigation strategy for the specific risk that the Nigerian government may block the conversion of naira proceeds into U.S. dollars for repatriation. Which instrument directly addresses this risk?",
    "Choices": {
      "A": "A currency put option on the USD/NGN exchange rate, because it protects against adverse exchange rate movements on the naira.",
      "B": "A forward contract to sell naira forward, because it locks in the exchange rate for future repatriation of proceeds.",
      "C": "Political risk insurance from MIGA or a private insurer, because it specifically covers currency inconvertibility and transfer restrictions.",
      "D": "A cross-currency interest rate swap, because it converts the naira cash flows into dollar cash flows for the life of the project."
    },
    "CorrectChoice": "C",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "Authorities": [
      "International finance theory; MIGA political risk insurance guidelines"
    ],
    "source_ids": [
      "CB-09: Forward/FX Premium or Discount"
    ],
    "source_support_for_key": {
      "source_id": "CB-09",
      "rule_or_proposition": "Political risk insurance covers currency inconvertibility and transfer restrictions imposed by host governments.",
      "application_to_facts": "Risk is government-imposed block on conversion, not exchange rate movement.",
      "key_conclusion": "Political risk insurance is the only instrument covering government-imposed inconvertibility."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Put options protect against rate movements, not government restrictions",
        "why_plausible": "Currency and political risk related but distinct",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Forwards cannot prevent government-imposed restrictions",
        "why_plausible": "Forwards lock rates but can't force government to allow conversion",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Swaps convert cash flows but can't prevent government blocking",
        "why_plausible": "Swaps are financial derivatives, cannot override sovereign actions",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option C covers government-imposed inconvertibility. Options A and B address exchange rate risk. Option D converts flows but cannot prevent blocking.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "Political risk insurance from MIGA or private insurers specifically covers currency inconvertibility and transfer restrictions. This is distinct from exchange rate risk.",
    "ExplanationWrongA": "Put options protect against adverse exchange rate movements, not government-imposed blocks on conversion.",
    "ExplanationWrongB": "Forward contracts lock in rates but cannot force a government to allow currency conversion.",
    "ExplanationWrongD": "Cross-currency swaps convert cash flows but cannot prevent government-imposed currency controls.",
    "ExplanationWrongC": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "B",
    "Topic": "B.9 Transfer pricing — least defensible method in dual-authority dispute",
    "QuestionID": "P2-B-530",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "b-530-transfer-pricing-least-defensible-dual",
    "Stem": "Axion Technologies, a U.S. semiconductor company, sells finished chips to its wholly owned subsidiary in Switzerland. The Swiss subsidiary resells to unrelated European customers. The IRS challenges Axion's transfer price as too low (reducing U.S. taxable income), while the Swiss Federal Tax Administration (SFTA) challenges it as too high (reducing Swiss taxable income). Axion's transfer pricing team must evaluate which method is least defensible when both authorities challenge the pricing from opposite directions. Which approach provides the weakest defense?",
    "Choices": {
      "A": "The cost-plus method using Axion's total production cost plus a 22% markup, because both authorities accept cost-based approaches as objective and verifiable.",
      "B": "The comparable uncontrolled price method using the actual prices Axion charges to unrelated distributors in comparable markets, because market prices are observable and independently verifiable by both authorities.",
      "C": "The resale price method using the Swiss subsidiary's resale margin to unrelated customers, because it reflects the value the subsidiary adds in the European market.",
      "D": "The transactional net margin method comparing the Swiss subsidiary's operating margin to comparable Swiss semiconductor distributors, because net margins are indirect measures subject to cost allocation and accounting practice disputes."
    },
    "CorrectChoice": "D",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "single-select",
    "LOSTag": "B.9",
    "BlueprintDomain": "Corporate Finance",
    "Authorities": [
      "OECD Transfer Pricing Guidelines; IRS IRC §482; Swiss Federal Tax Administration guidance"
    ],
    "source_ids": [
      "DA-09: Transfer Price (Minimum)"
    ],
    "source_support_for_key": {
      "source_id": "DA-09",
      "rule_or_proposition": "TNM uses indirect net margin measures that are harder for either authority to verify independently.",
      "application_to_facts": "Net margins influenced by overhead allocation, accounting practices, and factors beyond transfer price.",
      "key_conclusion": "TNM provides the weakest defense when authorities disagree from opposite directions."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Cost-plus provides a verifiable starting point",
        "why_plausible": "Cost base is objective even if markup is contested",
        "tier_candidate": 2
      },
      "B": {
        "misconception": "CUP is the strongest defense, not weakest",
        "why_plausible": "Market data is most objective, making this strongest",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Resale price provides observable benchmark",
        "why_plausible": "Resale margin is observable even if allocation debated",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Option D correctly identifies TNM as weakest due to indirect measures. Option A provides verifiable starting point. Option B is strongest defense. Option C provides observable benchmark.",
    "source_status": "RESOLVED",
    "hold_reason": "",
    "ExplanationCorrect": "TNM compares net profit margins — indirect measures subject to overhead allocation, accounting practice differences, and confounding factors. When authorities disagree from opposite directions, TNM's indirectness makes it hardest to defend.",
    "ExplanationWrongA": "Cost-plus provides a verifiable starting point (production cost + markup). While markup is disputed, cost base is objective.",
    "ExplanationWrongB": "CUP is the strongest defense when market data exists. Observable transaction prices that both authorities can verify independently.",
    "ExplanationWrongC": "Resale price provides an observable benchmark (resale margin). While allocation is debated, the margin itself is verifiable.",
    "ExplanationWrongD": ""
  }
];
