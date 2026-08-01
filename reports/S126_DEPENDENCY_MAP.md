# S126 Dependency Map

**Generated:** 2026-08-01
**Scope:** All root-level files, cross-referenced across the entire repository
**Methodology:** Runtime reference tracing (imports, requires, script tags, global variable checks)

---

## 1. Master Dependency Matrix — All Root Files

| # | File | Type | Runtime? | Referenced By | References (what it needs) |
|---|------|------|----------|---------------|---------------------------|
| 1 | `index_updated.html` | HTML entry | **Yes** — browser loads this | `main.js` (Electron), `launch.vbs`, `.lnk` shortcuts | 52 `<script>` tags + `styles.css` |
| 2 | `app.js` | Application | **Yes** — loaded by `index_updated.html` line 155 | `index_updated.html` only (runtime); 50+ audit scripts (build-time) | `MCQ_BANK_A`-`E`, `CASE_BANK_A`-`E`, `May`, `MayTelemetry`, `MayLearnerState`, `window._cmaDefectManifest`, `window._cmaDeliveryBlocklist` |
| 3 | `main.js` | Electron shell | **Yes** — via `package.json` `"main"` | `package.json` only | `index_updated.html` (loads directly), `app.js` globals (CMAProfileManager, GuidedTour), `assets/icon.png` |
| 4 | `admin.html` | Admin console | **Standalone** — opened directly in browser | None (no links to it exist) | `styles.css`, `scripts/output/admin_dashboard_data.js`, 5 JSON fetches |
| 5 | `styles.css` | Stylesheet | **Yes** — loaded by `index_updated.html` + `admin.html` | `index_updated.html`, `admin.html` | Nothing |
| 6 | `pack_a_corrected.js` | Data | **Yes** — `index_updated.html` line 115 | `index_updated.html` | Nothing (exports `MCQ_BANK_A`) |
| 7 | `pack_b_corrected.js` | Data | **Yes** — `index_updated.html` line 116 | `index_updated.html` | Nothing (exports `MCQ_BANK_B`) |
| 8 | `pack_c_corrected.js` | Data | **Yes** — `index_updated.html` line 117 | `index_updated.html` | Nothing (exports `MCQ_BANK_C`) |
| 9 | `pack_d_corrected.js` | Data | **Yes** — `index_updated.html` line 118 | `index_updated.html` | Nothing (exports `MCQ_BANK_D`) |
| 10 | `pack_e_corrected.js` | Data | **Yes** — `index_updated.html` line 119 | `index_updated.html` | Nothing (exports `MCQ_BANK_E`) |
| 11 | `case_pack_1_corrected.js` | Data | **Yes** — `index_updated.html` line 120 | `index_updated.html`, 8 build scripts | Nothing (exports `CASE_BANK_A`, `CASE_BANK_D`, etc.) |
| 12 | `case_pack_2_corrected.js` | Data | **Yes** — `index_updated.html` line 121 | `index_updated.html`, 6 build scripts | Nothing (exports `CASE_BANK_B`, `CASE_BANK_E`, etc.) |
| 13 | `case_pack_3_corrected.js` | Data | **Yes** — `index_updated.html` line 122 | `index_updated.html`, 4 build scripts | Nothing (exports `CASE_BANK_C`, etc.) |
| 14 | `scored_cases.js` | Data | **No** — NOT in `index_updated.html` | `app.js` (fallback only — `typeof ENHANCED_CASE_BANK_A !== 'undefined'`), build scripts | Nothing |
| 15 | `scored_cases2.js` | Data | **No** — NOT in `index_updated.html` | Same fallback path | Nothing |
| 16 | `scored_cases3.js` | Data | **No** — NOT in `index_updated.html` | Same fallback path | Nothing |
| 17 | `scored_cases4.js` | Data | **No** — NOT in `index_updated.html` | Same fallback path | Nothing |
| 18 | `scored_cases5.js` | Data | **No** — NOT in `index_updated.html` | Same fallback path | Nothing |
| 19 | `may-core.js` | May module | **Yes** — `index_updated.html` line 135 | `index_updated.html`, `app.js`, `may-pilot-activation.js`, `may-feature-flags.js`, `may-telemetry.js`, `may-context-builder.js` | `MayFeatureFlags`, `MayTelemetry`, `MayContextBuilder`, `MayCoachingRouter`, `MayArchetypeCoach`, `MayEffectivenessScorer`, `QUESTION_BANK` |
| 20 | `may-learner-state.js` | May module | **Yes** — `index_updated.html` line 123 | `index_updated.html`, `app.js`, 12 other May modules | Nothing (standalone) |
| 21 | `may-feature-flags.js` | May module | **Yes** — `index_updated.html` line 124 | `index_updated.html`, 18 other May modules | `May.config` |
| 22 | `may-telemetry.js` | May module | **Yes** — `index_updated.html` line 125 | `index_updated.html`, `may-core.js`, `may-coaching-router.js`, `may-coaching-orchestrator.js`, `may-pilot-activation.js`, `may-effectiveness-scorer.js` | `May.config` |
| 23 | `may-context-builder.js` | May module | **Yes** — `index_updated.html` line 126 | `index_updated.html`, `may-core.js`, `may-llm-adapter.js`, `may-coaching-router.js` | `May`, `MayLearnerState`, `MayFeatureFlags`, `QUESTION_BANK` |
| 24 | `may-coaching-router.js` | May module | **Yes** — `index_updated.html` line 127 | `index_updated.html`, `may-core.js`, `may-recommendation-pipeline.js` | `MayFeatureFlags`, `MayTelemetry`, `MayLearnerProfile` |
| 25 | `may-llm-types.js` | May module | **Yes** — `index_updated.html` line 136 | `index_updated.html`, `may-llm-adapter.js` | Nothing (standalone) |
| 26 | `may-llm-provider-registry.js` | May module | **Yes** — `index_updated.html` line 137 | `index_updated.html`, `may-llm-adapter.js` | `MayFeatureFlags` |
| 27 | `may-llm-adapter.js` | May module | **Yes** — `index_updated.html` line 138 | `index_updated.html` | `MayFeatureFlags`, `MayLLMTypes`, `MayLLMProviderRegistry` |
| 28 | `may-learner-profile.js` | May module | **Yes** — `index_updated.html` line 139 | `index_updated.html`, `may-coaching-router.js`, `may-coaching-orchestrator.js` | `MayLearnerState`, `MayFeatureFlags`, `MayAdaptiveRecommender` |
| 29 | `may-adaptive-recommender.js` | May module | **Yes** — `index_updated.html` line 140 | `index_updated.html`, `may-learner-profile.js`, `may-coaching-orchestrator.js`, `may-pilot-activation.js` | `MayLearnerState`, `MayFeatureFlags` |
| 30 | `may-remediation-engine.js` | May module | **Yes** — `index_updated.html` line 141 | `index_updated.html`, `may-coaching-orchestrator.js` | `MayLearnerState`, `MayFeatureFlags` |
| 31 | `may-readiness-scorer.js` | May module | **Yes** — `index_updated.html` line 142 | `index_updated.html` | `MayFeatureFlags` |
| 32 | `may-readiness-engine.js` | May module | **Yes** — `index_updated.html` line 143 | `index_updated.html`, `may-dashboard-model.js`, `may-coaching-orchestrator.js`, `may-pilot-activation.js` | `MayLearnerState`, `MayFeatureFlags` |
| 33 | `may-archetype-coach.js` | May module | **Yes** — `index_updated.html` line 144 | `index_updated.html`, `may-core.js` | `MayLearnerState` |
| 34 | `may-intervention-prioritizer.js` | May module | **Yes** — `index_updated.html` line 145 | `index_updated.html`, `may-recommendation-explainer.js`, `may-dashboard-model.js`, `may-decision-engine.js`, `may-intervention-coordinator.js`, `may-coaching-orchestrator.js` | `MayLearnerState`, `MayFeatureFlags` |
| 35 | `may-recommendation-explainer.js` | May module | **Yes** — `index_updated.html` line 146 | `index_updated.html`, `may-coaching-orchestrator.js` | `MayFeatureFlags`, `MayInterventionPrioritizer` |
| 36 | `may-dashboard-model.js` | May module | **Yes** — `index_updated.html` line 147 | `index_updated.html` | `MayLearnerState`, `MayFeatureFlags`, `MayInterventionPrioritizer`, `MayReadinessEngine` |
| 37 | `may-decision-engine.js` | May module | **Yes** — `index_updated.html` line 148 | `index_updated.html`, `may-coaching-orchestrator.js`, `may-pilot-activation.js` | `MayInterventionPrioritizer` |
| 38 | `may-intervention-coordinator.js` | May module | **Yes** — `index_updated.html` line 149 | `index_updated.html` | `MayLearnerState`, `MayInterventionPrioritizer` |
| 39 | `may-recommendation-pipeline.js` | May module | **Yes** — `index_updated.html` line 150 | `index_updated.html`, `may-coaching-orchestrator.js` | `MayCoachingRouter` |
| 40 | `may-coaching-memory.js` | May module | **Yes** — `index_updated.html` line 151 | `index_updated.html` | `MayFeatureFlags` |
| 41 | `may-coaching-orchestrator.js` | May module | **Yes** — `index_updated.html` line 152 | `index_updated.html`, `may-pilot-activation.js` | 13 other May modules (top-level orchestrator) |
| 42 | `may-pilot-activation.js` | May module | **Yes** — `index_updated.html` line 153 | `index_updated.html` | `May`, `MayFeatureFlags`, `MayLearnerState`, `MayTelemetry`, `MayCoachingOrchestrator`, `MayAdaptiveRecommender`, `MayReadinessEngine`, `MayDecisionEngine` |
| 43 | `may-effectiveness-scorer.js` | May module | **Yes** — `index_updated.html` line 154 | `index_updated.html`, `may-core.js` | `MayFeatureFlags`, `MayTelemetry` |
| 44 | `launch.vbs` | Windows launcher | **User-invoked** — double-click or .lnk | `CMA Learning Platform.lnk` | `index_updated.html` (opens it in browser) |
| 45 | `CMA_Learning_Platform.lnk` | Windows shortcut | **User-invoked** | None | `index_updated.html` (opens directly) |
| 46 | `CMA Learning Platform.lnk` | Windows shortcut | **User-invoked** | None | `launch.vbs` (invokes via `wscript.exe //B`) |
| 47 | `seed-profile.json` | Seed data | **No** — zero programmatic references | None | None (imported manually by user) |
| 48 | `package.json` | Node config | **Yes** — `npm` entry point | None | `main.js` (`"main"` field) |
| 49 | `package-lock.json` | Node config | **Dependency resolution** | None | npm registry |
| 50 | `opencode.json` | IDE config | **Yes** — IDE plugin registration | OpenCode IDE | `.opencode/` internal |
| 51 | `VERSION` | Version record | **No** | None | None |
| 52 | `AGENTS.md` | Governance | **No** — build-time instructions | None | None |
| 53 | `.gitignore` | Git config | **No** | Git | None |

