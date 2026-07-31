# Metadata Backlog Report — Sprint 5.6A

**Date:** 2026-07-20
**Status:** Analysis Complete
**Repository:** CMA Part 1 Exam Simulator v2.0

---

## Executive Summary

The validation framework detected **1,062 warnings** across 75 cases (400 items) in 5 case banks. Zero errors — all issues are missing or incomplete metadata, not structural defects. The backlog is entirely attributable to **Phase 2 (Metadata Enrichment)** not having begun; every warning traces to fields defined in `QUESTION_METADATA_STANDARD.md` that have not yet been added to repository files.

**Repository Health Score: 42/100** — Functionally complete (0 errors, passes runtime) but metadata-incomplete.

| Metric | Value |
|--------|-------|
| Total Warnings | 1,062 |
| Errors | 0 |
| Validators Passed | 1/5 (Reference Validator only) |
| Cases Affected | 75/75 |
| Items Affected | 400/400 |
| Estimated Migration Sprints | 8–10 |

---

## Warning Breakdown

| Validator | Warnings | % of Total | Primary Issue |
|-----------|----------|------------|---------------|
| Difficulty Validator | 481 | 45.3% | Missing DifficultyScore (75) + Missing CognitiveLevel (400) + Time mismatches (6) |
| Blueprint Validator | 371 | 34.9% | Missing BlueprintDomain/Objectives/LearningObjectives (15) + Topic not in domain list (~355) + Domain underrep. (1) |
| Metadata Validator | 209 | 19.7% | Short explanations (< 50 chars) |
| Repository Validator | 1 | 0.1% | Project Constitution not found at expected path |
| Reference Validator | 0 | 0% | All references valid |
| **Total** | **1,062** | **100%** | |

### By Warning Type

| Warning Type | Count | % of Total | Root Cause |
|-------------|-------|------------|------------|
| Missing CognitiveLevel | 400 | 37.7% | Field not added to any item |
| Topic not in domain list | ~356 | 33.5% | Topic taxonomy not aligned with domain master list |
| Short explanations | 209 | 19.7% | Placeholder/truncated content in unpacked cases |
| Missing DifficultyScore | 75 | 7.1% | Field not added to any case |
| Missing BlueprintDomain/Objectives/LearningObjectives | 15 | 1.4% | First case in each pack not enriched |
| EstimatedMinutes mismatch | 6 | 0.6% | Item time sum doesn't align with case estimate |
| Project Constitution not found | 1 | 0.1% | Expected at knowledge/00_PROJECT_CONSTITUTION.md |
| Domain underrepresented | 1 | 0.1% | External Financial Reporting: 6 cases (needs 9–17) |

---

## Priority Matrix

### P0 — Repository Integrity (2 warnings, 0.2%)

| Warning | Count | Owner | Automation | Effort | Validation Rule |
|---------|-------|-------|------------|--------|-----------------|
| Project Constitution not found | 1 | Release Manager | 100% — rename or symlink | 5 min | RV01: requiredKnowledgeFiles[0] must exist |
| Domain underrepresented (External Financial Reporting) | 1 | Release Manager | 0% — requires new content | 3–5 sprints | BP09: each domain must have 9–17 cases |

### P1 — Required Metadata (490 warnings, 46.1%)

| Warning | Count | Owner | Automation | Manual Review | Effort | Validation Rule |
|---------|-------|-------|------------|---------------|--------|-----------------|
| Missing DifficultyScore | 75 | Validator → Psychometrician | 100% default to 3; adjust via review | Psychometric calibration | 1 sprint | DV01: DifficultyScore must exist 1–5 |
| Missing CognitiveLevel | 400 | Psychometrician | 80% — derive from item type per config.js `typeCognitiveDefault` | Review non-standard assignments | 2 sprints | DV05: CognitiveLevel must be one of 6 values |
| Missing BlueprintDomain | 5 | Psychometrician | 100% — derive from SectionTags via `sectionToDomain` | None | 0.5 sprint | BP01: BlueprintDomain must match exam blueprint |
| Missing BlueprintObjectives | 5 | Accountant + Psychometrician | 0% — requires domain knowledge | Full review | 1 sprint | BP02: BlueprintObjectives must be non-empty |
| Missing LearningObjectives | 5 | Accountant + Editor | 0% — requires educational content | Full review | 1 sprint | BP03: LearningObjectives must be non-empty |

