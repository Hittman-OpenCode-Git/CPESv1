# S134_DATA_CONTRACTS.md — Dashboard Data Contract Extraction

**Session:** S134 (Phase 1)
**Governance Lane:** Light
**Generated:** 2026-08-01
**Purpose:** Single-source-of-truth catalog of every data field the Governance, Portfolio, and Repository dashboards will consume.

---

## 1. Source Inventory

| # | Source File | Generator Script | Format | Lines/Records | Owner Subsystem |
|---|------------|-----------------|--------|---------------|-----------------|
| 1 | `scripts/output/S121_PORTFOLIO_DASHBOARD.json` | `scripts/s121_portfolio_dashboard.js` | JSON | 1,473 lines | Portfolio Governance |
| 2 | `scripts/output/domain_progress.json` | `scripts/domain_progress_engine.js` | JSON | 437 lines | Certification Pipeline |
| 3 | `scripts/output/readiness_scoring.json` | `scripts/readiness_scorer.js` | JSON | 28,106 lines | Readiness Scorer |
| 4 | `app/admin/admin_dashboard_data.js` | `scripts/admin_service_layer.js --build-dashboard` | JS (window var) | 1 line | Admin Service Layer |
| 5 | `reports/S123_AFTER_REPORT.md` | Manual (S123 audit) | Markdown | 238 lines | Repository Operations |

---

## 2. Contract: S121_PORTFOLIO_DASHBOARD.json

**Generator:** `npm run pipeline` → `s121_portfolio_dashboard.js`
**Refresh frequency:** Every content wave (S121 cadence — per AGENTS.md §17.2)
**Owner:** Portfolio Governance

### 2.1 Top-Level Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `generated` | string (ISO) | Build timestamp | `"2026-07-31 21:31:54"` |
| `session` | string | Generator session ID | `"S121"` |
| `pools` | object | Pool-level aggregates (part1/part2) | see §2.2 |
| `packs` | array[object] | Per-pack distributions | see §2.3 |

### 2.2 pools.part1 / pools.part2

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `label` | string | Pool label | `"Part 1"` |
| `totalItems` | integer | Total items in pool | `2545` |
| `certified` | integer | Certified items | `2451` |
| `unprocessed` | integer | Unprocessed items | `5` |
| `difficulty.*` | integer | Count per difficulty label | `"Easy": 528` |
| `cognitive.*` | integer | Count per cognitive label | `"Apply": 1086` |
| `correctChoice.*` | integer | Count per answer position | `"A": 635` |

**Valid difficulty labels:** `Easy`, `Moderate-Easy`, `Moderate`, `Difficult`, `Very Difficult`, `(missing)`

**Valid cognitive labels:** `Remember`, `Understand`, `Apply`, `Analyze`, `Evaluate`, `(missing)`

**Valid correctChoice labels:** `A`, `B`, `C`, `D`

### 2.3 packs[N]

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `name` | string | Pack display name | `"Pack A"` |
| `part` | string | Pool label | `"Part 1"` |
| `file` | string | Source filename | `"pack_a_corrected.js"` |
| `totalItems` | integer | Items in pack | `500` |
| `itemsScanned` | integer | Items successfully scanned | `500` |
| `certified` | integer | Certified items | `500` |
| `unprocessed` | integer | Unprocessed items | `0` |
| `difficulty.*` | integer | Count per difficulty label | see §2.2 |
| `cognitive.*` | integer | Count per cognitive label | see §2.2 |
| `correctChoice.*` | integer | Count per answer position | see §2.2 |
| `bySection.*` | object | Per-section distributions keyed by section letter | see §2.4 |

### 2.4 packs[N].bySection.{A..F}

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `difficulty.*` | integer | Count per difficulty label | `"Difficult": 13` |
| `cognitive.*` | integer | Count per cognitive label | `"Apply": 73` |
| `correctChoice.*` | integer | Count per answer position | `"A": 25` |

**Note:** Some sections may have `"(missing)"` entries for difficulty and cognitive fields (unlabeled items).

### 2.5 Portfolio Drift Computation

