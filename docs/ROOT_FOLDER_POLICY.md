# Root Folder Policy

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md §11
**Generated:** 2026-07-24

---

## 1. Purpose

This document defines what files and directories are permitted in the repository root and what must reside in subfolders. It provides the classification rules, enforcement mechanism, and procedure for reorganizing misclassified items.

---

## 2. Guiding Principle

**The repository root contains only runtime application files and essential control files. Everything else lives in a subfolder organized by function.**

This principle exists to:
- Separate runtime from non-runtime materials
- Make the repository navigable at a glance
- Prevent accidental modification of non-runtime files during development
- Ensure releases contain only application files

---

## 3. Permitted Root-Level Items

### 3.1 Runtime Application Files

| File | Purpose |
|------|---------|
| `app.js` | Core application: exam engine, scoring, session management, review, analytics |
| `index_updated.html` | Application shell: navigation, view containers, pack loading |
| `styles.css` | All visual styling |
| `may-core.js` | May AI reviewer/tutor orchestrator: conversation, hints, recommendations, exam-mode gate |
| `may-learner-state.js` | May learner state: cross-session tracking, topic performance, progress, recommendation log |

### 3.2 Content Files (Item Bank)

| File | Purpose |
|------|---------|
| `pack_a_corrected.js` | MCQ Pack A — 500 items |
| `pack_b_corrected.js` | MCQ Pack B — 500 items |
| `pack_c_corrected.js` | MCQ Pack C — 500 items |
| `pack_d_corrected.js` | MCQ Pack D — 500 items |
| `pack_e_corrected.js` | MCQ Pack E — 500 items |
| `scored_cases.js` | Case Pack 1 — 15 cases |
| `scored_cases2.js` | Case Pack 2 — 15 cases |
| `scored_cases3.js` | Case Pack 3 — 15 cases |
| `scored_cases4.js` | Case Pack 4 — 15 cases |
| `scored_cases5.js` | Case Pack 5 — 15 cases |

### 3.3 Essential Control Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Standing instructions for all AI/computer sessions |
| `opencode.json` | OpenCode tooling configuration |
| `package.json` | npm package definition |
| `package-lock.json` | npm dependency lock |
| `VERSION` | Repository version identifier |

### 3.4 Permitted Root Directories

| Directory | Purpose |
|-----------|---------|
| `.commandcode/` | OpenCode IDE auto-generated configuration (permissions, settings) |
| `.opencode/` | OpenCode tooling: plugins, skills, configuration |
| `assets/` | Static assets (reserved) |
| `backups/` | Timestamped backup copies of all application and content files |
| `docs/` | Documentation: project overview, schema, standards, policies |
| `governance/` | Governance: risk register, repository rules, session types |
| `knowledge/` | AI governance: constitution, CAQS, defect library, taxonomy, revision history, baselines |
| `ai/` | AI collaboration matrix, persona definitions, workflows |
| `reports/` | Session reports, audit reports, defect sweeps, reconciliation |
| `scripts/` | Validation, enrichment, utility scripts |
| `foundation/` | Formula master, exam blueprint |
| `review/` | Decision trees, exam traps, audit protocols |
| `node_modules/` | npm dependencies (gitignored) |

---

## 4. Prohibited Root-Level Items

Per PROJECT_CONSTITUTION.md §11.4, the following shall never reside in the repository root:

### 4.1 Backup Files

| Pattern | Destination |
|---------|-------------|
| `*.bak` | `backups/` |
| `*.bakN` (N = 1–9) | `backups/` |
| Timestamped backups (`*.bak-YYYYMMDD*`) | `backups/` |

**Current violations (2026-07-24 final sweep):**
- **None.** Root is clean. All prior violations resolved.

### 4.2 Ad-Hoc Scripts

| Pattern | Destination |
|---------|-------------|
| `_*.js` | `scripts/` |
| `check_*.js` | `scripts/` |
| `enrich_*.js` | `scripts/` |
| `inspect_*.js` | `scripts/` |
| `parse_*.js` | `scripts/` |
| `validate_*.js` / `validate_*.py` | `scripts/` |

### 4.3 Temp and Generated Files

| Pattern | Destination |
|---------|-------------|
| `temp_*.txt` | `reports/` or delete |
| `*.csv` (non-tracked generated reports) | `reports/` |
| Audit reports in root | `reports/` |
| Change reports in root | `reports/` |

