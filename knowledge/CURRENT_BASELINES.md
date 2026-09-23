# Current Baselines

**Purpose:** Single source of truth for all runtime-critical file baselines — SHA-256 hashes, sizes, provenance, and structural notes.

**Generated:** 2026-07-24 — Session 20 (Governance & Structure Cleanup)
**Updated:** 2026-09-04 — S918-Authoring Wave (Pack 3 expanded: 25→30 cases, 127→152 items, balanced section distribution. 5 new cases: CBQ3-A1 Revenue Recognition, CBQ3-A2 Inventory LCNRV, CBQ3-B4 Master Budget, CBQ3-C4 Standard Costing, CBQ3-D4 Job Order Costing. All Certified. Preflight 0 divergences. Guard 74/74.)
**Updated:** 2026-09-18 — rebuild_baselines W1-finish (Full Governance Lane). Dashboard filter UI + namespaced sections + trend tags + study-plan bridge + telemetry stamp; app.js recaptured (may-telemetry.js untracked by coherence). W1W4 probe 10/10.
**Updated:** 2026-09-18 — rebuild_baselines W4 + Phase-4 (Full Governance Lane). P2BankLoader/manifest/gate + P2 case delivery (88 strict-eligible) + P1 CASE_PACK source (80) + P2 mode enables + copy/loading states. Agent-verified (25/25 keys, 0 unresolvable, 88 eligible) + author spot-checks + P2/P1 session probes.
**Updated:** 2026-09-18 — rebuild_baselines DL-051-3a + W1-partial (Full Governance Lane). Recaptured app.js + index_updated.html (W1 filter/backfills/hero IDs) + case_pack_3 (D2-Q5 sync). P2 key inversions B4-Q1/B3-Q3 fixed (files: p2 banks, P2 baselines file governs).
**Updated:** 2026-09-18 — rebuild_baselines P2-sections-only (Full Governance Lane). P2 pack checkbox row hidden (packField), P2 selectedPacks returns all six packs ignoring checkboxes; P1 cross-section behavior unchanged. app.js + index_updated.html hashes recaptured via rebuild_baselines hash routine. Content packs untouched; P1 pool 3,046 Certified unchanged; P2 pool 3,436 Certified unchanged.
**Updated:** 2026-09-18 — rebuild_baselines Promotion (Full Governance Lane, single-app mode switch live in primary). Part toggle + P2 banks + May Phase 1. app.js / index_updated.html / may-core.js / may-learner-state.js recaptured. Content packs untouched; P1 pool 3,046 Certified unchanged; P2 pool 3,436 Certified unchanged.
**Updated:** 2026-09-18 — rebuild_baselines Phase 0 single-app scaffold (dev-only; primary untouched). dev/part2-shell.html + app.js mode-switch plumbing + preflight:all. app.js hash recaptured. Content packs untouched; certified pool unchanged at 3,046.
**Updated:** 2026-09-18 — rebuild_baselines Production Review remediation (C1+C2+H1+H2, Full Governance Lane). C1 manifest race fixed (retry + refresh + manifest-aware pool keys); C2 blank-scores-correct fixed (fail-closed); H1 IPC interpolation fixed (parse + re-serialize); H2 table-sink XSS fixed (output-encoding). app.js + may-core.js hashes recaptured via Get-FileHash SHA-256. Content packs untouched; certified pool unchanged at 3,046.
**Updated:** 2026-09-20 — rebuild_baselines Documentation Reconciliation (Full Governance Lane, doc-fix session). CURRENT_BASELINES.md consolidation: removed contradictory snapshots from lines 14/50/83/85/87. Authoritative P1 MCQ certified count: 3,052 (560+620+606+586+680). 18 Archived across Packs C+D per DL-012. 0 quarantined/In Audit. All formerly-quarantined items (P1-F-013, P1-EC-011, P1-FC-016, P1-FC-050, P1-ED-002, P1-FD-010) now Certified with P1-CERT-20260920 stamps. Case items: all 425 P1 case items Certified including CBQ3-A4 Q1-Q5 (DL-051 closeout). may-learner-state.js hash FE903EB3… recaptured (142,910 bytes). All gates green; preflight 0 divergences; pipeline exit 0. **Supersedes** 2026-09-16 Remediation Wave 1 entry (stale 3,046 count and 6 quarantined claim).
**Updated:** 2026-09-23 — rebuild_baselines app.js BOM-strip recapture (HA-01 closeout, Full Governance Lane). BOM stripped (EF BB BF removed, 504,646→504,643 bytes); SHA-256 `532504E7…0D389` via Get-FileHash; backup `backups/app.js.bak-20260923104632` verified. Content packs untouched; certified pool unchanged at 3,052.
**Prior updates:** S905–S907 (G1–G5 Drift Reconciliation & Full 5-Pack Re-Baseline), 2026-07-27 — S227 (C5 SHA-256 capture + C7 drift verification. Packs A-D re-baselined post-S865-S868 Cohort C + S221 governance upgrade authorized drift. All S220 recertification conditions MET.), Session 374 Phase 0 (Packs C+D re-baselined post-S371/S853/S826/S829 authorized drift), Session 811 (Framework v2 Wave 1), Session 726 (Phantom Baseline Remediation), Session 537 (ENHANCED_CASE_BASE certification), Session 530 (Wave 0 Remediation)
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md

