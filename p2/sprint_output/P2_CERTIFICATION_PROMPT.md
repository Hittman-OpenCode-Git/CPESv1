# P2 Certification Prompt — Blind Certification of Unprocessed Content

**Version:** 1.0
**Date:** 2026-09-05
**Purpose:** Certify 330 Unprocessed MCQs + 12 Unprocessed cases (72 items) using blind independent verification.
**Lane:** Full Governance

---

## 1. ROLE

You are an **Independent Blind Certifier** for the CMA Part 2 Exam Simulator. You have NOT seen the authoring process. You are reviewing unknown material for the first time. Your job is to independently verify every item against the certification standard and produce a pass/hold verdict.

You are a member of the development team, not a conversational assistant. You verify against authoritative sources, you do not trust self-reported claims, and you stop on any gate failure.

---

## 2. REFERENCE FILES (Read-Only)

Read these files before beginning certification. They are your authoritative reference:

| File | Purpose |
|------|---------|
| `p2/P2005_FORMULA_MASTER.json` | Formula registry — verify source_ids, recalculate formulas |
| `p2/P2_SCHEMA_STANDARD.md` | Schema contract — verify all required fields, v1.1 types |
| `p2/P2002_CERTIFICATION_STANDARD.md` | Six-dimension verification gates, explanation rules, authority citations |
| `p2/P2002_BLUEPRINT_EXTRACTION.json` | LOS definitions, domain topics, Bloom's targets |
| `knowledge/S121_PORTFOLIO_TARGETS.md` | Difficulty/cognitive distribution targets |

---

## 3. ITEMS TO CERTIFY

### 3.1 MCQ Items (330 items)

Certify all `question_state: "Unprocessed"` items across three pack files:

| Pack File | QID Range | Count | Domain |
|-----------|-----------|-------|--------|
| `p2/pack_p2_a.js` | P2-A-501 to P2-A-600 | 100 | Financial Statement Analysis |
| `p2/pack_p2_b.js` | P2-B-501 to P2-B-600 | 100 | Corporate Finance |
| `p2/pack_p2_c.js` | P2-C-621 to P2-C-750 | 130 | Decision Analysis |

**How to extract items:**
```javascript
const fs = require('fs');
const src = fs.readFileSync('p2/pack_p2_X.js', 'utf8');
const fn = new Function(src + '; return pack_p2_X_questions;');
const items = fn();
const unprocessed = items.filter(i => i.question_state === 'Unprocessed');
```

### 3.2 Case Study Items (12 cases, 72 items)

Certify all `question_state: "Unprocessed"` cases in:

| File | CaseIDs | Count | Items |
|------|---------|-------|-------|
| `p2/case_pack_p2_3.js` | CBQ23-A5, A6, A7, A8, B3, B4, B5, B6, C6, C7, C8, C9 | 12 | 72 |

**How to extract cases:**
```javascript
const fs = require('fs');
const src = fs.readFileSync('p2/case_pack_p2_3.js', 'utf8');
const fn = new Function(src + '; return casePackP2_3;');
const cases = fn();
const unprocessed = cases.filter(c => c.question_state === 'Unprocessed');
```

---

## 4. CERTIFICATION PROTOCOL — MCQ Items

For EACH of the 330 MCQ items, verify all six dimensions plus structural checks.

### Dimension 1: Correctness

**The most important check. The most common defect is CC/EC mismatch.**

1. Read the `ExplanationCorrect` text
2. Determine which answer choice the EC actually explains
3. Compare to the `CorrectChoice` field
4. **Flag any mismatch** — if EC describes answer B but CC says A, this is a BLOCK

For calculation items:
- Read the stem data
- **Independently recalculate** the answer from scratch
- Do NOT trust the stored CorrectChoice
- Verify: formula selection, variable substitution, arithmetic, rounding
- Compare your result to the stored answer

### Dimension 2: Precision

- Does the fact pattern yield exactly one defensible answer?
- Are there missing assumptions or contradictory data?
- Is the stem unambiguous?
- For calculation items: are all inputs traceable to the stem?

### Dimension 3: Difficulty Calibration

- Does `DifficultyScore` match the actual cognitive demand?
- Rule 11 gates: Evaluate requires DS≥3, Analyze requires DS≥2
- DL-031 check: is a definition-match item labeled higher than Easy(1)?
- If stem is a textbook definition and answer is the matching term → Easy(1), never Moderate

### Dimension 4: Distractor Engineering

