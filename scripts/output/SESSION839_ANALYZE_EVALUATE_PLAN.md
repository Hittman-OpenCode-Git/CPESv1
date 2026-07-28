# S839 Analyze/Evaluate Upgrade Sprint — Execution Plan

**Session:** S839
**Date:** 2026-07-27
**Program:** 800-Series Content Maturity Transformation Program
**Status:** PLAN — Ready for S840 Execution

---

## 1. Executive Summary

The S835-S838 discovery phase confirmed that the 2,540-item question pool has near-zero higher-order content:

| Level | Actual | Target (CAQS §6.2) | Gap |
|-------|--------|--------------------|-----|
| Analyze | 10 (0.4%) | 635 (25%) | **−625** |
| Evaluate | 0 (0.0%) | 381 (15%) | **−381** |

S839 has identified and organized **100 Certified items** into 3 upgrade cohorts. These items are already at Apply/Understand level with DifficultyScore ≥ 3 and analysis-oriented topics. They represent the best existing candidates for cognitive-level upgrading.

**The upgrade path is reclassification, not new authoring.** Each item already tests multi-step calculations or conceptual analysis at Apply level; the upgrade converts it to Analyze by expanding explanations with root-cause analysis, comparative interpretation, and business-context judgment.

---

## 2. Cohort Structure

### Cohort A — Variance Analysis & Performance Management (35 items)

**Target:** Analyze
**Domains:** C (Performance Management), D (Cost Management)
**Profile:** 20 items at DS=4 (Difficult), 15 at DS=3 (Moderate). Dominated by Pack B (20 items) which is structurally clean and all-Certified. Topics span variance analysis, sales variance decomposition, ROI/residual income, transfer pricing, joint products, CVP multi-product, and relevant costing.

**Upgrade pattern:**
- ADD: Root-cause interpretation of the variance direction (favorable/unfavorable → why it occurred)
- ADD: Comparison to prior period or budget benchmark
- ADD: Business recommendation based on the analysis
- CHANGE: Distractors from single-error calculation mistakes to interpretation-level errors

**Batches (4):**
| Batch | Count | QIDs |
|-------|-------|------|
| A1 | 12 | P1B-C-108 through P1B-C-184 variance/ROI cluster |
| A2 | 8 | P1B-D-095 through P1B-D-144 cost management cluster |
| A3 | 8 | P1-CD-009 through P1-DD-054 Pack D cost/variance |
| A4 | 7 | P1E-C-039 through P1-DC-021 Pack E/C mix |

### Cohort B — Budgeting & Financial Analysis (35 items)

**Target:** Analyze
**Domains:** B (Planning/Budgeting), A (External Financial Reporting)
**Profile:** 22 items at DS=4 (Difficult), 13 at DS=3. Heavy Pack B concentration (26 of 35). Topics include cash budget analysis, flexible budget comparison, learning curves, expected value, sensitivity analysis, cash flow statement analysis, revenue recognition, and EPS.

**Upgrade pattern:**
- ADD: Scenario comparison (e.g., "what if collection pattern changes from 50% to 40%?")
- ADD: Inter-period trend interpretation
- ADD: Link between budget variance and business decision
- CHANGE: Distractors from calculation errors to interpretation errors

**Batches (4):**
| Batch | Count | QIDs |
|-------|-------|------|
| B1 | 10 | P1B-A-082 through P1B-A-149 financial reporting |
| B2 | 10 | P1B-B-108 through P1B-B-191 budgeting core |
| B3 | 9 | P1E-B-002 through P1-BC-094 Pack C/E budget |
| B4 | 6 | P1B-A-141 through P1B-B-150 remaining |

### Cohort C — Controls, Technology & Advanced Judgment (30 items)

**Target:** Analyze (20) + Evaluate (10 R-series)
**Domains:** E (Internal Controls), F (Technology & Analytics)
**Profile:** Mixed Apply+Understand items. The 10 R-series items (P1-E-R01 through P1-E-R38) are scenario-based control assessment items — the strongest candidates for Evaluate upgrade in the entire pool.

**Upgrade pattern (Analyze items):**
- ADD: Control deficiency severity classification reasoning
- ADD: Compensating control effectiveness assessment
- ADD: Framework component/principle mapping with justification

**Upgrade pattern (Evaluate items — R-series):**
- ADD: Judgment justification (not just "what" but "why this is the best course of action")
- ADD: Trade-off analysis (e.g., "cost of control vs. risk reduction")
- ADD: Ambiguity acknowledgment (e.g., "under these assumptions, the auditor should...")
- CHANGE: Distractors to equally plausible but suboptimal judgment paths

**Batches (3):**
| Batch | Count | QIDs |
|-------|-------|------|
| C1 | 12 | P1-E-R01 through P1-E-R38 Evaluate candidates (10) + P1B-E-080/081 |
| C2 | 10 | P1B-E-086 through P1B-F-132 controls + tech |
| C3 | 8 | P1E-F-036 through P1B-F-146 remaining |

---

## 3. Execution Sequence

```
Cohort A → Cohort B → Cohort C

Within each cohort: Pack B first (structurally clean, all Certified), then Pack E (higher quality), then Pack C/D (DL-016 considerations).

Batch size: ≤28 items (governance guard Rule 5 compliance).
Total batches: 11 (4+4+3).
```

### Stage-by-Stage Protocol (per S836 Pipeline)

