# Session 726 — Rule 2 Enforcement Upgrade: Forward Scan → Function Constructor Parse

**Version:** 1.0
**Status:** Read-Only Design (implementation NOT authorized)
**Authority:** SESSION725_SCAN_METHODOLOGY_STANDARD.md §10.2, RULE2_PARSE_SPEC_v1.0.md
**Session:** S726 Agent D — Migration Architecture Design
**Date:** 2026-07-26
**Depends On:**
- `reports/SESSION725_SCAN_METHODOLOGY_STANDARD.md` — AM-1 approved, FM-001 forbidden (§10.2 upgrade directive)
- `reports/RULE2_PARSE_SPEC_v1.0.md` — Agent C's Function Constructor Parse Specification
- `.opencode/plugins/governance-guard.js` — Current guard (lines 42–61 FM-001 vulnerable)
- `scripts/test_governance_guard.js` — Current test suite (20 tests)

---

## 1. Executive Summary

The governance guard's Rule 2 (`findDL008Violations()`) uses an FM-001-vulnerable ±1200-character forward-scan regex that produces documented false positives (257 on Pack B, 67 in S800, 885+ collective) and is prohibited by the S725 Scan Methodology Standard §3.1. The S725 Standard §10.2 and the Rule 2 Parse Specification v1.0 mandate migration to Function Constructor Parse (AM-1).

This document defines the complete architecture, step-by-step implementation plan, test strategy, rollback path, and risk assessment for that migration.

### 1.1 Migration Scope

| Component | Change |
|-----------|--------|
| `governance-guard.js` — Rule 2 detection | Replace `findDL008Violations(text)` with `findDL008Violations_AM1(filePath, fileContent)` + AM-2 fallback |
| `governance-guard.js` — Rule 2 hook logic | Read full pack file from disk; apply edit/write to content; parse both pre/post states; diff violations |
| `governance-guard.js` — New dependencies | `fs`, `path` (require calls added to plugin top-level) |
| `test_governance_guard.js` — Rule 2 tests | Replace 5 tests with 12 tests; total suite 20 → 26 |
| `test_governance_guard.js` — Test infrastructure | Add pack file reading capability, mock filesystem, synthetic test packs |

### 1.2 What Does NOT Change

- Rule 1 (question_state → REVISION_HISTORY tracking) — unchanged
- Rule 3 (MASTER_QUESTION_REGISTRY.md block) — unchanged
- Rule 4 (answer-key → recomputed note tracking) — unchanged
- Rule 5 (≤30 question cap) — unchanged
- `session.idle` hook (warnings) — unchanged
- `session.deleted` hook — unchanged
- Plugin registration in `opencode.json` — unchanged

---

## 2. Current State Analysis

### 2.1 Current Architecture (FM-001 Vulnerable)

```
┌─────────────────────────────────────────────────────────────────────┐
│ tool.execute.before                                                 │
│                                                                     │
│  tool = "edit" or "write"                                           │
│                                                                     │
│  ┌─ checkText = oldContent + newContent (edit)                      │
│  │            = newContent              (write)                     │
│  │                                                                  │
│  ├─ findDL008Violations(checkText)                                  │
│  │   │                                                              │
│  │   ├─ Regex: /"ExplanationWrong([A-D])"\s*:\s*"([^"]+)"/gi       │
│  │   └─ For each match: forward-scan ±1200 chars                    │
│  │       for matching "CorrectChoice":"letter"                      │
│  │       └─ If found → VIOLATION → BLOCK                           │
│  │                                                                  │
│  └─ If violations > 0 → throw Error (BLOCK)                         │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Current Code (governance-guard.js lines 42–61)

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

### 2.3 Documented Failure Modes

| Failure Mode | Root Cause | Impact |
|-------------|------------|--------|
| 257 false DL-008 on Pack B | CC-before-QID in Pack B; forward-scan reads NEXT item's CC | Governance guard would BLOCK clean edits |
| S800: 67 phantom Certified DL-008 | Regex window scan + totals-only report | Emergency remediation on items that were already clean |
| 885+ collective false positives (S700–S722A) | FM-001 methodology systemic | Audit churn, phantom defect tracking, wasted agent cycles |
| Window-truncation: real DL-008 missed if EW[CC] > ±1200 chars from CC in object | Fixed window doesn't account for large question objects | False negatives — real DL-008 introduced by edit would pass guard |

### 2.4 Critical Design Gap: Snippet-Only Checking

The current guard checks ONLY the change snippet text (`oldContent + newContent` for edit, `newContent` for write). It does NOT read the full pack file from disk. This means:

1. **No QID-level tracking** — Cannot distinguish "this edit introduces DL-008 to QID X" from "the change snippet coincidentally contains text that looks like a DL-008 pattern"
2. **No pre/post comparison** — Cannot distinguish "edit introduces new DL-008" from "file already had DL-008, edit doesn't change that QID"
3. **No object boundary awareness** — Flat regex on text fragment; no concept of which JSON object a field belongs to
4. **Synthetic false positive risk** — Edit snippet containing comment text or old content with ExplanationWrong[letter] and CorrectChoice in proximity can trigger BLOCK falsely

---

## 3. Target State Design

### 3.1 Target Architecture (AM-1 Compliant)

```
┌─────────────────────────────────────────────────────────────────────┐
│ tool.execute.before                                                 │
│                                                                     │
│  tool = "edit" or "write"                                           │
│  file = basename matches /^pack_[a-e]_corrected\.js$/i ?            │
│                                                                     │
│  IF NOT a pack file → SKIP Rule 2                                   │
│                                                                     │
│  ┌─ STEP A: Read pre-write file from disk                           │
│  │   fs.readFileSync(filePath, 'utf8')                              │
│  │                                                                  │
│  ├─ STEP B: Construct post-write file content                       │
│  │   write: postContent = newContent                                │
│  │   edit:  postContent = preContent.replace(oldString, newString)  │
│  │                                                                  │
│  ├─ STEP C: DL-008 scan on pre-write file                          │
│  │   ┌─ findDL008Violations_AM1(filePath, preContent)              │
│  │   │   ├─ AM-1: Function constructor parse                        │
│  │   │   │   ├─ Extract MCQ_BANK_X variable name                    │
│  │   │   │   ├─ Parse via new Function()                            │
│  │   │   │   ├─ Validate questions.length === 500                   │
│  │   │   │   └─ For each q:  q['ExplanationWrong'+q.CorrectChoice]  │
│  │   │   │       if non-empty → violation                           │
│  │   │   └─ Fallback: AM-2 (string-aware object-bounded parse)      │
│  │   └─ Result: preViolations = Set(preQIDs with DL-008)            │
│  │                                                                  │
│  ├─ STEP D: DL-008 scan on post-write file content                  │
│  │   └─ Same AM-1 on postContent                                    │
│  │   └─ Result: postViolations = Set(postQIDs with DL-008)          │
│  │                                                                  │
│  ├─ STEP E: Diff — new violations only                              │
│  │   newViolations = postViolations ∖ preViolations                │
│  │                                                                  │
│  └─ STEP F: If newViolations.length > 0 → BLOCK                     │
│      └─ Report: QID list, CorrectChoice, EW excerpt for each        │
└─────────────────────────────────────────────────────────────────────┘
```

### 3.2 Key Design Decision: Pre/Post Diff vs. Full-File Block

**Decision: Pre/Post Diff (Recommended)**

| Approach | Pros | Cons |
|----------|------|------|
| **Full-file block** (block if any DL-008 in post-write file) | Simple; no pre-scan needed | Blocks edits to files with pre-existing DL-008 on unrelated QIDs |
| **Pre/post diff** (block only new violations) | Targeted; preserves ability to edit files with unremediated DL-008 elsewhere | Requires two AM-1 parses (one pre, one post); ~2× compute cost |

**Rationale for Pre/Post Diff:**
- Pack A currently has ~2 known DL-008 items (P1-B-001, P1-B-025) that are Unprocessed and not yet remediated. A full-file block would prevent any edit to Pack A until those 2 items are remediated — coupling remediation dependencies unnecessarily.
- Pack C has ~6 known DL-008 items. Same issue.
- The current guard's behavior is "check the change snippet" — it doesn't block edits to files with pre-existing issues elsewhere. The migration should preserve this property.
- The cost of two AM-1 parses (~50-100ms per 500-item pack) is acceptable for a write-time gate.

**Refinement for the `write` tool:**
When `tool === "write"` (writing the entire file), the pre-write state is the file on disk, and the post-write state is `args.content`. The diff still applies — if the new file content has DL-008 violations that didn't exist in the old file, BLOCK.

### 3.3 Core Function Signatures

#### 3.3.1 Primary: `findDL008Violations_AM1(filePath, fileContent)`

```javascript
/**
 * AM-1 Function Constructor Parse — DL-008 detection.
 * 
 * @param {string} filePath  — Full path to a pack file (used for pack letter identification)
 * @param {string} fileContent — Raw file text (UTF-8)
 * @returns {{ questionID: string, correctChoice: string, ewExcerpt: string }[]}
 *          Empty array if:
 *          - File is not a recognized pack file (returns [])
 *          - Parse succeeds but 0 DL-008 found (returns [])
 *          - Parse fails → falls back to AM-2 → returns AM-2 result
 */
