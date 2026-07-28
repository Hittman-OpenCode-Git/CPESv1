# Identity Resilience Guide — Operational Protocols for Compound-Key Item Identity

**Document:** SESSION202_IDENTITY_RESILIENCE_GUIDE  
**Session:** S202  
**Type:** Operational Guide — enforced by governance guard Rules 9 and 10  
**Status:** Active as of S830 closeout  
**Prerequisites:** SESSION202_IDENTITY_MODEL_V2.json (the normative schema)

---

## 1. When and How to Construct a Compound Key

### 1.1 Construction Protocol

A compound key is constructed at any of these lifecycle events:
- **Session T0** — Registry Board regenerates keys for all 2,500 items via AM-1 Function Constructor Parse
- **Post-Remediation** — After any pack-file write, the Registry Board regenerates keys for affected items to capture new VersionID and potentially changed EW_Pattern
- **Pre-Certification** — Quality Board constructs keys for items entering the certification pipeline
- **Collision Investigation** — When a suspected identity collision requires ad-hoc construction

**Do not construct compound keys manually.** They are derived from pack-file extraction using the AM-1 Function Constructor Parse. Manual construction introduces the same human-error risk that created the DL-016 metadata-content offset.

### 1.2 Field Extraction Order

The seven compound key fields must be extracted from a SINGLE brace-delimited JSON object per item:

```
1. QID — item.QuestionID
2. CorrectChoice — item.CorrectChoice
3. EW_Pattern — computed from item.ExplanationWrong[A-D]
4. Template_Family — assigned by stem similarity clustering (not extracted — computed)
5. File_Path — statically known from the pack file being parsed
6. VersionID — from CERTIFICATION_LEDGER, incremented on content change
7. identity_key — SHA-256(QID|CC|EW_Pattern|Template_Family|File_Path) — excludes VersionID
```

**Critical:** Step 2 (CorrectChoice) and Step 3 (EW_Pattern) MUST come from the same item object. Never pair CC from object N with EW from object N+1. The AM-1 parse returns complete objects where `item.CorrectChoice` and `item.ExplanationWrongA` are always from the same item — no cross-object contamination is possible.

### 1.3 EW_Pattern Computation

```javascript
function computeEWPattern(item) {
  const slots = ['A', 'B', 'C', 'D'];
  return slots.map(letter => {
    const val = item['ExplanationWrong' + letter];
    return (val !== undefined && val !== null && val !== '') ? '1' : '0';
  }).join('');
}
// Return: '0111', '1011', '1101', '1110', etc.
```

**Distinction from DL-018/DL-021:** The binary pattern treats `undefined` (absent field) and `''` (empty field) both as `'0'`. A separate protocol (Section 7.3) distinguishes these for defect classification. For structural identity purposes, both are `'0'` — the item's EW slot is not contributing learner-facing content at that position.

### 1.4 Template_Family Assignment

Template families are identified at registry generation time through clustering:

1. **Stem skeleton extraction:** For each item, remove proper nouns (company names: Alderway, Bramblewood, Castlebrook, Deepwater, Elmsworth, Ashford, Brightpoint, Cedarline, Driftwood, Emberton, and all other known rotation companies). Replace with the token `{Company}`.
2. **Choice text normalization:** For each item, extract the four choice texts from `Choices.{A,B,C,D}`. Sort alphabetically to produce a canonical choice set (independent of rotation position).
3. **Jaccard clustering:** Group items where stem skeleton Jaccard similarity > 90% AND canonical choice set is identical.
4. **Family naming:** `{Section}_{concept}_{sequential_number}`. Example: `AD_factoring_001`.
5. **Cross-pack families:** Pack C and Pack D items sharing the same stem skeleton + choice set get the SAME Template_Family identifier, regardless of which file they reside in. The `File_Path` component of the compound key distinguishes pack-level identity.

### 1.5 VersionID Assignment

| Scenario | VersionID Action |
|----------|-----------------|
| First registration (Phase 1 migration) | VersionID = registration timestamp + '-1' (e.g., `20260727120000-1`) |
| Content change (Stem, Choices, CC, EC, EW[A-D]) | VersionID increments: `20260727144500-2` |
| Metadata-only change (Difficulty, CognitiveLevel) | VersionID unchanged. Metadata_Hash updates. |
| Structural fix only (EW[CC] cleared, EW slot filled) | VersionID increments. Content hash changes. |
| No change since last certification | VersionID unchanged. Content hash matches. |

