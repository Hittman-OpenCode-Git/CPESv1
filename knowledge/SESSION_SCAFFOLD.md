# Nested Prompt Scaffold for the CMA Part 1 Simulator Repo

This scaffold is designed for OpenCode sessions in this repository. It uses controlled prompt chaining rather than recursive autonomy, so work can move faster without letting any agent expand its own authority.

## Operating principle

The core rule is: **the chain may pass work forward, but it may not expand its own authority**. Prompt chaining works best when each step has a narrow role, clear inputs, and structured outputs; it becomes risky when errors, scope drift, or autonomous tool use propagate across steps.

## Chain structure

Use four roles in order:

| Layer | Role | Responsibility | Output |
|---|---|---|---|
| 1 | Planner | Defines scope, lane, allowed files, banned files, success criteria, and stop conditions | Session plan |
| 2 | Auditor | Reads current state, identifies the smallest safe set of changes, and reports risks | Audit report |
| 3 | Implementer | Applies only the approved changes from the audit output | File changes + change log |
| 4 | Verifier | Runs smoke, syntax, and governance checks, then writes the closeout | Verification report |

This structure reflects prompt-engineering guidance that complex work should be decomposed into sequential tasks with clear information flow rather than one large monolithic prompt.

## Global controller template

Use this top-level wrapper before any nested session:

```text
SESSION [NUMBER] — [TITLE]

Governance Lane:
[Light or Full]

Purpose:
[1-3 sentence description of desired result]

Constraints:
- Allowed files: [list]
- Forbidden files: [list]
- No scope expansion without explicit approval
- No agent may redefine the lane or widen write authority
- All claims must be verified against source files before closeout

Execution model:
This session uses a controlled nested prompt chain.
The chain may pass work forward, but it may not expand its own authority.
Each downstream step must consume upstream artifacts, not reinterpret the overall mission.

Required stages:
1. Planner
2. Auditor
3. Implementer
4. Verifier

Required closeout:
- Governance Lane
- Files Changed
- Commands Run
- Pass / Fail
- Divergences Found
- Reconciliation Required
- Recommended Next Prompt
```

## Light Lane scaffold

Use this for UI, May behavior, reports, dashboards, read-only audits, helper scripts, and other non-content work.

```text
SESSION [NUMBER] — [LIGHT LANE TITLE]

Governance Lane: Light

Purpose:
[Describe the user-visible improvement.]

Scope Lock:
Allowed files:
- app.js
- may-core.js
- may-learner-state.js
- styles.css
- index_updated.html
- related UI/helper/report files only if directly required

Do NOT modify:
- pack_*_corrected.js
- case_pack_*.js / scored_cases*.js
- answer keys
- question_state values
- certification status
- registries
- baselines
- governance-critical content files

Operating rule:
The chain may pass work forward, but it may not expand its own authority.
No downstream agent may enlarge scope, add architecture, or touch Full Lane surfaces.

Stage 1 — Planner (read-only)
Mission:
- Confirm this is Light Lane.
- Translate the objective into 3-5 concrete success criteria.
- List the exact files likely to change.
- List explicit non-goals.

Deliverable:
reports/SESSION[NUMBER]_PLAN.md

Stage 2 — Auditor (read-only)
Mission:
- Inspect current implementation.
- Identify the 3-7 highest-value safe changes.
- Report any blockers, fragile areas, or likely regressions.
- Do not write code.

Deliverable:
reports/SESSION[NUMBER]_AUDIT.md

Stage 3 — Implementer (write only within Light Lane scope)
Mission:
- Implement only the approved changes from the audit.
- Prefer the smallest effective changes.
- Do not add unrelated polish or speculative architecture.
- Keep the experience cohesive and premium.

Deliverable:
reports/SESSION[NUMBER]_CHANGELOG.md

Stage 4 — Verifier (read-only)
Mission:
- Run `npm run smoke` if available.
- Run `node --check` on changed JS files.
- Confirm no forbidden files changed.
- Write closeout in the required format.

Deliverable:
reports/SESSION[NUMBER]_VERIFY.md

Required closeout format:
Governance Lane:
Files Changed:
Commands Run:
Smoke Result:
Pass / Fail:
Divergences Found:
Reconciliation Required:
Recommended Next Prompt:
```

## Full Lane scaffold

Use this for pack edits, case edits, answer-key changes, `question_state` changes, certification operations, baseline/registry changes, learner-delivery safety logic, or governance-critical scripts.

