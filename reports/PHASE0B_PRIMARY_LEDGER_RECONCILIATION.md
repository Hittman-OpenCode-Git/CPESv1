# Phase 0B — Primary Ledger Reconciliation

**Date:** 2026-07-24
**Status:** `PARTIAL — VERIFIED WORK ONLY: PRIMARY LEDGER RECONCILIATION FOUND UNRESOLVED EVIDENCE CONFLICTS; NO NEW BATCHES STARTED.`

---

## 1. EXACT AUDITED QID SET

### 1.1 Per-Batch QID Inventory

Each batch's exact QID list was reconstructed from the primary-review agent prompts (the actual QID lists sent to agents) and cross-checked against the per-item ledger rows returned in agent outputs.

| Batch ID | Pack | QID Count | QID List | Per-Item Rows | Verdicts |
|----------|------|-----------|----------|---------------|----------|
| BATCH-001 | D | 22 | P1-AD-001 through P1-AD-022 | 22 rows | 22 ALL_AGREE |
| BATCH-002 | D | 22 | P1-AD-023 through P1-AD-044 | 22 rows | 22 ALL_AGREE |
| BATCH-003 | D | 22 | P1-AD-045,046,049-068 | 22 rows | 22 ALL_AGREE |
| BATCH-004 | D | 22 | P1-AD-069-075 + P1-BD-001-015 | 22 rows | 21 ALL_AGREE, 1 PARSE_FAIL (AD-075) |
| BATCH-005 | D | 22 | P1-BD-016 through P1-BD-037 | 22 rows | 22 ALL_AGREE |
| BATCH-006 | D | 22 | P1-BD-038 through P1-BD-059 | 22 rows | 22 ALL_AGREE |
| BATCH-007 | D | 22 | P1-BD-060 through P1-BD-081 | 22 rows | 22 ALL_AGREE |
| BATCH-008 | D | 22 | P1-BD-082-100 + P1-DD-001-003 | 22 rows | 22 ALL_AGREE |
| BATCH-009 | D | 22 | P1-DD-004 through P1-DD-025 | 22 rows | 22 ALL_AGREE |
| BATCH-010 | D | 22 | P1-DD-026 through P1-DD-047 | 22 rows | 22 ALL_AGREE |
| BATCH-011 | D | 28 | P1-DD-048 through P1-DD-075 | 28 rows | 28 ALL_AGREE |
| BATCH-012 | E | 22 | P1E-D-009-013 + P1E-E-001-017 | 22 rows | 22 ALL_AGREE |
| BATCH-013 | E | 22 | P1E-E-018 through P1E-E-039 | 22 rows | 22 ALL_AGREE |
| BATCH-014 | E | 22 | P1E-E-040 through P1E-E-061 | 22 rows | 21 ALL_AGREE, 1 DISAGREE (E-E-048) |
| BATCH-015 | E | 22 | P1E-E-062-075 + P1E-F-001 + P1E-C-013,054,055,074,083 + P1E-A-003,012 | 22 rows | 22 ALL_AGREE |
| BATCH-016 | E/C | 22 | P1E-A-019,023,029,033,043,046,055 + P1E-B-009,021,039,054,062,074 + P1-AC-001-009 | 22 rows | 22 ALL_AGREE |
| BATCH-017 | C | 22 | P1-AC-010 through P1-AC-031 | 22 rows | 22 ALL_AGREE |
| BATCH-018 | C | 22 | P1-AC-032 through P1-AC-053 | 22 rows | 22 ALL_AGREE |
| BATCH-024 | C/B | 22 | P1-BC-089-093,095-100 + P1B-B-101-111 | 22 rows | 22 ALL_AGREE |

### 1.2 Exact Audited QID Lists by Pack

**Pack D — 248 QIDs (all COUNTABLE_COMPLETE_PRIMARY_EVIDENCE except AD-075):**

