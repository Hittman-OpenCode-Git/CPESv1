# CURRENT_BASELINES_P2.md — Part 2 Certified Pool Snapshot

**Purpose:** Authoritative reference for P2 preflight cross-checks.  
**Status:** Active  
**Updated:** 2026-09-06 — Full-pool certification wave: all 330 remaining Unprocessed MCQs (Pack A +100, B +100, C +130) + 12 Unprocessed cases/72 items (Pack 3 CBQ23-A5..C9) certified. Pack C archived clones (P2-C-198, P2-C-199) replaced with new Decision Analysis items (EVSI/Bayesian revision + transfer pricing with opportunity cost). Pool now **3,530/3,530 Certified** (2026-10-17 coherence refresh)
**Preflight script:** `scripts/preflight_p2.js` (read-only T0/Tend gate; cross-checks counts here)

**2026-09-04 — Portfolio Target Amendment (user-authorized):** New pool targets ratified — **3,450 MCQs (A=600, B=600, C=750, D=500, E=500, F=500)** and **100 cases (Pack 1=33, Pack 2=33, Pack 3=34)**. Supersedes prior 2,500-MCQ / 75-case allocation. Sizing rule: 25% CSO weight → 750 items, 20% → 600, ≤15% → 500. Per-pack Section QID ranges re-allocated in this session; current authoritative QID-range table at §5.

---

## §1. Part 2 MCQ Pack Baselines

| Pack | File | Target QIDs | Current QIDs | Certified | Unprocessed | Archived | Hash (SHA256, post-Tend) |
|------|------|-------------|-------------|-----------|-------------|----------|--------------------------|
| A | p2/pack_p2_a.js | **600** | 622 | 622 | 0 | 0 | `ea398abe300d0b127cc5c3331c75ea34ec0885c38900f31b80daf1c7466f0123` |
| B | p2/pack_p2_b.js | **600** | 620 | 620 | 0 | 0 | `d0888d6353269b52bcdfa82193e4ab3368129b6d075df79125218604376e01bc` |
| C | p2/pack_p2_c.js | **750** | 788 | 788 | 0 | 0 | `64da5c3ce90fc9a705efb397bd24ba42d4b2b667ef9217ddf0737c1e4be67789` |
| D | p2/pack_p2_d.js | **500** | 500 | 500 | 0 | 0 | `8297753f87f6f6af8024f00dae2916041c6717e71e92af90d913ea70c2168154` |
| E | p2/pack_p2_e.js | **500** | 500 | 500 | 0 | 0 | `735e30ebe478b6aba7de481415fafe75ee8ad5b42489b7625791126dab869092` |
| F | p2/pack_p2_f.js | **500** | 500 | 500 | 0 | 0 | `c348cc47a6b82bc36b97624941bcf1468f1f11003035385add60b72bb4c8163d` |
| **Total** | | **3,450** | **3,450** | **3,450** | **0** | **0** | |

*2026-09-05 — P2-CERT-AUDIT certification wave: +812 MCQs certified (B +100, C +234, D +165, E +238, F +75). All 141 answer-key defects (DL-P2-017) repaired before flip; 13 UNCLEAR items held Unprocessed (P2-C-534/558/594/595/607/614, P2-E-267/274/279/282/305/310/311). Certified total 3,105.*

*2026-09-19 — P2-A tail certified (15 flips: 084/280/371/550 clean + 11 remediated HOLDs; DL-057). Raw-grep Certified reads 601, not 600: P2-A-265 carries a pre-existing duplicate identical `"question_state": "Certified"` key (proven present in the pre-edit backup `.bak-P2A REM-20260919234257`; both values Certified so runtime behavior is unaffected). Element-level truth remains 600/600 Certified. Duplicate left untouched (cosmetic; removal risk exceeds benefit) — do not "fix" without authorization.*

## §1b. Case Pack Baselines

