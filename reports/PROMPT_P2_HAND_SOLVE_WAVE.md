# Prompt: P2 Case Hand-Solve Certification — COMPLETED WAVE RECORD

**Version:** 2.0 (supersedes v1.0 of 2026-09-30)
**Status:** **Complete.** This is a record of a finished wave, not an instruction to run one.
**Authority:** PROJECT_CONSTITUTION.md, AGENTS.md, Board Resolution 2026-09-29
**Session:** P2-HAND-SOLVE-WAVE, 2026-09-30 → 2026-10-04

---

## Read this first if you are looking for the original v1 spec

**v1.0 contained four verified factual errors. Do not run it.** It is retained in git history only.

| v1.0 claimed | Reality |
|---|---|
| "99 In Audit items" | **408** items across 68 cases (certified census, verified) |
| "4 change-sets of 25" | **14** batches; the gate caps **30 cases** per change-set and every case is 6 items, so **5 cases = 30 items** is the real unit |
| `scripts/case_batch_certify.js` | Does not exist. Gate is **`scripts/case_cert_batch_gate.js`**, and it takes `--batch <manifest.json>`, **not** a CaseID list |
| `scripts/output/CASE_REVIEW_ITEMS.txt` | Does not exist. The real file (`reports/CASE_REVIEW_ITEMS.txt`) lists 148 flags on **Certified** cases — the opposite population |

v1 also told the executor to flip `question_state` directly and to pass a `--batch` flag that
`case_semantic_screens.js` does not accept. The gate explicitly does **not** flip state
("state flips are intentionally NOT performed by this gate"), so certification needs a separate,
guarded step.

---

## Outcome

**P2 population** (the 5 `p2/` banks — the wave's target; the 3 P1 case banks are out of scope and
cited only where explicitly labelled):

| Metric | Result |
|---|---|
| P2 cases Certified | **101 / 110** |
| P2 cases Archived | 9 (pre-existing, DL-P2-024 duplicates) |
| **P2 cases In Audit** | **0** |
| Batches run | **14** |
| P2 items hand-solved | **408** (68 cases x 6 items) |
| Key defects found and fixed | **14** |
| DL entries filed | **9** + **5** corrections/remediations = 14 records |
| Screens built | **2** (D: boilerplate/scratchwork; E: key-agreement/encoding) |

Every P2 case that was ever `In Audit` is now `Certified`.

> **Scope note.** P1 is a *different population* and is stated separately wherever it appears:
> **49 P1 cases Certified, 31 P1 cases In Audit.** Screen E and screen D both cover P1 and P2, which
> is how this wave found P1 defects (DL-067, DL-P2-031) that no P2-scoped scan had caught. Do not
> read a P1 figure as a P2 figure or the reverse.

---

## Tooling — use these, not v1's paths

| Purpose | Script | Notes |
|---|---|---|
| P2 case-batch gate | `scripts/case_cert_batch_gate.js` | `--batch <manifest.json>`; **dry-run by default**; needs `evidence_basis` (Rule 22) |
| Semantic screens | `scripts/case_semantic_screens.js` | writes `scripts/output/case_semantic_flags.json`; **the gate reads this exact path** |
| Key-agreement / encoding screen | `scripts/key_agreement_screen.js` | `npm run key-agreement`; wired into `pipeline` |
| Post-remediation verifier | `scripts/verify_remediation.js` | asserts every DL entry's per-item claim against the banks |
| Case census | `scripts/census_p2_cases.js` | ground truth for state counts |

`npm run pipeline` now runs: guard-tests → validate → validate:p2 → case-screens →
key-agreement → **verify-remediation** → semantic_key_verifier → clone-gate → build-registry →
dashboard → baseline-coherence → coverage-assert.

---

## The procedure that worked

### 1. Per-item hand-solve, keys withheld

Dump the batch with answers and explanations **suppressed**, derive each item from its exhibits,
then reveal and compare. Deriving first is the only thing that catches a key that is wrong —
screens did not catch a single one of the 14 key defects in this wave.

### 2. Batch unit is 5 cases, not 25 items

The gate caps 30 **cases** per change-set. Every case carries 6 items, so the Rule 5-compliant unit
is **5 cases = 30 items**. v1's "25 items" would have been both the wrong unit and over the cap.

### 3. Check own-state items before certifying

**This is the lesson worth carrying forward.** Item state is not uniform:

- A case whose items carry their own `question_state` **shadows** the case-level value. Flipping only
  the case leaves every item uncertified and the gate fails with `6/6 items not 'Certified'`.
- Probe first: `items.filter(i => i.question_state !== undefined).length`.
- By the end of the wave, **most remaining cases carried own-state items** (Batch 13 was 30/30).

### 4. Prove a key is wrong before replacing it

Re-derivation is not enough — show the old key is *unreachable* from the exhibits. Worked examples:

| Item | Old key | Why unreachable |
|---|---|---|
| `CBQ23-A8-Q2` | 60 | explanation read "61.5 = 60"; 61.5 rounds to 62 |
| `CBQ23-C7-Q5` | D (−28,000) | no option states the correct +9,000 |
| `CBQ23-C9-Q1` | 73 | implies a $589,828 price against the stated $600,000 |
| `CBQ3-D4-Q3` | 433,500 | implies a 150.145% OH rate against the stated 150.00% |

### 5. Adjudicate every screen flag against content

A screen is built by adjudicating its output, not by writing its rules. Both new screens were
calibrated this way:

```
Screen E:  247 → 53 → 27 → 21 → 13 → 4 → 1 flags
```

Every reduction came from finding the content correct and teaching the check something. **No check was
ever loosened to make a flag disappear**, and the negative control (fires on each injected defect,
silent on a clean control) stayed at 5/5 throughout.

