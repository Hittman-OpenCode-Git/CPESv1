# S126 Directory Classification

**Generated:** 2026-08-01
**Basis:** S126_DEPENDENCY_MAP.md + raw file evidence
**Classification Legend:**
- **ACTIVE** — Required at runtime or for ongoing operations
- **REFERENCE** — Not executed at runtime; needed occasionally for builds, audits, or authoring
- **ARCHIVE** — Historical only; safe to relocate to `/archive/`
- **MIXED** — Contains both ACTIVE and ARCHIVE-able content; requires sub-classification

---

## 1. Complete Directory Classification

| Directory | Size | Status | Runtime? | Rationale |
|-----------|------|--------|----------|-----------|
| **`backups/`** | 863 MB | **ARCHIVE** | No | 833 timestamped backup files. No runtime dependency. Largest single consumer of disk space. |
| **`archive/`** | 205 MB | **ARCHIVE** | No | Already classified as archive. Contains session reports, old scripts, recovery programs, systematic testing history. |
| **`scripts/`** | 37 MB | **ACTIVE** | Build-time | Contains runtime output data (`output/admin_dashboard_data.js` loaded by both HTML pages), governance guard tests, validators, portfolio dashboard, baseline rebuilders, certification tools. Essential for ongoing governance and content operations. |
| **`reports/`** | 24 MB | **MIXED** | No | Contains current/active reports + S121/S122 deliverables + framework_v2 materials + closed defect sweeps (already moved to archive in some cases). Needs sub-classification. |
| **`node_modules/`** | 22 MB | **ACTIVE** | Build-time | npm dependencies. Required for scripts, tests, and Electron. |
| **`knowledge/`** | 5 MB | **ACTIVE** | No (build-time governance) | AGENTS.md companion, constitution, CAQS, DEFECT_LIBRARY, REVISION_HISTORY, baselines, taxonomies. Core governance documents. |
| **`p2/`** | 1.7 MB | **ACTIVE** | No (planning) | Part 2 blueprint extraction, execution roadmap, governance mapping, repository manifest. Active planning work. |
| **`governance/`** | 0.43 MB | **ACTIVE** | **YES** | Delivery blocklist loaded at runtime. Defect manifest consumed by app.js and may-core.js. Repository rules. DIRECT LEARNER-SAFETY IMPACT. |
| **`may-coaching-modes/`** | 0.03 MB | **ACTIVE** | **YES** | 7 mode handler JS files loaded by index_updated.html. May AI coaching layer. |
| **`registry/`** | 0.94 MB | **REFERENCE** | No | Generated question registries (per-pack, per-domain, per-case). Consumed by build scripts only. Per governance-guard Rule 7: derived, not authoritative. Regeneratable from source packs. |
| **`docs/`** | 0.97 MB | **REFERENCE** | No | Human-facing documentation: project overview, folder policy, algorithms, gold schema, case study standards. Not loaded at runtime. |
| **`foundation/`** | 0.08 MB | **REFERENCE** | No | Authoritative reference material: exam blueprint, formula master, Part 2 blueprint. Referenced by validators. |
| **`review/`** | 0.02 MB | **REFERENCE** | No | AI review guidance: decision trees, exam traps, audit protocols. Referenced by validators. |
| **`assets/`** | 0.03 MB | **REFERENCE** | No | Application icons (SVG, ICO). Not directly referenced by HTML. `main.js` references `icon.png` (not found — may be missing). |
| **`tools/`** | 0.02 MB | **REFERENCE** | No | Maintenance scripts (cleanup, QC analysis). Dry-run by default. |
| **`autonomy/`** | 0.01 MB | **ARCHIVE** | No | Session 89C autonomous remediation artifacts (rules, queue, progress log, skip log). Session-specific work products. |
| **`ai/`** | 0.02 MB | **REFERENCE** | No | AI collaboration matrix and workflow definitions. Authoring process documentation. |
| **`.opencode/`** | 0.15 MB | **ACTIVE** | No (IDE tooling) | OpenCode IDE configuration: plugins (governance-guard.js), skills, commands. Required for development workflow. |
| **`.commandcode/`** | 0.53 MB | **ACTIVE** | No (IDE tooling) | OpenCode IDE internal configuration: command permissions, taste model, session plans, scratchpad. Auto-generated. Not project domain. |
| **`.git/`** | — | **ACTIVE** | No (VCS) | Git repository. Required for version control. |

