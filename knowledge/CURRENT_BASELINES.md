# Current Baselines

**Purpose:** Single source of truth for all runtime-critical file baselines — SHA-256 hashes, sizes, provenance, and structural notes.

**Generated:** 2026-07-24 — Session 20 (Governance & Structure Cleanup)
**Updated:** 2026-09-04 — S918-Authoring Wave (Pack 3 expanded: 25→30 cases, 127→152 items, balanced section distribution. 5 new cases: CBQ3-A1 Revenue Recognition, CBQ3-A2 Inventory LCNRV, CBQ3-B4 Master Budget, CBQ3-C4 Standard Costing, CBQ3-D4 Job Order Costing. All Certified. Preflight 0 divergences. Guard 74/74.)
**Prior updates:** S905–S907 (G1–G5 Drift Reconciliation & Full 5-Pack Re-Baseline), 2026-07-27 — S227 (C5 SHA-256 capture + C7 drift verification. Packs A-D re-baselined post-S865-S868 Cohort C + S221 governance upgrade authorized drift. All S220 recertification conditions MET.), Session 374 Phase 0 (Packs C+D re-baselined post-S371/S853/S826/S829 authorized drift), Session 811 (Framework v2 Wave 1), Session 726 (Phantom Baseline Remediation), Session 537 (ENHANCED_CASE_BASE certification), Session 530 (Wave 0 Remediation)
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md

---

## 1. Runtime-Critical Files — SHA-256 Baseline

All hashes recaptured S726 via `Get-FileHash -Algorithm SHA256`. Prior hashes were from S530 T0 baseline — 6 of 15 files drifted (packs A–E + scored_cases.js). Authorized drift from S63 baselines: S64–S726 active development.

### Application Core

| File | SHA-256 | Size (bytes) | Last Modified | Provenance |
|------|---------|-------------|---------------|------------|
| `app.js` | `8FD477EA3B3A5ACDFB9E486E932B0CE299CA5A44C70BCF44F837C96F437FA1D4` | 445,125 | 2026-09-13 | rebuild_ **S120 — May Persistence Consolidation (SSOT).** Removed stale syncToMayStorage() push-back on save/init. Added patchMayField() SSOT helper. save() now calls syncFromMayStorage() before persisting. May writes converge on cmaProfile2026. |
| `index_updated.html` | `412927876FCF1F6B74B09019379A05DA7BED22501BD34587006617311EF4E00A` | 12,766 | 2026-09-13 | May coaching layer script tags added (may-learner-state.js, may-core.js). |
| `styles.css` | `6190DB342138F0A034C72B5DB9550E92674C03B5FE0AABD54D519680B1CF3F71` | 160,854 | 2026-09-13 | S64+ style updates for May coaching UI. |

### May Coaching Layer

| File | SHA-256 | Size (bytes) | Last Modified | Provenance |
|------|---------|-------------|---------------|------------|
| `may-core.js` | `370787D2820446B3AE1F88132F6815C8E4242EDDB6D0A2BE3678D387E25539CE` | 376,840 | 2026-09-13 | rebuild_ **S120–S131 May Coaching Layer — core engine.** Authorized runtime exception (Constitution §11.4). Referenced by `index_updated.html` line 13. S120: SSOT persistence — all _persist*() functions now write to cmaProfile2026 via patchMayField(). |
| `may-learner-state.js` | `270B94D3437800128E44CEB2EFE195DF362F634455F45F00B3A3291B0DDABCA7` | 138,897 | 2026-09-13 | rebuild_ **S120–S131 May Coaching Layer — learner state.** Authorized runtime exception (Constitution §11.4). Referenced by `index_updated.html` line 11. S120: save() and saveStudentRoll() now write to cmaProfile2026 via patchMayField(). |

