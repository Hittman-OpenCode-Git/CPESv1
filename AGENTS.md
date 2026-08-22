# AGENTS.md — CMA Part 1 Exam Simulator Standing Instructions

**Version:** 2.1 (Session P2-032 — Third-Party Content Review Handoffs)
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Applies to:** All Computer/AI sessions in this repository

---

## 1. Governance Guard Plugin — Registered, Do Not Re-Litigate

The `governance-guard` plugin is registered at `.opencode/plugins/governance-guard.js` (393 lines) and listed in `opencode.json` under `"plugin"`. It enforces 10 rules, all at BLOCK level (upgraded S221):

| Rule | Level | Behavior |
|------|-------|----------|
| RULE 1 | **BLOCK** | question_state changes must pair with REVISION_HISTORY.md updates |
| RULE 2 | **BLOCK** | ExplanationWrong[CorrectChoice] must be `""` (DL-008 enforcement, per EV8 / CAQS_v1.0.md §4.4) |
| RULE 3 | **BLOCK** | MASTER_QUESTION_REGISTRY.md is generated — never hand-edit |
| RULE 4 | **BLOCK** | answer-key changes must include a "recomputed" / "independently verified" note |
| RULE 5 | **BLOCK** | Max 30 question objects per change-set without `BLOCK-AUTHORIZED` marker |
| RULE 6 | **BLOCK** | non-CorrectChoice ExplanationWrong slots must be non-empty (DL-026 enforcement) |
| RULE 7 | **BLOCK** | DERIVED_REGISTRY_NOT_AUTHORITATIVE — no hand-editing derived registries |
| RULE 8 | **BLOCK** | UNTRACKED_ARTIFACT — session packages must be registered |
| RULE 9 | **BLOCK** | Choice binary lead-in polarity mismatch (DL-037 enforcement) |
| RULE 10 | **BLOCK** | non-CorrectChoice ExplanationWrong slots must be present and non-empty (DL-021 enforcement) |

**The plugin is already active.** Do not ask permission or re-confirm registration each session. The test suite is at `scripts/test_governance_guard.js` (54 tests, all BLOCK-validated).

---

## 2. Read-Only by Default

**Any exploratory or audit task must operate in read-only mode unless explicitly authorized per task.**

- No writes to pack source files (`pack_*_corrected.js`, `scored_cases*.js`)
- No modification of `question_state` values
- No changes to answer keys (`CorrectChoice`, `Correct`)
- No writes to `MASTER_QUESTION_REGISTRY.md`

A task is "read-only" unless the user says: "apply the fix," "make the change," "execute the write," or equivalent explicit authorization. Audit findings and recommendations are to be reported — not applied — unless authorized.

---

## 3. Backup Protocol — Mandatory Before Every File Edit

Per `knowledge/BACKUP_PROTOCOL.md` — **this is a hard rule with no exceptions.**

Before any `edit` or `write` tool against any pack file (`pack_a` through `pack_e_corrected.js`):

1. Copy the target file to a timestamped backup: `pack_X_corrected.js.bak-YYYYMMDDHHMMSS`
2. Confirm the backup file exists and has non-zero size.
3. Proceed with the edit **only after** backup is confirmed.

For scored case files: `scored_cases[N].js.bak-YYYYMMDDHHMMSS`

---

## 3.1 Destructive Script Execution — Staged Authorization Required

**No script that performs file deletion (`fs.unlinkSync`, `Remove-Item`, `rm`, `del`) shall be written, saved, or executed without explicit staged authorization.** This applies to all files, not just pack/source files — deletion of any repository file is a write operation subject to §2 (Read-Only by Default).

### Prohibited Without Authorization

- Writing a script that calls `fs.unlinkSync`, `fs.rmSync`, `Remove-Item`, `rm`, `del`, or any file-deletion primitive
- Uncommenting previously commented-out deletion code in an existing script
- Running any script that performs destructive file operations, even if authored in a prior session
- Passing `-Force`, `-Recurse`, or `-Confirm:$false` to deletion commands

### Required Authorization Sequence

Before any destructive script may execute:

1. **Proposal:** The computer must present a list of every file that will be deleted (paths, not counts)
2. **Backup:** Every file in the deletion list must be backed up to a timestamped path first, even files deemed "garbage" — garbage classification can be wrong (see: `admin.html` deleted 2026-07-28)
3. **Authorization:** The user must explicitly authorize the deletion using the phrase: "delete the files," "execute the cleanup," or equivalent
4. **Verification:** After execution, confirm the backup exists for every deleted file before considering the task closed

### Audit-Only Mode

Any script that audits root hygiene must **default to dry-run** (log-only, no `fs.unlinkSync`). The deletion code path must be gated behind an explicit `--execute` or `--clean` flag that requires user confirmation.

**Precedent:** On 2026-07-28, a root-hygiene audit script with uncommented `fs.unlinkSync` deleted 13 files including `admin.html` (an application file, misclassified as prohibited garbage). No backup was taken before deletion. This rule exists to prevent recurrence.

---

## 4. REVISION_HISTORY.md — Required for Every Certification or Content Change

Per `governance-guard.js` Rule 1 and `knowledge/REVISION_HISTORY.md`:

- Every `question_state` change **must** pair with a `knowledge/REVISION_HISTORY.md` entry.
- Every content change (answer, explanation, distractor) **must** pair with a `knowledge/REVISION_HISTORY.md` entry.
- Every certification batch **must** have a revision entry listing QuestionIDs, verification results, and before/after counts.

**Do not batch entries.** Write the entry contemporaneously with the change, not after a long session. Past entries must not be duplicated or overwritten — always append, never edit prior entries.

**Lane note:** These requirements apply to Full Governance Lane sessions. Governance Light Lane sessions only need REVISION_HISTORY.md entries if they discover and fix a content-level defect.

---

## 5. Dual Verification — Cross-Check All Self-Reported Claims

**Any self-reported claim of "certification complete," "audit passed," "scan clean," or similar must be cross-checked against raw file/line evidence before acceptance.**

| Claim | Cross-Check Against |
|-------|---------------------|
| "Certification complete" | `question_state: "Certified"` in the actual pack file |
| "No DL-008 violations" | Raw ExplanationWrong[A-D] fields at matched CorrectChoice slots |
| "X items processed" | `grep -c '"QuestionID"'` on the target file; diff against registry |
| "Validator pass" | Run `node scripts/validate.js` and check raw error/warning counts |
| "Zero errors" | Raw error count from validator, not summary line alone |
| "Count restored to N" | `grep -c '"QuestionID"'` on the current file |

**Do not accept summary reports at face value.** Verify against the source files directly. This is the single most common source of undetected defects across prior sessions.

---

## 6. Item-Count Volatility — Hard Stop

**If reconciliation numbers change between reports (e.g., DL-012 going 128 → 112 → 138), require the count to stabilize before any remediation option is executed.**

- Run the count again. Run it a third time.
- Cross-check counting methodology between runs.
- Document the discrepancy and its resolution.
- Only proceed when the count is stable across two consecutive independent scans.

This is not a suggestion. Count instability that resolves itself without investigation is how the DL-012 scan errors happened — the first two scans were wrong, and the third was correct, but the second was nearly acted upon.

---

## 7. Live-Simulation Delivery Pool — Certified-Only + Known-Defective Exclusion

**Run-time delivery must only pull from strictly `"Certified"` items. Any confirmed-defective QIDs must be excluded from the delivery pool as a standing safety check, not a one-off ask.**

Per CAQS_v1.0.md §1.7.1:
- Only items with `question_state: "Certified"` are eligible for learner practice sessions.
- All other states (`Unprocessed`, `In Audit`, `Editorial Queue`, `Archived`) are excluded.

Before any live simulation test:
1. Confirm the delivery mechanism filters by `question_state === "Certified"`.
2. Cross-reference against the known-defective QID list (items flagged in DEFECT_LIBRARY.md, DL-012 clone archive list, uncertified Pack B rotation-artifact items).
3. Flag any defective QID still present in the delivery pool.

---

## 8. Key File Locations — Pinned Reference

