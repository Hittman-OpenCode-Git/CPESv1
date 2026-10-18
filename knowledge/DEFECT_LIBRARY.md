## DL-066

```
Defect ID        DL-066
Class            Governance / Process
Domain           Certification state integrity — P1 case banks
Severity         High (163 P1 case items In Audit following the same unattributed bulk quarantine as DL-P2-023)
Detected By      P2-085 forensic reconstruction (2026-09-30)
Status           **Resolved — 2026-10-17.** 31 cases / 163 items hand-solved, verified, and certified
                 (batch DL-066-HANDSOLVE). 1 stored-key defect repaired (CBQ4-D3-Q3). P1 pool now 80/80
                 cases / 425/425 items Certified.
```

**Files:** `content/cases/case_pack_1_corrected.js`, `content/cases/case_pack_2_corrected.js`, `content/cases/case_pack_3_corrected.js`

### Issue

`scripts/quarantine_all_case_inversions.js` (2026-09-24) demoted **31 P1 cases** across the three P1 case banks as collateral to its 105 P2 demotions. All were `Certified` pre-quarantine (verified: 25/25, 25/25, 30/30 = 80 cases Certified at Wave A, cross-validated against git ref `54144674`).

P1 case item census pre-remediation: **262 Certified / 163 In Audit** of 425.

The P1 exposure is the same defect class as **DL-P2-023** but was **not** remediated in that session — P2 was the authorized scope. Of the 31 P1 demoted cases, 3 fell in Bucket A (collateral, no FLAG-severity screen evidence) and 28 require independent hand-solve.

### Resolution (2026-10-17)

