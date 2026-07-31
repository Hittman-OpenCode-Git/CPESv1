# S123 — Archive Plan

**Session:** S123 (Repository Archival & Information Architecture Audit)
**Date:** 2026-07-31
**Phase:** S123C — Archive Plan
**Governance Lane:** Governance Light (planning phase)
**Status:** Awaiting execution authorization

---

## 1. Operating Principles

1. **Nothing is deleted.** Everything is relocated or compressed.
2. **Archive first, cleanup second.** This preserves maximum traceability.
3. **Every archived artifact is cataloged.** No "dark archives."
4. **ACTIVE / REFERENCE / ARCHIVE** classification drives all decisions.
5. **Compression is lossless.** Source files preserved in .zip archives.
6. **Root hygiene is a secondary outcome, not the primary goal.**

---

## 2. Classification Framework

### ACTIVE — Remains in place

Files currently in operational use. These stay where they are, untouched.

| Category | Examples | Location |
|----------|----------|----------|
| Application code | `app.js`, `may-*.js`, `styles.css`, `index_updated.html` | root |
| Pack files | `pack_a_corrected.js` through `pack_e_corrected.js` | root |
| Case files | `scored_cases*.js`, `case_pack_*_corrected.js` | root |
| Config | `package.json`, `opencode.json`, `VERSION`, `.gitignore` | root |
| Part 2 content | `pack_p2_*.js`, P2* governance | `p2/` |
| Governance core | `AGENTS.md`, `CURRENT_BASELINES.md`, `DEFECT_LIBRARY.md`, `REVISION_HISTORY.md` | root + `knowledge/` |
| Governance reference | `CAQS_v1.0.md`, `G02_GOVERNANCE_HARDENING.md`, `00_PROJECT_CONSTITUTION.md`, `QUESTION_METADATA_STANDARD.md`, `TAXONOMY_REGISTRY.md`, `BACKUP_PROTOCOL.md` | `knowledge/` |
| S121/S122 Libraries | Portfolio targets, Gold Standard, False Positive, Pattern catalogs | `knowledge/` + `reports/` |
| May coaching docs | May operational specifications | `docs/`, `may-coaching-modes/` |
| Active validators | `scripts/validators/` | `scripts/validators/` |
| Pipeline scripts | `preflight.js`, `smoke_test.js`, `validate.js`, `build_master_registry.js` | `scripts/` |
| Governance guard | `governance-guard.js`, `stem-similarity-guard.js` | `.opencode/plugins/` |
| Active registries | `registry/` | `registry/` |
| Active outputs | `scripts/output/` (current operational outputs) | `scripts/output/` |
| AI workflows | `ai/` | `ai/` |
| Foundation docs | `FORMULA_MASTER.md`, `EXAM_BLUEPRINT.md` | `foundation/` |
| Review protocols | `review/` | `review/` |
| Active governance manifests | `governance/` | `governance/` |
| Current .bak in root | N/A — relocate to `backups/` | root → `backups/` |

### REFERENCE — Keep accessible, optionally relocate/consolidate

Important for context but not currently operational. May stay in place but gets cataloged.

| Category | Examples | Action |
|----------|----------|--------|
| S122 Libraries | Gold Standard, False Positive, Pattern catalogs | Keep in `reports/` |
| telemetry/ | May telemetry templates | Keep in `reports/telemetry/` |
| matching/ | Matching data | Keep in `reports/matching/` |
| framework_v2/ | Framework v2 active specs | Keep in `reports/framework_v2/` |
| Current session reports | session866-869, S809.2, S810.1 | Keep for now |
| Portfolio dashboards | `scripts/s121_portfolio_dashboard.js` | Keep in `scripts/` |
| Key governance reports | SESSION*_EXECUTIVE_SUMMARY.md, S122_* | Keep in `reports/` |
| docs/ | Reference documentation | Keep in `docs/` |
| .commandcode/plans/ | Session plans | Keep |

### ARCHIVE — Compress and relocate

Completed, superseded, or historical work. Moved to `archive/` and compressed.

