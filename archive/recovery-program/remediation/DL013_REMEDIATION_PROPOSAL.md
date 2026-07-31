# DL-013 Remediation Proposal — Pack C/D Section A Boilerplate

**Date:** 2026-07-23
**Status:** Proposal — no execution authorized
**Scope:** 137 items across Pack C Section A (65) and Pack D Section A (72) — 411 individual ExplanationWrong fields
**Defect:** DL-013 — template-generated boilerplate distractor explanations ("represents a plausible misconception…")
**Cross-reference:** `knowledge/DEFECT_LIBRARY.md` §DL-013, `reports/DL008_REMEDIATION_PROPOSAL.md` (precedent structure)
**Governance Guard:** Rule 5 (≤30 items per change-set)

---

## 1. Pre-Flight Status

| Check | Result |
|-------|--------|
| Confirmed inventory — Pack C Section A | 65 items (QIDs P1-AC-001–010, 016–025, 031–075) |
| Confirmed inventory — Pack D Section A | 72 items (QIDs P1-AD-001–053, 057–075) |
| Total contaminated items | **137** |
| Total ExplanationWrong fields to rewrite | **411** (3 per item, all template-bearing) |
| Template severity | **100% Segment 1** — identical boilerplate across all 3 distractor slots; zero educational value |
| Learner pool impact | **None** — 0 Certified items; all 137 lack `question_state` governance field |
| DL-008 overlap | **None** — all 137 have correctly empty ExplanationWrong[CorrectChoice] slots |
| Pack A conflict risk | **None** — `pack_a_corrected.js` not in scope (other session active) |

---

## 2. Detailed Inventory

### 2.1 Pack C Section A — 65 Contaminated Items

| QID Range | Count | Topic Pattern | Clean/DL-008 Items in Range |
|-----------|-------|---------------|---------------------------|
| P1-AC-001 to P1-AC-010 | 10 | Financial statements, revenue recognition, balance sheet | — |
| P1-AC-016 to P1-AC-025 | 10 | Inventory, goodwill, impairment, contingencies, ratios | — |
| P1-AC-031 to P1-AC-075 | 45 | Long-lived assets, intangibles, liabilities, equity, cash flows, ratios | — |
| **Contaminated total** | **65** | | |

**Clean gaps (10 items, not in scope):**

| QID Range | Count | Topic | Why Clean |
|-----------|-------|-------|-----------|
| P1-AC-011 to P1-AC-015 | 5 | Equity method investment cluster | Choice-specific distractor explanations; DL-008 present (Bucket 2 fragmentary clauses) |
| P1-AC-026 to P1-AC-030 | 5 | EPS, weighted-average shares, cash flows, FIFO COGS | Calculation-based explanations; DL-008 on P1-AC-030 only |

### 2.2 Pack D Section A — 72 Contaminated Items

| QID Range | Count | Topic Pattern | Clean/DL-008 Items in Range |
|-----------|-------|---------------|---------------------------|
| P1-AD-001 to P1-AD-053 | 53 | Financial statements, revenue, inventory, long-lived assets, intangibles, liabilities, equity, cash flows | — |
| P1-AD-057 to P1-AD-075 | 19 | Ratios, statement analysis, comprehensive income, subsequent events | — |
| **Contaminated total** | **72** | | |

**Clean gap (3 items, not in scope):**

| QID Range | Count | Topic | Why Clean |
|-----------|-------|-------|-----------|
| P1-AD-054 to P1-AD-056 | 3 | Basic EPS, diluted EPS, partial-year depreciation | Calculation-based proper explanations; no DL-008, no DL-013 |

### 2.3 Template Structure — Verified Uniform

Every contaminated item follows the identical structural pattern:

```
ExplanationWrong[CorrectChoice]  → ""             (ALWAYS empty — DL-008 clean)
ExplanationWrong[distractor_X]  → "Option X (choice text) represents a plausible misconception.
                                      Under CMA Part 1 accounting principles, the correct analysis
                                      leads to the conclusion that [correct answer summary].
                                      A candidate may select this option by misapplying a related
                                      but distinct concept."
```

**Confirmed facts:**
- **100% fully templated** — every contaminated item has exactly 3 template-bearing ExplanationWrong fields
- **Both detection phrases present** in every one of the 411 individual field occurrences
- **Field lengths:** 294–424 characters, consistent within each item but varying slightly by choice text length
- **CorrectChoice slot:** always `""` — no DL-008 overlap in contaminated items

### 2.4 Governance State

| State | Pack C Section A | Pack D Section A |
|-------|-----------------|-------------------|
| `question_state` present | 0 | 0 |
| `question_state: "Unprocessed"` | 0 | 0 |
| `question_state: "Certified"` | 0 | 0 |
| No `question_state` field | 75 (100%) | 75 (100%) |