Per-item independent hand-solve across all 163 In Audit items via a keyless byte-range extraction subagent (`scripts/output/dl066_byte_range_solutions.json`), verified by an ItemID-based verifier (`scripts/dl066_verify2.js`, string-aware bracket-scanner pack parsing; the original `dl066_verify.js` was broken — it matched the stale masked file's prompts and paired solutions positionally, producing four false-negative "44/44 failure" reports; lessons per 2026-09-29 DL-011).

**Verification outcome:** 159/163 verbatim key matches (match items, multi-select arrays, numerics with stated tolerances); 1 stored-key defect found and repaired — **CBQ4-D3-Q3** (multi-select: stored {1,3,4} correct under DL-P2-031 lineage wait — statement-3-only derivation per exhibit math: theoretical capacity 50,000 units → $38 lowest absorption rate; `Correct` reduced to statement 3, Explanation rewritten to v2, DL-069-style independent re-solve); 3 remaining discrepancies adjudicated as subagent derivation errors with CORRECT stored keys (CBQ-C3-Q5, CBQ-E1-Q5, CBQ4-F1-Q3). CBQ4-A1-Q3 (match item, ASC 350 mapping) adjudicated correct — the "empty-string array artifact" was a verifier phantom, item intact. **163/163 validated.**

**Certification batches (Rule 16 stamps):** `certification_batch: DL-066-HANDSOLVE`, `certification_date: 2026-10-17` (items were never previously Certified → certification, not recertification). State flips executed by `scripts/dl066_certify_flip.js` in 9 Rule-5-compliant waves (13/25/30/6 objects per wave, span-bounded regex with per-wave parse post-asserts; ~194 occurrences = 31 case-level + 163 item-level). Backups: `backups/case_pack_{1,2,3}_corrected.js.bak-<pre-flip timestamps>`.

**Tend gates (all PASS):** syntax `node --check` ×3 packs; census 80/80 cases / 425/425 items Certified, 0 duplicates; semantic screens PASS deterministic (certified-state flags 335→431 as 163 items entered the screen set; identical across two runs); `verify_remediation.js --all` 39/39 after refreshing two stale recorded-state DL entries (DL-P2-032, DL-P2-031 — updated with provenance, content verdicts untouched); `npm run pipeline` all gates green incl. baseline-coherence (3 pack hash rows refreshed via `--fix`, backup `.bak-coherence-20261017205129`) and coverage-assertion gate; `npm run probe:parity` PASS 0 divergences.

**Subagent self-report reliability note:** Subagent session self-reports during this work product claimed "44/44 verified", "0 mismatches", "16/34 verified" — all three were contradicted by direct evidence and were rejected. Raw verification only (§5 dual verification).

### Cross-references

- DL-P2-023 (same-class P2 defect, remediated 2026-09-30) · DL-045 (no-auto-remediate) · DL-065 (post-quarantine P1 content session) · DL-011 (verifier-matching precedent)
- `scripts/dl066_verify2.js` (correct verifier) · `scripts/dl066_certify_flip.js` (wave runner) · `scripts/output/dl066_final_census.js`
- `scripts/output/dl066_verify2_results.json` · `scripts/output/handsolve_wave1_results.json`
- `knowledge/REVISION_HISTORY.md` — DL-066 remediation entry (2026-10-17)
- `knowledge/CURRENT_BASELINES.md` — refreshed P1 case-pack hashes (2026-10-17)

---

## DL-065

```
Defect ID        DL-065
Class            Content / Answer Key (semantic-screen adjudication — genuine inversions)
Domain           Content Quality — Case Banks (P1 + P2)
Severity         High (5 Certified items with wrong answer keys / defective multi keys)
Detected By      LLM Adjudication — semantic screen review (2026-09-28)
Status          Resolved — 5 items fixed, explanations rewritten, Rule 16 re-stamps applied
Category        Answer-key and explanation defects confirmed via DL-045 hand-adjudication
```

**Question IDs:** CBQ2-A2-Q2, CBQ2-A2-Q3, CBQ3-D4-Q4, CBQ22-C9-Q5, CBQ22-C10-Q5 (+ CBQ2-A2-Q1, unflagged sibling, same defect family)

**Files:** `content/cases/case_pack_1_corrected.js`, `content/cases/case_pack_3_corrected.js`, `p2/case_pack_p2_C4_C8.js`

### Issue

DL-045 adjudication of 216 semantic-screen flags (68 MCQ B:INVERSION REVIEW + 148 case certified-state flags from `semantic_key_verifier.json` / `case_semantic_flags.json`, 2026-09-25 screens). Result: 211 FP, 5 GENUINE, 0 UNDETERMINED. All 5 GENUINE verdicts dual-verified against raw pack evidence before remediation.

**Genuine defects found:**

1. **CBQ2-A2-Q2/Q3 — US GAAP LCM misapplied as IFRS LCNRV.** Case titled "Inventory Valuation and LCM" with replacement cost $12, NRV $13, floor $10. Stored answers used the IFRS rule: $13/unit and $20,000 write-down. Correct under ASC 330: market = replacement cost $12 (within ceiling/floor) → $12/unit and $30,000 write-down. Unflagged sibling CBQ2-A2-Q1 had the same defect (stored "Lower of cost or NRV" for US GAAP FIFO; correct: "Lower of cost or market") plus a boilerplate template explanation — fixed in the same pass. `AccountingPrinciple` field corrected on all 5 case items.

2. **CBQ3-D4-Q4 — overhead variance wrong in magnitude and sign.** Stored −226,500 (under-applied). Correct: applied OH = 150% × $287,000 DL = $430,500 vs actual $207,000 → over-applied +223,500 (prompt convention: under-applied = negative). Explanation was self-contradictory and used an incorrect $433,500 applied figure.

3. **CBQ22-C9-Q5 — relevant-cost multi key wrong.** Stored {A,C,E}. Correct {B,C,E}: the $37.50 manufacturing cost is the paradigmatic relevant future differential cost (not sunk — the design is not finalized; the launch decision precedes production); the $6.30 value-engineering gap (A) is a derived metric, not a cost. Choice B text carried the false sunk-cost rationale — rewritten.

4. **CBQ22-C10-Q5 — false statement in multi key.** Stored {A,C,E}. Statement C false: at B CM = $24, B's CM/extrusion-hour = $8 < A's $12, so the mix does not shift toward B; the explanation claimed $8 "matches" $12 (arithmetic error). Only 2 of 5 statements were true. Fixed by changing C's premise to $40 (B's CM/extrusion-hour = $13.33 > $12 → mix shifts toward B) and correcting the explanation.

### FP Patterns Confirmed (211 items)

All 68 MCQ B:INVERSION REVIEW flags were lead-token false positives (EC opening formula/number coinciding with distractor lead phrases — the documented 2026-09-20 calibration pattern). Case flags were dominated by: low jaccard on one-line prompts with long essays (documented DL-051 v1/v2 FP pattern), EXTRA-REFUTED long-essay distractor refutation, multi-prediction screen errors, and SIGN-CONVENTION abs-only matches where the stored sign was correct per the item's stated convention. No new FP patterns beyond the documented set.

### Resolution