| Category | Source | Destination Archive |
|----------|--------|---------------------|
| Recovery era (defect sweeps) | `reports/defect_sweeps/` | `recovery-program/` |
| Recovery era (remediation) | `reports/remediation/` | `recovery-program/` |
| Historical sessions (52-55) | `reports/session52/` through `session55/` | `session-reports/` |
| Historical sessions (254-270) | `reports/session254/` through `session270/` | `session-reports/` |
| Historical sessions (69, 71) | `reports/session_69/`, `session_71/` | `session-reports/` |
| Historical sessions (351-377) | `reports/session351/` through `session377/` | `session-reports/` |
| Historical sessions (806-830) | `reports/session806/` through `session830/` | `session-reports/` |
| Historical sessions (853-869) | `reports/session853/` through `session869/` | `session-reports/` |
| Loose root-level session files | `reports/SESSION[0-9]*` (900+ files) | `session-reports/loose/` |
| Systematic testing | `reports/systematic_testing/` | `systematic-testing/` |
| Session status reports | `reports/session_status/` | `session-status/` |
| Sustainability | `reports/sustainability/` | `sustainability/` |
| Audit history | `reports/audit/` | `audit-history/` |
| Certification history | `reports/certification/` | `audit-history/certification/` |
| Reconciliation history | `reports/reconciliation/` | `audit-history/reconciliation/` |
| Knowledge .bak files | `knowledge/*.bak-*` (43 files) | `backups/knowledge/` |
| Root .bak files | `pack_e_corrected.js.bak-*` (2 files) | `backups/` |
| Script temp files | `scripts/temp/` | `scripts-history/` |
| Test pack duplicates | `pack_a_corrected.test.js`, `_test2.js` | `scripts-history/` |
| Orphan scripts | Various | `scripts-history/` |
| Backups compression | Entire `backups/` → zips | `backups/` (as .zip) |
| GARBAGE_* files | `backups/GARBAGE_*` | Review first, then archive/dispose |
| Superseded planning | `reports/AMBIGUITY_QUEUE.md` etc. | `governance-history/` |

---

## 3. Archive Directory Structure (Target)

```
archive/
├── ARCHIVE_CATALOG.md              ← NEW: Master catalog
├── ARCHIVE_INDEX_S950.csv          ← EXISTING: S950 index
│
├── recovery-program/               ← Recovery era (defect_sweeps + remediation)
│   ├── defect_sweeps/
│   ├── remediation/
│   └── RECOVERY_PROGRAM_S93P-S109P.zip
│
├── session-reports/                ← Historical session logs
│   ├── sessions_52_55.zip
│   ├── sessions_254_270.zip
│   ├── sessions_351_377.zip
│   ├── sessions_806_830.zip
│   ├── sessions_853_869.zip
│   ├── sessions_69_71.zip
│   └── loose_root_sessions.zip
│
├── systematic-testing/             ← Completed systematic testing runs
│   └── SYSTEMATIC_TESTING_ARCHIVE.zip
│
├── session-status/                 ← Completed session status reports
│   └── SESSION_STATUS_ARCHIVE.zip
│
├── sustainability/                 ← Completed sustainability audits
│   └── SUSTAINABILITY_ARCHIVE.zip
│
├── audit-history/                  ← Completed audits, certifications, reconciliations
│   ├── audits/
│   ├── certification/
│   ├── reconciliation/
│   └── AUDIT_HISTORY_ARCHIVE.zip
│
├── governance-history/             ← Superseded planning + governance evolution
│   └── GOVERNANCE_HISTORY_ARCHIVE.zip
│
├── scripts-history/                ← Historical + scratch scripts (already staged)
│   ├── scripts/                    ← EXISTING: 119 scripts from S950
│   ├── temp_scripts/               ← scripts/temp/ contents
│   ├── test_pack_copies/           ← Duplicate test pack files
│   └── SCRIPTS_HISTORY_ARCHIVE.zip
│
├── may-history/                    ← May coaching evolution artifacts
│   └── MAY_HISTORY_ARCHIVE.zip
│
├── part2-history/                  ← Part 2 governance history
│   └── PART2_HISTORY_ARCHIVE.zip
│
├── backups/                        ← Backup compression (source files → zips)
│   ├── BACKUPS_PACK_A.zip
│   ├── BACKUPS_PACK_B.zip
│   ├── BACKUPS_PACK_C.zip
│   ├── BACKUPS_PACK_D.zip
│   ├── BACKUPS_PACK_E.zip
│   ├── BACKUPS_CASES.zip
│   ├── BACKUPS_KNOWLEDGE.zip
│   ├── BACKUPS_APP_MAY.zip
│   └── BACKUPS_MISC.zip
│
├── knowledge/                      ← EXISTING: REVISION_HISTORY S96-S104 backups
├── root_baks/                      ← EXISTING: Root file S93-S104 backups
├── STAGING_DIR_20260728/           ← EXISTING: S867 staging artifacts
│
└── releases/                       ← Future: VERSION snapshots
```

