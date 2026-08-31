# Task Prompt — Claude — Remaining P2 Content to 75% Cap (445 MCQs + 23 Cases) — Full Governance

**Model:** Claude (Anthropic) via OpenCode — authoring role
**Lane:** Full Governance per `AGENTS.md:9.1-9.2` — you WILL write to `p2/pack_p2_*.js` and `p2/case_pack_p2_*.js`
**Authority:** `knowledge/00_PROJECT_CONSTITUTION.md:1`, `knowledge/CAQS_v1.0.md:1.6` (6-dim HIGH), `p2/P2002_CERTIFICATION_STANDARD.md:1`, `p2/P2_SCHEMA_STANDARD.md:1` (canonical field order, Rule 13 `Part2OnlyFlag:true`, Rule 14 QID boundary), `knowledge/QUESTION_METADATA_STANDARD.md:9` (states: Unprocessed/In Audit/Editorial/Certified/Archived), `knowledge/BACKUP_PROTOCOL.md:1` (backup-before-write, timestamped `.bak-*`, non-zero), `.opencode/plugins/governance-guard.js:1` (14 rules BLOCK, 74/74 tests)

## T0 Anchor (verified 2026-08-27T21:44Z, `scripts/preflight_p2.js:1` 0 divergences, guard 74/74)
```
A 325/500 (P2-A-326 next)  B 235/500 (P2-B-236)  C 320/625 (P2-C-321)  D 185/250 (P2-D-186)  E 195/250 (P2-E-196)  F 185/375 (P2-F-186)
Total 1,445/2,500  Certified 1,353 (A325? raw 325 cert inc. A311-325; preflight ledger 310 until history closeout — see closeout note)  Unprocessed 90  Archived 2 (C-198/C-199)
Cases 33/75 (p2_1 13, p2_2 10, p2_3 10)
Target for this task: 75% testing cap = 1,875 MCQs (A375/B375/C469/D188/E188/F281) + 56 cases → need 430 MCQs + 23 cases from 1,445/33
```
Do not exceed cap. Remaining to 2,500 (625 MCQs) stays unscheduled until pilot passes. All new items `question_state: "Unprocessed"`, Certified unchanged until separate certification wave.

## Governance You Must Obey (BLOCK level)
- **Rule 1:** Every `question_state` flip must pair with `knowledge/REVISION_HISTORY_P2.md` entry (append, never edit prior) — for this authoring task you do NOT flip states; you only append Unprocessed items, but at Tend you WILL append one REVISION_HISTORY entry listing QIDs, counts, backups
- **Rule 2 DL-008:** `EW[CC]` must be `""` exactly
- **Rule 5:** ≤30 question objects per change-set without `BLOCK-AUTHORIZED` — your batches are 15, so one pack per change-set is safe
- **Rule 6 DL-026 / Rule 10 DL-021:** Non-CC EW slots present and ≥75 chars (absent vs empty split)
- **Rule 11:** Cognitive floors — Evaluate DS≥4 with named Flash decision-maker + alternatives, Analyze DS≥3, Remember/Understand DS≤2
- **Rule 12:** Cognitive-First — do not relabel to fill mix
- **Rule 13:** `Part2OnlyFlag:true` boolean strict on every Part 2 MCQ
- **Rule 14:** Cross-part QID boundary — P1- QIDs blocked in P2 packs
- **Backup Protocol:** Before EVERY pack/case file edit, `copy → backups/pack_p2_*.js.bak-P2-066-<stamp>` and verify non-zero before write; DL-019 serial packs (one at a time, never concurrent)

