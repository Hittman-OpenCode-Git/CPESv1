# Session 320 — Domain E Seed Remediation (Pack D EW + COSO)

**Type:** Remediation Session — 800-Series Execution Lane  
**Date:** 2026-07-27  
**Status:** COMPLETE — Pack D remediated; Pack C deferred to S321

## Critical Discovery

The S319 seed inventory's CorrectChoice values were **stale** — the live pack files have rotated CC values. All 38 seeds confirmed present and Unprocessed, but the inventory's CC→empty-EW mapping was incorrect. A full ground-truth audit was executed before any remediation.

## Remediation Applied

### Pack D (pack_d_corrected.js)
- **10 EW slots filled** across 7 seeds: ED-028, ED-042, ED-046, ED-051, ED-058, ED-064, ED-066
- **8 COSO citations added** to items missing COSO references: ED-001, ED-010, ED-016, ED-028, ED-036, ED-042, ED-046, ED-051
- **JSON parse verified:** 500 items, OK

### Pack C (pack_c_corrected.js)
- **0 changes** — full remediation blocked by template rotation that changed CC values from S319 inventory
- **19 seeds** each have 1 empty non-CC EW slot + 13 missing COSO citations
- Remediation deferred to S321

## Remaining Remediation (S321)
- Pack C: 19 EW fills + 13 COSO + EC enrichment for items with EC < 200 chars
- Pack D: ED-025 EW_A + COSO, ED-035 EW_C, ED-058 COSO, ED-064 EW_A + COSO, ED-066 EW_A+EW_C + COSO, ED-071 EW_C, ED-072 EW_D, ED-073 EW_A, ED-074 EW_B, ED-075 EW_C + COSO

## Readiness Scoring
- **READY:** 0 (no seeds fully certified-ready)
- **MINOR_FIX:** 2 (Pack D items with only COSO missing)
- **HOLD:** 36 (all still require at minimum COSO or EW completion)

## Governance
- Certified baseline: 2,221 (unchanged)
- Governance guard: 27/27 PASS
- Pack D JSON parse: verified OK (500 items)
- Pack C: unchanged from backup
- No answer-key changes
- No question_state changes
- Backup protocol: pack_d_corrected.js backed up before edit

## S321 Handoff
Pack C seed remediation (19 EW fills + 13 COSO) + remaining Pack D items + EC enrichment for weak seeds.
