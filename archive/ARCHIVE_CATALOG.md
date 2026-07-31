# Archive Catalog — CMA Part 1 Exam Simulator

**Created:** 2026-07-31 (S123 — Repository Archival & Information Architecture Audit)
**Purpose:** Searchable master catalog of all archived artifacts
**Principle:** Nothing deleted. Everything cataloged.

---

## How to Use This Catalog

For each archive entry, the catalog provides:
- **Contents:** What's inside
- **Reason Archived:** Why it was moved from active directories
- **Date Archived:** When it was archived
- **Original Location:** Where it lived before archival
- **Replacement Source:** Where to find the equivalent live knowledge now

---

## 1. Recovery Program

### RECOVERY_PROGRAM_S93P-S109P.zip
- **Contents:** 43 files — 30 defect sweep reports + 13 remediation plans
  - `defect_sweeps/`: DL-008, DL-010, DL-012, DL-013 sweep reports, clone scans, structural audits, Section E defect analysis, Phase 0B audits
  - `remediation/`: DL-008, DL-012, DL-013 batch execution reports, backfill rollbacks, Section E replacement items
- **Reason Archived:** Recovery program completed (S93P-S109P). Knowledge captured in DEFECT_LIBRARY.md, G01, G02, and S122.
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/defect_sweeps/`, `reports/remediation/`
- **Replacement Source:** `knowledge/DEFECT_LIBRARY.md` (all defects cataloged), `knowledge/G02_GOVERNANCE_HARDENING.md` (institutional controls)
- **Status:** Historical Reference

---

## 2. Session Reports

### sessions_52_55.zip
- **Contents:** 20 files across 4 session directories (session52, session53, session54, session55)
- **Reason Archived:** Early execution history, no living governance value
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session52/` through `reports/session55/`
- **Replacement Source:** N/A — execution history
- **Status:** Historical Reference

### sessions_254_270.zip
- **Contents:** 34 files across 17 session directories (session254 through session270)
- **Reason Archived:** Historical governance session logs, no living value
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session254/` through `reports/session270/`
- **Replacement Source:** N/A — execution history
- **Status:** Historical Reference

### sessions_69_71.zip
- **Contents:** 10 files across 2 session directories (session_69, session_71)
- **Reason Archived:** Historical session artifacts
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session_69/`, `reports/session_71/`
- **Replacement Source:** N/A — execution history
- **Status:** Historical Reference

### sessions_351_377.zip
- **Contents:** 75 files across 20 session directories (session351 through session377, plus session367a)
- **Reason Archived:** Content operations history, sustainability audits, automation assessments — completed
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session351/` through `reports/session377/`, `reports/session367a/`
- **Replacement Source:** N/A — execution history
- **Status:** Historical Reference

### sessions_806_830.zip
- **Contents:** 41 files across 19 session directories (session806, session813-session830)
- **Reason Archived:** Framework v2 deployment history, post-governance-hardening session logs
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session806/` through `reports/session830/`
- **Replacement Source:** N/A — execution history
- **Status:** Historical Reference

### sessions_853_869.zip
- **Contents:** 29 files across 11 session directories (session853 through session869)
- **Reason Archived:** Recent wave certification history — completed
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session853/` through `reports/session869/`
- **Replacement Source:** N/A — execution history
- **Status:** Historical Reference

### sessions_misc.zip
- **Contents:** 8 files — `sessions/`, `session_packages/`, `S809.2/`, `S810.1/`
- **Reason Archived:** Miscellaneous session artifacts
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/sessions/`, `reports/session_packages/`, `reports/S809.2/`, `reports/S810.1/`
- **Replacement Source:** N/A
- **Status:** Historical Reference

---

## 3. Systematic Testing