---

## 2. Sub-Classification — `reports/` (MIXED)

The `reports/` directory contains a mix of current operational artifacts and historical session reports that could be archived.

### 2.1 Active / Keep (Operational — Should Stay)

| Item | Type | Purpose |
|------|------|---------|
| `S121_PORTFOLIO_TARGETS.md` | (in knowledge/, not reports/) | Portfolio targets — but the S121 JSON dashboard data is in `scripts/output/` |
| `S122_GOLD_STANDARD_LIBRARY.md` | (in reports/) | 100 exemplar items — institutional reference |
| `S122_FALSE_POSITIVE_LIBRARY.md` | (in reports/) | 28 cognitive-label overstatement exemplars — institutional reference |
| `S122_ANALYZE_PATTERNS.md` | (in reports/) | 8 reusable Analyze pattern templates — authoring reference |
| `S122_EVALUATE_PATTERNS.md` | (in reports/) | 8 reusable Evaluate pattern templates — authoring reference |
| `S122_EXECUTIVE_SUMMARY.md` | (in reports/) | Part 1 Excellence Program overview — institutional reference |
| `S122_SECTION_SCORECARD.md` | (in reports/) | 30-section quality scorecard — operational metric |
| `S126_REPO_SNAPSHOT.txt` | (in reports/) | Current repository snapshot — generated today |
| `S126_DEPENDENCY_MAP.md` | (in reports/) | Current dependency map — generated today |
| `S126_DIRECTORY_CLASSIFICATION.md` | (in reports/) | This document |

### 2.2 Current Governance / Dashboards

| Item | Type | Purpose |
|------|------|---------|
| `framework_v2/` | Directory (22 items) | Current Framework v2 pipeline artifacts (readiness scoring, certification candidates, adoption review) |
| `telemetry/` | Directory (3 items) | Current telemetry data |
| `matching/` | Directory (11 items) | Current matching item audit reports |

### 2.3 Archive Candidates (Session/Defect Reports)

The majority of reports/ content is session reports and defect sweep closeouts that could be archived:

| Pattern | Example | Action |
|---------|---------|--------|
| `SESSION*_*.md` / `SESSION*_*.json` | Session-specific work products | Archive to `archive/session-reports/` |
| `DL008_*`, `DL012_*`, `DL013_*` | Closed defect sweep reports | Archive to `archive/recovery-program/` or similar |
| `ROOT_*` | Root cleanup planning artifacts (S123) | Archive to `archive/sustainability/` |
| Old `S*_REPORT.md` / `S*_CLOSEOUT.md` | Closed session closeouts | Archive to `archive/session-reports/` |

---

## 3. Sub-Classification — `scripts/` (ACTIVE but with Archive Potential)

The `scripts/` directory is large (37 MB) primarily due to the `output/` subdirectory.

### 3.1 Absolutely Must Keep

| Item | Purpose |
|------|---------|
| `test_governance_guard.js` | 54+ test governance guard tests — runtime governance validation |
| `preflight.js` | T0 integrity check — mandatory for Full Governance Lane |
| `smoke_test.js` | Playwright UI smoke test — mandatory for Light Lane |
| `governance_guard_test_runner.js` | Governance guard test execution |
| `validators/` | All validator modules — content quality enforcement |
| `config.js` | Configuration for scripts |
| `lib/` | Shared script libraries |
| `s121_portfolio_dashboard.js` | Portfolio distribution monitoring |
| `scan_logic_inversions.js` | DL-037 full-pool audit |
| `nightly_test_check.js` | Nightly integrity check |
| `rebuild_baselines.js` | Baseline hash rebuild |
| `build_master_registry.js` | Master registry generation |
| `verify_case_packs.js` | Case pack verification |
| `propagate_ordered_shuffle.js` | Case item shuffle propagation |
| `audit_matching_items.js` | Matching item audit |

### 3.2 Runtime Data (Must Keep)

