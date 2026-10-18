# P2003 — CMA Part 2 QID & Identifier Standard v3.0

**Version:** 3.0 (Pack Goal Revision — 3,450 MCQs)
**Status:** Active — Part 2 Architecture
**Authority:** P2_SCHEMA_STANDARD.md v1.0, P2_EXPANSION_PLAN.md, P2001_PART2_BLUEPRINT_FOUNDATION.md
**Date:** 2026-07-29 (v1.0), 2026-08-04 (v2.0), **2026-09-04** (v3.0)
**Session:** P2-003 (v1.0) → P2-020 Schema Lock (v2.0) → P2-079 Pack Goal Revision (v3.0)
**Scope:** Single source of truth for all CMA Part 2 identifier generation (MCQ QIDs, CaseIDs, ItemIDs, ExhibitIDs)
**Amended by:** P2_EXPANSION_PLAN.md §0.1 (CSO weights), §3 (6-pack layout), P2_SCHEMA_STANDARD.md (field schema)

---

## 1. MCQ QID Standard

### 1.1 QID Format

**Pattern:** `P2-{Section}-{NNN}`
**Regex:** `^P2-[A-F]-\d{3}$`
**Range regex (per section):**
- A: `^P2-A-(0[0-9]{2}|[1-5][0-9]{2}|600)$`  (001–600)
- B: `^P2-B-(0[0-9]{2}|[1-5][0-9]{2}|600)$`  (001–600)
- C: `^P2-C-(0[0-9]{2}|[1-6][0-9]{2}|7[0-4][0-9]|750)$`  (001–750)
- D: `^P2-D-(0[0-9]{2}|[1-4][0-9]{2}|500)$`  (001–500)
- E: `^P2-E-(0[0-9]{2}|[1-4][0-9]{2}|500)$`  (001–500)
- F: `^P2-F-(0[0-9]{2}|[1-4][0-9]{2}|500)$`  (001–500)

| Component | Description | Examples |
|-----------|-------------|----------|
| `P2` | Exam Part identifier | Always `P2` for Part 2 |
| `-` | Separator | Required |
| `{Section}` | Domain letter A through F | `A` through `F` |
| `-` | Separator | Required |
| `{NNN}` | Zero-padded 3-digit sequence number | `001` through `500` |

### 1.2 Section Assignments (CSO Weight-Faithful — 6 Packs, revised 2026-09-04)

Sizing rule: 25% CSO weight → 750 items, 20% → 600, ≤15% → 500.

| Section | Domain | CSO Weight | QID Range | Pack File | Target Count |
|---------|--------|-----------|-----------|-----------|-------------|
| A | Financial Statement Analysis | 20% | P2-A-001 to P2-A-600 | pack_p2_a.js | **600** |
| B | Corporate Finance | 20% | P2-B-001 to P2-B-600 | pack_p2_b.js | **600** |
| C | Decision Analysis | 25% | P2-C-001 to P2-C-750 | pack_p2_c.js | **750** |
| D | Enterprise Risk Management | 10% | P2-D-001 to P2-D-500 | pack_p2_d.js | **500** |
| E | Capital Investment Decisions | 10% | P2-E-001 to P2-E-500 | pack_p2_e.js | **500** |
| F | Professional Ethics | 15% | P2-F-001 to P2-F-500 | pack_p2_f.js | **500** |
| **Total** | | **100%** | | | **3,450** |

**Total: 3,450 MCQs across 6 pack files (600×2 + 750 + 500×3).**

> **Amendment (v3.0):** Revised pack sizing per user authorization (2026-09-04). Prior v2.0 allocated 3,250 MCQs (A=500, B=500, C=750, D=500, E=500, F=500). v3.0 increases A and B to 600 each to better match their 20% CSO weight. The 500-item floor for D/E/F (≤15% CSO weight) is retained to ensure viable difficulty distribution and certification depth.

### 1.2a Cross-Domain Tagging (replaces phantom pack)

Items that test concepts spanning multiple domains use the `CrossDomainTags` array:

```jsonc
{
  "Section": "B",                    // primary domain
  "QuestionID": "P2-B-042",
  "CrossDomainTags": ["E"]           // also tests Investment Decisions
}
```

