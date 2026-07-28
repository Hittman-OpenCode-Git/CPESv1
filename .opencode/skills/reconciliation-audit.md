# Reconciliation Audit Skill

**Purpose:** Cross-check self-reported certification claims, count claims, and audit-status claims against raw file/line evidence — the single most common source of undetected defects across prior sessions.

**Trigger:** Use when any claim is made about certification status, item counts, validator pass/fail, or "clean" scans. Also use before accepting any summary report or remediation proposal that depends on such claims.

---

## 1. Core Principle

**Do not accept summary reports at face value.** Every claim must be independently verified against the source files using the cross-check mappings below. Discrepancies between self-reported status and raw evidence must be flagged explicitly — never silently reconciled.

---

## 2. Standard Cross-Checks

| Claim | Verify Against | Method |
|-------|---------------|--------|
| "X items certified" | `question_state: "Certified"` count in pack files | `grep -c '"question_state"[[:space:]]*:[[:space:]]*"Certified"'` on each file |
| "No DL-008 violations" | ExplanationWrong[A-D] at CorrectChoice slot | For each Q, check `Q["ExplanationWrong" + Q.CorrectChoice]` is empty |
| "X items processed/scanned" | `"QuestionID"` count in target file | `grep -c '"QuestionID"'` |
| "Validator pass — zero errors" | Raw error count from validator | Run `node scripts/validate.js`, parse error count from output |
| "Count restored to N" | Direct count on current file | `grep -c '"QuestionID"'` on the file |
| "Section E has X items" | Section tag count across all 5 packs | grep `"SectionTags"` or QuestionID prefix `-E-` |
| "Pack X has Y certified" | filter by pack prefix + `question_state` | combine section filter + state filter |
| "No clone-backplane residues" | Metadata-block `ChoiceA`-`D` text across items within same Section | For items within ±8 QuestionID range in the same Section, compare `ChoiceA`/`B`/`C`/`D` arrays; flag any group where identical choice-text sets exist and at least one member is `"Certified"` while another is `"Archived"`/`"Unprocessed"`/`MISSING`. Also flag any `"Certified"` item whose metadata-block `ChoiceA`-`D` differs from its content-block `Choices.A`-`D` (two-object structure mismatch — §7). |
| "Archived items have genuinely distinct content" | Content-block `Stem` + `Choices` for archived items vs. their Certified seed | For each group of archived items sharing metadata-block `ChoiceA`-`D` with a Certified seed, verify the content block (second object per QuestionID: `Stem`, `Choices`, `CorrectChoice`) is a true company-name-substitution + rotation clone, not a genuinely distinct item. Flag any archived item whose content-block choices differ substantively from the seed's. |

---

## 3. Count Stability Protocol

When reconciliation numbers change between reports (e.g., DL-012 going 128 → 112 → 138):

1. **Pause.** Do not act on any number.
2. **Re-count** using a different method (direct grep vs. registry read vs. section filter).
3. **Re-count again.** Minimum three independent scans required.
4. **Cross-check methodology** — is the counter filtering by the same criteria? Same section? Same state? Same file?
5. **Document the discrepancy** — what each scan reported, what methodology was used, which was correct, and why the others differed.
6. **Only proceed when the count is stable** across two consecutive independent scans using the same methodology.

Count instability that "resolves itself" without investigation is how the DL-012 scan errors occurred.

---

## 3a. Count Your Window — Regex-Window vs. Block-Parse Calibration

### Critical Finding (validated 2026-07-23)

Regex-window scans (e.g., `Select-String`, `findstr`) that search for a field pattern and then scan a window of text around the match to find the QuestionID **produce false-positive and false-negative QID attribution** when the window size exceeds ~4,000 characters.

**Calibration data** (from DL-012 Section E re-verification across 150 items):

| Window Size | With State Reported | Actual | Error Rate |
|-------------|-------------------|--------|------------|
| 4,000 chars | 38 | 38 | **0%** |
| 8,000 chars | 68 | 38 | **+79%** (false positives) |
| 12,000 chars | 101 | 38 | **+166%** (severe bleed) |

**Root cause:** Large question objects (>4k chars) in the repository cause the regex window to bleed past the item boundary and pick up `question_state` or other field values from the next item, misattributing them to the current QID. Conversely, if the window is used to find the QID *backwards* from a field match, a window that is too small (<4k) can fail to find the parent QID entirely, producing undercounts.

**Rules for any counting methodology:**

1. **Block-parse is authoritative.** Find each `"QuestionID"` marker, then scan forward *only* to the next `"QuestionID"` marker. This method is immune to window-bleed because it uses the actual item boundary.
2. **4,000-char regex window is the maximum safe secondary method.** Use it only as a fast cross-check against the block-parse result, not as a standalone source of truth.
3. **Larger windows (>4k) MUST NOT be used for QID attribution.** They can be used only for counting *total occurrences* of a pattern across an entire file (no QID linkage) — and even then, only as a cross-check against the authoritative count.
4. **If two methods disagree, the discrepancy itself is data** — it indicates either a window-bleed bug or a QID-attribution error. Investigate before accepting either number.

