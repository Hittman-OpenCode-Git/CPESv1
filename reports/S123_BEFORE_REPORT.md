# S123 — Repository BEFORE Report

**Session:** S123 (Repository Archival & Information Architecture Audit)
**Date:** 2026-07-31
**Phase:** S123B — Before Report
**Governance Lane:** Governance Light (read-only audit phases)

---

## 1. Executive Summary

The CMA Part 1 Exam Simulator repository has accumulated significant historical debris across 100+ sessions of development, recovery, quality assurance, and governance hardening. This report captures the repository's state before archival — the baseline against which the post-archival AFTER report will measure improvement.

**Current state:** 5,033 files consuming 1,051.12 MB across 18 subdirectories. The `backups/` directory alone accounts for 81.7% of repository size (858.45 MB). Historical session reports, defect sweeps, remediation plans, and script outputs have accumulated in active working directories alongside live governance and operational code.

---

## 2. Repository Inventory — Before Archival

### 2.1 Directory-Level Summary

| Directory | File Count | Size (MB) | % of Total | Classification |
|-----------|-----------|-----------|------------|----------------|
| `backups/` | 824 | 858.45 | 81.7% | Backup storage |
| `knowledge/` | 86 | 52.61 | 5.0% | Active governance + backup bloat |
| `reports/` | 2,163 | 48.59 | 4.6% | Session reports + historical artifacts |
| `scripts/` | 1,381 | 41.32 | 3.9% | Active tools + historical scripts + outputs |
| `node_modules/` | 175 | 16.77 | 1.6% | Dependencies (excluded) |
| `archive/` | 178 | 11.71 | 1.1% | Existing archive (S950 staging) |
| `p2/` | 26 | 1.66 | 0.2% | Part 2 content (active) |
| `registry/` | 27 | 0.94 | 0.1% | Active registries |
| `.commandcode/` | 47 | 0.53 | 0.1% | Session plans + scratchpad |
| `governance/` | 9 | 0.44 | <0.1% | Governance manifests |
| `.opencode/` | 20 | 0.15 | <0.1% | Plugin config (active) |
| `docs/` | 14 | 0.13 | <0.1% | Reference docs |
| `foundation/` | 4 | 0.08 | <0.1% | Blueprint + formulas |
| `may-coaching-modes/` | 7 | 0.03 | <0.1% | May coaching modes |
| `tools/` | 2 | 0.02 | <0.1% | Tool config |
| `review/` | 3 | 0.02 | <0.1% | Review protocols |
| `ai/` | 12 | 0.02 | <0.1% | AI persona definitions |
| `autonomy/` | 4 | 0.01 | <0.1% | Autonomy logs |
| **Root files** | **51** | **16.27** | **1.5%** | Application + config |

| **Total** | **5,033** | **1,051.12** | **100%** | |

### 2.2 Root-Level File Audit

**51 files in root (46 approved + 4 flagged + 1 approved but questionable):**

| Status | Count | Description |
|--------|-------|-------------|
| APPROVED | 46 | Pack files, case files, app files, May files, config |
| **FLAGGED** | **4** | Violations of Constitution §11.4 |
| QUESTIONABLE | 1 | `seed-profile.json` — data/config in root |

**Flagged root files (Constitution §11.4 violations):**

| File | Size | Issue |
|------|------|-------|
| `pack_e_corrected.js.bak-20260731125138` | 1,805.0 KB | Backup in root — hard violation |
| `pack_e_corrected.js.bak-20260731143135` | 1,679.6 KB | Backup in root — hard violation |
| `admin.html` | 64.7 KB | Not in approved root manifest |
| `seed-profile.json` | 14.7 KB | Not in approved root manifest |

### 2.3 File Extension Distribution

| Extension | Count | Category |
|-----------|-------|----------|
| `.json` | 2,292 | Data exports, session outputs, backup manifests |
| `.md` | 1,047 | Documentation, reports, knowledge |
| `.js` | 615 | Application code, scripts, validators, pack files |
| `.bak-*` (timestamped) | ~980 | Backup files |
| `.txt` | 22 | Text artifacts |
| `.ps1` | 15 | PowerShell scripts |
| `.mjs` | 13 | ES module scripts |
| Other | 49 | `.sh`, `.css`, `.html`, `.ts`, `.csv`, `.svg`, `.ttf`, `.png`, `.cmd`, `.py`, `.yml`, `.cjs` |