---

## 4. Compression Plan

### 4.1 Recovery Program

| Archive | Source | Est. Size |
|---------|--------|-----------|
| `RECOVERY_PROGRAM_S93P-S109P.zip` | `reports/defect_sweeps/` + `reports/remediation/` | ~2 MB |

### 4.2 Session Reports

| Archive | Source | Files | Est. Size |
|---------|--------|-------|-----------|
| `sessions_52_55.zip` | `reports/session52/` through `session55/` | 20 | ~0.15 MB |
| `sessions_254_270.zip` | `reports/session254/` through `session270/` | 34 | ~0.24 MB |
| `sessions_69_71.zip` | `reports/session_69/`, `session_71/` | 10 | ~0.13 MB |
| `sessions_351_377.zip` | `reports/session351/` through `session377/` | 75 | ~0.70 MB |
| `sessions_806_830.zip` | `reports/session806/` through `session830/` | 41 | ~0.16 MB |
| `sessions_853_869.zip` | `reports/session853/` through `session869/` | 29 | ~0.38 MB |
| `loose_root_sessions.zip` | `reports/SESSION*` root files | ~900 | ~15 MB |

### 4.3 Systematic Work

| Archive | Source | Files | Est. Size |
|---------|--------|-------|-----------|
| `SYSTEMATIC_TESTING_ARCHIVE.zip` | `reports/systematic_testing/` | 219 | 8.04 MB |
| `SESSION_STATUS_ARCHIVE.zip` | `reports/session_status/` | 190 | 11.42 MB |
| `SUSTAINABILITY_ARCHIVE.zip` | `reports/sustainability/` | 16 | 0.27 MB |

### 4.4 Audit History

| Archive | Source | Files | Est. Size |
|---------|--------|-------|-----------|
| `AUDIT_HISTORY_ARCHIVE.zip` | `reports/audit/` + `reports/certification/` + `reports/reconciliation/` | 43 | ~0.62 MB |

### 4.5 Backup Compression

| Archive | Source Pattern | Est. Files | Est. Uncompressed |
|---------|---------------|------------|-------------------|
| `BACKUPS_PACK_A.zip` | `pack_a_corrected.js.bak-*` | ~86 | ~159 MB |
| `BACKUPS_PACK_B.zip` | `pack_b_corrected.js.bak-*` | ~53 | ~69 MB |
| `BACKUPS_PACK_C.zip` | `pack_c_corrected.js.bak-*` | ~127 | ~219 MB |
| `BACKUPS_PACK_D.zip` | `pack_d_corrected.js.bak-*` | ~128 | ~230 MB |
| `BACKUPS_PACK_E.zip` | `pack_e_corrected.js.bak-*` | ~64 | ~88 MB |
| `BACKUPS_CASES.zip` | `scored_cases*.js.bak-*` + `case_pack_*.js.bak-*` | ~157 | ~54 MB |
| `BACKUPS_KNOWLEDGE.zip` | `REVISION_HISTORY.md.bak-*` + `DEFECT_LIBRARY.md.bak-*` | ~78 | ~26 MB |
| `BACKUPS_APP_MAY.zip` | `app.js.bak-*` + `may-*.js.bak-*` + `index_updated.html.bak-*` + `styles.css.bak-*` | ~65 | ~9 MB |
| `BACKUPS_MISC.zip` | Everything else in backups/ | ~66 | ~5 MB |

