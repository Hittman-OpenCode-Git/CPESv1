# Hard Backup Protocol — Effective 2026-07-22

**THIS IS A HARD RULE WITH NO EXCEPTIONS.**

## Rule

Before ANY edit tool, sub-agent write, or re-serialization/rebuild script is executed against any pack file (pack_a through pack_e_corrected.js):

1. Copy the target file to a timestamped backup:
   ```
   pack_X_corrected.js.bak-YYYYMMDDHHMMSS
   ```
2. Confirm the backup file exists and has non-zero size.
3. Proceed with the edit ONLY after backup is confirmed.

## Script Safety Rule

Any re-serialization/rebuild script MUST:
1. Parse ALL objects before writing ANY output
2. Fail loudly (throw Error, exit non-zero) on the FIRST parse failure
3. NEVER write partial/truncated output
4. Report exact failed object index and error message before halting

The safe rebuild script is at: `scripts/safe_rebuild.js`

## Incident Reference

This protocol was enacted after the 2026-07-22 data loss incident in which a re-serialization script silently dropped 9 unparseable Section E items from pack_a_corrected.js, resulting in permanent data loss. See `knowledge/REVISION_HISTORY.md` — Data Loss Incident entry.
