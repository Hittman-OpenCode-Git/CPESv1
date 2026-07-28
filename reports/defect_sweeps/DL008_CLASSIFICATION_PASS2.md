# DL-008 Second-Pass Classification Report

**Date:** 2026-07-22
**Tool:** scripts/classify_dl008_pass2.js
**Criteria:** Arithmetic density, No trailing ellipsis, No conceptual keywords, ≥60% Duplication with ExplanationCorrect

## Summary

| Bucket | Classification | Count | % of 306 | Action |
|--------|---------------|-------|----------|--------|
| 1A | Passes all four criteria | 195 | 63.7% | Safe sweep-clear |
| 1B | Fails one or more criteria | 111 | 36.3% | Editorial queue (manual review) |

### Bucket 1B Failure Breakdown

| Failed Criteria | Count | % of 1B |
|----------------|-------|----------|
| Arithmetic | 80 | 72.1% |
| Keywords | 11 | 9.9% |
| Arithmetic+Keywords | 10 | 9.0% |
| Arithmetic+Duplication | 8 | 7.2% |
| Duplication | 1 | 0.9% |
| Arithmetic+Keywords+Duplication | 1 | 0.9% |

### By Pack

| Pack | Bucket 1A | Bucket 1B | Total |
|------|-----------|-----------|-------|
| pack_a_corrected.js | 127 | 70 | 197 |
| pack_c_corrected.js | 33 | 16 | 49 |
| pack_d_corrected.js | 35 | 25 | 60 |

## Samples for Spot-Check

### Bucket 1A Samples (195 total — safe sweep)

