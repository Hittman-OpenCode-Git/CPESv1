# Session 81P — Matching Item Remediation Effort Estimates

**Generated:** 2026-07-30
**Governance Lane:** Light — Read-Only Analysis
**Cross-reference:** MATCHING_REMEDIATION_CAMPAIGN_PLAN.md, MATCHING_REMEDIATION_BATCHES.json

---

## 1. Effort Summary

| Category | Items | Batches | Est. Content Time | Est. Governance Overhead | Total Est. |
|----------|-------|---------|-------------------|------------------------|------------|
| Wave 1 (Class A+B+C+D) | 6 | 2 | 2.5 hrs | 0.6 hrs | **3.1 hrs** |
| Wave 4 (Class C) | 81 | 3 | 2.0 hrs | 0.5 hrs | **2.5 hrs** |
| Wave 5 (Class D) | 20 | 2 | 1.7 hrs | 0.4 hrs | **2.1 hrs** |
| Wave 6 (Unused distractors) | 65 | 0 | Deferred | — | **0 hrs** |
| **Campaign Total** | **83** | **7** | **6.2 hrs** | **1.5 hrs** | **~7.7 hrs** |

---

## 2. Wave 1 — Critical Measurement-Validity Defects (6 items)

### Complexity Classification

| QID | Complexity | Rationale |
|-----|-----------|-----------|
| CBQ-E1-Q5 | HIGH | Binary classification. Must author 4 distinct control descriptions and expand RightItems pool. Accounting-accuracy verification required. |
| CBQ3-D1-Q6 | HIGH | 3→1 answer reuse. Must distinguish DM/DL/VOH cost classifications with unique RightItems. Conceptually subtle (all three ARE product costs). |
| CBQ2-C1-Q1 | HIGH | 3→1 answer reuse. Variance analysis terminology is precise. Must differentiate without introducing accounting errors. Requires exhibit cross-reference. |
| CBQ4-F2-Q2 | MODERATE | Binary ML classification. Can use existing unused distractors. LeftItems are straightforward supervised/unsupervised examples. |
| CBQ3-A2-Q5 | MODERATE | 2→1 answer reuse. Cash flow indirect method. Must distinguish gain deduction from working-capital deduction reasons. |
| CBQ5-C3-Q2 | MODERATE | 2→1 answer reuse. Sales volume vs. sales quantity variance distinction is subtle and requires precise RightItems. |

### Per-Item Estimate

| Complexity | Items | Min/Item | Est. Hours |
|------------|-------|----------|------------|
| HIGH | 3 | 30 min | 1.5 |
| MODERATE | 3 | 20 min | 1.0 |
| **Subtotal** | **6** | | **2.5 hrs** |

### Governance Overhead

| Activity | Per Batch | × 2 Batches |
|----------|-----------|-------------|
| Backup-before-write | 2 min | 4 min |
| Preflight (pre-edit) | 2 min | 4 min |
| Independent verification | 5 min | 10 min |
| REVISION_HISTORY.md entry | 3 min | 6 min |
| Pipeline (post-edit) | 3 min | 6 min |
| **Subtotal** | **15 min** | **30 min** |

**Wave 1 total:** 3.0 hrs

---

## 3. Wave 4 — Ordered-Pattern Shuffle (81 items)

### Complexity Classification

All 81 items are **LOW** complexity — mechanical shuffle only. No content authoring.

### Per-Item Estimate

| Activity | Min/Item |
|----------|----------|
| Read current RightItems order | 0.5 min |
| Compute shuffle (no position == index) | 0.5 min |
| Verify shuffle (spot-check answer indices) | 0.5 min |
| Update case object | 0.5 min |
| **Per-item total** | **2.0 min** |

**81 items × 2.0 min = 162 min ≈ 2.7 hrs**

However, many items within the same case share a common RightItems array reference. If the same RightItems array is shuffled once per case rather than once per item, the effort drops significantly.

### Case-Level Optimization

| Packs | Cases with match items | Est. Unique RightItems Pools |
|-------|----------------------|------------------------------|
| case_pack_1 | 12 | ~12 |
| case_pack_2 | 6 | ~6 |
| case_pack_3 | 11 | ~11 |
| case_pack_4 | 10 | ~10 |
| case_pack_5 | 7 | ~7 |
| **Total** | **~46 unique cases** | **~46 shuffle operations** |

With case-level optimization: **~1.5 hrs content time.**

**Conservative estimate (item-level):** 2.0 hrs

### Governance Overhead

| Activity | Per Batch | × 3 Batches |
|----------|-----------|-------------|
| Backup-before-write | 2 min | 6 min |
| Preflight | 2 min | 6 min |
| Verification (20% spot-check = 16 items) | 5 min | 15 min |
| REVISION_HISTORY.md | 3 min | 9 min |
| Pipeline | 3 min | 9 min |
| **Subtotal** | **15 min** | **45 min** |

**Wave 4 total:** 2.5 hrs

---

## 4. Wave 5 — No-Extra Distractor Expansion (20 items)

### Complexity Classification

| Complexity | Items | Rationale |
|------------|-------|-----------|
| MODERATE | 10 | Items in well-defined topic areas (variance analysis, cost management, IT controls) where plausible distractors are straightforward to author. |
| MODERATE | 10 | Items requiring careful distractor authoring to avoid obvious-wrong cues or duplicate concepts. |

### Per-Item Estimate

| Activity | Min/Item |
|----------|----------|
| Identify 1-2 plausible wrong answers | 3 min |
| Verify distractor is topically relevant, not already present | 2 min |
| Author distractor text (professional tone, CMA-appropriate) | 3 min |
| Insert into RightItems array | 1 min |
| Verify rendering (no duplicate, plausible) | 1 min |
| **Per-item total** | **10 min** |