| File | Location | Purpose |
|------|----------|---------|
| governance-guard.js | `.opencode/plugins/governance-guard.js` | 10-rule enforcement plugin |
| governance guard tests | `scripts/test_governance_guard.js` | 54-test matrix |
| REVISION_HISTORY.md | `knowledge/REVISION_HISTORY.md` | All certification and content change records |
| BACKUP_PROTOCOL.md | `knowledge/BACKUP_PROTOCOL.md` | Hard backup rules |
| CAQS_v1.0.md | `knowledge/CAQS_v1.0.md` | Content quality standard |
| DEFECT_LIBRARY.md | `knowledge/DEFECT_LIBRARY.md` | All DL-001 through DL-037 entries |
| CURRENT_BASELINES.md | `knowledge/CURRENT_BASELINES.md` | **Authoritative** certified pool + file hashes |
| preflight.js | `scripts/preflight.js` | T0 integrity check (QID counts, parse, certified counts, cross-check baselines) |
| smoke_test.js | `scripts/smoke_test.js` | Playwright smoke test (UI surfaces, MCQ banks, May layer) |
| pipeline (package.json) | `npm run pipeline` | validate → build-registry → dashboard (Tend for content waves) |
| DL-012 proposal | `reports/remediation/DL012_REMEDIATION_PROPOSAL.md` | Corrected remediation plan (not executed) |
| DL-008 sweep closeout | `reports/defect_sweeps/DL-008_SWEEP_CLOSEOUT.md` | 539-occurrence closeout |
| DL-008 re-contamination | `reports/defect_sweeps/DL008_RECONTAMINATION_SCAN.md` | 14-item Wave 1 defect (FIXED) |
| DL-010 scan | `reports/defect_sweeps/DL010_SCAN_REPORT.md` | Misassigned explanation scan |
| S121 Portfolio Targets | `knowledge/S121_PORTFOLIO_TARGETS.md` | Immutable difficulty, cognitive, and answer-position targets; Rule 12 governance policy |
| S122 Gold Standard Library | `reports/S122_GOLD_STANDARD_LIBRARY.md` | 100 top Part 1 items (Analyze + Evaluate + Difficulty-5 + Technology) |
| S122 False Positive Library | `reports/S122_FALSE_POSITIVE_LIBRARY.md` | 28 cognitive-label overstatement exemplars across 5 categories |
| S122 Analyze Patterns | `reports/S122_ANALYZE_PATTERNS.md` | 8 reusable Analyze pattern templates for Part 2 authoring |
| S122 Evaluate Patterns | `reports/S122_EVALUATE_PATTERNS.md` | 8 reusable Evaluate pattern templates for Part 2 authoring |
| S122 Executive Summary | `reports/S122_EXECUTIVE_SUMMARY.md` | Part 1 Excellence & Benchmarking Program overview |
| S122 Section Scorecard | `reports/S122_SECTION_SCORECARD.md` | 30-section quality scorecard across 6 dimensions |
| G02 Governance Hardening | `knowledge/G02_GOVERNANCE_HARDENING.md` | Permanent institutional controls from Quality Recovery program lessons |

---

## 9. Governance Lanes

**Effective:** Session 72. This project uses two governance lanes. The lane is determined by what a session touches — not by its duration or agent count.

### 9.1 Lane Selection

Determine the lane at session start. If the session touches ANY Full Governance trigger, the entire session operates under Full Governance Lane.

| Lane | Applies When |
|------|-------------|
| **Full Governance Lane** | Session edits any pack file, scored case file, `case_pack_*_corrected.js`, answer keys, `question_state`, certification status, learner-delivery safety logic, `CURRENT_BASELINES.md`, `DEFECT_LIBRARY.md`, `REVISION_HISTORY.md`, generated registries, or governance-critical validation/guard logic |
| **Governance Light Lane** | Session works on app.js UI/UX (without altering content integrity), May coaching UX, `index_updated.html`, `styles.css`, dashboards, reports, smoke tests, helper scripts, read-only audits, planning, analysis, or prompt design — and does NOT modify pack/case content, answer keys, or certification state |

### 9.2 Full Governance Lane Requirements

