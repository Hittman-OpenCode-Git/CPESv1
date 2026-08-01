# S127A — Runtime Modularization Plan

**Generated:** 2026-08-01
**Basis:** S126_DEPENDENCY_MAP.md, index_updated.html line-level analysis
**Status:** Plan — no files moved yet
**Precondition:** Do not execute until S126B scored_cases script-ref fix is complete (S127)

---

## 1. Summary

S126B proved that root clutter is NOT caused by abandoned artifacts — it's caused by legitimate application growth. The repository contains a large, genuinely complex system. The clean path forward is **application modularization**, not further archival.

**Current:** 52 root files, 41 of which are runtime-loaded.
**Target:** Root reduced to ~11 files. Application organized into clear boundaries.

---

## 2. Current Load Order (index_updated.html lines 115-155)

```
#  Ln  Current Path                     Global Variable(s)           Tier
--  --- ------------------------------- --------------------------- ----------------
1   115 pack_a_corrected.js             MCQ_BANK_A                  DATA — MCQs
2   116 pack_b_corrected.js             MCQ_BANK_B                  DATA — MCQs
3   117 pack_c_corrected.js             MCQ_BANK_C                  DATA — MCQs
4   118 pack_d_corrected.js             MCQ_BANK_D                  DATA — MCQs
5   119 pack_e_corrected.js             MCQ_BANK_E                  DATA — MCQs (540)
6   120 case_pack_1_corrected.js        CASE_BANK_A, CASE_BANK_D    DATA — Cases
7   121 case_pack_2_corrected.js        CASE_BANK_B, CASE_BANK_E    DATA — Cases
8   122 case_pack_3_corrected.js        CASE_BANK_C                 DATA — Cases
9   123 may-learner-state.js            MayLearnerState             MAY — Standalone
10  124 may-feature-flags.js            MayFeatureFlags             MAY — Hub (18 deps)
11  125 may-telemetry.js                MayTelemetry                MAY — Utility
12  126 may-context-builder.js          MayContextBuilder            MAY — Context
13  127 may-coaching-router.js          MayCoachingRouter            MAY — Dispatch
14  128 may-coaching-modes/mode-base.js (registry)                  MAY — Modes
15  129 may-coaching-modes/mode-explain.js                          MAY — Modes
16  130 may-coaching-modes/mode-quiz.js                             MAY — Modes
17  131 may-coaching-modes/mode-socratic.js                         MAY — Modes
18  132 may-coaching-modes/mode-motivate.js                         MAY — Modes
19  133 may-coaching-modes/mode-study-plan.js                       MAY — Modes
20  134 may-coaching-modes/mode-exam-review.js                      MAY — Modes
21  135 may-core.js                     May (master namespace)      MAY — Root
22  136 may-llm-types.js                MayLLMTypes                 MAY — Types
23  137 may-llm-provider-registry.js    MayLLMProviderRegistry      MAY — LLM
24  138 may-llm-adapter.js              MayLLMAdapter               MAY — LLM
25  139 may-learner-profile.js          MayLearnerProfile           MAY — Profile
26  140 may-adaptive-recommender.js     MayAdaptiveRecommender      MAY — Engine
27  141 may-remediation-engine.js       MayRemediationEngine        MAY — Engine
28  142 may-readiness-scorer.js         MayReadinessScorer          MAY — Engine
29  143 may-readiness-engine.js         MayReadinessEngine          MAY — Engine
30  144 may-archetype-coach.js          MayArchetypeCoach           MAY — Coach
31  145 may-intervention-prioritizer.js MayInterventionPrioritizer  MAY — Engine
32  146 may-recommendation-explainer.js MayRecommendationExplainer  MAY — Engine
33  147 may-dashboard-model.js          MayDashboardModel           MAY — Dashboard
34  148 may-decision-engine.js          MayDecisionEngine           MAY — Engine
35  149 may-intervention-coordinator.js MayInterventionCoordinator  MAY — Coord
36  150 may-recommendation-pipeline.js  MayRecommendationPipeline   MAY — Coord
37  151 may-coaching-memory.js          MayCoachingMemory           MAY — Memory
38  152 may-coaching-orchestrator.js    MayCoachingOrchestrator     MAY — Top Orchestrator
39  153 may-pilot-activation.js         (IIFE, no global)           MAY — Activation
40  154 may-effectiveness-scorer.js     MayEffectivenessScorer      MAY — Scorer
41  155 app.js                          ExamSessionManager          APP — Main
42  155 scripts/output/admin_dashboard_data.js  window.__ADMIN_DATA__   APP — Admin Data
```

