# CMA Part 1 Exam Simulator — Question Metadata Standard

**Version:** 1.0  
**Status:** Active  
**Authority:** PROJECT_CONSTITUTION.md  
**Dependencies:** EXAM_BLUEPRINT.md, CASE_STUDY_GOLD_STANDARD.md, CASE_STUDY_SCORING_RUBRIC.md  
**Workflow:** Repository Architecture  

---

# Purpose

This document defines the canonical metadata model for every artifact in the CMA Part 1 Exam Simulator.

Every question, case study, exhibit, and explanation in the repository shall conform to this standard.

The model is designed to support:

- Repository validation
- Blueprint coverage analytics
- Difficulty and psychometric reporting
- AI review workflows (Accountant, Psychometrician, Editor, Validator)
- Future database / JSON export
- Future web API integration
- Future adaptive testing
- Future LMS integration (SCORM / xAPI)

---

# Guiding Principles

1. **Backward compatibility first** — Existing fields shall not be removed or renamed. Only new optional fields shall be added.
2. **Minimal required fields** — Required fields are the minimum set for basic functionality. Optional fields add depth.
3. **Single source of truth** — Every metadata value is defined in exactly one place. Duplicate information across fields is prohibited.
4. **Consistent naming** — All field names use PascalCase for top-level objects and camelCase for nested properties.
5. **Extensible by design** — The schema allows future fields without breaking existing consumers.

---

# Part 1: Case-Level Metadata

Every case study object in a `scored_cases*.js` array shall include the following fields.

## 1.1 Schema

| Field | Required | Type | Default | Description |
|-------|----------|------|---------|-------------|
| `CaseID` | Yes | String | — | Unique identifier, e.g. `"CBQ2-B2"`. Pattern: `CBQ{N}-{Section}{N}` where `N` is pack number (optional, 2–5) or blank for Pack 1. |
| `Title` | Yes | String | — | Descriptive title, e.g. `"Cash Budgeting and Forecasting"`. 2–8 words. |
| `SectionTags` | Yes | Array[String] | — | Domain codes, e.g. `["B"]` or `["E","F"]`. Valid values: `A`, `B`, `C`, `D`, `E`, `F`. |
| `BlueprintDomain` | Yes | String | — | Full domain name from EXAM_BLUEPRINT.md, e.g. `"Planning, Budgeting, and Forecasting"`. |
| `BlueprintObjectives` | Yes | Array[String] | — | Specific learning objectives tested, e.g. `["Cash budget preparation", "Cash collections forecasting"]`. |
| `PrimaryCompetency` | Yes | String | — | Primary skill tested: `"Calculation"`, `"Conceptual"`, `"Analysis"`, `"Judgment"`. |
| `EstimatedMinutes` | Yes | Integer | 30 | Expected time for an average candidate to complete all items. Range: 20–40. |
| `Difficulty` | Yes | String | `"Moderate"` | Overall case difficulty. Values: `"Easy"`, `"Moderate"`, `"Difficult"`, `"Very Difficult"`. |
| `DifficultyScore` | Yes | Integer | 3 | Numeric difficulty 1–5: 1=Easy, 2=Moderate-Easy, 3=Moderate, 4=Difficult, 5=Very Difficult. |
| `ScenarioText` | Yes | String | — | 2–4 sentence business scenario. Must include named company, stakeholder, business trigger, and task. |
| `Exhibits` | Yes | Array[Object] | — | Array of exhibit objects (see Part 3). Minimum 2. |
| `Items` | Yes | Array[Object] | — | Array of item objects (see Part 2). Minimum 5, maximum 7. |
| `Industry` | Yes | String | — | Industry classification, e.g. `"Medical devices"`, `"Food processing"`, `"Electronics manufacturing"`. |
| `CompanyType` | Yes | String | — | e.g. `"Manufacturer"`, `"Distributor"`, `"Retailer"`, `"Service provider"`. |
| `CompanyName` | Yes | String | — | Fictional company name used in the scenario, e.g. `"Harbor Medical Supplies"`. |
| `Stakeholder` | Yes | String | — | Primary decision-maker role, e.g. `"CFO Maria Chen"`, `"Controller"`, `"Operations Manager"`. |
| `BusinessFunction` | Yes | String | — | Business area, e.g. `"Treasury"`, `"Financial reporting"`, `"Cost accounting"`, `"Internal audit"`. |
| `QuestionCount` | Yes | Integer | — | Count of items. Must equal `Items.length`. |
| `ExhibitCount` | Yes | Integer | — | Count of exhibits. Must equal `Exhibits.length`. |
| `ProductionStatus` | Yes | String | `"Draft"` | Values: `"Draft"`, `"Review"`, `"QA"`, `"Production"`, `"Retired"`. |
| `Version` | Yes | String | `"1.0"` | Semantic version, incremented on any change. |
| `Tags` | No | Array[String] | `[]` | Arbitrary tags for filtering, e.g. `["variances", "lean", "JIT"]`. |
| `CreatedDate` | Yes | String (ISO 8601) | — | Date of initial creation, e.g. `"2026-07-20"`. |
| `ModifiedDate` | Yes | String (ISO 8601) | — | Date of last modification. |
| `Author` | Yes | String | — | Creator identifier, e.g. `"Case Author"`, `"AI"`, or a named person. |
| `Reviewer` | No | String | — | Persona or person who reviewed for accounting correctness. |
| `QAReviewer` | No | String | — | Persona or person who performed independent QA. |
| `Confidence` | Yes | Integer | 90 | Self-assessed confidence 0–100. See confidence scale in PROJECT_CONSTITUTION.md. |
| `RevisionHistory` | No | Array[Object] | `[]` | Array of revision entries (see section 1.2). |
| `Dependencies` | No | Array[String] | `[]` | CaseIDs that must be completed before this one, if sequenced. |
| `LearningObjectives` | Yes | Array[String] | — | Educational objectives, e.g. `["Allocate joint costs using NRV method", "Apply sell-or-process-further rule"]`. |

