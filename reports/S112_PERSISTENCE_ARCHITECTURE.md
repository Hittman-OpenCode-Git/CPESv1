# S112 — Persistence Architecture

**Date:** 2026-07-31
**Session:** S112
**Component:** CMAProfileManager (app.js:48–508)

---

## 1. Overview

CMAProfileManager replaces the prior fragmented localStorage approach (14 independent keys) with a single unified learner profile stored under one key. It provides migration from legacy keys, backup/restore, cross-device export/import, and bidirectional sync with the May coaching layer.

---

## 2. Storage Keys

| Constant | Value | Purpose |
|----------|-------|---------|
| `STORAGE_KEY` | `cmaProfile2026` | Primary profile storage |
| `BACKUP_PREFIX` | `cmaProfile2026_backup_` | Backup slots (0–4) |
| `STORAGE_KEY + _backupIndex` | `cmaProfile2026_backupIndex` | Rotation index array |

---

## 3. Profile Schema (`schemaVersion: 1`)

### 3.1 Top-Level Fields

| Field | Type | Description |
|-------|------|-------------|
| `schemaVersion` | Number | Always `1` |
| `profileId` | String | Unique ID (`local-profile-` + epoch in base-36) |
| `theme` | String | `"light"` or `"dark"` |
| `sessionHistory` | Array | Exam session records (kept to last 100) |
| `seenQuestionIds` | Array | QIDs the learner has encountered |
| `defectManifestCache` | any | Cached defect manifest data |

### 3.2 `metadata` Object

| Field | Type | Description |
|-------|------|-------------|
| `createdAt` | ISO 8601 | Profile creation timestamp |
| `migratedAt` | ISO 8601 | Legacy migration timestamp |
| `lastBackupAt` | ISO 8601 | Last backup timestamp |
| `lastSessionAt` | ISO 8601 | Last session timestamp |
| `mergedAt` | ISO 8601 | Last merge operation |
| `importedAt` | ISO 8601 | Last import operation |

### 3.3 `migration` Object

| Field | Type | Description |
|-------|------|-------------|
| `completed` | Boolean | Whether migration finished |
| `completedAt` | ISO 8601 | Migration completion time |
| `sourceKeys` | Array[String] | Legacy keys that were migrated |

### 3.4 May Coaching Fields

| Field | Type | Description |
|-------|------|-------------|
| `mayLearnerState` | Object | May AI tutor state |
| `mayStudentRoll` | Array | Student roster |
| `mayUsageLog` | Array | Pilot usage log (last 200) |
| `maySafetyLog` | Array | Safety events (last 50) |
| `mayGateLog` | Array | Gate events (last 50) |
| `maySessionTelemetry` | Array | Session telemetry (last 100) |
| `mayPilotTelemetry` | Object | Pilot telemetry snapshot |
| `mayPilotTelemetryArchive` | Array | Archived pilot telemetry |
| `maySelectedLearnerId` | String | Active learner in May layer |

---

## 4. Core API

### 4.1 Lifecycle

| Method | Description |
|--------|-------------|
| `init()` | Load profile, detect legacy migration, sync May storage, set `window._cmaProfile` |
| `load()` | Load from localStorage, merge in any missing default fields |
| `save(profile)` | Save to localStorage; on quota error, trim history/logs and retry |
| `_default()` | Return fresh default profile object |

### 4.2 Migration

| Method | Description |
|--------|-------------|
| `hasLegacyData()` | Check if any of 13 legacy keys exist in localStorage |
| `getLegacySummary()` | Return counts (sessions, seenQuestions, maySessions, mayLogs) for migration UI |
| `migrateLegacy(profile)` | Read all legacy keys into profile, set `migration.completed = true` |
| `archiveLegacyKeys()` | Copy each legacy key to `key_ARCHIVED`, then remove the original key |
| `showMigrationDialog()` | Render modal with data preview, Import/Skip buttons |

**Legacy keys migrated:**
`cmaP1History2026`, `cmaP1SeenQuestions2026`, `cmaP1Dashboard`, `cmaMayLearnerState`, `cmaMaySelectedLearnerId`, `cmaMayStudentRoll`, `cmaMayPilotUsageLog`, `cmaMaySafetyLog`, `cmaMayGateLog`, `cmaMaySessionTelemetry`, `cmaMayPilotTelemetry`, `cmaMayPilotTelemetryArchive`, `cmaDefectManifest_DL008_DL026`

### 4.3 May Layer Sync

| Method | Direction | Description |
|--------|-----------|-------------|
| `syncToMayStorage(profile)` | Profile → localStorage | Write all May fields back to their legacy keys for May layer compatibility |
| `syncFromMayStorage(profile)` | localStorage → Profile | Pull latest May data into profile before export or backup |

### 4.4 Statistics

`getStats(profile)`: Returns object with `sessions`, `seenQuestions`, `maySessions`, `migrationCompleted`, `migrationDate`, `backups`, `lastBackup`, `profileCreated`.

---

## 5. Rendering: `renderSettingsView()` (app.js:511–620)

The Settings panel displays:

- **Profile card:** profileId, created date, session count, seen questions, migration status, last backup
- **Data Management:** Export button, Import button (file picker)
- **Automatic Backups:** Rotating backup list with per-slot Restore buttons
- **Danger Zone:** Reset All Learner Data (creates backup before clearing)

The import flow (`handleProfileImport`, app.js:564–620):
1. File picker → `CMAProfileManager.importProfile(file, onPreview, onComplete, onError)`
2. `importProfile` parses JSON, validates `schemaVersion`, builds preview object
3. If existing profile has sessions: offers Merge (OK) vs Replace (Cancel → confirm)
4. Merge calls `mergeProfile()` → dedup by session date → save
5. Replace calls `executeImport()` → pre-import backup → save imported → sync May → reload
6. If no existing profile: immediate import with pre-import backup