Portfolio drift is computed by comparing S121 difficulty/cognitive/answer-position distributions against immutable targets in `knowledge/S121_PORTFOLIO_TARGETS.md`. The dashboard must:
1. Read the S121 targets document for each dimension's target percentages
2. Compute actual % by dividing each count by `totalItems` (pack level) or section total
3. Flag any dimension where `|actual% - target%| > tolerance`

**Drift computation is presentation-layer only.** Targets are immutable (AGENTS.md §17.1).

---

## 3. Contract: domain_progress.json

**Generator:** `scripts/domain_progress_engine.js`
**Refresh frequency:** Every pipeline run (`npm run pipeline`)
**Owner:** Certification Pipeline

### 3.1 Top-Level Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `specId` | string | Build spec identifier | `"SESSION850_DOMAIN_PROGRESS_SPEC"` |
| `board` | string | Pipeline board | `"D"` |
| `generatedTimestamp` | string (ISO 8601) | Build timestamp | `"2026-07-27T13:50:24.531Z"` |
| `overall` | object | Pool-wide aggregates | see §3.2 |
| `byDomain` | object | Per-domain (A-F) aggregates | see §3.3 |
| `byPack` | object | Per-pack aggregates | see §3.4 |
| `bySection` | array[object] | Per-pack-section aggregates | see §3.5 |

### 3.2 overall

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `totalItems` | integer | Total items in pipeline | `2540` |
| `certified` | integer | Certified items | `2221` |
| `ready` | integer | Ready for certification | `38` |
| `remediate` | integer | Requires remediation | `39` |
| `blocked` | integer | Blocked by defect | `0` |
| `archived` | integer | Archived items | `242` |
| `unprocessed` | integer | Unprocessed items | `0` |
| `coveragePct` | number | Certified / totalItems × 100 | `87.4` |

### 3.3 byDomain.{A..F}

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `domainName` | string | Full domain name | `"Internal Controls"` |
| `certified` | integer | Certified items in domain | `248` |
| `ready` | integer | Ready for certification | `38` |
| `remediate` | integer | Requires remediation | `0` |
| `blocked` | integer | Blocked by defect | `0` |
| `archived` | integer | Archived items | `129` |
| `total` | integer | Total items in domain | `415` |
| `coveragePct` | number | Certified / total × 100 | `59.8` |
| `remainingToCertify` | integer | Ready + remediate + blocked | `38` |

### 3.4 byPack.{pack_a..pack_e}

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `certified` | integer | Certified items in pack | `481` |
| `ready` | integer | Ready for certification | `0` |
| `remediate` | integer | Requires remediation | `0` |
| `blocked` | integer | Blocked by defect | `0` |
| `archived` | integer | Archived items | `19` |
| `unprocessed` | integer | Unprocessed items | `0` |
| `total` | integer | Total items in pack | `500` |
| `coveragePct` | number | Certified / total × 100 | `96.2` |

### 3.5 bySection[N]

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `pack` | string | Parent pack | `"pack_a"` |
| `section` | string | Section letter A-F | `"E"` |
| `certified` | integer | Certified items | `58` |
| `ready` | integer | Ready for certification | `0` |
| `remediate` | integer | Requires remediation | `0` |
| `blocked` | integer | Blocked by defect | `0` |
| `archived` | integer | Archived items | `17` |
| `total` | integer | Total items in section | `75` |

---

## 4. Contract: readiness_scoring.json

**Generator:** `scripts/readiness_scorer.js`
**Refresh frequency:** Every pipeline run
**Owner:** Readiness Scorer (Board F)

### 4.1 Top-Level Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `sessionId` | string | Generator session | `"S322"` |
| `timestamp` | string (ISO 8601) | Build timestamp | `"2026-07-28T22:54:29.773Z"` |
| `portfolioReadiness` | object | Pool-wide readiness | see §4.2 |
| `perDomain` | object | Per-domain (A-F, ?) readiness | see §4.3 |
| `perPack` | object | Per-pack readiness | see §4.4 |
| `items` | array[object] | Per-item readiness (full, 2,545 entries) | see §4.5 |

### 4.2 portfolioReadiness

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `readinessScore` | string | Pool readiness ratio | `"0.9591"` |
| `readinessStatus` | string | Overall readiness label | `"READY"` |
| `byState.BLOCKED` | integer | Items blocked | `99` |
| `byState.REMEDIATE` | integer | Items needing remediation | `5` |
| `byState.READY` | integer | Items ready for certification | `0` |
| `byState.CERTIFY` | integer | Items eligible for certification | `2441` |