| QID | Pack | Field | Content | Similarity | Arithmetic | Ellipsis | Keywords |
|-----|------|-------|---------|------------|------------|----------|----------|
| P1-A-003 | pack_a_corrected.js | ExplanationWrongC | $172,000 + $53,000 - $14,000 - $10,000 = $201,000. | 100% | ✓ | ✓ | ✓ |
| P1-A-050 | pack_a_corrected.js | ExplanationWrongB | because $137,500 + $31,000 - $9,000 + $6,900 = $166,400. | 92% | ✓ | ✓ | ✓ |
| P1-AC-027 | pack_c_corrected.js | ExplanationWrongC | 120,000 + (36,000 x 8/12) - (12,000 x 2/12) = 142,000. | 84% | ✓ | ✓ | ✓ |
| P1-B-065 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (18,370) + Desired ending inventory (4,076) - Beginning inventory (3,380) = 19,066 units. | 95% | ✓ | ✓ | ✓ |
| P1-BC-043 | pack_c_corrected.js | ExplanationWrongC | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 93% | ✓ | ✓ | ✓ |
| P1-BD-089 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) = $120,000 + $60,000 ... | 100% | ✓ | ✓ | ✓ |
| P1-C-068 | pack_a_corrected.js | ExplanationWrongC | because $114,500 - $106,260 = $8,240 unfavorable. | 79% | ✓ | ✓ | ✓ |
| P1-CC-020 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,000 - (10% x $3,000,... | 100% | ✓ | ✓ | ✓ |
| P1-D-038 | pack_a_corrected.js | ExplanationWrongB | $180,000 / 600 = $300 per batch; 45 batches x $300 = $13,500. | 95% | ✓ | ✓ | ✓ |
| P1-DC-012 | pack_c_corrected.js | ExplanationWrongD | 50,000 / 100,000 x $150,000 = $75,000. | 100% | ✓ | ✓ | ✓ |

### Bucket 1B Samples (111 total — manual review)

| QID | Pack | Field | Content | Similarity | Fail Reasons |
|-----|------|-------|---------|------------|-------------|
| P1-A-039 | pack_a_corrected.js | ExplanationWrongA | because the depreciable base of $112,800 divided by 7 years equals $16,114. | 73% | Arith |
| P1-B-043 | pack_a_corrected.js | ExplanationWrongC | because it combines current-month collections and the collectible portion of prior-month receivables. | 45% | Arith; Dupe(45%) |
| P1-BC-017 | pack_c_corrected.js | ExplanationWrongA | because the monthly add/drop process is the defining feature of a rolling forecast. | 75% | Arith |
| P1-C-040 | pack_a_corrected.js | ExplanationWrongB | because the $0.60 price overrun applies to 6,500 pounds purchased. | 73% | Arith; KW:applies |
| P1-C-089 | pack_a_corrected.js | ExplanationWrongB | because 490 excess pounds x the $6 standard price equals $2,940 unfavorable. | 88% | KW:standard |
| P1-D-068 | pack_a_corrected.js | ExplanationWrongB | ABC overhead ($80,000) is $160,000 less than traditional ($240,000). | 75% | Arith |
| P1-DD-025 | pack_d_corrected.js | ExplanationWrongA | because customer orders processed match the cause of order-processing costs. | 92% | Arith |
| P1-EC-008 | pack_c_corrected.js | ExplanationWrongD | because COSO is the five-component internal-control framework tested here. | 88% | Arith |
| P1-F-027 | pack_a_corrected.js | ExplanationWrongB | because it describes rule-based automation with exception handling. | 68% | Arith |
| P1-FC-011 | pack_c_corrected.js | ExplanationWrongC | because RPA automates structured, rules-based manual tasks. | 82% | Arith |

## Full Classification — Bucket 1A (195 items)

| QID | Pack | Field | Content | EC Similarity | EC Content |
|-----|------|-------|---------|--------------|------------|
| P1-A-003 | pack_a_corrected.js | ExplanationWrongC | $172,000 + $53,000 - $14,000 - $10,000 = $201,000. | 100% | CFO = net income + depreciation - gain on sale - increase in AR = $172,000 + $53,000 - $14,000 - ... |
| P1-A-010 | pack_a_corrected.js | ExplanationWrongB | ($96,000 - $12,000) / 7 x 6/12 = $6,000. | 93% | Depreciable base = $96,000 - $12,000 = $84,000. Annual straight-line expense = $84,000 / 7 = $12,... |
| P1-A-026 | pack_a_corrected.js | ExplanationWrongD | because $324,300 assets - $127,100 liabilities = $197,200 equity. | 92% | Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Bea... |
| P1-A-027 | pack_a_corrected.js | ExplanationWrongC | because 396 shipped units x $55 = $21,780. | 90% | Under accrual revenue recognition, revenue is recognized when control transfers. Control transfer... |
| P1-A-028 | pack_a_corrected.js | ExplanationWrongD | because $44,700 + $166,900 - $39,950 = $171,650. | 100% | Cost of goods sold = beginning inventory + purchases - ending inventory. Delta has $44,700 beginn... |
| P1-A-030 | pack_a_corrected.js | ExplanationWrongB | because $103,500 + $23,000 - $7,000 + $5,300 = $124,800. | 92% | Under the indirect method, start with net income, add back noncash depreciation, subtract increas... |
| P1-A-031 | pack_a_corrected.js | ExplanationWrongD | Ending retained earnings = $195,000 + $80,400 - $20,700 = $254,700. | 100% | Ending retained earnings = Beginning retained earnings + Net income - Dividends declared = $195,0... |
| P1-A-032 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $72,000 + $90,300 + $122,600 = $284,900... | 98% | Current assets include cash, accounts receivable, and inventory. Accounts payable and wages payab... |
| P1-A-033 | pack_a_corrected.js | ExplanationWrongB | because $244,000 - $10,600 - $4,300 = $229,100. | 81% | Net sales reports sales after contra-revenue deductions. Net sales = gross sales - sales returns ... |
| P1-A-035 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = ($210,000 - $18,000) / 67,000 = $2.87, correctly subtracting preferred dividends and ... | 80% | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares outstanding. Net ... |
| P1-A-036 | pack_a_corrected.js | ExplanationWrongD | because $367,300 assets - $148,100 liabilities = $219,200 equity. | 91% | Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Lum... |
| P1-A-037 | pack_a_corrected.js | ExplanationWrongD | because 466 shipped units x $45 = $20,970. | 100% | Revenue is recognized when control transfers. Because control transfers on shipment, recognize re... |
| P1-A-038 | pack_a_corrected.js | ExplanationWrongC | because $53,700 + $189,900 - $46,450 = $197,150. | 100% | Cost of goods sold = beginning inventory + purchases - ending inventory. Northstar has $53,700 be... |
| P1-A-041 | pack_a_corrected.js | ExplanationWrongA | Ending retained earnings = $220,000 + $94,400 - $25,200 = $289,200. | 100% | Ending retained earnings = Beginning retained earnings + Net income - Dividends declared = $220,0... |
| P1-A-042 | pack_a_corrected.js | ExplanationWrongA | Current assets = Cash + Accounts receivable + Inventory = $82,000 + $99,300 + $130,600 = $311,900... | 98% | Current assets include cash, accounts receivable, and inventory. Accounts payable and wages payab... |
| P1-A-045 | pack_a_corrected.js | ExplanationWrongC | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($240,000 - $21... | 98% | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares. Income available... |
| P1-A-046 | pack_a_corrected.js | ExplanationWrongC | because $410,300 - $169,100 = $241,200. | 84% | Equity is the residual interest after liabilities are deducted from assets. Vantage reports asset... |
| P1-A-047 | pack_a_corrected.js | ExplanationWrongD | because 536 shipped units x $65 = $34,840. | 90% | Revenue recognition follows transfer of control. Since control transfers on shipment, recognize r... |
| P1-A-049 | pack_a_corrected.js | ExplanationWrongA | because ($156,800 - $12,000) / 5 = $28,960. | 71% | Straight-line depreciation uses depreciable cost, not full acquisition cost. Zephyr's depreciable... |
| P1-A-050 | pack_a_corrected.js | ExplanationWrongB | because $137,500 + $31,000 - $9,000 + $6,900 = $166,400. | 92% | Under the indirect method, depreciation is added back, an increase in accounts receivable is subt... |
| P1-A-051 | pack_a_corrected.js | ExplanationWrongC | Ending retained earnings = $245,000 + $108,400 - $29,700 = $323,700. | 100% | Ending retained earnings = Beginning retained earnings + Net income - Dividends declared = $245,0... |
| P1-A-052 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $92,000 + $108,300 + $138,600 = $338,90... | 98% | Current assets include cash, accounts receivable, and inventory. Accounts payable and wages payab... |
| P1-A-055 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($270,000 - $24... | 98% | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares. Income available... |
| P1-A-056 | pack_a_corrected.js | ExplanationWrongD | because $453,300 assets - $190,100 liabilities = $263,200 equity. | 89% | The accounting equation is assets = liabilities + equity, so equity = assets - liabilities. Grani... |
| P1-A-057 | pack_a_corrected.js | ExplanationWrongC | because 606 shipped units x $55 = $33,330. | 100% | Revenue is recognized when control transfers to the customer. Because control transfers on shipme... |
| P1-A-058 | pack_a_corrected.js | ExplanationWrongB | because $71,700 + $235,900 - $59,450 = $248,150. | 100% | Cost of goods sold = beginning inventory + purchases - ending inventory. Iris has $71,700 beginni... |
| P1-A-061 | pack_a_corrected.js | ExplanationWrongD | Ending retained earnings = $270,000 + $122,400 - $34,200 = $358,200. | 100% | Ending retained earnings = Beginning retained earnings + Net income - Dividends declared = $270,0... |
| P1-A-062 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $102,000 + $117,300 + $146,600 = $365,9... | 98% | Current assets include cash, accounts receivable, and inventory. Accounts payable and wages payab... |
| P1-A-065 | pack_a_corrected.js | ExplanationWrongA | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($300,000 - $27... | 98% | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares. Income available... |
| P1-A-066 | pack_a_corrected.js | ExplanationWrongC | because $496,300 assets - $211,100 liabilities = $285,200 equity. | 91% | Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Qua... |
| P1-A-067 | pack_a_corrected.js | ExplanationWrongB | because 676 shipped units x $45 = $30,420. | 90% | Revenue is recognized for units shipped when control transfers on shipment. Riverview shipped 676... |
| P1-A-069 | pack_a_corrected.js | ExplanationWrongC | because ($220,800 - $12,000) / 5 = $41,760. | 79% | Straight-line depreciation equals depreciable cost divided by useful life. Titan's depreciable co... |
| P1-A-070 | pack_a_corrected.js | ExplanationWrongC | because $171,500 + $39,000 - $11,000 + $8,500 = $208,000. | 91% | The indirect method reconciles net income to operating cash flow by adding noncash depreciation, ... |
| P1-A-071 | pack_a_corrected.js | ExplanationWrongB | Ending retained earnings = $295,000 + $136,400 - $38,700 = $392,700. | 100% | Ending retained earnings = Beginning retained earnings + Net income - Dividends declared = $295,0... |
| P1-A-072 | pack_a_corrected.js | ExplanationWrongB | Current assets = Cash + Accounts receivable + Inventory = $112,000 + $126,300 + $154,600 = $392,9... | 98% | Current assets include cash, accounts receivable, and inventory. Accounts payable and wages payab... |
| P1-A-073 | pack_a_corrected.js | ExplanationWrongD | because $464,000 - $18,600 - $8,300 = $437,100. | 82% | Net sales = gross sales - sales returns - sales allowances. Yukon reported $464,000 gross sales, ... |
| P1-A-075 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($330,000 - $30... | 98% | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares. Income available... |
| P1-AC-026 | pack_c_corrected.js | ExplanationWrongB | ($340,000 - $40,000) / 100,000 = $3.00. | 100% | Basic EPS = (net income - preferred dividends) / weighted-average common shares = ($340,000 - $40... |
| P1-AC-027 | pack_c_corrected.js | ExplanationWrongC | 120,000 + (36,000 x 8/12) - (12,000 x 2/12) = 142,000. | 84% | 120,000 x 12/12 = 120,000; 36,000 x 8/12 = 24,000; -12,000 x 2/12 = -2,000. Weighted-average shar... |
| P1-AC-028 | pack_c_corrected.js | ExplanationWrongD | $620,000 + $48,000 - $61,000 = $607,000. | 100% | Cash collected = sales + beginning AR - ending AR = $620,000 + $48,000 - $61,000 = $607,000. |
| P1-AC-029 | pack_c_corrected.js | ExplanationWrongA | $430,000 + $22,000 + $14,000 = $466,000. | 100% | Cash paid = COGS + increase in inventory + decrease in AP = $430,000 + $22,000 + $14,000 = $466,000. |
| P1-AD-056 | pack_d_corrected.js | ExplanationWrongD | ($54,000 - $6,000) / 8 x 9/12 = $4,500. | 94% | Depreciable base = $54,000 - $6,000 = $48,000. Annual depreciation = $48,000 / 8 = $6,000. Partia... |
| P1-B-017 | pack_a_corrected.js | ExplanationWrongC | Production = 12,130 + 2,924 - 2,420 = 12,634 units, correctly applying the production budget form... | 70% | Production (units) = Budgeted sales + Desired ending finished goods inventory - Beginning finishe... |
| P1-B-018 | pack_a_corrected.js | ExplanationWrongA | Purchases = Production needs (45,800 lbs) + Desired ending inventory (4,820 lbs) - Beginning inve... | 94% | Purchases = Production needs + Desired ending inventory - Beginning inventory. Production needs =... |
| P1-B-019 | pack_a_corrected.js | ExplanationWrongA | because it adds current-month collections of $65,310 and prior-month collections of $93,240. | 89% | Cash collections include the portion collected from current-month sales plus collections of prior... |
| P1-B-023 | pack_a_corrected.js | ExplanationWrongD | With a 85% cumulative average-time learning curve, the cumulative average time after one doubling... | 100% | With a 85% cumulative average-time learning curve, the cumulative average time per batch decrease... |
| P1-B-024 | pack_a_corrected.js | ExplanationWrongA | Ending cash before financing = $32,800 + $94,200 - $101,800 = $25,200. The minimum balance is $25... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $32,800 + $94,200 - $1... |
| P1-B-030 | pack_a_corrected.js | ExplanationWrongB | Purchases = Production needs (50,600 lbs) + Desired ending inventory (5,240 lbs) - Beginning inve... | 94% | Purchases = Production needs + Desired ending inventory - Beginning inventory. Production needs =... |
| P1-B-034 | pack_a_corrected.js | ExplanationWrongD | because it adds $77,200 fixed cost to $58,500 variable cost. | 84% | Use the regression equation as written: total forecast cost = fixed cost + variable cost per mach... |
| P1-B-036 | pack_a_corrected.js | ExplanationWrongA | Ending cash before financing = $34,000 + $105,000 - $112,000 = $27,000. The minimum balance is $2... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $34,000 + $105,000 - $... |
| P1-B-048 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $35,200 + $115,800 - $122,200 = $28,800. The minimum balance is $2... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $35,200 + $115,800 - $... |
| P1-B-053 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (16,810) + Desired ending inventory (3,788) - Beginning inventory (3,140) = 17... | 98% | Production = Sales + Desired ending inventory - Beginning inventory. Desired ending = 20% of next... |
| P1-B-056 | pack_a_corrected.js | ExplanationWrongC | because $62,000 fixed cost plus $116,800 variable cost equals $178,800. | 75% | For a flexible budget, variable support cost changes with actual output while fixed support cost ... |
| P1-B-058 | pack_a_corrected.js | ExplanationWrongC | because it adds $86,800 fixed cost and $71,400 variable cost. | 71% | Apply the regression equation directly: total forecast cost = fixed cost + variable rate x machin... |
| P1-B-059 | pack_a_corrected.js | ExplanationWrongC | 12,000 + (35 x 420) = 26,700 units. | 100% | Use the regression equation by adding the fixed intercept to the driver-based portion of the fore... |
| P1-B-060 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $36,400 + $126,600 - $132,400 = $30,600. The minimum balance is $2... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $36,400 + $126,600 - $... |
| P1-B-061 | pack_a_corrected.js | ExplanationWrongC | Production = 20,000 + 3,000 - 2,000 = 21,000 units. | 100% | Production = Sales + Desired ending inventory - Beginning inventory = 20,000 + 3,000 - 2,000 = 21... |
| P1-B-065 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (18,370) + Desired ending inventory (4,076) - Beginning inventory (3,380) = 19... | 95% | Production = Sales + Desired ending inventory - Beginning inventory. Desired ending = 20% of next... |
| P1-B-066 | pack_a_corrected.js | ExplanationWrongC | Purchases = Production needs (65,000 lbs) + Desired ending inventory (6,500 lbs) - Beginning inve... | 94% | Purchases = Production needs + Desired ending inventory - Beginning inventory. Production needs =... |
| P1-B-067 | pack_a_corrected.js | ExplanationWrongA | because current collections of $102,270 plus prior-month collections of $145,080 equal $247,350. | 84% | Cash collections are based on when sales are collected. Riverview collects 35% of current-month s... |
| P1-B-068 | pack_a_corrected.js | ExplanationWrongC | because $66,800 fixed cost plus $156,800 variable cost equals $223,600. | 80% | A flexible budget uses actual output for variable costs and total fixed cost unchanged. Summit's ... |
| P1-B-072 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $37,600 + $137,400 - $142,600 = $32,400. The minimum balance is $2... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $37,600 + $137,400 - $... |
| P1-B-074 | pack_a_corrected.js | ExplanationWrongB | 18,000 + 4,000 - 3,000 = 19,000 units. | 100% | Required production = budgeted sales + desired ending inventory - beginning inventory. Desired Ju... |
| P1-B-077 | pack_a_corrected.js | ExplanationWrongC | Production = Sales (19,930) + Desired ending inventory (4,364) - Beginning inventory (3,620) = 20... | 95% | Production = Sales + Desired ending inventory - Beginning inventory. Desired ending = 20% of next... |
| P1-B-078 | pack_a_corrected.js | ExplanationWrongD | Purchases = Production needs (69,800 lbs) + Desired ending inventory (6,920 lbs) - Beginning inve... | 94% | Purchases = Production needs + Desired ending inventory - Beginning inventory. Production needs =... |
| P1-B-080 | pack_a_corrected.js | ExplanationWrongD | because $71,600 fixed cost plus $201,120 variable cost equals $272,720. | 76% | A flexible budget keeps fixed cost unchanged in total and flexes variable cost to actual output. ... |
| P1-B-082 | pack_a_corrected.js | ExplanationWrongD | because it adds $96,400 fixed cost and $81,900 variable cost. | 73% | Use total cost = fixed cost + variable cost per machine-hour x planned machine-hours. $96,400 + (... |
| P1-B-083 | pack_a_corrected.js | ExplanationWrongC | because 20 units x 45 average hours x $30 per hour equals $27,000. | 78% | With a 90% cumulative average-time learning curve, one doubling from 10 units to 20 units reduces... |
| P1-B-084 | pack_a_corrected.js | ExplanationWrongC | Ending cash before financing = $38,800 + $148,200 - $152,800 = $34,200. The minimum balance is $2... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $38,800 + $148,200 - $... |
| P1-B-089 | pack_a_corrected.js | ExplanationWrongC | Production = Sales (21,490) + Desired ending inventory (4,652) - Beginning inventory (3,860) = 22... | 96% | Production = Sales + Desired ending inventory - Beginning inventory. Desired ending = 20% of next... |
| P1-B-090 | pack_a_corrected.js | ExplanationWrongC | Purchases = Production needs (74,600 lbs) + Desired ending inventory (7,340 lbs) - Beginning inve... | 94% | Purchases = Production needs + Desired ending inventory - Beginning inventory. Production needs =... |
| P1-B-092 | pack_a_corrected.js | ExplanationWrongD | because $76,400 fixed cost plus $160,560 variable cost equals $236,960. | 91% | Flexible budget support cost equals total fixed cost plus variable cost at actual output. Rivervi... |
| P1-B-096 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $40,000 + $159,000 - $163,000 = $36,000. The minimum balance is $2... | 97% | Ending cash before financing = Beginning cash + Receipts - Disbursements = $40,000 + $159,000 - $... |
| P1-B-098 | pack_a_corrected.js | ExplanationWrongB | March disbursements = 60% x March purchases ($95,000) + 40% x February purchases ($80,000) = $57,... | 94% | March cash disbursements = 60% of March purchases + 40% of February purchases = 60% x $95,000 + 4... |
| P1-BC-041 | pack_c_corrected.js | ExplanationWrongA | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inve... | 98% | Required production = Budgeted sales + Desired ending inventory - Beginning inventory = 40,000 + ... |
| P1-BC-042 | pack_c_corrected.js | ExplanationWrongB | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inve... | 89% | The production budget formula is: Units to produce = Budgeted sales + Desired ending finished goo... |
| P1-BC-043 | pack_c_corrected.js | ExplanationWrongC | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inve... | 93% | To determine required production: add desired ending inventory to budgeted sales to determine tot... |
| P1-BC-044 | pack_c_corrected.js | ExplanationWrongD | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inve... | 86% | Required production of 42,000 units meets three targets: current sales of 40,000 units, a 5,000-u... |
| P1-BC-045 | pack_c_corrected.js | ExplanationWrongA | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inve... | 90% | Each production budget begins with budgeted sales (40,000), adds the target ending inventory (5,0... |
| P1-BC-046 | pack_c_corrected.js | ExplanationWrongB | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inve... | 88% | Production = 40,000 (sales) + 5,000 (desired ending) - 3,000 (beginning) = 42,000 units. The most... |
| P1-BC-068 | pack_c_corrected.js | ExplanationWrongD | because the $15,000 cost change divided by the 3,000-hour activity change equals $5.00 per hour. | 76% | The high-low method estimates variable cost per unit from the change in cost divided by the chang... |
| P1-BC-069 | pack_c_corrected.js | ExplanationWrongA | because the high-low variable cost rate is $15,000 divided by 3,000 machine hours, or $5.00 per h... | 83% | Under the high-low method, variable cost per machine hour equals the cost difference divided by t... |
| P1-BD-022 | pack_d_corrected.js | ExplanationWrongB | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate pe... | 97% | Budgeted direct labor cost is calculated by multiplying the number of units to be produced by the... |
| P1-BD-023 | pack_d_corrected.js | ExplanationWrongC | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate pe... | 97% | Budgeted direct labor cost is calculated by multiplying the number of units to be produced by the... |
| P1-BD-024 | pack_d_corrected.js | ExplanationWrongD | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate pe... | 97% | Budgeted direct labor cost is calculated by multiplying the number of units to be produced by the... |
| P1-BD-025 | pack_d_corrected.js | ExplanationWrongA | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate pe... | 97% | Budgeted direct labor cost is calculated by multiplying the number of units to be produced by the... |
| P1-BD-026 | pack_d_corrected.js | ExplanationWrongB | because 8,000 units x 2 hours x $18 per hour equals $288,000. | 76% | The direct labor budget converts planned production into labor hours and then into dollars. Ashfi... |
| P1-BD-028 | pack_d_corrected.js | ExplanationWrongD | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate pe... | 97% | Budgeted direct labor cost is calculated by multiplying the number of units to be produced by the... |
| P1-BD-050 | pack_d_corrected.js | ExplanationWrongB | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning ... | 100% | The direct materials purchases budget determines the quantity of materials to buy. Production nee... |
| P1-BD-051 | pack_d_corrected.js | ExplanationWrongC | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning ... | 100% | The direct materials purchases budget determines the quantity of materials to buy. Production nee... |
| P1-BD-054 | pack_d_corrected.js | ExplanationWrongB | because 25,000 + 4,000 - 3,000 equals 26,000 pounds. | 84% | A materials purchases budget adjusts production needs for inventory targets: purchases = material... |
| P1-BD-055 | pack_d_corrected.js | ExplanationWrongC | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning ... | 100% | The direct materials purchases budget determines the quantity of materials to buy. Production nee... |
| P1-BD-056 | pack_d_corrected.js | ExplanationWrongD | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning ... | 100% | The direct materials purchases budget determines the quantity of materials to buy. Production nee... |
| P1-BD-078 | pack_d_corrected.js | ExplanationWrongB | 36,000 + 4,500 - 3,200 = 37,300 pounds. | 100% | Materials purchases = materials needed for production + desired ending materials inventory - begi... |
| P1-BD-079 | pack_d_corrected.js | ExplanationWrongC | $42,000 + ($6 x 8,500) = $93,000. | 100% | Flexible budget cost at actual activity = fixed cost + variable cost = $42,000 + ($6 x 8,500) = $... |
| P1-BD-089 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) =... | 100% | June cash collections consist of 60% of June sales (collected in the month of sale) plus 40% of M... |
| P1-BD-090 | pack_d_corrected.js | ExplanationWrongB | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) =... | 100% | June cash collections consist of 60% of June sales (collected in the month of sale) plus 40% of M... |
| P1-BD-091 | pack_d_corrected.js | ExplanationWrongC | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) =... | 100% | June cash collections consist of 60% of June sales (collected in the month of sale) plus 40% of M... |
| P1-BD-092 | pack_d_corrected.js | ExplanationWrongD | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) =... | 100% | June cash collections consist of 60% of June sales (collected in the month of sale) plus 40% of M... |
| P1-BD-093 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) =... | 100% | June cash collections consist of 60% of June sales (collected in the month of sale) plus 40% of M... |
| P1-C-018 | pack_a_corrected.js | ExplanationWrongD | because 2,475 actual hours x $1 excess rate equals $2,475 unfavorable. | 82% | The labor rate variance uses actual hours worked times the difference between actual and standard... |
| P1-C-021 | pack_a_corrected.js | ExplanationWrongB | because $268,000 / $1,370,000 rounds to 19.6%. | 74% | ROI is operating income divided by average operating assets. Vantage's ROI is $268,000 / $1,370,0... |
| P1-C-022 | pack_a_corrected.js | ExplanationWrongC | because residual income is $324,500 - $237,000 = $87,500 positive. | 94% | Residual income equals operating income minus the required return on invested assets. The capital... |
| P1-C-030 | pack_a_corrected.js | ExplanationWrongC | because 2,775 actual hours x the $1 rate overrun = $2,775 unfavorable. | 85% | Direct labor rate variance = actual hours x (actual rate - standard rate). Frontier used 2,775 ho... |
| P1-C-033 | pack_a_corrected.js | ExplanationWrongC | because $304,000 / $1,610,000 rounds to 18.9%. | 87% | ROI measures operating income as a percentage of average operating assets. Iris reports $304,000 ... |
| P1-C-034 | pack_a_corrected.js | ExplanationWrongB | because $366,500 - (12% x $2,275,000) = $93,500 positive. | 81% | Residual income equals operating income less the required return on average operating assets. The... |
| P1-C-046 | pack_a_corrected.js | ExplanationWrongC | because $408,500 - (12% x $2,575,000) = $99,500 positive. | 85% | Residual income = operating income - (required return x average operating assets). The investment... |
| P1-C-052 | pack_a_corrected.js | ExplanationWrongC | because 7,220 pounds x $0.60 excess price equals $4,332 unfavorable. | 84% | Direct material price variance is actual quantity purchased times actual price minus standard pri... |
| P1-C-054 | pack_a_corrected.js | ExplanationWrongC | because the $1 excess rate applied to 3,375 actual hours gives $3,375 unfavorable. | 76% | Direct labor rate variance = actual hours x (actual rate - standard rate). Evergreen used 3,375 h... |
| P1-C-055 | pack_a_corrected.js | ExplanationWrongA | because 70 fewer hours than allowed x $24 equals $1,680 favorable. | 81% | Labor efficiency variance compares actual hours with standard hours allowed at the standard rate.... |
| P1-C-057 | pack_a_corrected.js | ExplanationWrongB | because $376,000 / $2,090,000 rounds to 18.0%. | 76% | ROI = operating income / average operating assets. Harbor reports $376,000 of operating income an... |
| P1-C-058 | pack_a_corrected.js | ExplanationWrongC | because $450,500 - $345,000 = $105,500 positive. | 86% | Residual income = operating income - required return on average operating assets. The required-re... |
| P1-C-064 | pack_a_corrected.js | ExplanationWrongB | because 7,940 pounds x $0.60 excess price equals $4,764 unfavorable. | 84% | Direct material price variance applies the price difference to the actual quantity purchased. Oas... |
| P1-C-067 | pack_a_corrected.js | ExplanationWrongD | because 82 fewer hours than allowed x $24 equals $1,968 favorable. | 87% | Direct labor efficiency variance uses the standard rate times actual hours minus standard hours a... |
| P1-C-068 | pack_a_corrected.js | ExplanationWrongC | because $114,500 - $106,260 = $8,240 unfavorable. | 79% | The flexible-budget spending variance is actual variable overhead minus the flexible budget for a... |
| P1-C-069 | pack_a_corrected.js | ExplanationWrongA | because $412,000 / $2,330,000 rounds to 17.7%. | 87% | ROI = operating income / average operating assets. Titan reports $412,000 of operating income and... |
| P1-C-070 | pack_a_corrected.js | ExplanationWrongB | because residual income is $492,500 - $381,000 = $111,500 positive. | 90% | Residual income = operating income - (required return x average operating assets). The investment... |
| P1-C-076 | pack_a_corrected.js | ExplanationWrongC | because 8,660 pounds x $0.60 excess price equals $5,196 unfavorable. | 84% | Direct material price variance is based on actual quantity purchased and the difference between a... |
| P1-C-078 | pack_a_corrected.js | ExplanationWrongB | because 3,975 actual hours x the $1 excess actual rate = $3,975 unfavorable. | 88% | Direct labor rate variance = actual hours x (actual rate - standard rate). Delta used 3,975 hours... |
| P1-C-081 | pack_a_corrected.js | ExplanationWrongA | because $448,000 / $2,570,000 rounds to 17.4%. | 90% | ROI = operating income / average operating assets. Granite reports $448,000 of operating income a... |
| P1-C-082 | pack_a_corrected.js | ExplanationWrongA | because $534,500 - (12% x $3,475,000) = $117,500 positive. | 84% | Residual income = operating income - (required return x average operating assets). The investment... |
| P1-C-083 | pack_a_corrected.js | ExplanationWrongB | because $88,360 - $84,000 = $4,360 favorable. | 76% | Sales-volume variance compares flexible-budget contribution with static-budget contribution to is... |
| P1-C-088 | pack_a_corrected.js | ExplanationWrongC | because 9,380 pounds x $0.60 excess price equals $5,628 unfavorable. | 88% | Direct material price variance applies the price difference to the actual quantity purchased. Nor... |
| P1-C-091 | pack_a_corrected.js | ExplanationWrongD | because 76 fewer hours than allowed x $24 equals $1,824 favorable. | 84% | Labor efficiency variance uses standard rate times actual hours minus standard hours allowed. Qua... |
| P1-C-092 | pack_a_corrected.js | ExplanationWrongC | because $126,500 - $116,340 = $10,160 unfavorable. | 78% | The flexible-budget spending variance is actual variable overhead minus the flexible budget for a... |
| P1-C-093 | pack_a_corrected.js | ExplanationWrongB | because $484,000 / $2,810,000 rounds to 17.2%. | 82% | ROI = operating income / average operating assets. Summit reports $484,000 of operating income an... |
| P1-C-094 | pack_a_corrected.js | ExplanationWrongD | because $576,500 - $453,000 = $123,500 positive. | 89% | Residual income = operating income - required return on average operating assets. Titan's require... |
| P1-C-100 | pack_a_corrected.js | ExplanationWrongD | because 10,100 pounds x $0.60 excess price equals $6,060 unfavorable. | 91% | Direct material price variance equals actual quantity purchased times actual price minus standard... |
| P1-CC-015 | pack_c_corrected.js | ExplanationWrongC | RI = $450,000 - $300,000 = $150,000 means the division earned $150,000 above its required return. | 92% | Residual income (RI) = Operating income - (Required rate of return × Average operating assets). R... |
| P1-CC-016 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,... | 100% | Residual income (RI) measures investment center performance in dollar terms. RI = Operating incom... |
| P1-CC-017 | pack_c_corrected.js | ExplanationWrongA | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,... | 100% | Residual income (RI) measures investment center performance in dollar terms. RI = Operating incom... |
| P1-CC-018 | pack_c_corrected.js | ExplanationWrongB | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,... | 100% | Residual income (RI) measures investment center performance in dollar terms. RI = Operating incom... |
| P1-CC-019 | pack_c_corrected.js | ExplanationWrongC | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,... | 100% | Residual income (RI) measures investment center performance in dollar terms. RI = Operating incom... |
| P1-CC-020 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,... | 100% | Residual income (RI) measures investment center performance in dollar terms. RI = Operating incom... |
| P1-CC-021 | pack_c_corrected.js | ExplanationWrongA | because 450,000 - (10% x 3,000,000) equals 150,000. | 70% | Residual income = operating income - required return on average operating assets. Underwood's req... |
| P1-CC-054 | pack_c_corrected.js | ExplanationWrongB | because the actual selling price exceeded budget by $3 on 6,200 units. | 81% | Sales price variance uses actual units sold times the difference between actual and budgeted sell... |
| P1-CC-059 | pack_c_corrected.js | ExplanationWrongC | (50,000 - 46,000) x $6 = $24,000 unfavorable. | 97% | Fixed overhead rate = $300,000 / 50,000 units = $6 per unit. The volume variance compares denomin... |
| P1-CC-060 | pack_c_corrected.js | ExplanationWrongD | (66,000 - 60,000) x $8 = $48,000 favorable. | 82% | Fixed overhead rate = $480,000 / 60,000 hours = $8 per hour. Standard hours allowed exceed denomi... |
| P1-CC-061 | pack_c_corrected.js | ExplanationWrongA | (90,000 - 84,000) x $8 = $48,000 unfavorable. | 77% | Fixed overhead rate = $720,000 / 90,000 hours = $8 per hour. Standard hours allowed are 6,000 hou... |
| P1-CC-062 | pack_c_corrected.js | ExplanationWrongB | (50,000 - 45,000) x $8 = $40,000 favorable. | 81% | Fixed overhead rate = $360,000 / 45,000 units = $8 per unit. Actual output exceeded denominator v... |
| P1-CD-001 | pack_d_corrected.js | ExplanationWrongA | The labor rate variance is 2,100 × ($19 - $18) = $2,100 Unfavorable. | 98% | Labor rate variance = Actual hours × (Actual rate - Standard rate) = 2,100 × ($19 - $18) = 2,100 ... |
| P1-D-004 | pack_a_corrected.js | ExplanationWrongB | $285,000 applied - $275,000 actual = $10,000 overapplied. | 92% | Applied overhead = 9,500 DLH x $30 = $285,000. Actual overhead = $275,000. Since applied ($285,00... |
| P1-D-007 | pack_a_corrected.js | ExplanationWrongC | 700 moves x ($90,000 / 4,500) = 700 x $20 = $14,000. | 88% | Activity rate = $90,000 / 4,500 moves = $20 per move. Product A assigned cost = 700 moves x $20 =... |
| P1-D-023 | pack_a_corrected.js | ExplanationWrongD | because 9,180 completed units + 836 equivalent units in ending WIP = 10,016. | 94% | Equivalent units for conversion cost = units completed + ending WIP units x conversion percent co... |
| P1-D-025 | pack_a_corrected.js | ExplanationWrongD | because $316 per setup x 23 setups = $7,268. | 89% | ABC assignment uses an activity rate times the product's activity consumption. Apex's setup rate ... |
| P1-D-026 | pack_a_corrected.js | ExplanationWrongB | because $126 selling price - $34 target profit = $92 allowable target cost. | 93% | Allowable target cost = target selling price - required target profit. Beacon must sell at $126 a... |
| P1-D-028 | pack_a_corrected.js | ExplanationWrongA | $500,000 / 20,000 MH = $25 per MH, and 6,000 MH x $25 = $150,000. | 86% | Facility-level cost per machine hour = $500,000 / 20,000 = $25 per MH. Product X allocation = 6,0... |
| P1-D-031 | pack_a_corrected.js | ExplanationWrongA | because about $7.34 per MH x 153 MH = about $1,123. | 83% | Applied overhead equals the predetermined overhead rate times actual job activity. Granite's rate... |
| P1-D-033 | pack_a_corrected.js | ExplanationWrongB | because 9,780 completed units + 1,195 equivalent units in ending WIP = 10,975. | 92% | Equivalent units for conversion cost = units completed + ending WIP units x percent complete for ... |
| P1-D-034 | pack_a_corrected.js | ExplanationWrongB | because $303,000 / 13,400 rounds to $22.61 per equivalent unit. | 88% | Under weighted-average process costing, cost per equivalent unit = total costs to account for / e... |
| P1-D-035 | pack_a_corrected.js | ExplanationWrongD | because 23 setups x about $344.44 per setup = about $7,922. | 93% | ABC allocation starts with the setup activity rate: $232,500 / 675 setup events = about $344.44 p... |
| P1-D-036 | pack_a_corrected.js | ExplanationWrongD | because $136 - $30 = $106 allowable target cost. | 88% | Target cost is the maximum allowable cost that still permits the required profit at the target se... |
| P1-D-038 | pack_a_corrected.js | ExplanationWrongB | $180,000 / 600 = $300 per batch; 45 batches x $300 = $13,500. | 95% | Setup cost is a batch-level cost. Activity rate = $180,000 / 600 batches = $300 per batch. Produc... |
| P1-D-041 | pack_a_corrected.js | ExplanationWrongA | because about $7.59 per MH x 183 MH = about $1,389. | 80% | Predetermined overhead rate = estimated overhead / estimated activity. Quartz's rate is $567,000 ... |
| P1-D-043 | pack_a_corrected.js | ExplanationWrongD | because 10,380 completed units + 1,614 equivalent units in ending WIP = 11,994. | 88% | Equivalent units for conversion = units completed + ending WIP units x conversion completion perc... |
| P1-D-045 | pack_a_corrected.js | ExplanationWrongD | because 23 setups x about $368.97 per setup = about $8,486. | 89% | ABC setup cost assigned = setup activity rate x setups used by the product. Umbra's setup rate is... |
| P1-D-046 | pack_a_corrected.js | ExplanationWrongB | because $126 selling price - $33 target profit = $93 allowable cost. | 93% | Allowable target cost = target selling price - required target profit. Vantage must sell at $126 ... |
| P1-D-048 | pack_a_corrected.js | ExplanationWrongC | 500 / 1,000 hours x $120,000 = $60,000. | 100% | Total engineering hours = 500 + 300 + 200 = 1,000. Product A share = 500 / 1,000 = 50%. Product A... |
| P1-D-051 | pack_a_corrected.js | ExplanationWrongC | because 213 MH x about $7.80 per MH = about $1,661. | 83% | Applied overhead is computed by multiplying the predetermined rate by the job's actual activity. ... |
| P1-D-053 | pack_a_corrected.js | ExplanationWrongB | because 10,980 completed units + 1,196 equivalent units in ending WIP = 12,176. | 88% | Equivalent units for conversion = completed units + ending WIP units x conversion percent complet... |
| P1-D-054 | pack_a_corrected.js | ExplanationWrongC | because $393,000 / 15,400 rounds to $25.52 per equivalent unit. | 89% | Weighted-average cost per equivalent unit = total costs to account for / equivalent units. Evergr... |
| P1-D-056 | pack_a_corrected.js | ExplanationWrongC | because $136 selling price - $29 target profit = $107 allowable target cost. | 93% | Target cost equals the target selling price minus the required target profit. Granite's allowable... |
| P1-D-058 | pack_a_corrected.js | ExplanationWrongB | because $15 per machine-hour x 3,000 machine-hours = $45,000. | 93% | ABC cost allocation uses the cost-driver rate times activity used. The machining rate is $180,000... |
| P1-D-061 | pack_a_corrected.js | ExplanationWrongB | because the predetermined rate applied to 243 machine-hours gives about $1,937. | 76% | Predetermined overhead rate = $707,000 / 88,700 MH = about $7.97 per MH. Lumen applies overhead t... |
| P1-D-063 | pack_a_corrected.js | ExplanationWrongB | because 11,580 completed units + 1,645 equivalent units in ending WIP = 13,225. | 88% | Equivalent units for conversion cost = completed units + ending WIP units x percent complete. Nor... |
| P1-D-065 | pack_a_corrected.js | ExplanationWrongB | because 23 setups x about $409.09 per setup = about $9,409. | 88% | ABC setup cost assigned equals setup rate times the number of setups consumed. Pioneer's setup ra... |
| P1-D-066 | pack_a_corrected.js | ExplanationWrongB | because $126 selling price - $32 target profit = $94 allowable target cost. | 91% | Allowable target cost = target selling price - required target profit. Quartz must sell at $126 a... |
| P1-D-071 | pack_a_corrected.js | ExplanationWrongD | because 273 MH x about $8.12 per MH = about $2,217. | 90% | Applied overhead uses the predetermined rate multiplied by job activity. Vantage's rate is $777,0... |
| P1-D-073 | pack_a_corrected.js | ExplanationWrongC | because 12,180 completed units + 2,154 equivalent units in ending WIP = 14,334. | 89% | Equivalent units for conversion cost = completed units + ending WIP units x percent complete for ... |
| P1-D-075 | pack_a_corrected.js | ExplanationWrongB | because 23 setups x about $425.71 per setup = about $9,791. | 87% | ABC setup assignment uses the setup cost-driver rate times setups consumed. Apex's rate is $372,5... |
| P1-DC-011 | pack_c_corrected.js | ExplanationWrongC | $96,000 / 240 = $400 per setup; 18 setups x $400 = $7,200. | 95% | Setup cost driver rate = $96,000 / 240 setups = $400 per setup. Product A uses 18 setups, so assi... |
| P1-DC-012 | pack_c_corrected.js | ExplanationWrongD | 50,000 / 100,000 x $150,000 = $75,000. | 100% | Total physical units = 20,000 + 30,000 + 50,000 = 100,000. Product 3 share = 50,000 / 100,000 = 5... |
| P1-DC-013 | pack_c_corrected.js | ExplanationWrongA | ($250,000 / $400,000) x $200,000 = $125,000. | 88% | Product X sales value = 10,000 x $25 = $250,000. Product Y sales value = 5,000 x $30 = $150,000. ... |
| P1-DC-014 | pack_c_corrected.js | ExplanationWrongB | ($120,000 / 20,000 MH) x 12,000 MH = $6 x 12,000 = $72,000. | 89% | Total machine hours = 8,000 + 12,000 = 20,000. Allocation rate = $120,000 / 20,000 = $6 per MH. D... |
| P1-DC-015 | pack_c_corrected.js | ExplanationWrongC | $75,000 / 3,000 = $25 per ticket; 420 tickets x $25 = $10,500. | 95% | Support cost rate = $75,000 / 3,000 tickets = $25 per ticket. Group East generated 420 tickets, s... |
| P1-DC-025 | pack_c_corrected.js | ExplanationWrongA | because selling 3,000 more units than produced releases $15,000 of fixed overhead from inventory ... | 89% | When sales exceed production, absorption costing releases fixed manufacturing overhead previously... |
| P1-DC-066 | pack_c_corrected.js | ExplanationWrongB | because $252,000 / ($84 - $56) = 9,000 units. | 71% | Contribution margin per unit is $84 - $56 = $28. Break-even units equal fixed costs divided by co... |
| P1-DC-067 | pack_c_corrected.js | ExplanationWrongC | because ($384,000 + $96,000) / $48 = 10,000 units. | 85% | Target-profit units equal fixed costs plus target profit divided by unit contribution margin. Uni... |
| P1-DC-068 | pack_c_corrected.js | ExplanationWrongD | because $240,000 / 40% = $600,000 of sales. | 100% | The contribution margin ratio is 40% because variable costs are 60% of sales. Break-even sales do... |
| P1-DD-023 | pack_d_corrected.js | ExplanationWrongC | $144,000 / 1,800 = $80 per order; 260 orders x $80 = $20,800. | 95% | Order-processing rate = $144,000 / 1,800 orders = $80 per order. Product Line R generated 260 ord... |
| P1-DD-027 | pack_d_corrected.js | ExplanationWrongC | because 24,000 budgeted units minus 18,500 break-even units equals 5,500 units. | 86% | Margin of safety in units equals expected unit sales minus break-even unit sales. Bellcourt's mar... |
| P1-DD-029 | pack_d_corrected.js | ExplanationWrongA | because $500,000 - $350,000 = $150,000. | 74% | Margin of safety in dollars = budgeted sales - break-even sales. Dellwood has $500,000 budgeted s... |
| P1-DD-030 | pack_d_corrected.js | ExplanationWrongB | because the $375,000 safety margin is 30.0% of expected sales. | 66% | Margin of safety is $1,250,000 - $875,000 = $375,000. The margin of safety ratio is $375,000 / $1... |
| P1-DD-034 | pack_d_corrected.js | ExplanationWrongB | because 4.0 x 6% = 24%. | 77% | Degree of operating leverage estimates the percentage change in operating income for a percentage... |
| P1-DD-056 | pack_d_corrected.js | ExplanationWrongD | (170 x $600) + (1,100 x $50) = $102,000 + $55,000 = $157,000. | 100% | Setup rate = $120,000 / 200 = $600 per setup. Inspection rate = $80,000 / 1,600 = $50 per hour. P... |
| P1-DD-057 | pack_d_corrected.js | ExplanationWrongA | $8,000 of machining cost plus $7,200 of setup cost = $15,200. | 80% | Machining rate = $120,000 / 6,000 = $20 per machine hour, so Product M receives 400 x $20 = $8,00... |
| P1-DD-058 | pack_d_corrected.js | ExplanationWrongB | (210 - 90) inspection hours x $50 per hour = $6,000. | 88% | Inspection rate = $60,000 / 1,200 hours = $50 per inspection hour. Product Y uses 210 hours and P... |
| P1-DD-059 | pack_d_corrected.js | ExplanationWrongC | $240,000 budgeted - (11,000 x $20) = $20,000 unfavorable. | 100% | Fixed OH rate = $240,000 / 12,000 DLH = $20 per DLH. Standard hours allowed = 5,500 units x 2 hrs... |
| P1-DD-060 | pack_d_corrected.js | ExplanationWrongD | (3,000 - 3,200) x $8.00 = -$1,600 = $1,600 unfavorable. | 100% | Standard hours allowed = 1,000 units x 3 hrs = 3,000 hrs. VOH efficiency variance = (SH - AH) x S... |
| P1-DD-066 | pack_d_corrected.js | ExplanationWrongB | ($5.00 - $4.90) x 10,000 lbs = $1,000 favorable. | 92% | MPV = (SP - AP) x AQ purchased = ($5.00 - $4.90) x 10,000 = $0.10 x 10,000 = $1,000 favorable. A ... |
| P1-DD-067 | pack_d_corrected.js | ExplanationWrongC | (3,200 - 3,400) x $3.00 = -$600 = $600 unfavorable. | 100% | Standard quantity allowed = 800 units x 4 lbs = 3,200 lbs. MQV = (SQ - AQ) x SP = (3,200 - 3,400)... |
| P1-DD-068 | pack_d_corrected.js | ExplanationWrongD | ($20.00 - $22.00) x 1,500 = -$3,000 = $3,000 unfavorable. | 100% | LRV = (SR - AR) x AH = ($20.00 - $22.00) x 1,500 = -$2.00 x 1,500 = -$3,000 = $3,000 unfavorable.... |
| P1-DD-069 | pack_d_corrected.js | ExplanationWrongA | (1,200 - 1,300) x $15 = -$1,500 = $1,500 unfavorable. | 100% | Standard hours allowed = 600 units x 2 hrs = 1,200 hrs. LEV = (SH - AH) x SR = (1,200 - 1,300) x ... |
| P1-DD-070 | pack_d_corrected.js | ExplanationWrongB | $18,500 actual - (2,000 DLH x $10.00) = -$1,500 = $1,500 favorable. | 96% | Variable overhead applied based on actual hours = 2,000 DLH x $10.00 = $20,000. VOH spending vari... |
| P1-E-064 | pack_a_corrected.js | ExplanationWrongB | because the applicable threshold is $500 and the $650 variance exceeds it. | 91% | The control policy requires investigation when the variance exceeds the greater of 3% of recorded... |

## Full Classification — Bucket 1B (111 items)

| QID | Pack | Field | Content | Arithmetic | Ellipsis | Keywords | Duplication(Sim/EC) | Fail |
|-----|------|-------|---------|-----------|----------|----------|---------------------|------|
| P1-A-039 | pack_a_corrected.js | ExplanationWrongA | because the depreciable base of $112,800 divided by 7 years equals $16,114. | ✗ | ✓ | ✓ | 73% | Arith |
| P1-A-040 | pack_a_corrected.js | ExplanationWrongA | because the indirect-method adjustments produce $145,600 of operating cash flow. | ✗ | ✓ | ✓ | 84% | Arith |
| P1-A-048 | pack_a_corrected.js | ExplanationWrongA | because goods available for sale of $275,600 less ending inventory of $52,950 equals $222,650. | ✗ | ✓ | ✓ | 49% | Arith; Dupe |
| P1-A-059 | pack_a_corrected.js | ExplanationWrongA | because the $176,800 depreciable base divided by 7 years equals $25,257. | ✗ | ✓ | ✓ | 77% | Arith |
| P1-A-068 | pack_a_corrected.js | ExplanationWrongA | because goods available for sale of $339,600 less ending inventory of $65,950 equals $273,650. | ✗ | ✓ | ✓ | 49% | Arith; Dupe |
| P1-AC-015 | pack_c_corrected.js | ExplanationWrongC | because significant influence at a 30% voting interest requires equity-method accounting. | ✗ | ✓ | ✗ | 94% | Arith; KW:requires |
| P1-AC-030 | pack_c_corrected.js | ExplanationWrongB | first 400 units from beginning inventory at $15 plus next 450 units from the first purchase at $18. | ✓ | ✓ | ✓ | 32% | Dupe |
| P1-B-022 | pack_a_corrected.js | ExplanationWrongA | because it adds the fixed component to the variable cost for 3,300 machine-hours. | ✗ | ✓ | ✓ | 87% | Arith |
| P1-B-031 | pack_a_corrected.js | ExplanationWrongA | because it includes the collectible portion of both current-month sales and prior-month receivables. | ✗ | ✓ | ✓ | 41% | Arith; Dupe |
| P1-B-033 | pack_a_corrected.js | ExplanationWrongD | because it is the probability-weighted average of the three demand outcomes. | ✗ | ✓ | ✓ | 39% | Arith; Dupe |
| P1-B-039 | pack_a_corrected.js | ExplanationWrongB | $180,000 from May sales plus $91,000 from April sales equals $271,000. | ✗ | ✓ | ✓ | 78% | Arith |
| P1-B-043 | pack_a_corrected.js | ExplanationWrongC | because it combines current-month collections and the collectible portion of prior-month receivab... | ✗ | ✓ | ✓ | 45% | Arith; Dupe |
| P1-B-045 | pack_a_corrected.js | ExplanationWrongA | because the three probability-weighted contributions total $90,325. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-B-046 | pack_a_corrected.js | ExplanationWrongA | because it includes both the fixed component and the variable cost for planned machine-hours. | ✗ | ✓ | ✓ | 69% | Arith |
| P1-B-055 | pack_a_corrected.js | ExplanationWrongD | because $93,030 current collections plus $132,120 prior collections equals $225,150. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-B-069 | pack_a_corrected.js | ExplanationWrongA | because the three probability-weighted contributions total $118,525. | ✗ | ✓ | ✓ | 82% | Arith |
| P1-B-070 | pack_a_corrected.js | ExplanationWrongD | because it adds the fixed cost to the variable cost for 5,700 machine-hours. | ✗ | ✓ | ✓ | 79% | Arith |
| P1-B-079 | pack_a_corrected.js | ExplanationWrongC | because $111,510 current collections plus $158,040 prior collections equals $269,550. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-B-081 | pack_a_corrected.js | ExplanationWrongA | because the probability-weighted average of the three scenarios is $132,625. | ✗ | ✓ | ✓ | 63% | Arith |
| P1-B-091 | pack_a_corrected.js | ExplanationWrongD | because $120,750 current collections plus $171,000 prior collections equals $291,750. | ✗ | ✓ | ✓ | 79% | Arith |
| P1-B-094 | pack_a_corrected.js | ExplanationWrongA | because it includes both the fixed component and the variable cost for planned machine-hours. | ✗ | ✓ | ✓ | 61% | Arith |
| P1-BC-001 | pack_c_corrected.js | ExplanationWrongA | because a flexible budget adjusts the budget to the actual 11,500-unit activity level. | ✗ | ✓ | ✓ | 89% | Arith |
| P1-BC-017 | pack_c_corrected.js | ExplanationWrongA | because the monthly add/drop process is the defining feature of a rolling forecast. | ✗ | ✓ | ✓ | 75% | Arith |
| P1-BD-027 | pack_d_corrected.js | ExplanationWrongC | because 16,000 budgeted labor hours at $18 per hour equals $288,000. | ✗ | ✓ | ✓ | 93% | Arith |
| P1-BD-080 | pack_d_corrected.js | ExplanationWrongD | the probability-weighted demand is 10,250 units. | ✗ | ✓ | ✓ | 49% | Arith; Dupe |
| P1-BD-081 | pack_d_corrected.js | ExplanationWrongA | cash before financing is $7,000, so $8,000 must be borrowed to reach the $15,000 minimum. | ✗ | ✓ | ✓ | 84% | Arith |
| P1-C-016 | pack_a_corrected.js | ExplanationWrongD | because the actual purchase price exceeded the standard price by $0.60 on 5,060 pounds. | ✓ | ✓ | ✗ | 83% | KW:standard |
| P1-C-017 | pack_a_corrected.js | ExplanationWrongB | because 130 excess pounds at the $6 standard price produces a $780 unfavorable variance. | ✓ | ✓ | ✗ | 84% | KW:standard |
| P1-C-019 | pack_a_corrected.js | ExplanationWrongC | because Titan used 64 fewer hours than allowed at a $24 standard rate. | ✗ | ✓ | ✗ | 76% | Arith; KW:standard |
| P1-C-023 | pack_a_corrected.js | ExplanationWrongA | because flexible-budget contribution exceeds static-budget contribution by $3,160. | ✗ | ✓ | ✓ | 91% | Arith |
| P1-C-028 | pack_a_corrected.js | ExplanationWrongD | because the actual price exceeded standard by $0.60 on 5,780 pounds. | ✓ | ✓ | ✗ | 81% | KW:standard |
| P1-C-029 | pack_a_corrected.js | ExplanationWrongC | because 190 excess pounds x $6 standard price equals $1,140 unfavorable. | ✓ | ✓ | ✗ | 80% | KW:standard |
| P1-C-031 | pack_a_corrected.js | ExplanationWrongC | because 76 fewer hours than standard x $24 equals $1,824 favorable. | ✓ | ✓ | ✗ | 95% | KW:standard |
| P1-C-040 | pack_a_corrected.js | ExplanationWrongB | because the $0.60 price overrun applies to 6,500 pounds purchased. | ✗ | ✓ | ✗ | 73% | Arith; KW:applies |
| P1-C-041 | pack_a_corrected.js | ExplanationWrongB | because 250 excess pounds at the $6 standard price equals $1,500 unfavorable. | ✓ | ✓ | ✗ | 88% | KW:standard |
| P1-C-042 | pack_a_corrected.js | ExplanationWrongA | because it applies the $1 unfavorable rate difference to 3,075 actual hours. | ✗ | ✓ | ✗ | 87% | Arith; KW:applies |
| P1-C-043 | pack_a_corrected.js | ExplanationWrongC | because actual hours were 88 below standard at a $24 standard rate. | ✗ | ✓ | ✗ | 73% | Arith; KW:standard |
| P1-C-045 | pack_a_corrected.js | ExplanationWrongA | because $340,000 divided by $1,850,000 equals 18.4% when rounded. | ✗ | ✓ | ✓ | 69% | Arith |
| P1-C-053 | pack_a_corrected.js | ExplanationWrongA | because 310 excess pounds x the $6 standard price equals $1,860 unfavorable. | ✓ | ✓ | ✗ | 91% | KW:standard |
| P1-C-059 | pack_a_corrected.js | ExplanationWrongA | because the flexible-budget contribution exceeds the static-budget contribution by $3,880. | ✗ | ✓ | ✓ | 72% | Arith |
| P1-C-065 | pack_a_corrected.js | ExplanationWrongC | because 370 excess pounds x $6 standard price equals $2,220 unfavorable. | ✓ | ✓ | ✗ | 95% | KW:standard |
| P1-C-066 | pack_a_corrected.js | ExplanationWrongA | because the $1 unfavorable rate difference is applied to 3,675 actual hours. | ✗ | ✓ | ✓ | 81% | Arith |
| P1-C-077 | pack_a_corrected.js | ExplanationWrongB | because 430 excess pounds x the $6 standard price equals $2,580 unfavorable. | ✓ | ✓ | ✗ | 92% | KW:standard |
| P1-C-079 | pack_a_corrected.js | ExplanationWrongA | because actual hours were 64 below standard, and 64 x $24 = $1,536 favorable. | ✓ | ✓ | ✗ | 88% | KW:standard |
| P1-C-089 | pack_a_corrected.js | ExplanationWrongB | because 490 excess pounds x the $6 standard price equals $2,940 unfavorable. | ✓ | ✓ | ✗ | 88% | KW:standard |
| P1-C-090 | pack_a_corrected.js | ExplanationWrongC | because the $1 unfavorable rate difference is applied to 4,275 actual hours. | ✗ | ✓ | ✓ | 76% | Arith |
| P1-CC-055 | pack_c_corrected.js | ExplanationWrongC | because the $1.50 shortfall applies to 14,000 actual units sold. | ✗ | ✓ | ✗ | 69% | Arith; KW:applies |
| P1-CD-021 | pack_d_corrected.js | ExplanationWrongA | the shift from Premium to lower-margin Standard reduced contribution by $18,000. | ✗ | ✓ | ✗ | 49% | Arith; KW:standard; Dupe |
| P1-D-001 | pack_a_corrected.js | ExplanationWrongA | Job order costing fits customized, make-to-order production where each job has unique cost charac... | ✗ | ✓ | ✓ | 85% | Arith |
| P1-D-009 | pack_a_corrected.js | ExplanationWrongA | The direct method is characterized by ignoring interservice-department services. | ✗ | ✓ | ✓ | 88% | Arith |
| P1-D-021 | pack_a_corrected.js | ExplanationWrongB | because the predetermined rate of about $7.03 per MH applied to 123 MH gives about $865. | ✗ | ✓ | ✓ | 85% | Arith |
| P1-D-024 | pack_a_corrected.js | ExplanationWrongA | because $258,000 divided by 12,400 equivalent units rounds to $20.81 per equivalent unit. | ✗ | ✓ | ✓ | 78% | Arith |
| P1-D-044 | pack_a_corrected.js | ExplanationWrongA | because $348,000 divided by 14,400 equivalent units rounds to $24.17. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-D-055 | pack_a_corrected.js | ExplanationWrongA | because Product A used 23 setups at about $390.32 per setup. | ✗ | ✓ | ✓ | 87% | Arith |
| P1-D-064 | pack_a_corrected.js | ExplanationWrongB | because $438,000 divided by 16,400 equivalent units rounds to $26.71. | ✗ | ✓ | ✓ | 77% | Arith |
| P1-D-068 | pack_a_corrected.js | ExplanationWrongB | ABC overhead ($80,000) is $160,000 less than traditional ($240,000). | ✗ | ✓ | ✓ | 75% | Arith |
| P1-D-074 | pack_a_corrected.js | ExplanationWrongB | because $483,000 divided by 17,400 equivalent units rounds to $27.76. | ✗ | ✓ | ✓ | 75% | Arith |
| P1-DC-021 | pack_c_corrected.js | ExplanationWrongA | because fixed manufacturing overhead is deducted after contribution margin in variable-costing re... | ✗ | ✓ | ✓ | 80% | Arith |
| P1-DC-070 | pack_c_corrected.js | ExplanationWrongB | because $304,000 divided by the $38 contribution margin equals 8,000 contracts. | ✗ | ✓ | ✓ | 60% | Arith |
| P1-DD-004 | pack_d_corrected.js | ExplanationWrongD | because the stem describes predetermined overhead application followed by actual-versus-applied r... | ✗ | ✓ | ✓ | 61% | Arith |
| P1-DD-008 | pack_d_corrected.js | ExplanationWrongD | because FIFO keeps beginning WIP costs separate when computing current-period cost per equivalent... | ✗ | ✓ | ✓ | 83% | Arith |
| P1-DD-010 | pack_d_corrected.js | ExplanationWrongB | because FIFO keeps beginning WIP costs separate from current-period costs in equivalent-unit cost... | ✗ | ✓ | ✓ | 84% | Arith |
| P1-DD-018 | pack_d_corrected.js | ExplanationWrongB | because step-down allocation is sequential and only partially recognizes reciprocal service relat... | ✗ | ✓ | ✓ | 85% | Arith |
| P1-DD-019 | pack_d_corrected.js | ExplanationWrongC | because the step-down method is sequential and only partially recognizes reciprocal services. | ✗ | ✓ | ✓ | 86% | Arith |
| P1-DD-020 | pack_d_corrected.js | ExplanationWrongD | because step-down allocation is sequential and recognizes only some reciprocal services. | ✗ | ✓ | ✓ | 85% | Arith |
| P1-DD-021 | pack_d_corrected.js | ExplanationWrongA | because the number of customer orders directly drives order-processing work. | ✗ | ✓ | ✓ | 76% | Arith |
| P1-DD-025 | pack_d_corrected.js | ExplanationWrongA | because customer orders processed match the cause of order-processing costs. | ✗ | ✓ | ✓ | 92% | Arith |
| P1-DD-026 | pack_d_corrected.js | ExplanationWrongB | because expected sales exceed break-even sales by $230,000. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-DD-031 | pack_d_corrected.js | ExplanationWrongC | because shifting toward fixed costs makes operating income more sensitive to sales-volume changes. | ✗ | ✓ | ✓ | 58% | Arith; Dupe |
| P1-DD-033 | pack_d_corrected.js | ExplanationWrongA | because higher fixed costs make profit more sensitive to sales-volume changes. | ✗ | ✓ | ✓ | 77% | Arith |
| P1-DD-052 | pack_d_corrected.js | ExplanationWrongD | because contribution margin format separates variable and fixed costs for CVP and short-term deci... | ✗ | ✓ | ✓ | 89% | Arith |
| P1-DD-053 | pack_d_corrected.js | ExplanationWrongA | because both variable manufacturing and variable selling/admin costs are deducted from sales. | ✗ | ✓ | ✓ | 40% | Arith; Dupe |
| P1-E-038 | pack_a_corrected.js | ExplanationWrongD | because system duplicate checks plus independent review address the duplicate-payment risk before... | ✗ | ✓ | ✓ | 71% | Arith |
| P1-E-039 | pack_a_corrected.js | ExplanationWrongC | because HR termination records should be reconciled promptly to payroll master-file changes. | ✗ | ✓ | ✓ | 73% | Arith |
| P1-E-042 | pack_a_corrected.js | ExplanationWrongD | because recurring exceptions require root-cause analysis, remediation, and monitoring. | ✗ | ✓ | ✓ | 82% | Arith |
| P1-E-069 | pack_a_corrected.js | ExplanationWrongB | because aggregate monitoring would detect repeated below-threshold purchases. | ✗ | ✓ | ✓ | 86% | Arith |
| P1-E-072 | pack_a_corrected.js | ExplanationWrongB | because the pattern requires root-cause investigation and remediation. | ✗ | ✓ | ✗ | 78% | Arith; KW:requires |
| P1-EC-008 | pack_c_corrected.js | ExplanationWrongD | because COSO is the five-component internal-control framework tested here. | ✗ | ✓ | ✓ | 88% | Arith |
| P1-EC-014 | pack_c_corrected.js | ExplanationWrongB | because pressure, opportunity, and rationalization are the three fraud-triangle elements. | ✗ | ✓ | ✓ | 81% | Arith |
| P1-EC-022 | pack_c_corrected.js | ExplanationWrongB | because system-imposed validation blocks duplicate payments before cash is disbursed, making it a... | ✗ | ✓ | ✓ | 90% | Arith |
| P1-ED-001 | pack_d_corrected.js | ExplanationWrongA | because the stem separates first-line operations, second-line risk/compliance, and third-line int... | ✗ | ✓ | ✓ | 81% | Arith |
| P1-ED-064 | pack_d_corrected.js | ExplanationWrongD | because vendor-master restrictions reduce fictitious vendor and unauthorized payment-detail changes. | ✗ | ✓ | ✓ | 86% | Arith |
| P1-F-002 | pack_a_corrected.js | ExplanationWrongB | because EPM supports planning, consolidation, reporting, and performance-management workflows. | ✗ | ✓ | ✓ | 88% | Arith |
| P1-F-003 | pack_a_corrected.js | ExplanationWrongD | because it describes end-to-end transaction traceability. | ✗ | ✓ | ✓ | 68% | Arith |
| P1-F-006 | pack_a_corrected.js | ExplanationWrongA | because it covers the major life-cycle stages and the need for controls throughout them. | ✗ | ✓ | ✓ | 67% | Arith |
| P1-F-018 | pack_a_corrected.js | ExplanationWrongB | because diagnostic analytics focuses on root-cause analysis. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-F-024 | pack_a_corrected.js | ExplanationWrongD | because it treats outliers as items for follow-up rather than automatic deletion. | ✗ | ✓ | ✓ | 75% | Arith |
| P1-F-025 | pack_a_corrected.js | ExplanationWrongD | because the support-contact sample may not represent all customers. | ✗ | ✓ | ✓ | 81% | Arith |
| P1-F-027 | pack_a_corrected.js | ExplanationWrongB | because it describes rule-based automation with exception handling. | ✗ | ✓ | ✓ | 68% | Arith |
| P1-F-029 | pack_a_corrected.js | ExplanationWrongA | because it distinguishes model-fitting data from validation data used to test performance. | ✗ | ✓ | ✓ | 77% | Arith |
| P1-F-030 | pack_a_corrected.js | ExplanationWrongB | because blockchain supports a shared, tamper-resistant ledger but does not validate every transac... | ✗ | ✓ | ✓ | 85% | Arith |
| P1-F-034 | pack_a_corrected.js | ExplanationWrongD | because it states the least-privilege principle. | ✗ | ✓ | ✗ | 78% | Arith; KW:principle |
| P1-F-042 | pack_a_corrected.js | ExplanationWrongB | because it identifies core API access-control activities. | ✗ | ✓ | ✗ | 72% | Arith; KW:activities |
| P1-F-053 | pack_a_corrected.js | ExplanationWrongA | because self-service BI needs governance over definitions, access, and data quality. | ✗ | ✓ | ✗ | 93% | Arith; KW:governance |
| P1-F-061 | pack_a_corrected.js | ExplanationWrongA | because SOC reports can provide assurance about relevant service-organization controls. | ✗ | ✓ | ✓ | 85% | Arith |
| P1-F-064 | pack_a_corrected.js | ExplanationWrongD | because role-based access grants permissions by job role rather than ad hoc individual requests. | ✗ | ✓ | ✓ | 87% | Arith |
| P1-F-069 | pack_a_corrected.js | ExplanationWrongB | because real-time analytics supports rapid monitoring when timely action matters. | ✗ | ✓ | ✓ | 92% | Arith |
| P1-F-071 | pack_a_corrected.js | ExplanationWrongB | because unstructured data analysis extracts insight from text, images, audio, or other non-tabula... | ✗ | ✓ | ✓ | 99% | Arith |
| P1-F-073 | pack_a_corrected.js | ExplanationWrongA | because OCR converts scanned or image-based documents into machine-readable text. | ✗ | ✓ | ✓ | 100% | Arith |
| P1-FC-011 | pack_c_corrected.js | ExplanationWrongC | because RPA automates structured, rules-based manual tasks. | ✗ | ✓ | ✓ | 82% | Arith |
| P1-FC-021 | pack_c_corrected.js | ExplanationWrongA | because dashboards should make relevant information understandable and decision-ready. | ✗ | ✓ | ✓ | 68% | Arith |
| P1-FC-043 | pack_c_corrected.js | ExplanationWrongC | because distributed, hard-to-alter records are a key blockchain characteristic. | ✗ | ✓ | ✓ | 81% | Arith |
| P1-FC-044 | pack_c_corrected.js | ExplanationWrongD | Blockchain's decentralized, distributed ledger with consensus-based validation creates tamper-res... | ✗ | ✓ | ✓ | 84% | Arith |
| P1-FC-046 | pack_c_corrected.js | ExplanationWrongB | because correctness, completeness, and cross-system consistency are data-quality dimensions. | ✗ | ✓ | ✓ | 89% | Arith |
| P1-FC-061 | pack_c_corrected.js | ExplanationWrongA | because integration improves consistency and real-time visibility across business functions. | ✗ | ✓ | ✓ | 85% | Arith |
| P1-FD-002 | pack_d_corrected.js | ExplanationWrongB | because APIs support automated, real-time data exchange between connected systems. | ✗ | ✓ | ✓ | 80% | Arith |
| P1-FD-007 | pack_d_corrected.js | ExplanationWrongC | because self-service BI gives users governed access to build reports and analyses. | ✗ | ✓ | ✓ | 81% | Arith |
| P1-FD-024 | pack_d_corrected.js | ExplanationWrongD | because the model learned training-data-specific noise rather than reusable patterns. | ✗ | ✓ | ✓ | 86% | Arith |
| P1-FD-033 | pack_d_corrected.js | ExplanationWrongA | because a documented breach-response plan supports timely containment, coordination, and required... | ✗ | ✓ | ✓ | 76% | Arith |
| P1-FD-058 | pack_d_corrected.js | ExplanationWrongB | because NLP/intelligent document processing extracts useful fields from scanned invoice documents. | ✗ | ✓ | ✓ | 82% | Arith |
| P1-FD-071 | pack_d_corrected.js | ExplanationWrongC | because retention rules balance compliance obligations with data-storage risk and cost. | ✗ | ✓ | ✓ | 79% | Arith |

