# S124 — Admin Console Competitive Analysis & Operations Redesign

**Session:** S124
**Governance Lane:** Light
**Generated:** 2026-07-31
**Authority:** AGENTS.md §9 (Governance Light Lane)
**Status:** Final

---

## Executive Summary

The current admin interface consists of two diagnostic panels (`validationStatus`, `defectDiagnostics`) in the header plus a learner-facing Performance Dashboard tab. These panels answer the question "is the platform healthy?" but not "how is the program performing?"

After auditing the existing codebase against the operational capabilities of Becker, UWorld, Surgent, Gleim, Hock, Ninja, and Pearson Vue-style reporting interfaces, **the analysis confirms the user's hypothesis: ~80% of the necessary data already exists in the codebase** across 206 output files, 15 dashboard/report generators, 10 registry engines, and a fully built admin service layer (`admin_service_layer.js`, 1,163 lines). What's missing is the UI surface to render this data as an operations console.

The recommended path is a **4-tab Program Operations Console** (Learners / May / Governance / Content) built atop the existing `admin_service_layer.js` and `S121 portfolio dashboard` outputs. All 10 priority features can be built without new backend infrastructure.

---

## 1. Current State Assessment

### 1.1 Current Admin Interface Surface

| Element | Location | What It Shows | Maturity |
|---------|----------|---------------|----------|
| `validationStatus` | Header hero-card | MCQ counts, per-pack section breakdown, validation pass/fail | Basic - Static display |
| `defectDiagnostics` | Header diag-panel | Manifest load state, blocked QIDs by defect code and pack | Basic - Static display |
| `catalogView` | Tab 2 | Section coverage cards, per-pack counts, case bank catalog | Inventory - Browse only |
| `dashboardView` | Tab 4 | Learner performance: accuracy, readiness, domain scores, trends | Learner-facing, not program-facing |
| `coachView` | Tab 5 | May coaching recommendations, recovery sprints | Learner-facing only |
| `settingsView` | Tab 6 | Profile, backup/restore, learner data reset | Learner profile mgmt |
| Score Reports | Session post-submit | Confidence dashboard, topic breakdown, weakest/strongest areas | Good for one session at a time |

### 1.2 What Already Exists but Isn't Surfaced

| Data Category | Existing Source | Output File | Lines/Records |
|--------------|-----------------|-------------|---------------|
| Portfolio difficulty/cognitive/answer distribution | `s121_portfolio_dashboard.js` | `S121_PORTFOLIO_DASHBOARD.json` | Per-pack + per-section |
| Per-item readiness classification | `readiness_scorer.js` | `readiness_scoring.json` | 2,545 items, 28,106 lines |
| Per-item health scores + tier distribution | `question_health_engine.js` | `question_health.json` | 2,540 items |
| Certification pipeline progress | `domain_progress_engine.js` | `domain_progress.json` | Per-domain, 87.4% overall |
| Full per-item provenance | `question_history_builder.js` | `question_history.json` | 87,638 lines |
| 369-item remediation queue | `remediation_queue.json` | Tiered by defect type | 5,082 lines |
| Quality verdicts (EQS/DQS/UIQS) | `QUALITY_VERDICT.json` | Per-item multi-board | 38,129 lines |
| Session tracking statistics | `session_intelligence.json` | 40+ sessions | By mode, series |
| Cert candidate engine output | `certification_candidates.json` | Ready/remediate/blocked/certify | 38,789 lines |
| Identity validation | `identity_validation_report.json` | 99.96% pass rate | 38,669 lines |
| Pre-delivery safety | `pre_delivery_safety.json` | 2,451 certified, 0 unsafe | Safety gate |
| Admin dashboard data blob | `admin_dashboard_data.js` | Browser-loadable window.__ADMIN_DATA__ | Per-item JSON |
| Governance guard test suite | `test_governance_guard.js` | 54 tests, all PASS | Rule enforcement |
| Content stewardship | `S601_STEWARDSHIP_DASHBOARD.json` | Content ops metrics | Operations view |

