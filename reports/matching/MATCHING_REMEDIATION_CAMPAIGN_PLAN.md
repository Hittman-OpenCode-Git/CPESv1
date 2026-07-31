# Session 81P — Matching Item Remediation Campaign Plan

**Generated:** 2026-07-30
**Governance Lane:** Light — Read-Only Analysis
**Inputs:** MATCHING_ITEM_AUDIT.json, MATCHING_ITEM_DEFECT_REPORT.md, MATCHING_ITEM_REMEDIATION_QUEUE.json
**Cross-reference:** MATCHING_REMEDIATION_BATCHES.json, MATCHING_REMEDIATION_ESTIMATES.md

---

## 1. Campaign Overview

| Metric | Count |
|--------|-------|
| Total matching items | 83 |
| Items with defects | 83 (100%) |
| Defect classes identified | 4 (A–D) |
| Unique case packs affected | 5 (case_pack_1 through case_pack_5) |
| Unique cases affected | 52 |
| Blueprint sections affected | 6 (A–F) |
| Governance lane for remediation | Full Governance Lane (case pack file edits) |

---

## 2. Defect Classes

### Class A — Same-Answer Reuse (HIGH)

**Definition:** Multiple LeftItems map to the same RightItem text, making the matching exercise unable to discriminate between those prompts. Candidates who get one correct automatically get the others.

**Items affected:** 6 (CBQ-E1-Q5, CBQ3-D1-Q6, CBQ2-C1-Q1, CBQ4-F2-Q2, CBQ3-A2-Q5, CBQ5-C3-Q2)

**Manifestation patterns:**
| Pattern | Items | Example |
|---------|-------|---------|
| Binary classification (2 LeftItems → same answer) | CBQ-E1-Q5, CBQ4-F2-Q2, CBQ3-A2-Q5, CBQ5-C3-Q2 | 4 controls map to 2 categories |
| Multiple classification (3 LeftItems → same answer) | CBQ3-D1-Q6, CBQ2-C1-Q1 | 3 cost items all map to "Product cost" |

**Remediation strategy:**

**Pattern 1 (Binary classification with 4 prompts / 2 categories):**
- *Option A (recommended):* Expand RightItems. Instead of ["Preventive", "Detective"], use distinct descriptions: ["Preventive — stops errors before they occur", "Detective — identifies errors after they occur"]. Each LeftItem maps to a unique RightItem.
- *Option B:* Split into two separate matching items (2+2) with distinct RightItem pools.
- *Option C:* Convert to a multi-select or select question type.

**Pattern 2 (Multiple classification with 4 prompts, 3→1 cluster):**
- CBQ3-D1-Q6: "Product cost" maps to DM, DL, VOH. Redesign LeftItems so they distinguish between cost types (DM = product cost, manufacturing; DL = product cost, conversion; VOH = product cost, indirect). Each gets a unique RightItem descriptor.
- CBQ2-C1-Q1: "Requires separate price and quantity data..." maps to 3 variance types. Replace with distinct content: "Requires actual price × actual quantity data beyond the flexible budget summary" vs. "Requires standard price × actual quantity data unavailable in the flexible budget report" vs. "Requires standard rate × actual hours unavailable in the flexible budget report".

### Class B — Duplicate Distractors (HIGH)

**Definition:** RightItems array contains identical text entries multiple times. Creates ambiguous or invalid matching mechanics.

**Items affected:** 3 (CBQ-E1-Q5, CBQ3-D1-Q6, CBQ2-C1-Q1)

**Overlap with Class A:** 100%. All 3 items carry both Class A and Class B defects. Fixing Class A will automatically resolve Class B — the strategy of creating distinct RightItems for each LeftItem eliminates duplicates.

**Remediation strategy:** Absorbed into Class A remediation. No separate wave needed.

### Class C — Ordered-Answer Pattern (HIGH)

**Definition:** The correct RightItem for LeftItem at index N is also at index N in the RightItems array (sequentialRatio = 1.0 or near-1.0). Learners can solve by position rather than knowledge.

**Items affected:** 81 (includes 3 items at 75% sequential ratio: CBQ3-A2-Q5, CBQ4-F2-Q2, CBQ5-C3-Q2)

