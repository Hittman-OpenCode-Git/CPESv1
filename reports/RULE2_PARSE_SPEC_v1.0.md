# Rule 2 Parse Specification v1.0 — Function Constructor Methodology

**Version:** 1.0
**Status:** Active — Read-Only Specification (implementation pending)
**Authority:** SESSION725_SCAN_METHODOLOGY_STANDARD.md §2 (AM-1), SESSION725_GOVERNANCE_DETECTION_STANDARD.md §4.2
**Session:** S726 Agent C — Function Constructor Parse Specification
**Date:** 2026-07-26
**Depends On:**
- `reports/SESSION725_SCAN_METHODOLOGY_STANDARD.md` (Approved Methodologies AM-1/AM-2/AM-3, Forbidden Methodologies FM-001 through FM-008)
- `reports/SESSION725_GOVERNANCE_DETECTION_STANDARD.md` (Dual-Block Inventory, Canonical Field Extraction Table)
- `knowledge/DEFECT_LIBRARY.md` (DL-008, DL-020, DL-029)
- `knowledge/CURRENT_BASELINES.md` (Pack hashes, Certified counts)
- `AGENTS.md` §5 (Dual Verification), §6 (Count Stability)

---

## 1. Purpose

This specification defines the **authoritative parsing path for DL-008 detection** that shall replace the current FM-001-vulnerable forward-scan regex in:

1. `.opencode/plugins/governance-guard.js` — Rule 2 BLOCK (`findDL008Violations()`)
2. `scripts/test_governance_guard.js` — Rule 2 test cases (current `findDL008Violations()` clone)

**Why:** The governance guard's current `findDL008Violations()` function (governance-guard.js lines 42–61; test_governance_guard.js lines 16–33) uses a ±1200-character window forward-scan from `ExplanationWrong[letter]` to find a matching `CorrectChoice`. This methodology is **DL-029-vulnerable** because Pack B stores `CorrectChoice` before `QuestionID` within each JSON object. Forward-scanning produces a ~75% false-positive rate on Pack B (257 phantom DL-008 vs. 0 actual). Per S725 Scan Methodology Standard §2.1 and §10.2, this must be upgraded to Function Constructor Parse (AM-1).

**Non-goals:** This specification does NOT define the parser for Rule 3 (registry), Rule 5 (30-item cap), Rule 1 (question_state tracking), or Rule 4 (answer-key tracking). Those rules are out of scope.

---

## 2. Authoritative Extraction Path

### 2.1 Step-by-Step DL-008 Detection (Post-Migration)

The governance guard's Rule 2 shall execute the following sequence when a write/edit tool targets a pack file:

```
STEP 1 — File Identification
    Determine if the target file is a pack file.
    Pattern: /^pack_[a-e]_corrected\.js$/i
    If NOT a pack file → skip Rule 2 for this write.

STEP 2 — Read Source File
    Read the pack file from disk at its current path.
    This is the pre-write state (before the tool's change is applied).
    All 5 packs are in the repository root.
    
STEP 3 — AM-1 Function Constructor Parse
    Execute the reference implementation (see §2.2):
    - Extract variable name from `const MCQ_BANK_X = [`
    - Parse via `new Function(fileContent + '; return MCQ_BANK_X;')`
    - Result: a native JavaScript array of parsed question objects
    - Validate: questions.length === 500 for each pack
    
STEP 4 — For Each Question Object
    Extract fields within the SAME enclosing object:
      a. cc = question.CorrectChoice           (Content Block)
      b. ewSlot = 'ExplanationWrong' + cc       (Metadata Block, indexed by Content Block CC)
      c. ewValue = question[ewSlot]             (Value at that slot)
      
    DL-008 check:
      if (ewValue !== undefined && ewValue !== "") → VIOLATION
    
    Collect violations as { QuestionID, CorrectChoice, ewExcerpt }
    
STEP 5 — Return Result
    Return array of DL-008 violation objects.
    Each violation must include:
      - QuestionID: string
      - CorrectChoice: single letter A-D
      - ewExcerpt: first 80 characters of the non-empty EW field
    
    If violations.length > 0 → BLOCK the write.
```

### 2.2 Reference Implementation (Governance Guard — Rule 2 Replacement)

This is the exact code that shall replace `findDL008Violations()` in governance-guard.js:

```javascript
/**
 * AM-1 Function Constructor Parse — DL-008 detection.
 * Replaces the FM-001-vulnerable ±1200-char forward-scan regex.
 * 
 * @param {string} filePath — Full path to a pack file
 * @param {string} fileContent — Raw file text (optional; reads from disk if not provided)
 * @returns {{ questionID: string, correctChoice: string, ewExcerpt: string }[]}
 */
function findDL008Violations_AM1(filePath, fileContent) {
    const fs = require('fs');
    const path = require('path');
    
    // STEP 1: Identify pack letter
    const baseName = path.basename(filePath);
    const packMatch = baseName.match(/^pack_([a-e])_corrected\.js$/i);
    if (!packMatch) return []; // Not a pack file — skip
    
    // STEP 2: Read file content if not provided
    if (!fileContent) {
        fileContent = fs.readFileSync(filePath, 'utf8');
    }
    
    // STEP 3: AM-1 Function Constructor Parse
    const varMatch = fileContent.match(/const\s+MCQ_BANK_([A-E])\s*=\s*\[/);
    if (!varMatch) {
        // File may be structurally invalid — fall through to error
        console.warn(`[governance-guard] Unrecognized pack format: ${filePath}`);
        return [];
    }
    const varName = 'MCQ_BANK_' + varMatch[1];
    
    let questions;
    try {
        const fn = new Function(fileContent + '; return ' + varName + ';');
        questions = fn();
    } catch (parseError) {
        console.warn(`[governance-guard] AM-1 parse failed for ${filePath}: ${parseError.message}`);
        // Fall back to AM-2 (object-bounded string-aware parse) — see §5.2
        return findDL008Violations_AM2(filePath, fileContent);
    }
    
    // VALIDATE: Item count must be 500
    if (!Array.isArray(questions) || questions.length !== 500) {
        console.warn(
            `[governance-guard] Pack ${packMatch[1]} parse-count=${questions ? questions.length : 0}, expected 500. ` +
            `Falling back to AM-2.`
        );
        return findDL008Violations_AM2(filePath, fileContent);
    }
    
    // STEP 4: Within-record DL-008 check
    const violations = [];
    for (const q of questions) {
        const cc = q.CorrectChoice;
        if (!cc || !/^[A-D]$/.test(cc)) continue;
        
        const ewSlot = 'ExplanationWrong' + cc;
        const ewValue = q[ewSlot];
        
        if (ewValue !== undefined && ewValue !== '') {
            violations.push({
                questionID: q.QuestionID || '(unknown)',
                correctChoice: cc,
                ewExcerpt: String(ewValue).substring(0, 80)
            });
        }
    }
    
    return violations;
}
```

### 2.3 AM-2 Fallback (Object-Bounded, String-Aware Brace-Matched Parse)

When AM-1 fails (file corruption, non-standard format), fall back to AM-2.
This is the same string-aware brace-matcher from `scripts/validators/ExplanationValidator.js` (line 114, post DL-020 fix)
and SESSION725_SCAN_METHODOLOGY_STANDARD.md §2 (AM-2):

```javascript
/**
 * AM-2 fallback: String-aware object-bounded parse.
 * Used when Function constructor fails (file corruption, non-standard format).
 */
function findDL008Violations_AM2(filePath, fileContent) {
    const fs = require('fs');
    if (!fileContent) {
        fileContent = fs.readFileSync(filePath, 'utf8');
    }
    
    const violations = [];
    const qidPositions = [];
    
    // Find all QuestionID positions
    const qidRe = /"QuestionID"\s*:\s*"([^"]+)"/g;
    let qidMatch;
    while ((qidMatch = qidRe.exec(fileContent)) !== null) {
        qidPositions.push({ qid: qidMatch[1], pos: qidMatch.index });
    }
    
    for (const { qid, pos } of qidPositions) {
        // Locate enclosing { } via string-aware brace-matcher
        const openBrace = findEnclosingBrace(fileContent, pos);
        if (!openBrace) continue;
        
        const objText = fileContent.substring(openBrace.open, openBrace.close + 1);
        
        // Extract CorrectChoice and ExplanationWrong fields from this object text
        const ccMatch = objText.match(/"CorrectChoice"\s*:\s*"([A-D])"/);
        if (!ccMatch) continue;
        const cc = ccMatch[1];
        
        const ewRe = new RegExp(`"ExplanationWrong${cc}"\\s*:\\s*"([^"]*)"`);
        const ewMatch = objText.match(ewRe);
        if (!ewMatch) continue; // Field absent (DL-018 pattern) — not a violation
        
        const ewValue = ewMatch[1];
        if (ewValue !== '') {
            violations.push({
                questionID: qid,
                correctChoice: cc,
                ewExcerpt: ewValue.substring(0, 80)
            });
        }
    }
    
    return violations;
}