---

## 3. Clutter Metrics — Before Archival

### 3.1 Historical Session Reports (reports/)

| Category | Count | Size (MB) | Archive Candidate? |
|----------|-------|-----------|--------------------|
| Root-level session files | 1,348 | ~25 MB | Yes — mixed with active reports |
| `session_status/` | 190 | 11.42 | Yes — completed status reports |
| `systematic_testing/` | 219 | 8.04 | Yes — completed testing runs |
| `defect_sweeps/` | 30 | 1.71 | **Yes — recovery era (user-specified)** |
| `remediation/` | 13 | 0.17 | **Yes — recovery era (user-specified)** |
| `sustainability/` | 16 | 0.27 | Yes — completed sustainability audits |
| `telemetry/` | 3 | 0.03 | Reference — May telemetry templates |
| `audit/` | 13 | 0.22 | Yes — completed audits |
| `certification/` | 11 | 0.18 | Yes — completed certification |
| `reconciliation/` | 19 | 0.22 | Yes — completed reconciliation |
| `matching/` | 11 | 0.60 | Reference |
| `framework_v2/` | 21 | 0.21 | Active — keep live |
| `S809.2/` | 2 | 0.09 | Yes — session archive |
| `S810.1/` | 23 | 0.62 | Yes — session archive |
| 73 session directories | 200+ | ~2.5 | Yes — historical session logs |
| 8 empty directories | 0 | 0 | Remove empty dirs |

### 3.2 Backup Bloat (backups/)

| Category | Count | Size (MB) | Issue |
|----------|-------|-----------|-------|
| Identical-content duplicates | 150 extra copies | 181.15 | 21.1% of backups are redundant |
| `GARBAGE_*` files | 7 | 0.21 | Shell noise + misclassified files |
| Non-standard naming | 26 | ~10 | `.bakN` suffixes, raw `.js` files |
| `temp_pack.js` | 1 | 2.24 | Raw temp file, not a backup |
| `temp_q401_500.txt` | 1 | 0.24 | Raw temp file, not a backup |

### 3.3 Knowledge Directory Bloat

| Category | Count | Size (MB) | Issue |
|----------|-------|-----------|-------|
| REVISION_HISTORY.md.bak-* | 23 | ~35 | 23 timestamped copies in knowledge/ |
| DEFECT_LIBRARY.md.bak-* | 20 | ~3 | 20 timestamped copies in knowledge/ |
| DELTA_LEDGER.json | 1 | 1.82 | Large operational artifact |

### 3.4 Scripts/ Directory — Test Pack Duplicates

| File | Size (MB) | Issue |
|------|-----------|-------|
| `pack_a_corrected.test.js` | 2.25 | Full copy of Pack A (2.2 MB) |
| `pack_a_corrected_test2.js` | 2.25 | Second identical copy |
| 14 `.bak*` files | 5.2 | Scattered backups in scripts/ |

### 3.5 Loose/Orphan Files Requiring Classification

| File | Location | Size | Issue |
|------|----------|------|-------|
| `temp_pack.js` | `backups/` | 2.24 MB | Raw temp file |
| `temp_q401_500.txt` | `backups/` | 0.24 MB | Raw temp file |
| `pack_b_corrected_2026-07-22_212236.js` | `backups/` | 1.25 MB | Nonstandard naming |
| `SESSION302_RAW_EXTRACTION.json` | `reports/` | 5.60 MB | Largest file; orphan root-level |
| `MasterQuestionRegistry.csv` | `reports/` | 0.54 MB | Registry export in reports/ |
| `_e_items_analysis.txt` | `reports/` | 0.21 MB | Orphan analysis artifact |
| `may_readiness_scorer.js` | root | 11.0 KB | Listed as approved but not in AGENTS.md |
| `admin.html` | root | 64.7 KB | Previously deleted, now restored |

---

## 4. Archive Candidate Inventory

Based on user-specified criteria and audit findings, the following are classified as ARCHIVE candidates:

### 4.1 Recovery Era (User-Specified)

| Source | Files | Size (MB) |
|--------|-------|-----------|
| `reports/defect_sweeps/` | 30 | 1.71 |
| `reports/remediation/` | 13 | 0.17 |

