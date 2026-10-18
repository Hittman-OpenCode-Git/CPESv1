# Future Workstream Prompts — Post P0 Remediation

**Generated:** 2026-09-24
**Status:** Ready for scheduling
**Governance:** All require Full Governance Lane (pack/case edits, answer keys, question_state)

---

## WS-F1: P2-F v1.1 MIGRATION_REQUIRED — 30 Items

### Scope
**File:** `p2/pack_p2_f.js`
**Items:** 30 items flagged `MIGRATION_REQUIRED` (not base schema errors — v1.1 migration fields missing)
**Missing fields per item:**
- `source_ids` — array of authoritative references (must resolve to approved catalog)
- `distractor_intent` — per-choice object explaining targeted misconception
- `source_support_for_key` — evidence that the correct answer is independently verifiable
- `uniqueness_note` — what makes this item distinct from similar items

**Root cause:** Source IDs reference non-catalog identifiers (e.g., "ASC 606-10-25" instead of "ASC 606 Revenue Recognition"; "COSO Principle 12" instead of "COSO IC-IF Control Activities").

### Prompt

```markdown
# Session: P2-F v1.1 Migration Wave (30 items)

## Lane: Full Governance Lane
## T0: npm run preflight → 0 divergences

## Target
30 items in `p2/pack_p2_f.js` with `migration_status: "MIGRATION_REQUIRED"`
Run: `node scripts/validators/p2_schema_validator.js --list-migration` for exact QIDs

## Work Per Item
For each of the 30 items:

1. **Audit existing source_ids** — map each to approved catalog:
   - ASC references → `knowledge/foundation/FORMULA_MASTER.md` or ASC master list
   - COSO references → `review/ACCOUNTING_DECISION_TREES.md` COSO section
   - IMA LOS → `foundation/EXAM_BLUEPRINT.md` learning outcomes
   - Textbooks → approved references in `TAXONOMY_REGISTRY.md`

2. **Author `distractor_intent`** — object with keys A/B/C/D:
   ```json
   "distractor_intent": {
     "A": "Targets candidates who confuse [concept X] with [concept Y]...",
     "B": "Targets candidates who misapply [formula] by...",
     "C": "Targets candidates who overlook [constraint]...",
     "D": "Targets candidates who assume [incorrect premise]..."
   }
   ```

3. **Author `source_support_for_key`** — 2-3 sentence evidence that the correct answer is independently derivable from authoritative sources.

4. **Author `uniqueness_note`** — 1 sentence distinguishing this item from its nearest neighbors (topic, parameter set, cognitive demand).

5. **Update `migration_status: "MIGRATED"`** and add `migration_date: "2026-09-XX"`

## Batch Protocol
- ≤30 items per change-set (Rule 5) — all 30 can be one batch
- Backup per BACKUP_PROTOCOL.md before editing `p2/pack_p2_f.js`
- Verify each item passes `p2_schema_validator.js` after edit

## Gates (Tend)
- `node scripts/validators/p2_schema_validator.js` → 0 MIGRATION_REQUIRED, 0 base errors
- `npm run preflight:p2` → 0 divergences
- `npm run pipeline` → all green
- REVISION_HISTORY_P2.md entry with before/after field tables
- DEFECT_LIBRARY.md if any new defects discovered

## Estimated Effort
~4-6 hours (30 items × 8-10 min each for authoritative source mapping + distractor intent authoring)
```

---

## WS-F2: 159 FP INVERSION Flags — Screen Limitation Documentation

### Scope
**Files:** 8 case banks (`content/cases/case_pack_*.js`, `p2/case_pack_p2_*.js`)
**Flags:** 159 false-positive INVERSION flags from `case_semantic_screens.js`
**Root cause:** The B:INVERSION screen uses keyword recall between Explanation text and choice text. When the Explanation *discusses a distractor to explain why it's wrong*, the heuristic reads this as "Explanation supports that distractor."

**Example:** EC says "Choice B ($0) is incorrect because the shadow price is positive" → screen sees "Choice B" + "$0" + "shadow price" in EC and flags INVERSION.

### Prompt