/**
 * String-aware brace matcher — per DL-020 fix specification.
 * Scans backward from anchorPos for '{' and forward for matching '}'.
 */
function findEnclosingBrace(text, anchorPos) {
    let inString = false;
    let stringChar = null;
    let escape = false;
    let depth = 0;
    let open = -1;
    let close = -1;
    
    // Scan backward from anchor to find opening {
    for (let i = anchorPos; i >= 0; i--) {
        const ch = text[i];
        if (escape) { escape = false; continue; }
        if (ch === '\\') { escape = true; continue; }
        if ((ch === '"' || ch === "'") && !inString) { inString = true; stringChar = ch; continue; }
        if (ch === stringChar && inString) { inString = false; stringChar = null; continue; }
        if (!inString) {
            if (ch === '}') depth++;
            if (ch === '{') {
                if (depth === 0) { open = i; break; }
                depth--;
            }
        }
    }
    if (open === -1) return null;
    
    // Reset and scan forward to find matching }
    inString = false; stringChar = null; escape = false; depth = 0;
    for (let i = open; i < text.length; i++) {
        const ch = text[i];
        if (escape) { escape = false; continue; }
        if (ch === '\\') { escape = true; continue; }
        if ((ch === '"' || ch === "'") && !inString) { inString = true; stringChar = ch; continue; }
        if (ch === stringChar && inString) { inString = false; stringChar = null; continue; }
        if (!inString) {
            if (ch === '{') depth++;
            if (ch === '}') {
                depth--;
                if (depth === 0) { close = i; break; }
            }
        }
    }
    
    return close !== -1 ? { open, close } : null;
}
```

---

## 3. Object Boundaries

### 3.1 Primary Method — AM-1 Function Constructor

**Boundary identification is handled by the JavaScript engine.** The Function constructor evaluates the entire file as JavaScript source code. The array literal `MCQ_BANK_X = [ ... ]` is parsed by the engine, which inherently handles:
- JSON object boundaries (`{` to matching `}`)
- String literal content (including brackets/braces inside strings)
- Escape sequences
- Inter-object whitespace and formatting variations
- Comments (if any — none currently in pack files)

**No manual boundary detection is required.** Each element of the returned array is a fully parsed question object. Field access is direct property access: `q.CorrectChoice`, `q.ExplanationWrongB`, etc.

### 3.2 Fallback Method — AM-2 String-Aware Brace Matcher

When AM-1 fails, the fallback uses `findEnclosingBrace()` as defined in §2.3:

1. Locate `"QuestionID"` in the file
2. Scan backward for the enclosing `{` (string-aware — skip brackets inside quoted strings)
3. Scan forward to the matching `}` (same string-awareness)
4. Extract the complete object text
5. Extract `CorrectChoice` and `ExplanationWrong[CC]` via regex within that object text

**Self-verification:** After extracting all objects, compare `extractedCount` against `grep -c '"QuestionID"'`. Any discrepancy is a CRITICAL error (per Scan Methodology Standard §4.1).

### 3.3 Invalid Methods — Prohibited by This Specification

The following boundary-identification approaches are **prohibited**:

| Method | Why Prohibited | Defect |
|--------|---------------|--------|
| Fixed window (±N chars from QuestionID) | Questions vary in size; window truncates or spans adjacent items | FM-003 |
| Forward-scan regex from QuestionID to find CC | CC may appear before QuestionID in object (Pack B) | FM-001, DL-029 |
| String-unaware brace counter | Brackets inside stem/explanation text corrupt the counter | FM-002, DL-020 |
| Flat regex on whole file (not object-bounded) | Cannot distinguish which object a field belongs to | FM-004, DL-016 |

---

## 4. Field Authorities

### 4.1 Canonical Field Extraction Table (Rule 2 Scope)

Per SESSION725_GOVERNANCE_DETECTION_STANDARD.md §2, all fields for DL-008 must be extracted from the **same enclosing JSON object**:

| Field | Authoritative Source Block | Field Path | Role in DL-008 |
|-------|---------------------------|-----------|-----------------|
| `CorrectChoice` | Content Block | `object.CorrectChoice` | Determines which ExplanationWrong slot to check |
| `ExplanationWrongA` | Metadata Block | `object.ExplanationWrongA` | Checked if CC=A |
| `ExplanationWrongB` | Metadata Block | `object.ExplanationWrongB` | Checked if CC=B |
| `ExplanationWrongC` | Metadata Block | `object.ExplanationWrongC` | Checked if CC=C |
| `ExplanationWrongD` | Metadata Block | `object.ExplanationWrongD` | Checked if CC=D |
| `QuestionID` | Content Block | `object.QuestionID` | Identifies the question in violation reports |

### 4.2 Extraction Dependency Rule

```
DL-008 check:  ExplanationWrong[CorrectChoice] === ""
```

Both `CorrectChoice` and the indexed `ExplanationWrong` field MUST come from the **same** call to `questions[i]` — i.e., the same element of the AM-1 parsed array. No cross-index, no proximity window, no positional heuristic. The Function constructor parse makes this trivial because `questions[i]` IS the complete enclosing JSON object.

### 4.3 What This Specification Does NOT Cover

- `Choices.{A,B,C,D}` vs. `ChoiceA-D` divergence (DL-016) — Rule 2 only checks EW[CC] emptiness, not EW content accuracy
- Whether EW text matches the choice it describes (DL-010) — out of scope
- `question_state` certification gating — out of scope for Rule 2
- Case study files (`scored_cases*.js`) — Rule 2 is pack-file-only

---

## 5. Validation Path

### 5.1 Primary Validation — Parse Count = Grep Count

After AM-1 parse, verify:

```javascript
const parseCount = questions.length;
const grepCount = (fileContent.match(/"QuestionID"\s*:/g) || []).length;
assert(parseCount === grepCount, `Parse count ${parseCount} ≠ grep count ${grepCount}`);
```

For all current packs, both must equal 500.

### 5.2 Pack B Gold Standard Test

The definitive validation of the migration is the Pack B test:

```
Input:  pack_b_corrected.js (500 items, CC-before-QID field ordering)
Expected: 0 DL-008 violations
```

Any non-zero result from Pack B indicates:
- The AM-1 parse failed (file corruption, parse error)
- If AM-2 fallback was used, the AM-2 implementation is incorrect
- If AM-1 succeeded but returned >0, the field-extraction logic is flawed

**Pack B is the canonical compliance test** (per Scan Methodology Standard §6.2). A migrated Rule 2 that returns >0 DL-008 on Pack B is non-compliant and must not be deployed.

### 5.3 Cross-Validation — AM-1 × AM-2

After migration, run both AM-1 and AM-2 on all 5 packs and verify:

```
AM-1 DL-008 count === AM-2 DL-008 count (for every pack)
AM-1 QID list === AM-2 QID list (identical QuestionIDs in violation reports)
```

Any discrepancy indicates a bug in the AM-2 fallback implementation.

### 5.4 Test Suite After Migration

The governance guard test suite MUST pass these post-migration tests:

| Test | Description | Expected |
|------|-------------|----------|
| GG-RT-AM1-1 | AM-1 DL-008 on Pack B | 0 violations |
| GG-RT-AM1-2 | AM-1 DL-008 on Pack E | 0 or 1 violation (P1E-B-079) |
| GG-RT-AM1-3 | AM-1 item count on all 5 packs | 500 each |
| GG-RT-AM1-4 | AM-1 parse fails gracefully on corrupted file | Returns [] (no throw) |
| GG-RT-AM1-5 | AM-1 returns QID list (not totals-only) | Every violation has `questionID` |
| GG-RT-AM2-1 | AM-2 fallback on Pack B | 0 violations |
| GG-RT-AM2-2 | AM-2 string-aware: bracket-in-stem | All 500 items extracted |
| GG-RT-XVAL-1 | AM-1 vs. AM-2 cross-validation on Pack A | Identical QID lists |

### 5.5 Runtime Guard — G1–G5 Reconciliation Trigger

If at **any** checkpoint the AM-1 parse produces:
- `questions.length !== 500` for any pack
- DL-008 count on Pack B > 0
- Two independent scans (AM-1 vs. AM-2 or AM-1 vs. AM-1 repeat) disagree

Then the G1–G5 reconciliation runbook is triggered per Scan Methodology Standard §4.1.

---

## 6. Migration from Current

### 6.1 What Changes in governance-guard.js

| Component | Current (FM-001) | Post-Migration (AM-1) |
|-----------|-----------------|----------------------|
| **Detection function** | `findDL008Violations(text)` — regex window-scan | `findDL008Violations_AM1(filePath, fileContent)` — Function constructor parse |
| **Input** | Diff text (`oldContent + newContent`) | Full pack file read from disk |
| **CorrectChoice extraction** | Regex forward-scan ±1200 chars from EW match | Direct property access: `q.CorrectChoice` |
| **ExplanationWrong extraction** | Regex for `"ExplanationWrong([A-D])"` | Direct property access: `q['ExplanationWrong' + cc]` |
| **False positive rate on Pack B** | ~75% (257 phantom DL-008) | **0%** |
| **Object boundary awareness** | None — flat regex on window | Inherent — JavaScript engine handles parsing |
| **String-awareness** | None | Inherent — JavaScript engine handles strings |
| **Hook point** | `tool.execute.before` (lines 81–130) | Same hook, different detection function |

### 6.2 What Changes in test_governance_guard.js

| Test | Current | Post-Migration |
|------|---------|----------------|
| Test 1 — Single DL-008 | Synthetic JSON string + regex window-scan | Read actual pack file with a known DL-008 item, or use a synthetic file + mock fs |
| Test 2 — Multiple DL-008 | Synthetic + regex | AM-1 parse of a pack section with known multiple DL-008 |
| Test 3 — No false positive (EW empty) | Synthetic + regex | AM-1 parse of Pack B (known 0 DL-008) |
| Test 4 — No false positive (different letter) | Synthetic + regex | Covered by Pack B test |
| Test 5 — Window out-of-range | Synthetic + padding | **REMOVED** — window concept no longer exists |
| **NEW Test** — AM-1 item count | N/A | Verify `questions.length === 500` for each pack |
| **NEW Test** — AM-1 Pack B = 0 | N/A | Function constructor parse Pack B → 0 DL-008 |
| **NEW Test** — AM-2 fallback | N/A | Verify AM-2 produces same results as AM-1 |
| **NEW Test** — AM-1 parse failure graceful | N/A | Corrupted file does not throw |

### 6.3 Code Removal

The following code in `governance-guard.js` is removed:

- **Lines 42–61** (`findDL008Violations()`): Replaced with `findDL008Violations_AM1()` + `findDL008Violations_AM2()` fallback
- **Lines 114–116** (old `checkText` computation): No longer needed — we read the full file from disk, not the diff text

The following code in `test_governance_guard.js` is removed:

- **Lines 16–33** (`findDL008Violations()` clone): Replaced with the AM-1 implementation
- **Test 5** (window out-of-range): Window concept is removed

### 6.4 Migration Sequencing

```
Phase 1 (this spec) — Specification approved
    ↓