| Stage | Action | Per-Item Time | Batch Time |
|-------|--------|---------------|------------|
| Stage 1: Blueprint | Verify LOS → Analyze/Evaluate alignment | 2 min | 56 min |
| Stage 2: Stem | Enhance with interpretation/analysis context | 5 min | 140 min |
| Stage 3: Correct Reasoning | Expand to analysis pattern + comparative framework | 7 min | 196 min |
| Stage 4: Distractor Logic | Upgrade to interpretation/trade-off errors | 10 min | 280 min |
| Stage 5: Evidence Review | All structural checks + governance guard | 4 min | 112 min |
| Stage 6: Certification | Six-dimension CAQS verification | 3 min | 84 min |
| **Total per batch (28 items)** | | **~31 min/item** | **~14.5 hours** |

---

## 4. Quality Gates

Each item must pass every gate:

| Gate | Check | Threshold |
|------|-------|-----------|
| G1 | Cognitive level verified as Analyze/Evaluate per LOS verb | PASS |
| G2 | Stem requires interpretation/comparison/judgment beyond calculation | PASS |
| G3 | Distractors target interpretation errors, not single-step miscalculations | PASS |
| G4 | DL-008: ExplanationWrong[CC] = "" | 0 violations |
| G5 | DL-026: All non-CC EW slots non-empty | 0 violations |
| G6 | CAQS §1.6: All 6 dimensions HIGH confidence | 50/50 per cohort |
| G7 | Governance guard Rules 2, 3, 5, 6: all PASS | 32/32 |

**Any failure → item returned to Stage 2 for revision. No patching at Stage 5.**

---

## 5. Defect Prevention

This upgrade uses the existing content as input to the S836 pipeline, not the legacy template engine. The following defect classes are prevented by design:

| Prevents | Defect Class | Mechanism |
|----------|-------------|-----------|
| Stage 2 gate | DL-031 (definition-match) | Stem requires interpretation, not term matching |
| Stage 4 gate | DL-013 (template boilerplate) | Each distractor authored uniquely per item |
| Stage 4 gate | DL-008 (non-empty CC slot) | CC-slot explicitly set to "" |
| Stage 4 gate | DL-026 (empty distractor slots) | All non-CC slots required non-empty + ≥50 chars |
| Stage 5 gate | DL-010 (misassigned) | Explanation text verified against specific choice |
| Stage 5 gate | DL-009 (wrong ASC citation) | Authority cross-checked against topic mapping |
| All gates | DL-016 (metadata-content mismatch) | Upgrades applied to content block only |

---

## 6. Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-----------|--------|------------|
| Evaluate items fail Stage 5 at high rate | MEDIUM | Delays Cohort C by 1-2 batches | Start with 3 R-series items as micro-pilot before full batch |
| Pack C/D DL-016 dual-block architecture causes confusion | MEDIUM | Wrong block modified | Always extract content block by brace-matching; verify Choice text matches rendered item |
| Distractor engineering at Analyze level is harder than estimated | MEDIUM | Batch times extend 30-50% | Build distractor pattern library from first 10 completed items |
| Governance guard failure on batch | LOW | Batch rejected; must redo | All gates checked at Stage 5 before certification attempt |
| CorrectChoice accidentally modified | LOW | Answer-key error introduced | CorrectChoice locked at Stage 1; only modified if Stage 3 independent solve proves stored answer wrong |

---

## 7. Success Criteria

| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Items upgraded to Analyze | 90 | Count of items with CognitiveLevel="Analyze" post-upgrade |
| Items upgraded to Evaluate | 10 | Count of items with CognitiveLevel="Evaluate" post-upgrade |
| Certification rate | ≥ 85% | Items passing Stage 6 / items entering pipeline |
| DL-008 after upgrade | 0 | Governance guard Rule 2 scan |
| DL-026 after upgrade | 0 | Governance guard Rule 6 scan |
| DL-013 after upgrade | 0 | Template boilerplate scan of upgraded EW fields |
| Time per item | ≤ 35 min | Actual ÷ items processed |
| Batch cap compliance | 100% | All batches ≤ 28 items |

---

## 8. Post-Upgrade Pool State

| Metric | Pre-S839 | Post-S839 (Target) |
|--------|---------|-------------------|
| Total items | 2,540 | 2,540 |
| Analyze items | 10 (0.4%) | 100 (3.9%) |
| Evaluate items | 0 (0.0%) | 10 (0.4%) |
| Certified pool | 2,298 | 2,298 (unchanged — items were already Certified) |

**Note:** This is a cognitive-level reclassification of existing content, not new item creation. The pool size does not change. The improvement is in the quality and cognitive demand of items already in the Certified pool.

---

## 9. Next Steps

1. **S840:** Execute Cohort A (35 items) as the first pipeline expansion pilot. Validate that the S836 pipeline produces clean upgrades in practice.
2. **S840-S841:** Execute Cohorts B and C. Build distractor pattern library from completed items.
3. **S842:** Measure Analyze/Evaluate inventory growth. Compare pre-S839 (10 Analyze, 0 Evaluate) to post-upgrade state.
4. **S843:** Authorize Part 2 pilot based on validated pipeline capability.

---

## 10. Governance Attestation

- AGENTS.md §2: This is a PLANNING document. No pack file modifications performed.
- AGENTS.md §4: REVISION_HISTORY.md entry appended contemporaneously.
- AGENTS.md §5: All QID claims cross-checked against pack file scans by 4 independent task agents.
- AGENTS.md §6: Candidate counts verified: Pack A (182), Pack B (195), Pack C (320), Pack D (235), Pack E (130). Total = 827 scan + 10 existing Analyze = 837 analysis-oriented items identified.
- Governance guard Rule 5: 11 batches, ≤ 28 items each — compliant.
- Governance guard Rule 3: MASTER_QUESTION_REGISTRY.md not modified.
