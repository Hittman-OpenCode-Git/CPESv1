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
| `app.js` | `D390F6E66A86789E57434516673F99792AE0CC14B9B8715AF1B99B6D562E58A0` | 309,932 | 2026-07-31 21:05 | rebuild_ **S120 — May Persistence Consolidation (SSOT).** Removed stale syncToMayStorage() push-back on save/init. Added patchMayField() SSOT helper. save() now calls syncFromMayStorage() before persisting. May writes converge on cmaProfile2026. |
| `index_updated.html` | `586396F940099B007D07276A1D159E964F298E2126D890A50449CA3378418755` | 6,090 | 2026-07-25 16:44 | May coaching layer script tags added (may-learner-state.js, may-core.js). |
| `styles.css` | `F0C4DFCED01065417E56AA7F1057911A2271C6A697927A0A757D5EC9D88AC2D6` | 68,696 | 2026-07-25 22:14 | S64+ style updates for May coaching UI. |

### May Coaching Layer

| File | SHA-256 | Size (bytes) | Last Modified | Provenance |
|------|---------|-------------|---------------|------------|
| `may-core.js` | `11F3A2AB027E67FCD5782BD6B6C44801923E477CF5AB193263423AA33B8F1AAB` | 377,728 | 2026-07-31 21:05 | rebuild_ **S120–S131 May Coaching Layer — core engine.** Authorized runtime exception (Constitution §11.4). Referenced by `index_updated.html` line 13. S120: SSOT persistence — all _persist*() functions now write to cmaProfile2026 via patchMayField(). |
| `may-learner-state.js` | `18F3C753B6F986C0E5ABF3B0B025FB705D4415A49C975D49D84C027BB32E3CBB` | 137,429 | 2026-07-31 21:05 | rebuild_ **S120–S131 May Coaching Layer — learner state.** Authorized runtime exception (Constitution §11.4). Referenced by `index_updated.html` line 11. S120: save() and saveStudentRoll() now write to cmaProfile2026 via patchMayField(). |

### MCQ Pack Files

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| `pack_a_corrected.js` | `CAB4EFC7E7E6441A576FB9BC45007593205D54E658DB3B3F67A218811111A783` | `TBD` | TBD | 2026-07-28 ~11:45 | **S892 Pack A Final Closure.** 19 archived items replaced with newly authored Analyze/Evaluate items (Section A: 2 ASC 606/330 Analyze + Section E: 17 COSO Analyze/Evaluate across all 5 COSO components). QID: 500. Certified: **500 (100%).** Governance guard: 51/51 PASS. DL-008: 0. DL-026: 0. Rule 9: 0. AUTHORIZED — Pack A closure. Hash recaptured. |
| `pack_b_corrected.js` | `04D68A74CA59D4B8A39CC5D13FC2E1A16B12CFE18050F39D6A404BEB511956BF` | `TBD` | 1,508,181 | 2026-07-30 11:53 | **S81 rebuild_baselines.** Removed duplicate `question_state` field from P1B-E-086. QID: 500. Certified: 500. AUTHORIZED. |
| `pack_c_corrected.js` | `EC41F3EE1C5CDD52D096F43D65F528DD0F332269536971BB335914CD3664AAA5` | `TBD` | 2,193,542 | 2026-08-03 | **regenerate_ Pack C Domain F Remediation.** QID: 500. Certified: **500 (100%).** 36 archived Domain F items replaced with newly authored Analyze/Evaluate items (27 Analyze, 9 Evaluate). 4-agent parallel authoring. 0 DL-008, 0 DL-026. BLOCK-AUTHORIZED. |
| `pack_d_corrected.js` | `EC83099D0C818645A9ED767F4FBBD514194ECAD57EEA1FA340C470BDF8F397B3` | `TBD` | TBD | 2026-08-03 | **regenerate_ Pack D Domain F Remediation.** QID: 500. Certified: **500 (100%).** 34 archived Domain F items replaced via 4-agent parallel authoring. 0 DL-008, 0 DL-026. |
| `pack_e_corrected.js` | `2C10270EAF9B978BAD1BB8893CED8D5323FC530D16F339F0EB9D18A64903A1E9` | `TBD` | 2,382,616 | 2026-08-03 | **regenerate_ Phase 2 Certification — S140-S144.** QID: 620. Certified: **620 (100%).** All 75 S-series items certified. 0 DL-008, 0 DL-026. |

