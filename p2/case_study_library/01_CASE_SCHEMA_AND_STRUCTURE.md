# 01 — Case Schema & Structure (Part 2)

**Status:** Authoritative for all Part 2 case studies
**Sources:** `p2/P2002_REPOSITORY_LAYOUT.md` §c/§h (post-remediation), `knowledge/QUESTION_METADATA_STANDARD.md` Parts 1–3, 5, 9

---

## 1. Identifier Conventions (CBQ2\d- REQUIRED)

The pack digit is **mandatory** — this resolves the verified collision with Part 1 Pack 2, which uses the bare `CBQ2-` prefix (see `content/cases/case_pack_1_corrected.js`, `case_pack_2_corrected.js`).

| Artifact | Pattern | Regex | Example |
|----------|---------|-------|---------|
| CaseID | `CBQ2{PackNum}-{Section}{Seq}` | `^CBQ2\d-[A-F]\d+$` | `CBQ21-A1`, `CBQ22-B5` |
| ItemID | `{CaseID}-Q{N}` | `^CBQ2\d-[A-F]\d+-Q\d+$` | `CBQ21-A1-Q3` |
| ExhibitID | `{CaseID}-E{N}` | `^CBQ2\d-[A-F]\d+-E\d+$` | `CBQ21-A1-E1` |

**Router order (Part 2 checked FIRST):**

```javascript
function routeCaseID(caseId) {
  if (/^CBQ2\d-[A-F]\d+$/.test(caseId)) return 'Part2';
  if (/^CBQ\d*-[A-F]\d+$/.test(caseId)) return 'Part1';
  throw new Error(`Unknown CaseID format: ${caseId}`);
}
```

**Prohibited:** bare `CBQ2-{Section}{Seq}` for Part 2 (reserved for Part 1 Pack 2). Never reuse an ID; never renumber a certified case.

---

## 2. Case-Level Schema (required fields)

From QUESTION_METADATA_STANDARD §1.1. **QuestionCount must equal Items.length; ExhibitCount must equal Exhibits.length** — cross-field validation CF-rules enforce these.

| Field | Required | Notes |
|-------|----------|-------|
| CaseID | Yes | `CBQ2\d-[A-F]\d+` (see §1) |
| Title | Yes | 2–8 words, descriptive |
| SectionTags | Yes | 1–2 of A–F; cross-domain E+F only |
| BlueprintDomain | Yes | Full domain name |
| BlueprintObjectives | Yes | Specific LOs tested |
| PrimaryCompetency | Yes | Calculation / Conceptual / Analysis / Judgment |
| EstimatedMinutes | Yes | 20–40; ≥5 min per item |
| Difficulty | Yes | Easy / Moderate-Easy / Moderate / Difficult / Very Difficult (5-value enum) |
| DifficultyScore | Yes | 1–5 matching Difficulty |
| ScenarioText | Yes | 2–4 sentences: named company + stakeholder + business trigger + task |
| Exhibits | Yes | ≥2 exhibit objects (§4) |
| Items | Yes | 5–7 item objects (§3) |
| Industry | Yes | e.g., "Medical devices" |
| CompanyType | Yes | Manufacturer / Distributor / Retailer / Service provider |
| CompanyName | Yes | Fictional but realistic |
| Stakeholder | Yes | Named role, e.g., "CFO Maria Chen" |
| BusinessFunction | Yes | Treasury / Financial reporting / Cost accounting / Internal audit… |
| QuestionCount | Yes | == Items.length |
| ExhibitCount | Yes | == Exhibits.length |
| ProductionStatus | Yes | Draft / Review / QA / Production / Retired |
| Version | Yes | 2-part `^\d+\.\d+$` (case-level). Repo `VERSION` file separately uses 3-part SemVer — different artifacts |
| Tags | No | Filtering tags |
| CreatedDate | Yes | ISO 8601 |
| ModifiedDate | Yes | ISO 8601 |
| Author | Yes | Creator identifier |
| Reviewer / QAReviewer | No | Persona or person |
| Confidence | Yes | 0–100 |
| RevisionHistory | No | Per §1.2 of the standard |
| Dependencies | No | CaseIDs sequenced before this one |
| LearningObjectives | Yes | Educational objectives |

---

## 3. Item-Level Schema (case items)

