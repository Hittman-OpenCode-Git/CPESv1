# CMA Part 2 Expansion Plan — Schema, Volume, Modules, Roadmap

**Date:** 2026-08-03
**Lane:** Governance Light (planning artifact; no pack/case/app writes)
**Inputs:** official CSO Part 2 weights (user-supplied), `foundation/P2001_PART2_BLUEPRINT_FOUNDATION.md`, `p2/P2003_QID_STANDARD.md`, `p2/pack_p2_a.js` (100 items live), `reports/CODEBASE_AUDIT_PART2_READINESS.md`
**Supersedes (where noted):** P2001 §2 pack sizing, P2003 §1.2 QID ranges

---

## 0. Two corrections to the committed P2 plan

Both are cheap now and expensive later. Flagging before anything else.

### 0.1 The existing pack sizing does not implement the CSO weights

`P2003_QID_STANDARD.md` §1.2 allocates a flat 500 items per pack file. Mapped to domains, that yields:

| Domain | CSO weight | P2003 items | Implied weight | Divergence |
|---|---|---|---|---|
| A Financial Statement Analysis | 20% | 500 | 20.0% | ✅ |
| B Corporate Finance | 20% | 500 | 20.0% | ✅ |
| C Business Decision Analysis | **25%** | 500 | 20.0% | **−5 pts** |
| D Enterprise Risk Management | 10% | 250 | 10.0% | ✅ |
| E Capital Investment Decisions | 10% | 250 | 10.0% | ✅ |
| F Professional Ethics | **15%** | 375 | 15.0% | ✅ |
| Cross-domain | — | 125 | 5.0% | unweighted filler |

Decision Analysis — the single heaviest domain on the exam — is under-built by 125 items, and the shortfall is absorbed by a 125-item "cross-domain" bucket that has no CSO weight at all. A learner drilling C gets 20% of the pool for 25% of the exam.

**Correction:** allocate by weight, and treat cross-domain as a *tag*, not a domain. See §2.

### 0.2 `Type` collides with the case-item scoring discriminator

Already flagged in the audit (R8) and confirmed live: `p2/pack_p2_a.js` and `p2/P2C_REFERENCE.md` both specify `Type: "select"` on MCQ items. In `app/app.js:1934`, `scoreMCQ` branches on `item.Type === 'multi'` and `item.Type === 'match'` — the discriminator for *case* items. A P2 MCQ authored as `Type: "multi"` or `"numeric"` (both are in the P2001 §2 type mix at 4% and 8%) routes into the case-scoring branch and is mis-scored.

**Correction:** rename the MCQ field to `ItemStyle` (matching Part 1) and reserve `Type` exclusively for case items. 100 items to fix today; 2,500 later.

---

## 1. Part 2 MCQ Schema

Design rule: **identical to Part 1 wherever the engine touches the field; new fields only where Part 2 genuinely differs.** Every divergence below is deliberate and justified. Fields marked 🔴 are engine-critical — the shared scoring/pool/dedup code reads them by exact name.

### 1.1 Shared core (byte-identical to Part 1 — do not rename)

