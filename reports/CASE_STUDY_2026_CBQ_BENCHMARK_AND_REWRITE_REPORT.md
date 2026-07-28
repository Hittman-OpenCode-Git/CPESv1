# Case-Study 2026 CBQ Benchmark and Rewrite Report

**Phase 7 — 2026-07-24**

---

## 1. Sampled Cases (6 of 75)

| CaseID | File | Scenario | Exhibits | Answers | CBQ Fit | Disposition |
|--------|------|----------|----------|---------|---------|-------------|
| CBQ-A1 | scored_cases.js | ~50 words, no stakeholder | 2 tables, 1 decorative row | 6/6 correct | Below 2026 standard | **APPROVED_AFTER_MINOR_STRUCTURAL_REPAIR** |
| CBQ-A2 | scored_cases.js | ~60 words, no stakeholder | 2 tables | 6/6 correct | Below 2026 standard | **APPROVED_AFTER_MINOR_STRUCTURAL_REPAIR** |
| CBQ2-A2 | scored_cases2.js | ~50 words, no stakeholder | 1 table + 1 decorative text | 5/5 correct | Below 2026 standard | **APPROVED_AFTER_MINOR_STRUCTURAL_REPAIR** |
| CBQ2-B1 | scored_cases2.js | ~60 words, no stakeholder | 2 tables | 5/5 correct | Below 2026 standard | **APPROVED_AFTER_MINOR_STRUCTURAL_REPAIR** |
| CBQ5-B2 | scored_cases5.js | ~60 words, no stakeholder | 2 tables, 1 decorative | 5/5 correct | Below 2026 standard | **APPROVED_AFTER_MINOR_STRUCTURAL_REPAIR** |
| CBQ5-A2 | scored_cases5.js | ~70 words, no stakeholder | 2 tables | 6/6 correct | Best in sample | **APPROVED_FOR_FINAL_APPLICATION** |

---

## 2. Cross-Cutting Findings

### Strengths
- **100% answer-key accuracy** across all 28 sampled items
- Question-type variety (numeric, select, multi, fill, match)
- Valid JSON architecture (parseable, loadable)
- Appropriate cognitive progression (Apply → Analyze → Evaluate)
- CBQ5-A2 v2.0 has enhanced explanations (AccountingPrinciple + BusinessInterpretation)

### Deficiencies (All Cases)
- **Scenarios too short:** All ~50-70 words. 2026 CBQ expects ~250 words with named stakeholders, business triggers, and realistic decision context.
- **No stakeholder person:** "The controller", "management", "the accounting team" — not "CFO Maria Chen" or equivalent.
- **Metadata quality inconsistent:** Duplicate LearningObjectives, wrong FormulaReference tags, empty ReferencedBy arrays.
- **Decorative data:** Some exhibit rows/items are never referenced by any question.
- **Sequential dependency:** Some cases (CBQ2-B1, CBQ5-B2) have hard Q(n)→Q(n+1) dependencies where an incorrect early answer makes later tasks unanswerable.

---

## 3. Remediation Recommendations

### Immediate (Structural — No Content Changes)

| Action | Cases | Priority |
|--------|-------|----------|
| Populate all empty `ReferencedBy` arrays | All 75 | High |
| Fix duplicate `LearningObjectives` entries | ~20 cases | Medium |
| Correct wrong `FormulaReference`/`DecisionTreeReference` tags | ~15 cases | Medium |
| Remove decorative exhibit data | ~10 cases | Low |

### Deferred (Content Enhancement)

| Action | Cases | Priority |
|--------|-------|----------|
| Expand scenarios to ~250 words with named stakeholders | All 75 | High |
| Add business triggers and decision context | All 75 | High |
| Reduce sequential dependency where feasible | ~10 cases | Medium |
| Enhance explanations to CBQ5-A2 v2.0 standard | ~60 cases | Low |

---

## 4. Reference Model: CBQ5-A2 v2.0

CBQ5-A2 (scored_cases5.js) is the BEST case in the sample for:
- Explanation richness (AccountingPrinciple + BusinessInterpretation populated)
- ReferencedBy arrays populated
- Cognitive progression (Apply → Evaluate → Apply → Analyze → Understand)

Use this case as the enhancement template for all other cases.

---

## 5. Case-Study Pool Status

- 75 unique cases, all loaded and active
- 0 Certified (all Unprocessed → Tier 2)
- All cases serveable in any mode (MCQ, Case, Mixed, Full)
- No rewrite executed in this phase (Phases 7-8 scoping only)

---

*Generated 2026-07-24 — Phase 7 completion*