---

## 2. Critical Files — Dependency Chains

### 2.1 app.js — The Application Core

```
app.js is the MAIN entry point (7,660 lines, 210 KB)

LOAD ORDER:
  index_updated.html (line 155) loads app.js AFTER 52 preceding <script> tags

WHAT app.js NEEDS TO RUN:
  ┌─ MCQ_BANK_A through MCQ_BANK_E (from 5 pack_*_corrected.js files)
  ├─ CASE_BANK_A through CASE_BANK_E (from 3 case_pack_*_corrected.js files)
  ├─ May global object (from may-core.js)
  ├─ MayLearnerState (from may-learner-state.js)
  ├─ MayTelemetry (from may-telemetry.js)
  ├─ window._cmaDefectManifest (from governance/DEFECT_MANIFEST_DL008_DL026.json)
  ├─ window._cmaDeliveryBlocklist (from governance/delivery_blocklist.js)
  └─ styles.css (from link tag in HTML)

WHAT LOADS app.js:
  ┌─ index_updated.html (line 155) — RUNTIME, sole loader
  ├─ main.js (indirectly — loads index_updated.html)
  ├─ launch.vbs (indirectly — opens index_updated.html)
  └─ .lnk shortcuts (indirectly — open index_updated.html)

ARCHITECTURE:
  No ES module imports. No require() calls.
  Pure global-variable-based architecture.
  All dependencies are provided by <script> tags that precede it in the HTML.
```

