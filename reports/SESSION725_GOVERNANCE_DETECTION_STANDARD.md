# Governance Detection Standard v1.0

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Session:** S725 (Agent B — Governance Hardening & Post-700 Ownership Transition)
**Date:** 2026-07-26
**Replaces:** Ad-hoc scan methodologies documented across DL-008, DL-016, DL-020, DL-029 entries

---

## 1. Dual-Block Inventory Definition

### 1.1 Conceptual Blocks

Every question in the CMA Part 1 Exam Simulator inventory is governed by two conceptual blocks, regardless of whether they are serialized as one JSON object or two within the source file:

| Block | Role | Purpose | Authoritative for |
|-------|------|---------|-------------------|
| **Metadata Block** | Governance tracking | Records certification state, difficulty, cognitive level, and distractor-level feedback | question_state, Difficulty, DifficultyScore, CognitiveLevel, ExplanationWrongA–D, ChoiceA–D (legacy) |
| **Content Block** | Learner-facing content | Renders the question as the learner sees it | Stem, Choices.{A,B,C,D}, CorrectChoice, ExplanationCorrect, QuestionID |

The governance guard, validator suite, and rendering engine must each extract fields from the correct block. Block misattribution is the root cause of DL-008, DL-016, DL-029, and Session 1's Tier 0 false alarm.

### 1.2 File-Level Architectures

The 5 MCQ pack files exhibit three serialization formats:

| Pack | Serialization Architecture | CC Position | Notes |
|------|---------------------------|-------------|-------|
| Pack A | Single-object (merged) | After QuestionID within object | All fields co-located; no separate metadata sub-object. DL-016 affects metadata-layer ChoiceA-D divergence despite merged format. |
| Pack C | Single-object (merged) | After QuestionID within object | Same merged format as Pack A. |
| Pack D | Single-object (merged) | After QuestionID within object | Same merged format as Pack A/C. |
| Pack B | Single-object (merged) | **Before QuestionID within object** | CorrectChoice appears at lines ~14 while QuestionID at ~17. This is the canonical DL-029 trigger — forward-scan regex reads the NEXT item's CC. |
| Pack E | Single-object (merged) | After QuestionID within object | Independent authoring pipeline. |

**Note on "dual-block" terminology:** Historically, Pack A Section E (and some Pack C/D sections) used a true paired-object structure — a metadata sub-object containing `ChoiceA`–`ChoiceD` and `ExplanationWrongA`–`ExplanationWrongD` separate from the content object containing `Choices.{A,B,C,D}` and `CorrectChoice`. The current merged format co-locates both conceptual blocks within one JSON object per QuestionID, simplifying structured parsing. However, the logical duality persists: ExplanationWrong fields remain semantically tied to metadata-block ChoiceA-D values, not content-block Choices.{A,B,C,D} values (see DL-016).

### 1.3 Rendering Engine (app.js) Field Sourcing

The runtime rendering engine (`app.js`) reads fields from the merged question object:

| Rendered UI Element | Source Field | Conceptual Block |
|---------------------|-------------|------------------|
| Question stem | `Stem` | Content Block |
| Answer choices (A–D) | `Choices.{A,B,C,D}` | Content Block |
| Correct answer indicator | `CorrectChoice` | Content Block |
| Correct-answer explanation | `ExplanationCorrect` | Content Block |
| Wrong-answer explanation (slot X) | `ExplanationWrongX` | Metadata Block |
| Certification eligibility | `question_state` | Metadata Block |
| Difficulty label | `Difficulty` / `DifficultyScore` | Metadata Block |

**Critical implication:** When `Choices.{A,B,C,D}` and the legacy `ChoiceA`–`ChoiceD` metadata fields differ (DL-016), the `ExplanationWrongA` text describes a choice the learner never saw. The renderer shows the correct choice text from `Choices.{A}` but the explanation from `ExplanationWrongA` describes a different topic's distractor entirely (DL-016 Session 64 pilot evidence).

---

## 2. Canonical Field Extraction Table

Every scan tool, validator, certification agent, and governance guard MUST extract logical fields from their authoritative source block. The following table is the canonical reference:

