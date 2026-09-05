# CURRENT_BASELINES_P2.md — Part 2 Certified Pool Snapshot

**Purpose:** Authoritative reference for P2 preflight cross-checks.  
**Status:** Active  
**Updated:** 2026-09-05 — P2-UNCLEAR-FIX wave: all 13 UNCLEAR MCQs remediated (restored literals, choice-set repairs, full rewrites) and certified. Pool now **3,118/3,120 Certified (0 Unprocessed, 2 Archived)**. Prior: **Updated:** 2026-09-05 — Session P2-CERT-AUDIT: full-pool answer-key audit + remediation + certification. Pool now **3,105 Certified MCQs (3,120 total, 13 UNCLEAR held, 2 Archived)** and **87 Certified cases (88 total, 1 held)**. 141 flash-wave answer-key defects repaired (DL-P2-017); 6 Pack 2 cases remediated + 10 certified (DL-P2-018); duplicate CaseIDs re-keyed (DL-P2-019); orphaned case files documented (DL-P2-020). Prior: 2026-09-04 — Session P2-079 Pack C authoring wave: +90 MCQs (3 batches × 30, P2-C-531–620, Unprocessed, schema v1.1, 0 errors). Pool now **2,970 MCQs (2,293 Certified / 675 Unprocessed / 2 Archived)**. Pack C: 380→620 (remaining to target: 130, P2-C-621–750). **2026-08-26 — Session P2-065 certification wave: +360 MCQs (12 batches × 30) + 9 cases (3 batches × 3). Pool then **1,340 MCQs (1,338 Certified / 0 Unprocessed / 2 Archived)** and **33 cases (33 Certified / 0 Non-Certified)**. **2026-08-28 — Session P2-067 certification wave: +210 Unprocessed→Certified** (all remaining non-Archived MCQs). Pool now **1,565 MCQs (1,563 Certified / 0 Unprocessed / 2 Archived)** and **33 cases (33 Certified / 0 Non-Certified)**. One pre-flip metadata recalibration applied (P2-E-210: VD/DS5 → Difficult/DS4 per Rule 12). All P2-067 flips carry `certification_session: 'P2-067'`, `certification_date: '2026-08-28'`. **2026-08-30 — Session P2-068 Wave 1 authoring: +90 MCQs (15×6 packs, Unprocessed, schema v1.1, 0 errors)**. Pool then **1,655 MCQs (1,563 Certified / 90 Unprocessed / 2 Archived)**. **Sessions P2-074/P2-075 — Waves 2&amp;3 authoring: +180 MCQs (waves ×90) and +9 cases.** **2026-08-30 — Session P2-076 certification wave: 90 Unprocessed→Certified MCQs (all wave-3 items) + 9 Unprocessed→Certified cases; 22-item `Mod-Easy`→`Moderate-Easy` label defect fixed (DL-P2-016).** Pool now **1,835 MCQs (1,833 Certified / 0 Unprocessed / 2 Archived)** and **45 cases (45 Certified / 0 Non-Certified)**. All P2-076 MCQs carry `certification_batch: 'P2-076'`, `certification_date: '2026-08-30'`; cases carry `certification_session: 'P2-076'`. Post-Tend verification: `preflight_p2.js` 0 divergences + 74/74 governance guard PASS; `validate:p2` 0 errors (90 v1.1 PASS; 1,565 grandfathered; 180 migration-required report-only). **2026-09-02 — Session P2-PA-REMED: Pack A thorough certification remediation (4 batches ≤30): +100 QIDs 400→500, answer diversity D 17.6%→23.2% (88→116) C 22.4%→25% (112→125) B 31.2%→28% (156→140) A 28.8%→23.8% (144→119) χ² 22.88→2.74, max streak 10→4, per-100 401-500 C10→22 D4→27, V11 30 MIGRATION_REQUIRED→0 (A-371..400), duplicate Topic/UCK 8→0 (A-433..440), UCK format 42→0, Topic format 30→0, LOSTag A.10 10→0 (→A.1 100→110), DS mismatch 2→0. Pool now 1,935 MCQs (1,933 Certified / 0 Unprocessed / 2 Archived). Preflight 0 divergences, guard 74/74, validate:p2 Pack A 0 errors V11 PASS45.**
**Preflight script:** `scripts/preflight_p2.js` (read-only T0/Tend gate; cross-checks counts here)

**2026-09-04 — Portfolio Target Amendment (user-authorized):** New pool targets ratified — **3,450 MCQs (A=600, B=600, C=750, D=500, E=500, F=500)** and **100 cases (Pack 1=33, Pack 2=33, Pack 3=34)**. Supersedes prior 2,500-MCQ / 75-case allocation. Sizing rule: 25% CSO weight → 750 items, 20% → 600, ≤15% → 500. Per-pack Section QID ranges re-allocated in this session; current authoritative QID-range table at §5.

