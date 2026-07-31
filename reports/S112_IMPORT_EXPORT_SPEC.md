# S112 — Import/Export Specification

**Date:** 2026-07-31
**Session:** S112
**Component:** CMAProfileManager export/import subsystem (app.js:269–336, 473–507, 564–620)

---

## 1. Export (`exportProfile()`)

### 1.1 Trigger

Settings UI → "Export Full Profile" button.

### 1.2 Process

1. Load current profile via `load()`
2. Pull latest May data via `syncFromMayStorage()` (ensures May layer data is current)
3. Serialize to pretty-printed JSON (`JSON.stringify(profile, null, 2)`)
4. Create Blob with MIME type `application/json`
5. Trigger browser download via temporary `<a>` element with `download` attribute

### 1.3 File Naming

```
cma-profile-backup-YYYY-MM-DD.json
```

Example: `cma-profile-backup-2026-07-31.json`

### 1.4 File Contents

The exported file is the complete profile object (all fields from the profile schema), including:
- `schemaVersion`, `profileId`, `metadata`, `migration`, `theme`
- `sessionHistory`, `seenQuestionIds`
- All `may*` fields (learner state, telemetry, logs)
- `defectManifestCache`

---

## 2. Import (`importProfile()`)

### 2.1 Trigger

Settings UI → "Import Profile" button → file picker (`.json` filter) → `handleProfileImport(file)`.

### 2.2 Validation

1. Parse JSON from file
2. **Required:** `schemaVersion` must be present and must be a number
3. If validation fails → `onError` callback with message

### 2.3 Preview Object

```javascript
{
    schemaVersion: number,
    sessionCount: number,
    seenQuestions: number,
    maySessions: number,
    lastSession: ISO 8601 | null,
    migrated: boolean
}
```

### 2.4 User-Facing Flow (`handleProfileImport`, app.js:564–620)

#### Case A: Existing profile has sessions

1. Show preview dialog with imported stats and current profile stats
2. **OK** → Merge flow:
   - `createBackup()` (pre-import safety)
   - `mergeProfile(fullProfile)` → dedup, combine
   - `save(merged)` + `syncToMayStorage(merged)`
   - Re-render settings + history
3. **Cancel** → Replace dialog:
   - Confirm dialog (with stats comparison)
   - `executeImport(fullProfile)` → backup, save, sync, reload

#### Case B: No existing profile (or empty session history)

1. Show preview dialog
2. **OK** → `createBackup()` + `executeImport(fullProfile)` → reload

---

## 3. Replace (`executeImport()`)

1. **Pre-import backup:** `createBackup()`
2. Preserve local `profileId` if different from imported (avoids duplicate IDs across devices)
3. Set `metadata.importedAt` to current timestamp
4. `save(importedProfile)`
5. `syncToMayStorage(importedProfile)` (bidirectional compatibility)
6. Apply theme from imported profile
7. Re-render theme toggle

---

## 4. Merge (`mergeProfile()`)

### 4.1 Deduplication

Sessions are deduplicated by `date` field. Existing profile dates are collected into a lookup, and imported sessions whose `date` already exists are discarded.

### 4.2 Merged Object Shape

| Field | Source |
|-------|--------|
| `schemaVersion` | Existing |
| `profileId` | **Existing** (preserved; not overwritten by import) |
| `metadata.createdAt` | Existing |
| `metadata.migratedAt` | Existing |
| `metadata.lastBackupAt` | Existing |
| `metadata.lastSessionAt` | Current time |
| `metadata.mergedAt` | Current time |
| `migration` | Existing |
| `theme` | Imported (fallback to existing) |
| `sessionHistory` | Existing + new (deduped, sliced to 500) |
| `seenQuestionIds` | Imported (fallback to existing) |
| `mayLearnerState` | Imported (fallback to existing) |
| `mayStudentRoll` | Imported (fallback to existing) |
| `mayUsageLog` | Imported (fallback to existing) |
| `maySafetyLog` | Imported (fallback to existing) |
| `mayGateLog` | Imported (fallback to existing) |
| `maySessionTelemetry` | Imported (fallback to existing) |
| `mayPilotTelemetry` | Imported (fallback to existing) |
| `mayPilotTelemetryArchive` | Imported (fallback to existing) |
| `maySelectedLearnerId` | Imported (fallback to existing) |
| `defectManifestCache` | Imported (fallback to existing) |

**Key design decisions:**
- `profileId` is always preserved from the local profile (even in replace, it is restored after import)
- Merged session history is capped at 500 entries
- May coaching fields prefer imported data, falling back to existing when imported values are falsy
- `metadata.mergedAt` is set to mark the merge operation