```markdown
# Session: INVERSION False-Positive Analysis & Screen Hardening

## Lane: Governance Light Lane (analysis only — no pack/case edits unless CBQ22-C10-Q4 found genuine)

## T0: npm run preflight → 0 divergences

## Analysis Tasks

### 1. Categorize the 159 FPs
Run: `node scripts/case_semantic_screens.js --export-fp-census`
For each flag, classify:
- **Type A:** EC explicitly refutes distractor ("Choice X is wrong because...") — ~80% expected
- **Type B:** EC contrasts correct vs. incorrect approach using distractor language — ~15%
- **Type C:** EC references distractor's numeric value in a worked example — ~5%

### 2. Propose Screen Hardening (No Item Changes)
Options to evaluate:
| Option | Approach | Trade-off |
|--------|----------|-----------|
| A | Add negation detector: "is incorrect", "is wrong", "not", "refutes" near choice reference | Reduces FP; may miss subtle refutations |
| B | Require EC *conclusion* to match distractor (not just vocabulary) | More precise; needs NLP |
| C | Whitelist known FP QIDs in `KNOWN_FP` set (like semantic_key_verifier.js) | Simple; maintenance burden |
| D | Accept FP rate; document as known limitation | Zero code change; screen stays noisy |

### 3. Decision Gate
Present findings + recommended option to human for approval.
If Option A/B selected → implement in `scripts/case_semantic_screens.js` + test.
If Option C/D → update `KNOWN_FP` in verifier or document in DEFECT_LIBRARY.md.

## Gates (Tend)
- `npm run smoke` (if screen code modified)
- `node scripts/case_semantic_screens.js` → verify FP reduction
- REVISION_HISTORY.md entry for screen changes or FP documentation

## Estimated Effort
~2-3 hours (analysis + proposal + optional screen patch)
```

---

## WS-F3: DL-013 Boilerplate Case Flags — 152 Items

### Scope
**Files:** 8 case banks (same as WS-F2)
**Flags from `case_semantic_screens.js` Screen C (boilerplate detection):**

| Flag Type | Count | Description |
|-----------|-------|-------------|
| B:EXTRA-REFUTED | 53 | EC contains "The governing principle for this item requires..." filler |
| B:UNSUPPORTED-CORRECT | 45 | EC has generic principle but no substituted values / business interpretation |
| C:SHORT | 54 | Explanation < 50 chars (CAQS EV1 floor) |

**Total:** 152 items across cases (some items have multiple flags)

### Prompt

```markdown
# Session: DL-013 Case Boilerplate Remediation Wave

## Lane: Full Governance Lane
## T0: npm run preflight → 0 divergences

## Target
152 flagged items across 8 case banks.
Run: `node scripts/case_semantic_screens.js --export-dl013` for exact CaseID + ItemID list.

## Work Per Item
For each flagged item, author a **genuine case-specific explanation** per CAQS §4.1/§11:

### Required Elements (all must be present)
1. **Accounting Principle** — Name the governing standard (ASC, COSO, IMA, etc.)
2. **Formula with Substitution** — Show calculation with exhibit values
3. **Business Interpretation** — What the result means in the case scenario
4. **Common Exam Trap** — One specific error candidates make on this item type
5. **Distractor Rationale** — For select/multi items, why each wrong choice is wrong

### Per Flag Type
- **B:EXTRA-REFUTED** — Replace entire filler paragraph with genuine explanation
- **B:UNSUPPORTED-CORRECT** — Add substituted values + business interpretation + trap
- **C:SHORT** — Expand to ≥50 chars with principle + calculation + interpretation

## Batch Protocol
- ≤30 items per change-set (Rule 5) → ~6 batches
- Backup per BACKUP_PROTOCOL.md per file per batch
- Verify `case_semantic_screens.js` Screen C flags decrease per batch

## Gates (Tend)
- `node scripts/case_semantic_screens.js` → Screen C flags: 152 → 0 (or documented residual)
- `npm run validate` → 0 errors
- `npm run pipeline` → all green
- REVISION_HISTORY.md entries (per batch or consolidated)
- DEFECT_LIBRARY.md: update DL-013 with case remediation progress

## Estimated Effort
~6-8 hours (152 items × 2.5-3 min each; case explanations require exhibit cross-reference)
```

