# P2 Overnight Sprint Prompt — Complete the Remaining MCQs & Case Studies

**Version:** 1.0
**Status:** Dispatch-ready
**Targets governed by:** `knowledge/S121_PORTFOLIO_TARGETS.md` (immutable) + `p2/P2002_BLUEPRINT_EXTRACTION.json` (per-domain cognitive distributions) + `p2/P2_SCHEMA_STANDARD.md` v1.1 + `p2/P2002_CERTIFICATION_STANDARD.md`
**Lane:** Full Governance (T0 preflight, backup-before-write, Rule 5, dual verification, revision logging)
**User authorization:** Overnight autonomous run to close the remaining authoring gap. Author new content, validate it, and certify only items that pass every certification gate. Do not widen scope.

---

## 1. ROLE

You are the **Part 2 Content Authoring & Certification Orchestrator** for the CMA Exam Simulator. You will operate autonomously overnight. You are a member of the development team, not a conversational assistant. You author to a ratified contract, you verify against authoritative baselines, and you stop on any gate failure.

Read, in order, before doing anything else:

1. `.opencode/skills/content-authoring/SKILL.md` — the mandatory Part 2 authoring workflow.
2. `p2/P2_SCHEMA_STANDARD.md` — the v1.1 MCQ object contract (including the §1.1 authoring-evidence fields).
3. `knowledge/S121_PORTFOLIO_TARGETS.md` — the immutable difficulty, cognitive, and answer-position targets.
4. `p2/P2002_CERTIFICATION_STANDARD.md` — the six-dimension certification gates.
5. `p2/CURRENT_BASELINES_P2.md` — the authoritative pool snapshot you must verify, not trust.

---

## 2. T0 ANCHOR — VERIFY, THEN ASSUME

Run a live read-only census before any write. Function-constructor parse each pack (`Function(src + ';return pack_p2_' + section + '_questions;')()` for `pack_p2_{a,b,c,d,e,f}.js`, and `Function(src + ';return casePackP2_' + n + ';')()` for the case packs). Record: QID count, `question_state` distribution, per-LOS counts, per-difficulty counts, per-cognitive counts, per-answer-position counts, per-topic counts.

**Expected state (verified 2026-09-05, re-verify at T0):**

| Pack | File | Current QIDs | Target | Gap | New QID Range |
|------|------|--------------|--------|-----|---------------|
| A | `p2/pack_p2_a.js` | 500 (500 Certified) | 600 | **+100** | P2-A-501 – P2-A-600 |
| B | `p2/pack_p2_b.js` | 500 (500 Certified) | 600 | **+100** | P2-B-501 – P2-B-600 |
| C | `p2/pack_p2_c.js` | 620 (618 Certified, 2 Archived) | 750 | **+130** | P2-C-621 – P2-C-750 |
| D | `p2/pack_p2_d.js` | 500 | 500 | 0 | — |
| E | `p2/pack_p2_e.js` | 500 | 500 | 0 | — |
| F | `p2/pack_p2_f.js` | 500 | 500 | 0 | — |
| **Total** | | **3,120** | **3,450** | **+330** | |

**Case packs:**

| File | Current | Target | Gap |
|------|---------|--------|-----|
| `p2/case_pack_p2_1.js` | 33 (33 Certified) | 33 | 0 |
| `p2/case_pack_p2_2.js` | 33 (33 Certified) | 33 | 0 |
| `p2/case_pack_p2_3.js` | 22 (22 Certified) | 34 | **+12** (CBQ23-*) |

**Hard rule:** If the T0 census disagrees with the table above by any nonzero amount, **STOP before authoring**. Recompute, reconcile against `p2/CURRENT_BASELINES_P2.md`, document the discrepancy, and do not proceed until the count is stable across two independent scans (Item-Count Volatility hard stop, AGENTS.md §6). Never author into a QID range that is already occupied.

---

## 3. MISSING-CONTENT DETERMINATION — STRICT METHOD

Do not invent topics by intuition. The content to write is determined by a **deterministic deficit computation** against the blueprint. Run it mechanically and record the output as `p2/sprint_output/LOS_GAP_ALLOCATION.json`.

### 3.1 LOS-Level Gap Algorithm

For each pack being expanded (A, B, C):

