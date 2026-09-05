# P2 Certification & Full Audit Prompt

**Purpose:** Direct a session to certify all remaining Unprocessed Part 2 MCQ and case items, then perform a full content audit across all Part 2 packs.
**Lane:** Full Governance (pack/case file writes, certification state changes, answer-key verification)
**Prerequisites:** `npm run preflight:p2` must pass at T0 before any writes.

---

## Part 1 — Current State (T0 Snapshot)

### MCQ Packs (3,120 items total, 2,970 target reached — 620 C overflow items remain)

| Pack | File | Total | Certified | Unprocessed | Archived | Shortfall to Target |
|------|------|-------|-----------|-------------|----------|-------------------|
| A | p2/pack_p2_a.js | 500 | 500 | 0 | 0 | 100 (target 600) |
| B | p2/pack_p2_b.js | 500 | 400 | 100 | 0 | 100 (target 600) |
| C | p2/pack_p2_c.js | 620 | 378 | 240 | 2 | 130 (target 750) |
| D | p2/pack_p2_d.js | 500 | 335 | 165 | 0 | 0 (target 500) |
| E | p2/pack_p2_e.js | 500 | 255 | 245 | 0 | 0 (target 500) |
| F | p2/pack_p2_f.js | 500 | 425 | 75 | 0 | 0 (target 500) |
| **Total** | | **3,120** | **2,293** | **825** | **2** | **330** |

### Case Packs (311 cases, 588 items)

| Pack | File | Cases | Items | Certified | Unprocessed |
|------|------|-------|-------|-----------|-------------|
| 1 | p2/case_pack_p2_1.js | 100 | 198 | 33 | 0 |
| 2 | p2/case_pack_p2_2.js | 106 | 198 | 22 | 11 |
| 3 | p2/case_pack_p2_3.js | 75 | 132 | 22 | 0 |
| Authored | p2/case_pack_p2_authored.js | 15 | 30 | 0 | 5 |
| C4-C8 | p2/case_pack_p2_C4_C8.js | 15 | 30 | 0 | 5 |
| **Total** | | **311** | **588** | **77** | **21** |

### Certification Targets

| Category | Current | Target | Gap |
|----------|---------|--------|-----|
| MCQ Certified | 2,293 | 3,120 (all current items) | 825 |
| Case Certified | 77 | 311 (all current cases) | 234 |
| MCQ pack targets (v3.0) | — | A=600, B=600, C=750, D=500, E=500, F=500 | 330 authoring |

---

## Part 2 — Certification Execution

### Phase A: MCQ Certification (825 Unprocessed items)

**Order:** Certify by pack, largest Unprocessed pool first.

| Batch | Pack | Items | QIDs | Notes |
|-------|------|-------|------|-------|
| 1 | C | 30 | P2-C-{next 30 unprocessed} | Largest pool; start here |
| 2–8 | C | 210 (7×30) | P2-C-{continuing} | Complete Pack C |
| 9 | B | 30 | P2-B-{next 30 unprocessed} | |
| 10–12 | B | 70 (remaining) | P2-B-{continuing} | Complete Pack B |
| 13 | D | 30 | P2-D-{next 30 unprocessed} | |
| 14–18 | D | 135 (remaining) | P2-D-{continuing} | Complete Pack D |
| 19 | E | 30 | P2-E-{next 30 unprocessed} | |
| 20–26 | E | 215 (remaining) | P2-E-{continuing} | Complete Pack E |
| 27 | F | 30 | P2-F-{next 30 unprocessed} | |
| 28 | F | 45 (remaining) | P2-F-{continuing} | Complete Pack F |

**Per-batch certification checklist (mandatory):**

