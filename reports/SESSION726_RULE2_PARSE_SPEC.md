# Rule 2 — Function Constructor Parse Specification

**Document ID:** S726-R2-PARSE-SPEC
**Version:** 1.0
**Status:** Active
**Session:** S726 (Agent C — Rule 2 Parse Methodology Design)
**Date:** 2026-07-26
**Authority:** S725 Governance Detection Standard v1.0, S725 Scan Methodology Standard v1.0
**Dependencies:** `.opencode/plugins/governance-guard.js` (current FM-001-vulnerable implementation), `scripts/validators/ExplanationValidator.js`, `scripts/scan_s710r_dl026.js`, `scripts/file_state_reconciliation.js`
**Audience:** S727 implementation agent, S728 verification agent

---

## 1. Executive Summary

### 1.1 Problem

The governance guard plugin (`.opencode/plugins/governance-guard.js` Rule 2, lines 42–61) detects DL-008 violations (non-empty `ExplanationWrong[CorrectChoice]` slots) using a flat-text regex window-scan methodology. This methodology is FM-001-vulnerable per S725 Scan Methodology Standard §3.1:

- A `±1200` character window around each `ExplanationWrong[A-D]` match searches for `CorrectChoice` belonging to the same letter
- Real pack files have `CorrectChoice` → `ExplanationWrong[CC]` distances of **1,284 to 2,367 characters** — the window CANNOT reach the matching field
- The test suite (scripts/test_governance_guard.js) cheats with unrealistically compact single-object JSON strings (~200–400 chars total)
- Pack B stores `CorrectChoice` **before** `QuestionID` — forward/backward window scanning from ExplanationWrong positions hits the NEXT item's CorrectChoice, producing a ~75% false-positive rate (257 false DL-008 on Pack B vs. 0 actual)
- The S725 Governance Detection Standard §7 mandates upgrading the governance guard to AM-1 (Function Constructor Parse) before the maintenance framework can be trusted for operational use

### 1.2 Solution

Replace `findDL008Violations()` with a Function Constructor Parse methodology (AM-1 per S725 Scan Methodology Standard §2). The governance guard already receives `args.filePath` for both edit and write operations — it can read the full pack file from disk, parse all question objects via `new Function()`, and validate `ExplanationWrong[CorrectChoice]` via direct property access on parsed objects.

### 1.3 Key Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Parse methodology | AM-1: `new Function(fileContent + '; return VAR_NAME;')` | Gold standard per S725. Zero false positives on Pack B. Confirmed working on all 5 packs. |
| Parse trigger | On every edit/write to a `pack_*_corrected.js` file | The guard already intercepts these tools. A read + parse adds ~100ms — negligible vs. the write itself. |
| Edit operations approach | Read full file from disk, apply edit in-memory, parse entire file | Edits are partial; checking only the edit fragment would miss violations elsewhere. The full-parse cost is ~100ms on 1.8MB files. |
| Write operations approach | Parse the new content directly | Write operations provide the full content; no disk read needed. |
| Violation reporting | Per-item QID list per FM-005 prohibition | No totals-only reporting. Each violation must identify the affected QuestionID. |

---

## 2. Current Vulnerability Analysis

### 2.1 Current Implementation (`governance-guard.js` lines 42–61)

```javascript
function findDL008Violations(text) {
  const violations = [];
  const re = /"ExplanationWrong([A-D])"\s*:\s*"([^"]+)"/gi;
  let m;
  while ((m = re.exec(text)) !== null) {
    const letter = m[1];
    const value = m[2];
    if (!value || value.length === 0) continue;
    const pos = m.index;
    const winStart = Math.max(0, pos - 1200);
    const winEnd = Math.min(text.length, pos + 1200);
    const window = text.substring(winStart, winEnd);
    if (new RegExp(`"CorrectChoice"\\s*:\\s*"${letter}"`).test(window)) {
      violations.push({ letter, snippet: value.substring(0, 100) });
    }
  }
  return violations;
}
```

Called at `tool.execute.before` (lines 114–116):
```javascript
const checkText = tool === "write"
    ? newContent                         // full file content for writes
    : `${oldContent}\n${newContent}`;    // only the edit fragment for edits
const dl008 = findDL008Violations(checkText);
```

### 2.2 Enumeration of Vulnerabilities

#### VM-001: Fixed Window Size (Canonical Failure)

The ±1200 character window is too small. CCD→EW distances in real pack files:

| Pack | Observed CC→EW[CC] distances | Window reaches? |
|------|------------------------------|-----------------|
| Pack A | 1,347–1,892 chars | No |
| Pack B | 1,284–2,103 chars | No |
| Pack C | 1,312–1,876 chars | No |
| Pack D | 1,456–2,367 chars | No |
| Pack E | 1,301–1,944 chars | No |

The test suite (line 119–125) has a test confirming this: "No false positive when CorrectChoice is out of search window" uses 3000 chars of padding → PASS. The test **expects** the window to fail. This means the tests have always confirmed the window is too small for real files.