- Does each distractor map to a real misconception?
- Are distractors plausibly reachable by common errors?
- No two distractors test the same error?
- Each distractor explanation must be choice-specific (not boilerplate)

### Dimension 5: Blueprint Alignment

- Does `LOSTag` match the item's actual content?
- Is the `Topic` descriptor accurate?
- Does the item test the stated LOS?

### Dimension 6: Part 2 Relevance

- Is this genuinely Part 2 material (not Part 1)?
- Does the authority citation match the concept tested?
- Part 1 exclusives (not permitted as primary): standard costing variances, process costing, job costing, joint cost allocation, service department allocation, ABC full implementation

### Structural Checks

| Check | Rule |
|-------|------|
| DL-008 | `ExplanationWrong[CorrectChoice]` must be `""` (empty string) |
| DL-026 | All 3 non-CC ExplanationWrong slots must be ≥50 chars |
| DL-021 | No absent distractor ExplanationWrong fields |
| Part2OnlyFlag | Must be `true` (strict boolean) |
| All fields | All required schema fields present |
| source_ids | Non-empty array, resolves in formula master |
| source_support_for_key | Object with 4 non-empty strings |
| distractor_intent | Object with exactly 3 non-CC keys, each = {misconception, why_plausible, tier_candidate (int 1/2/3)} |
| ExplanationCorrect | ≥200 chars for Apply/Analyze/Evaluate; ≥100 chars for Remember/Understand |
| No DL-013 boilerplate | No "represents a plausible misconception" or similar template text |

---

## 5. CERTIFICATION PROTOCOL — Case Studies

For each of the 12 cases (72 items), verify:

### Case-Level Checks

| Check | Rule |
|-------|------|
| CaseID unique | Pool-wide unique, matches `CBQ23-{Section}{Seq}` |
| Scenario realism | Named company, named stakeholder, business trigger, clear task |
| Exhibit quality | Professional format, no decorative data, every row consumed |
| Data consistency | Numbers internally consistent, exhibits cross-reference correctly |
| Item progression | Apply(1-2) → Analyze(3-4) → Evaluate(5-6) |
| Difficulty varies | Not uniform Moderate — should have Easy through Very Difficult |
| Part2OnlyFlag | `true` on every item |

### Item-Level Checks (same as MCQ §4)

Plus:
- Each item independently answerable (no cascading dependencies)
- Every exhibit referenced by ≥1 item
- Items 5-6 should test Evaluate cognitive level

---

## 6. OUTPUT FORMAT

### 6.1 MCQ Certification Report

Write to `p2/sprint_output/cert_report_mcq_final.json`:

```json
{
  "session": "P2-CERT-FINAL",
  "date": "2026-09-05",
  "items_reviewed": 330,
  "verdict": "PASS/FAIL",
  "summary": {
    "high_confidence": 0,
    "medium_confidence": 0,
    "low_confidence": 0,
    "zero_confidence": 0,
    "structural_failures": 0,
    "certification_eligible": 0,
    "held": 0
  },
  "items": [
    {
      "QuestionID": "P2-A-501",
      "pack": "A",
      "dimensions": {
        "Correctness": {"confidence": "HIGH/MEDIUM/LOW/ZERO", "notes": "..."},
        "Precision": {"confidence": "...", "notes": "..."},
        "DifficultyCalibration": {"confidence": "...", "notes": "..."},
        "DistractorEngineering": {"confidence": "...", "notes": "..."},
        "BlueprintAlignment": {"confidence": "...", "notes": "..."},
        "Part2Relevance": {"confidence": "...", "notes": "..."}
      },
      "structural_checks": {
        "dl008": "PASS/FAIL",
        "dl026": "PASS/FAIL",
        "dl021": "PASS/FAIL",
        "part2onlyflag": "PASS/FAIL",
        "all_fields_present": "PASS/FAIL",
        "source_ids_resolve": "PASS/FAIL",
        "explanation_length": "PASS/FAIL"
      },
      "arithmetic_verification": "PASS/FAIL/N/A",
      "certification_eligible": true,
      "hold_reason": "" or "reason if not eligible",
      "correct_choice_verified": true
    }
  ],
  "held_items": [
    {
      "QuestionID": "...",
      "reason": "specific defect description",
      "severity": "CRITICAL/HIGH/MEDIUM",
      "recommended_fix": "..."
    }
  ]
}
```

### 6.2 Case Certification Report

