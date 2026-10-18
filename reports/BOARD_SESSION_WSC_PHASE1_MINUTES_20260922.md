# BOARD SESSION — WS-C Phase 1 Review (2026-09-22) — Minutes as Convened

*Convened: 4 seats called, 1 seated. The stewardship-inspector, registry-integrity, and governance-validator seats failed to seat (provider error, 3× identical). Per DL-045 the chair did not fabricate their verdicts — the chair conducted those three reviews directly from raw evidence below, and the drift-detector review is independent. Lane: Light (review only; no writes made).*

*Recorded to `reports/` 2026-09-22 on chair's authorization ("file these minutes"). Transcribed verbatim; §Filing-Note appended by the recording agent.*

## Seated review: Drift-Detector (independent)

- **7 divergences classified:** S1–S4 foreign-pre-existing (app.js, may-core.js, may-learner-state.js: HIGH; styles.css: MEDIUM) · S5–S7 expected-authorized LOW (P2 A+22/B+20/C+38, all Unprocessed, Certified intact at 3450)
- **Count stability: STABLE** — grep census and parser census agree byte-identical across runs (3530 QIDs / 3450 Certified / 0 duplicates)
- **`--fix`: SCOPE, not blanket** — authorizing all-7 would launder ~1,210 insertions of unreviewed delivery/coaching code sight-unseen; refresh P2 rows only, hold S1–S4 against the owning session
- **Control gaps found:** untracked backlog file (registry gap); generated-output overwrites with no fingerprint pin; **most serious — P2 case-pack edits and a Certified key flip (E-188, D→B) produce zero coherence signal** (recommends extending coherence to P2 case hashes); ~40 uncommitted deletions needing §3.1 staged authorization before commit

## Chair's direct reviews (evidence, not delegation)

**Stewardship (learner-safety/content): CLEAN.** 0/61 touched items Certified or pool-reachable (Certified 3450 before = after; 80 Unprocessed excluded from Tier-1 delivery). All 61 keys author-derived from stem arithmetic, corroborated by B-num screen 0 flags on new QIDs. Inserter enforced EW[CC]="" + EW≥50 + EC≥100 (abort-on-fail); pipeline ExplanationConsistency 0, Mathematical 0. No new defect-class introduction. Debt created: 0.

**Registry: COHERENT-WITH-DOCUMENTED-EXCEPTIONS.** QIDs 3530 unique/0 dups (two methods); UCKs collision-free; backlog ranges present exactly once each. Discrepancies adjudicated: "60 remaining" is header prose vs the batch plan's own 20+25+13=58 — immaterial, executed = planned. C-tally-28-vs-38 material only for the certification wave, which must use actuals (D16/A7/B8/C7, recorded in history). Baseline staleness quantified (+22/+20/+38); concur: `--fix` = SCOPE.

**Governance: STOP-CONDITIONS CLEAR, MITIGATION EFFECTIVE, TOOLING FIT-WITH-GAPS.** Batches 20/25/13 ≤ Rule 5; zero state flips; zero Certified touches; Rule 17 evidence basis recorded. The 3→0 error remediation verified genuine (CCs intact, FRs present, 257–302 chars). Gaps for next wave: no independent arithmetic re-derivation gate (B-num backstop only), no §19.4 numeric-multiset clone scan yet (acceptable while Unprocessed — mandatory pre-certification).

## Motions carried

- **M1 — Accept WS-C Phase 1 (58 items + 3 fills) as Tend-complete with documented exceptions.** Unanimous of seated members.
- **M2 — Authorize P2-rows-only baseline refresh** (S5–S7), excluding S1–S4; owning May/app session must submit its 4 diffs separately. Needs explicit go (not run in-session).
- **M3 — Certification wave prerequisites recorded:** six-dimension verification + numeric-multiset/Topic clone scan + semantic re-run before any of the 80 Unprocessed flips; use actual position tallies, not backlog §11.4.
- **M4 — Open control items (not this session):** P2 case-hash coherence extension; untracked-backlog registration/commit decision; §3.1 deletion bundle; E-188 key-flip provenance review.

## Filing-Note (recording agent, 2026-09-22 — read-only corroboration, no content changes)

- **E-188 corroborated in current file:** `p2/pack_p2_e.js` shows CorrectChoice B, Certified, with `recertification_batch: P2-REM-003` / `recertification_date: 2026-09-17` + Rule 13 flag true. Provenance review (M4) = confirm P2-REM-003's authorization record — lighter than a stamp-less flip.
- **M2 execution caution:** `scripts/rebuild_baselines.js` exposes only `--dry-run` / `--legacy` — no P2-rows-only scope exists; `baseline_coherence.js --fix` scope unverified. Do NOT execute M2 until a scoped mechanism is confirmed, and sequence it at WS-C Tend/quiescence (WS-C session active — no mid-wave refresh per DL-019 family). Recommendation: M2 = WS-C Tend action item.