**Remediation strategy:** Shuffle RightItems so that the correct answer index for each LeftItem does not equal the LeftItem's position index. This is a mechanical operation — no content authoring required.

**Rules for valid shuffle:**
1. No correct-answer index may equal its LeftItem position index.
2. Result must be independently verified per item.
3. The Correct mapping within the case object must be updated to reflect the new indices.
4. Explanation text (if present) must be checked for position references.

**Items with some positional variance (no-shuffle needed):**
- CBQ3-A2-Q5: 75% sequential (3 of 4), 1 pair already offset
- CBQ4-F2-Q2: 25% sequential (2 of 4)
- CBQ5-C3-Q2: 25% sequential (2 of 4)

These three are lower-priority for Class C but still warrant a shuffle pass.

### Class D — No-Extra Distractors (MEDIUM)

**Definition:** RightItems count equals LeftItems count (no surplus choices). Process of elimination works perfectly — the last unmatched pair is a free answer.

**Items affected:** 20 (those where leftCount == rightCount with no extra distractors)

**Remediation strategy:** Author 1–2 additional plausible RightItems as distractors. These must be:
1. Topically relevant to the matching domain
2. Plausible for at least one LeftItem (not obviously wrong)
3. Not already present in the RightItems array

**Sections most affected:** A (3 items), B (2 items), C (4 items), D (6 items), E (3 items), F (2 items)

---

## 3. Remediation Waves

### Wave 1 — Critical Measurement-Validity Defects (6 items)

**Scope:** All 6 Class A (same-answer reuse) items. These also cover all 3 Class B (duplicate distractor) items.

| Item | Case | Section | Priority | Primary Defect | Secondary |
|------|------|---------|----------|---------------|-----------|
| CBQ-E1-Q5 | CBQ-E1 | E | 41 | SAME_ANSWER_REUSE (2 clusters) | DUPLICATE, ORDERED, NO_EXTRA |
| CBQ3-D1-Q6 | CBQ3-D1 | D | 31 | SAME_ANSWER_REUSE (1 cluster, 3x) | DUPLICATE, ORDERED, NO_EXTRA |
| CBQ2-C1-Q1 | CBQ2-C1 | C | 30 | SAME_ANSWER_REUSE (1 cluster, 3x) | DUPLICATE, ORDERED |
| CBQ4-F2-Q2 | CBQ4-F2 | F | 21 | SAME_ANSWER_REUSE (2 clusters) | ORDERED (LOW), NO_EXTRA |
| CBQ3-A2-Q5 | CBQ3-A2 | A | 12 | SAME_ANSWER_REUSE (1 cluster) | ORDERED (75%), NO_EXTRA |
| CBQ5-C3-Q2 | CBQ5-C3 | C | ~10 | SAME_ANSWER_REUSE (1 cluster) | ORDERED (25%) |

**Remediation approach per item:**
1. Redesign LeftItems/RightItems to eliminate shared answers
2. Verify accounting correctness of all new answer pairings
3. Update Correct mapping to new indices
4. Apply Class C shuffle (post-redesign)
5. Apply Class D expansion (add 1–2 extra distractors where missing)
6. Run preflight on affected case pack file
7. Log to REVISION_HISTORY.md

### Wave 2 — Remaining Same-Answer Reuse

**Scope:** 0 items. All 6 same-answer-reuse items are covered in Wave 1.

### Wave 3 — Duplicate Distractor Repairs

**Scope:** 0 items. All 3 are covered in Wave 1 (absorbed by Class A remediation).

### Wave 4 — Ordered-Pattern Shuffle (75 items)

**Scope:** All remaining items with ORDERED_ANSWER_PATTERN not already addressed in Wave 1.

**Strategy:** Mechanical RightItems shuffle. No content authoring required.

**Batch plan:** 75 items ÷ 28 max per batch = 3 batches per governance-guard Rule 5.

| Batch | Count | Sections | Packs |
|-------|-------|----------|-------|
| 4A | 28 | A–B (Clean sweep) | Packs 1–4 |
| 4B | 28 | C–D (excluding Wave 1 items) | Packs 1–5 |
| 4C | 19 | E–F (excluding Wave 1 items) | Packs 1–4 |

