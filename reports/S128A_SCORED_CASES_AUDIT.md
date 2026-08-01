# S128A — Scored Cases Dependency Audit

**Generated:** 2026-08-01
**Status:** Read-only audit — no files modified
**Question:** Can `scored_cases1-5.js` be removed from root?

---

## 1. Executive Answer

**The scored_cases files are NOT required at runtime.** They are build-tool dependencies only. The 75 CBQ cases in them are fully duplicated by `content/cases/case_pack_*_corrected.js`. However, 45 old-style cases exist only in scored_cases files and are **already inaccessible to learners** (no HTML loads them).

**Recommendation:** Move to `content/cases/legacy/`, update ~20 build-tool references, then retire from root.

---

## 2. Runtime Status

| Check | Result |
|-------|--------|
| Loaded by `index_updated.html`? | **NO** — loads `content/cases/case_pack_1-3_corrected.js` instead |
| Loaded by `admin.html`? | **NO** — zero references |
| Referenced by `app.js` as filename? | **NO** — only references JavaScript *variable* names |
| Variables set by scored_cases still accessed by app.js? | **Partially** — `ENHANCED_CASE_BANK_*` path in app.js is unreachable (scored_cases not loaded); `CASE_BANK_*` / `MIGRATED_CASE_BASE_*` are set by case_pack files |

**Conclusion: scored_cases files can be removed from root without breaking the running application.**

---

## 3. Content Duplication Analysis

### Legacy Files (NOT loaded)

| File | Variable | CBQ Cases | Old-Style Cases | Size |
|------|----------|-----------|-----------------|------|
| `scored_cases.js` | `ENHANCED_CASE_BASE` | 15 | 0 | 456 KB |
| `scored_cases2.js` | `ENHANCED_CASE_BASE2` | 15 | 15 (CASE-B12..B26) | 440 KB |
| `scored_cases3.js` | `ENHANCED_CASE_BASE3` | 15 | 15 (CASE-C1..C15) | 443 KB |
| `scored_cases4.js` | `ENHANCED_CASE_BASE4` | 15 | 15 (CASE-D1..D15) | 533 KB |
| `scored_cases5.js` | `ENHANCED_CASE_BASE5` | 15 | 0 | 333 KB |
| **Total** | | **75** | **45** | **2,205 KB** |

### New Files (loaded by index_updated.html)

| File | Primary Variable | CBQ Cases | Size |
|------|-----------------|-----------|------|
| `content/cases/case_pack_1_corrected.js` | `CASE_PACK_1` → `CASE_BANK_A`, `CASE_BANK_D` | 25 (Packs 1+2) | 569 KB |
| `content/cases/case_pack_2_corrected.js` | `CASE_PACK_2` → `CASE_BANK_B`, `CASE_BANK_E` | 25 (Packs 2+3+4) | 410 KB |
| `content/cases/case_pack_3_corrected.js` | `CASE_PACK_3` → `CASE_BANK_C` | 25 (Packs 3+4+5) | 461 KB |
| **Total** | | **75** | **1,440 KB** |

### The Gap: 45 Old-Style Cases

`scored_cases2.js`, `scored_cases3.js`, and `scored_cases4.js` each contain 15 old-style cases (CASE-B12 through CASE-D15) that are **NOT** in any case_pack file. These were Session 60 migrations from MCQ banks.

**These 45 cases are already inaccessible to learners** because no HTML file loads the scored_cases files. Removing the scored_cases files would formalize what is already the operational reality. To recover them, they'd need to be migrated into the case_pack format.

---

## 4. Dependency Inventory — All Files That Reference scored_cases*.js

### BUILD-TOOL SCRIPTS (16 files — WOULD BREAK if files removed)

| File | Files Referenced | Type |
|------|-----------------|------|
| `scripts/config.js` | All 5 | Central config — case files list |
| `scripts/build_master_registry.js` | All 5 | Registry builder |
| `scripts/governance_guard_engine.js` | All 5 | Governance enforcement |
| `scripts/lib/RepositoryValidator.js` | All 5 | Validation pipeline |
| `scripts/migrate_cases_session60.js` | All 5 | Migration tool |
| `scripts/case_scoring_audit_agent_d.js` | All 5 | Audit tool |
| `scripts/s310_portfolio_dashboard.js` | All 5 | Portfolio dashboard |
| `scripts/s306_uiqs_engine.js` | 2-5 | UIQS engine |
| `scripts/s305_exhibit_analysis.js` | 2-5 | Exhibit analysis |
| `scripts/s304_blueprint_analysis.js` | 2-5 | Blueprint analysis |
| `scripts/s303_explanation_analysis.js` | 2-5 | Explanation analysis |
| `scripts/s306_inspect_cases2.js` | 2-5 | Case inspector |
| `scripts/agent_b_deep_check.js` | All 5 | Deep check agent |
| `scripts/agent_b_case_schema_audit.js` | 2-5 | Schema audit |
| `scripts/agent_b_quick_check.js` | All 5 | Quick check agent |
| `scripts/check_patterns.js` | All 5 | Pattern checker |

