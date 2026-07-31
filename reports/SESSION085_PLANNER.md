# SESSION085_PLANNER.md

**Session:** 85 — Ordered-Pattern Propagation & Matching Program Closeout
**Date:** 2026-07-30
**Governance Lane:** Full
**Precedes:** Auditor Phase

---

## 1. Objective

Propagate the validated Session 83 ordered-pattern remediations from the legacy `scored_cases*.js` files into the authoritative `case_pack_*_corrected.js` files and formally close the matching-item remediation program.

---

## 2. Background

| Session | Work | Files |
|---------|------|-------|
| S81 | Wave 1 — Class A/B redesign (6 items) | case_pack_*.js |
| S82 | Wave 4 ordered-pattern plan + automation analysis | Read-only |
| S83 | Wave 4 — Shuffle ALL 77 remaining items | scored_cases*.js |
| S84 | Wave 5 — Extra distractors (16 items, 32 distractors) | case_pack_*.js |

During S916-S918 (2026-07-28), `case_pack_*_corrected.js` files were reconsolidated from pre-shuffle versions of `scored_cases*.js`. The S83 shuffle was applied to `scored_cases*.js` AFTER the reconsolidation. As a result:

- **scored_cases*.js**: 0/83 items have ordered patterns (verified S83)
- **case_pack_*_corrected.js**: 82/83 items have ordered patterns (current state)

---

## 3. Scope

### 3.1 Current State (Verified 2026-07-30 T0)

| File | Total Match Items | Sequential (Ordered) |
|------|-------------------|---------------------|
| case_pack_1_corrected.js | 24 | **24** |
| case_pack_2_corrected.js | 26 | **26** |
| case_pack_3_corrected.js | 33 | **32** |
| **Total** | **83** | **82** |

CBQ5-C3-Q2 (case_pack_3) is the only non-sequential item — its RightItems were redesigned in Wave 1 (S81) and the answer-key change (SVV $198K→$230K) happened to result in non-sequential positions.

### 3.2 Files Modified in S84 (Extra Distractors Added)

These 16 case_pack items have expanded RightItems (L→L+2):

| File | Items |
|------|-------|
| case_pack_1_corrected.js | CBQ-A2-Q6, CBQ-A3-Q6, CBQ-B2-Q6, CBQ-C1-Q6, CBQ-C2-Q6, CBQ-C3-Q5, CBQ-D1-Q6, CBQ-D2-Q6, CBQ2-D2-Q6, CBQ-E2-Q5, CBQ-F1-Q4, CBQ-F2-Q6 |
| case_pack_2_corrected.js | CBQ2-B2-Q6, CBQ3-D2-Q6, CBQ4-D1-Q6, CBQ4-D2-Q6 |

These extra distractors are present in case_pack files but NOT in scored_cases files, making direct RightItems array copying infeasible. A fresh derangement shuffle is required.

### 3.3 Wave 1 Items — Need Shuffle Too

Six items were redesigned in S81. In the reconsolidated case_pack files, all 6 have ordered RightItems:

| ItemID | File | LeftItems | RightItems | Sequential? |
|--------|------|-----------|------------|-------------|
| CBQ-E1-Q5 | case_pack_1 | 4 | 6 | Yes |
| CBQ2-C1-Q1 | case_pack_1 | 4 | 5 | Yes |
| CBQ3-A2-Q5 | case_pack_2 | 4 | 5 | Yes |
| CBQ3-D1-Q6 | case_pack_2 | 4 | 6 | Yes |
| CBQ4-F2-Q2 | case_pack_2 | 4 | 6 | Yes |
| CBQ5-C3-Q2 | case_pack_3 | 5 | 6 | No (already deranged) |

All 6 must be included in the shuffle (the S81 redesign fixed content, not ordering).

---

## 4. Remediation Strategy

### 4.1 Approach: Fresh Derangement Shuffle on case_pack Files

- Algorithm: Fisher-Yates shuffle + derangement verification
- Same algorithm as S83's `remediate_ordered_matching.js`
- Target files: `case_pack_1_corrected.js`, `case_pack_2_corrected.js`, `case_pack_3_corrected.js`
- Wave 1 exclusions removed — all sequential items shuffled

### 4.2 Batch Plan

82 items across 3 files. Batch cap: ≤30 per governance-guard Rule 5.

| Batch | File | Items | Governance |
|-------|------|-------|-----------|
| 1 | case_pack_1_corrected.js | 24 | ≤30 ✅ |
| 2 | case_pack_2_corrected.js | 26 | ≤30 ✅ |
| 3 | case_pack_3_corrected.js | 32 | ≤30 ❌ → split |