> **2026-09-30 RECAPTURE (Session P2-085, DL-P2-023).** The prior §1b table claimed
> 100/100 cases Certified across 3 files. That was **false against live state** and
> omitted two live banks entirely. Corrected below against verified raw-file counts.
> The drift cause is the unattributed bulk quarantine of 2026-09-24 — see
> `scripts/output/quarantine_reconciliation_20260930.json` and `p2/DEFECT_LIBRARY_P2.md` DL-P2-023.

> **2026-09-30 UPDATE 2 (Session P2-085, DL-P2-024).** 9 whole-case duplicates were
> adjudicated and archived (see table below); 83 mojibake sequences across 30 string
> literals in `case_pack_p2_C4_C8.js` were repaired. **Strict-eligible fell 36 → 33**
> because 3 of the archived duplicates were Certified learner-reachable copies.

| File | Target Cases | Current Cases | Certified | In Audit | Archived | Items | Hash (SHA256, post-DL-P2-024) |
|------|--------------|---------------|-----------|----------|----------|-------|------------------------------|
| p2/case_pack_p2_1.js | 33 | 33 | **11** | 22 | 0 | 198 | `7e2082aab58a78c699326208bef13b894b5f6678c6dd703d061f8365bc57eeae` |
| p2/case_pack_p2_2.js | 33 | 33 | **6** | 18 | **9** | 198 | `2501A0132A876BF1F433628014655300B054CBC20058DD1659D5153C76DE4A11` |
| p2/case_pack_p2_3.js | 34 | 34 | **6** | 28 | 0 | 204 | `1c431753df5d1420b9383ee5027562d4d10699b179f674a53ec777b8872aa056` |
| p2/case_pack_p2_authored.js | — | 5 | **5** | 0 | 0 | 30 | `082143e41fca93295c00b0da4f18477c2582ea3990c10be866288497ea4850b5` |
| p2/case_pack_p2_C4_C8.js | — | 5 | **5** | 0 | 0 | 30 | `CEB84C815F576C10B5AE18B186BC13783D95F6119C647DCDF4F4F9CE58C44729` |
| **Total (P2)** | 100 | **110** | **33** | **68** | **9** | **660** | |

**Strict-eligible = 33.** Live (non-Archived) P2 cases = **101**. The pool remains 110
CaseIDs; 9 are terminal-state Archived duplicates of cases retained in the
`authored` / `C4_C8` banks. Whole-case duplicate groups: **0** (clone gate Class A).

### DL-P2-024 archived duplicates (2026-09-30)

Archived in `p2/case_pack_p2_2.js` with `archive_batch: DL-P2-024-DEDUP` / `archive_date: 2026-09-30`; survivors retained in `p2/case_pack_p2_authored.js` or `p2/case_pack_p2_C4_C8.js`:

| Archived | Survivor | Basis |
|---|---|---|
| CBQ22-F7 | CBQ22-F8 | Identical content; F7 was learner-reachable duplicate |
| CBQ22-C7 | CBQ22-C12 | C12 carries corrected key + DL-065 provenance |
| CBQ22-A5 | CBQ22-A8 | Identical; A8 carries newer stamp |
| CBQ22-F5 | CBQ22-F9 | Identical |
| CBQ22-F6 | CBQ22-F10 | Identical |
| CBQ22-C4 | CBQ22-C9 | C9 corrected: relevant-cost key $37.50 vs stale $6.30 |
| CBQ22-C5 | CBQ22-C10 | C10 corrected: shadow price $6.00/hr (A) vs stale $12 (D) |
| CBQ22-C6 | CBQ22-C11 | C11 corrected: pilot strategy (C) vs stale "enter immediately" (B) |
| CBQ22-A6 | CBQ22-A7 | A7 carries DL-P2-022-RW rewrite |

Key divergences adjudicated by **independent hand-solve against exhibit rows**:
CBQ22-C5-Q4 shadow price = CM_B ($18) ÷ 3.0 extrusion hours = **$6.00/hr** (choice A);
CBQ22-C6-Q3 — the stale copy's stored answer (B) contradicted its own explanation,
which concluded the pilot's EMV exceeds $9.5M.

### Pre-quarantine reference (DL-P2-023 ground truth)

Recovered from Wave A backups (epoch `1790221063xxx`), cross-validated against git ref `54144674` — **6/6 banks agree** (AGENTS.md §6 two-implementation gate).