| Item | Purpose |
|------|---------|
| `output/admin_dashboard_data.js` | **Loaded by both index_updated.html and admin.html at runtime** |
| `output/domain_progress.json` | Fetched by admin.html |
| `output/S121_PORTFOLIO_DASHBOARD.json` | Fetched by admin.html |
| `output/pre_delivery_safety.json` | Fetched by admin.html |
| `output/readiness_scoring.json` | Fetched by admin.html |
| `output/remediation_queue.json` | Fetched by admin.html |
| `output/baseline_delta.json` | Baseline hash tracking |
| `output/session_packages/` | Certification batch packages |
| `output/SESSION252_ADMIN_DATA_CONTRACT.json` | Admin data contract |

### 3.3 Archive Candidates (within scripts/)

| Item | Reason |
|------|--------|
| `S063_items/` (7 items) | Session 63 work artifacts |
| `s719_batches/` (21 items) | Session 719 batch artifacts |
| Old session-specific files in `output/` | Session work products that can be archived |
| `reports/` subdirectory (31 items) | Duplicate/derived reports from scripts — already in main reports/ |

---

## 4. Root-Level File Classification

Based on the dependency map, every root-level file:

### 4.1 ACTIVE — Required at Runtime

These must stay at root (loaded by `index_updated.html` or `main.js`):

| File | Risk If Moved |
|------|---------------|
| `index_updated.html` | **CRITICAL** — entry point |
| `app.js` | **CRITICAL** — entire application |
| `main.js` | **CRITICAL** — Electron shell |
| `styles.css` | **CRITICAL** — shared by both HTML pages |
| `pack_a_corrected.js` | **CRITICAL** — MCQ data |
| `pack_b_corrected.js` | **CRITICAL** — MCQ data |
| `pack_c_corrected.js` | **CRITICAL** — MCQ data |
| `pack_d_corrected.js` | **CRITICAL** — MCQ data |
| `pack_e_corrected.js` | **CRITICAL** — MCQ data |
| `case_pack_1_corrected.js` | **CRITICAL** — Case data (A, D) |
| `case_pack_2_corrected.js` | **CRITICAL** — Case data (B, E) |
| `case_pack_3_corrected.js` | **CRITICAL** — Case data (C) |
| `may-core.js` | **CRITICAL** — May AI hub |
| `may-learner-state.js` | **CRITICAL** — Learner tracking |
| `may-feature-flags.js` | **CRITICAL** — Feature gates (18 dependencies) |
| `may-telemetry.js` | **CRITICAL** — Telemetry |
| `may-context-builder.js` | **CRITICAL** — Context building |
| `may-coaching-router.js` | **CRITICAL** — Mode dispatch |
| `may-llm-types.js` | **CRITICAL** — LLM types |
| `may-llm-provider-registry.js` | **CRITICAL** — LLM providers |
| `may-llm-adapter.js` | **CRITICAL** — LLM adapter |
| `may-learner-profile.js` | **ACTIVE** — Learner profile |
| `may-adaptive-recommender.js` | **ACTIVE** — Recommendations |
| `may-remediation-engine.js` | **ACTIVE** — Remediation |
| `may-readiness-scorer.js` | **ACTIVE** — Readiness scoring |
| `may-readiness-engine.js` | **ACTIVE** — Readiness engine |
| `may-archetype-coach.js` | **ACTIVE** — Archetype coaching |
| `may-intervention-prioritizer.js` | **ACTIVE** — Interventions |
| `may-recommendation-explainer.js` | **ACTIVE** — Explanations |
| `may-dashboard-model.js` | **ACTIVE** — Dashboard model |
| `may-decision-engine.js` | **ACTIVE** — Decision engine |
| `may-intervention-coordinator.js` | **ACTIVE** — Coordination |
| `may-recommendation-pipeline.js` | **ACTIVE** — Pipeline |
| `may-coaching-memory.js` | **ACTIVE** — Coaching memory |
| `may-coaching-orchestrator.js` | **ACTIVE** — Orchestrator |
| `may-pilot-activation.js` | **ACTIVE** — Pilot activation |
| `may-effectiveness-scorer.js` | **ACTIVE** — Effectiveness |
| `admin.html` | **ACTIVE** — Standalone admin console |
| `package.json` | **ACTIVE** — npm config |
| `opencode.json` | **ACTIVE** — IDE config |

