# Case Study Standards — CMA 2026

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, CAQS_v1.0.md
**Generated:** 2026-07-24

---

## 1. Purpose

This document defines the standards that all case studies in the CMA Part 1 Exam Simulator must meet. It ensures that every integrated case scenario mirrors the structure, difficulty, and realism expected in the CMA 2026 examination.

Per Session 55, all 75 cases (5 packs × 15 cases) are currently `ProductionStatus: "Unprocessed"` — zero are Certified for the learner pool. This document serves as the target standard for case-study certification.

---

## 2. CMA 2026 Alignment

### 2.1 Blueprint Mapping

Every case study must be fully traceable to the IMA CMA Part 1 Content Specification Outline (effective September 1, 2024). Each case must carry:

| Field | Requirement |
|-------|-------------|
| `BlueprintDomain` | Matches a domain in EXAM_BLUEPRINT.md |
| `BlueprintObjectives` | Lists specific LOS codes tested |
| `SectionTags` | Domain letter(s): A–F |

Cross-domain cases (E+F only) are permitted per TAXONOMY_REGISTRY.md §18.

### 2.2 Cognitive Demand

CMA 2026 cases are "appropriately challenging" — they test integrated reasoning, not isolated recall. The standard:

| Item Position | Expected Type | Cognitive Level |
|---------------|---------------|-----------------|
| Items 1–2 | numeric | Apply (calculation) |
| Items 3–4 | select | Analyze (interpretation) |
| Item 5 | multi / select | Evaluate (judgment) |
| Item 6 | fill / match | Evaluate (synthesis) |

### 2.3 Difficulty Calibration

Per DIFFICULTY_VOCABULARY_AND_DISTRIBUTION.md:

- Case-level `DifficultyScore` must be within ±1 of the mean of its item scores.
- Case studies should span the full difficulty range — predominantly Moderate (3) and Difficult (4), with some Moderate-Easy (2) and Very Difficult (5) capstone cases.
- The 75-case pool should target: ~10 Easy/Moderate-Easy, ~30 Moderate, ~25 Difficult, ~10 Very Difficult.

---

## 3. Scenario Quality Standards

### 3.1 Required Scenario Elements

Every case must have:

1. **Named company** — Fictional but realistic (e.g., "Harbor Medical Supplies")
2. **Named stakeholder** — Specific decision-maker with role (e.g., "CFO Maria Chen")
3. **Business trigger** — Event or reporting requirement creating the need for analysis
4. **Clear task** — What the candidate must accomplish
5. **Realistic context** — A scenario a management accountant would plausibly encounter

### 3.2 Scenario Language

Use executive/business language, not textbook language:

| Avoid | Use Instead |
|-------|-------------|
| "The company manufactures products" | "Harbor operates three production lines in its Denver facility" |
| "Calculate the variance" | "The CFO needs to explain the $42,000 unfavorable variance to the board" |
| "Which of the following is correct?" | "Which recommendation should the controller present to the audit committee?" |

### 3.3 Anti-AI Writing Standards

Content must read like genuine business documentation — not AI-generated textbook filler. Acceptable formats include: controller memos, production reports, budget packages, audit workpapers, board presentations, operations dashboards, purchasing analyses, treasury reports, email communications, and meeting notes.

---

## 4. Multi-Part Task Standards

### 4.1 Question Interconnection

Items within a case must:
- Follow a logical sequence: calculation → analysis → interpretation → decision
- Build on prior items where appropriate (later items may reference earlier results)
- Be answerable independently in cases where a candidate misses an earlier item
- Progress from lower cognitive levels to higher cognitive levels

### 4.2 Scoring

Per `docs/ALGORITHMS_SCORING_AND_ANALYTICS.md`:
- Case items are scored individually by `scoreMCQ()` — binary or partial credit.
- The case-study component contributes 25% to the composite score.
- Each case contributes equally within the 25% component.

### 4.3 Item Count

Per QUESTION_METADATA_STANDARD.md: minimum 5, maximum 7 items per case. Current cases target 5–6 items.

---

## 5. Exhibit Standards

### 5.1 Required Quality

Every exhibit must satisfy:
1. **Purpose clarity** — Each exhibit has a defined purpose and is referenced by at least one item
2. **Professional format** — Exhibits resemble actual business documents
3. **No decorative data** — Every row/column in table exhibits consumed by at least one item
4. **Data consistency** — Numbers internally consistent (subtotals add to totals)
5. **Independent readability** — Each exhibit understandable without reference to others

### 5.2 Structural Requirements (Gold Schema)

| Field | Requirement |
|-------|-------------|
| `ExhibitID` | Pattern: `{CaseID}-E{N}` |
| `Type` | Must be one of the 9 types in TAXONOMY_REGISTRY.md §13 |
| `Headers` | Required for `table` type. Must be an array. (DL-023: Body-instead-of-Headers is a defect) |
| `Rows` | Required for `table` type. Must be an array of arrays. |
| `Purpose` | Must describe what data this exhibit contributes |
| `ReferencedBy` | Must list ItemIDs that consume this exhibit's data |

### 5.3 Known Defects (from Session 55)

| Defect | Scope | Status |
|--------|-------|--------|
| DL-023 — Headers/Rows stored in Body | 17 exhibits across scored_cases3/4/5 | **Resolved (2026-07-23)** |
| Contaminated Exhibit CaseIDs (set to ExhibitID) | 5 exhibits in scored_cases3/4/5 | Open |
| CBQ-F2 Section/CaseID mismatch | scored_cases.js | Open |

---

## 6. Realism Standards

Every case must pass the realism checklist from CAQS v1.0 §3.7:

- [ ] Could this happen in a real business?
- [ ] Would a controller recognize this scenario?
- [ ] Would a CFO use this report?
- [ ] Are the numbers commercially reasonable?
- [ ] Are industry practices authentic?
- [ ] Would an executive communicate this way?

---

## 7. Certification Pathway

### 7.1 Current State

| Metric | Value |
|--------|-------|
| Total cases | 75 |
| Certified cases | 0 |
| Cases with `ProductionStatus` | All "Draft" (implied) |
| Cases with `question_state` | None (MCQ-only field) |

### 7.2 Certification Requirements

For case-study certification, each case and all its items must:
1. Pass CAQS six-dimension verification at HIGH confidence
2. Meet the Gold Schema requirements (§3 of ITEM_BANK_GOLD_SCHEMA.md)
3. Have all exhibits conform to structural and quality standards
4. Be independently reviewed by at least one qualified reviewer
5. Have certification documented in REVISION_HISTORY.md

### 7.3 Priority

Case-study certification is **TIER 4 priority** per Session 55 — deferred until:
- TIER 0: Learner-safety (DL-008 on Certified MCQs)
- TIER 1: question_state coverage (1,101 unlabeled MCQs)
- TIER 2: Difficulty rebalancing
- TIER 3: Schema normalization

---

## 8. References

- Quality standard: `knowledge/CAQS_v1.0.md` §3
- Metadata standard: `knowledge/QUESTION_METADATA_STANDARD.md` Parts 1–3
- Gold schema: `docs/ITEM_BANK_GOLD_SCHEMA.md` §3
- Difficulty vocabulary: `docs/DIFFICULTY_VOCABULARY_AND_DISTRIBUTION.md`
- Scoring algorithms: `docs/ALGORITHMS_SCORING_AND_ANALYTICS.md`
- Session 55 report: `reports/SESSION55_STANDARDIZATION_AND_DIFFICULTY_AUDIT.md`
- CMA 2026 blueprint: `foundation/EXAM_BLUEPRINT.md`