| Field | Type | Req | Why it must match P1 |
|---|---|---|---|
| `Part` | int | ✅ | `2`. Drives part routing. |
| `Section` | string | ✅ 🔴 | `A`–`F`. Read by pool filter, `weightedPick`, analytics. |
| `Topic` | string | ✅ 🔴 | `{Section}.{NNN} {descriptor}`. Read by dedup fallback + topic-coverage tracker. |
| `QuestionID` | string | ✅ 🔴 | `P2-{Section}-{NNN}`. Answer-map key, blocklist key. |
| `question_state` | string | ✅ 🔴 | Drives `assignTier` — the learner-safety gate. Same 5 values. |
| `Stem` | string | ✅ 🔴 | Pool builder skips objects lacking it. |
| `Choices` | object | ✅ 🔴 | `{A,B,C,D}`. |
| `CorrectChoice` | string | ✅ 🔴 | Pool builder skips objects lacking it; `scoreMCQ` compares to it. |
| `ExplanationCorrect` | string | ✅ | Min 50 chars. |
| `ExplanationWrong{A,B,C,D}` | string | ✅ | `""` at the correct slot (RULE 2), ≥50 chars elsewhere (RULE 6/10). |
| `Difficulty` / `DifficultyScore` | string/int | ✅ 🔴 | `DifficultyScore` drives `selectWithDifficultyDistribution`. |
| `CognitiveLevel` | string | ✅ | Remember/Understand/Apply/Analyze/Evaluate. |
| `CalculationItem` | bool | ✅ | |
| `UniqueConceptKey` | string | ✅ 🔴 | **Currently absent from `pack_p2_a.js` — must be added.** Without it `uniqueByConcept` degrades to `Topic`/`Stem` matching. Format: `{Section}-{NNN}-{kebab-descriptor}`. |
| `ItemStyle` | string | ✅ 🔴 | **Renamed from `Type`** per §0.2. Values: `single-select`, `multi-select`, `numeric`, `fill`, `match`. |
| `LOSTag` | string | ✅ | `A.1`–`F.n`. |
| `VerifiedChecks` | array | ✅ | **Renamed from `VerificationChecks`** — P1 spelling wins so one validator serves both. |
| `SectionName` | string | ✅ | Full domain name, for UI. |
| `StudyLinks` | array | ➖ | Same shape as P1. |
| `pedagogical_cluster` | string | ➖ 🔴 | Highest-precedence dedup signal in `deriveSimilarityKey`. Optional but valuable. |
| `certification_date` / `certification_batch` | string | ➖ | Written at certification. |

### 1.2 Part-2-specific additions (keep — genuinely new)

| Field | Type | Req | Rationale |
|---|---|---|---|
| `Part2OnlyFlag` | bool | ✅ | Mirrors `Part1OnlyFlag`. Blocks certification if falsy. |
| `BlueprintDomain` | string | ✅ | Full CSO domain name. |
| `FormulaReference` | string | ➖ | Part 2 is calculation-dense (NPV/IRR/WACC/CAPM/DOL). Links to `FORMULA_MASTER_P2.md`. High analytics value — see §3.4. |
| `CommonTrapReference` | string | ➖ | Names the distractor trap (e.g. `T4 opportunity cost omitted`). Powers trap-level remediation. |
| `Authorities` | array | ➖ | COSO ERM 2017, IMA Statement of Ethical Professional Practice, CAPM literature. |
| `DecisionTreeReference` | string | ➖ | Per P2003 §1.4. |
| `CrossDomainTags` | array | ➖ | **New.** Replaces the P2003 cross-domain *pack*. An item lives in its primary domain and tags secondaries: `["B","E"]`. Preserves cross-domain coverage without stealing weight from C. |

### 1.3 Fields to drop from the P2003 skeleton

`Industry`, `CompanyType`, `Stakeholder`, `BusinessFunction`, `Scale` — five per-item strings no engine code reads and no validator enforces. They are case-study metadata that leaked into the MCQ skeleton. Dropping them removes 5 × 2,500 = 12,500 hand-maintained values. (They stay on *cases*, where they are used.)

---

## 2. CBQ Schema — the essay-replacement format

### 2.1 What changes vs. Part 1 cases

Part 1's case schema already supports 5 response types (`numeric` 117, `select` 104, `multi` 67, `match` 83, `fill` 29 across 400 items) with exhibits, partial credit, and per-item flags. **That container is reusable as-is.** The essay→CBQ shift needs three additions, not a new format:

1. **Longer, multi-exhibit scenarios.** Part 2 CBQs replace two 30-minute essays. Budget 6–8 items and 3–5 exhibits per case vs. Part 1's 5–6 items / 2 exhibits.
2. **Two new response types** to absorb what essays used to test.
3. **Explicit per-item point weights** — essays carried non-uniform credit; Part 1 case items are all worth 1.

### 2.2 Case object — shared with Part 1

