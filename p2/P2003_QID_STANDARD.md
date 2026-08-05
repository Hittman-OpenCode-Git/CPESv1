# P2003 — CMA Part 2 QID & Identifier Standard v2.0

**Version:** 2.0 (Schema Lock — CSO Weight Reallocation)
**Status:** Active — Part 2 Architecture
**Authority:** P2_SCHEMA_STANDARD.md v1.0, P2_EXPANSION_PLAN.md, P2001_PART2_BLUEPRINT_FOUNDATION.md
**Date:** 2026-07-29 (v1.0), **2026-08-04** (v2.0)
**Session:** P2-003 (v1.0) → P2-020 Schema Lock (v2.0)
**Scope:** Single source of truth for all CMA Part 2 identifier generation (MCQ QIDs, CaseIDs, ItemIDs, ExhibitIDs)
**Amended by:** P2_EXPANSION_PLAN.md §0.1 (CSO weights), §3 (6-pack layout), P2_SCHEMA_STANDARD.md (field schema)

---

## 1. MCQ QID Standard

### 1.1 QID Format

**Pattern:** `P2-{Section}-{NNN}`
**Regex:** `^P2-[A-F]-\d{3}$`
**Range regex (per section):**
- A, B: `^P2-[AB]-(0[0-9]{2}|[1-4][0-9]{2}|500)$`
- C: `^P2-C-(0[0-9]{2}|[1-5][0-9]{2}|6[0-1][0-9]|62[0-5])$`  (001–625)
- D, E: `^P2-[DE]-(0[0-9]{2}|[12][0-4][0-9]|250)$`  (001–250)
- F: `^P2-F-(0[0-9]{2}|[1-2][0-9]{2}|3[0-6][0-9]|37[0-5])$`  (001–375)

| Component | Description | Examples |
|-----------|-------------|----------|
| `P2` | Exam Part identifier | Always `P2` for Part 2 |
| `-` | Separator | Required |
| `{Section}` | Domain letter A through F | `A` through `F` |
| `-` | Separator | Required |
| `{NNN}` | Zero-padded 3-digit sequence number | `001` through `500` |

### 1.2 Section Assignments (CSO Weight-Faithful — 6 Packs)

| Section | Domain | CSO Weight | QID Range | Pack File | Count |
|---------|--------|------------|-----------|-----------|-------|
| A | Financial Statement Analysis | 20% | P2-A-001 to P2-A-500 | pack_p2_a.js | 500 |
| B | Corporate Finance | 20% | P2-B-001 to P2-B-500 | pack_p2_b.js | 500 |
| C | Decision Analysis | 25% | P2-C-001 to P2-C-625 | pack_p2_c.js | **625** |
| D | Risk Management | 10% | P2-D-001 to P2-D-250 | pack_p2_d.js | 250 |
| E | Investment Decisions | 10% | P2-E-001 to P2-E-250 | pack_p2_e.js | 250 |
| F | Professional Ethics | 15% | P2-F-001 to P2-F-375 | pack_p2_f.js | 375 |

**Total: 2,500 MCQs across 6 pack files.**

> **Amendment (v2.0):** The original v1.0 5-pack layout allocated a flat 500 items to Domain C (25% CSO weight) and placed cross-domain items at P2-F-376–500. This created a 125-item shortfall in C — the heaviest domain on the exam. v2.0 corrects this:
> - **Domain C:** 500 → 625 (matches 25% CSO weight)
> - **Cross-domain phantom pack dissolved.** Items that test multiple domains are tagged via `CrossDomainTags: ["B","E"]` on their primary-domain record. ~125 items (~5%) are expected to carry a secondary tag.
> - **Pack F promoted to dedicated pack.** Domain F (Professional Ethics, 15%) now occupies its own pack file.

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
- Target: ~125 items (5%) carry at least one secondary tag
- Items with cross-domain tags count against their primary domain's allocation, not a separate pool

### 1.3 QID Generation Rules

1. Section letter matches the item's internal `Section` field exactly (A-F).
2. Sequence numbers are zero-padded to 3 digits (`001`–`500`).
3. No gaps allowed — sequence numbers must be consecutive within each section block.
4. No reuse — once a QID is assigned, it is never reassigned.
5. QIDs are globally unique across all 5 packs (enforced by section letter prefix).
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

### 2.3 Pack 1 Section Assignments (25 cases)

| Section | Domain | CaseID Range | Cases |
|---------|--------|-------------|-------|
| A | Financial Statement Analysis | CBQ2-A1 to CBQ2-A6 | 6 |
| B | Corporate Finance | CBQ2-B1 to CBQ2-B5 | 5 |
| C | Decision Analysis | CBQ2-C1 to CBQ2-C6 | 6 |
| D | Risk Management | CBQ2-D1 to CBQ2-D3 | 3 |
| E | Investment Decisions | CBQ2-E1 to CBQ2-E3 | 3 |
| F | Professional Ethics | CBQ2-F1 to CBQ2-F2 | 2 |

### 2.4 Pack 2 Section Assignments (25 cases)

| Section | Domain | CaseID Range | Cases |
|---------|--------|-------------|-------|
| A | Financial Statement Analysis | CBQ22-A1 to CBQ22-A4 | 4 |
| B | Corporate Finance | CBQ22-B1 to CBQ22-B5 | 5 |
| C | Decision Analysis | CBQ22-C1 to CBQ22-C6 | 6 |
| D | Risk Management | CBQ22-D1 to CBQ22-D3 | 3 |
| E | Investment Decisions | CBQ22-E1 to CBQ22-E2 | 2 |
| F | Professional Ethics | CBQ22-F1 to CBQ22-F5 | 5 |

### 2.5 Pack 3 Section Assignments (25 cases)

| Section | Domain | CaseID Range | Cases |
|---------|--------|-------------|-------|
| A | Financial Statement Analysis | CBQ23-A1 to CBQ23-A5 | 5 |
| B | Corporate Finance | CBQ23-B1 to CBQ23-B5 | 5 |
| C | Decision Analysis | CBQ23-C1 to CBQ23-C6 | 6 |
| D | Risk Management | CBQ23-D1 to CBQ23-D2 | 2 |
| E | Investment Decisions | CBQ23-E1 to CBQ23-E2 | 2 |
| F | Professional Ethics | CBQ23-F1 to CBQ23-F5 | 5 |

### 2.6 Domain-Level Case Totals

| Domain | Pack 1 | Pack 2 | Pack 3 | Total Cases | Items (est.) |
|--------|--------|--------|--------|-------------|-------------|
| A | 6 | 4 | 5 | **15** | 75–90 |
| B | 5 | 5 | 5 | **15** | 75–90 |
| C | 6 | 6 | 6 | **18** | 90–108 |
| D | 3 | 3 | 2 | **8** | 40–48 |
| E | 3 | 2 | 2 | **7** | 35–42 |
| F | 2 | 5 | 5 | **12** | 60–72 |
| **Total** | **25** | **25** | **25** | **75** | **375–450** |

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
- N ranges 1–6 (min 5 items, max 6 per case)
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
| Uniqueness | Every QID must be unique across all 5 packs | Error |
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
| Version | 2.0 |
| Date | 2026-08-04 |
| Session | P2-020 — Schema Lock |
| Status | Active |
| Amends | v1.0 → 6-pack layout, C 001–625 range, cross-domain→tags, ratified field schema |
| See also | P2_SCHEMA_STANDARD.md, P2_EXPANSION_PLAN.md |