1. **T0 preflight:** `npm run preflight:p2` — 0 divergences before any write
2. **Backup:** Copy target pack file to `p2/pack_p2_X.js.bak-{timestamp}` before each batch
3. **DL-008 scan:** Verify 0 non-empty `ExplanationWrong[CorrectChoice]` in batch items (Rule 2)
4. **DL-026 scan:** Verify 0 empty non-CC `ExplanationWrong` slots in batch items (Rule 6)
5. **DL-037 scan:** Verify 0 choice binary lead-in polarity mismatches (Rule 9)
6. **Answer key verification:** For every item in the batch, independently derive the correct answer from stem + choices. Compare to stored `CorrectChoice`. Flag any mismatch (DL-030 class).
7. **Explanation quality:** Every `ExplanationCorrect` ≥ 50 characters, references governing standard (ASC/COSO/IMA), includes formula with substitution for calculation items
8. **Distractor quality:** Every non-CC `ExplanationWrong` ≥ 50 characters, choice-specific (not boilerplate), addresses the specific misconception
9. **Metadata completeness:** `CognitiveLevel`, `DifficultyScore`, `Part2OnlyFlag: true`, `UniqueConceptKey`, `ItemStyle`, `LOSTag` all present
10. **Cognitive classification (Rule 11):** Verify `CognitiveLevel` matches actual question demand. Definition-match items (stem-CorrectChoice overlap > 50%) must be Remember/Understand, not Apply/Analyze/Evaluate
11. **State flip:** Change `question_state` from `"Unprocessed"` to `"Certified"` for all batch items that pass all checks above
12. **Log:** Append certification entry to `knowledge/REVISION_HISTORY_P2.md` with QID list, batch number, date, and verification results

**Items that FAIL certification checks:**
- Do NOT flip to Certified
- Log the defect to `p2/DEFECT_LIBRARY_P2.md` with DL-ID classification
- Fix if structural (DL-008, DL-026, missing fields) — then re-check
- If content defect (wrong answer, bad explanation) — fix, re-verify, then certify
- If unfixable in batch — leave as `"Unprocessed"`, note in revision history

### Phase B: Case Certification (21 Unprocessed cases across 3 packs)

**Pack 2:** 11 Unprocessed cases (CBQ22-*)
**Authored:** 5 Unprocessed cases (p2/case_pack_p2_authored.js)
**C4-C8:** 5 Unprocessed cases (p2/case_pack_p2_C4_C8.js)

**Per-case certification checklist:**

1. **Scenario realism:** Named company, stakeholder, business trigger, clear task (CAQS §3.1)
2. **Exhibit quality:** Professional format, no decorative data, every row consumed by ≥1 item
3. **Data consistency:** Numbers in exhibits internally consistent (subtotals match totals)
4. **Answer key verification:** Independently solve every item. Compare to stored `Correct`. Flag mismatches.
5. **Explanation quality:** Every item explanation ≥ 50 chars, references governing standard, includes formula for calculation items
6. **Cognitive progression:** Items follow Apply → Analyze → Evaluate sequence (CAQS §3.5)
7. **Distractor quality:** Every distractor explanation is choice-specific, addresses specific misconception
8. **Metadata:** `CaseID`, `ItemID`, `ExhibitID` unique. `SectionTags`, `BlueprintDomain`, `Difficulty`, `DifficultyScore` present and consistent.
9. **State flip:** Change `question_state` from `"Unprocessed"` to `"Certified"`
10. **Log:** Append to `knowledge/REVISION_HISTORY_P2.md`

---

## Part 3 — Full Content Audit (Post-Certification)

After all certification batches complete, run a full audit across ALL Part 2 content (Certified + Unprocessed + Archived).

### Audit Dimension 1: Structural Integrity (automated)

Run these tools against every pack file:

| Check | Tool/Method | Expected |
|-------|------------|----------|
| Parse integrity | `node -e "const f=require('fs').readFileSync('p2/pack_p2_X.js','utf8'); const a=eval('('+f+')'); console.log(a.length)"` | No crash |
| QID uniqueness | Grep all `QuestionID` values, check for duplicates | 0 duplicates |
| Topic uniqueness | Grep all `Topic` values per pack, check for duplicates | 0 duplicates |
| UniqueConceptKey uniqueness | Grep all `UniqueConceptKey` values, check for duplicates | 0 duplicates |
| DL-008 | For each item: `Q["ExplanationWrong"+Q.CorrectChoice]` must be `""` | 0 violations |
| DL-026 | For each item: all non-CC `ExplanationWrong` slots must be non-empty | 0 violations |
| DL-037 | Scan all Choices for "No,...should" / "Yes,...should not" patterns | 0 violations |
| Part2OnlyFlag | Every P2 item must have `Part2OnlyFlag: true` | 100% compliance |
| CognitiveLevel | Every item must have a valid `CognitiveLevel` | 100% present |
| DifficultyScore | Every item must have a valid `DifficultyScore` (1–5) | 100% present |
| ExplanationCorrect length | Every item must have `ExplanationCorrect` ≥ 50 chars | 100% compliance |

### Audit Dimension 2: Answer Key Accuracy (manual sample + automated)

