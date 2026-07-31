# DL-008 Remediation Proposal — Non-Certified Items

**Date:** 2026-07-23
**Status:** Proposal — no execution authorized
**Scope:** 386 non-Certified DL-008 occurrences across Packs A, C, and D
**Cross-reference:** Full-pool sweep: `reports/DL008_FULL_POOL_SWEEP_2026-07-23.md`
**Governance Guard:** Rule 2 (BLOCK) — prevents certification of any item with non-empty ExplanationWrong[CorrectChoice]
**Precedent:** DL-012 clone archival (4-batch, 112-item, 28/batch structure)

---

## 1. Pre-Flight Status

| Check | Result |
|-------|--------|
| Full-pool sweep complete | Confirmed — 393 identified (now 386 after 7 Certified clears) |
| Certified items secured | Confirmed — 0 Certified + DL-008 as of 2026-07-23 |
| Governance guard active | Confirmed — Rule 2 BLOCK prevents new certifications with DL-008 |
| All 386 items outside learner pool | Confirmed — 0 Certified, 0 in delivery pool |
| DEFECT_LIBRARY.md entry | **Now formalized — DL-008 entry updated 2026-07-23** |

---

## 2. Inventory

### 2.1 By Pack and Section

| Pack | Section | Hits | Bucket 1 (Calc) | Bucket 2 (Conceptual) | Bucket 3 (Misattributed) | State |
|------|---------|------|-----------------|----------------------|--------------------------|-------|
| Pack A | B | 46 | 33 | 13 | 0 | MISSING |
| Pack A | C | 48 | 35 | 13 | 0 | MISSING |
| Pack A | D | 20 | 9 | 11 | 0 | MISSING |
| Pack A | E | 3 | 0 | 3 | 0 | MISSING |
| Pack A | F | 75 | 17 | 58 | 0 | MISSING |
| Pack A sub | | **192** | **94** | **98** | **0** | |
| Pack C | A | 6 | 2 | 4 | 0 | MISSING |
| Pack C | B | 24 | 8 | 16 | 0 | MISSING |
| Pack C | C | 15 | 11 | 4 | 0 | MISSING |
| Pack C | D | 6 | 2 | 4 | 0 | MISSING |
| Pack C | E | 11 | 2 | 9 | 0 | MISSING |
| Pack C | F | 26 | 6 | 20 | 0 | MISSING |
| Pack C sub | | **96** | **31** | **57** | **0** | |
| Pack D | B | 21 | 17 | 4 | 0 | MISSING |
| Pack D | C | 14 | 2 | 12 | 0 | MISSING |
| Pack D | D | 28 | 20 | 8 | 0 | MISSING |
| Pack D | E | 8 | 1 | 7 | 0 | MISSING |
| Pack D | F | 21 | 6 | 15 | 0 | MISSING |
| Pack D sub | | **98** | **46** | **46** | **0** | |
| **Total** | | **386** | **171** | **201** | **0** | |

### 2.2 Bucket Composition

| Bucket | Count | % | Description | Remediation Type |
|--------|-------|---|-------------|-----------------|
| Bucket 1 | 171 | 44.3% | Naked calculation summaries — verbatim or near-verbatim duplicates of the calculation portion of ExplanationCorrect | Mechanical clear — safe, zero content loss |
| Bucket 2 | 201 | 52.1% | Fragmentary conceptual clauses (primarily "because..." fragments from template authoring) | Editorial review — merge into EC, relocate, or remove |
| Bucket 3 | 0 | 0% | Misattributed distractor explanations | N/A — no occurrences in non-Certified pool |
| **Total** | **386** | **100%** | | |

### 2.3 Largest Clusters

| Cluster | Pack | Section | Hits | Pattern |
|---------|------|---------|------|---------|
| Pack A Section F | A | F | 75 | 58/75 are Bucket 2 "because..." fragments; appears to be template-fill text |
| Pack A Section C | A | C | 48 | 35/48 Bucket 1 calculation summaries |
| Pack A Section B | A | B | 46 | 33/46 Bucket 1 calc summaries |
| Pack C Section F | C | F | 26 | Mixed B1/B2 |
| Pack D Section D | D | D | 28 | 20/28 Bucket 1 calc summaries |