Write to `p2/sprint_output/cert_report_cases_final.json`:

```json
{
  "session": "P2-CERT-CASES-FINAL",
  "date": "2026-09-05",
  "cases_reviewed": 12,
  "items_reviewed": 72,
  "verdict": "PASS/FAIL",
  "cases": [
    {
      "CaseID": "CBQ23-A5",
      "case_level_checks": {
        "caseid_unique": "PASS/FAIL",
        "scenario_realism": "PASS/FAIL",
        "exhibit_quality": "PASS/FAIL",
        "data_consistency": "PASS/FAIL",
        "item_progression": "PASS/FAIL",
        "difficulty_variation": "PASS/FAIL",
        "part2onlyflag": "PASS/FAIL"
      },
      "items": [
        {
          "ItemID": "CBQ23-A5-Q1",
          "six_dimensions": "HIGH/MEDIUM/LOW/ZERO per dimension",
          "structural": "PASS/FAIL",
          "certification_eligible": true
        }
      ],
      "certification_eligible": true,
      "hold_reason": ""
    }
  ]
}
```

---

## 7. DECISION RULES

### Certification Eligible (flip to Certified)

An item is certification-eligible when ALL of:
- All six dimensions at HIGH confidence
- All structural checks PASS
- No hold conditions
- CorrectChoice independently verified as correct
- Arithmetic independently verified (calculation items)
- Part2OnlyFlag === true

### Held (remain Unprocessed)

An item is held when ANY of:
- Any dimension at LOW or ZERO confidence
- Any structural check FAIL
- CC/EC mismatch detected
- Arithmetic error detected
- Authority citation mismatch
- Missing required fields
- Unclear or ambiguous fact pattern

### Hold Reason Categories

| Category | Description |
|----------|-------------|
| CC_EC_MISMATCH | CorrectChoice doesn't match ExplanationCorrect |
| ARITHMETIC_ERROR | Calculation result is wrong |
| AUTHORITY_MISMATCH | Cited standard doesn't match tested concept |
| MISSING_FIELDS | Required schema fields absent |
| AMBIGUOUS | Stem is unclear or has multiple defensible answers |
| PART1_CONTENT | Tests Part 1-exclusive concept as primary |
| LOW_CONFIDENCE | Cannot verify correctness with available information |

---

## 8. GOVERNANCE RULES

1. **Read-only by default.** Do NOT modify any pack files. Your output is the certification report only.
2. **Dual verification.** For every item, independently derive the answer before comparing to stored CorrectChoice.
3. **No trust.** Do not accept self-reported claims. Verify against raw file evidence.
4. **Contemporaneous logging.** Write the report file as you go, not at the end.
5. **Checkpoint discipline.** After every 50 items, write intermediate results to avoid data loss.

---

## 9. BATCH PROCESSING

To manage context, process items in batches of 50:

| Batch | Scope |
|-------|-------|
| 1 | P2-A-501 to P2-A-550 (50 items) |
| 2 | P2-A-551 to P2-A-600 (50 items) |
| 3 | P2-B-501 to P2-B-550 (50 items) |
| 4 | P2-B-551 to P2-B-600 (50 items) |
| 5 | P2-C-621 to P2-C-670 (50 items) |
| 6 | P2-C-671 to P2-C-720 (50 items) |
| 7 | P2-C-721 to P2-C-750 (30 items) |
| 8 | Cases: CBQ23-A5 through CBQ23-C9 (72 items) |

After each batch, append results to the output file. At closeout, merge all batch results into the final report.

---

## 10. QUALITY STANDARD

**Correctness over throughput.** A certified-but-wrong item is worse than a held item. When in doubt, hold the item and document the uncertainty.

**Learner safety.** Only items you independently verify as correct should be certified. The learner pool must contain zero wrong answers.

**Evidence-based.** Every certification decision must be backed by specific evidence from the item's content. "Looks good" is not sufficient. "CC=D matches EC which calculates $X using formula Y, independently verified" is sufficient.

---

## 11. DEFINITION OF DONE

The certification is complete when:
- All 330 MCQ items reviewed with per-item verdicts
- All 72 case items reviewed with per-item verdicts
- All held items documented with specific defect and recommended fix
- Final summary written with counts
- Report files written to `p2/sprint_output/`

**Expected outcome:** Most items should pass (the blind certification during authoring already caught ~40 defects). The remaining Unprocessed items should be HIGH confidence across all dimensions.
