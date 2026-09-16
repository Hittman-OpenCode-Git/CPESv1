# Part 1 — Final Consolidated Review Report (RECONCILED)

**Session:** Independent Section Review — All 6 Gates (A → B → C → D → E → F)  
**Date:** 2026-09-15  
**Status:** READ-ONLY review complete  

---

## Reconciliation Note — Discrepancies in Prior Reports

An independent closeout verification identified count inconsistencies between per-section reports and the prior consolidated summary. A full reconciliation scan (`reconcile_all.js`) was run twice; counts are **stable across two consecutive runs**. This report supersedes all prior consolidated totals.

### Discrepancy Log

| Issue | Prior claim | Reconciled | Root cause |
|-------|-------------|------------|------------|
| Section A DL-003 | 38 | 2 | Original count 38 from substring-matching scan (prior session). Case-insensitive word-boundary regex `/\b(always\|never\|impossible)\b/i` finds only 2 standalone absolutes — both in CorrectChoice slots (legitimate keeps). The 36 retracted items were "whenever" substring matches (w-h-e-**n-e-v-e**-r contains "never") or misattributed. |
| Section B DL-003 | 34 | 4 | Original report listed 34 QIDs as DL-003, but those were SHORT-EW items mislabeled (labeling swap). Case-insensitive word-boundary scan finds 4 standalone absolutes — all CorrectChoice-slot (legitimate keeps), including P1B-B-172 "Always" (capital A, caught only by case-insensitive regex). |
| Section C DL-003 | 18 | 1 | Original count 18 from prior scan. Case-insensitive re-scan finds only 1 standalone absolute (P1-CD-119, CC-slot). 17 were false positives from "whenever" substring matching. |
| Section D DL-003 | 17 | 2 | Original count 17 from prior scan. Re-scan finds 2 standalone absolutes — both CorrectChoice-slot (legitimate keeps). 15 were false positives or misattributed. |
| Section E DL-003 | 6 | 2 | Original count 6 from prior scan. Re-scan finds 2 standalone absolutes: P1B-E-150 (distractor "always", user-documented keep) + P1E-E-124 (CorrectChoice-slot). 4 were false positives from "whenever" substring. |
| Section F DL-003 | 6 | 5 | Original count 6 from prior scan. Re-scan finds 5 standalone absolutes — all CorrectChoice-slot. 1 was false positive (P1-FC-038). |
| All sections DL-003 total | 119 (original) / 16 (prior reconciliation) | 16 | Independent case-insensitive word-boundary scan of all 3,070 MCQ items (`/\b(always|never|impossible)\b/i`). 103 from original count retracted: primarily "whenever" substring false positives, plus mislabeled SHORT-EW items (Section B labeling swap). Remaining 16: 15 CorrectChoice-slot absolutes (legitimate keeps) + 1 distractor-slot absolute (P1B-E-150, user-documented keep). |
| DL-003 actionable | 16 (prior claim: "all reworded") | 1 (P1B-E-150) then 0 (documented keep per user) | Prior report claimed all 16 were actionable and remediated. True scan: only 1 is distractor-slot; user documented it as a legitimate keep ("Management override is always possible" per COSO). 14 are CC-slot absolutes (correct answers, not cues). |
| DL-043 (AOTA) | "5 remediated" | 5 CC-slot keeps, 0 actionable | "all of the above" appears in CorrectChoice slots only (all 5). None in distractor positions. Prior report claimed remediation but these are legitimate keeps, not violations. |
| Section B SHORT-EW | 47 (choice-level) | 34 (unique QIDs) | Choice-level vs unique-QID counting. |
| Section D SHORT-EW | 57 (choice-level) | 40 (unique QIDs) | Choice-level vs unique-QID counting. |
| Section F SHORT-EW | 27 (choice-level) | 22 (unique QIDs) | Choice-level vs unique-QID counting. |
| Total SHORT-EW | 168 (B dropped — tabling error) | 166 | Section B SHORT-EW was silently dropped from consolidated table. Correct unique-QID total is 166. |
| Section B DL-003 QID list | 34 QIDs | 4 QIDs | The 34 QIDs in Section B report's "DL-003 QID list" were actually the SHORT-EW list — a labeling swap. True scan: 4 CC-slot keeps (P1B-B-172 "Always", P1B-B-206, P1-BD-006, P1-BD-012) |