All 137 items are in legacy/unspecified state (no governance field). They are excluded from the learner delivery pool by default per CAQS §1.7.1 (only items with `question_state: "Certified"` are eligible). The governance-guard Rule 5 BLOCK prevents certification of any item with DL-013 template text.

---

## 3. Remediation Strategy

### 3.1 Single-Phase Approach

Unlike the DL-008 proposal (which had a mechanical-clear phase for calculation summaries), DL-013 requires **editorial rewrites for every field**. There is no mechanical path — each distractor explanation must be rewritten to:

1. Address the specific error in that distractor choice
2. Identify the misconception a candidate likely held to select that option
3. Contrast with the correct approach
4. Reference the governing accounting standard or principle

This is the same structure applied to the 6 DL-007 items rewritten during Sub-batch 2B Wave 1 (P1-A-001, 002, 009, 018 — Section A Block 2 hold items) and the 10 DL-009 Pack C items corrected 2026-07-22.

### 3.2 Batch Structure

137 items at ≤28 per governance-guard Rule 5 = **5 batches**:

| Batch | File | QID Range | Items | Fields | Notes |
|-------|------|-----------|-------|--------|-------|
| 1A | `pack_c_corrected.js` | P1-AC-001 to P1-AC-025 | 20 | 60 | Two QID ranges: 001–010 + 016–025 (skip 011–015 clean cluster) |
| 1B | `pack_c_corrected.js` | P1-AC-031 to P1-AC-058 | 28 | 84 | First half of the 45-item contiguous block |
| 1C | `pack_c_corrected.js` | P1-AC-059 to P1-AC-075 | 17 | 51 | Second half + P1-AC-026–030 verification (clean, excluded) |
| 2A | `pack_d_corrected.js` | P1-AD-001 to P1-AD-028 | 28 | 84 | First third of the 53-item block |
| 2B | `pack_d_corrected.js` | P1-AD-029 to P1-AD-053 + P1-AD-057–059 | 28 | 84 | Remainder of 001–053 block + start of 057–075 block |
| 2C | `pack_d_corrected.js` | P1-AD-060 to P1-AD-075 | 16 | 48 | Remainder + P1-AD-054–056 verification (clean, excluded) |

**Total: 6 batches.** Batch 1C is sub-cap (17 items); Batch 2C is sub-cap (16 items).

### 3.3 Rewrite Standards

Per CAQS v1.0 §4.1 (Distractor Explanation required elements), each rewritten field must:

| Element | Requirement |
|---------|-------------|
| Why wrong | Identify the specific error in reasoning or computation |
| Misconception addressed | State what the candidate likely misunderstood to select this choice |
| Specific correction | Explain what the correct approach is and how it differs from the distractor's approach |
| Surface plausibility (recommended) | Acknowledge why a reasonable candidate might select this option |

**Minimum length:** 50 characters per field (per EV1).

**Prohibited patterns (per EV2):** "This is the correct choice", "Plausible distractor", "Common misunderstanding" (unexplained), and the DL-013 template text itself.

### 3.4 Topic-Based Editorial Sequencing

Within each batch, items should be addressed in topic order to maintain editorial coherence across related concepts:

| Batch | Topic Sequence |
|-------|---------------|
| 1A | Financial statements → revenue recognition → balance sheet classification → inventory → goodwill → impairment → contingencies → ratios |
| 1B–1C | Long-lived assets → intangibles → liabilities → equity → cash flows → financial ratios → statement analysis |
| 2A–2C | Same topic sequence as Pack C (mirrored parallel authoring) |

This ensures consistent treatment of equivalent concepts across both packs.

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

| Rule | Status | Notes |
|------|--------|-------|
| Rule 2 (DL-008 BLOCK) | N/A | All 137 items have correctly empty ExplanationWrong[CorrectChoice]. No DL-008 fixes needed. |
| Rule 3 (MASTER_QUESTION_REGISTRY.md) | DO NOT HAND-EDIT | Registry is generated by `scripts/build_master_registry.js` |
| Rule 5 (30-item cap) | Compliant | All 6 batches ≤28 items |
| Rule 1 (question_state changes) | N/A | No question_state changes planned — these are content-only rewrites |
| Rule 4 (answer-key changes) | N/A | No CorrectChoice or Correct changes planned |

### 4.3 Session Isolation