1. From the T0 census, extract `current[los]` = count of existing items per LOSTag (`A.1`–`A.9`, `B.1`–`B.9`, `C.1`–`C.7`). Items whose LOSTag is absent or outside the domain's LOS set are flagged (do not guess their LOS; count them in a "misc" bucket and exclude from LOS math).
2. Compute `ideal[los] = pack_new_total / los_count` (equal share baseline, since the blueprint provides no per-LOS weights).
3. Compute `deficit[los] = ideal[los] − current[los]`.
4. Allocate each of the `pack_new_total` items to the LOS with the **largest positive deficit**, tie-broken alphabetically by LOS code. Repeat until all new items are assigned.

**Hard rules:**
- Every LOS in the domain that is under its equal-share baseline receives at least one new item before any LOS above baseline receives a second.
- No LOS may receive more than `ideal + 2` new items.
- **D/E/F receive zero new MCQs** — they are at target. Do not author them.
- Record every allocation with its LOS, QID, and deficit-at-time-of-allocation. This file is the audit trail for "why this topic and not another."

### 3.2 Topic-Level Determination

Within each LOS, pick the Topic (field format `"{Section}.{NNN} descriptor"`) by deficit at the topic level:

1. From the T0 census, list existing Topic descriptors per LOS.
2. For each new item, choose a topic that is **either uncovered or under-represented** within its LOS. Do not add a 6th item on a topic that already has 5 when a sibling topic has 1.
3. Two items in the same 15-item batch must not share a Topic descriptor unless they are a deliberate scenario pair (a scenario split across two items is allowed only if each item is independently answerable and `pedagogical_cluster` is set on both).
4. Fictional-company diversity: no two items in the same batch may reuse the same company name; across the sprint, no company name may appear more than twice per pack. Vary industry, stakeholder role, and business function.

### 3.3 Clone & Duplication Screens (mandatory, run BEFORE each batch integrates)

- **UniqueConceptKey** must be unique pool-wide (search the destination pack + all staged files).
- **Stem fingerprint dedup:** normalize (lowercase, strip spaces/punctuation/digits) each new stem and compare against all existing stems in the pack. Zero collisions.
- **DL-046-P2 rotation-clone gate (AGENTS.md §19.4):** pairwise compare each new item against ALL existing items in ALL packs on **(normalized numeric-literal multiset + Topic string)**. Identical multiset + identical Topic = suspected clone → do not author it; substitute a different parameter set.
- **No worked-example parameter reuse:** never author a new item that reuses the numeric parameter set of a prior item in the same domain with only cosmetic rewording and answer rotation (the P2-C-181≡199 / P2-C-185≡198 failure mode). This is the DL-012/DL-046 template-clone family — prohibited.
- **No rotation-template groups:** never produce 5-item groups varying only by company name and answer position.

---

## 4. DIFFICULTY DETERMINATION — STRICT RULES

Difficulty is a **consequence of cognitive demand**, never a portfolio-filling choice (Rule 12). Apply, in order:

1. **Cognitive demand first.** Determine what the item actually requires: recall a definition, interpret a concept, execute a computation, decompose a scenario, or render a judgment. This sets `CognitiveLevel` before writing (Cognitive-First Assignment).
2. **Map to difficulty via the Rule 11 gates (`content-authoring` SKILL §4 Step 4):**
   - `Evaluate` requires `DifficultyScore ≥ 3`; `Analyze` requires `DifficultyScore ≥ 2`.
   - If the stem is a direct rule application ("Under CAPM...") with no competing-alternative weighing → **Apply**, never Analyze/Evaluate.
   - If the stem is "what type of / which component / classified as" → **Apply**, never Analyze/Evaluate.
3. **DL-031 floor:** a definition-match item (stem defines a term, correct answer is the term, stem→choice lexical overlap > ~50%) is **Easy (1) at Remember/Understand**. Never label it Moderate. This is a WARN-to-BLOCK in the stop-condition table.
4. **DCS-style anchoring (from `content-authoring` SKILL §5):**
   - 1 Easy — single-step recall / definition match, no calculation.
   - 2 Moderate-Easy — two-step recall, simple formula plug-in, straightforward interpretation.
   - 3 Moderate — multi-step calculation, ratio analysis with interpretation, standard WACC/CAPM.
   - 4 Difficult — multi-concept integration, DuPont decomposition, NPV with tax/working capital, ERM scenario analysis, FX hedging strategy.
   - 5 Very Difficult — cross-domain synthesis, capital rationing with ranking, optimal-capital-structure recommendation with competing factors, ethical dilemma spanning multiple standards.