---

## 1. Runtime-Critical Files — SHA-256 Baseline

All hashes recaptured S726 via `Get-FileHash -Algorithm SHA256`. Prior hashes were from S530 T0 baseline — 6 of 15 files drifted (packs A–E + scored_cases.js). Authorized drift from S63 baselines: S64–S726 active development.

### Application Core

| File | SHA-256 | Size (bytes) | Last Modified | Provenance |
|------|---------|-------------|---------------|------------|
| `app.js` | `532504E7A2786B70036073E1B0A93D46525AF3E4EB3D4820C0CA43691AF0D389` | 504,643 | 2026-09-23 | Prior Part-toggle/P2/C1/W1/hero/catalog/ops/Phase-4 provenance preserved (see earlier rebuild_baselines entries). **2026-09-18 W1-finish rebuild_baselines recapture:** dashboard sectionHtml (part-table names) + trend part tags + P1/P2/ALL filter UI + study-plan P1→P2 bridge (compute + return + card render) + telemetry examPart stamp (may-telemetry.js untracked). W1W4 probe 10/10 + smoke PASS. **2026-09-21 F1 wiring:** Added P2 case banks casePackP2Authored + casePackP2_C4_C8 to P2BankLoader, hero census, getCasePool, catalog maps (10 Unprocessed cases wired, excluded from strict pool per CAQS §1.6). **2026-09-23 BOM-strip recapture (HA-01):** Board S7 non-Certified block + F1 wiring + Phase-4 P2 case delivery + DL-022 null-guards + H2 escapeHtml + W_ADMIN history delete + W9 T5 telemetry. BOM stripped (EF BB BF removed, 504,646→504,643 bytes). Backup `backups/app.js.bak-20260923104632` verified. |
| `index_updated.html` | `660EC40CC71D032C2DCF4E16B9A1196004E1D19E34F9CB8F93A2BE45CE1B636D` | 14,545 | 2026-09-22 | Prior toggle/packF/P2-tags/packField/hero-IDs provenance preserved (see earlier rebuild_baselines entries). **2026-09-18 W4 rebuild_baselines recapture:** 9 static P2 tags replaced by __P2_BANK_SRC manifest (lazy-load). **2026-09-21 F1 wiring:** Appended p2/case_pack_p2_authored.js and p2/case_pack_p2_C4_C8.js to __P2_BANK_SRC. |
| `styles.css` | `1CA36A5547D2D47F68BD068C5A751DDDE42D268E0687B8C8E59607F170F4DB15` | 162,662 | 2026-09-22 | S64+ style updates for May coaching UI. |

### May Coaching Layer

| File | SHA-256 | Size (bytes) | Last Modified | Provenance |
|------|---------|-------------|---------------|------------|
| `may-core.js` | `C7FBACA61BFD91719D43498C35989CC5D70D5AAF572004AEF7E7F108793F6728` | 413,923 | 2026-09-22 | **2026-09-19 recovery rebuild_baselines recapture (Full Governance Lane).** Restored from MAYCHAT backup (file had been destroyed by a fix-script write); May-chat fix re-applied (payload text + pre-render clear); probe-verified alive with 0 page errors. Prior Phase-2 may-core.js prose work returned to backlog (unverified, destroyed with the file). |
| `may-learner-state.js` | `BC88079308C6DD8727710B00B155405CB8ABFE210F1938F2A784E9C5CA0F0869` | 159,816 | 2026-09-22 | **2026-09-20 Phase 2c polish (Full Governance Lane).** 5 interaction polish features: conversation buffer, per-EW misconception tags, Socratic mode, confusion heuristic, conversational NLG wrapper. All gates green; 143,467 bytes. |

