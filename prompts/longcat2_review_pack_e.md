# Longcat 2.0 Review Prompt — CMA Part 1 Pack E (Third-Party Content Review)

## Context

You are reviewing **Pack E** of the CMA Exam Simulator question bank. This pack contains **620 multiple-choice questions** spanning all six CMA Part 1 domains (A–F) plus supplemental items. The questions have been split into **62 verbatim parts** (≤40KB each, ~10K tokens) so your retrieval index can fully ingest each part without prefix truncation.

**Note**: Pack E has 620 items (not 500) because it includes:
- Standard 500 items: P1E-A-001 through P1E-F-075
- Supplemental R-series: P1-E-R01 through P1-E-R40 (40 items, S808 certification)
- EVAL-series: P1E-EVAL-001 through P1E-EVAL-005 (5 items)
- S-series: P1E-A-S## through P1E-F-S## (supplemental items)

## Source File

- **Original**: `content/packs/pack_e_corrected.js` (2,389,463 bytes, SHA256: `5fc97402e57febe950e3c8cdbc40a4afadee61d2069dc246f658f33960d6c860`)
- **Parts directory**: `content/packs/review_parts/pack_e/` (62 files: `pack_e_part_001.js` through `pack_e_part_062.js`)
- **Manifest**: `content/packs/review_parts/pack_e/pack_e_review_manifest.json` — contains part→QID mapping, sizes, and verification proof

## Verification Protocol (Mandatory Before Review)

**Step 1 — Control Test**: Attach `pack_e_part_001.js` (contains P1E-A-001 through P1E-A-010). Confirm your tool finds `P1E-A-001` and returns its full question object.

**Step 2 — Concat Proof**: The manifest's `verification.byteMatch: true` proves the 62 parts concatenate to reproduce the source array byte-for-byte. No gaps, no duplicates.

**Step 3 — Literal Search**: Use exact QID queries (e.g., `"P1E-A-001"`, `"P1-E-R33"`, `"P1E-EVAL-001"`, `"P1E-F-S07"`). Do NOT rely on semantic search — this pack uses literal IDs.

## Review Scope

Evaluate each question against the **CAQS v1.0** quality standard (Gold Standard Checklist, §14.2):

### Structural Integrity
- [ ] Valid JSON structure, all required fields present
- [ ] `QuestionID` unique, follows patterns:
  - Standard: `P1E-{Section}-{NNN}` (P1E-A-001 through P1E-F-075)
  - R-series: `P1-E-R{NN}` (P1-E-R01 through P1-E-R40)
  - EVAL-series: `P1E-EVAL-{NNN}`
  - S-series: `P1E-{Section}-S{NN}`
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
- **DL-018**: Missing `ExplanationWrong[CorrectChoice]` field (absent, not empty)
- **DL-021**: Missing distractor `ExplanationWrong` fields (Section C — 300 fields authored 2026-07-24)
- **DL-025/026**: Empty non-CorrectChoice `ExplanationWrong` slots
- **DL-029**: Regex block-scan false positives (use within-object extraction)
- **DL-030**: `CorrectChoice` disagrees with independent derivation
- **DL-031**: Definition-match items labeled Moderate (should be Easy)
- **DL-037**: Choice binary lead-in polarity mismatch ("No... should be investigated")
- **DL-046**: Corrupted choice text (fragments, leading spaces — P1E-C-092 repaired 2026-09-05)
- **DL-047**: Key/explanation contradictions (semantic verification gap)

### Pack E Specific Notes
- **Section C (P1E-C-001–100)**: **DL-021 history** — All 100 items were missing 3 distractor ExplanationWrong fields (300 total). Fully authored and certified 2026-07-24 (S71/S828). Verify no regression.
- **P1E-C-092**: **DL-046 family** — Had corrupted choice D (`" > 10% of "`). Repaired 2026-09-05 with stem completion ($500K/$4.5M/$5M ⇒ exactly 10%). Verify fixed.
- **DL-018 missing EW[CC]**: 4 benign absent-key items identified 2026-08-24 (P1B-E-083, P1B-F-091, P1-EC-045, P1E-B-012 — all Certified, all CorrectChoice=C). Pack E: P1E-B-012 only. Verify `ExplanationWrongC: ""` present.
- **P1-E-R33**: **DL-034** — Was missing CorrectChoice/Stem/ExplanationCorrect. Repaired and certified S808 2026-07-26. Verify structurally complete.
- **DL-040 "Active" state**: Pack E had 0 items with non-registry state (only Packs C/D affected).
- **Part1OnlyFlag**: All items should have `Part1OnlyFlag: true` (620/620).
- **S-series items**: 180+ supplemental items (P1E-*-S##) — verify same quality standard as core 500.
- **EVAL-series**: 5 items (P1E-EVAL-001–005) — verify cognitive level Evaluate, difficulty ≥4.

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
  "qid": "P1E-A-001",
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
- Total questions reviewed (should be 620)
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