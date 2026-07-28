# DL-008 Classification Report

**Date:** 2026-07-22
**Tool:** scripts/classify_dl008.js
**Total DL-008 occurrences scanned:** 539

## Decision Matrix

| Bucket | Classification | Count | % of Total | Action |
|--------|---------------|-------|-----------|--------|
| 1 | Naked calculation summary | 306 | 56.8% | Sweep-clear after approval |
| 2 | Substantive conceptual misplaced | 232 | 43.0% | Editorial queue — merge/relocate/remove |
| 3 | Distractor explanation misattributed | 1 | 0.2% | Editorial queue — re-attribute to correct slot |

## Classification Heuristics

**Bucket 1** — Naked calculation summary: text is short (≤25 words), primarily numeric (≥2 number tokens), contains arithmetic operators (+, -, ×, /, =), no conceptual language, no misattribution phrases.

**Bucket 2** — Substantive conceptual: contains conceptual language ("triggering events", "recognition", "measurement", "represents", "requires", "criteria", etc.), longer text (≥8 words), does not meet misattribution criteria.

**Bucket 3** — Misattributed distractor: contains misattribution phrases ("results from", "would be if", "incorrectly assumes", "reflects a misunderstanding", "confuses"), explains why a specific wrong answer is wrong.

## By Pack

| Pack | Total | Bucket 1 | Bucket 2 | Bucket 3 |
|------|-------|----------|----------|----------|
| pack_a_corrected.js | 315 | 197 | 117 | 1 |
| pack_b_corrected.js | 0 | 0 | 0 | 0 |
| pack_c_corrected.js | 113 | 49 | 64 | 0 |
| pack_d_corrected.js | 111 | 60 | 51 | 0 |
| pack_e_corrected.js | 0 | 0 | 0 | 0 |

## Sample Entries for Spot-Check

### Bucket 1 Samples (306 total)

| QID | Pack | Field | Content | Length |
|-----|------|-------|---------|--------|
| P1-A-003 | pack_a_corrected.js | ExplanationWrongC | $172,000 + $53,000 - $14,000 - $10,000 = $201,000. | 50 |
| P1-B-058 | pack_a_corrected.js | ExplanationWrongC | because it adds $86,800 fixed cost and $71,400 variable cost. | 61 |
| P1-C-077 | pack_a_corrected.js | ExplanationWrongB | because 430 excess pounds x the $6 standard price equals $2,580 unfavorable. | 76 |
| P1-F-018 | pack_a_corrected.js | ExplanationWrongB | because diagnostic analytics focuses on root-cause analysis. | 60 |
| P1-FC-046 | pack_c_corrected.js | ExplanationWrongB | because correctness, completeness, and cross-system consistency are data-quality dimensions. | 92 |

### Bucket 2 Samples (232 total)

| QID | Pack | Field | Content (start) | Length |
|-----|------|-------|-----------------|--------|
| P1-A-011 | pack_a_corrected.js | ExplanationWrongD | Triggering events such as a significant adverse change in use require the entity to test for impairment. | 104 |
| P1-E-043 | pack_a_corrected.js | ExplanationWrongC | because retained evidence supports testing of reviewer, timing, scope, and exception resolution. | 96 |
| P1-F-045 | pack_a_corrected.js | ExplanationWrongC | because data minimization limits collection and retention to what is necessary for the purpose. | 95 |
| P1-CC-056 | pack_c_corrected.js | ExplanationWrongD | Sales price variance = (Actual price - Budgeted price) x Actual units = ($23 - $25) x 12,000 = (-$2) x 12,000 = -$24,... | 222 |
| P1-BD-094 | pack_d_corrected.js | ExplanationWrongB | because 120,000 collected from June sales plus 60,000 collected from May sales equals 180,000. | 94 |

### Bucket 3 Samples (1 total)

| QID | Pack | Field | Content (start) | Length |
|-----|------|-------|-----------------|--------|
| P1-A-029 | pack_a_corrected.js | ExplanationWrongB | $18,560 results from dividing the full cost ($92,800) by 5 without subtracting salvage value. Salvage value must be e... | 182 |

## Full Classification Listing