From QUESTION_METADATA_STANDARD §2.1. Case items use the **`Type`** field with the 5-item-type enum — **distinct from the MCQ `ItemStyle` ("single-select")** used in pack files; do not mix the two vocabularies.

| Field | Required | Notes |
|-------|----------|-------|
| ItemID | Yes | `{CaseID}-Q{N}` |
| Type | Yes | `numeric` / `select` / `multi` / `fill` / `match` |
| Prompt | Yes | Specific to the scenario |
| Correct | Yes | String (numeric/select/fill), Array (multi), Object (match) |
| Explanation | Yes | Principle + formula/substitution + business interpretation; distractor rationale for select/multi/match |
| Topic / Subtopic | Yes/No | Controlled vocabulary — use volume 10 |
| Choices | Conditional | Required for select/multi (3–6 options) |
| LeftItems / RightItems | Conditional | Required for match (3–6 each) |
| Difficulty / DifficultyScore | Yes | 5-value enum |
| CognitiveLevel | Yes | Remember / Understand / Apply / Analyze / Evaluate ("Synthesize" is narrative shorthand for Evaluate-level synthesis) |
| CalculationRequired | Yes | Boolean |
| FormulaReference | No | Must be a volume-09 ID |
| DecisionTreeReference / CommonTrapReference | No | See volume 11 cautions (full sentence, no mid-word truncation) |
| EstimatedMinutes | No | Per item |
| ExplanationVersion | Yes | Starts at 1 |
| Tags / Dependencies | No | — |

**ExplanationWrong slot rules (DL-008/DL-021/DL-026 compliance):** the ExplanationWrong slot matching the item's correct answer must be EMPTY; every non-correct slot must contain ≥50 chars of choice-specific text.

---

## 4. Exhibit-Level Schema

From QUESTION_METADATA_STANDARD §3.1. Types: `table`, `text`, `chart`, `dashboard`, `financial-statement`, `contract`, `policy`, `email`, `erp-report`.

| Field | Required | Notes |
|-------|----------|-------|
| ExhibitID | Yes | `{CaseID}-E{N}` |
| CaseID | Yes | Parent |
| Type | Yes | From the 9-type enum |
| Title | Yes | "Exhibit N — …" |
| Purpose | Yes | What data it contributes |
| ReferencedBy | Yes | ItemIDs consuming it |
| Headers / Rows | Conditional | table type |
| Body | Conditional | text type |
| DataFormat / AccuracyCheck / Dependencies | No | — |

**Consumption rule:** every exhibit row/column is consumed by ≥1 item; no decorative data.

---

## 5. Cross-Field Validation Rules (from §5)

- CF1: exhibit references resolve within the case
- CF2: item Topic within the case's BlueprintDomain scope
- CF3: SectionTags align with BlueprintDomain
- CF4: case DifficultyScore within ±1 of mean item scores
- CF5: EstimatedMinutes ≈ Σ(item minutes) ÷ 0.7
- Progression (§5.4): numeric(2–3) → select(1–2) → multi(1) → fill(0–1) → match(1); cognitive Apply → Analyze → Evaluate → Understand → Evaluate
- Max **7** items per case (aligned P2003 with §1.1)

---

## 6. Governance State Fields

Per §9: `question_state` ∈ {Unprocessed, In Audit, Editorial Queue, Certified, Archived} for MCQ items; cases carry `ProductionStatus` ∈ {Draft, Review, QA, Production, Retired}. Only Certified/Production content reaches learners. Certification requires HIGH-confidence six-dimension verification (CAQS §1.6) + user approval + distractor tier map.

---

## 7. Complete Case Exemplar (all required fields — use as a template)

