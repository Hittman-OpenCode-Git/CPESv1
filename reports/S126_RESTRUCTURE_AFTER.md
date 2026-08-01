# S126 Restructure — AFTER

**Generated:** 2026-08-01
**Preceded by:** S126_RESTRUCTURE_BEFORE.md

---

## Metrics Comparison

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Root Files | 53 | 52 | −1 |
| Root Directories | 19 | 20 | +1 |
| Total Repository Files | 5,936 | 5,936 | 0 |
| Runtime Files (unchanged) | 41 | 41 | 0 |
| Dev Files Moved to `/dev/` | 0 | 3 | +3 |
| Archived Items (moved) | 0 | 4 | +4 |

---

## Root Cleanup Summary

### Files Removed From Root

| # | File | Destination | Reason |
|---|------|-------------|--------|
| 1 | `seed-profile.json` | `dev/seed-profile.json` | Zero programmatic references; manual-import only |
| 2 | `autonomy/` | `archive/autonomy/` | Session 89C artifacts; session-specific work products |
| 3 | `tools/` | `dev/tools/` | Maintenance scripts; not runtime, no build-script references |

### Files Restored to Root (Build-Tool Dependencies)

| # | File | Reason |
|---|------|--------|
| 1-5 | `scored_cases.js` through `scored_cases5.js` | Referenced by 45 build scripts; moved to `archive/scored_cases_legacy/` as backup, restored to root for tooling compatibility |

**Root count: 53 → 52** (net −1 after scored_cases restoration)

---

## New Directories Created

| Directory | Purpose | Contents |
|-----------|---------|----------|
| `app/` | Future application modules | Empty (future home for May modules, app.js split) |
| `ui/` | Future UI components | Empty (future home for HTML, CSS, components) |
| `dev/` | Development tooling | `seed-profile.json`, `tools/` |
| `dev/tools/` | Maintenance scripts | `final_project_cleanup.ps1`, `analyze_s708_cross_pack_residuals.js` |
| `archive/scored_cases_legacy/` | Legacy case data backup | Copied: `scored_cases1-5.js` (2.2 MB) |
| `archive/autonomy/` | Session 89C archive | `session89c_rules.md`, `session89c_queue.json`, `session89c_progress_log.md`, `session89c_skipped.json` |

---

## What Was NOT Moved (and Why)

### Deferred: Runtime Files
All 41 runtime files (pack_*, case_pack_*, may-*, app.js, index_updated.html, styles.css, main.js, admin.html) remain at root. Moving any would require updating 52 `<script>` tags in `index_updated.html` — a higher-risk operation deferred to a future session with formal verification.

### Deferred: Build-Time Dependencies
`scored_cases1-5.js` — restored to root after discovering 45 build-script dependencies. The cleanup benefit (5 files) doesn't justify breaking 45 scripts. A future session should update those scripts to reference `archive/scored_cases_legacy/` before re-moving.

### Deferred: Reference Directories
`registry/`, `foundation/`, `review/`, `docs/`, `ai/`, `assets/` remain in current locations. `registry/` has build-script path references; the others are low-priority reference material. Consolidation to `/knowledge/` is deferred.

### Not Applicable: Already Consolidated
`governance/` and `knowledge/` already contain their correct content. No consolidation needed.

---

## Current Root State

```
Root (52 files, 20 directories):

  RUNTIME (41 files):
    index_updated.html, app.js, styles.css, main.js, admin.html
    8 data files (pack_*, case_pack_*)
    25 May modules (may-*.js)
    5 legacy case files (scored_cases*.js)

  USER-FACING (3 files):
    launch.vbs, CMA_Learning_Platform.lnk, CMA Learning Platform.lnk

  CONFIG (4 files):
    package.json, package-lock.json, opencode.json, .gitignore

  GOVERNANCE (2 files):
    AGENTS.md, VERSION

  DIRECTORIES:
    app/          ← NEW (empty, future May/Electron)
    ui/           ← NEW (empty, future UI components)
    dev/          ← NEW (dev tooling — seed-profile.json + tools/)
    archive/      ← Existing (now also contains autonomy/ + scored_cases_legacy/)
    governance/   ← Existing (runtime blocklists + rules)
    knowledge/    ← Existing (living governance docs)
    ...
```

---

## Strategic Outcome

| Goal | Status |
|------|--------|
| Root file count reduced | Partial (−1 file; scored_cases deferred due to build-tool dependencies) |
| Runtime behavior unchanged | Confirmed — 0 runtime files moved |
| Governance tooling intact | Confirmed — 66/66 governance guard PASS |
| Preflight clean | Confirmed — 0 divergences |
| Dev assets isolated | 3 items moved to `/dev/` |
| Archives consolidated | 4 items added to `/archive/` |
| New structure established | `/app/`, `/ui/`, `/dev/` created for future migration |
| No files deleted | Confirmed — all files preserved |
| Rollback path exists | Confirmed — git history + archive copies |

---

## Recommended Next Session (S127)

1. Update 45 build scripts to reference `archive/scored_cases_legacy/` instead of root `scored_cases*.js`
2. Re-move `scored_cases1-5.js` to archive
3. Root: 52 → 47 files (net −5)
4. Consider moving `registry/` → `dev/registry/` (update 4 script references)
5. Evaluate moving May modules to `app/may/` (update 25 HTML script tags)