---

## 2. How to Verify Identity Before Targeting an Item

### 2.1 The Five-Dimensional Verification Protocol

Before any remediation script, certification entry, or question_state change targets an item, verify identity across all five non-version dimensions:

```
VERIFY(dimension) → PASS/FAIL
  ├─ QID: Does the item's QuestionID match the target QID? (PASS/FAIL)
  ├─ CorrectChoice: Does the item's CC letter match the expected CC? (PASS/FAIL)
  ├─ EW_Pattern: Does the item's 4-bit EW emptiness signature match expected? (PASS/FAIL)
  ├─ Template_Family: Is the item assigned to the expected family? (PASS/FAIL)
  └─ File_Path: Is the item in the expected pack file and section? (PASS/FAIL)
  ALL FIVE MUST PASS.
```

**If any dimension fails:** HALT. Do not proceed with modification. The item found is NOT the item intended.

### 2.2 S320-Class Prevention: Rotation Group Targeting

This is the protocol that prevents S320-class variant misidentification:

```
Target: "Remediate P1-EC-001 Section E seed item (Unprocessed, CC=A, single empty non-CC EW slot)"

Step 1: Extract ALL items from pack_c_corrected.js Section E via AM-1 parse.
Step 2: Filter items where item.QuestionID === "P1-EC-001".
        Returns: 1 item in Section E (Pack C packs 75/75, so the match is unambiguous within section).
Step 3: Verify item.CorrectChoice === "A".           ← THE S320 FAILURE POINT
        If CC ≠ A, this is NOT the Unprocessed seed. HALT.
Step 4: Compute EW_Pattern = computeEWPattern(item).
        Verify EW_Pattern[CC_position] === '0' (DL-008 compliant).
        If not, this item has DL-008 — clear EW[CC] FIRST.
        Verify exactly 1 non-CC position has '0' → DL-026 on that slot.
        If more than 1 non-CC slot empty, this is a data-loss item → escalate.
Step 5: Verify item.question_state === "Unprocessed".
        If not, this item is already in a different governance state → HALT.
Step 6: Verify item.Template_Family === "EC_segregation_of_duties_001".
        (Or the correct family identifier assigned at registry generation.)
Step 7: ALL FIVE PASS → PROCEED with remediation targeting this EXACT item.
```

**The S320 failure occurred because the original script stopped at Step 2.** It identified "P1-EC-001" by QID string match and assumed the first brace-matched occurrence was the canonical seed. Steps 3-6 were not executed. Do not repeat this error.

### 2.3 Post-Modification Identity Re-verification

After any write to a pack file:

```
1. Re-extract the item via AM-1 parse (DO NOT read the in-memory buffer).
2. Re-compute EW_Pattern from the persisted file.
3. Verify EW_Pattern matches the EXPECTED post-write pattern (e.g., target slot is now '1' instead of '0').
4. Verify CorrectChoice unchanged (unless authorized answer-key change).
5. Verify all other EW slots unchanged (the write targeted only the empty slot).
6. Verify QID count in pack file unchanged (no items lost during write).
```

If any verification fails: restore from backup and escalate.

---

## 3. How to Handle Identity Ambiguity

### 3.1 The IDENTITY_HOLD Protocol

When item identity cannot be resolved to a single unique compound key, the item enters IDENTITY_HOLD — it is ineligible for certification, remediation, or state changes until resolved.

**Trigger conditions:**

| Condition | Resolution Path |
|-----------|----------------|
| Same QID + CC + EW_Pattern appears in two different pack files with different Template_Family | Template_Family misassignment — re-cluster and re-assign |
| Same QID + File_Path returns multiple items with different CC/EW_Pattern but all active (non-Archived) | Rotation group without canonical seed — designate seed using seed criteria, archive clones |
| Item's EW_Pattern and CC disagree (CC=A but EW_A is '1') | DL-008 defect — clear EW[CC] first, then re-evaluate identity |
| Item's Template_Family cannot be assigned (no other items in section share stem skeleton) | Standalone item — assign a `_standalone` suffix family identifier. No rotation group membership. |
| AM-1 parse fails for this specific item (malformed JSON) | DL-017 corruption — repair structural integrity first. File-level issue, not identity issue. |

### 3.2 Identity Ambiguity Cannot Be Resolved Automatically

