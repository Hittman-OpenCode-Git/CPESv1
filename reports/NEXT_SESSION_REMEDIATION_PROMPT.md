# P0 Remediation Wave — Next Session Prompt

**Decisions Confirmed:** 1=A (Full Adjudication), 2=A (Targeted Authoring), 3=B (Emergency Remediation)

---

## ⚠️ Critical Governance Note on Decision 3

**Decision 3 (Emergency Remediation) conflicts with Rule 21 / DL-047 gate.** The 108 quarantined cases were moved to `In Audit` because they carry INVERSION flags from `case_semantic_screens.js`. Rule 21 requires a clean semantic screen re-run before any `question_state` flip to `Certified`. Emergency remediation that bypasses adjudication violates this gate.

**If proceeding with Decision 3=B:** The 108 cases must still pass semantic screens before certification. "Emergency" can only mean prioritized scheduling, not gate bypass.

---

## Session Prompt

```markdown
# Next Session: P0 Remediation Completion Wave

## Lane: Full Governance Lane (touches pack files, answer keys, question_state, certification)

## T0 Mandatory: npm run preflight → verify 0 divergences

## Workstreams (Parallel)

### WS1: Semantic Key Adjudication (Decision 1=A)
**Target:** 68 REVIEW flags from `semantic_key_verifier.js`
**File:** `scripts/output/semantic_key_flags.json`
**Process per flag:**
1. Read QID, pack, CorrectChoice, best-match choice, recall%, margin%
2. Hand-solve against stem/choices/exhibits
3. If inversion confirmed → fix key + EC + EW slots + recertification stamps
4. If false positive → document in KNOWN_FP set (scripts/semantic_key_verifier.js)
5. Update REVISION_HISTORY.md per item
**Gate:** `node scripts/semantic_key_verifier.js` must exit 0 (0 BLOCK, 0 REVIEW or documented FP)
**Batch cap:** ≤30 items per change-set (Rule 5)
**Backup:** Mandatory per BACKUP_PROTOCOL.md before each pack edit

### WS2: P2-F v1.1 Schema Authoring (Decision 2=A)
**Target:** 67 items in `p2/pack_p2_f.js` with base schema errors
**Errors:** Missing `source_ids` (evidence-package traceability) + missing `distractor_intent` (distractor engineering audit)
**Process per item:**
1. Author `source_ids`: array of authoritative references (ASC, COSO, IMA LOS, textbook)
2. Author `distractor_intent`: per-choice object explaining targeted misconception
3. Verify `npm run validate` shows 0 errors on Pack F
**Gate:** `npm run validate` → 0 base schema errors on p2_f
**Batch cap:** ≤30 items per change-set
**Backup:** Mandatory per BACKUP_PROTOCOL.md

### WS3: Quarantined Case Remediation (Decision 3=B — WITH GATE COMPLIANCE)
**Target:** 108 cases in `In Audit` from `semantic_quarantine.json`
**Constraint:** **NO certification without clean semantic screen re-run** (Rule 21 / DL-047 gate)
**Process per case:**
1. Run `node scripts/case_semantic_screens.js` on case
2. If INVERSION flags remain → adjudicate per WS1 process (fix key/explanation)
3. If DL-013 boilerplate flags → author choice-specific explanations
4. Only after screens clean → flip `question_state: "Certified"` + recertification stamps
**Gate:** `node scripts/case_semantic_screens.js` → 0 new flags on remediated cases
**Batch cap:** ≤30 items per change-set
**Backup:** Mandatory per BACKUP_PROTOCOL.md

## Tend Required (All Workstreams Complete)
- `npm run pipeline` → validate → case-screens → build-registry → dashboard → baseline-coherence
- `npm run preflight` → 0 divergences
- `npm run smoke` → PASS
- `npm run probe:parity` → document P2 strict pool count
- REVISION_HISTORY.md entries for all changes
- DEFECT_LIBRARY.md entries for any new defects discovered

## Governance Guards Active
- Rule 2 (DL-008): BLOCK non-empty ExplanationWrong[CorrectChoice]
- Rule 6 (DL-026): BLOCK empty non-CC ExplanationWrong
- Rule 9 (DL-037): BLOCK lead-in polarity mismatch
- Rule 13: BLOCK Part2OnlyFlag not strictly boolean true
- Rule 14: BLOCK cross-part QID boundary
- Rule 16: BLOCK certification without provenance stamps
- Rule 20: BLOCK legacy extractor regression
- Rule 21: BLOCK semantic quarantine manifest flip without clean screen
```

---

## File References for Session Start

| Artifact | Location |
|----------|----------|
| 68 REVIEW flags | `scripts/output/semantic_key_flags.json` |
| P2-F schema errors | `scripts/output/p2f_schema_errors.json` |
| Quarantine manifest | `scripts/output/semantic_quarantine.json` |
| Case semantic screens | `scripts/case_semantic_screens.js` |
| Semantic key verifier | `scripts/semantic_key_verifier.js` |
| P2 schema validator | `scripts/validators/p2_schema_validator.js` |
| Backup protocol | `knowledge/BACKUP_PROTOCOL.md` |
| Revision history | `knowledge/REVISION_HISTORY.md` |
| Defect library | `knowledge/DEFECT_LIBRARY.md` |