### SYSTEMATIC_TESTING_ARCHIVE.zip
- **Contents:** 236 files across `systematic_testing/` directory including SESSION118_EXPORTS, SESSION116_EXPORTS, and root-level systematic test reports (DL-031/032 inventories, cognitive assignments, difficulty baselines, census results, alignment decisions, Pack E restoration)
- **Reason Archived:** Systematic testing programs completed. Results absorbed into CURRENT_BASELINES.md, DEFECT_LIBRARY.md, and portfolio dashboards.
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/systematic_testing/`
- **Replacement Source:** `knowledge/CURRENT_BASELINES.md`, `knowledge/DEFECT_LIBRARY.md`, `knowledge/S121_PORTFOLIO_TARGETS.md`
- **Status:** Historical Reference

---

## 4. Session Status

### SESSION_STATUS_ARCHIVE.zip
- **Contents:** 199 files across `session_status/` directory including cognitive level assignments (V1-VFinal), MCQ metadata census, S722A inventory, analytics packages, and S809_1 subdirectory
- **Reason Archived:** Session status tracking completed. Operational status now maintained in CURRENT_BASELINES.md.
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/session_status/`
- **Replacement Source:** `knowledge/CURRENT_BASELINES.md` (active baselines), `scripts/preflight.js` (T0 integrity)
- **Status:** Historical Reference

---

## 5. Sustainability