If any of the above conditions persist after automated resolution attempts, the item is placed on IDENTITY_HOLD and escalated to a human. Do not proceed with modifications on an item whose identity is ambiguous. The risk of modifying the wrong variant (S320) or misreading defect counts (DL-029) is existential.

---

## 4. How to Verify Scan Artifacts Reference the Correct Item

### 4.1 The Identity Cross-Check Protocol

Any scan tool reporting per-item defect counts MUST cross-check its identity resolution:

```
For each scan tool output:
  1. Extract the scan's reported QID list (e.g., "54 Pack C Section B DL-008 items").
  2. For each reported QID, re-extract the item via AM-1 parse.
  3. Verify the defect the scan flagged is confirmed by direct field-level inspection.
  4. If >5% of flagged items do not actually have the defect → scan methodology error.
```

### 4.2 The DL-029 Prevention Protocol

DL-029 (forward-scan CC offset) is prevented by a simple protocol rule:

**All scan tools that read CorrectChoice MUST extract CC from the SAME JSON object as the item's QID and EW fields.**

```
CORRECT (AM-1 within-object extraction):
  const item = parsedItems[i];
  const cc = item.CorrectChoice;           // From this item's object
  const ewA = item.ExplanationWrongA;      // From this SAME object
  const ewB = item.ExplanationWrongB;      // From this SAME object
  // EW[cc] check uses cc from the same object as the EW fields
  if (item['ExplanationWrong' + cc] !== undefined && item['ExplanationWrong' + cc] !== '') {
    flag DL-008;
  }

INCORRECT (forward-scan / regex-window):
  const qidPos = source.indexOf('"QuestionID": "P1-AD-002"');
  const ccPos = source.indexOf('"CorrectChoice":', qidPos);  // ← FINDS NEXT ITEM'S CC
  // This is wrong. If CC is stored BEFORE QID (Pack B), qidPos points to
  // the current QID but ccPos jumps FORWARD to the NEXT item's CC.
  // EVEN IF CC is after QID, this can still cross object boundaries.
```

### 4.3 Two-Run EW_Pattern Stability Check

To catch scanner methodology errors:

```
Run 1: Extract EW_Pattern for all items via AM-1 parse. Save to array.
Run 2: Repeat extraction independently (new Function constructor invocation). Compare.
If any item's EW_Pattern differs between Run 1 and Run 2:
  → Scanner methodology error (likely DL-020 brace-matcher string-awareness gap).
  → DO NOT USE either run's results. Fix scanner and re-extract.
  → Only proceed when EW_Pattern is stable across two independent runs.
```

---

## 5. How to Handle S320-Class Situations

### 5.1 Definition

An S320-class situation occurs when a remediation script modifies a pack file targeting "seed" items identified by QID alone, and the first brace-matched occurrence of that QID in the file is NOT the intended target because the QID belongs to a rotation group with multiple variants.

### 5.2 Prevention (Pre-Write)

The Five-Dimensional Verification Protocol (Section 2.1) is the prevention mechanism. The remediation script:

1. Does NOT assume first-match = canonical seed.
2. Extracts ALL items with the target QID via AM-1 parse (within the section).
3. Filters by CorrectChoice, EW_Pattern, question_state, and Template_Family.
4. Proceeds only when exactly ONE item passes all filters.
5. If multiple items pass (e.g., two items with same QID, same CC, same EW_Pattern, same question_state, same Template_Family → this means there are clones that were not yet archived): HALT. Escalate. Do not guess.

### 5.3 Recovery (Post-Write Detection)

If an S320-class failure is suspected (wrong variants were modified):

```
1. Verify from backup: compare the pre-modification pack file to the post-modification file.
2. For each item that was supposed to be modified:
   a. Compute its compound key in the pre-modification file.
   b. Does that compound key still exist in the post-modification file WITH the expected change?
   c. If NO → wrong item was modified.
3. If wrong items were modified:
   a. Restore from backup immediately.
   b. Audit the remediation script's target identification logic.
   c. Fix the script to use compound-key targeting.
   d. Re-run with corrected script.
4. Document the failure in REVISION_HISTORY.md with the root cause and resolution.
```

### 5.4 The S320 Lesson — One Sentence

> A QID is a template group identifier. Use compound key (QID + CC + EW_Pattern + question_state + Template_Family + File_Path) to uniquely identify the specific item instance to modify.

---

## 6. How to Update Identity When Content Changes

### 6.1 Protocol After Any Content Modification