5. **Target distribution (S121 §2):** each pack's new items must land the **whole pack** within ±3pp of 15/20/30/25/10 for Easy/Mod-Easy/Moderate/Difficult/Very-Difficult. Default per-pack totals:

| Pack | +Items | Easy(1) | Mod-Easy(2) | Moderate(3) | Difficult(4) | Very Diff(5) |
|------|-------|---------|-------------|-------------|--------------|--------------|
| A | 100 | 15 | 20 | 30 | 25 | 10 |
| B | 100 | 15 | 20 | 30 | 25 | 10 |
| C | 130 | 19 | 26 | 39 | 33 | 13 |

At T0, recompute these against the existing pack distribution and adjust so the **cumulative** post-wave pack is within tolerance. Document any deviation in the wave plan. `Difficulty` label strings must be `Easy | Moderate-Easy | Moderate | Difficult | Very Difficult`.

---

## 5. DIVERSITY REQUIREMENTS — STRICT RULES

### 5.1 Cognitive-Level Distribution (per-domain, from `P2002_BLUEPRINT_EXTRACTION.json` blooms_distribution)

| Pack | +Items | Remember | Understand | Apply | Analyze | Evaluate |
|------|-------|----------|------------|-------|---------|----------|
| A | 100 | 10 | 20 | 45 | 20 | 5 |
| B | 100 | 10 | 20 | 50 | 15 | 5 |
| C | 130 | 6 | 20 | 65 | 26 | 13 |

- These are **wave totals**. The cumulative pack must approach the domain target. Recompute at T0 against the live pack and bias the wave to correct existing skew.
- **Rule 12 prohibition:** never relabel an existing item to fill a cognitive gap; close gaps by authoring new items at the needed level.
- **Evaluate items:** must present a named decision-maker, a real judgment call, and at least two defensible alternatives (AF-E4 / S122 stakeholder check). Analyze items: must require decomposition, not just a computed number.

### 5.2 Answer-Position Balance (S121 §4)

- Target: 22–28% per position A/B/C/D, **checked per section, not just per pack** (S121 §4 anti-pattern: pack-level balance can hide section-level bias).
- Default per-batch mix: **4A / 4B / 4C / 3D**, maximum run of the same letter = 2.
- At T0, compute each pack's current per-section answer-position distribution. Where a position sits above 28%, shift the wave's CorrectChoice letters to pull it back into range. Record the adjusted mix per batch.
- Partial (10-item) batches: **3A / 3B / 2C / 2D** default, same correction rule.

### 5.3 LOS / Topic Diversity

Per §3 — the deficit computation is the mechanism. No topic may be over-represented just because it is easy to write.

### 5.4 Formula & Item-Style Diversity

- Spread `FormulaReference` across the domain's formula set (A: FA-01–FA-25; B: CB-01–CB-11; C: DA-01–DA-11). No domain wave may use one formula more than ~20% of the time. Conceptual items use `"FormulaReference": ""`.
- Item styles: the overwhelming majority `single-select`; include a minority of `numeric` and `multi-select` items where the concept genuinely supports them (target ~5–8% numeric/multi per pack). Do not force a style.

### 5.5 Prohibited Diversity Anti-Patterns

- No template-rotation clone groups (DL-012).
- No identical boilerplate distractor explanations (DL-013).
- No logical-equivalent distractor pairs ("X is less than Y" vs "Y is more than X") (DL-043).
- No absolute-language cueing in distractors ("always"/"never"/"impossible") (DL-003).
- No choice lead-in polarity mismatch ("No, ... so it should be accepted") (DL-037, Rule 9).
- No cross-domain topic bleed — A/B/C items must not test D/E/F concepts as the primary object (Part 2 relevance, and A/B/C stay in their own domains).

---

## 6. PER-BATCH SLOT TABLE (copy verbatim into each subagent prompt)

Each 15-item batch uses this fixed mix. Batches are separate change-sets (Rule 5 ≤30).

```
QIDs:      contiguous, pre-assigned (see §3 allocation; no gaps, no reuse)
Difficulty: 2 Easy / 3 Mod-Easy / 5 Moderate / 3 Difficult / 2 Very Difficult
Cognitive:  R1 / U3 / Ap7 / An3 / Ev1  (pack-level totals in §5.1 govern closeout)
Answer:     4A / 4B / 4C / 3D, max streak 2
LOSTag:     pre-assigned per §3.1 deficit allocation
Formula:    FA-*/CB-*/DA-* per §5.4
```

---

## 7. AUTHORING CONTRACT — EVERY ITEM MUST SATISFY

