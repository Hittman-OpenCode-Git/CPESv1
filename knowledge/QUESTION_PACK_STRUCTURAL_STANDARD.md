# CMA Part 1 Exam Simulator — Question Pack Structural Standard

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md, CAQS_v1.0.md (§4.4 — Explanation Validation Rules)
**Dependencies:** QUESTION_METADATA_STANDARD.md, EXPLANATION_STYLE_GUIDE.md
**Applies to:** All MCQ bank arrays (`MCQ_BANK_A` through `MCQ_BANK_E`) in `pack_*_corrected.js` files, and all case items in `CASE_BANK_*` / `ENHANCED_CASE_BASE*` arrays.

---

## 1. Purpose

This document defines the **structural rules** for question pack files — field presence, permitted values, format patterns, and cross-field consistency. It complements `QUESTION_METADATA_STANDARD.md` (which defines the metadata schema) by specifying exactly which structural checks every question must pass.

Structural defects are distinct from content defects: a question can be structurally sound but content-deficient (correct metadata fields with wrong accounting), or structurally defective but content-correct (missing field but right answer). Both categories must be zero before Exam-Ready designation.

---

## 2. MCQ Question Structural Rules

### 2.1 Required Fields

Every MCQ in a `MCQ_BANK_*` array must have the following fields. Each field's structural requirements are specified.

| # | Field | Required | Type | Structural Rule |
|---|-------|----------|------|-----------------|
| R1 | `Part` | Yes | Number | Must be integer `1` |
| R2 | `Section` | Yes | String | Must be single letter `A`–`F` |
| R3 | `SectionName` | Yes | String | Must match one of the six blueprint domain names |
| R4 | `Topic` | Yes | String | Must not be empty. Should be unique across packs |
| R5 | `MicroTopic` | Yes | String | Must not be empty |
| R6 | `UniqueConceptKey` | Yes | String | Must match pattern `^[A-Z](?:-[A-Z])?-?\d{3,4}-[A-Za-z0-9-]+$` |
| R7 | `LOSTag` | Yes | String | Should start with a CMA LOS identifier `[A-F]\.\d` or `LOS:`. Non-standard formats flagged as Info. |
| R8 | `Difficulty` | Yes | String | Must be one of `["Easy", "Moderate", "Difficult", "Very Difficult"]` |
| R9 | `ItemType` | Yes | String | Must be `"MCQ"` |
| R10 | `ItemStyle` | Yes | String | Must be `"single-select"` |
| R11 | `Stem` | Yes | String | Must not be empty. Must end with `?` or `.` |
| R12 | `Choices` | Yes | Object | Must have exactly 4 keys: `A`, `B`, `C`, `D`. Each must be a non-empty string. |
| R13 | `CorrectChoice` | Yes | String | Must be one of `"A"`, `"B"`, `"C"`, `"D"`. Must match an existing key in `Choices`. |
| R14 | `ExplanationCorrect` | Yes | String | Must not be empty. Minimum 50 characters. |
| R15 | `ExplanationWrongA` | No* | String | Optional, but if present must follow E-rules below |
| R16 | `ExplanationWrongB` | No* | String | Same as above |
| R17 | `ExplanationWrongC` | No* | String | Same as above |
| R18 | `ExplanationWrongD` | No* | String | Same as above |
| R19 | `StudyLinks` | Yes | Array | Must be an array of objects, each with `label` and `url` strings |
| R20 | `SourceDescription` | Yes | String | Must not be empty |
| R21 | `Part1OnlyFlag` | Yes | Boolean | Must be `true` for Section A questions |
| R22 | `ReviewNote` | Yes | String | Must not be empty |
| R23 | `QuestionID` | Yes | String | Must match pattern `^P1[A-Z]?-[A-Z]{1,2}-\d{3}$` |
| R24 | `CalculationItem` | Yes | Boolean | Must be `true` or `false` |
| R25 | `VerifiedChecks` | Yes | Array[String] | Must be an array of 5 non-empty strings |

### 2.2 Explanation Wrong-Answer Slot Rules (E-Rules)

These rules govern the four `ExplanationWrong*` fields. They are derived from `CAQS_v1.0.md §4.4` (EV1–EV8).