```
Step 1: After pack-file write, re-extract the modified item via AM-1 parse.
Step 2: Compute the NEW EW_Pattern from the updated file.
Step 3: Verify the new EW_Pattern MATCHES expected post-write signature.
        E.g., if the write filled EW_C on an item where CC=A and EW former was '0011',
        the new EW_Pattern should be '0111' — pos 2 changed from '0' to '1'.
Step 4: Compute the NEW content_hash from the updated fields.
Step 5: Query Registry Board by identity_key (stable across version changes).
Step 6: Update the item's ledger entry:
        - content_hash → new hash
        - EW_Pattern → new pattern (if changed)
        - VersionID → incremented
        - previous_version → old VersionID
        - last_updated → now
        - last_updated_by → current session ID
Step 7: If question_state changed during this write, update:
        - question_state → new state
        - certification_date → now (if newly Certified)
        - certification_batch → current batch
```

### 6.2 What Changes Do and Don't Force a VersionID Increment

| Change | VersionID Increment? | Content_Hash Change? | Metadata_Hash Change? | Registry Update? |
|--------|---------------------|---------------------|----------------------|-----------------|
| Stem text change | YES | YES | NO | YES |
| Choice text change (any of A-D) | YES | YES | NO | YES |
| CorrectChoice change (answer-key fix) | YES | YES | NO | YES |
| ExplanationCorrect rewrite | YES | YES | NO | YES |
| EW[A-D] filled from empty | YES | YES | NO | YES |
| EW[A-D] text rewrite | YES | YES | NO | YES |
| EW[CC] cleared (DL-008 fix) | YES | YES | NO | YES |
| Difficulty / DifficultyScore change | NO | NO | YES | YES |
| CognitiveLevel change | NO | NO | YES | YES |
| question_state change (governance-only) | NO | NO | YES | YES |
| LOSTag / Topic / MicroTopic change | NO | NO | YES | YES |
| UniqueConceptKey change | NO | NO | YES | YES |
| certification_date / certification_batch change | NO | NO | YES | YES |

### 6.3 Pre/Post Hash Reconciliation Gate

After ANY content-modification session, at session close (Tend):

```
1. Regenerate all item fingerprints from pack files via AM-1 parse.
2. Compare against pre-session DELTA_LEDGER.json baseline.
3. Identify every item whose content_hash changed.
4. Verify each changed item was EXPLICITLY targeted by this session's remediation plan.
5. If any item's hash changed but the item was NOT in the remediation plan:
   → Possible concurrent-write overwrite (DL-019 pattern).
   → Restore from backup. Escalate.
6. If all changed items match the remediation plan and no unexpected changes:
   → Update DELTA_LEDGER.json with new fingerprints.
   → Session close authorized.
```

---

## 7. How to Migrate from QID-Only to Compound-Key Identity

### 7.1 Phase 1 Migration Protocol (S202-S207)

This is Phase 1 of the Framework v2 transition. Migration is read-only — no pack-file modifications.

**S202:** Generate compound keys for all 2,500 items.
```
1. For each pack file, run AM-1 Function Constructor Parse.
2. Extract QID, CC, EW_Pattern, and File_Path per item.
3. Compute identity_key = SHA-256(QID|CC|EW_Pattern|Template_Family|File_Path).
4. Compute content_hash = SHA-256(Stem + sorted(Choices) + CC + EC + sorted(EW)).
5. Compute metadata_hash = SHA-256(Difficulty + DifficultyScore + CognitiveLevel + LOSTag + Topic + question_state + certification_batch + certification_date).
6. Assign Template_Family via stem similarity clustering (Section 1.4).
7. Assign initial VersionID = current certified version date + '-1'.
8. Output: MASTER_QUESTION_REGISTRY.md (auto-generated, per governance guard Rule 3).
9. Output: DELTA_LEDGER.json (fingerprints for all 2,500 items).
```

**S203:** Independent re-extraction verification.
```
1. Re-extract all items via independent AM-1 parse (fresh Function constructor).
2. Compare EW_Pattern, CC, and QID for every item against S202 extraction.
3. 0 mismatches required. If any item's EW_Pattern or CC differs between runs → methodology error. Fix and re-extract.
4. Re-hash all items and compare content_hash against S202 hashes.
5. 0 mismatches required. If any hash differs → serialization non-determinism. Investigate and fix.
```

### 7.2 Backward Compatibility During Transition

