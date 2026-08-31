# Task Prompt — Certify P2-A-311..325 (Muse Spark 1.2 Batch) — 6-Dimension HIGH Confidence

**Model:** Muse Spark 1.2 (opencode/muse-spark-1.2-contributor-free) — certifier role
**Lane:** Full Governance — you will write to `p2/pack_p2_a.js` (flip `question_state` Unprocessed → Certified) and `knowledge/REVISION_HISTORY_P2.md`
**Scope:** EXACTLY 15 items: P2-A-311..325 (Financial Statement Analysis, Cycle 2 Pack A pilot, staged at `%TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js`, 57,493 bytes, Gates 1+2-3 PASS)
**Authority:** `knowledge/CAQS_v1.0.md:1.6` (6-dim verification), `p2/P2002_CERTIFICATION_STANDARD.md:1`, `knowledge/QUESTION_METADATA_STANDARD.md:9` (states), `p2/P2_SCHEMA_STANDARD.md:1` (Part2OnlyFlag, ItemStyle), governance guard 14 rules BLOCK (`.opencode/plugins/governance-guard.js:1` — Rule 1 REVISION_HISTORY pairing, Rule 2 DL-008, Rule 5 ≤30 per change-set, Rule 6 DL-026, Rule 11 cognitive floors, Rule 13 Part2OnlyFlag)

## T0 Verify (do not skip)
1. Run `node scripts/preflight_p2.js` — expect `A310/500 B235/500 C320/625 D185/250 E195/250 F185/375 = 1,430 total, 1,338 Certified, 90 Unprocessed, 2 Archived`, 0 divergences, guard 74/74
2. Confirm `%TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js` exists, 15 objects, gate re-verified:
   `node %TEMP%\opencode\P2-066\solve_and_assert.js %TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js` → `{"ok":true}`
   `node %TEMP%\opencode\P2-066\mcq_pipeline.js validate %TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js a 311 15` → `{"ok":true}`
3. If Gates fail, STOP — do not certify

## Step 1 — Integrate (if not yet in pack)
The batch is staged in `compare/muse_spark/` — it is NOT yet in `p2/pack_p2_a.js` (current tail is A310). You must integrate first, serially per DL-019:
`node %TEMP%\opencode\P2-066\mcq_pipeline.js integrate %TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js a`
— this does backup-before-write to `backups/pack_p2_a.js.bak-P2-066-*` (verify non-zero), byte-preserving splice, post-parse `310 → 325`, tail `P2-A-325`
After integrate, re-run `node scripts/preflight_p2.js` → expect `A325/500 = 1,445 total`, staged Unprocessed 90 → 105 (90 prior + 15 new), Certified 1,338 unchanged

## Step 2 — Six-Dimension HIGH-Confidence Verification (per item, evidence before opinion)
For EACH of P2-A-311..325, independently verify (solve from stem numbers WITHOUT reading stored CorrectChoice first, then compare):
- **D1 Correctness** — against U.S. GAAP / IFRS / ICMA CSO: recompute calc items from stem numbers (FA-01..FA-19 formulas), confirm choice text matches recomputed value; conceptual items confirm principle citation (ASC 606/326/330/280/323/470/805/260/350 etc.) matches governing standard
- **D2 Precision** — fact pattern yields exactly one defensible answer; no missing assumptions or contradictory data; all numbers needed are in stem (rates/factors stated)
- **D3 Difficulty calibration** — stored Difficulty/DS matches LOS depth verb and cognitive demand (Easy 1, ME 2, Mod 3, Diff 4, VD 5; Rule 11: Evaluate DS≥4 with named Flash decision-maker + alternatives, Analyze DS≥3, U/R DS≤2)
- **D4 Distractor engineering** — each non-CC EW maps to a real misconception / plausible calc path, distinct traps (wrong denominator, pre-tax vs after-tax, ending vs average, sign flip, omitted adjustment), not guessable
- **D5 Blueprint alignment** — LOSTag `A.1-A.9` + Topic `A.<NNN> kebab-slug` + UCK `A-<NNN>-different-slug` + FormulaReference FA-* match item content and `P2_EXPANSION_PLAN.md` domain A
- **D6 Part 2 relevance** — tests Part 2 FSA concepts, not Part 1-exclusive (no ASC 606 Part 1 leakage — all ASC is Part 2 FSA scope)

Each dimension must be HIGH confidence. Any LOW → resolve and document before certifying that item (per `CAQS 1.7.2`). This batch already passed hardened Gates 1-3, so expect HIGH, but you must still independently solve 3 calc items (pick A-313, A-317, A-322) and record `Recomputed:` lines.

