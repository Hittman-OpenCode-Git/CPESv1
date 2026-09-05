# Pack B Sprint — 90 MCQs (3 batches × 30) — P2-B-311 → P2-B-400

**Session:** 2026-09-01
**Lane:** Full Governance (pack content authoring)
**T0:** `preflight_p2.js` — 0 divergences, 74/74 guard PASS, Pack B 310 QIDs (310 Certified)
**Target:** 310 → 400 QIDs (Pack B target 500; baseline file §1 shows B at 310 — matches)
**QID allocation:** Sequential P2-B-311 … P2-B-400 (P2003 v2.0 range B-001..500)
**State:** All 90 items `question_state: "Unprocessed"` (certification is a separate future wave)
**Schema:** v1.1 (source_ids / source_support_for_key / distractor_intent / uniqueness_note / schema_version "1.1") — must PASS v1.1, not MIGRATION_REQUIRED.

---

## 1. Execution Model (user-specified)

- **3 batches × 30 items** (≤30 per change-set → Rule 5 compliant, no BLOCK-AUTHORIZED needed)
- **3 parallel subagents per batch** (general), each authoring **exactly 10 items** to a staging JSON file in `%TEMP%\opencode\` (zero repo writes by agents — DL-019 prevention)
- Orchestrator runs pre-write validation gate → deterministic splice-append merge → per-batch backup (BACKUP_PROTOCOL.md)
- Batches run serially (integration gate between batches)

## 2. Mix Constraints Per Batch (S121 §2/§3, validator)

### Difficulty (30 per batch)

| Label | Score | Count | Notes |
|-------|-------|-------|-------|
| Easy | 1 | 4 | |
| Moderate-Easy | 2 | 6 | |
| Moderate | 3 | 9 | |
| Difficult | 4 | 8 | |
| Very Difficult | 5 | 3 | |
| **Total** | | **30** | |

### Cognitive Level (Domain B targets, S121 §3.1: R10/U20/A40/An20/E10)

| Level | Count | Rule 11 floors |
|-------|-------|----------------|
| Remember | 3 | DS ≤ 2 |
| Understand | 6 | DS ≤ 3 |
| Apply | 12 | DS ≤ 4 |
| Analyze | 6 | DS ≥ 2 (use 3–4) |
| Evaluate | 3 | DS ≥ 3 (use 4–5) |
| **Total** | **30** | |

### CorrectChoice Position (S121 §4: 25/25/25/25; per-batch 4/4/4/3 rotation, max streak ≤ 2)

| Letter | Count |
|--------|-------|
| A | 8 |
| B | 8 |
| C | 7 |
| D | 7 |
| **Total** | **30** |

### Calculation vs Conceptual

| Type | Count |
|------|-------|
| CalculationItem: true | 18 |
| CalculationItem: false | 12 |
| **Total** | **30** |

Calc items MUST include a `VerifiedChecks` recompute line + `FormulaReference` to a CB-0X formula ID.

## 3. Topic Coverage — Batch 1 (B-311..340)

Risk/Return & CAPM (6), Cost of Capital/WACC (8), Working Capital (6), Capital Structure & Leverage (5), FX/International (3), Dividend/Financing (2). Avoid Topic text collisions with existing B.001–B.310 topics — use NEW descriptors.

**Stakeholder cast (fixed):** CFO/VP = Adaeze Onuorah, controller = Mariela Hoffmann, segment/senior analyst = Priya Ramaswamy, financial/credit analyst = Lena Fischer, treasurer/risk officer = Maya Caldwell, project manager = Naomi Castellanos. Entity prefix: Flash [Industry] (Flash Manufacturing, Flash Capital, Flash Industrial, Flash Logistics, Flash Holdings).

## 4. Item Shape (copy of last Pack B item P2-B-310, schema v1.1)

Required fields: QuestionID, Section, BlueprintDomain, Part, Part2OnlyFlag:true, Stem, Choices{A,B,C,D}, CorrectChoice, CognitiveLevel, Difficulty, DifficultyScore, Topic, LOSTag, ItemStyle:"single-select", CalculationItem, UniqueConceptKey, Authorities[], FormulaReference, CommonTrapReference, DecisionTreeReference, ExplanationCorrect, ExplanationWrongA-D, VerifiedChecks[], source_ids[], source_support_for_key{source_id, rule_or_proposition, application_to_facts, key_conclusion}, distractor_intent{3 non-CC letters, each {misconception, why_plausible, tier_candidate 1|2|3}}, uniqueness_note (references all 3 non-CC letters), CrossDomainTags[], pedagogical_cluster, hold_reason:"", schema_version:"1.1", question_state:"Unprocessed".

**Source IDs must resolve** in `p2_source_catalog.js`: CB-01..CB-11 (formula), or authority patterns: CAPM, Modigliani-Miller (Proposition I/II), Basel III (capital adequacy), NPV rule, IRR rule, Payback rule, Capital budgeting theory, Managerial economics, Managerial accounting theory, Financial statement analysis principles, IMA Statement..., SOX, FCPA, ASC x, COSO, SEC Reg, IRS Publication 946, MACRS, Black-Scholes, etc. **LOSTag values (B.1–B.9) do NOT resolve — never use as source_id.**

## 5. Governance Gates (per item — all BLOCK)

| Gate | Requirement |
|------|-------------|
| Rule 2/DL-008 | ExplanationWrong[CC] === "" |
| Rule 6/DL-026 | non-CC EW present AND non-empty (≥75 chars, choice-specific) |
| Rule 10/DL-021 | no absent EW fields |
| Rule 9/DL-037 | no choice starting "No"→affirmative or "Yes"→negative |
| Rule 13 | Part2OnlyFlag === true |
| Rule 14 | QID P2-B-NNN, no P1- prefix |
| Rule 11 | CognitiveLevel valid; Evaluate DS≥3; Analyze DS≥2; no AF-3/AF-4/AF-5 inflation; no definition-stem inflation |
| DL-013 | no boilerplate ("represents a plausible misconception", "Option X is incorrect") |
| v1.1 | source_ids resolve; distractor_intent keys = 3 non-CC letters, tiers 1/2/3 unique; uniqueness_note references all non-CC letters; EC ≥200 chars (Apply+), ≥100 (R/U) |

## 6. Verification Chain

1. Per-batch pre-write gate (staging): `gate_p2b.js` — Function-constructor parse, all gates above, CC balance, difficulty/cognitive mix, EC≥200, EW≥75, source resolution
2. Per-batch backup of `p2/pack_p2_b.js` (timestamped, non-zero)
3. Splice-append before `];` with `,\n` insertion; assert prev→next count; re-parse; QID uniqueness
4. Tend: `validate:p2` + `preflight:p2` + REVISION_HISTORY_P2.md entry with Verifier table

## 7. Out of Scope

- No certification flips (items stay Unprocessed)
- No changes to existing Certified items
- No edits to CURRENT_BASELINES_P2.md (its §1 table is stale vs live files — preflight is authoritative)
- No Pack A/C/D/E/F writes