Phase 2 — Write AM-1 functions in governance-guard.js + test_governance_guard.js
    ↓
Phase 3 — Run Pack B gold standard test (must return 0)
    ↓
Phase 4 — Cross-validate AM-1 vs. AM-2 on all 5 packs
    ↓
Phase 5 — Run full governance guard test suite (target: 20/20 → 24/24 with new tests)
    ↓
Phase 6 — Deploy (replace old findDL008Violations with AM-1)
```

### 6.5 Backward Compatibility

- The existing Rule 1, 3, 4, 5 enforcement is unchanged
- The `session.idle` hook is unchanged
- The `tool.execute.before` hook signature is unchanged — only the DL-008 detection function is swapped
- The hook still fires on `edit` and `write` tools targeting pack files

---

## 7. Test Suite Requirements

### 7.1 Required New Tests (to be added to test_governance_guard.js)

```
TEST-R2-AM1-001: AM-1 parse count validation
    Input: pack_a_corrected.js (read from disk)
    Verify: questions.length === 500

TEST-R2-AM1-002: AM-1 Pack B gold standard — zero DL-008
    Input: pack_b_corrected.js (read from disk)
    Verify: DL-008 violations === 0
    Rationale: Pack B stores CC before QID. Forward-scan regex produced 257 false positives.
              AM-1 must produce 0. This is the canonical compliance test (Scan Standard §6.2).