| # | Rule | Applies To | Structural Check |
|---|------|------------|------------------|
| E1 | Minimum 50 characters | All ExplanationWrong* fields (when non-empty) | If non-empty, length must be ≥ 50 chars |
| E2 | No placeholder phrases | All ExplanationWrong* fields | Must not match any placeholder regex: `/This is the correct choice/i`, `/Plausible distractor/i`, `/Common misunderstanding/i` |
| E3 | Correct-answer slot must be empty | ExplanationWrong[CorrectChoice] | For field matching CorrectChoice, value must be `""` (DL-008) |
| E4 | Distractor explanations must be choice-specific | ExplanationWrong[non-CorrectChoice] | Must not be generic template text. (Manual review — not auto-checkable without NLP) |
| E5 | No uncertain language | All ExplanationWrong* fields | Must not contain `"I think"`, `"probably"`, `"maybe"` |
| E6 | Formula numbers must match exhibit values | CalculationItem = true explanations | (Validator-level check, not structural) |
| E7 | Arithmetic result must match CorrectChoice | CalculationItem = true explanations | (Validator-level check, not structural) |
| E8 | Correct-answer slot in distractor explanations must be empty | ExplanationWrong[CorrectChoice] | Duplicate of E3 — listed for cross-reference with CAQS §4.4 |

### 2.3 Enum Constraints

| Field | Permitted Values |
|-------|------------------|
| `Difficulty` | `"Easy"`, `"Moderate"`, `"Difficult"`, `"Very Difficult"` |
| `ItemType` | `"MCQ"` |
| `ItemStyle` | `"single-select"` |
| `CorrectChoice` | `"A"`, `"B"`, `"C"`, `"D"` |
| `Section` | `"A"`, `"B"`, `"C"`, `"D"`, `"E"`, `"F"` |

### 2.4 Format / Regex Constraints

| Field | Pattern | Notes |
|-------|---------|-------|
| `QuestionID` | `^P1[A-Z]?-[A-Z]{1,2}-\d{3}$` | e.g. `P1-A-001` (pack A), `P1B-A-076` (pack B), `P1-AC-001` (pack C), `P1E-A-001` (pack E). |
| `UniqueConceptKey` | `^[A-Z](?:-[A-Z])?-?\d{3,4}-[A-Za-z0-9-]+$` | e.g. `A-001-balance-sheet` (pack A), `B-A-076-revenue` (pack B), `A-C001-bond` (pack C), `E-A-001-Pascal-desc` (pack E). |
| `LOSTag` | Starts with `[A-F]\.\d`, `LOS:`, or a topic name | e.g. `"A.2 Recognition, measurement"`, `"LOS: Part 1, Section C.1.1"`, `"Application Controls"` |
| `Difficulty` | Must match enum (not free text) | |

### 2.5 Cross-Field Consistency Rules

| # | Rule | Check |
|---|------|-------|
| X1 | `Part` must be `1` for all Section A questions | `Part === 1` |
| X2 | `Section` must match the section letter in `QuestionID` | `QuestionID` contains `-A-`, `Section` is `"A"` |
| X3 | `CalculationItem` should be `true` when `Stem` requests a numeric answer | Stem heuristic: if stem contains numeric values or "calculate", "what is", "how much", etc. |
| X4 | `CorrectChoice` must reference an existing key in `Choices` | `Choices` must have the letter from `CorrectChoice` |
| X5 | `UniqueConceptKey` should match `MicroTopic` in slug form | `UniqueConceptKey` slug should match lowercase-dasherized MicroTopic |
| X6 | `LOSTag` section number should align with `Topic` content | (Manual review) |

---

## 3. Case Item Structural Rules

### 3.1 Case-Level Required Fields

Every case object in a `CASE_BANK_*` or `ENHANCED_CASE_BASE*` array must have:

| # | Field | Required | Type | Structural Rule |
|---|-------|----------|------|-----------------|
| C1 | `CaseID` | Yes | String | Must not be empty. Must be unique across all packs |
| C2 | `Title` | Yes | String | Must not be empty |
| C3 | `SectionTags` | Yes | Array[String] | Must contain 1–2 values from `["A","B","C","D","E","F"]` |
| C4 | `EstimatedMinutes` | Yes | Number | Must be positive integer |
| C5 | `ScenarioText` | Yes | String | Must not be empty. Should reference named company and stakeholder |
| C6 | `Items` | Yes | Array[Object] | Must contain at least 1 item |

### 3.2 Item-Level Required Fields

Every item within a case's `Items` array must have:

| # | Field | Required | Type | Structural Rule |
|---|-------|----------|------|-----------------|
| I1 | `Type` | Yes | String | Must be one of `["numeric", "select", "multi", "fill", "match"]` |
| I2 | `Prompt` | Yes | String | Must not be empty |
| I3 | `Correct` | Yes | Varies | Must be present and non-null. Type matches item type |
| I4 | `Explanation` | Yes | String | Must not be empty. Minimum 50 characters |
| I5 | `Topic` | Yes | String | Must not be empty |
| I6 | `Choices` | Conditional | Array[String] | Required for `select` and `multi` types. Must contain 3–6 items |
| I7 | `StudyLinks` | No | Array[Object] | If present, must be same format as MCQ StudyLinks |

---

## 4. Defect Category Reference

Structural defects are classified under these categories in `DEFECT_LIBRARY.md`:

| Category | Meaning | Includes |
|----------|---------|----------|
| **Structural** | Field-level rule violations | Missing fields, wrong types, format mismatches, empty-when-required, non-empty-when-empty |
| **Content** | Accounting/educational quality issues | Wrong answer, imprecise explanation, distractor quality, business realism |
| **Pedagogical** | Learning science / psychometric issues | Cognitive level mismatch, difficulty calibration, cueing, guessability |

### 4.1 Retro-Classification of Existing Defects

| Defect | Original Category | Structural Category | Notes |
|--------|-------------------|-------------------|-------|
| DL-001 | Semantic Accuracy | **Content** | Wrong answer due to imprecise wording — content issue, not field-level |
| DL-002 | Explanation Consistency | **Structural** + **Content** | ExplanationCorrect contradicts CorrectChoice — both structural (cross-field) and content |
| DL-003 | Absolute Language | **Pedagogical** | Psychometric issue — absolute wording reduces discrimination |
| DL-004 | Ambiguity | **Pedagogical** | Vague qualifiers reduce item discrimination |
| DL-005 | Distractor Similarity | **Pedagogical** | High Jaccard similarity — psychometric redundancy |
| DL-006 | Session Recovery | **Content** (runtime) | Application-level bug, not question content |
| DL-007 | Explanation Quality | **Content** | Identical distractor explanations degrade educational value |
| DL-008 | Explanation Slot Error | **Structural** | ExplanationWrong[CorrectChoice] is non-empty — field-level rule E3 violation |

---

## 5. Structural Audit Protocol

The structural audit (`scripts/structural_audit.js`) checks every question against the rules in this document and produces `reports/STRUCTURAL_AUDIT.md`.

### 5.1 Audit Scope

- All 5 MCQ packs: `pack_a_corrected.js` through `pack_e_corrected.js`
- All case banks: `CASE_BANK_*` and `ENHANCED_CASE_BASE*` arrays within pack files and `scored_cases*.js` files
- Each question checked against all applicable structural rules

### 5.2 Severity Classification

| Severity | Meaning | Examples |
|----------|---------|----------|
| Error | Violation prevents correct functioning | Missing Required field, CorrectChoice references non-existent Choice key |
| Warning | Violation degrades quality but doesn't break | Short explanation (<50 chars), non-empty correct-answer slot |
| Info | Deviation from best practice | Missing optional field, format pattern mismatch |

### 5.3 Report Format

The structural audit report is organized by:
1. **By Pack** — Total defects per pack file
2. **By Defect Type** — Count of each rule violation
3. **Per-Question Detail** — Each question with its defect list
4. **Summary** — Aggregate counts, tier distribution

---

## 6. Revision History

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-07-22 | Build-Time AI | Initial structural standard derived from CAQS §4.4, QUESTION_METADATA_STANDARD, DL-001–DL-008 patterns |