**Absolute constraint:** The load ORDER must be preserved exactly. Files in positions 1-42 depend on globals set by their predecessors. Only relative PATH changes are safe.

---

## 3. Target Architecture

```
Root (~11 items)
├── index_updated.html           ← entry point (updated script paths)
├── admin.html                   ← standalone admin (updated script/data paths)
├── styles.css                   ← shared stylesheet
├── main.js                      ← Electron shell
├── package.json                 ← npm config
├── package-lock.json            ← npm lock
├── opencode.json                ← IDE config
├── AGENTS.md                    ← IDE instructions
├── VERSION                      ← version record
├── .gitignore                   ← VCS
├── launch.vbs                   ← user launcher
├── CMA_Learning_Platform.lnk    ← user shortcut
├── CMA Learning Platform.lnk    ← user shortcut

/app/                            ← Application layer
├── app.js                       ← main application (moved from root)
├── admin_service_layer.js       ← (future, not yet created)
│
├── may/                         ← May AI coaching subsystem
│   ├── may-core.js
│   ├── may-learner-state.js
│   ├── may-feature-flags.js
│   ├── may-telemetry.js
│   ├── may-context-builder.js
│   ├── may-coaching-router.js
│   ├── may-llm-types.js
│   ├── may-llm-provider-registry.js
│   ├── may-llm-adapter.js
│   ├── may-learner-profile.js
│   ├── may-adaptive-recommender.js
│   ├── may-remediation-engine.js
│   ├── may-readiness-scorer.js
│   ├── may-readiness-engine.js
│   ├── may-archetype-coach.js
│   ├── may-intervention-prioritizer.js
│   ├── may-recommendation-explainer.js
│   ├── may-dashboard-model.js
│   ├── may-decision-engine.js
│   ├── may-intervention-coordinator.js
│   ├── may-recommendation-pipeline.js
│   ├── may-coaching-memory.js
│   ├── may-coaching-orchestrator.js
│   ├── may-pilot-activation.js
│   └── may-effectiveness-scorer.js
│
│   └── modes/                   ← May coaching modes
│       ├── mode-base.js
│       ├── mode-explain.js
│       ├── mode-quiz.js
│       ├── mode-socratic.js
│       ├── mode-motivate.js
│       ├── mode-study-plan.js
│       └── mode-exam-review.js

/content/                        ← Content data (immutable at runtime)
├── packs/
│   ├── pack_a_corrected.js
│   ├── pack_b_corrected.js
│   ├── pack_c_corrected.js
│   ├── pack_d_corrected.js
│   └── pack_e_corrected.js
│
└── cases/
    ├── case_pack_1_corrected.js
    ├── case_pack_2_corrected.js
    └── case_pack_3_corrected.js

/ui/                             ← (future) UI components
│   (empty — deferred)

/styles/                         ← (future) if styles.css is split
│   (empty — deferred)
```

---

## 4. Migration Map — Every File

### 4.1 DATA Files (8 files) — Move to `/content/`

| # | Current Path | Target Path | Risk |
|---|-------------|-------------|------|
| 1 | `pack_a_corrected.js` | `content/packs/pack_a_corrected.js` | **HIGH** — HTML path change; zero internal deps |
| 2 | `pack_b_corrected.js` | `content/packs/pack_b_corrected.js` | **HIGH** — same |
| 3 | `pack_c_corrected.js` | `content/packs/pack_c_corrected.js` | **HIGH** — same |
| 4 | `pack_d_corrected.js` | `content/packs/pack_d_corrected.js` | **HIGH** — same |
| 5 | `pack_e_corrected.js` | `content/packs/pack_e_corrected.js` | **HIGH** — same |
| 6 | `case_pack_1_corrected.js` | `content/cases/case_pack_1_corrected.js` | **HIGH** — same |
| 7 | `case_pack_2_corrected.js` | `content/cases/case_pack_2_corrected.js` | **HIGH** — same |
| 8 | `case_pack_3_corrected.js` | `content/cases/case_pack_3_corrected.js` | **HIGH** — same |

**Verification:** These files have ZERO internal dependencies. They only set global variables. If the `<script>` tag loads successfully, the app works. The only risk is a typo in the path.

### 4.2 MAY Files (25 root + 7 mode files) — Move to `/app/may/`