Reuse the Part 1 case container verbatim: `CaseID`, `Title`, `SectionTags`, `Pack`, `Section`, `BlueprintDomain`, `BlueprintObjectives`, `Topic`, `Subtopic`, `PrimaryCompetency`, `SecondaryCompetencies`, `CompanyName`, `CompanyType`, `Industry`, `Stakeholder`, `Difficulty`, `DifficultyScore`, `EstimatedMinutes`, `ExhibitCount`, `LearningObjectives`, `ScenarioText`, `Exhibits[]`, `Items[]`, `question_state`, `pack_state`, `question_tier`, `question_status`.

🔴 `SectionTags` (array) is read directly by `getCasePool` for section filtering — keep the name and the array shape.

Exhibit object also reuses P1: `Type`, `Title`, `Headers`, `Rows`, `ExhibitID`, `CaseID`, `ReferencedBy`.

**Part 2 case additions:** `CBQFormat: true`, `EssayReplacement: true`, `TotalPoints` (int), `Authorities[]`.

### 2.3 Item object — shared core + two new types

Shared with P1 (keep exact names): `Type` 🔴, `Prompt`, `Correct` 🔴, `Choices`, `Explanation`, `ExplanationWrong{A–D}`, `LeftItems`/`RightItems` (match), `Topic`, `ItemID`, `CognitiveLevel`, `CalculationRequired`, `CaseID`, `EstimatedMinutes`, `Section`, `question_state`, `Difficulty`, `DifficultyScore`.

**New for CBQ:**

| Field | Type | Notes |
|---|---|---|
| `Points` | int | Per-item weight (1–5). Default 1 = current P1 behavior. Enables essay-like non-uniform credit. |
| `ToleranceAbs` / `TolerancePct` | number | Numeric answer tolerance. **Part 1 has no tolerance** — `correctCase` does exact string compare after stripping `$`/`,`. For NPV/WACC/IRR this is untenable: `$1,234.56` vs `$1,234.57` from legal rounding currently scores 0. |
| `AcceptedAnswers` | array | Alternate exact-match forms for `fill`. |
| `FormulaReference` | string | Links the item to `FORMULA_MASTER_P2.md`. |

**Two new response types:**

| Type | Purpose | `Correct` shape | Scoring |
|---|---|---|---|
| `rank` | Order alternatives by NPV/IRR/priority — tests the ranking judgment essays used to test | ordered array `["C","A","B"]` | Exact order = full; optional partial via adjacent-pair credit |
| `classify` | Bucket N items into K categories (relevant vs. sunk cost; risk response category) | object `{"itemId":"bucket"}` | Per-key credit → fractional |

Both are strict generalizations of the existing `match` type and reuse its rendering. Deliberately **not** adding free-text: it cannot be auto-scored, and the real CBQ format is auto-scored too.

### 2.4 The scoring consequence

Part 1 case items are effectively binary — `correctCase` returns a boolean, and `practiceScores` counts `caseC++`. With `Points` and `classify`/`rank`, an item can score fractionally. This is the one **real scoring-engine change** Part 2 requires. Detail in §4.2.

---

## 3. Volume — packs and counts

### 3.1 Design constraint

Honor the CSO weights with a **500-item minimum per domain** and a **750-item cap** (25% weight → 750). Part 2's CSO weights (20/20/25/10/10/15) produce a non-uniform allocation across 6 packs:

- **Domain item counts** → driven by CSO weight (correctness requirement) with a 500-item floor
- **Pack file boundaries** → one domain per pack, 6 packs total

P2003 conflated them. The prior 5-pack layout (§3.3 superseded) attempted flat 500/pack, which under-built Domain C by 125 items. The revised 6-pack layout resolves this.

### 3.2 Recommended allocation — 3,450 MCQs (revised 2026-09-04)

Pack sizing rule: **25% CSO weight → 750 items; 20% → 600; 15% or less → 500.** This over-indexes the highest-weight domain (C) and provides a 500-item floor for every domain, ensuring no section is thin relative to exam representation.

