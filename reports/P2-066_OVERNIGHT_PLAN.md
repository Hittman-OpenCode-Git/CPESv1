# P2-066 — Overnight Completion Program (Remaining Budgeted Questions)

**Date:** 2026-08-26/27 (overnight)
**Authority:** P2-064 CHECKPOINT CLOSEOUT resume note + CURRENT_BASELINES_P2.md post-P2-065
**Lane:** Full Governance — staged subagents (orchestrator-only integration per DL-019)
**Mission:** Complete the remaining budgeted P2 pool to 2,500 MCQs + 75 cases

---

## 1. T0 Anchor (verified 2026-08-27T01:26Z via preflight_p2)

| Pack | File | Current | Target | Remaining | Next QID |
|------|------|---------|--------|-----------|----------|
| A | p2/pack_p2_a.js | 295 | 500 | 205 | P2-A-296 |
| B | p2/pack_p2_b.js | 220 | 500 | 280 | P2-B-221 |
| C | p2/pack_p2_c.js | 305 | 625 | 320 | P2-C-306 |
| D | p2/pack_p2_d.js | 170 | 250 | 80 | P2-D-171 |
| E | p2/pack_p2_e.js | 180 | 250 | 70 | P2-E-181 |
| F | p2/pack_p2_f.js | 170 | 375 | 205 | P2-F-171 |
| **Total MCQs** | | **1,340** | **2,500** | **1,160** | |
| Cases p2_1 | p2/case_pack_p2_1.js | 13 | 25 | 12 | CBQ21-* |
| Cases p2_2 | p2/case_pack_p2_2.js | 10 | 25 | 15 | CBQ22-* |
| Cases p2_3 | p2/case_pack_p2_3.js | 10 | 25 | 15 | CBQ23-* |
| **Total cases** | | **33** | **75** | **42** | |

Stable across 3 sources: Function-constructor parse, `preflight_p2`, grep baseline. Certified 1,338 unchanged — all new items `Unprocessed`.

---

## 2. Wave Plan (max 30 per change-set, Rule 5)

MCQs are authored in 15-item batches (bytes>30KB gate). 6 packs in parallel = 90 per cycle while all packs have ≥15 remaining. Once D/E taper, their slots are reassigned to the largest remaining packs (C, B, A, F) so every cycle stays at a 90-item footprint until the final partial wave.

| Cycle | A (+15) | B (+15) | C (+15) | D | E | F (+15) | Cycle total | Cumulative added | Pool total |
|-------|---------|---------|---------|---|---|---------|-------------|----------------|------------|
| 1 | 296-310 | 221-235 | 306-320 | 171-185 | 181-195 | 171-185 | 90 | 90 | 1,430 |
| 2 | 311-325 | 236-250 | 321-335 | 186-200 | 196-210 | 186-200 | 90 | 180 | 1,520 |
| 3 | 326-340 | 251-265 | 336-350 | 201-215 | 211-225 | 201-215 | 90 | 270 | 1,610 |
| 4 | 341-355 | 266-280 | 351-365 | 216-230 | 226-240 | 216-230 | 90 | 360 | 1,700 |
| 5 | 356-370 | 281-295 | 366-380 | 231-245* | 241-250* | 231-245 | 85† | 445 | 1,785 |
| 6 | 371-385 | 296-310 | 381-395 | — | — | 246-260 | 45 | 490 | 1,830 |
| 7 | 386-400 | 311-325 | 396-410 | — | — | 261-275 | 45 | 535 | 1,875 |
| 8 | 401-415 | 326-340 | 411-425 | — | — | 276-290 | 45 | 580 | 1,920 |
| 9 | 416-430 | 341-355 | 426-440 | — | — | 291-305 | 45 | 625 | 1,965 |
| 10 | 431-445 | 356-370 | 441-455 | — | — | 306-320 | 45 | 670 | 2,010 |
| 11 | 446-460 | 371-385 | 456-470 | — | — | 321-335 | 45 | 715 | 2,055 |
| 12 | 436-475‡ | 386-400 | 471-485 | — | — | 336-350 | 45 | 760 | 2,100 |
| 13 | 476-490 | 401-415 | 486-500 | — | — | 351-365 | 45 | 805 | 2,145 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

* Cycle 5 partial: D needs 80 total → 60 via cycles 1-4, remaining 20 split as 15+5; E needs 70 → 60 via cycles 1-4, remaining 10. The pipeline supports 5/10-count partial batches (bytes>10KB/20KB). Cycle 5 shown as 15+10 for D/E; cycle 6+ D/E are done.
† Cycle 5 still 90-item footprint if we pad D/E shorts with overflow from C/B (cleaner: run exact shorts and accept 85). Either is valid; validator accepts any count ≤30.
‡ Waves 6+ taper: only A/B/C/F remain. Each is 15 per cycle = 60 per cycle if we run 4-packs, or keep 6-agent footprint by doubling up C/B. Recommended: 4 agents ×15 = 60 per cycle for simplicity after D/E complete.