- Primary domain determines the QID section letter and pack file
- Secondary domains are listed in `CrossDomainTags`
- Target: ~175 items (5%) carry at least one secondary tag
- Items with cross-domain tags count against their primary domain's allocation, not a separate pool

### 1.3 QID Generation Rules

1. Section letter matches the item's internal `Section` field exactly (A-F).
2. Sequence numbers are zero-padded to 3 digits (`001`–`600` for A/B, `001`–`750` for C, `001`–`500` for D/E/F).
3. No gaps allowed — sequence numbers must be consecutive within each section block.
4. No reuse — once a QID is assigned, it is never reassigned.
5. QIDs are globally unique across all 6 packs (enforced by section letter prefix).
6. Every QID must parse cleanly via the uniform regex `^P2-[A-F]-\d{3}$`.

### 1.4 Complete MCQ Item JSON Skeleton (Ratified — P2_SCHEMA_STANDARD.md v1.0)

```jsonc
{
  "Part": 2,
  "Section": "A",
  "Topic": "A.001 liquidity current ratio",
  "QuestionID": "P2-A-001",
  "question_state": "Unprocessed",
  "Part2OnlyFlag": true,
  "UniqueConceptKey": "A-001-liquidity-current-ratio",
  "Stem": "",
  "Choices": { "A": "", "B": "", "C": "", "D": "" },
  "CorrectChoice": "",
  "ExplanationCorrect": "",
  "ExplanationWrongA": "",
  "ExplanationWrongB": "",
  "ExplanationWrongC": "",
  "ExplanationWrongD": "",
  "Difficulty": "Moderate",
  "DifficultyScore": 3,
  "CognitiveLevel": "Apply",
  "CalculationItem": false,
  "ItemStyle": "single-select",
  "LOSTag": "A.1",
  "BlueprintDomain": "Financial Statement Analysis",
  "FormulaReference": "",
  "CommonTrapReference": "",
  "Authorities": [],
  "VerifiedChecks": [
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified",
    "Independent answer derived",
    "Authority citations match tested concept"
  ],
  "CrossDomainTags": [],
  "DecisionTreeReference": "",
  "pedagogical_cluster": "",
  "certification_date": "",
  "certification_batch": ""
}
```

> **v2.0 changes from v1.0:** `Type` → `ItemStyle` (avoids engine collision with case-item scoring), `VerificationChecks` → `VerifiedChecks` (Part 1 convention), added `UniqueConceptKey` (dedup signal), `CrossDomainTags` (replaces phantom pack), `Authorities` array. Dropped `Industry`, `CompanyType`, `Stakeholder`, `BusinessFunction`, `Scale` — 5 case-study metadata fields that leaked into MCQ skeleton.

