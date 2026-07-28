# Session 72 — Enhanced Case Governance Prep and First Certification Readiness Wave (`scored_cases2.js`–`scored_cases5.js`)

**Date:** 2026-07-24  
**Status:** Ready to run  
**Primary runtime:** OpenCode  
**Relationship to Session 70:** Carefully non-conflicting. Session 72 touches only the enhanced case files `scored_cases2.js` through `scored_cases5.js` and must not touch any MCQ pack files. It is safe to run alongside Session 71 because Session 71 is Pack E MCQ-only. It may also run alongside Session 70 **only if Session 70 is not writing to these same scored_cases files**.

---

## Purpose

Session 72 is a structured **enhanced case governance-prep and certification-readiness session** for the remaining CBQ case pools in:
- `scored_cases2.js`
- `scored_cases3.js`
- `scored_cases4.js`
- `scored_cases5.js`

The objective is **not** to do a reckless bulk certification. Instead, this session prepares the remaining enhanced cases for future certification by normalizing governance, validating metadata, documenting rubric readiness, and certifying only truly obvious quick wins if they are fully defensible.

This session is the bridge between the already-certified migrated pool in `scored_cases.js` and a later broader CBQ certification wave.

---

## Why this session is separate from Session 70

This session is crafted to avoid operational conflict.

### Session 70 likely owns
- `pack_c_corrected.js`
- `pack_d_corrected.js`
- `pack_e_corrected.js` depending on exact execution path
- possibly governance notes for future case work

### Session 72 owns
- `scored_cases2.js`
- `scored_cases3.js`
- `scored_cases4.js`
- `scored_cases5.js`
- `reports/session_status/SESSION72_ENHANCED_CASE_GOVERNANCE_PREP.md`

### Shared-file warning
- `REVISION_HISTORY.md` should be treated as **deferred-write only** if Session 70 might still be active.
- Put the Session 72 revision-history block into the session report instead of appending live if there is any chance of overlap.

---

## Governance framework

This session must follow the existing project governance artifacts exactly.

1. `QUESTIONMETADATASTANDARD.md`
   - Use only valid `question_state` values.
   - Preserve field naming and schema shape.
   - Do not invent a new certification taxonomy.

2. `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md`
   - Certification is only permitted when content, structure, and governance are all adequate.
   - Cases with unresolved content or metadata concerns must remain non-certified.

3. `SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md`
   - Enhanced case files already exist as the structured CBQ system.
   - Some historical metadata inconsistencies and exhibit CaseID defects were previously identified.
   - This session should use those findings as a checklist, not as unquestioned truth.

4. Current project state after Sessions 65–69
   - `scored_cases.js` migrated pool is already certified.
   - `scored_cases2.js`–`scored_cases5.js` still represent the major remaining enhanced case backlog.
   - These files need governance-hardening and readiness scoring before broader certification.

---

## Scope

### Writable scope
- `scored_cases2.js`
- `scored_cases3.js`
- `scored_cases4.js`
- `scored_cases5.js`
- `reports/session_status/SESSION72_ENHANCED_CASE_GOVERNANCE_PREP.md`

### Read-only scope
- `scored_cases.js`
- `pack_a_corrected.js`
- `pack_b_corrected.js`
- `pack_c_corrected.js`
- `pack_d_corrected.js`
- `pack_e_corrected.js`
- `QUESTIONMETADATASTANDARD.md`
- `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md`
- `SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md`
- `app.js`

### Never touch
- Any MCQ pack file for writes.
- `scored_cases.js` for writes.
- `REVISION_HISTORY.md` if Session 70 may still be active.

---

## Core objective

Prepare the remaining enhanced case files for future certification with disciplined governance work.

Specifically:
1. Re-scan all CBQ cases in `scored_cases2.js`–`scored_cases5.js`.
2. Confirm current metadata integrity at both case and item level.
3. Repair only safe governance/metadata inconsistencies that do not require rewriting core case content.
4. Produce rubric-readiness notes per case.
5. Optionally certify only truly obvious quick-win cases if they already meet the rubric with no substantive defects.
6. Leave the rest in a structured, readiness-ranked state for Session 73+.

---

## Operating philosophy

This is a **quality-preserving preparation session**, not a brute-force certification session.

That means:
- prefer accurate triage over inflated certification counts,
- prefer documented readiness notes over forced status changes,
- use `In Audit` and `Editorial Queue` where appropriate,
- certify only when fully defensible.

---

## Multi-agent design

### Coordinator
- Strong reasoning model.
- Enforces scope, consolidates findings, approves final writes.

### Agent 1 — File inventory and schema validation agent
Responsibilities:
- Scan `scored_cases2.js`–`scored_cases5.js`.
- Inventory all cases and items.
- Confirm presence and consistency of:
  - `CaseID`
  - `question_state`
  - `ProductionStatus`
  - `Difficulty`
  - `DifficultyScore`
  - item-level IDs
  - exhibit references
