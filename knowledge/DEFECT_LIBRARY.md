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

## Template for New Entries