function findDL008Violations_AM1(filePath, fileContent) { ... }
```

#### 3.3.2 Fallback: `findDL008Violations_AM2(filePath, fileContent)`

```javascript
/**
 * AM-2 fallback: String-aware object-bounded parse.
 * Only invoked when AM-1 fails (Function constructor throws or count ≠ 500).
 * 
 * Uses string-aware brace-matcher per DL-020 fix specification.
 * Self-verifies: extracted count must match grep count.
 * 
 * @param {string} filePath
 * @param {string} fileContent
 * @returns {{ questionID: string, correctChoice: string, ewExcerpt: string }[]}
 */
function findDL008Violations_AM2(filePath, fileContent) { ... }
```

#### 3.3.3 Helper: `findEnclosingBrace(text, anchorPos)`

```javascript
/**
 * String-aware brace matcher.
 * Scans backward from anchorPos for '{' and forward for matching '}'.
 * Tracks inString, stringChar, escape — per DL-020 immunity specification.
 * 
 * @param {string} text
 * @param {number} anchorPos — position of QuestionID to find enclosing {} for
 * @returns {{ open: number, close: number } | null}
 */
function findEnclosingBrace(text, anchorPos) { ... }
```

#### 3.3.4 Helper: `isPackFile(filePath)`

```javascript
/**
 * @param {string} filePath
 * @returns {boolean} true if file matches /^pack_[a-e]_corrected\.js$/i
 */