| Requirement | When |
|-------------|------|
| `npm run preflight` | **Mandatory at T0** — before any write operation |
| Backup-before-write | **Mandatory** per §3 for all pack/case file edits |
| Raw evidence verification | **Mandatory** per §5 (Dual Verification) for all self-reported claims |
| `npm run pipeline` | **Required at Tend** after content/regeneration work |
| `knowledge/REVISION_HISTORY.md` entry | **Required** for content, certification, or governance changes per §4 |
| `knowledge/DEFECT_LIBRARY.md` entry | **Required** for any newly discovered defect |
| Destructive script authorization | **Required** per §3.1 — staged authorization, no exceptions |
| Runtime governance checkpoints (Tmid) | **Required** per §13 for sessions >30 min or >3 agents |
| Drift-detection response | **Required** per §13.1 for any CRITICAL or HIGH signal |

### 9.3 Governance Light Lane Requirements

| Requirement | When |
|-------------|------|
| `npm run preflight` | **Recommended** at T0 — catches stale state before UI/script work |
| `npm run smoke` | **Mandatory at Tend** if app.js, HTML, CSS, or May coaching files were changed |
| Backup-before-write | **Recommended** for app.js; not required for non-pack files |
| REVISION_HISTORY entry | **Not required** unless a content-level defect is discovered |
| DEFECT_LIBRARY entry | **Required only** if a new content defect is discovered |
| Learner-pool protections | **Never weakened** — even in Light Lane, do not bypass delivery-pool safety checks |
| Destructive scripts | **§3.1 still applies** — no deletion scripts without authorization |

### 9.4 Session Startup Protocol

1. **Determine lane** — check task scope against §9.1 triggers.
2. **Read `knowledge/CURRENT_BASELINES.md` §2** for the authoritative certified pool snapshot.
3. **Full Governance Lane:** Run `npm run preflight`. Verify 0 divergences before any write.
4. **Governance Light Lane:** Optionally run `npm run preflight`. If any divergence is found, report it and ask the user before proceeding.
5. **Both lanes:** Do NOT rely on count from old reports. Raw pack files are the authoritative source. Do not consume stale registries.
6. **Both lanes:** Cross-check any open remediation proposals against their current state in source files.
7. **Both lanes:** Prefer `task` agents over `delegate` — `delegate` fails silently on this project's file sizes.

### 9.5 Session Closeout Protocol

| Lane | Required Closing Actions |
|------|--------------------------|
| Full Governance | REVISION_HISTORY.md entry + DEFECT_LIBRARY.md if new defects found + `npm run pipeline` if content/regeneration work occurred |
| Governance Light | `npm run smoke` if app/UI files changed; DEFECT_LIBRARY.md entry only if a content defect was discovered |

---

## 10. Skills

Three project-level skills are available in `.opencode/skills/`:

| Skill | File | Purpose |
|-------|------|---------|
| `reconciliation-audit` | `.opencode/skills/reconciliation-audit.md` | Cross-checks self-reported certification claims against raw file/line evidence |
| `pre-delivery-safety-check` | `.opencode/skills/pre-delivery-safety-check.md` | Confirms delivery pool only pulls "Certified" items; flags known-defective QIDs |
| `content-authoring` | `.opencode/skills/content-authoring.md` | Part 2 content creation: blueprint taxonomy, CAQS workflow, distractor design, cognitive calibration, formula integration, governance compliance |

---

## 11. References

### 11.1 External References

- IMA CMA Exam Content Specification Outline: official IMA blueprint (the authoritative external standard — not an internal document)
- OpenCode plugin documentation: `https://opencode.ai` (for plugin behavior clarification)

### 11.2 Approved Internal Reference Libraries

The following S122 deliverables are institutionalized as approved reference materials for all future Part 2 authoring. Part 2 authors should consult these before labeling any item Analyze or Evaluate, and should use the pattern catalogs as structural templates for new higher-order items.