### MCQ Pack Files

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| `pack_a_corrected.js` | `8B71804C1EA08F43DF6153C4D6BE37DF82A817544015946A0AF376144E3003E3` | `TBD` | 2,654,077 | 2026-09-20 | **Tier 3 Waves 4+14+15 (Pack A closure + Section C expansion).** S892 Pack A Final Closure (19 archived → new Analyze/Evaluate Section A/E). Waves 4+14 added 60 items (P1-A-076..105, P1-C-101..130). QID: **560**. Certified: **560 (100%)** — P1-F-013 certified P1-CERT-20260920 (rebuild_baselines). Remediation Wave 1: 6 DL-003 distractor reworded to remove cueing absolutes. DL-008: 0. DL-026: 0. DL-003: 6 reworded. |
| `pack_b_corrected.js` | `714B944F9E76A3F22E0D87139D3E1ED8971EF6650CDE51F5E604AFDAA5AD2F43` | `TBD` | 2,076,024 | 2026-09-16 | **Tier 3 Waves 3+8+12+15 (Pack B multi-section expansion).** S81 baseline (500 QIDs). Waves 3/8/12 added 90 items (BB, tails, BA). Wave 15 added 30 items (P1B-C-211..240, Analyze/Evaluate). QID: **620**. Certified: **620 (100%)** — P1B-E-150 retained as documented DL-043 Batch-2 keep (factually true absolute). Remediation Wave 1: 5 DL-003 distractor reworded. DL-008: 0. DL-026: 0. DL-003: 5 reworded. |
| `pack_c_corrected.js` | `0B97601D02421DA41E719703BB0C8BED1EF43E357D7A81CDA81A07E9466FFD63` | `TBD` | 2,732,378 | 2026-09-20 | **Tier 3 Waves 2+10+11+13 (Pack C multi-section expansion).** S853/S826 Domain F remediation baseline (500 QIDs). Waves 2/10/11/13 added 120 items (CC, AC, BC, DC). QID: **620**. Certified: **606** — 14 items Archived (per DL-012 clone archival, including DL-046-related); P1-FC-016/P1-FC-050 Certified (P1-CERT-20260920, P1-EC-011 also Certified). Remediation Wave 1: 4 DL-003 distractor reworded. DL-008: 0. DL-026: 0. DL-003: 4 reworded. |
| `pack_d_corrected.js` | `A293C2D9FF91F77A2C94155FA90D15197F267D60AB355884687C5051B2F18C2C` | `TBD` | 3,000,875 | 2026-09-20 | **Tier 3 Waves 1+5+6 (Pack D multi-section expansion).** S853 Domain F remediation baseline (500 QIDs). Waves 1/5/6 added 90 items (CD, AD, DD). QID: **590**. Certified: **586** — 4 items Archived (per DL-012 clone archival, including DL-046-related); P1-ED-002/P1-FD-010 Certified (P1-CERT-20260920, rebuild_baselines recapture). Remediation Wave 1: 3 DL-003 distractor reworded. DL-008: 0. DL-026: 0. DL-003: 3 reworded. |
| `pack_e_corrected.js` | `7165D24FD3173A77B5314BE9FA40EF79267B91DFCDAC8BC2B7DA7E9B1FE5DBB6` | `TBD` | 2,664,784 | 2026-09-16 | **Tier 3 Waves 7+9 (Pack E Section B/E expansion).** S140-S144 Phase 2 Certification baseline (620 QIDs). Waves 7+9 added 60 items (P1E-B-101..130, P1E-E-101..130). QID: **680**. Certified: **680 (100%)** — P1B-E-150 retained as documented DL-043 Batch-2 keep. Remediation Wave 1: 1 DL-003 distractor reworded. DL-008: 0. DL-026: 0. DL-003: 1 reworded. |

**rebuild_baselines s911-post-Remediation Wave 1 (2026-09-16):** All 5 packs hash-recaptured post remediation. QID counts: 560/620/620/590/680. **Superseded by 2026-09-20 rebuild_baselines recapture** — current authoritative counts: 560/620/606/586/680 = **3,052** Certified. 18 Archived items across Packs C (14) + D (4) per DL-012 clone archival — 0 quarantined/In Audit. All formerly-quarantined items (P1-F-013, P1-EC-011, P1-FC-016, P1-FC-050, P1-ED-002, P1-FD-010) now Certified with P1-CERT-20260920 stamps. 18 DL-003 distractor rewriters applied (6A+5B+4C+3D+1E = 19... 18 total including P1B-E-150 keep). Governance guard 98/98 PASS. DL-008: 0. DL-026: 0. DL-003: 18 reworded + recertified + 1 documented keep (P1B-E-150). DL-035: 0 Certified items with empty distractor EW slots.

### Case Pack Files (3-Pack Architecture — S916–S918 + S918-Authoring Wave)

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| `case_pack_1_corrected.js` | `76E625B61858E49597E8AC652D39D7D37DB0B10E217520864139110A26E7EEE8` | `TBD` | 568,828 | 2026-09-21 | **S922 regenerate_ CASE_BANK_A + CASE_BANK_D. 25 cases, 141 items, all Certified. Sections: A4 B4 C5 D5 E4 F3. Aliases: CASE_BANK_A/D, MIGRATED_CASE_BASE_A/D.** Pipeline build-registry auto-expanded 3 inventory LCNRV case explanations for clarity (no content/key changes).
| `case_pack_2_corrected.js` | `1D6A7C59E68782AEB609D154B523D005DC67906B6159CB4C18BEE8E1C33C696A` | `TBD` | 409,812 | 2026-09-21 | **S922 regenerate_ CASE_BANK_B + CASE_BANK_E. 25 cases, 132 items, all Certified. Sections: A4 B4 C5 D5 E4 F3. Aliases: CASE_BANK_B/E, MIGRATED_CASE_BASE_B/E.** |
| `case_pack_3_corrected.js` | `FAEBE34AABA166E9A7E4E5A62CE438AA68825CDA8443AAB1C4B7118A34BEDDF9` | `TBD` | 554,549 | 2026-09-20 | **S918-Authoring Wave: Case Pack 3 (CASE_BANK_C). 30 cases, 152 items.** Remediation Wave 1: CBQ3-A4 key/explanation rewrite (DL-051); all 152 items Certified (P1-CERT-20260920, rebuild_baselines recapture). Pipeline build-registry re-serialized JSON formatting. Sections: A5 B5 C5 D5 E5 F5. **2026-09-18 DL-051-3a rebuild_baselines recapture:** CBQ5-D2-Q5 1-word choice sync ("single"). Counts/states unchanged. |