---

## §1. Part 2 MCQ Pack Baselines

| Pack | File | Target QIDs | Current QIDs | Certified | Unprocessed | Archived | Hash (SHA256, post-Tend) |
|------|------|-------------|-------------|-----------|-------------|----------|--------------------------|
| A | p2/pack_p2_a.js | **600** | 500 | 500 | 0 | 0 | `1744824eeaa17506c0a3971e70a361c15cbf3fed4fead1cf4856572a46b33c88` |
| B | p2/pack_p2_b.js | **600** | 500 | 500 | 0 | 0 | `fb94df527cb6d74b081fbf21bd5a3653cc7b9539f61f9826f827641df8eb188a` |
| C | p2/pack_p2_c.js | **750** | 620 | 612 | 6 | 2 (C-198, C-199) | `fe360d0d7d6e62c9670937d9c6b7ef1afab047b8b5457ac826d72d301fbf9fc3` |
| D | p2/pack_p2_d.js | **500** | 500 | 500 | 0 | 0 | `b4fd8c36f237c2e7c8a69ca843a1ca1c96009d339df8cd216c230b1938da8997` |
| E | p2/pack_p2_e.js | **500** | 500 | 493 | 7 | 0 | `7db173dfaa115c0f151aa8e47739b8bc0c3b87fa520f79ee862f0bc92f49ac03` |
| F | p2/pack_p2_f.js | **500** | 500 | 500 | 0 | 0 | `a5a4ec3e0386e932291466df9506fabb4bc56c4b3a16b0abdf2bea62f99559e2` |
| **Total** | | **3,450** | **3,120** | **3,118** | **0** | **2** | |

*2026-09-05 — P2-CERT-AUDIT certification wave: +812 MCQs certified (B +100, C +234, D +165, E +238, F +75). All 141 answer-key defects (DL-P2-017) repaired before flip; 13 UNCLEAR items held Unprocessed (P2-C-534/558/594/595/607/614, P2-E-267/274/279/282/305/310/311). Certified total 3,105.*

## §1b. Case Pack Baselines

| File | Target Cases | Current Cases | Certified | Non-Certified |
|------|--------------|---------------|-----------|---------------|
| p2/case_pack_p2_1.js | 33 | 33 | 33 | 0 |
| p2/case_pack_p2_2.js | 33 | 33 | 33 | 0 |
| p2/case_pack_p2_3.js | 34 | 22 | 22 | 0 |
| **Total** | **100** | **88** | **88** | **0** |

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
| A | Financial Statement Analysis | 20% | P2-A-001–600 | **600** | 500 | 100 |
| B | Corporate Finance | 20% | P2-B-001–600 | **600** | 500 | 100 |
| C | Decision Analysis | 25% | P2-C-001–750 | **750** | 620 | 130 |
| D | Enterprise Risk Management | 10% | P2-D-001–500 | **500** | 500 | 0 |
| E | Capital Investment Decisions | 10% | P2-E-001–500 | **500** | 500 | 0 |
| F | Professional Ethics | 15% | P2-F-001–500 | **500** | 500 | 0 |
| **Total** | | **100%** | | **3,450** | **2,970** | **330** |

---

**2026-09-04 — Overnight Sprint P2-B/D/F to 500 (Governed Staged Authoring):** B 310→500 (+100 via 4×25 B-401..500), D 245→500 (+255 via 336-365/366-395/396-425/426-455/456-485/486-500 = 90+30+30+15), F 245→500 (+255 via 426-455/456-485/486-500). All staged Unprocessed, schema v1.1, 0 DL-008/026, QID/Topic/UCK unique, preflight_p2 0 divergences, guard 74/74. Critical/high fixes on existing pool: B-313/343 duplicate UCK + B-313/314/319/343/344 LOSTag B.3→B.4/B.5; D-048 Principle 14→15, D-168 truncated Choice A restored ($55k/$40k/$15k), D-174 ES $2.50M→$4.13M + EC 2.5%→25.5% correction, D-177 Authority COSO→ASC 830, D-167 cyclical attribution removed; F-137/152/167 Analyze→Evaluate ceiling fix + F-003/004/005 LOSTag realignment. Backups: `p2/pack_p2_b.js.bak-20260904-P2B-*` (×4), `p2/pack_p2_d.js.bak-20260904-P2D-*` (×6), `p2/pack_p2_f.js.bak-20260904-P2F-*` (×3) + defect-fix backups `p2/pack_p2_{b,d,f}.js.bak-20260904-P2{ B,D,F}fixes`.

*This file is regenerated by preflight_p2.js during schema lock sessions. Do not hand-edit between sessions.*
