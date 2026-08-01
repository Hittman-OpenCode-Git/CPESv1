# Repository Rules

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md §11, ROOT_FOLDER_POLICY.md
**Generated:** 2026-07-24

---

## 1. Purpose

This document codifies the rules that govern the physical organization, change management, and hygiene of the CMA Part 1 Exam Simulator repository. It is the operational companion to `docs/ROOT_FOLDER_POLICY.md` (what goes where) and `AGENTS.md` (how sessions operate).

---

## 2. Root-Folder Rule

**The repository root contains only runtime application files, content files, and essential control files. Everything else lives in a subfolder organized by function.**

Permitted root items:
- Runtime: `app.js`, `index_updated.html`, `styles.css`
- Content: `pack_a_corrected.js` through `pack_e_corrected.js`, `content/cases/legacy/scored_cases.js` through `content/cases/legacy/scored_cases5.js`
- Control: `AGENTS.md`, `opencode.json`, `package.json`, `package-lock.json`, `VERSION`

Prohibited root items:
- Backup files (`*.bak`, `*.bakN`, `*.bak-*`)
- Ad-hoc scripts (`_*.js`, `check_*.js`, `parse_*.js`, `validate_*.js`)
- Temp files (`temp_*.txt`)
- Audit reports (`*audit_report*.md`, `*REVIEW_FINDINGS.md`)
- CSV exports, loose JSON manifests

Full classification rules: see `docs/ROOT_FOLDER_POLICY.md`.

---

## 3. Folder Standards

### 3.1 Mandatory Subfolders

| Directory | Purpose | Examples |
|-----------|---------|----------|
| `backups/` | Timestamped backup copies | `pack_a_corrected.js.bak-20260724...` |
| `docs/` | Human-facing documentation | `PROJECT_OVERVIEW.md`, `ITEM_BANK_GOLD_SCHEMA.md` |
| `governance/` | Governance, risk, rules | `REPOSITORY_RULES.md`, `AGENTS_AND_SESSION_TYPES.md` |
| `knowledge/` | AI governance and audit trail | `CAQS_v1.0.md`, `DEFECT_LIBRARY.md`, `REVISION_HISTORY.md` |
| `ai/` | AI collaboration and workflows | `COLLABORATION_MATRIX.md`, `WORKFLOWS.md` |
| `reports/` | Session reports, audits, reconciliation | `SESSION55_STANDARDIZATION_AND_DIFFICULTY_AUDIT.md` |
| `scripts/` | Validation and utility scripts | `validate.js`, `build_master_registry.js` |
| `foundation/` | Authoritative reference material | `FORMULA_MASTER.md`, `EXAM_BLUEPRINT.md` |
| `review/` | Review protocols and traps | `ACCOUNTING_DECISION_TREES.md`, `COMMON_EXAM_TRAPS.md` |
| `assets/` | Static application assets | (reserved) |
| `.opencode/` | OpenCode tooling | plugins, skills, configuration |

### 3.2 Folder Creation Rule

New folders at root level require:
1. Documented purpose (what goes here and why).
2. No overlap with an existing folder's purpose.
3. A README.md or index document in the folder.
4. An AGENTS.md update if the new folder affects session behavior.

---

## 4. Change Philosophy

### 4.1 Conservative and Reversible

Every change to a pack file or application file must be:
- **Conservative** — change only what needs changing. Never refactor or reformat as a side effect.
- **Reversible** — a backup must exist from which the pre-change state can be restored.
- **Auditable** — the change must be logged in REVISION_HISTORY.md with before/after details.
- **Verifiable** — an independent agent or tool must confirm the change achieved its intended effect.

### 4.2 Batch Limits

Per governance-guard Rule 5: maximum 30 question objects per change-set without `BLOCK-AUTHORIZED` marker. This applies to:
- Content changes (stems, choices, explanations)
- Metadata changes (question_state, Difficulty, CognitiveLevel)
- Structural fixes (DL-008 clears, DL-013 rewrites, DL-026 slot fills)

