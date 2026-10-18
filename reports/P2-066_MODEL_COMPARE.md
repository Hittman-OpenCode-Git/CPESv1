# P2-066 — Model Comparison: Muse Spark 1.2 vs Minimax M3 (Batch A311-325)

**Purpose:** Head-to-head quality comparison on the same slot table (15 items) under the hardened pipeline. Both batches use identical AUTHOR_SPEC, same QIDs/LOSTag/Difficulty/Cog/CC, same byte/stem/EW gates — only the authoring model differs.

**Batch:** Cycle 2 Pack A — `P2-A-311..325` (15 MCQs, Financial Statement Analysis)
**Slot table:** `p2/P2-066_CYCLE1_SLOTS.md` Cycle 2 (A311-325) + `scripts/generate_p2066_slots.js --cap-75`
**Hardened gates:** Gate 1 `solve_and_assert.js`, Gates 2-3 `mcq_pipeline.js validate` (EW verb, stem Flash+Name+Role)
**Testing cap:** 1,875 MCQs (75% of 2,500) — this batch is the pilot for that cap

## How to Run

```powershell
# 1. Generate slot table (already at p2/P2-066_CYCLE1_SLOTS.md Cycle 2)
node scripts/generate_p2066_slots.js --cap-75

# 2. Launch comparison (dispatches 2 parallel general agents, one per model)
node scripts/p2_compare_runner.js --pack a --start 311 --count 15
# Runner writes:
#   %TEMP%\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js
#   %TEMP%\opencode\P2-066\compare\minimax_m3\pack_p2_a_311.js
# Then validates both and emits p2/P2-066_COMPARE_REPORT.md
```

Or dispatch manually via Task tool:
- Task A: `subagent_type="general"`, model Muse Spark 1.2, prompt = `prompts/compare_muse_spark.md`
- Task B: `subagent_type="general"`, model Minimax M3, prompt = `prompts/compare_minimax_m3.md`

## Evaluation Rubric (same for both)

| Gate | Check | Pass Criteria |
|------|-------|---------------|
| Gate 1 | solve_and_assert | 0 recompute mismatches (CC matches EC recomputed value) |
| Gate 2 | EW specificity | 45/45 EW[non-CC] start `Choice X <trap-verb>` (≥75 chars, no boilerplate) |
| Gate 3 | Stem contract | 15/15 contain `Flash + Full Name + Role` |
| validate | mcq_pipeline.js | 0 errors, byte >30KB |
| Quality | EC depth | ≥200 chars, principle + formula with values + business interpretation |
| Certifiability | 6-dim HIGH | Would pass CAQS 1.6 certification review |

## Output

`p2/P2-066_COMPARE_REPORT.md` — auto-generated with per-model validate JSON, gate results, and side-by-side quality notes (which model produced more certifiable items on first pass).