TEST-R2-AM1-003: AM-1 Pack E near-zero DL-008
    Input: pack_e_corrected.js (read from disk)
    Verify: DL-008 violations <= 2 (expected: 1 — P1E-B-079, + possibly 1 residual)

TEST-R2-AM1-004: AM-1 parse failure — graceful degradation
    Input: A file with `const MCQ_BANK_Z = [` → unrecognized pack letter
    Verify: Returns [] (no throw), no crash

TEST-R2-AM1-005: AM-1 parse failure — parse error
    Input: A file with malformed JavaScript (missing closing bracket)
    Verify: Returns [] via AM-2 fallback, no crash

TEST-R2-AM1-006: Violation output format — QID lists
    Input: Any pack with a known DL-008 item
    Verify: Each violation has { questionID, correctChoice, ewExcerpt }
    Verify: No totals-only output (FM-005 prohibition)

TEST-R2-AM2-001: AM-2 fallback — Pack B = 0
    Input: pack_b_corrected.js, forced AM-2 path
    Verify: 0 violations
    Verify: Extracted item count === 500

TEST-R2-AM2-002: AM-2 string-awareness — bracket-in-string
    Input: A synthetic file with `"Stem": "Which of the following [A, B, C] is correct?"`
           plus bracket characters in ExplanationWrong text
    Verify: All items extracted (no silent drops — DL-020 immunity)