**Simplest overnight execution:** Cycles 1-4 as 6×15 (360 items), Cycle 5 as mixed partial for D/E (85 items), then Cycles 6-14 as 4×15 (60 per cycle × ~12 cycles = 720) to close the remaining ~715. Total ~13-14 cycles to reach 2,500.

**Case waves (42 cases, 3 per file per wave):** interleave one case wave per two MCQ cycles (3 cases ×3 files = 9 cases per case wave; 5 case waves = 45, so 4 full + 1 partial of 6). Case waves use `case_pipeline.js` with the same backup-before-write discipline.

---

## 3. Per-Batch Slot Table (copy verbatim into subagent prompts)

Each 15-item batch uses this fixed mix (identical to P2-064, machine-checked by mcq_pipeline.js):

- CC: 4A / 4B / 4C / 3D, max streak 2
- Difficulty: 2 Easy (DS1) / 3 Moderate-Easy (DS2) / 5 Moderate (DS3) / 3 Difficult (DS4) / 2 Very Difficult (DS5)
- Cognitive: 6-7 Apply / 3 Analyze / 2 Evaluate / 3 Remember-or-Understand (Evaluate DS≥4 with named Flash decision-maker + defensible alternatives; Analyze DS≥3; U/R capped DS≤2)

LOSTag: assign per item from the pre-assigned slot table in the dispatch prompt (pack LOS sets: A.1-9, B.1-9, C.1-7, D.1-5, E.1-6, F.1-7). FormulaReference: FA-*, CB-*, DA-*, RM-*, ID-*, or "" for F ethics.

---

## 4. Reusable Infrastructure (temp dir survives reboot)

```
%TEMP%\opencode\P2-066\
  mcq_pipeline.js   — validate <stagedFile> <pack a-f> <startNum> <count>
                       integrate <stagedFile> <pack>
  case_pipeline.js  — validate <stagedFile> <fileNum 1|2|3> <expectedCount> <allowedCaseIdsCsv>
                       integrate <stagedFile> <fileNum>
  AUTHOR_SPEC.md    — MCQ contract (read fully before writing)
  CASE_SPEC.md      — case contract
  census.js         — live pool census (Function-constructor parse)
  wave1/ wave2/ ... — staged outputs per cycle
```

All three scripts enforce Rule 2/6/10/11/13, DL-013 boilerplate scan, Topic/UCK format, LOSTag/FormulaReference allowlists, Flash anchor, stem fingerprint dedup, and pool-wide UCK/collision checks. Integration does backup-before-write (`backups/pack_p2_*.js.bak-P2-066-*`), byte-preserving splice-append, and post-parse order/length assertions before write.

---

## 5. Overnight Runner

A single orchestrator loop drives the whole program without manual re-dispatch:

```powershell
# Kick off overnight (runs until pool hits 2,500):
node C:\Users\User\AppData\Local\Temp\opencode\P2-066\overnight_runner.js --cycles 14 --mode mcq
# Or case-interleaved:
node C:\Users\User\AppData\Local\Temp\opencode\P2-066\overnight_runner.js --cycles 14 --mode mixed --case-every 2
```

The runner (scaffold at %TEMP%\opencode\P2-066\overnight_runner.js) does per cycle:
1. Spawn 6 (or 4) parallel authoring subagents, one per pack, with the pre-built slot table and LOS assignments.
2. Validate each staged file via `mcq_pipeline.js validate`; on DL-045 silent-empty or field-omission, retry once then mechanically repair (restore question_state, fix Topic/UCK, reword absolutes).
3. Integrate serially via `mcq_pipeline.js integrate` (one pack at a time — DL-019 prevention).
4. Run `preflight_p2` + `validate:p2` (base-schema ERROR 0, HOLD 0, MIGRATION 0) and log census.
5. On any gate failure, quarantine the cycle and checkpoint; do not proceed to next cycle.

For this repo the runner is launched as an OpenCode background task so it survives session close. Progress is checkpointed after each cycle (no staged-but-unintegrated content held, per P2-064 §CHECKPOINT CLOSEOUT discipline).

---

## 6. Verification Battery (per cycle)

- Function-constructor re-parse OK and tail QID matches expected next
- preflight_p2 0 divergences; guard 74/74 PASS
- validate:p2 base-schema ERROR 0 (GRANDFATHERED count grows, MIGRATION_REQUIRED 0, HOLD_FOR_SOURCE 0)
- Certified unchanged (until separate certification wave)
- Spot-check 2-3 calc items per cycle via VerifiedChecks recomputation

---

## 7. What This Session Delivered

- Temp infra cloned from P2-064 → P2-066 with updated stage path and census anchor
- AUTHOR_SPEC.md refreshed for partial-batch support
- This plan document with collision-free QID allocations and cyclic map
- Overnight runner scaffold location and invocation

Remaining work is execution: dispatch Cycle 1 now or schedule for overnight. Say "launch cycle 1" to start immediately, or "run overnight" to queue the full 14-cycle program.