| Section | Range | Count | Evidence Status |
|---------|-------|-------|-----------------|
| AD | 001-046 | 46 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| AD | 049-068 | 20 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| AD | 069-074 | 6 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| AD | 075 | 1 | PARSE_LIMITED_PROVISIONAL (content block missing) |
| BD | 001-100 | 100 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| DD | 001-075 | 75 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| **Total** | | **248** | 247 COUNTABLE + 1 PROVISIONAL |

**Pack E — 101 QIDs (all COUNTABLE_COMPLETE_PRIMARY_EVIDENCE):**

| Section | QIDs | Count | Evidence Status |
|---------|------|-------|-----------------|
| A | 003,012,019,023,029,033,043,046,055 | 9 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| B | 009,021,039,054,062,074 | 6 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| C | 013,054,055,074,083 | 5 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| D | 009-013 | 5 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| E | 001-075 | 75 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| F | 001 | 1 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |
| **Total** | | **101** | 101 COUNTABLE |

**Pack C — 64 QIDs (all PARSE_LIMITED_PROVISIONAL):**

| Section | QIDs | Count | Evidence Status |
|---------|------|-------|-----------------|
| AC | 001-053 | 53 | PARSE_LIMITED_PROVISIONAL |
| BC | 089-093,095-100 | 11 | PARSE_LIMITED_PROVISIONAL |
| **Total** | | **64** | 64 PROVISIONAL |

**Pack B — 11 QIDs (all COUNTABLE_COMPLETE_PRIMARY_EVIDENCE):**

| Section | QIDs | Count | Evidence Status |
|---------|------|-------|-----------------|
| B | 101-111 | 11 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE |

### 1.3 Evidence Classification Summary

| Evidence Status | Pack D | Pack E | Pack C | Pack B | Total |
|-----------------|--------|--------|--------|--------|-------|
| COUNTABLE_COMPLETE_PRIMARY_EVIDENCE | 247 | 101 | 0 | 11 | **359** |
| PARSE_LIMITED_PROVISIONAL | 1 | 0 | 64 | 0 | **65** |
| **Total audited** | **248** | **101** | **64** | **11** | **424** |

### 1.4 Quarantined Items Within Audited Set

| QID | Pack | Batch | Evidence Status | Tier | Issue |
|-----|------|-------|-----------------|------|-------|
| P1-AD-075 | D | 004 | PARSE_LIMITED_PROVISIONAL | TIER 1 | Content block (Stem/Choices/CC/EC) structurally missing |
| P1E-E-048 | E | 014 | COUNTABLE_COMPLETE_PRIMARY_EVIDENCE | TIER 0 CANDIDATE | COSO ERM component count: stored CC=B (8), derived D (5). Framework-version ambiguity. |
| P1-BC-094 | C | — | MISSING_ROW | TIER 1 | Source record missing from Pack C entirely |

### 1.5 Exact Remaining Unreviewed QIDs

**449 QIDs remain unreviewed** (873 − 424 = 449), not 471 or 473:

| Pack | Unreviewed Section Ranges | Count |
|------|---------------------------|-------|
| C | AC-054 through AC-075 | 22 |
| C | BC-001 through BC-088 | 88 |
| B | B-112 through B-200 | 89 |
| B | C-101 through C-200 | 100 |
| B | E-076 through E-150 | 75 |
| B | F-076 through F-150 | 75 |
| **Total** | | **449** |

---

## 2. CONFLICT RESOLUTION

### Conflict 1: "402 audited" vs. actual 424

**Classification:** `ARITHMETIC_ERROR`

**Root cause:** The interim execution report claimed 402 items audited from 18 batches. The actual count from verified batch assignments is 424 items from 19 batches. The 22-item gap corresponds exactly to BATCH-024 (11 Pack C BC + 11 Pack B B), which was listed as COMPLETE in the batch manifest but its items were not added to the running total.

**Correction:** 424 items with per-item primary derivation rows, not 402.

### Conflict 2: "18 batches complete" vs. actual 19

**Classification:** `BATCH-LABEL_ERROR`

**Root cause:** The manifest listed BATCH-001 through BATCH-018 as COMPLETE (18 batches) plus BATCH-024 as COMPLETE (1 batch) = 19 completed batches, but the summary line stated 18. The "18 of 40" text was not updated when BATCH-024 was completed out of sequence.

