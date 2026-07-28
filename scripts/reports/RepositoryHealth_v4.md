# Repository Health Report v4 — Sprint 5.6E

**Date:** 2026-07-21
**Phase:** Taxonomy Alignment & Quality Normalization

---

## 1. Repository Integrity

| Metric | Value |
|--------|-------|
| Errors | **0** |
| Warnings | **761** |
| Structural failures | **0** |
| Duplicate CaseIDs | **0** |
| Validators PASS | 1 |
| Validators WARN | 4 |
| Validators FAIL | 0 |

---

## 2. Metadata Completeness

| Field | Coverage | Status |
|-------|----------|--------|
| CaseID | 75/75 (100%) | PASS |
| Title | 75/75 (100%) | PASS |
| SectionTags | 75/75 (100%) | PASS |
| BlueprintDomain | 75/75 (100%) | PASS |
| BlueprintObjectives | 75/75 (100%) | PASS |
| PrimaryCompetency (case) | 75/75 (100%) | PASS |
| Difficulty | 75/75 (100%) | PASS |
| DifficultyScore | 72/75 (96%) | WARN (2 missing) |
| EstimatedMinutes | 75/75 (100%) | PASS |
| ScenarioText | 75/75 (100%) | PASS |
| Items | 75/75 (100%) | PASS |
| Exhibits | 75/75 (100%) | PASS |
| ItemID | 400/400 (100%) | PASS |
| Type | 400/400 (100%) | PASS |
| Prompt | 400/400 (100%) | PASS |
| Correct | 400/400 (100%) | PASS |
| Explanation | 400/400 (100%) | PASS |
| Topic | 400/400 (100%) | PASS |
| CognitiveLevel | 400/400 (100%) | PASS |
| CalculationComplexity | 400/400 (100%) | PASS |
| ReadingComplexity | 400/400 (100%) | PASS |
| DecisionComplexity | 400/400 (100%) | PASS |
| DifficultyDrivers | 400/400 (100%) | PASS |
| CalculationRequired | 400/400 (100%) | PASS |
| CommonTrapReference | 52/400 (13%) | BY DESIGN |
| FormulaReference | 88/400 (22%) | INFO |
| DecisionTreeReference | 117/400 (29%) | INFO |
| AccountingPrinciple | 161/400 (40%) | INFO |
| PrimaryCompetency (item) | 75/400 (19%) | INFO |

---

## 3. Taxonomy Consistency

| Enumeration | Validator Source | Status |
|-------------|-----------------|--------|
| CognitiveLevel | taxonomy.js | CONSISTENT |
| CalculationComplexity | taxonomy.js | CONSISTENT |
| ReadingComplexity | taxonomy.js | CONSISTENT |
| DecisionComplexity | taxonomy.js | CONSISTENT |
| DifficultyDrivers | taxonomy.js | CONSISTENT |
| Difficulty levels | taxonomy.js | CONSISTENT |
| SectionTags (A–F) | taxonomy.js | CONSISTENT |
| BlueprintDomain | taxonomy.js | CONSISTENT |
| Question types | taxonomy.js | CONSISTENT |
| ProductionStatus | taxonomy.js | CONSISTENT |
| Exhibit types | taxonomy.js | CONSISTENT |
| Competencies | taxonomy.js | CONSISTENT |

All enumerations now reference `scripts/validators/config/taxonomy.js` as the single source of truth. No duplicate hardcoded lists.

---

## 4. Enumeration Integrity (No Non-Canonical Values)

| Field | Non-Canonical Found |
|-------|---------------------|
| CognitiveLevel | 0 — all values in canonical set |
| CalculationComplexity | 0 — all values in canonical set |
| ReadingComplexity | 0 — all values in canonical set |
| DecisionComplexity | 0 — all values in canonical set |
| DifficultyDrivers | 0 — all values in canonical set |
| Difficulty | 0 — all values in canonical set |
| PrimaryCompetency | 0 — all values in canonical set |
| SectionTags | 0 — all valid A–F |
| Question types | 0 — all values in canonical set |
| ProductionStatus | 0 — all values in canonical set |
| Exhibit types | 0 — all values in canonical set |

Unused canonical values: Remember (cognitive), Long (reading), TimePressure (difficulty driver), Very Difficult (case difficulty — 0 cases).

---

## 5. Reference Integrity

| Reference Type | Populated | Valid | Broken |
|----------------|-----------|-------|--------|
| Exhibit references | 0 string refs | 0 | 0 |
| FormulaReference | 88 | 88 | 0 |
| DecisionTreeReference | 117 | 117 | 0 |
| AccountingPrinciple | 161 | 161 | 0 |
| CommonTrapReference | 52 | 52 | 0 |