During Phase 1 (S202-S830), existing QID-only tools continue to function through the Registry Board shim:

```
QID-only query flow:
  Old tool: lookupByQID("P1-AD-002")
    ↓
  Registry shim: resolves "P1-AD-002" in pack_d_corrected.js
    ↓
  Returns: the active (non-Archived) compound key with highest VersionID
    ↓
  Warning: "This QID has <N> active variants. QID-only resolution returned variant with CC=B, EW_Pattern=1011. Consider using compound key for disambiguation."
```

**What the shim does NOT do:** Resolve QID-only queries that span multiple pack files without a File_Path. A query for "P1-AD-002" must include the pack file context (or default to the pack file the tool was designed for). A global QID-query without File_Path returns AMBIGUOUS and requires disambiguation.

**By S900 (Phase 2 activation):** QID-only lookup is deprecated. All tools must use compound-key identity. The shim is removed. Tools that haven't migrated fail with "COMPOUND_KEY_REQUIRED."

### 7.3 Migration Validation: Certified Count Must Match

After compound keys are generated, cross-validate:

```
Certified count (compound key registry) = ?
Certified count (grep -c '"question_state": "Certified"' on pack files) = ?
```

These must be identical. Any discrepancy means the registry extraction methodology is flawed, or items are not being counted correctly. Resolution order:

1. If registry count < grep count: items missing from registry. Check for parse failures (malformed JSON, DL-017 corruption).
2. If registry count > grep count: duplicate registry entries. Check for Compound-Key collision causing double-counting.
3. If both counts equal but differ from expected: the expected count may be wrong (typical when using stale session status reports).

---

## 8. How to Detect and Resolve Identity Collisions

### 8.1 Collision Detection Protocol

A compound key collision exists when two items produce the same identity_key:

```
Definition of collision:
  identity_key = SHA-256(QID|CC|EW_Pattern|Template_Family|File_Path)

  If two different item objects produce the same identity_key:
    → All five non-hash components are identical.
    → This should be IMPOSSIBLE within a single pack file:
        - QID is unique per file
        - CC + EW_Pattern together discriminate rotation variants
        - Template_Family is constant within a family (not a discriminator)
        - File_Path is constant for the file

    But it COULD happen across pack files if:
      - Two different pack files have identically-named items
        (e.g., pack_c has P1-A-001 and pack_d has P1-A-001 — but QID differs by suffix)
      - The File_Path component prevents this collision because it encodes pack identity.

  Genuine collision scenarios:
    1. Same item registered twice (duplicate insert) → reject second insert
    2. Two items in the same pack file have identical QID + CC + EW_Pattern
       → This IS a genuine defect — two rotation group clones with the same structural signature.
       → These items are clones of each other. Archive one; keep the canonical seed.
    3. Registry corruption: the same item's fingerprint stored under two different identity_keys
       → Deduplicate by merging fingerprints under the identity_key matching the current pack-file state.
```

### 8.2 Collision Resolution

```
Scenario 1 — Duplicate insert:
  REJECT the second insert. Verify the item already exists in the registry with the same compound key.
  If the fingerprints differ (different content_hash for same compound key):
    → Re-extract both fingerprints. If they still differ → pack file changed between extractions.
    → Update the existing entry with the newer fingerprint (from the most recent extraction).

Scenario 2 — Same-pack clones with identical structural signature:
  Determine canonical seed using seed criteria (Section 1.4 of Identity Model).
  Archive non-seed items (question_state → 'Archived').
  Registry: only the seed retains the compound key. Archived items get a new compound key with
  question_state='Archived' but preserve their original identity_key in a lineage field.

Scenario 3 — Registry corruption:
  Identify which fingerprint matches the current pack-file state.
  Remove the stale fingerprint.
  If neither matches → re-extract from pack file and replace both.
```

### 8.3 Proactive Collision Prevention

| Checkpoint | Action |
|-----------|--------|
| Registry insertion | Verify identity_key does not already exist in ledger. Reject if present. |
| After remediation | Re-extract affected items and verify their identity_key matches post-write state. |
| Session T0 | Regenerate all fingerprints. Compare identity_key list against prior session. Flag any new or missing keys. |
| Session Tend | Regenerate all fingerprints. Verify number of items = number reported at T0. Flag discrepancy. |
| After any pack-file merge/restore | Full re-extraction + collision scan. Backup before merge. |
| After archival batch | Verify all archived items still have unique identity_keys. Verify archive reason documented. |

