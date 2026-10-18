# BOARD MEETING — Lessons Learned: P1 Certification Restoration & DL-066

**Date:** 2026-10-18 · **Type:** Board review (lessons learned, standing directives)
**Trigger:** DL-066-HANDSOLVE certification completion (80/80 P1 cases, 425/425 items)
**Session scope:** DL-066 verification crisis → hand-solve verification → wave certification → closeout
**Presiding:** Release Manager · **Attendees:** Accountant, Editor, Psychometrician, Validator, Case Author, JavaScript Architect, Reviewer

---

## 1. Session Outcome (Recorded First, Per §Backup Rule — Facts Before Analysis)

| Metric | Before | After |
|---|---|---|
| P1 cases Certified | 49/80 | **80/80** |
| P1 case items Certified | 262/425 | **425/425** |
| P1 In-Audit occurrences | 194 | **0** |
| P2 strict-eligible cases | 101/110 | 101/110 (9 archived = live-survivor dedup, zero content gap) |
| MCQ (P1) | 3,052/3,070 Certified + 18 Archived | unchanged |
| Governance guard | — | 123/123 PASS |
| Pipeline | — | GREEN (baseline-coherent) |
| probe:parity | — | PASS, 0 divergences |

**Work products:** `scripts/dl066_verify2.js` (correct verifier), `dl066_verify.js` (broken — retained as evidence), `scripts/dl066_certify_flip.js` (9-wave runner), `scripts/output/dl066_byte_range_solutions.json` + `dl066_verify2_results.json` (verification evidence), `scripts/output/dl066_final_census.js`.

**Genuine rank:** 4 defects found in 163 hand-solved items: 1 repaired stored key (CBQ4-D3-Q3, multi-select {1,3,4} → statement 3 only; the $38 absorption rate under theoretical-capacity 50,000 units), CBQ4-A1-Q3 adjudicated intact (verifier phantom — "empty-string match array" artifact), CBQ2-A2-Q1-style collateral from earlier DL-065 work none in this batch. 3 "mismatches" were subagent derivation errors with correct stored keys (CBQ-C3-Q5, CBQ-E1-Q5, CBQ4-F1-Q3).

**False rank:** five consecutive false "44/44 failure" claims across multi-session work — see §3.

---

## 2. Root Cause of the DL-066 Crisis (defect class, not incident class)

`dl066_verify.js` (the first verifier, 2026-10-17 era and prior attempts) had **three independent verification bugs**, each sufficient alone to produce a false failure:

| # | Bug | Symptom produced | Fix (in `dl066_verify2.js`) |
|---|---|---|---|
| B1 | **Stale-file reference** — verifier matched pack items against prompts extracted from `dl066_masked.json` (a snapshot of the file as of a *prior* masked state), not the live pack | "Item not found"/"MISMATCH" for items whose stems changed between snapshot and live | Line-number-independent ItemID lookup built from the live pack via string-aware bracket scanner |
| B2 | **Positional pairing** — solutions were paired to extracted items by array index, not by `itemId` | Every index shift downstream of any mismatch cascaded into false cross-item "failures"; a single real mismatch N would misattribute pertains to unrelated items | Solution rows keyed explicitly by ItemID; no positional assumptions |
| B3 | **Phantom blocks** — ItemID regex matched inside `ReferencedBy` exhibit arrays, creating synthetic "items" | Phantom items with no prompts → universal "verification failed" noise; e.g. CBQ4-A1-Q3 declared broken as an "empty-string array" that does not exist as such in the live pack | Match only cased pattern inside the Items array region, vetted post-parse |

Lesson (general): **a verifier is code that can be wrong about the wrongness of other code.** Verification tooling requires its own control set — a known-good sample must pass, and a seeded-defect sample must fail, before the verifier is allowed to rank real work.

---

## 3. Lessons Learned (Board-Approved, Institutionalized)

### L-01 — Subagent self-reports rank zero in a governance session
**Pattern:** Three subagent self-reported claims ("44/44 verified", "0 mismatches", "16/34 verified") were each contradicted by direct file evidence. The chat surface of an agent is a narrative artifact — with masked-snapshot + positional-parity bugs, the agent sincerely reports its broken tooling's numbers.
**Standing rule (extends §5):** Any claim from a subagent that gates content action must be reproduced by raw tool call in the parent session before it affects a decision. Subagent session summaries are *hypotheses to verify*, never evidence. Wording: "trust, then verify with tools you ran, not tools the subagent claims to have run."
**Disposition:** Already applied during this session (every "44/44" was independently falsified by running the verifier against bytes). Codify in AGENTS.md next revision.