No broken references. All FormulaReference values exist in FORMULA_MASTER.md. All DecisionTreeReference values exist in ACCOUNTING_DECISION_TREES.md. All CommonTrapReference values exist in 05_COMMON_EXAM_TRAPS.md.

---

## 6. Blueprint Alignment

| Metric | Value |
|--------|-------|
| Total cases | 75 |
| Cross-domain cases | 2 |
| Domains covered | 6/6 |
| Topics matching blueprint topics | 19/400 (5%) |
| Topics not in blueprint topic list | 381 (warnings — content expansion beyond blueprint) |

Domain distribution:
- External Financial Reporting Decisions: 11
- Planning, Budgeting, and Forecasting: 12
- Performance Management: 14
- Cost Management: 14
- Internal Controls: 13
- Technology and Analytics: 11

---

## 7. Warning Classification

| Category | Count | Source | Severity |
|----------|-------|--------|----------|
| Blueprint (topic mismatch) | 381 | BlueprintValidator | Low (content exceeds blueprint topics) |
| Explanation (too short) | 209 | MetadataValidator | Low (cosmetic) |
| Exhibits (unreferenced) | 99 | ReferenceValidator | Low (decorative data) |
| Timing (EstimatedMinutes mismatch) | 67 | DifficultyValidator | Medium (needs calibration) |
| Difficulty (missing score, distribution) | 5 | DifficultyValidator | Medium |
| **Total** | **761** | | |

**Change from v3:** Taxonomy warnings eliminated. No new warnings introduced by Sprint 5.6E.

---

## 8. Validator Alignment

| Validator | Consumes taxonomy.js | Hardcoded Lists |
|-----------|---------------------|-----------------|
| MetadataValidator | YES | None |
| BlueprintValidator | YES | None |
| DifficultyValidator | YES | None |
| ReferenceValidator | YES | Loads from source files with taxonomy.js fallback |

---

## 9. Files Modified (Sprint 5.6E)

| File | Change |
|------|--------|
| `knowledge/TAXONOMY_REGISTRY.md` | **NEW** — canonical taxonomy source of truth |
| `scripts/validators/config/taxonomy.js` | **NEW** — shared JS enumeration config |
| `scripts/config.js` | Updated cognitiveTargets, requiredKnowledgeFiles |
| `scripts/validators/MetadataValidator.js` | Refactored to consume taxonomy.js |
| `scripts/validators/DifficultyValidator.js` | Refactored to consume taxonomy.js |
| `scripts/validators/BlueprintValidator.js` | Refactored to consume taxonomy.js |
| `scripts/validators/ReferenceValidator.js` | Refactored; added FormulaReference, DecisionTreeReference, AccountingPrinciple validation |
| `knowledge/QUESTION_METADATA_STANDARD.md` | Fixed CognitiveLevel values to canonical set |

---

## 10. Technical Debt

| Item | Priority | Est. Effort | Notes |
|------|----------|-------------|-------|
| 381 blueprint topic mismatches | Low | Large | Topics are granular sub-concepts; blueprint covers major topics only |
| 209 short explanations | Low | Medium | Minimum 50 chars; many are just under threshold |
| 99 unreferenced exhibits | Low | Medium | Exhibits exist for scenario context but no item references them |
| 67 timing calibrations | Medium | Medium | EstimatedMinutes vs item sum mismatch |
| 2 missing DifficultyScore | Medium | Small | Cases CBQ2-A3, CBQ3-A1, CBQ4-A1, CBQ5-B2 missing scores |
| 0% Very Difficult cases | Low | Small | 0/75 cases marked Very Difficult |
| 0% Long reading complexity | Low | Small | 0/400 items marked Long |
| 81% items missing PrimaryCompetency | Low | Medium | Only 75/400 items populated |

---

## 11. Quality Gates (Sprint 5.6E)

| Gate | Target | Actual | Status |
|------|--------|--------|--------|
| 0 errors | 0 | 0 | PASS |
| 0 duplicate IDs | 0 | 0 | PASS |
| 0 broken references | 0 | 0 | PASS |
| 100% canonical enumerations | 100% | 100% | PASS |
| 100% valid taxonomy references | 100% | 100% | PASS |
| 100% validator alignment | 100% | 100% | PASS |
| No new warnings introduced | 0 | 0 | PASS |
| Backups created (.bak6) | 6 files | 6 files | PASS |

---

**Overall Status: PASS — Repository is healthy, taxonomies are normalized, validators are aligned.**
