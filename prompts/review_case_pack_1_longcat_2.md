# Review Prompt — CommandCode LongCat 2.0 — Case Pack 1 (Integrated Case Studies)

**Reviewer:** CommandCode LongCat 2.0, acting as a senior management accountant and CMA Part 2 exam editor.
**Assigned scope:** Part 2 Case Pack 1 only — file `p2/case_pack_p2_1.js`, 33 cases (`CBQ21-A1` through `CBQ21-F5`), 198 items.
**Mode:** Read-only review. You propose fixes; you do **not** edit any pack file.

## Scope guardrail (non-negotiable)

You review **one pack — Case Pack 1 — and nothing else.** Do not review, reference, or reason about any other pack. Do not review Part 1 content. If a finding appears to reach outside Case Pack 1, do not pursue it. Your entire deliverable is scoped to `p2/case_pack_p2_1.js`.

## Inputs

1. The pack source (for cross-checking exact bytes when needed): `p2/case_pack_p2_1.js`
2. Split review parts (searchable verbatim slices, ≤40KB each): `%TEMP%\opencode\p2-review\case1\case_pack_p2_1.part*.js`
3. Part→CaseID manifest: `p2/review/CASE1_REVIEW_MANIFEST.md`

Read the manifest first. It proves the split parts reproduce the source byte-for-byte and maps each part to its CaseIDs. A case may span two adjacent parts — if a case object is cut at a part boundary, read both parts before judging it. Work through every case; do not skip any CaseID or ItemID.

## Review standard — six-dimension audit

For **every case and every item within it**, evaluate all six dimensions below. Each dimension is independent; a case fails the audit if any item fails any one of them.

### 1. Correctness
- Independently solve every item from the stem and exhibits **before** reading the stored answer.
- Flag any item where your derived answer disagrees with the stored `Correct` (answer-key error). Recompute all calculation items twice.
- Flag any explanation that contradicts, misdescribes, or fails to support the stored answer.
- Verify governing citations (`Authorities`) match the tested concept.

### 2. Precision
- Each item's fact pattern must yield exactly one defensible answer: no missing assumptions, no contradictory data, all necessary exhibit figures stated.
- Every exhibit row/column must be consumed by at least one item — flag decorative data.
- Numbers across exhibits must be internally consistent (subtotals reconcile to totals).

### 3. Difficulty Calibration
- Case-level and item-level `Difficulty` / `DifficultyScore` must match actual cognitive demand.
- Items within a case must progress Apply → Analyze → Evaluate; flag flat or inverted progressions.

### 4. Distractor Engineering
- Every wrong-choice explanation must be choice-specific (≥50 chars), address the exact error in that choice, and contrast with the correct approach — no boilerplate.
- Each distractor must map to a real misconception or plausible calculation path.

### 5. Blueprint Alignment
- `SectionTags`, `BlueprintDomain`, `LOSTag`, and `Topic` must map to a specific CSO learning outcome.
- Flag cross-domain drift or a Topic that does not match the case content.

### 6. Part 2 Relevance
- The case must test Part 2 material. Flag anything that is out of scope or belongs to a different exam part. Label this dimension exactly "Part 2 Relevance (tests Part 2 material; not from another exam part)" in your report.
- `Part2OnlyFlag` must be strictly `true` wherever present.

## Structural cross-checks (run during each case pass)

- Scenario realism: named company, named stakeholder with role, business trigger, clear task.
- Exhibit quality: professional business-document format; every exhibit referenced by at least one item.
- `CaseID`, `ItemID`, `ExhibitID` unique within the pack and correctly patterned.
- `CognitiveLevel` and `DifficultyScore` present on every item.

## Output

Write your findings to `p2/review/CASE1_REVIEW_FINDINGS.md`. Format:

```
## [CaseID / ItemID] — [one-line defect title]
- Dimension: <1..6 / Structural>
- Severity: Critical | High | Medium | Low | Informational
- Evidence: <verbatim quote or short calc showing the problem>
- Proposed fix: <exact before/after — the specific field and the replacement text>
- Confidence: <High | Medium | Low>
```

Report measured cognitive-level and difficulty-score distributions as counted from the raw file — never restate target tables as results. Group findings by dimension after the per-case list, and close with a summary table: cases reviewed, items reviewed, items clean, findings by severity, and any items you could not reach a HIGH-confidence verdict on. Do not modify any pack file — the fixes you propose are for later authorization, not application.