function isPackFile(filePath) { ... }
```

### 3.4 Modified Hook: `tool.execute.before`

The existing hook signature is preserved. Only the DL-008 detection logic changes.

```javascript
"tool.execute.before": async (input, output) => {
    const tool = input?.tool;
    if (tool !== "edit" && tool !== "write") return;

    const args = output?.args || {};
    const filePath = args.filePath || "";
    const sessionID = String(input?.sessionID || "default");
    const state = getState(sessionID);

    const newContent = tool === "write"
        ? (args.content || "")
        : (args.newString || "");
    const oldContent = tool === "edit"
        ? (args.oldString || "")
        : "";

    // ── RULE 3: Registry protection (UNCHANGED) ──
    // ... existing RULE 3 block ...

    // ── RULE 2: DL-008 detection — AM-1 Migration ──
    if (isPackFile(filePath)) {
        // Read pre-write file from disk
        const fs = require('fs');
        let preContent;
        try {
            preContent = fs.readFileSync(filePath, 'utf8');
        } catch (readError) {
            // File doesn't exist yet (new file creation via write)
            // Only check the new content
            preContent = "";
        }

        // Construct post-write content
        let postContent;
        if (tool === "write") {
            postContent = newContent;
        } else {
            // edit: apply the replacement
            postContent = preContent.replace(oldContent, newContent);
        }

        // Scan pre-write state
        const preViolations = preContent
            ? findDL008Violations_AM1(filePath, preContent)
            : [];
        const preQIDs = new Set(preViolations.map(v => v.questionID));

        // Scan post-write state
        const postViolations = findDL008Violations_AM1(filePath, postContent);
        const newQIDs = postViolations.filter(v => !preQIDs.has(v.questionID));

        if (newQIDs.length > 0) {
            const lines = newQIDs
                .map(v => `  ${v.questionID} (CorrectChoice=${v.correctChoice}): "${v.ewExcerpt}..."`)
                .join("\n");
            throw new Error(
                `GOVERNANCE RULE 2 — BLOCKED (DL-008 introduced)\n` +
                `This change introduces ${newQIDs.length} new DL-008 violation(s):\n` +
                `${lines}\n\n` +
                `Per EV8 (CAQS_v1.0.md §4.4): the ExplanationWrong slot matching\n` +
                `CorrectChoice must be "" (empty).\n\n` +
                `Pre-existing DL-008 (${preViolations.length}) are NOT blocked.\n` +
                `Only newly introduced violations trigger this gate.`
            );
        }
    }

    // ── RULE 5: Question count (UNCHANGED) ──
    // ... existing RULE 5 block ...

    // ── RULE 1, RULE 4 tracking (UNCHANGED) ──
    // ... existing tracking ...
}
```

### 3.5 Critical Edge Cases

| Edge Case | Handling |
|-----------|----------|
| **File doesn't exist yet** (write tool creating new file) | `preContent = ""`, `preViolations = []`. Only post-write scan runs. |
| **AM-1 parse fails** (file corruption) | Falls back to AM-2 (string-aware object-bounded parse). If AM-2 also fails, returns `[]` (conservative — allow write; a separate file-corruption gate should handle this). |
| **AM-1 returns < 500 items** | Falls back to AM-2. Self-verification gate: if AM-2 count also ≠ grep count → CRITICAL finding. Returns `[]` (conservative allow, with console warn). |
| **Edit changes CorrectChoice** | AM-1 handles naturally: post-write object's CC differs from pre-write CC. The scan correctly identifies the new CC and checks its EW slot. |
| **Edit changes ExplanationWrong[CC]** from non-empty → empty | Correct behavior: if pre-write had DL-008 and post-write clears it, newViolations = 0 → pass. This is a repair edit, not a contamination edit. |
| **Edit changes ExplanationWrong[CC]** from empty → non-empty | Correct behavior: pre-write clean, post-write DL-008 → newViolations = 1 → BLOCK. |
| **Edit touches multiple QIDs** | Diff handles this: if edit spans 5 QIDs and 2 of them introduce DL-008, only those 2 new violations are flagged. |
| **Pack B CC-before-QID ordering** | AM-1 handles naturally: Function constructor returns parsed objects; `q.CorrectChoice` is correct regardless of field order in source. |
| **Non-pack file** (scored_cases*.js, app.js, etc.) | `isPackFile()` returns false → Rule 2 skipped entirely. No AM-1 parse attempted. |
| **File on disk has structural corruption** (DL-017 residue) | AM-1 throws → AM-2 fallback → if AM-2 also fails → `[]` returned → write allowed with console.warn. |

---

## 4. Gap Analysis — Current vs. Target

### 4.1 Plugin Capability Gaps

| Gap | Current State | Target State | Resolution |
|-----|-------------|--------------|------------|
| **File reading** | No `fs` access — only operates on diff text | Must read pack file from disk via `fs.readFileSync()` | Add `require('fs')` and `require('path')` at plugin top-level |
| **Object parsing** | No parsing — flat regex on text | Function constructor parse producing real JS objects | Add `new Function(fileContent + '; return MCQ_BANK_X;')` |
| **QID-level tracking** | No QID extraction — violations are {letter, snippet} | Each violation carries {questionID, correctChoice, ewExcerpt} | Update violation object schema |
| **Pre/post comparison** | No concept of pre-existing state | Pre-scan vs. post-scan diff | Two AM-1 calls, set difference on QIDs |
| **AM-2 fallback** | N/A | String-aware brace matcher for degraded mode | Implement per §3.3.3 |
| **Error handling** | None — regex silently returns [] on malformed input | Graceful degradation: parse failure → AM-2 → [] | try/catch chain |
| **Performance** | O(change-text-length) — regex scan on snippet | O(500 items × 2 scans) — ~1000 object property reads | Acceptable: ~50-100ms per scan |

### 4.2 Plugin Environment Constraints

**Critical finding:** The governance guard runs as an OpenCode plugin. The `tool.execute.before` hook receives `input` and `output` objects — it does NOT receive a direct `require('fs')` context (the plugin environment may or may not support Node.js built-in modules depending on OpenCode's plugin sandbox).

**Required verification before implementation:**
1. Does the OpenCode plugin environment support `require('fs')`?
2. Does it support `require('path')`?
3. Does `new Function()` execute in the plugin sandbox?
4. Are there file-size limits on `fs.readFileSync()` calls from plugins? (Pack files are ~1.5-2MB each)

**Fallback if `fs` is unavailable:**
- The plugin may need to use the `client` object to request file content from the OpenCode host
- Alternatively, the plugin may need to be split into a Node.js test component and a plugin-runtime component with reduced scope

**This is a pre-implementation gate.** Phase 2 (implementation) must not begin until the plugin sandbox capabilities are confirmed.

### 4.3 Tool Contract Gaps

| Field | Current | Target |
|-------|---------|--------|
| **args.filePath** | Used for Rule 3 (basename check), Rule 1/4 tracking | Additionally used to read pack file from disk |
| **args.oldString** | Used as part of checkText for regex | Used for file-content replace to construct post-write state |
| **args.newString** | Used as part of checkText for regex | Used for file-content replace to construct post-write state |
| **args.content** | Used for write tool's newContent | Used as full post-write file content for AM-1 parse |

All fields are already available in the current `output.args` object. No tool contract changes needed.

---

## 5. Implementation Plan

### 5.0 Pre-Implementation Gate

**PHASE 0 — Environment Verification (Blocking Gate)**

Before any code is written:

```
Step 0.1 — Verify fs availability in plugin sandbox
    Test: Add `const fs = require('fs');` to governance-guard.js.
    Run: node scripts/test_governance_guard.js
    Expected: Test suite runs without ModuleNotFoundError.
    If fails: Investigate OpenCode plugin sandbox. Possible workaround:
             Use client-provided file content API if available.

Step 0.2 — Verify new Function() availability in plugin sandbox
    Test: Run `new Function('return 42;')()` from within a plugin hook context.
    Expected: Returns 42.
    If fails: Cannot use AM-1. Must use AM-2 exclusively.