### L-02 — Match the instance you repaired to the instance that will be delivered
**Driving story:** The verifier first matched masked-snapshot bytes (B1, §2) — the exact failure the 2026-09-29 DL-011 precedent already warned about ("verify against the version you will serve"). A verifier pointed at a stale snapshot of the same file produces confident wrong verdicts about live content.
**Standing rule:** Verification tooling must read the same bytes it will later assert on. If a test fixture mirrors live content, it needs a staleness gate (hash or mtime recorded at extraction).

### L-03 — "The solutions were fine all along" is a verification-tool failure mode
**Pattern:** The same 163 hand-solve solutions passed 152→158→162/163 once the verifier was fixed (plus 1 adjudicated phantom and 3 re-adjudicated as correct-per-solve-per-derivation). False-negative tooling consumed multiple sessions: every prior "26% failure" ledger flip, and pushed a premature v2.0.0 tag on fabricated numbers. Under-slightly-parity results iterated away are the canonical signature of a broken verifier, not of flaky authoring.
**Standing rule:** Before accepting any failure rate, prove the failure detector: control pass on known-good content, seeded-defect test on a fabricated fault. A counter that is not proven in both directions is meaningless in both directions.

### L-04 — Wave writes need coordinate discipline (see also 2026-09-29 DL-011)
**Pattern:** First flip run failed on a ±100 nibble span-truncation + forward-edit offset drift in the wave runner. Assert-first caught it with zero file writes; the fix (exact `[pos, nextPos)` spans, reverse document-order application) then flipped all 194 objects with per-wave parse post-asserts PASS.
**Standing rule:** Bulk regex writes over large files MUST (a) assert expected-replacement counts per span before writing, (b) apply edits in ascending-or-descending coordinate-safe order, (c) parse-parse the result the same session. The assert-first pattern proved its worth again: **ASSERT FAILURE BEFORE WRITE IS SUCCESS**, not a defect.

### L-05 — Recorded-state assertions in governance libraries state-time-decay
**Pattern:** The DL-P2-032 / DL-P2-031 remediation entries recorded "case state = In Audit" as live assertions (via `verify_remediation.js` reading state-adjacent table cells). Six weeks later, a legal certification flip (DL-066-HANDSOLVE) turned 10 of those states Certified; the standing check then failed 10 assertions — a *correct* content outcome read as a regression.
**Standing rule:** When an entry records state at remediation time, either (a) annotate that state columns are historical, or (b) refresh the entry with provenance when an authorized state change reaches those items. Approved remedy used: state cells refreshed to current reality with explicit provenance note — no silent rewrites, content verdicts untouched.
**Disposition:** DL-P2-032 and DL-P2-031 updated 2026-10-17 with provenance blocks. `verify_remediation.js --all` = 39/39.

### L-06 — "Replace the archived" needs the survivor map in front of the authoring wave
**Pattern:** A 9-case archived pool in `p2/case_pack_p2_2.js` (CBQ22-C4..F7) triggered a proposed 9-case (≈54-item) authoring wave. Direct recomputation of the DL-P2-024 map showed every archived slot has a LIVE Certified survivor (C9/C10/C11/C12/A7/A8/F8/F9/F10) — zero learner-facing content gap; strict-eligible stands at 101 with full coverage.
**Standing rule:** Any "height of pool" request must be quoted from the survivor/equivalence map (or reused-source map), not the per-file count. Archive counts describe *file layout*, not *learner coverage*.
**Board decision, noted here:** No 9-case replacement wave commissioned. 101/110 strict-eligible stands.

### L-07 — Directory hygiene claims gate on the permitted-list, not on "looks tidy"
**Pattern:** Root contained 2 governance-file violations (PROMPT_*.md) that survived multiple "the repo is clean" claims because prior checks grep'd for `.bak` and `_*.js` patterns but not stray prompt manifests; and content/ directories carried 9 misplaced backup files | inter-session sessions each did partial sweeps.
**Standing rule:** Root hygiene = enumerate actual directory contents against `PROJECT_CONSTITUTION.md §11.1` permitted list. Any file not on the list must be moved (not deleted — §3.1 still applies) by the same change-set that claims cleanliness.
**Disposition:** 2026-10-18 sweep moved 2 PROMPT files → `reports/`, 9 backup files → `backups/`, and extended `.gitignore` (scratch dirs, GUID dirs, `*.verified-*`, `*.dl066_backup_*`). Root now exactly the permitted set + `AGENTS.md`/`main.js`.

