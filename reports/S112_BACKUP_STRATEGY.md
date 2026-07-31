# S112 — Backup Strategy

**Date:** 2026-07-31
**Session:** S112
**Component:** CMAProfileManager backup subsystem (app.js:338–469)

---

## 1. Design

The backup system uses a **rotating 5-slot ring buffer** (`MAX_BACKUPS = 5`). Each slot stores a complete profile snapshot with a timestamp. A separate `_backupIndex` key tracks rotation order.

---

## 2. Keys

| Key | Value |
|-----|-------|
| `cmaProfile2026_backup_0` through `_4` | Backup slots — each holds `{ timestamp, profile }` |
| `cmaProfile2026_backupIndex` | Array of `[{ slot, timestamp, sessions }]` — rotation index |

---

## 3. `createBackup()`

1. Load current profile via `load()`
2. Pull latest May data via `syncFromMayStorage()` to ensure backup is complete
3. Read rotation index from `_backupIndex`
4. Write to slot `rotations.length % 5`
5. Update rotation index: shift oldest if ≥5 entries, push new entry
6. Set `profile.metadata.lastBackupAt` and save profile

Returns the backup timestamp string on success, `null` on failure.

---

## 4. `getBackups()`

Returns the `_backupIndex` array for UI rendering. Each entry contains `slot`, `timestamp`, and `sessions` count.

---

## 5. `restoreBackup(slot)`

1. Read `cmaProfile2026_backup_{slot}` from localStorage
2. Parse the backup entry
3. **Pre-restore backup:** Call `createBackup()` to save current state before overwriting
4. Save the restored profile via `save()`
5. Sync to May storage via `syncToMayStorage()`
6. Apply theme from restored profile
7. Re-render Settings view and session history

Returns `true` on success, `false` if backup not found or corrupted.

---

## 6. Automatic Triggers

| Trigger | Location | Method |
|---------|----------|--------|
| Before import (replace) | `executeImport()` | `createBackup()` |
| Before import (merge) | `handleProfileImport()` | `createBackup()` |
| Before Reset All Data | Settings Danger Zone | `createBackup()` |
| Before profile restore | `restoreBackup()` | `createBackup()` |
| Review submit | app.js:1367 | `createBackup()` (try/catch) |

---

## 7. Manual Backup

The Settings UI does **not** have a standalone "Create Backup" button. Backups are created automatically before destructive operations. The Export function serves a similar purpose for user-controlled snapshots.

Users view backup history in Settings → Automatic Backups section, with per-slot Restore buttons and timestamps.

---

## 8. Backup Contents

Each backup entry is a complete profile snapshot:

```json
{
  "timestamp": "2026-07-31T12:00:00.000Z",
  "profile": { /* full CMAProfileManager schema */ }
}
```

The profile within the backup includes all May coaching data (synced via `syncFromMayStorage()` before the backup is written).