**Schema:** `p2/P2_SCHEMA_STANDARD.md` §1 (v1.1). Every new item is a single JSON object (no dual-block, no DL-016 architecture) with:

- `Part: 2`, `schema_version: "1.1"`, `Section`, `Topic` (`{Section}.{NNN} descriptor`), `QuestionID` (`P2-{Section}-{NNN}`), `question_state: "Unprocessed"`, `Part2OnlyFlag: true` (strict boolean), `UniqueConceptKey` (kebab, unique pool-wide), `Stem`, `Choices` {A,B,C,D}, `CorrectChoice`, `ExplanationCorrect`, `ExplanationWrongA–D`, `Difficulty`, `DifficultyScore`, `CognitiveLevel`, `CalculationItem`, `ItemStyle`, `LOSTag`, `BlueprintDomain`, `FormulaReference`, `Authorities`, `VerifiedChecks`.
- **v1.1 authoring-evidence fields (required):** `source_ids` (must resolve in `scripts/validators/p2_source_catalog.js` + `P2005_FORMULA_MASTER.json`), `source_support_for_key` (all four strings non-empty, resolving source_id), `distractor_intent` (keys = exactly the 3 non-CC letters; each with `misconception`, `why_plausible`, unique integer `tier_candidate` 1/2/3), `uniqueness_note` (falsifiable, references every non-key option), `source_status` (`RESOLVED`), `hold_reason` (`""`).
- If a precise approved source cannot be supplied for an item, set `source_status: "HOLD_FOR_SOURCE"` with a non-empty `hold_reason` and `source_support_for_key: null`. The item is **quarantined** (Unprocessed, hard-rejected from certification). Do not fabricate a source ID.

**Explanation quality (CAQS §4 / SKILL §6):**
- `ExplanationCorrect`: names the governing standard/principle; shows formula→substitution→result (calculation) or full reasoning chain (conceptual); includes business interpretation. Min 100 chars for Remember/Understand, 200 for Apply+.
- `ExplanationWrong*`: choice-specific, each addressing a distinct misconception with a correction. Min 50 chars each. **The slot matching `CorrectChoice` is `""` (DL-008). All three non-CC slots present and non-empty (DL-026 / DL-021).**
- Never use "represents a plausible misconception", "Option X is incorrect", "A candidate may select this option by misapplying..." (DL-013).

**Business realism (CAQS §3.8):** named company, named stakeholder with a role, a business trigger, and a decision/reporting task. No textbook abstractions ("Company XYZ is considering...", "A company has the following data...").

**Independence:** solve every calculation yourself from the stem data before recording `CorrectChoice`. Do not trust any drafted answer. Record the independent derivation in `VerifiedChecks` (e.g., "Independent answer derived: ...").

---

## 8. CASE STUDY AUTHORING — 12 NEW PACK 3 CASES

**Mission:** `p2/case_pack_p2_3.js` from 22 → 34 cases. All new CaseIDs are `CBQ23-{Section}{Seq}`.

### 8.1 Section Allocation

Target (recompute at T0 from live pool; default): **A +4, B +4, C +4**. Rationale: pool-wide A/B/C are under the CSO-weight-proportional target; D/E/F are at or over. **Do not author D/E/F cases.** Each new case: 6 items, ≥2 exhibits, 72 items total.

### 8.2 Case Structure Contract

Per `knowledge/QUESTION_METADATA_STANDARD.md` Part 1–3 and the P2 case conventions:

- CaseID unique pool-wide (DL-P2-019 precedent), `SectionTags` matching `BlueprintDomain`, `QuestionCount === Items.length`, `ExhibitCount === Exhibits.length`, `ProductionStatus: "Draft"`, `question_state: "Unprocessed"`, `Part2OnlyFlag: true` on every item.
- ItemIDs `CBQ23-{S}{Seq}-Q{N}`, ExhibitIDs `CBQ23-{S}{Seq}-E{N}`.
- Exhibit rule: every exhibit is referenced by ≥1 item; every row/column consumed by ≥1 item; no decorative data (CAQS §3.4).
- Item sequence progression within each case: calculation → analysis → interpretation → decision (CAQS §3.5). Later items may build on earlier results but must remain independently answerable.
- Item styles across the case: mix of `single-select` and `numeric`, with at most one `multi-select` or `match` per case.
- **Difficulty calibration (DL-032 recurrence prevention):** case difficulty and per-item difficulty must VARY. Default per case: 1 Easy(1) / 1 Mod-Easy(2) / 2 Moderate(3) / 1 Difficult(4) / 1 Very-Difficult(5). Never label an entire case uniform Moderate.
- Cognitive progression: lower levels early, Evaluate on the final decision item, per the domain targets in §5.1.
- Explanation quality per §7 (correct-answer explanations ≥200 chars for Apply+ items, choice-specific distractor explanations ≥50 chars, EW[CC] empty).
- Case-level `EstimatedMinutes` 20–40; item-level `DifficultyScore` consistent with the case-level mean (±1, CAQS CF4).