### 4.3 perDomain.{A..F, ?}

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `total` | integer | Items in domain | `375` |
| `ready` | integer | Ready state | `286` |
| `blocked` | integer | Blocked state | `88` |
| `remediate` | integer | Remediate state | `1` |
| `certify` | integer | Certify state | `0` |
| `readinessScore` | string | Domain readiness ratio | `"0.7627"` |

**Note:** Domain `"?"` appears for items with unparseable domain data (1 item, blocked).

### 4.4 perPack.{pack_a..pack_e}

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `total` | integer | Items in pack | `500` |
| `BLOCKED` | integer | Blocked count | `55` |
| `REMEDIATE` | integer | Remediate count | `0` |
| `READY` | integer | Ready count | `0` |
| `CERTIFY` | integer | Certify count | `445` |

### 4.5 items[N]

Per-item record in the full 2,545-item array. **The dashboard will NOT iterate this array** — it will consume only the aggregate fields in §4.2-§4.4 for the Governance/Portfolio dashboards. The `items[]` array is referenced here for completeness.

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `qid` | string | Question ID | `"P1-A-001"` |
| `pack` | string | Parent pack | `"pack_a"` |
| `section` | string | Section letter | `"A"` |
| `domain` | string | Domain letter | `"A"` |
| `compoundKey` | string | Composite identity key | `"P1-A-001\|C\|1101\|..."` |
| `readinessState` | string | One of: `CERTIFY`, `BLOCKED`, `REMEDIATE`, `READY` | `"CERTIFY"` |
| `blockReason` | string | Block reason (empty if not BLOCKED) | `""` |
| `transitionPath` | string | State transition description | `"Already Certified"` |
| `eligibleForCertification` | boolean | Cert eligibility flag | `false` |

---

## 5. Contract: admin_dashboard_data.js

**Generator:** `npm run admin:build` → `scripts/admin_service_layer.js --build-dashboard`
**Refresh frequency:** Manual (re-run build step)
**Owner:** Admin Service Layer

### 5.1 metadata

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `buildTimestamp` | string (ISO 8601) | Build timestamp | `"2026-07-27T21:55:50.854Z"` |
| `certifiedCount` | integer | Total certified items | `2221` |
| `totalQids` | integer | Total QIDs indexed | `2540` |
| `certifiedRatio` | number | certifiedCount / totalQids | `0.8744` |
| `governanceGuardStatus` | string | Guard test status | `"PASS 32/32"` |

### 5.2 questionIndex.{QID}

Per-item record keyed by QuestionID. Fields:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `questionId` | string | Question ID (key) | `"P1-A-001"` |
| `pack` | string | Parent pack | `"pack_a"` |
| `section` | string | Section letter A-F | `"A"` |
| `sectionName` | string | Full domain name | `"External Financial Reporting Decisions"` |
| `topic` | string | Topic description | `"A.001 balance sheet current classification"` |
| `cognitiveLevel` | string | Bloom's level | `"Remember"` |
| `difficulty` | string | Difficulty label | `"Easy"` |
| `difficultyScore` | integer | Difficulty score 1-5 | `1` |
| `questionState` | string | Governance state | `"Certified"` |
| `certificationDate` | string\|null | Cert date (null for legacy) | `null` |
| `certificationBatch` | string\|null | Cert batch ID | `null` |
| `healthScore` | integer | Item health score | `89` |
| `healthTier` | string | Health tier label | `"FAIR"` |
| `challengeCount` | integer | Times challenged | `1` |
| `investigationCount` | integer | Investigations opened | `0` |
| `recommendationCount` | integer | Recommendations | `0` |
| `activeDefectCodes` | array[string] | Active defect IDs | `[]` |
| `readinessTier` | string | Readiness tier | `"UNKNOWN"` |

---

## 6. Contract: S123 Repository Metrics

**Source:** `reports/S123_AFTER_REPORT.md` (manual snapshot)
**Refresh frequency:** Manual (re-audit)
**Owner:** Repository Operations