### MCQ Pack Files

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| `pack_a_corrected.js` | `212E2CFA08030077660DCC1960D9006BE24DC90492090772F867ECC0B7A18FA7` | `TBD` | 2,653,801 | 2026-09-11 | **Tier 3 Waves 4+14+15 (Pack A closure + Section C expansion).** S892 Pack A Final Closure (19 archived → new Analyze/Evaluate Section A/E). Waves 4+14 added 60 items (P1-A-076..105, P1-C-101..130). QID: **560**. Certified: **560 (100%).** Governance guard: 89/89 PASS. DL-008: 0. DL-026: 0. Rule 9: 0. Hash recaptured 2026-09-11. |
| `pack_b_corrected.js` | `93363F36FE27066B5065C9DAFA7126CFAD0315CB9201F942721655BD39537D3E` | `TBD` | 2,075,993 | 2026-09-11 | **Tier 3 Waves 3+8+12+15 (Pack B multi-section expansion).** S81 baseline (500 QIDs). Waves 3/8/12 added 90 items (BB, tails, BA). Wave 15 added 30 items (P1B-C-211..240, Analyze/Evaluate). QID: **620**. Certified: **620 (100%).** DL-008: 0. DL-026: 0. Rule 9: 0. Hash recaptured 2026-09-11. |
| `pack_c_corrected.js` | `96488BAB805E4BC86D90E9E30E286978FAD02C8C8BD6328862683370A3E16C5C` | `TBD` | 2,732,144 | 2026-09-13 | **Tier 3 Waves 2+10+11+13 (Pack C multi-section expansion).** S853/S826 Domain F remediation baseline (500 QIDs). Waves 2/10/11/13 added 120 items (CC, AC, BC, DC). QID: **620**. Certified: **606 (97.7%).** 14 items Archived (P1-EC-001..065 DL-012 clones). DL-008: 0. DL-026: 0. Rule 9: 0. Hash recaptured 2026-09-11. |
| `pack_d_corrected.js` | `EAC7DF0ABB8D3101BBFE03ED7F5E10C5F3032E926810AD9E3E24C383FABDD72E` | `TBD` | 3,000,253 | 2026-09-10 | **Tier 3 Waves 1+5+6 (Pack D multi-section expansion).** S853 Domain F remediation baseline (500 QIDs). Waves 1/5/6 added 90 items (CD, AD, DD). QID: **590**. Certified: **586 (99.3%).** 4 items Archived (P1-ED-001/014/036/046 DL-012 clones). DL-008: 0. DL-026: 0. Rule 9: 0. Hash recaptured 2026-09-10. |
| `pack_e_corrected.js` | `B18CC546FEA7F707EFDDFF3452844A36FD8CB88407616E63EC31D4A4C12524BC` | `TBD` | 2,664,804 | 2026-09-11 | **Tier 3 Waves 7+9 (Pack E Section B/E expansion).** S140-S144 Phase 2 Certification baseline (620 QIDs). Waves 7+9 added 60 items (P1E-B-101..130, P1E-E-101..130). QID: **680**. Certified: **680 (100%).** DL-008: 0. DL-026: 0. Rule 9: 0. Hash recaptured 2026-09-11. |

**rebuild_baselines S911: Pack A 560 (Tier 3 Waves 4+14), Pack B 620 (Tier 3 Waves 3+8+12+15), Pack C 620 (Tier 3 Waves 2+10+11+13), Pack D 590 (Tier 3 Waves 1+5+6), Pack E 680 (Tier 3 Waves 7+9). All hashes recaptured 2026-09-11/10 (authorized drift from Tier 3 certification waves). Governance guard 89/89 PASS. Certified pool: 3,052 (Pack A 560 + Pack B 620 + Pack C 606 + Pack D 586 + Pack E 680 = 3,052). DL-035: 0 Certified items with empty distractor EW slots — S911 resolved.**

### Case Pack Files (3-Pack Architecture — S916–S918 + S918-Authoring Wave)

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| `case_pack_1_corrected.js` | `46D83ED42B2D1C830808180418B63012143C2144EF97D49F8E53BD1D3953DA7D` | `TBD` | 568,583 | 2026-09-13 | **S922 regenerate_ CASE_BANK_A + CASE_BANK_D. 25 cases, 141 items, all Certified. Sections: A4 B4 C5 D5 E4 F3. Aliases: CASE_BANK_A/D, MIGRATED_CASE_BASE_A/D.** |
| `case_pack_2_corrected.js` | `3BEB23F69C209A155F42CDB740E8076D927CD98E4ADDBE8DCED5BD750C5FED97` | `TBD` | 409,816 | 2026-09-13 | **S922 regenerate_ CASE_BANK_B + CASE_BANK_E. 25 cases, 132 items, all Certified. Sections: A4 B4 C5 D5 E4 F3. Aliases: CASE_BANK_B/E, MIGRATED_CASE_BASE_B/E.** |
| `case_pack_3_corrected.js` | `9031E65F39D1BAA0059F97DCF4CCA11D885A256088EBF63E2F57163946B87105` | `TBD` | 530,746 | 2026-09-13 | **S918-Authoring Wave: Case Pack 3 (CASE_BANK_C). 30 cases, 152 items, all Certified. Sections: A5 B5 C5 D5 E5 F5. 5 new cases authored: CBQ3-A1 (Revenue Recognition ASC 606), CBQ3-A2 (Inventory LCNRV), CBQ3-B4 (Master Budget), CBQ3-C4 (Standard Costing Variance Analysis), CBQ3-D4 (Job Order Costing). Balanced section distribution achieved.** |

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