---

## 5. Classification Methodology

Before moving or deleting any file, classify it using this decision tree:

```
Is it a runtime application file?
  YES → Keep in root
  NO  → Is it an essential control file (AGENTS.md, opencode.json, package.json, etc.)?
          YES → Keep in root
          NO  → Is it a backup file?
                  YES → Move to backups/
                  NO  → Is it a documentation or governance file?
                          YES → Move to docs/ or governance/ or knowledge/
                          NO  → Is it a report?
                                  YES → Move to reports/
                                  NO  → Is it a development utility or script?
                                          YES → Move to scripts/ or ai/
                                          NO  → Flag for manual classification
```

---

## 6. Differentiation: Observed Facts vs. Inferred Standards vs. Recommended Actions

When documenting root-folder policy, clearly distinguish:

| Category | Example |
|----------|---------|
| **Observed fact** | "`app.js.bak-20260724132636` currently exists in root (146,610 bytes)" |
| **Inferred standard** | "Per PROJECT_CONSTITUTION.md §11.4, backup files must not reside in root" |
| **Recommended action** | "Move `app.js.bak-20260724132636` to `backups/`" |

Never state a recommendation as if it is already a fact. Never claim a file has been moved before the move is executed.

---

## 7. Reorganization Procedure

### 7.1 Pre-Move Checklist

For each file to be moved:
- [ ] Verify the file is not referenced by any runtime code (scripts, app.js, html).
- [ ] Verify the file is not git-tracked in a way that would break CI/CD.
- [ ] Verify the destination directory exists.
- [ ] Classify the risk as Low / Medium / High.
- [ ] Log the move plan in the session's working document.

### 7.2 During Move

1. Copy file to destination (never cut — preserve original until verified).
2. Verify copy exists and has same size.
3. Update any internal references (documentation, scripts) that point to the old path.
4. If references cannot be updated, leave the file in place and document the blocker.

### 7.3 Post-Move Verification

- [ ] Application loads without errors.
- [ ] Validation scripts pass.
- [ ] No broken references in other documentation files.
- [ ] Log the move in REVISION_HISTORY.md with: old path, new path, rationale, risk classification.

---

## 8. Deletion Policy

### 8.1 No Immediate Deletion

Files classified as "deletion candidate" must not be deleted immediately. The process:

1. **Identify** — Catalog the file with path, size, last modified date, reason for deletion.
2. **Verify** — Confirm the file is not referenced by any current script, runtime config, or documentation.
3. **Propose** — Document the deletion candidate in a report or session output.
4. **Authorize** — Only in a dedicated, explicitly authorized deletion session.
5. **Execute** — Delete and log in REVISION_HISTORY.md.

### 8.2 Deletion Candidate Criteria

A file may be proposed for deletion if:
- It is clearly unused (no references found in any other file).
- It is superseded by a newer version (and the newer version is confirmed current).
- It is a temporary/scratch file with no archival value.
- It was generated by a tool and can be regenerated on demand.

### 8.3 Files That Must Never Be Deleted

- Any runtime application file
- Any pack or case-study file
- Any canonical knowledge document (constitution, CAQS, taxonomy, defect library, revision history)
- Any baseline or registry file
- Any file referenced by AGENTS.md or .opencode/ configuration

---

## 9. Enforcement

### 9.1 Pre-Commit Validation

Before any release or commit, automated validation shall verify:
- No backup files in root (`*.bak`, `*.bakN`)
- No ad-hoc scripts in root (`_*.js`, `check_*.js`, etc.)
- No temp files in root (`temp_*.txt`)
- No audit reports in root (`*audit_report*.md`, `*REVIEW_FINDINGS*.md`)

### 9.2 Governance Session Verification

After any governance or reorganization session:
- Run `node --check app.js` — must pass.
- Verify pack file parse counts (500 each).
- Verify certified count is stable.
- Verify no runtime-file hash drift (against CURRENT_BASELINES.md).

---

## 10. References

- Constitution: `knowledge/00_PROJECT_CONSTITUTION.md` §11
- Backup Protocol: `knowledge/BACKUP_PROTOCOL.md`
- Current Baselines: `knowledge/CURRENT_BASELINES.md`
- Revision History: `knowledge/REVISION_HISTORY.md`
