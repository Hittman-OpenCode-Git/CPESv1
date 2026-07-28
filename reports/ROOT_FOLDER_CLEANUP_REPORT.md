# Root Folder Cleanup Audit Report

**Date:** 2026-07-28
**Repository:** CMA_Part_1_2026
**Phase:** 6 — Final Recommendation Report
**Authority:** PROJECT_CONSTITUTION.md §11

---

## Executive Summary

| Metric | Count |
|--------|-------|
| Total root-level files | **111** |
| Total root-level directories | 17 |
| Total root-level .bak files | **83** (107.15 MB) |
| Non-backup root files | 28 |
| SAFE candidates (movable with zero impact) | 83 |
| GARBAGE candidates (deletable with zero impact) | 7 |
| REVIEW items (require human decision) | 2 |
| HIGH_RISK / CRITICAL (must remain) | 19 |
| **Recommended moves** | **83 .bak files → `backups/`** |
| **Recommended deletions** | **7 garbage files** |
| **Human review queue** | **2 items** (admin.html, AGENTS.md) |

**Bottom line:** 90 of 111 root files (81%) are SAFE or GARBAGE — removable/relocatable with zero application impact and zero path rewrites. After cleanup, root would contain 21 files (vs. current 111), eliminating 107 MB of incorrectly-placed backup clutter.

---

## 1. Current Root State vs. Constitution

The Constitution §11.1 lists **17 permitted root files**. The actual root contains **28 non-backup files** + **83 .bak backups**. Gaps identified:

| Category | Constitution Says | Actual |
|----------|------------------|--------|
| Permitted application files | 13 listed | 15 present (may-core.js, may-learner-state.js NOT listed but RUNTIME-CRITICAL) |
| Permitted config files | 4 listed | 4 present |
| Backup files (.bak) | Must be in `backups/` (§11.4) | **83 in root** — violation |
| Other files | Prohibited (§11.4) | admin.html, AGENTS.md, 7 garbage artifacts |

**Key finding:** `may-core.js` and `may-learner-state.js` are loaded by `index_updated.html` (lines 12, 14) as `<script>` tags. They are runtime-essential framework libraries that were authored after the Constitution was written. They should be ADDED to §11.1's permitted list — not moved.

---

## 2. Risk Classification Summary

### 2.1 CRITICAL — Must Remain (15 files)

These are loaded by the browser entry point (`index_updated.html`) or are the entry point itself. Moving any of these causes application failure.

| File | Role | Loaded By |
|------|------|-----------|
| `index_updated.html` | Entry point | Browser |
| `app.js` | Main exam engine | index_updated.html |
| `styles.css` | Application styling | index_updated.html, admin.html |
| `pack_a_corrected.js` | Question bank A | index_updated.html |
| `pack_b_corrected.js` | Question bank B | index_updated.html |
| `pack_c_corrected.js` | Question bank C | index_updated.html |
| `pack_d_corrected.js` | Question bank D | index_updated.html |
| `pack_e_corrected.js` | Question bank E | index_updated.html |
| `scored_cases.js` | Case bank 1 | index_updated.html |
| `scored_cases2.js` | Case bank 2 | index_updated.html |
| `scored_cases3.js` | Case bank 3 | index_updated.html |
| `scored_cases4.js` | Case bank 4 | index_updated.html |
| `scored_cases5.js` | Case bank 5 | index_updated.html |
| `may-core.js` | Core framework library | index_updated.html |
| `may-learner-state.js` | Learner state management | index_updated.html |

### 2.2 HIGH RISK — Must Remain (4 files)

| File | Role | Referenced By |
|------|------|---------------|
| `package.json` | NPM package definition | Node.js ecosystem |
| `package-lock.json` | NPM dependency lock | npm install |
| `opencode.json` | AI tooling configuration | OpenCode CLI |
| `VERSION` | Version metadata | package.json (name field) |

### 2.3 REVIEW — Human Decision Required (2 files)

| File | Category | Issue | Dependency |
|------|----------|-------|-------------|
| `admin.html` | Standalone admin console | Not in Constitution §11.1 permitted list | Loads `styles.css` and `scripts/output/admin_dashboard_data.js` |
| `AGENTS.md` | AI governance instructions | Not in Constitution §11.1 permitted list | Referenced by `opencode.json` line 23 |