### 8.4 The One-Invariant

If there is one rule that catches 90% of identity collisions before they cause damage:

> **Never construct or modify a compound key manually. Always derive it from AM-1 within-object extraction of the source pack file.** The pack file is canonical. The registry is a derived artifact. When they disagree, the pack file wins — regenerate the registry.

---

## Appendix A: Quick-Reference Tables

### A.1 Compound Key Field Summary

| Field | Extract From | Stable Across Version Changes? | Required for Remediation Targeting? |
|-------|-------------|-------------------------------|-------------------------------------|
| QID | item.QuestionID | YES — QID never changes | YES |
| CorrectChoice | item.CorrectChoice | YES (unless answer-key fix) | YES |
| EW_Pattern | computeEWPattern(item) | YES (unless EW write changes it) | YES |
| Template_Family | Clustering assignment | YES (static assignment) | Recommended |
| File_Path | Static per pack file | YES | YES |
| VersionID | Registry ledger | NO — increments on content change | Optional (for version pinning) |

### A.2 Defect-to-Protocol Mapping

| Defect | Detected By | Protocol Section | Prevention |
|--------|-------------|-----------------|------------|
| S320 (variant misidentification) | 5-Dimensional Verification | §2.2, §5 | QID + CC + EW_Pattern + question_state match |
| DL-029 (forward-scan CC offset) | EW_Pattern Stability Check | §4.2 | AM-1 within-object extraction only |
| DL-016 (metadata-content divergence) | Same-object EW+Choices extraction | §4.2 | All fields from same object boundary |
| DL-008 (EW[CC] non-empty) | EW_Pattern at CC position = '0' check | §2.3 | Post-write EW_Pattern verification |
| DL-026 (non-CC EW empty) | EW_Pattern non-CC position = '1' check | §2.3 | Post-write EW_Pattern verification |
| Cross-pack collision | Registry insertion dedup | §8.2 | Identity_key uniqueness at insert |

### A.3 Scanner Methodology Tier List

| Tier | Method | Allowed for Production Use? |
|------|--------|----------------------------|
| AM-1 | Function Constructor Parse (within-object extraction from pack file variables) | YES — required |
| AM-2 | JSON.parse on per-object string extraction (string-aware brace-matcher, DL-020 fixed) | YES — backup method |
| Tier 2 | Regex-window scanning (QuestionID → forward-scan for CC) | NO — produces DL-029 false positives |
| Tier 2 | Flat-field matching (grep for "ChoiceA" — finds metadata block, not content block) | NO — produces DL-016 artifacts |
| Tier 3 | Brace-matched object counting (string-unaware — brackets in strings break depth counter) | NO — produces DL-020 undercounts |
| Tier 4 | Forward-scan without QuestionID anchoring | NO — completely unreliable |

---

## Appendix B: Governance Rules 9 and 10 — Full Text

### RULE 9 — Compound-Key Identity Required (HARD_BLOCK)

**Effective:** S830 closeout (end of Phase 1)
**Scope:** All pack-file writes, question_state changes, certification entries, remediation scripts

No remediation script, certification entry, or question_state change may reference an item by QID alone. All item-level write operations must use the full compound key (QID + CorrectChoice + EW_Pattern + Template_Family + File_Path + VersionID). The identity_key (SHA-256 of first five components, excluding VersionID) is the canonical lookup token.

**Enforcement:** The governance guard validates that any pack-file modification includes compound-key identification in its REVISION_HISTORY.md entry. Modifications without compound-key identification are blocked.

### RULE 10 — Registry Integrity (HARD_BLOCK)

**Effective:** S202 (Phase 1 start)
**Scope:** All sessions

At session T0, the MASTER_QUESTION_REGISTRY.md must be regenerated from pack files via AM-1 parse. The item count in the registry must match the dual-verified grep count of `"QuestionID"` across all pack files. If the counts differ, the session is halted until the discrepancy is resolved.

At session Tend (close), the registry must be regenerated again. The item count must match the T0 count (adjusted for any authorized archival or addition). If counts differ without authorized explanation, the session cannot close.

**Enforcement:** The governance guard blocks session close if T0 and Tend registry counts differ without an authorized change manifest.

---

*This guide is normative for all sessions from S830 forward. All tools, scripts, and agents operating on pack files must comply with the compound-key identity protocol. QID-only identity is deprecated.*