| File | Certified @ Wave A | Certified now | Demoted |
|------|--------------------|---------------|---------|
| p2/case_pack_p2_1.js | 33 | 11 | 22 |
| p2/case_pack_p2_2.js | 33 | 9 | 24 |
| p2/case_pack_p2_3.js | 34 | 6 | 28 |
| p2/case_pack_p2_authored.js | 5 | 5 | 0 |
| p2/case_pack_p2_C4_C8.js | 5 | 5 | 0 |
| **P2 total** | **110** | **36** | **74** |
| P1 case_pack_1_corrected.js | 25 | 19 | 6 |
| P1 case_pack_2_corrected.js | 25 | 15 | 10 |
| P1 case_pack_3_corrected.js | 30 | 15 | 15 |
| **P1 total** | **80** | **49** | **31** |

`case_pack_p2_authored.js` live hash is **identical** to its Wave A backup, proving the quarantine left it untouched. Total pool: 190 cases / 1085 items, **0 deleted, 0 added** across the wave.

### Wave A backup hashes (recovery source of record)

| File | SHA256 (Wave A) |
|------|-----------------|
| p2/case_pack_p2_1.js | `4e3a86479901d0a75863bfd12b4c5d0063f77925938f4e8df2f6218ca838bee2` |
| p2/case_pack_p2_2.js | `983cd6241907db1df4fa5c26919da4abaa96dfd1a164216554311debb1d66fb3` |
| p2/case_pack_p2_3.js | `d76c59dbb7dc0d56a1f807d93cee5d27aa4bed650974a41f348d2ca6f566b89e` |
| p2/case_pack_p2_authored.js | `082143e41fca93295c00b0da4f18477c2582ea3990c10be866288497ea4850b5` |
| p2/case_pack_p2_C4_C8.js | `777329598a020aed4a682c03a8f9964071c7216d03a7c519694caf8397e23014` |

> ⚠️ **Do not wholesale-restore from Wave A.** 58 of the 105 demoted cases also received
> legitimate post-quarantine content fixes (132 `Explanation`, 13 `Choices`, 10 `Correct`
> edits from DL-063 on 2026-09-25 and DL-065 on 2026-09-28). Any remediation is
> **state-only and content-preserving**. See DL-P2-023.

*2026-09-05 — P2-CERT-AUDIT case wave: 10 Pack 2 Unprocessed cases certified (C4, C5, C6, C7, C8, A5, A6, F5, F6, F7) in 2 batches of 5 after answer-key/exhibit remediation (DL-P2-018) and duplicate-CaseID re-key (DL-P2-019: CBQ22-A4→A6, CBQ22-F4→F7). CBQ22-B6 remediated and certified in the follow-on P2-B6-REMEDIATE wave (2026-09-05): stripped literals restored from explanation arithmetic (bonds , preferred .98/400K/.50, common .00, project /.2M), 6/6 answer keys independently verified AGREE. Pool-wide **88/88 cases Certified**. Orphaned files `case_pack_p2_authored.js` / `case_pack_p2_C4_C8.js` documented (DL-P2-020), not certified.*

*2026-09-04 — Pack 1 case certification wave (P2-PACK1-CERT): 9 Unprocessed → Certified in 3 batches × 18 items (Rule 5 ≤30). 28 Choices conversions (19 Unprocessed + 9 pre-existing in 3 Certified cases) + 26 explanation rewrites (18 boilerplate + 8 short) applied inline. All gates 0 failures. Backups: `case_pack_p2_1.js.bak-p2-pack1cert-20260904151554` (pre-edit, 432,247 B) + `.bak-p2-pack1cert-preflip-20260904152215` (post-remediation pre-flip, 437,275 B). Pool now 28/28 Certified in Pack 1; remaining +5 cases to reach target 33 deferred to a future authoring wave.*