### 1.5 MCQ Metadata Field Reference

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `Part` | Integer | Yes | Must be `2` |
| `Section` | String | Yes | A–F (one letter per item) |
| `Topic` | String | Yes | Controlled vocabulary: `{Section}.{NNN} {descriptor}` |
| `QuestionID` | String | Yes | Format: `P2-{Section}-{NNN}` |
| `question_state` | String | Yes | `Unprocessed` / `In Audit` / `Editorial Queue` / `Certified` / `Archived` |
| `Part2OnlyFlag` | Boolean | **Yes** 🔴 | Must be `true` — Rule 13 BLOCKs certification if absent/false |
| `UniqueConceptKey` | String | **Yes** 🔴 | `{Section}-{NNN}-{kebab-desc}`. Highest-precedence dedup signal. |
| `Stem` | String | Yes | Question text |
| `Choices` | Object | Yes | `{ "A": "...", "B": "...", "C": "...", "D": "..." }` |
| `CorrectChoice` | String | Yes | One of: `"A"`, `"B"`, `"C"`, `"D"` |
| `ExplanationCorrect` | String | Yes | Minimum 50 characters; must reference Part 2 authority |
| `ExplanationWrongA` | String | Yes | ≥50 chars if A ≠ CC; `""` if A = CC |
| `ExplanationWrongB` | String | Yes | ≥50 chars if B ≠ CC; `""` if B = CC |
| `ExplanationWrongC` | String | Yes | ≥50 chars if C ≠ CC; `""` if C = CC |
| `ExplanationWrongD` | String | Yes | ≥50 chars if D ≠ CC; `""` if D = CC |
| `Difficulty` | String | Yes | `Easy` / `Moderate-Easy` / `Moderate` / `Difficult` / `Very Difficult` |
| `DifficultyScore` | Integer | Yes | 1–5 |
| `CognitiveLevel` | String | Yes | `Remember` / `Understand` / `Apply` / `Analyze` / `Evaluate` |
| `CalculationItem` | Boolean | Yes | `true` if item requires arithmetic computation |
| `ItemStyle` | String | Yes 🔴 | `single-select` / `multi-select` / `numeric` / `fill` / `match` |
| `LOSTag` | String | Yes | e.g. `"A.1"`, `"C.4"` |
| `BlueprintDomain` | String | Yes | Full CSO domain name |
| `FormulaReference` | String | — | Links to FORMULA_MASTER_P2.md |
| `CommonTrapReference` | String | — | Named distractor trap pattern |
| `Authorities` | Array | — | Governing standards/citations |
| `VerifiedChecks` | Array | Yes | Structural verification checklist |
| `CrossDomainTags` | Array | — | Secondary domain tags `["B","E"]` — replaces phantom cross-domain pack |
| `DecisionTreeReference` | String | — | Links to decision tree document |
| `pedagogical_cluster` | String | — | Session composition dedup |
| `certification_date` | String | — | Written at certification |
| `certification_batch` | String | — | Written at certification |

🔴 = Engine-critical field. Shared Part 1/Part 2 scoring, pool, and dedup code reads by exact name.

---

## 2. CaseID Standard

### 2.1 CaseID Format

**Pattern:** `CBQ2{PackNum}-{Section}{Seq}`

| Component | Description | Examples |
|-----------|-------------|----------|
| `CBQ` | Literal prefix — "CMA Board Question" | All cases |
| `2` | Exam Part identifier | Always `2` for Part 2 |
| `{PackNum}` | Case pack number (omitted for pack 1) | `""` (pack 1), `2` (pack 2), `3` (pack 3) |
| `-` | Separator | Required |
| `{Section}` | Domain letter A through F | `A` through `F` |
| `{Seq}` | Sequential integer within section and pack | `1`, `2`, `3`, ... |

### 2.2 CaseID Regex by Pack

| Pack | Pattern | Regex | Example |
|------|---------|-------|---------|
| Pack 1 | `CBQ2-{Section}{Seq}` | `^CBQ2-[A-F]\d+$` | `CBQ2-A1` |
| Pack 2 | `CBQ22-{Section}{Seq}` | `^CBQ22-[A-F]\d+$` | `CBQ22-B5` |
| Pack 3 | `CBQ23-{Section}{Seq}` | `^CBQ23-[A-F]\d+$` | `CBQ23-C3` |

### 2.3 Pack 1 Section Assignments (33 cases)

| Section | Domain | CaseID Range | Cases |
|---------|--------|-------------|-------|
| A | Financial Statement Analysis | CBQ2-A1 to CBQ2-A8 | 8 |
| B | Corporate Finance | CBQ2-B1 to CBQ2-B6 | 6 |
| C | Decision Analysis | CBQ2-C1 to CBQ2-C8 | 8 |
| D | Risk Management | CBQ2-D1 to CBQ2-D4 | 4 |
| E | Investment Decisions | CBQ2-E1 to CBQ2-E4 | 4 |
| F | Professional Ethics | CBQ2-F1 to CBQ2-F3 | 3 |

### 2.4 Pack 2 Section Assignments (33 cases)

| Section | Domain | CaseID Range | Cases |
|---------|--------|-------------|-------|
| A | Financial Statement Analysis | CBQ22-A1 to CBQ22-A5 | 5 |
| B | Corporate Finance | CBQ22-B1 to CBQ22-B6 | 6 |
| C | Decision Analysis | CBQ22-C1 to CBQ22-C8 | 8 |
| D | Risk Management | CBQ22-D1 to CBQ22-D4 | 4 |
| E | Investment Decisions | CBQ22-E1 to CBQ22-E3 | 3 |
| F | Professional Ethics | CBQ22-F1 to CBQ22-F7 | 7 |