- Flag malformed or inconsistent governance metadata.

This agent is read-only.

### Agent 2 — Metadata normalization agent
Responsibilities:
- Apply only safe metadata corrections.
- Normalize governance values when they are clearly intended and standards-compliant.
- Correct obvious case/item-level metadata mismatches that do not require content rewrite.
- Do not alter scenario narrative, numerical facts, or scoring logic.

### Agent 3 — Rubric-readiness agent
Responsibilities:
- Compare enhanced cases against the certified migrated pool in `scored_cases.js` as the current internal gold reference.
- For each enhanced case, assign a readiness classification such as:
  - Ready for certification
  - Needs minor editorial pass
  - Needs metadata cleanup only
  - Needs substantive content review
- Map those readiness judgments to governance states where appropriate.

### Agent 4 — Quick-win certification agent
Responsibilities:
- Certify only the cases that are truly obvious passes.
- If there is any meaningful doubt, do not certify.
- Use conservative judgment.
- Record rationale case-by-case.

### Agent 5 — Verification agent
Responsibilities:
- Confirm parse integrity after any writes.
- Confirm only authorized files changed.
- Confirm no regression in governance values.
- Confirm no accidental edits to `scored_cases.js`.

---

## Allowed automatic changes

This session may automatically:
- normalize clearly valid governance values,
- fix safe metadata inconsistencies,
- add structured readiness notes into the report,
- update `question_state` only when the certification or state change is fully justified.

---

## Prompt-required changes

Prompt only if one of the following happens:
- a case appears to need scenario rewrite,
- a numerical or conceptual answer may be wrong,
- a certification decision is borderline and not clearly defensible,
- a metadata issue cannot be resolved without interpreting ambiguous intent,
- a case appears duplicated or structurally merged in a way that needs policy guidance.

---

## Never-allowed changes

Do not do any of the following:
- modify any MCQ pack file,
- modify `scored_cases.js`,
- alter scoring logic in `app.js`,
- invent new governance values,
- broadly rewrite case narratives, sub-items, or exhibits under the banner of metadata cleanup,
- mass-certify cases without per-case readiness review.

---

## Pre-flight requirements

Before any writes:
1. Confirm Session 70 is not writing to `scored_cases2.js`–`scored_cases5.js`.
2. Create timestamped backups of each writable case file using `.bak-s72-YYYYMMDDHHMMSS` naming.
3. Produce a full inventory of cases and current governance state counts.
4. Produce a list of metadata defects and readiness categories before changing anything.

If any pre-flight step fails, stop and report.

---

## Execution plan

### Phase 1 — Inventory and counts
- Count cases and items per file.
- Count current `question_state` and `ProductionStatus` values.
- Identify all cases lacking full readiness for certification.

### Phase 2 — Safe metadata normalization
- Correct obvious governance inconsistencies.
- Ensure file-local schema consistency.
- Leave substantive content untouched.

### Phase 3 — Readiness assessment
For each case, determine:
- structurally ready,
- governance-ready,
- content-ready,
- certification-ready.

### Phase 4 — Optional quick-win certification
- Certify only obvious passes.
- Route non-ready cases to `In Audit` or `Editorial Queue` where justified.
- Keep `Unprocessed` where no meaningful review has yet occurred.

### Phase 5 — Verification
- Re-scan all four files.
- Confirm parse integrity.
- Confirm no unauthorized file writes.
- Produce before/after counts.

### Phase 6 — Reporting
Write `reports/session_status/SESSION72_ENHANCED_CASE_GOVERNANCE_PREP.md` containing:
- pre-flight counts,
- metadata normalization summary,
- readiness matrix by case,
- quick-win certifications if any,
- cases deferred for later sessions,
- backup filenames,
- parse verification,
- deferred `REVISION_HISTORY.md` block if needed.

---

## Success criteria

Session 72 is successful if:
- all four enhanced case files are re-inventoried accurately,
- safe metadata issues are resolved without content regression,
- every case receives a defensible readiness classification,
- any certifications performed are conservative and well-supported,
- no MCQ files or `scored_cases.js` are modified,
- the report is detailed enough to drive Session 73 without repeating discovery.

---

## Launch instructions

### Suggested launch command
```bash
opencode run /workspace/cma_part_1_2026 \
  --prompt-file output/session72.md
```

### Alternative launch pattern
```bash
opencode --cd /workspace/cma_part_1_2026 run "$(cat output/session72.md)"
```

### Human operator note
Before launch, verify:
- Session 70 is not actively writing to `scored_cases2.js`–`scored_cases5.js`.
- You want a conservative prep-and-readiness wave, not a forced bulk certification event.

