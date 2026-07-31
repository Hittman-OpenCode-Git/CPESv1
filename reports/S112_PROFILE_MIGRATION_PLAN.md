# S112 — Profile Migration Plan

**Session:** 112  
**Lane:** Full Governance  
**Date:** 2026-07-31  
**Status:** Executing  

---

## 1. Objective

Eliminate dependence on browser-only localStorage and create a durable learner-profile system that survives browser cleanup events and supports cross-device portability.

---

## 2. Legacy Storage Inventory

| Storage Key | Purpose | Record Count | Migration Target |
|-------------|---------|-------------|------------------|
| `cmaP1SessionState` | Active exam session state | 1 | `profile.sessionState` (archive only — active sessions not migrated) |
| `cmaP1SessionCheckpoints` | Rolling checkpoints | 0–20 | Archived only |
| `cmaP1SessionJournal` | Session action log | Variable | Archived only |
| `cmaP1History2026` | Completed session history | 0–100 | `profile.sessionHistory` |
| `cmaP1SeenQuestions2026` | Seen question IDs | Variable | `profile.seenQuestions` |
| `cmaP1Dashboard` | Dashboard metrics | 1 | `profile.dashboardMetrics` |
| `cmaMayLearnerState` | May coaching learner state | 1 | `profile.mayLearnerState` |
| `cmaMaySelectedLearnerId` | Selected learner ID | 1 | `profile.mayLearnerState` (already contained) |
| `cmaMayStudentRoll` | Student roll | 1 | `profile.mayLearnerState` (already contained) |
| `cmaMayPilotUsageLog` | Pilot usage log | 1 | Archived |
| `cmaMaySafetyLog` | Safety log | 1 | Archived |
| `cmaMayGateLog` | Gate log | 1 | Archived |
| `cmaMaySessionTelemetry` | Session telemetry | 1 | Archived |
| `cmaMayPilotTelemetry` | Pilot telemetry | 1 | Archived |
| `cmaMayPilotTelemetrySnapshot` | Telemetry snapshot | 1 | Archived |
| `cmaMayPilotTelemetryArchive` | Telemetry archive | 1 | Archived |
| `cma-theme` | UI theme preference | 1 | Preserved in-place (not migrated — not learner data) |

**Total legacy keys:** 17 (16 migration candidates + 1 preserved in-place)

---

## 3. Unified Profile Schema

```json
{
  "schemaVersion": 1,
  "profileId": "local-profile",
  "metadata": {
    "createdAt": "",
    "migratedAt": null,
    "lastBackupAt": null,
    "lastModifiedAt": null,
    "lastMergedAt": null
  },
  "migration": {
    "completed": false,
    "completedAt": null,
    "sourceKeys": []
  },
  "mayLearnerState": {},
  "sessionHistory": [],
  "seenQuestions": [],
  "readinessHistory": [],
  "confidenceHistory": [],
  "recoveryHistory": [],
  "bookmarks": [],
  "dashboardMetrics": {}
}
```

**Storage key:** `cma-profile`  
**Backup keys:** `cma-profile-backup-{timestamp}` (rolling, max 5)  
**Migration sentinel:** `cma-profile-migration-complete` (value: `"1"`)

---

## 4. Migration Flow

```
App Load
    │
    ├─ Check cma-profile-migration-complete
    │   ├─ "1" → Skip migration (already done)
    │   └─ Not set → Scan legacy keys
    │       ├─ Legacy data found → Show migration dialog
    │       │   ├─ [Import Existing Data] → migrate() → archive keys → set sentinel
    │       │   └─ [Skip — Start Fresh] → set sentinel (no migration)
    │       └─ No legacy data → Set sentinel (no migration applicable)
    │
    ├─ Load unified profile from cma-profile
    └─ Ready
```

---

## 5. Component Architecture

### 5.1 CMAProfileManager

- **Init:** Called at `DOMContentLoaded`, detects legacy data, presents migration dialog
- **Load/Save:** Reads/writes unified profile to `cma-profile`
- **Migrate:** Copies legacy data into profile, archives legacy keys (rename to `_ARCHIVED`)
- **Backup:** Creates timestamped snapshot of current profile
- **Export:** Downloads profile as `cma-profile-backup.json`
- **Import:** Validates and imports profile from JSON file
- **Merge:** Merges imported profile with existing (dedup by session date)
- **Rotate backupts:** Keeps last 5 backups, removes older

### 5.2 Settings UI (Settings View)

- **Tab:** "Settings" in nav bar
- **Data section:**
  - Profile summary (sessions, created date, last backup)
  - [Export Full Profile] button → downloads JSON
  - [Import Profile] button → file picker → validate → preview → confirm
  - [Create Backup] button → manual snapshot
  - [Reset All Data] button → confirmation → clear

### 5.3 Migration Dialog

- **Trigger:** Legacy data detected, migration not yet completed
- **Content:** Session count, source key count, two buttons
- **Options:** Import Existing Data | Skip — Start Fresh
- **Post-migration:** Archive legacy keys (not delete), reload UI

---

## 6. Safety Guarantees

1. **Migration runs once** — Sentinel key prevents re-execution
2. **Legacy data archived, not deleted** — Keys renamed to `_ARCHIVED`
3. **Existing profiles protected** — Merge dialog before overwrite
4. **Auto-backup before import** — Backup created before any import
5. **Import validation** — Schema version check, required field check
6. **Cross-device support** — Export → USB/cloud → Import on new machine

---

## 7. Non-Goals

- No content modifications
- No certification modifications
- No answer-key modifications
- No scoring modifications
- No May recommendation logic changes
- No server-side storage (remains browser-only for S112)

---

## 8. Rollback Plan

- Legacy data archived under `_ARCHIVED` suffix keys
- `cma-profile-migration-complete` sentinel can be removed to re-trigger migration
- Profile backup keys preserve snapshots before each import
