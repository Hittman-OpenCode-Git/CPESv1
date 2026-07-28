# Housekeeping & Archive Policy — Session 951

**Date:** 2026-07-25
**Status:** Active
**Author:** Session 951 (documentation-only follow-up to S950)

---

## S950 Summary

| Metric | Value |
|--------|-------|
| Files moved to `archive/` | 171 |
| Root files (before/after) | 68 -> 20 |
| Categories | root_backup (47), knowledge_backup (4), scripts_backup (3), scratch_script (109), pack_backup (2), binary_artifact (1) |
| Operational impact | None |
| Test regression | 0 (154/154 PASS) |
| All moves recoverable | Yes |

Full report: `reports/session_status/SESSION950_CONSERVATIVE_ROOT_HOUSEKEEPING_SWEEP.md`
Archive catalog: `archive/ARCHIVE_INDEX_S950.csv`

---

## What "Archive" Means

**Archived != deleted.** Files in `archive/` are recoverable. The operational tree stays lean. `archive/` holds prior-session backups, scratch scripts, deprecated artifacts, and binary debris. `backups/` serves a different purpose (pre-write safety copies per BACKUP_PROTOCOL.md).

---

## Archive Candidate Criteria

Files are archival candidates when ALL are true:
1. Not referenced by operational code (no import/require/script/link)
2. Not a governance or baseline document
3. Not a current test suite or build script
4. Clearly identifiable as: stale `.bak-*`, one-off scratch script, binary artifact, or completed defect-sweep script

---

## Exclusions

Never archive without explicit Session-level decision: content packs, case files, runtime files, May files, active test suites, build/validate scripts, governance docs, or `backups/` content.

---

## Review Cadence

Revisit after major refactors or certification waves. Do not delete without human review + REVISION_HISTORY entry. Annual scan for new stale artifacts.

---

## Restoration Procedure

1. Find file in `archive/ARCHIVE_INDEX_S*.csv`
2. Copy back to original path
3. Run parse checks
4. Run full test suite (governance guard, stage C, regression R2, readiness)
5. Log in REVISION_HISTORY.md
6. Never restore pack backups over current packs without certification re-verification

---

## Uncertain Scripts

~20 session-scoped audit scripts left in `scripts/`. Cataloged in `scripts/SESSION950_UNCERTAIN_SCRIPTS_INDEX.md`. Future review: classify each (keep/archive) and log decisions.

---

Policy versioned by session. All archive ops require REVISION_HISTORY.md entry. Deletion is never permitted — moves only to `archive/`.