| QID | Pack | Bucket | Field | Word Count | Content (truncated) |
|-----|------|--------|-------|-----------|---------------------|
| P1-A-003 | pack_a_corrected.js | 1 | ExplanationWrongC | 9 | $172,000 + $53,000 - $14,000 - $10,000 = $201,000. |
| P1-A-010 | pack_a_corrected.js | 1 | ExplanationWrongB | 9 | ($96,000 - $12,000) / 7 x 6/12 = $6,000. |
| P1-A-011 | pack_a_corrected.js | 2 | ExplanationWrongD | 17 | Triggering events such as a significant adverse change in use require the ent... |
| P1-A-026 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because $324,300 assets - $127,100 liabilities = $197,200 equity. |
| P1-A-027 | pack_a_corrected.js | 1 | ExplanationWrongC | 8 | because 396 shipped units x $55 = $21,780. |
| P1-A-028 | pack_a_corrected.js | 1 | ExplanationWrongD | 8 | because $44,700 + $166,900 - $39,950 = $171,650. |
| P1-A-029 | pack_a_corrected.js | 3 | ExplanationWrongB | 27 | $18,560 results from dividing the full cost ($92,800) by 5 without subtractin... |
| P1-A-030 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because $103,500 + $23,000 - $7,000 + $5,300 = $124,800. |
| P1-A-031 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | Ending retained earnings = $195,000 + $80,400 - $20,700 = $254,700. |
| P1-A-032 | pack_a_corrected.js | 1 | ExplanationWrongD | 27 | Current assets = Cash + Accounts receivable + Inventory = $72,000 + $90,300 +... |
| P1-A-033 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | because $244,000 - $10,600 - $4,300 = $229,100. |
| P1-A-035 | pack_a_corrected.js | 1 | ExplanationWrongD | 18 | Basic EPS = ($210,000 - $18,000) / 67,000 = $2.87, correctly subtracting pref... |
| P1-A-036 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because $367,300 assets - $148,100 liabilities = $219,200 equity. |
| P1-A-037 | pack_a_corrected.js | 1 | ExplanationWrongD | 8 | because 466 shipped units x $45 = $20,970. |
| P1-A-038 | pack_a_corrected.js | 1 | ExplanationWrongC | 8 | because $53,700 + $189,900 - $46,450 = $197,150. |
| P1-A-039 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because the depreciable base of $112,800 divided by 7 years equals $16,114. |
| P1-A-040 | pack_a_corrected.js | 1 | ExplanationWrongA | 10 | because the indirect-method adjustments produce $145,600 of operating cash flow. |
| P1-A-041 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | Ending retained earnings = $220,000 + $94,400 - $25,200 = $289,200. |
| P1-A-042 | pack_a_corrected.js | 1 | ExplanationWrongA | 27 | Current assets = Cash + Accounts receivable + Inventory = $82,000 + $99,300 +... |
| P1-A-043 | pack_a_corrected.js | 2 | ExplanationWrongB | 8 | because both returns and allowances reduce gross sales. |
| P1-A-045 | pack_a_corrected.js | 1 | ExplanationWrongC | 24 | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shar... |
| P1-A-046 | pack_a_corrected.js | 1 | ExplanationWrongC | 6 | because $410,300 - $169,100 = $241,200. |
| P1-A-047 | pack_a_corrected.js | 1 | ExplanationWrongD | 8 | because 536 shipped units x $65 = $34,840. |
| P1-A-048 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | because goods available for sale of $275,600 less ending inventory of $52,950... |
| P1-A-049 | pack_a_corrected.js | 1 | ExplanationWrongA | 8 | because ($156,800 - $12,000) / 5 = $28,960. |
| P1-A-050 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because $137,500 + $31,000 - $9,000 + $6,900 = $166,400. |
| P1-A-051 | pack_a_corrected.js | 1 | ExplanationWrongC | 11 | Ending retained earnings = $245,000 + $108,400 - $29,700 = $323,700. |
| P1-A-052 | pack_a_corrected.js | 1 | ExplanationWrongD | 27 | Current assets = Cash + Accounts receivable + Inventory = $92,000 + $108,300 ... |
| P1-A-053 | pack_a_corrected.js | 2 | ExplanationWrongA | 10 | because both sales returns and sales allowances reduce gross sales. |
| P1-A-055 | pack_a_corrected.js | 1 | ExplanationWrongD | 24 | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shar... |
| P1-A-056 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because $453,300 assets - $190,100 liabilities = $263,200 equity. |
| P1-A-057 | pack_a_corrected.js | 1 | ExplanationWrongC | 8 | because 606 shipped units x $55 = $33,330. |
| P1-A-058 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | because $71,700 + $235,900 - $59,450 = $248,150. |
| P1-A-059 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | because the $176,800 depreciable base divided by 7 years equals $25,257. |
| P1-A-060 | pack_a_corrected.js | 2 | ExplanationWrongA | 11 | because the depreciation addback, receivables subtraction, and payables addit... |
| P1-A-061 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | Ending retained earnings = $270,000 + $122,400 - $34,200 = $358,200. |
| P1-A-062 | pack_a_corrected.js | 1 | ExplanationWrongD | 27 | Current assets = Cash + Accounts receivable + Inventory = $102,000 + $117,300... |
| P1-A-063 | pack_a_corrected.js | 2 | ExplanationWrongD | 8 | because both returns and allowances reduce gross sales. |
| P1-A-065 | pack_a_corrected.js | 1 | ExplanationWrongA | 24 | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shar... |
| P1-A-066 | pack_a_corrected.js | 1 | ExplanationWrongC | 9 | because $496,300 assets - $211,100 liabilities = $285,200 equity. |
| P1-A-067 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | because 676 shipped units x $45 = $30,420. |
| P1-A-068 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | because goods available for sale of $339,600 less ending inventory of $65,950... |
| P1-A-069 | pack_a_corrected.js | 1 | ExplanationWrongC | 8 | because ($220,800 - $12,000) / 5 = $41,760. |
| P1-A-070 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because $171,500 + $39,000 - $11,000 + $8,500 = $208,000. |
| P1-A-071 | pack_a_corrected.js | 1 | ExplanationWrongB | 11 | Ending retained earnings = $295,000 + $136,400 - $38,700 = $392,700. |
| P1-A-072 | pack_a_corrected.js | 1 | ExplanationWrongB | 27 | Current assets = Cash + Accounts receivable + Inventory = $112,000 + $126,300... |
| P1-A-073 | pack_a_corrected.js | 1 | ExplanationWrongD | 8 | because $464,000 - $18,600 - $8,300 = $437,100. |
| P1-A-075 | pack_a_corrected.js | 1 | ExplanationWrongD | 24 | Basic EPS = (Net income - Preferred dividends) / Weighted-average common shar... |
| P1-B-008 | pack_a_corrected.js | 2 | ExplanationWrongA | 14 | The sales budget is prepared first because it drives the entire operating bud... |
| P1-B-017 | pack_a_corrected.js | 1 | ExplanationWrongC | 16 | Production = 12,130 + 2,924 - 2,420 = 12,634 units, correctly applying the pr... |
| P1-B-018 | pack_a_corrected.js | 1 | ExplanationWrongA | 20 | Purchases = Production needs (45,800 lbs) + Desired ending inventory (4,820 l... |
| P1-B-019 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because it adds current-month collections of $65,310 and prior-month collecti... |
| P1-B-020 | pack_a_corrected.js | 2 | ExplanationWrongD | 13 | because it combines fixed support cost with variable support cost at actual o... |
| P1-B-021 | pack_a_corrected.js | 2 | ExplanationWrongC | 9 | because it weights each possible contribution by its probability. |
| P1-B-022 | pack_a_corrected.js | 1 | ExplanationWrongA | 13 | because it adds the fixed component to the variable cost for 3,300 machine-ho... |
| P1-B-023 | pack_a_corrected.js | 1 | ExplanationWrongD | 29 | With a 85% cumulative average-time learning curve, the cumulative average tim... |
| P1-B-024 | pack_a_corrected.js | 1 | ExplanationWrongA | 25 | Ending cash before financing = $32,800 + $94,200 - $101,800 = $25,200. The mi... |
| P1-B-029 | pack_a_corrected.js | 2 | ExplanationWrongA | 17 | because it includes sales needs, adds the desired ending inventory, and subtr... |
| P1-B-030 | pack_a_corrected.js | 1 | ExplanationWrongB | 20 | Purchases = Production needs (50,600 lbs) + Desired ending inventory (5,240 l... |
| P1-B-031 | pack_a_corrected.js | 1 | ExplanationWrongA | 13 | because it includes the collectible portion of both current-month sales and p... |
| P1-B-032 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because it adds fixed support cost to variable support cost at actual output. |
| P1-B-033 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because it is the probability-weighted average of the three demand outcomes. |
| P1-B-034 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because it adds $77,200 fixed cost to $58,500 variable cost. |
| P1-B-035 | pack_a_corrected.js | 2 | ExplanationWrongB | 31 | Incremental time for 2nd unit = (Cumulative avg for 2 units   2) - First unit... |
| P1-B-036 | pack_a_corrected.js | 1 | ExplanationWrongA | 25 | Ending cash before financing = $34,000 + $105,000 - $112,000 = $27,000. The m... |
| P1-B-038 | pack_a_corrected.js | 2 | ExplanationWrongA | 8 | because it averages the three actual months equally. |
| P1-B-039 | pack_a_corrected.js | 1 | ExplanationWrongB | 11 | $180,000 from May sales plus $91,000 from April sales equals $271,000. |
| P1-B-041 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because it adds desired ending inventory and subtracts beginning inventory fr... |
| P1-B-042 | pack_a_corrected.js | 2 | ExplanationWrongB | 12 | because it adjusts production needs for desired ending and beginning material... |
| P1-B-043 | pack_a_corrected.js | 1 | ExplanationWrongC | 12 | because it combines current-month collections and the collectible portion of ... |
| P1-B-044 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because it adds fixed cost to variable cost at the actual output level. |
| P1-B-045 | pack_a_corrected.js | 1 | ExplanationWrongA | 7 | because the three probability-weighted contributions total $90,325. |
| P1-B-046 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | because it includes both the fixed component and the variable cost for planne... |
| P1-B-048 | pack_a_corrected.js | 1 | ExplanationWrongD | 25 | Ending cash before financing = $35,200 + $115,800 - $122,200 = $28,800. The m... |
| P1-B-053 | pack_a_corrected.js | 1 | ExplanationWrongB | 16 | Production = Sales (16,810) + Desired ending inventory (3,788) - Beginning in... |
| P1-B-054 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because it adds desired ending inventory and subtracts beginning inventory fr... |
| P1-B-055 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because $93,030 current collections plus $132,120 prior collections equals $2... |
| P1-B-056 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because $62,000 fixed cost plus $116,800 variable cost equals $178,800. |
| P1-B-057 | pack_a_corrected.js | 2 | ExplanationWrongD | 11 | because the weighted average of the three demand scenarios equals $104,425. |
| P1-B-058 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because it adds $86,800 fixed cost and $71,400 variable cost. |
| P1-B-059 | pack_a_corrected.js | 1 | ExplanationWrongC | 8 | 12,000 + (35 x 420) = 26,700 units. |
| P1-B-060 | pack_a_corrected.js | 1 | ExplanationWrongD | 25 | Ending cash before financing = $36,400 + $126,600 - $132,400 = $30,600. The m... |
| P1-B-061 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | Production = 20,000 + 3,000 - 2,000 = 21,000 units. |
| P1-B-065 | pack_a_corrected.js | 1 | ExplanationWrongB | 16 | Production = Sales (18,370) + Desired ending inventory (4,076) - Beginning in... |
| P1-B-066 | pack_a_corrected.js | 1 | ExplanationWrongC | 20 | Purchases = Production needs (65,000 lbs) + Desired ending inventory (6,500 l... |
| P1-B-067 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because current collections of $102,270 plus prior-month collections of $145,... |
| P1-B-068 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because $66,800 fixed cost plus $156,800 variable cost equals $223,600. |
| P1-B-069 | pack_a_corrected.js | 1 | ExplanationWrongA | 7 | because the three probability-weighted contributions total $118,525. |
| P1-B-070 | pack_a_corrected.js | 1 | ExplanationWrongD | 13 | because it adds the fixed cost to the variable cost for 5,700 machine-hours. |
| P1-B-072 | pack_a_corrected.js | 1 | ExplanationWrongD | 25 | Ending cash before financing = $37,600 + $137,400 - $142,600 = $32,400. The m... |
| P1-B-074 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | 18,000 + 4,000 - 3,000 = 19,000 units. |
| P1-B-077 | pack_a_corrected.js | 1 | ExplanationWrongC | 16 | Production = Sales (19,930) + Desired ending inventory (4,364) - Beginning in... |
| P1-B-078 | pack_a_corrected.js | 1 | ExplanationWrongD | 20 | Purchases = Production needs (69,800 lbs) + Desired ending inventory (6,920 l... |
| P1-B-079 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because $111,510 current collections plus $158,040 prior collections equals $... |
| P1-B-080 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because $71,600 fixed cost plus $201,120 variable cost equals $272,720. |
| P1-B-081 | pack_a_corrected.js | 1 | ExplanationWrongA | 10 | because the probability-weighted average of the three scenarios is $132,625. |
| P1-B-082 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because it adds $96,400 fixed cost and $81,900 variable cost. |
| P1-B-083 | pack_a_corrected.js | 1 | ExplanationWrongC | 13 | because 20 units x 45 average hours x $30 per hour equals $27,000. |
| P1-B-084 | pack_a_corrected.js | 1 | ExplanationWrongC | 25 | Ending cash before financing = $38,800 + $148,200 - $152,800 = $34,200. The m... |
| P1-B-089 | pack_a_corrected.js | 1 | ExplanationWrongC | 16 | Production = Sales (21,490) + Desired ending inventory (4,652) - Beginning in... |
| P1-B-090 | pack_a_corrected.js | 1 | ExplanationWrongC | 20 | Purchases = Production needs (74,600 lbs) + Desired ending inventory (7,340 l... |
| P1-B-091 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because $120,750 current collections plus $171,000 prior collections equals $... |
| P1-B-092 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because $76,400 fixed cost plus $160,560 variable cost equals $236,960. |
| P1-B-093 | pack_a_corrected.js | 2 | ExplanationWrongA | 14 | because the weighted average of the low, base, and high demand contributions ... |
| P1-B-094 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | because it includes both the fixed component and the variable cost for planne... |
| P1-B-096 | pack_a_corrected.js | 1 | ExplanationWrongD | 25 | Ending cash before financing = $40,000 + $159,000 - $163,000 = $36,000. The m... |
| P1-B-098 | pack_a_corrected.js | 1 | ExplanationWrongB | 20 | March disbursements = 60% x March purchases ($95,000) + 40% x February purcha... |
| P1-C-001 | pack_a_corrected.js | 2 | ExplanationWrongA | 12 | Standards support planning, control through variance analysis, inventory valu... |
| P1-C-016 | pack_a_corrected.js | 1 | ExplanationWrongD | 14 | because the actual purchase price exceeded the standard price by $0.60 on 5,0... |
| P1-C-017 | pack_a_corrected.js | 1 | ExplanationWrongB | 14 | because 130 excess pounds at the $6 standard price produces a $780 unfavorabl... |
| P1-C-018 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because 2,475 actual hours x $1 excess rate equals $2,475 unfavorable. |
| P1-C-019 | pack_a_corrected.js | 1 | ExplanationWrongC | 13 | because Titan used 64 fewer hours than allowed at a $24 standard rate. |
| P1-C-020 | pack_a_corrected.js | 2 | ExplanationWrongC | 11 | because actual variable overhead was $4,400 higher than the flexible budget. |
| P1-C-021 | pack_a_corrected.js | 1 | ExplanationWrongB | 7 | because $268,000 / $1,370,000 rounds to 19.6%. |
| P1-C-022 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because residual income is $324,500 - $237,000 = $87,500 positive. |
| P1-C-023 | pack_a_corrected.js | 1 | ExplanationWrongA | 8 | because flexible-budget contribution exceeds static-budget contribution by $3... |
| P1-C-028 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because the actual price exceeded standard by $0.60 on 5,780 pounds. |
| P1-C-029 | pack_a_corrected.js | 1 | ExplanationWrongC | 11 | because 190 excess pounds x $6 standard price equals $1,140 unfavorable. |
| P1-C-030 | pack_a_corrected.js | 1 | ExplanationWrongC | 12 | because 2,775 actual hours x the $1 rate overrun = $2,775 unfavorable. |
| P1-C-031 | pack_a_corrected.js | 1 | ExplanationWrongC | 11 | because 76 fewer hours than standard x $24 equals $1,824 favorable. |
| P1-C-032 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because actual variable overhead exceeded the flexible budget by $5,360. |
| P1-C-033 | pack_a_corrected.js | 1 | ExplanationWrongC | 7 | because $304,000 / $1,610,000 rounds to 18.9%. |
| P1-C-034 | pack_a_corrected.js | 1 | ExplanationWrongB | 9 | because $366,500 - (12% x $2,275,000) = $93,500 positive. |
| P1-C-035 | pack_a_corrected.js | 2 | ExplanationWrongC | 10 | because the flexible budget exceeds the static budget by $3,400. |
| P1-C-037 | pack_a_corrected.js | 2 | ExplanationWrongB | 15 | because excess capacity means no forgone contribution margin; the floor is th... |
| P1-C-040 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because the $0.60 price overrun applies to 6,500 pounds purchased. |
| P1-C-041 | pack_a_corrected.js | 1 | ExplanationWrongB | 12 | because 250 excess pounds at the $6 standard price equals $1,500 unfavorable. |
| P1-C-042 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because it applies the $1 unfavorable rate difference to 3,075 actual hours. |
| P1-C-043 | pack_a_corrected.js | 1 | ExplanationWrongC | 12 | because actual hours were 88 below standard at a $24 standard rate. |
| P1-C-044 | pack_a_corrected.js | 2 | ExplanationWrongC | 10 | because actual variable overhead exceeded the flexible budget by $6,320. |
| P1-C-045 | pack_a_corrected.js | 1 | ExplanationWrongA | 9 | because $340,000 divided by $1,850,000 equals 18.4% when rounded. |
| P1-C-046 | pack_a_corrected.js | 1 | ExplanationWrongC | 9 | because $408,500 - (12% x $2,575,000) = $99,500 positive. |
| P1-C-047 | pack_a_corrected.js | 2 | ExplanationWrongD | 10 | because the flexible budget exceeds the static budget by $3,640. |
| P1-C-052 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because 7,220 pounds x $0.60 excess price equals $4,332 unfavorable. |
| P1-C-053 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because 310 excess pounds x the $6 standard price equals $1,860 unfavorable. |
| P1-C-054 | pack_a_corrected.js | 1 | ExplanationWrongC | 13 | because the $1 excess rate applied to 3,375 actual hours gives $3,375 unfavor... |
| P1-C-055 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | because 70 fewer hours than allowed x $24 equals $1,680 favorable. |
| P1-C-056 | pack_a_corrected.js | 2 | ExplanationWrongC | 9 | because actual cost exceeded the flexible budget by $7,280. |
| P1-C-057 | pack_a_corrected.js | 1 | ExplanationWrongB | 7 | because $376,000 / $2,090,000 rounds to 18.0%. |
| P1-C-058 | pack_a_corrected.js | 1 | ExplanationWrongC | 7 | because $450,500 - $345,000 = $105,500 positive. |
| P1-C-059 | pack_a_corrected.js | 1 | ExplanationWrongA | 10 | because the flexible-budget contribution exceeds the static-budget contributi... |
| P1-C-061 | pack_a_corrected.js | 2 | ExplanationWrongB | 19 | because dual transfer pricing is designed to improve divisional incentives an... |
| P1-C-064 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because 7,940 pounds x $0.60 excess price equals $4,764 unfavorable. |
| P1-C-065 | pack_a_corrected.js | 1 | ExplanationWrongC | 11 | because 370 excess pounds x $6 standard price equals $2,220 unfavorable. |
| P1-C-066 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because the $1 unfavorable rate difference is applied to 3,675 actual hours. |
| P1-C-067 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because 82 fewer hours than allowed x $24 equals $1,968 favorable. |
| P1-C-068 | pack_a_corrected.js | 1 | ExplanationWrongC | 7 | because $114,500 - $106,260 = $8,240 unfavorable. |
| P1-C-069 | pack_a_corrected.js | 1 | ExplanationWrongA | 7 | because $412,000 / $2,330,000 rounds to 17.7%. |
| P1-C-070 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because residual income is $492,500 - $381,000 = $111,500 positive. |
| P1-C-071 | pack_a_corrected.js | 2 | ExplanationWrongC | 8 | because the volume effect increased contribution by $4,120. |
| P1-C-076 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because 8,660 pounds x $0.60 excess price equals $5,196 unfavorable. |
| P1-C-077 | pack_a_corrected.js | 1 | ExplanationWrongB | 12 | because 430 excess pounds x the $6 standard price equals $2,580 unfavorable. |
| P1-C-078 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | because 3,975 actual hours x the $1 excess actual rate = $3,975 unfavorable. |
| P1-C-079 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | because actual hours were 64 below standard, and 64 x $24 = $1,536 favorable. |
| P1-C-080 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because actual variable overhead exceeded the flexible budget by $9,200. |
| P1-C-081 | pack_a_corrected.js | 1 | ExplanationWrongA | 7 | because $448,000 / $2,570,000 rounds to 17.4%. |
| P1-C-082 | pack_a_corrected.js | 1 | ExplanationWrongA | 9 | because $534,500 - (12% x $3,475,000) = $117,500 positive. |
| P1-C-083 | pack_a_corrected.js | 1 | ExplanationWrongB | 7 | because $88,360 - $84,000 = $4,360 favorable. |
| P1-C-088 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because 9,380 pounds x $0.60 excess price equals $5,628 unfavorable. |
| P1-C-089 | pack_a_corrected.js | 1 | ExplanationWrongB | 12 | because 490 excess pounds x the $6 standard price equals $2,940 unfavorable. |
| P1-C-090 | pack_a_corrected.js | 1 | ExplanationWrongC | 12 | because the $1 unfavorable rate difference is applied to 4,275 actual hours. |
| P1-C-091 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because 76 fewer hours than allowed x $24 equals $1,824 favorable. |
| P1-C-092 | pack_a_corrected.js | 1 | ExplanationWrongC | 7 | because $126,500 - $116,340 = $10,160 unfavorable. |
| P1-C-093 | pack_a_corrected.js | 1 | ExplanationWrongB | 7 | because $484,000 / $2,810,000 rounds to 17.2%. |
| P1-C-094 | pack_a_corrected.js | 1 | ExplanationWrongD | 7 | because $576,500 - $453,000 = $123,500 positive. |
| P1-C-095 | pack_a_corrected.js | 2 | ExplanationWrongD | 10 | because the flexible budget exceeds the static budget by $4,600. |
| P1-C-097 | pack_a_corrected.js | 2 | ExplanationWrongB | 18 | because the selling division must recover both variable cost and the opportun... |
| P1-C-100 | pack_a_corrected.js | 1 | ExplanationWrongD | 10 | because 10,100 pounds x $0.60 excess price equals $6,060 unfavorable. |
| P1-D-001 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | Job order costing fits customized, make-to-order production where each job ha... |
| P1-D-004 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | $285,000 applied - $275,000 actual = $10,000 overapplied. |
| P1-D-007 | pack_a_corrected.js | 1 | ExplanationWrongC | 12 | 700 moves x ($90,000 / 4,500) = 700 x $20 = $14,000. |
| P1-D-009 | pack_a_corrected.js | 1 | ExplanationWrongA | 9 | The direct method is characterized by ignoring interservice-department services. |
| P1-D-021 | pack_a_corrected.js | 1 | ExplanationWrongB | 16 | because the predetermined rate of about $7.03 per MH applied to 123 MH gives ... |
| P1-D-022 | pack_a_corrected.js | 2 | ExplanationWrongB | 8 | because actual overhead exceeded applied overhead by $16,000. |
| P1-D-023 | pack_a_corrected.js | 1 | ExplanationWrongD | 13 | because 9,180 completed units + 836 equivalent units in ending WIP = 10,016. |
| P1-D-024 | pack_a_corrected.js | 1 | ExplanationWrongA | 13 | because $258,000 divided by 12,400 equivalent units rounds to $20.81 per equi... |
| P1-D-025 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because $316 per setup x 23 setups = $7,268. |
| P1-D-026 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | because $126 selling price - $34 target profit = $92 allowable target cost. |
| P1-D-027 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because 100 x 80% x 80% equals 64.0 average hours after two doublings. |
| P1-D-028 | pack_a_corrected.js | 1 | ExplanationWrongA | 15 | $500,000 / 20,000 MH = $25 per MH, and 6,000 MH x $25 = $150,000. |
| P1-D-031 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | because about $7.34 per MH x 153 MH = about $1,123. |
| P1-D-032 | pack_a_corrected.js | 2 | ExplanationWrongC | 8 | because actual overhead exceeded applied overhead by $21,000. |
| P1-D-033 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | because 9,780 completed units + 1,195 equivalent units in ending WIP = 10,975. |
| P1-D-034 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because $303,000 / 13,400 rounds to $22.61 per equivalent unit. |
| P1-D-035 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because 23 setups x about $344.44 per setup = about $7,922. |
| P1-D-036 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because $136 - $30 = $106 allowable target cost. |
| P1-D-037 | pack_a_corrected.js | 2 | ExplanationWrongA | 13 | because 100 x 80% x 80% equals 64.0 average hours after two doublings. |
| P1-D-038 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | $180,000 / 600 = $300 per batch; 45 batches x $300 = $13,500. |
| P1-D-041 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | because about $7.59 per MH x 183 MH = about $1,389. |
| P1-D-042 | pack_a_corrected.js | 2 | ExplanationWrongA | 8 | because actual overhead exceeded applied overhead by $26,000. |
| P1-D-043 | pack_a_corrected.js | 1 | ExplanationWrongD | 13 | because 10,380 completed units + 1,614 equivalent units in ending WIP = 11,994. |
| P1-D-044 | pack_a_corrected.js | 1 | ExplanationWrongA | 10 | because $348,000 divided by 14,400 equivalent units rounds to $24.17. |
| P1-D-045 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because 23 setups x about $368.97 per setup = about $8,486. |
| P1-D-046 | pack_a_corrected.js | 1 | ExplanationWrongB | 12 | because $126 selling price - $33 target profit = $93 allowable cost. |
| P1-D-047 | pack_a_corrected.js | 2 | ExplanationWrongA | 13 | because 100 x 80% x 80% equals 64.0 average hours after two doublings. |
| P1-D-048 | pack_a_corrected.js | 1 | ExplanationWrongC | 8 | 500 / 1,000 hours x $120,000 = $60,000. |
| P1-D-051 | pack_a_corrected.js | 1 | ExplanationWrongC | 11 | because 213 MH x about $7.80 per MH = about $1,661. |
| P1-D-052 | pack_a_corrected.js | 2 | ExplanationWrongD | 8 | because actual overhead exceeded applied overhead by $31,000. |
| P1-D-053 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | because 10,980 completed units + 1,196 equivalent units in ending WIP = 12,176. |
| P1-D-054 | pack_a_corrected.js | 1 | ExplanationWrongC | 10 | because $393,000 / 15,400 rounds to $25.52 per equivalent unit. |
| P1-D-055 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | because Product A used 23 setups at about $390.32 per setup. |
| P1-D-056 | pack_a_corrected.js | 1 | ExplanationWrongC | 13 | because $136 selling price - $29 target profit = $107 allowable target cost. |
| P1-D-057 | pack_a_corrected.js | 2 | ExplanationWrongA | 13 | because 100 x 80% x 80% equals 64.0 average hours after two doublings. |
| P1-D-058 | pack_a_corrected.js | 1 | ExplanationWrongB | 9 | because $15 per machine-hour x 3,000 machine-hours = $45,000. |
| P1-D-061 | pack_a_corrected.js | 1 | ExplanationWrongB | 11 | because the predetermined rate applied to 243 machine-hours gives about $1,937. |
| P1-D-062 | pack_a_corrected.js | 2 | ExplanationWrongD | 8 | because actual overhead exceeded applied overhead by $36,000. |
| P1-D-063 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | because 11,580 completed units + 1,645 equivalent units in ending WIP = 13,225. |
| P1-D-064 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because $438,000 divided by 16,400 equivalent units rounds to $26.71. |
| P1-D-065 | pack_a_corrected.js | 1 | ExplanationWrongB | 11 | because 23 setups x about $409.09 per setup = about $9,409. |
| P1-D-066 | pack_a_corrected.js | 1 | ExplanationWrongB | 13 | because $126 selling price - $32 target profit = $94 allowable target cost. |
| P1-D-067 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because 100 x 80% x 80% equals 64.0 average hours after two doublings. |
| P1-D-068 | pack_a_corrected.js | 1 | ExplanationWrongB | 9 | ABC overhead ($80,000) is $160,000 less than traditional ($240,000). |
| P1-D-071 | pack_a_corrected.js | 1 | ExplanationWrongD | 11 | because 273 MH x about $8.12 per MH = about $2,217. |
| P1-D-072 | pack_a_corrected.js | 2 | ExplanationWrongA | 8 | because actual overhead exceeded applied overhead by $41,000. |
| P1-D-073 | pack_a_corrected.js | 1 | ExplanationWrongC | 13 | because 12,180 completed units + 2,154 equivalent units in ending WIP = 14,334. |
| P1-D-074 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because $483,000 divided by 17,400 equivalent units rounds to $27.76. |
| P1-D-075 | pack_a_corrected.js | 1 | ExplanationWrongB | 11 | because 23 setups x about $425.71 per setup = about $9,791. |
| P1-E-036 | pack_a_corrected.js | 2 | ExplanationWrongB | 12 | because custody of cash should be separated from recording and reconciliation... |
| P1-E-037 | pack_a_corrected.js | 2 | ExplanationWrongA | 12 | because aggregate monitoring detects or prevents splitting purchases to evade... |
| P1-E-038 | pack_a_corrected.js | 1 | ExplanationWrongD | 13 | because system duplicate checks plus independent review address the duplicate... |
| P1-E-039 | pack_a_corrected.js | 1 | ExplanationWrongC | 12 | because HR termination records should be reconciled promptly to payroll maste... |
| P1-E-040 | pack_a_corrected.js | 2 | ExplanationWrongD | 10 | because recurring discrepancies should be investigated and control procedures... |
| P1-E-041 | pack_a_corrected.js | 2 | ExplanationWrongB | 9 | because access should be periodically recertified against current roles. |
| P1-E-042 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because recurring exceptions require root-cause analysis, remediation, and mo... |
| P1-E-043 | pack_a_corrected.js | 2 | ExplanationWrongC | 12 | because retained evidence supports testing of reviewer, timing, scope, and ex... |
| P1-E-044 | pack_a_corrected.js | 2 | ExplanationWrongB | 11 | because independence makes the reconciliation a useful check on cash records. |
| P1-E-045 | pack_a_corrected.js | 2 | ExplanationWrongB | 9 | because the three documents together support valid payment approval. |
| P1-E-049 | pack_a_corrected.js | 2 | ExplanationWrongD | 9 | because periodic recertification aligns access with current job responsibilit... |
| P1-E-051 | pack_a_corrected.js | 2 | ExplanationWrongB | 9 | because undocumented controls cannot be reliably tested or demonstrated. |
| P1-E-056 | pack_a_corrected.js | 2 | ExplanationWrongB | 11 | because custody plus counting creates concealment risk for shortages or theft. |
| P1-E-057 | pack_a_corrected.js | 2 | ExplanationWrongD | 32 | Encrypting sensitive data in transit protects data confidentiality during tra... |
| P1-E-060 | pack_a_corrected.js | 2 | ExplanationWrongB | 12 | because cash custody and recording the same cash receipts should be separated. |
| P1-E-061 | pack_a_corrected.js | 2 | ExplanationWrongB | 8 | because approval authority should increase with transaction risk. |
| P1-E-064 | pack_a_corrected.js | 1 | ExplanationWrongB | 12 | because the applicable threshold is $500 and the $650 variance exceeds it. |
| P1-E-067 | pack_a_corrected.js | 2 | ExplanationWrongB | 9 | because the log evidences who changed what and when. |
| P1-E-068 | pack_a_corrected.js | 2 | ExplanationWrongB | 8 | because active oversight compensates for limited staff segregation. |
| P1-E-069 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | because aggregate monitoring would detect repeated below-threshold purchases. |
| P1-E-072 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | because the pattern requires root-cause investigation and remediation. |
| P1-E-073 | pack_a_corrected.js | 2 | ExplanationWrongC | 19 | Periodic access recertification based on current job responsibilities ensures... |
| P1-E-075 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because control owners document gaps and support remediation while independen... |
| P1-F-001 | pack_a_corrected.js | 2 | ExplanationWrongA | 12 | because it describes integrated transaction processing across core business a... |
| P1-F-002 | pack_a_corrected.js | 1 | ExplanationWrongB | 9 | because EPM supports planning, consolidation, reporting, and performance-mana... |
| P1-F-003 | pack_a_corrected.js | 1 | ExplanationWrongD | 6 | because it describes end-to-end transaction traceability. |
| P1-F-004 | pack_a_corrected.js | 2 | ExplanationWrongB | 8 | because it defines governance over shared master records. |
| P1-F-005 | pack_a_corrected.js | 2 | ExplanationWrongA | 12 | because a data dictionary defines fields, formats, meanings, validation rules... |
| P1-F-006 | pack_a_corrected.js | 1 | ExplanationWrongA | 14 | because it covers the major life-cycle stages and the need for controls throu... |
| P1-F-007 | pack_a_corrected.js | 2 | ExplanationWrongB | 11 | because required records and fields are missing from the data feed. |
| P1-F-008 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because the issue is incorrect representation of approved customer attributes. |
| P1-F-009 | pack_a_corrected.js | 2 | ExplanationWrongD | 18 | Validity concerns whether values conform to allowed formats or ranges. The st... |
| P1-F-010 | pack_a_corrected.js | 2 | ExplanationWrongD | 11 | because it describes correcting or merging duplicate and inconsistent custome... |
| P1-F-011 | pack_a_corrected.js | 2 | ExplanationWrongC | 9 | because a primary key uniquely identifies each vendor record. |
| P1-F-012 | pack_a_corrected.js | 2 | ExplanationWrongC | 12 | because the invoice table is required to reference a valid customer record. |
| P1-F-013 | pack_a_corrected.js | 2 | ExplanationWrongC | 12 | because a data warehouse stores integrated historical data for reporting and ... |
| P1-F-014 | pack_a_corrected.js | 2 | ExplanationWrongA | 11 | because it describes reconciliation and rule checks across the ETL process. |
| P1-F-015 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because it describes dashboard monitoring and drilldown of relevant metrics. |
| P1-F-016 | pack_a_corrected.js | 2 | ExplanationWrongD | 11 | because an inconsistent or truncated axis can distort the apparent trend. |
| P1-F-017 | pack_a_corrected.js | 2 | ExplanationWrongC | 6 | because descriptive analytics summarizes what happened. |
| P1-F-018 | pack_a_corrected.js | 1 | ExplanationWrongB | 7 | because diagnostic analytics focuses on root-cause analysis. |
| P1-F-019 | pack_a_corrected.js | 2 | ExplanationWrongD | 10 | because predictive analytics estimates likely future results from data patterns. |
| P1-F-020 | pack_a_corrected.js | 2 | ExplanationWrongD | 9 | because prescriptive analytics recommends actions using objectives and constr... |
| P1-F-021 | pack_a_corrected.js | 2 | ExplanationWrongB | 7 | because classification assigns observations to predefined categories. |
| P1-F-022 | pack_a_corrected.js | 2 | ExplanationWrongC | 8 | because clustering groups similar observations without preassigned labels. |
| P1-F-023 | pack_a_corrected.js | 2 | ExplanationWrongB | 9 | because regression estimates relationships between an outcome and drivers. |
| P1-F-024 | pack_a_corrected.js | 1 | ExplanationWrongD | 12 | because it treats outliers as items for follow-up rather than automatic delet... |
| P1-F-025 | pack_a_corrected.js | 1 | ExplanationWrongD | 9 | because the support-contact sample may not represent all customers. |
| P1-F-026 | pack_a_corrected.js | 2 | ExplanationWrongA | 9 | because correlation by itself is not proof of causation. |
| P1-F-027 | pack_a_corrected.js | 1 | ExplanationWrongB | 8 | because it describes rule-based automation with exception handling. |
| P1-F-028 | pack_a_corrected.js | 2 | ExplanationWrongB | 7 | because it lists core model governance activities. |
| P1-F-029 | pack_a_corrected.js | 1 | ExplanationWrongA | 12 | because it distinguishes model-fitting data from validation data used to test... |
| P1-F-030 | pack_a_corrected.js | 1 | ExplanationWrongB | 15 | because blockchain supports a shared, tamper-resistant ledger but does not va... |
| P1-F-031 | pack_a_corrected.js | 2 | ExplanationWrongC | 14 | because cloud scalability benefits must be evaluated with vendor, security, a... |
| P1-F-032 | pack_a_corrected.js | 2 | ExplanationWrongC | 9 | because it identifies layered controls that reduce phishing risk. |
| P1-F-033 | pack_a_corrected.js | 2 | ExplanationWrongC | 8 | because MFA requires more than one authentication factor. |
| P1-F-034 | pack_a_corrected.js | 1 | ExplanationWrongD | 6 | because it states the least-privilege principle. |
| P1-F-035 | pack_a_corrected.js | 2 | ExplanationWrongC | 9 | because encryption can protect stored data and transmitted data. |
| P1-F-036 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because recovery objectives define acceptable data loss and downtime targets. |
| P1-F-037 | pack_a_corrected.js | 2 | ExplanationWrongB | 11 | because it identifies the core components of an incident response plan. |
| P1-F-038 | pack_a_corrected.js | 2 | ExplanationWrongA | 14 | because requirements should define business needs, controls, and user expecta... |
| P1-F-039 | pack_a_corrected.js | 2 | ExplanationWrongB | 9 | because predeployment testing verifies functionality, controls, interfaces, a... |
| P1-F-040 | pack_a_corrected.js | 2 | ExplanationWrongD | 11 | because it lists authorization, testing, approval, and controlled migration t... |
| P1-F-041 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because reconciliations verify complete and accurate data transfer between sy... |
| P1-F-042 | pack_a_corrected.js | 1 | ExplanationWrongB | 7 | because it identifies core API access-control activities. |
| P1-F-043 | pack_a_corrected.js | 2 | ExplanationWrongD | 14 | because it identifies version control, access restrictions, input checks, and... |
| P1-F-044 | pack_a_corrected.js | 2 | ExplanationWrongD | 12 | because it describes documenting the model, assumptions, and data used for an... |
| P1-F-045 | pack_a_corrected.js | 2 | ExplanationWrongC | 14 | because data minimization limits collection and retention to what is necessar... |
| P1-F-046 | pack_a_corrected.js | 2 | ExplanationWrongB | 11 | because legal hold requirements can override normal retention and disposal sc... |
| P1-F-047 | pack_a_corrected.js | 2 | ExplanationWrongC | 12 | because continuous auditing uses automated procedures to identify exceptions ... |
| P1-F-048 | pack_a_corrected.js | 2 | ExplanationWrongD | 13 | because it describes using event logs to analyze actual process flows and bot... |
| P1-F-049 | pack_a_corrected.js | 2 | ExplanationWrongA | 13 | because finance contributes controls, metrics, data requirements, and value t... |
| P1-F-050 | pack_a_corrected.js | 2 | ExplanationWrongB | 14 | because benefits tracking compares actual outcomes with expected process, cos... |
| P1-F-051 | pack_a_corrected.js | 2 | ExplanationWrongA | 12 | because KPI visuals should align with decision needs and avoid unnecessary co... |
| P1-F-052 | pack_a_corrected.js | 2 | ExplanationWrongB | 10 | because drilldown moves users from summary metrics to underlying details. |
| P1-F-053 | pack_a_corrected.js | 1 | ExplanationWrongA | 11 | because self-service BI needs governance over definitions, access, and data q... |
| P1-F-054 | pack_a_corrected.js | 2 | ExplanationWrongA | 11 | because lineage traces data from source through transformations to reporting ... |
| P1-F-055 | pack_a_corrected.js | 2 | ExplanationWrongD | 13 | because it identifies meaning, source, ownership, and usage rules as metadata... |
| P1-F-056 | pack_a_corrected.js | 2 | ExplanationWrongA | 17 | because RPA exceptions should be routed for human review rather than processe... |
| P1-F-057 | pack_a_corrected.js | 2 | ExplanationWrongB | 11 | because holdout data test model performance on observations excluded from tra... |
| P1-F-058 | pack_a_corrected.js | 2 | ExplanationWrongD | 14 | because bias monitoring checks whether outcomes are unfairly distorted by dat... |
| P1-F-059 | pack_a_corrected.js | 2 | ExplanationWrongA | 13 | because logs and SIEM tools support detection, correlation, and escalation of... |
| P1-F-060 | pack_a_corrected.js | 2 | ExplanationWrongA | 11 | because vendor cyber risk management evaluates outsourced system and data con... |
| P1-F-061 | pack_a_corrected.js | 1 | ExplanationWrongA | 10 | because SOC reports can provide assurance about relevant service-organization... |
| P1-F-062 | pack_a_corrected.js | 2 | ExplanationWrongB | 12 | because mobile device management can enforce encryption, remote wipe, and acc... |
| P1-F-063 | pack_a_corrected.js | 2 | ExplanationWrongC | 14 | because ERP roles should prevent incompatible duties such as vendor setup and... |
| P1-F-064 | pack_a_corrected.js | 1 | ExplanationWrongD | 14 | because role-based access grants permissions by job role rather than ad hoc i... |
| P1-F-065 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because weak passwords increase access risk and should be paired with stronge... |
| P1-F-066 | pack_a_corrected.js | 2 | ExplanationWrongC | 8 | because timely tested deployment reduces known vulnerability exposure. |
| P1-F-067 | pack_a_corrected.js | 2 | ExplanationWrongC | 10 | because vulnerability scans identify weaknesses that require prioritization a... |
| P1-F-068 | pack_a_corrected.js | 2 | ExplanationWrongD | 11 | because business continuity planning defines how critical processes continue ... |
| P1-F-069 | pack_a_corrected.js | 1 | ExplanationWrongB | 10 | because real-time analytics supports rapid monitoring when timely action matt... |
| P1-F-070 | pack_a_corrected.js | 2 | ExplanationWrongB | 14 | because unmanaged data lakes can become unusable data swamps without governan... |
| P1-F-071 | pack_a_corrected.js | 1 | ExplanationWrongB | 14 | because unstructured data analysis extracts insight from text, images, audio,... |
| P1-F-072 | pack_a_corrected.js | 2 | ExplanationWrongD | 13 | because NLP can analyze text such as service notes, contracts, or customer co... |
| P1-F-073 | pack_a_corrected.js | 1 | ExplanationWrongA | 10 | because OCR converts scanned or image-based documents into machine-readable t... |
| P1-F-074 | pack_a_corrected.js | 2 | ExplanationWrongC | 11 | because workflow automation routes approvals and captures evidence according ... |
| P1-F-075 | pack_a_corrected.js | 2 | ExplanationWrongB | 13 | because electronic records retention should follow policy, legal requirements... |
| P1-AC-011 | pack_c_corrected.js | 2 | ExplanationWrongC | 21 | The equity method is used for 20% to 50% ownership with significant influence... |
| P1-AC-012 | pack_c_corrected.js | 2 | ExplanationWrongD | 15 | because 30% ownership with significant influence calls for the equity method ... |
| P1-AC-013 | pack_c_corrected.js | 2 | ExplanationWrongA | 20 | At 30% ownership with significant influence, the equity method is required to... |
| P1-AC-014 | pack_c_corrected.js | 2 | ExplanationWrongB | 21 | With 30% ownership and significant influence, the equity method is the approp... |
| P1-AC-015 | pack_c_corrected.js | 1 | ExplanationWrongC | 11 | because significant influence at a 30% voting interest requires equity-method... |
| P1-AC-026 | pack_c_corrected.js | 1 | ExplanationWrongB | 7 | ($340,000 - $40,000) / 100,000 = $3.00. |
| P1-AC-027 | pack_c_corrected.js | 1 | ExplanationWrongC | 11 | 120,000 + (36,000 x 8/12) - (12,000 x 2/12) = 142,000. |
| P1-AC-028 | pack_c_corrected.js | 1 | ExplanationWrongD | 7 | $620,000 + $48,000 - $61,000 = $607,000. |
| P1-AC-029 | pack_c_corrected.js | 1 | ExplanationWrongA | 7 | $430,000 + $22,000 + $14,000 = $466,000. |
| P1-AC-030 | pack_c_corrected.js | 1 | ExplanationWrongB | 18 | first 400 units from beginning inventory at $15 plus next 450 units from the ... |
| P1-BC-001 | pack_c_corrected.js | 1 | ExplanationWrongA | 13 | because a flexible budget adjusts the budget to the actual 11,500-unit activi... |
| P1-BC-002 | pack_c_corrected.js | 2 | ExplanationWrongB | 37 | A flexible budget is recalculated at the actual level of activity, allowing m... |
| P1-BC-003 | pack_c_corrected.js | 2 | ExplanationWrongC | 37 | A flexible budget is recalculated at the actual level of activity, allowing m... |
| P1-BC-004 | pack_c_corrected.js | 2 | ExplanationWrongD | 37 | A flexible budget is recalculated at the actual level of activity, allowing m... |
| P1-BC-005 | pack_c_corrected.js | 2 | ExplanationWrongA | 37 | A flexible budget is recalculated at the actual level of activity, allowing m... |
| P1-BC-006 | pack_c_corrected.js | 2 | ExplanationWrongB | 37 | A flexible budget is recalculated at the actual level of activity, allowing m... |
| P1-BC-007 | pack_c_corrected.js | 2 | ExplanationWrongC | 37 | A flexible budget is recalculated at the actual level of activity, allowing m... |
| P1-BC-015 | pack_c_corrected.js | 2 | ExplanationWrongC | 15 | because adding a new month as each old month drops off is a rolling forecast. |
| P1-BC-016 | pack_c_corrected.js | 2 | ExplanationWrongD | 15 | because the forecast rolls forward by adding a new month and dropping the old... |
| P1-BC-017 | pack_c_corrected.js | 1 | ExplanationWrongA | 13 | because the monthly add/drop process is the defining feature of a rolling for... |
| P1-BC-018 | pack_c_corrected.js | 2 | ExplanationWrongB | 36 | A rolling (continuous) forecast extends the planning horizon by adding a new ... |
| P1-BC-019 | pack_c_corrected.js | 2 | ExplanationWrongC | 36 | A rolling (continuous) forecast extends the planning horizon by adding a new ... |
| P1-BC-020 | pack_c_corrected.js | 2 | ExplanationWrongD | 36 | A rolling (continuous) forecast extends the planning horizon by adding a new ... |
| P1-BC-021 | pack_c_corrected.js | 2 | ExplanationWrongA | 36 | A rolling (continuous) forecast extends the planning horizon by adding a new ... |
| P1-BC-041 | pack_c_corrected.js | 1 | ExplanationWrongA | 18 | Required production = Budgeted sales (40,000) + Desired ending inventory (5,0... |
| P1-BC-042 | pack_c_corrected.js | 1 | ExplanationWrongB | 18 | Required production = Budgeted sales (40,000) + Desired ending inventory (5,0... |
| P1-BC-043 | pack_c_corrected.js | 1 | ExplanationWrongC | 18 | Required production = Budgeted sales (40,000) + Desired ending inventory (5,0... |
| P1-BC-044 | pack_c_corrected.js | 1 | ExplanationWrongD | 18 | Required production = Budgeted sales (40,000) + Desired ending inventory (5,0... |
| P1-BC-045 | pack_c_corrected.js | 1 | ExplanationWrongA | 18 | Required production = Budgeted sales (40,000) + Desired ending inventory (5,0... |
| P1-BC-046 | pack_c_corrected.js | 1 | ExplanationWrongB | 18 | Required production = Budgeted sales (40,000) + Desired ending inventory (5,0... |
| P1-BC-065 | pack_c_corrected.js | 2 | ExplanationWrongA | 52 | Variable cost per machine hour = (High cost - Low cost) / (High activity - Lo... |
| P1-BC-066 | pack_c_corrected.js | 2 | ExplanationWrongB | 52 | Variable cost per machine hour = (High cost - Low cost) / (High activity - Lo... |
| P1-BC-067 | pack_c_corrected.js | 2 | ExplanationWrongC | 52 | Variable cost per machine hour = (High cost - Low cost) / (High activity - Lo... |
| P1-BC-068 | pack_c_corrected.js | 1 | ExplanationWrongD | 15 | because the $15,000 cost change divided by the 3,000-hour activity change equ... |
| P1-BC-069 | pack_c_corrected.js | 1 | ExplanationWrongA | 17 | because the high-low variable cost rate is $15,000 divided by 3,000 machine h... |
| P1-BC-070 | pack_c_corrected.js | 2 | ExplanationWrongB | 52 | Variable cost per machine hour = (High cost - Low cost) / (High activity - Lo... |
| P1-CC-015 | pack_c_corrected.js | 1 | ExplanationWrongC | 16 | RI = $450,000 - $300,000 = $150,000 means the division earned $150,000 above ... |
| P1-CC-016 | pack_c_corrected.js | 1 | ExplanationWrongD | 26 | Residual income = Operating income - (Required rate of return x Average opera... |
| P1-CC-017 | pack_c_corrected.js | 1 | ExplanationWrongA | 26 | Residual income = Operating income - (Required rate of return x Average opera... |
| P1-CC-018 | pack_c_corrected.js | 1 | ExplanationWrongB | 26 | Residual income = Operating income - (Required rate of return x Average opera... |
| P1-CC-019 | pack_c_corrected.js | 1 | ExplanationWrongC | 26 | Residual income = Operating income - (Required rate of return x Average opera... |
| P1-CC-020 | pack_c_corrected.js | 1 | ExplanationWrongD | 26 | Residual income = Operating income - (Required rate of return x Average opera... |
| P1-CC-021 | pack_c_corrected.js | 1 | ExplanationWrongA | 8 | because 450,000 - (10% x 3,000,000) equals 150,000. |
| P1-CC-053 | pack_c_corrected.js | 2 | ExplanationWrongA | 13 | because selling below the budgeted price creates a $25,200 unfavorable sales ... |
| P1-CC-054 | pack_c_corrected.js | 1 | ExplanationWrongB | 12 | because the actual selling price exceeded budget by $3 on 6,200 units. |
| P1-CC-055 | pack_c_corrected.js | 1 | ExplanationWrongC | 10 | because the $1.50 shortfall applies to 14,000 actual units sold. |
| P1-CC-056 | pack_c_corrected.js | 2 | ExplanationWrongD | 38 | Sales price variance = (Actual price - Budgeted price) x Actual units = ($23 ... |
| P1-CC-057 | pack_c_corrected.js | 2 | ExplanationWrongA | 38 | Sales price variance = (Actual price - Budgeted price) x Actual units = ($23 ... |
| P1-CC-058 | pack_c_corrected.js | 2 | ExplanationWrongB | 17 | because the actual selling price was 2 below budget on 12,000 units, creating... |
| P1-CC-059 | pack_c_corrected.js | 1 | ExplanationWrongC | 8 | (50,000 - 46,000) x $6 = $24,000 unfavorable. |
| P1-CC-060 | pack_c_corrected.js | 1 | ExplanationWrongD | 8 | (66,000 - 60,000) x $8 = $48,000 favorable. |
| P1-CC-061 | pack_c_corrected.js | 1 | ExplanationWrongA | 8 | (90,000 - 84,000) x $8 = $48,000 unfavorable. |
| P1-CC-062 | pack_c_corrected.js | 1 | ExplanationWrongB | 8 | (50,000 - 45,000) x $8 = $40,000 favorable. |
| P1-DC-011 | pack_c_corrected.js | 1 | ExplanationWrongC | 13 | $96,000 / 240 = $400 per setup; 18 setups x $400 = $7,200. |
| P1-DC-012 | pack_c_corrected.js | 1 | ExplanationWrongD | 7 | 50,000 / 100,000 x $150,000 = $75,000. |
| P1-DC-013 | pack_c_corrected.js | 1 | ExplanationWrongA | 7 | ($250,000 / $400,000) x $200,000 = $125,000. |
| P1-DC-014 | pack_c_corrected.js | 1 | ExplanationWrongB | 13 | ($120,000 / 20,000 MH) x 12,000 MH = $6 x 12,000 = $72,000. |
| P1-DC-015 | pack_c_corrected.js | 1 | ExplanationWrongC | 13 | $75,000 / 3,000 = $25 per ticket; 420 tickets x $25 = $10,500. |
| P1-DC-021 | pack_c_corrected.js | 1 | ExplanationWrongA | 12 | because fixed manufacturing overhead is deducted after contribution margin in... |
| P1-DC-022 | pack_c_corrected.js | 2 | ExplanationWrongB | 16 | because variable costing expenses the full $96,000 rather than attaching part... |
| P1-DC-023 | pack_c_corrected.js | 2 | ExplanationWrongC | 8 | because variable costing expenses fixed manufacturing overhead immediately. |
| P1-DC-024 | pack_c_corrected.js | 2 | ExplanationWrongD | 12 | because absorption costing defers $21,000 of fixed manufacturing overhead in ... |
| P1-DC-025 | pack_c_corrected.js | 1 | ExplanationWrongA | 17 | because selling 3,000 more units than produced releases $15,000 of fixed over... |
| P1-DC-066 | pack_c_corrected.js | 1 | ExplanationWrongB | 9 | because $252,000 / ($84 - $56) = 9,000 units. |
| P1-DC-067 | pack_c_corrected.js | 1 | ExplanationWrongC | 9 | because ($384,000 + $96,000) / $48 = 10,000 units. |
| P1-DC-068 | pack_c_corrected.js | 1 | ExplanationWrongD | 8 | because $240,000 / 40% = $600,000 of sales. |
| P1-DC-069 | pack_c_corrected.js | 2 | ExplanationWrongA | 14 | because both variable manufacturing and variable selling costs are deducted f... |
| P1-DC-070 | pack_c_corrected.js | 1 | ExplanationWrongB | 11 | because $304,000 divided by the $38 contribution margin equals 8,000 contracts. |
| P1-EC-004 | pack_c_corrected.js | 2 | ExplanationWrongD | 12 | because the duties are split among different employees to reduce concealment ... |
| P1-EC-008 | pack_c_corrected.js | 1 | ExplanationWrongD | 9 | because COSO is the five-component internal-control framework tested here. |
| P1-EC-014 | pack_c_corrected.js | 1 | ExplanationWrongB | 10 | because pressure, opportunity, and rationalization are the three fraud-triang... |
| P1-EC-017 | pack_c_corrected.js | 2 | ExplanationWrongA | 13 | because the locked warehouse and badge restriction directly limit physical ac... |
| P1-EC-020 | pack_c_corrected.js | 2 | ExplanationWrongD | 9 | because the control restricts physical access to inventory assets. |
| P1-EC-021 | pack_c_corrected.js | 2 | ExplanationWrongA | 21 | because segregating vendor-setup approval from payment duties prevents an emp... |
| P1-EC-022 | pack_c_corrected.js | 1 | ExplanationWrongB | 15 | because system-imposed validation blocks duplicate payments before cash is di... |
| P1-EC-023 | pack_c_corrected.js | 2 | ExplanationWrongC | 17 | because automated revocation closes the timing gap, and periodic recertificat... |
| P1-EC-024 | pack_c_corrected.js | 2 | ExplanationWrongD | 20 | because real-time input validation prevents incorrect or incomplete data from... |
| P1-EC-025 | pack_c_corrected.js | 2 | ExplanationWrongA | 12 | because the approval occurs before payment and can block an unauthorized disb... |
| P1-EC-028 | pack_c_corrected.js | 2 | ExplanationWrongD | 8 | because independence helps the reconciliation detect discrepancies objectively. |
| P1-EC-040 | pack_c_corrected.js | 2 | ExplanationWrongD | 10 | because periodic access review is an ITGC over logical access. |
| P1-EC-041 | pack_c_corrected.js | 2 | ExplanationWrongA | 9 | because the CEO is bypassing an established approval control. |
| P1-EC-049 | pack_c_corrected.js | 2 | ExplanationWrongA | 16 | because the hotline encourages reporting of suspected fraud or ethical violat... |
| P1-EC-052 | pack_c_corrected.js | 2 | ExplanationWrongD | 10 | because direct management oversight can partly compensate for limited segrega... |
| P1-EC-060 | pack_c_corrected.js | 2 | ExplanationWrongD | 16 | because board and executive emphasis on integrity is the control environment,... |
| P1-EC-061 | pack_c_corrected.js | 2 | ExplanationWrongA | 9 | because the risk is assessed before considering any controls. |
| P1-EC-066 | pack_c_corrected.js | 2 | ExplanationWrongB | 12 | because custody and recordkeeping over the same cash receipts should be separ... |
| P1-EC-072 | pack_c_corrected.js | 2 | ExplanationWrongD | 10 | because ownership, corrective action, and deadline tracking support verified ... |
| P1-FC-004 | pack_c_corrected.js | 2 | ExplanationWrongD | 11 | because ownership, definitions, quality standards, and accountability are dat... |
| P1-FC-006 | pack_c_corrected.js | 2 | ExplanationWrongB | 10 | because the model uses data to predict future customer churn. |
| P1-FC-007 | pack_c_corrected.js | 2 | ExplanationWrongC | 18 | Predictive analytics forecasts future outcomes using historical data and mode... |
| P1-FC-009 | pack_c_corrected.js | 2 | ExplanationWrongA | 21 | Forecasting future customer churn is a predictive analytics task because it e... |
| P1-FC-011 | pack_c_corrected.js | 1 | ExplanationWrongC | 7 | because RPA automates structured, rules-based manual tasks. |
| P1-FC-012 | pack_c_corrected.js | 2 | ExplanationWrongD | 21 | RPA is specifically designed to automate repetitive, rules-based tasks such a... |
| P1-FC-014 | pack_c_corrected.js | 2 | ExplanationWrongB | 21 | RPA is specifically designed to automate repetitive, rules-based tasks such a... |
| P1-FC-018 | pack_c_corrected.js | 2 | ExplanationWrongB | 10 | because the provider supplies infrastructure while the customer manages appli... |
| P1-FC-019 | pack_c_corrected.js | 2 | ExplanationWrongC | 18 | IaaS provides fundamental compute, storage, and networking resources while th... |
| P1-FC-020 | pack_c_corrected.js | 2 | ExplanationWrongD | 16 | IaaS provides the fundamental computing resources, and the customer manages t... |
| P1-FC-021 | pack_c_corrected.js | 1 | ExplanationWrongA | 9 | because dashboards should make relevant information understandable and decisi... |
| P1-FC-027 | pack_c_corrected.js | 2 | ExplanationWrongC | 10 | because the three objectives stated are confidentiality, integrity, and avail... |
| P1-FC-028 | pack_c_corrected.js | 2 | ExplanationWrongD | 21 | The CIA triad directly maps to the three security objectives described: unaut... |
| P1-FC-031 | pack_c_corrected.js | 2 | ExplanationWrongC | 9 | because the facts show volume, velocity, and variety together. |
| P1-FC-032 | pack_c_corrected.js | 2 | ExplanationWrongD | 23 | The stem explicitly references massive amounts (volume), continuous arrival (... |
| P1-FC-034 | pack_c_corrected.js | 2 | ExplanationWrongB | 18 | Volume, velocity, and variety collectively describe the scale, speed, and div... |
| P1-FC-038 | pack_c_corrected.js | 2 | ExplanationWrongB | 11 | because the technique uncovers unknown purchasing patterns in large transacti... |
| P1-FC-043 | pack_c_corrected.js | 1 | ExplanationWrongC | 9 | because distributed, hard-to-alter records are a key blockchain characteristic. |
| P1-FC-044 | pack_c_corrected.js | 1 | ExplanationWrongD | 15 | Blockchain's decentralized, distributed ledger with consensus-based validatio... |
| P1-FC-046 | pack_c_corrected.js | 1 | ExplanationWrongB | 9 | because correctness, completeness, and cross-system consistency are data-qual... |
| P1-FC-051 | pack_c_corrected.js | 2 | ExplanationWrongC | 12 | because the system improves from data without explicit reprogramming for each... |
| P1-FC-056 | pack_c_corrected.js | 2 | ExplanationWrongD | 8 | because deceptive emails seeking login credentials are phishing. |
| P1-FC-059 | pack_c_corrected.js | 2 | ExplanationWrongC | 21 | Phishing attacks use deceptive communications to exploit human psychology, ma... |
| P1-FC-061 | pack_c_corrected.js | 1 | ExplanationWrongA | 10 | because integration improves consistency and real-time visibility across busi... |
| P1-FC-066 | pack_c_corrected.js | 2 | ExplanationWrongB | 9 | because the repository stores raw, unstructured data before transformation. |
| P1-FC-074 | pack_c_corrected.js | 2 | ExplanationWrongB | 9 | because automated ongoing monitoring of transactions is continuous auditing. |
| P1-AD-056 | pack_d_corrected.js | 1 | ExplanationWrongD | 9 | ($54,000 - $6,000) / 8 x 9/12 = $4,500. |
| P1-BD-022 | pack_d_corrected.js | 1 | ExplanationWrongB | 28 | Total budgeted direct labor cost = Units to produce × Direct labor hours per ... |
| P1-BD-023 | pack_d_corrected.js | 1 | ExplanationWrongC | 28 | Total budgeted direct labor cost = Units to produce × Direct labor hours per ... |
| P1-BD-024 | pack_d_corrected.js | 1 | ExplanationWrongD | 28 | Total budgeted direct labor cost = Units to produce × Direct labor hours per ... |
| P1-BD-025 | pack_d_corrected.js | 1 | ExplanationWrongA | 28 | Total budgeted direct labor cost = Units to produce × Direct labor hours per ... |
| P1-BD-026 | pack_d_corrected.js | 1 | ExplanationWrongB | 12 | because 8,000 units x 2 hours x $18 per hour equals $288,000. |
| P1-BD-027 | pack_d_corrected.js | 1 | ExplanationWrongC | 11 | because 16,000 budgeted labor hours at $18 per hour equals $288,000. |
| P1-BD-028 | pack_d_corrected.js | 1 | ExplanationWrongD | 28 | Total budgeted direct labor cost = Units to produce × Direct labor hours per ... |
| P1-BD-050 | pack_d_corrected.js | 1 | ExplanationWrongB | 19 | Materials to purchase = Production needs (25,000) + Desired ending inventory ... |
| P1-BD-051 | pack_d_corrected.js | 1 | ExplanationWrongC | 19 | Materials to purchase = Production needs (25,000) + Desired ending inventory ... |
| P1-BD-052 | pack_d_corrected.js | 2 | ExplanationWrongD | 16 | because 25,000 production pounds plus 4,000 desired ending pounds less 3,000 ... |
| P1-BD-053 | pack_d_corrected.js | 2 | ExplanationWrongA | 12 | because the purchases budget adds desired ending inventory and subtracts begi... |
| P1-BD-054 | pack_d_corrected.js | 1 | ExplanationWrongB | 9 | because 25,000 + 4,000 - 3,000 equals 26,000 pounds. |
| P1-BD-055 | pack_d_corrected.js | 1 | ExplanationWrongC | 19 | Materials to purchase = Production needs (25,000) + Desired ending inventory ... |
| P1-BD-056 | pack_d_corrected.js | 1 | ExplanationWrongD | 19 | Materials to purchase = Production needs (25,000) + Desired ending inventory ... |
| P1-BD-077 | pack_d_corrected.js | 2 | ExplanationWrongA | 6 | the three activity costs total $64,200. |
| P1-BD-078 | pack_d_corrected.js | 1 | ExplanationWrongB | 8 | 36,000 + 4,500 - 3,200 = 37,300 pounds. |
| P1-BD-079 | pack_d_corrected.js | 1 | ExplanationWrongC | 7 | $42,000 + ($6 x 8,500) = $93,000. |
| P1-BD-080 | pack_d_corrected.js | 1 | ExplanationWrongD | 6 | the probability-weighted demand is 10,250 units. |
| P1-BD-081 | pack_d_corrected.js | 1 | ExplanationWrongA | 15 | cash before financing is $7,000, so $8,000 must be borrowed to reach the $15,... |
| P1-BD-089 | pack_d_corrected.js | 1 | ExplanationWrongA | 26 | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) +... |
| P1-BD-090 | pack_d_corrected.js | 1 | ExplanationWrongB | 26 | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) +... |
| P1-BD-091 | pack_d_corrected.js | 1 | ExplanationWrongC | 26 | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) +... |
| P1-BD-092 | pack_d_corrected.js | 1 | ExplanationWrongD | 26 | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) +... |
| P1-BD-093 | pack_d_corrected.js | 1 | ExplanationWrongA | 26 | June collections = 60% of June sales + 40% of May sales = (0.60 × $200,000) +... |
| P1-BD-094 | pack_d_corrected.js | 2 | ExplanationWrongB | 14 | because 120,000 collected from June sales plus 60,000 collected from May sale... |
| P1-CD-001 | pack_d_corrected.js | 1 | ExplanationWrongA | 13 | The labor rate variance is 2,100 × ($19 - $18) = $2,100 Unfavorable. |
| P1-CD-002 | pack_d_corrected.js | 2 | ExplanationWrongB | 13 | because 2,100 actual hours x the 1 unfavorable rate difference equals 2,100 u... |
| P1-CD-003 | pack_d_corrected.js | 2 | ExplanationWrongC | 38 | Labor rate variance = Actual hours x (Actual rate - Standard rate) = 2,100 x ... |
| P1-CD-004 | pack_d_corrected.js | 2 | ExplanationWrongD | 38 | Labor rate variance = Actual hours x (Actual rate - Standard rate) = 2,100 x ... |
| P1-CD-005 | pack_d_corrected.js | 2 | ExplanationWrongA | 38 | Labor rate variance = Actual hours x (Actual rate - Standard rate) = 2,100 x ... |
| P1-CD-006 | pack_d_corrected.js | 2 | ExplanationWrongB | 38 | Labor rate variance = Actual hours x (Actual rate - Standard rate) = 2,100 x ... |
| P1-CD-007 | pack_d_corrected.js | 2 | ExplanationWrongC | 38 | Labor rate variance = Actual hours x (Actual rate - Standard rate) = 2,100 x ... |
| P1-CD-015 | pack_d_corrected.js | 2 | ExplanationWrongC | 11 | because the variance is caused by a shift in product proportions. |
| P1-CD-016 | pack_d_corrected.js | 2 | ExplanationWrongD | 10 | because the issue is the changed proportion of products sold. |
| P1-CD-017 | pack_d_corrected.js | 2 | ExplanationWrongA | 12 | because the facts point to changed product proportions, not changed total units. |
| P1-CD-018 | pack_d_corrected.js | 2 | ExplanationWrongB | 10 | the contribution effect of the mix shift is $8,000 favorable. |
| P1-CD-019 | pack_d_corrected.js | 2 | ExplanationWrongC | 7 | the net contribution effect is $16,000 unfavorable. |
| P1-CD-020 | pack_d_corrected.js | 2 | ExplanationWrongD | 10 | the net effect of the mix shift is $12,000 favorable. |
| P1-CD-021 | pack_d_corrected.js | 1 | ExplanationWrongA | 11 | the shift from Premium to lower-margin Standard reduced contribution by $18,000. |
| P1-DD-001 | pack_d_corrected.js | 2 | ExplanationWrongA | 17 | because normal costing applies overhead using a predetermined budget-based ra... |
| P1-DD-002 | pack_d_corrected.js | 2 | ExplanationWrongB | 12 | because the predetermined overhead rate is the key feature of normal costing. |
| P1-DD-003 | pack_d_corrected.js | 2 | ExplanationWrongC | 16 | because normal costing applies overhead using a predetermined rate and reconc... |
| P1-DD-004 | pack_d_corrected.js | 1 | ExplanationWrongD | 11 | because the stem describes predetermined overhead application followed by act... |
| P1-DD-008 | pack_d_corrected.js | 1 | ExplanationWrongD | 14 | because FIFO keeps beginning WIP costs separate when computing current-period... |
| P1-DD-010 | pack_d_corrected.js | 1 | ExplanationWrongB | 13 | because FIFO keeps beginning WIP costs separate from current-period costs in ... |
| P1-DD-018 | pack_d_corrected.js | 1 | ExplanationWrongB | 12 | because step-down allocation is sequential and only partially recognizes reci... |
| P1-DD-019 | pack_d_corrected.js | 1 | ExplanationWrongC | 12 | because the step-down method is sequential and only partially recognizes reci... |
| P1-DD-020 | pack_d_corrected.js | 1 | ExplanationWrongD | 11 | because step-down allocation is sequential and recognizes only some reciproca... |
| P1-DD-021 | pack_d_corrected.js | 1 | ExplanationWrongA | 10 | because the number of customer orders directly drives order-processing work. |
| P1-DD-023 | pack_d_corrected.js | 1 | ExplanationWrongC | 13 | $144,000 / 1,800 = $80 per order; 260 orders x $80 = $20,800. |
| P1-DD-025 | pack_d_corrected.js | 1 | ExplanationWrongA | 10 | because customer orders processed match the cause of order-processing costs. |
| P1-DD-026 | pack_d_corrected.js | 1 | ExplanationWrongB | 8 | because expected sales exceed break-even sales by $230,000. |
| P1-DD-027 | pack_d_corrected.js | 1 | ExplanationWrongC | 11 | because 24,000 budgeted units minus 18,500 break-even units equals 5,500 units. |
| P1-DD-028 | pack_d_corrected.js | 2 | ExplanationWrongD | 6 | because margin of safety is $150,000. |
| P1-DD-029 | pack_d_corrected.js | 1 | ExplanationWrongA | 6 | because $500,000 - $350,000 = $150,000. |
| P1-DD-030 | pack_d_corrected.js | 1 | ExplanationWrongB | 10 | because the $375,000 safety margin is 30.0% of expected sales. |
| P1-DD-031 | pack_d_corrected.js | 1 | ExplanationWrongC | 13 | because shifting toward fixed costs makes operating income more sensitive to ... |
| P1-DD-033 | pack_d_corrected.js | 1 | ExplanationWrongA | 11 | because higher fixed costs make profit more sensitive to sales-volume changes. |
| P1-DD-034 | pack_d_corrected.js | 1 | ExplanationWrongB | 6 | because 4.0 x 6% = 24%. |
| P1-DD-044 | pack_d_corrected.js | 2 | ExplanationWrongD | 9 | because the cost has both fixed and variable components. |
| P1-DD-051 | pack_d_corrected.js | 2 | ExplanationWrongC | 14 | because the requested format separates variable costs from fixed costs for in... |
| P1-DD-052 | pack_d_corrected.js | 1 | ExplanationWrongD | 14 | because contribution margin format separates variable and fixed costs for CVP... |
| P1-DD-053 | pack_d_corrected.js | 1 | ExplanationWrongA | 12 | because both variable manufacturing and variable selling/admin costs are dedu... |
| P1-DD-054 | pack_d_corrected.js | 2 | ExplanationWrongB | 16 | because all variable costs are deducted before contribution margin and all fi... |
| P1-DD-055 | pack_d_corrected.js | 2 | ExplanationWrongC | 8 | because it separates variable costs from fixed costs. |
| P1-DD-056 | pack_d_corrected.js | 1 | ExplanationWrongD | 13 | (170 x $600) + (1,100 x $50) = $102,000 + $55,000 = $157,000. |
| P1-DD-057 | pack_d_corrected.js | 1 | ExplanationWrongA | 11 | $8,000 of machining cost plus $7,200 of setup cost = $15,200. |
| P1-DD-058 | pack_d_corrected.js | 1 | ExplanationWrongB | 11 | (210 - 90) inspection hours x $50 per hour = $6,000. |
| P1-DD-059 | pack_d_corrected.js | 1 | ExplanationWrongC | 9 | $240,000 budgeted - (11,000 x $20) = $20,000 unfavorable. |
| P1-DD-060 | pack_d_corrected.js | 1 | ExplanationWrongD | 10 | (3,000 - 3,200) x $8.00 = -$1,600 = $1,600 unfavorable. |
| P1-DD-066 | pack_d_corrected.js | 1 | ExplanationWrongB | 9 | ($5.00 - $4.90) x 10,000 lbs = $1,000 favorable. |
| P1-DD-067 | pack_d_corrected.js | 1 | ExplanationWrongC | 10 | (3,200 - 3,400) x $3.00 = -$600 = $600 unfavorable. |
| P1-DD-068 | pack_d_corrected.js | 1 | ExplanationWrongD | 10 | ($20.00 - $22.00) x 1,500 = -$3,000 = $3,000 unfavorable. |
| P1-DD-069 | pack_d_corrected.js | 1 | ExplanationWrongA | 10 | (1,200 - 1,300) x $15 = -$1,500 = $1,500 unfavorable. |
| P1-DD-070 | pack_d_corrected.js | 1 | ExplanationWrongB | 12 | $18,500 actual - (2,000 DLH x $10.00) = -$1,500 = $1,500 favorable. |
| P1-ED-001 | pack_d_corrected.js | 1 | ExplanationWrongA | 12 | because the stem separates first-line operations, second-line risk/compliance... |
| P1-ED-010 | pack_d_corrected.js | 2 | ExplanationWrongB | 13 | because access is limited to what each employee needs to perform assigned dut... |
| P1-ED-014 | pack_d_corrected.js | 2 | ExplanationWrongB | 9 | because a supervisor independently checks inventory counted by others. |
| P1-ED-025 | pack_d_corrected.js | 2 | ExplanationWrongA | 10 | because approval before order placement authorizes the transaction in advance. |
| P1-ED-028 | pack_d_corrected.js | 2 | ExplanationWrongD | 10 | because ongoing reviews of exceptions and reconciliations are monitoring acti... |
| P1-ED-035 | pack_d_corrected.js | 2 | ExplanationWrongC | 9 | because backups and recovery planning support availability after disruption. |
| P1-ED-042 | pack_d_corrected.js | 2 | ExplanationWrongB | 8 | because likelihood and impact scoring is risk assessment. |
| P1-ED-058 | pack_d_corrected.js | 2 | ExplanationWrongB | 14 | because management is weighing control cost against expected benefit for a lo... |
| P1-ED-064 | pack_d_corrected.js | 1 | ExplanationWrongD | 10 | because vendor-master restrictions reduce fictitious vendor and unauthorized ... |
| P1-ED-066 | pack_d_corrected.js | 2 | ExplanationWrongB | 10 | because the committee provides independent oversight of reporting and controls. |
| P1-ED-071 | pack_d_corrected.js | 2 | ExplanationWrongC | 19 | because a change management process ensures that all production changes are a... |
| P1-ED-072 | pack_d_corrected.js | 2 | ExplanationWrongD | 19 | because separating vendor-setup and bid-award approval from the purchasing ma... |
| P1-ED-073 | pack_d_corrected.js | 2 | ExplanationWrongA | 23 | because a detective control is only as effective as the follow-up it triggers... |
| P1-ED-074 | pack_d_corrected.js | 2 | ExplanationWrongB | 17 | because combining custody of cash disbursement with the reconciliation functi... |
| P1-FD-002 | pack_d_corrected.js | 1 | ExplanationWrongB | 10 | because APIs support automated, real-time data exchange between connected sys... |
| P1-FD-007 | pack_d_corrected.js | 1 | ExplanationWrongC | 12 | because self-service BI gives users governed access to build reports and anal... |
| P1-FD-008 | pack_d_corrected.js | 2 | ExplanationWrongD | 20 | Self-service BI empowers business users to create reports from governed data ... |
| P1-FD-009 | pack_d_corrected.js | 2 | ExplanationWrongA | 17 | Self-service BI gives business users direct access to governed data for build... |
| P1-FD-011 | pack_d_corrected.js | 2 | ExplanationWrongC | 9 | because encryption protects data from unauthorized access or interception. |
| P1-FD-012 | pack_d_corrected.js | 2 | ExplanationWrongD | 21 | Encryption of data at rest and in transit directly supports confidentiality b... |
| P1-FD-014 | pack_d_corrected.js | 2 | ExplanationWrongB | 20 | Encryption directly protects the confidentiality of data by ensuring that onl... |
| P1-FD-018 | pack_d_corrected.js | 2 | ExplanationWrongB | 9 | because the vendor provides the complete hosted accounting application. |
| P1-FD-024 | pack_d_corrected.js | 1 | ExplanationWrongD | 10 | because the model learned training-data-specific noise rather than reusable p... |
| P1-FD-026 | pack_d_corrected.js | 2 | ExplanationWrongB | 11 | because connected sensors collecting equipment data are an IoT use case. |
| P1-FD-033 | pack_d_corrected.js | 1 | ExplanationWrongA | 12 | because a documented breach-response plan supports timely containment, coordi... |
| P1-FD-036 | pack_d_corrected.js | 2 | ExplanationWrongD | 9 | because the second category lacks a predefined tabular structure. |
| P1-FD-039 | pack_d_corrected.js | 2 | ExplanationWrongC | 20 | Emails, videos, and social media posts are classic examples of unstructured d... |
| P1-FD-043 | pack_d_corrected.js | 2 | ExplanationWrongC | 9 | because digital signatures verify claimed sender and document integrity. |
| P1-FD-048 | pack_d_corrected.js | 2 | ExplanationWrongD | 11 | because the stem describes one authoritative source for core business data. |
| P1-FD-053 | pack_d_corrected.js | 2 | ExplanationWrongA | 13 | because unmonitored automation can introduce errors, bypass controls, or crea... |
| P1-FD-058 | pack_d_corrected.js | 1 | ExplanationWrongB | 11 | because NLP/intelligent document processing extracts useful fields from scann... |
| P1-FD-060 | pack_d_corrected.js | 2 | ExplanationWrongD | 19 | NLP and IDP technologies are designed to extract structured information from ... |
| P1-FD-061 | pack_d_corrected.js | 2 | ExplanationWrongA | 13 | because NIST is a recognized cybersecurity framework for identifying and mana... |
| P1-FD-069 | pack_d_corrected.js | 2 | ExplanationWrongA | 10 | because the evaluation compares expected technology benefits with its costs. |
| P1-FD-071 | pack_d_corrected.js | 1 | ExplanationWrongC | 11 | because retention rules balance compliance obligations with data-storage risk... |