### L-08 — Git is a state machine; tag only what proven
**Driving story:** v2.0.0 tag exists at `1bde586`, pushed on self-reported numbers that photographic re-verification would interrupt false DL-066 "44/44" claims. Tagged release references a commit whose claim-set is materially false. The work to legitimize the tag was to *make the claim true* (this session) — not to re-word the tag.
**Standing rule:** Any version tag commit body that asserts content state ("DL-066 complete", "P1 80/80") is subject to §5 cross-check at tag time. If flagged false, the follow-up commit that completes the work cites the original tag explicitly as the question the answer to.

### L-09 — Pack-write attribution note applies to certification spreadsheets
**Pattern:** This session's REVISION_HISTORY entry was written under the batch label `DL-066-HANDSOLVE` for *certification* (Rule 16), while prior content repairs to individual items in the same case family were logged under their defect remediation batches (e.g., CBQ4-D3-Q3 under DL-066 content-fix). Attribution boundaries otherwise blur: which session touched which state vs. which session touched which bytes.
**Standing rule:** REVISION_HISTORY entries declare both: (a) the certification batch for the state flip (Rule 16 stamps), and (b) pointer rows for content changes that pre- or post-date the state change (with their own DL and batch references). Present practice: DL-066 closure cites CBQ4-D3-Q3 repair inside the certification entry — correct because the repair was verified as part of the certification session. Boards should not conflate: *certification ≠ repair*.

---

## 4. Bank Reconciliation Status

| Question scope | Resolution |
|---|---|
| CBQ4-D3-Q3 stored-key defect | Repaired pre-flip (statement 3 only); Rule 16 stamps correct (certified after the repair — DL-066-HANDSOLVE) |
| CBQ4-A1-Q3 | Intact; "empty-string array" was verifier B3 phantom; hand-solve adjudicated correct |
| CBQ-C3-Q5, CBQ-E1-Q5, CBQ4-F1-Q3 | Hand-solve re-adjudicated as correct stored keys (solutions were wrong; verifier merely repeated that comparison) — no key change |
| CBQ22 archived interpretation | Zero-action settled; CURRENT_BASELINES_P2 § DL-P2-024 documentation already correct |
| v2.0.0 tag | Legitimate to reference; today's commit materially completes its certification-claim set |

## 5. Institutionalized Changes (this change-set)

1. `scripts/dl066_verify2.js` — ItemID-keyed verifier with live-parse discipline (no snapshot pairing).
2. `scripts/verify_remediation.js` operating pattern — verified live, per-entry; stale recorded states refreshed with provenance (2026-10-17).
3. `.gitignore` extended for scratch/backup-fingerprint patterns (prevention at tool level).
4. AGENTS.md §5 reinforcement pending lint: add L-01. `knowledge/DEFECT_LIBRARY.md` DL-066 closure already cites subagent-unreliability lesson.
5. Tag discipline: deferred to next tag (L-08) — no re-tag attempted this session.

---

## 6. Action Items

| # | Item | Owner | Due |
|---|---|---|---|
| A-01 | AGENTS.md revision: standing rule L-01 (subagent self-report = hypothesis, never evidence) | AI collaborator | Next AGENTS bump |
| A-02 | AGENTS.md revision: §18.4 auditor-side control "not found suffered in my indexed copy" clause — extend to verifier control-discipline for add controls (seeded-defect test) | AI collaborator | Next AGENTS bump |
| A-03 | `verify_remediation.js`: add explicit "recorded-time state provenance" detection to warn when a state cell predates its latest authorized flip | Validator | Next tooling wave |
| A-04 | Verifier control set: standardize "seeded-defect control must fail" harness for any new ledger/verify script (L-03) | Validator | Next tooling wave |
| A-05 | Root-hygiene automated check against §11.1 permitted list (`scripts/check_root_hygiene.js`, dry-run only per §3.1) | Validator | Backlog |
| A-06 | Refresh stale probe parity statement (Session-88 delivery blocklist "over-blocking, learner-safe") refresh follow-up | Validator | Already filed by probe output |

---

## 7. Vote Record (Personas)

- **Accountant:** agrees L-05 stale-state cell refresh preserved accounting verdicts (CBQ3-A3-Q2 = 495,238 stands via DL-069 lineage).
- **Psychometrician:** the 4Screen SET newline growth (335 → 431) is screen-population growth, not flag inflation; 68-review-flag gate set at REVIEW-only per calibration is stable across two runs.
- **Validator:** per-wave parse post-asserts and two-run determinism define this session's verification spine; both retained as pattern.
- **JavaScript Architect:** first wave runner had coordinate bugs; assert-before-write saved the pool (L-04). Accepted.
- **Reviewer:** false-negative-verifier lessons (L-01–L-03) are the highest-value institutional fix of this cycle.
- **Release Manager:** commit + push executes; tag legwork deferred to a subsequent milestone with true claim sets.

**Minutes closed by Release Manager. Next board: on next certification batch or defect-triggered event.**