## 1.2 Revision History Entry

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `Date` | Yes | String (ISO 8601) | Date of revision |
| `Version` | Yes | String | Version after revision |
| `Author` | Yes | String | Who made the change |
| `Summary` | Yes | String | What changed and why |

## 1.3 Example (Case-Level Metadata)

```json
{
  "CaseID": "CBQ2-B2",
  "Title": "Cash Budgeting and Forecasting",
  "SectionTags": ["B"],
  "BlueprintDomain": "Planning, Budgeting, and Forecasting",
  "BlueprintObjectives": [
    "Cash budget preparation",
    "Cash collections forecasting",
    "Borrowing requirement calculation"
  ],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Harbor Medical Supplies closed December with weaker sales than forecast. CFO Maria Chen needs a January cash forecast to decide whether to draw on Harbor's $200,000 line of credit...",
  "Industry": "Medical supplies",
  "CompanyType": "Manufacturer",
  "CompanyName": "Harbor Medical Supplies",
  "Stakeholder": "CFO Maria Chen",
  "BusinessFunction": "Treasury",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Production",
  "Version": "1.2",
  "Tags": ["cash budget", "collections", "borrowing", "forecast"],
  "CreatedDate": "2026-07-18",
  "ModifiedDate": "2026-07-20",
  "Author": "Case Author",
  "Reviewer": "Accountant",
  "QAReviewer": "Validator",
  "Confidence": 100,
  "RevisionHistory": [
    {"Date": "2026-07-18", "Version": "1.0", "Author": "Case Author", "Summary": "Initial creation"},
    {"Date": "2026-07-19", "Version": "1.1", "Author": "Accountant", "Summary": "Corrected December credit sales calculation, updated explanation"},
    {"Date": "2026-07-20", "Version": "1.2", "Author": "Editor", "Summary": "Revised wording for clarity, renamed stakeholders"}
  ],
  "Dependencies": [],
  "LearningObjectives": [
    "Calculate total cash collections from cash and credit sales",
    "Calculate total cash disbursements excluding non-cash expenses",
    "Determine borrowing requirements to maintain minimum cash balance",
    "Analyze how changes in collection assumptions affect borrowing"
  ]
}
```