TEST-R2-XVAL-001: AM-1 vs. AM-2 cross-validation
    Input: All 5 pack files
    Verify: AM-1 DL-008 QID list === AM-2 DL-008 QID list
    Verify: AM-1 total count === AM-2 total count

TEST-R2-REG-001: Existing test 1 still passes (single DL-008 detection)
    Input: Synthetic JSON with CorrectChoice=B, ExplanationWrongB="text"
    Verify: AM-1 reports 1 violation with cc=B

TEST-R2-REG-002: Existing test 3 still passes (no false positive on empty EW)
    Input: Synthetic JSON with CorrectChoice=B, ExplanationWrongB=""
    Verify: AM-1 reports 0 violations

TEST-R2-REG-003: Existing test 4 still passes (no false positive on different letter)
    Input: Synthetic JSON with CorrectChoice=A, ExplanationWrongB="text"
    Verify: AM-1 reports 0 violations
```

### 7.2 Existing Tests — Status

| Test # | Description | Post-Migration Status |
|--------|-------------|----------------------|
| 1 | Single DL-008 detection | **RETAIN** — adapt to AM-1; synthetic JSON is valid for unit test |
| 2 | Multiple DL-008 detection | **RETAIN** — adapt to AM-1 |
| 3 | No false positive (EW="") | **RETAIN** — adapt to AM-1 |
| 4 | No false positive (different letter) | **RETAIN** — adapt to AM-1 |
| 5 | Window out-of-range | **REMOVED** — window concept no longer exists in AM-1 |
| 6–10 | Rule 5 (30-item cap) | **UNCHANGED** — Rule 5 is out of scope |
| 11–12 | Rule 3 (registry) | **UNCHANGED** — Rule 3 is out of scope |
| 13–17 | Rule 4 (recomputed note) | **UNCHANGED** — Rule 4 is out of scope |
| 18–19 | Read-only passthrough | **UNCHANGED** |
| 20 | Summary | **RETAIN** — count will update with new tests |

### 7.3 Governance Guard Test Suite — Target State

After migration, the test suite should report at minimum:

```
RULE 2 tests:  12 PASS, 0 FAIL  (5 retained + 7 new)
RULE 3 tests:   2 PASS, 0 FAIL  (unchanged)
RULE 4 tests:   5 PASS, 0 FAIL  (unchanged)
RULE 5 tests:   5 PASS, 0 FAIL  (unchanged)
Passthrough:    2 PASS, 0 FAIL  (unchanged)
─────────────────────────────────
TOTAL:         26 PASS, 0 FAIL
```

Up from current 20/20 to 26/26 (12 Rule 2 tests replacing the current 5).

---

## 8. Cross-References

### 8.1 Authoritative Standards

| Document | Section | Relevance |
|----------|---------|-----------|
| `reports/SESSION725_SCAN_METHODOLOGY_STANDARD.md` | §2.1 (AM-1), §3.1 (FM-001), §6 (Scan Tool Validation), §10.2 (Governance Guard Upgrade Directive) | Defines the approved methodology (AM-1) and forbids the current approach (FM-001) |
| `reports/SESSION725_GOVERNANCE_DETECTION_STANDARD.md` | §1 (Dual-Block Inventory), §2 (Canonical Field Extraction Table), §4.2 (Function Constructor Parse), §7 (Governance Guard Upgrade Directive) | Defines which fields come from which block and the extraction dependency rules |
| `knowledge/CURRENT_BASELINES.md` | §1 (Runtime-Critical Files), §2 (Certified Pool) | Provides the SHA-256 hashes and Certified counts that AM-1 must match |
| `AGENTS.md` | §5 (Dual Verification), §6 (Count Stability), §13 (Runtime Governance) | Mandates cross-verification against raw file/line evidence and requires stable counts |

### 8.2 Defect Library Entries

| Defect ID | Relevance |
|-----------|-----------|
| **DL-008** | The defect this specification detects. ExplanationWrong[CorrectChoice] non-empty. |
| **DL-020** | Parser infrastructure defect — string-unaware brace-matcher silently dropped items. AM-2 fallback must be string-aware. |
| **DL-029** | Scan methodology defect — forward-scan regex produces ~75% false positives on Pack B. AM-1 eliminates this defect class entirely. |
| **DL-016** | Metadata-block choice-text divergence. Not directly in scope for Rule 2 (DL-008 check), but field authority rules (§4) prevent cross-block reads. |
| **DL-017** | File corruption (backtick-newline artifacts). AM-1 requires valid JavaScript — if AM-1 fails on a corrupted file, AM-2 fallback is invoked. |
| **DL-018** | Missing ExplanationWrong[CC] fields. AM-1 handles this naturally: `q[ewSlot]` returns `undefined` → not a violation. |

### 8.3 Governance Files

| File | What Changes |
|------|-------------|
| `.opencode/plugins/governance-guard.js` | `findDL008Violations()` (lines 42–61) replaced with AM-1 implementation; `tool.execute.before` DL-008 check path updated |
| `scripts/test_governance_guard.js` | `findDL008Violations()` clone replaced; 5 old Rule 2 tests replaced with 12 new tests; total 20 → 26 tests |
| `knowledge/CURRENT_BASELINES.md` | Must be updated post-migration with new governance-guard.js hash |

### 8.4 Historical Incidents This Specification Prevents

| Incident | Session | What Happened | How This Spec Prevents It |
|----------|---------|---------------|--------------------------|
| 257 false DL-008 on Pack B | S700–S722A | Forward-scan regex read next item's CC | AM-1: CC extracted from same object as EW via property access |
| 67 phantom Certified DL-008 | S800 | Regex window scan with totals-only output | AM-1: per-item QID lists; Pack B gold standard test catches false positives |
| DL-020 silent drops (139 items) | 2026-07-23 | String-unaware brace-matcher | AM-1: no brace-matching; AM-2 fallback: string-aware per spec |
| Tier 0 false alarm | 2026-07-23 | Flat regex matched metadata-block ChoiceA instead of content block | AM-1: no regex — extracted fields are inherently from the same object |

---

## A. Quick Reference — Do's and Don'ts

| Do | Don't |
|----|-------|
| ✅ Use `new Function(fileContent + '; return MCQ_BANK_X;')` | ❌ Search forward from QuestionID for CorrectChoice |
| ✅ Extract CC and EW[CC] from the same `questions[i]` object | ❌ Use a ±N character window around ExplanationWrong |
| ✅ Verify `questions.length === 500` after every parse | ❌ Use regex to find `CorrectChoice` in a byte window |
| ✅ Run Pack B gold standard test (expect 0 DL-008) | ❌ Assume CC always follows QuestionID in the object |
| ✅ Fall back to AM-2 (string-aware brace-matcher) if AM-1 fails | ❌ Use a string-unaware brace counter |
| ✅ Include QuestionID in every violation report | ❌ Report totals without QID lists |
| ✅ Cross-validate AM-1 vs. AM-2 on all packs | ❌ Deploy without running Pack B = 0 test |

---

## B. Revision History

| Version | Date | Session | Author | Summary |
|---------|------|---------|--------|---------|
| 1.0 | 2026-07-26 | S726 Agent C | Function Constructor Parse Specification | Initial specification. Defines AM-1 migration path for governance-guard.js Rule 2. Replaces FM-001-vulnerable forward-scan regex with Function Constructor Parse. Includes AM-2 fallback, test suite requirements, and cross-validation gates. |

---

*This specification is binding on the implementation of governance-guard.js Rule 2. No DL-008 detection may be performed using forward-scan regex after migration is complete. All scan results produced by FM-001 methodology are retroactively invalidated per SESSION725_SCAN_METHODOLOGY_STANDARD.md §3.1.*