All 5 adjudicated items fixed with independent re-solve verification; explanations rewritten to certification standard; CBQ2-A2-Q1 fixed as same-family discovery. Rule 16 recertification stamps applied to all 4 affected cases (`recertification_batch: DL-065-RECERT`, `recertification_date: 2026-09-28`). Backups: `backups/*.bak-20260928215124` (3 files). T0 preflight passed (0 divergences) before writes.

### Cross-References

- DL-045 (screen output is evidence, not an author), DL-047/DL-051 (screen calibration)
- `scripts/output/semantic_key_verifier.json`, `scripts/output/case_semantic_flags.json` (2026-09-25 screens)
- `knowledge/REVISION_HISTORY.md` — DL-065 adjudication and remediation entry

---

## DL-064

```
Defect ID        DL-064
Class            Process / Methodology
Domain           Validation & Compliance
Severity         Informational (validation summary — no content defects found)
Detected By      Build-Time AI Verification — Phase 1 Final Polish (2026-09-25)
Status           Resolved — validation sweep complete; case semantic adjudication pending
Category         Validation completeness and compliance verification
```

**Question IDs:** N/A — validation sweep across all packs.

**Files:** All `content/packs/pack_*_corrected.js`, `content/cases/case_pack_*.js`, `p2/case_pack_p2_*.js`, `scripts/validators/*`, `app/app.js`, `app/may/*`.

### Issue

Phase 1 Final Polish validation sweep found the repository in a structurally clean state with all validation gates passing. The remaining work is semantic adjudication of case items, which requires human review per the DL-045 doctrine (screen output is evidence, not an author).

No content defects were found during this sweep. All previously identified structural defects (DL-001 through DL-063) have been resolved or documented as monitored-class residuals.

### Validation Summary

| Gate | Result | Details |
|------|--------|---------|
| Preflight | PASS | 0 divergences, 3052 Certified, 101/101 guard |
| Pipeline | GREEN | All gates pass |
| Validate | 0 errors | 10716 warnings (known psychometric) |
| Smoke | PASS | 34/34 checks |
| Governance Guard | 101/101 PASS | All 21 rules enforced |
| Probe Parity | 1 divergence | P2 strict-eligible (expected, active authoring) |
| MCQ Semantic Key | 123 B:INVERSION | Demoted to REVIEW-only per calibration |
| Case Semantic | 442 flags | 156 certified-state; need adjudication |

### Key Findings

1. **MCQ packs fully clean:** All 3,070 MCQ items are either Certified or Archived. Zero Unprocessed/In Audit MCQ items remain. All states are TAXONOMY_REGISTRY §9.1 members.

2. **P2 case banks in active authoring:** 110 cases parsed, 36 strict-eligible (all items Certified). 74 cases have items in In Audit/Unprocessed — expected during active authoring, not a defect.

3. **All structural defects resolved:** DL-008 (0 Certified items with non-empty EW[CC]), DL-013 (0 template boilerplate in pool), DL-016 (0 metadata-content mismatch), DL-026 (0 Certified empty non-CC EW slots), DL-047 (10 inversions remediated), DL-051 (case semantic screens operational).

4. **Case semantic screen backlog:** 156 certified-state flags require human adjudication per DL-047/DL-051 flow. Per DL-045 doctrine, screen output is evidence, not an author.

### Resolution

All structural validation gates PASS. The repository is ready for final save and commit. Case semantic screen adjudication (156 certified-state flags) is the only remaining work and requires human review per the DL-047/DL-051 flow.

### Cross-References

- `reports/PHASE1_FINAL_POLISH_STATUS.md` — detailed status report
- DL-001 through DL-063 — all prior defect entries
- `scripts/case_semantic_screens.js` v3 — case semantic screens
- `scripts/semantic_key_verifier.js` — MCQ semantic key verification
- Rule 21/DL-047 gate — semantic quarantine manifest enforcement

---

---

## DL-067 — Generic Explanation Boilerplate in 45 Part 1 Case Items (29 learner-reachable)

```
Defect ID        DL-067
Class            Content / Explanation quality (DL-013 boilerplate family; sibling of DL-P2-026)
Domain           P1 case bank explanation authoring
Severity         Medium — 7 items were entirely filler; 38 carried trailing padding
Detected By      Screen D (scripts/case_semantic_screens.js), added this session; 45/45 confirmed
Status           **Resolved — 2026-10-01.** 45 items across 3 P1 banks; screen D now reports 0
```

### Finding

The DL-P2-026 remediation (2026-09-30) closed the boilerplate class across the **P2** banks only and
zero-asserted 0/660 P2 items. Building the prevention screen on 2026-10-01 immediately showed the
same class was **P1-wide and entirely unaddressed**: **45 items** in the three P1 case banks, of
which **29 were already `Certified` and therefore learner-reachable**.

