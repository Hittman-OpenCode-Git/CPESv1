# Pack A Section A — Population Reconciliation

**Date:** 2026-07-22
**Status:** Authoritative — direct source-file evidence
**Source:** `pack_a_corrected.js` (the authoritative question bank)

---

## Authoritative Inventory Summary

| Measure | Count | Evidence |
|---|---:|---|
| Raw objects labeled `"Section": "A"` | 75 | `pack_a_corrected.js` — P1-A-001 through P1-A-075 |
| Active Section A MCQs | 75 | All 75 have `"ItemType": "MCQ"` |
| Legacy/superseded/non-active records | 0 | None detected |
| Case-related records excluded | 0 | None embedded in Section A range |
| Duplicate/redundant records | 0 | None identified (044/064 are distinct archived records, not duplicates) |
| Malformed or unclassifiable | 0 | All 75 parse correctly as MCQ objects |
| **Final active Pack A Section A MCQ population** | **75** | P1-A-001 through P1-A-075, inclusive |

### Structural Note — P1-A-075

P1-A-075 is the 75th Pack A Section A item and is the terminal Section A record before Section B begins. It differs structurally from items P1-A-001 through P1-A-074: it lacks an `"ItemStyle"` field. Its object closes with `ExplanationWrongA/B/C/D` fields directly followed by the closing `},` delimiter. This is a structural variance, not a defect — the item is valid and active.

---

## State Distribution

| Question state | Count | QuestionIDs |
|---|---:|---|
| **Certified** | **53** | P1-A-003/004/005/006/007/008/010/011/012/013/014/015/016/017/019/020/021/022/023/024/025/026/027/028/029/030/031/032/033/034/035/036/037/038/039/040/041/042/043/045/046/047/048/049/050/051/052/054/055/056/057/058/066 |
| **Unprocessed** (undefined) | **20** | P1-A-001/002/009/018/053/059/060/061/062/063/065/067/068/069/070/071/072/073/074/075 |
| **In Audit** | 0 | — |
| **Editorial Queue** | 0 | — |
| **Archived** | **2** | P1-A-044, P1-A-064 |
| **Other/invalid** | 0 | — |
| **Missing state** | 0 | 20 items have no `question_state` field (implicitly `Unprocessed`) |
| **Total** | **75** | |

---

## Block 1 Reconciliation

| Measure | Block 1 Reported | Actual from Source | Difference | Explanation |
|---|---:|---:|---:|---|
| Total Pack A Section A MCQs | 74 | **75** | **+1** | P1-A-075 was omitted from the Block 1 scan. It exists at line 3968, has `"Section": "A"`, and is a basic EPS calculation. It lacks `"ItemStyle"` (structural variance from items 001-074) and was undetected by the ItemStyle-anchored scanner. |
| Certified Pack A Section A MCQs | 53 | 53 | 0 | Correct |
| Non-Certified Pack A Section A MCQs | 21 (implied: 74-53) | **22** (actual: 75-53) | +1 | P1-A-075 adds 1 to the non-certified count |
| Unprocessed (never-reviewed) | Not established | **20** (total) | — | 6 Block 1 holds (001/002/009/018/053/059) + 14 never-reviewed (060-075 range) |
| Held items (Block 1) | 6 | 6 | 0 | Correct |
| Archived items | 2 | 2 | 0 | Correct (P1-A-044, P1-A-064) |
| Remaining capacity before 75 cap | 22 (75-53) | **22** (75-53) | 0 | The arithmetic is correct even though the population count was wrong, because 75-53=22 regardless of whether there are 74 or 75 source items. The capacity number (22) accidentally matched. |
| Actually fillable capacity | Not computed | **20** (unprocessed) + **2** (archived, if remediated) | — | 22 capacity matches the 22 non-certified items (20 unprocessed + 2 archived) |

---

## Ceiling Determination

### Outcome A — Source Population is 75

The source population of 75 Pack A Section A MCQs permits a 75-Certified-item cap.

| Metric | Value |
|---|---|
| Source population | 75 |
| Current Certified | 53 |
| Archived | 2 |
| Unprocessed (undefined) | 20 |
| Cap | 75 |
| **Current capacity** | **75 − 53 = 22** |
| Maximum possible Certified | **75** (if all 75 items are certified) |

The 75 cap is valid and bounded by the source population. No item creation or external inclusion is needed.

### Cap-Reachability Analysis

| Scenario | Certified items | Notes |
|---|---|---|
| Certify all 20 unprocessed items | 53 + 20 = **73** | Still under cap |
| Certify all 20 + unarchive/remediate 044 | 53 + 20 + 1 = **74** | — |
| Certify all 20 + unarchive/remediate both 044/064 | 53 + 20 + 2 = **75** | Exact cap hit |

The 75 cap can only be reached if both archived items (P1-A-044 and P1-A-064) are remediated, unarchived, and certified after full re-verification.

---

## Candidate List for Possible Block 2

### Eligible Never-Reviewed Items (14)

