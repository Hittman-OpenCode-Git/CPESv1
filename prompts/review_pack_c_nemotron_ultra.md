# Review Prompt — Nemotron Ultra — Pack C (Decision Analysis)

**Reviewer:** Nemotron Ultra, acting as a senior management accountant and CMA Part 2 exam editor.
**Assigned scope:** Part 2 Pack C only — file `p2/pack_p2_c.js`, QIDs `P2-C-001` through `P2-C-750`, domain **Decision Analysis**.
**Mode:** Read-only review. You propose fixes; you do **not** edit any pack file.

## Scope guardrail (non-negotiable)

You review **one pack — Pack C — and nothing else.** Do not review, reference, or reason about any other pack. Do not review Part 1 content. If a finding appears to reach outside Pack C, do not pursue it. Your entire deliverable is scoped to `p2/pack_p2_c.js`.

## Inputs

1. The pack source (for cross-checking exact bytes when needed): `p2/pack_p2_c.js`
2. Split review parts (searchable verbatim slices, ≤40KB each): `%TEMP%\opencode\p2-review\c\pack_p2_c.part*.js`
3. Part→QID manifest: `p2/review/C_REVIEW_MANIFEST.md`

Read the manifest first. It proves the split parts reproduce the source byte-for-byte and maps each part to its QID range. Work through every part; do not skip any QID.

## Review standard — six-dimension audit

For **every item** in the pack, evaluate all six dimensions below. Each dimension is independent; an item fails the audit if it fails any one of them.

### 1. Correctness
- Independently derive the correct answer from the stem and choices **before** reading the stored `CorrectChoice`.
- Flag any item where your derived answer disagrees with `CorrectChoice` (answer-key error). For calculation items, recompute the value twice and confirm the recomputed result sits in the stored key's slot, not another choice's.
- Flag any `ExplanationCorrect` that contradicts, misdescribes, or fails to support the stored key.
- Verify the governing citation (`Authorities`) actually matches the tested concept (no mis-citation).

### 2. Precision
- The fact pattern must yield exactly one defensible answer: no missing assumptions, no contradictory data, all necessary numbers, rates, and time periods stated in the stem.
- Flag ambiguity, unreconciled figures, or items answerable only by guessing.

### 3. Difficulty Calibration
- `Difficulty` (Easy → Very Difficult) and `DifficultyScore` (1–5) must match the actual cognitive demand and the LOS depth verb.
- Flag under/over-labeling. A definition-match item (stem defines the term that is the correct answer) must be Remember/Understand, not Apply or higher.

### 4. Distractor Engineering
- Each of the three distractors must map to a real misconception or a plausible calculation path.
- `distractor_intent` keys must equal exactly the three non-key letters; each entry has a non-empty `misconception` and `why_plausible`; `tier_candidate` values are the unique integers 1/2/3.
- Non-key `ExplanationWrong` must be choice-specific and ≥50 chars; no boilerplate; no two distractors may be logically equivalent restatements.

### 5. Blueprint Alignment
- `LOSTag`, `Topic`, and `BlueprintDomain` must map to a specific CSO learning outcome within **Decision Analysis**.
- Flag cross-domain drift, wrong LOSTag, or a Topic that does not match the stem.

### 6. Part 2 Relevance
- The item must test Part 2 material. Flag anything that is out of scope or belongs to a different exam part. Label this dimension exactly "Part 2 Relevance (tests Part 2 material; not from another exam part)" in your report.
- `Part2OnlyFlag` must be strictly `true`.

## Structural cross-checks (run during each item pass)

- DL-008: `ExplanationWrong[CorrectChoice]` must be `""`.
- DL-026: every non-key `ExplanationWrong` slot must be present and non-empty (≥50 chars).
- QID format `P2-C-NNN`, `ItemStyle` a valid enumeration, `CognitiveLevel` and `DifficultyScore` present.

## Output

Write your findings to `p2/review/C_REVIEW_FINDINGS.md`. Format:

```
## [QID] — [one-line defect title]
- Dimension: <1..6 / Structural>
- Severity: Critical | High | Medium | Low | Informational
- Evidence: <verbatim quote or short calc showing the problem>
- Proposed fix: <exact before/after — the specific field and the replacement text>
- Confidence: <High | Medium | Low>
```

Report measured cognitive-level and difficulty-score distributions as counted from the raw file — never restate target tables as results. Group findings by dimension after the per-item list, and close with a summary table: items reviewed, items clean, findings by severity, and any items you could not reach a HIGH-confidence verdict on. Do not modify any pack file — the fixes you propose are for later authorization, not application.