## 2. Certified Pool — 2026-09-11 Snapshot (rebuild_baselines S911 T0 Direct Grep)

| Pack | Total QIDs | Certified | Sections Closed | Notes |
|------|-----------|-----------|-----------------|-------|
| Pack A | 560 | 560 | All 6 sections (Tier 3 Waves 4+14 expansion: +60 items) | Tier 3 Waves 4+14 — **100% certified** |
| Pack B | 620 | 620 | All 6 sections (Tier 3 Waves 3+8+12+15 expansion: +120 items) | Tier 3 Waves 3+8+12+15 — **100% certified** |
| Pack C | 620 | 606 | All 6 sections (Tier 3 Waves 2+10+11+13 expansion: +120 items; 14 Archived P1-EC-001..065) | Tier 3 Waves 2+10+11+13 — **97.7% certified** |
| Pack D | 590 | 586 | All 6 sections (Tier 3 Waves 1+5+6 expansion: +90 items; 4 Archived P1-ED-001..046) | Tier 3 Waves 1+5+6 — **99.3% certified** |
| Pack E | 680 | 680 | All 6 sections (Tier 3 Waves 7+9 expansion: +60 items) | Tier 3 Waves 7+9 — **100% certified** |
| **Total** | **3,070** | **3,052** | | Tier 3 Waves 1-15 certified 2026-09-11 (A 560/560; B 620/620; C 620/606; D 590/586; E 680/680) |

**Methodology rebuild_baselines S911:** All 5 packs hash-recaptured post Tier 3 certification. QID counts: 560/620/620/590/680. Certified: 560/620/606/586/680. Total pool: 3,070/3,052. Rule 7 compliant — derived from raw grep, refuses on mismatch.

**Case Pack Certification (post-S918-Authoring):** 80 consolidated cases across 3 packs, 425 items. **All 80 cases, 425 items Certified.** 3 packs with 5-letter aliasing: Pack 1 (A:4 B:4 C:5 D:5 E:4 F:3 → aliases A+D), Pack 2 (A:4 B:4 C:5 D:5 E:4 F:3 → aliases B+E), Pack 3 (A:5 B:5 C:5 D:5 E:5 F:5 → alias C). Balanced 5-case-per-section distribution in Pack 3. Variable aliases: CASE_BANK_A/B/C/D/E + MIGRATED_CASE_BASE_A/B/C/D/E for app.js catalog compatibility.

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
| **Test Suite** | **98/98 PASS** | **Verified 2026-09-13 (baseline_coherence --fix)** |

---

## 5. Governance-Critical File Hashes (S221)

These files directly affect governance enforcement, certification integrity, and learner safety. Any hash change to these files without corresponding REVISION_HISTORY entry is a drift event (Category 4 — Manual Workarounds).

| File | SHA-256 | Last Modified | Purpose |
|------|---------|---------------|---------|
| `.opencode/plugins/governance-guard.js` | `6EC007E76464DAAC88799FA7E3758EB56F7B02BB7127190B956B6648F2515163` | 2026-09-13 S913 | 21-rule BLOCK enforcement (Rules 20/21 added S913; guard codification complete) |
| `scripts/test_governance_guard.js` | `BAC2DB16714C2460CF7E589B1794FE05046A1380EDC6AB763854C6CF87147856` | 2026-09-13 S913 | 98-test governance guard suite (Rule 20×4 + Rule 21×5 tests added S913) |
| `scripts/validators/ExplanationValidator.js` | `843988BD592503505E5DC9A494FBE0C0B1ED0FAA96DD889DC165258E7C442777` | 2026-09-13 | DL-008/DL-018 detection |
| `scripts/build_master_registry.js` | `E6044255EBA9D16CDADE72E83E8171A6CE80363C1301B8C14C4C6C378BFFBB44` | 2026-09-13 | Registry regeneration |

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

*Last updated: 2026-09-13 baseline_coherence --fix — Certified pool: 3,052 (A 560 + B 620 + C 606 + D 586 + E 680); 18 non-Certified (Archived DL-012). QID: 3,070. Governance guard 89/89.*