### 2.4 SAFE — Movable with Zero Impact (83 files)

All 83 `.bak*` files in root. Zero application references. Can be relocated to `backups/` (which already contains 436 files). No path rewrites, no config updates, no code changes required.

### 2.5 GARBAGE — Deletable with Zero Impact (7 files)

| File | Size | Nature |
|------|------|--------|
| `$null` | 94 B | PowerShell artifact |
| `({idx` | 0 B | Command artifact |
| `a+b` | 0 B | Command artifact |
| `null` | 1,760 B | Command output artifact |
| `temp_qid_sample.json` | 2 B | Empty temporary file |
| `may-core(1).js` | 152 KB | Windows copy duplicate of may-core.js |
| `may-learner-state(1).js` | 57 KB | Windows copy duplicate of may-learner-state.js |

---

## 3. Recommended Moves (SAFE — No Authorization Needed Beyond §3 Backup Protocol)

### 3.1 Move 83 .bak Files → `backups/`

| Source Group | Count | Est. Size |
|-------------|-------|-----------|
| pack_a_corrected.js.bak-* | 10 | ~17.4 MB |
| pack_b_corrected.js.bak-* | 5 | ~6.9 MB |
| pack_c_corrected.js.bak-* | 17 | ~28.6 MB |
| pack_d_corrected.js.bak-* | 11 | ~19.3 MB |
| pack_e_corrected.js.bak-* | 22 | ~30.8 MB |
| scored_cases*.js.bak-* | 6 | ~2.2 MB |
| app.js.bak | 1 | 0.2 MB |
| index_updated.html.bak | 1 | 0.01 MB |
| styles.css.bak | 1 | 0.06 MB |
| AGENTS.md.bak | 1 | 0.01 MB |
| may-core.js.bak-* | 3 | 0.9 MB |
| may-learner-state.js.bak-* | 3 | 0.3 MB |
| **Total** | **83** | **~107 MB** |

**Impact:** Zero. No path rewrites. No code changes. No config updates. These files are passive disaster-recovery snapshots. Confidence: **100%**.

**Protocol:** Per AGENTS.md §3 (Backup Protocol), the move itself is the backup — the files are already `.bak` copies of active files. The active files remain untouched in root.

### 3.2 Relocate STAGING_DIR → `archive/`

The `STAGING_DIR/` directory contains 6 S853/S867 session artifacts (~1.25 MB). Zero application references. Zero documentation references (confirmed by grep). Confidence: **95%**.

---

## 4. Recommended Deletions (GARBAGE — Requires Explicit Authorization per AGENTS.md §3.1)

The following 7 files have zero content value and zero application references:

1. `$null` — PowerShell artifact (94 bytes)
2. `({idx` — command artifact (0 bytes)
3. `a+b` — command artifact (0 bytes)
4. `null` — command output redirect artifact (1,760 bytes)
5. `temp_qid_sample.json` — empty temp (2 bytes)
6. `may-core(1).js` — Windows copy duplicate of may-core.js
7. `may-learner-state(1).js` — Windows copy duplicate of may-learner-state.js

**Authorization required:** Per AGENTS.md §3.1, deletion of any repository file requires explicit user authorization using the phrase "delete the files" or equivalent. These deletions MUST follow the §3.1 staged authorization sequence: proposal → backup → authorization → execution → verification.

---

## 5. Human Review Queue

### 5.1 admin.html — Should It Stay in Root?

`admin.html` is a dedicated administrative console (user-confirmed). It is NOT loaded by `index_updated.html` and is NOT referenced by `app.js`. It is a standalone page accessed directly via URL.

**Option A — Keep in root:** Add `admin.html` to Constitution §11.1 permitted root files list. Zero code changes needed.

**Option B — Move to `admin/`:** Requires 2 path rewrites in `admin.html`:
- `href="styles.css"` → `href="../styles.css"`
- `src="scripts/output/admin_dashboard_data.js"` → `src="../scripts/output/admin_dashboard_data.js"`

**Recommendation:** Option A. `admin.html` is a legitimate application file. Update Constitution §11.1 to include it.

### 5.2 AGENTS.md — Should It Stay in Root?

`AGENTS.md` is referenced by `opencode.json` line 23. The OpenCode tooling reads it as a governance instruction file. It is not loaded at runtime.

**Option A — Keep in root:** Add AGENTS.md to Constitution §11.1 as a permitted governance file. Zero code changes needed.

