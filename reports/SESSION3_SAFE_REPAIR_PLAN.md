# Session 3 — Safe Repair Plan

**Status:** `PLANNING ONLY — NO IMPLEMENTATION AUTHORIZED`

**Date:** 2026-07-24
**Session:** 3 (read-only, parallel to Sessions 1 and 2)

---

## Repair Plan 1: Pack A Double-Comma (S3-BLK-01)

### Defect

| Field | Value |
|-------|-------|
| **Defect ID** | S3-BLK-01 |
| **File** | `pack_a_corrected.js` |
| **Exact line** | 9602 |
| **Object** | Metadata block for P1-C-009 (last QuestionID before error) |
| **Malformed token** | `"ExplanationWrongC": "...continuous improvement.",,` → double comma |
| **Correct token** | `"ExplanationWrongC": "...continuous improvement.",` → single comma |

### Root Cause

Pre-existing authoring artifact. A trailing comma after the property value was written twice. The double comma appears in all available backups (2026-07-23 and earlier), confirming this predates recent DL-008/DL-013/DL-025 remediation.

### Minimal Intended Change

Replace `"continuous improvement.",,` (double comma) with `"continuous improvement.",` (single comma) at line 9602.

This is a **single-character deletion** — remove one of the two commas.

### What Must Not Change

- No other line or character in the file
- No QuestionID values
- No CorrectChoice values
- No ExplanationWrong field content
- No question_state values
- No structural field additions or removals

### Required Backup

```powershell
Copy-Item pack_a_corrected.js "pack_a_corrected.js.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
```

### Required Pre-Write Validation

1. Confirm the file has not changed since Session 3 baseline: SHA256 starts with `ABC961B224F3D9E2`
2. Confirm Session 1 has completed read-only work on Pack A Section C (QIDs P1-C-001 through P1-C-075)
3. Confirm the current file still contains exactly 500 QuestionID occurrences
4. Confirm no other `,,` occurrences exist in the file (grep for `,,`)

### Required Post-Write Parser Validation

1. `node -e "require('./pack_a_corrected.js'); console.log('PACK_A LOAD OK');"` → must succeed
2. `node -e "const m = require('./pack_a_corrected.js'); console.log(Object.keys(m).join(','));"` → verify MCQ_BANK_A and CASE_BANK_A exist
3. Verify `grep -c '"QuestionID"'` returns 500 (unchanged)
4. Verify file size change is exactly -1 byte (comma deletion)
5. Run validator suite: zero new errors introduced

### Required Controlled Runtime Validation

1. Load `index_updated.html` in an isolated browser tab
2. Verify "Pack A (500 MCQs + 15 cases)" appears in catalog view
3. Selected packs A, B, C, D, E → pool construction succeeds
4. Start a session with only Pack A selected → MCQs render correctly
5. Answer a Pack A question → score increments

### Independent Verification

A separate agent or session must independently:
1. Re-run the `require()` parse check
2. Verify QID count unchanged at 500
3. Verify the repaired line 9602 has exactly one comma, not two
4. Confirm no other double-comma artifact exists in the repaired file

### Rollback Method

```powershell
Copy-Item "pack_a_corrected.js.bak-<timestamp>" pack_a_corrected.js -Force
```

### Concurrency Analysis

| Factor | Assessment |
|--------|-----------|
| Safe while Session 1 running? | **NO** — Session 1 may be reading Pack A Section C items near the defect |
| Safe while Session 2 running? | YES — Session 2 works on case files, not pack files |
| Classification | **DEFER UNTIL CONCURRENT READERS COMPLETE** |

---

## Repair Plan 2: Pack C Missing Commas (S3-BLK-02)

### Defect

| Field | Value |
|-------|-------|
| **Defect ID** | S3-BLK-02 |
| **File** | `pack_c_corrected.js` |
| **Location** | 35+ sites spanning lines 7956 through 25951 |
| **First error line** | 7956 → 7957 (missing comma between ExplanationWrongB and ChoiceC) |
| **Last QID before first error** | P1-BC-070 |
| **Pattern** | Line ending in `"` followed by line starting with `"ChoiceX"` or `"ExplanationWrongX"` without comma separator |

