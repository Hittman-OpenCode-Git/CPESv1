# Session 71 — Pack E Section C DL-021 Remediation and Controlled Certification Wave

**Date:** 2026-07-24  
**Status:** Ready to run  
**Primary runtime:** OpenCode  
**Relationship to Session 70:** Strictly non-conflicting. Session 71 is **MCQ-only** and must not write to any case-study files. It is designed to run after, before, or in parallel with Session 70 **as long as Session 70 does not write to `pack_e_corrected.js`**. If Session 70 is already using `pack_e_corrected.js`, do not run Session 71 concurrently.

---

## Purpose

Session 71 is a focused, high-discipline remediation and certification run for **Pack E Section C only**. The goal is to resolve the remaining **DL-021 missing distractor explanation gap** in this section, then certify eligible items using the existing MCQ rubric and governance framework.

This session exists because the remaining Pack E Section C work is highly localized, mechanically consistent, and certification-blocking. It should be handled as a dedicated wave rather than mixed into broader remediation.

---

## Why this session is separate from Session 70

This session is intentionally crafted to avoid conflict with Session 70.

### Session 70 owns:
- `pack_c_corrected.js`
- `pack_d_corrected.js`
- `scored_cases2.js`
- `scored_cases3.js`
- `scored_cases4.js`
- `scored_cases5.js`
- `REVISION_HISTORY.md`
- `reports/session_status/SESSION70_OPENCODE_MCQ_AND_CASE_WAVE.md`

### Session 71 owns:
- `pack_e_corrected.js`
- `reports/session_status/SESSION71_PACK_E_SECTION_C_DL021_WAVE.md`

### Shared file caution
- `REVISION_HISTORY.md` is **not** to be edited by Session 71 if Session 70 may be active. To avoid write collision, Session 71 must write a **deferred revision-history block** inside its own report instead of editing `REVISION_HISTORY.md` directly.
- If Session 70 has fully completed, Session 71 may optionally append to `REVISION_HISTORY.md` as a final step. Otherwise, keep the revision history note inside the session report only.

---

## Governance framework

All decisions in this session must follow the project governance artifacts exactly:

1. `QUESTIONMETADATASTANDARD.md`
   - Valid `question_state` values only: `Unprocessed`, `In Audit`, `Editorial Queue`, `Certified`, `Archived`, `Hold`.
   - No new governance values may be invented.
   - Difficulty labels must remain compatible with the current delivery model.

2. `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md`
   - Certification requires a clean content state and no known unresolved critical defects.
   - Items may be moved to `Editorial Queue` or `In Audit` when they are close but not fully certification-ready.

3. `SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md`
   - Pack E Section C DL-021 is already identified as a structured defect pattern: missing distractor explanation fields.
   - This session is a targeted execution of that known remediation path.

4. Existing session arc
   - Sessions 65–69 materially improved governance and certification state.
   - Pack A and Pack B are fully closed.
   - Remaining MCQ backlog is concentrated in Pack C, Pack D, and Pack E Section C.

---

## Scope

### Writable scope
- `pack_e_corrected.js`
- `reports/session_status/SESSION71_PACK_E_SECTION_C_DL021_WAVE.md`

### Read-only scope
- `pack_a_corrected.js`
- `pack_b_corrected.js`
- `pack_c_corrected.js`
- `pack_d_corrected.js`
- `scored_cases.js`
- `scored_cases2.js`
- `scored_cases3.js`
- `scored_cases4.js`
- `scored_cases5.js`
- `QUESTIONMETADATASTANDARD.md`
- `GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md`
- `SESSION59_POST_STANDARDIZATION_AND_CASE_MOVE_AUDIT.md`
- `app.js`

### Never touch
- Any file used by Session 70 except for read-only inspection.
- Any case-study file for write operations.
- `REVISION_HISTORY.md` if Session 70 could still be running.

---

## Core objective

Complete a tightly governed DL-021 remediation + certification wave for **Pack E Section C**.

Specifically:
1. Locate all Pack E Section C MCQs still blocked by DL-021.
2. Author the missing distractor explanations for those items.
3. Validate that each item now has:
   - correct keyed answer,
   - substantive distractor explanations,
   - no accidental explanation in the correct-choice wrong-explanation slot,
   - no malformed or missing explanation fields.
4. Re-apply the MCQ rubric.
5. Move qualifying items to `question_state: "Certified"`.
6. Move non-qualifying items to the correct non-certified governance state, with clear rationale.

---

## Expected target set

Use the existing project findings as the starting assumption:
- Pack E Section C contains the remaining DL-021 cluster.
- Approximate target volume is **88 items** with about **264 missing distractor explanation fields** to author.

Do not trust approximate counts blindly. Re-scan the actual file and produce an exact current target list before writing.

---

## Multi-agent design

Use a coordinator plus specialized subagents.

### Coordinator
- Strong reasoning model.
- Responsible for final approvals, consolidation, and governance enforcement.
- No direct bulk editing until subagent outputs are validated.