## Hardened Gates (must pass before integrate — Cycle 1 28% CC-mismatch lesson)
Gate 1: `node %TEMP%\opencode\P2-066\solve_and_assert.js <stagedFile>` — VerifiedChecks `Recomputed: ... = X → Choice Y` must be in `Choices[CC]`, not another choice; EC `"Answer X is correct"` must match CC
Gate 2: `EW[non-CC]` must start `^Choice [A-D] (misstates|confuses|omits|applies|uses|treats|ignores|assumes|conflates|overstates|understates|inverts|double-counts)` + specific trap + contrast, ≥75 chars, no boilerplate `reflects a common misconception / does not align with` without trap verb
Gate 3: Stem must contain `Flash + [First Last], [Role]` matching `/Flash.*[A-Z][a-z]+ [A-Z][a-z]+.*(CFO|Controller|Treasurer|Treasury analyst|Credit manager|M&A director|Board member|Analyst|Internal auditor|Senior analyst|Project manager)/` and state ALL numbers/factors

Both gates run via `%TEMP%\opencode\P2-066\mcq_pipeline.js validate <stagedFile> <pack> <startNum> <count>` (also enforces Rule 2/6/10/11/13/14, Topic/UCK format, LOSTag/Formula allowlists, CC balance, difficulty/cog mix, byte gate, Flash anchor, stem fingerprint dedup, pool UCK collision).

## Slot Tables (do not invent QIDs — collision-free allocations)
- **Generator:** `scripts/generate_p2066_slots.js --cap-75` → emits cycles 2..6 to cap (Cycle 2 was A311-325 just certified; your first new batch is Cycle 3: A326-340, B236-250, C321-335, D186-200, E196-210, F186-200)
- **Per-batch mix (machine-checked):** CC 4/4/4/3 max streak 2; Difficulty 2×Easy(1)/3×Moderate-Easy(2)/5×Moderate(3)/3×Difficult(4)/2×Very Difficult(5); Cognitive 7 Apply / 3 Analyze / 2 Evaluate / 3 Remember-or-Understand (U+R=3). LOSTag cycles per domain (A.1-9, B.1-9, C.1-7, D.1-5, E.1-6, F.1-7), FormulaReference FA-*/CB-*/DA-*/RM-*/ID-*/"" for F ethics per `mcq_pipeline.js:8` allowlists.
- **Case waves:** Every 2 MCQ cycles, 9 cases (3 per `p2/case_pack_p2_*.js`) via `C:\Users\User\AppData\Local\Temp\opencode\P2-066\case_pipeline.js validate/integrate` + `C:\Users\User\AppData\Local\Temp\opencode\P2-066\CASE_SPEC.md` (6 items per case: numeric/numeric/select/select/multi/match, ≥2 exhibits, all rows consumed)