```text
SESSION [NUMBER] — [FULL LANE TITLE]

Governance Lane: Full

Purpose:
[Describe the approved content or governance task.]

Scope Lock:
Allowed files:
- [explicit approved files only]

Do NOT modify:
- any file not explicitly listed above
- generated registries by hand
- unrelated packs/cases

Hard rules:
- Read-only by default except for the specifically authorized write target(s)
- Backup-before-write for all pack/case edits
- `npm run preflight` at T0
- Raw evidence verification required for all count/state claims
- REVISION_HISTORY / DEFECT_LIBRARY updates required when applicable
- `npm run pipeline` at Tend when content/regeneration work completes
- No destructive script execution without staged authorization

Operating rule:
The chain may pass work forward, but it may not expand its own authority.
No downstream step may broaden the write set, open a second remediation wave, or certify additional items without explicit approval.

Stage 1 — Planner (read-only)
Mission:
- Confirm Full Lane trigger.
- List every authorized file path.
- Define before/after state to verify.
- State the exact stop conditions.

Deliverable:
reports/SESSION[NUMBER]_PLAN.md

Stage 2 — Auditor (read-only)
Mission:
- Run T0 evidence checks.
- Verify current counts, hashes, and target-item status from raw source files.
- Identify exact lines/objects to touch.
- Report risks before any write occurs.

Deliverable:
reports/SESSION[NUMBER]_AUDIT.md

Stage 3 — Implementer (writes only after audit approval)
Mission:
- Take backup(s).
- Apply only the explicitly authorized change set.
- Do not widen the wave.
- Update required governance records if this session includes qualifying changes.

Deliverable:
reports/SESSION[NUMBER]_CHANGELOG.md

Stage 4 — Verifier (read-only)
Mission:
- Re-check raw counts and affected states.
- Run required validators/preflight/pipeline as appropriate.
- Confirm no unauthorized files changed.
- Produce final closeout and note any divergences.

Deliverable:
reports/SESSION[NUMBER]_VERIFY.md

Required closeout format:
Governance Lane:
Authorized Write Scope:
Files Changed:
Backups Created:
Commands Run:
Validation / Pipeline Result:
Pass / Fail:
Divergences Found:
Reconciliation Required:
Recommended Next Prompt:
```

## Nightly stop scaffold

Use this when the goal is to end the night at a safe stopping point rather than maximize scope.

```text
SESSION [NUMBER] — Nightly Stop / Stable Handoff

Governance Lane:
[Usually Light, but specify explicitly]

Purpose:
This is the final development batch tonight.
The objective is to leave a stable build and a clean handoff for the next session.

Scope:
- Small, high-confidence fixes only
- No broad redesigns
- No new architecture
- No speculative expansion

Stage 1 — Readiness audit (read-only)
Mission:
- Identify the last 3-5 issues worth fixing tonight.
- Separate must-fix from can-wait.

Stage 2 — Final polish (write within allowed scope only)
Mission:
- Fix only the must-fix and highest-value minor polish items.

Stage 3 — Verification (read-only)
Mission:
- Run smoke/syntax checks.
- Confirm safe stopping point.

Stage 4 — Handoff (read-only)
Mission:
- Write what was finalized tonight.
- List what the user or tester should try next.
- List what should remain untouched until the next session.
- Recommend the first prompt for tomorrow.

Required closeout format:
Governance Lane:
Files Changed:
Commands Run:
Smoke Result:
What was finalized tonight:
Known minor issues still present:
Safe stopping point achieved: YES/NO
Recommended first prompt tomorrow:
```

## Reusable guardrails

Paste these guardrails into any session that has a risk of sprawl:

```text
Guardrails:
- The chain may pass work forward, but it may not expand its own authority.
- No downstream agent may widen file scope.
- No downstream agent may convert Light Lane work into Full Lane work.
- No implementation step may trust upstream summaries alone when raw file evidence is available.
- If a blocker or contradiction appears, stop and report rather than improvising a broader solution.
- Prefer the smallest change that materially improves the result.
- End with a structured closeout, not an open-ended continuation.
```

## When this helps most

This scaffold is best for repeatable work such as UI polish, audit-implement-verify loops, governance closeouts, and structured content-review sessions, where decomposition reduces prompt overhead and improves consistency.

## When not to use it

Do not rely on nested chaining alone for novel architecture decisions, open-ended autonomous coding, or sessions where one error can propagate across many files. Research on agentic and recursive systems warns that autonomy increases the impact of misconfiguration, error propagation, and unauthorized tool behavior if checkpoints are weak.