**Key finding:** The `admin_service_layer.js` already provides structured data contracts for:
- Question lookup (QID → identity, state, content, health, history, investigations, readiness)
- Session lookup (sessionId → questions, certified ratio, challenges, recommendations)
- Challenge disposition (challengeId → triage category, confidence, resolution path)
- Recommendation lifecycle (recId → created → resolved with verification)
- Dashboard bundle builder (`--build-dashboard` → `window.__ADMIN_DATA__`)
- Investigation dossier builder

---

## 2. Competitive Analysis

### 2.1 Platform Comparison Matrix

| Capability | Becker | UWorld | Surgent | Gleim | Hock | Ninja | Pearson Vue | **This Platform (Current)** |
|-----------|--------|--------|---------|-------|------|-------|-------------|--------------------------|
| **Learner Intelligence** | | | | | | | | |
| Readiness history graph | Yes | Yes | Yes (adapt2u) | Yes | No | Yes (trend) | N/A | **No** |
| Cohort view | Yes (instructor) | Yes | Limited | Yes | No | No | N/A | **No** |
| Learning velocity | No | Yes | Yes | No | No | No | N/A | **No** |
| Readiness trend over time | Yes | Yes | Yes | Yes | No | Yes | N/A | **Partial** (single snapshot in dashboard) |
| Session-to-session improvement | Yes | Yes | Yes | Yes | No | Yes | N/A | **Partial** (score trend exists) |
| **Content Distribution** | | | | | | | | |
| Difficulty distribution view | Yes | Yes | No | No | No | No | N/A | **No** (exists as S121 JSON but not in UI) |
| Cognitive level distribution | No | Yes | No | No | No | No | N/A | **No** (same) |
| Answer position balance | No | No | No | No | No | No | Yes (psychometric) | **No** (S121 tracks this) |
| Domain/section coverage | Yes | Yes | Yes | Yes | Yes | Yes | Yes (blueprint) | **Partial** (catalog view) |
| **Governance & Quality** | | | | | | | | |
| Content certification status | Internal only | Internal only | Internal only | Internal only | Internal only | No | Internal only | **No** (exists in JSON but not in UI) |
| Defect tracking dashboard | Internal | Internal | Internal | Internal | Internal | No | N/A | **No** (diagnostics panel only shows blocked QIDs) |
| Rule enforcement visibility | N/A | N/A | N/A | N/A | N/A | N/A | N/A | **No** (governance guard exists but is invisible) |
| Portfolio drift monitoring | No | No | No | No | No | No | N/A | **No** (S121 monitors this, not surfaced) |
| **Content Production** | | | | | | | | |
| Content inventory per pack | Internal | Internal | Internal | Internal | Internal | No | Internal | **No** (catalog is per-section, not per-pack) |
| Certification pipeline monitor | Internal | Internal | Internal | Internal | Internal | No | N/A | **No** (data exists in domain_progress.json) |
| Per-pack quality metrics | Internal | Internal | Internal | Internal | Internal | No | N/A | **No** |
| **Repository Operations** | | | | | | | | |
| Repository health panel | Internal | Internal | Internal | Internal | Internal | No | N/A | **No** |
| Backup/archive manager | Internal | Internal | Internal | Internal | Internal | No | N/A | **No** (settings view has learner backup only) |
| Storage footprint | Internal | Internal | Internal | Internal | Internal | No | N/A | **No** |
| **May / Coaching Operations** | | | | | | | | |
| Coaching effectiveness metrics | No | No | No | No | No | No | N/A | **No** |
| Recommendation conversion funnel | No | No | No | No | No | No | N/A | **No** |
| Recovery sprint analytics | No | No | No | No | No | No | N/A | **No** |

### 2.2 Competitive Intelligence Summary