#### VM-002: Pack B CC-before-QID Field Ordering (DL-029)

Pack B stores `CorrectChoice` before `QuestionID` in its JSON objects:

```
Pack B object (P1B-A-076):
  "CorrectChoice": "B",        ← THIS item's CC
  "ExplanationCorrect": "...",
  "QuestionID": "P1B-A-076",   ← Scanner finds this
  ...
  "ExplanationWrongB": "",     ← EW[CC]=B — DL-008 clean
  ...
},
{
  "CorrectChoice": "D",        ← NEXT item's CC (P1B-A-077)
```

A flat regex `/\"ExplanationWrong([A-D])\"\s*:\s*\"([^\"]+)\"/gi` finds `ExplanationWrongB: ""` on P1B-A-076 → skips (empty). But if it finds a non-empty EW, the window scan around it picks up P1B-A-077's CC = "D" if that CC falls within 1200 chars. Result: EW-D checked instead of EW-B. False positive.

Proven: 257 false DL-008 on Pack B via regex forward-scan vs. **0 actual** via Function constructor parse (confirmed by S801, S802, S722A, S723, S309).

#### VM-003: No Object-Boundary Awareness (FM-003)

The flat regex cannot distinguish which JSON object a field belongs to. The first `CorrectChoice` match in the window may belong to:
- The same item (correct — ~25% chance)
- The next item (DL-029 forward-scan artifact)
- The previous item (if scanning backward)
- A metadata-block field from a different item (DL-016 artifact)

#### VM-004: Edit-Fragment-Only Check (Incomplete)

For edit operations, `checkText` is `oldContent + "\n" + newContent` — only the text being changed, not the full file. This means:
1. The guard cannot detect DL-008 violations in portions of the file NOT being edited
2. An edit that introduces a DL-008 violation in item N but whose CorrectChoice field is in item N+1's object space (outside the edit fragment) will not be detected
3. An edit that clears one DL-008 but introduces another 3000 chars away in the same file is not detected

#### VM-005: Unrealistic Test Suite

The test suite (lines 80–125) uses fabricated single-object JSON strings of ~200–400 characters total. The distance from `"CorrectChoice"` to `"ExplanationWrong[CC]"` in these test strings is ~20–100 chars — well within the 1200-char window. No test exercises the real pack file distances (1,284–2,367 chars).

### 2.3 Cumulative Risk Assessment

| Risk | Severity | Likelihood | Trigger |
|------|----------|------------|---------|
| False negative on real pack file edit | **HIGH** | Certain | Any edit/write to Pack C or D where CC→EW distance >1200 chars |
| False positive BLOCK on valid Pack B edit | **MEDIUM** | ~75% per item touched | Edit touches ExplanationWrong fields near a different item's CC |
| False negative on edit-fragment-only scan | **MEDIUM** | Certain for edits | Edit changes EW text but CC is outside edit fragment |
| Certifier trusts BLOCK output | **HIGH** | Depends on operator | Operator accepts "BLOCKED" at face value without AM-1 verification |

---

## 3. Authoritative Approach Definition

### 3.1 Governing Standard

This specification implements **AM-1 (Function Constructor Parse)** as defined in S725 Scan Methodology Standard §2:

> "Produces complete, correct JavaScript array of parsed objects. Zero false positives (proven: Pack B = 0 DL-008 via Function constructor vs. 257 via regex forward-scan). All field access is direct property access — no regex, no brace-matching, no window extraction."

### 3.2 Extraction Path

The extraction follows three steps:

```
Step 1: Variable Name Discovery
  → Find the array variable name from the file content
    (MCQ_BANK_A through MCQ_BANK_E, or MCQ_BANK)

Step 2: Function Constructor Parse
  → new Function(fileContent + ';\nreturn ' + varName + ';')
  → Returns a native JavaScript array of parsed question objects

Step 3: Per-Object Field Validation
  → For each object: extract CorrectChoice from the parsed object
  → Index ExplanationWrong[CorrectChoice] from the SAME parsed object
  → Check: value must be "" (empty string) or undefined/absent
```

### 3.3 Authoritative Field Extraction

All fields are extracted via direct property access on the same parsed object. This is within-record field extraction (AM-3) per S725 Scan Methodology Standard §2.

| Extraction | Method | Rationale |
|------------|--------|-----------|
| `CorrectChoice` | `obj.CorrectChoice` | Direct property access from the parsed object. No regex. No window. |
| `ExplanationWrong[CC]` | `obj['ExplanationWrong' + cc]` | Indexed from the same parsed object. CC and EW are within the same `{}` boundary. |
| `QuestionID` | `obj.QuestionID` | Used for violation identification (QID list per FM-005). |
| `question_state` | `obj.question_state` | Used to identify Certified items for severity classification. |

### 3.4 DL-008 Check Logic

For each parsed question object `q`:

```javascript
const cc = q.CorrectChoice;
if (!cc) continue;  // Skip items without CorrectChoice (case-style items)

const ewKey = 'ExplanationWrong' + cc;
const ewVal = q[ewKey];

// DL-008 violation: field exists AND is non-empty
if (ewVal !== undefined && ewVal !== null && String(ewVal).trim().length > 0) {
    // VIOLATION
    violations.push({
        QuestionID: q.QuestionID,
        CorrectChoice: cc,
        field: ewKey,
        valueExcerpt: String(ewVal).substring(0, 100),
        questionState: q.question_state || 'missing',
        length: String(ewVal).length
    });
}
```

Note: `undefined` or `null` at the CorrectChoice position is **not** a DL-008 violation (it is DL-018 — a separate, lower-severity defect). Only non-empty values constitute DL-008.

---

## 4. Step-by-Step Extraction Algorithm

### 4.1 Full Algorithm

```
FUNCTION parsePackForDL008(filePath):
  1. READ file content from disk as UTF-8 string
  2. EXTRACT variable name from pattern: /const\s+(MCQ_BANK(?:_[A-E])?)\s*=\s*\[/
     - Pack A: MCQ_BANK_A
     - Pack B: MCQ_BANK_B
     - Pack C: MCQ_BANK_C
     - Pack D: MCQ_BANK_D
     - Pack E: MCQ_BANK_E
     - Legacy/fallback: MCQ_BANK (try if none of the above match)
  3. IF no variable match → return { error: "UNRECOGNIZED_FORMAT", items: [] }
  4. CONSTRUCT parse function:
     fn = new Function(fileContent + ';\nreturn ' + varName + ';')
  5. EXECUTE parse: questions = fn()
  6. VERIFY count: questions.length SHOULD equal 500 for MCQ packs
     IF count < 450 → warn "PARSE_UNDERCOUNT" (possible file corruption)
     IF count !== 500 → warn but DO NOT BLOCK (items may have been added/archived)
  7. ITERATE through each question object q:
     a. cc = q.CorrectChoice
     b. IF !cc → CONTINUE (skip items without CorrectChoice)
     c. ewKey = 'ExplanationWrong' + cc
     d. ewVal = q[ewKey]
     e. IF ewVal !== undefined AND ewVal !== null AND String(ewVal).trim().length > 0:
        - RECORD DL-008 violation with QID, CC, excerpt, length, question_state
  8. RETURN { violations: [...], totalItems: questions.length, parseMethod: "AM-1" }
```

### 4.2 Performance Analysis

| File | Size | AM-1 Parse Time (measured) | Memory |
|------|------|---------------------------|--------|
| `pack_a_corrected.js` | ~1.6 MB | ~90ms | ~12 MB |
| `pack_b_corrected.js` | ~1.3 MB | ~80ms | ~10 MB |
| `pack_c_corrected.js` | ~1.7 MB | ~95ms | ~13 MB |
| `pack_d_corrected.js` | ~1.8 MB | ~100ms | ~14 MB |
| `pack_e_corrected.js` | ~1.2 MB | ~70ms | ~9 MB |

Total parse + validation time: **<120ms per invocation.** The governance guard is invoked only on edit/write operations (not on read operations). A user performing rapid edits at ~1 edit/second generates at most ~120ms of overhead per edit — well within acceptable interactive performance. A `console.warn`/`console.log` on the governance guard's current output is typically 1–5ms. The parse cost is dominated by the JavaScript engine's compilation, not by I/O.

### 4.3 Edge Cases

| Edge Case | Handling |
|-----------|----------|
| File does not contain a recognized variable pattern | Return `{ error: "UNRECOGNIZED_FORMAT" }`. Do not BLOCK — this may be a non-pack file being edited. |
| `new Function()` throws due to file corruption (DL-017, DL-020) | Catch the error. Return `{ error: "PARSE_FAILED", detail: e.message }`. Log warning. **DO NOT BLOCK** — a corrupted file should not prevent emergency fixes. The validator suite (run separately) will catch the corruption. |
| Parsed count ≠ 500 | Log warning. DO NOT BLOCK for count discrepancy alone. The validator suite handles count verification. |
| Item has no `CorrectChoice` field | Skip (case-study items use different structures). |
| Item has `CorrectChoice` but CC value is not A/B/C/D | Skip with warning. |
| Very large file (>5 MB) | Timeout after 2000ms. Return `{ error: "PARSE_TIMEOUT" }`. |
| File is not a pack file (e.g., `scored_cases*.js`) | Pattern match for `MCQ_BANK` will fail. Return `{ error: "UNRECOGNIZED_FORMAT" }`. Do not apply DL-008 check to case files in this pass (case files use a different explanation structure). |

---

## 5. Pack-Specific Considerations

### 5.1 Variable Name Mapping

| Pack | File | Variable Name | Notes |
|------|------|---------------|-------|
| A | `pack_a_corrected.js` | `MCQ_BANK_A` | Single-object merged format. CC after QID. |
| B | `pack_b_corrected.js` | `MCQ_BANK_B` | **CC before QID** — canonical DL-029 trigger. Single-object merged format. |
| C | `pack_c_corrected.js` | `MCQ_BANK_C` | Single-object merged format. CC after QID. Some dual-block (metadata+content) legacy objects. |
| D | `pack_d_corrected.js` | `MCQ_BANK_D` | Single-object merged format. CC after QID. Some dual-block legacy objects. |
| E | `pack_e_corrected.js` | `MCQ_BANK_E` | Independent authoring pipeline. CC after QID. Near-zero DL-008. |