**20 items × 10 min = 200 min ≈ 3.3 hrs**

But many items need only 1 extra distractor (those where rightCount == leftCount and need rightCount > leftCount). Conservative estimate: **2.5 hrs**.

### Governance Overhead

| Activity | Per Batch | × 2 Batches |
|----------|-----------|-------------|
| Backup-before-write | 2 min | 4 min |
| Preflight | 2 min | 4 min |
| Accountant review of authored distractors | 5 min | 10 min |
| Independent verification | 5 min | 10 min |
| REVISION_HISTORY.md | 3 min | 6 min |
| Pipeline | 3 min | 6 min |
| **Subtotal** | **20 min** | **40 min** |

**Wave 5 total:** 3.1 hrs

---

## 5. Wave 6 — Unused Distractor Cleanup (65 items)

**Deferred.** No effort in current campaign.

| Option | Effort | Recommendation |
|--------|--------|---------------|
| A: Assign to new LeftItems | 10–15 hrs (content authoring) | Deferred |
| B: Remove | 1 hr (mechanical) | Not recommended — loses reserve distractors |
| C: Defer | 0 hrs | **Selected.** LOW severity. No learner-pool impact. |

---

## 6. Cross-Cutting Factors

### Risk-Adjusted Buffer

| Risk Factor | Adjustment | Rationale |
|-------------|-----------|-----------|
| Accounting verification for Wave 1 content redesign | +15% | HIGH complexity items require accountant review |
| Case pack file coordination (5 files) | +10% | Multiple case packs in scope; risk of concurrent edits |
| Shuffle verification (81 items) | +5% | Automated verification script needed to confirm zero position matches |
| Distractor quality review | +10% | Wave 5 distractors must be educationally sound |

**Weighted risk buffer:** +10% on total = **~0.8 hrs**

### Total Campaign Effort

| Wave | Base Hours | Risk Buffer | Final Estimate |
|------|-----------|-------------|----------------|
| Wave 1 | 3.0 | +0.3 | **3.3 hrs** |
| Wave 4 | 2.5 | +0.2 | **2.7 hrs** |
| Wave 5 | 3.1 | +0.3 | **3.4 hrs** |
| **Total** | **8.6 hrs** | **+0.8 hrs** | **~9.4 hrs** |

### Session Count Estimate

| Wave | Est. Sessions | Rationale |
|------|--------------|-----------|
| Wave 1 | 1–2 | 6 items with content redesign + governance; each batch ~30 min active time |
| Wave 4 | 1–2 | 81 items but mechanical; 3 batches; script-assisted |
| Wave 5 | 1 | 20 items, 2 batches; distractor authoring is serial work |
| **Total** | **3–5 sessions** | |

---

## 7. Psychometric Improvement Projections

| Defect Class | Pre-Remediation | Post-Remediation | Expected Impact |
|-------------|-----------------|------------------|-----------------|
| Class A (same-answer reuse) | 6 items | 0 items | **HIGH** — items regain discrimination between concepts |
| Class B (duplicate distractors) | 3 items | 0 items | **HIGH** — ambiguous matching mechanics eliminated |
| Class C (ordered-answer pattern) | 81 items | 0 items | **HIGH** — positional cueing eliminated across entire pool |
| Class D (no-extra distractors) | 20 items | 0 items | **MEDIUM** — elimination-by-process reduced |
| Unused distractors | 65 items | 65 items | **NONE** — deferred |

### Pool-Wide Quality Metrics

| Metric | Before | After (projected) |
|--------|--------|-------------------|
| Matching items clean (0 defects) | 0 / 83 | 83 / 83 |
| Items with measurement-validity defects | 9 / 83 (11%) | 0 / 83 (0%) |
| Items with positional cueing | 81 / 83 (98%) | 0 / 83 (0%) |
| Items with elimination vulnerability | 20 / 83 (24%) | 0 / 83 (0%) |
| Average defects per item | 2.7 | 0 (for wave 1-5 defects) |

---

## 8. Tools and Scripting Opportunities

| Tool | Purpose | Build Time | Reuse Value |
|------|---------|-----------|-------------|
| `scripts/shuffle_matching_rightItems.js` | Mechanical shuffle for Wave 4 | ~30 min | HIGH — reusable for future matching items |
| `scripts/verify_matching_shuffle.js` | Confirms 0 position matches post-shuffle | ~15 min | HIGH — governance guard integration possible |
| `scripts/audit_matching_answers.js` | Verifies uniqueness of RightItems post-Wave 1 | ~20 min | MEDIUM — diagnostic tool |

Investing ~1 hr in automation could reduce Wave 4 from 2.5 hrs to ~1 hr (script-assisted batch shuffle + verification). This is recommended before Wave 4 execution.

---

## Appendix A: Per-Item Effort Detail (Wave 1)

| QID | Content | Verify | Shuffle | Extra D. | Governance | Item Total |
|-----|---------|--------|---------|----------|------------|------------|
| CBQ-E1-Q5 | 25 min | 5 min | 2 min | 5 min | 5 min | 42 min |
| CBQ3-D1-Q6 | 25 min | 5 min | 2 min | 5 min | 5 min | 42 min |
| CBQ2-C1-Q1 | 25 min | 5 min | 2 min | N/A | 5 min | 37 min |
| CBQ4-F2-Q2 | 15 min | 3 min | 2 min | 5 min | 5 min | 30 min |
| CBQ3-A2-Q5 | 15 min | 3 min | 2 min | 5 min | 5 min | 30 min |
| CBQ5-C3-Q2 | 15 min | 3 min | N/A | N/A | 5 min | 23 min |
| **Total** | **120 min** | **24 min** | **10 min** | **20 min** | **30 min** | **~204 min** |