### 6.1 Global Metrics

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `totalFiles` | integer | Total files (excl. node_modules/.git) | `4876` |
| `totalSizeMB` | number | Total size in MB | `1053` |
| `rootFiles` | integer | Root-level file count | `49` |
| `rootBakFiles` | integer | Root .bak files | `0` |

### 6.2 reports/ Directory

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `reportsTotalFiles` | integer | File count in reports/ | `1386` |
| `reportsTotalSizeMB` | number | Size in MB | `23.62` |
| `reportsSubdirs` | integer | Active subdirectories | `3` |

### 6.3 knowledge/ Directory

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `knowledgeTotalFiles` | integer | File count in knowledge/ | `37` |
| `knowledgeBakFiles` | integer | .bak files removed | `43` |
| `knowledgeActiveDocs` | integer | Active core documents | `37` |

### 6.4 backups/ Directory

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `backupsTotalFiles` | integer | File count in backups/ | `826` |
| `backupsTotalSizeMB` | number | Size in MB | `861.9` |

### 6.5 archive/ Directory

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `archiveTotalFiles` | integer | File count in archive/ | `1039` |
| `archiveTotalSizeMB` | number | Size in MB | `107.9` |
| `archiveZipCount` | integer | Compressed archive packages | `12` |
| `archiveCatalogPresent` | boolean | ARCHIVE_CATALOG.md exists | `true` |

---

## 7. Cross-Source Dependencies

### 7.1 Refresh Chain

```
npm run pipeline
  ├── npm run validate
  ├── npm run build-registry
  │     └── generate_registry.js → CURRENT_BASELINES.md
  └── npm run dashboard
        ├── domain_progress_engine.js → domain_progress.json
        ├── readiness_scorer.js → readiness_scoring.json
        └── s121_portfolio_dashboard.js → S121_PORTFOLIO_DASHBOARD.json

npm run admin:build
  └── admin_service_layer.js --build-dashboard → admin_dashboard_data.js
```

### 7.2 Overlapping Fields (Validation Check)

Fields reported by multiple sources. Must cross-check for divergence before rendering.

| Data Point | S121 | domain_progress | readiness_scoring | admin_data |
|-----------|------|----------------|-------------------|------------|
| Total items (Part 1) | 2545 | 2540 | 2545 | 2540 |
| Certified count | 2451 | 2221 | — | 2221 |
| Per-pack certified | Yes (5 packs) | Yes (5 packs) | Yes (CERTIFY counts) | Yes (per-item state) |
| Per-section certified | Yes (bySection) | Yes (bySection) | No aggregate | Yes (per-item) |

**Discrepancy note:** S121 counts 2,545 Part 1 items; domain_progress.js/admin_data counts 2,540. The 5-item delta is consistent with the boundary between Pack E's 540 items (standard 500 + 40 R-series). Each source uses its own parsing methodology. The dashboard must surface this discrepancy rather than silently picking one.

---

## 8. Consolidated Field Inventory (Alphabetical)