| # | Current Path | Target Path | Internal Deps | Risk |
|---|-------------|-------------|---------------|------|
| 9 | `may-learner-state.js` | `app/may/may-learner-state.js` | 0 | **HIGH** — 1st May file; no deps; 12 consumers |
| 10 | `may-feature-flags.js` | `app/may/may-feature-flags.js` | May.config | **CRITICAL** — 18 consumers |
| 11 | `may-telemetry.js` | `app/may/may-telemetry.js` | May.config | **HIGH** — 4 consumers |
| 12 | `may-context-builder.js` | `app/may/may-context-builder.js` | May + MayLS + MayFF | **HIGH** — 3 consumers |
| 13 | `may-coaching-router.js` | `app/may/may-coaching-router.js` | MayFF + MayTel + MayLP | **HIGH** — 2 consumers |
| 14 | `may-coaching-modes/mode-base.js` | `app/may/modes/mode-base.js` | (registry) | **HIGH** |
| 15 | `may-coaching-modes/mode-explain.js` | `app/may/modes/mode-explain.js` | (registered) | **HIGH** |
| 16 | `may-coaching-modes/mode-quiz.js` | `app/may/modes/mode-quiz.js` | (registered) | **HIGH** |
| 17 | `may-coaching-modes/mode-socratic.js` | `app/may/modes/mode-socratic.js` | (registered) | **HIGH** |
| 18 | `may-coaching-modes/mode-motivate.js` | `app/may/modes/mode-motivate.js` | (registered) | **HIGH** |
| 19 | `may-coaching-modes/mode-study-plan.js` | `app/may/modes/mode-study-plan.js` | (registered) | **HIGH** |
| 20 | `may-coaching-modes/mode-exam-review.js` | `app/may/modes/mode-exam-review.js` | (registered) | **HIGH** |
| 21 | `may-core.js` | `app/may/may-core.js` | MayFF+MayTel+MayCB+MayCR+MayAC+MayES | **CRITICAL** — app.js depends on it |
| 22 | `may-llm-types.js` | `app/may/may-llm-types.js` | 0 | **HIGH** |
| 23 | `may-llm-provider-registry.js` | `app/may/may-llm-provider-registry.js` | MayFF | **HIGH** |
| 24 | `may-llm-adapter.js` | `app/may/may-llm-adapter.js` | MayFF+MayLLMT+MayLLMPR | **HIGH** |
| 25 | `may-learner-profile.js` | `app/may/may-learner-profile.js` | MayLS+MayFF+MayAR | **HIGH** |
| 26 | `may-adaptive-recommender.js` | `app/may/may-adaptive-recommender.js` | MayLS+MayFF | **HIGH** |
| 27 | `may-remediation-engine.js` | `app/may/may-remediation-engine.js` | MayLS+MayFF | **HIGH** |
| 28 | `may-readiness-scorer.js` | `app/may/may-readiness-scorer.js` | MayFF | **HIGH** |
| 29 | `may-readiness-engine.js` | `app/may/may-readiness-engine.js` | MayLS+MayFF | **HIGH** |
| 30 | `may-archetype-coach.js` | `app/may/may-archetype-coach.js` | MayLS | **HIGH** |
| 31 | `may-intervention-prioritizer.js` | `app/may/may-intervention-prioritizer.js` | MayLS+MayFF | **HIGH** |
| 32 | `may-recommendation-explainer.js` | `app/may/may-recommendation-explainer.js` | MayFF+MayIP | **HIGH** |
| 33 | `may-dashboard-model.js` | `app/may/may-dashboard-model.js` | MayLS+MayFF+MayIP+MayREng | **HIGH** |
| 34 | `may-decision-engine.js` | `app/may/may-decision-engine.js` | MayIP | **HIGH** |
| 35 | `may-intervention-coordinator.js` | `app/may/may-intervention-coordinator.js` | MayLS+MayIP | **HIGH** |
| 36 | `may-recommendation-pipeline.js` | `app/may/may-recommendation-pipeline.js` | MayCR | **HIGH** |
| 37 | `may-coaching-memory.js` | `app/may/may-coaching-memory.js` | MayFF | **HIGH** |
| 38 | `may-coaching-orchestrator.js` | `app/may/may-coaching-orchestrator.js` | 13 modules | **HIGH** |
| 39 | `may-pilot-activation.js` | `app/may/may-pilot-activation.js` | 8 modules | **HIGH** |
| 40 | `may-effectiveness-scorer.js` | `app/may/may-effectiveness-scorer.js` | MayFF+MayTel | **HIGH** |

### 4.3 APP Files (2 files) — Move to `/app/`

| # | Current Path | Target Path | Risk |
|---|-------------|-------------|------|
| 41 | `app.js` | `app/app.js` | **CRITICAL** — main entry point; depends on ALL preceding globals |
| 42 | `scripts/output/admin_dashboard_data.js` | `app/admin/admin_dashboard_data.js` | **MEDIUM** — loaded by both HTML pages |

