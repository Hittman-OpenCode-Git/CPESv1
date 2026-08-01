# S126 Restructure — BEFORE

**Generated:** 2026-08-01
**Phase:** Baseline before Phase 2 directory creation

## Metrics

| Metric | Value |
|--------|-------|
| Root Files | 53 |
| Root Directories | 19 |
| Total Repository Files | 5,936 |
| Total Repository Directories | 388 |
| Runtime Files (in load chain) | 41 |
| User-Facing Files (launchers) | 3 |
| Governance Files | 2 |
| Archive Candidates (safe to move) | 7 |

## Root File Breakdown

| Category | Count | Files |
|----------|-------|-------|
| JS — Application | 1 | app.js |
| JS — Data Packs | 8 | pack_a/b/c/d/e_corrected.js, case_pack_1/2/3_corrected.js |
| JS — May Modules | 25 | may-*.js (25 files) |
| JS — Electron | 1 | main.js |
| JS — Legacy | 5 | scored_cases.js, scored_cases2-5.js |
| HTML | 2 | index_updated.html, admin.html |
| CSS | 1 | styles.css |
| JSON | 2 | seed-profile.json, package-lock.json |
| Config | 3 | package.json, opencode.json, .gitignore |
| MD | 1 | AGENTS.md |
| Other | 4 | VERSION, launch.vbs, 2x .lnk shortcuts |

## Directory Tree (Top Level)

```
Root
├── .commandcode/          (IDE tooling)
├── .git/                  (VCS)
├── .opencode/             (IDE tooling)
├── ai/                    (AI collaboration docs)
├── archive/               (Already archived — 370+ files)
├── assets/                (App icons)
├── autonomy/              (Session 89C artifacts)
├── backups/               (833 files, 863 MB)
├── docs/                  (Human documentation)
├── foundation/            (Blueprint + formulas)
├── governance/            (Runtime blocklists + rules)
├── knowledge/             (Living governance docs)
├── may-coaching-modes/    (7 May mode handlers)
├── node_modules/          (npm dependencies)
├── p2/                    (Part 2 planning)
├── registry/              (Generated question registries)
├── reports/               (Active + historical reports)
├── review/                (AI review guidance)
├── scripts/               (Tooling + validators + runtime data)
│   ├── engine/            (Building engines)
│   ├── lib/               (Shared libraries)
│   ├── output/            (Runtime data + generated JSON)
│   ├── reports/           (Derived reports)
│   ├── validators/        (Content quality validators)
│   └── ...
├── tools/                 (Maintenance scripts)
└── [53 root files]
```

## Initial State Summary

The repository root is characterized by:
- **High clutter**: 53 root files representing ~15% of all root items
- **Mixed concerns**: Runtime code lives alongside governance documents, legacy data, dev tooling, and historical archives
- **Predominantly JavaScript**: 40 of 53 root files are .js (75%)
- **Large disk consumption**: backups/ (863 MB) is the largest single directory
