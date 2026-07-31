# Cluster Archival Rollback Log

**Date:** 2026-07-22
**Purpose:** Records archived questions for restoration if consolidation decision is reversed.

---

## Archived Questions

### P1-A-044 — Loss Contingency Range Disclosure 19

**Original content (pre-archival):**

```json
{
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.044 loss contingency range disclosure 19",
    "MicroTopic": "loss contingency range disclosure 19",
    "UniqueConceptKey": "A-044-loss-contingency-range-disclosure-19",
    "LOSTag": "A.2 Recognition, measurement, valuation, and disclosure",
    "Difficulty": "Easy",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Juniper faces a probable warranty loss. The best estimate is $62,800, and the reasonably possible range extends to $124,200. Which response is most appropriate?",
    "Choices": {
        "A": "Record nothing because warranties are estimates",
        "B": "Accrue $124,200 because it is the highest possible amount",
        "C": "Recognize the loss only when customers file claims",
        "D": "Accrue the best estimate and disclose the additional exposure if material"
    },
    "CorrectChoice": "D",
    "ExplanationCorrect": "A probable and estimable warranty loss is accrued; additional exposure may require disclosure.",
    "ExplanationWrongA": "Option A...DL-007 template",
    "ExplanationWrongB": "Option B...DL-007 template",
    "ExplanationWrongC": "Option C...DL-007 template",
    "ExplanationWrongD": ""
}
```

**Reason for archival:** Redundant to P1-A-034 within ASC 450 axis cluster. All five original clones tested the same axis (probable + best estimate → accrue + disclose). Consolidated as part of Sub-batch 2A Wave 3 close-out.

**Restoration command:** Remove `"question_state": "Archived"` and `"pedagogical_cluster": "ASC_450_axis_cluster"` (if present). Revert file to pre-consolidation state.

### P1-A-064 — Loss Contingency Range Disclosure 39

**Original content (pre-archival):**

```json
{
    "Part": 1,
    "Section": "A",
    "SectionName": "External Financial Reporting Decisions",
    "Topic": "A.064 loss contingency range disclosure 39",
    "MicroTopic": "loss contingency range disclosure 39",
    "UniqueConceptKey": "A-064-loss-contingency-range-disclosure-39",
    "LOSTag": "A.2 Recognition, measurement, valuation, and disclosure",
    "Difficulty": "Moderate",
    "ItemType": "MCQ",
    "ItemStyle": "single-select",
    "Stem": "Evergreen faces a probable warranty loss. The best estimate is $86,800, and the reasonably possible range extends to $160,200. Which response is most appropriate?",
    "Choices": {
        "A": "Accrue the best estimate and disclose the additional exposure if material",
        "B": "Accrue $160,200 because it is the highest possible amount",
        "C": "Recognize the loss only when customers file claims",
        "D": "Record nothing because warranties are estimates"
    },
    "CorrectChoice": "A",
    "ExplanationCorrect": "A probable and estimable warranty loss is accrued; additional exposure may require disclosure.",
    "ExplanationWrongA": "",
    "ExplanationWrongB": "Option B...DL-007 template",
    "ExplanationWrongC": "Option C...DL-007 template",
    "ExplanationWrongD": "Option D...DL-007 template"
}
```

**Reason for archival:** Redundant to P1-A-034 within ASC 450 axis cluster. Only variation was choice-order shuffling (correct answer at ChoiceA instead of ChoiceD). Not pedagogically distinct from 034.

**Known issue:** `VerifiedChecks` entry "Distractors written as plausible CMA-style traps" was inaccurate pre-archival (all distractors were DL-007 templates). This was a pre-existing metadata issue, not introduced by archival.

**Restoration command:** Remove file-level archival fields. Verify `ExplanationCorrect` and distractor explanations are still present in file (archival only marks metadata, does not delete content).

---

## Retention Policy

- Archived questions remain in `pack_a_corrected.js` with `question_state: "Archived"` metadata
- No content is deleted
- Full question text preserved in this rollback log for reference
- Restoration requires: removing archival metadata + optionally adding `pedagogical_cluster` membership
