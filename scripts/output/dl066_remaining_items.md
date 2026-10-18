# DL-066 Remaining Items for Manual Derivation (27 items)

## MISMATCHED (16 items) - Need correct arithmetic derivation

| Case | Item | Type | Hidden Correct | Current Derived | Issue |
|------|------|------|----------------|-----------------|-------|
| CBQ-C2 | CBQ-C2-Q1 | numeric | 84000 | 756000 | Residual income calculation wrong |
| CBQ-C3 | CBQ-C3-Q1 | numeric | 60000 | 1740000 | Operating income variance |
| CBQ-D2 | CBQ-D2-Q1 | numeric | 20400 | 22060 | Equivalent units for conversion costs |
| CBQ-E1 | CBQ-E1-Q3 | numeric | 3.0 | 0 | Duplicate/fictitious payment loss % |
| CBQ2-A3 | CBQ2-A3-Q1 | numeric | 363636 | 1450000 | Transaction price allocation |
| CBQ4-A1 | CBQ4-A1-Q1 | numeric | 400000 | 4600000 | Goodwill initial amount |
| CBQ4-C1 | CBQ4-C1-Q1 | numeric | 1600 | 60400 | VOH Spending Variance |
| CBQ4-C1 | CBQ4-C1-Q3 | numeric | 2000 | 19605 | Fixed OH Volume Variance |
| CBQ5-A2 | CBQ5-A2-Q1 | numeric | 510000 | 70 | Total Comprehensive Income |
| CBQ5-B2 | CBQ5-B2-Q1 | numeric | 40000 | 1000026 | Cash interest payment (semi-annual) |
| CBQ5-B2 | CBQ5-B2-Q3 | numeric | 46138 | 922796 | Interest expense (first 6 months) |
| CBQ5-B2 | CBQ5-B2-Q4 | numeric | 928906 | 86138 | Carrying value after 1st interest |
| CBQ4-B1 | CBQ4-B1-Q1 | numeric | 4 | 85000 | High-Low variable cost/machine hour |
| CBQ5-E2 | CBQ5-E2-Q3 | numeric | 1218000 | 1638000 | Annual net benefit from controls |
| CBQ3-C4 | CBQ3-C4-Q1 | numeric | -21600 | 21600 | DM Price Variance (sign) |
| CBQ3-C4 | CBQ3-C4-Q3 | numeric | -5600 | 5600 | DL Efficiency Variance (sign) |

## NO DERIVATION (11) - Need semantic/manual derivation

| Case | Item | Type | Hidden Correct | Needed |
|------|------|------|----------------|--------|
| CBQ-C2 | CBQ-C2-Q5 | fill | "congruence" | Goal congruence concept |
| CBQ-D2 | CBQ-D2-Q5 | fill | "complete" | Equivalent units definition |
| CBQ-E1 | CBQ-E1-Q4 | fill | "absolute" | Inherent limitation concept |
| CBQ-E2 | CBQ-E2-Q4 | fill | "approval" | Emergency change control |
| CBQ2-A3 | CBQ2-A3-Q5 | fill | "balance sheet" | Aging schedule method name |
| CBQ3-A1 | CBQ3-A1-Q3 | fill | "right-of-use" | ASC 842 lease asset name |
| CBQ3-B2 | CBQ3-B2-Q3 | numeric | 20 | Predetermined OH rate per DLH |
| CBQ5-A2 | CBQ5-A2-Q5 | fill | "owners" | Comprehensive income exclusion |
| CBQ4-B2 | CBQ4-B2-Q3 | numeric | 130000 | Ending A/P balance |
| CBQ4-B2 | CBQ4-B2-Q4 | numeric | 31500 | Ending cash balance |
| CBQ3-A4 | CBQ3-A4-Q1 | numeric | 228 | NRV per unit for tablets |

## Status Summary
- **Total In Audit items**: 163
- **Verified (matched)**: 136 (83.4%)
- **Mismatched**: 16 (need correct arithmetic)
- **No derivation**: 11 (need semantic/manual derivation)
- **Remaining for manual derivation**: 27

## Next Steps
1. Manually derive each of the 27 items using exhibits + explanations
2. Apply manual overrides in the hand-solve script
3. Re-run verification until 163/163 match
4. Flip question_state to Certified with Rule 16 stamps
5. Update v2.0.0 tag if needed (already pushed at 1bde586)