| Check | Method | Sample Size |
|-------|--------|-------------|
| Full recalculation | Independently solve every numerical item | 100% of calculation items |
| Conceptual verification | Verify every conceptual item's correct answer against authoritative source | 100% |
| DL-030 class | For each item, derive correct answer from stem + choices, compare to stored `CorrectChoice` | 20% random sample per pack |
| Explanation-answer consistency | Verify `ExplanationCorrect` actually describes the stored correct answer | 100% |

### Audit Dimension 3: Content Quality (rubric scoring)

Score a 10% random sample per pack against CAQS v1.0 §2 rubric (100-point scale):

| Dimension | Weight | What to check |
|-----------|--------|---------------|
| Blueprint Alignment | 20% | Maps to specific IMA LOS, correct LOSTag |
| Cognitive Level | 15% | Correct Bloom's level, matches question demand |
| Technical Accuracy | 15% | Accounting treatment correct under GAAP/COSO/IMA |
| Distractor Quality | 15% | Each targets distinct misconception, ≥50 chars |
| Business Realism | 10% | Realistic scenario, named company, professional language |
| Numerical Integrity | 10% | All calculations independently verified |
| Explanation Quality | 10% | Mini-lesson structure, principle + formula + trap |
| Writing Clarity | 5% | Professional tone, no grammar errors |
| Accessibility | 5% | No biased language, neutral |
| Metadata | 5% | All required fields present |

Target: ≥90/100 mean across sample.

### Audit Dimension 4: Psychometric Balance

| Check | Method | Target |
|-------|--------|--------|
| Answer position distribution | Count CC=A/B/C/D across each pack | 22–28% per position |
| Difficulty distribution | Count DifficultyScore 1/2/3/4/5 per pack | Per CAQS §6.1 targets |
| Cognitive level distribution | Count CognitiveLevel per domain | Per CAQS §6.2 targets |
| Section weight conformance | Items per domain / total | A≈17%, B≈17%, C≈22%, D/E/F≈15% each |
| Distractor similarity | Jaccard word-overlap between all choice pairs per item | 0 pairs > 70% within an item |

### Audit Dimension 5: Governance Compliance

| Check | Method | Expected |
|-------|--------|----------|
| Governance guard | `node scripts/governance_guard_p2.js` or equivalent | 74/74 PASS |
| Preflight | `npm run preflight:p2` | 0 divergences |
| Validate | `npm run validate:p2` or equivalent | 0 errors |
| Baselines cross-check | Compare file hashes against `CURRENT_BASELINES_P2.md` §1 | Match |
| REVISION_HISTORY completeness | Every certification batch has a corresponding entry | 100% |
| DEFECT_LIBRARY completeness | Every discovered defect has an entry | 100% |

---

## Part 4 — Deliverables

After certification and audit complete, produce:

1. **Certification Report** — QIDs certified per batch, before/after counts, any items left Unprocessed with reasons
2. **Audit Report** — Findings per dimension, quality scores, distribution metrics, defects discovered
3. **Updated CURRENT_BASELINES_P2.md** — New Certified counts, file hashes
4. **Updated REVISION_HISTORY_P2.md** — All certification batches logged
5. **Updated DEFECT_LIBRARY_P2.md** — Any new defects discovered during audit
6. **Gap Analysis** — Remaining items to reach pack targets (A: +100, B: +100, C: +130)

---

## Governance Rules (standing — all batches)

| Rule | Enforcement |
|------|-------------|
| Rule 1 | Every `question_state` change must pair with REVISION_HISTORY_P2.md entry |
| Rule 2 | DL-008: `ExplanationWrong[CorrectChoice]` must be `""` — BLOCK |
| Rule 5 | ≤30 items per change-set — BLOCK |
| Rule 6 | DL-026: non-CC ExplanationWrong must be non-empty — BLOCK |
| Rule 9 | DL-037: choice binary lead-in polarity — BLOCK |
| Rule 11 | CognitiveLevel must match actual question demand — BLOCK |
| Rule 12 | No cognitive relabeling without content change — BLOCK |
| Rule 13 | Part2OnlyFlag must be `true` on every P2 item — BLOCK |
| Rule 14 | P1 QIDs blocked in P2 packs — BLOCK |
| Backup | Mandatory before every pack/case file write |
| Dual Verification | Every self-reported claim of "certification complete" cross-checked against raw file evidence |
