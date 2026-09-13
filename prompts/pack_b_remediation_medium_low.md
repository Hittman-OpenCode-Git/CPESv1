# Pack B Remediation Prompt — Medium/Low Findings Resolution

## Context

This prompt authorizes remediation of **non-blocking Medium and Low findings** from the Pack B third-party review. Critical defects (2 DL-010-ABSENT) have been resolved. These remaining items are for the next quality wave.

## Findings to Remediate

### Medium (184 items)

| Defect Class | Count | Description |
|--------------|-------|-------------|
| **DL-046** | 15 | Leading whitespace in choice text (e.g., `" departments submit..."`) |
| **CALC-INTEGRITY** | 166 | `CalculationItem: true` but `VerifiedChecks` lacks explicit "recomputed" / "independently verified" line |
| **DL-037** | 3 | Binary lead-in polarity flags ("Yes," on incorrect choice — needs human confirm) |

### Low (311 items)

| Defect Class | Count | Description |
|--------------|-------|-------------|
| **Part1OnlyFlag undefined** | 275 | Metadata completeness — field missing from object |
| **Difficulty/CL mismatch** | 20 | Moderate items with Remember cognitive level (DL-031 pattern) |
| **Absolute terms** | 16 | Forbidden terms ("always"/"never"/"all of the above") in choices |

---

## Remediation Specifications

### 1. DL-046 — Leading Whitespace (15 items)

**Action**: Trim leading/trailing whitespace from all `Choices.{A,B,C,D}` values.

**Validation**: After fix, no choice text starts/ends with whitespace.

**Rule 5**: Batch ≤30 items per change-set.

### 2. CALC-INTEGRITY — VerifiedChecks Gap (166 items)

**Action**: For each item where `CalculationItem: true`, append to `VerifiedChecks` array:
```
"Independent recalculation verified — answer key matches derived result"
```

**Note**: Only add if not already present. Do not modify other VerifiedChecks entries.

**Rule 5**: Batch ≤30 items per change-set (6 batches).

### 3. DL-037 — Binary Lead-In Polarity (3 items)

**Action**: **Human review required**. The 3 flagged items need manual confirmation:
- If "Yes," leads into an incorrect conclusion → flip to "No," (or vice versa)
- If polarity is actually correct → document as false positive

**Do NOT auto-fix**. Flag for human decision.

### 4. Part1OnlyFlag — Missing Field (275 items)

**Action**: Add `"Part1OnlyFlag": true` to all 275 items missing this field.

**Validation**: All 500 Pack B items have `Part1OnlyFlag: true`.

**Rule 5**: Batch ≤30 items per change-set (10 batches).

### 5. Difficulty/CL Mismatch (20 items)

**Action**: For items with `Difficulty: "Moderate"` (or `DifficultyScore: 3`) AND `CognitiveLevel: "Remember"`:
- If stem is definition-match → change `Difficulty` to `"Easy"`, `DifficultyScore` to `1`
- If stem requires application → change `CognitiveLevel` to `"Apply"`

**Rule 12 (Cognitive-First)**: Do not relabel cognitive level to fill portfolio gaps. Only correct where classification is demonstrably wrong.

**Rule 5**: Batch ≤30 items per change-set.

### 6. Absolute Terms (16 items)

**Action**: For each flagged item, review the specific term in context:
- "always"/"never"/"impossible" → almost always incorrect in CMA distractors; rewrite to qualified language
- "all of the above" / "none of the above" → ensure genuinely correct ≤25% of the time per CAQS §6.4

**Rule 5**: Batch ≤30 items per change-set.

---

## Execution Protocol

### Per AGENTS.md Full Governance Lane:

1. **Preflight T0**: `npm run preflight` — verify Pack B 500/500, parse OK, guard PASS
2. **Backup-before-write**: Per `knowledge/BACKUP_PROTOCOL.md` — timestamped `.bak-YYYYMMDDHHMMSS` for each file edit
3. **Change-sets**: ≤30 items per batch (Rule 5)
4. **Verification**: After each batch, re-run preflight + governance guard
5. **REVISION_HISTORY.md**: Entry per batch with QIDs, before/after, verification results
6. **Preflight Tend**: Final `npm run preflight` + `npm run pipeline` if content/regeneration work

### Backup Protocol (Mandatory)

Before ANY edit to `pack_b_corrected.js`:
```bash
cp content/packs/pack_b_corrected.js content/packs/pack_b_corrected.js.bak-YYYYMMDDHHMMSS
# Verify backup exists and non-zero size
```

---

## Safety Constraints

- **Do NOT** modify `CorrectChoice` or `ExplanationCorrect` unless explicitly required (CALC-INTEGRITY is metadata only)
- **Do NOT** relabel cognitive levels to fill portfolio gaps (Rule 12)
- **Do NOT** change `question_state` — all items remain `Certified`
- **DL-037 items**: Human decision required before any edit

---

## Target End State

| Metric | Current | Target |
|--------|---------|--------|
| DL-046 | 15 | 0 |
| CALC-INTEGRITY gap | 166 | 0 |
| DL-037 | 3 | 0 (or documented FP) |
| Part1OnlyFlag missing | 275 | 0 |
| Difficulty/CL mismatch | 20 | 0 |
| Absolute terms | 16 | 0 |

**Total remediation**: ~495 field edits across 6 defect classes, batched per Rule 5.

---

## Authorization

Reply with **"apply the fix"** to begin Full Governance Lane remediation starting with the highest-impact class (Part1OnlyFlag — 275 items, metadata completeness).

Or specify a subset: **"apply Part1OnlyFlag fix only"**, **"apply CALC-INTEGRITY fix only"**, etc.