---

# Part 2: Item-Level (Question) Metadata

Every item within a case's `Items` array shall include the following fields.

## 2.1 Schema

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `ItemID` | Yes | String | Unique within the case, e.g. `"CBQ2-B2-Q1"`. Pattern: `{CaseID}-Q{N}`. |
| `Type` | Yes | String | Question type. Values: `"numeric"`, `"select"`, `"multi"`, `"fill"`, `"match"`. |
| `Prompt` | Yes | String | Question text. Must be unique within the case and specific to the scenario. |
| `Correct` | Yes | Varies | Correct answer. `String` for numeric/select/fill, `Array[String]` for multi, `Object` for match. |
| `Explanation` | Yes | String | Educational explanation. Must include accounting principle, formula with substitution, and (optional) common trap. |
| `Topic` | Yes | String | Specific concept tag, e.g. `"Cash collections"`, `"NRV method"`. |
| `Subtopic` | No | String | Narrower topic, e.g. `"Credit sales collection timing"`. |
| `Choices` | Conditional | Array[String] | Required for `select` and `multi` types. Array of answer choices. |
| `LeftItems` | Conditional | Array[String] | Required for `match` type. Left-side items. |
| `RightItems` | Conditional | Array[String] | Required for `match` type. Right-side items (may include extra distractors). |
| `Difficulty` | Yes | String | Per-item difficulty. Values: `"Easy"`, `"Moderate"`, `"Difficult"`, `"Very Difficult"`. |
| `DifficultyScore` | Yes | Integer | Per-item difficulty 1–5. |
| `CognitiveLevel` | Yes | String | Cognitive skill tested (Bloom's updated). Values: `"Remember"`, `"Understand"`, `"Apply"`, `"Analyze"`, `"Evaluate"`. |
| `CalculationRequired` | Yes | Boolean | `true` if the item requires arithmetic computation. |
| `FormulaReference` | No | String | Reference to FORMULA_MASTER.md formula name, e.g. `"Cash collections formula"`. |
| `DecisionTreeReference` | No | String | Reference to ACCOUNTING_DECISION_TREES.md section, e.g. `"Cost Classification"`. |
| `CommonTrapReference` | No | String | Reference to COMMON_EXAM_TRAPS.md trap ID, e.g. `"Trap 15: Cash vs Accrual"`. |
| `EstimatedMinutes` | No | Integer | Time estimate for this item specifically. Used for adaptive timing. |
| `ExplanationVersion` | Yes | Integer | Revision number of the explanation. Starts at 1. |
| `Tags` | No | Array[String] | Arbitrary item-level tags, e.g. `["FIFO", "LCM", "write-down"]`. |
| `Dependencies` | No | Array[String] | ItemIDs within the same case that must be answered first. |

## 2.2 Example (Item-Level Metadata)

```json
{
  "ItemID": "CBQ2-B2-Q1",
  "Type": "numeric",
  "Prompt": "Enter total cash collections for January.",
  "Correct": "540000",
  "Explanation": "Cash sales: $600,000 x 20% = $120,000. January credit sales collected in January: ($600,000 x 80%) x 50% = $240,000. December credit sales collected in January: ($500,000 x 80%) x 45% = $180,000. Total = $120,000 + $240,000 + $180,000 = $540,000. A common error is to apply collection percentages to total sales instead of credit sales only.",
  "Topic": "Cash collections",
  "Subtopic": "Credit sales collection timing",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationRequired": true,
  "FormulaReference": "Cash collections formula",
  "CommonTrapReference": "Trap 15: Cash vs Accrual",
  "EstimatedMinutes": 5,
  "ExplanationVersion": 2,
  "Tags": ["cash collections", "credit sales", "collection percentage"],
  "Dependencies": []
}
```

---

# Part 3: Exhibit-Level Metadata

Every exhibit within a case's `Exhibits` array shall include the following fields.

## 3.1 Schema

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `ExhibitID` | Yes | String | Unique within the case, e.g. `"CBQ2-B2-E1"`. Pattern: `{CaseID}-E{N}`. |
| `CaseID` | Yes | String | Parent case identifier. |
| `Type` | Yes | String | Exhibit format. Values: `"table"`, `"text"`, `"chart"`, `"dashboard"`, `"financial-statement"`, `"contract"`, `"policy"`, `"email"`, `"erp-report"`. |
| `Title` | Yes | String | Exhibit heading, e.g. `"Exhibit 1 — Sales Forecast"`. |
| `Purpose` | Yes | String | Why this exhibit exists. Describes what data it contributes, e.g. `"Provides sales data for cash collections calculation."` |
| `ReferencedBy` | Yes | Array[String] | ItemIDs that reference this exhibit, e.g. `["CBQ2-B2-Q1", "CBQ2-B2-Q4"]`. |
| `Headers` | Conditional | Array[String] | Required for `table` type. Column headers. |
| `Rows` | Conditional | Array[Array] | Required for `table` type. Data rows. |
| `Body` | Conditional | String | Required for `text` type. Paragraph content. |
| `DataFormat` | No | String | Description of data format, e.g. `"Currency in USD, units in whole numbers"`. |
| `AccuracyCheck` | No | String | Verification note, e.g. `"Totals verified: 500K + 600K consistent with text"`. |
| `Dependencies` | No | Array[String] | Other exhibits that must be read first. |

## 3.2 Example (Exhibit-Level Metadata)

```json
{
  "ExhibitID": "CBQ2-B2-E1",
  "CaseID": "CBQ2-B2",
  "Type": "table",
  "Title": "Exhibit 1 — Sales Forecast",
  "Purpose": "Provides December actual and January budgeted sales data used for cash collections calculation.",
  "ReferencedBy": ["CBQ2-B2-Q1"],
  "Headers": ["Month", "Sales"],
  "Rows": [
    ["December (Actual)", "$500,000"],
    ["January (Budget)", "$600,000"]
  ],
  "DataFormat": "Currency in USD, whole dollars",
  "AccuracyCheck": "Values are input assumptions; no summation required",
  "Dependencies": []
}
```

---

# Part 4: Explanation Metadata

Explanations are embedded in each item's `Explanation` field but may also carry explicit metadata within the explanation itself.

## 4.1 Structured Explanation Format

Every explanation shall follow this structure. The sections need not be labeled, but all must be present.

| Section | Required | Description |
|---------|----------|-------------|
| **Accounting Principle** | Yes | The governing concept, e.g. "GAAP requires FIFO inventory to be reported at lower of cost or NRV." |
| **Formula with Substitution** | Yes | The formula used with actual numbers, e.g. "(800k × 0.01) + (300k × 0.05) + (100k × 0.20) = 43,000." |
| **Business Interpretation** | Yes | What the result means in context, e.g. "Harbor's January cash deficit requires $125,000 borrowing." |
| **Common Trap** | No | One explicit warning per case, e.g. "A common error is to include depreciation as a cash outflow." |

## 4.2 Validation Rules

| Rule | Description |
|------|-------------|
| E1 | Formula numbers must match exhibit values. |
| E2 | Arithmetic result must match `Correct` value. |
| E3 | Principle must reference FASB ASC, COSO, or IMA standard where applicable. |
| E4 | Multi-select explanations must address each choice individually. |
| E5 | No explanation may contain "I think," "probably," or other uncertain language. |

---

# Part 5: Validation Rules

## 5.1 Field-Level Validation

| Field | Rule |
|-------|------|
| `CaseID` | Must match pattern `^CBQ\d*-[A-F]\d*$`. Must be unique across all packs. |
| `Title` | Must not be empty. Must not end with punctuation other than period. |
| `SectionTags` | Must contain 1–2 values from `["A","B","C","D","E","F"]`. If 2, cross-domain tags must be E+F only. |
| `BlueprintDomain` | Must match a domain name in EXAM_BLUEPRINT.md. |
| `Difficulty` | Must be one of `["Easy", "Moderate", "Difficult", "Very Difficult"]`. |
| `DifficultyScore` | Must be integer 1–5. |
| `DifficultyScore` to `Difficulty` | 1=Easy, 2=Moderate-Easy, 3=Moderate, 4=Difficult, 5=Very Difficult. |
| `EstimatedMinutes` | Must be integer 20–40. Must be achievable: average 5 minutes per item minimum. |
| `QuestionCount` | Must equal `Items.length`. |
| `ExhibitCount` | Must equal `Exhibits.length`. |
| `ProductionStatus` | Must be one of `["Draft", "Review", "QA", "Production", "Retired"]`. |
| `Version` | Must match semantic version `^\d+\.\d+$`. |
| `Confidence` | Must be integer 0–100. |
| `ItemID` | Must match pattern `^CBQ\d*-[A-F]\d*-Q\d+$`. Must be unique within the case. |
| `CognitiveLevel` | Must be one of `["Remember", "Understand", "Apply", "Analyze", "Evaluate"]`. |
| `Explanation` | Minimum 50 characters. Must contain a formula or principle reference. |
| `Correct` | Type must match item type: numeric→string, select→string, multi→array, fill→string, match→object. |
| `Choices` | Required when `Type` is `select` or `multi`. Must contain 3–6 items. |
| `LeftItems` / `RightItems` | Required when `Type` is `match`. Must contain 3–6 items each. |

## 5.2 Cross-Field Validation

| Rule | Description |
|------|-------------|
| CF1 | Every `ExhibitID` in any item's references must exist in the case's exhibits. |
| CF2 | Every item's `Topic` must be within scope of the case's `BlueprintDomain`. |
| CF3 | The case's `SectionTags` must align with `BlueprintDomain`. |
| CF4 | `DifficultyScore` of a case must be within ±1 of the mean of its item `DifficultyScore` values. |
| CF5 | `EstimatedMinutes` for a case should approximate sum of item `EstimatedMinutes` divided by 0.7 (accounting for reading time). |

## 5.3 Exhibit Data Consumption Rule

Every row in every table exhibit must be referenced by at least one item. No decorative data.

## 5.4 Cognitive Progression Rule

Items must follow this sequence: numeric(2–3) → select(1–2) → multi(1) → fill(0–1) → match(1). Corresponding cognitive levels: Apply → Analyze → Evaluate → Understand → Synthesize.

---

# Part 6: Naming Conventions

## 6.1 CaseID

Pattern: `CBQ{N}-{Section}{Sequence}`

| Part | Rule | Example |
|------|------|---------|
| `CBQ` | Literal prefix | CBQ |
| `{N}` | Pack number. Blank for Pack 1. 2–5 for Packs 2–5. | (blank), 2, 3, 4, 5 |
| `{Section}` | Single letter A–F | B |
| `{Sequence}` | Sequential integer within section and pack | 2 |

Valid: `CBQ-B2`, `CBQ2-B2`, `CBQ3-D1`, `CBQ5-A1`

## 6.2 ItemID

Pattern: `{CaseID}-Q{Sequence}`

Examples: `CBQ2-B2-Q1`, `CBQ3-D1-Q3`

## 6.3 ExhibitID

Pattern: `{CaseID}-E{Sequence}`

Examples: `CBQ2-B2-E1`, `CBQ3-D1-E2`

## 6.4 File Naming

| Artifact | Convention | Example |
|----------|-----------|---------|
| Case pack | `scored_cases{N}.js` | `scored_cases2.js` |
| Standalone pack | `pack_{letter}_corrected.js` | `pack_a_corrected.js` |
| Audit report | `pack_{letter}_audit_report.md` | `pack_b_audit_report.md` |
| Knowledge document | `UPPER_SNAKE_CASE.md` | `CASE_STUDY_GOLD_STANDARD.md` |
| AI workflow | `UPPER_SNAKE_CASE.md` | `SESSION_BOOTSTRAP.md` |

---

# Part 7: Migration Plan

## Phase 1 — Schema Establishment (Current Sprint)

**Do not modify repository files.** The schema is established as the authoritative standard.

1. Approve this document as the canonical metadata standard.
2. Add metadata validation rules to the validation framework (scripts/validators/).
3. Create a metadata validation script that checks all required fields exist.

## Phase 2 — Metadata Enrichment (Next 5 Sprints)

Add missing metadata fields to existing cases **without removing or altering existing fields**.

### Priority Order

| Priority | Action | Cases Affected |
|----------|--------|---------------|
| P1 | Add `Difficulty`, `DifficultyScore` fields | All 75 cases |
| P2 | Add `CognitiveLevel` to every item | All ~400 items |
| P3 | Add `BlueprintDomain`, `BlueprintObjectives` | All 75 cases |
| P4 | Add `Industry`, `CompanyType`, `CompanyName`, `Stakeholder`, `BusinessFunction` | All 75 cases |
| P5 | Add `ProductionStatus`, `Version`, `CreatedDate`, `ModifiedDate`, `Author` | All 75 cases |
| P6 | Add `ItemID` to every item | All ~400 items |
| P7 | Add `ExhibitID`, `Purpose`, `ReferencedBy` to every exhibit | All ~150 exhibits |
| P8 | Add `Topic` to every item (standardize existing values) | All ~400 items |
| P9 | Add `RevisionHistory`, `Confidence` | All 75 cases |
| P10 | Add `Tags`, `LearningObjectives`, `PrimaryCompetency` | All 75 cases |

### Migration Strategy

Each enrichment pass shall:

1. Read one `scored_cases*.js` file at a time.
2. Add missing fields with sensible defaults:
   - `Difficulty`: `"Moderate"`
   - `DifficultyScore`: `3`
   - `CognitiveLevel`: Derived from item position and type per progression rules
   - `ProductionStatus`: Retain existing or set `"Draft"` for placeholders, `"Production"` for Gold Standard
   - `Version`: `"1.0"`
   - `Confidence`: `90` (default), `100` for Gold Standard
3. Never change existing field values during metadata enrichment.
4. Run validation after each file.

## Phase 3 — Validation Integration

Integrate metadata validation into the existing `scripts/validators/` framework.

| Validator | Checks |
|-----------|--------|
| `metadata-validator.js` | All required fields present |
| `field-type-validator.js` | Field types match schema |
| `cross-reference-validator.js` | Dependencies resolve, references exist |
| `progression-validator.js` | Cognitive progression rule enforced |
| `consumption-validator.js` | All exhibit data consumed |
| `difficulty-validator.js` | Difficulty scores consistent with item distribution |

## Phase 4 — Future Compatibility

### Database Export

The metadata schema is designed for direct mapping to a relational or document database:

- **Cases table**: All case-level fields map 1:1 to columns.
- **Items table**: All item-level fields map 1:1; `CaseID` is foreign key.
- **Exhibits table**: All exhibit-level fields map 1:1; `CaseID` is foreign key.
- **Tags**: Stored as JSON array or separate junction table.

### JSON Export

The enriched case object is directly serializable to JSON with no transformation required.

### API Integration

The metadata schema supports RESTful endpoints:

- `GET /api/cases?domain=B&difficulty=Moderate`
- `GET /api/cases/CBQ2-B2/items`
- `GET /api/cases/CBQ2-B2/exhibits`
- `GET /api/analytics/blueprint-coverage`
- `GET /api/analytics/difficulty-distribution`

### Adaptive Testing

The `DifficultyScore`, `CognitiveLevel`, and `EstimatedMinutes` fields support adaptive algorithms:

- Entry-level items: Difficulty 1–2, CognitiveLevel `Recall` or `Understand`
- Mid-level items: Difficulty 2–3, CognitiveLevel `Apply` or `Analyze`
- Advanced items: Difficulty 3–5, CognitiveLevel `Evaluate` or `Synthesize`

---

# Part 8: Compliance Checklist

Before any case is accepted into production:

- [ ] All required case-level fields present and valid
- [ ] All required item-level fields present and valid
- [ ] All required exhibit-level fields present and valid
- [ ] ItemID, ExhibitID unique per case
- [ ] Cognitive progression rule satisfied
- [ ] Exhibit data consumption rule satisfied
- [ ] No decorative data
- [ ] No placeholder content (generic prompts, "Distractor A/B/C", "Incorrect 1/2")
- [ ] Difficulty scores consistent
- [ ] Confidence ≥ 95 for Gold Standard, ≥ 90 for Production
- [ ] Accounting review completed
- [ ] QA review completed
- [ ] Validation script passes
- [ ] RevisionHistory documents all changes

---

# Part 9: Governance State Fields

Every question in `pack_*_corrected.js` files may include the following governance fields. These fields track the question's lifecycle from authoring through certification.

## 9.1 Field Definitions

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `pack_state` | No | String | Governance state of the entire pack. Values: `"Unprocessed"`, `"In Audit"`, `"Editorial Queue"`, `"Certified"`, `"Archived"`. |
| `question_state` | No | String | Governance state of the individual question. Overrides `pack_state` for learner-pool eligibility. Values: `"Unprocessed"`, `"In Audit"`, `"Editorial Queue"`, `"Certified"`, `"Archived"`. |
| `pedagogical_cluster` | No | String | Identifier for axis-varying or thematic question sets. Enables future AI Performance Review Engine diagnosis and session-composition logic to avoid drawing all cluster members into the same practice session. Value format: `{TOPIC}_cluster` (e.g., `ASC_450_axis_cluster`). |

## 9.2 State Transition Rules

```
Unprocessed ──→ In Audit: entry into a sub-batch (pool selection)
In Audit ──→ Editorial Queue: structural or content revision required
In Audit ──→ Certified: HIGH-confidence AI verification + user approval
Any State ──→ Archived: consolidation or removal from active pool
Certified ──→ In Audit: only via explicit re-verification request
```

### Rules

1. **`question_state` overrides `pack_state`** for learner-pool eligibility. A question with `question_state: "Certified"` is eligible even if its pack has not reached pack-level certification.
2. **Certified → In Audit requires explicit re-verification.** A certified question cannot be downgraded without a documented re-verification request.
3. **Archival preserves content.** Archived questions retain full question text and metadata. Only the state field changes. Rollback logs are maintained in `reports/`.

## 9.3 Verification Requirements

Transition to `Certified` requires:
- HIGH-confidence AI verification across all six dimensions (per `CAQS_v1.0.md` §1.6)
- User approval documented in `REVISION_HISTORY.md`
- Distractor tier map (A/B/C/D) per `BUILD_TIME_VERIFICATION_STANDARD.md`

## 9.4 Certification-Blocking Conditions — Session 508 Additions

The following conditions block certification regardless of verification confidence. These rules were formalized in Session 508 after the Session 700 global certification review identified certified items with structurally non-empty but semantically wrong ExplanationWrong fields.

### 9.4.1 Explanation Relevance — Topic Mismatch BLOCK

An item **shall not be certified** if any `ExplanationWrong` field contains text that is topically unrelated to the learner-facing distractor choice on that item. Specifically, certification is blocked if any EW slot contains:

- Text belonging to a different question (cross-item contamination)
- Text belonging to a different topic or domain area than the item's own content block
- Text reflecting a different template instance from the rotation group
- Text otherwise semantically unrelated to the learner-facing distractor

**Rationale:** A non-empty slot with wrong-topic text is a learner-safety risk. The learner may see feedback about a completely unrelated topic. Non-empty status alone does not satisfy certification requirements — the text must be topically relevant (Rule G-NEW-2).

**Examples:**
- Descriptive analytics item with labor efficiency variance text (P1E-F-001, repaired S508)
- Joint cost allocation item with variable costing text (P1-DC-020, repaired S508)
- Theory of Constraints item with cost-of-quality text (P1-DC-040, repaired S508)

### 9.4.2 Dual-Block Source-of-Truth BLOCK

For items with split/dual-block architecture (metadata block with `ChoiceA`–`ChoiceD` / `ExplanationWrongA`–`ExplanationWrongD` + content block with `Choices.{A,B,C,D}` / `CorrectChoice` / `ExplanationCorrect`):

**Certification is blocked** if the metadata-block `ChoiceA`–`ChoiceD` values differ from the content-block `Choices.{A,B,C,D}` values. The content block is the authoritative source of truth for learner-facing content. When the two blocks diverge, the `ExplanationWrong` fields in the metadata block may describe the wrong item's distractors (DL-016 shift). The item must be repaired to match before certification can proceed (Rule G-NEW-1, G-NEW-3).

**Verification methodology:** Any scan tool or certification process operating on dual-block packs must extract `CorrectChoice` from the same enclosing JSON object as the `ExplanationWrong` fields being evaluated. Forward-scan or regex-window scanning is insufficient (Rule G-NEW-3).

### 9.4.3 Case Explanation Sufficiency BLOCK

For case-study items, certification is blocked when:

- The explanation is one sentence for an item testing at Apply, Analyze, or Evaluate cognitive levels (Rule G-NEW-4)
- Select, multi, or match items lack distractor-oriented rationale or wrong-choice guidance (Rule G-NEW-4)
- The correct-answer explanation does not reference the governing accounting principle by name (ASC, COSO, IAS, or IMA standard) — per CAQS §4.3 (EV3)

### 9.4.4 Effective Date

These certification-blocking conditions are effective as of Session 508 (2026-07-25). Items certified before this date remain Certified but are flagged for priority remediation if they violate these conditions.

### 9.4.5 Cross-References

- GOVERNANCE_AND_RISK_REGISTER_CONSOLIDATED.md §9 (Certification Governance Rules)
- Session 700: `reports/systematic_testing/SESSION700_GLOBAL_CERTIFICATION_REVIEW_SUMMARY.md`
- Session 508: `reports/session_status/SESSION508_CRITICAL_CERTIFIED_DEFECT_REPAIR_AND_GOVERNANCE_UPDATE.md`
- Defect entries: DL-010, DL-016, DL-029 (DEFECT_LIBRARY.md)
- CAQS v1.0: §1.6, §4.3, §14

---

# Revision History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-20 | Initial metadata standard |
| 1.1 | 2026-07-25 | Session 508: Added §9.4 Certification-Blocking Conditions (G-NEW-1 through G-NEW-5) |

---

# Appendix A: Current State Assessment

## Existing Fields (Backward Compatible)

These fields currently exist in the repository and are already consumed by the runtime engine:

| Location | Fields |
|----------|--------|
| Case level | `CaseID`, `Title`, `SectionTags`, `EstimatedMinutes`, `ScenarioText`, `Exhibits`, `Items` |
| Item level | `Type`, `Prompt`, `Correct`, `Explanation`, `Topic`, `Choices`, `LeftItems`, `RightItems` |
| Exhibit level | `Type`, `Title`, `Headers`, `Rows`, `Body` |

All existing fields are preserved. The new standard adds fields; it never removes or renames existing fields.

## New Fields Required

| Priority | Count | Fields |
|----------|-------|--------|
| P1 (Critical) | 7 | `Difficulty`, `DifficultyScore`, `CognitiveLevel`, `BlueprintDomain`, `BlueprintObjectives`, `Industry`, `ProductionStatus` |
| P2 (High) | 8 | `ItemID`, `ExhibitID`, `Purpose`, `ReferencedBy`, `CompanyType`, `CompanyName`, `Stakeholder`, `BusinessFunction` |
| P3 (Medium) | 7 | `Version`, `CreatedDate`, `ModifiedDate`, `Author`, `Reviewer`, `QAReviewer`, `Confidence` |
| P4 (Low) | 5 | `Tags`, `LearningObjectives`, `PrimaryCompetency`, `Subtopic`, `FormulaReference` |

Total new fields: 27 across all levels.