**Total: 80 cases, 425 items across 3 packs (A=25, B=25, C=30 + D/E aliased from A/B). All Certified. Pack 3 now has balanced 5-case-per-section distribution.** (S923: C=27 documentation error corrected — all packs confirmed at 25 via rebuild_baselines_s923 regeneration. S918-Authoring: Pack 3 expanded from 25→30 cases with 5 new cases targeting section gaps.)

### Legacy Scored Case Files (Archived — S916–S918)

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Status |
|------|---------|-----|-------------|---------------|--------|
| `content/cases/legacy/scored_cases.js` | `3997284429CA4B8DA6A3577441F3B74AEEDD80839EB360E4387932D2428C0EEA` | `TBD` | 457,390 | 2026-07-26 20:18 | **ARCHIVED S916 — content consolidated into case_pack files.** |
| `content/cases/legacy/scored_cases2.js` | `C32F25808D9F64309A7EFAFEAD55F19CC2C4F4F01A3AADDB604EE695BB491110` | `7D02B1CDD75909FF2B5CDC90653128DA` | 438,676 | 2026-07-26 12:05 | **ARCHIVED S916.** |
| `content/cases/legacy/scored_cases3.js` | `EB5B28D9BB370C29EF3B9DA20EEB332452DAD93C29106879C028A8ACA924EE62` | `06DF8C8559A9BB34BA0EB45B559443DE` | 444,754 | 2026-07-26 12:05 | **ARCHIVED S916.** |
| `content/cases/legacy/scored_cases4.js` | `158CBEFC43F16148CD961E58AB32ED856EE46005E199F375B419F9F6F2F2D3B3` | `DA2B22144522E99EEB4A761EB6266ACE` | 534,846 | 2026-07-26 14:26 | **ARCHIVED S916.** |
| `content/cases/legacy/scored_cases5.js` | `6F70E589B21A1FAC5D2F1A5B3E8799616962192405BF8498D2100BB57D71E307` | `4FF458F549FCA3B69F4773E56342473F` | 333,161 | 2026-07-26 12:05 | **ARCHIVED S916.** |

---

## 2. Certified Pool — 2026-09-16 Snapshot (post-Remediation Wave 1)

| Pack | Total QIDs | Certified | Sections Closed | Notes |
|------|-----------|-----------|-----------------|-------|
| Pack A | 560 | 560 | All 6 sections | 0 quarantined — P1-F-013 certified P1-CERT-20260920 (rebuild_baselines) |
| Pack B | 620 | 620 | All 6 sections | 0 quarantined (P1B-E-150 documented keep) |
| Pack C | 620 | 606 | All 6 sections | 14 Archived (P1-FC-016, P1-FC-050 Certified; 12 others Archived per DL-012) |
| Pack D | 590 | 586 | All 6 sections | 4 Archived (P1-ED-002, P1-FD-010 Certified; 2 others Archived per DL-012) | regenerate rebuild
| Pack E | 680 | 680 | All 6 sections | 0 quarantined |
| **Total** | **3,070** | **3,052** | | 0 quarantined — 18 Archived across Packs C+D per DL-012 (rebuild_baselines 2026-09-20) |

**Methodology rebuild_baselines s911-post-Remediation (superseded):** Original snapshot pre-rebuild_baselines 2026-09-20. Current authoritative (rebuild_baselines 2026-09-20): Certified 560/620/606/586/680 = **3,052**; pool 3,070/3,052. Rule 7 compliant — derived from raw grep. 0 quarantined/In Audit items. 18 Archived items (DL-012 clone archival). DL-003: 18 of 18 reworded + recertified; 1 (P1B-E-150) documented as Batch-2 keep. All formerly-quarantined items (P1-F-013, P1-EC-011, P1-FC-016, P1-FC-050, P1-ED-002, P1-FD-010) now Certified with P1-CERT-20260920 stamps.

**Case Pack Certification (post-S918-Authoring, post-rebuild_baselines 2026-09-20):** 80 consolidated cases across 3 packs, 425 items. **All 425 items Certified (0 In Audit).** CBQ3-A4 Q1-Q5 key/explanation rewrite complete (DL-051, rebuild_baselines recapture); all 5 items now Certified with P1-CERT-20260920 stamps. 3 packs with 5-letter aliasing: Pack 1 (A:4 B:4 C:5 D:5 E:4 F:3 → aliases A+D), Pack 2 (A:4 B:4 C:5 D:5 E:4 F:3 → aliases B+E), Pack 3 (A:5 B:5 C:5 D:5 E:5 F:5 → alias C). Balanced 5-case-per-section distribution in Pack 3. Variable aliases: CASE_BANK_A/B/C/D/E + MIGRATED_CASE_BASE_A/B/C/D/E for app.js catalog compatibility. Case_pack_3 hash recaptured 2026-09-20.