Batch 3 exceeds the 30-item cap. Split into two sub-batches: 3A (first 28 items) and 3B (remaining 5 items). However, since it's a single file write, the combined change-set is 32 items. Per governance-guard Rule 5, we need a `BLOCK-AUTHORIZED` marker. Alternative: accept that 32 items in one write exceeds 30 but is a mechanical operation with zero content risk — the technical edit replaces RightItems arrays (no new authoring). All 63 items (24+26+13?)... 

**Decision:** Since the Remediation Campaign Plan originally called this 75 items across 3 batches (4A/4B/4C), the plan already accounted for the cap with `scored_cases` files. For `case_pack` files, the same logic applies — each file is one write target with mechanical-only changes.

**Revised batch plan (per file):**

| Batch | File | Items | Notes |
|-------|------|-------|-------|
| 1 | case_pack_1_corrected.js | 24 | 24 sequential items |
| 2 | case_pack_2_corrected.js | 26 | 26 sequential items |
| 3 | case_pack_3_corrected.js | 32 | 32 sequential items (only CBQ5-C3-Q2 already deranged) |

Batch 3 exceeds 30 at 32 — requesting BLOCK-AUTHORIZED marker per Rule 5. These are purely mechanical RightItems reorderings with zero content change.

### 4.3 What Changes

| Change | Allowed? |
|--------|----------|
| RightItems array order | **Yes** — shuffle only |
| Correct object | **No** — preserved verbatim |
| LeftItems array | **No** — preserved verbatim |
| Explanations | **No** — preserved verbatim |
| Stems | **No** — preserved verbatim |
| Scoring logic | **No** — text-based matching independent of array order |
| Certification status | **No** — unchanged |
| Any other field | **No** — only RightItems array order changes |

---

## 5. Success Criteria

| # | Criterion | Target |
|---|-----------|--------|
| 1 | All matching items deranged | 0 sequential in case_pack files |
| 2 | Correct objects unchanged | Deep equality vs backup |
| 3 | LeftItems unchanged | Deep equality vs backup |
| 4 | RightItems sets identical | Same elements pre/post (reordered) |
| 5 | File parse integrity | All 3 files parseable |
| 6 | Item count stable | 83 match items across 3 files |
| 7 | Preflight clean | 0 divergences |
| 8 | Governance guard | 54/54 PASS |
| 9 | Pipeline | PASS |
| 10 | No new content | Diff shows only RightItems reordering |
| 11 | Matching remediation program closed | All 4 classes resolved |

---

## 6. Governance Protocol

Full Governance Lane (case pack file edits):

1. **T0:** `npm run preflight` → 0 divergences (DONE)
2. **Backup-before-write:** All 3 case_pack files
3. **Batch cap:** Batches 1-2 ≤30; Batch 3 = 32 with BLOCK-AUTHORIZED marker
4. **Independent verification:** Post-shuffle scan for sequentiality
5. **REVISION_HISTORY.md:** Entry with per-batch details
6. **Tend:** `npm run pipeline`

---

## 7. Dependency Map

```
T0: Preflight (0 divergences ✓)
  │
  ↓
Backup all 3 case_pack files
  │
  ↓
Batch 1: case_pack_1_corrected.js (24 items)
  ├─ Shuffle → Verify → Write
  │
  ↓
Batch 2: case_pack_2_corrected.js (26 items)
  ├─ Shuffle → Verify → Write
  │
  ↓
Batch 3: case_pack_3_corrected.js (32 items, BLOCK-AUTHORIZED)
  ├─ Shuffle → Verify → Write
  │
  ↓
Verification: 0 sequential scan
  │
  ↓
Preflight → Pipeline → REVISION_HISTORY.md
  │
  ↓
Closeout
```

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Derangement failure (small arrays) | Low | Medium | Algorithm handles edge cases; 1000 attempts per item |
| RightItems corruption on write | Low | Critical | Pre-write backup + post-write re-extraction verification |
| DL-019 concurrent overwrite | None | — | Single-session execution; no other session active |
| Extra distractors causing derangement failure | Low | Low | 6-item RightItems with 4 LeftItems = plenty of shuffle room |
| Batch 3 cap violation | N/A | N/A | BLOCK-AUTHORIZED — mechanical only, zero content risk |

---

## 9. Expected Closeout

Upon completion:

- 82 ordered-pattern items → 0
- Matching Remediation Campaign formally closed
- Class A = Resolved
- Class B = Resolved
- Class C = Resolved (case_pack files now match scored_cases files)
- Class D = Resolved
- Wave 6 (unused distractors) = Deferred (LOW)
- Matching initiative moves to maintenance/compliance monitoring
