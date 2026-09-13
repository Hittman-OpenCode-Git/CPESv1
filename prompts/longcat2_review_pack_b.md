# Longcat 2.0 Review Prompt — CMA Part 1 Pack B (Third-Party Content Review)

## Context

You are reviewing **Pack B** of the CMA Part 1 Exam Simulator question bank. This pack contains **500 multiple-choice questions** spanning all six CMA Part 1 domains (A–F). The questions have been split into **39 verbatim parts** (≤40KB each, ~10K tokens) so your retrieval index can fully ingest each part without prefix truncation.

## Source File

- **Original**: `content/packs/pack_b_corrected.js` (1,495,182 bytes, SHA256: `f16a83f52834770e758bb7d8403809c316354535809fabdafc745b8d5be8c034`)
- **Parts directory**: `content/packs/review_parts/pack_b/` (39 files: `pack_b_part_001.js` through `pack_b_part_039.js`)
- **Manifest**: `content/packs/review_parts/pack_b/pack_b_review_manifest.json` — contains part→QID mapping, sizes, and verification proof

## Verification Protocol (Mandatory Before Review)

**Step 1 — Control Test**: Attach `pack_b_part_001.js` (contains P1B-A-076 through P1B-A-088). Confirm your tool finds `P1B-A-076` and returns its full question object.

**Step 2 — Concat Proof**: The manifest's `verification.byteMatch: true` proves the 39 parts concatenate to reproduce the source array byte-for-byte. No gaps, no duplicates.

**Step 3 — Literal Search**: Use exact QID queries (e.g., `"P1B-A-076"`, `"P1B-B-119"`, `"P1B-F-150"`). Do NOT rely on semantic search — this pack uses literal IDs.

## Review Scope

Evaluate each question against the **CAQS v1.0** quality standard (Gold Standard Checklist, §14.2):

### Structural Integrity
- [ ] Valid JSON structure, all required fields present
- [ ] `QuestionID` unique, follows pattern `P1B-{Section}-{NNN}`
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

### Pack B Specific Notes
- **Sections A/D (P1B-A-076–150, P1B-D-076–150)**: Previously `question_state: "Unprocessed"` (no governance state), now Certified-ready per DL-024 resolution
- **Section E (P1B-E-076–150)**: 17 rotation-artifact defects remediated pre-certification (DL-017 file corruption fixed 2026-07-23)
- **Sections B/C/F**: `question_state: "Certified"` — already in learner pool
- **DL-017 backtick corruption**: Fixed 2026-07-23 (275 sites across B/C/F sections) — verify no residual artifacts
- **DL-030**: 4 CorrectChoice errors fixed 2026-07-24 (P1B-B-119, P1B-F-084, P1B-F-116, P1B-F-121)

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
  "qid": "P1B-A-076",
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