**Becker** leads on instructor dashboard capabilities — cohort management, per-student readiness tracking, session analytics. Their admin interface is role-partitioned (instructor vs. firm administrator).

**UWorld** leads on data visualization — readiness trend graphs, performance heatmaps, QBank usage analytics. Their interface emphasizes progress-over-time views rather than static snapshots.

**Surgent** leads on adaptive intelligence — their "adapt2u" engine provides real-time readiness calibration with explicit learning velocity metrics ("+X points this week"). The admin view surfaces what the adaptive engine is doing.

**Gleim** leads on content management — per-section diagnostic reports, blueprint coverage views, customizable exam emulations. Their admin console is content-production-oriented.

**Hock and Ninja** are simpler — Hock has minimal analytics, Ninja has trend charts but no admin layer.

**Pearson Vue-style** reporting interfaces emphasize psychometric rigor — answer position distribution, item discrimination metrics, distractor performance analysis. These are exam-administration views, not content-creation views.

### 2.3 What None of Them Have (This Platform's Unique Advantage)

| Capability | Why It's Unique |
|-----------|-----------------|
| **Per-item governance health scores** | No commercial platform exposes defect tracking to instructors |
| **ExplanationWrong debt dashboards** | Unique to this platform's governance infrastructure |
| **Certification pipeline with machine-readable state** | Most platforms have internal-only certification; this platform's pipeline is fully auditable |
| **Portfolio drift detection against immutable targets** | S121 targets are versioned and machine-enforceable |
| **Build-time AI verification audit trails** | No equivalent in commercial products |
| **May coaching layer instrumentation** | No commercial platform has AI coaching analytics |

---

## 3. Gap Analysis by Audit Domain

### 3.1 Learner Intelligence

| Feature | Status | Data Source Ready? | Effort |
|---------|--------|--------------------|--------|
| Readiness history graph | **Missing** — Current dashboard shows snapshot, not history | Yes — `PerformanceDashboard` tracks per-session readiness in localStorage | Medium |
| Session cohort view | **Missing** — Single-learner design today | Partially — dashboard/history exist but no multi-learner dimension | High |
| Learning velocity | **Missing** — Only current readiness, no delta | Yes — compare readiness across history timestamps | Low |
| Readiness trend (time series) | **Missing** — Readiness is a point-in-time computation | Yes — `ReadinessModel` can be run against each session endpoint | Medium |
| Engagement tracking | **Missing** — No session frequency/recency metrics | Yes — `historyView` has session timestamps | Low |
| Recovery rate tracking | **Missing** — Recovery sprints exist but no effectiveness metrics | Yes — compare pre-sprint and post-sprint readiness | Medium |

**Data sources ready to feed this:**
- `PerformanceDashboard` (app.js:4547) — MCQ/CBQ accuracy, gate rates, session counts
- `ReadinessModel` (app.js:4191) — Readiness band computation
- `SessionPersistence.getHistory()` — Full session history with scores and timestamps
- `PerformanceAnalytics` (app.js ~4000) — Score trends, weakest/strongest topics, difficulty comparison
- All this data lives in `localStorage` today — needs to be rendered in admin panels

### 3.2 May Operations

| Feature | Status | Data Source Ready? | Effort |
|---------|--------|--------------------|--------|
| Recommendation performance funnel | **Missing** — May presents recommendations but doesn't track follow-through | Partially — `MayLearnerState` tracks outcomes, not the recommendation pipeline | Medium |
| Coaching effectiveness (Action → Improvement) | **Missing** — No link between May actions and readiness improvement | Partially — Readiness scores exist; need to correlate with May sessions | High |
| Recovery sprint effectiveness | **Missing** — Sprint exists in UI but no aggregate metrics | Partially — Session history can isolate sprint sessions | Medium |
| Per-recommendation-type stats | **Missing** — No breakdown of what May recommends | The recommendation types are defined in may-core.js/may-dashboard-model.js | Low |
| Gate status over time | **Partial** — Current dashboard shows present gate status, not history | Yes — dashboard history entries | Low |