| Logical Field | Authoritative Source Block | Field Path in Object | Rationale |
|---------------|---------------------------|---------------------|-----------|
| CorrectChoice | Content Block | `object.CorrectChoice` | Rendered to learner as the correct-answer indicator. Must be extracted WITHIN the same object as Choices.{A,B,C,D} to avoid DL-029 cross-item contamination. |
| Choices (A–D) | Content Block | `object.Choices.A` / `object.Choices.B` / `object.Choices.C` / `object.Choices.D` | Learner-facing answer options. The nested path `Choices.{A,B,C,D}` (not flat `ChoiceA`) is the renderer's source. |
| Stem | Content Block | `object.Stem` | Learner-facing question text. |
| ExplanationCorrect | Content Block | `object.ExplanationCorrect` | Learner-facing correct-answer feedback. |
| QuestionID | Content Block | `object.QuestionID` | Primary identifier — the authoritative anchor for all object-bounded extraction. |
| ExplanationWrongA–D | Metadata Block | `object.ExplanationWrongA` / `object.ExplanationWrongB` / `object.ExplanationWrongC` / `object.ExplanationWrongD` | Learner-facing distractor feedback. Must be indexed against the same object's `CorrectChoice` for DL-008 compliance. |
| question_state | Metadata Block | `object.question_state` | Governance tracking field. Determines learner-pool eligibility. |
| Difficulty / DifficultyScore | Metadata Block | `object.Difficulty` / `object.DifficultyScore` | Governance calibration metadata. |
| CognitiveLevel | Metadata Block | `object.CognitiveLevel` | Governance calibration metadata. |
| ChoiceA–D (flat / legacy) | Metadata Block | `object.ChoiceA` / `object.ChoiceB` / `object.ChoiceC` / `object.ChoiceD` | **Do NOT use for DL-008 detection.** Legacy metadata fields may carry +1 offset values from a different rotation template (DL-016). The renderer uses `Choices.{A,B,C,D}`, not `ChoiceA-D`. Comparing ExplanationWrong text against `ChoiceA-D` produces DL-016 false positives. |

### 2.1 Extraction Dependencies

Field extractions have dependency relationships that scan tools must respect:

```
DL-008 check:  CorrectChoice + ExplanationWrong[CC]  (both from same enclosing object)
DL-016 check:  Choices.{A,B,C,D}  vs.  ExplanationWrongA-D text  (both from same object)
DL-029 check:  CorrectChoice must be extracted WITHIN the object boundary, not by forward-scan
```

Any scan that extracts `CorrectChoice` from object N and `ExplanationWrong[CC]` from object N-1 or N+1 is a DL-029 vulnerability and its results are invalid.

---

## 3. Mandatory Prohibitions

The following extraction methodologies are **PROHIBITED** in all governance scan tools, validators, and certification agents. Use of any prohibited methodology invalidates the scan results for governance purposes.

### 3.1 Forward-Scan Regex (DL-029)

**Prohibited pattern:** Extract `QuestionID` at position P → search forward in the file byte stream for the next `"CorrectChoice"` → use that CC value to index ExplanationWrong slots near position P.

**Why prohibited:** Pack B (500 items) stores `CorrectChoice` BEFORE `QuestionID` within each JSON object. Forward-scanning from QuestionID finds the NEXT item's CorrectChoice. With random distribution of A/B/C/D across 500 items, ~75% of CorrectChoice values are wrong → ~375 false-positive DL-008 flags per scan.