**Each batch:** Shuffle RightItems → verify no position matches remain → update case objects → preflight → REVISION_HISTORY.md entry.

### Wave 5 — No-Extra Distractor Expansion (17 items)

**Scope:** Remaining 17 items with NO_EXTRA_DISTRACTORS not already addressed in Wave 1.

**Strategy:** Author 1–2 unique, plausible RightItems per item. Content authoring required, but only for distractors — no answer-key changes.

**Batch plan:** 17 items ÷ 28 max = 1 batch.

| Batch | Count | Sections | Packs |
|-------|-------|----------|-------|
| 5A | 17 | A–F (wave 1 excluded) | Packs 1–4 |

**Each authoring unit:** Verify topic relevance, plausible-wrong alignment, non-duplication with existing RightItems.

### Wave 6 — Unused Distractor Cleanup (65 findings, LOW)

**Scope:** 65 items have RightItems that are never used as a correct answer.

**Decision required:** 
- *Option A:* Assign unused distractors to new or redesigned LeftItems (requires content authoring)
- *Option B:* Remove unused distractors (simple, but reduces RightItems count)
- *Option C:* Defer — these are LOW severity informational findings. The distractors exist and serve as plausible alternatives; their unused status is a psychometric note, not a measurement-validity defect.

**Recommendation:** Option C — defer to a future content-enhancement wave. These 65 unused distractors are not blocking remediation. They represent reserve capacity in the RightItems pool that could be activated if additional LeftItems are added later.

---

## 4. Governance Protocol (for Remediation Execution)

All remediation waves require Full Governance Lane protocol because they edit case pack files:

1. **T0:** `npm run preflight` — verify 0 divergences
2. **Backup-before-write:** Per BACKUP_PROTOCOL.md — timestamped backup of each case pack file before edit
3. **Batch cap:** ≤28 items per batch (governance-guard Rule 5)
4. **Independent verification:** After each batch, verify no unintended changes to other case items
5. **REVISION_HISTORY.md:** Entry per batch with QID list, before/after RightItems, verification result
6. **Tend:** `npm run pipeline` (validate → build-registry → dashboard)

**Read-only restriction for this session:** No edits to case content, answer keys, scoring, registries, or baselines. This is a planning document only.

---

## 5. Dependency Map

```
Wave 1 (Class A + Class B)
  │
  ├─→ 6 items: content redesign + Class C + Class D
  │
  ↓
Wave 4 (Class C — Ordered Patterns)
  │
  ├─→ 75 items: mechanical shuffle only
  │   depends on Wave 1 completion (to avoid shuffling already-redesigned items)
  │
  ↓
Wave 5 (Class D — Extra Distractors)
  │
  ├─→ 17 items: author 1–2 distractors each
  │   depends on Wave 4 completion (shuffled indices must be stable)
  │
  ↓
Wave 6 (Unused Distractors — DEFERRED)
  │
  └─→ 65 items: decide Option A/B/C; no urgency
```

**Parallel possibilities:** Wave 4 and Wave 5 could be partially parallelized if Wave 4 batches leave Wave 5 items in a stable state. However, since shuffling changes RightItems array composition, Wave 5 should run after Wave 4 to avoid rework.

---

## 6. Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Class A resolved | 0 items with same-answer reuse | Re-run SAME_ANSWER_REUSE scan on all 83 items |
| Class B resolved | 0 items with duplicate distractors | Re-run DUPLICATE_DISTRACTOR scan |
| Class C resolved | SequentialRatio = 0 for all items | Per-item answerIndex ≠ LeftItem position index |
| Class D resolved | rightCount > leftCount for all items | RightItems.length > LeftItems.length |
| No new defects | 0 DL-008, 0 regression on other case items | Preflight PASS, validator 0 errors |
| Registry stable | QID count unchanged (83 match items) | `grep -c '"ItemID"'` on case pack files |
| Governance compliance | Rule 5 batch cap honored, backups confirmed | REVISION_HISTORY.md entries present |

---

## 7. Open Decisions