*2026-09-04 — P2-078 certification wave: 18 Unprocessed → Certified across Packs 2 and 3 (9 per pack), session P2-078, date 2026-09-04. All 18 cases previously reviewed and remediated (P2-077 Phase C dual review + 18-case wave corrections). Backups: `case_pack_p2_{1,2,3}.js.bak-20260904152425` (438,031 / 345,317 / 350,683 B). All case packs re-parse via Function constructor, 0 parse errors, 0 divergences. Pool now 72/72 Certified, 0 Unprocessed across all 3 case packs.*

*2026-09-03 — Nine-case authoring wave: +9 cases (3 per pack, 6 items each, 54 items total, all Unprocessed, ProductionStatus Draft, Part2OnlyFlag true). IDs: CBQ21-A5, CBQ21-C5, CBQ21-F3, CBQ22-B4, CBQ22-D4, CBQ22-E2, CBQ23-A3, CBQ23-C4, CBQ23-F4. Governance: backup-before-write per BACKUP_PROTOCOL.md, Rule 5 ≤30 per pack (18 items/pack), 0 duplicate CaseIDs, 0 parse errors, preflight_p2 0 divergences, validate:p2 0 errors, governance guard 74/74 PASS. Defects corrected: CBQ21-C5 Q2 answer 78000→138000 (Critical), exhibit validity trims (Risk Score, CM per Hour, EV precomputes), difficulty recalibration (CBQ23-A3 Q1/Q2, CBQ23-C4 Q1/Q2 Difficult→Moderate), rounding CBQ23-A3 Q1 34259→34260.*

*2026-09-03 — Eighteen-case authoring wave (two batches of 9): +18 cases (6 per pack, 6 items each, 108 items total, all Unprocessed, ProductionStatus Draft, Part2OnlyFlag true). Batch3 IDs: CBQ21-A6, CBQ21-C6, CBQ21-F4, CBQ22-B5, CBQ22-D5, CBQ22-E3, CBQ23-A4, CBQ23-B2, CBQ23-C5; Batch4 IDs: CBQ22-A4, CBQ21-B5, CBQ22-C3, CBQ21-D3, CBQ21-E4, CBQ22-F4, CBQ23-D3, CBQ23-E4, CBQ23-F5. Governance: backup-before-write per BACKUP_PROTOCOL.md, Rule 5 ≤30 per pack per batch (18 items/pack per batch), 0 duplicate CaseIDs, 0 parse errors, preflight_p2 0 divergences, validate:p2 0 errors, governance guard 74/74 PASS. Critical/high defects corrected: CBQ21-B5-Q2 0.20→0.78, CBQ22-E3-Q2 32400→44900, RAROC/PI leakage removed, phantom F removed, 18× metadata scrambled (Difficulty/DifficultyScore/CognitiveLevel) and 28× short explanations fixed.*

*2026-09-04 — P2-079 Pack 2 authoring wave: +11 cases (66 items) appended to case_pack_p2_2.js, all Unprocessed, ProductionStatus Draft, Part2OnlyFlag true. IDs: CBQ22-C4, CBQ22-C5, CBQ22-C6, CBQ22-C7, CBQ22-C8, CBQ22-B6, CBQ22-A4, CBQ22-A5, CBQ22-F4, CBQ22-F5, CBQ22-F6. Domain distribution: A+2, B+1, C+5, D+0, E+0, F+3. Pack 2 now 33/33 cases (22 Certified + 11 Unprocessed). Pool-wide: 88/100 cases authored, 77 Certified. Backup: `case_pack_p2_2.js.bak-20260904160157` (346,010 B). Pipeline: 0 errors, registry 3,045.*

---

## §2. Governance Guard Status

| Rule | Summary | Status |
|------|---------|--------|
| 1 | question_state -> REVISION_HISTORY.md | BLOCK |
| 2 | DL-008 (non-empty EW[CC]) | BLOCK |
| 3 | Registry not hand-edited | BLOCK |
| 4 | Answer-key -> recomputed note | BLOCK |
| 5 | <=30 items per change-set | BLOCK |
| 6 | DL-026 (empty distractor EW) | BLOCK |
| 7 | Derived registry not authoritative | BLOCK |
| 8 | Session packages must be registered | BLOCK |
| 9 | DL-037 (choice binary polarity) | BLOCK |
| 10 | DL-021 (absent distractor EW) | BLOCK |
| 11 | Cognitive classification gates | BLOCK |
| 12 | Cognitive-First Assignment | BLOCK |
| 13 | Part2OnlyFlag: true on P2 items | BLOCK |
| 14 | Cross-part QID boundary | BLOCK |
| **Tests** | **74/74 PASS** | |