| Bank | Items |
|---|---|
| `content/cases/case_pack_1_corrected.js` | 11 |
| `content/cases/case_pack_2_corrected.js` | 19 |
| `content/cases/case_pack_3_corrected.js` | 15 |
| **Total** | **45** |

By state: **29 Certified, 16 In Audit.** By type: multi 25, numeric 9, fill 4, match 4, select 3.
The same 9 filler phrases confirmed in DL-P2-026 were present; no new phrase family was found.

### Why it survived

Three waves of P1 certification preceded the DL-P2-026 work, and its scan was scoped to P2 banks by
the session that wrote it. A P1 scanner did not exist. The defect was not hidden — it was simply
outside the scan boundary, which is the same failure mode as the incomplete 6-phrase list
documented in the DL-P2-026 correction: **a closure claim is only as wide as its scan.**

### Two severity tiers

**Tier 1 — entirely filler (7 items).** Stripping the phrases left under 25 words of real content.
Six are Certified and live:

| Item | Type | State | Real content that remained |
|---|---|---|---|
| `CBQ2-B1-Q1` | numeric | **Certified** | 16 words — a bare `= 10,400` with no reasoning |
| `CBQ3-A2-Q1` | numeric | **Certified** | 16 words — a bare `= 455,000` |
| `CBQ3-B1-Q2` | numeric | **Certified** | 21 words |
| `CBQ3-D1-Q5` | fill | **Certified** | 22 words |
| `CBQ5-B1-Q1` | numeric | **Certified** | 16 words — `(130+140+135)/3 = 135` |
| `CBQ5-C1-Q1` | numeric | **Certified** | 20 words |
| `CBQ4-B1-Q1` | numeric | In Audit | 21 words |

**Tier 2 — trailing padding (38 items).** Real explanation followed by 1–4 stacked filler
sentences. **17 of these were thin** (25–69 real words) once stripped, so the learner-facing loss was
larger than the occurrence count suggests.

### Resolution

Two Rule-5-compliant change-sets (30 + 15). Tier 1 items were **hand-computed from the scenario and
exhibit values with the stored key withheld**, then given authored explanations carrying the governing
treatment, an independent recomputation, a stated interpretation, and a named distractor trap.
Tier 2 items had only the filler sentences removed and punctuation tidied.

Hand-solve verification of the 7 rewrites — all keys confirmed correct, **no answer key altered**:

| Item | Independent derivation | Stored key |
|---|---|---|
| `CBQ2-B1-Q1` | 10,000 sales + 2,400 desired end FG (20% of Feb 12,000) − 2,000 beginning FG | 10,400 ✓ |
| `CBQ3-A2-Q1` | 450 + 60 − 15 gain − 25 AR + 15 inv − 30 AP | 455,000 ✓ |
| `CBQ3-B1-Q2` | April 300,000 × 0.80 × 0.50 = 120,000; March 250,000 × 0.80 × 0.10 = 20,000 | 140,000 ✓ |
| `CBQ3-D1-Q5` | Variable costing expenses all fixed MOH as incurred → period cost | "period" ✓ |
| `CBQ4-B1-Q1` | (42,000 − 30,000) / (8,000 − 5,000) = 12,000 / 3,000 | 4 ✓ |
| `CBQ5-B1-Q1` | (130 + 140 + 135) / 3 = 405 / 3 | 135 ✓ |
| `CBQ5-C1-Q1` | (5,000 − 10,000 × 0.60) × $2.00 = (5,000 − 6,000) × 2 | −2,000 ✓ |

### Prevention — screen D (the reason this was found at all)

Rather than re-scan by hand, a fourth screen was added to `scripts/case_semantic_screens.js`
(already a `npm run pipeline` target, so it runs automatically):

- **BOILERPLATE** — any of the 9 verified phrases, FLAG.
- **SCRATCHWORK** — `Hmm | We key | Set N[?] | ? Actually | Need compute | simplify: we key`, FLAG.

The screen found all 45 in its first run. Its scratchwork control **initially failed** — `Set 1.62?`
did not match because `?` was missing from the accepted suffix — and the regex was corrected until
the control passed. A live-tool negative control in a temp mirror then confirmed the detector fires
on an injected defect and stays silent on clean text.

### Verification

