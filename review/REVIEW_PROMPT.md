# Dual-LLM Independent Review Prompt — CMA Exam Simulator P2 Go-Live Sign-Off

## Context
You are reviewing the CMA Exam Simulator's P2 (Part 2) content for go-live sign-off. Two independent LLMs (Claude + GPT-4o) must review the same materials and agree on any content before V2.1 closeout. You are one of the two reviewers. You must NOT see the other LLM's findings until both have submitted.

## Governance Requirements (from AGENTS.md, CAQS_v1.0.md, QUESTION_METADATA_STANDARD.md, SCAN_BOUNDARY_DOCTRINE.md)

### File Requirements (§18.2)
- All pack files >200KB MUST be split into verbatim parts ≤40KB
- Part→QID manifest with source SHA256 must be provided
- Concatenation of parts must reproduce source byte-for-byte (verified)
- Every claim must cite raw file/line evidence (§5 Dual Verification)
- Self-reports are inadmissible as evidence (§20.1)

### Content Standards (CAQS §4)
- Explanation minimum: 50 chars (CAQS §4.3 EV1)
- Gold Standard: 150+ chars with principle, formula, business interpretation, common trap
- Correct-answer explanation must reference governing standard by name (ASC, COSO, IMA)
- No placeholder text, no uncertain language ("I think", "probably", "maybe")
- Distractor explanations must be choice-specific

### Certification Standards (CAQS §1.7)
- Only `question_state: "Certified"` items are learner-eligible
- Certification requires HIGH-confidence AI verification across 6 dimensions
- Rule 12: No cognitive relabeling to fill distribution gaps
- Rule 16: Certification stamps (batch + date) required

### Scan-Boundary Doctrine (SCAN_BOUNDARY_DOCTRINE.md)
- Every closure claim must state tested population boundary
- Synthetic-defect + clean-silence + determinism controls required
- Screen output is evidence, not an author (DL-045)

## Review Files Provided

### 1. Keyless Question Files (chunked per §18.2)
Location: `review/keyless_parts/`
- `case_pack_p2_1_part01.js` through `case_pack_p2_1_part15.js` (15 parts, ≤40KB each)
- `case_pack_p2_2_part01.js` through `case_pack_p2_2_part20.js` (20 parts, ≤40KB each)
- `case_pack_p2_3_part01.js` through `case_pack_p2_3_part14.js` (14 parts, ≤40KB each)
- `MANIFEST.json` — part→QID manifest with source SHA256, concat verification, and QID ranges per part

NOTE: These parts are VERBATIM byte-slices of the source pack files (§18.2). They contain stems, choices, exhibits, metadata, answer keys (CorrectChoice/Correct), explanations (ExplanationCorrect/ExplanationWrong*), and certification metadata (question_state, certification_batch, certification_date). The verbatim requirement means answer keys are physically present. For Task 5 (key verification), you must solve each item INDEPENDENTLY first (without consulting the stored answer), then compare your solution to the stored key. This is open-key verification — the independence comes from solving before looking, not from hiding keys that exist in the file.

### 2. S121 Portfolio Dashboard
Location: `review/S121_PORTFOLIO_DASHBOARD.txt`
Contains: difficulty distribution, cognitive-level distribution, answer-position balance per pack.

### 3. §19.4 Clone Scan Results
Location: `review/P2_CLONE_SCAN.txt`
Contains: clone scan results across all P2 packs (1 acknowledged clone, 0 new).

### 4. Semantic Screen Flags
Location: `scripts/output/case_semantic_flags.json`
Contains: 444 flags total. Breakdown by screen: B=336 (of which B:INVERSION=160), C=73 (of which C:SHORT=31), E=24 (E:SHORT-EXPLANATION=24), B-num=11. Severity: weak=281, FLAG=124, info=39.

### 5. Triple-Blind Convergence Report
Location: `reports/TRIPLEBLIND_CONVERGENCE_2026-10-20.md`
Contains: prior convergence analysis (3 subagents, 0 disagreements, all gates PASS).

## Review Tasks

### Task 1: S121 Portfolio Audit (G2 gate)
Read `review/S121_PORTFOLIO_DASHBOARD.txt`. For each P2 pack:
- Is difficulty distribution within S121 targets (± tolerance)?
- Is cognitive-level distribution within S121 targets?
- Is answer-position balance within ~25% per position?
- Are there any Rule 12 violations (cognitive relabeling to fill gaps)?
- Report: PASS / WARN / FAIL per pack, with specific drift findings.

### Task 2: §19.4 Clone Scan (G2 gate)
Read `review/P2_CLONE_SCAN.txt`. Verify:
- 1 acknowledged clone (CBQ21-F3-Q4 == CBQ22-F1-Q5) is documented and quarantined
- 0 new/unacknowledged clones
- Report: PASS / FAIL with clone details.

### Task 3: Short-Explanation Items (G4 gate)
From `scripts/output/case_semantic_flags.json`, extract all E:SHORT-EXPLANATION flags (24 total). NOTE: These flags span BOTH P1 and P2 banks. The P2 items are in the keyless parts (`p2/case_pack_p2_*.js` → `review/keyless_parts/`). The P1 items are in `content/cases/case_pack_*_corrected.js` (NOT in keyless parts — these are P1 case banks). For each P2 item:
- Read the item's ExplanationCorrect from the keyless parts (via MANIFEST.json → source file → part)
- Verify it meets CAQS §4 (principle, formula, business interpretation, common trap)
- Report: PASS / FAIL per item with char count and missing elements.
For P1 items: note they are outside the keyless population and cannot be reviewed against keyless parts.

### Task 4: CBQ21-B5-Q1 Schema Drift (G4 gate)
Find CBQ21-B5-Q1 in the keyless parts. Verify:
- Item type is "numeric" (not "select")
- ExplanationCorrect references "Choice A/B/C/D" but no Choices array exists on a numeric item
- Report: schema drift confirmed / not confirmed, recommended fix.

### Task 5: Open-Key Verification (G1/G3 gate)
Select 10 items at random from the P2 keyless parts. For each:
- Read the stem, choices, and exhibits (from the keyless part)
- Solve independently WITHOUT consulting the stored answer first
- Record your solution with confidence (1-5) and reasoning
- THEN compare your solution to the stored answer (CorrectChoice/Correct field in the same part)
- Report: MATCH / MISMATCH per item, with your solution, the stored key, and discrepancy analysis
- Note: answer keys ARE present in the verbatim parts (§18.2); independence comes from solving before looking

### Task 6: Distractor Quality (G2 gate)
Select 5 multi-select items from the P2 keyless parts. For each:
- Read the stem, choices, and exhibits
- Evaluate: do distractors represent distinct misconceptions?
- Are any distractors obviously wrong (guessable)?
- Report: PASS / FAIL per item with specific findings.

## Output Format
Produce a structured report with:
1. Gate verdicts (PASS/WARN/FAIL per task)
2. Specific findings with file/line citations where possible
3. Disagreements with the prior triple-blind convergence (if any)
4. Recommendations for V2.1 closeout

## Constraints
- Read-only analysis — do NOT modify any files
- Every claim must cite raw evidence (file path + line number or script output)
- State your tested population boundary for each task
- Do not treat self-reports as evidence
- Do not auto-remediate — report findings only