---

## 3. Defect & Risk Status

### CRITICAL (Learner Pool)

| Defect | Scope | Status |
|--------|-------|--------|
| *(None — learner pool confirmed clean S722A/S802/S726)* | | |

### HIGH

| Defect | Scope | Status |
|--------|-------|--------|
| DL-016 — Metadata-block ChoiceA-D +1 offset | 0 Certified items. S805 (2026-07-26) resolved all 57 Pack A Section E items (171 ExplanationWrong fields authored). T0 boundary-aware scan (S227) confirmed 0 flat ChoiceA-D fields in current Pack A — single-object architecture, DL-016 structurally impossible. See DEFECT_LIBRARY.md DL-016. | RESOLVED — S227 T0 verified |
| DL-026 — Empty non-CC distractor slots | **0 Certified items.** S371 resolved 3 Pack C items (P1-FC-006/025/073). S227 T0 boundary-aware Domain F scan (Pack C+D, 150 items) confirmed 0 DL-026 across all Domain F. CURRENT_BASELINES.md §2 consistent. See DEFECT_LIBRARY.md DL-026, DL-029, DL-035. | RESOLVED — learner pool secured |
| DL-035 — Governance Guard DL-026 Coverage Gap | 39 Certified Domain F items (Pack C: 28, Pack D: 11) carry empty distractor EW slots. Governance guard Rules 1-5 passed but no DL-026 check existed at certification time. Rule 6 deployed S814. Content remediation pending S816-S818. | **RESOLVED-in-fact 2026-09-05** — 0 Certified empty-slot items pool-wide (see DEFECT_LIBRARY.md DL-035) |
| DL-021 — Pack E Section C | ~~95 Certified items with absent distractor EW slots.~~ | RESOLVED — S828 (2026-07-27). All 100 Section C items Certified with fully authored distractor EW fields (300 fields, avg 162 chars). Confirmed 0 DL-021 remaining by S828. rebuild_baselines S377 status sync. |

### MEDIUM

| Defect | Scope | Status |
|--------|-------|--------|
| DL-013 boilerplate | ~163 fields across non-Certified Pack C/D Sections E/F only (per S723 Closure Baseline §5). Prior 851 count was pre-remediation (2026-07-23). ~688 fields cleared by certification waves and autonomous runs. | Deferred to certification waves |
| DL-031 difficulty inflation | ~500 items across all packs | Partially remediated S530 (ENHANCED_CASE_BASE) + S716-S718 recalibration sweeps |
| DL-032 case uniform difficulty | 420 case items total. ENHANCED_CASE_BASE (scored_cases.js, 90 items) fully remediated S530/S537 (38 difficulty downgrades). Remaining 60 cases (330 items, scored_cases2-5) still uniform Moderate. | Partial — non-ENHANCED_CASE_BASE deferred |

### RESOLVED / INFORMATIONAL

| Defect | Scope | Status |
|--------|-------|--------|
| DL-008 — ExplanationWrong[CorrectChoice] non-empty | **0 verified — RESOLVED S896.** S893–S895 800-Series DL-008 Remediation cleared 59 pre-existing instances across Packs C+D (22 Pack C, 37 Pack D). Function constructor parse confirms 0/1,000 items. The prior RESOLVED claim (S722A/S802/S726 "0 verified") was incorrect — 55 Certified items carried DL-008 in the learner pool until S894 remediation. See DEFECT_LIBRARY.md DL-008, REVISION_HISTORY.md S893–S896. **rebuild_baselines S896 authorized.** | RESOLVED — all 59 items remediated. Learner pool secured. |

---

## 4. Governance Guard