Step 0.3 — Verify fs.readFileSync() on pack files
    Test: Read pack_b_corrected.js from plugin hook.
    Expected: Returns ~1.3MB string, non-empty.
    If fails: File-access from plugin sandbox is restricted.
             Document limitation. Use AM-2 on pre-provided file content only.

Step 0.4 — Decision gate
    If ANY of 0.1–0.3 fails → report to governance board.
    Option 1: Relax plugin sandbox (requires OpenCode configuration change)
    Option 2: Implement AM-2-only path (no Function constructor, no disk read)
    Option 3: Move Rule 2 enforcement to a pre-commit/pre-write Node.js script
             (outside plugin sandbox)
```

### 5.1 Phase 1 — Write Replacement Functions (Read-Only)

1. Create a standalone verification script at `scripts/verify_am1_migration.js` that implements:
   - `findDL008Violations_AM1(filePath)` — reads file from disk, parses via Function constructor, returns violations array
   - `findDL008Violations_AM2(filePath, fileContent)` — string-aware object-bounded parse
   - `findEnclosingBrace(text, anchorPos)` — per DL-020 fix specification
   - `isPackFile(filePath)` — pack file basename check
2. Run on all 5 packs:
   - Pack A: verify ~2 DL-008 found (P1-B-001, P1-B-025)
   - Pack B: verify 0 DL-008 found (gold standard)
   - Pack C: verify ~6 DL-008 found
   - Pack D: verify findings array
   - Pack E: verify 0 or 1 DL-008 found (P1E-B-079 expected)
3. Cross-validate AM-1 vs. AM-2 on all 5 packs (identical QID lists)
4. Verify AM-1 parse count = 500 for all 5 packs
5. Verify AM-2 self-verification (extracted count = grep count)

**Phase 1 output:** Verified, tested functions ready for integration.

### 5.2 Phase 2 — Integrate into governance-guard.js

1. **Backup:** Copy `governance-guard.js` → `governance-guard.js.bak-S726-pre-migration`
2. **Add requires** at top of `governance-guard.js`:
   ```javascript
   const fs = require('fs');
   const path = require('path');
   ```
3. **Add helper functions:**
   - `isPackFile(filePath)` (after line 20, before `export`)
   - `findEnclosingBrace(text, anchorPos)` (after `findDL008Violations`, before `countQuestions`)
   - `findDL008Violations_AM2(filePath, fileContent)` (after `findEnclosingBrace`)
4. **Replace `findDL008Violations`** (lines 42–61) with `findDL008Violations_AM1(filePath, fileContent)` — implementing Algorithm §3.3.1
5. **Update `tool.execute.before` DL-008 section** (lines 112–130):
   - Add `isPackFile()` gate
   - Add pre-write file read from disk
   - Add post-write content construction
   - Add pre/post diff logic
   - Update error message format
6. **Maintain all other rules** (1, 3, 4, 5) and hooks unchanged
7. **Verify:** File passes `node -c` (syntax check) and `node -e "require('./.opencode/plugins/governance-guard.js')"` (load check, skipping async export)

### 5.3 Phase 3 — Update test_governance_guard.js

1. **Backup:** Copy `test_governance_guard.js` → `test_governance_guard.js.bak-S726-pre-migration`
2. **Replace Rule 2 test section** (lines 77–125) with 12 new tests per §7 of this document
3. **Add test infrastructure:**
   - Create a `test/fixtures/` directory with synthetic pack files:
     - `fixture_clean.js` — 3-item pack, 0 DL-008
     - `fixture_dirty.js` — 3-item pack, 1 DL-008 (EW[CC] non-empty)
     - `fixture_corrupt.js` — 3-item pack with malformed JSON (tests graceful degradation)
     - `fixture_nopack.js` — Not a pack file (tests `isPackFile()` gate)
4. **For AM-1 integration tests** (Pack B gold standard etc.), read actual pack files from `../pack_b_corrected.js` etc.
5. **Preserve Rules 3, 4, 5 tests** unchanged (lines 127–239)
6. **Update summary count:** Expected 26 PASS (was 20)
7. **Run:** `node scripts/test_governance_guard.js` → 26 PASS, 0 FAIL

### 5.4 Phase 4 — Cross-Validation

1. Run AM-1 on all 5 packs via the governance-guard functions
2. Run AM-2 on all 5 packs via the governance-guard functions
3. Verify identical QID lists for all 5 packs
4. Run the test suite 3 times consecutively (stability check)
5. Document all results

### 5.5 Phase 5 — Soft Deploy (Non-Blocking Mode)

1. Temporarily modify the BLOCK → console.warn (log violations but don't throw)
2. Run through a full session: make a known-clean edit to a pack file
3. Verify the guard correctly identifies 0 new violations and allows the edit
4. Make a known-dirty edit (introduce DL-008 on purpose, on a non-critical QID, then immediately revert)
5. Verify the guard correctly identifies the new violation and reports it
6. Revert the dirty edit, verify guard allows the revert
7. **Soft deploy output:** Log of all guard activations, with pre/post QID lists

### 5.6 Phase 6 — Hard Deploy (BLOCK Mode)

1. Restore BLOCK → throw Error
2. Run full test suite: `node scripts/test_governance_guard.js` → 26/26
3. Update `knowledge/CURRENT_BASELINES.md`:
   - New governance-guard.js hash (SHA-256)
   - New test_governance_guard.js hash (SHA-256)
4. Document in `knowledge/REVISION_HISTORY.md`

---

## 6. File-by-File Change Specification

### 6.1 `.opencode/plugins/governance-guard.js`

| Line Range | Change | Description |
|-----------|--------|-------------|
| 1–15 | MODIFY header comment | Add AM-1 migration note, DL-029 immunity claim, S726 reference |
| After 20 | ADD `isPackFile()` | Helper: pack file basename check |
| 42–61 | REPLACE `findDL008Violations()` | With `findDL008Violations_AM1()` — Function constructor parse per §3.3.1 |
| After 61 | ADD `findEnclosingBrace()` | String-aware brace matcher per §3.3.3 |
| After findEnclosingBrace | ADD `findDL008Violations_AM2()` | AM-2 fallback per §3.3.2 |
| 81–86 | MODIFY hook gate | Add `isPackFile(filePath)` check before DL-008 scan |
| 112–130 | REPLACE DL-008 block section | With pre/post diff logic per §3.4 |
| 131+ | UNCHANGED | Rules 1, 3, 4, 5; session.idle; session.deleted |

**Total lines:** ~217 → ~350 (estimated, including AM-1, AM-2, findEnclosingBrace, and pre/post diff logic)

### 6.2 `scripts/test_governance_guard.js`

| Line Range | Change | Description |
|-----------|--------|-------------|
| 7 | ADD | `const fs = require('fs');` |
| 8 | ADD | `const path = require('path');` |
| 16–33 | REPLACE `findDL008Violations()` | With AM-1 + AM-2 implementations (mirroring governance-guard.js) |
| After 33 | ADD helper functions | `isPackFile()`, `findEnclosingBrace()`, `findDL008Violations_AM2()` |
| 77–125 | REPLACE RULE 2 tests (5 tests) | With 12 new AM-1 tests per §7.3 |
| 243 | MODIFY summary line | Expected: 26 PASS (was 20) |

### 6.3 New Files

| File | Purpose |
|------|---------|
| `scripts/verify_am1_migration.js` | Standalone verification script (Phase 1 output) — runs AM-1 on all 5 packs, prints QID lists, cross-validates AM-1 vs. AM-2 |
| `test/fixtures/fixture_clean.js` | Synthetic 3-item pack file, 0 DL-008, for unit tests |
| `test/fixtures/fixture_dirty.js` | Synthetic 3-item pack file, 1 DL-008, for unit tests |
| `test/fixtures/fixture_corrupt.js` | Synthetic 3-item pack file, malformed JSON, for graceful degradation tests |
| `test/fixtures/fixture_nopack.js` | Not a pack file format, for `isPackFile()` gate tests |

### 6.4 Files NOT Changed

| File | Reason |
|------|--------|
| `pack_*_corrected.js` | Content files — no changes |
| `scored_cases*.js` | Case files — Rule 2 is pack-only |
| `app.js` | Application code — no changes |
| `index_updated.html` | UI — no changes |
| `opencode.json` | Plugin registration unchanged |
| `scripts/build_master_registry.js` | Registry builder — no changes |
| `scripts/validators/ExplanationValidator.js` | Already has AM-2-compatible parser (post-DL-020 fix) |

---

## 7. Test Plan Updates

### 7.1 Existing Tests — Migration Status

| Test # | Name | Post-Migration Status |
|--------|------|----------------------|
| 1 | Detect single DL-008 | **REPLACED** — new test AM1-REG-001 (synthetic JSON via AM-1) |
| 2 | Detect multiple DL-008 | **REPLACED** — new test AM1-REG-002 (multi-item synthetic file) |
| 3 | No false positive: EW empty | **REPLACED** — new test AM1-REG-003 |
| 4 | No false positive: different letter | **REPLACED** — new test AM1-REG-004 |
| 5 | Window out-of-range | **REMOVED** — window concept no longer exists in AM-1 |
| 6–12 | Rules 3, 4, 5 | **UNCHANGED** — out of scope |
| 13–20 | Passthrough, summary | **UNCHANGED** — updated summary count only |

### 7.2 New AM-1 Tests

```
AM1-001: AM-1 parse count validation
    Input: fixture_clean.js (synthetic 3-item pack)
    Verify: AM-1 returns 3 items