### CONFIGURATION / GOVERNANCE (4 files)

| File | Type |
|------|------|
| `knowledge/CURRENT_BASELINES.md` | Hash tracking — needs update |
| `governance/REPOSITORY_RULES.md` | Listed as content file |
| `.commandcode/settings.json` | IDE command cache — informational |
| `dev/tools/maintenance/final_project_cleanup.ps1` | Cleanup script |

### REGISTRY FILES (6 files — regeneratable)

| File | Note |
|------|------|
| `registry/packs/scored_cases2_registry.md` | Generated |
| `registry/packs/scored_cases3_registry.md` | Generated |
| `registry/packs/scored_cases4_registry.md` | Generated |
| `registry/cases/scored_cases3_registry.md` | Generated |
| `registry/domains/domain_e_registry.md` | Generated |
| `registry/domains/domain_c_registry.md` | Generated |

### DOCUMENTATION / REPORTS (~50+ files)

`REVISION_HISTORY.md`, `DEFECT_LIBRARY.md`, session reports, archive documents — all informational. Not breakable.

### RUNTIME

**ZERO files.** No HTML or application code loads scored_cases*.js.

---

## 5. Migration Recommendation

### Recommended: S128B — Scored Cases Relocation (Future Session)

```
Phase 1: Move files
  scored_cases[1-5].js  →  content/cases/legacy/

Phase 2: Update ~16 build-tool references
  scripts/config.js:
    "scored_cases.js" → "content/cases/legacy/scored_cases.js"
    (and same for 2-5)
  
  scripts/governance_guard_engine.js:
    Same pattern update
  
  scripts/lib/RepositoryValidator.js:
    Same pattern update
  
  + 13 other scripts

Phase 3: Update registries
  registry/ → regenerated by build_master_registry.js after path fix

Phase 4: Update baselines
  knowledge/CURRENT_BASELINES.md → new paths

Phase 5: Verify
  npm run preflight
  Verify 0 divergences
  Verify governance guard 66/66
```

### Alternative: Keep at Root (Not Recommended)

Keep scored_cases files at root indefinitely. They are only 2.2 MB and 5 files. The root has 18 files total — this is already clean. The cost of updating 16+ build scripts may outweigh the benefit of removing 5 files.

**Tradeoff:** 5 root files vs 16+ script edits. Given the root is already clean (18 files), the ROI of this removal is marginal. The files are well-classified as legacy — they just need the tooling to acknowledge their new location.

---

## 6. Root Target Assessment

| Category | Current Count | Target |
|----------|---------------|--------|
| Permanent shell/config (keep forever) | 13 | 13 |
| Legacy case data (scored_cases1-5) | 5 | 0 (move to content/cases/legacy/) |
| **Total** | **18** | **13** |

A 13-file root is achievable after S128B. This represents the final, fully-modularized state:
- entry points (HTML, CSS, JS shell) — 7 files
- config (npm, IDE, git, version) — 5 files
- user launchers (shortcuts, VBS) — 2 files
- standing instructions (AGENTS.md) — 1 file

---

## 7. Appendix: Case Variable Mapping

```
Legacy (NOT loaded)                    Loaded by index_updated.html
─────────────────────                  ────────────────────────────
scored_cases.js                        case_pack_1_corrected.js
  ENHANCED_CASE_BASE                     CASE_PACK_1
                                           → CASE_BANK_A (via alias)
                                           → CASE_BANK_D (via alias)
                                           → MIGRATED_CASE_BASE_A
                                           → MIGRATED_CASE_BASE_D

scored_cases2.js                       case_pack_2_corrected.js
  ENHANCED_CASE_BASE2                    CASE_PACK_2
                                           → CASE_BANK_B
                                           → CASE_BANK_E

scored_cases3.js                       case_pack_3_corrected.js
  ENHANCED_CASE_BASE3                    CASE_PACK_3
                                           → CASE_BANK_C

scored_cases4.js                       (absorbed into packs 2+3)
  ENHANCED_CASE_BASE4

scored_cases5.js                       (absorbed into pack 3)
  ENHANCED_CASE_BASE5
```

app.js (app/app.js:2227-2239) accesses:
- Primary: `CASE_BANK_A` through `CASE_BANK_E` (set by case_pack files)
- Fallback: `MIGRATED_CASE_BASE_A` through `MIGRATED_CASE_BASE_E` (same source)
- Legacy (unreachable): `ENHANCED_CASE_BANK*` → `ENHANCED_CASE_BANK5*` → all return `[]` since scored_cases files aren't loaded
