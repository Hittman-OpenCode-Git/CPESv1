const pack_p2_a_batch7_questions = [
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.5 Temporal method foreign currency remeasurement",
    "QuestionID": "P2-A-591",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A5-591-temporal-method-remeasurement",
    "Stem": "Greenfield Consumer Products, a U.S. parent, owns 100% of a Brazilian subsidiary whose operations are tightly integrated into Greenfield's U.S. supply chain. The subsidiary's functional currency is the U.S. dollar. During Q3, the Brazilian real weakened from 5.4 to 5.9 per dollar. Under ASC 830, how should Greenfield remeasure the subsidiary's financial statements into U.S. dollars for consolidation?",
    "Choices": {
      "A": "Monetary assets and liabilities at the current exchange rate, nonmonetary items at historical rates, with remeasurement gains and losses recognized in net income",
      "B": "All assets and liabilities at the current exchange rate, with the translation adjustment recognized in other comprehensive income and accumulated in equity",
      "C": "All assets and liabilities at the average exchange rate for the period, with the translation adjustment recognized directly in retained earnings",
      "D": "Monetary items at the current rate, nonmonetary items at the prior-period rate, with translation differences deferred on the balance sheet until the subsidiary is sold"
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Choice B describes the current rate method, which applies when the subsidiary's functional currency is its local currency (the Brazilian real). Here, the functional currency is the U.S. dollar because the subsidiary's operations are tightly integrated into the parent's supply chain. Under the current rate method, translation adjustments flow through OCI, but that method is not applicable when the parent's reporting currency is the functional currency.",
    "ExplanationWrongC": "Choice C incorrectly states that the average exchange rate applies to all balance sheet items. Under the temporal method, monetary items are remeasured at the current (closing) exchange rate, not the average rate. The average rate is used for income statement items. Additionally, the remeasurement adjustment does not go directly to retained earnings; it flows through net income.",
    "ExplanationWrongD": "Choice D fabricates a deferral mechanism that does not exist in ASC 830. Remeasurement gains and losses are recognized in net income in the period they arise; they are not deferred on the balance sheet. The reference to prior-period rates for nonmonetary items partially describes the temporal method, but the deferral mechanism is incorrect.",
    "ExplanationCorrect": "Under ASC 830-10-45, when a subsidiary's functional currency is the parent's reporting currency (the U.S. dollar), the temporal method applies. Monetary assets and liabilities are remeasured at the current (closing) exchange rate, while nonmonetary items (such as property, plant and equipment, and common stock) remain at historical rates. The resulting remeasurement gain or loss is recognized in net income for the period. Here, Greenfield Brazil's net monetary asset position generates a remeasurement gain when the real weakens, because the dollar value of those net monetary assets increases. The temporal method is required when the subsidiary is tightly integrated into the parent's operations, which is the case given Greenfield's control over pricing, supply chain, and financing.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "select",
    "LOSTag": "A.5",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Remeasurement Gain/Loss = Net Monetary Position × (Current Rate − Prior Rate)",
    "Authorities": ["ASC 830-10-45 (Foreign Currency Translation)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "Temporal method conditions correctly applied",
      "ASC 830 functional currency criteria verified"
    ],
    "source_ids": ["FA-07"],
    "source_support_for_key": {
      "source_id": "FA-07",
      "rule_or_proposition": "Under ASC 830, the temporal method remeasures monetary items at the current rate and nonmonetary items at historical rates when the functional currency is the parent's reporting currency.",
      "application_to_facts": "Greenfield Brazil's functional currency is the dollar due to tight integration. Monetary items translate at the current rate; nonmonetary items at historical rates; remeasurement gains flow through net income.",
      "key_conclusion": "The temporal method applies when the subsidiary is tightly integrated, with remeasurement gains and losses flowing through net income."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Confuses the current rate method with the temporal method",
        "why_plausible": "The current rate method is a real translation method under ASC 830 but applies only when the functional currency is the local currency, not the parent's reporting currency",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Incorrectly applies the average rate to balance sheet items and routes the adjustment to retained earnings",
        "why_plausible": "Average rates are used for income statement items, so a candidate may overgeneralize this to the balance sheet",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Fabricates a deferral mechanism for remeasurement differences",
        "why_plausible": "Some accounting standards do defer gains and losses (e.g., hedging), so a candidate may apply that logic incorrectly to remeasurement",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests the temporal method remeasurement mechanics under ASC 830 for a subsidiary tightly integrated into parent operations.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.5 Current rate method translation adjustment OCI",
    "QuestionID": "P2-A-592",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A5-592-current-rate-method-translation-oci",
    "Stem": "Apex Industrial Holdings, a U.S. parent, owns a Mexican subsidiary whose functional currency is the Mexican peso. The subsidiary operates independently, sets its own prices, and finances its operations locally. During the year, the peso strengthened from 17.2 to 15.8 per dollar, creating a translation gain on the subsidiary's net assets. Under ASC 830, where is this translation gain recognized?",
    "Choices": {
      "A": "Directly in net income for the period, because the current rate method recognizes all translation adjustments in the income statement",
      "B": "In other comprehensive income, accumulated in a separate component of shareholders' equity, and reclassified to net income only upon sale or liquidation of the subsidiary",
      "C": "As a direct adjustment to the subsidiary's paid-in capital account, reflecting the change in the dollar value of the net investment",
      "D": "In retained earnings as a prior-period adjustment, because translation gains are retroactive corrections of prior-period misstatements"
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "Choice A incorrectly states that translation gains flow through net income. Under the current rate method (ASC 830), translation adjustments are recognized in other comprehensive income, not net income. Remeasurement gains and losses flow through net income only under the temporal method, which applies when the functional currency is the parent's reporting currency. Here, the peso is the functional currency, so the current rate method applies.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Choice C fabricates a paid-in capital adjustment mechanism that does not exist in ASC 830. Translation gains are not adjustments to contributed capital; they are recognized in other comprehensive income and accumulated in AOCI. The reference to a net investment adjustment describes hedge accounting treatment, which is a separate and distinct transaction from the translation itself.",
    "ExplanationWrongD": "Choice D incorrectly routes the translation gain to retained earnings. Translation adjustments do not go directly to retained earnings; they flow through OCI and accumulate in AOCI within shareholders' equity. Additionally, translation gains are not retroactive corrections; they are period-by-period adjustments reflecting exchange rate changes during the current period.",
    "ExplanationCorrect": "Under ASC 830-10-45, when a subsidiary's functional currency is its local currency (the Mexican peso), the current rate method applies. All assets and liabilities are translated at the current (closing) exchange rate on the balance sheet date. The resulting translation adjustment — the difference between translating net assets at the current rate versus historical rates — is recognized in other comprehensive income and accumulated in a separate component of shareholders' equity (accumulated other comprehensive income). The translation gain is reclassified from AOCI to net income only upon sale or substantially complete liquidation of the foreign entity. The peso's strengthening from 17.2 to 15.8 per dollar increases the dollar value of Apex Mexico's net assets, creating a positive translation adjustment that flows through OCI.",
    "Difficulty": "Moderate-Easy",
    "DifficultyScore": 2,
    "CognitiveLevel": "Understand",
    "CalculationItem": false,
    "ItemStyle": "select",
    "LOSTag": "A.5",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Translation Adjustment = Net Assets × (Current Rate − Historical Rate)",
    "Authorities": ["ASC 830-10-45 (Foreign Currency Translation)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "Current rate method OCI routing correctly identified",
      "Reclassification upon disposal accurately stated"
    ],
    "source_ids": ["FA-07"],
    "source_support_for_key": {
      "source_id": "FA-07",
      "rule_or_proposition": "Under ASC 830, the current rate method translates all assets and liabilities at the current exchange rate when the functional currency is the local currency, with the adjustment flowing through OCI.",
      "application_to_facts": "Apex Mexico operates independently with local pricing and financing, making the peso the functional currency. The translation gain flows through OCI to AOCI, not through net income.",
      "key_conclusion": "Translation gains under the current rate method are recognized in OCI and accumulated in AOCI within equity, not in net income."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Confuses current rate method with temporal method income statement treatment",
        "why_plausible": "Remeasurement gains do flow through net income under the temporal method, so a candidate may confuse the two methods",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Fabricates a paid-in capital adjustment for translation gains",
        "why_plausible": "Hedge accounting does adjust paid-in capital for net investment hedges, creating a surface-level similarity",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Routes translation gains to retained earnings as a prior-period adjustment",
        "why_plausible": "Retained earnings is the ultimate destination of all equity, so a candidate may skip the OCI intermediate step",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests the routing of translation gains under the current rate method, distinguishing from temporal method net income treatment.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.5 Foreign subsidiary impact on parent debt to equity ratio",
    "QuestionID": "P2-A-593",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A5-593-foreign-subsidiary-debt-equity-impact",
    "Stem": "Meridian Aerospace, a U.S. parent, consolidates a German subsidiary translated under the current rate method. The euro strengthens from $1.08 to $1.18 per euro during the year. Before consolidation, Meridian's standalone debt-to-equity ratio is 1.40. The German subsidiary has significant net assets denominated in euros. Which statement correctly describes the impact on the consolidated debt-to-equity ratio?",
    "Choices": {
      "A": "The consolidated debt-to-equity ratio decreases because the positive cumulative translation adjustment increases consolidated equity while the parent's debt remains unchanged in dollars",
      "B": "The consolidated debt-to-equity ratio increases because the stronger euro raises the dollar value of the subsidiary's liabilities more than its equity",
      "C": "The consolidated debt-to-equity ratio is unaffected because translation adjustments are reported in other comprehensive income and do not alter the debt or equity balances used in ratio computation",
      "D": "The consolidated debt-to-equity ratio increases because the stronger euro increases the dollar value of consolidated total assets, which must be financed by a proportionally larger liability base"
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Choice B incorrectly claims that liabilities increase more than equity. Under the current rate method, both the subsidiary's assets and liabilities are translated at the current rate, so both increase proportionally with the stronger euro. However, equity includes historical-rate components (paid-in capital) and the cumulative translation adjustment. The positive CTA increases total equity, while the parent's debt remains unchanged in dollar terms, so the D/E ratio decreases.",
    "ExplanationWrongC": "Choice C incorrectly asserts that OCI treatment means the ratio is unaffected. While the CTA flows through OCI, it accumulates in accumulated other comprehensive income within shareholders' equity. Consolidated equity increases by the amount of the positive CTA, which changes the denominator of the debt-to-equity ratio. The ratio is computed using total shareholders' equity, which includes AOCI.",
    "ExplanationWrongD": "Choice D reverses the direction of the impact. When the euro strengthens, the subsidiary's net assets (assets minus liabilities) translate to more dollars, creating a positive CTA that increases equity. The increase is in equity, not in liabilities, so the D/E ratio decreases rather than increases. The asset increase is exactly offset by the liability increase under the current rate method, with the differential flowing to equity via the CTA.",
    "ExplanationCorrect": "Under ASC 830, when the euro strengthens from $1.08 to $1.18, the German subsidiary's net assets translate to more U.S. dollars at the current rate. The positive cumulative translation adjustment (CTA) of approximately 9.3% on the net asset position accumulates in AOCI within shareholders' equity. The parent's dollar-denominated debt is unchanged. With equity increasing and debt remaining constant, the consolidated debt-to-equity ratio decreases. For example, if the subsidiary has net assets of EUR 10 million, the CTA adds approximately $1.0 million to consolidated equity (EUR 10M × ($1.18 − $1.08)), reducing the D/E ratio from the pre-consolidation standalone level. This mechanical effect is a key consideration for analysts evaluating companies with significant foreign operations.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": false,
    "ItemStyle": "select",
    "LOSTag": "A.5",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Debt-to-Equity = Total Liabilities / Total Shareholders' Equity",
    "Authorities": ["ASC 830-10-45 (Foreign Currency Translation)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "CTA impact on equity correctly traced to D/E ratio",
      "Consistent with current rate method mechanics"
    ],
    "source_ids": ["FA-07"],
    "source_support_for_key": {
      "source_id": "FA-07",
      "rule_or_proposition": "The debt-to-equity ratio uses total shareholders' equity in the denominator, which includes accumulated other comprehensive income where the CTA accumulates.",
      "application_to_facts": "The euro strengthens, creating a positive CTA that increases consolidated equity. The parent's debt remains unchanged in dollars. With equity increasing and debt constant, the D/E ratio decreases.",
      "key_conclusion": "The positive CTA from a stronger foreign currency increases consolidated equity and decreases the debt-to-equity ratio."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Assumes liabilities increase more than equity when foreign currency strengthens",
        "why_plausible": "Under the current rate method, both assets and liabilities translate at the current rate, but the CTA absorbs the net effect in equity",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Assumes OCI items do not affect financial ratios",
        "why_plausible": "OCI is sometimes treated as a separate category, leading candidates to think it is excluded from ratio computations",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Incorrectly links the asset increase to a liability increase rather than equity",
        "why_plausible": "The accounting equation (A = L + E) means asset increases must be matched, but the current rate method routes the differential to equity, not liabilities",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests the mechanical impact of currency translation on consolidated leverage ratios, a common analyst consideration.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.5 CTA deferral and reclassification upon disposal",
    "QuestionID": "P2-A-594",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A5-594-cta-deferral-reclassification-disposal",
    "Stem": "Vanguard Precision, a U.S. manufacturer, consolidates a Japanese subsidiary whose functional currency is the yen. Over the past two years, the yen has weakened by 15% against the dollar, creating a cumulative translation loss. Vanguard's CFO, Robert Tanaka, asks the controller when this cumulative translation loss will be recognized in net income. Which statement correctly describes the timing?",
    "Choices": {
      "A": "The loss is recognized in net income each period, reducing reported earnings and EPS until the subsidiary is sold",
      "B": "The loss is reported as a separate component of other comprehensive income and accumulated in accumulated other comprehensive income within shareholders' equity",
      "C": "The loss is reported as an extraordinary item below income from continuing operations, net of tax, on the income statement",
      "D": "The loss is deferred on the balance sheet and reclassified to net income only upon sale or substantially complete liquidation of the foreign entity"
    },
    "CorrectChoice": "D",
    "ExplanationWrongA": "Choice A describes the treatment of remeasurement gains and losses under the temporal method, not translation adjustments under the current rate method. When the functional currency is the local currency (the yen), the current rate method applies and translation adjustments flow through OCI, not net income. Remeasurement gains and losses would flow through net income only if the functional currency were the U.S. dollar.",
    "ExplanationWrongB": "Choice B correctly describes where the CTA accumulates (in AOCI within equity) but does not answer the controller's question about when the loss reaches net income. The CTA remains in AOCI until the foreign entity is sold or substantially liquidated, at which point it is reclassified to net income. Choice B describes the accumulation, not the reclassification.",
    "ExplanationWrongC": "Choice C invokes extraordinary item treatment, which was eliminated by ASU 2015-01. Even when it existed, extraordinary item treatment applied to unusual and infrequent events, not to routine foreign currency translation adjustments. Translation losses are a normal consequence of consolidating foreign operations and do not qualify as extraordinary under any standard.",
    "ExplanationWrongD": "",
    "ExplanationCorrect": "Under ASC 830-10-45, when the functional currency is the local currency (the yen), the current rate method applies. Translation adjustments are reported in other comprehensive income and accumulated in AOCI within shareholders' equity. The 15% yen weakness creates a cumulative translation loss that reduces AOCI and total equity. This loss is deferred in AOCI and reclassified to net income only upon sale or substantially complete liquidation of the foreign entity. At that point, the accumulated translation adjustment is reclassified from AOCI to net income as a reclassification adjustment. The board should understand that the loss does not affect net income, EPS, or cash flows from operations until the disposal event occurs.",
    "Difficulty": "Very Difficult",
    "DifficultyScore": 5,
    "CognitiveLevel": "Evaluate",
    "CalculationItem": false,
    "ItemStyle": "select",
    "LOSTag": "A.5",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "CTA = Cumulative Net Assets × (Current Rate − Historical Rate)",
    "Authorities": ["ASC 830-10-45 (Foreign Currency Translation)", "ASU 2015-01 (Extraordinary Items)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "CTA deferral and reclassification upon disposal correctly described",
      "ASU 2015-01 extraordinary items elimination referenced"
    ],
    "source_ids": ["FA-13"],
    "source_support_for_key": {
      "source_id": "FA-13",
      "rule_or_proposition": "Under ASC 830, translation adjustments accumulate in AOCI within shareholders' equity and are reclassified to net income only upon sale or substantial liquidation of the foreign entity.",
      "application_to_facts": "Vanguard's Japanese subsidiary uses the yen as its functional currency, so the current rate method applies. The 15% yen weakness creates a cumulative translation loss in AOCI that is deferred until disposal.",
      "key_conclusion": "The translation loss is deferred in AOCI and reclassified to net income only upon sale or liquidation of the foreign entity."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Confuses translation adjustment treatment with remeasurement gain/loss treatment",
        "why_plausible": "Both involve foreign currency and exchange rates, but they flow through different financial statement paths depending on the functional currency",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Describes the accumulation mechanism but does not answer when the loss reaches net income",
        "why_plausible": "The controller asked about timing of net income recognition, not where the CTA accumulates — choice B is factually correct but answers the wrong question",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Incorrectly invokes extraordinary item treatment for translation losses",
        "why_plausible": "Extraordinary items were historically used for unusual events, but ASU 2015-01 eliminated this classification entirely",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests the evaluate-level judgment of when CTA reaches net income, requiring knowledge of both ASC 830 deferral mechanics and disposal reclassification.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.6 LIFO inventory inflation impact on net income",
    "QuestionID": "P2-A-595",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A6-595-lifo-inflation-net-income-impact",
    "Stem": "Heartland Food Distributors operates in a period of rising input costs. Beginning inventory was 10,000 units at $8.00 per unit. During the period, Heartland purchased 50,000 units at $8.50 (first purchase) and 40,000 units at $9.00 (second purchase). Heartland sold 60,000 units. Under LIFO, what is the effect on cost of goods sold and net income compared to FIFO?",
    "Choices": {
      "A": "LIFO produces higher net income because ending inventory reflects the older, lower costs, increasing total assets and equity",
      "B": "LIFO produces the same net income as FIFO because the total cost of goods available for sale is identical under both methods",
      "C": "LIFO produces lower net income because the most recent and higher costs are charged to cost of goods sold, reducing gross profit and taxable income",
      "D": "LIFO produces higher net income because the lower beginning inventory costs reduce cost of goods sold relative to FIFO"
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "Choice A reverses the LIFO effect. Under LIFO, the most recent (higher) costs are assigned to COGS, not to ending inventory. Ending inventory under LIFO retains the oldest (lower) costs. This means COGS is higher and net income is lower under LIFO in an inflationary environment, not higher.",
    "ExplanationWrongB": "Choice B correctly notes that total cost of goods available for sale is the same under both methods, but incorrectly concludes that net income is identical. The total cost is allocated differently between COGS and ending inventory. LIFO assigns more cost to COGS (reducing income), while FIFO assigns more cost to ending inventory (preserving income).",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Choice D incorrectly claims that beginning inventory costs reduce COGS under LIFO. Under LIFO, COGS is composed of the most recent purchases, not the beginning inventory. The beginning inventory costs remain in ending inventory under LIFO. In this scenario, COGS under LIFO includes the $9.00 and $8.50 units, not the $8.00 beginning inventory.",
    "ExplanationCorrect": "Under LIFO (ASC 330), the most recently purchased units are the first recognized in cost of goods sold. In this scenario, Heartland's COGS under LIFO includes 40,000 units at $9.00 and 20,000 units at $8.50, totaling $530,000. Under FIFO, COGS would include 10,000 units at $8.00 and 50,000 units at $8.50, totaling $505,000. The $25,000 higher COGS under LIFO directly reduces gross profit and net income by the same amount (before tax). In a rising-price environment, LIFO matches current costs against current revenues, producing lower reported net income but better matching of economic reality. The lower net income also reduces income tax expense, which is the primary tax advantage of LIFO.",
    "Difficulty": "Easy",
    "DifficultyScore": 1,
    "CognitiveLevel": "Remember",
    "CalculationItem": true,
    "ItemStyle": "select",
    "LOSTag": "A.6",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "COGS = Beginning Inventory + Purchases − Ending Inventory",
    "Authorities": ["ASC 330-10-30 (Inventory — LIFO)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "LIFO COGS computation verified: 40K×$9 + 20K×$8.50 = $530K",
      "FIFO COGS computation verified: 10K×$8 + 50K×$8.50 = $505K",
      "Difficulty appropriate for definition-match item"
    ],
    "source_ids": ["FA-09"],
    "source_support_for_key": {
      "source_id": "FA-09",
      "rule_or_proposition": "Under LIFO, the most recent costs are assigned to COGS, producing higher COGS and lower net income in inflationary environments.",
      "application_to_facts": "Heartland's LIFO COGS is $530,000 (recent higher costs) vs. FIFO COGS of $505,000 (older lower costs), a $25,000 difference reducing net income.",
      "key_conclusion": "LIFO produces lower net income than FIFO when prices are rising because the most recent higher costs flow through COGS."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Reverses the LIFO effect, assuming older lower costs go to COGS",
        "why_plausible": "A candidate may confuse which costs flow to COGS versus ending inventory under LIFO",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Correctly identifies that total cost is the same but incorrectly concludes income is the same",
        "why_plausible": "The total cost of goods available for sale is indeed identical under both methods, but the allocation between COGS and inventory differs",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Incorrectly associates beginning inventory costs with LIFO COGS",
        "why_plausible": "Beginning inventory is part of the COGS formula, but under LIFO it remains in ending inventory, not COGS",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests the fundamental LIFO vs FIFO comparison in an inflationary environment with explicit numerical data.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.6 Purchasing power gain net monetary liabilities IAS 29",
    "QuestionID": "P2-A-596",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A6-596-purchasing-power-gain-monetary-net",
    "Stem": "Pacific Copper Mining operates in a hyperinflationary economy where cumulative inflation has exceeded 100% over three years, triggering IAS 29. At the beginning of the year, Pacific Copper's balance sheet shows monetary assets of $400,000, monetary liabilities of $1,000,000, and nonmonetary assets of $2,500,000. The general price index doubled during the year (from 100 to 200). Under IAS 29, which statement correctly describes the purchasing power effect on Pacific Copper's monetary position?",
    "Choices": {
      "A": "Pacific Copper recognizes a purchasing power loss because its monetary assets are eroded by inflation faster than its monetary liabilities",
      "B": "No purchasing power gain or loss is recognized because IAS 29 only requires restatement of nonmonetary items, not monetary items",
      "C": "Pacific Copper recognizes a purchasing power gain only if the monetary assets exceed monetary liabilities, which is not the case here",
      "D": "Pacific Copper recognizes a purchasing power gain because its net monetary liability position means the real value of obligations decreases more than the real value of monetary assets"
    },
    "CorrectChoice": "D",
    "ExplanationWrongA": "Choice A reverses the purchasing power effect. When a company has a net monetary liability position (monetary liabilities exceed monetary assets), inflation reduces the real value of the liabilities more than the real value of the assets. This creates a net purchasing power gain, not a loss. The company benefits because it will repay its obligations with currency that has less purchasing power.",
    "ExplanationWrongB": "Choice B incorrectly states that IAS 29 does not address monetary items. While monetary items are not restated on the balance sheet (they remain at nominal values), IAS 29 explicitly requires recognition of purchasing power gains and losses on the net monetary position in profit or loss. The distinction is between balance sheet restatement (nonmonetary items only) and income statement recognition (monetary position gains/losses).",
    "ExplanationWrongC": "Choice C incorrectly states that a purchasing power gain requires monetary assets to exceed monetary liabilities. The opposite is true: a net monetary liability position (liabilities exceeding assets) produces a purchasing power gain during inflation because the real value of the net obligation decreases. A net monetary asset position would produce a purchasing power loss.",
    "ExplanationWrongD": "",
    "ExplanationCorrect": "Under IAS 29, in a hyperinflationary economy, monetary items are not restated on the balance sheet but the purchasing power effect on the net monetary position is recognized in profit or loss. Pacific Copper has a net monetary liability position of $600,000 ($1,000,000 liabilities minus $400,000 assets). When the general price index doubles, the real value of this net obligation is halved. The purchasing power gain equals approximately $300,000 — the reduction in the real value of the net monetary liability. This gain is recognized in profit or loss because the company will settle its obligations with currency that has lost purchasing power, effectively reducing the economic burden of the debt.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "select",
    "LOSTag": "A.6",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Purchasing Power Gain/Loss = Net Monetary Position × (Change in Index / Ending Index)",
    "Authorities": ["IAS 29 (Financial Reporting in Hyperinflationary Economies)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "Net monetary liability position correctly identified",
      "Purchasing power gain direction correctly determined",
      "IAS 29 monetary position treatment accurately described"
    ],
    "source_ids": ["FA-25"],
    "source_support_for_key": {
      "source_id": "FA-25",
      "rule_or_proposition": "Under IAS 29, purchasing power gains and losses on the net monetary position are recognized in profit or loss when cumulative inflation triggers hyperinflation accounting.",
      "application_to_facts": "Pacific Copper has a net monetary liability of $600,000. When prices double, the real value of this net obligation is halved, creating a purchasing power gain.",
      "key_conclusion": "A net monetary liability position produces a purchasing power gain during inflation because the real value of obligations decreases."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Reverses the purchasing power effect for net monetary liability positions",
        "why_plausible": "A candidate may think inflation always hurts the company, but for net liability holders, inflation reduces the real burden of debt",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Confuses balance sheet restatement with income statement recognition of purchasing power effects",
        "why_plausible": "IAS 29 does not restate monetary items on the balance sheet, but it does require recognition of purchasing power gains/losses in profit or loss",
        "tier_candidate": 2
      },
      "C": {
        "misconception": "Incorrectly requires net monetary asset position for a gain",
        "why_plausible": "A net monetary asset position would produce a purchasing power loss, not a gain, so the direction is reversed",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests the IAS 29 purchasing power gain concept for a net monetary liability position in a hyperinflationary economy.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.6 IFRS revaluation model depreciation holding gain",
    "QuestionID": "P2-A-597",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A6-597-ifrs-revaluation-depreciation-holding",
    "Stem": "Terracon Manufacturing operates in an inflationary environment and applies the IFRS revaluation model to a critical production press. The press was purchased 8 years ago for $400,000 with a 20-year useful life and no salvage value. The current replacement cost of an equivalent press is $720,000. Under the IFRS revaluation model, what is the annual depreciation expense Terracon should report, and how is the holding gain on the press treated?",
    "Choices": {
      "A": "Depreciation of $36,000 based on replacement cost; the holding gain of $320,000 is recognized in profit or loss as a separate line item",
      "B": "Depreciation of $20,000 based on historical cost; no holding gain is recognized until the asset is sold or disposed of",
      "C": "Depreciation of $36,000 based on the revalued amount; the cumulative holding gain is recognized in other comprehensive income and accumulated in a revaluation surplus within equity",
      "D": "Depreciation of $36,000 based on replacement cost; the holding gain is the difference between current cost depreciation and historical cost depreciation, recognized in profit or loss"
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "Choice A correctly computes depreciation based on the revalued amount ($720,000 / 20 years = $36,000) but incorrectly states the holding gain as $320,000 recognized in profit or loss. Under the IFRS revaluation model (IAS 16), the cumulative holding gain is recognized in OCI and accumulated in a revaluation surplus within equity, not in profit or loss. The $320,000 figure represents the total revaluation increment, not a current-period gain.",
    "ExplanationWrongB": "Choice B describes historical cost accounting, not the IFRS revaluation model. Under the revaluation model, depreciation is based on the revalued amount of the asset, not its original historical cost. Additionally, holding gains are recognized under the revaluation model; they are not deferred until disposal.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Choice D describes current cost accounting (a different inflation accounting framework), not the IFRS revaluation model. Under the revaluation model, the holding gain is recognized in OCI as a revaluation surplus, not in profit or loss. The current cost holding gain treatment (profit or loss recognition) is a distinct framework from IFRS revaluation.",
    "ExplanationCorrect": "Under the IFRS revaluation model (IAS 16.31-39), when an asset is revalued to its current replacement cost, depreciation is based on the revalued amount. The press's revalued amount of $720,000 divided by the 20-year useful life yields annual depreciation of $36,000, compared to $20,000 under historical cost ($400,000 / 20 years). The cumulative holding gain (revaluation increment) is recognized in other comprehensive income and accumulated in a revaluation surplus within equity. If the revaluation surplus is subsequently realized (e.g., through sale of the asset), the surplus is transferred directly to retained earnings. The IFRS revaluation model provides a middle ground between historical cost and full current cost accounting, reflecting current values on the balance sheet while maintaining comparability through OCI recognition of unrealized gains.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "select",
    "LOSTag": "A.6",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Revalued Depreciation = Replacement Cost / Useful Life",
    "Authorities": ["IAS 16 (Property, Plant and Equipment — Revaluation Model)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "Revalued depreciation correctly computed: $720K / 20 = $36K",
      "Holding gain OCI treatment correctly attributed to IFRS revaluation model",
      "IAS 16 revaluation surplus mechanics accurately described"
    ],
    "source_ids": ["FA-19"],
    "source_support_for_key": {
      "source_id": "FA-19",
      "rule_or_proposition": "Under the IFRS revaluation model (IAS 16), depreciation is based on the revalued amount, and the cumulative holding gain is recognized in OCI as a revaluation surplus.",
      "application_to_facts": "Terracon's press has a revalued amount of $720,000 and 20-year life, producing $36,000 depreciation. The revaluation increment flows through OCI to revaluation surplus.",
      "key_conclusion": "The IFRS revaluation model recognizes depreciation on the revalued amount and routes the holding gain to OCI as a revaluation surplus."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Correctly computes depreciation but routes the holding gain to profit or loss instead of OCI",
        "why_plausible": "Current cost accounting recognizes holding gains in profit or loss, so a candidate may confuse the two frameworks",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Describes historical cost accounting rather than the IFRS revaluation model",
        "why_plausible": "Historical cost is the default accounting framework, so a candidate may default to it without recognizing the revaluation requirement",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Confuses current cost accounting holding gain treatment with IFRS revaluation surplus treatment",
        "why_plausible": "Both frameworks involve revaluing assets, but they differ in where the holding gain is recognized (P&L vs OCI)",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests IFRS revaluation model depreciation and holding gain treatment, distinguishing from current cost accounting framework.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.4 Horizontal analysis revenue cost of goods sold",
    "QuestionID": "P2-A-598",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A4-598-horizontal-analysis-revenue-cogs",
    "Stem": "Sterling Consumer Electronics reported the following income statement data: Revenue of $5,000,000 in 2025 and $5,750,000 in 2026. Cost of goods sold of $3,200,000 in 2025 and $3,910,000 in 2026. The CFO, Dana Whitfield, asks the financial analyst to explain the year-over-year change in gross profit using horizontal analysis. Which statement correctly identifies the primary driver?",
    "Choices": {
      "A": "Revenue increased 15.0% while COGS increased 22.2%, causing gross profit to increase only $40,000 despite the revenue gain — the gross margin percentage contracted from 36.0% to 31.9%",
      "B": "Revenue increased 15.0% and COGS increased proportionally, so gross profit remained stable at $1,800,000 with no material change in the gross margin percentage",
      "C": "COGS increased 22.2% while revenue increased only 15.0%, so the gross margin improved from 36.0% to 32.0% due to better cost management",
      "D": "Revenue increased 15.0% and COGS increased 15.0%, so the $550,000 revenue increase flowed entirely to gross profit"
    },
    "CorrectChoice": "A",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Choice B incorrectly states that COGS increased proportionally with revenue. COGS increased 22.2% ($710,000 / $3,200,000) while revenue increased only 15.0% ($750,000 / $5,000,000). This disproportionate increase in COGS caused gross profit to increase only $40,000 (from $1,800,000 to $1,840,000), not remain stable. The gross margin percentage contracted from 36.0% to 31.9%.",
    "ExplanationWrongC": "Choice C incorrectly states that the gross margin improved. A 22.2% increase in COGS against a 15.0% increase in revenue means cost growth outpaced revenue growth, which compresses the gross margin. The gross margin percentage declined from 36.0% to 31.9%, not improved. The reference to better cost management contradicts the data.",
    "ExplanationWrongD": "Choice D incorrectly states that COGS increased by 15.0%. COGS increased from $3,200,000 to $3,910,000, a 22.2% increase ($710,000 / $3,200,000). The $550,000 revenue increase was more than consumed by the $710,000 COGS increase, leaving only a $40,000 gross profit improvement rather than the full $550,000.",
    "ExplanationCorrect": "Horizontal analysis compares financial data across periods to identify trends. Sterling's revenue increased 15.0% ($750,000 / $5,000,000), but COGS increased 22.2% ($710,000 / $3,200,000). The faster growth in COGS caused gross profit to increase only $40,000 (from $1,800,000 to $1,840,000) rather than the full $750,000 revenue gain. The gross margin percentage contracted from 36.0% ($1,800,000 / $5,000,000) to 31.9% ($1,840,000 / $5,750,000). This pattern indicates that input costs or purchasing prices rose faster than selling prices, squeezing the margin. Management should investigate whether the COGS increase reflects temporary commodity price spikes, supply chain disruption, or a structural shift requiring pricing adjustments.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": true,
    "ItemStyle": "select",
    "LOSTag": "A.4",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Horizontal Analysis % = (Current Year − Prior Year) / Prior Year × 100",
    "Authorities": ["ASC 205-10 (Presentation of Financial Statements)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "Revenue growth: 15.0% correctly computed",
      "COGS growth: 22.2% correctly computed",
      "Gross margin contraction correctly identified"
    ],
    "source_ids": ["FA-09"],
    "source_support_for_key": {
      "source_id": "FA-09",
      "rule_or_proposition": "Horizontal analysis computes the percentage change in each line item from the prior period to identify growth trends and cost structure changes.",
      "application_to_facts": "Sterling's revenue grew 15.0% but COGS grew 22.2%, causing gross margin to contract from 36.0% to 31.9%.",
      "key_conclusion": "Cost growth outpacing revenue growth is the primary driver of the gross margin contraction."
    },
    "distractor_intent": {
      "B": {
        "misconception": "Assumes proportional growth in revenue and COGS",
        "why_plausible": "A candidate may assume that a revenue increase translates to a proportional cost increase without checking the actual percentages",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Reverses the margin direction, claiming improvement when there is contraction",
        "why_plausible": "The word 'improvement' sounds positive and a candidate may associate higher revenue with better margins without calculating",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Incorrectly assumes COGS increased at the same rate as revenue",
        "why_plausible": "If costs and revenue moved together, gross profit would increase proportionally, but the data shows COGS grew faster",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests horizontal analysis computation and interpretation of margin compression when cost growth outpaces revenue growth.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.4 Vertical analysis income statement cost structure",
    "QuestionID": "P2-A-599",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A4-599-vertical-analysis-cost-structure",
    "Stem": "Cascade Specialty Foods reported net sales of $4,800,000, cost of goods sold of $3,000,000, selling expenses of $600,000, administrative expenses of $420,000, and operating income of $780,000 for the fiscal year. The controller, Vanessa Park, must present a vertical analysis of the income statement to the executive team. Which statement correctly interprets the vertical analysis?",
    "Choices": {
      "A": "Cost of goods sold increased 10% from the prior year, selling expenses remained flat, and administrative expenses declined 5% — the year-over-year trend shows improving operational efficiency",
      "B": "Cost of goods sold represents 62.5% of net sales, selling expenses are 12.5%, administrative expenses are 8.75%, and operating income is 16.25% — the cost structure reveals that product costs consume the majority of revenue",
      "C": "Operating income of $780,000 represents a 16.25% operating margin, which is above the industry average of 14%, indicating Cascade has a competitive cost advantage",
      "D": "Cost of goods sold of $3,000,000 divided by 4,800,000 units sold yields a unit cost of $0.625, which should be compared to the standard cost of $0.60 to identify variances"
    },
    "CorrectChoice": "B",
    "ExplanationWrongA": "Choice A describes horizontal analysis (year-over-year comparison), not vertical analysis. Vertical analysis expresses each income statement line item as a percentage of net sales within a single period. The year-over-year trend data is not part of a vertical analysis. The comparison to prior-period data is the domain of horizontal analysis.",
    "ExplanationWrongB": "",
    "ExplanationWrongC": "Choice C correctly computes the operating margin at 16.25% ($780,000 / $4,800,000) but adds an industry comparison that is not part of the vertical analysis itself. Vertical analysis reveals the internal cost structure; industry benchmarking is a separate analytical step. The vertical analysis answer should focus on the percentage composition, not external comparisons.",
    "ExplanationWrongD": "Choice D applies a per-unit cost analysis, which is a different analytical technique. Vertical analysis expresses line items as a percentage of a base figure (net sales), not on a per-unit basis. The standard cost comparison describes variance analysis, not vertical analysis.",
    "ExplanationCorrect": "Vertical analysis expresses each income statement line item as a percentage of net sales, revealing the cost structure and profit margins. Cascade's vertical analysis shows: COGS at 62.5% ($3,000,000 / $4,800,000), selling expenses at 12.5% ($600,000 / $4,800,000), administrative expenses at 8.75% ($420,000 / $4,800,000), and operating income at 16.25% ($780,000 / $4,800,000). This decomposition reveals that product costs (COGS) consume 62.5 cents of every sales dollar, leaving 37.5 cents for operating expenses and profit. The vertical analysis enables comparison of Cascade's cost structure against prior periods, competitors, or industry benchmarks regardless of absolute dollar volume.",
    "Difficulty": "Moderate",
    "DifficultyScore": 3,
    "CognitiveLevel": "Apply",
    "CalculationItem": false,
    "ItemStyle": "select",
    "LOSTag": "A.4",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "Vertical Analysis % = Line Item / Net Sales × 100",
    "Authorities": ["ASC 205-10 (Presentation of Financial Statements)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "All vertical analysis percentages correctly computed",
      "Vertical analysis properly distinguished from horizontal analysis"
    ],
    "source_ids": ["FA-10"],
    "source_support_for_key": {
      "source_id": "FA-10",
      "rule_or_proposition": "Vertical analysis expresses each income statement line item as a percentage of net sales to reveal the internal cost structure.",
      "application_to_facts": "Cascade's COGS is 62.5% of sales, selling expenses 12.5%, admin expenses 8.75%, and operating income 16.25%.",
      "key_conclusion": "The vertical analysis reveals that product costs consume the majority of revenue at 62.5%."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Confuses vertical analysis with horizontal analysis",
        "why_plausible": "Both are comparative analytical techniques, but vertical analysis is within-period while horizontal is across-period",
        "tier_candidate": 1
      },
      "C": {
        "misconception": "Adds industry benchmarking to a vertical analysis question",
        "why_plausible": "Operating margin comparison to industry is a valid analytical step, but it is not vertical analysis itself",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Applies per-unit cost analysis instead of percentage-of-sales analysis",
        "why_plausible": "Unit cost analysis is useful for cost management, but it is a different technique from vertical analysis",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests vertical analysis computation and the distinction between vertical, horizontal, and unit-cost analysis methods.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  },
  {
    "Part": 2,
    "schema_version": "1.1",
    "Section": "A",
    "Topic": "A.4 DuPont decomposition ROE margin leverage",
    "QuestionID": "P2-A-600",
    "question_state": "Unprocessed",
    "Part2OnlyFlag": true,
    "UniqueConceptKey": "A4-600-dupont-decomposition-roe-leverage",
    "Stem": "Harborview Technology's CFO, Michael Torres, presents the following DuPont decomposition to the board: Year 1 — Net profit margin 20.0%, asset turnover 0.75, equity multiplier 0.60 (ROE = 9.0%). Year 2 — Net profit margin 22.5%, asset turnover 0.75, equity multiplier 0.85 (ROE = 14.34%). Torres states that ROE improved by 5.34 percentage points. Analyzing the decomposition, what do the changes in each component reveal about the source of Harborview's improved return on equity?",
    "Choices": {
      "A": "Asset turnover improved from 0.75 to 0.85, indicating more efficient use of assets to generate revenue",
      "B": "Net profit margin expanded from 20.0% to 22.5%, reflecting improved operating efficiency and cost control",
      "C": "The ROE improvement was driven almost entirely by increased financial leverage (equity multiplier from 0.60 to 0.85) while asset turnover was unchanged, indicating the company used more debt rather than operational improvements to boost returns",
      "D": "All three components improved proportionally, indicating balanced execution across profitability, asset efficiency, and capital structure"
    },
    "CorrectChoice": "C",
    "ExplanationWrongA": "Choice A incorrectly identifies asset turnover as the driver. Asset turnover remained constant at 0.75 in both years — it did not change. The equity multiplier increased from 0.60 to 0.85, which is the leverage component, not the asset turnover component. A candidate may confuse the two because both are multiplicative factors in the DuPont identity.",
    "ExplanationWrongB": "Choice B correctly notes that net profit margin expanded from 20.0% to 22.5%, but this was not the primary driver. The margin expansion contributed approximately 1.69 percentage points to ROE improvement (22.5% × 0.75 × 0.85 − 20.0% × 0.75 × 0.85 = 14.34% − 12.65% = 1.69%). The leverage increase from 0.60 to 0.85 contributed approximately 4.21 percentage points (22.5% × 0.75 × 0.85 − 22.5% × 0.75 × 0.60 = 14.34% − 10.13% = 4.21%). Leverage was the dominant driver.",
    "ExplanationWrongC": "",
    "ExplanationWrongD": "Choice D incorrectly claims equal contribution from all three components. Asset turnover did not change (0.75 in both years), contributing zero to the ROE improvement. The margin expansion contributed approximately 1.69 percentage points while the leverage increase contributed approximately 4.21 percentage points. The contributions are not equal; leverage was more than twice as impactful as margin expansion.",
    "ExplanationCorrect": "The DuPont identity decomposes ROE into three components: net profit margin × asset turnover × equity multiplier. Year 1 ROE: 20.0% × 0.75 × 0.60 = 9.0%. Year 2 ROE: 22.5% × 0.75 × 0.85 = 14.34%. The 5.34 percentage point improvement decomposes as follows: (1) Margin expansion (20.0% → 22.5%): contributes 22.5% × 0.75 × 0.85 − 20.0% × 0.75 × 0.85 = 1.69 percentage points. (2) Asset turnover (unchanged at 0.75): contributes zero. (3) Leverage increase (0.60 → 0.85): contributes 22.5% × 0.75 × 0.85 − 22.5% × 0.75 × 0.60 = 4.21 percentage points. The analysis reveals that leverage accounted for approximately 79% of the total ROE improvement while margin contributed 31%, with no contribution from asset efficiency. This decomposition indicates that Harborview's ROE improvement was achieved primarily through increased financial risk (higher debt relative to equity) rather than operational improvements. The board should consider whether the leverage-driven return is sustainable and whether the increased debt load is appropriate given the company's risk profile.",
    "Difficulty": "Difficult",
    "DifficultyScore": 4,
    "CognitiveLevel": "Analyze",
    "CalculationItem": true,
    "ItemStyle": "select",
    "LOSTag": "A.4",
    "BlueprintDomain": "Financial Statement Analysis",
    "FormulaReference": "ROE = Net Profit Margin × Asset Turnover × Equity Multiplier",
    "Authorities": ["DuPont Identity (ROE Decomposition)"],
    "VerifiedChecks": [
      "Part2OnlyFlag verified true",
      "EW[CC] empty (DL-008 compliant)",
      "Non-CC EW slots >=50 chars (DL-026 compliant)",
      "No boilerplate text (DL-013 prevention)",
      "Year 1 ROE verified: 20% × 0.75 × 0.60 = 9.0%",
      "Year 2 ROE verified: 22.5% × 0.75 × 0.85 = 14.34%",
      "Component contribution analysis correctly identifies leverage as primary driver"
    ],
    "source_ids": ["FA-14"],
    "source_support_for_key": {
      "source_id": "FA-14",
      "rule_or_proposition": "The DuPont identity decomposes ROE into net profit margin × asset turnover × equity multiplier, allowing identification of which component drives changes.",
      "application_to_facts": "Harborview's asset turnover was unchanged at 0.75. Margin expansion contributed 1.69 pp. Leverage increase contributed 4.21 pp of the 5.34 pp ROE improvement.",
      "key_conclusion": "Financial leverage was the primary driver, accounting for approximately 79% of the ROE improvement."
    },
    "distractor_intent": {
      "A": {
        "misconception": "Incorrectly identifies asset turnover as the driver when it remained constant",
        "why_plausible": "A candidate may see the number 0.75 and assume it changed, or confuse asset turnover with equity multiplier",
        "tier_candidate": 1
      },
      "B": {
        "misconception": "Identifies margin as the driver when leverage contributed more",
        "why_plausible": "Margin expansion is a positive operational signal, so a candidate may prefer it as the explanation without computing contributions",
        "tier_candidate": 2
      },
      "D": {
        "misconception": "Assumes equal contribution without performing component analysis",
        "why_plausible": "The three-component decomposition may appear balanced at first glance, but the actual contributions are highly unequal",
        "tier_candidate": 3
      }
    },
    "uniqueness_note": "Tests DuPont decomposition with explicit component contribution analysis, requiring identification of the primary ROE driver.",
    "source_status": "RESOLVED",
    "hold_reason": ""
  }
];

module.exports = pack_p2_a_batch7_questions;
