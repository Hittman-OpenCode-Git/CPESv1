# CURRENT_BASELINES_P2.md — Part 2 Certified Pool Snapshot

**Purpose:** Authoritative reference for P2 preflight cross-checks.  
**Status:** Active  
**Updated:** 2026-08-26 — Session P2-065 certification wave: +360 MCQs (12 batches × 30) + 9 cases (3 batches × 3). Pool then **1,340 MCQs (1,338 Certified / 0 Unprocessed / 2 Archived)** and **33 cases (33 Certified / 0 Non-Certified)**. **2026-08-28 — Session P2-067 certification wave: +210 Unprocessed→Certified** (all remaining non-Archived MCQs). Pool now **1,565 MCQs (1,563 Certified / 0 Unprocessed / 2 Archived)** and **33 cases (33 Certified / 0 Non-Certified)**. One pre-flip metadata recalibration applied (P2-E-210: VD/DS5 → Difficult/DS4 per Rule 12). All P2-067 flips carry `certification_session: 'P2-067'`, `certification_date: '2026-08-28'`. **2026-08-30 — Session P2-068 Wave 1 authoring: +90 MCQs (15×6 packs, Unprocessed, schema v1.1, 0 errors)**. Pool then **1,655 MCQs (1,563 Certified / 90 Unprocessed / 2 Archived)**. **Sessions P2-074/P2-075 — Waves 2&amp;3 authoring: +180 MCQs (waves ×90) and +9 cases.** **2026-08-30 — Session P2-076 certification wave: 90 Unprocessed→Certified MCQs (all wave-3 items) + 9 Unprocessed→Certified cases; 22-item `Mod-Easy`→`Moderate-Easy` label defect fixed (DL-P2-016).** Pool now **1,835 MCQs (1,833 Certified / 0 Unprocessed / 2 Archived)** and **45 cases (45 Certified / 0 Non-Certified)**. All P2-076 MCQs carry `certification_batch: 'P2-076'`, `certification_date: '2026-08-30'`; cases carry `certification_session: 'P2-076'`. Post-Tend verification: `preflight_p2.js` 0 divergences + 74/74 governance guard PASS; `validate:p2` 0 errors (90 v1.1 PASS; 1,565 grandfathered; 180 migration-required report-only).
**Preflight script:** `scripts/preflight_p2.js` (read-only T0/Tend gate; cross-checks counts here)

---

## §1. Part 2 MCQ Pack Baselines

| Pack | File | Target QIDs | Current QIDs | Certified | Unprocessed | Archived | Hash (SHA256, post-Tend) |
|------|------|-------------|-------------|-----------|-------------|----------|--------------------------|
| A | p2/pack_p2_a.js | 500 | 400 | 400 | 0 | 0 | `d7aa001aed95f0e15726117cc71aeba96be0e166920548f95aa8bf2feda51775` |
| B | p2/pack_p2_b.js | 500 | 310 | 310 | 0 | 0 | `51521d2fdd0800246ec6babb8196820e283113955c8272f4a6a0a4283e33f152` |
| C | p2/pack_p2_c.js | 625 | 380 | 378 | 0 | 2 (C-198, C-199) | `31ee5dc06bb7c396a0a4a4bf6104f8f60fbcb41194160d0a2f3e130bf086b52b` |
| D | p2/pack_p2_d.js | 250 | 245 | 245 | 0 | 0 | `7362bf3684db9c6925663860a2d965aaa48d138488c216895b478b5b9fa8ea80` |
| E | p2/pack_p2_e.js | 250 | 255 | 255 | 0 | 0 | `a6f27b413ed801d8c79febf17a6063d18993e0fbf1d407ecf452c4ebdce78636` |
| F | p2/pack_p2_f.js | 375 | 245 | 245 | 0 | 0 | `3ae1028be0bf2c51c18b0a50e87442f786d8a6ce322eb53f713354b27131e02d` *(+F-207/214 FCPA allowlist fix)* |
| **Total** | | **2,500** | **1,835** | **1,833** | **0** | **2** | |

## §1b. Case Pack Baselines

| File | Target Cases | Current Cases | Certified | Non-Certified |
|------|--------------|---------------|-----------|---------------|
| p2/case_pack_p2_1.js | 25 | 19 | 19 | 0 |
| p2/case_pack_p2_2.js | 25 | 13 | 13 | 0 |
| p2/case_pack_p2_3.js | 25 | 13 | 13 | 0 |
| **Total** | **75** | **45** | **45** | **0** |

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

## §5. QID Allocation (P2003 v2.0)

| Section | Domain | Range | Count | CSO Weight |
|---------|--------|-------|-------|------------|
| A | Financial Statement Analysis | P2-A-001–500 | 500 | 20% |
| B | Corporate Finance | P2-B-001–500 | 500 | 20% |
| C | Decision Analysis | P2-C-001–625 | 625 | 25% |
| D | Risk Management | P2-D-001–250 | 250 | 10% |
| E | Investment Decisions | P2-E-001–250 | 250 | 10% |
| F | Professional Ethics | P2-F-001–375 | 375 | 15% |
| **Total** | | | **2,500** | **100%** |

---

*This file is regenerated by preflight_p2.js during schema lock sessions. Do not hand-edit between sessions.*