**Option B — Move to `knowledge/`:** Update `opencode.json` line 23 from `"AGENTS.md"` to `"knowledge/AGENTS.md"`. Requires verifying OpenCode plugin path resolution behavior with subdirectory paths.

**Recommendation:** Option A. AGENTS.md serves a root-level governance purpose distinct from the `knowledge/` library. Update Constitution §11.1 to include it.

---

## 6. Deferred — Files That Must Remain

All 19 CRITICAL + HIGH_RISK files remain in root. No relocation proposed.

Additionally, the `governance/delivery_blocklist.js` file at `governance/` (a subdirectory, not root) is loaded by `index_updated.html` and is correctly placed in its subdirectory per Constitution §11.2.

---

## 7. Rewrite Impact Summary

| Proposal | Files Affected | Path Changes | Config Changes | Risk |
|----------|---------------|-------------|----------------|------|
| Move 83 .bak → backups/ | 0 | 0 | 0 | None |
| Delete 7 garbage files | 0 | 0 | 0 | None |
| Move STAGING_DIR → archive/ | 0 | 0 | 0 | None |
| Move admin.html → admin/ (IF chosen) | 1 | 2 | 0 | Low |
| Move AGENTS.md → knowledge/ (IF chosen) | 1 | 1 | 1 | Medium |

**Bottom line:** The 90 recommended operations (83 moves + 7 deletes) require ZERO path rewrites, ZERO config updates, ZERO import changes, and ZERO documentation updates. They are purely file-level operations with no repository-wide side effects.

---

## 8. Post-Cleanup Root State (Projected)

After executing all recommended moves and deletions (excluding human-review items):

| Category | Before | After |
|----------|--------|-------|
| Application files | 16 | 16 |
| Configuration files | 4 | 4 |
| Governance files | 1 | 1 |
| Backup files | 83 | **0** (moved to backups/) |
| Garbage files | 7 | **0** (deleted) |
| **Total root files** | **111** | **21** |
| Root file size | ~225 MB | ~118 MB |

The resulting 21-file root would contain only application-runtime and configuration files — closely matching the Constitution §11.1 vision.

---

## 9. Constitution Amendments Recommended

Two files are legitimate root-level residents not currently listed in §11.1:

1. **`may-core.js`** — Application framework library. Loaded by `index_updated.html`. Should be added to §11.1 permitted list.
2. **`may-learner-state.js`** — Learner state management. Loaded by `index_updated.html`. Should be added to §11.1 permitted list.
3. **`admin.html`** — Dedicated administrative console. Standalone page. Should be added to §11.1 permitted list (pending human review).
4. **`AGENTS.md`** — AI governance instruction file. Referenced by `opencode.json`. Should be added to §11.1 or a new governance category.

---

## 10. Prohibited Actions (Reaffirmed)

Per the audit mandate, the following were NOT performed:

- [x] No files moved
- [x] No files renamed
- [x] No imports updated
- [x] No application code modified
- [x] No build scripts modified
- [x] No configuration modified
- [x] No registries modified
- [x] No path rewrites applied
- [x] Zero governance impact
- [x] Zero runtime impact

---

## 11. Deliverables Produced

| File | Phase | Location |
|------|-------|----------|
| `ROOT_FILE_INVENTORY.json` | 1 | `reports/ROOT_FILE_INVENTORY.json` |
| `ROOT_REFERENCE_ANALYSIS.json` | 2 | `reports/ROOT_REFERENCE_ANALYSIS.json` |
| `ROOT_RISK_CLASSIFICATION.json` | 3 | `reports/ROOT_RISK_CLASSIFICATION.json` |
| `ROOT_RELOCATION_PROPOSALS.json` | 4 | `reports/ROOT_RELOCATION_PROPOSALS.json` |
| `ROOT_REWRITE_IMPACT_MATRIX.json` | 5 | `reports/ROOT_REWRITE_IMPACT_MATRIX.json` |
| `ROOT_FOLDER_CLEANUP_REPORT.md` | 6 | `reports/ROOT_FOLDER_CLEANUP_REPORT.md` (this file) |

---

**Audit Status:** COMPLETE — All 6 phases executed. Zero file modifications. Awaiting human review decisions on admin.html and AGENTS.md, plus deletion authorization for 7 garbage files.
