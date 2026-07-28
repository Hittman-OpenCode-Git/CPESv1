# S837 Resource Model — 740-Item Expansion Program

**Session:** S837
**Date:** 2026-07-27
**Status:** Planning estimate — not yet executed

---

## 1. Resource Summary

| Resource | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | **Total** |
|----------|----------|----------|----------|----------|-----------|
| **Items** | 50 | 160 | 230 | 300 | **740** |
| **Weeks** | 2 | 3 | 3 | 4 | **12** |
| **Batches** | 2 | 6 | 9 | 11 | **28** |
| **Est. Hours** | 14 | 56 | 112 | 140 | **322** |
| **Items/hr** | 3.6 | 2.9 | 2.1 | 2.1 | **2.3 avg** |

## 2. Time Model

### 2.1 Per-Item Time Estimates

| Item Type | Min/Item | Mean/Item | Max/Item | Notes |
|-----------|----------|-----------|----------|-------|
| Apply MCQ | 10 | 15 | 20 | Well-understood format; calculation items faster |
| Analyze MCQ | 15 | 25 | 35 | Distractor engineering is primary cost |
| Evaluate MCQ | 25 | 35 | 50 | Trade-off distractors require novel design |
| Case Item | 30 | 45 | 60 | Exhibit creation adds complexity |
| Very Difficult MCQ | 25 | 35 | 50 | Extended scenarios, multi-step reasoning |

### 2.2 Pipeline Stage Time Allocation

| Stage | % of Time | Activity |
|-------|-----------|----------|
| Stage 1: Blueprint | 5% | Select LOS, determine cognitive level, identify formula/topic |
| Stage 2: Stem | 15% | Write business scenario, ensure self-contained data |
| Stage 3: Correct Reasoning | 20% | Independent solve, verify arithmetic, cite authority |
| Stage 4: Distractor Logic | 35% | **Dominant cost** — 3 choice-specific explanations per item |
| Stage 5: Evidence Review | 15% | Run all structural/content checks, governance guard |
| Stage 6: Certification | 10% | Six-dimension AI verification, REVISION_HISTORY entry |

## 3. Bottleneck Analysis

| Bottleneck | Severity | Mitigation |
|------------|----------|------------|
| Distractor engineering (Stage 4) | HIGH — 35% of time | Build distractor pattern library; pre-design misconception maps per topic |
| Evaluate item design (Stage 2) | MEDIUM — novel format | Start with small batches; build template patterns from early successes |
| Independent verification (Stage 5) | LOW — automated | Governance guard + CAQS checklist are automated gates |
| Cognitive fatigue (long sessions) | MEDIUM | Enforce batch caps (≤30); require independent verification between batches |
| Part 2 domain expertise (Sprint 4) | MEDIUM | Pre-study Part 2 blueprint before Sprint 4 launch |

## 4. Yield Model

| Stage | Rejection Rate | Net Throughput | Notes |
|-------|---------------|----------------|-------|
| Stage 4 → 5 handoff | 10% | 90% of authored items | Distractor quality or explanation issues |
| Stage 5 evidence review | 5% | 85% of authored items | Structural or governance issues |
| Stage 6 certification | 2% | 83% of authored items | Six-dimension confidence failures |
| **Net yield** | **~17% total loss** | **~83% to Certified** | Rejected items recycled in next batch |

## 5. Cumulative Resource Burn

```
Sprint 1:   14 hours  (Foundation)
Sprint 2:   70 hours  (70 total)
Sprint 3:  182 hours  (182 total)
Sprint 4:  322 hours  (322 total)
====================================
Program:    322 hours over 12 weeks
```

## 6. Risk-Adjusted Estimate

| Scenario | Adjustment | Total Hours | Items Certified |
|----------|-----------|-------------|-----------------|
| **Optimistic** | -20% (pipeline faster than expected) | 258 | 665 |
| **Baseline** | — (mean estimates) | 322 | 614 |
| **Pessimistic** | +40% (Evaluate items slower, more rejections) | 451 | 540 |
| **Worst Case** | +80% (pipeline breaks, redesign needed) | 580 | 370 |

**Recommendation:** Budget 400 hours. If Sprint 1 pilot validates the pipeline at >3 items/hr, adjust downward for Sprints 2-4.