---

## §3. Known Defect Status (P2)

| Defect | Description | P2 Items Affected | Severity |
|--------|-------------|------------------|----------|
| DL-008 | Non-empty EW[CC] | 0 | — |
| DL-026 | Empty non-CC EW slots | 0 | — |
| DL-013 | Boilerplate explanations | 0 | — |
| DL-037 | Choice binary lead-in mismatch | 0 | — |
| SCHEMA | Legacy `Type` field | 0 (migrated) | — |
| SCHEMA | Legacy `VerificationChecks` | 0 (migrated) | — |

---

## §4. Schema Version

**Active:** P2_SCHEMA_STANDARD.md v1.1 (ratified 2026-08-04; amended 2026-08-24)

| Field | Status |
|-------|--------|
| ItemStyle (not Type) | Enforced |
| VerifiedChecks (not VerificationChecks) | Enforced |
| UniqueConceptKey | Required |
| CrossDomainTags | Available |
| Part2OnlyFlag: true | Rule 13 BLOCK |
| v1.1 evidence fields | Report-only mode (new items grandfathered under v1.1 policy; migration gate not yet blocking) |

---

## §5. QID Allocation (P2003 v3.0 — revised 2026-09-04)

Sizing rule: 25% CSO weight → 750 items, 20% → 600, ≤15% → 500.

| Section | Domain | CSO Weight | Range | Target Count | Current Count | Gap |
|---------|--------|-----------|-------|-------------|---------------|-----|
| A | Financial Statement Analysis | 20% | P2-A-001–600 | **600** | 600 | 0 |
| B | Corporate Finance | 20% | P2-B-001–600 | **600** | 600 | 0 |
| C | Decision Analysis | 25% | P2-C-001–750 | **750** | 750 | 0 |
| D | Enterprise Risk Management | 10% | P2-D-001–500 | **500** | 500 | 0 |
| E | Capital Investment Decisions | 10% | P2-E-001–500 | **500** | 500 | 0 |
| F | Professional Ethics | 15% | P2-F-001–500 | **500** | 500 | 0 |
| **Total** | | **100%** | | **3,450** | **3,450** | **0** |

---

**2026-09-04 — Overnight Sprint P2-B/D/F to 500 (Governed Staged Authoring):** B 310→500 (+100 via 4×25 B-401..500), D 245→500 (+255 via 336-365/366-395/396-425/426-455/456-485/486-500 = 90+30+30+15), F 245→500 (+255 via 426-455/456-485/486-500). All staged Unprocessed, schema v1.1, 0 DL-008/026, QID/Topic/UCK unique, preflight_p2 0 divergences, guard 74/74. Critical/high fixes on existing pool: B-313/343 duplicate UCK + B-313/314/319/343/344 LOSTag B.3→B.4/B.5; D-048 Principle 14→15, D-168 truncated Choice A restored ($55k/$40k/$15k), D-174 ES $2.50M→$4.13M + EC 2.5%→25.5% correction, D-177 Authority COSO→ASC 830, D-167 cyclical attribution removed; F-137/152/167 Analyze→Evaluate ceiling fix + F-003/004/005 LOSTag realignment. Backups: `p2/pack_p2_b.js.bak-20260904-P2B-*` (×4), `p2/pack_p2_d.js.bak-20260904-P2D-*` (×6), `p2/pack_p2_f.js.bak-20260904-P2F-*` (×3) + defect-fix backups `p2/pack_p2_{b,d,f}.js.bak-20260904-P2{ B,D,F}fixes`.

*Regenerated by scripts/baseline_coherence.js --fix (2026-09-13). preflight_p2.js is a read-only gate and does not write this file. Do not hand-edit between sessions.*
