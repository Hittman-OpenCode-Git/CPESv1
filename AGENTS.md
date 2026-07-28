# AGENTS.md — CMA Part 1 Exam Simulator Standing Instructions

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Applies to:** All Computer/AI sessions in this repository

---

## 1. Governance Guard Plugin — Registered, Do Not Re-Litigate

The `governance-guard` plugin is registered at `.opencode/plugins/governance-guard.js` (217 lines) and listed in `opencode.json` under `"plugin"`. It enforces 5 rules:

| Rule | Level | Behavior |
|------|-------|----------|
| RULE 2 | **BLOCK** | ExplanationWrong[CorrectChoice] must be `""` (DL-008 enforcement, per EV8 / CAQS_v1.0.md §4.4) |
| RULE 3 | **BLOCK** | MASTER_QUESTION_REGISTRY.md is generated — never hand-edit |
| RULE 5 | **BLOCK** | Max 30 question objects per change-set without `BLOCK-AUTHORIZED` marker |
| RULE 1 | **WARN** | question_state changes must pair with knowledge/REVISION_HISTORY.md updates — flagged at session idle |
| RULE 4 | **WARN** | answer-key changes must include a "recomputed" / "independently verified" note — flagged at session idle |

**Rules 1 and 4 are warnings, not hard blocks.** Computer does not need to ask permission or re-confirm plugin registration each session. The plugin is already active. The test suite is at `scripts/test_governance_guard.js` (245 lines, 12 tests).

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
| governance-guard.js | `.opencode/plugins/governance-guard.js` | 5-rule enforcement plugin |
| governance guard tests | `scripts/test_governance_guard.js` | 12-test matrix |
| REVISION_HISTORY.md | `knowledge/REVISION_HISTORY.md` | All certification and content change records |
| BACKUP_PROTOCOL.md | `knowledge/BACKUP_PROTOCOL.md` | Hard backup rules |
| CAQS_v1.0.md | `knowledge/CAQS_v1.0.md` | Content quality standard |
| DEFECT_LIBRARY.md | `knowledge/DEFECT_LIBRARY.md` | All DL-001 through DL-023 entries |
| SESSION_STATUS | `reports/session_status/SESSION_STATUS_2026-07-24.md` | **Current** end-of-cycle handoff log (2026-07-23 version is stale — 1,080 vs. 2,031 certified) |
| DL-012 proposal | `reports/remediation/DL012_REMEDIATION_PROPOSAL.md` | Corrected remediation plan (not executed) |
| DL-012 finding | `reports/defect_sweeps/DL012_SECTIONE_CLONE_FINDING.md` | Original finding (contains counting errors) |
| DL-008 re-contamination | `reports/defect_sweeps/DL008_RECONTAMINATION_SCAN.md` | 14-item Wave 1 defect (FIXED) |
| DL-008 sweep closeout | `reports/defect_sweeps/DL-008_SWEEP_CLOSEOUT.md` | 539-occurrence closeout |
| DL-010 scan | `reports/defect_sweeps/DL010_SCAN_REPORT.md` | Misassigned explanation scan |

---

## 9. Session Startup Protocol

Every new session must:

1. Read `reports/session_status/SESSION_STATUS_2026-07-24.md` for open risks and blocked files (**NOTE S221: this file is marked SUPERSEDED — certified count is 267 behind raw-file grep. Use CURRENT_BASELINES.md §2 for authoritative certified pool data.**)
2. Read `knowledge/REVISION_HISTORY.md` for most recent certification state.
3. **Do NOT rely on count from old reports** — every session must verify `question_state: "Certified"` count via direct raw-file grep:
   ```
   Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"' | Measure-Object | Select-Object -ExpandProperty Count
   ```
4. **Cross-registry reconciliation (T0):** Compare the raw-file grep Certified count against:
   - `knowledge/CURRENT_BASELINES.md` §2 (Certified Pool)
   - `knowledge/MASTER_QUESTION_REGISTRY.md` (Certified column)
   - Any divergence >0 → halt and reconcile from raw source files. Raw pack files are the authoritative source.
5. **Governance-critical hash verification (T0):** Verify SHA-256 hashes for all files in `knowledge/CURRENT_BASELINES.md` §5 against baseline. Any unexpected change → halt all certification operations.
6. **Registry staleness check (T0):** Flag any derived registry >24 hours behind raw-file Certified count as STALE. Do not consume stale registries.
7. Cross-check any open remediation proposals against their current state in source files.
8. Do not skip ahead past documented stop conditions.
9. **Prefer `task` agents over `delegate` for all work** — `delegate` has been observed to fail silently (completes in <1s with empty output) on this project's file sizes.

---

## 10. Skills

Two project-level skills are available in `.opencode/skills/`:

| Skill | File | Purpose |
|-------|------|---------|
| `reconciliation-audit` | `.opencode/skills/reconciliation-audit.md` | Cross-checks self-reported certification claims against raw file/line evidence |
| `pre-delivery-safety-check` | `.opencode/skills/pre-delivery-safety-check.md` | Confirms delivery pool only pulls "Certified" items; flags known-defective QIDs |

---

## 11. External References

- IMA CMA Exam Content Specification Outline: official IMA blueprint (the authoritative external standard — not an internal document)
- OpenCode plugin documentation: `https://opencode.ai` (for plugin behavior clarification)

---

## 12. No Staged Findings — Log Before Session Close