### P2 — Blueprint Metadata (6 warnings, 0.6%)

| Warning | Count | Owner | Automation | Manual Review | Effort | Validation Rule |
|---------|-------|-------|------------|---------------|--------|-----------------|
| EstimatedMinutes mismatch | 6 | Validator | 100% — recalculate from items | None | 0.5 sprint | DV03: EstimatedMinutes ≈ sum(item times) / 0.7 |

### P3 — Educational Quality (209 warnings, 19.7%)

| Warning | Count | Owner | Automation | Manual Review | Effort |
|---------|-------|-------|------------|---------------|--------|
| Short explanations (< 50 chars) | 209 | Editor + Accountant | 0% — requires content authoring | Full editorial review | 4–5 sprints |

### P4 — Optional Metadata (~356 warnings, 33.5%)

| Warning | Count | Owner | Automation | Manual Review | Effort |
|---------|-------|-------|------------|---------------|--------|
| Topic not in domain list | ~356 | Psychometrician + Editor | 0% — requires taxonomy alignment | Full topic audit | 3–4 sprints |

---

## Automation Opportunities

### Fields Suitable for 100% Automatic Population

| Field | Derivation Rule | Validator |
|-------|----------------|-----------|
| `ItemID` | `{CaseID}-Q{index+1}` | MetadataValidator |
| `ExhibitID` | `{CaseID}-E{index+1}` | MetadataValidator |
| `QuestionCount` | `Items.length` | MetadataValidator |
| `ExhibitCount` | `Exhibits.length` | MetadataValidator |
| `DifficultyScore` | Default to 3, map label via `difficultyScoreMap` | DifficultyValidator |
| `Difficulty` (case) | Label from `DifficultyScore` via `difficultyScoreMap` | DifficultyValidator |
| `Difficulty` (item) | Label from item `DifficultyScore` | DifficultyValidator |
| `BlueprintDomain` | `SectionTags[0]` → `sectionToDomain` | BlueprintValidator |
| `ProductionStatus` | `"Draft"` for placeholder cases, `"Production"` for Gold Standard | MetadataValidator |
| `Version` | `"1.0"` | MetadataValidator |
| `CognitiveLevel` (default) | Item type → `typeCognitiveDefault` map (80% coverage) | DifficultyValidator |
| `EstimatedMinutes` | Recalculate from item-level estimates | DifficultyValidator |
| `Confidence` | `90` default, `100` for reviewed cases | MetadataValidator |

### Fields Requiring Human Review

| Field | Reason | Reviewer |
|-------|--------|----------|
| `DifficultyScore` (overrides) | Psychometric calibration needed for exam realism | Psychometrician |
| `CognitiveLevel` (overrides) | Non-standard assignments require justification | Psychometrician |
| `BlueprintObjectives` | Must cite specific learning outcomes from blueprint | Accountant |
| `LearningObjectives` | Must describe educational intent in student-facing terms | Accountant + Editor |
| `FormulaReference` | Must reference specific entry in FORMULA_MASTER.md | Accountant |
| `CommonTrapReference` | Must reference specific trap from COMMON_EXAM_TRAPS.md | Psychometrician |
| `Explanation` content | Short explanations need full content authoring | Editor + Accountant |
| `Topic` values | Must align with controlled topic taxonomy | Psychometrician + Editor |

---

## Manual Review Requirements

### Requires Accounting Judgment

