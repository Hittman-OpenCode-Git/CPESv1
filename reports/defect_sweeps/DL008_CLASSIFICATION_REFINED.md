# DL-008 Refined Classification Report

**Date:** 2026-07-22
**Third-pass exclusions:** Formula-statement, Variance-narrative

## Summary

| Bucket | Definition | Count | Action |
|--------|-----------|-------|--------|
| Refined 1A | Passes all criteria + two exclusions | 91 | Sweep-clear |
| 1B (total) | Fails any criterion or exclusion | 216 | Editorial queue |

*Note: 1B total = 112 (second-pass failures) + 60 (formula-statement) + 44 (variance-narrative)*

### Third-Pass Exclusion Breakdown

| Exclusion | Moved from 1A to 1B |
|-----------|---------------------|
| Formula-statement | 60 |
| Variance-narrative | 44 |

## Refined Bucket 1A Samples (91 total)

| QID | Pack | Field | Content | Containment |
|-----|------|-------|---------|-------------|
| P1-A-003 | pack_a_corrected.js | ExplanationWrongC | $172,000 + $53,000 - $14,000 - $10,000 = $201,000. | 100% |
| P1-A-067 | pack_a_corrected.js | ExplanationWrongB | because 676 shipped units x $45 = $30,420. | 90% |
| P1-BD-026 | pack_d_corrected.js | ExplanationWrongB | because 8,000 units x 2 hours x $18 per hour equals $288,000. | 76% |
| P1-D-007 | pack_a_corrected.js | ExplanationWrongC | 700 moves x ($90,000 / 4,500) = 700 x $20 = $14,000. | 88% |
| P1-D-054 | pack_a_corrected.js | ExplanationWrongC | because $393,000 / 15,400 rounds to $25.52 per equivalent unit. | 89% |

## Formula-Statement Exclusions (60 items)