### 4.4 STAY at Root (13 files)

| File | Reason |
|------|--------|
| `index_updated.html` | Browser entry point — must stay at root |
| `admin.html` | Standalone admin — must stay at root |
| `styles.css` | Shared stylesheet |
| `main.js` | Electron entry |
| `package.json` | npm entry |
| `package-lock.json` | npm lock |
| `opencode.json` | IDE config |
| `AGENTS.md` | IDE standing instructions |
| `VERSION` | Version record |
| `.gitignore` | VCS |
| `launch.vbs` | User launcher |
| `CMA_Learning_Platform.lnk` | User shortcut |
| `CMA Learning Platform.lnk` | User shortcut |

### 4.5 LEGACY — Stay at root (build-tool dependencies)

| File | Reason |
|------|--------|
| `scored_cases.js` | 45 build-script references — deferred to S127 fix |
| `scored_cases2.js` | Same |
| `scored_cases3.js` | Same |
| `scored_cases4.js` | Same |
| `scored_cases5.js` | Same |

---

## 5. HTML Path Updates Required

### 5.1 index_updated.html — New Script Tags

```html
<!-- DATA: content packs -->
<script src="content/packs/pack_a_corrected.js"></script>
<script src="content/packs/pack_b_corrected.js"></script>
<script src="content/packs/pack_c_corrected.js"></script>
<script src="content/packs/pack_d_corrected.js"></script>
<script src="content/packs/pack_e_corrected.js"></script>

<!-- DATA: content cases -->
<script src="content/cases/case_pack_1_corrected.js"></script>
<script src="content/cases/case_pack_2_corrected.js"></script>
<script src="content/cases/case_pack_3_corrected.js"></script>

<!-- MAY: AI coaching layer -->
<script src="app/may/may-learner-state.js"></script>
<script src="app/may/may-feature-flags.js"></script>
<script src="app/may/may-telemetry.js"></script>
<script src="app/may/may-context-builder.js"></script>
<script src="app/may/may-coaching-router.js"></script>
<script src="app/may/modes/mode-base.js"></script>
<script src="app/may/modes/mode-explain.js"></script>
<script src="app/may/modes/mode-quiz.js"></script>
<script src="app/may/modes/mode-socratic.js"></script>
<script src="app/may/modes/mode-motivate.js"></script>
<script src="app/may/modes/mode-study-plan.js"></script>
<script src="app/may/modes/mode-exam-review.js"></script>
<script src="app/may/may-core.js"></script>
<script src="app/may/may-llm-types.js"></script>
<script src="app/may/may-llm-provider-registry.js"></script>
<script src="app/may/may-llm-adapter.js"></script>
<script src="app/may/may-learner-profile.js"></script>
<script src="app/may/may-adaptive-recommender.js"></script>
<script src="app/may/may-remediation-engine.js"></script>
<script src="app/may/may-readiness-scorer.js"></script>
<script src="app/may/may-readiness-engine.js"></script>
<script src="app/may/may-archetype-coach.js"></script>
<script src="app/may/may-intervention-prioritizer.js"></script>
<script src="app/may/may-recommendation-explainer.js"></script>
<script src="app/may/may-dashboard-model.js"></script>
<script src="app/may/may-decision-engine.js"></script>
<script src="app/may/may-intervention-coordinator.js"></script>
<script src="app/may/may-recommendation-pipeline.js"></script>
<script src="app/may/may-coaching-memory.js"></script>
<script src="app/may/may-coaching-orchestrator.js"></script>
<script src="app/may/may-pilot-activation.js"></script>
<script src="app/may/may-effectiveness-scorer.js"></script>

<!-- APP: main application -->
<script src="app/app.js"></script>
<script src="app/admin/admin_dashboard_data.js"></script>
```

### 5.2 admin.html — Updated Paths

```
styles.css           → (unchanged — at root)
admin_dashboard_data.js → app/admin/admin_dashboard_data.js
```

### 5.3 main.js — Updated Path

```
mainWindow.loadFile('index_updated.html')  → (unchanged — at root)
```

No change needed. `index_updated.html` stays at root.

---

## 6. Execution Plan — Phased Migration

### Phase A: Create Directory Structure (zero risk)

```powershell
New-Item -ItemType Directory -Force -Path "content\packs"
New-Item -ItemType Directory -Force -Path "content\cases"
New-Item -ItemType Directory -Force -Path "app\may\modes"
New-Item -ItemType Directory -Force -Path "app\admin"
```