**rebuild_baselines S377: Pack A 500 (matched S892 baseline), Pack B 500 (matched S888 baseline), Pack C 438 (+50 from S853 WAVE_A), Pack D 439 (+50 from S853 WAVE_A), Pack E 540 (matched S888 baseline). Packs C+D hashes recaptured (authorized drift from S853 certification). Pack A: DRIFT FLAG CLEARED — §1 hash matches S892 baseline. Governance guard 51/51 PASS. Certified pool: 2,417 (Pack A 500 + Pack B 500 + Pack C 438 + Pack D 439 + Pack E 540 = 2,417). DL-035: 39 Certified Domain F items carry empty distractor EW slots — S377 IN PROGRESS.**

### Case Pack Files (3-Pack Architecture — S916–S918 + S918-Authoring Wave)

| File | SHA-256 | MD5 | Size (bytes) | Last Modified | Provenance |
|------|---------|-----|-------------|---------------|------------|
| `case_pack_1_corrected.js` | `10BB5CE59D04F44398F8CE27C42C3F9BD15714CF586D4E3F68234B8A41BAF330` | `TBD` | 547,722 | 2026-07-28 12:30 | **S922 regenerate_ CASE_BANK_A + CASE_BANK_D. 25 cases, 141 items, all Certified. Sections: A4 B4 C5 D5 E4 F3. Aliases: CASE_BANK_A/D, MIGRATED_CASE_BASE_A/D.** |
| `case_pack_2_corrected.js` | `76DF40C2B9A6BC7EF446BE9B1AC75FC10CBADA65F77D62777C337C0DCF15DBD1` | `TBD` | 389,349 | 2026-07-28 12:30 | **S922 regenerate_ CASE_BANK_B + CASE_BANK_E. 25 cases, 132 items, all Certified. Sections: A4 B4 C5 D5 E4 F3. Aliases: CASE_BANK_B/E, MIGRATED_CASE_BASE_B/E.** |
| `case_pack_3_corrected.js` | `8B84A0DC53A879EBA1C4F6494F8037E71305A8DAD8D08FF36234D4C998DD683F` | `TBD` | 530,746 | 2026-09-04 16:12 | **S918-Authoring Wave: Case Pack 3 (CASE_BANK_C). 30 cases, 152 items, all Certified. Sections: A5 B5 C5 D5 E5 F5. 5 new cases authored: CBQ3-A1 (Revenue Recognition ASC 606), CBQ3-A2 (Inventory LCNRV), CBQ3-B4 (Master Budget), CBQ3-C4 (Standard Costing Variance Analysis), CBQ3-D4 (Job Order Costing). Balanced section distribution achieved.** |

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

## 2. Certified Pool — 2026-07-28 Snapshot (rebuild_baselines S377 T0 Direct Grep)

| Pack | Total QIDs | Certified | Sections Closed | Notes |
|------|-----------|-----------|-----------------|-------|
| Pack A | 500 | 500 | All 6 sections (4 duplicates removed, 4 new items authored — P1-B-025, 034, 046, 096) | regenerate_ Section B Fill — **100% certified** |
| Pack B | 500 | 500 | All 6 sections | 100% certified |
| Pack C | 500 | 500 | All 6 sections (4 DL-008 + 5 DL-026 fixed) | regenerate_ Critical Fix — **100% certified** |
| Pack D | 500 | 500 | All 6 sections | regenerate_ Pack D Domain F — **100% certified** |
| Pack E | 620 | 620 | All 6 sections | regenerate_ Phase 2 Cert — **100% certified** |
| **Total** | **2,620** | **2,620** | | regenerate_ Section B Fill — **100% certified** |