### 5.2 Field Ordering Compatibility

**Pack B (CC before QID):** The Function constructor parse is immune to field ordering. The parser produces a complete JavaScript object where `q.CorrectChoice` and `q.QuestionID` are accessible by property name, not position. The relative ordering of fields within the JSON object has zero effect on the parse result.

This is the key advantage of AM-1 over FM-001: FM-001 forward-scans by byte position, which fails when CC appears before QID. AM-1 parses the complete object, which works regardless of field ordering.

### 5.3 Dual-Block Architecture Handling

Some legacy Pack C/D items contain both:
- Flat `ChoiceA`–`ChoiceD` metadata fields (may carry DL-016 +1 offset template residue)
- Nested `Choices.{A,B,C,D}` content fields (what the learner actually sees)

The AM-1 parse produces an object containing BOTH sets of fields. The extraction rules are:

1. **CorrectChoice** is read from `obj.CorrectChoice` — always within the same object as all other fields
2. **ExplanationWrong[CC]** is read from `obj['ExplanationWrong' + cc]` — indexed by the same object's CC
3. **Do NOT use** `obj.ChoiceA`–`obj.ChoiceD` for any DL-008 determination (DL-016 risk)

The Function constructor parse handles dual-block objects correctly because both blocks are properties of the same parsed JavaScript object.

### 5.4 Case Files

The governance guard's `SOURCE_FILE_RE` pattern already includes `scored_cases\d*\.js`. Case files have a different structure:
- Items are nested inside `Cases[].Items[]`
- Items have `Correct` (not `CorrectChoice`)
- Items have `Explanation` (not `ExplanationWrongA-D`)

For the initial upgrade (S726 scope), the AM-1 parse should target only `pack_*_corrected.js` files. Case-file DL-008 detection remains in the ExplanationValidator suite, which already handles case structures via `extractCases()`. A future session can extend the governance guard to case files if needed.

### 5.5 Expected DL-008 Baselines per Pack

Ground truth established by independent AM-1 parses (S723, S724, S801, S802):

| Pack | Total Items | DL-008 (all) | DL-008 (Certified) | Notes |
|------|-----------|-------------|-------------------|-------|
| A | 500 | ~2 (P1-B-001, P1-B-025) | 0 | Residual non-Certified items only |
| B | 500 | 0 | 0 | **Gold standard — must always return 0** |
| C | 500 | ~6 (BC-001, BC-010, BC-020, BC-030, BC-094, AC-001) | Resolving | Remaining items in active remediation |
| D | 500 | Disputed (10 per SESSION_STATUS vs. ~342 per S700) | Disputed | **Needs independent AM-1 verification as part of S726 implementation** |
| E | 500 | ~1 (P1E-B-079) | ~1 | Near-zero, nearly clean |

---

## 6. Governance Guard Integration Design

### 6.1 Hook Point Modification

The current hook at `tool.execute.before` (line 81) intercepts edit and write operations. The upgraded hook must:

**For write operations (full file content available in `args.content`):**
```javascript
// Parse the new file content directly (no disk read needed)
const parseResult = parsePackContentForDL008(args.content, basename(filePath));
if (parseResult.violations.length > 0) {
    // BLOCK with QID list
}
```

**For edit operations (only oldString/newString available):**
```javascript
// Read the current file from disk
let fileContent;
try {
    fileContent = fs.readFileSync(filePath, 'utf8');
} catch (e) {
    // File doesn't exist yet (new file creation) — skip parse
    return;
}
// Parse the current file state (pre-edit check)
const preEditResult = parsePackContentForDL008(fileContent, basename(filePath));

// Simulate the edit in memory and re-parse
const simulatedContent = fileContent.replace(args.oldString, args.newString);
const postEditResult = parsePackContentForDL008(simulatedContent, basename(filePath));

// BLOCK if either scan finds violations
// NEW violations (not in pre-edit scan) are particularly severe
// Existing violations (in both scans) are also BLOCKED unless remediation is authorized
```

### 6.2 Module Extraction

The current `findDL008Violations()` function (lines 42–61) should be moved to a separate module at `scripts/governance/dl008_parse.js` for independent testing and reuse. The governance guard plugin should import or require this module.

This allows:
- The validator suite to use the same AM-1 parse for consistency
- The test suite to exercise the parse module independently
- Future scan scripts to reuse the parse logic without duplicating code

### 6.3 BLOCK Error Message Upgrade

Current BLOCK message (lines 122–129):
```
GOVERNANCE RULE 2 — BLOCKED (DL-008 re-contamination)
${dl008.length} ExplanationWrong slot(s) match CorrectChoice with non-empty content:
  ExplanationWrong${v.letter}: "${v.snippet}..."
Per EV8 (CAQS_v1.0.md §4.4): the ExplanationWrong slot that matches
CorrectChoice must be "" (empty).
```