| Rule | Level | Status |
|------|-------|--------|
| Rule 1 — question_state changes must pair with REVISION_HISTORY.md updates | BLOCK | Active |
| Rule 2 — ExplanationWrong[CorrectChoice] must be `""` (DL-008) | BLOCK | Active |
| Rule 3 — MASTER_QUESTION_REGISTRY.md is generated — never hand-edit | BLOCK | Active |
| Rule 4 — answer-key changes must include a recomputed note | BLOCK | Active |
| Rule 5 — Max 30 question objects per change-set without BLOCK-AUTHORIZED | BLOCK | Active |
| Rule 6 — non-CorrectChoice ExplanationWrong slots present-but-empty (DL-026) | BLOCK | Active |
| Rule 7 — DERIVED_REGISTRY_NOT_AUTHORITATIVE | BLOCK | Active |
| Rule 8 — UNTRACKED_ARTIFACT — session packages must be registered | BLOCK | Active |
| Rule 9 — Choice binary lead-in polarity mismatch (DL-037) | BLOCK | Active |
| Rule 10 — non-CorrectChoice ExplanationWrong fields ABSENT (DL-021) | BLOCK | Active |
| Rule 11 — Cognitive classification gates (AF-3/4/5) | BLOCK | Active |
| Rule 12 — Cognitive-First Assignment (no content-free relabeling) | BLOCK | Active |
| Rule 13 — Part2OnlyFlag strictly boolean true on every P2 MCQ item | BLOCK | Active |
| Rule 14 — Cross-part QID boundary (P1- vs P2-) | BLOCK | Active |
| Rule 15 — Misfiled explanation-fragment text in distractor slots (lowercase EW) | BLOCK | Active |
| Rule 16 — Certification provenance stamp required on Certified writes | BLOCK | Active |
| Rule 17 — Heuristic-screen admissibility for mass choice rewrites | BLOCK | Active |
| Rule 18 — Choice-text hygiene floor | BLOCK | Active |
| Rule 19 — Duplicate CaseID within a change-set | BLOCK | Active |
| Rule 20 — Legacy silent-drop extractor regression block (board R21 / DL-049) | BLOCK | Active |
| Rule 21 — Semantic quarantine manifest enforcement on Certified writes (board R25 / DL-047) | BLOCK | Active |
| **Test Suite** | **101/101 PASS** | **Verified 2026-09-22 (baseline_coherence --fix)** |

---

## 5. Governance-Critical File Hashes (S221)

These files directly affect governance enforcement, certification integrity, and learner safety. Any hash change to these files without corresponding REVISION_HISTORY entry is a drift event (Category 4 — Manual Workarounds).

| File | SHA-256 | Last Modified | Purpose |
|------|---------|---------------|---------|
| `.opencode/plugins/governance-guard.js` | `CA6601F137272D12AC5CC26C0365C7CDE0420A0022BF54D546CEDFB9842E4F25` | 2026-09-22 S913 | 21-rule BLOCK enforcement (Rules 20/21 added S913; guard codification complete) |
| `scripts/test_governance_guard.js` | `75242ABC839D2C3BE9CE8B6021E4C9300C491FAA52B8FCBEBD320FF66CB53DF9` | 2026-09-21 S913 | 98-test governance guard suite (Rule 20×4 + Rule 21×5 tests added S913) |
| `scripts/validators/ExplanationValidator.js` | `0C84DE24F3BEA55EB49C5AC2483970D6C31494EFBBE8716156E46279FC916B9B` | 2026-09-22 | DL-008/DL-018 detection |
| `scripts/build_master_registry.js` | `B7F174BCC341E32C819D3484DFCB0A810D9B5E33AAEBB6FFAE0A7CA4ABFC58A2` | 2026-09-21 | Registry regeneration |

**T0 verification:** At session startup, verify hashes for all governance-critical files against this baseline. Any unexpected change → halt all certification operations until verified.

---

## 6. Baseline Verification Log