### 4.2 Historical Session Logs (User-Specified: Session 52-55, 254-270)

| Session Range | Directories | Files | Size (MB) |
|---------------|-------------|-------|-----------|
| Session 52-55 | 4 | 20 | 0.15 |
| Session 254-270 | 17 | 34 | 0.24 |

### 4.3 Additional Historical Sessions (Audit-Discovered)

| Session Range | Directories | Files | Size (MB) |
|---------------|-------------|-------|-----------|
| Session 69, 71 | 2 | 10 | 0.13 |
| Session 351-377 | 19 | 75 | 0.70 |
| Session 806-830 | 18 | 41 | 0.16 |
| Session 853-869 | 11 | 29 | 0.38 |
| Session 813-822 | 10 | 31 | 0.11 |

### 4.4 Completed Systematic Work

| Source | Files | Size (MB) |
|--------|-------|-----------|
| `reports/systematic_testing/` | 219 | 8.04 |
| `reports/session_status/` | 190 | 11.42 |
| `reports/sustainability/` | 16 | 0.27 |

### 4.5 Completed Audit & Certification

| Source | Files | Size (MB) |
|--------|-------|-----------|
| `reports/audit/` | 13 | 0.22 |
| `reports/certification/` | 11 | 0.18 |
| `reports/reconciliation/` | 19 | 0.22 |

### 4.6 Backups — Compression Candidates

| Category | Files | Size (MB) |
|----------|-------|-----------|
| Whole `backups/` directory | 824 | 858.45 |
| → Including 150 duplicate instances | — | 181.15 wasted |
| → Including GARBAGE_* files | 7 | 0.21 |
| → Including non-standard naming | 26 | ~10 |

### 4.7 Knowledge Backup Bloat

| Source | Files | Size (MB) |
|--------|-------|-----------|
| `knowledge/REVISION_HISTORY.md.bak-*` | 23 | ~35 |
| `knowledge/DEFECT_LIBRARY.md.bak-*` | 20 | ~3 |

### 4.8 Orphan/Scratch Scripts

| Source | Files | Size (MB) |
|--------|-------|-----------|
| `archive/scripts/` (already staged) | 119 | 2.14 |
| `scripts/temp/` | 17 | 0.15 |
| Test pack duplicates (scripts/) | 2 | 4.51 |
| `.commandcode/scratchpad/` | 36 | ~0.30 |

---

## 5. Size Metrics — Before Archival

### 5.1 By Category (Function)

| Category | Count | Size (MB) |
|----------|-------|-----------|
| Active Code (app + May + packs + cases) | 38 | ~16.00 |
| Active Governance (knowledge/ core docs) | ~15 | ~2.50 |
| Active Scripts (validators, pipeline, active tools) | ~30 | ~0.50 |
| Script Outputs (scripts/output/) | 941 | 28.80 |
| Historical Session Reports | ~1,800 | ~35.00 |
| Historical Scripts (archived in archive/scripts/) | 119 | 2.14 |
| Backups (all) | 824 | 858.45 |
| Knowledge Backups (REVISION/DEFECT .bak) | 43 | ~38.00 |
| Existing Archive (S950) | 178 | 11.71 |
| Part 2 Content | 26 | 1.66 |
| Other Active (registry, governance, docs, etc.) | 119 | ~2.40 |
| node_modules | 175 | 16.77 |
| **Total** | **~4,308** | **1,051.12** |

### 5.2 Archive Candidacy Summary

| Classification | Files | Size (MB) | Action |
|----------------|-------|-----------|--------|
| ACTIVE (keep live) | ~600 | ~50 | No change |
| REFERENCE (keep accessible) | ~200 | ~15 | May relocate/consolidate |
| ARCHIVE (compress/relocate) | ~4,200 | ~970 | Move to archive/ |
| **Total** | **~5,000** | **~1,051** | |

---

## 6. Specific Metrics for ARCHIVE Candidates

### 6.1 Report Files to Archive