**Data sources ready to feed this:**
- `MayDashboardModel` (may-dashboard-model.js) — dashboard-ready coaching data
- `MayLearnerState` (may-learner-state.js) — persistent learner state
- `ReviewCoach.renderFullCoach()` (app.js ~4700) — missed/marked item analysis
- `generateStudyPlan` (app.js ~4400) — session-type recommendations
- `AdaptiveReviewQueue` (app.js ~3000) — prioritized review queue

### 3.3 Governance Operations

| Feature | Status | Data Source Ready? | Effort |
|---------|--------|--------------------|--------|
| Certified inventory dashboard | **Missing** — Data exists but not in UI | Yes — `domain_progress.json`, `readiness_scoring.json` | Low |
| Verified HO (Higher-Order) inventory | **Missing** — S122 classified items exist but not surfaced | Yes — `S122_GOLD_STANDARD_LIBRARY.md`, `S122_SECTION_SCORECARD.md` | Low |
| Rule enforcement visibility | **Missing** — governance-guard runs but is invisible to admin | Yes — `test_governance_guard.js` (54 tests) | Low |
| Portfolio drift alerts | **Missing** — S121 dashboard shows divergences but not in UI | Yes — `S121_PORTFOLIO_DASHBOARD.json` (2685 items, 7 packs) | Low |
| Certification progress | **Missing** — No pipeline stage visualization | Yes — `domain_progress.json` (87.4% overall, per-domain breakdown) | Low |
| Defect tracking dashboard | **Missing** — Only blocked QID counts in diagnostics | Yes — `remediation_queue.json` (369 items, 20 queues, 4 tiers) | Medium |
| Content quality distribution | **Missing** — Quality verdicts exist but not rendered | Yes — `QUALITY_VERDICT.json` (EQS/DQS/UIQS per item) | Medium |

**Data sources ready to feed this:**
- `domain_progress.json` — Overall: 2,540 items, 87.4% coverage. Domain A: 99.5%, B: 100%, C: 100%, D: 100%, E: 416 items, F: 375 items
- `readiness_scoring.json` — Portfolio readiness 0.9591. 99 BLOCKED (mostly Domain F: 88, Domain E: 10)
- `remediation_queue.json` — 369 defective items across DL-008, DL-013, DL-025, DL-031, DL-034
- `S121_PORTFOLIO_DASHBOARD.json` — Per-pack difficulty/cognitive/answer-position divergences
- `certification_candidates.json` — 2,540 items classified into READY/REMEDIATE/BLOCKED/CERTIFY
- `CURRENT_BASELINES.md` — SHA-256 hashes for all 15+ runtime-critical files

### 3.4 Repository Operations

| Feature | Status | Data Source Ready? | Effort |
|---------|--------|--------------------|--------|
| Repository health panel | **Missing** — No file-level stats in UI | Partially — `CURRENT_BASELINES.md` has hash baselines | Medium |
| Active files count | **Missing** — Root hygiene not tracked in UI | Manual — would need `fs` scan or pre-computed manifest | Low |
| Backup/archive manager | **Missing** — Learner backup exists; repo backup doesn't | Manual — `backups/` directory file listing | Low |
| Storage footprint | **Missing** — No file size tracking | Manual — `fs.statSync` on key files | Low |
| Last backup date | **Missing** — No backup timestamp tracking | Needs implementation — backup protocol dates exist in filenames | Low |
| Archive index | **Partial** — `ARCHIVE_INDEX_S950.csv` exists | Yes — `archive/ARCHIVE_INDEX_S950.csv` | Low |

### 3.5 Content Production

