# Solve-and-Review Prompt — Laguna S — Pack A (Financial Statement Analysis)

**Reviewer:** Laguna S, acting as a senior management accountant and CMA Part 2 exam editor.
**Assigned scope:** Part 2 Pack A only — file `p2/pack_p2_a.js`, QIDs `P2-A-001` through `P2-A-600`, domain **Financial Statement Analysis**.
**Mode:** Read-only review. You solve, you verify, you report. You do **not** edit any pack file.

## Scope guardrail (non-negotiable)

You work on **one pack — Pack A — and nothing else.** Do not solve, review, reference, or reason about any other pack. Do not review Part 1 content. Every item you report must be a `P2-A-*` QID in `p2/pack_p2_a.js`.

## Inputs (already split — do not re-split)

1. Split review parts: `%TEMP%\opencode\p2-review\a\pack_p2_a.part*.js` (65 parts, P2-A-001..P2-A-600)
2. Part→QID manifest: `p2/review/A_REVIEW_MANIFEST.md` (concat EXACT MATCH — the parts are the pack)

Work part by part in manifest order. Do not skip any QID.

## Task — solve every question, then review three things

For **every item**:

**Step 1 — Solve independently.** Cover the stored `CorrectChoice` (and the key letter) and derive the answer from the stem + choices alone. For calculation items, recompute twice by independent paths. Record your derived letter and value.

**Step 2 — Review the incorrect answers.** For each of the three distractors: confirm it is genuinely wrong (show the error), and confirm its `ExplanationWrong` slot correctly refutes that specific choice — not another choice, not a generic dismissal. Flag transposed/misassigned explanations and logically equivalent distractor pairs.

**Step 3 — Review explanation correctness.** Confirm `ExplanationCorrect` derives the stored key (not a different option), cites the governing standard by name, shows formula-with-substituted-values for calculations, and contains no internal contradiction with the stem numbers.

**Step 4 — Review topicalness.** Confirm `Topic`, `LOSTag`, and `BlueprintDomain` describe what the stem actually tests. Flag drift (e.g., a Corporate-Finance-concept item wearing a Financial-Statement-Analysis topic) and wrong-LOS tags.

## Structural cross-checks (each item)

- `ExplanationWrong[CorrectChoice]` is `""`.
- Every non-key `ExplanationWrong` slot is present and non-empty (≥50 chars).
- QID format `P2-A-NNN`, `Part2OnlyFlag` strictly `true`.

## Output

Write findings to `p2/review/A_SOLVE_REVIEW_FINDINGS.md` (separate file — do not touch `A_REVIEW_FINDINGS.md`). One block per finding:

```
## [QID] — [one-line defect title]
- Check: <solve-mismatch | distractor | explanation | topicalness | Structural>
- Severity: Critical | High | Medium | Low | Informational
- Evidence: <your derived answer vs stored key, verbatim quote, or recomputation>
- Proposed fix: <exact field + before/after replacement text>
- Confidence: High | Medium | Low
```

Close with a summary table: items solved, solve-mismatches, distractor/explanation/topicalness findings by severity, measured cognitive and difficulty distributions counted from the raw file (never restate targets as results), and any items below HIGH confidence. Fixes are proposed for later authorization only.