| Reference | File | Purpose |
|-----------|------|---------|
| Gold Standard Library | `reports/S122_GOLD_STANDARD_LIBRARY.md` | 100 exemplar items demonstrating genuine Analyze, Evaluate, Difficulty-5, and Technology content. Reference for "what good looks like." |
| False Positive Library | `reports/S122_FALSE_POSITIVE_LIBRARY.md` | 28 concrete examples of cognitive-label overstatement. Used to train authors to recognize the 5 most common inflation patterns before assigning labels. |
| Analyze Pattern Catalog | `reports/S122_ANALYZE_PATTERNS.md` | 8 reusable structural templates for Analyze items — variance decomposition, trend diagnosis, cause-effect attribution, etc. Each pattern includes structure, distractor strategy, and exemplar QIDs. |
| Evaluate Pattern Catalog | `reports/S122_EVALUATE_PATTERNS.md` | 8 reusable structural templates for Evaluate items — trade-off analysis, constraint optimization, capital allocation, technology governance, etc. Each pattern includes structure, distractor strategy, and exemplar QIDs. |

**Authoring rule:** Before labeling any item Analyze or Evaluate, authors must verify:
1. **Definition-match check** — Stem-to-correct-choice lexical overlap < 40% (AF-A1, AF-E1)
2. **Stakeholder check (Evaluate)** — Named decision-maker with a judgment call
3. **Alternative quality (Evaluate)** — At least 2 defensible choices
4. **Decomposition check (Analyze)** — Item requires breaking down into constituent parts
5. **Difficulty floor** — DifficultyScore ≥ 3 for Analyze, ≥ 4 for Evaluate

---

## 12. Session Closeout

### 12.1 Full Governance Lane Closeout

Every Full Governance Lane session must produce at minimum a `knowledge/REVISION_HISTORY.md` entry as its closing action. Additionally:

- New defects discovered must be logged to `knowledge/DEFECT_LIBRARY.md` with the next available DL-ID and Status: "Open."
- Content changes (answer, explanation, distractor) must be logged with before/after counts.
- Certification batches must list QuestionIDs, verification results, and counts.
- Cross-session findings (e.g., "Pack B Sections A/D are certification-ready") must be logged as tracked notes in DEFECT_LIBRARY.md — not left as chat output alone.

**No "staged for next session" deferrals are permitted.** Precedent: DL-019 (concurrent-write data loss) and DL-020 (validator undercount) were discovered but sat in session reports only — the defect library had no entry until later sessions wrote them.

### 12.2 Governance Light Lane Closeout

Governance Light Lane sessions do not require REVISION_HISTORY.md or DEFECT_LIBRARY.md entries unless they discover a content-level defect or certification-relevant finding. For pure app/UI, script, or read-only work: no logging ceremony is required. If a defect is found (e.g., a DL-037 logic inversion discovered during UI work), log it to DEFECT_LIBRARY.md.

---

## 13. Runtime Governance — Full Governance Lane Only

**The detailed runtime governance procedures below apply only to Full Governance Lane sessions.** Governance Light Lane sessions do not need Tmid checkpoints, G1–G5 reconciliation, or per-agent CAPA audits.

For the complete runtime governance reference (drift-detection signals, checkpoint sequences, response paths), see `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md`. The canonical G1–G5 gate definitions and decision logic are at `reports/SESSION31_RECONCILIATION_EXECUTION.md`.

### 13.1 Drift-Detection Signals (Both Lanes)

These signals trigger intervention in either lane, but the response differs by severity. Full response paths are at `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` §D.2.

| Signal | Severity | Full Lane Response | Light Lane Response |
|--------|----------|--------------------|---------------------|
| Unexpected hash change in any governance-critical file | CRITICAL | Halt all agents; spawn governance agent; run G1–G5 | Halt; report to user; do not proceed |
| Pack parse-count change (not equal to 500/540) | CRITICAL | Halt all pack-write agents; re-parse via Function constructor | Halt; report — this should not happen in Light Lane |
| Certified denominator mismatch | HIGH | Spawn ledger-reconciliation agent; verify via direct grep | Halt; report to user |
| app.js hash mismatch | MEDIUM | Run Sync Anomaly Playbook | Report; user decides |
| Agent self-report conflict (two agents report different counts) | MEDIUM | Independent third-agent verification; require QID-list evidence | Same — independent verification

---

## 14. Authoring Priority

The project's current authoring priority, in order:

1. **Content production** — Produce original, high-quality CMA Part 1 study content (MCQs and case studies) aligned to the IMA exam blueprint.
2. **Quality protection** — Maintain exam alignment, explanation quality, accounting accuracy, and learner safety.
3. **Efficiency** — Use governance to protect the first two goals, not to create generic bureaucracy or drag on low-risk work.

Governance exists to serve content integrity and learner safety. Every governance requirement should be traceable to one of these goals. If a governance step does not demonstrably protect content quality or learner safety, it belongs in the lighter lane.

---

## 15. Workflow Helpers

Three npm scripts are available for session workflow:

| Command | What It Does | When To Use |
|---------|-------------|-------------|
| `npm run preflight` | QID counts, parse check, certified counts, cross-check against CURRENT_BASELINES.md, governance guard test suite | **Full Lane: T0 mandatory.** Light Lane: recommended. |
| `npm run smoke` | Playwright UI smoke test — verifies app loads, MCQ banks present, May coaching layer active | **Light Lane: Tend mandatory** after app/UI changes. Full Lane: optional. |
| `npm run pipeline` | validate → build-registry → dashboard (full content validation + registry rebuild + dashboard) | **Full Lane: Tend required** after content/regeneration work. |

All three scripts exit 0 on pass, non-zero on failure. They are READ-ONLY and safe to run at any time.

---

## 16. Session Scaffold (Nested Prompt Chains)

For structured, repeatable sessions (UI polish, audit-implement-verify, governance closeouts), use the 4-stage nested prompt chain defined in `knowledge/SESSION_SCAFFOLD.md`:

1. **Planner** — defines scope, lane, files, success criteria
2. **Auditor** — inspects current state, identifies safe changes, reports risks
3. **Implementer** — applies only approved changes, smallest effective edits
4. **Verifier** — runs smoke/syntax/checks, confirms no boundary violations

**Operating rule:** The chain may pass work forward, but it may not expand its own authority. No downstream agent may widen file scope or convert Light Lane to Full Lane.

The scaffold is best for Light Lane UI/May work and Full Lane content-audit sessions. It is not appropriate for novel architecture or open-ended autonomous coding.

All three scripts exit 0 on pass, non-zero on failure. They are READ-ONLY and safe to run at any time.

---

## 17. Portfolio Governance

**Effective:** Post-S122 (2026-07-31). Applies to Part 1 and Part 2 content production.

### 17.1 Operating Principle

**Cognitive level is determined by question demand, not portfolio gaps.** This principle was formalized as Rule 12 in `governance-guard.js` and is fully aligned with S121_PORTFOLIO_TARGETS.md.

Portfolio distribution targets (difficulty, cognitive level, domain coverage, LOS coverage, correct-choice position) are set before authoring. The current portfolio is measured against them. Where gaps exist, the only authorized remediation is:

- **Authoring new content** at the required level
- **Do NOT relabel** existing items to fill a distribution gap

### 17.2 Continuous Monitoring

The following distributions must be monitored at the cadences specified in S121_PORTFOLIO_TARGETS.md §6:

| Distribution | Tool | Cadence |
|--------------|------|---------|
| Difficulty (per-pack) | `scripts/s121_portfolio_dashboard.js` | Every content wave |
| Cognitive level (per-domain) | `scripts/s121_portfolio_dashboard.js` | Every content wave |
| Answer position (per-section) | `scripts/s121_portfolio_dashboard.js` | Pre-certification |
| Domain coverage | Registry cross-check | Quarterly |
| LOS coverage | Blueprint traceability matrix | Quarterly |

### 17.3 Gap Resolution Rule

When monitoring reveals a gap against S121 targets:

1. **Measure** the gap against the immutable targets at `knowledge/S121_PORTFOLIO_TARGETS.md`
2. **Identify** the specific sections and cognitive levels where coverage is below target
3. **Author** new items targeting the underweight categories
4. **Verify** the item's cognitive classification against S122 reference patterns BEFORE assigning a label
5. **Log** the gap and the authored QIDs in the next authoring wave plan

**Precedent:** Part 1 accumulated a 58.7% cognitive misclassification rate (309 of 528 labeled HO items) because the original template pipeline assigned cognitive labels by rotation position rather than by actual question demand. The recovery program (S92P–S109P) required 6+ Full Governance Lane sessions to correct — far more expensive than prevention would have been. This rule exists to prevent recurrence in Part 2.