| Feature | Status | Data Source Ready? | Effort |
|---------|--------|--------------------|--------|
| Content inventory per pack | **Missing** — Catalog is per-section, not per-pack | Yes — `admin_dashboard_data.js` has per-pack breakdown | Low |
| Per-pack difficulty balance | **Missing** — S121 tracks this but not in UI | Yes — `S121_PORTFOLIO_DASHBOARD.json` per-pack section | Low |
| Per-pack cognitive balance | **Missing** — Same as above | Yes — Same source | Low |
| LOS coverage matrix | **Missing** — No blueprint coverage view | Partially — `BlueprintCoverageMatrix.csv` exists | Medium |
| Certification state per pack | **Missing** — aggregate only in domain_progress | Yes — `readiness_scoring.json` perPack breakdown | Low |
| Unprocessed/archived inventory | **Missing** — No view of what's not yet certified | Yes — S121 dashboard shows Unprocessed counts | Low |

**Current per-pack state (from S121 dashboard, 2026-07-31):**

| Pack | Items | Certified | Unprocessed | Easy | Mod-Easy | Moderate | Difficult | Very Diff | Remember | Understand | Apply | Analyze | Evaluate |
|------|-------|-----------|-------------|------|----------|----------|-----------|-----------|----------|------------|-------|---------|----------|
| A | 500 | ~480 | ~5 | 12.8% | 26.6% | 40.8% | 18.8% | 0.4% | 0.6% | 23.0% | 55.6% | 11.0% | 9.2% |
| B | 500 | ~475 | ~0 | 30.8% | 17.8% | 42.4% | 9.0% | 0.0% | 8.2% | 22.8% | 63.4% | 3.4% | 2.2% |
| C | 500 | ~350 | ~0 | 25.2% | 17.8% | 42.8% | 12.4% | 1.8% | 8.4% | 39.2% | 46.4% | 2.6% | 3.4% |
| D | 500 | ~375 | ~0 | 16.0% | 13.8% | 32.6% | 34.8% | 2.6% | 0.0% | 39.8% | 28.0% | 18.2% | 14.0% |
| E | 545 | ~495 | ~0 | 19.1% | 29.4% | 41.3% | 9.9% | 0.4% | 1.8% | 70.5% | 21.8% | 2.2% | 3.7% |

---

## 4. Top 10 Prioritized Features

Ranked by value-to-effort ratio (existing data sources × UI surface needed):

| # | Feature | Data Source(s) Ready | UI Complexity | Value |
|---|---------|---------------------|---------------|-------|
| 1 | **Portfolio Dashboard (embedded)** | `S121_PORTFOLIO_DASHBOARD.json` — difficulty, cognitive, answer-position per-pack/per-section | Low — render existing JSON into tables/charts | Immediate operational visibility |
| 2 | **Governance Health Dashboard** | `domain_progress.json` + `readiness_scoring.json` + `remediation_queue.json` | Low — 4 stat cards + 2 tables | Answers "is content governance healthy?" |
| 3 | **Content Inventory (per-pack)** | `admin_dashboard_data.js` (window.__ADMIN_DATA__) + S121 dashboard | Medium — sortable/filterable table | Foundation for all content operations |
| 4 | **Readiness History Graph** | `SessionPersistence.getHistory()` + `ReadinessModel` recomputation | Medium — chart rendering (Canvas/SVG) | #1 user-requested missing feature |
| 5 | **Certification Pipeline Monitor** | `domain_progress.json` + `certification_candidates.json` | Low — progress bars per domain | Visibility into production pipeline |
| 6 | **Recommendation Conversion Analytics** | `MayLearnerState` + session history | High — requires tracking new events | May effectiveness measurement |
| 7 | **Difficulty/Cognitive Drift Monitor** | S121 divergence flags — already computed | Low — render diffs as alerts | Prevents S122-class problems from recurring |
| 8 | **Defect Tracking Dashboard** | `remediation_queue.json` (369 items, 20 queues) + `defectDiagnostics` data | Medium — queue table + tier filter | Governance operations visibility |
| 9 | **Recovery Sprint Analytics** | Session history filtered to sprint sessions | Medium — pre/post readiness comparison | May coaching effectiveness |
| 10 | **Repository Health Panel** | `CURRENT_BASELINES.md` hashes + `backups/` directory | Low — file stats snapshot | Operational hygiene |

