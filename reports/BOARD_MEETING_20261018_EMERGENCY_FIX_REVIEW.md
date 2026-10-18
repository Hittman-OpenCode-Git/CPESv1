# BOARD MEETING — Emergency Fix Review: P2 Go-Live Bug Cluster (DL-073 / DL-074 / Bank Consolidation / DL-070 / DL-071)

**Date:** 2026-10-18 · **Type:** Board review (defect-triggered event per 2026-10-13 standing rule)
**Trigger:** Board reconvene per the standing rule "next board: on next certification batch or defect-triggered event." Today's session delivered a learner-facing P2 outage fix (DL-073), a learner-reachable clone archive (DL-074), a structural bank consolidation to the 3-pack architecture, P1 Section-E key corrections (DL-070), and delivery-blocklist regeneration (DL-071).
**Presiding:** Release Manager · **Attendees:** Accountant, Editor, Psychometrician, Validator, JavaScript Architect, Reviewer
**Evidence anchor:** commit `1244e9c` (pushed to `CPESv1` main) + independent verification verdict **ALL-GREEN, 9/9 checks** (raw evidence, §5/L-01 compliant — no self-reports accepted).

---

## 1. Session Outcome (Recorded First — Facts Before Analysis)

| Metric | Before today | After today | Evidence |
|---|---|---|---|
| P2 mode in browser | **Dead** ("P2 banks loaded but 9 global(s) missing") | Fully active | vm classic-script harness + negative control (§2.1) |
| P2 MCQ pool (learner-facing) | 3,530 Certified, incl. 1 reachable whole-item clone | **3,529 Certified / 1 Archived** (P2-C-732) | raw parse: 788 raw / 787 Certified / 0 duplicate stems among Certified |
| P2 case banks | 5 files of record (33/33/34 + 5 + 5 cases) | **3 packs (33/43/34) + 2 empty shims** — 110 cases, 660 items unchanged | CaseExtractor: pack2 = 43 cases |
| P2 strict-eligible | 101/110 cases / 606 items | **101/110 / 606 — unchanged** (L-06 survivor map holds) | preflight:p2 0 divergences |
| P1 Section E keys (DL-070) | 3 Certified items with inverted keys (1 Gold Standard #25) | **Corrected D→B, explanations rewritten, Rule 16 recertified** | pack_a_corrected.js.bak-20261018143052 |
| Delivery blocklist | Runtime blocked 364 clean items; DL-047 105/110 unblocked | **Exactly the 110 DL-047 defectives blocked; 0 stale** | build_blocklist census; probe:parity Check 4 |
| Gates | — | baseline_coherence 0 divergences · probe:parity PASS · preflight:p2 PASS · clone gate PASS · key agreement 1 pre-existing flag · case screens PASS (431 deterministic flags) · smoke PASS (zero page errors) | live runs, exit 0 |

**Commit:** `main` head = `97cbe5a` → `1244e9c` (32 files, +14,223/−17,326). Working tree clean.

---

## 2. Per-Defect Review and Root-Cause Dispositions

### 2.1 DL-073 — P2 delivery dead in browser (loader `window[]`/`const` bug)
**LLM-class:** Runtime/verification, not content. Found via a **learner report** — the browser injection path had *no automated gate at all*; W1W4 probe (2026-09-18) and smoke passes were Node/VM-harness runs that could not exercise the injection path. With the bug present a browser P2 activation was impossible regardless — passing claims were true of the harness, not the runtime path.
**Fix:** `P2BankLoader.isLoaded()` (app/app.js) resolves the 9 bank globals via `new Function('return g;')()` — Function-constructor bodies resolve through the global environment record, seeing `var` **and** `const/let`. One-behavioral-change diff (+15/−3), content files untouched, §3 backup taken.
**Negative control:** OLD loader in the same vm harness failed with **exactly the 9 user-reported names, same order** — bitwise fingerprint match. NEW code: `isLoaded() === true`, `_missingGlobals []`, 9/9 resolved.
**Ruling:** Fix APPROVED. Detection class (learner-found, no runtime-path gate) is the actionable defect.

### 2.2 DL-074 — learner-reachable whole-item clone (P2-C-732 == P2-C-710)
**Prior-lesson confirmation:** verified byte-identical at learner level (Stem/Choices/CorrectChoice/ExplanationCorrect), both Certified. Root cause of the miss: the §19.4 clone gate compares **numeric-literal multiset + Topic**, and the duplicate carried a *re-suffixed Topic* (`payback-uneven-cash-flows` vs `…-extended`). The gate's identity key was defeated by metadata text.
**Fix:** Span-bounded single-object archive flip (P2-C-732 → `Archived`, `archive_batch: DL-074-CLONE-ARCHIVE`); survivor P2-C-710 untouched; `renderValidation` roster check aligned to delivery semantics (Archived excluded) so the panel reflects pool reality; ID renumbered DL-072→DL-074 same-session (collision with DL-071).
**Ruling:** Fix APPROVED. Gate extension (normalized-stem hash) filed as A-03 — the numeric-echo screen is a *proximity* proxy, not an identity check, and re-suffixed metadata must not pass as identity.

### 2.3 Bank consolidation — banks 4/5 retired → 3-pack architecture
**Prior-lesson confirmation (L-06 dealer-equivalence honored):** every case moved **verbatim** (zero content edits, zero state edits beyond dedup archives); survivor-first — the 10 CBQ22-* cases with live Certified survivor equivalence were moved from banks 4/5 (now empty `var` shims with deprecation headers) into `case_pack_p2_2.js` by `scripts/dl_p2_bank_consolidation_merge.js` with pre/post asserts.
**Wiring reduced coherently (14 files):** delivery manifest (`index_updated.html` __P2_BANK_SRC 11→9 files), `app.js` P2BankLoader `_src()` fallback + `_p2Globals` (11→9 entries), probe/screens/gates/extractor all trained on the 3 live packs; `pool_parity_probe` §Check-2 tolerant only of sanctioned Archived terminal states in P1/P2 (reconcile, not fail) — and a **new tripwire FAILs the probe if any config re-lists a retired shim bank** (§Check-5/Class C).
**Ruling:** APPROVED. Zero total-pool drift (660 items unchanged; strict-eligible 101 unchanged — verified twice by independent verifier and gate output).

### 2.4 DL-070 — P1 Section E correct-key inversions (earlier session today)
Three Certified items (P1-E-004/005/008) stored `CorrectChoice: "D"` with the semantically correct key = B; stored ExplanationCorrect *refuted* D, and `ExplanationWrongB` empty — the DL-026 fingerprint. 1st item is a Gold Standard exemplar (library #25).
Fixes: keys D→B, explanations rewritten to justify B against COSO Principle references (13/14 for E-004, 16 for E-005, 8/16 for E-008); the prior D-refutation text relocated to `ExplanationWrongD`; Rule 16 recertification stamps applied on all three items. Hand-solve verified per §5; census after fix: Certified DL-008 = 0, DL-026 = 0.
**Ruling:** APPROVED as corpus-level repair; closeout documentation complete (DL-070 entry, REVISION_HISTORY).

### 2.5 DL-071 — delivery-blocklist regeneration (earlier session today)
Two divergences resolved: dead `DELIVERY_BLOCKLIST_AND_SIMILARITY_FLAGS.json` (never ingested by runtime, under-blocked 105/110 flagged items), and a stale 2026-07-27 manifest that **over-blocked 364 clean Certified items**. Regenerated all three artifacts from one census generator (`scripts/build_blocklist.js`): runtime block set now exactly the 110 DL-047 defectives, 0 stale; probe Check 4 = 220 entries resolve, no drift.
**Recorded residual (risk accepted by user):** runtime still does not ingest the JSON manifest directly (source-set mismatch remains possible for *future* families).
**Ruling:** APPROVED with the residual tracked long-term as A-02; wiring declined by user — not re-litigated (rule: user disposition recorded as standing fact).

---

## 3. Lessons Learned (Board-Approved, Institutionalized)

### L-10 — Runtime-path behavior needs a runtime-path test control
The W1W4 probe and both smoke waves were run on Node/VM harnesses that never exercised the browser `<script>` injection path. The evidence claims "P2 loads" was *never tested in a browser* — even the probe was passing. The lesson is one level deeper than L-01: **not only must subagent claims be verified with tools you ran — the tooling environment itself must be proven equivalent to the user-visible runtime path.** Standing rule: any load/control/IO behavior validated only in a harness is *environment-conditional PASS*, and must state that condition in the result note. For P2, the fix is A-01 (browser-path smoke).

### L-11 — Identity keys must resist metadata re-suffixing
DL-074 defeated the clone gate purely with a Topic re-suffix. Standing rule: any gate that keys on content *plus* a mutable/weak-text field (Topic, SectionTags, Title) must pair it with a stem-body fingerprint (normalized Stem hash) or equivalent durable key before claims of "no duplicates among Certified" are recorded. Numeric-literal multisets catch rotation trades; the stem-hash addition closes the metadata-suffix bypass. Filed as A-03.

### L-12 — Bank retirement is content-leveraged architecture change, not housekeeping
Retiring banks 4/5 was NOT a renamer exercise: it was a **content-logical configuration change** (10 Certified cases moved, 5 consumers rewired, an invariant flipped — 34/33 packs → 43/34). Standing rule: any bank removal must be (a) survivor-mapped first (L-06), (b) executed verbatim with pre/post asserts, (c) paired with a tripwire consumer check (the §Check-5 FAIL-FAST guard) in the same change-set, (d) exercised through gate re-runs. This session satisfied all four — treat it as the template; A-02 remains the one net-new standing (runtime/probe source-set).

### L-13 — Learner reports remain a first-class telemetry channel
Today's P2 outage (DL-073) and the 2026-10-13 DL-068 prompt defect were both found by **users, not screens**. Standing rule: each learner report must trigger (a) defect-class fix with the same §5 rigor applied to self-discovered cases, (b) an implied screen/gate extension where feasible, and (c) filing in DEFECT_LIBRARY the observation of *why no screen caught it* (this entry is the twin of A-01/A-03).

---

## 4. Residual / Approved Risk Register

| # | Residual | Consequence if unbounded | Mitigation | Owner | Priority |
|---|---|---|---|---|---|
| R-01 | app.js still has 5 `typeof`-guarded no-op references to the retired shim globals | Dead execution path; conceptual drift risk | Remove in next UI wave alongside the same file; `node --check` + smoke gate | JS Architect | Low (punt-listed) |
| R-02 | Runtime does not ingest the JSON blocklist manifest (source-set mismatch) | A future family written only to the JSON manifest will not block at runtime | Probe parity now covers the set A-06; wiring change offered and declined by user | Validator | Medium (standing) |
| R-03 | 431 certified-state flags from case screens (unchanged pre/post consolidation) | Classification *review debt*, incl. DL-047-family false-positive sweep and possible concealed inversions | Batch DL-047 adjudication (DL-070-A) continues; strictly no auto-remediation (DL-045) | Validator | Medium |
| R-04 | Clone gate numeric-echo check is a proximity proxy, not identity | Re-suffixed metadata could bypass pool-integrity again | A-03 stem-hash gate extension | Validator | Medium |

---

## 5. Institutionalized Changes (this change-set)

1. `scripts/dl074_clone_archive_flip.js` — span-bounded single-object flip with pre/post parse asserts; retained as provenance.
2. `scripts/dl_p2_bank_consolidation_merge.js` / `..._probe.js` — survivor-driven verbatim consolidation and its detector; retained.
3. `pool_parity_probe` §Check-5 tripwire — FAILs if any config re-lists a retired shim bank; institutional guard now passing.
4. `renderValidation` (app.js) — duplicate-Stem roster health gate aligned to delivery semantics (Archived excluded).
5. `scripts/build_blocklist.js` — single-census generator for the three delivery-block artifacts (DL-071 lineage).
6. `scripts/dl066_verify2.js` plus today's harness strategy collectively push **harness-equivalence (L-10)** into the verification spine without new tooling yet (A-01 pending).

---

## 6. Action Items

| # | Item | Owner | Due | Derived From |
|---|---|---|---|---|
| A-01 | Extend smoke test to drive a real browser P2-mode activation (browser-side PoC) — closes the L-10 environment-conditional PASS class | JS Architect | Next tooling wave | DL-073, L-10 |
| A-02 | (Standing, user-disposed) Runtime-side ingestion of JSON blocklist manifest — deferred per DL-071 ruling; revisit if user reverses | Validator | Backlog | DL-071, R-02 |
| A-03 | Clone-gate identity hardening: normalized Stem hash added to §19.4/p2_case_clone_gate identity key (re-suffix resistant) | Validator | Next tooling wave | DL-074, L-11 |
| A-04 | Prune 5 dead `typeof`-guarded shim globals in app.js at next UI wave; verify no behavioral change via smoke + harness | JS Architect | Next UI wave | R-01 |
| A-05 | DL-047 batch hand-solve adjudication wave (110 items) — resolve certified-state flags backlog; no auto-remediate | Validator | Next content wave | R-03 |
| A-06 | Tag decision: v2.0.0 tag is now materially true; authorize **v2.0.1** tag at this commit or the next one with an explicitly verified claim-set body (L-08 discipline) | Release Manager \| user | Discretionary | this review |

---

## 7. Vote Record (Personas)

- **Accountant:** the three key-correction items (DL-070) are verifiable solo hand-solves against COSO principle references; consolidation is verbatim and contains zero content edits — no accounting verdict moved in today's change-set beyond DL-070. Would re-run REVISION_HISTORY Rule-16 stamps — all 3 present. **Approved.**
- **Psychometrician:** P2-C-732 removal — 2 clones of the same item are not independent observations; removing the archived duplicate improves *pool measure quality* without shrinking learner content (3,529 unique Certified MCQs). The 9 archived pack-2 cases remain live-survivor dedup (L-06); no learner-facing curve change. **Approved.**
- **Validator:** all gates re-verified via raw runs post-change (baseline coherence 0, probe:parity 0, p2 preflight 0, clone gate 0, key agreement 1 pre-existing). One report item: `key_agreement_flags.json` flexibility is a `new Function`-based JSON read — acceptable, but recommend shared extractor to avoid divergence (deferred). **Approved.**
- **JavaScript Architect:** isLoaded change is functionally scoped (Function-constructor global-lexical read), no API/IO surface change; negative control redundant in both directions — desired class seen in DL-011 workflow. RenderValidation semantic change (Archived filter) matches concurrent delivery change in the same change-set — §19.2 test-coupling satisfied via renderValidation-alignment instead of a new suite. **Approved.**
- **Reviewer:** verification report is ALL-GREEN with raw evidence, self-reports bypassed, and negative controls in two independent classes (loader + clone). Two reporting caveats acknowledged (tripwire hits in pool_parity_probe, missing duplicate naming on the minimal authoring passthrough). **Approved.**
- **Release Manager:** commit + push executed (P2 go-live emergency repairs, DL-070/DL-071 included). **Ruling — Part 2 release readiness: GO APPROVED** on the current evidence set. Tag decision (A-06) stays expanded for user reflection; nothing auto-executed. Minutes closed by Release Manager.

---

## 8. Scope Notes / Caveats

- The `pool_parity_probe` "stale-config tripwire" is the *sentinel*, not a defect: it exists to fail fast if anyone reintroduces retired bank wiring; the probe passing proves no wiring regression occurred.
- `backups/pack_p2_2.js.bak-CONSOL-20261018144823` filename lacks the `case_` prefix (cosmetic only, contents verified correct); `index_updated.html` was backed up in the earlier batch — no §3 gap found on audit.
- The three `baseline_coherence.js --fix` runs wrote `.bak-coherence-*` files **in-place next to their documents** (`knowledge/` ×4, `p2/` ×3) rather than in `backups/`. Contents verified correct; relocation to `backups/` is queued for the next hygiene sweep per the L-07 move-not-delete discipline.
- DL-070 / DL-071 entries (earlier session today) were pre-filed and verified by this review, not re-executed.

**Minutes closed by Release Manager. Next board: next certification batch (DL-047-A wave) or further defect-triggered event.**
