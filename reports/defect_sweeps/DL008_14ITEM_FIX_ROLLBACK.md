# DL-008 14-Item Re-Contamination Fix — Rollback Log

**Date:** 2026-07-22
**Operation:** Cleared ExplanationWrong[CorrectChoice] to "" for 14 items re-contaminated by Sub-batch 2B Wave 1.
**Items cleared:** 14

| QID | Field | Before | After |
|-----|-------|--------|-------|
| P1-A-003 | ExplanationWrongC | `"Option C ($201,000) is the correct CFO. Start with net income of $172,000, add back non-cash deprec...` | `""` |
| P1-A-004 | ExplanationWrongC | `"Option C is correct. Under ASC 505, treasury stock repurchases reduce shareholders' equity and are ...` | `""` |
| P1-A-006 | ExplanationWrongD | `"Option D is correct. Under ASC 606, cash received before satisfying a performance obligation create...` | `""` |
| P1-A-007 | ExplanationWrongB | `"Option B is correct. Under ASC 326 (Credit Losses), the allowance method estimates expected credit ...` | `""` |
| P1-A-008 | ExplanationWrongC | `"Option C is correct. Under ASC 330, inventory measured using FIFO or average cost is written down t...` | `""` |
| P1-A-010 | ExplanationWrongB | `"Option B ($6,000) is correct. Depreciable base is $96,000 - $12,000 = $84,000. Annual depreciation ...` | `""` |
| P1-A-019 | ExplanationWrongA | `"Option A is correct. Under ASC 320, debt securities classified as available-for-sale report unreali...` | `""` |
| P1-A-023 | ExplanationWrongC | `"Option C is correct. Under ASC 820, quoted prices in active markets for identical assets or liabili...` | `""` |
| P1-A-024 | ExplanationWrongC | `"Option C is correct. Under ASC 230, cash equivalents are short-term, highly liquid investments with...` | `""` |
| P1-A-026 | ExplanationWrongD | `"Option D ($197,200) is correct. Using the accounting equation: Assets = Liabilities + Equity, so Eq...` | `""` |
| P1-A-027 | ExplanationWrongC | `"Option C ($21,780) is correct. Revenue is recognized when control transfers. With 396 units shipped...` | `""` |
| P1-A-028 | ExplanationWrongD | `"Option D ($171,650) is correct. COGS = Beginning inventory + Purchases - Ending inventory = $44,700...` | `""` |
| P1-A-029 | ExplanationWrongB | `"Option B ($16,160) is correct. Straight-line depreciation = ($92,800 - $12,000) / 5 = $80,800 / 5 =...` | `""` |
| P1-A-030 | ExplanationWrongB | `"Option B ($124,800) is correct. CFO indirect = NI $103,500 + Depreciation $23,000 - AR increase $7,...` | `""` |

To restore any item, replace `""` with the original content from the before column.