### 17.4 S122 Institutionalization

The S122 Part 1 Excellence & Benchmarking Program deliverables are permanent institutional references. Before labeling any item Analyze or Evaluate, consult:

1. **Gold Standard Library** — "What does a genuine Analyze/Evaluate item look like?"
2. **False Positive Library** — "What are the 5 most common inflation patterns?"
3. **Analyze/Evaluate Pattern Catalogs** — "How should I structure this item?"

Full details at AGENTS.md §11.2 (Approved Internal Reference Libraries).

---

## 18. Third-Party Content Review Handoffs

**Effective:** 2026-08-22 (Session P2-032). When a human or external AI reviews repository content **without shell/repo access**, evidence must be sized to the reviewer's tooling.

**Precedent:** The 2026-08-22 Pack A review (Sessions P2-030/P2-031) — an auditor's file-attachment search tool silently indexed only a prefix of the 730KB `p2/pack_p2_a.js` (~89 of 160 items), producing repeated false-negative "item not found" results across byte-identical attachments. The dispute consumed multiple rounds and resolved only when the pack was split into fully-indexable parts. The auditor's "char-budget" arithmetic also produced a plausible-but-wrong item-count inference. These failure modes cost days of re-litigation.

### 18.1 Index-Failure Signatures — Recognize Before Arguing Evidence

| Signature | Meaning |
|-----------|---------|
| A literal-ID query (e.g., "P2-A-112") returns unrelated content | Retrieval-style (semantic) indexing — not literal string search. A literal index cannot return unrelated content. |
| No query surfaces content past a cutoff QID, across many rewordings | Prefix-truncated index window. Repeated queries against the same partial index accumulate zero additional confidence. |
| Reviewer's char-budget arithmetic contradicts their own direct samples | Per-item average anchored on an assumed (unverified) item count. |

None of these signatures are evidence about file contents. Stop the dispute and switch to chunked parts (§18.2).

### 18.2 Handoff Protocol — Mandatory for Pack Files > ~200KB

1. **Split** the pack into verbatim parts of ≤ 40KB each (~10K tokens) — small enough that any retrieval index must ingest each part fully.
2. **Emit a part→QID manifest** (QID ranges per part, part count, source SHA256).
3. **Prove no-gap/no-dup:** the concatenation of all parts must reproduce the source byte-for-byte; record the check result in the handoff (the split is then self-verifying content evidence, not a claim).
4. **Direct the reviewer to a control test:** attach one part containing an already-verified item and confirm their tool finds it; then attach the disputed item's part.

Reference implementation: `C:\Users\User\AppData\Local\Temp\opencode\split_p2a_for_verification.js` (2026-08-22, 20-part split of `p2/pack_p2_a.js`, concat check EXACT MATCH).

### 18.3 Evidence Hierarchy for Third-Party Auditors

| Tier | Evidence | Weight |
|------|----------|--------|
| 1 | Chunked parts of the actual file bytes the auditor can search themselves | Conclusive |
| 2 | Verbatim raw blocks + a chunked part containing them | Strong |
| 3 | Hand-pasted blocks alone | Weak — a style-matched paste does not establish provenance, regardless of internal consistency |
| 4 | git hashes, line numbers, shell outputs, typed manifests | Inadmissible alone — unexecutable without repo access |

### 18.4 Auditor-Side Controls (When Acting as the Reviewer Without Repo Access)

- Treat "not found in my indexed copy" as an **index limitation**, not a finding, until a chunked part is tested.
- Run a control query on known content (e.g., an already-verified fix) to confirm the index is current before trusting any negative result.
- If literal-ID queries return unrelated content, the tool is doing semantic retrieval — request chunked parts rather than issuing more searches.

### 18.5 Closeout Logging

Third-party review closeouts are logged in the governing revision history (Part 2: `knowledge/REVISION_HISTORY_P2.md`) including: reviewer, scope, verdict, open recommendations closed, and process lessons. Precedent: P2-031 (160/160 Pack A verification closeout).