| Field | Cases/Items | Rationale |
|-------|------------|-----------|
| `BlueprintObjectives` | 75 cases | Must select appropriate learning outcomes from blueprint |
| `LearningObjectives` | 75 cases | Must describe what the student should learn |
| `FormulaReference` | ~400 items | Must identify the correct formula for each calculation |
| `Explanation` expansion | 209 items | Must include accounting principle, formula with substitution, and business interpretation |

### Requires Psychometric Review

| Field | Cases/Items | Rationale |
|-------|------------|-----------|
| `DifficultyScore` (non-default) | 75 cases (estimated ~30 will need adjustment) | Must align with blueprint difficulty distribution targets |
| `CognitiveLevel` (non-default) | ~80 items (20% of 400) | Non-standard assignments need justification |
| `CommonTrapReference` | ~400 items | Must identify plausible distractors and common errors |
| `Topic` taxonomy alignment | ~356 items | Must map existing topic values to controlled vocabulary |

### Requires Editorial Review

| Field | Cases/Items | Rationale |
|-------|------------|-----------|
| `Explanation` expansion | 209 items | Must meet 50-char minimum; add principle, formula, interpretation |
| `LearningObjectives` | 75 cases | Must be clear, specific, educationally meaningful |
| `Topic` standardization | ~356 items | Must use consistent naming across cases |

---

## Migration Order

The migration is organized as **8 phases** (sprints):

| Sprint | Phase | Priority | Description | Warnings Resolved | Cumulative |
|--------|-------|----------|-------------|-------------------|------------|
| 1 | P0 Fix | P0 | Rename PROJECT_CONSTITUTION.md to expected path | 1 | 1 |
| 1 | Auto-gen IDs | P1 | Auto-generate ItemID, ExhibitID, QuestionCount, ExhibitCount | — | 1 |
| 2 | Required Case Fields (Part 1) | P1 | Add DifficultyScore, BlueprintDomain, ProductionStatus, Version, Confidence to all 75 cases | 75 + 5 + 5 | 86 |
| 3 | Required Case Fields (Part 2) | P1 | Add Industry, CompanyType, CompanyName, Stakeholder, BusinessFunction, Author, CreatedDate, ModifiedDate | — | 86 |
| 4 | CognitiveLevel (Batch 1) | P1 | Derive CognitiveLevel from item type for all 400 items | 400 | 486 |
| 5 | BlueprintObjectives + LearningObjectives | P1 | Accountant review of 5 cases needing these fields + full rollout to all 75 cases | 10 | 496 |
| 6 | EstimatedMinutes correction | P2 | Recalculate all case-level estimated minutes | 6 | 502 |
| 7 | Explanation Expansion (Batch 1) | P3 | Expand 209 short explanations — Pack 1 priority (Gold Standard) | 17 | 519 |
| 8 | Explanation Expansion (Batch 2) | P3 | Continue explanation expansion — Packs 2–5 | 192 | 711 |
| 9+ | Topic Taxonomy Alignment | P4 | Standardize ~356 topic values to controlled vocabulary | ~356 | ~1062 |

**Total Estimated Sprints: 8–10**

### Sprint Allocation Rationale

- **Sprint 1** is structural and can be executed immediately (no content decisions).
- **Sprints 2–4** focus on auto-derivable fields to maximize warning reduction per unit effort.
- **Sprint 5** is the first sprint requiring accounting + psychometric judgment — it gates downstream work.
- **Sprint 6** is a quick pass that can be parallelized.
- **Sprints 7–8** are the highest-effort phase (content authoring) and should be staffed with editorial resources.
- **Sprint 9+** is open-ended taxonomy work; can be deferred post-migration.

---

## Repository Health Score

| Dimension | Weight | Score | Rationale |
|-----------|--------|-------|-----------|
| Structural Integrity | 25% | 100/100 | 0 errors, all files present, all references valid |
| Metadata Completeness | 30% | 15/100 | 0 of 27 new standard fields populated |
| Content Quality | 20% | 50/100 | 209/400 explanations too short; content exists but incomplete |
| Blueprint Alignment | 15% | 40/100 | Domains partially tracked; topic vocabulary not standardized |
| Automation Readiness | 10% | 80/100 | Config.js has derivation maps; validators return actionable warnings |

