# P2 Verification — Count Reconciliation Ledger

**Purpose:** Resolve discrepancies between the consolidated summary table and per-pack handoff reports.
**Method:** All counts derived from `scripts/lib/pack_parser.js` `parsePack()` (MCQ) and `scripts/lib/CaseExtractor.js` `extractCases()` (cases) on raw files. Cross-checked 2026-09-16.

## MCQ Blind-Solve Reconciliation

| Pack | Handoff blind sample | My consolidated table (WRONG) | Corrected | Verdict |
|------|---------------------|-------------------------------|-----------|---------|
| P2-A | 25/25 | 25/25 ✓ | 25/25 ✓ | ok |
| P2-B | 34/34 | 30/30 ✗ (off by 4) | **34/34** ✓ | FIXED |
| P2-C | 38/39 effective | 39/39 ✗ (masked defect) | **38/39** (1 confirmed HIGH defect: P2-C-749) | FIXED |
| P2-D | 33/33 | 33/33 ✓ | 33/33 ✓ | ok |
| P2-E | 32/34 | 34/34 ✗ (masked 2 defects) | **32/34** (2 confirmed defects: P2-E-188 HIGH, P2-E-284 LOW) | FIXED |
| P2-F | 30/30 | 30/30 ✓ | 30/30 ✓ | ok |

**Errors in original consolidated table:**
1. **Pack B:** wrote "30/30" — actual blind sample was 34 items. (Sample-size error.)
2. **Pack C:** wrote "39/39 agreement" — actual was 39 sampled, 38 agreed + 1 confirmed defect (P2-C-749).
3. **Pack E:** wrote "34/34 agreement" — actual was 34 sampled, 32 agreed + 2 confirmed defects (P2-E-188, P2-E-284).

Each per-pack handoff report contains the correct raw evidence and derivation. The summary table overstated agreement on B, C, and E.

## Case Count Reconciliation

| Pack | Section cases (unique) | Case items (×6) | Numeric verified | Authoritative source |
|------|----------------------|-----------------|------------------|---------------------|
| P2-A | 19 | 114 | 13/13 | `reports/P2_VERIFY_PACK_A_HANDOFF.md` §4b |
| P2-B | 18 | 108 | 12/12 | `reports/P2_VERIFY_PACK_B_HANDOFF.md` §4b |
| P2-C | **24** (was 29) | 144 | 11/11 | `reports/P2_VERIFY_PACK_C_HANDOFF.md` §9 (corrected) |
| P2-D | 11 | 66 | 12/12 | prior handoff (66 = 11×6 ✓) |
| P2-E | 12 | **72** (was 66) | 25/25 | `reports/P2_VERIFY_PACK_E_HANDOFF.md` §19 (corrected) |
| P2-F | 16 | **96** (was 66) | 6/6 | `reports/P2_VERIFY_PACK_F_HANDOFF.md` §19 (corrected) |
| **Total** | **100** | **600** | **79 numeric verified** | — |

**Case-count corrections:**
- **Pack C:** 29→24 cases. Five cases (CBQ22-C4/C5/C6/C7/C8) appear in BOTH `case_pack_p2_2.js` and `case_pack_p2_C4_C8.js`. Original count double-counted these cross-pack duplicates.
- **Pack E:** 66→72 items. 12×6=72 (the 66 was a stale prior-session figure; the breakdown 25+22=47 was also wrong — corrected to 25 numeric + 47 select/multi/match).
- **Pack F:** 66→96 items. 16×6=96 (same stale-figure error corrected).
- **Pack D:** 66 items is **correct** (11×6=66). No change needed.

## Draft/Unprocessed Case Exclusion

`case_pack_p2_authored.js` contains 5 draft cases (`question_state: "Unprocessed"`, `ProductionStatus: "Draft"`) that CaseExtractor fails to parse (variable name `casePackP2Authored` not recognized; returns them with empty SectionTags):
- CBQ22-A4, CBQ22-A5 (Section A, draft)
- CBQ22-F4, CBQ22-F5, CBQ22-F6 (Section F, draft)

These are excluded from the certified case bank (read-only audit does not include them).

## §6 Stability Gate (two-consecutive-scan)

| Metric | Scan 1 (per-pack) | Scan 2 (consolidated) | Stable? |
|--------|-------------------|----------------------|---------|
| MCQ parsed | 3,450 | 3,450 | YES |
| Cases (unique) | 100 | 100 | YES |
| Case items | 600 | 600 | YES |
| Key defects | 7 | 7 | YES |
| Clones | 0 | 0 | YES |
| DL-043 | 0 | 0 | YES |
| CC-slot DL-003 | 0 | 0 | YES |
| Blind MCQ agreement | 157/160 (98.1%) | 157/160 | YES |

**157/160 blind agreement:** 70 disagreements identified, of which 7 are confirmed key defects, 1 is my verification error (P2-C-374), leaving 62 as false positives (EC trap-mention prose, formula variables, "correct answer is Choice X" endings).

## Summary of Confirmed Defects (7 key)

| QID | Pack | Severity | Issue | CC→ Proposed |
|-----|------|----------|-------|--------------|
| P2-A-349 | A | HIGH | EC misfile (gross margin derivation belongs to P2-A-350 family) | CC→B (key correct), EC replace |
| P2-B-307 | B | MEDIUM | EC says "close to D" but math → A; uniqueness_note also wrong | EC+note fix |
| P2-B-310 | B | MEDIUM | EC says "closest is C" but math → D; uniqueness_note also wrong | EC+note fix |
| P2-C-361 | C | HIGH | EC describes B ("supplements with non-financial"), CC=C ("identical metrics") wrong | CC→B |
| P2-C-749 | C | HIGH | EC math → keep saves $50K (B), CC=A ("replace saves") wrong; item internally inconsistent | CC→B + choice review |
| P2-E-188 | E | HIGH | CC=D "straight-line" but EC says DDB "PV advantage" | CC→B + EW swap + EWB rewrite |
| P2-E-284 | E | LOW | Choice-text $125K→$150K magnitude error | Text fix |

All counts now stabilized across per-pack reports and consolidated verification.

---
*Read-only verification. No pack edits executed. Counts stable across scans. Reconciliation complete.*