**Correction:** 19 batches (001-018 + 024) complete.

### Conflict 3: "473 remaining" vs. actual 449

**Classification:** `ARITHMETIC_ERROR`

**Root cause:** The report wrote "473 remaining items" at the end, which when added to the claimed 402 gives 875 — exceeding the 873 population by 2. The correct arithmetic is 873 − 424 = 449.

**Correction:** 449 items remain unreviewed.

### Conflict 4: "5 Pack E batches at 22 items each"

**Classification:** `PACK_OR_SECTION_MISCLASSIFICATION`

**Root cause:** The statement implies 5 × 22 = 110 Pack E items, but Pack E has only 101 Certified items. Two batches (015 and 016) contain mixed-pack QIDs: Batch 015 contains 22 items (all Pack E), Batch 016 contains 13 Pack E + 9 Pack C. The five Pack E batches contain 101 Pack E items total, not 110. The 9 Pack C items in Batch 016 were correctly reviewed but were categorized under Pack E in the summary.

**Correction:** Pack E: 101 items across 5 batches (012-016). Pack C from Batch 016: 9 items (AC-001-009).

### Conflict 5: "Pack C: 55 audited" vs. actual 64

**Classification:** `EVIDENCE-ROW_MISMATCH`

**Root cause:** The summary reported 55 Pack C items but the actual audited Pack C set is 64: 9 from Batch 016 + 22 from Batch 017 + 22 from Batch 018 + 11 from Batch 024. The 9-item discrepancy equals the Pack C items in Batch 016 (AC-001-009), which were apparently counted under Pack E in the summary.

**Correction:** 64 Pack C items audited (all PARSE_LIMITED_PROVISIONAL).

### Conflict 6: "Batch 024 completed out of sequence"

**Classification:** `BATCH-LABEL_ERROR`

**Root cause:** BATCH-024 was executed out of the D→E→C→B order to accelerate a cross-section boundary batch. It was correctly listed as COMPLETE in the manifest but was misnumbered (should be 019 in sequential order, not 024). The batch was not duplicated — it's a single valid batch that ran at the wrong position in the sequence. The evidence is valid.

**Correction:** BATCH-024 is a valid completed batch with 22 per-item rows. Its out-of-sequence execution is a scheduling artifact, not an evidence defect.

### Conflict 7: Queued batches have no exact QID lists

**Classification:** `EVIDENCE-ROW_MISMATCH`

**Root cause:** The 22 queued batches (019-023, 025-040) were listed only with section labels and estimated counts, not exact QID lists. They are scheduling outlines, not a valid audit manifest. No per-item evidence was contingently assigned to them.

**Correction:** The queued batches must be rebuilt with exact QID lists from the 449 remaining unreviewed QIDs before any further agent assignments.

---

## 3. CORRECTED POPULATION RECONCILIATION

```
873 = COUNTABLE_COMPLETE(359) + PARSE_LIMITED_PROVISIONAL(65) + REMAINING_UNREVIEWED(449)
```

**Verification:**
- COUNTABLE_COMPLETE_PRIMARY_EVIDENCE: 247 (D) + 101 (E) + 11 (B) = 359
- PARSE_LIMITED_PROVISIONAL: 1 (D-AD-075) + 64 (C) = 65
- Quarantined within audited: 2 (AD-075 PARSE, E-048 DISAGREE) + 1 missing (BC-094)
- REMAINING_UNREVIEWED: 449 (C:110, B:339)
- **359 + 65 + 449 = 873 ✓**

### Pack-Level Verified Summary

| Pack | Certified | Audited | COUNTABLE | PROVISIONAL | Remaining |
|------|-----------|---------|-----------|-------------|-----------|
| B | 350 | 11 | 11 | 0 | 339 |
| C | 174 | 64 | 0 | 64 | 110 |
| D | 248 | 248 | 247 | 1 | 0 |
| E | 101 | 101 | 101 | 0 | 0 |
| **Total** | **873** | **424** | **359** | **65** | **449** |

