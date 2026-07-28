# Scan Methodology Standard v1.0

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Session:** S725 (Agent G — Governance Hardening & Post-700 Ownership Transition)
**Date:** 2026-07-26
**Replaces:** All ad-hoc scan methodologies embedded in DEFECT_LIBRARY.md DL entries, session reports, and agent-level scan scripts. Supersedes S802 8 Permanent Prevention Rules (incorporated as AM-1 through AM-3, FM-001 through FM-008).

**Source Documents:**
- `reports/SESSION725_HISTORICAL_GOVERNANCE_RCA.json` — Agent K's 10-class Root Cause Analysis (FC-001 through FC-010)
- `reports/SESSION725_GOVERNANCE_DETECTION_STANDARD.md` — Agent B's dual-block field extraction rules
- `reports/SESSION802_SESSION_SUMMARY.md` — S802 8 Permanent Prevention Rules
- `knowledge/DEFECT_LIBRARY.md` — DL-008, DL-012, DL-016, DL-020, DL-026, DL-028, DL-029 entries
- `knowledge/CURRENT_BASELINES.md` — Hash and certified-count baselines

---

## 1. Purpose

This standard defines the **only** permitted methodologies for any scan, audit, validation, or governance tool that:
1. Extracts fields from pack files (`pack_*_corrected.js`) or case files (`scored_cases*.js`)
2. Detects structural defect classes (DL-008, DL-016, DL-026, etc.)
3. Reports Certified counts, defect inventories, or question_state distributions
4. Generates reports used for certification decisions, learner-pool safety checks, or governance enforcement

**This is not a "best practice" document.** It is a binding, enforceable standard. Any scan result produced by a methodology not listed in Section 2 is inadmissible for governance purposes. Any methodology listed in Section 3 is prohibited and its historical results are retroactively invalidated.

---

## 2. Approved Methodologies

Only the following three methodologies may be used for governance-relevant scans.

### AM-1: Function Constructor Parse (Gold Standard)

**When required:** All DL-008 detection, Certified count verification, CorrectChoice distribution analysis, defect inventory generation.

**Method:**