### Phase B: Move DATA Files (lowest risk — no internal deps)

1. Copy 8 data files to `content/packs/` and `content/cases/`
2. Update `index_updated.html` lines 115-122
3. Verify: load index_updated.html in browser, check console for `MCQ_BANK_A` through `CASE_BANK_C`
4. Remove originals from root

### Phase C: Move MAY Modes (isolated, no inter-deps)

1. Copy 7 mode files to `app/may/modes/`
2. Update `index_updated.html` lines 128-134
3. Verify: May coaching panel loads
4. Remove `may-coaching-modes/` directory from root

### Phase D: Move MAY Standalone Files (no May-to-May deps)

1. Move `may-learner-state.js`, `may-llm-types.js`, `may-readiness-scorer.js` first
2. Verify: `typeof MayLearnerState !== 'undefined'` in console
3. Move remaining May files in dependency order

### Phase E: Move app.js (last — depends on everything)

1. Copy `app.js` to `app/app.js`
2. Update `index_updated.html` line 155
3. Verify: full application loads, MCQ banks available, May coach active
4. Remove original from root

---

## 7. Risk Mitigation

### Stop Condition: if any of these fail, roll back the entire phase

| Phase | Stop Condition |
|-------|---------------|
| B | `typeof MCQ_BANK_A === 'undefined'` in browser console |
| C | May mode registry has < 7 modes registered |
| D | `typeof May === 'undefined'` or any MayFeatureFlags consumer throws |
| E | `ExamSessionManager` not defined, or app fails to render |

### Rollback Per Phase

Each phase copies files before removing originals. Rollback = restore the HTML `<script>` paths to original values. Originals remain on disk until the phase is verified.

### Governance Protection

- Run `npm run preflight` after each phase
- Verify 66/66 governance guard PASS after each phase
- Do NOT change any file content — only paths
- Backup `index_updated.html` before each HTML edit

---

## 8. Post-Migration State

| Metric | Before (S126B) | After (S127) |
|--------|----------------|--------------|
| Root files | 52 | **~15** |
| Root directories | 20 | **~14** |
| Application directories | 0 | **3** (app/, content/, app/may/) |
| Runtime unchanged | — | **Yes** |
| Root clutter eliminated | — | **37 files moved to structured subdirectories** |

**Root after migration:**

```
Root:
  index_updated.html     ← entry point
  admin.html             ← standalone admin
  styles.css             ← shared styles
  main.js                ← Electron
  package.json, package-lock.json, opencode.json, .gitignore
  AGENTS.md, VERSION
  launch.vbs, CMA_*.lnk  ← launchers

  governance/            ← runtime safety
  knowledge/             ← governance docs
  reports/               ← active reports
  scripts/               ← build tooling
  archive/               ← history
  registry/              ← generated
  dev/                   ← dev tools
  foundation/, review/, docs/, ai/, assets/  ← reference
  p2/                    ← Part 2 planning
```

---

## 9. What This Does NOT Touch

| Category | Rationale |
|----------|-----------|
| `scored_cases1-5.js` | Needs S127 build-script ref fix first |
| `app.js` internal architecture | Monolithic file — splitting requires separate effort |
| `may-core.js` internal architecture | 377 KB monolith — splitting requires separate effort |
| `styles.css` | Could be split later into /ui |
| `admin.html` inline CSS | ~200 lines inline — could extract to separate file |
| `scripts/output/admin_dashboard_data.js` | Relocated to app/admin/ but content unchanged |
| `main.js` | Electron shell — already minimal |

---

## 10. Dependency Impact Cross-Reference

| Move | Files Touched | Script Tags Updated | Global Vars Unchanged | Test After Move |
|------|--------------|--------------------|-----------------------|-----------------|
| 8 data files → content/ | 8 pack files | 8 tags in HTML | Yes (MCQ_BANK_*, CASE_BANK_*) | `typeof MCQ_BANK_A` |
| 7 modes → app/may/modes/ | 7 mode files | 7 tags in HTML | Yes (registered via mode-base.js) | `MayCoachingModeBase._registry.size` |
| 25 May files → app/may/ | 25 May files | 21 tags in HTML | Yes (May, MayFeatureFlags, etc.) | `typeof May` + `MayFeatureFlags.ENABLED` |
| app.js → app/ | 1 file | 1 tag in HTML | Yes (ExamSessionManager) | DOM renders, MCQ bank loads |
| admin_data → app/admin/ | 1 file | 1 tag in HTML | Yes (window.__ADMIN_DATA__) | `typeof window.__ADMIN_DATA__` |
