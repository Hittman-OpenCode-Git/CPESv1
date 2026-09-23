# Longcat 2.0 Review Prompt — CMA Part 1 Pack D (Third-Party Content Review)

## Context

You are reviewing **Pack D** of the CMA Exam Simulator question bank. This pack contains **500 multiple-choice questions** spanning all six CMA Part 1 domains (A–F). The questions have been split into **72 verbatim parts** (≤40KB each, ~10K tokens) so your retrieval index can fully ingest each part without prefix truncation.

## Source File

- **Original**: `content/packs/pack_d_corrected.js` (2,581,685 bytes, SHA256: `60f3c22831801ecb3839ac5da7615f115ef94819d987a37423b3dbd9694f1cb8`)
- **Parts directory**: `content/packs/review_parts/pack_d/` (72 files: `pack_d_part_001.js` through `pack_d_part_072.js`)
- **Manifest**: `content/packs/review_parts/pack_d/pack_d_review_manifest.json` — contains part→QID mapping, sizes, and verification proof

## Verification Protocol (Mandatory Before Review)

**Step 1 — Control Test**: Attach `pack_d_part_001.js` (contains P1-AD-001 through P1-AD-007). Confirm your tool finds `P1-AD-001` and returns its full question object.

**Step 2 — Concat Proof**: The manifest's `verification.byteMatch: true` proves the 72 parts concatenate to reproduce the source array byte-for-byte. No gaps, no duplicates.

**Step 3 — Literal Search**: Use exact QID queries (e.g., `"P1-AD-001"`, `"P1-BD-030"`, `"P1-FD-075"`). Do NOT rely on semantic search — this pack uses literal IDs.

## Review Scope

Evaluate each question against the **CAQS v1.0** quality standard (Gold Standard Checklist, §14.2):

### Structural Integrity
- [ ] Valid JSON structure, all required fields present
- [ ] `QuestionID` unique, follows pattern `P1-{Section}D-{NNN}` (AD, BD, CD, DD, ED, FD)
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
- **DL-039**: Certified DL-008 cluster in Section B (9 items remediated 2026-08-01 — verify no regression)
- **DL-040**: Non-registry `question_state: "Active"` (20 items remediated 2026-08-01 — verify clean)
- **DL-041**: Certified items missing `CognitiveLevel` + `DifficultyScore` (3 items remediated 2026-08-01)
- **DL-046**: Corrupted choice text (fragments, leading spaces)
- **DL-047**: Key/explanation contradictions (semantic verification gap)

### Pack D Specific Notes
- **Section B (P1-BD-001–100)**: **Critical history** — 9 Certified items had DL-008 (non-empty EW[CC]) remediated in S133 2026-08-01. Verify no regression.
- **DL-039 cluster**: P1-BD-008, 015, 056, 064, 070, 076, 077, 079, 100 were fixed. Cross-check EW[CC] = "" and non-CC EW populated.
- **DL-040 "Active" state**: 11 Pack D items had non-registry state remediated to "Unprocessed"/"Archived" 2026-08-01.
- **DL-041 metadata**: P1-ED-081/082/083 (Section E) missing CognitiveLevel/DifficultyScore — remediated 2026-08-01.
- **Section E/F (P1-ED-001–075, P1-FD-001–075)**: Verify DL-026 (empty non-CC EW) clean — Pack D had 500 items affected historically, Certified items remediated 2026-07-23/08-24.
- **DL-012 clone redundancy**: Section E/F had 28 clone groups (140 items) — 18 archived 2026-09-05, 11 seeds retained.
- **DL-013 boilerplate**: Section E/F had residual boilerplate; verify remediated.
- **DL-035 governance gap**: 11 Domain F items certified via S853 without DL-026 check — resolved 2026-09-05.

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
  "qid": "P1-AD-001",
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