### SUSTAINABILITY_ARCHIVE.zip
- **Contents:** 16 files — sustainability audits, automation gap reports, maturity velocity, expansion economics, learner safety reports, platform sustainability, DL-021 status, pool integrity
- **Reason Archived:** Sustainability audit cycle completed. Governance controls institutionalized in G02.
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/sustainability/`
- **Replacement Source:** `knowledge/G02_GOVERNANCE_HARDENING.md`
- **Status:** Historical Reference

---

## 6. Audit History

### AUDIT_HISTORY_ARCHIVE.zip
- **Contents:** 43 files:
  - `audits/` (13): Audit reports
  - `certification/` (11): Certification artifacts
  - `reconciliation/` (19): Reconciliation records
- **Reason Archived:** Completed audit and certification cycles
- **Date Archived:** 2026-07-31
- **Original Location:** `reports/audit/`, `reports/certification/`, `reports/reconciliation/`
- **Replacement Source:** `knowledge/REVISION_HISTORY.md`, `knowledge/DEFECT_LIBRARY.md`
- **Status:** Historical Reference

---

## 7. Knowledge Backups

### KNOWLEDGE_BACKUPS_ARCHIVE.zip
- **Contents:** 47 timestamped backup files:
  - 23 × `REVISION_HISTORY.md.bak-*` (various session timestamps)
  - 20 × `DEFECT_LIBRARY.md.bak-*` (various session timestamps)
  - 4 × `REVISION_HISTORY.md.bak-s*` (S96-S104 session checkpoints)
- **Reason Archived:** Redundant backup copies cluttering `/knowledge/`. Active copies are `REVISION_HISTORY.md` and `DEFECT_LIBRARY.md`.
- **Date Archived:** 2026-07-31
- **Original Location:** `knowledge/*.bak-*`
- **Replacement Source:** `knowledge/REVISION_HISTORY.md`, `knowledge/DEFECT_LIBRARY.md` (active copies)
- **Status:** Historical Reference

---

## 8. Scripts History

### SCRIPTS_HISTORY_ARCHIVE.zip
- **Contents:**
  - `test_pack_copies/`: `pack_a_corrected.test.js` (2,307 KB) + `pack_a_corrected_test2.js` (2,307 KB) — duplicate test fixtures
  - `temp_scripts/`: 17 temp/historical scripts
- **Reason Archived:** Test pack duplicates were redundant copies of Pack A source (4.5 MB waste). Temp scripts were scratch artifacts.
- **Date Archived:** 2026-07-31
- **Original Location:** `scripts/pack_a_corrected.test.js`, `scripts/pack_a_corrected_test2.js`, `scripts/temp/`
- **Replacement Source:** `pack_a_corrected.js` (source of truth for test data)
- **Status:** Historical Reference

### Pre-Existing S950 Staged Scripts
- **Contents:** 119 historical scripts in `archive/scripts/`
  - DL-008, DL-012, DL-013, DL-018 era scan/remediation scripts
  - Phase 0B investigation/reconciliation scripts
  - File recovery and reconstruction scripts
  - Debug/parse investigation scripts
  - Migration wave scripts
  - Metadata enrichment scripts
  - S90 era classification/audit scripts
  - Various `_` prefixed scratch scripts
- **Reason Archived:** Staged during S950. All completed eras — scripts are not part of active pipeline.
- **Date Archived:** 2026-07-25 (S950), cataloged 2026-07-31
- **Original Location:** Various `scripts/` root-level locations
- **Replacement Source:** Active validators in `scripts/validators/`, pipeline scripts in `scripts/`
- **Status:** Historical Reference
- **Index:** `archive/ARCHIVE_INDEX_S950.csv` (171-entry catalog)

---

## 9. Root File Backups

### Pre-Existing S950 Staged
- **Contents:** 48 timestamped snapshots of root application files in `archive/root_baks/`
  - `app.js` (4 backups, S93-S96)
  - `index_updated.html` (9 backups, pre-S93 through S104)
  - `may-core.js` (11 backups, pre-S93 through S104)
  - `may-learner-state.js` (10 backups, S93 through S104)
  - `styles.css` (11 backups, pre-S93 through S104)
  - `pack_c_corrected.js` (2 backups, S89C)
  - `file_0_binary` (1 artifact, 12 bytes)
- **Reason Archived:** Staged during S950. Root-file checkpoint history preserved.
- **Date Archived:** 2026-07-25 (S950), cataloged 2026-07-31
- **Original Location:** Root directory
- **Replacement Source:** Current root files
- **Status:** Historical Reference

---

## 10. Staging Artifacts

### STAGING_DIR_20260728/
- **Contents:** 6 files (1.20 MB)
  - `analyze_candidates_v1.json` — Analyze candidate classification data
  - `evaluate_candidates_v1.json` — Evaluate candidate classification data
  - `COHORT_C_STAGING_PAYLOAD.json` — Cohort C staging payload
  - `SESSION867_LOCAL_CALIBRATION.json` — Session 867 calibration data
  - `ASYNC_MERGE_MANIFEST.md` — Async merge documentation
  - `STAGING_GUARD_PASS_LOG.md` — Staging guard pass log
- **Reason Archived:** Staged during S867 content calibration workflow. Not yet re-ingested.
- **Date Archived:** 2026-07-28
- **Original Location:** Staged directly to `archive/STAGING_DIR_20260728/`
- **Replacement Source:** TBD upon re-ingestion
- **Status:** Staged — pending re-ingestion

---

## 11. Empty Archive Directories (Reserved for Future)

| Directory | Purpose |
|-----------|---------|
| `governance-history/` | Future: Superseded governance documents, planning artifacts |
| `may-history/` | Future: May coaching evolution artifacts, calibration runs |
| `part2-history/` | Future: Part 2 historical governance and authoring artifacts |

---

## Quick Lookup — By Original Location

| Original Location | Archive | Type |
|-------------------|---------|------|
| `reports/defect_sweeps/` | `recovery-program/RECOVERY_PROGRAM_S93P-S109P.zip` | .zip |
| `reports/remediation/` | `recovery-program/RECOVERY_PROGRAM_S93P-S109P.zip` | .zip |
| `reports/session52-55/` | `session-reports/sessions_52_55.zip` | .zip |
| `reports/session254-270/` | `session-reports/sessions_254_270.zip` | .zip |
| `reports/session351-377/` | `session-reports/sessions_351_377.zip` | .zip |
| `reports/session806-830/` | `session-reports/sessions_806_830.zip` | .zip |
| `reports/session853-869/` | `session-reports/sessions_853_869.zip` | .zip |
| `reports/systematic_testing/` | `systematic-testing/SYSTEMATIC_TESTING_ARCHIVE.zip` | .zip |
| `reports/session_status/` | `session-status/SESSION_STATUS_ARCHIVE.zip` | .zip |
| `reports/sustainability/` | `sustainability/SUSTAINABILITY_ARCHIVE.zip` | .zip |
| `reports/audit/` | `audit-history/AUDIT_HISTORY_ARCHIVE.zip` | .zip |
| `reports/certification/` | `audit-history/AUDIT_HISTORY_ARCHIVE.zip` | .zip |
| `reports/reconciliation/` | `audit-history/AUDIT_HISTORY_ARCHIVE.zip` | .zip |
| `knowledge/*.bak-*` | `backups/KNOWLEDGE_BACKUPS_ARCHIVE.zip` | .zip |
| `scripts/temp/` | `scripts-history/SCRIPTS_HISTORY_ARCHIVE.zip` | .zip |
| `scripts/pack_a_corrected.test.js` | `scripts-history/SCRIPTS_HISTORY_ARCHIVE.zip` | .zip |
| Root .bak files | `backups/` | directory |
| Root file checkpoints (S93-S104) | `root_baks/` | directory |
| Historical scripts (DL-008/013/etc.) | `scripts/` | directory |

---

*End of ARCHIVE_CATALOG.md — 2026-07-31 S123*