```javascript
const fs = require('fs');
const fileContent = fs.readFileSync(packFilePath, 'utf8');

// Extract variable name from `const MCQ_BANK_X = [`
const varMatch = fileContent.match(/const\s+MCQ_BANK_([A-E])\s*=\s*\[/);
if (!varMatch) throw new Error('Unrecognized pack file format');
const varName = 'MCQ_BANK_' + varMatch[1];

// Parse via Function constructor
const fn = new Function(fileContent + '; return ' + varName + ';');
const questions = fn();
```

**Properties:**
- Produces complete, correct JavaScript array of parsed objects
- Zero false positives (proven: Pack B = 0 DL-008 via Function constructor vs. 257 via regex forward-scan)
- All field access is direct property access — no regex, no brace-matching, no window extraction
- The JavaScript engine handles all parsing: string literals, escape sequences, inter-object whitespace, formatting variations
- Confirmed working on all 5 pack files as of S530 (CURRENT_BASELINES.md hashes)

**Validation requirement:** After parse, confirm `questions.length === 500` for each pack.

**Limitation:** Requires the file to be valid executable JavaScript. If a file has structural corruption (e.g., DL-017 backtick-newline artifacts), the file must first be corrected via controlled remediation. Fall back to AM-2 for files not parseable via Function constructor.

**Historical false positives AM-1 prevented:**
- S800's 67 phantom Certified DL-008 items (actual: 0)
- Pack B's 111-112 phantom DL-008 items (actual: 0)
- 885+ accumulated false positives across sessions S700–S722A (DL-029 collective impact)

### AM-2: Object-Boundary Parse (Silver)

**When required:** Packs not parseable via Function constructor, incremental single-object operations, case file scans where Function constructor is unavailable.

**Method:**

1. Locate `"QuestionID"` in the file
2. Use a **string-aware brace-matcher** to find the enclosing `{` and `}`:
   ```
   inString = false; stringChar = null; escape = false;
   for each character:
       if escape: escape = false; continue
       if char == '\': escape = true; continue
       if char == '"' && !inString: inString = true; stringChar = '"'; continue
       if char == "'" && !inString: inString = true; stringChar = "'"; continue
       if char == stringChar && inString: inString = false; stringChar = null; continue
       if !inString && char == '{': depth++
       if !inString && char == '}': depth--
   ```
3. Extract the complete object text from `{` to matching `}`
4. Parse via `JSON.parse()` or evaluate as JavaScript object
5. Extract all fields via property access on the parsed object

**String-awareness is non-negotiable.** The DL-020 incident (197 vs. 336 actual items — 139 silently dropped) was caused by a naive bracket counter. Brackets inside stem text, explanation text, and choice text (`[A, B, C]`, `{...}`) caused the counter to misidentify object boundaries.

**Self-verification requirement:** After every parse, compare `parsedCount` against `grep -c '"QuestionID"'` on the source file. Any discrepancy is a CRITICAL error.

### AM-3: Within-Record Field Extraction (for Targeted Queries)

**When required:** Single-field scans (e.g., all `CorrectChoice` values, all `question_state` values, all `DifficultyScore` values).

**Method:**

1. Parse the object boundary first via AM-1 or AM-2
2. Read the target field via property access on the parsed object: `obj.CorrectChoice`, `obj.question_state`
3. **Never extract one field from one object and another field from a different object** — all fields for a question must come from the same enclosing `{` `}`

**Example (correct):**
```javascript
const obj = parseQuestionObject(fileText, questionIndex);
const cc = obj.CorrectChoice;                          // Within this object
const ew = obj['ExplanationWrong' + cc];               // Within this object
// DL-008 check: ew must be "" for CorrectChoice slot
```

**Example (FORBIDDEN — DL-029):**
```javascript
// DO NOT DO THIS
const qid = regexMatch(file, /"QuestionID": "([^"]+)"/, qidPosition);
const cc  = regexMatch(file, /"CorrectChoice": "([A-D])"/, qidPosition + 1200);
// cc is from the NEXT item when CC appears before QuestionID (Pack B)
```

---

## 3. Forbidden Methodologies

The following eight methodologies have produced documented false positives across sessions S700–S724. Their use **invalidates** any scan result for governance purposes. Their historical results are **retroactively nullified**.

### FM-001: Forward-Scan Regex for CorrectChoice from QuestionID Anchor

**What was done:** Scan tools searched forward from `"QuestionID"` using regex to find the next-occurring `"CorrectChoice"` string within a ±1200 character window, without accounting for JSON object field ordering.

**Why it fails:** Pack B stores `CorrectChoice` **before** `QuestionID` within each JSON object. Forward-scanning from QuestionID systematically finds the NEXT item's CorrectChoice. With random distribution of A/B/C/D across 500 items, this produces a ~75% false-positive rate per pack.

**Canonical failure (Pack B, P1B-A-076):**
```
"CorrectChoice": "B",          ← THIS item's CC (P1B-A-076)
...
"QuestionID": "P1B-A-076",     ← Scanner anchor
...
}, {
...
"CorrectChoice": "D",          ← NEXT item's CC (P1B-A-077) — scanner finds this
```

**Historical false positives:** 67 phantom Certified DL-008 (S800), 257 false DL-008 in Pack B, 885+ collective false positives across S700–S722A.

**Prohibition:** Shall not be used for any defect scan, pack audit, certification sweep, or pre-delivery safety check. Shall not appear in any governance guard code.

### FM-002: String-Unaware Brace Matcher for JSON Object Extraction

**What was done:** Parser tracked `{` / `}` bracket depth without tracking whether it was inside a JSON string literal. Brackets inside stems, explanations, or choices corrupted the depth counter.

**Why it fails:** When question text contains bracket characters (`[A, B, C]`, `{formula}`), the naive counter exits at the wrong `}`, producing truncated objects and silent false negatives.

**Historical impact:**
- DL-020: 139 DL-008 items missed (197 counted vs. 336 actual)
- DL-012: Three different clone counts (128, 112, 138) on the same file
- DL-007 QID count inflation: 1,011 QIDs reported vs. 882 actual (15% inflation)

**Prohibition:** Every parser that extracts JSON objects from source files must be string-aware (track `inString`, `stringChar`, `escape`). Must self-verify item count against `grep -c '"QuestionID"'`.

### FM-003: Multi-Block Field Cross-Read (Content Block CC + Metadata Block EW)

**What was done:** Tools extracted `CorrectChoice` from one JSON sub-object (content block) but read `ExplanationWrong` fields from a different sub-object (metadata block). In dual-block architecture, metadata-block fields describe a **different** item (DL-016 +1 offset).

**Why it fails:** The metadata block's `ChoiceA`–`ChoiceD` fields carry stale template residue from the previous QID in the 5-item rotation group. When `Choices.{A,B,C,D}` differs from `ChoiceA`–`ChoiceD`, an `ExplanationWrongA` field describes a distractor the learner never saw.

**Historical impact:**
- P1-CC-050 controversy: S722A found DL-008 (CC from wrong block), S723 found CLEAN (CC from correct block)
- DL-016 learner-safety risk: 58 Certified Pack A Section E items show wrong-topic EW text
- 74.1% CC-mismatch artifact in 2026-07-23 Tier 0 Pack C scan

**Prohibition:** `CorrectChoice` and `ExplanationWrong[CC]` must be extracted from the **same** enclosing JSON object. For items with metadata-block `ChoiceA`–`ChoiceD`, the content-block `Choices.{A,B,C,D}` is authoritative for learner-facing content.

### FM-004: Regex Global Match on Flat Field Names Without Object-Boundary Awareness

**What was done:** Scanners used flat regex like `/"CorrectChoice"\s*:\s*"([A-D])"/` that matches the **first** occurrence in the file window, which may be from an entirely different item.

**Why it fails:** Cannot distinguish which JSON object a field belongs to. When CC appears before QuestionID (Pack B) or when metadata-block fields have different values than content-block fields (DL-016), the first-match regex returns wrong data.

**Historical impact:**
- Tier 0 false alarm (2026-07-23): Scan matched metadata-block `ChoiceA` instead of content-block `Choices.{A}`
- S800 reported 3 P0 blockers based on first-occurrence field matches

**Prohibition:** Must use path-aware matching (`"Choices": { "A"`) for nested fields. For single-block packs, extract the complete JSON object first, then read fields from the parsed object. Never use flat field-name regex on whole files.

### FM-005: Totals-Only Defect Reports Without Per-Item QID Lists

**What was done:** Scan reports published aggregate counts ("67 Certified DL-008", "288 DL-026 items", "141 items modified") without providing the list of QuestionIDs involved. Different agents produced different totals with no way to reconcile.

**Why it fails:** Totals are unverifiable. When two agents report conflicting counts for the same defect class, there is no mechanism to determine which is correct. AGENTS.md §5 explicitly requires cross-checking against raw file/line evidence — a total alone cannot be cross-checked.

**Historical impact:**
- DL-008 count saga (539→175→67→1→0): Took 4+ months and 6+ sessions because no source provided QID lists
- S722A undocumented changes: 34 CL recalibrations applied without per-item documentation
- DL-026 5-agent vs. Agent 6 scope: 632 vs. 1,005 — 373-item gap never resolved, only documented

**Prohibition:** Every scan report must include the array of QuestionIDs for every finding. Totals-only reports are rejected regardless of source, agent identity, or session authority. This applies to all governance reports, certification attestations, pre-delivery safety checks, and session summaries.

### FM-006: Remediation Script Without Pre/Post Defect-Class Cross-Scan

**What was done:** Remediation scripts rewrote `ExplanationWrong` fields to fix one defect class (e.g., DL-013 boilerplate) but did not verify that complementary defect classes (DL-026 empty non-CC slots, DL-008 non-empty CC slots) were not introduced or expanded by the change.

**Why it fails:** Repair scripts that touch `ExplanationWrong` fields can create new empty slots or overwrite previously cleared DL-008 slots. Without pre/post cross-scanning, these regressions go undetected.

**Historical impact:**
- DL-028: DL-013 rewrite script increased DL-026 from 56→75 items per section
- Pack D: DL-026 went from 0 (pre-DL-013) → 348 (post-DL-013) → 500 (post-DL-008 remediation)
- Net: +500 DL-026 slots from two remediation operations that never cross-checked

**Prohibition:** Every remediation script must run a full pre-scan for ALL known defect classes on the target section and re-run ALL defect-class scans after remediation. If any non-target defect class count increases, the remediation is regressing and must be halted.

### FM-007: Agent Self-Report Reliance Without Independent Third-Agent Verification

**What was done:** When Agent A reported "X items remediated" and Agent B reported "Y items remaining" for the same defect on the same file, no independent third agent was assigned to resolve the discrepancy. Both reports were carried forward as-is.

**Why it fails:** AGENTS.md §5 requires dual verification against raw file/line evidence. When two agents conflict, neither report can be accepted at face value without independent resolution.

**Historical impact:**
- Autonomous Run Part 2: Agent claimed 73 DL-026 items in Pack D Section D (actual: 0 — already clean)
- DL-026 5-agent vs. Agent 6 scope: 632 vs. 1,005 — discrepancy never reconciled
- S722A Agent P: Claimed "12 items carry pre-existing DL-008" while S801 confirmed 0

**Prohibition:** When two agent reports conflict on the same defect class on the same file, a third independent agent must resolve the discrepancy using raw file/line evidence (AM-1 parse with QID list). The third agent must identify which prior report was correct and document why the other was wrong. This applies to all governance audits, certification closeout reports, and pre-delivery safety checks.

### FM-008: Session Closure Without CURRENT_BASELINES.md Update

**What was done:** Sessions verified correct state (e.g., 0 Certified DL-008) but did not update the authoritative baseline file. Subsequent sessions read the stale baseline and made decisions based on phantom defects.

**Why it fails:** The governance guard, certification workflows, and pre-delivery safety checks all reference CURRENT_BASELINES.md. If the baseline reports phantom defects, new operators trigger emergency remediation based on data that was refuted by prior sessions.

**Historical impact:**
- Phantom 67 DL-008 persisted in CURRENT_BASELINES through S724 despite S801/S802/S722A/S723 all confirming 0
- SESSION_STATUS_2026-07-24 reported 2,031 Certified vs. actual 2,181 (+150 undercount)
- 5 pack hashes unchanged since S530 T0 despite S536/S537/S722A all modifying files

**Prohibition:** Every session's closing action must include updating CURRENT_BASELINES.md with verified counts, hashes, and defect status. The baseline file must be checked against ground truth at every T0 and updated at every Tend. Any discrepancy between CURRENT_BASELINES and ground truth found at T0 is a CRITICAL finding and must be resolved within the session.

---

## 4. The Hard Gate — Count Divergence

### 4.1 Rule

If two independent scans (different methods, different agents, or different tool implementations) produce different defect counts for the same defect class on the same pack file:

```
AUTO ESCALATE
```

AUTO ESCALATE means: halt all remediation work, spawn an independent governance agent, and execute the G1–G5 reconciliation runbook (per `reports/SESSION31_RECONCILIATION_EXECUTION.md`).

### 4.2 Prohibited Resolution Behaviors

The following are **forbidden** as conflict-resolution strategies:

| Forbidden Behavior | Example |
|-------------------|---------|
| Run a third scan and choose whichever result you prefer | "Scan C says 342, that's close to Scan B's 288, let's go with 288" |
| Majority-vote counts | "Three scans produced 128, 112, 138 → average = 126" |
| Manual convergence by assumption | "The discrepancy is probably due to DL-016 artifacts, so let's just use Pack C's metadata-block CC" |
| Defer to "the more recent scan" | "Scan 3 was run last, so it must be most accurate" |
| Accept totals-only reports without QID lists for resolution | "Agent X says 288 and Agent Y says 500 — Agent X's number is in the middle so let's use that" |

### 4.3 Required Resolution Path

1. Halt all write operations on the affected pack file
2. Identify the root cause of the discrepancy (methodology difference? DL-016 artifact? DL-029 forward-scan? DL-020 parser gap?)
3. Execute AM-1 (Function constructor parse) on the file — this is the reference methodology
4. Extract the full QID list of findings from the AM-1 result
5. Compare against both prior scan results, QID by QID
6. Document: which scan was correct, which was wrong, and what methodology error caused the wrong result
7. Update the resolution in REVISION_HISTORY.md

### 4.4 Precedent Incidents

| Incident | Session | Scans | Resolution |
|----------|---------|-------|------------|
| DL-012 clone counting | 2026-07-22 | 128 → 112 → 138 → 140 | Fourth scan stabilized. First three wrong. AGENTS.md §6 created. |
| DL-029 forward-scan vs. Function constructor | S700–S802 | 67 → 1 → 0 → 885+ | S802 resolved: 0 actual. All prior counts were DL-029 artifacts. |
| DL-026 scope discrepancy | 2026-07-23 | 632 vs. 1,005 | Never reconciled. Both totals carried forward. |
| Pack D DL-008 count | S700–ongoing | 10 vs. ~342 | Unresolved as of S724. Needs AM-1 verification. |

### 4.5 Two-Scan Divergence Rule (Permanent)

Per S802 Prevention Rule 8 and AGENTS.md §6, **two independent scans must converge on an identical count before any remediation proceeds.** If they disagree:

1. The first question is not "which count is right?" — it's "why do two scans of the same file disagree?"
2. Count instability is itself a defect signal (broken parser, cross-block read, concurrent-write artifact)
3. No remediation action may be based on an unstable count

---

## 5. Defect Class Coverage

This standard governs the detection of the following defect classes. Every scan tool certified under this standard must correctly detect or confirm the absence of:

### 5.1 Structural Defects (Mandatory Coverage)

| Defect ID | Detection Rule | Approved Methodology | Validation Gate |
|-----------|---------------|---------------------|-----------------|
| **DL-008** | `ExplanationWrong[CorrectChoice]` is non-empty (EV8 violation) | AM-1 (Function constructor) — mandatory | Pack B must return 0 (gold standard test). Any scan returning >0 on Pack B is non-compliant. |
| **DL-016** | Metadata-block `ChoiceA`–`ChoiceD` text differs from content-block `Choices.{A,B,C,D}` text | AM-1 + cross-field comparison within same object | G-NEW-1 and G-NEW-3 (QUESTION_METADATA_STANDARD.md §9.4.2) are certification-blocking conditions |
| **DL-026** | `ExplanationWrong[letter]` is `""` (empty string) at a non-CorrectChoice position | AM-1 — for each object, iterate {A,B,C,D}, skip `CorrectChoice` position, check non-empty | Must not flag CorrectChoice slots (DL-008 complementary) |
| **DL-029** | Forward-scan methodology itself (not a question defect — a scanner defect) | N/A — this entry exists to prevent recurrence | All scan tools must be verified DL-029-immune via Section 6.1 compliance |
| **DL-020** | String-unaware parser (not a question defect — a parser defect) | N/A — this entry exists to prevent recurrence | All parsers must pass inString/stringChar/escape state machine verification |

### 5.2 Future Scanner-Class Defects

Any newly discovered structural defect that requires paired-field extraction from pack file question objects falls under this standard. The methodology rules (AM-1 through AM-3, FM-001 through FM-008) apply to all such defects regardless of DL-ID.

---

## 6. Scan Tool Validation Requirements

### 6.1 Compliance Verification Checklist

Every scan tool, validator, or certification agent that produces governance-relevant results must pass these tests before results can be accepted:

| # | Test | Method | Pass Criterion |
|---|------|--------|---------------|
| **T1** | DL-008 identically zero on Pack B | AM-1 parse of `pack_b_corrected.js`, all 500 items | 0 DL-008 findings. Any non-zero count is an automatic FAIL. |
| **T2** | DL-008 identically zero on Pack E | AM-1 parse of `pack_e_corrected.js`, all 500 items | 0 DL-008 findings (Pack E uses separate authoring pipeline). |
| **T3** | Produce identical counts on two independent runs | Run the tool twice on the same file with the same parameters | Identical count, identical QID list. |
| **T4** | Include QID lists for every finding | Inspect tool output | Every defect finding has a `QuestionID` array. Totals-only output is a FAIL. |
| **T5** | Match grep on total item count | Compare `questions.length` against `Select-String -Path <file> -Pattern '"QuestionID"' \| Measure-Object` | Must match exactly (500 for MCQ packs). |
| **T6** | Self-verify CC position in source file | For each pack, confirm whether CC appears before or after QuestionID in the raw file | Tool must not assume CC follows QID. |
| **T7** | Item count invariance | Run on a file containing bracket characters inside string values | Must extract all 500 items with no silent drops (DL-020 immunity). |

### 6.2 Pack B as the Gold Standard Test

Pack B is the canonical test for scan tool compliance because:

1. **0 DL-008 across all 500 items** — confirmed by Function constructor parse (S801, S802, S722A, S723, S309)
2. **CC-before-QID field ordering** — unique among all 5 packs, triggers DL-029 forward-scan false positives
3. **Known-good ground truth** — the answer: "0 DL-008, 0 DL-026" is established by 6+ independent sessions

Any scan tool reporting DL-008 > 0 on Pack B is **non-compliant** and its results for every other pack are invalidated. Pack B is the noise-free reference.

### 6.3 Reference Implementation

The authoritative reference implementation for DL-008 detection:

```javascript
const fs = require('fs');

function dl008Scan(packFilePath) {
    const fileContent = fs.readFileSync(packFilePath, 'utf8');
    const varMatch = fileContent.match(/const\s+MCQ_BANK_([A-E])\s*=\s*\[/);
    if (!varMatch) throw new Error('Unrecognized pack file format');
    const varName = 'MCQ_BANK_' + varMatch[1];

    const fn = new Function(fileContent + '; return ' + varName + ';');
    const questions = fn();

    const findings = [];
    for (const q of questions) {
        const cc = q.CorrectChoice;
        if (!cc) continue;
        const ewSlot = 'ExplanationWrong' + cc;
        if (q[ewSlot] && q[ewSlot] !== '') {
            findings.push({
                QuestionID: q.QuestionID,
                CorrectChoice: cc,
                ewExcerpt: q[ewSlot].substring(0, 80)
            });
        }
    }
    return {
        packFile: packFilePath,
        totalItems: questions.length,
        dl008Findings: findings,
        dl008Count: findings.length,
        certifiedDl008: findings.filter(f => {
            const qObj = questions.find(q => q.QuestionID === f.QuestionID);
            return qObj && qObj.question_state === 'Certified';
        }).length
    };
}
```

---

## 7. Escalation Rules

### 7.1 Escalation Triggers

| Trigger | Severity | Immediate Action |
|---------|----------|-----------------|
| Two independent scans produce different defect counts for same defect class on same file | **CRITICAL** | AUTO ESCALATE per §4. Halt all write operations. Spawn governance agent. |
| Any scan tool reports DL-008 > 0 on Pack B | **CRITICAL** | Tool is non-compliant. All its results are invalidated. Escalate to Governance Board. |
| AM-1 item count ≠ 500 for any pack | **CRITICAL** | File may be corrupted. Halt all operations. Verify against CURRENT_BASELINES hash. |
| Scan tool output is totals-only (no QID list) | **HIGH** | Reject the report. Tool must be upgraded to include QID arrays before re-running. |
| CURRENT_BASELINES.md hash differs from computed hash at T0 | **HIGH** | Flag as CRITICAL finding. Document drift. Either legitimate modification occurred (update baseline) or unauthorized write (escalate). |
| Agent self-report conflicts with third-agent verification | **MEDIUM** | Per FM-007, resolution required. Do not carry both reports forward. |

### 7.2 No Third Scan Without Documented Methodology Change

Running a third scan using the same methodology that produced two divergent results is **prohibited**. The divergence itself indicates a methodology flaw. Adding more scans with the same flaw adds noise, not signal.

**Permitted:**
- Run AM-1 (Function constructor) as the authoritative third scan after FM-001-vulnerable scans disagreed
- Run AM-2 with a **string-aware** parser after two string-unaware parsers disagreed
- Run a scan by a **different** agent using an **independently written** tool

**Prohibited:**
- Run the same scan script a third time
- Run the same agent's scan tool with a different "window size" parameter
- Run a scan "from scratch" using the same methodology as the divergent scans

### 7.3 Resolution Documentation

Every divergence resolution must be documented in REVISION_HISTORY.md with:

- The two conflicting counts and their sources
- The root cause of the divergence (which methodology produced the error and why)
- The authoritative count established via AM-1
- The QID list of actual findings (or confirmation of 0 findings)
- The correction applied (if any) or confirmation that no correction was needed

---

## 8. Regression Testing

### 8.1 Regression Test Suite

After any change to any scan tool, validator, or governance guard, run the following regression tests before redeploying:

| Test ID | Description | Input | Expected |
|---------|-------------|-------|----------|
| **RT-1** | AM-1 DL-008 scan — Pack A | `pack_a_corrected.js` | Returns findings array (expected: ~2 items: P1-B-001, P1-B-025). Item count = 500. |
| **RT-2** | AM-1 DL-008 scan — Pack B | `pack_b_corrected.js` | Returns 0 findings exactly. Item count = 500. |
| **RT-3** | AM-1 DL-008 scan — Pack C | `pack_c_corrected.js` | Returns findings array (expected: ~6 items). Item count = 500. |
| **RT-4** | AM-1 DL-008 scan — Pack D | `pack_d_corrected.js` | Returns findings array. Item count = 500. |
| **RT-5** | AM-1 DL-008 scan — Pack E | `pack_e_corrected.js` | Returns 0 or ~1 findings. Item count = 500. |
| **RT-6** | AM-1 Certified count | All 5 packs | Pack A: 481, Pack B: 500, Pack C: 350, Pack D: 350, Pack E: 500. Total: 2,181. |
| **RT-7** | DL-026 scan | Pack B | 0 empty non-CC ExplanationWrong slots. Zero findings. |
| **RT-8** | String-aware parser bracket-in-string | File with `"Which of the following [A, B, C]..."` in stem | All items extracted, no silent drops. |
| **RT-9** | AM-1 × AM-2 cross-validation | Any pack | AM-1 defect count = AM-2 defect count. QID lists match. |
| **RT-10** | Two identical runs | Any scan, any pack | Run tool twice, compare. Count and QID list must be identical. |
| **RT-11** | QID-list output format | Any scan tool output | Every finding has a `QuestionID` field. No totals-only output. |
| **RT-12** | Item count vs. grep | Any scan, any pack | `questions.length` matches `grep -c '"QuestionID"'` exactly. |

### 8.2 Governance Guard Regression

The governance guard's Rule 2 (DL-008 BLOCK) must pass:

| Test ID | Description | Expected |
|---------|-------------|----------|
| **GG-RT-1** | DL-008 detection — Pack B | BLOCK = false (0 DL-008). Any BLOCK=true is a FAIL. |
| **GG-RT-2** | DL-008 detection — clean item (EW[CC] = "") | BLOCK = false |
| **GG-RT-3** | DL-008 detection — dirty item (EW[CC] ≠ "") | BLOCK = true |
| **GG-RT-4** | Existing governance guard test suite | 20/20 PASS |

---

## 9. Amendments

### 9.1 Amendment Authority

This standard may only be amended by:
1. A dedicated governance session with explicit authorization
2. Cross-verification against AM-1 Function constructor parse ground truth on all 5 packs
3. Documentation of the amendment in REVISION_HISTORY.md with before/after comparison

### 9.2 Relationship to Other Standards

| Document | Relationship |
|----------|-------------|
| `PROJECT_CONSTITUTION.md` | Higher authority — this standard implements constitutional quality principles for scan methodology |
| `knowledge/CAQS_v1.0.md` | Defines the content quality rules this standard's scans enforce (e.g., EV8 for DL-008) |
| `knowledge/QUESTION_METADATA_STANDARD.md` | §9.4 defines certification-blocking conditions (G-NEW-1 through G-NEW-5) that depend on scan methodology |
| `knowledge/CURRENT_BASELINES.md` | Provides the hash baselines and certified counts this standard's scans must match |
| `AGENTS.md` | §5 (Dual Verification) and §6 (Count Stability) are enforced by this standard |
| `SESSION725_GOVERNANCE_DETECTION_STANDARD.md` | Agent B's field extraction rules — this standard's AM-1 through AM-3 implement those rules |
| `SESSION725_HISTORICAL_GOVERNANCE_RCA.json` | Agent K's root cause analysis — this standard codifies the prevention rules derived from that analysis |
| `.opencode/plugins/governance-guard.js` | Rule 2 BLOCK — target for upgrade from FM-001-vulnerable regex to AM-1 Function constructor |

### 9.3 Superseded Documents

This standard supersedes and replaces:
- S802 8 Permanent Prevention Rules (incorporated as AM-1 through AM-3, FM-001 through FM-008)
- All ad-hoc scan methodology descriptions in DEFECT_LIBRARY.md DL entries
- All agent-level scan methodology descriptions in session reports
- Any scan-related prohibition in REVISION_HISTORY.md entries that conflicts with this standard

---

## 10. Governance Guard Upgrade Directive

### 10.1 Current State (S724)

The governance guard (`.opencode/plugins/governance-guard.js` Rule 2) uses a FM-001-vulnerable ±1200 character window forward-scan for DL-008 detection. Per S724 findings, this methodology produces enforcement decisions based on potentially incorrect field attribution.

### 10.2 Required Upgrade

The governance guard must be upgraded to use AM-1 (Function constructor parse) or equivalent object-bounded, string-aware extraction for DL-008 detection. The guard that BLOCKs certification must use a methodology that is immune to the false positives documented in this standard.

### 10.3 New Governance Guard Rules (Proposed)

The following rules are recommended for addition to the governance guard:

| Rule | Level | Content |
|------|-------|---------|
| RULE 6 | **BLOCK** | Totals-only scan reports without QID lists are invalid — enforcement of FM-005 |
| RULE 7 | **BLOCK** | All defect scans must use AM-1 (Function constructor parse) or AM-2 (string-aware object-bounded parse) — enforcement of FM-001/FM-002 |
| RULE 8 | **WARN** | CURRENT_BASELINES.md currency must be verified at T0 — enforcement of FM-008 |

### 10.4 Interim Safeguard

Until the governance guard is upgraded, any BLOCK event triggered by Rule 2 must be independently verified via AM-1 Function constructor parse before being acted upon. No certification-blocking decision based solely on the governance guard's FM-001-vulnerable regex-window scan is valid for governance purposes.

---

## A. Summary of Key Rules

1. **AM-1 is mandatory for DL-008 detection.** No other methodology may produce DL-008 counts used for governance decisions.
2. **Every scan report must include QID lists.** Totals-only = invalid. FM-005 prohibition.
3. **Pack B is the canonical compliance test.** Any tool reporting DL-008 > 0 on Pack B is non-compliant.
4. **String-awareness is required in all parsers.** DL-020 prohibition (FM-002). No exceptions.
5. **Fields must be extracted from the same enclosing object.** DL-029 prohibition (FM-001). DL-016 prohibition (FM-003).
6. **Count divergence = AUTO ESCALATE.** No third scan without methodology change. No majority voting.
7. **Remediation scripts must cross-scan all defect classes.** Pre- and post-scan per FM-006.
8. **Agent self-reports must be independently verified.** Per FM-007 and AGENTS.md §5.
9. **CURRENT_BASELINES.md must be updated at session close.** Per FM-008.
10. **Two independent scans must converge on identical count before any remediation.** Per S802 Rule 8.

---

## B. Revision History

| Version | Date | Session | Author | Summary |
|---------|------|---------|--------|---------|
| 1.0 | 2026-07-26 | S725 Agent G | Governance Hardening — Scan Methodology Standard | Initial creation. Codifies 3 approved methodologies, 8 forbidden methodologies, hard gate on count divergence, regression test suite. Incorporates S802 8 Permanent Prevention Rules. Derived from Agent K's 10-class RCA and Agent B's field extraction standard. |

---

*This standard is binding on all governance, certification, and audit operations in the CMA Part 1 Exam Simulator repository. Non-compliant scan tools produce results that are inadmissible for governance purposes.*