| ID | Decision | Options | Recommended |
|----|----------|---------|-------------|
| D1 | CBQ-E1-Q5 redesign approach | A: Distinct RightItems descriptions / B: Split items / C: Convert type | A — preserves case structure |
| D2 | CBQ2-C1-Q1 rehabilitation | Redesign answer text or redesign LeftItems | Redesign RightItems to remove duplicate text |
| D3 | Unused distractor disposition | A: Assign / B: Remove / C: Defer | C — defer, LOW severity |
| D4 | Case pack file scope | Edit in-place or create new pack variant | In-place — standard for defect remediation |

---

## 8. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Answer-key corruption during redesign | Low | Critical | Independent verification of all Correct mappings post-edit |
| Shuffle introduces new positional cues | Low | Medium | Verify no answer index == position index; sample random 20% |
| Concurrent session overwrite (DL-019 pattern) | Medium | High | Coordinate across sessions; no concurrent case pack edits |
| Extra-distractor authoring introduces accounting errors | Low | Medium | Accountant review of all authored distractors |
| Batch cap violation | Low | Medium | Pre-count all batches; verify ≤28 per batch |

---

## Appendix A: Full Item Inventory by Wave

### Wave 1 (6 items)
CBQ-E1-Q5, CBQ3-D1-Q6, CBQ2-C1-Q1, CBQ4-F2-Q2, CBQ3-A2-Q5, CBQ5-C3-Q2

### Wave 4 — Batch 4A (28 items)
CBQ-A2-Q6, CBQ-A3-Q6, CBQ2-A2-Q4, CBQ-B2-Q6, CBQ2-B2-Q6, CBQ2-B3-Q6, CBQ3-B2-Q6, CBQ3-B3-Q6, CBQ4-B2-Q6, CBQ5-B1-Q2, [plus 18 more ordered-pattern items from packs 1-4, sections A-B]

### Wave 4 — Batch 4B (28 items)
CBQ-C1-Q6, CBQ-C2-Q6, CBQ-C3-Q5, CBQ2-C1-Q2, CBQ2-C1-Q3, CBQ2-C1-Q4, CBQ2-C1-Q5, CBQ3-C1-Q1, CBQ3-C1-Q2, CBQ3-C1-Q3, CBQ3-C1-Q4, CBQ3-C1-Q5, CBQ3-C2-Q4, CBQ3-C3-Q4, CBQ4-C2-Q1, CBQ4-C2-Q2, CBQ4-C2-Q3, CBQ4-C2-Q4, CBQ4-C2-Q5, CBQ5-C2-Q1, CBQ5-C2-Q2, CBQ5-C2-Q3, CBQ5-C2-Q4, CBQ5-C2-Q5, CBQ-D1-Q6, CBQ-D2-Q6, CBQ2-D2-Q6, CBQ3-D2-Q6

### Wave 4 — Batch 4C (19 items)
CBQ4-D1-Q6, CBQ4-D2-Q6, CBQ4-D3-Q4, CBQ5-D1-Q1, CBQ5-D1-Q2, CBQ5-D1-Q3, CBQ5-D1-Q4, CBQ5-D1-Q5, CBQ5-D2-Q1, CBQ5-D2-Q2, CBQ5-D3-Q3, CBQ-E2-Q5, CBQ-F1-Q4, CBQ-F2-Q6, CBQ3-E1-Q1, CBQ3-E1-Q2, CBQ3-E1-Q3, CBQ3-E1-Q4, CBQ3-E1-Q5

### Wave 5 (17 items)
CBQ-A2-Q6, CBQ-A3-Q6, CBQ-B2-Q6, CBQ2-B2-Q6, CBQ-C1-Q6, CBQ-C2-Q6, CBQ-C3-Q5, CBQ-D1-Q6, CBQ-D2-Q6, CBQ2-D2-Q6, CBQ-E2-Q5, CBQ-F1-Q4, CBQ-F2-Q6, CBQ3-D2-Q6, CBQ4-D1-Q6, CBQ4-D2-Q6, CBQ3-A2-Q5

*Note: Wave 5 list assumes Wave 1 items (CBQ-E1-Q5, CBQ3-D1-Q6) are already covered. The full 20-item Class D list minus 3 Wave 1 items = 17.*
