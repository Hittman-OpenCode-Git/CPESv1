# Item Bank Gold Schema

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Dependencies:** QUESTION_METADATA_STANDARD.md, CAQS_v1.0.md, TAXONOMY_REGISTRY.md
**Generated:** 2026-07-24

---

## 1. Purpose

This document defines the canonical "gold" schema for every MCQ and case-study item in the CMA Part 1 Exam Simulator. It is the target schema toward which all existing content must converge during certification and remediation passes. It derives from `knowledge/QUESTION_METADATA_STANDARD.md` and `knowledge/TAXONOMY_REGISTRY.md`.

All validators, certification agents, and remediation scripts must reference this document as the single authoritative schema definition.

---

## 2. MCQ Gold Schema

### 2.1 Required Fields

| Field | Type | Description | Source |
|-------|------|-------------|--------|
| `QuestionID` | String | Unique identifier, e.g. `"P1-A-001"` or `"P1E-B-042"` | §2.1 |
| `Part` | Integer | Partition number (1) | Schema |
| `Section` | String | Domain letter: A, B, C, D, E, F | §2.1 |
| `Topic` | String | Specific concept tag (controlled vocabulary) | §2.1 |
| `Stem` | String | Question text — unique, unambiguous, business-contextual | §2.1 |
| `Choices` | Object `{A, B, C, D}` | Four answer choices | §2.1 |
| `CorrectChoice` | String | Single letter: A, B, C, or D | §2.1 |
| `ExplanationCorrect` | String | Full educational explanation — must include accounting principle, solution steps, business interpretation | §4.1 |
| `ExplanationWrongA` | String | Why Choice A is wrong. Must be choice-specific. Empty (`""`) if A = CorrectChoice. | §4.1 |
| `ExplanationWrongB` | String | Why Choice B is wrong. Empty if B = CorrectChoice. | §4.1 |
| `ExplanationWrongC` | String | Why Choice C is wrong. Empty if C = CorrectChoice. | §4.1 |
| `ExplanationWrongD` | String | Why Choice D is wrong. Empty if D = CorrectChoice. | §4.1 |
| `question_state` | String | Governance state. One of: `"Unprocessed"`, `"In Audit"`, `"Editorial Queue"`, `"Certified"`, `"Archived"` | §9.1 |
| `UniqueConceptKey` | String | Unique per concept tested — distinguishes genuinely distinct items from template clones | Schema |

### 2.2 Optional but Recommended Fields

| Field | Type | Description |
|-------|------|-------------|
| `Difficulty` | String | Per-item difficulty: `"Easy"`, `"Moderate-Easy"`, `"Moderate"`, `"Difficult"`, `"Very Difficult"` |
| `DifficultyScore` | Integer | Numeric 1–5 mapping: 1=Easy, 2=Moderate-Easy, 3=Moderate, 4=Difficult, 5=Very Difficult |
| `CognitiveLevel` | String | Bloom's level: `"Remember"`, `"Understand"`, `"Apply"`, `"Analyze"`, `"Evaluate"` |
| `CalculationRequired` | Boolean | `true` if arithmetic computation is required |
| `FormulaReference` | String | Link to FORMULA_MASTER.md formula name |
| `CommonTrapReference` | String | Link to COMMON_EXAM_TRAPS.md trap ID |
| `DecisionTreeReference` | String | Link to ACCOUNTING_DECISION_TREES.md section |
| `AccountingPrinciple` | String | Governing standard: ASC xxx, COSO Principle N, IAS xx, etc. |
| `PrimaryCompetency` | String | `"Calculation"`, `"Conceptual"`, `"Analysis"`, `"Judgment"` |
| `SecondaryCompetency` | String | Same values as PrimaryCompetency |
| `pedagogical_cluster` | String | Cluster identifier for axis-varying or thematic sets |
| `StudyLinks` | Array[String] | Links to related study materials |
| `SourceDescription` | String | Provenance description |
| `VerifiedChecks` | Object | Verification metadata |
| `MicroTopic` | String | Sub-topic within Topic |
| `ReviewNote` | String | Internal review annotation |
| `ItemStyle` | String | Question presentation style |
| `ExplanationVersion` | Integer | Revision counter for ExplanationCorrect |