```javascript
{
  "CaseID": "CBQ21-B1",
  "Title": "Working Capital and the Cash Conversion Cycle",
  "SectionTags": ["B"],
  "BlueprintDomain": "Corporate Finance",
  "BlueprintObjectives": ["Manage working capital (cash, receivables, inventory, payables)", "Compute and interpret the cash conversion cycle"],
  "PrimaryCompetency": "Calculation",
  "EstimatedMinutes": 30,
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "ScenarioText": "Meridian Foods' CFO Ravi Patel must explain to the board why cash balances fell even as profit rose. The controller has prepared operating data for the past two quarters and the board has asked for a working-capital diagnosis before the credit line renewal.",
  "Industry": "Food processing",
  "CompanyType": "Manufacturer",
  "CompanyName": "Meridian Foods",
  "Stakeholder": "CFO Ravi Patel",
  "BusinessFunction": "Treasury",
  "QuestionCount": 6,
  "ExhibitCount": 2,
  "ProductionStatus": "Draft",
  "Version": "1.0",
  "CreatedDate": "2026-08-22",
  "ModifiedDate": "2026-08-22",
  "Author": "Case Author",
  "Confidence": 90,
  "LearningObjectives": [
    "Compute DIO, DSO, and DPO from operating data",
    "Compute and interpret the cash conversion cycle",
    "Quantify the cash released by a CCC reduction"
  ],
  "Exhibits": [
    {
      "ExhibitID": "CBQ21-B1-E1",
      "CaseID": "CBQ21-B1",
      "Type": "table",
      "Title": "Exhibit 1 — Operating Data",
      "Purpose": "Provides COGS, inventory, receivables, sales, payables, and purchases for CCC computation.",
      "ReferencedBy": ["CBQ21-B1-Q1", "CBQ21-B1-Q2"],
      "Headers": ["Quarter", "Sales", "COGS", "Avg Inventory", "Avg Receivables", "Avg Payables"],
      "Rows": [
        ["Q1", "$2,400,000", "$1,800,000", "$400,000", "$600,000", "$350,000"],
        ["Q2", "$2,640,000", "$2,040,000", "$520,000", "$750,000", "$380,000"]
      ],
      "DataFormat": "USD whole dollars",
      "AccuracyCheck": "Q2 = Q1 × 1.10 for sales and COGS"
    },
    {
      "ExhibitID": "CBQ21-B1-E2",
      "CaseID": "CBQ21-B1",
      "Type": "text",
      "Title": "Exhibit 2 — Board Email",
      "Purpose": "Sets the decision context: board asks for the cash-flow diagnosis and remediation options.",
      "ReferencedBy": ["CBQ21-B1-Q6"],
      "Body": "From: Board Audit Committee. Subject: Q2 cash position. Ravi — profit is up 10% but cash is down. Explain the gap and quantify what we can recover from working-capital improvements before the November credit-line renewal."
    }
  ],
  "Items": [
    {
      "ItemID": "CBQ21-B1-Q1",
      "Type": "numeric",
      "Prompt": "Enter Q2 days sales outstanding (DSO), rounded to one decimal.",
      "Correct": "103.7",
      "Explanation": "DSO = (Average Accounts Receivable / Net Credit Sales) × 365 = ($750,000 / $2,640,000) × 365 = 103.7 days (CB-10 component; FA-05 formula). Receivables grew faster than sales, stretching collections.",
      "Topic": "Days sales outstanding",
      "Difficulty": "Moderate",
      "DifficultyScore": 3,
      "CognitiveLevel": "Apply",
      "CalculationRequired": true,
      "FormulaReference": "FA-05",
      "ExplanationVersion": 1
    },
    {
      "ItemID": "CBQ21-B1-Q2",
      "Type": "select",
      "Prompt": "Which quarter shows the longer cash conversion cycle, and what drives the change?",
      "Correct": "B",
      "Choices": [
        "Q1 — inventory build-up dominates",
        "Q2 — DSO and DIO both lengthen",
        "Q2 — DPO lengthens more than DSO",
        "Q1 — DPO shortens faster than DSO"
      ],
      "Explanation": "Q2 CCC = DIO + DSO − DPO. Q2 DIO = ($520,000/$2,040,000)×365 = 93.0; Q2 DSO = 103.7; Q2 DPO = ($380,000/$2,080,000)×365 = 66.7. CCC = 130.0 days vs Q1 = 81.1 + 91.3 − 71.0 = 101.4. The correct driver is lengthening DSO and DIO (CB-10).",
      "Topic": "Cash conversion cycle",
      "Difficulty": "Difficult",
      "DifficultyScore": 4,
      "CognitiveLevel": "Analyze",
      "CalculationRequired": true,
      "FormulaReference": "CB-10",
      "ExplanationVersion": 1
    }
  ]
}
```

*(Exemplar truncated to 2 items for brevity; production cases must carry the full 5–7-item progression with all item fields.)*
