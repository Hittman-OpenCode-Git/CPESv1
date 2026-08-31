# Task Prompt — Muse Spark 1.2 — P2-A-311..325 (15 items)

**Model:** Muse Spark 1.2 (opencode/muse-spark-1.2-contributor-free) — this prompt is for the Muse Spark batch
**Batch:** Cycle 2 Pack A — P2-A-311..325 (15 MCQs, Financial Statement Analysis)
**Testing cap:** 1,875 MCQs (75% of 2,500) — do not exceed

## Read First (fully, before writing)
1. `C:\Users\User\AppData\Local\Temp\opencode\P2-066\AUTHOR_SPEC.md` — full MCQ item contract (15 items, byte >30KB, CC 4/4/4/3 max streak 2, 2E/3ME/5M/3D/2VD, cog 6-7 Apply/3 Analyze/2 Evaluate, Rule 11 floors)
2. `p2/P2-066_CYCLE1_SLOTS.md` — Cycle 2 Pack A slot table (QID, LOSTag, Difficulty, DS, CognitiveLevel, CorrectChoice) — follow EXACTLY, do not invent QIDs
3. `scripts/generate_p2066_slots.js --cap-75` — confirms starts A311/B236/C321/D186/E196/F186

## Slot Table — Pack A 311-325 (copy verbatim, 15 rows)
| # | QID | LOSTag | Difficulty | DS | Cognitive | CC | CalculationItem | FormulaRef |
|---|-----|--------|------------|----|-----------|----|-----------------|------------|
| 1 | P2-A-311 | A.1 | Easy | 1 | Remember | A | false | FA-01 |
| 2 | P2-A-312 | A.2 | Easy | 1 | Understand | B | false | FA-11 |
| 3 | P2-A-313 | A.3 | Moderate-Easy | 2 | Apply | C | true | FA-07 |
| 4 | P2-A-314 | A.4 | Moderate-Easy | 2 | Apply | D | true | FA-09 |
| 5 | P2-A-315 | A.5 | Moderate-Easy | 2 | Understand | A | true | FA-15 |
| 6 | P2-A-316 | A.6 | Moderate | 3 | Apply | B | false | FA-18 |
| 7 | P2-A-317 | A.7 | Moderate | 3 | Apply | C | true | FA-03 |
| 8 | P2-A-318 | A.8 | Moderate | 3 | Apply | A | false | FA-22 |
| 9 | P2-A-319 | A.9 | Moderate | 3 | Analyze | B | true | FA-05 |
| 10 | P2-A-320 | A.1 | Moderate | 3 | Analyze | D | true | FA-02 |
| 11 | P2-A-321 | A.2 | Difficult | 4 | Analyze | C | true | FA-12 |
| 12 | P2-A-322 | A.3 | Difficult | 4 | Evaluate | A | true | FA-08 |
| 13 | P2-A-323 | A.4 | Difficult | 4 | Apply | B | true | FA-04 |
| 14 | P2-A-324 | A.5 | Very Difficult | 5 | Evaluate | D | true | FA-16 |
| 15 | P2-A-325 | A.6 | Very Difficult | 5 | Apply | C | true | FA-19 |

CC 4/4/4/3, max streak 2. Evaluates need named Flash decision-maker + alternatives, DS≥4. Analyze DS≥3. U/R DS≤2.

## Task
Write ONE staged file as a bare JavaScript array literal `[ {...}, {...} ]` of EXACTLY 15 objects to:
`%TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js`
No var declaration, no comments, no trailing text. ASCII only (use "x" for multiply, "/" for divide). Double-quoted strings, escape internal quotes.

## Required Fields (every item, exact set)
Part=2, Section="A", QuestionID, question_state="Unprocessed", Part2OnlyFlag=true (boolean), UniqueConceptKey="<A>-<NNN>-different-kebab-slug", Stem, Choices{A,B,C,D}, CorrectChoice, ExplanationCorrect (≥200 chars: principle by name → formula with substituted values → business interpretation with same stakeholder as stem → trap), ExplanationWrongA-D (EW[CC]="" exactly; EW[non-CC] ≥75 chars, must start "Choice X <trap-verb>..." where trap-verb = misstates|confuses|omits|applies|uses|treats|ignores|assumes|conflates|overstates|understates|inverts|double-counts + specific misconception + contrast), Difficulty, DifficultyScore, CognitiveLevel, CalculationItem (bool), ItemStyle="single-select", LOSTag, BlueprintDomain="Financial Statement Analysis", FormulaReference, CommonTrapReference (≤100 chars), Authorities (array non-empty), Topic="A.<NNN> kebab-slug" (NNN=QID numeric), VerifiedChecks (array ≥3, includes "Recomputed: ... = ... — independently verified: matches Choice X" for calc items + "Part2OnlyFlag verified true" + "EW[CC] empty" etc.)

## Format Rules (hardened gates enforce)
- Topic = "A.<NNN> kebab-slug" (e.g., "A.311 revenue-recognition-net-vs-gross"), UCK = "A-<NNN>-different-slug" (unique pool-wide)
- EVERY stem contains Flash + FULL NAME + ROLE (e.g., "Flash Manufacturing CFO Adaeze Onuorah is reviewing...") — Gate 3 regex enforces
- State ALL numbers/factors in stem (rates, tax, beta, etc.); if PV factors needed, state them
- Choices: no "all/none of the above", no standalone always/never/impossible (almost always allowed), no Yes/No polarity mismatch, similar lengths, numeric distractors same units/format, each distinct error path
- No two stems share first 80 chars (case-insensitive) vs batch or pool
- Compute arithmetic TWICE independently; record agreement in VerifiedChecks

## Hardened Gates (must pass before integrate)
Gate 1: `node %TEMP%\opencode\P2-066\solve_and_assert.js <stagedFile>` — recomputed value must be in Choices[CC], not another choice
Gates 2-3: `node %TEMP%\opencode\P2-066\mcq_pipeline.js validate <stagedFile> a 311 15` — must be 0 errors (EW verb, stem Flash+Name+Role, byte >30KB, CC balance, difficulty/cog mix, LOSTag/Formula allowlists)

## Byte Gate
File must be >30,000 bytes. If under, deepen EC and EW until over.

## Label This Batch
This file is the Muse Spark 1.2 batch — do not mix with Minimax M3 batch.