| Risk | Mitigation |
|------|-----------|
| Pack A active write session | **No conflict** — only `pack_c_corrected.js` and `pack_d_corrected.js` are in scope |
| Pack B certification (Session 3) | **No conflict** — different file (`pack_b_corrected.js`) |
| DL-012 clone archival | **Compatible** — DL-012 targets Section E only; this proposal targets Section A only. Can run concurrently. |
| DL-008 remediation batches | **Compatible** — DL-008 on Pack C/D Section A affects only clean items (the 10+3 that don't have DL-013). No overlap. |

---

## 5. Impact Assessment

### 5.1 Before/After — DL-013 Occurrence Counts

| Metric | Before | After (all 6 batches) |
|--------|--------|----------------------|
| Pack C DL-013 occurrences | 1,146 | 951 (195 removed) |
| Pack D DL-013 occurrences | 1,146 | 930 (216 removed) |
| Repository DL-013 occurrences | 2,587 | **2,176** (411 removed) |
| Pack C Section A template-contaminated items | 65 | **0** |
| Pack D Section A template-contaminated items | 72 | **0** |

### 5.2 Certification Unlock

| Metric | Before | After |
|--------|--------|-------|
| Pack C Section A items eligible for certification | 10 (clean only) | **75** (all — pending governance field assignment) |
| Pack D Section A items eligible for certification | 3 (clean only) | **75** (all — pending governance field assignment) |
| Total certification-blocked items unlocked | — | **137** |

### 5.3 Validator Impact

- ExplanationValidator: no DL-013-specific detection module exists — this defect is outside the automated validator suite
- DL-013 is detected by governance-guard Rule 5 and build-time AI verification only
- Zero regression expected — content-only rewrites in ExplanationWrong fields do not interact with any existing validator

### 5.4 Learner Safety

**Zero immediate risk.** All 137 items are outside the learner pool (no `question_state` governance field). After remediation, items require:
1. Governance field assignment (`question_state: "Unprocessed"`)
2. Six-dimension AI verification per CAQS §1.7.2
3. User approval documented in REVISION_HISTORY.md
4. `question_state` transition to `"Certified"`

None of these steps are included in this proposal.

---

## 6. Open Decisions

| Decision | Options | Recommendation |
|----------|---------|---------------|
| Batch execution order | Pack C first vs. Pack D first vs. interleave | **Pack C first (3 batches), then Pack D (3 batches)** — Pack C has more gap items requiring skip-verification; completing it first establishes editorial rhythm |
| DL-008 co-fix on clean items | Fix DL-008 on P1-AC-011–015, P1-AC-030 during DL-013 pass vs. separate session | **Separate session** — these 6 items need DL-008 fixes (Bucket 2 conceptual), not DL-013 rewrites. Mixing defect types within one batch risks editorial quality. |
| Batch 1A fragmentation | 20 items split across non-contiguous QID ranges vs. two micro-batches | **Single batch** — the P1-AC-011–015 skip is a 5-QID gap with known clean items. The batch script can auto-skip them. |
| Topic sequencing | Sequential (QID order) vs. topic-grouped (all revenue items together, etc.) | **QID order** — Pack C/D Section A items are already naturally grouped by topic in QID order. No need for reorganization. |
| Pre-batch verification | Verify each QID still has template text before rewrite vs. blind rewrite | **Verify before write** — items may have been modified by other sessions. Check that each ExplanationWrong field still contains both template marker phrases before replacing. |

---

## 7. Stop Conditions

- Do not execute any batch without explicit authorization. This is a proposal document only.
- Do not rewrite items that lack the template text — if a QID's ExplanationWrong fields have changed since inventory, skip it and note the discrepancy.
- Do not modify Pack A (`pack_a_corrected.js`) — other session active.
- Do not modify CorrectChoice or ExplanationCorrect — only ExplanationWrong fields are in scope.
- Before any batch, create timestamped backup of the target pack file.
- After any batch, verify the pack file parses cleanly (Function constructor or JSON.parse).
- After all batches, re-scan Pack C/D Section A for residual DL-013 template text — expected result: 0.

---

## 8. Cross-References

| Document | Relationship |
|----------|-------------|
| `knowledge/DEFECT_LIBRARY.md` §DL-013 | Formal defect definition — 882 QIDs, 2,587 occurrences |
| `reports/DL008_REMEDIATION_PROPOSAL.md` | Precedent: 386-item, 18-batch DL-008 proposal (2026-07-23) |
| `reports/DL008_FULL_POOL_SWEEP_2026-07-23.md` | Full-pool DL-008 sweep — confirms 0 DL-008 on contaminated items |
| `reports/DL007_SEGMENTATION.md` | DL-013 segmentation into 6 categories |
| `reports/DL007_QID_COUNT_BOUNDARY_REVERIFY.md` | Authoritative counting methodology (boundary-aware parsing) |
| `knowledge/BACKUP_PROTOCOL.md` | Mandatory backup rules |
| `knowledge/CAQS_v1.0.md` §4 | Explanation standards (EV1–EV8) |
| `.opencode/plugins/governance-guard.js` | Rule 5 BLOCK (≤30 items per change-set) |

---

*Proposal generated 2026-07-23. No remediation executed. No pack files modified.*