## Step 3 — Distractor Tier Map
For each item, derive `DistractorTierMap` (A/B/C/D → tier 1/2/3 per `BUILD_TIME_VERIFICATION_STANDARD.md`): tier 1 = most attractive distractor, tier 3 = least attractive. Record in `REVISION_HISTORY_P2.md` entry as `A:2, B:1, C:3` style per item (or table).

## Step 4 — Flip `question_state` (Rule 1, Rule 5)
- Edit `p2/pack_p2_a.js` in place: for QIDs P2-A-311..325, set `question_state: "Certified"` (was "Unprocessed"), add `certification_batch: "P2-066-Cycle2-A"` and `certification_date: "2026-08-27"` if schema has those fields, preserve all other fields byte-identical (especially `CorrectChoice`, `EW[CC]=""`, `Part2OnlyFlag:true`, `ItemStyle:"single-select"`). Do NOT touch `CorrectChoice` or `ExplanationCorrect` — Gate 1 already verified they match.
- Batch cap: 15 ≤30 — one change-set is allowed. Do NOT batch with other packs.
- Backup before edit: `copy p2/pack_p2_a.js → backups/pack_p2_a.js.bak-P2-066-cert-20260827*` (verify non-zero) — the `mcq_pipeline.js integrate` already backed up pre-integrate; this cert flip needs a second backup per `knowledge/BACKUP_PROTOCOL.md`.

## Step 5 — REVISION_HISTORY_P2.md (Rule 1 — must pair with state change)
Append ONE entry to `knowledge/REVISION_HISTORY_P2.md` (append, never edit prior entries):
```markdown
## Session P2-066 — Certification: P2-A-311..325 (Muse Spark 1.2, 15 MCQs) — Rule 1 + Rule 5
**Date:** 2026-08-27
**Certifier:** Muse Spark 1.2 (opencode) — 6-dim HIGH confidence
**Scope:** P2-A-311..325 (15 MCQs, Financial Statement Analysis, Cycle 2 Pack A pilot, testing cap 1,875)
**Before:** 1,445 total / 1,338 Certified / 105 Unprocessed / 2 Archived (A325)
**After:** 1,445 total / 1,353 Certified / 90 Unprocessed / 2 Archived (A325, +15 Certified)
**Six-dim:** D1 HIGH (recomputed 3 calc items: A-313 FIFO 140k, A-319 FV 15M, A-322 ARO 18.255M — all match CC), D2 HIGH (single defensible answer), D3 HIGH (2E/3ME/5M/3D/2VD, cog 7A/3An/2E, Rule 11 floors met), D4 HIGH (45 EWs choice-specific, trap verbs), D5 HIGH (LOSTag A.1-A.9, FA-*), D6 HIGH (Part 2 FSA)
**DistractorTierMap:** per-item table (A:2 B:1 C:3 ...) — 15 rows
**Gates:** Gate1 solve_and_assert PASS, Gate2-3 mcq_pipeline validate a 311 15 PASS, preflight 0 divergences, guard 74/74
**Backups:** backups/pack_p2_a.js.bak-P2-066-* (integrate + cert)
```

## Step 6 — Post-Cert Battery (evidence before synthesis)
1. `node scripts/preflight_p2.js` → `A325 B235 C320 D185 E195 F185 = 1,445 total, 1,353 Certified (+15), 0 divergences, guard 74/74`
2. `grep -c '"QuestionID"' p2/pack_p2_a.js` → 325
3. `grep -c '"question_state": "Certified"' p2/pack_p2_a.js` → 325 (or parse check: 15 newly Certified in 311-325)
4. `node scripts/validate.js` → `0 errors` (warnings pre-existing P1 1969 OK), no new errors
5. `npm run pipeline` (if Full Governance Tend) — or at least `node scripts/build_master_registry.js` — to regenerate `knowledge/MASTER_QUESTION_REGISTRY.md` (Rule 3: never hand-edit)
6. Verify `knowledge/CURRENT_BASELINES_P2.md:10` reflects new counts (or note that preflight regenerates it — do not hand-edit between sessions unless at Tend)

## Hard Stops
- Do NOT certify if any D1-D6 is not HIGH — leave Unprocessed and log reason
- Do NOT change CorrectChoice, Choices, or ExplanationCorrect during certification — that is content authoring, not certification; would violate `Rule 4` (recomputed note)
- Do NOT exceed 30 per change-set (15 is safe)
- Do NOT edit `MASTER_QUESTION_REGISTRY.md` by hand (Rule 3)
- All file writes must have timestamped `.bak-*` with non-zero size before edit (`knowledge/BACKUP_PROTOCOL.md`)

## Output
When done, report: table Before/After per pack (same shape as Cycle 1 report), backup filenames + sizes, preflight + guard + validate results, and the 15-item DistractorTierMap. Mark `CERTIFIABLE 15/15` or list any Held items with reason.