### 4.3 Backup Protocol

Per `knowledge/BACKUP_PROTOCOL.md`:
Before any `edit` or `write` against any pack file:
1. Copy the target file to a timestamped backup in `backups/`.
2. Confirm the backup exists and has non-zero size.
3. Proceed with the edit only after backup is confirmed.

---

## 5. File Classification and Naming

### 5.1 Naming Conventions

| Category | Convention | Example |
|----------|-----------|---------|
| Documentation | UPPER_SNAKE_CASE.md | `ROOT_FOLDER_POLICY.md` |
| Session reports | SESSION{N}_{DESCRIPTION}.md | `SESSION55_STANDARDIZATION_AND_DIFFICULTY_AUDIT.md` |
| Defect reports | DL{N}_{DESCRIPTION}.md | `DL008_FULL_POOL_SWEEP_2026-07-23.md` |
| Backup files | `{original}.bak-YYYYMMDDHHMMSS` | `pack_a_corrected.js.bak-20260724120000` |
| Knowledge docs | UPPER_SNAKE_CASE.md | `CURRENT_BASELINES.md` |

### 5.2 File-Creation Gate

Before creating any new file:
1. Verify the file does not already exist elsewhere under a different name.
2. Verify the file's purpose is not already served by an existing file.
3. Place the file in the correct subfolder — never root unless it is runtime or control.
4. Log the creation in REVISION_HISTORY.md if it is a governance or knowledge document.

---

## 6. Reorganization Rules

### 6.1 Classification Required

Before moving or deleting any file, classify it using the decision tree in `docs/ROOT_FOLDER_POLICY.md` §5.

### 6.2 Reference Updates

When moving a file that is referenced by other files:
1. Identify all references (grep for the filename).
2. Update each reference to the new path.
3. If references cannot be safely updated, leave the file in place and document the blocker.

### 6.3 Verification After Move

- Application loads without errors (`node --check app.js`).
- Validation scripts pass.
- No broken links in documentation.
- All moved files accounted for.

---

## 7. Deletion Rules

### 7.1 No Immediate Deletion

Files identified as deletion candidates must follow a staged process (see `docs/ROOT_FOLDER_POLICY.md` §8):
1. Identify
2. Verify (not referenced, superseded)
3. Propose (in session report)
4. Authorize (dedicated deletion session)
5. Execute and log

### 7.2 Protected Files (Never Delete)

- Any runtime application file
- Any pack or case-study file
- Any canonical knowledge document (constitution, CAQS, taxonomy, defect library, revision history, baselines)
- Any file referenced by AGENTS.md or .opencode/ configuration
- Any `.opencode/` internal file

---

## 8. Hygiene Checks

### 8.1 Pre-Session Check

Before any implementation session:
1. Verify no backup files in root.
2. Verify no temp files in root.
3. Verify certified count matches CURRENT_BASELINES.md.

### 8.2 Post-Session Check

After any session that writes files:
1. Verify no new root-level files were created by accident.
2. Verify backups exist in `backups/`.
3. Verify REVISION_HISTORY.md was updated.
4. Verify runtime-file hashes match baseline (or document the change).

### 8.3 Hygiene Commands

```powershell
# Check for prohibited root files
Get-ChildItem -Path . -File | Where-Object { $_.Name -match '\.bak' -or $_.Name -match '^temp_' -or $_.Name -match '^_' }

# Verify certified count
Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"' | Measure-Object | Select-Object -ExpandProperty Count

# Verify app.js syntax
node --check app.js
```

---

## 9. References

- Root folder policy: `docs/ROOT_FOLDER_POLICY.md`
- Constitution: `knowledge/00_PROJECT_CONSTITUTION.md` §11
- Backup protocol: `knowledge/BACKUP_PROTOCOL.md`
- AGENTS.md: Standing session instructions
- Governance register: `reports/GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md`