**Weighted Score: 42/100**

### Score Trajectory

| Milestone | Projected Score |
|-----------|----------------|
| Current (Sprint 5.6A) | 42 |
| After Sprint 1 (P0 Fix + IDs) | 45 |
| After Sprint 4 (Required Fields + CognitiveLevel) | 68 |
| After Sprint 6 (Blueprint Objectives + Time) | 75 |
| After Sprint 8 (Explanations Complete) | 87 |
| After Topic Taxonomy (Sprint 9+) | 95+ |

---

## Migration Effort Summary

| Effort Type | Estimated Hours | Responsible |
|-------------|----------------|-------------|
| Automated metadata population (scripting) | 8–12 | JavaScript Architect |
| DifficultyScore calibration | 8–16 | Psychometrician |
| CognitiveLevel review (non-default items) | 4–8 | Psychometrician |
| BlueprintObjectives / LearningObjectives | 16–24 | Accountant |
| Explanation expansion (209 items) | 80–120 | Editor + Accountant |
| Topic taxonomy alignment (~356 items) | 24–40 | Psychometrician + Editor |
| Validation and QA | 8–12 | Validator |
| **Total Estimated Effort** | **148–232 hours** | |

---

## Appendices

### A. Warning Type Definitions

| Short Name | Full Description |
|------------|------------------|
| Missing DifficultyScore | Case-level `DifficultyScore` field (integer 1–5) not present |
| Missing CognitiveLevel | Item-level `CognitiveLevel` field not present |
| Short Explanation | Item `Explanation` field < 50 characters |
| Topic not in domain list | Item `Topic` value not found in domain's allowed topic list |
| Missing BlueprintDomain | Case-level `BlueprintDomain` field not present |
| Missing BlueprintObjectives | Case-level `BlueprintObjectives` array empty or missing |
| Missing LearningObjectives | Case-level `LearningObjectives` array empty or missing |
| EstimatedMinutes mismatch | Case `EstimatedMinutes` ≠ sum(item times) / 0.7 within tolerance |
| Project Constitution not found | File `00_PROJECT_CONSTITUTION.md` not found in knowledge/ |
| Domain underrepresented | Number of cases for a domain below target minimum (9) |

### B. Fields Not Yet Validated

The following fields defined in `QUESTION_METADATA_STANDARD.md` are not yet checked by any validator. These would produce additional warnings if checked:

- `PrimaryCompetency` — not validated
- `CalculationRequired` — not validated
- `ExplanationVersion` — not validated
- `Subtopic` — not validated (optional)
- `Tags` — not validated (optional)
- `Reviewer` / `QAReviewer` — not validated (optional)
- `RevisionHistory` — not validated (optional)
- `Dependencies` — not validated (optional)
- `FormulaReference` — not validated (optional)
- `CommonTrapReference` — not validated (optional)
- `DecisionTreeReference` — not validated (optional)

Adding validation for these fields is deferred to Phase 3.

### C. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Auto-derived CognitiveLevel incorrect for non-standard item types | Medium | Medium | Build override mechanism; require psychometrician sign-off on deviations |
| Topic taxonomy alignment reveals duplicate/similar topics | High | Low | Merge similar topics; update validators |
| Explanation expansion changes answer correctness | Low | High | Always run validation after explanation edits; require accounting review |
| Pack 1 cases (Gold Standard) already have explanations but may still fail 50-char minimum | Medium | Low | Trivial to expand; Pack 1 has only 17 short explanation warnings |
| Migration script overwrites existing field values | Medium | High | All enrichment scripts must read-before-write; never overwrite non-null values |

---

*Report generated by Sprint 5.6A — Validation Baseline and Metadata Backlog Analysis*
*No repository files were modified during this analysis.*