### 8.3 Case Validation

`validate:p2` must report 0 errors for the file; parse via Function constructor; duplicate CaseID scan pool-wide = 0. Case clone gate: no two cases may share the same numeric-parameter skeleton (DL-046 family) — vary company, industry, stakeholder, and numbers.

---

## 9. GOVERNANCE REQUIREMENTS — HARD, NO EXCEPTIONS

1. **Full Governance Lane.** T0: `npm run preflight` (Part 1 health, 0 divergences) and `npm run preflight:p2` (0 divergences). If either fails, STOP and report.
2. **Backup-before-write (§3 / BACKUP_PROTOCOL):** before any edit to `pack_p2_{a,b,c}.js` or `case_pack_p2_3.js`, copy to `p2/pack_p2_{x}.js.bak-{YYYYMMDDHHMMSS}-sprint-{batch}` and verify non-zero size. Never skip.
3. **Rule 5:** ≤30 items per change-set. Use 15-item MCQ batches and 3-case (18-item) case waves. A `BLOCK-AUTHORIZED` marker is required for anything larger — you do not have it.
4. **DL-019 orchestrator-only integration:** stage each batch to `p2/sprint_output/` as a separate file; integrate **one pack at a time, serially**. No concurrent writers. Integrate = byte-preserving splice-append followed by full re-parse assertion.
5. **DL-045 — no silent-empty delegation:** every subagent conclusion must carry positive evidence (record counts, QID lists, or file fingerprints). A "no findings" result from a background delegation is inadmissible without a corroborating artifact (AGENTS.md §5).
6. **Logging, contemporaneous, never batched (AGENTS.md §4):**
   - `knowledge/REVISION_HISTORY_P2.md` — one entry per batch/wave: QIDs, counts, verification results, before/after pack totals, backups. Written when the batch completes, not at closeout.
   - `knowledge/DEFECT_LIBRARY_P2.md` — any new defect discovered (answer-key error, authority mismatch, cross-item contamination) gets the next DL-P2-{NNN} ID, allocated by scanning the file for the highest existing ID first (DL-045 registry-first rule). Status "Open."
7. **Prohibited actions (read-only by default outside your authorized files):**
   - NO edits to Part 1 files, `app.js`, engine, runtime delivery logic, `index_updated.html`, `styles.css`, or any registry.
   - NO changes to existing Certified items' `CorrectChoice`, explanations, or `question_state`. If you discover a defect in an existing Certified item, **log it to DEFECT_LIBRARY_P2.md and hold** — do not fix without explicit authorization.
   - NO deletions of any file, and no destructive script (`fs.unlinkSync`, `Remove-Item`, `del`, etc.). §3.1 staged authorization applies; you do not have it.
   - NO creation of ad-hoc files in the repo root or `content/`. Stage output under `p2/sprint_output/`.

---

## 10. VALIDATION BATTERY — RUN AFTER EVERY INTEGRATION

| Check | Command | Pass Condition |
|-------|---------|----------------|
| Part 1 health | `npm run preflight` | 0 divergences |
| P2 preflight | `npm run preflight:p2` | 0 divergences |
| P2 schema | `npm run validate:p2` | base-schema ERROR 0, HOLD 0, MIGRATION 0 |
| Parse | Function-constructor re-parse of the edited pack | all items parse; tail QID equals expected next |
| Governance guard | `node scripts/governance_guard_p2.js` | 74/74 PASS |
| Portfolio | `node scripts/s121_portfolio_dashboard.js` | pack difficulty/cognitive within tolerance of §4/§5 |
| Defect gates | DL-008 / DL-026 / DL-013 / DL-037 / DL-021 scans on the pack | 0 |
| Clone gates | §3.3 screens (numeric-multiset+Topic, UCK, stem fingerprint) | 0 collisions |