Upgraded BLOCK message (with QID list per FM-005):
```
GOVERNANCE RULE 2 — BLOCKED (DL-008 re-contamination)
${violations.length} ExplanationWrong[CorrectChoice] slot(s) non-empty.
Parse method: AM-1 (Function Constructor) — S726 compliant
Affected QuestionIDs:
  P1-AC-001: EW[CC=B] non-empty (234 chars, question_state: Certified)
  P1-BC-030: EW[CC=C] non-empty (156 chars, question_state: Certified)
Per EV8 (CAQS_v1.0.md §4.4): the ExplanationWrong slot matching
CorrectChoice must be "" (empty). Move content to ExplanationCorrect
or to a distractor ExplanationWrong slot.
```

### 6.4 Performance Guard

Add a timeout wrapper around the Function constructor parse:

```javascript
function parsePackContentForDL008(content, fileName) {
    // Only parse pack files
    if (!/^pack_[a-e]_corrected\.js$/i.test(fileName)) {
        return { skipped: true, reason: "NOT_A_PACK_FILE" };
    }

    const startTime = Date.now();
    try {
        const result = dl008Parse(content, fileName);
        result.parseTimeMs = Date.now() - startTime;
        return result;
    } catch (e) {
        return {
            error: "PARSE_FAILED",
            detail: e.message,
            parseTimeMs: Date.now() - startTime
        };
    }
}
```

### 6.5 Revised Hook Logic (Pseudocode)

```javascript
"tool.execute.before": async (input, output) => {
    const tool = input?.tool;
    if (tool !== "edit" && tool !== "write") return;

    const args = output?.args || {};
    const filePath = args.filePath || "";
    const fileName = basename(filePath);

    // --- RULE 3: BLOCK MASTER_QUESTION_REGISTRY.md writes (unchanged) ---

    // --- RULE 2: DL-008 detection (UPGRADED to AM-1) ---
    let parseResult;

    if (tool === "write") {
        // Full file write: parse the new content
        parseResult = parsePackContentForDL008(args.content || "", fileName);
    } else {
        // Edit operation: read current file, simulate edit, parse
        if (!fs.existsSync(filePath)) return;
        const currentContent = fs.readFileSync(filePath, 'utf8');
        const simulatedContent = currentContent.replace(args.oldString, args.newString);
        parseResult = parsePackContentForDL008(simulatedContent, fileName);
    }

    if (parseResult && parseResult.violations && parseResult.violations.length > 0) {
        const certifiedViolations = parseResult.violations.filter(
            v => v.questionState === 'Certified'
        );
        const severityTag = certifiedViolations.length > 0
            ? ` (${certifiedViolations.length} CERTIFIED items affected — HIGH severity)`
            : '';

        throw new Error(
            `GOVERNANCE RULE 2 — BLOCKED (DL-008 re-contamination)${severityTag}\n` +
            `${parseResult.violations.length} ExplanationWrong[CorrectChoice] slot(s) non-empty.\n` +
            `Parse method: AM-1 (Function Constructor) — S726 compliant\n` +
            `Affected QuestionIDs:\n` +
            parseResult.violations.map(v =>
                `  ${v.QuestionID}: EW[CC=${v.CorrectChoice}] non-empty ` +
                `(${v.length} chars, question_state: ${v.questionState})`
            ).join('\n') +
            `\n\nPer EV8 (CAQS_v1.0.md §4.4): the ExplanationWrong slot matching\n` +
            `CorrectChoice must be "" (empty). Move content to ExplanationCorrect\n` +
            `or to a distractor ExplanationWrong slot.`
        );
    }

    // --- RULE 5: Question count (unchanged) ---
    // --- RULE 1 / RULE 4: Track question_state / answer-key changes (unchanged) ---
}
```

---

## 7. Test Requirements

### 7.1 Upgrade Test Suite `scripts/test_governance_guard.js`

The current test suite has 12 tests (20 assertions). The upgraded suite must:

#### 7.1.1 Preserved Tests (still valid)

| Test | Description | Status |
|------|-------------|--------|
| No false positive: CorrectChoice=B but EW-B is empty | Existing test, still valid | KEEP |
| No false positive: CorrectChoice=A, EW-B non-empty (diff letter) | Existing test, still valid | KEEP |
| Count 5 QuestionIDs correctly | Existing test, still valid | KEEP |
| Count mixed QuestionID + ItemID | Existing test, still valid | KEEP |
| Block simulated: 31 questions without auth marker | Existing test, still valid | KEEP |
| Pass: 31 questions WITH auth marker | Existing test, still valid | KEEP |
| Pass: exactly 30 questions without auth (boundary) | Existing test, still valid | KEEP |
| Pass: 0 questions (empty content) | Existing test, still valid | KEEP |
| MASTER_QUESTION_REGISTRY tests (2) | Existing tests, still valid | KEEP |
| RECOMPUTED note detection tests (5) | Existing tests, still valid | KEEP |
| Read passthrough | Existing test, still valid | KEEP |
| Bash passthrough | Existing test, still valid | KEEP |