| Claim | Method | Result |
|---|---|---|
| Class closed (P1) | Screen D on the live pool | 45 → **0** |
| Class closed (P2) | 9-phrase + scratchwork zero-assertion | 0/660, two methods |
| Screen still reaches defects | Live-tool negative control, temp mirror | Fires on injected defect, silent on clean |
| Phrase detection | Synthetic-phrase control | 9/9 |
| Scratchwork detection | Synthetic-marker control | 6/6 |
| False positives on clean text | 3-sample control | 0 |
| Determinism | Two consecutive screen runs | Identical flag sets |
| Bank integrity | `node --check` on all 3 P1 banks | PASS |
| Case counts | P1 live case count | 80, unchanged |
| P2 unaffected | `preflight_p2` | 0 divergences |
| `validate` | — | 0 errors |
| `test_governance_guard` | — | 123/123 PASS |
| `probe:parity` | — | 0 divergences |

### Process note

The scan that found this class was built in the same session that had just closed it for P2, from
the same 9 phrases, and it found 45 items the P2 scan could not. The lesson generalises past
boilerplate: **when closing a defect class, scan the whole population before declaring it closed,
and state the boundary of the scan in the closure claim.**

### Cross-references

- `knowledge/DEFECT_LIBRARY.md` DL-P2-026 (P2 sibling) and its correction addendum
- `scripts/case_semantic_screens.js` screen D
- `knowledge/REVISION_HISTORY_P2.md` Session P2-HAND-SOLVE-WAVE, DL-067 entry
- AGENTS.md §5 dual verification · DL-045 (screen output is evidence, not an author)

---

## DL-068 — Fill-item prompt states wrong word count (CBQ3-F1-Q2)

```
Defect ID        DL-068
Class            Content / Prompt accuracy (prompt-stated word count ≠ stored answer length)
Domain           P1 case bank — fill items (Technology and Analytics, SDLC case CBQ3-F1)
Severity         Medium — learner-reachable misleading prompt on a Certified item; answer key itself was correct
Detected By      User report (learner, 2026-10-13) — first externally reported defect; no screen existed for this class
Status           Resolved — 2026-10-13. Prompt corrected, item recertified (DL-068-RECERT)
```

**Files:** `content/cases/case_pack_2_corrected.js` (item CBQ3-F1-Q2)

### Finding

Case CBQ3-F1 ("System Development Life Cycle (SDLC)", Coastal Financial Services) contains four fill
items whose prompts state a word count. One was wrong:

| Item | Prompt states | Stored `Correct` | Actual words | Verdict |
|---|---|---|---|---|
| CBQ3-F1-Q1 | "single word" | Analysis | 1 | OK |
| CBQ3-F1-Q2 | "two-word term" | User acceptance testing | **3** | **MISMATCH** |
| CBQ3-F1-Q4 | "two-word term" | Change management | 2 | OK |
| CBQ3-F1-Q5 | "two-word term" | Production environment | 2 | OK |

The defect was in the prompt, not the key: "User acceptance testing" is the unambiguous term for the
described phase (end users validating the system pre-go-live). A candidate told to enter a "two-word
term" could reasonably answer "acceptance testing" or "user acceptance" and be incorrectly rejected.

Scan boundary: all live P1 banks (`content/cases/case_pack_{1,2,3}_corrected.js`) and all live P2
banks (`p2/case_pack_p2_*.js`) searched for prompts containing word-count phrases ("single word",
"N-word", "N words"). P1: 4 prompts, 1 mismatch. P2: 0 prompts state word counts. The same defect
exists in the frozen legacy copy `content/cases/legacy/scored_cases3.js:4518` — not learner-facing,
left untouched.

### Why it survived

No validator or semantic screen compared prompt-stated word counts against stored answer length, and
no authoring standard required it. Detection came from a user report — the scan-boundary lesson of
DL-067 applies in reverse: classes with no screen are found only by accident or by learners.

### Resolution

One-word prompt correction (`two-word` → `three-word`) at `case_pack_2_corrected.js:7294`. Answer key
unchanged (verified correct against the scenario and SDLC standards). Rule 16 recertification stamps
applied to the touched Certified item: `recertification_batch: DL-068-RECERT`,
`recertification_date: 2026-10-13`. Case `ModifiedDate` updated and a `RevisionHistory` entry added
(Version 2.1). Backup: `backups/case_pack_2_corrected.js.bak-20261013224231` (412,596 bytes).

### Prevention

No screen covers this class. Candidate check for `scripts/case_semantic_screens.js` or a validator:
for `Type: "fill"` items, extract the stated word count from the prompt ("single word" → 1,
`"N-word"` / `"N words"` → N) and compare against the whitespace-delimited word count of `Correct`;
flag on mismatch. The control set is the 4 CBQ3-F1 prompts (1 known defect, 3 known clean).