### 4.6 Scripts History

| Archive | Source | Est. Size |
|---------|--------|-----------|
| `SCRIPTS_HISTORY_ARCHIVE.zip` | `scripts/temp/` + test pack duplicates + orphan scripts | ~5 MB |

---

## 5. Files That MUST Stay Live (No Archive)

These files are **not candidates** for any archival operation:

| File | Location | Reason |
|------|----------|--------|
| `AGENTS.md` | root | Active standing instructions |
| `CURRENT_BASELINES.md` | `knowledge/` | Authoritative certified pool snapshot |
| `DEFECT_LIBRARY.md` | `knowledge/` | Live defect registry |
| `REVISION_HISTORY.md` | `knowledge/` | Active change history |
| `REVISION_HISTORY_P2.md` | `knowledge/` | Part 2 change history |
| `CAQS_v1.0.md` | `knowledge/` | Active quality standard |
| `G02_GOVERNANCE_HARDENING.md` | `knowledge/` | Active governance controls |
| `00_PROJECT_CONSTITUTION.md` | `knowledge/` | Active constitution |
| `QUESTION_METADATA_STANDARD.md` | `knowledge/` | Active metadata standard |
| `TAXONOMY_REGISTRY.md` | `knowledge/` | Active taxonomy |
| `BACKUP_PROTOCOL.md` | `knowledge/` | Active backup protocol |
| `S121_PORTFOLIO_TARGETS.md` | `knowledge/` | Active portfolio targets |
| `CERTIFICATION_RUBRICS.md` | `knowledge/` | Active rubrics |
| `ALIGNMENT_MAINTENANCE_GUIDE.md` | `knowledge/` | Active alignment guide |
| `SESSION_SCAFFOLD.md` | `knowledge/` | Active session scaffold |
| `S122_GOLD_STANDARD_LIBRARY.md` | `reports/` | Active reference library |
| `S122_FALSE_POSITIVE_LIBRARY.md` | `reports/` | Active reference library |
| `S122_ANALYZE_PATTERNS.md` | `reports/` | Active reference library |
| `S122_EVALUATE_PATTERNS.md` | `reports/` | Active reference library |
| `S122_EXECUTIVE_SUMMARY.md` | `reports/` | Active reference |
| `S122_SECTION_SCORECARD.md` | `reports/` | Active reference |
| All root application files | root | Production code |
| All pack/case files | root | Production content |

---

## 6. Execution Sequence

### Phase S123D-1: Archive Construction — Directories

```
Step 1: Create archive subdirectory structure (if needed)
Step 2: Relocate reports/defect_sweeps/ → archive/recovery-program/defect_sweeps/
Step 3: Relocate reports/remediation/ → archive/recovery-program/remediation/
Step 4: Compress recovery-program into RECOVERY_PROGRAM_S93P-S109P.zip
```

### Phase S123D-2: Session Report Relocation

```
Step 5:  Move session52-55 directories to archive staging
Step 6:  Move session254-270 directories to archive staging
Step 7:  Move session_69, session_71 directories to archive staging
Step 8:  Move session351-377 directories to archive staging
Step 9:  Move session806-830 directories to archive staging
Step 10: Move session853-869 directories to archive staging
Step 11: Move loose root-level SESSION* files from reports/ to archive staging
Step 12: Compress each session group into individual .zip files
```

### Phase S123D-3: Systematic Work Relocation

```
Step 13: Relocate reports/systematic_testing/ → archive/systematic-testing/
Step 14: Relocate reports/session_status/ → archive/session-status/
Step 15: Relocate reports/sustainability/ → archive/sustainability/
Step 16: Compress each into .zip files
```

### Phase S123D-4: Audit History Relocation