### 2.2 index_updated.html — The Entry Point

```
WHAT LOADS index_updated.html:
  ┌─ Browser (direct open) ← User double-clicks file
  ├─ main.js (Electron) ← npm run electron
  ├─ launch.vbs ← wscript.exe //B launch.vbs
  └─ .lnk shortcuts ← User double-clicks shortcut

WHAT index_updated.html LOADS (in order):
  Line 7:    styles.css
  Line 115:  pack_a_corrected.js  → MCQ_BANK_A
  Line 116:  pack_b_corrected.js  → MCQ_BANK_B
  Line 117:  pack_c_corrected.js  → MCQ_BANK_C
  Line 118:  pack_d_corrected.js  → MCQ_BANK_D
  Line 119:  pack_e_corrected.js  → MCQ_BANK_E
  Line 120:  case_pack_1_corrected.js → CASE_BANK_A, CASE_BANK_D
  Line 121:  case_pack_2_corrected.js → CASE_BANK_B, CASE_BANK_E
  Line 122:  case_pack_3_corrected.js → CASE_BANK_C
  Line 123:  may-learner-state.js     → MayLearnerState
  Line 124:  may-feature-flags.js     → MayFeatureFlags
  Line 125:  may-telemetry.js         → MayTelemetry
  Line 126:  may-context-builder.js   → MayContextBuilder
  Line 127:  may-coaching-router.js   → MayCoachingRouter
  Lines 128-134: may-coaching-modes/mode-*.js (7 files) → registered coaching modes
  Line 135:  may-core.js              → May (master object)
  Line 136:  may-llm-types.js         → MayLLMTypes
  Line 137:  may-llm-provider-registry.js → MayLLMProviderRegistry
  Line 138:  may-llm-adapter.js       → MayLLMAdapter
  Line 139:  may-learner-profile.js   → MayLearnerProfile
  Line 140:  may-adaptive-recommender.js → MayAdaptiveRecommender
  Line 141:  may-remediation-engine.js   → MayRemediationEngine
  Line 142:  may-readiness-scorer.js     → MayReadinessScorer
  Line 143:  may-readiness-engine.js     → MayReadinessEngine
  Line 144:  may-archetype-coach.js      → MayArchetypeCoach
  Line 145:  may-intervention-prioritizer.js → MayInterventionPrioritizer
  Line 146:  may-recommendation-explainer.js → MayRecommendationExplainer
  Line 147:  may-dashboard-model.js      → MayDashboardModel
  Line 148:  may-decision-engine.js      → MayDecisionEngine
  Line 149:  may-intervention-coordinator.js → MayInterventionCoordinator
  Line 150:  may-recommendation-pipeline.js → MayRecommendationPipeline
  Line 151:  may-coaching-memory.js      → MayCoachingMemory
  Line 152:  may-coaching-orchestrator.js → MayCoachingOrchestrator
  Line 153:  may-pilot-activation.js    → (IIFE, no global export)
  Line 154:  may-effectiveness-scorer.js → MayEffectivenessScorer
  Line 155:  app.js                     → ExamSessionManager
  Line 155:  scripts/output/admin_dashboard_data.js → window.__ADMIN_DATA__
```