### 2.3 Lifecycle States

```
Unprocessed ──→ In Audit ──→ Certified ──→ (Learner Pool)
     │              │
     │              └──→ Editorial Queue ──→ In Audit
     │
     └──→ Archived (preserves content, excludes from pool)
```

| State | Meaning | Learner-Pool Eligible? |
|-------|---------|----------------------|
| `Unprocessed` | Not yet audited | No |
| `In Audit` | Currently under review | No |
| `Editorial Queue` | Requires structural/content revision | No |
| `Certified` | Passed HIGH-confidence verification across all 6 CAQS dimensions | **Yes** |
| `Archived` | Removed from active pool (content preserved) | No |

### 2.4 Structural Invariants (Gold-Standard Rules)

1. **DL-008 clean:** `ExplanationWrong[CorrectChoice]` must be `""`. (governance-guard Rule 2 BLOCK)
2. **DL-013 clean:** No distractor ExplanationWrong field may contain template boilerplate ("represents a plausible misconception", "A candidate may select this option by misapplying").
3. **DL-025/DL-026 clean:** All non-CorrectChoice ExplanationWrong fields must be non-empty and choice-specific (≥50 characters, addresses specific error in that choice).
4. **Choice-specific distractor explanations:** Each distractor explanation must identify the specific error, the misconception, and contrast with correct approach.
5. **ExplanationCorrect must include:** accounting principle by name, formula with substitution (if calculation), business interpretation.
6. **No missing fields:** All 4 ExplanationWrong fields must exist (even if empty at CorrectChoice position). DL-018 and DL-021 are gold-schema violations.

---

## 3. Case-Study Gold Schema

### 3.1 Case-Level Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `CaseID` | String | Pattern: `CBQ{N}-{Section}{Sequence}`, e.g. `"CBQ2-B2"` |
| `Title` | String | Descriptive title, 2–8 words |
| `SectionTags` | Array[String] | Domain codes: A, B, C, D, E, F |
| `BlueprintDomain` | String | Full domain name from EXAM_BLUEPRINT.md |
| `BlueprintObjectives` | Array[String] | Specific learning objectives tested |
| `PrimaryCompetency` | String | `"Calculation"`, `"Conceptual"`, `"Analysis"`, `"Judgment"` |
| `EstimatedMinutes` | Integer | Expected solve time (20–40) |
| `Difficulty` | String | `"Easy"`, `"Moderate-Easy"`, `"Moderate"`, `"Difficult"`, `"Very Difficult"` |
| `DifficultyScore` | Integer | Numeric 1–5 |
| `ScenarioText` | String | 2–4 sentence business scenario with named company, stakeholder, trigger, task |
| `Exhibits` | Array[Object] | Minimum 2 exhibits (see §3.3) |
| `Items` | Array[Object] | 5–7 items (see §3.2) |
| `QuestionCount` | Integer | Must equal `Items.length` |
| `ExhibitCount` | Integer | Must equal `Exhibits.length` |
| `ProductionStatus` | String | `"Draft"`, `"Review"`, `"QA"`, `"Production"`, `"Retired"` |
| `Version` | String | Semantic version |
| `Confidence` | Integer | 0–100 |
| `LearningObjectives` | Array[String] | Educational objectives |
| `Industry` | String | e.g. `"Medical devices"`, `"Food processing"` |
| `CompanyType` | String | e.g. `"Manufacturer"`, `"Distributor"` |
| `CompanyName` | String | Fictional company name |
| `Stakeholder` | String | Primary decision-maker, e.g. `"CFO Maria Chen"` |
| `BusinessFunction` | String | e.g. `"Treasury"`, `"Financial reporting"` |

### 3.2 Item-Level Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `ItemID` | String | Pattern: `{CaseID}-Q{N}` |
| `Type` | String | `"numeric"`, `"select"`, `"multi"`, `"fill"`, `"match"` |
| `Prompt` | String | Question text |
| `Correct` | Varies | Correct answer |
| `Explanation` | String | Educational explanation |
| `Topic` | String | Specific concept tag |
| `Difficulty` | String | Per-item difficulty |
| `DifficultyScore` | Integer | Per-item 1–5 |
| `CognitiveLevel` | String | `"Remember"`, `"Understand"`, `"Apply"`, `"Analyze"`, `"Evaluate"` |
| `CalculationRequired` | Boolean | |

