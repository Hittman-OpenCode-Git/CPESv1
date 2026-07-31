# Cross-Session Diagnostic: DL-007 Unique QID Count Discrepancy (882 vs. 1,011)

**Date:** 2026-07-23
**Source:** Reconciliation-audit skill re-verification session
**Audience:** Session 6 (DL-007 / DL-009 / DL-010 full-pool sweep)
**Status:** Diagnostic — no file edits

---

## 1. The Discrepancy

| Source | Unique DL-007 QIDs | Occurrences | Scan Date |
|--------|-------------------|-------------|-----------|
| Session 6 (`DL007_009_010_FULL_POOL_SWEEP_2026-07-23.md` §1.3) | **882** | 2,587 | 2026-07-23 |
| DEFECT_LIBRARY.md DL-013 entry | **1,011** | 2,587 | 2026-07-23 |
| **Delta** | **-129 QIDs** | 0 (occurrence count matches) | — |

The field-level occurrence count (2,587) is identical across both scans. But the unique QID count differs by 129 — Session 6 undercounted by approximately 12.8%.

---

## 2. Likely Root Cause: Window-Based QID Attribution Without Item-Boundary Awareness

Session 6's report describes the tooling as `PowerShell Select-String` and `findstr` + `find /c`. These are raw-text pattern matchers. They operate on individual lines or character ranges without awareness of JSON object boundaries.

The likely mechanism for the undercount:

1. The scan finds a DL-007 template match (e.g., `"represents a plausible misconception"`).
2. The scan then searches backwards/forwards in the text to find the nearest `"QuestionID"` marker to attribute the occurrence to a QID.
3. **For occurrences near the end of a large question object**, the scan's search window may not stretch far enough backward to reach the `"QuestionID"` field (which is at the start of the object). 
4. These occurrences either:
   - Get misattributed to the *wrong* QID (collapsing two QIDs into one), or
   - Get dropped from the unique QID count entirely (window exhausted before finding a QuestionID).

**Calibration evidence** (from the same-session DL-012 re-verification):

| Window Size | QID Attribution Accuracy | Notes |
|-------------|--------------------------|-------|
| 4,000 chars | 100% | Maximum safe window — all 75 Pack C/D Section E items correctly attributed |
| 8,000 chars | ~79% correct, 21% false | Bleeds into adjacent items |
| 12,000 chars | ~38% correct, 62% false | Severe bleed beyond item boundary |

**Without a description of Session 6's window size or QID-extraction algorithm in the sweep report**, the default assumption is that the scan used a line- or character-range-based method that is equivalent to a variable-width window — and that window, for some fraction of QIDs, was either too small (missed the parent QID) or too large (merged adjacent QIDs).

---

## 3. Consistent With the Pattern Just Resolved in This Session

The DL-012 composition re-verification (2026-07-23) uncovered a structurally identical bug in a validation script:

- A QID extraction function using `match(/\d+/)[0]` + `padStart(3, '0')` collapsed all Pack C Section E QIDs to `P1-EC-001`.
- The result was a spurious "63 items with question_state" finding against a ground truth of 38.
- The root cause was a **character-processing method without item-boundary awareness** — a different mechanism than the Session 6 case, but the same class of error: the tool's text-processing logic broke when it crossed an item boundary.

Both discrepancies (DL-012 script bug and 882-vs-1,011 count gap) share the characteristic that the *occurrence count* (2,587) was correct across both scans while the *unique QID count* was wrong. This is the fingerprint of a QID-attribution error, not a content-detection error.

---

## 4. Recommendation for Session 6

1. **Re-run the unique QID count using a boundary-aware block parser.** The validated method from this session is:
   - Find each `"QuestionID"` marker.
   - Scan forward *only* to the next `"QuestionID"` marker (this is the item boundary).
   - Check whether any field within that boundary matches the DL-007 pattern.
   - The result: one QID per item, correctly attributed, no window-bleed.

2. **Keep the field-level occurrence count (2,587) as-is.** It already matches the authoritative DL-013 figure and was confirmed by two independent counting methods. No correction needed.

3. **The 882 unique QID figure should be treated as a lower bound**, not an authoritative count. The authoritative unique QID count from DEFECT_LIBRARY.md DL-013 is **1,011** (boundary-aware, independently verified at 2,587 field occurrences).

4. **If the 882 figure was used to size remediation batches**, those batches may be undersized. A batch plan based on 882 QIDs would miss 129 QIDs (12.8% of the workload). Re-size batches using the 1,011 figure.

---

## 5. Methodological Note for Future Scans

The reconciliation-audit skill has been updated (2026-07-23) with a new §3a documenting the window-size calibration:

> **Block-parse is authoritative.** Find each `"QuestionID"` marker, then scan forward *only* to the next `"QuestionID"` marker.
> **4,000-char regex window is the maximum safe secondary method.** Use it only as a fast cross-check, not as a standalone source of truth.
> **Larger windows MUST NOT be used for QID attribution.**

Any scan that reports both total occurrences *and* unique QID counts **must** use block-parse for the QID count. Total occurrences can use any method (as long as it's cross-checked) because occurrence counting doesn't depend on correct QID attribution.

---

*Diagnostic note generated 2026-07-23. No edits to DEFECT_LIBRARY.md, any pack file, or any Session 6 report. The Session 6 report is not invalid — its occurrence count (2,587) is correct and its state-distribution is correct. Only the unique QID count needs re-verification.*
