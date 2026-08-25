# Board Determination — DL-046 Remediation Program

**Date:** 2026-08-24
**Authority:** User scope ruling (b) — full class, all three phases
**Lane:** Full Governance Lane (pack-file content changes)
**Companion data:** `reports/BOARD_DECISION_DL046_REMEDIATION.json` (populated at closure)

---

## 1. Scope

Remediate the leading-whitespace choice-value corruption class (DL-046 expansion): **43 corrupted slots across exactly 39 QIDs**, all on `question_state: "Certified"` items, pool-wide (Packs A/B/D/E). Original single-instance filing expanded by evidence-gathering census; count reproduced independently via canonical-parser census, stable across two consecutive runs (§6).

## 2. Census verification (ruling basis)

| Verification point | Result |
|---|---|
| Count stability (§6) | 43 slots / 39 QIDs, identical across two consecutive runs |
| Learner exposure | All 43 slots on Certified items — live, pool-wide |
| Reconstruction method | EW-corroboration confirmed against raw files on exemplar set |
| P1E-A-024 | Verified verbatim; "All convertible securities" approved |

## 3. Amendments (all accepted)

1. **Slot-level manifest.** Four items carry two corrupted slots each (P1E-B-041, P1B-C-135, P1B-D-109, P1B-F-139) — hence 43 ≠ 39. Rule 5 batches run on objects touched (≤30).
2. **No pre-bias on sub-class split.** Long-sentence hits presumed same lost-first-token signature (e.g., P1B-F-148 D `" three deficiencies are equally severe…"` → "*All* three…"); triage confirms per-item.
3. **Constitutional guard (Phase 2):** no guessed reconstructions (Constitution §7). EW-corroborated or sibling-forced tokens restore; anything else = **DEFER** in manifest + log. Known trap: P1E-E-037 slot D (DL-030 answer-key correction D→B) — reconstruction must fit post-correction stem; legitimate DEFER candidate.
4. **Detection-rule refinement:** precise signature is **raw value begins with whitespace** (zero FPs against 2,620 records) — codified in DL-046 amendment, superseding the proposed length floor (<8 chars ≈700 FPs on legitimate numeric choices).

## 4. Standing conditions

- DL-003 quantifier-role column per restored slot (tested-concept = restore / decorative = rewrite without); CAQS §15.3 exception tags on every restored absolute; one-line DL-003 cross-note.
- §3 backups per pack file before first touch.
- Contemporaneous REVISION_HISTORY entries per batch.
- Post-battery: parse clean · preflight ×2 · validate Errors 0 · pipeline green · CC/EW/state untouched on all 39 · **leading-whitespace census re-run expecting 0**.

## 5. Phases

| Phase | Scope | Gate |
|-------|-------|------|
| 1 — Triage | All 43 slots: classify (true truncation / leading-space-only / FP), verify state + EW corroboration, propose reconstructions with confidence basis, DEFER where unevidenced | Authoritative manifest |
| 2 — Reconstruct | Per-slot intended text; quantifier-role column; exception tags | Fix manifest approved |
| 3 — Apply | Batched ≤30 objects, backups, surgical edits, full battery | Ledgers + DL-046 resolution |

## 6. Status

- Phase 1: **COMPLETE, ACCEPTED.** Census 43/39 exact (zero pack_c, zero non-Certified). 43 TRUNCATION / 0 leading-space-only / 0 FP. 40 reconstructions proposed (22 EW-verbatim, 10 hybrid, 8 sibling-forced), 3 DEFER. Quantifier roles: 34 tested-concept / 4 decorative / 2 none. Zero mandatory §15.3 tags.
- Phase 2: **COMPLETE — fix manifest finalized by Board determination** (see §7).
- Phase 3: READY — awaiting one ruling (P1E-C-092 disposition).

## 7. Phase 2 Board determinations

1. **37 reconstructions approved.** Hybrid class ratified: in every case EW rebuts precisely the universal/scope claim the restored quantifier asserts. **Minimal-prepend invariant:** surviving text never altered (P1B-C-135 C keeps "the most revenue").
2. **Alternate picks:** C-135 C=Every · F-139 B=Every · D-109 B=All · D-044 B=All · D-053 D="All actual costs" (lowest confidence; implementer sanity-checks full stem pre-write) · D-074 D=All · A-024 C="All convertible securities" (pre-approved).
3. **DEFER confirmed (3):** P1-BD-075 D · P1E-C-070 C · P1E-C-092 D (superseded by item-level ruling below).
4. **P1E-C-092 ITEM RULING (recommended, veto window):** stem numerics stripped — unanswerable as stored. **Archive** per §9.2 (content preserved, removed from pool); ripple: Certified 2620→2619 + CURRENT_BASELINES update in-wave. Alternatives rejected: leave-broken (learner-safety) / invent figures (§7).
5. **Companion repairs in-wave, separately ledgered:** 3 propagated EW fields (paired quote-wrap repair); P1B-B-133 EW[A] topic-mismatch rewrite (DL-010-class line item).
6. **Explicitly out of scope:** P1B-D-109 duplicate-EW pair (DL-013 residue); 3 cosmetic typos.
7. **Batching:** 2 batches (20+19 QIDs, Rule 5). Battery amendment: final whitespace-census = 0 outside DEFER set.

## 8. Phase 3 Dispatch (2026-08-24)

**Archive ruling CONFIRMED** with aggravating evidence: C-092's corrupted slot D **is the CorrectChoice** on a `CalculationItem: true` item with an uncomputable stem — the only CC-touching corruption in the class. Conditions binding: state-only change; REVISION_HISTORY revert instructions (prior state + pack hash); baseline recapture in-wave (2620→2619); DL-046 amendment records resolved-by-archive + CC-hit severity.

**Arithmetic correction (user's reconciliation gate):** accepted "37 restorations" figure was wrong — inspector handoff double-subtracted DEFERs. Authoritative: **40 restored + 2 deferred + 1 archived = 43 slots / 39 QIDs** (36 restored-QIDs). Objects touched = 37 → batches 19+18.

**Execution order issued:** scope (40 prepends, 3 EW quote-wraps, 1 EW rewrite, 1 archive, 1 baseline recapture), invariants (minimal-prepend; CC/state untouched except C-092; D-053 stem sanity-check; DEFER slots zero-write), sequence (backups → edits → per-slot checks → contemporaneous ledgers), closeout battery (parse ×4, preflight ×2 @2619, validate 0, pipeline green, harness gates, **whitespace census = 0 across active items EXCLUDING the DEFER manifest {P1-BD-075/D, P1E-C-070/C} — absolute-zero over the full pool is NOT the gate and must not be forced**), ledger requirements (disposition table summing 43/39; dual detection signatures; DL-003 cross-note; DL-010 line item; **process lesson, verbatim:** *"Paraphrase-drift control: Two pre-dispatch errors (disposition sum 37-vs-40; census gate worded as absolute zero vs. exclusion-set) originated in prose summaries while the formal manifest remained correct. Rule: acceptance criteria are frozen in the written record only; prose restatements carry no authority in either direction."*).

**Acceptance criteria FROZEN (user-run, §5 independent):** (1) disposition table 40/2/1 = 43 slots / 39 QIDs, slot-level enumeration; (2) independent canonical-parser census re-run — zero except named DEFER slots; (3) preflight ×2 at 2619, raw output; (4) C-092 diff = state-field-only + revert instructions present + baseline ripple shipped in-wave; (5) sampled reconstruction spot-checks against EW/sibling anchors + CC/state/EW untouched + DL-008/DL-026 regression scan on touched set.

---

*Drafted by the Executive Architecture Board, 200-Series.*