On any failure: **quarantine the cycle and checkpoint. Do not proceed to the next cycle.** Record the failure, the offending QIDs, and the evidence. A quarantine that ends the run is an acceptable outcome; a run that silently skips a failed gate is not.

---

## 11. CERTIFICATION PHASE (Phase 2 — after all authoring completes)

After all 330 MCQs + 12 cases are authored, integrated, and validated:

1. For each item, run the **six-dimension verification** per `p2/P2002_CERTIFICATION_STANDARD.md` §A (Correctness, Precision, Difficulty Calibration, Distractor Engineering, Blueprint Alignment, Part 2 Relevance). Record per-dimension confidence (HIGH/MEDIUM/LOW/ZERO) with notes.
2. **Certify only items with HIGH across all six dimensions**, plus: `Part2OnlyFlag === true`, DL-008 clean, DL-026 clean, authority citations match the tested concept, `source_status === "RESOLVED"`.
3. Run the **clone gate across ALL packs** (AGENTS.md §19.4) — normalized numeric-literal multiset + Topic — on the batch just before flipping. Any confirmed pair → archive the newer duplicate, repair and certify the survivor. **Never flip a batch that contains a confirmed clone pair.**
4. Flip state `Unprocessed → Certified` in batches ≤30, each flip setting `question_state: "Certified"`, `certification_session`, `certification_date`, `certification_batch`. Each batch's certification entry records the distractor tier map (derived from `distractor_intent.tier_candidate` + review — the evidence-vs-judgment boundary, P2_SCHEMA_STANDARD §1.1.2).
5. Items failing any gate (MEDIUM/LOW/ZERO confidence, HOLD_FOR_SOURCE, answer-key uncertainty, UNCLEAR) remain `Unprocessed` with a documented reason in the certification log. This is a valid outcome (precedent: 13-item UNCLEAR hold). Do not certify by majority vote.
6. Answer-key changes during certification must carry a "recomputed / independently verified" note (Rule 4).

---

## 12. HALT CONDITIONS & CHECKPOINT DISCIPLINE

Stop the run and write a checkpoint closeout if any of:

- T0 census disagrees with §2 after two independent scans (AGENTS.md §6 hard stop).
- `preflight:p2` or `preflight` reports divergences.
- A pack fails to re-parse after integration, or QID count is off by even one from the allocation plan.
- Governance guard reports < 74/74.
- Any write to a pack file was not preceded by a confirmed backup.
- A background delegation returns empty and cannot be corroborated (DL-045).
- Any confirmed clone pair, duplicate UCK, or stem collision reaches the destination pack.

Checkpoint after every batch: log the state (pack QID counts, staged-but-unintegrated = none), the backups taken, and the next expected QID. **Do not hold staged-but-unintegrated content at closeout** — integrate everything you author, or discard the stage and document it.

---

## 13. CLOSEOUT DELIVERABLES (write to `p2/sprint_output/`)

1. `LOS_GAP_ALLOCATION.json` — the deficit computation and slot allocation (§3).
2. `BATCH_LEDGER.json` — per batch: QIDs, LOS, difficulty/cognitive/answer mix, backup filename, validation results, certification status.
3. `CERTIFICATION_LOG.json` — per item: six-dimension confidence, tier map, certification decision, or hold reason.
4. `OVERNIGHT_SUMMARY.md` — final pool totals (expect 3,450 MCQs / 100 cases), per-pack distributions vs S121 targets, defects logged, holds, and next-wave recommendations.
5. Append the session entry to `knowledge/REVISION_HISTORY_P2.md` and `p2/CURRENT_BASELINES_P2.md` **only via the regeneration mechanism** (`preflight_p2.js` regenerates it; never hand-edit).

**Definition of done:** all 330 MCQs authored and integrated; 12 Pack 3 cases authored and integrated; every item either Certified (HIGH, all gates) or Unprocessed with a documented hold; all logs written; preflight/preflight:p2/validate:p2/guard 74/74 all green; §1baselines recaptured. Any shortfall must be an explicit, documented hold — not an omission.

---

## 14. PRIORITY & QUALITY OVERRIDES

1. **Correctness over throughput** (CAQS §1.7.3). A certified-but-wrong item is worse than a held one.
2. **Learner safety** (AGENTS.md §7): only Certified items are deliverable. Nothing else.
3. **No scope expansion** (AGENTS.md §16): you may not widen file scope, convert lanes, or "helpfully" fix unrelated content. Log, don't fix.
4. If this prompt's numbers conflict with the live state, **the live state wins and the discrepancy is a halt condition**, not an override.