### 2.5 Pack 3 Section Assignments (34 cases)

| Section | Domain | CaseID Range | Cases |
|---------|--------|-------------|-------|
| A | Financial Statement Analysis | CBQ23-A1 to CBQ23-A6 | 6 |
| B | Corporate Finance | CBQ23-B1 to CBQ23-B6 | 6 |
| C | Decision Analysis | CBQ23-C1 to CBQ23-C8 | 8 |
| D | Risk Management | CBQ23-D1 to CBQ23-D3 | 3 |
| E | Investment Decisions | CBQ23-E1 to CBQ23-E3 | 3 |
| F | Professional Ethics | CBQ23-F1 to CBQ23-F8 | 8 |

### 2.6 Domain-Level Case Totals

| Domain | Pack 1 | Pack 2 | Pack 3 | Total Cases | Items (est.) |
|--------|--------|--------|--------|-------------|-------------|
| A | 8 | 5 | 6 | **19** | 95–114 |
| B | 6 | 6 | 6 | **18** | 90–108 |
| C | 8 | 8 | 8 | **24** | 120–144 |
| D | 4 | 4 | 3 | **11** | 55–66 |
| E | 4 | 3 | 3 | **10** | 50–60 |
| F | 3 | 7 | 8 | **18** | 90–108 |
| **Total** | **33** | **33** | **34** | **100** | **500–600** |

---

## 3. ItemID Standard (Case Items)

**Pattern:** `{CaseID}-Q{N}`
**Regex:** `^CBQ2\d?-[A-F]\d+-Q\d+$`

| ItemID | CaseID | Position |
|--------|--------|----------|
| `CBQ2-A1-Q1` | CBQ2-A1 | First item (Pack 1) |
| `CBQ22-B5-Q3` | CBQ22-B5 | Third item (Pack 2) |
| `CBQ23-F2-Q6` | CBQ23-F2 | Sixth item (Pack 3) |

Constraints:
- N ranges 1–7 (min 5 items, max 7 per case, per QUESTION_METADATA_STANDARD.md §1.1)
- Sequential within case, no gaps
- Cognitive progression: Q1–Q2 = Apply, Q3–Q4 = Analyze, Q5 = Evaluate, Q6 (optional) = Evaluate/Synthesize

---

## 4. ExhibitID Standard

**Pattern:** `{CaseID}-E{N}`
**Regex:** `^CBQ2\d?-[A-F]\d+-E\d+$`

| ExhibitID | CaseID |
|-----------|--------|
| `CBQ2-A1-E1` | CBQ2-A1 |
| `CBQ23-F5-E3` | CBQ23-F5 |

---

## 5. Collision Prevention

### 5.1 Part 1 vs Part 2 QID Comparison

| Property | Part 1 | Part 2 | Collision? |
|----------|--------|--------|------------|
| Prefix | P1 or P1{B,C,D,E} | P2 | No |
| Section | A-F | A-F | N/A (prefix distinguishes) |

### 5.2 Part 1 vs Part 2 CaseID Comparison

| Property | Part 1 | Part 2 | Collision? |
|----------|--------|--------|------------|
| Prefix | CBQ or CBQ{N} where N≥2 | CBQ2 or CBQ2{N} | No |

### 5.3 Identifier Routing Function

```javascript
function routeIdentifier(id) {
  if (/^P1[A-E]?-[A-F]-\d{3}$/.test(id)) return 'Part1_MCQ';
  if (/^P1[A-E]?-E-R\d{2}$/.test(id)) return 'Part1_MCQ';
  if (/^P2-[A-F]-\d{3}$/.test(id)) return 'Part2_MCQ';
  if (/^CBQ\d?-[A-F]\d+$/.test(id)) return 'Part1_Case';
  if (/^CBQ2\d?-[A-F]\d+$/.test(id)) return 'Part2_Case';
  throw new Error(`Unknown identifier format: ${id}`);
}
```

---

## 6. Quick Reference Card