### Evidence

- **DL-012 re-verification (2026-07-23):** A window-bleed bug in a validation script's QID extraction (window >8k) produced a spurious "63 items with question_state" finding against a ground truth of 38. Narrowing to 4k and switching to block-parse revealed the error.
- **DL-013 882-vs-1,011 QID discrepancy (RESOLVED 2026-07-23):** Session 6's full-pool DL-007 sweep (4 independent counting methods including boundary-aware brace-matched extraction) confirmed **882 unique QIDs** as the authoritative count. The 1,011 figure in a prior DEFECT_LIBRARY.md DL-013 scan was a boundary-unaware window-based overcount (see `reports/DL007_009_010_FULL_POOL_SWEEP_2026-07-23.md` §6 for full reconciliation). The per-pack breakdown is: Pack A: 118, Pack C: 382, Pack D: 382. All subsequent work should reference 882, not 1,011.

---

## 4. Certified Pool Audit — Full Procedure

When auditing a "certified pool of N items" claim:

### Step 1: Count by file
```bash
grep -c '"question_state"[[:space:]]*:[[:space:]]*"Certified"' pack_*_corrected.js
```

### Step 2: Count by section
```bash
# Extract all QuestionIDs with question_state: "Certified", group by section letter
```

### Step 3: Verify against REVISION_HISTORY.md
- Compare the raw count to the last `Certified Pool: N MCQs` line in `knowledge/REVISION_HISTORY.md`
- Flag any discrepancy

### Step 4: Verify against MASTER_QUESTION_REGISTRY.md
- Cross-check that every `question_state: "Certified"` item in pack files is also listed in the registry with a CAQS score
- Flag items with state `"Certified"` but no CAQS score

### Step 5: Spot-check 5 random Certified items
- Verify `question_state: "Certified"` is present in the source file
- Verify ExplanationWrong[CorrectChoice] is `""` (no DL-008 re-contamination)
- Verify ExplanationCorrect is substantive (>100 chars)

### Step 6: Known-defective cross-reference
- Cross-check the certified pool against known-defective QIDs from DEFECT_LIBRARY.md
- Cross-check against DL-012 clone archive list (if executed)
- Flag any defective QID found in the certified pool

---

## 5. Output Format

Every reconciliation audit must produce:

```
=== RECONCILIATION AUDIT ===
Date: [ISO 8601]
Trigger: [what claim was being verified]

[1] RAW COUNT
  File: pack_a_corrected.js — N Certified
  File: pack_b_corrected.js — N Certified
  ...
  Total: N certified across all packs

[2] CLAIMED vs ACTUAL
  Claimed: "X items certified" (source: [report/location])
  Actual:  Y items certified (source: raw grep)
  Delta:   +/-Z

[3] COUNT STABILITY
  Method 1: [description] → N1
  Method 2: [description] → N2
  Stable: YES/NO

[4] KNOWN-DEFECTIVE CROSS-CHECK
  DL-012 clones in pool: N
  [List QIDs flagged]

[5] SPOT-CHECKS
  [5 items checked, results]

[6] DISCREPANCIES
  [Flagged issues or "NONE"]

[7] VERDICT
  Claim VERIFIED / CLAIM NOT VERIFIED — [reason]
```

---

## 6. Flag Behavior

- **Discrepancy found** → Report the discrepancy. Do NOT apply a fix. Await explicit authorization.
- **Count unstable** → HARD STOP. Do not proceed with any dependent action. Document all scan results.
- **Known-defective QID in certified pool** → Report immediately. This is a delivery-pool contamination risk.
- **All checks pass** → Report verified status; no further action needed.

---

## 7. Boundary-Safe QID Indexing — HARD REQUIREMENT

**Status: HARD REQUIREMENT — enforced as of 2026-07-23 after three confirmed boundary-scanning incidents.**

### 7a. Rule

Any script or methodology that compares a QID's stem, choices, explanations, or any other field to another QID's fields MUST:

1. **Index by explicit `QuestionID` match** — never by array position (`qs[i]`), sequential offset (+1, -1), or adjacent-line proximity (e.g., "find nearest `"QuestionID"` within N lines").
2. **Use boundary-aware object extraction** — either brace-delimited (`{...}`) JSON block parsing or `eval()` of the complete array with object-level field access.
3. **Verify the extracted QID** — after extracting a field value, confirm the parent object's `QuestionID` matches the expected QID before attributing the field to it.

**Prohibited:** Array-position indexing (`qs[idx+1]`), line-window QID attribution with windows exceeding 4,000 characters per §3a calibration, or any method that assumes positional rather than explicit QID→field binding.

### 7b. Documented Incidents (Third Confirmed)

This rule exists because of THREE confirmed boundary-scanning incidents, all on 2026-07-23:

| # | Incident | Manifestation | Root Cause |
|---|----------|--------------|------------|
| 1 | DL-013 QID count: 1,011 vs 882 | 129-QID overcount of DL-007 template items | Window-based scan attributed adjacent-item QIDs |
| 2 | DL-013 Certified: 9 false positives | `question_state: "Certified"` bleed across item boundaries | Window >8k characters misattributed state from next item |
| **3** | **Session 1 Tier 0 — P1-E-038-041 stem-choice mismatch** | **+1 off-by-one: each QID's stem was read from QID+1 while choices were read from correct QID, creating a phantom rotation defect. All 4 CorrectChoice letters misread. Led to Hold on Certified seeds + clone reversal.** | **Boundary-unaware field extraction; stem attributed by sequential position offset rather than QuestionID match** |

### 7c. Case Study: P1-E-038-041 Off-By-One (2026-07-23)

The definitive example of this failure mode:

A scan was run on `pack_a_corrected.js` items P1-E-038 through P1-E-041 (Certified internal-control themed seeds). The scan reported each item had a stem from one topic but choices from a different topic — a "stem-choice mismatch" requiring emergency Hold and a 3-hop choice-swap.

**What actually happened:**

| QID | Field Source Scanned Correctly | Field Source Scanned Incorrectly | Resulting Illusion |
|-----|-----|-----|-----|
| P1-E-038 | Choices (duplicate invoice controls) | Stem (read from P1-E-039: "Iris paid a terminated employee...") | "Terminated employee stem + AP choices" |
| P1-E-039 | Choices (payroll/termination controls) | Stem (read from P1-E-040: "Juniper uses cycle counts...") | "Cycle count stem + payroll choices" |
| P1-E-040 | Choices (inventory cycle count controls) | Stem (read from P1-E-041: "Keystone finds employees retain access...") | "User access stem + inventory choices" |
| P1-E-041 | Choices (user access controls) | Stem (read from P1-E-042: "Lumen finds recurring invoice...") | "Invoice exception stem + user access choices" |

The illusion was compelling because it was **systematic across consecutive items** — producing a +1 rotation pattern that looked like a genuine template-authoring defect. The scan also misread all four CorrectChoice letters.

**In reality, every item was internally consistent.** Each stem matched its own choices. The "rotation" was an artifact of reading each stem from the next item.

**Cost:**
- 4 Certified items incorrectly placed on Hold (removed from learner delivery pool)
- 4 clone items incorrectly reversed from Archived to MISSING
- 1 choice-swap proposal generated and later discarded after dry-run proved it would create actual mismatches
- Sessions 2, 5, and 6 required for refutation

**Prevention:** The only reliable method is explicit `QuestionID` match with boundary-aware extraction. If this case study had been a rule at the time, the false alarm would not have propagated.

### 7d. Enforcement

Before any audit methodology is used on pack files:
1. Confirm the methodology uses explicit `QuestionID` matching
2. If using line/window proximity, confirm window ≤ 4,000 chars and results are validated against boundary-aware extraction
3. The P1-E-038-041 case study is the canonical cross-check: any new methodology must correctly report all 4 items as internally coherent.

---

## 8. Two-Object Structure Awareness

The pack files (`pack_*_corrected.js`) use a paired-object structure per QuestionID:

1. **Metadata block** (first object): `QuestionID`, `question_state`, `ChoiceA`–`D`, `ExplanationWrongA`–`D`, `VerifiedChecks`, certification fields
2. **Content block** (second object): `Part`, `Section`, `Topic`, `Stem`, `Choices` (as `{A, B, C, D}` object), `CorrectChoice`, `ExplanationCorrect`, `StudyLinks`

The content block is the authoritative source for the rendered question (what the learner sees). The metadata block is authoritative for governance state and machine-readable choice text. These two objects may carry **different** `ChoiceA`–`D` text — this is a template-backplane residue defect when present.

### 8a. Detection

For any item flagged in a cross-check, extract both the metadata-block `ChoiceA`–`D` and the content-block `Choices.A`–`D`. Compare:

- **If identical** → the item is structurally consistent. Proceed with normal governance checks.
- **If different** → the metadata block carries template residue from a prior bulk-authoring pass. Report as "metadata-content inconsistency." The content block is the ground truth for pedagogical content.

### 8b. Cross-Group Comparison

When a Certified item and an Archived/Unprocessed item share identical metadata-block `ChoiceA`–`D` arrays but the content-block `Stem` and `Choices` differ, report as:

> `[QID-A] (Certified) and [QID-B] (Archived) share metadata-block choice template but have distinct content blocks. Verify the archive was based on content (correct) rather than metadata alone (potentially incorrect).`

This pattern was first documented in the Pack A Section E clone groups (2026-07-23), where P1-E-042's metadata block shared the "control exception root cause" template with four archived items, but its content block tested a different concept entirely.

### 8c. Content-Block Seed Verification

When verifying a "seed/clone" archival (where one Certified item anchors a clone group and N others are Archived), compare each archived item's **content block** against the certified seed's **content block**:

- **True clone:** Same stem skeleton (company-name substitution only), same `Choices` set (positionally rotated), `CorrectChoice` rotates with the choice set. Archive is valid.
- **Genuinely distinct:** Different stem scenario, different `Choices` text, different `Topic`. The metadata-block `ChoiceA`–`D` match is template residue only — the archive was metadata-driven and potentially incorrect. Flag for reversal review.

---