### 2.3 main.js — The Electron Desktop Shell

```
main.js (155 lines) creates a BrowserWindow and loads index_updated.html.

WHAT IT REFERENCES:
  index_updated.html  — loadFile('index_updated.html')
  app.js              — executes .executeJavaScript() to call functions in app.js
  assets/icon.png     — window icon

WHAT REFERENCES IT:
  package.json        — "main": "main.js" (the only reference)

RUN BY:
  npm run electron    → node_modules/.bin/electron .
```

### 2.4 admin.html — The Standalone Admin Console

```
admin.html (1,427 lines, 87 KB) is opened directly in a browser.

WHAT IT LOADS:
  styles.css                              — shared stylesheet
  scripts/output/admin_dashboard_data.js  — shared data bundle (also loaded by index_updated.html)

WHAT IT FETCHES (runtime):
  scripts/output/domain_progress.json
  scripts/output/S121_PORTFOLIO_DASHBOARD.json
  scripts/output/pre_delivery_safety.json
  scripts/output/readiness_scoring.json
  scripts/output/remediation_queue.json

WHAT IT READS FROM localStorage:
  cmaProfile2026, cmaMayLearnerState, cmaMayFeatureFlags, cmaGovHealthHistory

WHAT LOADS IT:
  NOTHING. No file links to admin.html.
  Accessed by typing the URL directly in a browser.

RELATIONSHIP TO MAY:
  admin.html does NOT load any May modules.
  It reimplements May dashboard rendering independently (inlined JavaScript).
  It reads May data from localStorage but does not participate in the coaching pipeline.
```