| Identifier Type | Pattern | Regex | Example |
|----------------|---------|-------|---------|
| MCQ QID | `P2-{Section}-{NNN}` | `^P2-[A-F]-\d{3}$` | `P2-A-001` |
| CaseID (Pack 1) | `CBQ2-{Section}{Seq}` | `^CBQ2-[A-F]\d+$` | `CBQ2-A1` |
| CaseID (Pack 2) | `CBQ22-{Section}{Seq}` | `^CBQ22-[A-F]\d+$` | `CBQ22-B5` |
| CaseID (Pack 3) | `CBQ23-{Section}{Seq}` | `^CBQ23-[A-F]\d+$` | `CBQ23-C3` |
| CaseID (unified) | `CBQ2{PackNum}-{Section}{Seq}` | `^CBQ2\d?-[A-F]\d+$` | `CBQ2-A1` |
| ItemID | `{CaseID}-Q{N}` | `^CBQ2\d?-[A-F]\d+-Q\d+$` | `CBQ2-A1-Q3` |
| ExhibitID | `{CaseID}-E{N}` | `^CBQ2\d?-[A-F]\d+-E\d+$` | `CBQ2-A1-E1` |
| MCQ pack file | `pack_p2_{letter}.js` | `^pack_p2_[a-f]\.js$` | `pack_p2_a.js` |
| Case pack file | `case_pack_p2_{n}.js` | `^case_pack_p2_[1-3]\.js$` | `case_pack_p2_1.js` |

---

## 7. Validation Rules

### 7.1 QID Validator Checks

| Check | Rule | Severity |
|-------|------|----------|
| Format | Every QID must match `^P2-[A-F]-\d{3}$` | Error |
| Uniqueness | Every QID must be unique across all 6 packs | Error |
| Section match | Section letter must match item's `Section` field | Error |
| Range | Sequence number within defined range | Error |
| Consecutive | No gaps in sequence numbers | Warning |
| Part2OnlyFlag | Must be present and `true` | Error |

### 7.2 CaseID Validator Checks

| Check | Rule | Severity |
|-------|------|----------|
| Format | Must match `^CBQ2\d?-[A-F]\d+$` | Error |
| Uniqueness | Unique across all 3 case packs | Error |
| Pack correspondence | `CBQ2*` → pack 1, `CBQ22*` → pack 2, `CBQ23*` → pack 3 | Error |
| Domain count | Per-domain totals match targets | Warning |

---

## 8. Prohibited Patterns

| Anti-Pattern | Correct Pattern |
|-------------|----------------|
| Per-pack QID prefix variation (e.g., `P2B-A-001`) | Always `P2-{Section}-{NNN}` |
| Dual-block architecture | Single-object JSON per item |
| `_corrected` suffix | `pack_p2_a.js` |
| Gaps in sequence numbers | Consecutive numbers |
| Reused QIDs or CaseIDs | Globally unique IDs |
| Missing `Part2OnlyFlag` | Mandatory `true` on every item |
| Missing `"Part": 2` | Mandatory on every item |
| `"Type"` field on MCQ items | Use `"ItemStyle"` (reserved for case-item scoring discriminator) |
| `"VerificationChecks"` (old spelling) | Use `"VerifiedChecks"` (Part 1 convention) |
| `"Industry"`, `"CompanyType"`, `"Stakeholder"`, `"BusinessFunction"`, `"Scale"` on MCQs | Dropped — case-study metadata, not used by engine |

---

**Document Control:**

| Property | Value |
|----------|-------|
| Document ID | P2003 |
| Version | **3.0** |
| Date | **2026-09-04** |
| Session | P2-079 — Pack Goal Revision |
| Status | Active |
| Amends | v2.0 → 3,450 MCQs, A/B 001–600, one domain per pack |
| See also | P2_SCHEMA_STANDARD.md, P2_EXPANSION_PLAN.md |

**Revision History:**

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-29 | Initial QID standard — 5-pack layout, 2,500 MCQs |
| 2.0 | 2026-08-04 | CSO weight reallocation — 6-pack layout, 3,250 MCQs, C 001–750 |
| **3.0** | **2026-09-04** | **Pack goal revision — 3,450 MCQs. Sizing rule: 25% → 750, 20% → 600, ≤15% → 500. A/B extended to 001–600.** |
