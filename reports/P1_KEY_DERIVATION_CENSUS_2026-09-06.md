# P1 Full-Pool Key-Derivation Census — Findings Report (2026-09-06)

**Lane:** Governance Light (read-only audit). No pack file, answer key, state, or registry was modified.
**Model:** `auto/best-coding` (local, $0), temperature 0 throughout. Parser: `scripts/lib/pack_parser.js` only; CorrectChoice always read from the same parsed object as EW fields (DL-029 compliant).
**Authoritative run:** Phase-0 v2 → `phase1_results.jsonl` + `phase1_retry.jsonl` → **`phase1_merged.jsonl`** (2620/2620, zero error rows) → **`phase2c_results.jsonl` / `phase2c_diff.json`** (corrected 20% re-derivation). The earlier `phase1_final.jsonl` (17:33) is STALE (prior session) and `phase2_diff.json` (built on it, 441 items, 16.8%) is SUPERSEDED — see §6.

## T0 — Preflight (1 divergence, read-only safe)

`npm run preflight`: QID counts 500/500/500/500/620 all OK; guard 74/74 PASS. **WARN: certified divergence — baseline 2620 vs raw 2602 (delta −18): Pack C 486, Pack D 496** (baseline §2 snapshot 500/500 is stale post-DL-012 archival of 18 clones: 14 C + 4 D = 18 ✓ reconciled). No HALT for a read-only audit; reported, not acted on.

## Phase 0 — Deterministic screens (run twice, identical yields, hash `75A5C152…`)

| Screen | Run 1 | Run 2 | Calibration (§5) | Assessment |
|--------|-------|-------|-------------------|------------|
| A fingerprints | 0 | 0 | ~0 | PASS — no contaminant spread (DL-047 sources fixed) |
| B EC lead-token echo | 21 | 21 | ~24 | PASS (within 2×) |
| C EC–stem mismatch | 0 | 0 | ~0–2 | PASS |
| D EW lowercase-fragment | 12 | 12 | ~12–14 | PASS |
| E generalized DL-010 | 234 | 234 | ~250 | PASS |
| **Union H** | **229** (A58/B40/C44/D40/E47) | = | ~250–300 | PASS |

No methodology HALT (nothing differs >>2×). Parse: 2620 records, 0 diagnostics, 2620 stems.

## Phase 1 — Census (`phase1_merged.jsonl`, 2620 lines)

| Disposition | n | Meaning |
|-------------|---|---------|
| agree | 1949 (74.4%) | derived == key, EC supports key (or neutral) |
| confirm-misassignment | 534 (20.4%) | derived == key BUT programmatic EC-recall points elsewhere — **heuristic artifact, see §5** |
| needs-human | 107 (4.1%) | derived ≠ key AND EC-recall doesn't support key (Pack B 67) |
| confirm-key-error | 30 (1.1%) | derived ≠ key but EC supports key (single-model claim) |

Coverage: initial run left 200 `JSON_PARSE_FAILED` (5 L-batches of 40); batch-20 retry recovered 181; single-item micro-retry recovered 19 → **2620/2620 with derivations, 0 error rows.**

## Phase 2 — Corrected 20% blinded re-derivation (supersedes `phase2_diff.json`)

Stratified exact-20%: H 46/229 + L 478/2391 + 26 force-included key-error QIDs = **550 items (21.0%)**, QIDs+text only (no Phase-1 verdicts).
**Raw agreement 509/550 = 92.5%; Cohen's κ (derived) = 0.900; κ (keyAgree) = 0.537.** Target was ≥95%: **MISSED by 2.5 pts** (above the <90% HALT line). 41 discordant items, ALL adjudicated (§4): in 28/41 the blinded P2 pass **agrees with the stored key** (P1 was the outlier); 9/41 P1 agreed with key (P2 outlier); 5/41 both≠key — all 5 read verbatim, keys verified correct (P1-B-060: $30,600≥$25,000→$0=D ✓ pack_a:6784-6792; P1-EC-069: Maria root-incompatibility→C ✓ pack_c:21449-21456; P1B-C-118/C-143/C-147: apparent contradiction was a block-boundary misread — Pack B objects are single-object content-first/metadata-second; each item's own Stem/CC/EC/Choices/EWs are internally consistent, e.g. P1B-C-119 Oak Valley $60k U with D=$60,000 U + EW_D="" pack_b:8179-8209).

## Adjudication verdict

**CONFIRMED key errors: 0. QUARANTINE LIST: empty.** 14 of 15 sampled Phase-1 "confirm-key-error" claims evaporate on blinded re-derivation (P2 agrees with key); the 15th (P1B-C-147) has P1/P2 disagreeing with each other (A vs B, key C) — reader instability, no positive evidence. P1E-E-037 (both passes derive D vs stored B) is model error: its note restates the pre-DL-030 error (Principle 15 = "all personnel" is Principle 14); DL-030's documented fix + re-derivation stands. The 107 needs-human and 534 confirm-misassignment rows remain **unconfirmed screen output, never defects** (§8).

## Control check (§5.4)

P1-C-049 → `agree` ✓. BUT AC-071–075 → `confirm-misassignment` (derived==key, programmatic ecAgree=false on short rotation-group ECs naming contrasted choices — a documented FP pattern). **Control FAILED for the disposition label: the E-screen/recall pipeline over-flags. Recalibration applied: all 534 misassignment dispositions downgraded to unconfirmed heuristic output.** No budget was spent reviewing them as defects.

## Residual limits (explicit)

1. Screens are heuristic; a wrong key with consistently-written explanations for it is invisible to every screen and gate — the census cannot rule this out (only 74.4% raw model/key agreement bounds it, and model judgment on Evaluate items is demonstrably unstable: κ_keyAgree only 0.537).
2. Case banks excluded (different schema). 8/10 DL-047 items carried no certification provenance — wave attribution remains weak.
3. Pack B single-object content-first ordering is a standing misread hazard for line-window readers — always parse, never eyeball blocks.
4. No new defect CLASS was confirmed → no DEFECT_LIBRARY.md entry filed (next free ID untouched). No REVISION_HISTORY.md entry (no content/state change, Light lane).

## Artifacts (audit trail)

`scripts/output/phase0_results_v2.json` (runs 1+2 identical) · `phase1_results.jsonl` · `phase1_retry.jsonl` · **`phase1_merged.jsonl`** (authoritative census, schema §6) · `phase2c_results.jsonl` · **`phase2c_diff.json`** (raw 92.5%, κ 0.900/0.537, 41-item discord list) · local-only helper scripts in `C:\Users\User\AppData\Local\Temp\opencode\` (summ0/1/2/3, probe_endpoint, retry_phase1, micro_retry, phase2_corrected). Per-item JSONL lines ARE the audit trail.