| Domain | CSO | Sizing rule | Target items | Current | Shortfall | Delivered weight |
|---|---|---|---|---|---|---|
| A Financial Statement Analysis | 20% | 20% → 600 | **600** | 500 | 100 | 17.4% |
| B Corporate Finance | 20% | 20% → 600 | **600** | 500 | 100 | 17.4% |
| C Decision Analysis | 25% | 25% → 750 | **750** | 620 | 130 | 21.7% |
| D Enterprise Risk Management | 10% | ≤15% → 500 | **500** | 500 | 0 | 14.5% |
| E Capital Investment Decisions | 10% | ≤15% → 500 | **500** | 500 | 0 | 14.5% |
| F Professional Ethics | 15% | ≤15% → 500 | **500** | 500 | 0 | 14.5% |
| **Total** | **100%** | | **3,450** | **3,120** | **330** | **100.0%** |

Note: Delivered weight no longer matches CSO weight exactly because the 500-item floor for D/E/F over-indexes those domains (10% → 14.5%). This is intentional — a minimum pool of 500 items per domain is required for viable difficulty distribution, cognitive-level spread, and certification-ready depth. The CSO weight governs *exam* representation; pool sizing governs *preparation* breadth. Cross-domain items are *tagged* via `CrossDomainTags` (§1.2), not allocated a phantom domain — target ~175 items (5%) carrying a secondary tag, drawn from within the counts above.

### 3.3 Pack file layout — 6 packs (revised 2026-09-04)

The 500-item-per-pack ceiling from Part 1 no longer fits: Pack C alone is 750 items (1.5× the ceiling). Adding a 6th pack restores manageable file sizes and keeps each pack ≤ ~3.5 MB.

| Pack file | Contents | Items | Est. size |
|---|---|---|---|
| `pack_p2_a.js` | A complete | 600 | ~3.0 MB |
| `pack_p2_b.js` | B complete | 600 | ~3.0 MB |
| `pack_p2_c.js` | C: `P2-C-001`–`P2-C-750` | 750 | ~3.8 MB |
| `pack_p2_d.js` | D complete | 500 | ~2.5 MB |
| `pack_p2_e.js` | E complete | 500 | ~2.5 MB |
| `pack_p2_f.js` | F complete | 500 | ~2.5 MB |
| **Total** | | **3,450** | **~17.3 MB** |

Each domain lives in exactly one pack file — no cross-file domain splits. This eliminates the C-overflow pattern from the prior 5-pack layout and simplifies all domain-keyed tooling (validators, analytics, pool builders).

**QID standard amendment:** Pack C range extends to `P2-C-001` through `P2-C-750` (4-digit padding if needed: `P2-C-0001`–`P2-C-0750`). Packs A/B extend to 600. Packs D/E/F keep 500. Update `P2003_QID_STANDARD.md` §1.2 accordingly.

> **Prior 5-pack layout (superseded):** 5 packs × 500 with C split across `pack_p2_c.js` (500) and `pack_p2_e.js` (125 overflow). Rejected because cross-file domain splits complicate every domain-keyed tool and the 625-item C target now exceeds what a single 500-item pack can hold.

### 3.4 CBQ volume

P2001 §3's 75 cases are already weight-faithful except for C. Corrected:

| Domain | CSO | Cases | Items @6–8 |
|---|---|---|---|
| A | 20% | 15 | 90–120 |
| B | 20% | 15 | 90–120 |
| C | 25% | **19** (was 18) | 114–152 |
| D | 10% | 8 | 48–64 |
| E | 10% | 7 | 42–56 |
| F | 15% | **11** (was 12) | 66–88 |
| **Total** | | **75** | **450–600** |

3 packs × 25 cases, matching Part 1. Item count rises from Part 1's 400 to 450–600 because CBQs are longer — this is the essay-replacement load.

---

## 4. Code modules — shared vs. new

Baseline from the audit: the engine is ~70% Part-agnostic; the wiring is ~0%. The coupling is shallow everywhere, so this is a config-extraction job, not a rewrite.

### 4.1 Reusable unchanged (no edits)