```
Step 17: Relocate reports/audit/ → archive/audit-history/audits/
Step 18: Relocate reports/certification/ → archive/audit-history/certification/
Step 19: Relocate reports/reconciliation/ → archive/audit-history/reconciliation/
Step 20: Compress into AUDIT_HISTORY_ARCHIVE.zip
```

### Phase S123D-5: Knowledge .bak Relocation

```
Step 21: Move knowledge/*.bak-* files → archive/backups/knowledge/ staging
Step 22: Compress into BACKUPS_KNOWLEDGE.zip
```

### Phase S123D-6: Backup Compression

```
Step 23: Compress backups/pack_a_*.bak-* → BACKUPS_PACK_A.zip
Step 24: Compress backups/pack_b_*.bak-* → BACKUPS_PACK_B.zip
Step 25: Compress backups/pack_c_*.bak-* → BACKUPS_PACK_C.zip
Step 26: Compress backups/pack_d_*.bak-* → BACKUPS_PACK_D.zip
Step 27: Compress backups/pack_e_*.bak-* → BACKUPS_PACK_E.zip
Step 28: Compress backups/scored_cases* + case_pack* → BACKUPS_CASES.zip
Step 29: Compress backups/app.js* + may-* + index* + styles* → BACKUPS_APP_MAY.zip
Step 30: Compress remaining backups/ files → BACKUPS_MISC.zip
```

### Phase S123D-7: Script History

```
Step 31: Move scripts/temp/ → archive/scripts-history/temp_scripts/
Step 32: Move test pack duplicates → archive/scripts-history/test_pack_copies/
Step 33: Compress into SCRIPTS_HISTORY_ARCHIVE.zip
```

### Phase S123D-8: Catalog Creation

```
Step 34: Create archive/ARCHIVE_CATALOG.md with all entries
```

---

## 7. Root Hygiene Corrections (S123E — After Archival)

Per Constitution §11.4, after all archiving is complete:

| Action | File | Destination |
|--------|------|-------------|
| Relocate | `pack_e_corrected.js.bak-20260731125138` | `backups/` |
| Relocate | `pack_e_corrected.js.bak-20260731143135` | `backups/` |
| Classify | `admin.html` | Keep in root (application file, approved by precedent) |
| Classify | `seed-profile.json` | Relocate to `scripts/output/` or keep root if used by app |

---

## 8. Exclusions — What We Do NOT Touch

| Exclusion | Reason |
|-----------|--------|
| `node_modules/` | Dependency directory |
| `.git/` | Git repository |
| Active pack files | Production content |
| Active case files | Production content |
| Active app files | Production code |
| `.opencode/` (except plugin backups) | Tooling config |
| S122 reference libraries | Active references |
| `framework_v2/` | Active framework |
| `governance/` | Active governance manifests |

---

## 9. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Session report moved that's still referenced by AGENTS.md | Low | Medium | Cross-check AGENTS.md §8 references before relocating |
| Zip compression corruption | Low | High | Verify each .zip after creation; keep originals until verified |
| Path references break in scripts | Low | Low | Scripts reference files relatively; scans are self-contained |
| Too aggressive: archived something needed | Medium | Low | All archives are extractable; catalog enables discovery |
| Concurrent session writes during archival | Low | Medium | Execute in a single session; backup before any move |

---

## 10. Estimated Impact

| Metric | Before | After (Est.) |
|--------|--------|---------------|
| Total repository files | 5,033 | ~1,000-1,500 |
| Total repository size | 1,051.12 MB | ~100-150 MB |
| reports/ file count | 2,163 | ~300-500 |
| reports/ root-level files | 1,348 | ~50-100 |
| backups/ file count | 824 | ~10-20 (.zip files) |
| backups/ size | 858.45 MB | ~200-300 MB (compressed .zip) |
| knowledge/ .bak files | 43 | 0 |
| Root .bak files | 2 | 0 |
| Test pack duplicates | 2 | 0 |
| Empty directories | 8 | 0 |
| Archive file count | 178 | ~200-300 |
| Archive directory size | 11.71 MB | ~30-50 MB |

---

*End of S123_ARCHIVE_PLAN.md — Phase S123C complete. Awaiting execution authorization for S123D.*