---

## WS-F4: CBQ22-C10-Q4 — Ambiguous Shadow-Price Case

### Scope
**File:** `p2/case_pack_p2_2.js`
**Case:** CBQ22-C10 (Shadow Pricing / Constraint Optimization)
**Item:** Q4
**Issue:** Independent hand-solve computes shadow price = **$6.00/unit**. Choices: A=$8.00, B=$0.00, C=[missing?], D=$12.00. Stored `Correct: "B"` ($0.00). EC text asserts $0.00 but hand-solve contradicts.

### Prompt

```markdown
# Session: CBQ22-C10-Q4 Shadow-Price Adjudication

## Lane: Full Governance Lane (potential answer-key change)
## T0: npm run preflight → 0 divergences

## Investigation Required

### 1. Re-solve from Exhibits (Independent)
- Read CBQ22-C10 scenario + all exhibits
- Identify the binding constraint
- Compute shadow price: ΔObjective / ΔRHS of binding constraint
- Document every step with exhibit cell references

### 2. Audit Stored Answer
- Stored `Correct: "B"` ($0.00)
- EC text: [read and quote]
- Choices: A=$8.00, B=$0.00, D=$12.00 (verify C exists)

### 3. Determine Root Cause
| Hypothesis | Test |
|------------|------|
| EC is wrong; shadow price = $6.00; choices incomplete | Re-solve confirms $6; no choice matches |
| Exhibit data misread; shadow price actually $0 | Re-solve with correct exhibit values yields $0 |
| Choice C existed and was $6.00; now missing | Check git history / backups for Choice C |
| Stored key B=$0 is correct; hand-solve error | Verify hand-solve with second independent calculation |

### 4. Remediation Options (based on findings)
| Finding | Action |
|---------|--------|
| True answer $6.00; no matching choice | Add Choice C=$6.00 or replace nearest; update Correct; recertify |
| True answer $0.00; hand-solve error | Document why $0; enhance EC clarity; no key change |
| Choice C=$6.00 was deleted | Restore Choice C; set Correct=C; recertify |
| Ambiguous — multiple defensible answers | Flag as High-severity defect; archive case; DL entry |

## Batch Protocol
- Single item but potential answer-key change → Rule 4 (recomputed/independently verified note required)
- Backup `p2/case_pack_p2_2.js` per BACKUP_PROTOCOL.md
- If key changes: `question_state` flip requires recertification stamps (Rule 16)

## Gates (Tend)
- `node scripts/case_semantic_screens.js` on CBQ22-C10 → 0 INVERSION
- `npm run validate:p2` → 0 errors
- `npm run pipeline` → all green
- REVISION_HISTORY_P2.md: detailed entry with independent derivation
- DEFECT_LIBRARY.md: new DL-XXX entry with full evidence

## Estimated Effort
~1-2 hours (deep exhibit analysis + independent re-solve + documentation)
```

---

## Scheduling Guidance

| Workstream | Priority | Dependencies | Can Run Parallel? |
|------------|----------|--------------|-------------------|
| WS-F1 (P2-F Migration) | HIGH | Blocks P2-F certification | Yes (different files) |
| WS-F2 (FP Analysis) | MEDIUM | None (analysis only) | Yes |
| WS-F3 (DL-013 Cases) | HIGH | Blocks case certification quality | Yes (different files from WS-F1) |
| WS-F4 (CBQ22-C10-Q4) | HIGH | Single item; blocks case CBQ22-C10 | Yes |

**Recommended order:** WS-F4 → WS-F1 → WS-F3 → WS-F2 (high-impact single item first, then batch migrations, then boilerplate cleanup, then screen hardening)

---

## Common Requirements (All Workstreams)

- **Backup protocol:** Mandatory per `knowledge/BACKUP_PROTOCOL.md` before any edit
- **Rule 5:** ≤30 items per change-set
- **Rule 16:** Certification provenance stamps on any `question_state` flip
- **Rule 21:** Clean semantic screen re-run before any case certification
- **Dual Verification:** All self-reported claims cross-checked against raw file evidence (AGENTS.md §5)
- **Count Stability:** Verify counts stabilize across two independent scans before acting (AGENTS.md §6)