### 3.3 Exhibit-Level Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `ExhibitID` | String | Pattern: `{CaseID}-E{N}` |
| `CaseID` | String | Parent case identifier |
| `Type` | String | `"table"`, `"text"`, `"chart"`, `"dashboard"`, `"financial-statement"`, `"contract"`, `"policy"`, `"email"`, `"erp-report"` |
| `Title` | String | Exhibit heading |
| `Purpose` | String | What data this exhibit contributes |
| `ReferencedBy` | Array[String] | ItemIDs that reference this exhibit |
| `Headers` | Array[String] | Column headers (conditional — required for `table` type) |
| `Rows` | Array[Array] | Data rows (conditional — required for `table` type) |

---

## 4. Difficulty Vocabulary (Single Canonical)

All content must converge on the 5-tier vocabulary defined in TAXONOMY_REGISTRY.md:

| Label | Score | Description |
|-------|-------|-------------|
| `Easy` | 1 | Direct recall or single-step application |
| `Moderate-Easy` | 2 | Two-step application with familiar context |
| `Moderate` | 3 | Multi-step with judgment required |
| `Difficult` | 4 | Extended analysis across multiple concepts |
| `Very Difficult` | 5 | Integrated evaluation with novel context |

**Current state (Session 55):** Only 3 of 5 labels are in use. `Moderate-Easy` and `Very Difficult` are absent from all packs. Remediation must rebalance toward the full 5-tier scale.

**Mapping from legacy labels:**

| Legacy Label | Canonical Label | Score |
|-------------|-----------------|-------|
| `Easy` | `Easy` | 1 |
| `Moderate` | `Moderate` | 3 |
| `Difficult` | `Difficult` | 4 |
| (unused) | `Moderate-Easy` | 2 |
| (unused) | `Very Difficult` | 5 |

---

## 5. Mapping Rules — Legacy to Gold Schema

### Pack A/C/D Format (paired-object architecture)

Packs A, C, and D use a paired-object structure per QuestionID: a **metadata block** (QuestionID, question_state, ChoiceA-D, ExplanationWrongA-D) and a **content block** (Part, Section, Topic, Stem, Choices, CorrectChoice, ExplanationCorrect). The gold schema treats the content block as authoritative. Metadata-block fields must be synchronized with their content-block counterparts during certification (see DL-016).

### Pack B Format (single-object architecture with CC-before-QID)

Pack B uses a single-object structure per QuestionID with `CorrectChoice` appearing before `QuestionID` in the JSON object. Scan tools must be CC-position-aware — forward-scanning from QuestionID to find CorrectChoice will retrieve the next item's CorrectChoice, producing a ~75% false-positive rate (see DL-029).

### Pack E Format (independent pipeline)

Pack E uses a different authorship pipeline. Choice fields are flat (`"A"`, `"B"`, `"C"`, `"D"`) rather than nested under `Choices`. ExplanationWrong fields use a consistent all-or-nothing generation pattern: all sections except Section C have all distractor slots populated; Section C has DL-021 (all absent).

---

## 6. Certification Requirements (Gold Schema Gate)

A question transitions to `question_state: "Certified"` only when:

1. All required gold-schema fields are present
2. DL-008: `ExplanationWrong[CorrectChoice]` is `""`
3. DL-013: Zero template boilerplate in any ExplanationWrong field
4. DL-025/DL-026: All non-CorrectChoice ExplanationWrong fields are non-empty and choice-specific
5. DL-018/DL-021: All 4 ExplanationWrong fields exist (even if empty)
6. CAQS six-dimension verification produces HIGH confidence across all dimensions
7. CorrectChoice is independently verified against stem + choices
8. User approval documented in REVISION_HISTORY.md

---

## 7. References

- Full metadata schema: `knowledge/QUESTION_METADATA_STANDARD.md`
- Quality standard: `knowledge/CAQS_v1.0.md`
- Taxonomy values: `knowledge/TAXONOMY_REGISTRY.md`
- Defect categories: `knowledge/DEFECT_LIBRARY.md`
- Current baselines: `knowledge/CURRENT_BASELINES.md`