| Module | Location | Note |
|---|---|---|
| `scoreMCQ` single-select path | app.js:1934 | Works once `ItemStyle` rename lands (§0.2) |
| Timer / warnings / autosave | app.js:2461–2500 | Pure duration math (fix R1 pause bug first) |
| `NavigationController` | app.js:3619 | Navigator, flags, strike-through |
| `SessionPersistence` | app.js:1595 | Autosave, checkpoints, journal, backup rotation |
| `assignTier` + `_DefectManifest` | app.js:1068 / 1101 | Learner-safety gate — carries over intact |
| `deriveSimilarityKey` / `uniqueByConcept` | app.js:2380 / 2360 | Needs `UniqueConceptKey` present (§1.1) |
| `CalculatorEngine` | app.js:1329 | More valuable in P2 |
| `AnalyticsCollector` | app.js:1509 | Event capture is part-neutral |
| Governance guard, 10 rules | `.opencode/plugins/` | All generalize per P2001 §6 |
| `ExplanationValidator` | `scripts/validators/` | String-aware brace matcher |
| `styles.css` | root | Two new item types need ~40 lines |

### 4.2 Shared modules requiring modification

**A. `correctCase` → fractional scoring** (app.js:3017) — *the one substantive engine change.*
Currently returns boolean. Change to return a 0–1 fraction:
- `multi`/`match`/`select`/`numeric`/`fill` → 0 or 1 (unchanged behavior)
- `classify` → correct keys ÷ total keys
- `rank` → exact order 1, else optional adjacent-pair partial
- numeric honors `ToleranceAbs`/`TolerancePct` when present
Backward-compatible: all 400 existing P1 items return 0 or 1 exactly as today. Every one of the 8 call sites (app.js:1852, 2553, 3211, 3496, 3835, 4026, 4965) currently treats the result as truthy — audit each; truthiness of `0.5` differs from `true`.

**B. `practiceScores`** (app.js:3205) — accumulate `caseC += correctCase(...) * (it.Points || 1)` and `caseT += (it.Points || 1)`. Two lines. Weighting (75/25), scale (0–500), and threshold (360) are unchanged — CMA structural rules are identical across parts.

**C. `scoreMCQ`** — remove the `Type`-based branching ambiguity; branch on `ItemStyle` for MCQs. Fixes R8 permanently.

**D. `SECTION_INFO`** (app.js:24) — becomes part-scoped. P2 values: A 20, B 20, C 25, D 10, E 10, F 15.

**E. `weightedPick`** (app.js:2443) — delete the literal `targets` object, read `SECTION_INFO[sec].weight/100`; replace `sections.length === 6` with a domain-count comparison. (Audit item P4; needed regardless.)

**F. Bank enumeration** — the 7 hardcoded `MCQ_BANK_A…E` sites (audit R7) collapse into one registry-driven accessor.

**G. Storage keys** — `cmaP1*` → `cma_${partId}_*` with migration (audit R9).

**H. May coaching layer** — `SYSTEM_PROMPT` (app.js:4859) hardcodes "CMA Part 1 AI Review Coach"; `may-core.js` reads `MCQ_BANK_*` directly. Both need part-parameterization.

### 4.3 New modules

| Module | Purpose |
|---|---|
| `app/exam-part-registry.js` | **Keystone.** `{ id, label, sections{}, packs[], casePacks[], fullExamSeconds, mcqCount, caseCount, qidPrefix, storagePrefix }` for P1 and P2. Everything above reads from here. |
| `app/cbq-scoring.js` | `rank` + `classify` scorers, tolerance comparison, points aggregation |
| `app/renderers/render-rank.js`, `render-classify.js` | UI for the two new types |
| `content/p2/taxonomy_p2.js` | Part 2 topic taxonomy — see §4.4 |
| `scripts/validators/P2SchemaValidator.js` | Enforces §1 field contract |
| `scripts/validators/P2FormulaValidator.js` | Cross-checks `FormulaReference` against `FORMULA_MASTER_P2.md` |
| `scripts/validators/CBQPointsValidator.js` | Asserts `sum(Items.Points) === TotalPoints` |
| `scripts/preflight_p2.js` | P2 pack table (or parameterize the existing one) |

### 4.4 New topic taxonomy