### 4.2 REFERENCE — Not Runtime, But Utility

| File | Recommendation |
|------|----------------|
| `AGENTS.md` | Keep at root — IDE entry point for standing instructions |
| `package-lock.json` | Keep at root — npm dependency lock |
| `.gitignore` | Keep at root — Git config |
| `VERSION` | Keep at root — Version record |
| `seed-profile.json` | Consider moving to `scripts/output/` — dormant, zero references |
| `launch.vbs` | Keep at root — user-facing launcher (breaks .lnk if moved) |
| `CMA_Learning_Platform.lnk` | Keep at root — user-facing shortcut |
| `CMA Learning Platform.lnk` | Keep at root — user-facing shortcut |

### 4.3 ARCHIVE — Legacy, Not Loaded at Runtime

| File | Action |
|------|--------|
| `scored_cases.js` | **Move to archive** — replaced by `case_pack_1_corrected.js` |
| `scored_cases2.js` | **Move to archive** — replaced by `case_pack_2_corrected.js` |
| `scored_cases3.js` | **Move to archive** — replaced by `case_pack_3_corrected.js` |
| `scored_cases4.js` | **Move to archive** — absorbed into case_pack_* |
| `scored_cases5.js` | **Move to archive** — absorbed into case_pack_* |

**Note:** Before archiving scored_cases*.js, verify no build scripts have hardcoded paths that would break. These files are NOT in `index_updated.html`'s load chain, so the runtime is safe.

---

## 5. Risk Heatmap — What Breaks If Moved

### CRITICAL (runtime breaks)

| What | Why |
|------|-----|
| Moving any pack_*_corrected.js from root | `index_updated.html` `<script>` tags break |
| Moving any case_pack_*_corrected.js from root | `index_updated.html` `<script>` tags break |
| Moving any may-*.js from root | `index_updated.html` `<script>` tags break |
| Moving app.js from root | `index_updated.html` line 155 breaks |
| Moving index_updated.html from root | `main.js` `loadFile()` breaks, all .lnk shortcuts break |
| Moving styles.css from root | Both HTML pages lose styling |
| Moving main.js from root | `package.json` `"main"` breaks, Electron won't start |
| Moving governance/ directory | Runtime blocklist loading fails — **defective items served to learners** |
| Moving may-coaching-modes/ directory | May AI coach breaks — 7 `<script>` tags fail |
| Moving `scripts/output/admin_dashboard_data.js` | Both HTML pages break |

### HIGH (build-time tools break)

| What | Why |
|------|-----|
| Moving scripts/validators/ | Content validation pipeline breaks |
| Moving scripts/test_governance_guard.js | Governance guard tests fail |
| Moving scripts/preflight.js | T0 integrity check fails |
| Moving registry/ | Build scripts lose question index |
| Moving foundation/ | Validators lose formula/blueprint authority |
| Moving knowledge/ | AGENTS.md links, governance documents inaccessible |

### LOW (no functional impact)

| What | Why |
|------|-----|
| Moving scored_cases*.js | NOT loaded at runtime; fallback code path in app.js is unreachable |
| Moving seed-profile.json | Zero programmatic references |
| Moving docs/ | Documentation only |
| Moving reports/ (historical sessions) | Historical only |
| Moving tools/ | Utility scripts |
| Moving autonomy/ | Session-specific artifacts |

---

## 6. Recommended Target Structure

Based on the dependency map and risk analysis, a clean target structure:

```
Root (application entry + data):
  index_updated.html
  app.js                          ← stay (monolith, refactor later)
  styles.css
  main.js
  admin.html
  package.json, package-lock.json
  opencode.json
  AGENTS.md                       ← IDE standing instructions
  VERSION
  .gitignore
  launch.vbs                      ← user launcher
  CMA_Learning_Platform.lnk       ← user shortcut
  CMA Learning Platform.lnk       ← user shortcut

  /pack_a_corrected.js            ← data (stay for now — if moved, update HTML paths)
  /pack_b_corrected.js
  /pack_c_corrected.js
  /pack_d_corrected.js
  /pack_e_corrected.js
  /case_pack_1_corrected.js
  /case_pack_2_corrected.js
  /case_pack_3_corrected.js

  /may-core.js                    ← May AI layer (stay for now — tightly coupled to app.js)
  /may-learner-state.js
  ... (25 May files total)
  /may-coaching-modes/

  /governance/                    ← runtime safety (stay)
  /scripts/                       ← tooling + runtime data (stay)
  /knowledge/                     ← governance docs (stay)
  /registry/                      ← generated registries (stay)
  /foundation/                    ← authoritative references (stay)
  /review/                        ← AI review guidance (stay)
  /docs/                          ← human docs (stay)
  /reports/                       ← active reports only (purge historical)
  /p2/                            ← Part 2 planning (stay)
  /assets/                        ← icons (stay)

  /archive/                       ← everything historical
    /backups/                     ← consolidated backup storage
    /scored_cases_legacy/         ← scored_cases.js through scored_cases5.js
    /session-reports/             ← all session- and defect- specific reports
    /recovery-program/            ← S92P-S109P artifacts
    /scripts-history/             ← archived scripts
    /governance-history/          ← governance history
    /may-history/                 ← May development history
    /part2-history/               ← Part 2 development history
    /audit-history/               ← historical audits
```

### 6.1 Immediate Low-Risk Moves (No Runtime Impact)

1. **Move `scored_cases.js` through `scored_cases5.js`** → `archive/scored_cases_legacy/`
   - Risk: LOW. Not loaded by `index_updated.html`. App.js fallback code path is unreachable (these files aren't loaded).
   - Mitigation: Update any build scripts that reference the old paths.

2. **Move `seed-profile.json`** → `scripts/output/seed-profile.json`
   - Risk: LOW. Zero programmatic references. Import-only file.

3. **Move `autonomy/`** → `archive/autonomy/`
   - Risk: LOW. Session 89C work artifacts. Not referenced at runtime.

### 6.2 Medium-Risk Moves (Requires Path Updates)

4. **Create `/app` directory, move May modules**
   - Risk: MEDIUM. Must update ALL 25 `<script>` tags in `index_updated.html`. Must verify all May internal cross-references are `typeof`-based (they are — confirmed in dependency map).
   - Benefit: Root goes from ~40 files to ~15. Much cleaner.

5. **Purge historical reports from `reports/`**
   - Risk: LOW. Session reports, closed defect sweeps, old verification batches are not referenced by runtime code.
   - Keep: S121, S122, S126 artifacts + current dashboards.

### 6.3 Long-Term (Architectural)

6. **Split `app.js`** (7,660 lines) into components
   - Requires careful extraction. Not recommended without tests and verification.

7. **Create `/ui` directory for HTML and CSS**
   - Risk: MEDIUM. Must update `main.js` loadFile() path, .lnk shortcuts, launch.vbs.

---

## 7. Classification Summary

| Count | Category |
|-------|----------|
| 8 | **ACTIVE** directories (runtime or IDE-tooling) |
| 7 | **REFERENCE** directories (documentation, build-time only) |
| 2 | **ARCHIVE** directories (backups/ + autonomy/) |
| 1 | **MIXED** directory (reports/ — needs sub-classification) |
| 5 | Root files safe to **ARCHIVE** immediately (scored_cases*.js) |
| 41 | Root files must **STAY** at root (runtime dependencies) |
| 7 | Root files are **REFERENCE** (keep but not runtime-critical) |

---

## 8. Cross-Reference

| Document | Purpose |
|----------|---------|
| `S126_DEPENDENCY_MAP.md` | Authoritative: what references what |
| `AGENTS.md` | Governance lanes, backup protocol, key file locations |
| `00_PROJECT_CONSTITUTION.md` | Permitted root-level files |
| `ROOT_FOLDER_POLICY.md` (docs/) | Root hygiene policy |
| `S123_BEFORE_REPORT.md` / `S123_AFTER_REPORT.md` | Prior root cleanup (S123) |