| Field | Source | Type | Used By |
|-------|--------|------|---------|
| `activeDefectCodes` | admin_data | array[string] | Defect Dashboard |
| `archived` | domain_progress | integer | Gov Dashboard, Content Dashboard |
| `archiveCatalogPresent` | S123 | boolean | Repo Dashboard |
| `archiveTotalFiles` | S123 | integer | Repo Dashboard |
| `archiveTotalSizeMB` | S123 | number | Repo Dashboard |
| `archiveZipCount` | S123 | integer | Repo Dashboard |
| `backupsTotalFiles` | S123 | integer | Repo Dashboard |
| `backupsTotalSizeMB` | S123 | number | Repo Dashboard |
| `blocked` | domain_progress, readiness_scoring | integer | Gov Dashboard, Portfolio Dashboard |
| `certified` | domain_progress, S121 | integer | Gov Dashboard, Portfolio Dashboard |
| `certified (per pack)` | all 4 sources | integer | Content Dashboard |
| `certifiedRatio` | admin_data | number | Gov Dashboard |
| `cognitive.*` | S121 | integer per label | Portfolio Dashboard |
| `cognitiveLevel` | admin_data | string | Content Dashboard |
| `coveragePct` | domain_progress | number | Gov Dashboard, Portfolio Dashboard |
| `difficulty.*` | S121 | integer per label | Portfolio Dashboard |
| `difficulty` (label) | admin_data | string | Content Dashboard |
| `difficultyScore` | admin_data | integer | Content Dashboard |
| `domainName` | domain_progress | string | Gov Dashboard |
| `generated` | S121 | string (timestamp) | Footer |
| `generatedTimestamp` | domain_progress | string (ISO 8601) | Footer |
| `governanceGuardStatus` | admin_data | string | Gov Dashboard |
| `healthScore` | admin_data | integer | Content Dashboard |
| `healthTier` | admin_data | string | Content Dashboard |
| `itemsScanned` | S121 | integer | Portfolio Dashboard |
| `knowledgeActiveDocs` | S123 | integer | Repo Dashboard |
| `knowledgeTotalFiles` | S123 | integer | Repo Dashboard |
| `name` (pack) | S121 | string | Content Dashboard |
| `questionState` | admin_data | string | Content Dashboard |
| `readinessScore` (per domain) | readiness_scoring | string | Gov Dashboard |
| `readinessScore` (portfolio) | readiness_scoring | string | Gov Dashboard |
| `readinessState` | readiness_scoring | string | Content Dashboard |
| `ready` | domain_progress | integer | Gov Dashboard |
| `remediate` | domain_progress, readiness_scoring | integer | Gov Dashboard |
| `remainingToCertify` | domain_progress | integer | Gov Dashboard |
| `reportsTotalFiles` | S123 | integer | Repo Dashboard |
| `reportsTotalSizeMB` | S123 | number | Repo Dashboard |
| `rootFiles` | S123 | integer | Repo Dashboard |
| `sectionName` | admin_data | string | Content Dashboard |
| `timestamp` | readiness_scoring | string (ISO 8601) | Footer |
| `totalItems` (pool) | S121 | integer | Gov Dashboard, Portfolio Dashboard |
| `totalItems` (per domain) | domain_progress | integer | Gov Dashboard |
| `totalItems` (per pack) | all 4 sources | integer | Content Dashboard |
| `totalQids` | admin_data | integer | Content Dashboard |
| `topic` | admin_data | string | Content Dashboard |
| `unprocessed` | domain_progress, S121 | integer | Portfolio Dashboard |

---

## 9. Design Rules for Dashboard Generation

Derived from AGENTS.md, CAQS, and S121 targets. Enforced at the specification and review phases.

| Rule | Description | Source |
|------|-------------|--------|
| DR-1 | Do not invent field names. Use only fields from §8 of this document. | AGENTS.md §8 — Key File Locations |
| DR-2 | Do not generate governance-guard logic. Rule enforcement is invisible to rendering. | AGENTS.md §2 — Read-Only by Default |
| DR-3 | Do not generate certification logic. Question state transitions are pipeline-controlled. | AGENTS.md §7 — Live-Simulation Delivery Pool |
| DR-4 | Do not generate Rule 11 logic. Cognitive/difficulty classification is code-based. | AGENTS.md §17.1 — Operating Principle |
| DR-5 | Do not generate question-evaluation logic. Scoring is deterministic. | PROJECT_CONSTITUTION.md §8 |
| DR-6 | Surfacing divergences (e.g., S121 2,545 vs. domain_progress 2,540) is a presentation concern. Do not resolve the discrepancy; display it with both sources cited. | AGENTS.md §6 — Item-Count Volatility |
| DR-7 | Match existing design language: `--surface`, `--border`, `--primary`, `--text-secondary`, `--text-muted`, `--radius-lg`, `--shadow` CSS variables. Reuse `.dashboard-card`, `.dashboard-stat`, `.dashboard-section` CSS classes. | styles.css:1933–1971 |
| DR-8 | All dashboards must render correctly at 150% zoom and on screens ≥ 768px wide. | CAQS §12.2 — Accessibility Standards |
| DR-9 | Dashboards must support dark theme (inherit `--surface`/`--text-*` variables). | styles.css:1–50 (theme variables) |
| DR-10 | Generated HTML must be a prototype — component layouts, chart containers, and view models — not production JS. Per S134 authorization scope: "specifications and UI component prototypes first." | Phase 3 authorization boundary |

---

## 10. Version

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-08-01 | Phase 1 — initial data contract extraction from 5 source files |