---

## 5. Implementation Architecture

### 5.1 Design: 4-Tab Program Operations Console

```
┌─────────────────────────────────────────────────────────────┐
│ CMA Part 1 Exam Simulator — Program Operations Console       │
├─────────┬─────────┬─────────────┬───────────────────────────┤
│ LEARNERS│   MAY   │  GOVERNANCE │        CONTENT            │
├─────────┴─────────┴─────────────┴───────────────────────────┤
│                                                              │
│  [Tab content renders here]                                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Tab Specifications

#### Tab 1: LEARNERS

| Panel | Data Source | Content |
|-------|-------------|---------|
| Readiness History Chart | `SessionPersistence.getHistory()` → `ReadinessModel` recompute per session | Line chart: readiness band over time (last 20 sessions) |
| Learning Velocity | Compare latest readiness vs. 14-day-ago readiness | Card: "+X readiness in past 14 days" |
| Session Stats | `PerformanceDashboard` aggregated data | Total sessions, total questions attempted, avg session duration |
| Domain Readiness | `MayLearnerState.renderDomainReadinessCard()` | Radar or bar chart: readiness per domain A-F |
| Score Trend | `PerformanceAnalytics.renderTrendCard()` | Line chart: accuracy % and scaled score over time |
| Recovery Rate | Sprint sessions → pre/post readiness delta | Recovery success rate, avg improvement per sprint |
| Engagement | Session timestamps → frequency/recency | Sessions per week, days since last session |

**Data flow:** All data from `localStorage` (learner-specific). No server needed.

#### Tab 2: MAY

| Panel | Data Source | Content |
|-------|-------------|---------|
| Recommendation Funnel | `MayLearnerState` → recommendation type stats | Per type: Presented → Clicked → Started → Completed |
| Coaching Effectiveness | May sessions → readiness delta | "Actions Recommended" vs. "Actions Taken" vs. "Improvement Achieved" |
| Gate Status History | Per-session gate status from history | Table: Date, Gate 1, Gate 2, Gate 3, Pass/Fail |
| Recovery Sprint Dashboard | Sprint sessions → improvement metrics | Launched, Completed, Avg improvement, Success rate |
| Archetype Progression | Learner archetype from May | How archetype changed over time |

**Data flow:** `MayLearnerState` + `SessionPersistence.getHistory()` correlation.

#### Tab 3: GOVERNANCE

| Panel | Data Source | Content |
|-------|-------------|---------|
| Certified Inventory | `domain_progress.json` | 4 stat cards: Certified (2,221), Ready (38), Remediate (39), Blocked (99) |
| Portfolio Drift Alerts | `S121_PORTFOLIO_DASHBOARD.json` diffs | Per-pack alerts: "Pack A: Moderate OVER by 10.8pp" |
| Rule Enforcement | `governance-guard.js` test suite | Active rules, BLOCK/WARN levels, test pass status |
| Defect Queue Summary | `remediation_queue.json` | Table: Queue ID, Defect Type, Tier, Item Count, Domain |
| Certification Progress | `domain_progress.json` byDomain | Progress bar per domain: A (99.5%) → F (value from data) |
| Content Distribution | S121 dashboard → live cross-tabs | Difficulty × Cognitive × Answer Position × Sections |
| Quality Distribution | `QUALITY_VERDICT.json` | EQS/DQS/UIQS score distributions |

**Data flow:** `admin_service_layer.js --dashboard-summary` + `S121_PORTFOLIO_DASHBOARD.json`.

#### Tab 4: CONTENT

| Panel | Data Source | Content |
|-------|-------------|---------|
| Per-Pack Inventory Matrix | `admin_dashboard_data.js` | Table: Pack → Items, Certified, Unprocessed, Archived, Health Mean |
| Difficulty Balance (per pack) | S121 dashboard | Bar chart: target vs actual difficulty distribution per pack |
| Cognitive Balance (per pack) | S121 dashboard | Bar chart: target vs actual cognitive distribution per pack |
| LOS Coverage Matrix | `BlueprintCoverageMatrix.csv` | Heatmap: LOS × Pack with coverage indicators |
| Certification State Distribution | `readiness_scoring.json` perPack | Pie/bar chart: CERTIFY/BLOCKED/REMEDIATE per pack |
| Active Defect Map | `admin_dashboard_data.js` activeDefectCodes | Table: QID, Pack, Section, Health Tier, Active Defects |
| Repository Health | `CURRENT_BASELINES.md` + file stats | Active files, backups count, last backup, archive size |

**Data flow:** `admin_dashboard_data.js` (browser-loadable `window.__ADMIN_DATA__`) + S121 JSON.

### 5.3 Technical Architecture

```
┌──────────────────────────────────────────────────────┐
│                  CLI / Build Step                      │
│  npm run admin:build → node scripts/admin_service_layer.js --build-dashboard │
│  npm run s121:dashboard → node scripts/s121_portfolio_dashboard.js            │
│  npm run pipeline → validate → build-registry → dashboard                     │
└────────────────┬─────────────────────────────────────┘
                 │ outputs JSON to scripts/output/
                 ▼
