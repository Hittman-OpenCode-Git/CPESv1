# Case Benchmark Remaining Work Queue

**Status:** PREPARED — NOT YET EXECUTED
**Date:** 2026-07-24

---

## Current State

| Category | Count |
|----------|-------|
| Total unique cases | 75 |
| AUDITED (preliminary sample) | 6 |
| BENCHMARK_NOT_YET_AUDITED | 69 |
| Audit completion rate | 8.0% |

## 6 Audited Cases (Preliminary Only)

| CaseID | File | SectionTags | Items | Scenario Words | Disposition |
|--------|------|-------------|-------|---------------|-------------|
| CBQ-A1 | scored_cases.js | A | 6 | ~50 | AUDITED_REWRITE_REQUIRED |
| CBQ-A2 | scored_cases.js | A | 6 | ~60 | AUDITED_REWRITE_REQUIRED |
| CBQ2-A2 | scored_cases2.js | A | 5 | ~50 | AUDITED_REWRITE_REQUIRED |
| CBQ2-B1 | scored_cases2.js | B | 5 | ~60 | AUDITED_REWRITE_REQUIRED |
| CBQ5-B2 | scored_cases5.js | A | 5 | ~60 | AUDITED_REWRITE_REQUIRED |
| CBQ5-A2 | scored_cases5.js | A | 6 | ~70 | AUDITED_APPROVED |

## 69 Unaided Cases — 9 Batches

| Batch | File | Cases | Count |
|-------|------|-------|-------|
| 1 | scored_cases.js | CBQ-B1, B2, B3, C1, C2, C3, D1, D2 | 8 |
| 2 | scored_cases.js + scored_cases2.js | CBQ-E1, E2, F1, F2, CBQ2-C1, C2, C3, D1 | 8 |
| 3 | scored_cases2.js | CBQ2-D2, D3, E1, E2, F1, F2, CBQ3-A1, A2 | 8 |
| 4 | scored_cases3.js | CBQ3-B1, B2, B3, C1, C2, C3, D1, D2 | 8 |
| 5 | scored_cases3.js + scored_cases4.js | CBQ3-D3, E1, E2, F1, F2, CBQ4-A1, A2, B1 | 8 |
| 6 | scored_cases4.js | CBQ4-B2, C1, C2, D1, D2, D3, E1, E2 | 8 |
| 7 | scored_cases4.js + scored_cases5.js | CBQ4-E3, F1, F2, F3, CBQ5-A2 (audited), B1 | 5 |
| 8 | scored_cases5.js | CBQ5-C1, C2, C3, D1, D2, D3, E1, E2 | 8 |
| 9 | scored_cases5.js | CBQ5-E3, F1, F2, F3, CBQ5-B2 (audited) | 5 |

## Per-Case Scorecard Template

```
CaseID | File | Pack | SectionTags | Title | ScenarioWords | ExhibitCount | ItemCount | question_state | ProductionStatus

TECHNICAL: [ ] CMA accuracy [ ] Domain attribution [ ] Numerical correctness [ ] Answer-key accuracy
SCENARIO: [ ] Named company [ ] Named stakeholder [ ] Business trigger [ ] Clear task [ ] ~250 words (2026 CBQ)
EXHIBITS: [ ] Internal consistency [ ] No decorative data [ ] All referenced [ ] Professional format
QUESTIONS: [ ] Independent answerability [ ] Applied reasoning [ ] Cognitive progression [ ] Correct keys
DISTRACTORS: [ ] Plausible [ ] Discriminating [ ] Specific misconceptions [ ] No trick wording
CBQ_FIT: [ ] Concise scenario [ ] Multiple linked tasks [ ] Applied demand [ ] Partial-credit feasible
UNIQUENESS: [ ] Distinct from other cases [ ] No recycled exhibits [ ] Unique learning objectives

DISPOSITION: __________________
EVIDENCE: __________________
CONFIDENCE: ____
```

---

*Prepared 2026-07-24 — awaiting execution authorization*
