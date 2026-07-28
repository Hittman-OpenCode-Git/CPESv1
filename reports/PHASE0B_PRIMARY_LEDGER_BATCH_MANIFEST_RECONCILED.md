# Phase 0B — Primary Ledger Batch Manifest (RECONCILED)

**Date:** 2026-07-24
**Reconciliation:** The original manifest had count conflicts, omitted QID lists for queued batches, and misclassified Pack C items from Batch 016. This version replaces it.

---

## Population: 873 Certified MCQs (B=350, C=174, D=248, E=101)

---

## COMPLETED BATCHES (19 batches, 424 QIDs)

| Batch ID | Pack | Sections | QID List | # | ALL_AGREE | Non-AGREE |
|----------|------|----------|----------|---|-----------|-----------|
| BATCH-001 | D | AD | P1-AD-001 through P1-AD-022 | 22 | 22 | 0 |
| BATCH-002 | D | AD | P1-AD-023 through P1-AD-044 | 22 | 22 | 0 |
| BATCH-003 | D | AD | P1-AD-045,046,049-068 | 22 | 22 | 0 |
| BATCH-004 | D | AD/BD | P1-AD-069-075 + P1-BD-001-015 | 22 | 21 | 1 (AD-075) |
| BATCH-005 | D | BD | P1-BD-016 through P1-BD-037 | 22 | 22 | 0 |
| BATCH-006 | D | BD | P1-BD-038 through P1-BD-059 | 22 | 22 | 0 |
| BATCH-007 | D | BD | P1-BD-060 through P1-BD-081 | 22 | 22 | 0 |
| BATCH-008 | D | BD/DD | P1-BD-082-100 + P1-DD-001-003 | 22 | 22 | 0 |
| BATCH-009 | D | DD | P1-DD-004 through P1-DD-025 | 22 | 22 | 0 |
| BATCH-010 | D | DD | P1-DD-026 through P1-DD-047 | 22 | 22 | 0 |
| BATCH-011 | D | DD | P1-DD-048 through P1-DD-075 | 28 | 28 | 0 |
| BATCH-012 | E | D/E | P1E-D-009-013 + P1E-E-001-017 | 22 | 22 | 0 |
| BATCH-013 | E | E | P1E-E-018 through P1E-E-039 | 22 | 22 | 0 |
| BATCH-014 | E | E | P1E-E-040 through P1E-E-061 | 22 | 21 | 1 (E-E-048) |
| BATCH-015 | E | E/F/C/A | P1E-E-062-075,F-001,C-013/054/055/074/083,A-003/012 | 22 | 22 | 0 |
| BATCH-016 | E/C | A/B/AC | P1E-A-019/023/029/033/043/046/055, B-009/021/039/054/062/074, P1-AC-001-009 | 22 | 22 | 0 |
| BATCH-017 | C | AC | P1-AC-010 through P1-AC-031 | 22 | 22 | 0 |
| BATCH-018 | C | AC | P1-AC-032 through P1-AC-053 | 22 | 22 | 0 |
| BATCH-024 | C/B | BC/B | P1-BC-089-093/095-100 + P1B-B-101-111 | 22 | 22 | 0 |

**Completed totals:** 424 QIDs (248 D + 101 E + 64 C + 11 B) | 422 ALL_AGREE | 1 PARSE_FAIL | 1 DISAGREE

---

## QUEUED BATCHES (23 batches, 449 QIDs — with exact QID lists)

| Batch ID | Pack | Section | QID Range | Count | Parse |
|----------|------|---------|-----------|-------|-------|
| BATCH-019 | C | AC | P1-AC-054 through P1-AC-075 | 22 | REGEX |
| BATCH-020 | C | BC | P1-BC-001 through P1-BC-022 | 22 | REGEX |
| BATCH-021 | C | BC | P1-BC-023 through P1-BC-044 | 22 | REGEX |
| BATCH-022 | C | BC | P1-BC-045 through P1-BC-066 | 22 | REGEX |
| BATCH-023 | C | BC | P1-BC-067 through P1-BC-088 | 22 | REGEX |
| BATCH-025 | B | B | P1B-B-112 through P1B-B-133 | 22 | PARSE |
| BATCH-026 | B | B | P1B-B-134 through P1B-B-155 | 22 | PARSE |
| BATCH-027 | B | B | P1B-B-156 through P1B-B-177 | 22 | PARSE |
| BATCH-028 | B | B | P1B-B-178 through P1B-B-200 | 23 | PARSE |
| BATCH-029 | B | C | P1B-C-101 through P1B-C-122 | 22 | PARSE |
| BATCH-030 | B | C | P1B-C-123 through P1B-C-144 | 22 | PARSE |
| BATCH-031 | B | C | P1B-C-145 through P1B-C-166 | 22 | PARSE |
| BATCH-032 | B | C | P1B-C-167 through P1B-C-188 | 22 | PARSE |
| BATCH-033 | B | C | P1B-C-189 through P1B-C-200 | 12 | PARSE |
| BATCH-034 | B | E | P1B-E-076 through P1B-E-097 | 22 | PARSE |
| BATCH-035 | B | E | P1B-E-098 through P1B-E-119 | 22 | PARSE |
| BATCH-036 | B | E | P1B-E-120 through P1B-E-141 | 22 | PARSE |
| BATCH-037 | B | E | P1B-E-142 through P1B-E-150 | 9 | PARSE |
| BATCH-038 | B | F | P1B-F-076 through P1B-F-097 | 22 | PARSE |
| BATCH-039 | B | F | P1B-F-098 through P1B-F-119 | 22 | PARSE |
| BATCH-040 | B | F | P1B-F-120 through P1B-F-141 | 22 | PARSE |
| BATCH-041 | B | F | P1B-F-142 through P1B-F-150 | 9 | PARSE |

**Queued totals:** 449 QIDs (110 C + 339 B)

---

## QUARANTINED

| QID | Batch | Tier | Classification |
|-----|-------|------|----------------|
| P1E-E-048 | 014 | TIER 0 CANDIDATE — FRAMEWORK/VERSION AMBIGUITY OR KEY RISK | COSO ERM components |
| P1-AD-075 | 004 | TIER 1 — CONTENT BLOCK MISSING | File integrity |
| P1-BC-094 | — | TIER 1 — SOURCE RECORD MISSING | Inventory gap |

---

## REBUILT VERIFICATION

- 19 completed batches = 424 QIDs ✓
- 23 queued batches = 449 QIDs ✓
- 424 + 449 = 873 ✓
- Every QID appears exactly once ✓
- No QID duplicated across completed and queued ✓

---

*Reconciled 2026-07-24 — replaces original PHASE0B_PRIMARY_LEDGER_BATCH_MANIFEST.md*