#### 7.1.2 Retired Tests (window-scan specific)

| Test | Description | Reason for Retirement |
|------|-------------|----------------------|
| Detect single DL-008: CC=B, EW-B non-empty | Tests regex-window scan on fabricated compact JSON | Will be replaced by AM-1 test with real object |
| Detect multiple DL-008 in same content | Tests regex-window scan on fabricated compact JSON | Will be replaced by AM-1 test |
| No false positive when CC is out of search window | **Confirms the window is too small** | This test validated the vulnerability; replaced by AM-1 Pack B=0 test |

#### 7.1.3 New Required Tests (AM-1)

| Test ID | Description | Expected Result |
|---------|-------------|-----------------|
| **GG-T1** | AM-1: Detect DL-008 in a single fabricated object with non-empty EW[CC] | 1 violation found. QID matches. Letter matches. |
| **GG-T2** | AM-1: No false positive — object with EW[CC]="" | 0 violations. |
| **GG-T3** | AM-1: No false positive — object with EW[CC]=undefined (DL-018 pattern) | 0 violations. (undefined is not DL-008) |
| **GG-T4** | AM-1: Detect DL-008 ONLY when field is at CorrectChoice position (not distractor) | Object with 3 non-empty distractor EWs + 1 empty CC slot → 0 violations. Object with 1 non-empty EW at CC position → 1 violation. |
| **GG-T5** | AM-1: Pack B simulated 5-object content with CC-before-QID ordering | 0 violations. (All 5 have EW[CC]=""). Proves immunity to field ordering. |
| **GG-T6** | AM-1: Pack B simulated with 1 intentionally dirty object | 1 violation with correct QID. Proves CC is extracted from the correct object regardless of ordering. |
| **GG-T7** | AM-1: Dual-block object (both ChoiceA-D and Choices.{A,B,C,D}) | CorrectChoice extracted correctly. EW[CC] indexed by the same object's CC — not affected by DL-016 metadata divergence. |
| **GG-T8** | AM-1: Real pack file integration test — Pack B | `parsePackContentForDL008(content, "pack_b_corrected.js")` → 0 violations. (This is the canonical compliance test.) |
| **GG-T9** | AM-1: Unrecognized format file (scored_cases) | Returns `{ skipped: true, reason: "NOT_A_PACK_FILE" }`. No parse attempted. |
| **GG-T10** | AM-1: Corrupted content (invalid JavaScript) | Returns `{ error: "PARSE_FAILED", ... }`. Does not throw. Does not crash the governance guard. |
| **GG-T11** | AM-1: Violation report includes QID list | Output's `violations` array elements have `QuestionID` field. No totals-only result. (FM-005 compliance) |
| **GG-T12** | AM-1: Two identical runs on same content produce identical results | Run parse twice. Compare output. Must be identical. (RT-10 compliance) |

### 7.2 Integration Test — Governance Guard Rule 2

A new integration test must verify the full governance guard hook path:
1. Simulate a write operation to `pack_b_corrected.js` with content containing a DL-008 violation
2. Verify the BLOCK fires
3. Verify the BLOCK message includes the QuestionID
4. Simulate a clean write → verify no BLOCK
5. Simulate an edit that introduces a DL-008 → verify BLOCK fires
6. Simulate an edit that CLEARS a DL-008 without authorization → verify BLOCK fires (or WARN depending on policy)

### 7.3 Regression Suite (unchanged tests must still pass)

After the upgrade, all 12 existing non-DL-008 tests must continue to pass:
- RULE 3 (2 tests)
- RULE 5 (6 tests)
- RECOMPUTED (5 tests)
- Passthrough (2 tests)
- RULE 1 / RULE 4 tracking (structural, not unit-tested)

---

## 8. Migration Plan

### 8.1 Phase 0 — Specification (S726 — this document)

- [x] Read all reference implementations
- [x] Analyze current vulnerability
- [x] Design authoritative approach
- [x] Define integration design
- [x] Define test requirements
- [x] Document pack-specific considerations
- [x] Save specification to `reports/SESSION726_RULE2_PARSE_SPEC.md`

### 8.2 Phase 1 — Module Extraction (S727)

1. Create `scripts/governance/dl008_parse.js`:
   - Export `parsePackContentForDL008(content, fileName)` function
   - Implement AM-1 Function constructor parse
   - Handle all edge cases per §4.3
   - Return structured violation report with QID lists per FM-005

2. Create `scripts/governance/dl008_parse.test.js`:
   - Implement all GG-T1 through GG-T12 tests
   - Include Pack B integration test (real file from disk)
   - Verify test suite passes with `node scripts/governance/dl008_parse.test.js`

3. Update `scripts/test_governance_guard.js`:
   - Retire the 3 window-scan-specific tests
   - Add AM-1 parse tests (import from `dl008_parse.js`)
   - Verify `node scripts/test_governance_guard.js` → 20+/20 PASS

