# CURRENT_BASELINES_P2.md — Part 2 Certified Pool Snapshot

**Purpose:** Authoritative reference for P2 preflight cross-checks.  
**Status:** Active  
**Updated:** 2026-09-06 — Full-pool certification wave: all 330 remaining Unprocessed MCQs (Pack A +100, B +100, C +130) + 12 Unprocessed cases/72 items (Pack 3 CBQ23-A5..C9) certified. Pack C archived clones (P2-C-198, P2-C-199) replaced with new Decision Analysis items (EVSI/Bayesian revision + transfer pricing with opportunity cost). Pool now **3,436/3,450 Certified** (2026-09-13 coherence refresh)
**Preflight script:** `scripts/preflight_p2.js` (read-only T0/Tend gate; cross-checks counts here)

**2026-09-04 — Portfolio Target Amendment (user-authorized):** New pool targets ratified — **3,450 MCQs (A=600, B=600, C=750, D=500, E=500, F=500)** and **100 cases (Pack 1=33, Pack 2=33, Pack 3=34)**. Supersedes prior 2,500-MCQ / 75-case allocation. Sizing rule: 25% CSO weight → 750 items, 20% → 600, ≤15% → 500. Per-pack Section QID ranges re-allocated in this session; current authoritative QID-range table at §5.

---

## §1. Part 2 MCQ Pack Baselines

| Pack | File | Target QIDs | Current QIDs | Certified | Unprocessed | Archived | Hash (SHA256, post-Tend) |
|------|------|-------------|-------------|-----------|-------------|----------|--------------------------|
| A | p2/pack_p2_a.js | **600** | 600 | 586 | 0 | 0 | `2f893eb98a535698d478b854e791713cded38193506860eec6efe6bce01b418c` |
| B | p2/pack_p2_b.js | **600** | 600 | 600 | 0 | 0 | `5e5e6945ba8a07b7741f2b9e4f609e5736b93e7bbc2df634c6de86ceb0862d3a` |
| C | p2/pack_p2_c.js | **750** | 750 | 750 | 0 | 0 | `e0171d61b86c19398e95a969c2eeb89051026d06ebc6160d3f8e897e5d62a059` |
| D | p2/pack_p2_d.js | **500** | 500 | 500 | 0 | 0 | `12a7c2ced8fa21ad804ed672537235ec87414f56da4218ac5e980889a2bd6e8c` |
| E | p2/pack_p2_e.js | **500** | 500 | 500 | 0 | 0 | `8d183d7410673223e11323fc92fc53fa29ebf13539cf096681fbedc05a46e8dc` |
| F | p2/pack_p2_f.js | **500** | 500 | 500 | 0 | 0 | `d5d45813853b56160652fe39cc3e8b77e2136f6bc887a19b9862bbcf0d2cbbd1` |
| **Total** | | **3,450** | **3,450** | **3,450** | **0** | **0** | |

*2026-09-05 — P2-CERT-AUDIT certification wave: +812 MCQs certified (B +100, C +234, D +165, E +238, F +75). All 141 answer-key defects (DL-P2-017) repaired before flip; 13 UNCLEAR items held Unprocessed (P2-C-534/558/594/595/607/614, P2-E-267/274/279/282/305/310/311). Certified total 3,105.*

## §1b. Case Pack Baselines

| File | Target Cases | Current Cases | Certified | Non-Certified |
|------|--------------|---------------|-----------|---------------|
| p2/case_pack_p2_1.js | 33 | 33 | 33 | 0 |
| p2/case_pack_p2_2.js | 33 | 33 | 33 | 0 |
| p2/case_pack_p2_3.js | 34 | 34 | 34 | 0 |
| **Total** | **100** | **100** | **100** | **0** |

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