AM1-002: AM-1 detects single DL-008
    Input: fixture_dirty.js (CorrectChoice=B, ExplanationWrongB non-empty)
    Verify: AM-1 returns 1 violation, questionID matches, CorrectChoice=B

AM1-003: AM-1 no false positive — empty EW[CC]
    Input: fixture_clean.js (CorrectChoice=B, ExplanationWrongB="")
    Verify: AM-1 returns 0 violations

AM1-004: AM-1 no false positive — different letter
    Input: Clean item: CorrectChoice=A, ExplanationWrongB="text about B"
    Verify: AM-1 returns 0 violations

AM1-005: AM-1 parse failure — graceful degradation
    Input: fixture_corrupt.js (malformed JavaScript)
    Verify: Returns [] (no throw), falls back to AM-2

AM1-006: AM-1 returns QID lists (not totals-only)
    Input: fixture_dirty.js
    Verify: Each violation has { questionID, correctChoice, ewExcerpt }

AM1-007: AM-1 non-pack file returns []
    Input: fixture_nopack.js (doesn't match pack file pattern)
    Verify: Returns [] immediately, no parse attempt

AM1-008: AM-1 Pack B gold standard
    Input: ../pack_b_corrected.js (real file, 500 items)
    Verify: 0 DL-008 violations. item count = 500.

AM1-009: AM-1 Pack E near-zero
    Input: ../pack_e_corrected.js (real file, 500 items)
    Verify: ≤ 2 DL-008 violations. item count = 500.

AM1-010: AM-2 fallback produces same results as AM-1
    Input: fixture_dirty.js (force AM-2 path)
    Verify: AM-2 violation QID list === AM-1 violation QID list

AM1-011: AM-2 string-awareness — brackets in stem
    Input: Synthetic file with "Stem": "Which of the following [A, B, C]..."
    Verify: All items extracted via AM-2, no silent drops

AM1-012: Pre/post diff — edit introduces DL-008
    Input: fixture_clean.js → edit that changes EW[CC] from "" to "text"
    Verify: Pre-scan = 0 violations, Post-scan = 1 violation, newViolations = 1
```

### 7.3 Preserved Tests (Unchanged)

```
05:  Count 5 QuestionIDs correctly
06:  Count mixed QuestionID + ItemID
07:  Block: 31 questions without auth
08:  Pass: 31 questions WITH auth
09:  Pass: exactly 30 questions (boundary)
10:  Pass: 0 questions (empty content)
11:  Detect MASTER_QUESTION_REGISTRY.md by basename
12:  Do NOT flag similar name different extension
13:  Detect 'recomputed'
14:  Detect 'independently verified'
15:  Detect 'independently recalculated'
16:  Detect 're-verified'
17:  No false positive: 'verified' alone
18:  Read tool passthrough
19:  Bash tool passthrough
```

### 7.4 Target Test Suite Summary

| Section | Tests | Status |
|---------|-------|--------|
| Rule 2 — AM-1 DL-008 detection | 12 | 7 new + 5 replaced |
| Rule 5 — Question count | 6 | Unchanged |
| Rule 3 — Registry protection | 2 | Unchanged |
| Rule 4 — Recompute note | 5 | Unchanged |
| Passthrough | 2 | Unchanged |
| **Total** | **27** | 20 → 27 (net +7) |

---

## 8. Integration Points

### 8.1 Within governance-guard.js

```
┌─ isPackFile(filePath) ──────────────────────────────────────┐
│  Gate: Only invoke AM-1 for pack_*_corrected.js files        │
│  Non-pack files bypass Rule 2 entirely                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ AM-1: findDL008Violations_AM1 ──────────────────────┐   │
│  │  Primary detection path                                │   │
│  │  ┌─ extractMcqBankVarName() → "MCQ_BANK_A" etc.      │   │
│  │  ├─ new Function() → parse                            │   │
│  │  ├─ validate: length === 500                          │   │
│  │  └─ for each q: q['ExplanationWrong'+q.CorrectChoice] │   │
│  └───────────────────────────────────────────────────────┘   │
│                          │ (on failure)                       │
│                          ▼                                    │
│  ┌─ AM-2: findDL008Violations_AM2 ──────────────────────┐   │
│  │  Fallback detection path                               │   │
│  │  ┌─ findEnclosingBrace() → string-aware               │   │
│  │  ├─ extract CorrectChoice regex within object         │   │
│  │  ├─ extract ExplanationWrong[CC] regex within object  │   │
│  │  └─ validate: extractedCount === grepCount            │   │
│  └───────────────────────────────────────────────────────┘   │
│                          │ (on failure)                       │
│                          ▼                                    │
│  ┌─ Return [] — conservative allow ──────────────────────┐   │
│  │  console.warn both parse methods failed               │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─ Pre/Post Diff ──────────────────────────────────────┐   │
│  │  preViolations  = AM-1(preContent)                    │   │
│  │  postViolations = AM-1(postContent)                   │   │
│  │  newViolations  = post - pre (set difference on QID)  │   │
│  │  if newViolations.length > 0 → BLOCK                 │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 8.2 With Other Rules

| Integration Point | Behavior |
|-------------------|----------|
| **Rule 2 ⊕ Rule 5** | Independent — both check the same tool call. If either blocks, the edit is rejected. Order: Rule 3 → Rule 2 → Rule 5. |
| **Rule 2 ⊕ Rule 1** | Independent — Rule 1 tracks `question_state` changes. An edit that introduces DL-008 AND changes `question_state` is blocked by Rule 2 before Rule 1 tracking fires. This is correct: the edit never executes. |
| **Rule 2 ⊕ Rule 4** | Independent — Rule 4 tracks `CorrectChoice` changes. An edit that changes CC AND introduces DL-008 is blocked by Rule 2 before Rule 4 tracking fires. |

### 8.3 With OpenCode Plugin Lifecycle

```
Plugin Load
    ↓
tool.execute.before (this is where Rule 2 runs)
    ├─ Rule 3 check
    ├─ Rule 2 check (AM-1 pre/post diff) ← MIGRATION TARGET
    ├─ Rule 5 check
    ├─ Rule 1 tracking
    └─ Rule 4 tracking
    ↓
Tool executes (edit/write happens on disk)
    ↓
session.idle (Rule 1, Rule 4 WARN flags)
    ↓
session.deleted (cleanup)
```

### 8.4 With scan_dl008.js and Other Tools

The governance guard is the **runtime enforcement** tier. The scan scripts in `scripts/` are the **audit/reporting** tier. The two tiers serve different purposes:

| Tier | Tool | Purpose | Methodology |
|------|------|---------|-------------|
| **Runtime enforcement** | `governance-guard.js` Rule 2 | BLOCK edits that introduce DL-008 | AM-1 (post-migration) |
| **Audit/reporting** | `scripts/scan_dl008.js` (or similar) | Generate full-pool DL-008 inventory | AM-1 (reference implementation in Scan Standard §6.3) |

Both tiers should use the same AM-1 reference implementation. The `verify_am1_migration.js` script (Phase 1) can serve as the foundation for a unified `scan_dl008.js` audit tool.

---

## 9. Rollback Path

### 9.1 Immediate Rollback (Within Same Session)

If the migration is deployed and any of the following occur:

1. Test suite fails (any test FAIL)
2. Governance guard crashes on a legitimate edit (plugin error)
3. AM-1 parse fails on a valid pack file (false block)
4. Performance regression (guard takes > 2 seconds per check)

**Rollback procedure:**
```
Step 1: Restore backup file
    cp .opencode/plugins/governance-guard.js.bak-S726-pre-migration .opencode/plugins/governance-guard.js

Step 2: Restore test backup
    cp scripts/test_governance_guard.js.bak-S726-pre-migration scripts/test_governance_guard.js

Step 3: Verify test suite
    node scripts/test_governance_guard.js → 20 PASS, 0 FAIL

Step 4: Verify CURRENT_BASELINES.md hashes match pre-migration state
```

Rollback time: < 2 minutes. Downtime: one edit/write operation may be rejected during the rollback window.

### 9.2 Soft Rollback (Keep AM-1, Disable BLOCK)

```
Alternative: if AM-1 is working correctly but producing unexpected results,
keep AM-1 in WARN-only mode while investigation proceeds:

  - Change: throw new Error(...) → console.warn(...)
  - Keep AM-1 functions in place
  - Investigate the specific block case
  - Fix root cause
  - Re-enable BLOCK mode
```

### 9.3 Permanent Rollback Decision

If AM-1 cannot be made to work in the plugin sandbox (Phase 0 gate failure), the fallback is:

1. **AM-2-only path:** Use the string-aware object-bounded parse exclusively. No Function constructor. No disk read (if fs unavailable, accept file content as a parameter). This provides FM-001 immunity for Pack B but has a higher implementation complexity cost.

2. **External script:** Move Rule 2 enforcement to a pre-commit hook or pre-write validation script outside the plugin sandbox. The plugin becomes a thin wrapper that invokes the external script.

---

## 10. Risk Assessment

### 10.1 Risk Matrix

| Risk ID | Description | Likelihood | Impact | Mitigation |
|---------|-------------|-----------|--------|------------|
| **R1** | Plugin sandbox does not support `require('fs')` | Medium | High — blocks AM-1 entirely | Phase 0 environment verification gate. Fallback: AM-2-only or external script |
| **R2** | Plugin sandbox does not support `new Function()` | Low | High — blocks AM-1 parse | Phase 0 gate. Fallback: AM-2-only |
| **R3** | AM-1 parse on 2MB file takes > 1 second (user-visible delay) | Low | Medium — degrades UX on every write | Measure in Phase 1; if slow, cache pre-write parse result or use incremental (single-QID) parse |
| **R4** | Pre/post diff falsely blocks a legitimate repair edit | Low | Medium — user cannot apply a DL-008 fix because the guard blocks it | The diff design inherently handles this: repairing DL-008 means pre-write has violation, post-write doesn't → newViolations = 0 → pass. Only INTRODUCING new DL-008 is blocked. |
| **R5** | String replacement in `preContent.replace(oldString, newString)` has ambiguous matches | Medium | Medium — if oldString appears multiple times, only the first occurrence is replaced. Post-write content is incorrect. | `String.replace()` replaces first occurrence. If the edit targets a location where oldString appears multiple times, post-write content is ambiguous. **Mitigation:** Use `replaceAll` if available, or use index-based replacement (the edit tool specifies exact position in the file — but this position is not available in the tool args). |
| **R6** | File on disk has been modified by another process between read and write | Low | Low — pre-scan reads a stale version | Acceptable: the guard is a pre-write gate. If another process modifies the file between guard check and write execution, the worst case is a false negative (the guard approved based on pre-state, but the post-state has a contamination not in our simulated postContent). This is a TOCTOU race — inherent to file-based plugins. |
| **R7** | AM-1 parse fails silently (Function constructor returns fewer than 500 items without error) | Very Low | High — undetected undercount, false negatives on DL-008 | The 500-item validation gate catches this. If count ≠ 500, falls back to AM-2. |
| **R8** | AM-2 fallback has DL-020 vulnerability (string-unaware brace matcher regression) | Low | High — if the AM-2 implementation is incorrect, it silently produces false negatives on Pack B | AM-2 must pass the Pack B gold standard test independently (AM2-001). The string-aware state machine from Scan Standard §2.2 must be used verbatim. |
| **R9** | Test suite relies on pack files that may not be accessible from test directory | Medium | Medium — integration tests fail because `../pack_b_corrected.js` isn't readable | Use `path.resolve(__dirname, '..', 'pack_b_corrected.js')` for cross-platform path resolution. |

### 10.2 Most Likely Failure Scenario (R5 — String Replacement Ambiguity)

**Scenario:** An edit operation replaces 3 lines of JSON within a pack file. The `oldString` "CorrectChoice": "B", appears 125 times in the file. `preContent.replace(oldString, newString)` replaces the **first** occurrence, not the intended occurrence.

**Impact:** The post-write content used for AM-1 differs from the actual post-write state. The guard approves an edit that introduces DL-008 elsewhere, or blocks an edit that doesn't.

**Mitigation Options:**

| Option | Approach | Reliability |
|--------|----------|-------------|
| **A: replaceAll** | Use `preContent.replaceAll(oldString, newString)` | Works if oldString is unique within the file. If not unique, replaces all occurrences — but this is the correct behavior: the edit tool's `replaceAll` mode exists for this reason. |
| **B: Position-based** | If the edit tool provides the exact byte position, use substring concatenation: `preContent.substring(0, pos) + newString + preContent.substring(pos + oldString.length)` | Most reliable. Requires the tool args to include position. Not currently available in governance guard hook. |
| **C: Acceptance** | Accept the `String.replace()` behavior. If oldString is not unique, the guard's post-write simulation is approximate. | Acceptable risk: most edits replace strings that are unique within the file (specific QuestionID blocks). Non-unique edits typically use `replaceAll`, which the guard handles correctly. |

**Recommendation:** Use Option A (`replaceAll`) as the default. If `replaceAll` is not available (ES2021+), polyfill with `oldString.split(newString).join(replacement)` gated on whether the tool would use replaceAll (check `args.replaceAll` flag if available). Document the limitation: edits using non-unique oldString with false replaceAll can produce inexact post-write simulation.

### 10.3 Most Critical Risk (R1 — No fs Access)

If the OpenCode plugin sandbox does not expose `require('fs')`, the entire "read file from disk" approach fails. The governance guard cannot read pack files directly.

**Contingency Plan:**
1. Check if OpenCode provides a `client.fs` or `client.readFile` API
2. Check if the plugin can import from a project-relative path that has fs access
3. If neither: implement AM-2-only; require the calling code to pass in fileContent
4. If the plugin receives fileContent as part of `output.args` for write operations (likely — write passes full content), use that for post-write scan. For edit, the pre-write file content must be obtained from an external source.
5. Final fallback: Document that plugin sandbox limitation prevents AM-1. File a feature request with OpenCode. Use external pre-commit script for AM-1 enforcement.

---

## 11. JSON Summary Block

```json
{
  "session": "S726",
  "agent": "D",
  "role": "Rule 2 Enforcement Upgrade — Migration Architecture Design",
  "document": "SESSION726_RULE2_ENFORCEMENT_UPGRADE.md",
  "version": "1.0",
  "status": "Read-Only Design — implementation NOT authorized",

  "migration": {
    "from_methodology": "FM-001 (Forward-Scan Regex, ±1200 char window)",
    "to_methodology": "AM-1 (Function Constructor Parse) + AM-2 Fallback",
    "vulnerability_closed": "DL-029 — forward-scan false positives (257 on Pack B, 67 in S800, 885+ collective)",
    "key_insight": "Current guard checks edit/write CHANGE SNIPPET only — not full file. AM-1 requires reading full pack file from disk, parsing all 500 items, and comparing pre/post DL-008 states. Only NEW violations (not pre-existing) are blocked."
  },

  "files_changed": {
    "governance_guard_js": {
      "path": ".opencode/plugins/governance-guard.js",
      "lines_current": 217,
      "lines_target": "~350",
      "changes": [
        "Add require('fs') and require('path')",
        "Replace findDL008Violations() (lines 42-61) with findDL008Violations_AM1()",
        "Add findDL008Violations_AM2() fallback",
        "Add findEnclosingBrace() — string-aware brace matcher",
        "Add isPackFile() gate",
        "Replace Rule 2 hook logic (lines 112-130) with pre/post diff approach"
      ]
    },
    "test_governance_guard_js": {
      "path": "scripts/test_governance_guard.js",
      "lines_current": 245,
      "lines_target": "~400",
      "changes": [
        "Add require('fs') and require('path')",
        "Replace findDL008Violations() clone (lines 16-33) with AM-1 + AM-2",
        "Replace 5 Rule 2 tests (lines 77-125) with 12 AM-1 tests",
        "Add synthetic fixture files in test/fixtures/"
      ]
    },
    "new_files": [
      "scripts/verify_am1_migration.js",
      "test/fixtures/fixture_clean.js",
      "test/fixtures/fixture_dirty.js",
      "test/fixtures/fixture_corrupt.js",
      "test/fixtures/fixture_nopack.js"
    ]
  },

  "phases": {
    "phase_0": {
      "name": "Environment Verification (BLOCKING GATE)",
      "checks": [
        "Verify require('fs') works in plugin sandbox",
        "Verify new Function() works in plugin sandbox",
        "Verify fs.readFileSync() on pack files works from plugin context"
      ],
      "outcome": "GO / NO-GO decision for AM-1"
    },
    "phase_1": {
      "name": "Write & Verify Replacement Functions",
      "deliverable": "scripts/verify_am1_migration.js — standalone verification script",
      "tests": "AM-1 on all 5 packs; AM-1 vs. AM-2 cross-validation"
    },
    "phase_2": {
      "name": "Integrate into governance-guard.js",
      "risk": "R5 — String replacement ambiguity in post-write simulation"
    },
    "phase_3": {
      "name": "Update test_governance_guard.js",
      "target": "27 PASS, 0 FAIL (was 20)"
    },
    "phase_4": {
      "name": "Cross-Validation",
      "checks": "AM-1 vs. AM-2 QID list match on all 5 packs; 3 consecutive suite runs"
    },
    "phase_5": {
      "name": "Soft Deploy (WARN-only mode)",
      "purpose": "Validate in real session before enabling BLOCK"
    },
    "phase_6": {
      "name": "Hard Deploy (BLOCK mode)",
      "final_check": "CURRENT_BASELINES.md update; REVISION_HISTORY.md entry"
    }
  },

  "risks": {
    "critical": [
      "R1: Plugin sandbox may not support require('fs') — blocks AM-1 entirely"
    ],
    "high": [
      "R5: String.replace() ambiguity in post-write content construction",
      "R8: AM-2 fallback may regress to DL-020 vulnerability"
    ],
    "medium": [
      "R3: AM-1 parse performance on 2MB files",
      "R4: False block on legitimate repair edit (mitigated by design)",
      "R9: Test file resolution across platforms"
    ],
    "low": [
      "R2: new Function() unsupported",
      "R6: TOCTOU race (file changed between guard check and write)",
      "R7: AM-1 parse silently returns <500 items"
    ]
  },

  "test_suite": {
    "current": "20 tests (5 Rule 2, 6 Rule 5, 2 Rule 3, 5 Rule 4, 2 passthrough)",
    "target": "27 tests (12 Rule 2 AM-1, 6 Rule 5, 2 Rule 3, 5 Rule 4, 2 passthrough)",
    "gold_standard": "AM1-008: Pack B = 0 DL-008 (canonical compliance test per Scan Standard §6.2)"
  },

  "rollback": {
    "immediate": "Restore .bak-S726-pre-migration backups; verify 20/20 tests pass; <2 minutes",
    "soft": "Change throw Error → console.warn; keep AM-1 functions; investigate and fix",
    "permanent_fallback": "AM-2-only path OR external pre-commit script"
  },

  "cross_references": {
    "specifications": [
      "SESSION725_SCAN_METHODOLOGY_STANDARD.md §2.1 (AM-1), §3.1 (FM-001), §10.2 (Upgrade Directive)",
      "RULE2_PARSE_SPEC_v1.0.md (Agent C — full AM-1/AM-2 reference implementation and test plan)",
      "SESSION725_GOVERNANCE_DETECTION_STANDARD.md §4.2 (Function Constructor Parse requirements)"
    ],
    "defects_prevented": [
      "DL-029 (forward-scan false positives)",
      "DL-020 (string-unaware brace-matcher — AM-2 is string-aware)",
      "DL-016 (cross-block read — AM-1 keeps all fields in same object)",
      "FM-001 through FM-008 (S725 Forbidden Methodologies)"
    ],
    "defects_addressed": [
      "DL-008 (ExplanationWrong[CorrectChoice] non-empty — the target of this detection)",
      "DL-018 (missing EW[CC] field — AM-1 returns undefined, correctly not a violation)"
    ]
  }
}
```

---

## A. Pre-Implementation Checklist

Before any code is written, the following must be confirmed or addressed:

- [ ] **P0-GATE:** Plugin sandbox supports `require('fs')` — test by adding to governance-guard.js, running test suite
- [ ] **P0-GATE:** Plugin sandbox supports `new Function()` — test with minimal function in hook context
- [ ] **P0-GATE:** `fs.readFileSync()` on pack files works from plugin hook — test with `pack_b_corrected.js`
- [ ] **P1:** Resolve R5 (string replacement ambiguity) — implement `replaceAll` or position-based approach
- [ ] **P1:** Design file-content parameter passing for edit tool (pre-write state must be available)
- [ ] **P2:** Measure AM-1 parse performance on each pack file (must be < 500ms for UX acceptability)
- [ ] **P2:** Create `test/fixtures/` directory and synthetic pack files
- [ ] **P3:** Update `knowledge/CURRENT_BASELINES.md` entry template for new governance-guard.js hash

---

## B. Revision History

| Version | Date | Session | Author | Summary |
|---------|------|---------|--------|---------|
| 1.0 | 2026-07-26 | S726 Agent D | Rule 2 Migration Architecture Design | Comprehensive migration plan from FM-001 forward-scan regex to AM-1 Function Constructor Parse. Covers implementation plan (6 phases), file-by-file change specification, test plan (20 → 27 tests), pre/post diff design, rollback path, risk assessment (9 risks), and Phase 0 environment verification gate. |

---

*This document is a READ-ONLY design. No implementation is authorized without explicit approval and successful Phase 0 environment verification.*