---

## 3. May Module Dependency Graph

```
                  index_updated.html (loads all 25 in order)
                          │
        ┌─────────────────┼──────────────────┐
        │                 │                  │
  [Data packs]     [May Layer]          [app.js]
  (8 files)        (25 + 7 files)       (consumes May)

May internal dependency graph (order is load order):

may-learner-state.js [9th]  ←── STANDALONE (no deps)
        │
may-feature-flags.js [10th] ←── depends on May.config
        ├─┐
        │ ├─ may-telemetry.js [11th]
        │ ├─ may-context-builder.js [12th] → May + MayLS + MayFF + QUESTION_BANK
        │ ├─ may-coaching-router.js [13th] → MayFF + MayTel + MayLP
        │ │
        │ │  [may-coaching-modes/] [14-20th] ←── 7 mode files loaded from subdirectory
        │ │
        │ └─── may-core.js [21st] ←── ARCHITECTURAL ROOT
        │         ├─ may-llm-types.js [22nd] (standalone)
        │         ├─ may-llm-provider-registry.js [23rd] → MayFF
        │         ├─ may-llm-adapter.js [24th] → MayFF + MayLLMT + MayLLMPR
        │         ├─ may-learner-profile.js [25th] → MayFF + MayLS + MayAR
        │         ├─ may-adaptive-recommender.js [26th] → MayFF + MayLS
        │         ├─ may-remediation-engine.js [27th] → MayFF + MayLS
        │         ├─ may-readiness-scorer.js [28th] → MayFF
        │         ├─ may-readiness-engine.js [29th] → MayFF + MayLS
        │         ├─ may-archetype-coach.js [30th] → MayLS (most isolated — only referenced by may-core.js)
        │         ├─ may-intervention-prioritizer.js [31st] → MayFF + MayLS
        │         ├─ may-recommendation-explainer.js [32nd] → MayFF + MayIP
        │         ├─ may-dashboard-model.js [33rd] → MayFF + MayLS + MayIP + MayREng
        │         ├─ may-decision-engine.js [34th] → MayIP
        │         ├─ may-intervention-coordinator.js [35th] → MayLS + MayIP
        │         ├─ may-recommendation-pipeline.js [36th] → MayCR
        │         ├─ may-coaching-memory.js [37th] → MayFF
        │         ├─ may-coaching-orchestrator.js [38th] → 13 modules (TOP ORCHESTRATOR)
        │         ├─ may-pilot-activation.js [39th] → 8 modules (ACTIVATION)
        │         └─ may-effectiveness-scorer.js [40th] → MayFF + MayTel
        │
        └────────────────────────────────────

HUB FILES (most referenced):
  may-feature-flags.js:        referenced by 18 other May files
  may-learner-state.js:        referenced by 12 other May files + app.js
  may-core.js:                 referenced by 4 May files + app.js

STANDALONE FILES (no May deps):
  may-learner-state.js, may-llm-types.js

ALL DEPENDENCIES use `typeof X !== 'undefined'` guards — graceful degradation guaranteed.
```

---

## 4. May Coaching Modes (may-coaching-modes/)

| File | Type | Purpose |
|------|------|---------|
| `mode-base.js` | Registry + dispatch infrastructure | `MayCoachingModeBase.registerMode()` + `dispatch()` |
| `mode-explain.js` | Coaching mode — Explain | Concept explanation with structured response |
| `mode-quiz.js` | Coaching mode — Quiz | Adaptive quiz generation from question bank |
| `mode-socratic.js` | Coaching mode — Socratic | Socratic questioning for deeper understanding |
| `mode-motivate.js` | Coaching mode — Motivate | Motivational coaching and encouragement |
| `mode-study-plan.js` | Coaching mode — Study Plan | Personalized study plan generation |
| `mode-exam-review.js` | Coaching mode — Exam Review | Exam performance review and analysis |

