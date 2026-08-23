# 11 — Authoring Cautions & Workflow (Part 2 Case Studies)

**Status:** Authoritative cautions derived from the Part 2 defect library (DL-P2-001…DL-P2-012). Run this checklist on EVERY case item before declaring it done.

---

## 1. Defect-Library Cautions (mandatory checklist)

### C1 — No leaked drafting notes (DL-P2-001..005, DL-P2-007, DL-P2-010 class)
Sweep every learner-facing string for drafting residue: "Wait —", "let me recompute", "need to verify", "that's X, not Y", "start fresh", "or close to this". If the author debated a number, the debate must never reach the item. `VerifiedChecks` may record final independent values only.

### C2 — No hedge language masking unreconciled arithmetic (DL-P2-009 class)
Prohibited phrases: "or X depending on rounding", "depending on the exact inputs", "may reflect a specific capital structure", "approximately — or X…". If two numbers disagree, the item is wrong — fix the arithmetic, never hedge it.

### C3 — Header must equal derivation (DL-P2-009 class)
The number in a choice header must equal the sum of the components shown in that same choice. Verify by literal arithmetic, not by reading the prose.

### C4 — No truncation (DL-P2-011 class)
`CommonTrapReference`, `FormulaReference`, and all free-text fields must end with complete sentences. The historical ~100-character template cut must never recur. Check the LAST WORD of every field: no mid-word fragments, no dangling "the/a/on/in/from", no dangling commas.

### C5 — Correct tier/band/segment claims (DL-P2-009, P2-B-022 class)
When an item references a schedule (MCC tiers, tax brackets, incentive bands), verify the claimed tier against the item's OWN schedule. A correct decision with a misstated tier is still an ERROR.

### C6 — Cross-reference integrity (DL-P2-010 class)
Any "See X for the step-by-step" reference must point at the choice that actually contains the steps. After reordering answer letters, re-check every cross-reference.

### C7 — No cross-item contamination (DL-P2-012/§9.4 class)
Each item's text must describe ITS OWN stem and choices. Rotation-group residue (a distractor explanation describing the neighbor item's topic) is a certification blocker.

---

## 2. Structural Cautions

| Caution | Rule |
|---------|------|
| Type vs ItemStyle | Case items use `Type` (numeric/select/multi/fill/match); `ItemStyle: "single-select"` is the MCQ vocabulary. Never mix. |
| Version formats | Case `Version` = 2-part (`^\d+\.\d+$`); repository `VERSION` = 3-part SemVer. Different artifacts — do not "fix" one to match the other. |
| DOL alias | FA-19 and DA-05 are the SAME formula registered in two domains (intentional cross-domain alias). Do not treat as a duplicate to remove; cite either ID. |
| CaseID prefix | ALWAYS `CBQ2\d-` with the pack digit (CBQ21-A1). Bare `CBQ2-` belongs to Part 1 Pack 2. |
| Items per case | 5 minimum, **7 maximum**. |
| Difficulty enum | 5 values including Moderate-Easy (2). |
| CognitiveLevel enum | Remember / Understand / Apply / Analyze / Evaluate. "Synthesize"/"Recall" are narrative shorthands only. |
| Correct-answer slot | The ExplanationWrong slot matching the correct answer is EMPTY (DL-008); all other slots ≥50 chars choice-specific (DL-021/DL-026). |
| 365 days | CMA convention is 365, never 360 (formula catalog FA-05). |

---

## 3. Batch & File Governance

- ≤30 items per change-set (governance-guard Rule 5); batch by case.
- Backup-before-write: timestamped `.bak-YYYYMMDDHHMMSS` for every pack/case file touched (BACKUP_PROTOCOL.md).
- Never delete content — archive via `question_state: "Archived"` / `ProductionStatus: "Retired"`.
- Every content change pairs with a REVISION_HISTORY_P2.md entry; every defect with a DEFECT_LIBRARY_P2.md entry (next ID: DL-P2-013).
- Preflight at session start (Full Lane): `npm run preflight` + `node scripts/preflight_p2.js`.

---

## 4. Authoring Pipeline

```
Case Author → Accountant → Editor → Psychometrician → Validator → Release Manager
```

- **Accountant** owns correctness: formulas (volume 09), citations, numerical integrity.
- **Editor** owns language: realism (§08), anti-AI writing, clarity.
- **Psychometrician** owns exam quality: progression, difficulty, distractors, cueing/bias.
- **Validator** runs the automated suite + the cautions checklist (§1–§2 of this file).
- **Release Manager** verifies: validation passed, accounting passed, psychometrics passed, documentation updated, regression passed.

Independent recomputation is mandatory at the Accountant step: solve from the stem without reading the stored answer.

---

## 5. External Review Handoff (AGENTS.md §18)

When shipping content to an auditor without repo access:
1. Split pack/case files into ≤40KB verbatim parts; emit a part→QID manifest.
2. Prove no-gap/no-dup (concat must reproduce source byte-for-byte).
3. Send a control part containing already-verified content first.
4. Treat the auditor's "not found" as an index limitation until a chunked part is tested (index-failure signatures: literal-ID queries returning unrelated content; nothing surfacing past a cutoff QID).