## Infra (reused from P2-066)
```
%TEMP%\opencode\P2-066\mcq_pipeline.js  — validate <file> <pack a-f> <startNum> <count> ; integrate <file> <pack>
%TEMP%\opencode\P2-066\case_pipeline.js — validate <file> <fileNum 1|2|3> <expectedCount> <allowedCaseIdsCsv> ; integrate <file> <fileNum>
%TEMP%\opencode\P2-066\AUTHOR_SPEC.md   — MCQ contract (15 items, >30KB, EC≥200, EW[CC]="" EW[non-CC]≥75 trap-verb, Flash+Name+Role, all numbers stated, twice recomputed)
%TEMP%\opencode\P2-066\CASE_SPEC.md     — case contract
%TEMP%\opencode\P2-066\solve_and_assert.js — Gate 1
```
Staged outputs go to `%TEMP%\opencode\P2-066\wave3\` etc. as bare JS array literals `[ {...}, {...} ]` of EXACTLY `<count>` objects, ASCII, double-quoted, no var/comments.

## Required Fields (every MCQ, exact set — `p2/P2_SCHEMA_STANDARD.md:12`)
Part=2, Section, QuestionID `P2-<L>-<NNN>`, question_state="Unprocessed", Part2OnlyFlag true, UniqueConceptKey `<L>-<NNN>-different-kebab-slug`, Stem, Choices{A,B,C,D}, CorrectChoice, ExplanationCorrect (≥200: principle by name → formula with substituted values → business interpretation with same stakeholder as stem → trap), ExplanationWrongA-D (EW[CC]="" ; EW[non-CC] ≥75 `Choice X <trap-verb>...`), Difficulty, DifficultyScore, CognitiveLevel, CalculationItem bool, ItemStyle="single-select", LOSTag, BlueprintDomain per pack (A Financial Statement Analysis, B Corporate Finance, C Decision Analysis, D Risk Management, E Investment Decisions, F Professional Ethics), FormulaReference, CommonTrapReference ≤100, Authorities[] non-empty, Topic `<L>.<NNN> kebab-slug`, VerifiedChecks[] ≥3 (must include `Recomputed: ... = ... → Choice X` for calc items + `Part2OnlyFlag verified true` + `EW[CC] empty` + `Authorities match` + `Stem names Flash + <Name>, <Role>`).

## Execution — Serialized, Checkpointed (DL-019)
For each cycle, process packs SEQUENTIALLY (A→B→C→D→E→F, one `integrate` at a time):
1. Read `AUTHOR_SPEC.md` + slot table for this pack (QID/LOSTag/Diff/Cog/CC exact)
2. Write staged file to `%TEMP%\opencode\P2-066\wave<N>\pack_p2_<pack>_cycle<N>.js` (>30KB; 10-count >20KB; 5-count >10KB)
3. Gates: `solve_and_assert.js` → `mcq_pipeline.js validate` — must be `{"ok":true}` 0 errors; if DL-045 silent-empty or field omission, rewrite once mechanically
4. Integrate: `mcq_pipeline.js integrate` (backup verified non-zero, splice-append, post-parse `before → after`, tail QID check)
5. `node scripts/preflight_p2.js` → 0 divergences, guard 74/74, census advances; log `Cycle N <PACK> <range> → <newTail> OK`
If any gate fails, quarantine that staged file, stop cycle, report QID + error + quote — do not proceed.

Case waves: interleave every 2 MCQ cycles, 3 cases per file via `case_pipeline.js` (same backup/verify). All new cases `question_state: "Unprocessed"` `Part2OnlyFlag:true`.

## Byte + Quality Gates
- 15→>30KB, 10→>20KB, 5→>10KB (deepen EC/EW until over)
- EC≥200, EW[non-CC]≥75 `Choice X <trap-verb>`, EW[CC]="" , no `always/never/impossible` in Choices (except `almost always`), no DL-037 `Yes,/No,` polarity mismatch, similar choice lengths, numeric distractors same units/format each distinct error path, no first-80 stem fingerprint duplicate vs pool

## Tend (after reaching 1,875/56)
- Append ONE `knowledge/REVISION_HISTORY_P2.md` entry (append, never edit prior) with: Date, Scope (QID ranges per pack, 430 MCQs + 23 cases), Before/After counts (1,445→1,875, 33→56, Certified 1,353 unchanged), Gates (Gate1+2-3 PASS per batch), Backups list (all `backups/pack_p2_*.js.bak-P2-066-*` + case backups, sizes), Spot-recompute 3 calc items per pack
- `npm run pipeline` (validate 0 errors → build-registry 1,875+56 → dashboard) — do NOT hand-edit `knowledge/MASTER_QUESTION_REGISTRY.md` (Rule 3) or `p2/CURRENT_BASELINES_P2.md` (preflight regenerates)
- `git status` should show modified packs+cases+history+registry/dashboard only

## What to Do Now
Start with **Cycle 3 Pack A: P2-A-326..340 (15 items)** as the pilot for this Muse Spark winner's remaining run (Muse Spark batch `A311-325` just certified 15/15 first-pass vs Minimax 50+ errors — `p2/P2-066_COMPARE_REPORT.md:1`). Dispatch one general agent at a time; if context fills, checkpoint after each pack and resume from live tails (`scripts/preflight_p2.js` + Function-constructor parse).

Report when done: Before/After table per pack (same shape as Cycle 1 remediation report), backup filenames/sizes, preflight/guard/validate, and that all 430+23 are `Unprocessed` and cert-eligible (6-dim HIGH) while Certified stays 1,353 until next certification wave.