| Subcategory | Files | Size (MB) |
|-------------|-------|-----------|
| Historical session directories (52-377) | ~180 | ~2.0 |
| Historical session directories (806-869) | ~120 | ~1.0 |
| session_status/ | 190 | 11.42 |
| systematic_testing/ | 219 | 8.04 |
| defect_sweeps/ | 30 | 1.71 |
| remediation/ | 13 | 0.17 |
| sustainability/ | 16 | 0.27 |
| audit/ | 13 | 0.22 |
| certification/ | 11 | 0.18 |
| reconciliation/ | 19 | 0.22 |
| Orphaned root-level session files in reports/ | ~800 | ~15 |
| **Subtotal (reports to archive)** | **~1,610** | **~40** |

### 6.2 Backup Files to Compress

| Subcategory | Files | Size (MB) |
|-------------|-------|-----------|
| Pack backups (A-E) | ~458 | ~765 |
| Case/Scored case backups | ~143 | ~47.5 |
| REVISION_HISTORY backups | ~52 | ~23.5 |
| Knowledge document backups | ~28 | ~2.5 |
| App/May backups | ~65 | ~9 |
| GARBAGE + temp files | 9 | 2.7 |
| Duplicate-instance copies | 150 | 181.15 |
| **Subtotal (backups)** | **~824** | **858.45** |

### 6.3 Knowledge .bak Files to Relocate

| Subcategory | Files | Size (MB) |
|-------------|-------|-----------|
| REVISION_HISTORY.md.bak-* | 23 | ~35 |
| DEFECT_LIBRARY.md.bak-* | 20 | ~3 |
| **Subtotal (knowledge .bak)** | **~43** | **~38** |

### 6.4 Script Artifacts to Archive

| Subcategory | Files | Size (MB) |
|-------------|-------|-----------|
| Already staged in archive/scripts/ | 119 | 2.14 |
| scripts/temp/ | 17 | 0.15 |
| Test pack duplicates | 2 | 4.51 |
| Root-level .bak in scripts/ | 14 | 5.2 |
| **Subtotal (script artifacts)** | **152** | **~12** |

---

## 7. Root Hygiene — Before

| Metric | Count |
|--------|-------|
| Root files total | 51 |
| Approved files | 46 |
| Flagged files | 4 |
| Root .bak files | 2 (3,484 KB total) |
| Unlisted app files | 2 (admin.html, seed-profile.json) |

---

## 8. Key Findings (Before State)

1. **81.7% of repository size is backups** — The `backups/` directory at 858.45 MB dominates storage. 21.1% of that (181 MB) is wasted on byte-identical duplicates at different timestamps.

2. **1,348 loose files in reports/ root** — Session reports, JSON dumps, CSVs, and analysis artifacts are dumped at the top level of `reports/` rather than organized into session subdirectories.

3. **Root has .bak files** — Two `pack_e_corrected.js.bak-*` files totaling 3.48 MB violate Constitution §11.4 (backup files shall never reside in the repository root).

4. **4.5 MB wasted on duplicate test packs** — `pack_a_corrected.test.js` and `pack_a_corrected_test2.js` are identical copies of the 2.2 MB Pack A source file.

5. **43 .bak files in knowledge/** — REVISION_HISTORY.md and DEFECT_LIBRARY.md backups (~38 MB) are mixed among active governance documents.

6. **8 empty directories exist** — `reports/temp/`, `reports/loose_root_artifacts/`, `reports/logs/`, `reports/nightly_feedback/`, and 4 empty session directories.

7. **Existing S950 archive lacks compression** — The 178 files in `archive/` are raw unpacked files totaling 11.71 MB. No .zip compression has been applied yet.

8. **No ARCHIVE_CATALOG.md exists** — The `archive/ARCHIVE_CATALOG.md` deliverable has not been created.

---

## 9. Before Counts — Quick Reference

| Metric | Before |
|--------|--------|
| Total repository files | 5,033 |
| Total repository size | 1,051.12 MB |
| Active code files (web-facing) | ~50 |
| Report files in reports/ | 2,163 |
| Report files at reports/ root | 1,348 |
| Backup files (backups/) | 824 |
| Backup total size | 858.45 MB |
| .bak files in knowledge/ | 43 |
| .bak files in root | 2 |
| Test pack duplicates | 2 (4.51 MB) |
| Empty directories | 8 |
| Archive candidates | ~4,200 |
| Archive candidate size | ~970 MB |

---

*End of S123_BEFORE_REPORT.md — Phase S123B complete. Proceeding to S123C (Archive Plan).*
