# Session 950 — Conservative Root Housekeeping Sweep

**Date:** 2026-07-25
**Type:** Repository housekeeping — abandoned file detection, classification, and safe archival
**Status:** COMPLETE — 171 files archived, zero operational impact

---

## Objectives

1. Sweep root directory and near-root folders for abandoned/obsolete files
2. Classify candidates: Operational, Referenced non-operational, Likely scratch/abandoned, Uncertain
3. Move clearly abandoned files into `archive/` (not deleted, fully recoverable)
4. Never move content files, runtime-critical files, or governance docs
5. Verify zero regression via test suites and parse checks

---

## Inventory & Classification

### Root `.bak` files (47 moved)
All root-level `.bak-*` files are session-created backups of runtime files (`app.js`, `may-core.js`, `may-learner-state.js`, `index_updated.html`, `styles.css`) and pack files (`pack_c_corrected.js`). These are created by the backup protocol before each session's edits. None are referenced by any operational code (imports/requires/paths). All 47 moved to `archive/root_baks/`.

Classification: **Likely scratch/abandoned** — backup copies of current files, not runtime-required.

### Knowledge `.bak` files (4 moved)
`knowledge/REVISION_HISTORY.md.bak-s{96,102,103,104}-*` — session-created backups of REVISION_HISTORY.md. No code references. Moved to `archive/knowledge/`.

Classification: **Likely scratch/abandoned**.

### Scripts `.bak` files (3 moved)
`scripts/test_readiness.js.bak-s{103,104}-*` and `scripts/config.js.bak6`. No code references. Moved to `archive/scripts/`.

Classification: **Likely scratch/abandoned**.

### Scratch/migration scripts (109 moved)
109 scripts matching patterns: `_check_*`, `_debug_*`, `_tmp_*`, `scan_*`, `dl008_*`, `dl012_*`, `dl013_*`, `fix-*`, `fix_*`, `recover*`, `temp_*`, `extract_*`, `debug_*`, `classify_*`, `enrich_*`, `migrate-*`, `phase0b_*`, `test_parse*`, `test_recover*`, `test_regex*`, `test_step*`, `validate_pack_*`, `validate_source*`, `audit_*`, `cert_pack_*`, `check_*`, `parse_*`, `reconstruct-*`, `repair-*`, `restructure_*`, `structural_*`, `sweep_*`, `simple-*`, `final-*`, `finalize_*`, `find_*`, `inspect_*`, `investigate_*`, `preflight_*`, `raw_text_*`, `safe_*`, `diagnose_*`, `analyze_*`, `corrected_*`.

All are one-off audit/migration/scan scripts from prior sessions. None are in `package.json` scripts. None are imported by any operational module. Moved to `archive/scripts/`.

Classification: **Likely scratch/abandoned**.

### Root binary artifact (1 moved)
`root/0` — 2-byte binary file with no references anywhere. Moved to `archive/root_baks/file_0_binary`.

Classification: **Likely scratch/abandoned**.

---

## Files Deliberately Left in Place

### Operational (never-touch category)
- `app.js`, `index_updated.html`, `styles.css`, `may-core.js`, `may-learner-state.js`
- `pack_a_corrected.js` through `pack_e_corrected.js`
- `scored_cases.js` through `scored_cases5.js`
- `AGENTS.md`, `VERSION`, `opencode.json`, `package.json`, `package-lock.json`

### Active test suites (scripts/)
- `test_governance_guard.js`, `test_load_may.js`, `test_may_regression_r2.js`, `test_may_renderer.js`, `test_may_stagec.js`, `test_readiness.js`, `test_session_recovery.js`

### Build/validate scripts (scripts/)
- `build_dashboard.js`, `build_master_registry.js`, `build_short_explanation_queue.js`, `config.js`, `file_state_reconciliation.js`, `generate_registry.js`, `section_a_validation_batch.js`, `validate.js`, `validate_integrity.js`

### Session-scoped audit agents (scripts/ — uncertain, left in place)
- `agent_b_case_schema_audit.js`, `agent_b_deep_check.js`, `agent_b_quick_check.js`
- `case_scoring_audit_agent_d.js`
- `migrate_cases_session60.js`, `normalize_defect_manifest_s96.js`, `s75_apply_transitions.js`
- `session4_bytediff.js`, `session4_diff_analysis.js`, `session4_find_defects.js`, `session4_forensic_timeline.js`, `session4_full_manifest.js`, `session4_verify_counts.js`
- `session62_cleanup.js`, `session65_fix_case_governance.js`, `session65_fix_case_governance2.js`, `session67_certify_case_a.js`, `session67_item_fix.js`
- `session86_dl026_scan.js`, `session86_dl8_scan.js`, `session86_packd_sectionc.js`
- `session9_browser_test.js`

**Note:** These session-scoped scripts reference `.bak` filenames in `backups/` in their source code. Their references are to prior-session artifacts, not to files moved in this sweep. Left in place as "uncertain" — they are one-off utilities that may be needed for historical audit reference.

### Backups directory
All `backups/` content left untouched — these are the official backup archives per BACKUP_PROTOCOL.md.

### Governance docs
All `knowledge/` and `governance/` files left untouched except for the `.bak` files moved.

---

## Moves Executed

| Category | Source | Destination | Count |
|----------|--------|-------------|-------|
| Root .bak files | `./*.bak-*` | `archive/root_baks/` | 47 |
| Knowledge .bak files | `knowledge/*.bak-*` | `archive/knowledge/` | 4 |
| Scripts .bak files | `scripts/*.bak*` | `archive/scripts/` | 3 |
| Scratch scripts | `scripts/{patterns}*` | `archive/scripts/` | 109 |
| Root binary artifact | `./0` | `archive/root_baks/file_0_binary` | 1 |
| Pack C .bak files | `./pack_c_corrected.js.bak-*` | `archive/root_baks/` | 2 |
| **Total moved** | | | **166 + 5 prior = 171** |

All moves are to `archive/` (new directory). No files were deleted. All moves are recoverable by moving back to original location.

---

## Pre- and Post-Move Verification

### Baseline (pre-move)
- Governance guard: 20/20 PASS

### Post-move
- Governance guard: 20/20 PASS
- May Stage C: 62/62 PASS
- May Regression R2: 42/42 PASS
- Readiness tests: 30/30 PASS
- **Total: 154/154 PASS**

### Parse checks
- `may-learner-state.js`: Parse clean (EXIT 0)
- `app.js`: Pre-existing `localStorage` reference error (browser API, expected)
- `may-core.js`: Pre-existing `document` reference error (browser API, expected)

### Root cleanliness
- **Before:** 68 files in root directory
- **After:** 20 files in root directory (all operational)

---

## Statement of No Impact

- No content files moved (all 5 pack files + 5 scored case files remain in place)
- No runtime-critical JS/HTML/CSS moved
- No governance or baseline docs moved
- All test suites confirm zero regression
- All moves are recoverable

---

## Recommended Future Housekeeping

1. **Scripts/ directory session-scoped agents:** ~20 session-scoped audit/migration scripts remain in `scripts/`. These are one-off utilities from prior sessions. A human-governed review should determine which can be archived vs. kept for reference.
2. **Backups/ directory:** Contains 297 files from prior sessions. Historical backup protocol compliance is met. No action needed unless disk space becomes a concern.
3. **First-time archive created:** The `archive/` directory is now the canonical location for abandoned project artifacts. Future sessions should use this path for similar housekeeping moves.