Part 1's A–F (External Reporting / Planning / Performance / Cost / Internal Controls / Technology) shares **zero** topic overlap with Part 2's A–F (FSA / Corporate Finance / Decision Analysis / ERM / Capital Investment / Ethics). The letters collide; the meanings do not. Any analytics keyed on bare section letter will silently merge the two.

**Requirement:** all topic/section keys become part-qualified — `P1:C` vs `P2:C`. Affects `SECTION_INFO`, `TOPIC_SEEN_KEY` cluster keys, `PerformanceAnalytics` section rollups, `ReadinessModel` domain scores, and May's learner state. This is the highest-risk silent-corruption path in the whole expansion.

### 4.5 New analytics categories

Part 2 warrants dimensions Part 1 lacks:

1. **Formula mastery** — accuracy per `FormulaReference` (NPV, IRR, WACC, CAPM, DOL/DFL). Part 2 failure is usually formula-specific, not domain-specific.
2. **Trap susceptibility** — accuracy per `CommonTrapReference` (T1 sunk cost … T7 average vs. incremental). Directly actionable remediation.
3. **Calculation vs. conceptual split** — segment by `CalculationItem`; Part 2's calculation load makes this diagnostic.
4. **Ethics-specific tracking** — Domain F is 15% and judgment-based rather than computational; it needs its own readiness band, not a generic domain score.
5. **CBQ points-earned rate** — with `Points`, report earned/available, not just items-correct.

---

## 5. Phased roadmap

Sequenced schema → content → integration → QA, as requested. The ordering constraint that matters: **every phase-1 decision is cheap now and compounds in cost with each authored item.** 100 P2 items exist today; the window is open.

### Phase 0 — Pre-work (0.5 day, Governance Light)

Audit items P1–P4, needed for Part 1 regardless, and they de-risk Part 2.

| Task | Detail |
|---|---|
| 0.1 | Fix pause timer (`pausedElapsed` unread — audit R1) |
| 0.2 | Harden `preflight.js`: QID-uniqueness assertion + malformed-object report (R2/R3) |
| 0.3 | Collapse 7 bank-enumeration sites into one accessor (R7) |
| 0.4 | `weightedPick` reads `SECTION_INFO`; drop `sections.length === 6` (R5) |

**Gate:** `npm run smoke` passes; `npm run preflight` 0 divergences.

### Phase 1 — Schema lock (2–3 days, Full Governance)

Nothing else starts until this is frozen.

| Task | Detail |
|---|---|
| 1.1 | Ratify §1 MCQ schema + §2 CBQ schema; publish `P2004_SCHEMA_STANDARD.md` |
| 1.2 | **Migrate the 100 live items in `pack_p2_a.js`**: `Type`→`ItemStyle`, `VerificationChecks`→`VerifiedChecks`, add `UniqueConceptKey`, add `SectionName`, drop the 5 unused fields (§1.3). Backup-before-write per §3. |
| 1.3 | Amend `P2003_QID_STANDARD.md` §1.2 for the §3.2 allocation (A 001–600, B 001–600, C 001–750, D 001–500, E 001–500, F 001–500) |
| 1.4 | Write `P2SchemaValidator.js`; run against the migrated 100 → must be 0 errors |
| 1.5 | Author `exam-part-registry.js` with both part definitions (config only, not yet wired) |
| 1.6 | REVISION_HISTORY.md + DEFECT_LIBRARY.md entries for the §0.1/§0.2 defects |

**Gate:** validator green on 100 items; schema doc ratified. **This is the point of no return** — after it, changes cost 25× more.

### Phase 2 — Content pipeline (ongoing, Full Governance)

| Task | Detail |
|---|---|
| 2.1 | Fork wave-planner tooling for the §3.2 allocation |
| 2.2 | Build domain reference kits (`P2C_REFERENCE.md` is the template — formulas, traps, field order, governance rules) for B, D, E, F |
| 2.3 | Author in 100-item waves, weight-priority order: **C (750) → A (600) → B (600) → F (500) → D (500) → E (500)**. C first because it is the heaviest domain and the current shortfall (130 items). |
| 2.4 | Per wave: `P2SchemaValidator` → `P2FormulaValidator` → governance guard → REVISION_HISTORY entry |
| 2.5 | CBQ authoring starts after MCQ domains A/B/C reach 50% (cases reuse MCQ scenario research) |
| 2.6 | Certification sweeps per CAQS; target ≥95% Certified |