---

## 3. Remediation Strategy

### 3.1 Two-Phase Approach

**Phase A — Mechanical Clear (Bucket 1, 171 items):** All Bucket 1 items contain calculation summaries that are verbatim subsets of ExplanationCorrect. These can be cleared mechanically — set ExplanationWrong[CorrectChoice] to `""` without content loss. This mirrors the Bucket 1A sweep (108 items, 2026-07-22) and the 7-item Tier 0 fix (2026-07-23).

**Phase B — Editorial Review (Bucket 2, 201 items):** Bucket 2 items contain fragmentary conceptual clauses (primarily "because..." patterns). Each item requires editorial judgment:
- Merge the fragment into ExplanationCorrect if it adds substantive value
- Relocate to a distractor ExplanationWrong slot if the text describes a specific wrong answer's error
- Remove if the fragment is generic boilerplate that adds no educational value

Phase B is analogous to the DL-013 editorial queue (882 items needing per-item distractor explanation rewrites) but lower-risk — DL-008 Bucket 2 text is typically one sentence, whereas DL-013 template text is 3-4 sentences per slot.

### 3.2 Batch Structure

Following the DL-012 precedent (≤28 items per batch per governance-guard Rule 5):

| Batch | Phase | Scope | Items | Type |
|-------|-------|-------|-------|------|
| 1 | A | Pack A Sections B (B1 only) | 28 | Mechanical clear |
| 2 | A | Pack A Sections B (B1)+C (B1) | 28 | Mechanical clear |
| 3 | A | Pack A Sections C (B1)+D (B1) | 28 | Mechanical clear |
| 4 | A | Pack A Sections F (B1)+Pack C Sections A/B/C (B1) | 28 | Mechanical clear |
| 5 | A | Pack C Sections D/E/F (B1)+Pack D Sections B (B1) | 28 | Mechanical clear |
| 6 | A | Pack D Sections B/C/D/E/F (B1) | 28 | Mechanical clear |
| 7 | A | Remaining B1 (3 items) — wrap-up | 3 | Mechanical clear |
| | | **Phase A total** | **171** | |

| Batch | Phase | Scope | Items | Type |
|-------|-------|-------|-------|------|
| 8 | B | Pack A Section B (B2)+E (B2) | 16 | Editorial — early pilot |
| 9 | B | Pack A Section C (B2) | 13 | Editorial |
| 10 | B | Pack A Section D (B2)+F (B2, partial) | 28 | Editorial |
| 11–18 | B | Remaining Bucket 2 (est. 7 batches of ≤28) | ~197 | Editorial |
| | | **Phase B total** | **201** | |

**Total batches: ~18.** Phase A (7 batches) can be executed rapidly. Phase B (~11 batches) is paced by editorial throughput.

### 3.3 Batch Priority Order

1. **Phase A first** — Mechanical clears should complete before any Phase B work. This creates a clean baseline and reduces cognitive load during editorial review.
2. **Pack A before Packs C/D** — Pack A contains 127 of 171 Bucket 1 items. Packs C/D have significant DL-012 and DL-013 overlap; addressing DL-008 first avoids compounding editorial fatigue.
3. **Section F last within each pack** — Pack A Section F (75 items) is the single largest cluster and is heavily Bucket 2. Reserve this for experienced editorial throughput.

---

## 4. Operational Requirements

### 4.1 Backup Protocol

Per `knowledge/BACKUP_PROTOCOL.md` — mandatory before every batch:

```
For each pack file modified:
  1. Copy to: pack_X_corrected.js.bak-YYYYMMDDHHMMSS
  2. Confirm backup exists and has non-zero size
  3. Proceed with batch edit
```

### 4.2 Governance Guard Compliance

- **Rule 2 (BLOCK):** Each batch MUST clear ExplanationWrong[CorrectChoice] fields. No batch may introduce new DL-008 violations.
- **Rule 3 (BLOCK):** MASTER_QUESTION_REGISTRY.md is generated — do not hand-edit.
- **Rule 5 (BLOCK):** Max 30 items per change-set. All batches sized at ≤28.
- **Rule 1 (WARN):** Each batch must pair with a REVISION_HISTORY.md entry.
- **Rule 4 (WARN):** No answer-key changes in these batches. Not applicable.

