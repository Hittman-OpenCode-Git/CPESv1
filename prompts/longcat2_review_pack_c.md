# Longcat 2.0 Review Prompt — CMA Part 1 Pack C (Third-Party Content Review)

## Context

You are reviewing **Pack C** of the CMA Part 1 Exam Simulator question bank. This pack contains **500 multiple-choice questions** spanning all six CMA Part 1 domains (A–F). The questions have been split into **56 verbatim parts** (≤40KB each, ~10K tokens) so your retrieval index can fully ingest each part without prefix truncation.

## Source File

- **Original**: `content/packs/pack_c_corrected.js` (2,183,715 bytes, SHA256: `b9610ddc99db75ca5d0543f8f1966f07a60478a46ff2d59a8a2acae3d46ce102`)
- **Parts directory**: `content/packs/review_parts/pack_c/` (56 files: `pack_c_part_001.js` through `pack_c_part_056.js`)
- **Manifest**: `content/packs/review_parts/pack_c/pack_c_review_manifest.json` — contains part→QID mapping, sizes, and verification proof

## Verification Protocol (Mandatory Before Review)

**Step 1 — Control Test**: Attach `pack_c_part_001.js` (contains P1-AC-001 through P1-AC-009). Confirm your tool finds `P1-AC-001` and returns its full question object.

**Step 2 — Concat Proof**: The manifest's `verification.byteMatch: true` proves the 56 parts concatenate to reproduce the source array byte-for-byte. No gaps, no duplicates.

**Step 3 — Literal Search**: Use exact QID queries (e.g., `"P1-AC-001"`, `"P1-BC-094"`, `"P1-FC-075"`). Do NOT rely on semantic search — this pack uses literal IDs.

## Review Scope

Evaluate each question against the **CAQS v1.0** quality standard (Gold Standard Checklist, §14.2):

### Structural Integrity
- [ ] Valid JSON structure, all required fields present
- [ ] `QuestionID` unique, follows pattern `P1-{Section}C-{NNN}` (AC, BC, CC, DC, EC, FC)
- [ ] `CorrectChoice` ∈ {A,B,C,D}, `ExplanationWrong[CorrectChoice]` = `""` (EV8)
- [ ] All 4 `Choices.{A,B,C,D}` present, non-empty
- [ ] `ExplanationCorrect` ≥ 50 chars, references accounting principle by name
- [ ] Each `ExplanationWrong{X}` (X ≠ CorrectChoice) ≥ 50 chars, choice-specific

### Content Quality (CAQS §2 Rubric)
- [ ] **Blueprint Alignment** (20%): Maps to specific IMA LOS, not generic topic
- [ ] **Cognitive Level** (15%): Bloom's level matches question demand (Remember/Understand/Apply/Analyze/Evaluate)
- [ ] **Technical Accuracy** (15%): Answer correct under GAAP/COSO/IMA CSO; no invented standards
- [ ] **Distractor Quality** (15%): Each distractor targets a documented misconception/exam trap
- [ ] **Business Realism** (10%): Scenario uses executive language, plausible facts, named stakeholder
- [ ] **Numerical Integrity** (10%): Calculations independently verifiable, rounding per §5.2
- [ ] **Explanation Quality** (10%): Mini-lesson: principle + solution + business interpretation + distractor analysis + trap
- [ ] **Writing Clarity** (5%): Professional tone, no grammar errors
- [ ] **Accessibility** (5%): No biased language, color-independent, screen-reader compatible
- [ ] **Metadata Completeness** (5%): All fields per `QUESTION_METADATA_STANDARD.md` present and valid

### Known Defect Classes to Check (per `DEFECT_LIBRARY.md`)
- **DL-008**: `ExplanationWrong[CorrectChoice]` non-empty (BLOCK via governance Rule 2)
- **DL-010**: Misassigned explanations (text describes wrong choice)
- **DL-013**: Template boilerplate distractor explanations ("represents a plausible misconception...")
- **DL-025/026**: Empty non-CorrectChoice `ExplanationWrong` slots
- **DL-029**: Regex block-scan false positives (use within-object extraction)
- **DL-030**: `CorrectChoice` disagrees with independent derivation
- **DL-031**: Definition-match items labeled Moderate (should be Easy)
- **DL-037**: Choice binary lead-in polarity mismatch ("No... should be investigated")
- **DL-046**: Corrupted choice text (fragments, leading spaces)
- **DL-047**: Key/explanation contradictions (semantic verification gap)

### Pack C Specific Notes
- **DL-012 clone redundancy**: Sections E/F have 28 clone groups (140 items) — 18 archived 2026-09-05, 11 seeds retained
- **DL-013 boilerplate**: Previously 382 items affected; remediated via certification waves (Sections A/B/C/D), residual in E/F
- **DL-026 empty non-CC EW**: 500 items originally affected; Certified items remediated 2026-07-23/08-24
- **DL-039 cluster**: Pack D Section B had 9 Certified DL-008 items — verify Pack C doesn't have similar
- **DL-040 "Active" state**: Pack C had 9 items with non-registry `question_state: "Active"` — remediated to "Unprocessed" 2026-08-01
- **DL-035 governance gap**: 28 Domain F items certified via S853 without DL-026 check — resolved 2026-09-05
- **Section E/F DL-008**: Session 700 found ~342 in Pack D; verify Pack C Section E/F similarly clean

## Evidence Hierarchy (AGENTS.md §18.3)

| Tier | Evidence | Weight |
|------|----------|--------|
| 1 | Chunked parts (actual file bytes you search yourself) | **Conclusive** |
| 2 | Verbatim raw blocks + containing part | Strong |
| 3 | Hand-pasted blocks alone | Weak — style-matched paste ≠ provenance |
| 4 | Git hashes, line numbers, shell outputs | Inadmissible without repo access |

**Do not report "not found" as a finding** — treat as index limitation until chunked part is tested.

## Output Format

For each finding, report:

```json
{
  "qid": "P1-AC-001",
  "part": 1,
  "defectClass": "DL-XXX",
  "severity": "Critical|High|Medium|Low|Informational",
  "evidence": "Exact quote from the part file showing the issue",
  "location": "Field name (e.g., ExplanationWrongC, ChoiceB, Stem)",
  "recommendation": "Specific fix"
}
```

## Delivery

Return findings as a JSON array. Include a summary with:
- Total questions reviewed
- Findings by defect class and severity
- Any items you could not locate (specify part and QID — will trigger re-split)
- Overall quality assessment (Gold/Exam-Ready/Acceptable/Needs Work/Reject per CAQS §2.4)

## Questions for Clarification

Before beginning, confirm:
1. You can ingest 40KB JS files as raw text attachments
2. Your tool supports literal string search (not just semantic retrieval)
3. You understand the control test (Step 1) — will run it first

---

**Reference Documents** (available in repo):
- `knowledge/CAQS_v1.0.md` — Quality standard
- `knowledge/QUESTION_METADATA_STANDARD.md` — Metadata schema
- `knowledge/DEFECT_LIBRARY.md` — All defect classes with patterns
- `knowledge/EXAM_BLUEPRINT.md` — IMA CMA Part 1 CSO mapping
- `foundation/FORMULA_MASTER.md` — Authoritative formulas
- `review/05_COMMON_EXAM_TRAPS.md` — Documented traps for distractor validation