| Order | QuestionID | Current state | Topic (approximate) | Known defect flag | Eligibility assessment |
|---:|---|---|---|---|---|
| 1 | P1-A-060 | undefined | Indirect operating cash flow | None known | Eligible — clone of P1-A-030/040/050 pattern |
| 2 | P1-A-061 | undefined | Retained earnings rollforward | None known | Eligible — clone of P1-A-031/041/051 pattern |
| 3 | P1-A-062 | undefined | Current assets classification | None known | Eligible — clone of P1-A-032/042/052 pattern |
| 4 | P1-A-063 | undefined | Net sales returns/allowances | None known | Eligible — clone of P1-A-033/043/053 pattern |
| 5 | P1-A-065 | undefined | Basic EPS weighted-average | None known | Eligible — clone of P1-A-035/045/055 pattern |
| 6 | P1-A-067 | undefined | Revenue recognized shipped units | None known | Eligible — clone of P1-A-037/047/057 pattern |
| 7 | P1-A-068 | undefined | COGS inventory flow | None known | Eligible — clone of P1-A-038/048/058 pattern |
| 8 | P1-A-069 | undefined | Straight-line depreciation | None known | Eligible — clone of P1-A-039/049/059 pattern |
| 9 | P1-A-070 | undefined | Indirect operating cash flow | None known | Eligible — clone of P1-A-030/040/050/060 pattern |
| 10 | P1-A-071 | undefined | Retained earnings rollforward | None known | Eligible — clone of P1-A-031/041/051/061 pattern |
| 11 | P1-A-072 | undefined | Current assets classification | None known | Eligible — clone of P1-A-032/042/052/062 pattern |
| 12 | P1-A-073 | undefined | Net sales returns/allowances | None known | Eligible — clone of P1-A-033/043/053/063 pattern |
| 13 | P1-A-074 | undefined | Loss contingency range (no best estimate) | None known | Eligible — P1-A-074 is referenced in REVISION_HISTORY.md as having been authored under amended governance but never committed to Certified state. Active in source file. |
| 14 | P1-A-075 | undefined | Basic EPS weighted-average shares | **No `ItemStyle` field** | Eligible — structurally different but valid. Needs `ItemStyle` added before certification if schema conformity is required, or certifiable as-is if the field is optional. |

### Block 1 Holds — Excluded from Ordinary Selection (6)

These require explicit item-level remediation authorization before certification:

| QuestionID | State | DL class | Why excluded from default Block 2 selection |
|---|---|---|---|
| P1-A-001 | undefined | **DL-007** | Template distractor explanations in ExplanationWrongB and ExplanationWrongD. Needs choice-specific ASC 210 reasoning rewrite. |
| P1-A-002 | undefined | **DL-007** | Template distractor explanations in ExplanationWrongA and ExplanationWrongC. Needs choice-specific ASC 205 reasoning rewrite. |
| P1-A-009 | undefined | **DL-007** | Template distractor explanations in ExplanationWrongB and ExplanationWrongD. Also lacks ASC citations anywhere. |
| P1-A-018 | undefined | **DL-007** | Template distractor explanations in ExplanationWrongA and ExplanationWrongD. Needs choice-specific ASC 810 NCI reasoning rewrite. |
| P1-A-053 | undefined | **DL-011** | Fragmentary text in ExplanationWrongA (`"because both sales returns and sales allowances reduce gross sales."`). Needs full rewrite. |
| P1-A-059 | undefined | **DL-011** | Fragmentary text in ExplanationWrongA (`"because the $176,800 depreciable base divided by 7 years equals $25,257."`). Needs full rewrite. |

---

## Required Conclusion

**OPEN PACK A SECTION A BLOCK 2 — up to 20 eligible items (14 never-reviewed + up to 6 holds if item-level DL-007/DL-011 remediation is authorized).**

The 75 Pack A Section A cap is valid and bounded by the source population. Current capacity: 22 (75 − 53). All 20 unprocessed items are potentially certifiable. Reaching the full 75 requires remediating and certifying the 2 archived items (P1-A-044, P1-A-064).

### Section E Program

The planned Section E recurring 50-question program must remain deferred. Resolution: Pack A Section A's actual population (75) and cap (75) are now confirmed. Block 2 disposition requires external review authorization before transition to Section E work.

---

## Stop-Condition Compliance

| Condition | Status |
|---|---|
| Section metadata inconsistent or ambiguous | None found — all 75 Section A items have consistent `"Section": "A"` |
| Source population cannot be determined | Determined — 75 |
| Missing, malformed, or contradictory state fields | 20 items lack `question_state` (valid `Unprocessed` implicit); P1-A-075 lacks `ItemStyle` (structural variance, not a defect) |
| Discrepancy requiring content/schema change | None requiring immediate action |
| Unrecognized defect class | P1-A-075's missing `ItemStyle` field is a structural variance, not a defect |

### Prior Report Corrections Needed

The Block 1 report (`reports/SECTION_A_CERTIFICATION_BLOCK1_REPORT.md`) states 74 total Section A items. This is incorrect — the correct count is 75. The Block 1 report also states "remaining capacity before 75 cap: 22" — this number is coincidentally correct (75−53=22) despite the population miscount. No other figures in the Block 1 report are affected since Block 1 certified exactly 24 items and the certified count (53) is independently verified.
