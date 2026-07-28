# S841 Difficulty Alignment Report — From Systematic Inflation to Calibrated Accuracy

**Session:** S841
**Date:** 2026-07-27
**Status:** PLAN — 545-item immediate recalibration + 522-item Wave 2 content creation

---

## 1. The Problem: Systematic Difficulty Inflation

The S835 structural scan of 2,540 items revealed that the difficulty distribution is not just off-target — it's systematically inflated by the template-based authoring pipeline.

| Discovery | Finding |
|-----------|---------|
| DL-031 pattern | ~500 definition-match items labeled Moderate that test Bloom's Remember/Understand |
| DL-032 pattern | 420 case items uniformly Moderate with zero calibration |
| Moderate concentration | 48.3% of pool labeled Moderate vs 30% target |
| Very Difficult absence | 0 items — highest difficulty tier completely empty |
| Difficult deficit | 4.4% vs 25% target — 522 items short |

**Root cause:** The 5-item rotation template assigned difficulty labels by position in the rotation group, not by cognitive demand assessment. A question that asks "what is the term for [textbook definition]" got the same Moderate label as a question requiring multi-step variance decomposition.

---

## 2. The Calibration Principle

**Accuracy over distribution targets.** The primary goal of Segment Immediate is to fix known mislabeling, not to hit CAQS targets. If correcting DL-031 makes the Easy surplus worse (which it will — 569→1,084), that's acceptable because those items were NEVER Moderate. Distribution targets are achieved through new content creation (Wave 2), not through inaccurate relabeling.

---

## 3. Three-Segment Approach

### Segment Immediate: Accuracy Calibration (545 items)

**Action:** Fix what's provably wrong.

| Sub-Segment | Count | Change | Rationale |
|-------------|-------|--------|-----------|
| DL-031 Definition-Match | 500 | Moderate(3)→Easy(1) | Stem is a textbook definition, answer is the term. Tests recall, not application. |
| Case Uniform Moderate | 45 | Various → calibrated | 15 Easy (recall items), 15 Difficult (multi-exhibit), 15 Moderate-Easy (simple calc) |

**Post-Immediate distribution:**

| Tier | Before | After | Change |
|------|--------|-------|--------|
| Easy (1) | 569 (22.4%) | 1,084 (42.7%) | +515 |
| Moderate-Easy (2) | 639 (25.2%) | 654 (25.7%) | +15 |
| Moderate (3) | 1,228 (48.3%) | 698 (27.5%) | −530 |
| Difficult (4) | 113 (4.4%) | 113 (4.4%) | 0 |
| Very Difficult (5) | 0 (0.0%) | 0 (0.0%) | 0 |

**Key insight:** The Moderate tier drops from 1,228→698 (−43%). The Easy tier balloons to 42.7%. This is NOT a problem — it's the truth. The pool genuinely has many definitional items. Pretending they're Moderate doesn't help learners.

### Wave 1: Upgrade-Linked Promotion (100 items)

**Action:** Promote items that ARE being upgraded to Analyze.

| Action | Count | Change | Trigger |
|--------|-------|--------|---------|
| S839 Cohort A+B Analyze upgrade | 70 | Moderate(3)→Difficult(4) | Multi-step analysis items now genuinely require Difficult-level cognitive demand |
| Existing Difficult audit | 30 | Verify/correct labeling | Spot-check existing Difficult items for accuracy |

**Post-Wave 1 distribution:**

| Tier | Before | After | Change |
|------|--------|-------|--------|
| Easy (1) | 1,084 | 1,084 | 0 |
| Moderate-Easy (2) | 654 | 654 | 0 |
| Moderate (3) | 698 | 598 | −100 |
| Difficult (4) | 113 | 213 | +100 |
| Very Difficult (5) | 0 | 0 | 0 |

### Wave 2: Content Creation (522 items)

**Action:** Author net-new items at Difficult and Very Difficult levels.

This cannot be done through recalibration. The pool simply doesn't have items complex enough to merit Difficult or Very Difficult labeling. New items must be authored from scratch via the S836 pipeline at these difficulty levels.

**Post-Wave 2 distribution (pool grows to 3,062):**

| Tier | Count | % | vs Target |
|------|-------|---|-----------|
| Easy (1) | 1,084 | 35.4% | +20.4% (target 15%) |
| Moderate-Easy (2) | 654 | 21.4% | +1.4% (target 20%) |
| Moderate (3) | 598 | 19.5% | −10.5% (target 30%) |
| Difficult (4) | 613 | 20.0% | −5.0% (target 25%) |
| Very Difficult (5) | 122 | 4.0% | −6.0% (target 10%) |
| **Total** | **3,062** | | |

---

## 4. Movement Trajectory

```
Current:       E:22%  ME:25%  M:48%  D:4%   VD:0%
                  ↓ Segment Immediate (accuracy fix)
Post-Imm:      E:43%  ME:26%  M:28%  D:4%   VD:0%
                  ↓ Wave 1 (upgrade promotion)
Post-W1:       E:43%  ME:26%  M:24%  D:8%   VD:0%
                  ↓ Wave 2 (content creation)
Post-W2:       E:35%  ME:21%  M:20%  D:20%  VD:4%
                  ↓
Target (CAQS): E:15%  ME:20%  M:30%  D:25%  VD:10%
```

---

## 5. Why Distribution Targets Are a Long-Term Goal

The CAQS §6.1 distribution targets (15/20/30/25/10) assume a mature, fully calibrated question pool. The current pool has 2,540 items built by a template engine that didn't calibrate difficulty. Achieving the targets requires:

1. **Fix what's wrong** (Segment Immediate) — ~545 items
2. **Promote what deserves it** (Wave 1) — ~100 items
3. **Create what's missing** (Wave 2 + Sprint 4) — 522+ items of Difficult/Very Difficult content
4. **Accept that Easy surplus is structural** — the pool was built heavy on definitions. Archiving Easy items would reduce pool size. Better to add higher-difficulty items to dilute the Easy percentage.

**Realistic target after Sprint 4 (pool ~3,280):**
- Easy: ~33% (still above target — acceptable, pool was built this way)
- Moderate-Easy: ~20% (on target)
- Moderate: ~22% (near target)
- Difficult: ~20% (approaching target)
- Very Difficult: ~6% (from 0%)

---

## 6. Execution Requirements

| Segment | Batches | Hours | Pack Files Modified | Governance |
|---------|---------|-------|--------------------|------------|
| Immediate | 18 batches (≤28 each) | ~27 hours | All 5 packs | Rule 4 WARN (difficulty label only) |
| Wave 1 | 4 batches (≤28 each) | ~6 hours | Packs B, C, D, E | Concurrent with S840 Cohort execution |
| Wave 2 | Via S836 Sprint 2-3 | Via Sprint plan | New items only | Full pipeline gates |

**Critical constraint:** Segment Immediate cannot be executed via automated regex replacement. Each of the 500 DL-031 items requires per-item stem review to confirm the definition-match pattern. False positives (items with high stem-choice overlap that genuinely require Moderate difficulty) must be excluded.

---

## 7. Governance Attestation

- AGENTS.md §2: Planning document. No pack file modifications.
- Governance guard Rule 4: All difficulty recalibrations are label-only changes. CorrectChoice preserved. WARN applies — REVISION_HISTORY.md entry required per batch.
- Governance guard Rule 5: All batches ≤28 items.
- Source data: S835 Difficulty Distribution Scan (`scripts/output/SESSION835_ANALYZE_EVALUATE_GAP_ANALYSIS.json`)