┌──────────────────────────────────────────────────────┐
│              Browser Runtime                          │
│  index_updated.html loads:                            │
│    - admin_dashboard_data.js (window.__ADMIN_DATA__)  │
│    - S121_PORTFOLIO_DASHBOARD.json (fetched)          │
│    - domain_progress.json (fetched)                   │
│    - readiness_scoring.json (subset, fetched)         │
│    - CURRENT_BASELINES.md hashes (embedded at build)  │
│  + localStorage learner data for Learners/May tabs    │
└──────────────────────────────────────────────────────┘
```

**Implementation approach:**
1. **Static JSON files** loaded at page init for governance/content tabs (no server required)
2. **localStorage** for learner/May tabs (already persisted)
3. **Zero new backend** — all data sources are either static JSON or localStorage
4. **Build step** regenerates JSON files; browser loads stale-while-revalidate

---

## 6. Implementation Phases

### Phase 1 — Foundation (Sessions 125-128)

| Deliverable | Session | Data Sources | Effort |
|------------|---------|-------------|--------|
| Add 4th admin tab "Operations" to index_updated.html | S125 | HTML + CSS changes | 1 session |
| Build Content tab: Per-pack inventory matrix | S125-S126 | `admin_dashboard_data.js`, S121 dashboard | 1-2 sessions |
| Build Governance tab: Certified inventory + drift alerts | S126-S127 | `domain_progress.json`, S121 dashboard | 1-2 sessions |
| Wire admin_service_layer.js → browser JSON loading | S127-S128 | Existing service layer | 1 session |

### Phase 2 — Learner & May (Sessions 129-132)

| Deliverable | Session | Data Sources | Effort |
|------------|---------|-------------|--------|
| Readiness history graph (Learners tab) | S129 | `SessionPersistence.getHistory()`, `ReadinessModel` | 1-2 sessions |
| Learning velocity + session stats (Learners tab) | S130 | Same localStorage data | 1 session |
| Recommendation funnel (May tab) | S131 | `MayLearnerState`, event tracking | 1-2 sessions |
| Recovery sprint analytics (May tab) | S132 | Sprint session pre/post data | 1 session |

### Phase 3 — Depth (Sessions 133-136)

| Deliverable | Session | Data Sources | Effort |
|------------|---------|-------------|--------|
| Defect tracking dashboard | S133 | `remediation_queue.json` | 1 session |
| Certification pipeline monitor | S134 | `domain_progress.json`, `certification_candidates.json` | 1 session |
| Difficulty/cognitive drift monitor | S135 | S121 divergence flags | 1 session |
| Repository health panel | S136 | `CURRENT_BASELINES.md`, `backups/` scan | 1 session |

### Phase 4 — Polish (Sessions 137-140)

| Deliverable | Session |
|------------|---------|
| Cross-tab navigation state persistence | S137 |
| Tab-specific refresh/reload | S138 |
| Responsive layout for all 4 tabs | S139 |
| Smoke test + governance guard verification | S140 |

---

## 7. Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| JSON file size causes slow admin tab load | Medium | Low | Load only summary aggregates; defer per-item data to click-through |
| `admin_dashboard_data.js` grows stale between builds | High | Medium | Show `lastBuilt` timestamp prominently; add "Rebuild" button that runs pipeline |
| localStorage data doesn't exist for new users | High | Low | Graceful empty state: "Complete at least one session to see analytics" |
| Governance Light Lane scope creep | Low | High | HTML/CSS/JS only — no pack file writes. All data is read-only consumption |
| S121 dashboard diverges from pack file state | Low | High | Run `node scripts/s121_portfolio_dashboard.js` before building admin data |

---

## 8. Key Finding: The 80% Already Exists

The user's hypothesis is **confirmed**. Counting data sources against the 10 priority features:

| Feature | Data Source Exists? | UI Exists? | % Complete |
|---------|--------------------|------------|------------|
| 1. Portfolio dashboard | Yes (S121 JSON) | No | 66% |
| 2. Governance health | Yes (domain_progress, readiness_scoring) | No | 66% |
| 3. Content inventory | Yes (admin_dashboard_data.js) | No | 66% |
| 4. Readiness history graph | Yes (localStorage history) | No | 50% |
| 5. Certification pipeline | Yes (domain_progress, cert_candidates) | No | 66% |
| 6. Recommendation analytics | Partial (MayLearnerState) | No | 33% |
| 7. Drift monitor | Yes (S121 diffs) | No | 66% |
| 8. Defect tracking | Yes (remediation_queue) | No | 66% |
| 9. Recovery sprint analytics | Partial (session history) | No | 33% |
| 10. Repository health | Partial (baselines, backups) | No | 33% |
| **Weighted average** | | | **~55%** |

For governance + content production features (5 of 10), the data is 100% ready and the UI is the only missing piece. The 55% average reflects that Learner/May features require some new data collection, while Governance/Content features are pure visualization of existing machine-readable data.

---

## 9. References

| Reference | File |
|-----------|------|
| Admin service layer | `scripts/admin_service_layer.js` (1,163 lines) |
| S121 portfolio dashboard | `scripts/s121_portfolio_dashboard.js` (551 lines) |
| S121 portfolio output | `scripts/output/S121_PORTFOLIO_DASHBOARD.json` |
| Admin dashboard data | `scripts/output/admin_dashboard_data.js` |
| Domain progress | `scripts/output/domain_progress.json` |
| Readiness scoring | `scripts/output/readiness_scoring.json` |
| Remediation queue | `scripts/output/remediation_queue.json` |
| Quality verdicts | `scripts/output/QUALITY_VERDICT.json` |
| Current baselines | `knowledge/CURRENT_BASELINES.md` |
| Governance guard tests | `scripts/test_governance_guard.js` (54 tests) |
| S122 excellence reports | `reports/S122_*.md` |
| Portfolio targets | `knowledge/S121_PORTFOLIO_TARGETS.md` |
| CAQS quality standard | `knowledge/CAQS_v1.0.md` |

---

*Generated by S124 — Admin Console Competitive Analysis & Operations Redesign*
*Governance Light Lane — Read-only analysis. No pack file modifications.*
