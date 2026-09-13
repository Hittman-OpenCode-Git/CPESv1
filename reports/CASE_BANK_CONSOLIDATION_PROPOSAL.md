# Case-Bank Consolidation Proposal — Authoritative-Bank Decision

**Date:** 2026-09-10
**Trigger:** Tier 3 workstream 3.4. DL-048 resolution surfaced the un-reconciled overlap.
**Status:** PROPOSAL — human decision required. No writes.

## Current state (measured, Function-constructor parse)

| Bank | Files | Cases | Unique IDs | Items | Loaded at runtime | Consumed by getCasePool | Status |
|------|-------|-------|-----------|-------|-------------------|------------------------|--------|
| legacy | scored_cases(1-5).js | 75 | 75 | 400 | No (no script tags) | No | ARCHIVED (per baselines S916) |
| case_pack | case_pack_1/2/3_corrected.js | 80 | 80 (post-DL-048) | 425 | Yes (`index_updated.html:125-127` → CASE_PACK_1/2/3) | No (reads CASE_BANK_*/ENHANCED_CASE_BANK*, never CASE_PACK_*) | Live files, unfed globals |

Overlap: all 75 legacy CaseIDs exist in case_pack (73 confirmed archived↔live by gate; the balance is
naming-series alignment). case_pack adds 5 genuinely new cases: CBQ3-A3, CBQ3-A4 (renumbered S918
content 2026-09-10), CBQ3-C4, CBQ3-D4, CBQ3-B4.

Neither bank reaches learners today (DL-044 residual mechanism, re-confirmed 2026-09-10).

## Options

### Option A — Designate case_pack authoritative, retire legacy (RECOMMENDED)

- Mark legacy files superseded (header comment + baselines entry); keep on disk, remove from any
  future loader candidacy. case_pack (80/425, includes the 5 new cases) becomes the single case bank.
- Rationale: case_pack is the consolidated, loaded, actively-maintained set (S916–S918 + DL-048 fix);
  legacy is frozen, unloaded, validator-scope only. Single-bank eliminates the entire
  archived↔live overlap class permanently.
- Cost: 1 session (headers, baselines, CaseIdentityValidator scope update to live-only + archived
  existence check, pipeline green, logs). Zero content risk (no deletions — archive marking only).

### Option B — Keep both, formalize the split

- Declare legacy = frozen audit reference, case_pack = live working bank; add a registry note and a
  validator rule asserting legacy immutability (hash-pinned) rather than uniqueness across the pair.
- Rationale: preserves the S916 consolidation audit trail in-machine.
- Cost: validator work + documentation; permanent dual-bank maintenance burden; every future
  cross-bank check must special-case the pair (the exact complexity that produced the DL-048
  false-start in the gate's first run).

### Option C — Merge into one file set

- Physically consolidate 80 unique cases into a renumbered single series, delete legacy files.
- NOT RECOMMENDED: deletions require §3.1 staged authorization with per-file backups; destroys the
  S916 audit trail; gains nothing over Option A (same logical end-state with higher risk).

## Recommendation

Option A. It converts the DL-048 lesson (73 expected overlaps triaged as non-defects) into
structure: one live bank, one frozen archive, zero overlap by construction. Requesting approval to
execute (header comments + baselines + validator scope + logs; no content deletions).

## Post-decision work (queued)

- 3.3 case Easy/Very Difficult authoring targets whichever bank is designated authoritative
  (legacy 400: Easy 3, VDiff 0; case_pack 425: Easy 9, VDiff 0).