| QID | Pack | Field | Content | Containment |
|-----|------|-------|---------|-------------|
| P1-A-031 | pack_a_corrected.js | ExplanationWrongD | Ending retained earnings = $195,000 + $80,400 - $20,700 = $254,700. | 100% |
| P1-A-032 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $72,000 + $90,300 + $122,600 = $284,900. Accounts payable a... | 98% |
| P1-A-035 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = ($210,000 - $18,000) / 67,000 = $2.87, correctly subtracting preferred dividends and using weighted-avera... | 80% |
| P1-A-041 | pack_a_corrected.js | ExplanationWrongA | Ending retained earnings = $220,000 + $94,400 - $25,200 = $289,200. | 100% |
| P1-A-042 | pack_a_corrected.js | ExplanationWrongA | Current assets = Cash + Accounts receivable + Inventory = $82,000 + $99,300 + $130,600 = $311,900. Accounts payable a... | 98% |
| P1-A-045 | pack_a_corrected.js | ExplanationWrongC | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($240,000 - $21,000) / 78,000 = $21... | 98% |
| P1-A-051 | pack_a_corrected.js | ExplanationWrongC | Ending retained earnings = $245,000 + $108,400 - $29,700 = $323,700. | 100% |
| P1-A-052 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $92,000 + $108,300 + $138,600 = $338,900. Accounts payable ... | 98% |
| P1-A-055 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($270,000 - $24,000) / 89,000 = $24... | 98% |
| P1-A-061 | pack_a_corrected.js | ExplanationWrongD | Ending retained earnings = $270,000 + $122,400 - $34,200 = $358,200. | 100% |
| P1-A-062 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $102,000 + $117,300 + $146,600 = $365,900. Accounts payable... | 98% |
| P1-A-065 | pack_a_corrected.js | ExplanationWrongA | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($300,000 - $27,000) / 100,000 = $2... | 98% |
| P1-A-071 | pack_a_corrected.js | ExplanationWrongB | Ending retained earnings = $295,000 + $136,400 - $38,700 = $392,700. | 100% |
| P1-A-072 | pack_a_corrected.js | ExplanationWrongB | Current assets = Cash + Accounts receivable + Inventory = $112,000 + $126,300 + $154,600 = $392,900. Accounts payable... | 98% |
| P1-A-075 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($330,000 - $30,000) / 111,000 = $3... | 98% |
| P1-B-017 | pack_a_corrected.js | ExplanationWrongC | Production = 12,130 + 2,924 - 2,420 = 12,634 units, correctly applying the production budget formula. | 70% |
| P1-B-018 | pack_a_corrected.js | ExplanationWrongA | Purchases = Production needs (45,800 lbs) + Desired ending inventory (4,820 lbs) - Beginning inventory (2,520 lbs) = ... | 94% |
| P1-B-024 | pack_a_corrected.js | ExplanationWrongA | Ending cash before financing = $32,800 + $94,200 - $101,800 = $25,200. The minimum balance is $25,000. Since $25,200 ... | 97% |
| P1-B-030 | pack_a_corrected.js | ExplanationWrongB | Purchases = Production needs (50,600 lbs) + Desired ending inventory (5,240 lbs) - Beginning inventory (2,640 lbs) = ... | 94% |
| P1-B-036 | pack_a_corrected.js | ExplanationWrongA | Ending cash before financing = $34,000 + $105,000 - $112,000 = $27,000. The minimum balance is $25,000. Since $27,000... | 97% |
| P1-B-048 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $35,200 + $115,800 - $122,200 = $28,800. The minimum balance is $25,000. Since $28,800... | 97% |
| P1-B-053 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (16,810) + Desired ending inventory (3,788) - Beginning inventory (3,140) = 17,458 units. | 98% |
| P1-B-060 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $36,400 + $126,600 - $132,400 = $30,600. The minimum balance is $25,000. Since $30,600... | 97% |
| P1-B-061 | pack_a_corrected.js | ExplanationWrongC | Production = 20,000 + 3,000 - 2,000 = 21,000 units. | 100% |
| P1-B-065 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (18,370) + Desired ending inventory (4,076) - Beginning inventory (3,380) = 19,066 units. | 95% |
| P1-B-066 | pack_a_corrected.js | ExplanationWrongC | Purchases = Production needs (65,000 lbs) + Desired ending inventory (6,500 lbs) - Beginning inventory (3,000 lbs) = ... | 94% |
| P1-B-072 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $37,600 + $137,400 - $142,600 = $32,400. The minimum balance is $25,000. Since $32,400... | 97% |
| P1-B-077 | pack_a_corrected.js | ExplanationWrongC | Production = Sales (19,930) + Desired ending inventory (4,364) - Beginning inventory (3,620) = 20,674 units. | 95% |
| P1-B-078 | pack_a_corrected.js | ExplanationWrongD | Purchases = Production needs (69,800 lbs) + Desired ending inventory (6,920 lbs) - Beginning inventory (3,120 lbs) = ... | 94% |
| P1-B-084 | pack_a_corrected.js | ExplanationWrongC | Ending cash before financing = $38,800 + $148,200 - $152,800 = $34,200. The minimum balance is $25,000. Since $34,200... | 97% |
| P1-B-089 | pack_a_corrected.js | ExplanationWrongC | Production = Sales (21,490) + Desired ending inventory (4,652) - Beginning inventory (3,860) = 22,282 units. | 96% |
| P1-B-090 | pack_a_corrected.js | ExplanationWrongC | Purchases = Production needs (74,600 lbs) + Desired ending inventory (7,340 lbs) - Beginning inventory (3,240 lbs) = ... | 94% |
| P1-B-096 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $40,000 + $159,000 - $163,000 = $36,000. The minimum balance is $25,000. Since $36,000... | 97% |
| P1-B-098 | pack_a_corrected.js | ExplanationWrongB | March disbursements = 60% x March purchases ($95,000) + 40% x February purchases ($80,000) = $57,000 + $32,000 = $89,... | 94% |
| P1-BC-041 | pack_c_corrected.js | ExplanationWrongA | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 98% |
| P1-BC-042 | pack_c_corrected.js | ExplanationWrongB | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 89% |
| P1-BC-043 | pack_c_corrected.js | ExplanationWrongC | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 93% |
| P1-BC-044 | pack_c_corrected.js | ExplanationWrongD | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 86% |
| P1-BC-045 | pack_c_corrected.js | ExplanationWrongA | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 90% |
| P1-BC-046 | pack_c_corrected.js | ExplanationWrongB | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Beginning inventory (3,000) = 42,0... | 88% |
| P1-BD-022 | pack_d_corrected.js | ExplanationWrongB | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate per hour = 8,000 × 2 ×... | 97% |
| P1-BD-023 | pack_d_corrected.js | ExplanationWrongC | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate per hour = 8,000 × 2 ×... | 97% |
| P1-BD-024 | pack_d_corrected.js | ExplanationWrongD | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate per hour = 8,000 × 2 ×... | 97% |
| P1-BD-025 | pack_d_corrected.js | ExplanationWrongA | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate per hour = 8,000 × 2 ×... | 97% |
| P1-BD-028 | pack_d_corrected.js | ExplanationWrongD | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Labor rate per hour = 8,000 × 2 ×... | 97% |
| P1-BD-050 | pack_d_corrected.js | ExplanationWrongB | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning inventory (3,000) = ... | 100% |
| P1-BD-051 | pack_d_corrected.js | ExplanationWrongC | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning inventory (3,000) = ... | 100% |
| P1-BD-055 | pack_d_corrected.js | ExplanationWrongC | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning inventory (3,000) = ... | 100% |
| P1-BD-056 | pack_d_corrected.js | ExplanationWrongD | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - Beginning inventory (3,000) = ... | 100% |
| P1-BD-089 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) = $120,000 + $60,000 ... | 100% |
| P1-BD-090 | pack_d_corrected.js | ExplanationWrongB | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) = $120,000 + $60,000 ... | 100% |
| P1-BD-091 | pack_d_corrected.js | ExplanationWrongC | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) = $120,000 + $60,000 ... | 100% |
| P1-BD-092 | pack_d_corrected.js | ExplanationWrongD | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) = $120,000 + $60,000 ... | 100% |
| P1-BD-093 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $150,000) = $120,000 + $60,000 ... | 100% |
| P1-CC-015 | pack_c_corrected.js | ExplanationWrongC | RI = $450,000 - $300,000 = $150,000 means the division earned $150,000 above its required return. | 92% |
| P1-CC-016 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,000 - (10% x $3,000,... | 100% |
| P1-CC-017 | pack_c_corrected.js | ExplanationWrongA | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,000 - (10% x $3,000,... | 100% |
| P1-CC-018 | pack_c_corrected.js | ExplanationWrongB | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,000 - (10% x $3,000,... | 100% |
| P1-CC-019 | pack_c_corrected.js | ExplanationWrongC | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,000 - (10% x $3,000,... | 100% |
| P1-CC-020 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating assets) = $450,000 - (10% x $3,000,... | 100% |

## Variance-Narrative Exclusions (44 items)

| QID | Pack | Field | Content | Containment |
|-----|------|-------|---------|-------------|
| P1-AC-026 | pack_c_corrected.js | ExplanationWrongB | ($340,000 - $40,000) / 100,000 = $3.00. | 100% |
| P1-AC-027 | pack_c_corrected.js | ExplanationWrongC | 120,000 + (36,000 x 8/12) - (12,000 x 2/12) = 142,000. | 84% |
| P1-AC-028 | pack_c_corrected.js | ExplanationWrongD | $620,000 + $48,000 - $61,000 = $607,000. | 100% |
| P1-AC-029 | pack_c_corrected.js | ExplanationWrongA | $430,000 + $22,000 + $14,000 = $466,000. | 100% |
| P1-BC-068 | pack_c_corrected.js | ExplanationWrongD | because the $15,000 cost change divided by the 3,000-hour activity change equals $5.00 per hour. | 76% |
| P1-BC-069 | pack_c_corrected.js | ExplanationWrongA | because the high-low variable cost rate is $15,000 divided by 3,000 machine hours, or $5.00 per hour. | 83% |
| P1-C-018 | pack_a_corrected.js | ExplanationWrongD | because 2,475 actual hours x $1 excess rate equals $2,475 unfavorable. | 82% |
| P1-C-030 | pack_a_corrected.js | ExplanationWrongC | because 2,775 actual hours x the $1 rate overrun = $2,775 unfavorable. | 85% |
| P1-C-052 | pack_a_corrected.js | ExplanationWrongC | because 7,220 pounds x $0.60 excess price equals $4,332 unfavorable. | 84% |
| P1-C-054 | pack_a_corrected.js | ExplanationWrongC | because the $1 excess rate applied to 3,375 actual hours gives $3,375 unfavorable. | 76% |
| P1-C-055 | pack_a_corrected.js | ExplanationWrongA | because 70 fewer hours than allowed x $24 equals $1,680 favorable. | 81% |
| P1-C-064 | pack_a_corrected.js | ExplanationWrongB | because 7,940 pounds x $0.60 excess price equals $4,764 unfavorable. | 84% |
| P1-C-067 | pack_a_corrected.js | ExplanationWrongD | because 82 fewer hours than allowed x $24 equals $1,968 favorable. | 87% |
| P1-C-068 | pack_a_corrected.js | ExplanationWrongC | because $114,500 - $106,260 = $8,240 unfavorable. | 79% |
| P1-C-076 | pack_a_corrected.js | ExplanationWrongC | because 8,660 pounds x $0.60 excess price equals $5,196 unfavorable. | 84% |
| P1-C-078 | pack_a_corrected.js | ExplanationWrongB | because 3,975 actual hours x the $1 excess actual rate = $3,975 unfavorable. | 88% |
| P1-C-083 | pack_a_corrected.js | ExplanationWrongB | because $88,360 - $84,000 = $4,360 favorable. | 76% |
| P1-C-088 | pack_a_corrected.js | ExplanationWrongC | because 9,380 pounds x $0.60 excess price equals $5,628 unfavorable. | 88% |
| P1-C-091 | pack_a_corrected.js | ExplanationWrongD | because 76 fewer hours than allowed x $24 equals $1,824 favorable. | 84% |
| P1-C-092 | pack_a_corrected.js | ExplanationWrongC | because $126,500 - $116,340 = $10,160 unfavorable. | 78% |
| P1-C-100 | pack_a_corrected.js | ExplanationWrongD | because 10,100 pounds x $0.60 excess price equals $6,060 unfavorable. | 91% |
| P1-CC-021 | pack_c_corrected.js | ExplanationWrongA | because 450,000 - (10% x 3,000,000) equals 150,000. | 70% |
| P1-CC-054 | pack_c_corrected.js | ExplanationWrongB | because the actual selling price exceeded budget by $3 on 6,200 units. | 81% |
| P1-CC-059 | pack_c_corrected.js | ExplanationWrongC | (50,000 - 46,000) x $6 = $24,000 unfavorable. | 97% |
| P1-CC-060 | pack_c_corrected.js | ExplanationWrongD | (66,000 - 60,000) x $8 = $48,000 favorable. | 82% |
| P1-CC-061 | pack_c_corrected.js | ExplanationWrongA | (90,000 - 84,000) x $8 = $48,000 unfavorable. | 77% |
| P1-CC-062 | pack_c_corrected.js | ExplanationWrongB | (50,000 - 45,000) x $8 = $40,000 favorable. | 81% |
| P1-CD-001 | pack_d_corrected.js | ExplanationWrongA | The labor rate variance is 2,100 × ($19 - $18) = $2,100 Unfavorable. | 98% |
| P1-DC-011 | pack_c_corrected.js | ExplanationWrongC | $96,000 / 240 = $400 per setup; 18 setups x $400 = $7,200. | 95% |
| P1-DC-012 | pack_c_corrected.js | ExplanationWrongD | 50,000 / 100,000 x $150,000 = $75,000. | 100% |
| P1-DC-013 | pack_c_corrected.js | ExplanationWrongA | ($250,000 / $400,000) x $200,000 = $125,000. | 88% |
| P1-DC-014 | pack_c_corrected.js | ExplanationWrongB | ($120,000 / 20,000 MH) x 12,000 MH = $6 x 12,000 = $72,000. | 89% |
| P1-DC-015 | pack_c_corrected.js | ExplanationWrongC | $75,000 / 3,000 = $25 per ticket; 420 tickets x $25 = $10,500. | 95% |
| P1-DC-025 | pack_c_corrected.js | ExplanationWrongA | because selling 3,000 more units than produced releases $15,000 of fixed overhead from inventory under absorption cos... | 89% |
| P1-DC-066 | pack_c_corrected.js | ExplanationWrongB | because $252,000 / ($84 - $56) = 9,000 units. | 71% |
| P1-DC-067 | pack_c_corrected.js | ExplanationWrongC | because ($384,000 + $96,000) / $48 = 10,000 units. | 85% |
| P1-DC-068 | pack_c_corrected.js | ExplanationWrongD | because $240,000 / 40% = $600,000 of sales. | 100% |
| P1-DD-059 | pack_d_corrected.js | ExplanationWrongC | $240,000 budgeted - (11,000 x $20) = $20,000 unfavorable. | 100% |
| P1-DD-060 | pack_d_corrected.js | ExplanationWrongD | (3,000 - 3,200) x $8.00 = -$1,600 = $1,600 unfavorable. | 100% |
| P1-DD-066 | pack_d_corrected.js | ExplanationWrongB | ($5.00 - $4.90) x 10,000 lbs = $1,000 favorable. | 92% |
| P1-DD-067 | pack_d_corrected.js | ExplanationWrongC | (3,200 - 3,400) x $3.00 = -$600 = $600 unfavorable. | 100% |
| P1-DD-068 | pack_d_corrected.js | ExplanationWrongD | ($20.00 - $22.00) x 1,500 = -$3,000 = $3,000 unfavorable. | 100% |
| P1-DD-069 | pack_d_corrected.js | ExplanationWrongA | (1,200 - 1,300) x $15 = -$1,500 = $1,500 unfavorable. | 100% |
| P1-DD-070 | pack_d_corrected.js | ExplanationWrongB | $18,500 actual - (2,000 DLH x $10.00) = -$1,500 = $1,500 favorable. | 96% |

## Full Refined Bucket 1A Listing (91 items)

| QID | Pack | Field | Content | EC Containment | EC Content |
|-----|------|-------|---------|---------------|------------|
| P1-A-003 | pack_a_corrected.js | ExplanationWrongC | $172,000 + $53,000 - $14,000 - $10,000 = $201,000. | 100% | CFO = net income + depreciation - gain on sale - increase in AR = $172,000 + $53,000 - $14,000 - ... |
| P1-A-010 | pack_a_corrected.js | ExplanationWrongB | ($96,000 - $12,000) / 7 x 6/12 = $6,000. | 93% | Depreciable base = $96,000 - $12,000 = $84,000. Annual straight-line expense = $84,000 / 7 = $12,... |
| P1-A-026 | pack_a_corrected.js | ExplanationWrongD | because $324,300 assets - $127,100 liabilities = $197,200 equity. | 92% | Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Bea... |
| P1-A-027 | pack_a_corrected.js | ExplanationWrongC | because 396 shipped units x $55 = $21,780. | 90% | Under accrual revenue recognition, revenue is recognized when control transfers. Control transfer... |
| P1-A-028 | pack_a_corrected.js | ExplanationWrongD | because $44,700 + $166,900 - $39,950 = $171,650. | 100% | Cost of goods sold = beginning inventory + purchases - ending inventory. Delta has $44,700 beginn... |
| P1-A-030 | pack_a_corrected.js | ExplanationWrongB | because $103,500 + $23,000 - $7,000 + $5,300 = $124,800. | 92% | Under the indirect method, start with net income, add back noncash depreciation, subtract increas... |
| P1-A-033 | pack_a_corrected.js | ExplanationWrongB | because $244,000 - $10,600 - $4,300 = $229,100. | 81% | Net sales reports sales after contra-revenue deductions. Net sales = gross sales - sales returns ... |
| P1-A-036 | pack_a_corrected.js | ExplanationWrongD | because $367,300 assets - $148,100 liabilities = $219,200 equity. | 91% | Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Lum... |
| P1-A-037 | pack_a_corrected.js | ExplanationWrongD | because 466 shipped units x $45 = $20,970. | 100% | Revenue is recognized when control transfers. Because control transfers on shipment, recognize re... |
| P1-A-038 | pack_a_corrected.js | ExplanationWrongC | because $53,700 + $189,900 - $46,450 = $197,150. | 100% | Cost of goods sold = beginning inventory + purchases - ending inventory. Northstar has $53,700 be... |
| P1-A-046 | pack_a_corrected.js | ExplanationWrongC | because $410,300 - $169,100 = $241,200. | 84% | Equity is the residual interest after liabilities are deducted from assets. Vantage reports asset... |
| P1-A-047 | pack_a_corrected.js | ExplanationWrongD | because 536 shipped units x $65 = $34,840. | 90% | Revenue recognition follows transfer of control. Since control transfers on shipment, recognize r... |
| P1-A-049 | pack_a_corrected.js | ExplanationWrongA | because ($156,800 - $12,000) / 5 = $28,960. | 71% | Straight-line depreciation uses depreciable cost, not full acquisition cost. Zephyr's depreciable... |
| P1-A-050 | pack_a_corrected.js | ExplanationWrongB | because $137,500 + $31,000 - $9,000 + $6,900 = $166,400. | 92% | Under the indirect method, depreciation is added back, an increase in accounts receivable is subt... |
| P1-A-056 | pack_a_corrected.js | ExplanationWrongD | because $453,300 assets - $190,100 liabilities = $263,200 equity. | 89% | The accounting equation is assets = liabilities + equity, so equity = assets - liabilities. Grani... |
| P1-A-057 | pack_a_corrected.js | ExplanationWrongC | because 606 shipped units x $55 = $33,330. | 100% | Revenue is recognized when control transfers to the customer. Because control transfers on shipme... |
| P1-A-058 | pack_a_corrected.js | ExplanationWrongB | because $71,700 + $235,900 - $59,450 = $248,150. | 100% | Cost of goods sold = beginning inventory + purchases - ending inventory. Iris has $71,700 beginni... |
| P1-A-066 | pack_a_corrected.js | ExplanationWrongC | because $496,300 assets - $211,100 liabilities = $285,200 equity. | 91% | Use the accounting equation: assets = liabilities + equity, so equity = assets - liabilities. Qua... |
| P1-A-067 | pack_a_corrected.js | ExplanationWrongB | because 676 shipped units x $45 = $30,420. | 90% | Revenue is recognized for units shipped when control transfers on shipment. Riverview shipped 676... |
| P1-A-069 | pack_a_corrected.js | ExplanationWrongC | because ($220,800 - $12,000) / 5 = $41,760. | 79% | Straight-line depreciation equals depreciable cost divided by useful life. Titan's depreciable co... |
| P1-A-070 | pack_a_corrected.js | ExplanationWrongC | because $171,500 + $39,000 - $11,000 + $8,500 = $208,000. | 91% | The indirect method reconciles net income to operating cash flow by adding noncash depreciation, ... |
| P1-A-073 | pack_a_corrected.js | ExplanationWrongD | because $464,000 - $18,600 - $8,300 = $437,100. | 82% | Net sales = gross sales - sales returns - sales allowances. Yukon reported $464,000 gross sales, ... |
| P1-AD-056 | pack_d_corrected.js | ExplanationWrongD | ($54,000 - $6,000) / 8 x 9/12 = $4,500. | 94% | Depreciable base = $54,000 - $6,000 = $48,000. Annual depreciation = $48,000 / 8 = $6,000. Partia... |
| P1-B-019 | pack_a_corrected.js | ExplanationWrongA | because it adds current-month collections of $65,310 and prior-month collections of $93,240. | 89% | Cash collections include the portion collected from current-month sales plus collections of prior... |
| P1-B-023 | pack_a_corrected.js | ExplanationWrongD | With a 85% cumulative average-time learning curve, the cumulative average time after one doubling... | 100% | With a 85% cumulative average-time learning curve, the cumulative average time per batch decrease... |
| P1-B-034 | pack_a_corrected.js | ExplanationWrongD | because it adds $77,200 fixed cost to $58,500 variable cost. | 84% | Use the regression equation as written: total forecast cost = fixed cost + variable cost per mach... |
| P1-B-056 | pack_a_corrected.js | ExplanationWrongC | because $62,000 fixed cost plus $116,800 variable cost equals $178,800. | 75% | For a flexible budget, variable support cost changes with actual output while fixed support cost ... |
| P1-B-058 | pack_a_corrected.js | ExplanationWrongC | because it adds $86,800 fixed cost and $71,400 variable cost. | 71% | Apply the regression equation directly: total forecast cost = fixed cost + variable rate x machin... |
| P1-B-059 | pack_a_corrected.js | ExplanationWrongC | 12,000 + (35 x 420) = 26,700 units. | 100% | Use the regression equation by adding the fixed intercept to the driver-based portion of the fore... |
| P1-B-067 | pack_a_corrected.js | ExplanationWrongA | because current collections of $102,270 plus prior-month collections of $145,080 equal $247,350. | 84% | Cash collections are based on when sales are collected. Riverview collects 35% of current-month s... |
| P1-B-068 | pack_a_corrected.js | ExplanationWrongC | because $66,800 fixed cost plus $156,800 variable cost equals $223,600. | 80% | A flexible budget uses actual output for variable costs and total fixed cost unchanged. Summit's ... |
| P1-B-074 | pack_a_corrected.js | ExplanationWrongB | 18,000 + 4,000 - 3,000 = 19,000 units. | 100% | Required production = budgeted sales + desired ending inventory - beginning inventory. Desired Ju... |
| P1-B-080 | pack_a_corrected.js | ExplanationWrongD | because $71,600 fixed cost plus $201,120 variable cost equals $272,720. | 76% | A flexible budget keeps fixed cost unchanged in total and flexes variable cost to actual output. ... |
| P1-B-082 | pack_a_corrected.js | ExplanationWrongD | because it adds $96,400 fixed cost and $81,900 variable cost. | 73% | Use total cost = fixed cost + variable cost per machine-hour x planned machine-hours. $96,400 + (... |
| P1-B-083 | pack_a_corrected.js | ExplanationWrongC | because 20 units x 45 average hours x $30 per hour equals $27,000. | 78% | With a 90% cumulative average-time learning curve, one doubling from 10 units to 20 units reduces... |
| P1-B-092 | pack_a_corrected.js | ExplanationWrongD | because $76,400 fixed cost plus $160,560 variable cost equals $236,960. | 91% | Flexible budget support cost equals total fixed cost plus variable cost at actual output. Rivervi... |
| P1-BD-026 | pack_d_corrected.js | ExplanationWrongB | because 8,000 units x 2 hours x $18 per hour equals $288,000. | 76% | The direct labor budget converts planned production into labor hours and then into dollars. Ashfi... |
| P1-BD-054 | pack_d_corrected.js | ExplanationWrongB | because 25,000 + 4,000 - 3,000 equals 26,000 pounds. | 84% | A materials purchases budget adjusts production needs for inventory targets: purchases = material... |
| P1-BD-078 | pack_d_corrected.js | ExplanationWrongB | 36,000 + 4,500 - 3,200 = 37,300 pounds. | 100% | Materials purchases = materials needed for production + desired ending materials inventory - begi... |
| P1-BD-079 | pack_d_corrected.js | ExplanationWrongC | $42,000 + ($6 x 8,500) = $93,000. | 100% | Flexible budget cost at actual activity = fixed cost + variable cost = $42,000 + ($6 x 8,500) = $... |
| P1-C-021 | pack_a_corrected.js | ExplanationWrongB | because $268,000 / $1,370,000 rounds to 19.6%. | 74% | ROI is operating income divided by average operating assets. Vantage's ROI is $268,000 / $1,370,0... |
| P1-C-022 | pack_a_corrected.js | ExplanationWrongC | because residual income is $324,500 - $237,000 = $87,500 positive. | 94% | Residual income equals operating income minus the required return on invested assets. The capital... |
| P1-C-033 | pack_a_corrected.js | ExplanationWrongC | because $304,000 / $1,610,000 rounds to 18.9%. | 87% | ROI measures operating income as a percentage of average operating assets. Iris reports $304,000 ... |
| P1-C-034 | pack_a_corrected.js | ExplanationWrongB | because $366,500 - (12% x $2,275,000) = $93,500 positive. | 81% | Residual income equals operating income less the required return on average operating assets. The... |
| P1-C-046 | pack_a_corrected.js | ExplanationWrongC | because $408,500 - (12% x $2,575,000) = $99,500 positive. | 85% | Residual income = operating income - (required return x average operating assets). The investment... |
| P1-C-057 | pack_a_corrected.js | ExplanationWrongB | because $376,000 / $2,090,000 rounds to 18.0%. | 76% | ROI = operating income / average operating assets. Harbor reports $376,000 of operating income an... |
| P1-C-058 | pack_a_corrected.js | ExplanationWrongC | because $450,500 - $345,000 = $105,500 positive. | 86% | Residual income = operating income - required return on average operating assets. The required-re... |
| P1-C-069 | pack_a_corrected.js | ExplanationWrongA | because $412,000 / $2,330,000 rounds to 17.7%. | 87% | ROI = operating income / average operating assets. Titan reports $412,000 of operating income and... |
| P1-C-070 | pack_a_corrected.js | ExplanationWrongB | because residual income is $492,500 - $381,000 = $111,500 positive. | 90% | Residual income = operating income - (required return x average operating assets). The investment... |
| P1-C-081 | pack_a_corrected.js | ExplanationWrongA | because $448,000 / $2,570,000 rounds to 17.4%. | 90% | ROI = operating income / average operating assets. Granite reports $448,000 of operating income a... |
| P1-C-082 | pack_a_corrected.js | ExplanationWrongA | because $534,500 - (12% x $3,475,000) = $117,500 positive. | 84% | Residual income = operating income - (required return x average operating assets). The investment... |
| P1-C-093 | pack_a_corrected.js | ExplanationWrongB | because $484,000 / $2,810,000 rounds to 17.2%. | 82% | ROI = operating income / average operating assets. Summit reports $484,000 of operating income an... |
| P1-C-094 | pack_a_corrected.js | ExplanationWrongD | because $576,500 - $453,000 = $123,500 positive. | 89% | Residual income = operating income - required return on average operating assets. Titan's require... |
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
| P1-DD-023 | pack_d_corrected.js | ExplanationWrongC | $144,000 / 1,800 = $80 per order; 260 orders x $80 = $20,800. | 95% | Order-processing rate = $144,000 / 1,800 orders = $80 per order. Product Line R generated 260 ord... |
| P1-DD-027 | pack_d_corrected.js | ExplanationWrongC | because 24,000 budgeted units minus 18,500 break-even units equals 5,500 units. | 86% | Margin of safety in units equals expected unit sales minus break-even unit sales. Bellcourt's mar... |
| P1-DD-029 | pack_d_corrected.js | ExplanationWrongA | because $500,000 - $350,000 = $150,000. | 74% | Margin of safety in dollars = budgeted sales - break-even sales. Dellwood has $500,000 budgeted s... |
| P1-DD-030 | pack_d_corrected.js | ExplanationWrongB | because the $375,000 safety margin is 30.0% of expected sales. | 66% | Margin of safety is $1,250,000 - $875,000 = $375,000. The margin of safety ratio is $375,000 / $1... |
| P1-DD-034 | pack_d_corrected.js | ExplanationWrongB | because 4.0 x 6% = 24%. | 77% | Degree of operating leverage estimates the percentage change in operating income for a percentage... |
| P1-DD-056 | pack_d_corrected.js | ExplanationWrongD | (170 x $600) + (1,100 x $50) = $102,000 + $55,000 = $157,000. | 100% | Setup rate = $120,000 / 200 = $600 per setup. Inspection rate = $80,000 / 1,600 = $50 per hour. P... |
| P1-DD-057 | pack_d_corrected.js | ExplanationWrongA | $8,000 of machining cost plus $7,200 of setup cost = $15,200. | 80% | Machining rate = $120,000 / 6,000 = $20 per machine hour, so Product M receives 400 x $20 = $8,00... |
| P1-DD-058 | pack_d_corrected.js | ExplanationWrongB | (210 - 90) inspection hours x $50 per hour = $6,000. | 88% | Inspection rate = $60,000 / 1,200 hours = $50 per inspection hour. Product Y uses 210 hours and P... |
| P1-E-064 | pack_a_corrected.js | ExplanationWrongB | because the applicable threshold is $500 and the $650 variance exceeds it. | 91% | The control policy requires investigation when the variance exceeds the greater of 3% of recorded... |

## Full 1B Listing (216 items)

| QID | Pack | Field | Content | Exclusion Stage | Reason |
|-----|------|-------|---------|-----------------|--------|
| P1-A-029 | pack_a_corrected.js | ExplanationWrongB | $18,560 results from dividing the full cost ($92,800) by 5 without subtracting salvage ... | Second-pass | Failed second-pass criteria |
| P1-A-039 | pack_a_corrected.js | ExplanationWrongA | because the depreciable base of $112,800 divided by 7 years equals $16,114. | Second-pass | Failed second-pass criteria |
| P1-A-040 | pack_a_corrected.js | ExplanationWrongA | because the indirect-method adjustments produce $145,600 of operating cash flow. | Second-pass | Failed second-pass criteria |
| P1-A-048 | pack_a_corrected.js | ExplanationWrongA | because goods available for sale of $275,600 less ending inventory of $52,950 equals $2... | Second-pass | Failed second-pass criteria |
| P1-A-059 | pack_a_corrected.js | ExplanationWrongA | because the $176,800 depreciable base divided by 7 years equals $25,257. | Second-pass | Failed second-pass criteria |
| P1-A-068 | pack_a_corrected.js | ExplanationWrongA | because goods available for sale of $339,600 less ending inventory of $65,950 equals $2... | Second-pass | Failed second-pass criteria |
| P1-B-022 | pack_a_corrected.js | ExplanationWrongA | because it adds the fixed component to the variable cost for 3,300 machine-hours. | Second-pass | Failed second-pass criteria |
| P1-B-031 | pack_a_corrected.js | ExplanationWrongA | because it includes the collectible portion of both current-month sales and prior-month... | Second-pass | Failed second-pass criteria |
| P1-B-033 | pack_a_corrected.js | ExplanationWrongD | because it is the probability-weighted average of the three demand outcomes. | Second-pass | Failed second-pass criteria |
| P1-B-039 | pack_a_corrected.js | ExplanationWrongB | $180,000 from May sales plus $91,000 from April sales equals $271,000. | Second-pass | Failed second-pass criteria |
| P1-B-043 | pack_a_corrected.js | ExplanationWrongC | because it combines current-month collections and the collectible portion of prior-mont... | Second-pass | Failed second-pass criteria |
| P1-B-045 | pack_a_corrected.js | ExplanationWrongA | because the three probability-weighted contributions total $90,325. | Second-pass | Failed second-pass criteria |
| P1-B-046 | pack_a_corrected.js | ExplanationWrongA | because it includes both the fixed component and the variable cost for planned machine-... | Second-pass | Failed second-pass criteria |
| P1-B-055 | pack_a_corrected.js | ExplanationWrongD | because $93,030 current collections plus $132,120 prior collections equals $225,150. | Second-pass | Failed second-pass criteria |
| P1-B-069 | pack_a_corrected.js | ExplanationWrongA | because the three probability-weighted contributions total $118,525. | Second-pass | Failed second-pass criteria |
| P1-B-070 | pack_a_corrected.js | ExplanationWrongD | because it adds the fixed cost to the variable cost for 5,700 machine-hours. | Second-pass | Failed second-pass criteria |
| P1-B-079 | pack_a_corrected.js | ExplanationWrongC | because $111,510 current collections plus $158,040 prior collections equals $269,550. | Second-pass | Failed second-pass criteria |
| P1-B-081 | pack_a_corrected.js | ExplanationWrongA | because the probability-weighted average of the three scenarios is $132,625. | Second-pass | Failed second-pass criteria |
| P1-B-091 | pack_a_corrected.js | ExplanationWrongD | because $120,750 current collections plus $171,000 prior collections equals $291,750. | Second-pass | Failed second-pass criteria |
| P1-B-094 | pack_a_corrected.js | ExplanationWrongA | because it includes both the fixed component and the variable cost for planned machine-... | Second-pass | Failed second-pass criteria |
| P1-C-016 | pack_a_corrected.js | ExplanationWrongD | because the actual purchase price exceeded the standard price by $0.60 on 5,060 pounds. | Second-pass | Failed second-pass criteria |
| P1-C-017 | pack_a_corrected.js | ExplanationWrongB | because 130 excess pounds at the $6 standard price produces a $780 unfavorable variance. | Second-pass | Failed second-pass criteria |
| P1-C-019 | pack_a_corrected.js | ExplanationWrongC | because Titan used 64 fewer hours than allowed at a $24 standard rate. | Second-pass | Failed second-pass criteria |
| P1-C-023 | pack_a_corrected.js | ExplanationWrongA | because flexible-budget contribution exceeds static-budget contribution by $3,160. | Second-pass | Failed second-pass criteria |
| P1-C-028 | pack_a_corrected.js | ExplanationWrongD | because the actual price exceeded standard by $0.60 on 5,780 pounds. | Second-pass | Failed second-pass criteria |
| P1-C-029 | pack_a_corrected.js | ExplanationWrongC | because 190 excess pounds x $6 standard price equals $1,140 unfavorable. | Second-pass | Failed second-pass criteria |
| P1-C-031 | pack_a_corrected.js | ExplanationWrongC | because 76 fewer hours than standard x $24 equals $1,824 favorable. | Second-pass | Failed second-pass criteria |
| P1-C-040 | pack_a_corrected.js | ExplanationWrongB | because the $0.60 price overrun applies to 6,500 pounds purchased. | Second-pass | Failed second-pass criteria |
| P1-C-041 | pack_a_corrected.js | ExplanationWrongB | because 250 excess pounds at the $6 standard price equals $1,500 unfavorable. | Second-pass | Failed second-pass criteria |
| P1-C-042 | pack_a_corrected.js | ExplanationWrongA | because it applies the $1 unfavorable rate difference to 3,075 actual hours. | Second-pass | Failed second-pass criteria |
| P1-C-043 | pack_a_corrected.js | ExplanationWrongC | because actual hours were 88 below standard at a $24 standard rate. | Second-pass | Failed second-pass criteria |
| P1-C-045 | pack_a_corrected.js | ExplanationWrongA | because $340,000 divided by $1,850,000 equals 18.4% when rounded. | Second-pass | Failed second-pass criteria |
| P1-C-053 | pack_a_corrected.js | ExplanationWrongA | because 310 excess pounds x the $6 standard price equals $1,860 unfavorable. | Second-pass | Failed second-pass criteria |
| P1-C-059 | pack_a_corrected.js | ExplanationWrongA | because the flexible-budget contribution exceeds the static-budget contribution by $3,880. | Second-pass | Failed second-pass criteria |
| P1-C-065 | pack_a_corrected.js | ExplanationWrongC | because 370 excess pounds x $6 standard price equals $2,220 unfavorable. | Second-pass | Failed second-pass criteria |
| P1-C-066 | pack_a_corrected.js | ExplanationWrongA | because the $1 unfavorable rate difference is applied to 3,675 actual hours. | Second-pass | Failed second-pass criteria |
| P1-C-077 | pack_a_corrected.js | ExplanationWrongB | because 430 excess pounds x the $6 standard price equals $2,580 unfavorable. | Second-pass | Failed second-pass criteria |
| P1-C-079 | pack_a_corrected.js | ExplanationWrongA | because actual hours were 64 below standard, and 64 x $24 = $1,536 favorable. | Second-pass | Failed second-pass criteria |
| P1-C-089 | pack_a_corrected.js | ExplanationWrongB | because 490 excess pounds x the $6 standard price equals $2,940 unfavorable. | Second-pass | Failed second-pass criteria |
| P1-C-090 | pack_a_corrected.js | ExplanationWrongC | because the $1 unfavorable rate difference is applied to 4,275 actual hours. | Second-pass | Failed second-pass criteria |
| P1-D-001 | pack_a_corrected.js | ExplanationWrongA | Job order costing fits customized, make-to-order production where each job has unique c... | Second-pass | Failed second-pass criteria |
| P1-D-009 | pack_a_corrected.js | ExplanationWrongA | The direct method is characterized by ignoring interservice-department services. | Second-pass | Failed second-pass criteria |
| P1-D-021 | pack_a_corrected.js | ExplanationWrongB | because the predetermined rate of about $7.03 per MH applied to 123 MH gives about $865. | Second-pass | Failed second-pass criteria |
| P1-D-024 | pack_a_corrected.js | ExplanationWrongA | because $258,000 divided by 12,400 equivalent units rounds to $20.81 per equivalent unit. | Second-pass | Failed second-pass criteria |
| P1-D-044 | pack_a_corrected.js | ExplanationWrongA | because $348,000 divided by 14,400 equivalent units rounds to $24.17. | Second-pass | Failed second-pass criteria |
| P1-D-055 | pack_a_corrected.js | ExplanationWrongA | because Product A used 23 setups at about $390.32 per setup. | Second-pass | Failed second-pass criteria |
| P1-D-064 | pack_a_corrected.js | ExplanationWrongB | because $438,000 divided by 16,400 equivalent units rounds to $26.71. | Second-pass | Failed second-pass criteria |
| P1-D-068 | pack_a_corrected.js | ExplanationWrongB | ABC overhead ($80,000) is $160,000 less than traditional ($240,000). | Second-pass | Failed second-pass criteria |
| P1-D-074 | pack_a_corrected.js | ExplanationWrongB | because $483,000 divided by 17,400 equivalent units rounds to $27.76. | Second-pass | Failed second-pass criteria |
| P1-E-038 | pack_a_corrected.js | ExplanationWrongD | because system duplicate checks plus independent review address the duplicate-payment r... | Second-pass | Failed second-pass criteria |
| P1-E-039 | pack_a_corrected.js | ExplanationWrongC | because HR termination records should be reconciled promptly to payroll master-file cha... | Second-pass | Failed second-pass criteria |
| P1-E-042 | pack_a_corrected.js | ExplanationWrongD | because recurring exceptions require root-cause analysis, remediation, and monitoring. | Second-pass | Failed second-pass criteria |
| P1-E-069 | pack_a_corrected.js | ExplanationWrongB | because aggregate monitoring would detect repeated below-threshold purchases. | Second-pass | Failed second-pass criteria |
| P1-E-072 | pack_a_corrected.js | ExplanationWrongB | because the pattern requires root-cause investigation and remediation. | Second-pass | Failed second-pass criteria |
| P1-F-002 | pack_a_corrected.js | ExplanationWrongB | because EPM supports planning, consolidation, reporting, and performance-management wor... | Second-pass | Failed second-pass criteria |
| P1-F-003 | pack_a_corrected.js | ExplanationWrongD | because it describes end-to-end transaction traceability. | Second-pass | Failed second-pass criteria |
| P1-F-006 | pack_a_corrected.js | ExplanationWrongA | because it covers the major life-cycle stages and the need for controls throughout them. | Second-pass | Failed second-pass criteria |
| P1-F-018 | pack_a_corrected.js | ExplanationWrongB | because diagnostic analytics focuses on root-cause analysis. | Second-pass | Failed second-pass criteria |
| P1-F-024 | pack_a_corrected.js | ExplanationWrongD | because it treats outliers as items for follow-up rather than automatic deletion. | Second-pass | Failed second-pass criteria |
| P1-F-025 | pack_a_corrected.js | ExplanationWrongD | because the support-contact sample may not represent all customers. | Second-pass | Failed second-pass criteria |
| P1-F-027 | pack_a_corrected.js | ExplanationWrongB | because it describes rule-based automation with exception handling. | Second-pass | Failed second-pass criteria |
| P1-F-029 | pack_a_corrected.js | ExplanationWrongA | because it distinguishes model-fitting data from validation data used to test performance. | Second-pass | Failed second-pass criteria |
| P1-F-030 | pack_a_corrected.js | ExplanationWrongB | because blockchain supports a shared, tamper-resistant ledger but does not validate eve... | Second-pass | Failed second-pass criteria |
| P1-F-034 | pack_a_corrected.js | ExplanationWrongD | because it states the least-privilege principle. | Second-pass | Failed second-pass criteria |
| P1-F-042 | pack_a_corrected.js | ExplanationWrongB | because it identifies core API access-control activities. | Second-pass | Failed second-pass criteria |
| P1-F-053 | pack_a_corrected.js | ExplanationWrongA | because self-service BI needs governance over definitions, access, and data quality. | Second-pass | Failed second-pass criteria |
| P1-F-061 | pack_a_corrected.js | ExplanationWrongA | because SOC reports can provide assurance about relevant service-organization controls. | Second-pass | Failed second-pass criteria |
| P1-F-064 | pack_a_corrected.js | ExplanationWrongD | because role-based access grants permissions by job role rather than ad hoc individual ... | Second-pass | Failed second-pass criteria |
| P1-F-069 | pack_a_corrected.js | ExplanationWrongB | because real-time analytics supports rapid monitoring when timely action matters. | Second-pass | Failed second-pass criteria |
| P1-F-071 | pack_a_corrected.js | ExplanationWrongB | because unstructured data analysis extracts insight from text, images, audio, or other ... | Second-pass | Failed second-pass criteria |
| P1-F-073 | pack_a_corrected.js | ExplanationWrongA | because OCR converts scanned or image-based documents into machine-readable text. | Second-pass | Failed second-pass criteria |
| P1-AC-015 | pack_c_corrected.js | ExplanationWrongC | because significant influence at a 30% voting interest requires equity-method accounting. | Second-pass | Failed second-pass criteria |
| P1-AC-030 | pack_c_corrected.js | ExplanationWrongB | first 400 units from beginning inventory at $15 plus next 450 units from the first purc... | Second-pass | Failed second-pass criteria |
| P1-BC-001 | pack_c_corrected.js | ExplanationWrongA | because a flexible budget adjusts the budget to the actual 11,500-unit activity level. | Second-pass | Failed second-pass criteria |
| P1-BC-017 | pack_c_corrected.js | ExplanationWrongA | because the monthly add/drop process is the defining feature of a rolling forecast. | Second-pass | Failed second-pass criteria |
| P1-CC-055 | pack_c_corrected.js | ExplanationWrongC | because the $1.50 shortfall applies to 14,000 actual units sold. | Second-pass | Failed second-pass criteria |
| P1-DC-021 | pack_c_corrected.js | ExplanationWrongA | because fixed manufacturing overhead is deducted after contribution margin in variable-... | Second-pass | Failed second-pass criteria |
| P1-DC-070 | pack_c_corrected.js | ExplanationWrongB | because $304,000 divided by the $38 contribution margin equals 8,000 contracts. | Second-pass | Failed second-pass criteria |
| P1-EC-008 | pack_c_corrected.js | ExplanationWrongD | because COSO is the five-component internal-control framework tested here. | Second-pass | Failed second-pass criteria |
| P1-EC-014 | pack_c_corrected.js | ExplanationWrongB | because pressure, opportunity, and rationalization are the three fraud-triangle elements. | Second-pass | Failed second-pass criteria |
| P1-EC-022 | pack_c_corrected.js | ExplanationWrongB | because system-imposed validation blocks duplicate payments before cash is disbursed, m... | Second-pass | Failed second-pass criteria |
| P1-FC-011 | pack_c_corrected.js | ExplanationWrongC | because RPA automates structured, rules-based manual tasks. | Second-pass | Failed second-pass criteria |
| P1-FC-021 | pack_c_corrected.js | ExplanationWrongA | because dashboards should make relevant information understandable and decision-ready. | Second-pass | Failed second-pass criteria |
| P1-FC-043 | pack_c_corrected.js | ExplanationWrongC | because distributed, hard-to-alter records are a key blockchain characteristic. | Second-pass | Failed second-pass criteria |
| P1-FC-044 | pack_c_corrected.js | ExplanationWrongD | Blockchain's decentralized, distributed ledger with consensus-based validation creates ... | Second-pass | Failed second-pass criteria |
| P1-FC-046 | pack_c_corrected.js | ExplanationWrongB | because correctness, completeness, and cross-system consistency are data-quality dimens... | Second-pass | Failed second-pass criteria |
| P1-FC-061 | pack_c_corrected.js | ExplanationWrongA | because integration improves consistency and real-time visibility across business funct... | Second-pass | Failed second-pass criteria |
| P1-BD-027 | pack_d_corrected.js | ExplanationWrongC | because 16,000 budgeted labor hours at $18 per hour equals $288,000. | Second-pass | Failed second-pass criteria |
| P1-BD-080 | pack_d_corrected.js | ExplanationWrongD | the probability-weighted demand is 10,250 units. | Second-pass | Failed second-pass criteria |
| P1-BD-081 | pack_d_corrected.js | ExplanationWrongA | cash before financing is $7,000, so $8,000 must be borrowed to reach the $15,000 minimum. | Second-pass | Failed second-pass criteria |
| P1-CD-021 | pack_d_corrected.js | ExplanationWrongA | the shift from Premium to lower-margin Standard reduced contribution by $18,000. | Second-pass | Failed second-pass criteria |
| P1-DD-004 | pack_d_corrected.js | ExplanationWrongD | because the stem describes predetermined overhead application followed by actual-versus... | Second-pass | Failed second-pass criteria |
| P1-DD-008 | pack_d_corrected.js | ExplanationWrongD | because FIFO keeps beginning WIP costs separate when computing current-period cost per ... | Second-pass | Failed second-pass criteria |
| P1-DD-010 | pack_d_corrected.js | ExplanationWrongB | because FIFO keeps beginning WIP costs separate from current-period costs in equivalent... | Second-pass | Failed second-pass criteria |
| P1-DD-018 | pack_d_corrected.js | ExplanationWrongB | because step-down allocation is sequential and only partially recognizes reciprocal ser... | Second-pass | Failed second-pass criteria |
| P1-DD-019 | pack_d_corrected.js | ExplanationWrongC | because the step-down method is sequential and only partially recognizes reciprocal ser... | Second-pass | Failed second-pass criteria |
| P1-DD-020 | pack_d_corrected.js | ExplanationWrongD | because step-down allocation is sequential and recognizes only some reciprocal services. | Second-pass | Failed second-pass criteria |
| P1-DD-021 | pack_d_corrected.js | ExplanationWrongA | because the number of customer orders directly drives order-processing work. | Second-pass | Failed second-pass criteria |
| P1-DD-025 | pack_d_corrected.js | ExplanationWrongA | because customer orders processed match the cause of order-processing costs. | Second-pass | Failed second-pass criteria |
| P1-DD-026 | pack_d_corrected.js | ExplanationWrongB | because expected sales exceed break-even sales by $230,000. | Second-pass | Failed second-pass criteria |
| P1-DD-031 | pack_d_corrected.js | ExplanationWrongC | because shifting toward fixed costs makes operating income more sensitive to sales-volu... | Second-pass | Failed second-pass criteria |
| P1-DD-033 | pack_d_corrected.js | ExplanationWrongA | because higher fixed costs make profit more sensitive to sales-volume changes. | Second-pass | Failed second-pass criteria |
| P1-DD-052 | pack_d_corrected.js | ExplanationWrongD | because contribution margin format separates variable and fixed costs for CVP and short... | Second-pass | Failed second-pass criteria |
| P1-DD-053 | pack_d_corrected.js | ExplanationWrongA | because both variable manufacturing and variable selling/admin costs are deducted from ... | Second-pass | Failed second-pass criteria |
| P1-ED-001 | pack_d_corrected.js | ExplanationWrongA | because the stem separates first-line operations, second-line risk/compliance, and thir... | Second-pass | Failed second-pass criteria |
| P1-ED-064 | pack_d_corrected.js | ExplanationWrongD | because vendor-master restrictions reduce fictitious vendor and unauthorized payment-de... | Second-pass | Failed second-pass criteria |
| P1-FD-002 | pack_d_corrected.js | ExplanationWrongB | because APIs support automated, real-time data exchange between connected systems. | Second-pass | Failed second-pass criteria |
| P1-FD-007 | pack_d_corrected.js | ExplanationWrongC | because self-service BI gives users governed access to build reports and analyses. | Second-pass | Failed second-pass criteria |
| P1-FD-024 | pack_d_corrected.js | ExplanationWrongD | because the model learned training-data-specific noise rather than reusable patterns. | Second-pass | Failed second-pass criteria |
| P1-FD-033 | pack_d_corrected.js | ExplanationWrongA | because a documented breach-response plan supports timely containment, coordination, an... | Second-pass | Failed second-pass criteria |
| P1-FD-058 | pack_d_corrected.js | ExplanationWrongB | because NLP/intelligent document processing extracts useful fields from scanned invoice... | Second-pass | Failed second-pass criteria |
| P1-FD-071 | pack_d_corrected.js | ExplanationWrongC | because retention rules balance compliance obligations with data-storage risk and cost. | Second-pass | Failed second-pass criteria |
| P1-A-031 | pack_a_corrected.js | ExplanationWrongD | Ending retained earnings = $195,000 + $80,400 - $20,700 = $254,700. | Third-pass | Formula-statement |
| P1-A-032 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $72,000 + $90,300 + $122,600 ... | Third-pass | Formula-statement |
| P1-A-035 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = ($210,000 - $18,000) / 67,000 = $2.87, correctly subtracting preferred divi... | Third-pass | Formula-statement |
| P1-A-041 | pack_a_corrected.js | ExplanationWrongA | Ending retained earnings = $220,000 + $94,400 - $25,200 = $289,200. | Third-pass | Formula-statement |
| P1-A-042 | pack_a_corrected.js | ExplanationWrongA | Current assets = Cash + Accounts receivable + Inventory = $82,000 + $99,300 + $130,600 ... | Third-pass | Formula-statement |
| P1-A-045 | pack_a_corrected.js | ExplanationWrongC | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($240... | Third-pass | Formula-statement |
| P1-A-051 | pack_a_corrected.js | ExplanationWrongC | Ending retained earnings = $245,000 + $108,400 - $29,700 = $323,700. | Third-pass | Formula-statement |
| P1-A-052 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $92,000 + $108,300 + $138,600... | Third-pass | Formula-statement |
| P1-A-055 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($270... | Third-pass | Formula-statement |
| P1-A-061 | pack_a_corrected.js | ExplanationWrongD | Ending retained earnings = $270,000 + $122,400 - $34,200 = $358,200. | Third-pass | Formula-statement |
| P1-A-062 | pack_a_corrected.js | ExplanationWrongD | Current assets = Cash + Accounts receivable + Inventory = $102,000 + $117,300 + $146,60... | Third-pass | Formula-statement |
| P1-A-065 | pack_a_corrected.js | ExplanationWrongA | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($300... | Third-pass | Formula-statement |
| P1-A-071 | pack_a_corrected.js | ExplanationWrongB | Ending retained earnings = $295,000 + $136,400 - $38,700 = $392,700. | Third-pass | Formula-statement |
| P1-A-072 | pack_a_corrected.js | ExplanationWrongB | Current assets = Cash + Accounts receivable + Inventory = $112,000 + $126,300 + $154,60... | Third-pass | Formula-statement |
| P1-A-075 | pack_a_corrected.js | ExplanationWrongD | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shares = ($330... | Third-pass | Formula-statement |
| P1-AC-026 | pack_c_corrected.js | ExplanationWrongB | ($340,000 - $40,000) / 100,000 = $3.00. | Third-pass | Variance-narrative |
| P1-AC-027 | pack_c_corrected.js | ExplanationWrongC | 120,000 + (36,000 x 8/12) - (12,000 x 2/12) = 142,000. | Third-pass | Variance-narrative |
| P1-AC-028 | pack_c_corrected.js | ExplanationWrongD | $620,000 + $48,000 - $61,000 = $607,000. | Third-pass | Variance-narrative |
| P1-AC-029 | pack_c_corrected.js | ExplanationWrongA | $430,000 + $22,000 + $14,000 = $466,000. | Third-pass | Variance-narrative |
| P1-B-017 | pack_a_corrected.js | ExplanationWrongC | Production = 12,130 + 2,924 - 2,420 = 12,634 units, correctly applying the production b... | Third-pass | Formula-statement |
| P1-B-018 | pack_a_corrected.js | ExplanationWrongA | Purchases = Production needs (45,800 lbs) + Desired ending inventory (4,820 lbs) - Begi... | Third-pass | Formula-statement |
| P1-B-024 | pack_a_corrected.js | ExplanationWrongA | Ending cash before financing = $32,800 + $94,200 - $101,800 = $25,200. The minimum bala... | Third-pass | Formula-statement |
| P1-B-030 | pack_a_corrected.js | ExplanationWrongB | Purchases = Production needs (50,600 lbs) + Desired ending inventory (5,240 lbs) - Begi... | Third-pass | Formula-statement |
| P1-B-036 | pack_a_corrected.js | ExplanationWrongA | Ending cash before financing = $34,000 + $105,000 - $112,000 = $27,000. The minimum bal... | Third-pass | Formula-statement |
| P1-B-048 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $35,200 + $115,800 - $122,200 = $28,800. The minimum bal... | Third-pass | Formula-statement |
| P1-B-053 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (16,810) + Desired ending inventory (3,788) - Beginning inventory (3... | Third-pass | Formula-statement |
| P1-B-060 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $36,400 + $126,600 - $132,400 = $30,600. The minimum bal... | Third-pass | Formula-statement |
| P1-B-061 | pack_a_corrected.js | ExplanationWrongC | Production = 20,000 + 3,000 - 2,000 = 21,000 units. | Third-pass | Formula-statement |
| P1-B-065 | pack_a_corrected.js | ExplanationWrongB | Production = Sales (18,370) + Desired ending inventory (4,076) - Beginning inventory (3... | Third-pass | Formula-statement |
| P1-B-066 | pack_a_corrected.js | ExplanationWrongC | Purchases = Production needs (65,000 lbs) + Desired ending inventory (6,500 lbs) - Begi... | Third-pass | Formula-statement |
| P1-B-072 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $37,600 + $137,400 - $142,600 = $32,400. The minimum bal... | Third-pass | Formula-statement |
| P1-B-077 | pack_a_corrected.js | ExplanationWrongC | Production = Sales (19,930) + Desired ending inventory (4,364) - Beginning inventory (3... | Third-pass | Formula-statement |
| P1-B-078 | pack_a_corrected.js | ExplanationWrongD | Purchases = Production needs (69,800 lbs) + Desired ending inventory (6,920 lbs) - Begi... | Third-pass | Formula-statement |
| P1-B-084 | pack_a_corrected.js | ExplanationWrongC | Ending cash before financing = $38,800 + $148,200 - $152,800 = $34,200. The minimum bal... | Third-pass | Formula-statement |
| P1-B-089 | pack_a_corrected.js | ExplanationWrongC | Production = Sales (21,490) + Desired ending inventory (4,652) - Beginning inventory (3... | Third-pass | Formula-statement |
| P1-B-090 | pack_a_corrected.js | ExplanationWrongC | Purchases = Production needs (74,600 lbs) + Desired ending inventory (7,340 lbs) - Begi... | Third-pass | Formula-statement |
| P1-B-096 | pack_a_corrected.js | ExplanationWrongD | Ending cash before financing = $40,000 + $159,000 - $163,000 = $36,000. The minimum bal... | Third-pass | Formula-statement |
| P1-B-098 | pack_a_corrected.js | ExplanationWrongB | March disbursements = 60% x March purchases ($95,000) + 40% x February purchases ($80,0... | Third-pass | Formula-statement |
| P1-BC-041 | pack_c_corrected.js | ExplanationWrongA | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Begi... | Third-pass | Formula-statement |
| P1-BC-042 | pack_c_corrected.js | ExplanationWrongB | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Begi... | Third-pass | Formula-statement |
| P1-BC-043 | pack_c_corrected.js | ExplanationWrongC | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Begi... | Third-pass | Formula-statement |
| P1-BC-044 | pack_c_corrected.js | ExplanationWrongD | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Begi... | Third-pass | Formula-statement |
| P1-BC-045 | pack_c_corrected.js | ExplanationWrongA | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Begi... | Third-pass | Formula-statement |
| P1-BC-046 | pack_c_corrected.js | ExplanationWrongB | Required production = Budgeted sales (40,000) + Desired ending inventory (5,000) - Begi... | Third-pass | Formula-statement |
| P1-BC-068 | pack_c_corrected.js | ExplanationWrongD | because the $15,000 cost change divided by the 3,000-hour activity change equals $5.00 ... | Third-pass | Variance-narrative |
| P1-BC-069 | pack_c_corrected.js | ExplanationWrongA | because the high-low variable cost rate is $15,000 divided by 3,000 machine hours, or $... | Third-pass | Variance-narrative |
| P1-BD-022 | pack_d_corrected.js | ExplanationWrongB | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Lab... | Third-pass | Formula-statement |
| P1-BD-023 | pack_d_corrected.js | ExplanationWrongC | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Lab... | Third-pass | Formula-statement |
| P1-BD-024 | pack_d_corrected.js | ExplanationWrongD | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Lab... | Third-pass | Formula-statement |
| P1-BD-025 | pack_d_corrected.js | ExplanationWrongA | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Lab... | Third-pass | Formula-statement |
| P1-BD-028 | pack_d_corrected.js | ExplanationWrongD | Total budgeted direct labor cost = Units to produce × Direct labor hours per unit × Lab... | Third-pass | Formula-statement |
| P1-BD-050 | pack_d_corrected.js | ExplanationWrongB | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - ... | Third-pass | Formula-statement |
| P1-BD-051 | pack_d_corrected.js | ExplanationWrongC | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - ... | Third-pass | Formula-statement |
| P1-BD-055 | pack_d_corrected.js | ExplanationWrongC | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - ... | Third-pass | Formula-statement |
| P1-BD-056 | pack_d_corrected.js | ExplanationWrongD | Materials to purchase = Production needs (25,000) + Desired ending inventory (4,000) - ... | Third-pass | Formula-statement |
| P1-BD-089 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $... | Third-pass | Formula-statement |
| P1-BD-090 | pack_d_corrected.js | ExplanationWrongB | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $... | Third-pass | Formula-statement |
| P1-BD-091 | pack_d_corrected.js | ExplanationWrongC | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $... | Third-pass | Formula-statement |
| P1-BD-092 | pack_d_corrected.js | ExplanationWrongD | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $... | Third-pass | Formula-statement |
| P1-BD-093 | pack_d_corrected.js | ExplanationWrongA | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) + (0.40 × $... | Third-pass | Formula-statement |
| P1-C-018 | pack_a_corrected.js | ExplanationWrongD | because 2,475 actual hours x $1 excess rate equals $2,475 unfavorable. | Third-pass | Variance-narrative |
| P1-C-030 | pack_a_corrected.js | ExplanationWrongC | because 2,775 actual hours x the $1 rate overrun = $2,775 unfavorable. | Third-pass | Variance-narrative |
| P1-C-052 | pack_a_corrected.js | ExplanationWrongC | because 7,220 pounds x $0.60 excess price equals $4,332 unfavorable. | Third-pass | Variance-narrative |
| P1-C-054 | pack_a_corrected.js | ExplanationWrongC | because the $1 excess rate applied to 3,375 actual hours gives $3,375 unfavorable. | Third-pass | Variance-narrative |
| P1-C-055 | pack_a_corrected.js | ExplanationWrongA | because 70 fewer hours than allowed x $24 equals $1,680 favorable. | Third-pass | Variance-narrative |
| P1-C-064 | pack_a_corrected.js | ExplanationWrongB | because 7,940 pounds x $0.60 excess price equals $4,764 unfavorable. | Third-pass | Variance-narrative |
| P1-C-067 | pack_a_corrected.js | ExplanationWrongD | because 82 fewer hours than allowed x $24 equals $1,968 favorable. | Third-pass | Variance-narrative |
| P1-C-068 | pack_a_corrected.js | ExplanationWrongC | because $114,500 - $106,260 = $8,240 unfavorable. | Third-pass | Variance-narrative |
| P1-C-076 | pack_a_corrected.js | ExplanationWrongC | because 8,660 pounds x $0.60 excess price equals $5,196 unfavorable. | Third-pass | Variance-narrative |
| P1-C-078 | pack_a_corrected.js | ExplanationWrongB | because 3,975 actual hours x the $1 excess actual rate = $3,975 unfavorable. | Third-pass | Variance-narrative |
| P1-C-083 | pack_a_corrected.js | ExplanationWrongB | because $88,360 - $84,000 = $4,360 favorable. | Third-pass | Variance-narrative |
| P1-C-088 | pack_a_corrected.js | ExplanationWrongC | because 9,380 pounds x $0.60 excess price equals $5,628 unfavorable. | Third-pass | Variance-narrative |
| P1-C-091 | pack_a_corrected.js | ExplanationWrongD | because 76 fewer hours than allowed x $24 equals $1,824 favorable. | Third-pass | Variance-narrative |
| P1-C-092 | pack_a_corrected.js | ExplanationWrongC | because $126,500 - $116,340 = $10,160 unfavorable. | Third-pass | Variance-narrative |
| P1-C-100 | pack_a_corrected.js | ExplanationWrongD | because 10,100 pounds x $0.60 excess price equals $6,060 unfavorable. | Third-pass | Variance-narrative |
| P1-CC-015 | pack_c_corrected.js | ExplanationWrongC | RI = $450,000 - $300,000 = $150,000 means the division earned $150,000 above its requir... | Third-pass | Formula-statement |
| P1-CC-016 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating asset... | Third-pass | Formula-statement |
| P1-CC-017 | pack_c_corrected.js | ExplanationWrongA | Residual income = Operating income - (Required rate of return x Average operating asset... | Third-pass | Formula-statement |
| P1-CC-018 | pack_c_corrected.js | ExplanationWrongB | Residual income = Operating income - (Required rate of return x Average operating asset... | Third-pass | Formula-statement |
| P1-CC-019 | pack_c_corrected.js | ExplanationWrongC | Residual income = Operating income - (Required rate of return x Average operating asset... | Third-pass | Formula-statement |
| P1-CC-020 | pack_c_corrected.js | ExplanationWrongD | Residual income = Operating income - (Required rate of return x Average operating asset... | Third-pass | Formula-statement |
| P1-CC-021 | pack_c_corrected.js | ExplanationWrongA | because 450,000 - (10% x 3,000,000) equals 150,000. | Third-pass | Variance-narrative |
| P1-CC-054 | pack_c_corrected.js | ExplanationWrongB | because the actual selling price exceeded budget by $3 on 6,200 units. | Third-pass | Variance-narrative |
| P1-CC-059 | pack_c_corrected.js | ExplanationWrongC | (50,000 - 46,000) x $6 = $24,000 unfavorable. | Third-pass | Variance-narrative |
| P1-CC-060 | pack_c_corrected.js | ExplanationWrongD | (66,000 - 60,000) x $8 = $48,000 favorable. | Third-pass | Variance-narrative |
| P1-CC-061 | pack_c_corrected.js | ExplanationWrongA | (90,000 - 84,000) x $8 = $48,000 unfavorable. | Third-pass | Variance-narrative |
| P1-CC-062 | pack_c_corrected.js | ExplanationWrongB | (50,000 - 45,000) x $8 = $40,000 favorable. | Third-pass | Variance-narrative |
| P1-CD-001 | pack_d_corrected.js | ExplanationWrongA | The labor rate variance is 2,100 × ($19 - $18) = $2,100 Unfavorable. | Third-pass | Variance-narrative |
| P1-DC-011 | pack_c_corrected.js | ExplanationWrongC | $96,000 / 240 = $400 per setup; 18 setups x $400 = $7,200. | Third-pass | Variance-narrative |
| P1-DC-012 | pack_c_corrected.js | ExplanationWrongD | 50,000 / 100,000 x $150,000 = $75,000. | Third-pass | Variance-narrative |
| P1-DC-013 | pack_c_corrected.js | ExplanationWrongA | ($250,000 / $400,000) x $200,000 = $125,000. | Third-pass | Variance-narrative |
| P1-DC-014 | pack_c_corrected.js | ExplanationWrongB | ($120,000 / 20,000 MH) x 12,000 MH = $6 x 12,000 = $72,000. | Third-pass | Variance-narrative |
| P1-DC-015 | pack_c_corrected.js | ExplanationWrongC | $75,000 / 3,000 = $25 per ticket; 420 tickets x $25 = $10,500. | Third-pass | Variance-narrative |
| P1-DC-025 | pack_c_corrected.js | ExplanationWrongA | because selling 3,000 more units than produced releases $15,000 of fixed overhead from ... | Third-pass | Variance-narrative |
| P1-DC-066 | pack_c_corrected.js | ExplanationWrongB | because $252,000 / ($84 - $56) = 9,000 units. | Third-pass | Variance-narrative |
| P1-DC-067 | pack_c_corrected.js | ExplanationWrongC | because ($384,000 + $96,000) / $48 = 10,000 units. | Third-pass | Variance-narrative |
| P1-DC-068 | pack_c_corrected.js | ExplanationWrongD | because $240,000 / 40% = $600,000 of sales. | Third-pass | Variance-narrative |
| P1-DD-059 | pack_d_corrected.js | ExplanationWrongC | $240,000 budgeted - (11,000 x $20) = $20,000 unfavorable. | Third-pass | Variance-narrative |
| P1-DD-060 | pack_d_corrected.js | ExplanationWrongD | (3,000 - 3,200) x $8.00 = -$1,600 = $1,600 unfavorable. | Third-pass | Variance-narrative |
| P1-DD-066 | pack_d_corrected.js | ExplanationWrongB | ($5.00 - $4.90) x 10,000 lbs = $1,000 favorable. | Third-pass | Variance-narrative |
| P1-DD-067 | pack_d_corrected.js | ExplanationWrongC | (3,200 - 3,400) x $3.00 = -$600 = $600 unfavorable. | Third-pass | Variance-narrative |
| P1-DD-068 | pack_d_corrected.js | ExplanationWrongD | ($20.00 - $22.00) x 1,500 = -$3,000 = $3,000 unfavorable. | Third-pass | Variance-narrative |
| P1-DD-069 | pack_d_corrected.js | ExplanationWrongA | (1,200 - 1,300) x $15 = -$1,500 = $1,500 unfavorable. | Third-pass | Variance-narrative |
| P1-DD-070 | pack_d_corrected.js | ExplanationWrongB | $18,500 actual - (2,000 DLH x $10.00) = -$1,500 = $1,500 favorable. | Third-pass | Variance-narrative |