### Verification

| Claim | Method | Result |
|---|---|---|
| Defect located | Targeted scan, all live P1+P2 banks | 1 mismatch of 4 word-count prompts |
| Bank integrity | `node --check` | PASS |
| Change scope | `git diff` | 1 prompt line + stamps + metadata, no key change |
| Pool state | `npm run preflight` (T0) | 0 divergences before write |

### Cross-references

- DL-067 (scan-boundary lesson — closure claims must state scan scope)
- AGENTS.md §5 dual verification · §12.1 (DEFECT_LIBRARY entry required for new defects)
- `knowledge/REVISION_HISTORY.md` — DL-068 entry

---

## DL-069 — ASC 606 Equipment Allocation Contradicts Case's Own Rebate Treatment (CBQ3-A3-Q2)

```
Defect ID        DL-069
Class            Content / Answer Key (ASC 606 allocation error — internal inconsistency)
Domain           P1 case bank — Revenue Recognition case CBQ3-A3 (case_pack_3_corrected.js)
Severity         Medium — stored key contradicts the case's own Q4 answer; item is In Audit (not learner-reachable)
Detected By      Independent hand-solve wave 2 (2026-10-14) — comparison step
Status           Resolved — 2026-10-14. Key corrected to 495,238, explanation rewritten (DL-069-RECERT not required — item In Audit)
```

**Files:** `content/cases/case_pack_3_corrected.js` (item CBQ3-A3-Q2)

### Finding

CBQ3-A3: contract price $600,000; standalone selling prices equipment $520,000 /
installation $110,000 (total $630,000). Q2 asks for the revenue allocated to the equipment
performance obligation. Stored key: **480,381**.

Independent hand-solve: the stored value is reproducible ONLY as
(600,000 − 18,000) × 520/630 = 480,381 — i.e., the transaction price was reduced by the
$18,000 expected value of the volume rebate (5% × $600,000 × 60% probability) before
allocation.

The case's own Q4 stored key is **$0 — "the rebate should be excluded until the threshold is
met."** The two stored keys are mutually inconsistent:

| Rebate treatment | Q4 (most-likely) | Q2 allocation |
|---|---|---|
| Excluded (constraint) | $0 ✓ stored | 600,000 × 520/630 = **495,238** |
| Most-likely amount (60% → earned) | 30,000 | 570,000 × 520/630 = 470,476 |
| Expected value | 18,000 | 582,000 × 520/630 = 480,381 ✓ stored |

The stored Q2 (480,381) is consistent ONLY with expected-value inclusion, which contradicts
the stored Q4 ($0, excluded). Under either consistent reading, the stored Q2 is wrong.

### Adjudication

Q4 stored ($0) is defensible under the ASC 606 variable-consideration constraint (40%
reversal probability; threshold not yet met) — **Q4 stands**. With the rebate excluded,
Q2 = $600,000 × 520,000/630,000 = **495,238.10 → 495,238**. **Q2 stored key (480,381) is
a genuine defect.**

### Resolution (executed 2026-10-14, per-batch authorization)

1. Key: 480381 → **495238** (case_pack_3_corrected.js:8403)
2. Explanation: rewritten with derivation — "Rebate excluded from transaction price under
   the ASC 606 constraint (see Q4). Equipment allocation = $600,000 × $520,000/$630,000 =
   $495,238; installation = $600,000 × $110,000/$630,000 = $104,762. Recomputed
   independently: 600,000 × 0.8253968 = 495,238.10."
3. Backup: `backups/case_pack_3_corrected.js.bak-20261014214127` (557,202 bytes).
   `node --check` PASS. Case `ModifiedDate` → 2026-10-14; RevisionHistory v1.1 added.
4. Rule 16 stamps NOT required — item is `question_state: "In Audit"`, not Certified.
5. Semantic re-run: case-screens deterministic (448 flags, gate PASS); key-agreement 1
   pre-existing P2 SCRATCHWORK flag (CBQ23-B5-Q1), unchanged.

### Cross-references

- DL-045 (per-batch authorization required for remediation; no auto-remediate)
- DL-047 (adjudication flow), CAQS §5.1 (independent recalculation)
- `knowledge/REVISION_HISTORY.md` — wave-2 entry (2026-10-14)
- `scripts/output/handsolve_wave2_results.json` — comparison evidence

---

## Template for New Entries