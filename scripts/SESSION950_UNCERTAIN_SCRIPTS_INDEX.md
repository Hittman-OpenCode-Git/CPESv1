# SESSION950 Uncertain Scripts Index

**Date:** 2026-07-25 (Session 951)
**Status:** Catalog only — no decisions made
**Purpose:** Checklist for future human or Session review

---

## Why These Were Left in Place

During Session 950's conservative root housekeeping sweep, 109 clearly abandoned scratch scripts were moved to `archive/scripts/`. The scripts listed below were deliberately left in `scripts/` because:

- They are session-scoped audit/migration utilities from prior sessions (S4, S9, S60, S62, S65, S67, S75, S86, S96) or named agent utilities.
- Some may have reference value for historical audit trails.
- None are part of the active test/validation pipeline, but their presence in `scripts/` is not an operational risk (they are not auto-loaded).
- The S950 mandate was conservative — "when in doubt, leave in place."

Session 951 catalogs them. **A future session or human reviewer should classify each** and either keep, archive, or flag for deletion. All decisions must be logged in a Session report and `knowledge/REVISION_HISTORY.md`.

---

## Uncertain Scripts

| # | path | session_tag | guessed_purpose | status |
|---|------|-------------|-----------------|--------|
| 1 | scripts/agent_b_case_schema_audit.js | agent_b | Agent B case schema audit | uncertain_keep |
| 2 | scripts/agent_b_deep_check.js | agent_b | Agent B deep structural check | uncertain_keep |
| 3 | scripts/agent_b_quick_check.js | agent_b | Agent B quick validation pass | uncertain_keep |
| 4 | scripts/case_scoring_audit_agent_d.js | agent_d | Case scoring audit agent | uncertain_keep |
| 5 | scripts/migrate_cases_session60.js | S60 | Case migration utility, session 60 | candidate_archive |
| 6 | scripts/normalize_defect_manifest_s96.js | S96 | Defect manifest normalization | candidate_archive |
| 7 | scripts/s75_apply_transitions.js | S75 | Apply question_state transitions | candidate_archive |
| 8 | scripts/session4_bytediff.js | S4 | Byte-level diff for Session 4 investigation | candidate_archive |
| 9 | scripts/session4_diff_analysis.js | S4 | Pack file diff analysis | candidate_archive |
| 10 | scripts/session4_find_defects.js | S4 | Syntax defect finder | candidate_archive |
| 11 | scripts/session4_forensic_timeline.js | S4 | Forensic timeline reconstruction | candidate_archive |
| 12 | scripts/session4_full_manifest.js | S4 | Full defect manifest generation | candidate_archive |
| 13 | scripts/session4_verify_counts.js | S4 | Count verification after Session 4 repairs | candidate_archive |
| 14 | scripts/session62_cleanup.js | S62 | Post-session 62 cleanup utility | candidate_archive |
| 15 | scripts/session65_fix_case_governance.js | S65 | Case governance field fixes | candidate_archive |
| 16 | scripts/session65_fix_case_governance2.js | S65 | Case governance field fixes v2 | candidate_archive |
| 17 | scripts/session67_certify_case_a.js | S67 | Case A certification batch script | candidate_archive |
| 18 | scripts/session67_item_fix.js | S67 | Item-level fix utility | candidate_archive |
| 19 | scripts/session86_dl026_scan.js | S86 | DL-026 scan for Pack D Section C | candidate_archive |
| 20 | scripts/session86_dl8_scan.js | S86 | DL-008 scan utility | candidate_archive |
| 21 | scripts/session86_packd_sectionc.js | S86 | Pack D Section C processing | candidate_archive |
| 22 | scripts/session9_browser_test.js | S9 | Browser runtime validation script | candidate_archive |

---

## Status Legend

- **uncertain_keep** — May still have reference value; review before archiving.
- **candidate_archive** — Likely safe to move to `archive/scripts/` after confirming no active references.
- **candidate_delete** — (none currently) Would require human confirmation.

---

## Review Checklist for Future Session

1. Open each script. Read the first 5-10 lines to confirm purpose.
2. Check for any `require()` calls that import operational modules — if found, the script may still be useful.
3. If the script is a one-off from a completed defect sweep (DL-008, DL-013, S4 repairs, etc.), it is safe to archive.
4. If the script was part of a recurring audit workflow, keep it.
5. Log outcome in a Session report (e.g., "Session 9xx: Reviewed 22 uncertain scripts. 3 kept, 19 archived.") and append to `knowledge/REVISION_HISTORY.md`.