---

## The recurring failure mode: a subset result reported as a whole

Four times this wave, a result computed over a subset was reported as a property of the population:

| Entry | Claim | Actual scope |
|---|---|---|
| DL-P2-026 | "class closed, 0/660" | P2 banks only — P1 never scanned |
| DL-P2-029 | "0 pool-wide scratchwork" | P2 banks only; 6 P1 items existed |
| DL-P2-030 | "damage is 7 items, `Ã·` is legitimate" | 35 items; `Ã·` damage in a UTF-8-aware file |
| DL-P2-032 | "unrecoverable, needs judgement" | 13 of 13 sites recoverable from sentence structure |

**State the scan boundary inside every closure claim.** Four of the eleven DL entries exist only to
retract an earlier claim of the same kind.

A related family: **a token classified in isolation misreads valid content.** All four Screen E / D
false positives had the same shape — the check lacked the container that gives a token meaning:

| Check | Missing container |
|---|---|
| `\bWait\b` scratchwork | sentence context (possessive, separator, option label) |
| `Ã·` encoding | **file**-level context |
| pool-wide scratchwork count | the scan boundary |
| key shape | the **choices array** |

---

## Key defects found — 14, all key-contradicts-own-explanation

Every one had a stored explanation that computed the correct figure and then narrated or was keyed
past it. **No screen caught any of them.**

| Item | Was | Now | State when found |
|---|---|---|---|
| `CBQ21-B4-Q1` | 7.45% | **7.48%** (choice text) | In Audit |
| `CBQ21-F5-Q1` | C (§806) | **A (§302)** | In Audit |
| `CBQ23-A7-Q4` | B | **A** | In Audit |
| `CBQ23-A8-Q2` | 60 | **61** | In Audit |
| `CBQ23-C7-Q5` | D | **A** | In Audit |
| `CBQ23-C8-Q2` | 155,000 | **355,000** | In Audit |
| `CBQ23-C8-Q4` | 6,000 | **−1,000** | In Audit |
| `CBQ23-C9-Q1` | 73 | **50.63** | In Audit |
| `CBQ23-C9-Q5` | C | **B** | In Audit |
| `CBQ23-B3-Q5` | 8.89 | **8.66** | In Audit |
| `CBQ23-C6-Q2` | 86 | **38.50** | In Audit |
| `CBQ3-D4-Q3` | 433,500 | **430,500** | **Certified** |
| `CBQ3-A3-Q2` | 486,842 | **480,381** | In Audit |
| `CBQ3-C4-Q2` / `Q3` | −72,000 / −11,200 | **−32,000 / −5,600** | In Audit |

**\~60% of the batches contained at least one genuine key defect.** Two were already learner-reachable.

---

## Explanation defects remediated

| Class | Items | Entry |
|---|---|---|
| Generic boilerplate filler | 51 occurrences / 37 items | DL-P2-026 |
| 7th boilerplate phrase (missed by the first scan) | 18 items | DL-P2-026 correction |
| Same class in P1 (newly certified, learner-reachable) | 45 items, 29 Certified | DL-067 |
| Authoring scratchwork, P1 | 6 items, 4 Certified | DL-P2-031 |
| Mojibake (`â€”`, `Ã·`) | 26 items, all Certified | DL-P2-030 |
| `U+FFFD` data loss | 13 chars / 9 items, 2 Certified | DL-P2-032 |

**Tiers differ in repairability.** Mojibake is a deterministic substitution (bytes intact).
`U+FFFD` destroys the bytes — those 13 sites were recovered only because sentence structure and the
corpus's own convention (480 correct em dashes per bank) determined the character. **Structure-inferred
repair is legitimate; guessing is not.**

---

## Standing cautions

1. **Do not accept a plausible explanation.** `CBQ22-C6-Q2`'s explanation asserted that immediate
   entry beat the pilot; only building the decision tree (pilot EV = $6.32M vs entry $9.5M) established
   the key.
2. **A screen reporting adjudicated false positives beats one reporting zero by suppression.**
   Screen E's single remaining flag (`CBQ23-B5-Q1`, a legitimate rounding note) is **deliberately
   retained** — excluding it would fit the rule to the one observation that failed and suppress the
   key-narration class the marker exists to catch.
3. **A passing gate that checks almost nothing is worse than no gate.** The verifier's first version
   reported 21/21 while asserting zero key values; it was checking item existence and little else.
4. **Verify remediation claims from the banks, not from summaries.** A summary reported an item as
   rewritten that had never been touched; the repo entry was correct and the chat summary had drifted.
   `verify_remediation.js` now makes that checkable in a second.
5. **Pre-write gates must assert the property the artifact needs.** A prefix check deleted a revision
   history entry by rebuilding from a backup taken *before* a prior append.

---

## Remaining work

- **Open:** DL-P2-028 (`CBQ23-A8-Q4` distractor states fabricated figures — option A on file).
- **Open candidate:** a key-vs-explanation **numeric-agreement** screen independent of the
  explanation — 4 of 5 calibration passes were to teach the existing checks about scale and
  containers, which suggests a purpose-built check would earn its keep.
- **Routine:** `P2_STRICT_CASES` in `pool_parity_probe.js` must be re-bumped after any batch that
  changes the certified count. It is an assertion, not a target — do not relax it to go green.

---

## Provenance

Full evidence for every action in `knowledge/REVISION_HISTORY_P2.md` under Session
P2-HAND-SOLVE-WAVE (2026-09-30 → 2026-10-04). Defect records in `p2/DEFECT_LIBRARY_P2.md`
(DL-P2-026 … DL-P2-034) and `knowledge/DEFECT_LIBRARY.md` (DL-067).