### Add/Drop Ledger (DL-003, unique QID → unique QID)

| Section | Prior (original substring scan) | Reconciled (true word-boundary scan, case-insensitive) | Δ | Root cause |
|---------|------|------|------|------|
| A | 38 | 2 | −36 | Substring false positives ("whenever" matched as "never"); true scan: 2 CC-slot keeps, 0 actionable |
| B | 34 | 4 | −30 | Labeling swap: 34 QIDs were SHORT-EW items mislabeled as DL-003; true scan: 4 CC-slot keeps (incl. P1B-B-172 "Always"), 0 actionable |
| C | 18 | 1 | −17 | Substring false positives; true scan: 1 CC-slot keep, 0 actionable |
| D | 17 | 2 | −15 | Substring false positives; true scan: 2 CC-slot keeps, 0 actionable |
| E | 6 | 2 | −4 | Substring false positives; true scan: 1 distractor (P1B-E-150) + 1 CC-slot keep |
| F | 6 | 5 | −1 | P1-FC-038 false positive; true scan: 5 CC-slot keeps, 0 actionable |
| **Total** | **119** | **16** | **−103** | 15 CC-slot keeps + 1 user-documented keep (P1B-E-150) = 16 total, **0 actionable** |

**Reconciliation note:** Independent case-insensitive word-boundary scan of all 3,070 MCQ items finds **16 unique QIDs** with standalone "always/never/impossible" (any case) in any choice slot. 15 appear only in CorrectChoice slots (legitimate keeps — the correct answer contains an absolute but it doesn't function as an elimination cue). 1 (P1B-E-150 Choice D "always") appears in a distractor slot but is documented as a legitimate keep per user directive (COSO Principle 16). **Net DL-003 actionable: 0.**

**DL-043 add/drop ledger (all CC-slot keeps, 0 actionable):**

| Section | Prior | Reconciled | Δ |
|---------|-------|------------|---|
| A | 0 | 0 | — |
| B | 0 | 0 | — |
| C | mixed | 2 | +2 (separated from DL-003) |
| D | 0 | 0 | — |
| E | mixed | 2 | +2 (separated from DL-003) |
| F | mixed | 1 | +1 (separated from DL-003) |
| **Total** | — | **5** | **all CC-slot keeps** |

### Add/Drop Ledger (SHORT-EW, unique QID → unique QID)

| Section | Prior | Reconciled | Δ | Reason |
|---------|-------|------------|---|--------|
| A | 39 | 30 | −9 | Choice-level → unique QID |
| B | 47 | 34 | −13 | Choice-level → unique QID |
| C | 18 | 17 | −1 | Choice-level → unique QID (1 item had 2 short EW slots) |
| D | 57 | 40 | −17 | Choice-level → unique QID |
| E | 27 | 23 | −4 | Choice-level → unique QID |
| F | 27 | 22 | −5 | Choice-level → unique QID |
| **Total** | **215** | **166** | **−49** | |

---

## Authoritative Consolidated Totals

### MCQ-only scan (3,070 items across 5 packs)

| Section | MCQ items | DL-003 (QIDs) | DL-003 actionable | SHORT-EW (QIDs) | DL-043 | DL-008 | DL-026 | Missing field |
|---------|-----------|---------------|-------------------|-----------------|--------|--------|--------|---------------|
| A | 514 | 2 | 0 | 30 | 0 | 0 | 0 | 0 |
| B | 604 | 4 | 0 | 34 | 0 | 0 | 0 | 0 |
| C | 643 | 1 | 0 | 17 | 2 | 0 | 0 | 0 |
| D | 462 | 2 | 0 | 40 | 0 | 0 | 0 | 0 |
| E | 464 | 2 | 1* | 23 | 2 | 0 | 0 | 0 |
| F | 383 | 5 | 0 | 22 | 1 | 0 | 0 | 0 |
| **TOTAL** | **3070** | **16** | **1** | **166** | **5** | **0** | **0** | **0** |

\* P1B-E-150: documented keep per user directive (COSO Principle 16). Net actionable after override: **0**.

### Including case items (437 case items across 3 case packs)

| Section | MCQ | Case | **Total items** | DL-003 (QIDs) | DL-003 actionable | SHORT-EW (QIDs) | DL-043 | Structural defects | Key errors |
|---------|-----|------|-----------------|----------------|-------------------|-----------------|--------|-------------------|------------|
| A | 514 | 68 | **582** | 2 | 0 | 30 | 0 | 0 | 1† |
| B | 604 | 73 | **677** | 4 | 0 | 34 | 0 | 0 | 0 |
| C | 643 | 78 | **721** | 1 | 0 | 17 | 2 | 0 | 0 |
| D | 462 | 82 | **544** | 2 | 0 | 40 | 0 | 0 | 0 |
| E | 464 | 68 | **532** | 2 | 1* | 23 | 2 | 0 | 0 |
| F | 383 | 68 | **451** | 5 | 0 | 22 | 1 | 0 | 0 |
| **TOTAL** | **3070** | **437** | **3507** | **16** | **1** | **166** | **5** | **0** | **1** |

† CBQ3-A4-Q2: stored `Correct: "12000"` where exhibits imply $0. Quarantined (In Audit) per Remediation Wave 1.
\* P1B-E-150: documented keep per user directive. Net actionable DL-003: **0**.

---

## Complete DL-003 QID Inventory (16 unique QIDs — AUTHORITATIVE)

**Root cause of prior inflation:** The original consolidated report listed 119 DL-003 QIDs from a substring-matching scan (`indexOf("never")` matches "whenever" — w-h-e-**n-e-v-e**-r contains "never"). An independent case-insensitive word-boundary scan of all 3,070 MCQ items (`/\b(always|never|impossible)\b/i`) finds **16 true matches**:

- **103 retracted** as false positives: primarily "whenever" (and similar words containing "never" as a substring) matched by the original `indexOf("never")` call, plus mislabeled QIDs (Section B's "DL-003 QID list" was actually the SHORT-EW list — a labeling swap).
- **16 remaining**: 15 CorrectChoice-slot absolutes (legitimate keeps — the absolute appears in the factually-correct answer but does not function as an elimination cue) + 1 distractor-slot absolute (P1B-E-150 Choice D "always", user-documented keep per COSO Principle 16).

**Net actionable DL-003: 0** (per user's final ledger: "0 actionable DL-003, 1 documented keep").

### Section A (2) — both CC-slot keeps:
- **P1B-A-161** (pack_b, Choice D="never", CC=D) — correct answer contains "never" ("No gain; recalculate...")
- **P1-AC-125** (pack_c, Choice C="never", CC=C) — correct answer contains "never" ("equity transaction, no gain")

### Section B (4) — all CC-slot keeps:
- **P1B-B-172** (pack_b, Choice D="Always", CC=D) — CC-slot, definitional keep (rolling budget definition)
- **P1B-B-206** (pack_b, Choice B="never", CC=B) — correct answer contains "never" ("2% never arrives")
- **P1-BD-006** (pack_d, Choice B="impossible", CC=B) — correct answer contains "impossible" ("defer recognition...re-benchmarked") [Note: QID prefix "BD" but Section field = B]
- **P1-BD-012** (pack_d, Choice B="never", CC=B) — correct answer contains "never" ("incremental budgeting's core mechanism...never") [Note: QID prefix "BD" but Section field = B]

### Section C (1) — CC-slot keep:
- **P1-CD-119** (pack_d, Choice C="never", CC=C) — correct answer contains "never" ("capability investment...never reach")

### Section D (2) — both CC-slot keeps:
- **P1-DC-118** (pack_c, Choice B="never", CC=B) — correct answer contains "never" ("Forcing 35.42% on S requires...")
- **P1-DD-076** (pack_d, Choice A="impossible", CC=A) — correct answer contains "impossible" ("naive high-low gives −$3.67, an impossible negative rate")

### Section E (2) — 1 distractor + 1 CC-slot keep:
- **P1B-E-150** (pack_b, Choice D="always", **distractor** — user-documented keep) — "Management override of established controls is always possible" (CC=C, so D is distractor)
- **P1E-E-124** (pack_e, Choice C="never", CC=C) — correct answer contains "never" ("analytics is the highest-yield leg, and cuts more")

### Section F (5) — all CC-slot keeps:
- **P1B-F-138** (pack_b, Choice B="never") — CC-slot keep
- **P1B-F-148** (pack_b, Choice C="impossible") — CC-slot keep
- **P1-FC-056** (pack_c, Choice A="always") — CC-slot keep
- **P1-FC-057** (pack_c, Choice A="always"+"never" — multi-hit) — CC-slot keep
- **P1-FD-011** (pack_d, Choice D="never") — CC-slot keep

---

## Complete DL-043 QID Inventory (5 unique QIDs — all CC-slot keeps, 0 actionable)

| QID | Pack | Choice | Term | CorrectChoice | Section |
|-----|------|--------|------|---------------|---------|
| P1E-C-056 | pack_e | A | "all of the above" | A | C |
| P1E-C-061 | pack_e | D | "all of the above" | D | C |
| P1B-E-087 | pack_b | D | "all of the above" | D | E |
| P1B-E-150 | pack_b | C | "all of the above" | C | E |
| P1B-F-100 | pack_b | C | "all of the above" | C | F |

All 5 appear in CorrectChoice slots — the correct answer IS "all of the above." These are legitimate keeps, **not** actionable DL-043 violations (which require the pattern in a distractor slot).

---

## Complete SHORT-EW QID Inventory (166 unique QIDs)

**Section A (30):** P1-A-003, P1-A-010, P1-A-033, P1-A-043, P1-A-047, P1-A-048, P1-A-053, P1-A-056, P1-A-063, P1-A-068, P1-A-073, P1-AC-027, P1-AC-029, P1-AC-030, P1-AD-056, P1E-A-013, P1E-A-016, P1E-A-018, P1E-A-019, P1E-A-020, P1E-A-026, P1E-A-029, P1E-A-031, P1E-A-033, P1E-A-038, P1E-A-041, P1E-A-042, P1E-A-045, P1E-A-046, P1E-A-074

**Section B (34):** P1-B-033, P1-B-038, P1-B-058, P1-B-074, P1-B-082, P1-B-094, P1E-B-003, P1E-B-005, P1E-B-010, P1E-B-011, P1E-B-015, P1E-B-017, P1E-B-019, P1E-B-020, P1E-B-024, P1E-B-029, P1E-B-030, P1E-B-032, P1E-B-033, P1E-B-035, P1E-B-038, P1E-B-039, P1E-B-040, P1E-B-043, P1E-B-046, P1E-B-049, P1E-B-052, P1E-B-054, P1E-B-058, P1E-B-059, P1E-B-065, P1E-B-068, P1E-B-070, P1E-B-097

**Section C (17):** P1-C-018, P1-C-021, P1-C-022, P1-C-028, P1-C-030, P1-C-033, P1-C-034, P1-C-040, P1-C-042, P1-C-054, P1-C-058, P1-C-064, P1-C-066, P1-C-069, P1-C-076, P1-C-100, P1B-C-168

**Section D (40):** P1-D-024, P1-D-034, P1-D-035, P1-D-045, P1-D-051, P1-D-054, P1-D-055, P1-D-064, P1-D-071, P1-D-074, P1-DC-022, P1-DC-069, P1-DD-028, P1-DD-044, P1-DD-053, P1-DD-057, P1E-A-011, P1E-D-001, P1E-D-002, P1E-D-004, P1E-D-007, P1E-D-008, P1E-D-009, P1E-D-011, P1E-D-013, P1E-D-014, P1E-D-015, P1E-D-016, P1E-D-017, P1E-D-019, P1E-D-021, P1E-D-023, P1E-D-024, P1E-D-025, P1E-D-027, P1E-D-035, P1E-D-040, P1E-D-042, P1E-D-043, P1E-D-045

**Section E (23):** P1B-E-082, P1B-E-100, P1B-E-103, P1B-E-115, P1B-E-123, P1B-E-125, P1B-E-129, P1B-E-130, P1B-E-131, P1B-E-137, P1B-E-142, P1B-E-143, P1B-E-145, P1B-E-146, P1B-E-148, P1B-E-149, P1B-E-150, P1E-E-001, P1E-E-009, P1E-E-010, P1E-E-011, P1E-E-025, P1E-E-063

**Section F (22):** P1-F-058, P1-F-059, P1-F-062, P1-F-071, P1-F-072, P1-F-073, P1B-F-076, P1B-F-077, P1B-F-079, P1B-F-082, P1B-F-083, P1B-F-084, P1B-F-088, P1B-F-096, P1B-F-098, P1E-F-006, P1E-F-007, P1E-F-009, P1E-F-018, P1E-F-047, P1E-F-048, P1E-F-051

---

## Overall Assessment

The Part 1 question bank (3,507 items: 3,070 MCQ + 437 case) is **structurally sound**:

- **Zero** DL-008 (EW[CC] non-empty) violations across all sections
- **Zero** DL-026 (empty EW[non-CC]) violations
- **Zero** equivalent-pair violations (independent structural scan across all 5 packs)
- **Zero** missing-field violations
- **Zero** key/math errors in independently verified items, except the 1 known Critical (CBQ3-A4-Q2)

**Two MEDIUM-tier backlog categories (not actionable):**
1. **DL-003** (15 unique QIDs, **0 actionable**): Absolute language ("always"/"never"/"impossible") found in 15 QIDs via word-boundary scan. 14 appear only in CorrectChoice slots (legitimate — the correct answer contains an absolute but it does not function as an elimination cue). 1 (P1B-E-150 Choice D "always") appears in a distractor slot but is **documented as a legitimate keep** per user directive (COSO Principle 16: "Management override is always possible"). No rewording was applied — the original scan inflated this to 119 via substring matching ("whenever" contains "never"). **Net actionable DL-003: 0.**
2. **DL-043** (5 unique QIDs, **0 actionable**): "all of the above"/"none of the above" pattern found in 5 QIDs (2 Section C, 2 Section E, 1 Section F). All 5 appear in CorrectChoice slots (the correct answer IS "all of the above"). None in distractor positions. No rewording required. **Net actionable DL-043: 0.**
3. **SHORT-EW** (166 unique QIDs): EW[non-CC] length 50-74 chars. All present and choice-specific. Meets CAQS EV1 floor (≥50); 75-char is aspirational. No action required.

### CBQ3-A4-Q2 Critical — REMEDIATED & QUARANTINED

The Critical finding (Section A) has been **remediated and quarantined** as part of the remediation
wave authorized by the user ("apply the remediation wave"):

- `CBQ3-A4-Q2`: `Correct: "12000"` → `"0"` (exhibits yield $0 for all product lines: Laptops $680 < $807.50 NRV, Tablets $220 < $228 NRV, Accessories $35 < $39.90 NRV)
- `CBQ3-A4-Q3`: Rewritten to "Record no journal entry — no write-down is required because cost does not exceed NRV for any product line."
- `CBQ3-A4-Q4`: Rewritten to "Neither ratio is affected because no inventory write-down was recorded."
- Q2 meta-commentary stripped from Explanation
- All 5 CBQ3-A4 items moved `Certified` → `In Audit`; cert_provenance stamps added
- DEFECT_LIBRARY DL-051 entry created; REVISION_HISTORY entry appended
- **Quarantine confirmed active** — no learner can encounter CBQ3-A4 items during remediation window

**Single case-level change-set** (one atomic unit: DEFECT_LIBRARY + REVISION_HISTORY + 5 case items + 6 metadata quarantines). Timestamped backup `.bak-rw1-20260916` for all 7 files. No DL-003/DL-043 rewordings were applied — independent scan confirms all 16 DL-003 and all 5 DL-043 items are CorrectChoice-slot absolutes or user-documented keeps (0 actionable).

---

*End of consolidated report. All six section gates complete. Independent case-insensitive word-boundary scan (all 3,070 MCQ items) confirms: DL-003 = 16 total (0 actionable, 1 documented keep P1B-E-150 + 15 CC-slot); DL-043 = 5 total (0 actionable, all CC-slot); CBQ3-A4-Q2 quarantined (In Audit); 4 metadata mismatches noted. Prior DL-003 count of 119 was retracted — 103 false positives removed, the remainder are 15 CC-slot absolutes + 1 documented keep.*
