# S126 Runtime Freeze — Root File Classification

**Generated:** 2026-08-01
**Basis:** S126_DEPENDENCY_MAP.md + preflight verification
**Purpose:** Classify every root-level file to determine safe relocation targets

---

## Classification Key

| Label | Definition | Can Move? |
|-------|-----------|-----------|
| **RUNTIME** | Loaded by `index_updated.html` or `main.js` at runtime | No — would break the application |
| **GOVERNANCE** | Active governance document or enforcement file | Move to `/governance/` (update refs) |
| **KNOWLEDGE** | Living reference/knowledge document | Move to `/knowledge/` (update refs) |
| **DEV** | Development tooling, not runtime | Move to `/dev/` (safe) |
| **ARCHIVE** | Superseded or historical, not in runtime load chain | Move to `/archive/` (safe) |
| **UNKNOWN** | Classification unclear — requires investigation | Do not move |

---

## Complete Root File Classification

### RUNTIME (41 files) — Do Not Move

These are loaded by `index_updated.html` as `<script>` tags or by `main.js` — moving them breaks the application.

| # | File | Loaded By | Must Stay? |
|---|------|-----------|------------|
| 1 | `index_updated.html` | Browser / `main.js` / `launch.vbs` / `.lnk` | **Yes** |
| 2 | `app.js` | `index_updated.html` line 155 | **Yes** |
| 3 | `styles.css` | `index_updated.html` + `admin.html` | **Yes** |
| 4 | `main.js` | `package.json` `"main"` (Electron) | **Yes** |
| 5 | `pack_a_corrected.js` | `index_updated.html` line 115 | **Yes** |
| 6 | `pack_b_corrected.js` | `index_updated.html` line 116 | **Yes** |
| 7 | `pack_c_corrected.js` | `index_updated.html` line 117 | **Yes** |
| 8 | `pack_d_corrected.js` | `index_updated.html` line 118 | **Yes** |
| 9 | `pack_e_corrected.js` | `index_updated.html` line 119 | **Yes** |
| 10 | `case_pack_1_corrected.js` | `index_updated.html` line 120 | **Yes** |
| 11 | `case_pack_2_corrected.js` | `index_updated.html` line 121 | **Yes** |
| 12 | `case_pack_3_corrected.js` | `index_updated.html` line 122 | **Yes** |
| 13 | `may-core.js` | `index_updated.html` line 135 | **Yes** |
| 14 | `may-learner-state.js` | `index_updated.html` line 123 | **Yes** |
| 15 | `may-feature-flags.js` | `index_updated.html` line 124 | **Yes** |
| 16 | `may-telemetry.js` | `index_updated.html` line 125 | **Yes** |
| 17 | `may-context-builder.js` | `index_updated.html` line 126 | **Yes** |
| 18 | `may-coaching-router.js` | `index_updated.html` line 127 | **Yes** |
| 19 | `may-llm-types.js` | `index_updated.html` line 136 | **Yes** |
| 20 | `may-llm-provider-registry.js` | `index_updated.html` line 137 | **Yes** |
| 21 | `may-llm-adapter.js` | `index_updated.html` line 138 | **Yes** |
| 22 | `may-learner-profile.js` | `index_updated.html` line 139 | **Yes** |
| 23 | `may-adaptive-recommender.js` | `index_updated.html` line 140 | **Yes** |
| 24 | `may-remediation-engine.js` | `index_updated.html` line 141 | **Yes** |
| 25 | `may-readiness-scorer.js` | `index_updated.html` line 142 | **Yes** |
| 26 | `may-readiness-engine.js` | `index_updated.html` line 143 | **Yes** |
| 27 | `may-archetype-coach.js` | `index_updated.html` line 144 | **Yes** |
| 28 | `may-intervention-prioritizer.js` | `index_updated.html` line 145 | **Yes** |
| 29 | `may-recommendation-explainer.js` | `index_updated.html` line 146 | **Yes** |
| 30 | `may-dashboard-model.js` | `index_updated.html` line 147 | **Yes** |
| 31 | `may-decision-engine.js` | `index_updated.html` line 148 | **Yes** |
| 32 | `may-intervention-coordinator.js` | `index_updated.html` line 149 | **Yes** |
| 33 | `may-recommendation-pipeline.js` | `index_updated.html` line 150 | **Yes** |
| 34 | `may-coaching-memory.js` | `index_updated.html` line 151 | **Yes** |
| 35 | `may-coaching-orchestrator.js` | `index_updated.html` line 152 | **Yes** |
| 36 | `may-pilot-activation.js` | `index_updated.html` line 153 | **Yes** |
| 37 | `may-effectiveness-scorer.js` | `index_updated.html` line 154 | **Yes** |
| 38 | `admin.html` | Direct browser (standalone page) | **Yes** |
| 39 | `package.json` | npm entry | **Yes** |
| 40 | `package-lock.json` | npm dependency | **Yes** |
| 41 | `opencode.json` | IDE plugin config | **Yes** |