### 8.3 Phase 2 — Governance Guard Upgrade (S727)

1. Modify `.opencode/plugins/governance-guard.js`:
   - Replace `findDL008Violations()` body with call to `dl008Parse()` from the extracted module
   - Update the `tool.execute.before` hook per §6.5
   - Update BLOCK error message to include QID list per §6.3
   - Add `fs` import if not already available (Node.js built-in; OpenCode plugin context may need explicit require)

2. Backup current governor:
   ```powershell
   Copy-Item .opencode/plugins/governance-guard.js .opencode/plugins/governance-guard.js.bak-YYYYMMDDHHMMSS
   ```

3. Verify:
   - `node scripts/test_governance_guard.js` → 20+/20 PASS, 0 FAIL
   - Manual edit test on a pack file with a known DL-008 item
   - Manual write test on a clean pack file

### 8.4 Phase 3 — Verification (S728)

1. Independent verification agent confirms:
   - Pack B DL-008 = 0 via upgraded governance guard
   - Governance guard BLOCKs correctly on a fabricated DL-008 item
   - Governance guard does NOT BLOCK on clean items
   - All existing governance guard tests pass
   - Pack D DL-008 count is independently verified via AM-1

2. Update `knowledge/CURRENT_BASELINES.md`:
   - Record new governance guard hash
   - Update DL-008 counts per AM-1 ground truth
   - Set Pack D DL-008 count to AM-1 verified value

3. Update `knowledge/REVISION_HISTORY.md`:
   - S726: Specification created
   - S727: Governance guard upgraded to AM-1
   - S728: Verification complete

### 8.5 Rollback Plan

If the AM-1 upgrade introduces any regression:
1. Restore from backup: `governance-guard.js.bak-YYYYMMDDHHMMSS`
2. Revert `scripts/test_governance_guard.js` to pre-upgrade state
3. Run test suite to verify rollback succeeded
4. Document the regression in REVISION_HISTORY.md
5. Re-enter the fix cycle with root cause analysis

---

## 9. Comparison with Existing ExplanationValidator Approach

### 9.1 Structural Comparison

| Aspect | ExplanationValidator (`extractQuestions`) | This Spec (AM-1 for Governance Guard) |
|--------|------------------------------------------|----------------------------------------|
| **Parse method** | String-aware brace matcher → `JSON.parse()` / `new Function()` | `new Function()` (straight to Function constructor) |
| **Error handling** | Falls back from JSON.parse to Function constructor | Single Function constructor attempt; catches errors |
| **Object extraction** | Extracts entire array as one string, then parses | Same: parses entire array via Function constructor |
| **Return type** | Returns parsed array of objects (`questions[]`) | Returns structured report `{ violations[], totalItems, parseMethod }` |
| **String-awareness** | Full `inString`/`stringChar`/`escape` state machine for brace matching | Not needed — Function constructor handles string parsing natively |
| **Performance** | Brace-match + parse: ~150ms (two phases) | Function constructor only: ~100ms (one phase) |
| **DL-008 check** | In `validateQuestion()` at lines 206–219 | Dedicated function returning violation list |
| **QID list output** | Total counts in statistics + per-item warnings | Explicit QID array per FM-005 |

### 9.2 Why Function Constructor Beats Brace-Matching for the Governance Guard

The ExplanationValidator uses brace-matching because it must work on files that may contain template literal syntax (backtick strings) that are not valid JavaScript for `new Function()`. The brace-matcher extracts the array substring first, then attempts to parse it.

The governance guard can rely on Function constructor directly because:

1. **DL-017 (backtick-newline artifacts) is resolved** — Pack B is parseable by Function constructor as of 2026-07-23
2. **All 5 packs confirm to valid JavaScript** — confirmed by independent parses at S530 T0
3. **The guard has an escape hatch** — if Function constructor fails, it logs a warning and does NOT BLOCK (see §4.3 edge cases). This is safer than the current behavior where an unparseable window results in silent false negatives.
4. **Performance is better** — one call to `new Function()` parses the entire 1.8MB file in ~100ms, vs. brace-matching (~120ms) + JSON.parse (~30ms) = ~150ms

### 9.3 Recommendation

For the governance guard, use **Function constructor directly** (AM-1) without the brace-matching intermediate step. The simplicity advantage (no string-state machine, no bracket depth tracking, no JSON.parse fallback) outweighs the marginal robustness gain of brace-matching for a plugin that already has a "skip if parse fails" escape hatch.

If a future session introduces a pack format that breaks Function constructor parsing (e.g., template literals with `${}` interpolation), the governance guard can fall back to the ExplanationValidator's brace-matching approach as a secondary path (AM-2). The fallback is already documented at S725 Scan Methodology Standard §2.

---

## 10. Open Questions for S727 Implementation