| Date | Session | Files Verified | Stable |
|------|---------|---------------|--------|
| 2026-07-28 | **Session 907 (S905–S907 G1–G5 Drift Reconciliation & Full 5-Pack Re-Baseline)** | All 5 pack files — SHA-256 hashes recaptured via `Get-FileHash -Algorithm SHA256`. **Packs B+D re-baselined: drift from S227 baseline AUTHORIZED** (S869–S870 content enhancement + S871–S872 standardization). Packs A+C+E: CONFIRMED STABLE (hash match against S876/S883 baselines). **Pack C: structural PASS** (node --check clean, line 9010 boundary intact post-S882 restore, P1-CC-001 structurally pristine). Governance guard: 51/51 PASS. Certified pool: 2,298 (0 drift). QID counts: 500/500/500/500/540. **All drift flags cleared. All 5 pack baselines canonical.** | Yes — 2 files re-baselined, 3 stable. All drift reconciled. |
| 2026-07-28 | **Session 880 (S877–S880 Group 2 Content Review & Expansion)** | rebuild_baselines: Pack C re-baselined — AUTHORIZED (S878: 6 fields across 3 QIDs DL-026/DL-008 remediation — P1-CC-011/030/031). Packs A, B, D, E: CONFIRMED STABLE (no Group 2 edits). Governance guard: 51/51 PASS. Certified pool: 2,298 (0 drift). QID counts: 500/500/500/500/540. Group 2 findings: 0 DL-037, 0 DL-010, 0 calculation errors in Sections C/D. 9 items deferred (DL-016 dual-block). | Yes — 1 file re-baselined (Pack C), 4 stable. |
| 2026-07-28 | **Session 883 (S881–S884 800-Series Handoff & Resumption)** | 3 files re-baselined — AUTHORIZED. Pack C restored from S882 backup after line 9010 structural corruption (missing `},` object separator between P1-CC-001 and next item). Forensic backup preserved at `backups/pack_c_corrected.js.bak-corrupt-20260728095354`. Pack A (S873–S874: 2 items repaired) and Pack E (S874: 1 anti-cue fix) re-baselined from prior S876 drift. Governance guard: 51/51 PASS. Certified pool: 2,298 (unchanged). Packs B/D: baseline verified stable (drift investigation deferred). | Yes — Packs A, C, E re-baselined |
| 2026-07-27 | **Session 227 (S227 T0 — C5 + C7 Closeout)** | All 19 governance-critical files — SHA-256 hashes captured. Packs A, B, C, D drifted from S209 baseline — AUTHORIZED (S865-S868 Cohort C + S221 governance upgrade). Pack E + 5 scored cases + app core stable. Governance guard: 45/45 PASS. §5 governance-critical hashes populated (was CAPTURE_AT_TEND). C5: MET. C7: MET (3-scenario drift detection verified active). TD-001: RESOLVED (0 DL-016 in Pack A — single-object architecture). TD-002: RESOLVED (0 DL-026 Certified — Domain F scan clean). S220: ALL CONDITIONS MET. Stewardship score: 70→85+. | Yes — all 19 files re-baselined |
| 2026-07-27 | **Session 209 (S209 T0)** | All 8 runtime hashes verified. 4 of 5 pack files drifted from prior baselines: Packs B (8A641309→1951D387), C (EE70859D→D9F884BC), D (B2ED6260→1896278E), E (A98B27B1→B5E954D3). All drift AUTHORIZED via G1-G5 reconciliation — documented in REVISION_HISTORY.md (S853-S856, S826/S829, S316/S317/S808). Hashes recaptured. §1 updated. Governance guard: 6 rules active, 44 tests. | Yes — 4 files re-baselined, 4 stable |
| 2026-07-27 | **Session 374 (Phase 0)** | All 15 runtime files — Packs C+D re-baselined. Pack C: 02BD4D→EE70859D (authorized: S853 + S371). Pack D: E0C365→B2ED62 (authorized: S853 + S826 + S829). §3 DL-026 updated: 3 Certified→0 Certified (S371 resolved). All 6 automatic stop conditions now PASS. Governance guard: 32/32 PASS. | Yes — 2 files re-baselined, 13 stable |
| 2026-07-27 | **Session 811** | All 15 runtime files — §1 SHA-256 hashes recaptured via `Get-FileHash -Algorithm SHA256`. 5 of 15 files drifted from prior S726 baseline (packs A, C, D, E + 1). §2 Certified Pool updated: 2,181→2,298 (2,500→2,540 total with Pack E R-series). §3 DL-021/DL-026 status refreshed. Governance guard: 27/27 PASS. | Yes — all 15 files re-baselined |
| 2026-07-26 | **Session 726** | All 15 runtime files — §1 SHA-256 hashes recaptured via `Get-FileHash -Algorithm SHA256`. 6 of 15 files drifted from prior S530 baseline (packs A–E + scored_cases.js). §3 DL-008 phantom entries (67 CRITICAL) removed — confirmed 0 via Function constructor parse (S722A/S802). DL-016 added to §3 HIGH table. §2 section notes corrected for Packs C/D/E. | Yes — all 15 files re-baselined |
| 2026-07-26 | **Session 536** | ENHANCED_CASE_BASE certification: CBQ-A2 + CBQ-B2. 12 explanations expanded (2,000-2,800 chars). 48 items + 8 cases = 56 Certified. scored_cases.js hash updated. | Yes — scored_cases.js: SHA-256 8F1F9564..., 401,964 bytes, 15 cases, 90 items |
| 2026-07-26 | **Session 535** | ENHANCED_CASE_BASE certification: CBQ-A1 + CBQ-B1. 12 explanations expanded (2,591–5,186 chars). 36 items + 6 cases = 42 Certified. scored_cases.js hash updated. | Yes — scored_cases.js: SHA-256 7690C6BF..., 374,931 bytes, 15 cases, 90 items |
| 2026-07-26 | **Session 530** | 15/15 files — ENHANCED_CASE_BASE Wave 0 remediation. 38 difficulty downgrades. Governance BC-001/002/003 resolved. CURRENT_BASELINES.md updated with May layer files. | Yes — scored_cases.js: 15 cases, 90 items, valid JS parse. |
| 2026-07-24 | Session 63 | 11/11 files — full standardization pass | Yes |
| 2026-07-24 | Session 54 | app.js + index_updated.html + styles.css | Yes |
| 2026-07-24 | Session 31 | 13/13 stable | Yes — Reconciliation execution |
| 2026-07-24 | Session 28 | Pack D write + rest read-only | Yes — FD-045 repair |
| 2026-07-24 | Session 26 | 12/13 stable | Yes — Pack A opt-in |
| 2026-07-24 | Session 20 | 13/13 runtime-critical | Yes — initial baseline capture |
| 2026-07-28 | **Session 896 (S893–S896 800-Series DL-008 Remediation & Final Capstone)** | Packs C+D re-baselined — AUTHORIZED (S893–S895: 59 ExplanationWrong[CorrectChoice] fields cleared). Packs A, B, E: CONFIRMED STABLE (hash match against S888 baseline). Governance guard: 51/51 PASS. Certified pool: 2,298 (0 drift). QID counts: 500/500/500/500/540. Zero structural defects across all packs. | Yes — 2 files re-baselined (C, D), 3 stable (A, B, E) |
| 2026-07-28 | **Session 916–918 (Case Pack 3×25 Reconsolidation)** | 3 new case_pack files + index_updated.html. Hash for index_updated.html: E0B7BBAAE2B6B4C3892FCF3E316DC3D88E21AB6618A05A8567B33AB66335D7D3 (6,033 bytes). 5 legacy scored_cases files archived (backups preserved S916). Governance guard: 51/51 PASS. | Yes — 3 new files registered, 5 legacy archived |
| 2026-07-28 | **Session 923 (Pack C Case Count Resolution)** | Case pack audit confirmed all 3 packs at 25 cases each (not 27 for Pack C as baseline erroneously stated). The "27 cases" figure was a documentation counting error — section distribution (A3+B4+C4+D4+E5+F5=25) and file header ("25 Cases") both confirm 25. SHA-256 hash unchanged from S916 baseline. Governance guard: 51/51 PASS. No file content changes needed. | Yes — documentation error corrected, files unchanged |
| 2026-07-28 | **Session 888 (S885–S888 Group 2 Post-Reconciliation Content Expansion)** | rebuild_baselines S888: 5 of 5 pack files verified — SHA-256 hashes recaptured via Get-FileHash. Packs A, B, D, E drifted from S880/S907 baselines — AUTHORIZED (S886: 20 cognitive-level upgrades across Sections C/D). Pack C: CONFIRMED STABLE (hash match against S880 baseline). Governance guard: 51/51 PASS. Certified pool: 2,298 (0 drift). QID counts: 500/500/500/500/540. All halt conditions: PASS. | Yes — 4 files re-baselined (A, B, D, E), 1 stable (C) |
| 2026-07-31 | **Session 120 (S120 May Persistence Consolidation)** | 4 governance-critical files re-baselined — AUTHORIZED. app.js (D390F6E6), may-core.js (11F3A2AB), may-learner-state.js (18F3C753), may-coaching-orchestrator.js (E0C38E4C). S120: SSOT architecture — all May write paths converge on cmaProfile2026 via patchMayField(). save() pulls fresh May data before persist. init() gated (skipExisting). clearPilotData() now clears profile May fields. Governance guard: 66/66 PASS. Preflight: 0 divergences. Certified pool: 2,451 (unchanged). | Yes — 4 files re-baselined |
| 2026-07-28 | **Session 377 (S377 Baseline Reconciliation Board)** | rebuild_baselines S377: Pack C+D hashes recaptured (authorized drift from S853 WAVE_A certification). §2 Certified Pool recaptured via direct grep: 2,298→2,417. Pack A: 481→500 (S892 closure). Pack C: 388→438 (+50 S853). Pack D: 389→439 (+50 S853). Packs B, E stable. §3 HIGH table: DL-035 added, DL-021 status corrected to RESOLVED (S828). Governance guard: 51/51 PASS. | Yes — 2 files re-baselined (C, D), 3 stable (A, B, E) |
177: | 2026-08-03 | **Pack D Domain F Remediation** | regenerate_ Pack D re-baselined — AUTHORIZED. 34 archived Domain F items replaced via 4-agent parallel authoring. 26 Analyze (Diff 4), 8 Evaluate (Diff 5). 0 DL-008, 0 DL-026. All 5 packs now 100% certified. Backup: `backups/pack_d_corrected.js.bak-20260803234950`. | Yes — 1 file re-baselined (D), 4 stable |
| 2026-09-10 | **Tier 1.2 recurrency + Tier 3 Waves 1+2 + Wave 1+2 certification** | rebuild_baselines regen_pack_baselines (Rule-7-compliant regeneration from raw content/packs): Tier 1.2 recaptured SHA/size/QID/Certified (drift 2,620→2,602 AUTHORIZED: DL-012 archival 18). Wave 1 (P1-CD-101..130) + Wave 2 (P1-CC-101..130) inserted Unprocessed then certified user-approved 2026-09-10 (60 items, six-dimension HIGH). Certified pool: 2,602→2,662 (C 486→516, D 496→526). QIDs: 500/500/530/530/620. Backups: `.bak-T3W1-20260910`, `.bak-T3W2-20260910`, `.bak-cert-20260910` (C+D). Governance guard: 74/74 PASS. Preflight: 0 divergences. Pipeline: GREEN. | Yes — 2 files re-baselined (C, D), 3 stable (A, B, E) |

---

*Last updated: 2026-09-20 baseline_coherence --fix — Certified pool: 3,052 (A 560 + B 620 + C 606 + D 586 + E 680); 18 non-Certified (Archived DL-012). QID: 3,070. Governance guard 98/98.*