### USER-FACING (3 files) — Keep at Root

| # | File | Rationale |
|---|------|-----------|
| 42 | `launch.vbs` | One-click Windows launcher; referenced by .lnk shortcut |
| 43 | `CMA_Learning_Platform.lnk` | User shortcut — opens index_updated.html directly |
| 44 | `CMA Learning Platform.lnk` | User shortcut — invokes launch.vbs via wscript.exe |

### GOVERNANCE (2 files)

| # | File | Rationale |
|---|------|-----------|
| 45 | `AGENTS.md` | Standing instructions for AI sessions. IDE requires this at root to auto-load. |
| 46 | `VERSION` | Version tracker |

### ARCHIVE (5 files) — Safe to Move Immediately

| # | File | Size | Reason |
|---|------|------|--------|
| 47 | `scored_cases.js` | 456 KB | Replaced by `case_pack_1_corrected.js` (S916). Not in `index_updated.html`. |
| 48 | `scored_cases2.js` | 440 KB | Replaced by `case_pack_2_corrected.js` (S917). Not in `index_updated.html`. |
| 49 | `scored_cases3.js` | 443 KB | Replaced by `case_pack_3_corrected.js` (S916). Not in `index_updated.html`. |
| 50 | `scored_cases4.js` | 533 KB | Absorbed into case_pack_* files. Not in `index_updated.html`. |
| 51 | `scored_cases5.js` | 333 KB | Absorbed into case_pack_* files. Not in `index_updated.html`. |

### DEV (1 file)

| # | File | Size | Reason |
|---|------|------|--------|
| 52 | `seed-profile.json` | 15 KB | Pre-populated learner profile. Zero programmatic references. Imported manually. Only referenced in S123 reports. |

### UNKNOWN (0 files)

All 52 files classified. No unknowns.

---

## Directory-Level Classification

| Directory | Files | Classification | Action |
|-----------|-------|----------------|--------|
| `may-coaching-modes/` | 7 `.js` files | **RUNTIME** | In load chain — stay at root or move to `/app/may/modes/` (future) |
| `governance/` | 9 files | **RUNTIME** (blocklist loaded at runtime) | Consolidate to `/governance/` (already there) |
| `scripts/` | 900+ files | **DEV** (build-time tools) | Isolate to `/dev/scripts/` |
| `knowledge/` | 15+ files | **KNOWLEDGE** (living governance docs) | Consolidate to `/knowledge/` (already there) |
| `reports/` | 40+ files | **MIXED** | Active: `/reports/` — Historical: `/archive/reports/` |
| `registry/` | 28 files | **DEV** (generated build output) | Move to `/dev/registry/` |
| `backups/` | 833 files / 863 MB | **ARCHIVE** | Move to `/archive/backups/` |
| `archive/` | 370+ files / 205 MB | **ARCHIVE** | Already archived (correct location) |
| `foundation/` | 4 `.md` files | **REFERENCE** | Move to `/knowledge/foundation/` |
| `review/` | 3 `.md` files | **REFERENCE** | Move to `/knowledge/review/` |
| `docs/` | 13 files | **REFERENCE** | Move to `/knowledge/docs/` |
| `ai/` | 2 `.md` files | **REFERENCE** | Move to `/knowledge/ai/` |
| `p2/` | ~10 `.json`/`.md` files | **ACTIVE** | Stay at `/p2/` (active Part 2 planning) |
| `assets/` | 3 files | **REFERENCE** | Stay at root (icons) or move to `/ui/assets/` |
| `tools/` | 2 files | **DEV** | Move to `/dev/tools/` |
| `autonomy/` | 4 files | **ARCHIVE** | Move to `/archive/autonomy/` |
| `node_modules/` | — | **INFRA** | npm — cannot move |

---

## Summary

| Classification | Root Files | Directories |
|----------------|-----------|-------------|
| RUNTIME | 41 | 2 (may-coaching-modes, governance) |
| USER-FACING | 3 | 0 |
| GOVERNANCE | 2 | 0 |
| DEV | 1 | 1 (scripts/) |
| REFERENCE | 0 | 5 (foundation, review, docs, ai, assets, tools) |
| ARCHIVE | 5 | 3 (backups, autonomy, scored_cases) |
| ACTIVE (content planning) | 0 | 1 (p2/) |
| **TOTAL** | **52** | **(all subdirs accounted)** |

### Immediate Safe Moves (Zero Risk)

| From | To | Files |
|------|----|-------|
| `scored_cases[1-5].js` | → `archive/scored_cases_legacy/` | 5 files, 2.2 MB |
| `seed-profile.json` | → `dev/seed-profile.json` | 1 file, 15 KB |
| `autonomy/` | → `archive/autonomy/` | 4 files, 0.01 MB |
| **Total immediate safe reduction:** | **10 root items** | |
