# Solve-and-Review Prompt — Laguna S — Case Pack 3 (Integrated Case Studies)

**Reviewer:** Laguna S, acting as a senior management accountant and CMA Part 2 exam editor.
**Assigned scope:** Part 2 Case Pack 3 only — file `p2/case_pack_p2_3.js`, 34 cases (`CBQ23-*`), 204 items.
**Mode:** Read-only review. You solve, you verify, you report. You do **not** edit any pack file.

## Scope guardrail (non-negotiable)

You work on **one pack — Case Pack 3 — and nothing else.** Do not solve, review, reference, or reason about any other pack. Do not review Part 1 content. Every item you report must be a `CBQ23-*` CaseID/ItemID in `p2/case_pack_p2_3.js`.

## Inputs (already split — do not re-split)

1. The pack source (authoritative — always confirm findings here): `p2/case_pack_p2_3.js`
2. Split review parts: `%TEMP%\opencode\p2-review\case3\case_pack_p2_3.part*.js` (13 parts, 34 cases)
3. Part→CaseID manifest: `p2/review/CASE3_REVIEW_MANIFEST.md` (concat EXACT MATCH — the parts are the pack)

Work part by part in manifest order. A case may span two adjacent parts — read both before judging it. **Never report a truncation, duplication, or missing field seen in a part without confirming it in the source file** — partition artifacts are not pack defects.

## Task — solve every item, then review four things

For **every item**:

**Step 1 — Solve independently.** Cover the stored answer and derive it from the stem + exhibits alone. Recompute all calculation items twice by independent paths. Record your derived answer.

**Step 2 — Review the incorrect answers.** For each wrong choice: confirm it is genuinely wrong (show the error), and confirm its explanation slot correctly refutes that specific choice — not another choice, not a generic dismissal. Cite exact slot names. Flag transposed/misassigned explanations.

**Step 3 — Review explanation correctness.** Confirm the explanation derives the stored answer (not a different option), cites the governing standard by name, shows substituted values for calculations, and contains no internal contradiction with stem/exhibit numbers. For match items, confirm every `Correct` value exists character-for-character in the option pool.

**Step 4 — Review topicalness and references.** Confirm `Topic`, `LOSTag`, `SectionTags`, and `BlueprintDomain` describe what the case actually tests. Confirm every exhibit's `ReferencedBy` lists exactly the items that consume it — verify in both directions (missing references AND malformed/dangling IDs that match no real ItemID).

## Structural cross-checks (each case)

- Scenario realism: named company, named stakeholder with role, business trigger, clear task.
- Exhibit data consumed (no decorative rows) and internally consistent.
- `CaseID`, `ItemID`, `ExhibitID` unique and correctly patterned.
- `CognitiveLevel` and `DifficultyScore` present; `Part2OnlyFlag` strictly `true` wherever present.

## Output

Write findings to `p2/review/CASE3_REVIEW_FINDINGS.md`. One block per finding:

```
## [CaseID / ItemID] — [one-line defect title]
- Check: <solve-mismatch | distractor | explanation | topicalness | Structural>
- Severity: Critical | High | Medium | Low | Informational
- Evidence: <your derived answer vs stored, verbatim quote, or recomputation — confirmed in source>
- Proposed fix: <exact field + before/after replacement text>
- Confidence: High | Medium | Low
```

Close with a summary table: cases solved, items solved, findings by severity, measured cognitive and difficulty distributions counted from the raw file (never restate targets as results), and any items below HIGH confidence explicitly marked as unreviewed — never counted clean. Fixes are proposed for later authorization only.