### Root Cause

Template-based bulk authoring artifact. The metadata-block JSON objects were generated without proper comma separators between all property pairs. All 35+ instances follow an identical pattern: the last character before the line break is a closing `"` (end of an ExplanationWrong value), and the first non-whitespace character on the next line is another `"` (start of the next property key), with no `,` between them.

### All Identified Sites

Lines: 7956, 8010, 8164, 8529, 8583, 8631, 8737, 8791, 8839, 8945, 24831, 24882, 24931, 25033, 25035, 25086, 25186, 25188, 25290, 25339, 25390, 25392, 25441, 25443, 25543, 25594, 25596, 25645, 25647, 25698, 25747, 25798, 25800, 25849, 25851, 25951

All sites are in the metadata block of the paired-object architecture (between `"QuestionID"` and `"question_state"` or adjacent properties). None are in the content block.

### Minimal Intended Change

At each of the 35+ identified sites, insert a comma (`,`) between the closing `"` of the ExplanationWrong/Choice value and the opening `"` of the next property key.

**Mechanical pattern (all sites):**
```
...on current operations."
    "ChoiceC": "Capital budgeting...
→
...on current operations.",
    "ChoiceC": "Capital budgeting...
```

This can be executed as a targeted find-and-replace using the known patterns, NOT a global auto-format or serialization pass.

### Two-Phase Approach

**Phase A — Mechanical comma insertion (all 35+ sites):**
For each site: insert `,` at the end of line N (after the closing `"` of the value) before the newline. This restores valid JSON syntax without touching any field content.

**Phase B — Validation pass:**
After all commas are inserted, verify:
1. `node -e "require('./pack_c_corrected.js')"` succeeds
2. QID count = 500
3. MCQ_BANK_C and CASE_BANK_C are defined
4. No content changed — diff shows only comma insertions

### What Must Not Change

- No field values, keys, or content
- No QuestionID, CorrectChoice, ExplanationWrong, or ExplanationCorrect text
- No question_state values
- No structural changes beyond comma insertion

### Required Backup

```powershell
Copy-Item pack_c_corrected.js "pack_c_corrected.js.bak-$(Get-Date -Format 'yyyyMMddHHmmss')"
```

### Required Pre-Write Validation

1. Confirm file SHA256 starts with `9B8E8C679F2F3E59` (Session 3 baseline)
2. Confirm Session 1 has completed read-only work on Pack C Section B (QIDs P1-BC-001 through P1-BC-100)
3. Confirm current file contains exactly 500 QuestionID occurrences
4. Confirm 35+ missing-comma sites still exist (no concurrent repair occurred)

### Required Post-Write Parser Validation

1. `require('./pack_c_corrected.js')` succeeds
2. MCQ_BANK_C.length === 500
3. CASE_BANK_C exists
4. QID count unchanged (500)
5. File size increase = number of commas inserted (~35 bytes)
6. Validator suite: zero new errors introduced

### Required Controlled Runtime Validation

Same as Plan 1 but for Pack C.

### Independent Verification

1. Independent `require()` parse check
2. Verify all 35+ sites now have commas
3. Verify no content was altered
4. Random spot-check 5 repaired items for correct MCQ rendering

### Rollback Method

```powershell
Copy-Item "pack_c_corrected.js.bak-<timestamp>" pack_c_corrected.js -Force
```

### Concurrency Analysis

| Factor | Assessment |
|--------|-----------|
| Safe while Session 1 running? | **NO** — Session 1 may be reading Pack C Section B items near the first defect |
| Safe while Session 2 running? | YES — Session 2 works on case files |
| Classification | **DEFER UNTIL CONCURRENT READERS COMPLETE** |

---

## Repair Plan 3: Multi-Select Partial Credit (S3-GAP-02)