### Agent 1 — Target discovery agent
Responsibilities:
- Scan `pack_e_corrected.js`.
- Identify all Section C items that are not yet Certified.
- Detect missing EW fields and malformed explanation patterns.
- Produce a structured target list including:
  - QuestionID
  - current `question_state`
  - missing explanation slots
  - any adjacent quality concerns

This agent is read-only.

### Agent 2 — DL-021 authoring agent
Responsibilities:
- For each confirmed target item, draft substantive distractor explanations.
- Explanations must be:
  - choice-specific,
  - conceptually correct,
  - aligned with the keyed answer,
  - written in the tone and structure already used in the best Pack E items.
- No stem changes, no answer-key changes, no difficulty changes.

### Agent 3 — Rubric and certification agent
Responsibilities:
- Apply the MCQ rubric to remediated items.
- Set `question_state` appropriately.
- Confirm that all newly Certified items are fully defensible under current governance.
- Route borderline items to `In Audit` or `Editorial Queue` with reasons.

### Agent 4 — Verification agent
Responsibilities:
- Re-scan the edited file after writes.
- Confirm:
  - parse integrity,
  - no case contamination,
  - no non-standard governance values,
  - no new empty EW fields on targeted items,
  - no accidental edits outside Pack E Section C.

---

## Writing rules

### Allowed automatic changes
- Add missing distractor explanation fields to targeted Pack E Section C MCQs.
- Improve explanation text where necessary to make it choice-specific and rubric-compliant.
- Update `question_state` within valid governance values.
- Create the session report.

### Prompt-required changes
Prompt only if one of these occurs:
- The keyed answer appears wrong.
- The stem is ambiguous enough that explanation authoring alone is unsafe.
- The item appears to require topic-level rewrite rather than explanation completion.
- A new defect type appears that is not DL-021 or a trivial adjacent cleanup.

### Never-allowed changes
Do not do any of the following:
- Change `CorrectChoice` automatically.
- Rewrite stems or scenarios broadly.
- Modify any case-study file.
- Modify `pack_a_corrected.js`, `pack_b_corrected.js`, `pack_c_corrected.js`, or `pack_d_corrected.js`.
- Touch `app.js`.
- Introduce new metadata fields or governance values.

---

## Pre-flight requirements

Before any writes:
1. Confirm Session 70 is not writing to `pack_e_corrected.js`.
2. Create a timestamped backup of `pack_e_corrected.js` using a `.bak-s71-YYYYMMDDHHMMSS` naming convention.
3. Produce a target inventory of Pack E Section C DL-021 items.
4. Estimate how many items are likely certifiable immediately after explanation authoring.

If any of those steps fail, stop and report.

---

## Execution plan

### Phase 1 — Inventory
- Enumerate all Pack E Section C items.
- Split them into:
  - already Certified and clean,
  - DL-021 missing EW targets,
  - non-DL-021 items needing manual review.

### Phase 2 — Author missing explanations
- Fill only missing distractor EW fields first.
- Keep explanations concise but substantive.
- Ensure the correct-choice wrong-explanation slot remains empty if that is the established standard.

### Phase 3 — Rubric review
- Review each remediated item for:
  - accuracy,
  - CMA alignment,
  - clarity,
  - distractor quality,
  - explanation quality.

### Phase 4 — State transitions
- `Certified` for fully passing items.
- `In Audit` or `Editorial Queue` for partially remediated or still borderline items.
- `Hold` only if a deeper flaw is discovered.

### Phase 5 — Verification
- Re-scan all Pack E Section C items.
- Verify exact counts before and after.
- Confirm no edits occurred outside the authorized scope.

### Phase 6 — Reporting
Write `reports/session_status/SESSION71_PACK_E_SECTION_C_DL021_WAVE.md` with:
- starting counts,
- exact target list,
- exact fields authored,
- items certified,
- items routed to other states,
- backup filename,
- parse verification,
- deferred `REVISION_HISTORY.md` entry block if Session 70 could still be active.

---

## Success criteria

Session 71 is successful if:
- All intended Pack E Section C DL-021 targets are discovered accurately.
- Missing distractor explanation fields are authored cleanly.
- Newly certified items are rubric-defensible.
- No unauthorized files are modified.
- Pack E parses cleanly after the session.
- The report contains enough detail to append into `REVISION_HISTORY.md` later without rerunning analysis.

---

## Launch instructions

Use OpenCode or your current agent framework in auto-accept mode **only after confirming scope isolation**.

### Suggested launch command
```bash
opencode run /workspace/cma_part_1_2026 \
  --prompt-file output/session71.md
```

### Alternative launch pattern
```bash
opencode --cd /workspace/cma_part_1_2026 run "$(cat output/session71.md)"
```

### Human operator note
Before launch, verify:
- Session 70 is not actively writing to `pack_e_corrected.js`.
- You are willing to let this session run autonomously on Pack E Section C only.

