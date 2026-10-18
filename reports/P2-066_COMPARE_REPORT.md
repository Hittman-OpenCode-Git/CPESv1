# P2-066 Model Comparison Report — P2-A-311..325 (15 items)

**Generated:** 2026-08-27T16:27:25.268Z
**Pack:** A P2-A-311..325 — Financial Statement Analysis (Cycle 2 pilot, testing cap 1,875)
**Hardened gates:** Gate1 solve_and_assert + Gates 2-3 mcq_pipeline validate (EW verb, stem Flash+Name+Role, byte >30000)

---

## Results

| Model | Gate 1 (recompute vs CC) | Gate 2-3 (validate) | Overall | Errors (first 5) |
|-------|--------------------------|---------------------|---------|------------------|
| muse_spark | PASS | PASS | CERTIFIABLE (first-pass) | — |
| minimax_m3 | PASS | FAIL | NEEDS FIX | `[item 1] EW[B] must start "Choice X <trap-verb>" with specific misconception (e.`<br>`[item 1] EW[C] must start "Choice X <trap-verb>" with specific misconception (e.`<br>`[item 1] EW[D] must start "Choice X <trap-verb>" with specific misconception (e.`<br>`[item 1] stem lacks "Flash + named stakeholder full name + role" (e.g., "Flash M`<br>`[item 1] VerifiedChecks claims "Stem names Flash + stakeholder" but stem lacks i` |

---

## Recommendation

- If one model is CERTIFIABLE first-pass and the other NEEDS FIX, prefer the CERTIFIABLE model for remaining 445 MCQs to cap 1,875.
- If both NEEDS FIX, compare error counts — prefer fewer Gate 1 (correctness) failures over Gate 2-3 (style) failures.
- If both PASS, prefer the model with fewer warnings and deeper EC (principle + formula + business interpretation).

## Artifacts

- Muse Spark: `C:\Users\User\AppData\Local\Temp\opencode\P2-066\compare\muse_spark\pack_p2_a_311.js`
- Minimax M3: `C:\Users\User\AppData\Local\Temp\opencode\P2-066\compare\minimax_m3\pack_p2_a_311.js`
- Slot table: `p2/P2-066_CYCLE1_SLOTS.md` Cycle 2 + `scripts/generate_p2066_slots.js --cap-75`
- Gates: `%TEMP%\\opencode\\P2-066\\solve_and_assert.js` + `%TEMP%\\opencode\\P2-066\\mcq_pipeline.js`