### Defect

| Field | Value |
|-------|-------|
| **Defect ID** | S3-GAP-02 |
| **File** | `app.js` |
| **Exact line** | 1525 |
| **Current code** | `return it.Correct.length === ans.length && it.Correct.every(x => ans.includes(x));` |
| **Issue** | All-or-nothing scoring for multi-select. CMA 2026 awards partial credit. |

### Minimal Intended Change

Replace the all-or-nothing logic with proportional partial credit:

```javascript
if (it.Type === 'multi') {
    if (!Array.isArray(ans) || !Array.isArray(it.Correct) || !it.Correct.length) return false;
    let correctSelections = it.Correct.filter(x => ans.includes(x)).length;
    // Partial credit: proportion of correct selections
    // Subtract penalty for incorrect (extra) selections
    let incorrectSelections = ans.filter(x => !it.Correct.includes(x)).length;
    let score = Math.max(0, correctSelections - incorrectSelections) / it.Correct.length;
    return score >= 1.0; // Or return fractional score — requires wider refactor
}
```

**Note:** This requires a wider refactor because `correctCase()` currently returns boolean, not fractional. The caller (`practiceScores()`) expects boolean. A fractional-credit system would need `correctCase()` to return a number (0.0–1.0) and `practiceScores()` to sum fractional credits instead of counting booleans.

### Concurrency

**DEFER** — This is a scoring behavior change, not a parse blocker. It can happen independently of Sessions 1 and 2.

---

## Repair Plan 4: Matching Partial Credit (S3-GAP-03)

### Defect

| Field | Value |
|-------|-------|
| **Defect ID** | S3-GAP-03 |
| **File** | `app.js` |
| **Exact line** | 1526 |
| **Current code** | `return Object.keys(it.Correct).every(k => this.norm(ans[k]) === this.norm(it.Correct[k]));` |
| **Issue** | All-or-nothing. Requires every match to be correct. |

### Minimal Intended Change

Same approach as S3-GAP-02 — requires fractional return from `correctCase()` and sum-based scoring in `practiceScores()`.

### Concurrency

**DEFER** — Can happen independently.

---

## Required Future Validation Sequence

After S3-BLK-01 and S3-BLK-02 are repaired:

1. Parse all 5 pack files via `require()` — all must succeed
2. Verify QID counts: Pack A = 500, Pack B = 500, Pack C = 500, Pack D = 500, Pack E = 500
3. Load `index_updated.html` in isolated browser → no console errors
4. All 5 pack checkboxes active in the UI
5. Start a full-exam session (100 MCQs + 2 cases) with all packs selected
6. Verify MCQs are drawn from all 5 packs (check QuestionID prefixes)
7. Complete MCQ section → verify 50% gate behavior
8. Complete CBQ section → verify weighted score display
9. Run pre-delivery safety check skill
10. Run validator suite — zero new errors or warnings

---

## Exact Next Safe Action

1. **Wait** for Session 1 to complete its read-only work on Pack A Section C and Pack C Section B.
2. **Authorize** a dedicated repair session to execute Plan 1 (Pack A double-comma) and Plan 2 Phase A (Pack C missing commas).
3. **Verify** both repairs independently.
4. **Then** proceed with controlled browser runtime validation.
5. **Defer** Plans 3 and 4 (partial credit) to a separate scoring enhancement session — they are not blockers for runtime testing.

---

## Dependency Graph

```
Session 1 completes Pack C Section B read-only
    ↓
Session 1 completes Pack A Section C read-only
    ↓
[DEDICATED REPAIR SESSION — NOT SESSION 3]
    ├── Fix Pack A line 9602 (S3-BLK-01)
    └── Fix Pack C 35+ missing commas (S3-BLK-02)
    ↓
Controlled runtime validation (browser)
    ↓
[FUTURE SESSION]
    ├── S3-GAP-02: Multi-select partial credit
    └── S3-GAP-03: Matching partial credit
```