**Methodology regenerate_ Full Pool Closure:** All 5 packs 100% certified. QID counts: 500/500/500/500/620. Certified: 500/500/500/500/620. Total pool: 2,620/2,620.

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
| DL-035 — Governance Guard DL-026 Coverage Gap | 39 Certified Domain F items (Pack C: 28, Pack D: 11) carry empty distractor EW slots. Governance guard Rules 1-5 passed but no DL-026 check existed at certification time. Rule 6 deployed S814. Content remediation pending S816-S818. | **S377 IN PROGRESS** — 39 Certified learner-pool items affected |
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
| Rule 1 — question_state → REVISION_HISTORY BLOCK | BLOCK | Active (upgraded S221 Phase 1) |
| Rule 2 — DL-008 BLOCK | BLOCK | Active |
| Rule 3 — Registry BLOCK | BLOCK | Active |
| Rule 4 — answer-key → recomputed note BLOCK | BLOCK | Active (upgraded S221 Phase 1) |
| Rule 5 — 30-item cap BLOCK | BLOCK | Active |
| Rule 6 — DL-026 empty distractor BLOCK | BLOCK | Active |
| Rule 7 — DERIVED_REGISTRY_NOT_AUTHORITATIVE BLOCK | BLOCK | Active (deployed S221 Phase 1) |
| Rule 8 — UNTRACKED_ARTIFACT BLOCK | BLOCK | Active (deployed S221 Phase 1) |
| Rule 9 — Choice binary lead-in polarity mismatch (DL-037) BLOCK | BLOCK | Active (deployed S913) |
| **Test Suite** | **51/51 PASS** | **Verified S907 Tend** |

---

## 5. Governance-Critical File Hashes (S221)

These files directly affect governance enforcement, certification integrity, and learner safety. Any hash change to these files without corresponding REVISION_HISTORY entry is a drift event (Category 4 — Manual Workarounds).

| File | SHA-256 | Last Modified | Purpose |
|------|---------|---------------|---------|
| `.opencode/plugins/governance-guard.js` | `F5CFBF616CF5527B24692D5EADDECB3B4806D42A5A309A7A15C504E348144CC5` | 2026-07-28 09:10 S913 | 9-rule BLOCK enforcement (Rule 9: DL-037 logic inversion added) |
| `scripts/test_governance_guard.js` | `F0FD4198C719CAA909CDCDF237F54BC8D58D8CC826342B478278C3B2BDDC9FC8` | 2026-07-28 09:11 S913 | 51-test governance guard suite (6 Rule 9 tests added) |
| `scripts/validators/ExplanationValidator.js` | `99FD17C74D1556E7C0A3066647C33FA1F4FFCF2FC24A64193419A27A3CA07B8D` | 2026-07-23 | DL-008/DL-018 detection |
| `scripts/build_master_registry.js` | `B8917892F34124217D3DDB042C5F4F9B4635C5C4F3DB6B1CA9D8223A7C85FA7F` | 2026-07-21 | Registry regeneration |

**T0 verification:** At session startup, verify hashes for all governance-critical files against this baseline. Any unexpected change → halt all certification operations until verified.

---

## 6. Baseline Verification Log

| Date | Session | Files Verified | Stable |
|------|---------|---------------|--------|
| 2026-07-28 | **Session 907 (S905–S907 G1–G5 Drift Reconciliation & Full 5-Pack Re-Baseline)** | All 5 pack files — SHA-256 hashes recaptured via `Get-FileHash -Algorithm SHA256`. **Packs B+D re-baselined: drift from S227 baseline AUTHORIZED** (S869–S870 content enhancement + S871–S872 standardization). Packs A+C+E: CONFIRMED STABLE (hash match against S876/S883 baselines). **Pack C: structural PASS** (node --check clean, line 9010 boundary intact post-S882 restore, P1-CC-001 structurally pristine). Governance guard: 51/51 PASS. Certified pool: 2,298 (0 drift). QID counts: 500/500/500/500/540. **All drift flags cleared. All 5 pack baselines canonical.** | Yes — 2 files re-baselined, 3 stable. All drift reconciled. |
| Date | Session | Files Verified | Stable |
|------|---------|---------------|--------|
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

---

*Last updated: 2026-08-03 regenerate_ — Full Pool Closure. ALL 5 packs 100% certified. Total: 2,620/2,620. Pack D SHA-256: `EC83099D0C818645A9ED767F4FBBD514194ECAD57EEA1FA340C470BDF8F397B3`. Governance guard 66/66. Full remediation complete.*