**Any defect finding, audit result, or governance note that was discovered during a session must be logged to `DEFECT_LIBRARY.md` and/or `REVISION_HISTORY.md` before the discovering session closes.** No "staged for next session" deferrals are permitted.

This rule exists because:
- DL-019 (concurrent-write data loss) was discovered but the finding was stored in a session report only — the defect library had no entry until a later session wrote it
- DL-020 (validator brace-matcher undercount) likewise sat in a session report without a defect library entry
- The OPEN_ITEMS.md file was referenced but never created — the REVISION_HISTORY.md entry was self-contained by design but the intent to have a separate tracking file was lost

**Implementation:** Every session must produce at minimum a REVISION_HISTORY.md entry as its closing action. If a new defect was discovered (even if not remediated), it must be logged to DEFECT_LIBRARY.md with the next available DL-ID and Status: "Open." If a remediation action changed question content, it must be logged with before/after counts. If a new finding requires tracking across sessions (e.g., "Pack B Sections A/D are certification-ready once metadata is fixed"), it must be logged as a tracked note in DEFECT_LIBRARY.md — not left as chat output or a session-internal report alone.

---

## 13. Runtime Governance — Multi-Agent and Long-Lived Sessions

**Longer-lived sessions (>30 minutes or >3 agents) need runtime governance:** repeated checks along the execution path (not just at start/end) to ensure agents don't drift from policy.

### 13.1 T0 → Tmid → Tend Checkpoint Sequence

The standard pattern for any session exceeding 30 minutes or 3 agents. See `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` §C.2 for the full checklist.

| Checkpoint | Timing | Minimum Checks |
|-----------|--------|----------------|
| **T0** | Session start | All 13 runtime hashes vs `knowledge/CURRENT_BASELINES.md` |
| **Tmid** | ~30 min mark or after 2+ agents complete | Pack D CAPA (hash, parse-count, FD-045/FD-046, AD-075) + app.js hash |
| **Tend** | Session close, before REVISION_HISTORY.md write | All 13 runtime hashes vs T0; G1–G5 reconciliation if any drift detected |

If any checkpoint fails, halt all write agents and execute G1–G5 reconciliation before proceeding.

### 13.2 FD-045 in Long Sessions

- Any agent proposing Pack D changes must first call a "Baseline & CAPA Auditor" agent to run full CAPA checks (hash, parse-count, FD-045/FD-046 presence, AD-075 Certified) at T0 and Tend.
- **No-op if CLOSED rule:** If FD-045 is CLOSED (hash `49C465E3...`, parse-count >= 500) and all checks PASS, the Pack D agent must skip repairs and return immediately.
- If any CAPA check fails at any checkpoint, halt and escalate — do not autonomously repair.

### 13.3 app.js in Long Sessions

- For any long-running modification, spawn three separate agents (scoring, analytics, readiness) — each must confirm its layer matches the documented baseline before and after changes.
- A governance agent must run the pre-write / post-write gate checklist at Tmid and Tend.
- The Sync Anomaly Playbook (Session 52) is the standard response for any app.js hash mismatch: attribute → baseline-diff → classify → adopt-or-quarantine.

### 13.4 Reconciliation in Long Sessions

- Long-running reconciliation sessions must execute the Session 31 G1–G5 runbook at least twice (T0 and Tend), and partial gates (G1–G2) at Tmid.
- Run gates in parallel agents where possible: G1/G2 in one agent, G3/G4/G5 in another.
- Do not relax the continue/stop/escalate conditions from Session 31 — only adapt pack lists or document lists as needed.

### 13.5 Drift-Detection Signals

The following signals trigger immediate governance intervention. Full response paths are documented at `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` §D.2.

| Signal | Severity | Immediate Action |
|--------|----------|-----------------|
| Unexpected hash change in any baseline file | CRITICAL | Halt all agents; spawn governance agent; run G1–G5 |
| Pack parse-count change (not equal to 500) | CRITICAL | Halt all pack-write agents; re-parse via Function constructor |
| Certified denominator mismatch | HIGH | Spawn ledger-reconciliation agent; verify via direct grep |
| FD-045 or other critical QID missing | HIGH | Escalate to TIER 1 structural repair |
| app.js hash mismatch | HIGH | Run Sync Anomaly Playbook |
| Agent self-report conflict (two agents report different counts) | MEDIUM | Independent third-agent verification; require QID-list evidence |

### 13.6 Key Reference Documents for Runtime Governance

| Document | Location | Purpose |
|----------|----------|---------|
| Session 53 Execution Report | `reports/SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md` | Full runtime governance procedures, drift signals, response paths, checklists |
| Session 31 Reconciliation Runbook | `reports/SESSION31_RECONCILIATION_EXECUTION.md` | Canonical G1–G5 gate definitions and decision logic |
| Governance & Risk Register | `reports/GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md` | §6 Long-Run CAPA Verification, §8 Reconciliation Schedule |
| Current Baselines | `knowledge/CURRENT_BASELINES.md` | All 13 runtime-critical file hashes |
| FD-045 Cross-Session Reference | `reports/FD045_CROSS_SESSION_REFERENCE.md` | FD-045 gate wording and CAPA control definitions |
| Session 52 Governance Follow-Up | `reports/SESSION52_GOVERNANCE_FOLLOWUP_EXECUTION.md` | FD-045/app.js/runbook prompt-reuse rules, Sync Anomaly Playbook |