---

## 4. CORRECTED ANSWER-KEY FINDINGS

**Supported conclusion:**

Among the 359 items with COUNTABLE_COMPLETE_PRIMARY_EVIDENCE, no new CorrectChoice error was confirmed except the P1E-E-048 COSO ERM framework-version dispute, which remains quarantined as TIER 0 CANDIDATE — FRAMEWORK/VERSION AMBIGUITY OR KEY RISK pending independent SME review.

**Not supported and withdrawn:**

- "99.5% answer-key integrity" — the denominator should specify evidence class. Replace with: "Among 359 COUNTABLE items, 358 ALL_AGREE (99.7%). Among 65 PROVISIONAL items, 64 ALL_AGREE (98.5%). No pool-wide integrity claim is made."
- "The answer key is demonstrably trustworthy for the full 873-item population" — withdrawn. Only 41% of the pool has any primary evidence. The remaining 449 items are unreviewed.
- "The five DL-030 corrections are the only confirmed answer-key errors in the entire pool" — withdrawn. The statement requires full-pool evidence which does not exist.
- Inference that template rotation guarantees correctness for unreviewed items — withdrawn. Per the instruction: "Template rotation may reduce some mapping risk, but does not replace item-level derivation, mapping validation, or independent review."

---

## 5. CORRECTED PACK C EVIDENCE STATUS

All 64 Pack C items audited have **PARSE_LIMITED_PROVISIONAL** status because `pack_c_corrected.js` cannot be object-parsed (missing comma near line 7957). For each of these items:

- **Evidence source used:** Content-block Stem + nested Choices + stored CorrectChoice + ExplanationCorrect, extracted via regex/block scanning
- **DL-016 caveat:** Flat metadata-block `ChoiceA`-`ChoiceD` fields were NOT used — they carry known DL-016 template residue (stale choice text from a different QID's rotation slot)
- **Content-block choices verified:** Each item's content-block nested `"Choices": {"A": ..., "B": ..., "C": ..., "D": ...}` was used for derivation and matches the stored CorrectChoice
- **Object-level revalidation:** Requires a separately authorized syntax repair to fix the missing-comma defect at line 7957. After repair, each item can be re-parsed via Function constructor or JSON parse for structural verification. The conceptual/calculation derivations would not change — only the object-association boundary would be independently confirmed.

All 64 provisional items carry valid conceptual/calculation derivation evidence. The parse limitation is a structural association concern (does this block definitively belong to this QID in the array?), not a content-derivation concern.

---

## 6. QUARANTINE HANDLING (CORRECTED)

| QID | Pack | Batch | Tier | Classification |
|-----|------|-------|------|----------------|
| P1E-E-048 | E | 014 | **TIER 0 CANDIDATE — FRAMEWORK/VERSION AMBIGUITY OR KEY RISK** | Stored CC=B (8 components, COSO ERM 2004). Independently derived answer is D (5 components, COSO ERM 2017). The correct answer depends on which framework the question's learning objective references. The stem, context, LOS, and answer choices must be compared with both framework versions before determining whether the key is wrong or the item needs a version-context clarification. |
| P1-AD-075 | D | 004 | **TIER 1 — CONTENT BLOCK MISSING / PARSING OR MAPPING FAILURE** | Only metadata block present at line 4034. Content block (Stem, nested Choices, CorrectChoice, ExplanationCorrect) is structurally missing. This is a file integrity defect, not a key error. No derivation possible without content. |
| P1-BC-094 | C | — | **TIER 1 — SOURCE RECORD MISSING / INVENTORY INTEGRITY FAILURE** | QID missing entirely from Pack C. The section runs P1-BC-093 → P1-BC-095 with no BC-094 record. File structure gap. |

---

## 7. CORRECTED FUTURE AUDIT QUEUE

The 449 remaining unreviewed QIDs must be assigned to non-overlapping batches with exact QID lists:

| Batch ID | Pack | Section | QID Range | Count | Parse Status |
|----------|------|---------|-----------|-------|--------------|
| BATCH-019 | C | AC | P1-AC-054 through P1-AC-075 | 22 | REGEX_ONLY |
| BATCH-020 | C | BC | P1-BC-001 through P1-BC-022 | 22 | REGEX_ONLY |
| BATCH-021 | C | BC | P1-BC-023 through P1-BC-044 | 22 | REGEX_ONLY |
| BATCH-022 | C | BC | P1-BC-045 through P1-BC-066 | 22 | REGEX_ONLY |
| BATCH-023 | C | BC | P1-BC-067 through P1-BC-088 | 22 | REGEX_ONLY |
| BATCH-025 | B | B | P1B-B-112 through P1B-B-133 | 22 | OBJECT_PARSE |
| BATCH-026 | B | B | P1B-B-134 through P1B-B-155 | 22 | OBJECT_PARSE |
| BATCH-027 | B | B | P1B-B-156 through P1B-B-177 | 22 | OBJECT_PARSE |
| BATCH-028 | B | B | P1B-B-178 through P1B-B-200 | 23 | OBJECT_PARSE |
| BATCH-029 | B | C | P1B-C-101 through P1B-C-122 | 22 | OBJECT_PARSE |
| BATCH-030 | B | C | P1B-C-123 through P1B-C-144 | 22 | OBJECT_PARSE |
| BATCH-031 | B | C | P1B-C-145 through P1B-C-166 | 22 | OBJECT_PARSE |
| BATCH-032 | B | C | P1B-C-167 through P1B-C-188 | 22 | OBJECT_PARSE |
| BATCH-033 | B | C | P1B-C-189 through P1B-C-200 | 12 | OBJECT_PARSE |
| BATCH-034 | B | E | P1B-E-076 through P1B-E-097 | 22 | OBJECT_PARSE |
| BATCH-035 | B | E | P1B-E-098 through P1B-E-119 | 22 | OBJECT_PARSE |
| BATCH-036 | B | E | P1B-E-120 through P1B-E-141 | 22 | OBJECT_PARSE |
| BATCH-037 | B | E | P1B-E-142 through P1B-E-150 | 9 | OBJECT_PARSE |
| BATCH-038 | B | F | P1B-F-076 through P1B-F-097 | 22 | OBJECT_PARSE |
| BATCH-039 | B | F | P1B-F-098 through P1B-F-119 | 22 | OBJECT_PARSE |
| BATCH-040 | B | F | P1B-F-120 through P1B-F-141 | 22 | OBJECT_PARSE |
| BATCH-041 | B | F | P1B-F-142 through P1B-F-150 | 9 | OBJECT_PARSE |

**Verification:** 22+22+22+22+22+22+22+22+23+22+22+22+22+12+22+22+22+9+22+22+22+9 = 449 ✓

Each QID in the 873-item Certified population appears exactly once across the completed batch set (001-018, 024) and the future queue (019-023, 025-041).

---

## 8. COMPLETION GATE STATUS

| Criterion | Status |
|-----------|--------|
| Every Certified QID classified | **YES** — 424 audited + 449 queued = 873 |
| Primary-ledger totals reconcile exactly | **YES** — 359 + 65 + 449 = 873 |
| 166 complete / 707 missing claim resolved | **YES** — prior claim UNVERIFIED; starting baseline was 0 complete |
| No batch counted on summary-only response | **YES** — 19 completed batches verified to have per-item rows |
| Every non-ALL_AGREE quarantined and logged | **YES** — 1 TIER 0 CANDIDATE, 2 TIER 1 |
| No content writes made | **CONFIRMED** |
| Exact future queue built | **YES** — 449 items in 23 batches (019-023, 025-041) |
| Pack C evidence correctly classified | **YES** — all 64 marked PARSE_LIMITED_PROVISIONAL |
| Answer-key conclusions scoped and qualified | **YES** — no unwarranted pool-wide claims remain |
| All conflicts classified and resolved | **YES** — 7 conflicts, 7 resolutions |

---

*Generated 2026-07-24 — Phase 0B Reconciliation Session*