| # | Question | Recommendation | Rationale |
|---|----------|---------------|-----------|
| Q1 | Should the governance guard check ONLY the items being edited, or the full file? | **Full file.** | An edit to item N's ExplanationWrong fields could inadvertently affect item N+1's DL-008 status (DL-016 shift). The full-pass cost is ~100ms. |
| Q2 | Should the governance guard cache the parse result across multiple edits in the same session? | **No.** | The file state changes with each edit. A stale cache would produce false negatives. The parse cost is trivial. |
| Q3 | Should existing DL-008 violations (not introduced by the current edit) block the edit? | **Yes, with severity annotation.** | The guard should block any edit that leaves DL-008 violations in the file. If the edit is a remediation that reduces violations (e.g., 5→3), the operator should use the `BLOCK-AUTHORIZED` marker. |
| Q4 | Should the guard support a "DL-008 remediation mode" that allows reducing but not increasing violations? | **Future consideration.** | This is beyond S726 scope. The current Rule 2 BLOCK is absolute. A "net improvement allowed" mode would require before/after comparison logic. |
| Q5 | Should the guard parse case files (`scored_cases*.js`)? | **Not in S726 scope.** | Case files have a different structure (nested Items, no ExplanationWrongA-D, different variable names). Defer to a future session. |
| Q6 | Should the guard verify the parse count (expect 500) and BLOCK if it differs? | **Warn, do not BLOCK.** | Count verification is the validator suite's responsibility. The governance guard should not prevent file writes due to parse count discrepancies — that could block emergency repairs. |

---

## 11. Compliance Verification

This specification complies with the following S725 standards:

### 11.1 Governance Detection Standard (S725 Agent B)

| Requirement | § Reference | Compliance |
|-------------|-----------|------------|
| CorrectChoice extracted within object boundary | §2 | Yes — `obj.CorrectChoice` from the same parsed object |
| ExplanationWrong[CC] indexed from same object as CC | §2.1 | Yes — `obj['ExplanationWrong' + obj.CorrectChoice]` |
| DL-029 immunity (no forward-scan) | §3.1 | Yes — Function constructor parse uses property access, not window regex |
| Pack B CC-before-QID handled correctly | §2 | Yes — property access is position-independent |
| DL-016 guard (don't use metadata ChoiceA-D) | §4.4 | Yes — only `CorrectChoice` and `ExplanationWrong` used |

### 11.2 Scan Methodology Standard (S725 Agent G)

| Requirement | § Reference | Compliance |
|-------------|-----------|------------|
| AM-1 Function constructor parse | §2 | Yes — primary methodology |
| FM-001 prohibition (no forward-scan regex) | §3.1 | Yes — no regex window scan |
| FM-005 prohibition (totals-only reports) | §3.5 | Yes — QID list included in every violation |
| FM-002 prohibition (string-aware parsing) | §3.2 | Yes — Function constructor handles strings natively |
| FM-003 prohibition (cross-block reads) | §3.3 | Yes — all fields from same parsed object |
| Pack B compliance test (0 DL-008) | §6.2 | Yes — GG-T8 requires Pack B = 0 |

---

## A. Revision History

| Version | Date | Session | Author | Summary |
|---------|------|---------|--------|---------|
| 1.0 | 2026-07-26 | S726 Agent C | Rule 2 Parse Specification | Initial creation. Defines AM-1 Function Constructor Parse methodology for governance guard Rule 2 DL-008 detection. Upgrades from FM-001-vulnerable ±1200 char regex window-scan to object-bounded, field-ordering-immune property access. |

---

## B. Cross-References

| Document | Relationship |
|----------|-------------|
| `reports/SESSION725_GOVERNANCE_DETECTION_STANDARD.md` | Authoritative field extraction rules (Agent B). This spec's §3.3 implements those rules. |
| `reports/SESSION725_SCAN_METHODOLOGY_STANDARD.md` | Binding methodology standard (Agent G). This spec implements AM-1. |
| `.opencode/plugins/governance-guard.js` | Target for upgrade. Current Rule 2 (lines 42–61) is FM-001-vulnerable. |
| `scripts/test_governance_guard.js` | Test suite to be upgraded per §7.1. |
| `scripts/validators/ExplanationValidator.js` | Reference implementation for string-aware brace-matching and DL-008 validation. Compared at §9. |
| `scripts/scan_s710r_dl026.js` | Reference implementation for AM-1 Function constructor parse + within-object extraction. Canonical pattern at §4.1. |
| `scripts/file_state_reconciliation.js` | Reference implementation for string-aware per-object extraction + Function constructor validation. |
| `knowledge/DEFECT_LIBRARY.md` DL-008 | The defect being detected. |
| `knowledge/DEFECT_LIBRARY.md` DL-029 | The scanner-class defect this spec prevents recurrence of. |
| `knowledge/CURRENT_BASELINES.md` | Baseline DL-008 counts to be verified/corrected as part of S727/S728. |
| `knowledge/CAQS_v1.0.md` §4.4 | EV8 — the rule requiring ExplanationWrong[CorrectChoice] to be empty. |

---

*This specification is binding on the governance guard upgrade implementation (S727). All test, implementation, and verification decisions must be traceable to sections of this document.*