**Canonical failure example (Pack B, P1B-A-076):**
```json
{
    ...
    "Stem": "Apex Manufacturing enters...",
    "CorrectChoice": "B",          // ← Line 14: THIS item's CC
    "ExplanationCorrect": "...",
    "QuestionID": "P1B-A-076",     // ← Line 17
    ...
    "ExplanationWrongB": "",        // ← Correct: CC=B, EW-B is empty
    ...
}
```
Forward-scan: finds `QuestionID` at line 17 → searches forward → finds `CorrectChoice: "D"` at line 61 (P1B-A-077's CC) → checks EW-D on P1B-A-076 → non-empty → FALSE POSITIVE.

**Actual DL-008 count for Pack B:** **0** (confirmed via Function constructor parse, 500 items). **Regex forward-scan count:** 257 false positives.

### 3.2 Cross-Record Answer-Key Inference (DL-016)

**Prohibited pattern:** Use the `ChoiceA`–`ChoiceD` flat metadata fields to determine what choice text an `ExplanationWrong` field describes.

**Why prohibited:** The metadata-block `ChoiceA`–`ChoiceD` fields carry +1 offset template residue from the original 5-item rotation authoring pipeline (DL-016). They describe the previous QID's topic, not the current QID's. When comparing ExplanationWrong text against metadata Choice text, the scan concludes "EW describes wrong choice" when in fact EW text is correct for the content-block choice — the scan was comparing against the wrong choice text from a different item.

**Session 64 pilot evidence:**
- P1-A-005 (CC=D): Metadata EW fields describe P1-A-004's ASC 606 equipment installation scenario, not P1-A-005's contract liability topic.
- P1-DD-025 (CC=B): Metadata EW_B contains text about reciprocal cost allocation — "Option B is incorrect. The reciprocal method best captures..." — completely unrelated to the margin-of-safety question the learner answered.

### 3.3 Window-Based Extraction (±N Characters Around QuestionID)

**Prohibited pattern:** Locate `"QuestionID"` → extract a fixed byte/character window of ±N characters → parse within that window for `CorrectChoice`, `ExplanationWrongA-D`, etc.

**Why prohibited:**
1. Question object sizes vary widely (calculation questions with long explanation text vs. short conceptual questions) — a fixed window either truncates fields or spans into adjacent items.
2. Pack B's CorrectChoice-before-QuestionID layout means the window extends backward into the NEXT item's object space in a forward-only scan, or forward into the previous item's in a backward scan.
3. DL-020: string values containing `{` `}` characters break naive window-boundary detection.

### 3.4 Non-Boundary-Aware Scans (DL-020)

**Prohibited pattern:** Any parser that counts `{` / `}` without tracking whether the parser is inside a JSON string value.

**Why prohibited:** When question stems, explanation text, or choice text contain bracket characters (`[A, B, C]`, `{...}`, etc.), the brace counter misidentifies object boundaries. This produces truncated/corrupted question objects and silent false negatives. DL-020 was the root cause of a 197-vs-336 counting discrepancy — the validator silently dropped 139 items because it tried to parse corrupted objects extracted by the string-unaware brace-matcher.

---

## 4. Required Methodologies

All governance scan tools, validators, and certification agents MUST use one of the following approved extraction methodologies.

### 4.1 Object-Bounded Parsing (Brace-Matched, String-Aware)

**The gold standard.** For each question in a pack file:

1. Locate the enclosing `{` and `}` of the question's JSON object using a string-aware brace-matcher.
2. Track `inString`, `stringChar`, and `escape` flags during the brace-counting loop.
3. Extract the complete object text from `{` to matching `}`.
4. Parse as JSON or evaluate as a JavaScript object.
5. Extract all fields via property access on the parsed object.

**Required state machine (per DL-020 fix in `ExplanationValidator.extractQuestions`):**
```
inString = false; stringChar = null; escape = false;
for each character in the file:
    if escape: escape = false; continue
    if char == '\': escape = true; continue
    if char == '"' && !inString: inString = true; stringChar = '"'; continue
    if char == "'" && !inString: inString = true; stringChar = "'"; continue
    if char == stringChar && inString: inString = false; stringChar = null; continue
    if !inString && char == '{': depth++
    if !inString && char == '}': depth--
```

### 4.2 Function Constructor Parse (Preferred Where Available)

For pack files that are valid JavaScript (all current packs):

```javascript
const fn = new Function(fileContent + '; return MCQ_BANK_[LETTER];');
const questions = fn();
// questions is a native JavaScript array of parsed objects
// All field access is direct property access — no regex, no window extraction
questions.forEach(q => {
    const cc = q.CorrectChoice;          // From content block within this object
    const ewSlot = q['ExplanationWrong' + cc];  // From metadata block within this object
    // DL-008 check: ewSlot === '' ✓
});
```

**Advantages over object-bounded parsing:**
- Zero false positives on DL-008 (proven: Pack B = 0 DL-008 via Function constructor vs. 257 via regex)
- No brace-matching, no string-awareness — the JavaScript engine handles parsing
- Handles all inter-object whitespace, template artifacts, and formatting variations
- Confirmed working on all 5 pack files as of S530

**Limitation:** Requires the file to be valid executable JavaScript. If corruption like DL-017 (backtick-newline artifacts) prevents Function constructor parsing, fall back to object-bounded parsing after file correction.

### 4.3 Within-Record Field Extraction

All fields for a given question MUST be extracted from the SAME enclosing object. Never extract `QuestionID` from one object and `CorrectChoice` from a different object and attempt to pair them via position proximity.

**Correct pattern:**
```javascript
const obj = parseQuestionObject(fileText, questionIndex);
const qid = obj.QuestionID;        // Within this object
const cc  = obj.CorrectChoice;     // Within this object
const ew  = obj['ExplanationWrong' + cc];  // Within this object
```

**Incorrect pattern (DL-029):**
```javascript
// DO NOT DO THIS
const qid = regexMatch(fileText, /"QuestionID": "([^"]+)"/, qidPosition);
const cc  = regexMatch(fileText, /"CorrectChoice": "([A-D])"/, qidPosition + 1200);
// cc is from the NEXT item when CC appears before QuestionID
```

### 4.4 Dual-Block Disambiguation

When a scan tool needs to differentiate metadata-block fields from content-block fields within the same object:

| Need | Extract From | Validation |
|------|-------------|------------|
| What choices did the learner see? | `Choices.{A,B,C,D}` (nested) | Content Block |
| What is the correct answer for this stem? | `CorrectChoice` | Content Block |
| Is the correct-answer EW slot empty? | `ExplanationWrong[CorrectChoice]` | Cross-block (CorrectChoice = Content, EW = Metadata) |
| Does EW text match the choice it describes? | Compare `ExplanationWrong[A]` text against `Choices.{A}` text | Cross-block verification |
| What is the governance state? | `question_state` | Metadata Block |
| What difficulty was assigned? | `Difficulty` / `DifficultyScore` | Metadata Block |

**DL-016 guard:** If the object contains BOTH flat `ChoiceA`–`ChoiceD` AND nested `Choices.{A,B,C,D}`, the nested `Choices` path is authoritative for learner-facing content. Always verify that `ChoiceA`–`ChoiceD` text matches `Choices.{A,B,C,D}` text when reading ExplanationWrong fields — a mismatch indicates DL-016 contamination and the ExplanationWrong text may describe a wrong choice.

---

## 5. Canonical Failure Example — DL-029

### 5.1 Root Cause

Pack B stores `CorrectChoice` **before** `QuestionID` in its JSON objects, unlike Packs A/C/D/E where `CorrectChoice` follows `QuestionID` within the object. Any scan tool that locates `QuestionID` and searches forward for the next `"CorrectChoice"` string finds the NEXT item's CC.

### 5.2 Mechanical Illustration

```
File byte stream (Pack B):

   ... "Stem": "Apex...three performance obligations?",
▶  "CorrectChoice": "B",              ← QID N's CC (P1B-A-076, CC=B)
   "ExplanationCorrect": "Under ASC 606...",
   "QuestionID": "P1B-A-076",         ← Scanner anchor point
   ...
   "ExplanationWrongB": "",            ← QID N's EW-B = "" (DL-008 clean)
   ...
   "DifficultyScore": 2,
   "CognitiveLevel": "Apply"
},
{
   "Part": 1,
   ...
   "Stem": "Cascade Technologies...total $180,000...",
▶  "CorrectChoice": "D",              ← QID N+1's CC (P1B-A-077, CC=D)
   ...
   "QuestionID": "P1B-A-077",         ← Scanner finds THIS CC when searching forward from QID N
```

**What the forward-scan produces:**
- Scanner locates `QuestionID: "P1B-A-076"` at position P
- Scanner searches forward for `"CorrectChoice"`
- Scanner finds `"CorrectChoice": "D"` at position P+1200 (P1B-A-077's CC)
- Scanner checks `ExplanationWrongD` on P1B-A-076 → non-empty text → flag DL-008
- **Reality:** P1B-A-076 has CC=B, EW-B="", DL-008 clean. P1B-A-077 has CC=D, EW-D="". Also clean.

**False positive rate:** With 4 possible CorrectChoice values distributed approximately equally, ~75% of Pack B items receive the wrong CC from the next item. Pack B has 500 items → ~375 false positives per scan.

### 5.3 Historical Impact

| Source | Reported DL-008 Count | Method | Actual DL-008 | False Positives |
|--------|----------------------|--------|---------------|-----------------|
| CURRENT_BASELINES.md §3 (2026-07-26) | 67 Certified (Packs A/B/C/D) | Unknown/legacy scan | Unknown at time of reporting | **67 phantom** per S723/S724 |
| S723 Closure Audit | 0 | Function constructor parse | 0 | 0 |
| S724 Verification | 0 | Function constructor parse | 0 | 0 |
| Pre-S723 regex scans | 885+ | Forward-scan regex | ~6 confirmed (BC-001/010/020/030/094, AC-001) + unknown residual | ~879 false positives |

**Current status (S724):** CURRENT_BASELINES.md §3 still lists 67 phantom Certified DL-008 items as CRITICAL. S724 identifies this as a P0 fix — "this creates a risk where new operators trigger emergency remediation based on phantom defects."

### 5.4 Why the Governance Guard Is Also Affected (S724 Finding)

Session 724 found that the governance guard's DL-008 detection (`.opencode/plugins/governance-guard.js` Rule 2) still uses a DL-029-vulnerable ±1200 character window forward-scan. The guard's BLOCK rule — which prevents certification of items with non-empty EW[CC] — is producing its enforcement decisions based on potentially incorrect field attribution. See `reports/SESSION724_SESSION_SUMMARY.md` lines 96–97:

> "The governance guard's DL-008 detection still uses a DL-029-vulnerable ±1200 character window forward-scan. S802's 8 Permanent Prevention Rules mandate Function-constructor parse only. This must be fixed before the maintenance framework can be trusted for operational use."

---

## 6. Compliance Verification

### 6.1 Scan Tool Compliance Checklist

Any scan tool, validator, or certification agent claiming governance-audit results must pass the following compliance verification:

| # | Check | Verification Method |
|---|-------|---------------------|
| C1 | CorrectChoice extracted within object boundary | For all 500 Pack B items: confirm CC matches object-level ground truth. 0 mismatches required. |
| C2 | ExplanationWrong[CC] indexed from same object as CC | For all 2,500 items: confirm EW slot is indexed from the same object that provided CC. |
| C3 | String-aware brace matching | Run on a file with bracket characters inside string values. Confirm all 500 items extracted (no silent drops). |
| C4 | Cross-check against Function constructor parse ground truth | For each pack, compare scan results against Function constructor parse (the reference implementation). |
| C5 | DL-008 identically zero on Pack B | Function constructor parse confirms 0 DL-008 on 500/500 Pack B items. Any scan reporting >0 on Pack B fails. |
| C6 | No window-parameter dependency | Change the scan's window size (if applicable). Results must be invariant. |

### 6.2 Reference Implementation

The authoritative reference implementation for DL-008 detection is:

```javascript
// Reference DL-008 detection — Function constructor parse
const fs = require('fs');

function dl008Scan(packFilePath) {
    const fileContent = fs.readFileSync(packFilePath, 'utf8');
    // Extract array variable name from `const MCQ_BANK_X = [`
    const varMatch = fileContent.match(/const\s+MCQ_BANK_([A-E])\s*=\s*\[/);
    if (!varMatch) throw new Error('Pack file format not recognized');
    const varName = 'MCQ_BANK_' + varMatch[1];
    
    // Parse via Function constructor
    const fn = new Function(fileContent + '; return ' + varName + ';');
    const questions = fn();
    
    const findings = [];
    for (const q of questions) {
        const cc = q.CorrectChoice;
        if (!cc) continue;  // Case bank items without CC
        const ewSlot = 'ExplanationWrong' + cc;
        if (q[ewSlot] && q[ewSlot] !== '') {
            findings.push({
                QuestionID: q.QuestionID,
                CorrectChoice: cc,
                ewValue: q[ewSlot].substring(0, 80)
            });
        }
    }
    return findings;
}
```

### 6.3 Ground Truth Baselines (S530 T0, 2026-07-26)

These are the canonical DL-008 counts established via Function constructor parse:

| Pack | Total Items | DL-008 via Function Constructor | Notes |
|------|-----------|-------------------------------|-------|
| A | 500 | ~2 confirmed (B-001, B-025) | Confirmed by S723/S724; remaining Pack A residual needs independent re-verification |
| B | 500 | **0** | All 500 items confirmed clean |
| C | 500 | ~6 confirmed (BC-001, BC-010, BC-020, BC-030, BC-094, AC-001) | Residual Pack C items being re-verified |
| D | 500 | TBD (disputed: SESSION_STATUS says 10; S700 scan says ~342) | **In dispute — needs independent Function constructor verification** |
| E | 500 | ~1 confirmed (P1E-B-079) | Near-zero, nearly clean |

Any scan tool reporting a different count for Pack B (>0) is non-compliant with this standard and its results are invalid for governance purposes.

---

## 7. Governance Guard Upgrade Directive

### 7.1 Current State (S724)

The governance guard (`.opencode/plugins/governance-guard.js` Rule 2) uses a ±1200 character window forward-scan for DL-008 detection. Per S724 findings, this methodology is DL-029-vulnerable and produces enforcement decisions based on potentially incorrect field attribution.

### 7.2 Required Upgrade

The governance guard must be upgraded to use Function constructor parse (or equivalent object-bounded, string-aware extraction) for DL-008 detection. The same governance guard plugin that BLOCKs certification must use a DL-029-immune methodology to determine whether certification should be blocked.

### 7.3 Interim Safeguard

Until the governance guard is upgraded, any BLOCK event triggered by Rule 2 must be independently verified via Function constructor parse before being acted upon. No certification-blocking decision based solely on the governance guard's regex-window DL-008 scan is valid for governance purposes.

---

## 8. Authority and Precedence

This standard supersedes all prior ad-hoc scan methodologies documented in:

- DEFECT_LIBRARY.md §DL-008 (individual remediation session descriptions)
- DEFECT_LIBRARY.md §DL-029 (forward-scan false positive documentation)
- CURRENT_BASELINES.md §3 (phantom DL-008 counts, to be corrected per S724)
- Any agent-level scan methodology descriptions in session reports

In case of conflict between this standard and any prior documentation, this standard is authoritative.

### 8.1 Amendment Process

This standard may only be amended by:
1. A dedicated governance session with explicit authorization (e.g., S725-S727 series)
2. Cross-verification against Function constructor parse ground truth on all 5 packs
3. Documentation of the amendment in REVISION_HISTORY.md

---

## A. Revision History

| Version | Date | Session | Author | Summary |
|---------|------|---------|--------|---------|
| 1.0 | 2026-07-26 | S725 Agent B | Governance Detection Standard — initial creation | Establishes canonical field extraction rules, mandatory prohibitions, and compliance verification for all governance scan tools. |

---

## B. Cross-References

| Document | Relationship |
|----------|-------------|
| `knowledge/DEFECT_LIBRARY.md` | DL-008, DL-016, DL-020, DL-029 — defect entries documenting the root causes addressed by this standard |
| `knowledge/CURRENT_BASELINES.md` | §3 contains phantom DL-008 counts from pre-standard scans — requires update |
| `reports/SESSION724_SESSION_SUMMARY.md` | Governance guard gap finding — DL-029-vulnerable forward-scan identified |
| `reports/SESSION723_PROGRAM_CLOSURE_REPORT.md` | DL-008=0 claim verified via Function constructor parse |
| `.opencode/plugins/governance-guard.js` | Rule 2 BLOCK — target for upgrade from regex-window to Function constructor parse |
| `scripts/validators/ExplanationValidator.js` | DL-020 fix reference — string-aware brace-matcher implementation |
| `knowledge/CAQS_v1.0.md` | §4.4 (EV8) — the rule that ExplanationWrong[CorrectChoice] must be empty |