### 4.3 Session Isolation

| Risk | Mitigation |
|------|-----------|
| Pack B certification (Session 3) writing to `pack_b_corrected.js` | No overlap — Pack B has 0 DL-008 hits |
| Pack C/D DL-012 archival | Phase A operates on non-overlapping items (DL-012 targets Section E only; DL-008 affects all Sections). Can run concurrently if batched to different items. |
| Pack A clone-disposition (Session 2) | Phase A Pack A items are in Sections B/C/D/F. Clone-disposition targets Section E. No overlap. |
| DL-013 editorial work | DL-013 affects the same items as DL-008 in Packs C/D. If both are being addressed, DL-008 should be cleared first (structural fix) before DL-013 editorial work (content quality). |

---

## 5. Impact Assessment

### 5.1 Before/After

| Metric | Before | After (Phase A) | After (Phase A+B) |
|--------|--------|-----------------|-------------------|
| Repository DL-008 hits | 386 | 215 | **0** |
| Pack A DL-008 | 192 | 98 | **0** |
| Pack C DL-008 | 96 | 65 | **0** |
| Pack D DL-008 | 98 | 52 | **0** |
| Packs B/E DL-008 | 0 | 0 | **0** |
| Items blocking certification via Rule 2 | 386 | 215 | **0** |

### 5.2 Validator Impact

- **Phase A:** ExplanationValidator warnings decrease by 171. No error count change (DL-008 is tracked as warnings).
- **Phase B:** ExplanationValidator warnings decrease by 201. No error count change.
- **After full remediation:** ExplanationValidator should produce 0 DL-008 warnings. All 386 items become eligible for certification (assuming no other blocking defects).

### 5.3 Learner Safety

**No immediate risk.** All 386 items are outside the learner pool (MISSING question_state). Governance guard Rule 2 prevents any item with DL-008 from reaching Certified state. The fix is not urgent — it unblocks certification throughput but does not address an active learner-facing defect.

---

## 6. Open Decisions

| Decision | Options | Recommendation |
|----------|---------|---------------|
| Phase A execution timeline | Now vs. after DL-012 archival | **After DL-012** — Pack C/D is subject to archival first; clearing DL-008 on items that will be archived is wasted effort |
| Phase B editorial review standard | Full rewrite vs. minimal clear | **Minimal clear** — the goal is structural correctness (EV8 compliance), not editorial perfection. If the fragment adds value, merge into EC. If generic, delete. |
| Batch execution sequencing | Sequential (one batch at a time) vs. parallel (multiple sessions) | **Sequential** — each batch touches pack files that may have overlapping QIDs with other batch areas. Serial execution avoids merge conflicts. |
| Pack A Section F prioritization | Early vs. last | **Last** — this is the heaviest Bucket 2 cluster and should follow editorial experience gained from smaller sections. |

---

## 7. Stop Conditions

- Do not execute any batch without explicit authorization. This is a proposal document only.
- Do not clear Bucket 2 items mechanically — they require editorial judgment.
- Do not modify Pack B or Pack E — both are clean.
- Before any batch, verify the item still exists in the pack file at its expected QID.
- After any batch, run validator and confirm 0 new errors.

---

## 8. Cross-References

| Document | Relationship |
|----------|-------------|
| `reports/DL008_FULL_POOL_SWEEP_2026-07-23.md` | Source inventory — 386 non-Certified hits |
| `knowledge/DEFECT_LIBRARY.md` §DL-008 | Formal defect definition (updated 2026-07-23) |
| `reports/DL-008_SWEEP_CLOSEOUT.md` | Prior Bucket 1A sweep (108 items, 2026-07-22) |
| `reports/DL012_REMEDIATION_PROPOSAL.md` | Precedent: 4-batch, 112-item archival structure |
| `knowledge/BACKUP_PROTOCOL.md` | Mandatory backup rules |
| `.opencode/plugins/governance-guard.js` | Rule 2 BLOCK enforcement |

---

*Proposal generated 2026-07-23. No remediation executed. No packs modified as part of this proposal.*