**Gate per wave:** 0 validator errors, 0 guard violations, RULE 5 batch limits respected.

### Phase 3 — UI / scoring integration (4–6 days, Full Governance)

Can run in parallel with Phase 2 once Phase 1 is locked.

| Task | Detail |
|---|---|
| 3.1 | Wire `exam-part-registry.js` through pool builders, `SECTION_INFO`, catalog, copy strings |
| 3.2 | `cbq-scoring.js`: `rank`, `classify`, tolerance, points |
| 3.3 | `correctCase` → fractional; **audit all 8 call sites for truthiness assumptions** |
| 3.4 | `practiceScores` points-weighted accumulation |
| 3.5 | `scoreMCQ` branches on `ItemStyle` |
| 3.6 | Renderers for `rank` / `classify` + ~40 lines CSS |
| 3.7 | Part selector in UI; namespace storage keys with migration (R9) |
| 3.8 | Part-qualify analytics keys (§4.4) — `P1:C` vs `P2:C` |
| 3.9 | Part-parameterize May `SYSTEM_PROMPT` + `may-core.js` bank access |
| 3.10 | New analytics categories (§4.5) |

**Gate:** Part 1 regression suite unchanged — **all 400 existing case items must score bit-identically** before and after the fractional-scoring change. This is the single most important verification in the project.

### Phase 4 — QA / validation (3–4 days, Full Governance)

| Task | Detail |
|---|---|
| 4.1 | `preflight_p2.js`: counts, parse, certified, QID uniqueness, malformed objects |
| 4.2 | Extend the Playwright smoke test to both parts |
| 4.3 | Weight-conformance report: delivered vs. CSO per domain, MCQ and CBQ |
| 4.4 | Cross-part contamination test: run a P1 session then a P2 session; assert no shared seen-questions, history, or readiness state |
| 4.5 | Scoring parity: hand-computed CBQ point totals vs. engine output |
| 4.6 | Full pre-delivery safety check — P2 pool serves Certified-only, blocklist honored |
| 4.7 | `npm run pipeline`; publish `CURRENT_BASELINES.md` P2 section |

**Gate:** 0 divergences both parts; smoke green; contamination test clean.

### Sequencing summary

```
Phase 0 (0.5d) ─┐
                ├─> Phase 1 SCHEMA LOCK (2-3d) ─┬─> Phase 2 CONTENT (ongoing) ─┐
                                                 └─> Phase 3 INTEGRATION (4-6d) ─┴─> Phase 4 QA (3-4d)
```

Engineering total ≈ 10–14 days excluding content authoring. Content is the long pole: 3,450 MCQs + 75 CBQs at Part 1's observed wave throughput.

---

## 6. Decisions needed before Phase 1

1. **Repo strategy.** P2001 §6 says separate repo + fork app.js. The audit recommends a shared registry in this repo. Forking duplicates 7,824 lines plus 30 May modules and doubles every future fix. **Recommend: single repo, config-driven.** Needs your call — it contradicts a committed decision.
2. **Approve the §3.2 reallocation** (3,450 MCQs across 6 packs: A 600, B 600, C 750, D 500, E 500, F 500), which amends P2003.
3. **Approve the §0.2 `Type`→`ItemStyle` rename** on the 100 live items.
4. **Confirm 6–8 items per CBQ** as the essay-replacement target.

---

*Read-only planning artifact. No pack, case, or app files were modified. Items 1–4 above are blocking for Phase 1.*

**Revision history:**
- 2026-08-03: Initial version — 2,500 MCQs across 5 packs.
- 2026-09-04: Revised pack sizing — 3,450 MCQs across 6 packs. Rule: 25% CSO → 750, 20% → 600, ≤15% → 500. One domain per pack file.