**Runtime status:** ACTIVE. Loaded by `index_updated.html` lines 128-134. Registered at load time via `registerMode()`. Dispatched by `may-coaching-router.js`.

---

## 5. Governance Files — Runtime vs Build-Time

### 5.1 Runtime (loaded by index_updated.html or fetched at runtime)

| File | Where Loaded | Purpose |
|------|-------------|---------|
| `governance/delivery_blocklist.js` | `index_updated.html` (pre-app.js) | `window._cmaDeliveryBlocklist` — 117 QIDs excluded from delivery |
| `governance/DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` | `app.js` line 1074 (fetch) | Runtime blocklist for session assembly + similarity families |
| `governance/DEFECT_MANIFEST_DL008_DL026.json` | `app.js` line 1095 (fallback fetch), `may-core.js` line 122 (fetch) | Defect manifest for delivery gating + May recommendation gating |
| `governance/defect_manifest.js` | `index_updated.html` (pre-app.js) | `window._cmaDefectManifest` — lightweight subset for May gating |

### 5.2 Build-Time (documentation / planning / config)

| File | Purpose |
|------|---------|
| `governance/REPOSITORY_RULES.md` | Repository organization rules, batch limits, hygiene checks |
| `governance/AGENTS_AND_SESSION_TYPES.md` | Session type definitions, agent roles, authorization |
| `governance/DEFECT_MANIFEST_DL008_DL026.md` | Human-readable 5-wave remediation plan for 722 items |

---

## 6. Unknown / Unclassified Files

| File | Status | Risk If Moved/Deleted | Recommendation |
|------|--------|-----------------------|----------------|
| `seed-profile.json` | **DORMANT** — zero programmatic references | Low (not auto-loaded) | Move to `scripts/output/` or keep as reference |
| `launch.vbs` | **USER-ACTIVATED** — not programmatic | Medium (breaks .lnk shortcut) | Keep at root (portable launcher) |
| `CMA_Learning_Platform.lnk` | **USER-FILE** — Windows shortcut | Low (user can recreate) | Keep at root |
| `CMA Learning Platform.lnk` | **USER-FILE** — Windows shortcut | Low (user can recreate) | Keep at root |
| `scored_cases.js` through `scored_cases5.js` | **LEGACY** — not loaded at runtime | Low (app.js has fallback path, but it's unreachable since these aren't loaded) | Archive; keep accessible to legacy build scripts |

---

## 7. Files Referenced by Multiple Consumers (Shared Infrastructure)

| File | Consumers |
|------|-----------|
| `styles.css` | `index_updated.html` + `admin.html` |
| `scripts/output/admin_dashboard_data.js` | `index_updated.html` + `admin.html` |
| `QUESTION_BANK` (global concept) | `app.js` + `may-core.js` + `may-context-builder.js` |
| `cmaProfile2026` (localStorage) | `app.js` + `admin.html` |
| `cmaMayLearnerState` (localStorage) | `app.js` + `admin.html` |
| `window._cmaDefectManifest` | `app.js` (delivery gating) + `may-core.js` (May recommendation gating) |

---

## 8. Summary Statistics

| Category | Count |
|----------|-------|
| Total root files | 53 |
| Runtime-critical (loaded by index_updated.html) | 42 |
| Standalone pages | 1 (admin.html) |
| Electron shell | 1 (main.js) |
| User-invoked launchers | 3 (launch.vbs + 2 .lnk) |
| Dormant (not loaded or referenced) | 1 (seed-profile.json) |
| Legacy (not in runtime load) | 5 (scored_cases*.js) |
| Config files | 4 (package.json, package-lock.json, opencode.json, .gitignore) |
| 25 May modules depend on may-feature-flags.js | 18 |
| 25 May modules are standalone | 2 |
| Files shared between index_updated.html and admin.html | 2 |
| External URLs hardcoded in app.js | 5 |
| Script tags in index_updated.html | 52 |
