# CMA Part 2 — MCQ Schema Standard (Ratified)

**Document ID:** P2_SCHEMA_v1.1
**Status:** Ratified — 2026-08-04 (v1.0); Amended — 2026-08-24 (v1.1, P2-050)
**Session:** Schema Lock (P2-020); v1.1 Amendment (P2-050)
**Authority:** P2_EXPANSION_PLAN.md §1
**Supersedes:** P2003_QID_STANDARD.md §1.2 (QID ranges), P2003_CONTENT_LAUNCH_PLAN.md §5 (item template)
**Governance Lane:** Full

---

## 1. MCQ Object Schema (Canonical Field Order)

Every Part 2 MCQ item is a single JSON object in a pack array. Fields marked 🔴 are engine-critical — the shared Part 1/Part 2 scoring, pool, and dedup code reads them by exact name.

```jsonc
{
  "Part": 2,                              // 🔴 int. Drives part routing.
  "schema_version": "1.1",                // ✅ string. "1.1" for v1.1 drafts; absent/"1.0" on legacy items.
  "Section": "A",                         // 🔴 string. A–F. Pool filter + weightedPick.
  "Topic": "A.NNN descriptor",            // 🔴 string. Dedup fallback + topic coverage.
  "QuestionID": "P2-A-NNN",              // 🔴 string. Answer-map key, blocklist key.
  "question_state": "Unprocessed",        // 🔴 string. assignTier learner-safety gate.
  "Part2OnlyFlag": true,                  // 🔴 bool. Cross-part certification gate.
  "UniqueConceptKey": "A-NNN-kebab-desc", // 🔴 string. Highest-precedence dedup signal.
  "Stem": "...",                          // 🔴 string. Pool builder skips objects lacking it.
  "Choices": { "A":"...","B":"...","C":"...","D":"..." }, // 🔴 object. Renderer source.
  "CorrectChoice": "A",                   // 🔴 string. scoreMCQ compares to this.
  "ExplanationCorrect": "...",            // ✅ string. Min 50 chars.
  "ExplanationWrongA": "...",             // ✅ string. "" if A==CC; ≥50 chars otherwise.
  "ExplanationWrongB": "...",            // ✅ string. "" if B==CC; ≥50 chars otherwise.
  "ExplanationWrongC": "...",            // ✅ string. "" if C==CC; ≥50 chars otherwise.
  "ExplanationWrongD": "...",            // ✅ string. "" if D==CC; ≥50 chars otherwise.
  "Difficulty": "Moderate",               // 🔴 string. UI label.
  "DifficultyScore": 3,                   // 🔴 int. selectWithDifficultyDistribution.
  "CognitiveLevel": "Apply",              // ✅ string. Remember/Understand/Apply/Analyze/Evaluate.
  "CalculationItem": false,               // ✅ bool.
  "ItemStyle": "single-select",           // 🔴 string. single-select | multi-select | numeric | fill | match.
  "LOSTag": "A.1",                        // ✅ string. Blueprint traceability.
  "BlueprintDomain": "Financial Statement Analysis", // ✅ string. Full CSO domain name.
  "FormulaReference": "NPV = Σ CF_t/(1+r)^t − I₀",  // ➖ string. Links to FORMULA_MASTER_P2.md.
  "CommonTrapReference": "T4: opportunity cost omitted", // ➖ string. Names distractor trap.
  "Authorities": ["ASC 470-10-45"],       // ➖ array. Governing standards/citations.
  "source_ids": ["DA-08: Incremental decision rule"], // ✅ array. Approved-source-catalog IDs. Required (RESOLVED).
  "source_support_for_key": {             // ✅ object|null. Structured key-support claim. See §1.1.
    "source_id": "DA-08: Incremental decision rule",
    "rule_or_proposition": "Only incremental revenues and costs are relevant.",
    "application_to_facts": "Order revenue minus order variable cost minus displaced margin.",
    "key_conclusion": "Accepting reduces operating income; reject."
  },
  "distractor_intent": {                  // ✅ object. Wrong-option-only misconception map. Keys = non-CC letters.
    "A": { "misconception": "...", "why_plausible": "...", "tier_candidate": 2 }
  },
  "uniqueness_note": "No other choice is defensible because ...", // ✅ string. Addresses every non-key option.
  "source_status": "RESOLVED",            // ✅ enum. "RESOLVED" | "HOLD_FOR_SOURCE". See §1.1.
  "hold_reason": "",                      // ✅ string. Required non-empty when HOLD_FOR_SOURCE; empty when RESOLVED.
  "VerifiedChecks": [                     // ✅ array. Structural verification checklist.
    "Part2OnlyFlag verified true",
    "EW[CC] empty (DL-008 compliant)",
    "Non-CC EW slots ≥50 chars (DL-026 compliant)",
    "No boilerplate text (DL-013 prevention)",
    "Difficulty justified by ...",
    "Independent answer derived: ...",
    "Authority citations match tested concept"
  ],
  "CrossDomainTags": [],                  // ➖ array. Secondary domains [\"B\",\"E\"]. Optional.
  "DecisionTreeReference": "",            // ➖ string. Links to decision tree doc. Optional.
  "pedagogical_cluster": "",              // ➖ string. Session composition dedup. Optional.
  "certification_date": "",               // ➖ string. Written at certification. Optional.
  "certification_batch": ""               // ➖ string. Written at certification. Optional.
}
```

## 1.1 v1.1 Amendment — Authoring Evidence Fields (P2-050, 2026-08-24)

**Effective:** 2026-08-24. Applies to newly authored Part 2 drafts. Legacy v1.0 items remain valid under the grandfather clause (§1.2).

These fields carry the **authoring evidence** the certification pipeline consumes (six-dimension verification, external review, `DistractorTierMap` derivation). They are **not** consumed by the runtime engine and are not engine-critical. `p2_schema_validator.js` v1.1 enforces them in **report-only mode** until migration volume is closed, then as blocking rules (`--enforce`).

### Field semantics

| Field | Type | Required (v1.1) | Purpose |
|-------|------|------------------|---------|
| `schema_version` | String | Yes | `"1.1"` on new drafts; absent/`"1.0"` on legacy items. Lets "unexpected fields" audits distinguish a sanctioned v1.1 object from an ad hoc change. |
| `source_ids` | Array[String] | Yes (RESOLVED) | IDs that resolve in the approved source catalog — formula IDs from `P2005_FORMULA_MASTER.json` plus the P2 authority registry (`scripts/validators/p2_source_catalog.js`). Not free-text. |
| `source_support_for_key` | Object \| null | Yes (RESOLVED: object; HOLD: null) | Structured key-support claim: `source_id`, `rule_or_proposition`, `application_to_facts`, `key_conclusion`. |
| `distractor_intent` | Object | Yes | Wrong-option-only map. Keys must exactly equal `{A,B,C,D} \ {CorrectChoice}`. Each entry: `misconception`, `why_plausible`, unique integer `tier_candidate` (1/2/3). |
| `uniqueness_note` | String | Yes | Falsifiable claim that every non-key option is wrong for a stated reason; must reference every non-key option. |
| `source_status` | String | Yes | Fixed enumeration: `"RESOLVED"` \| `"HOLD_FOR_SOURCE"`. |
| `hold_reason` | String | Conditional | Non-empty when `source_status == "HOLD_FOR_SOURCE"`; must be empty when RESOLVED. |

### Conditional rules (if / then / else)

- `source_status == "RESOLVED"` ⇒ `source_ids` is a non-empty array and every entry **resolves in the approved source catalog**; `source_support_for_key` is a non-null object with all four non-empty strings and a resolving `source_id`; `hold_reason` is empty.
- `source_status == "HOLD_FOR_SOURCE"` ⇒ `source_support_for_key` is `null`; `hold_reason` is non-empty. The item is **quarantined** (see §1.1.1).
- `distractor_intent` keys must exactly equal the three non-key letters; every entry has non-empty `misconception` and `why_plausible`; `tier_candidate` values are the unique integers 1, 2, 3.
- `uniqueness_note` must be non-empty and reference every non-key option.
- `source_status` is validated as a fixed enumeration; `source_ids` and `source_support_for_key.source_id` are validated by **allowlist resolution** against the source catalog — formatting checks alone are insufficient.

### §1.1.1 HOLD_FOR_SOURCE quarantine semantics

An item with `source_status == "HOLD_FOR_SOURCE"` (the model could not supply an approved, precise source ID) is **preserved as a queryable draft** with `question_state: "Unprocessed"`. It is **hard-rejected from certification input, candidate pools, exports, and production load paths**. It is not a defect — it is an intentional, auditable hold.

### §1.1.2 Evidence vs. judgment boundary

- **Authoring evidence:** `tier_candidate`, the `source_support_for_key` chain, `uniqueness_note`. These are claims, not conclusions.
- **Certification judgment:** the final `DistractorTierMap` (empirical/editorial attractiveness) and `question_state: "Certified"`. The certifier derives the tier map from `tier_candidate` plus review. A local model's intended tier **never** becomes a certified conclusion without review.

## 1.2 Legacy v1.0 Grandfather Policy

Legacy items (no `schema_version`, or `"1.0"`) remain valid. `p2_schema_validator.js` v1.1 reports them as **`GRANDFATHERED`** (otherwise clean) or **`MIGRATION_REQUIRED`** (carry the new fields partially/invalidly, or otherwise defective). The new fields are optional for legacy items until either (a) the migration gate becomes blocking, or (b) the item next enters the certification pipeline, at which point the evidence fields must be present.

## 2. Field Changes from Original Template (P2003)

| Original Field | Ratified Field | Reason |
|---------------|----------------|--------|
| `Type` | `ItemStyle` | `Type` is the case-item scoring discriminator (app.js:1934). MCQs must use `ItemStyle` to avoid mis-scoring. |
| `VerificationChecks` | `VerifiedChecks` | Matches Part 1 convention. One validator serves both parts. |
| (absent) | `UniqueConceptKey` | Highest-precedence dedup signal. Without it, `uniqueByConcept` degrades to Topic/Stem matching. |
| `Industry`, `CompanyType`, `Stakeholder`, `BusinessFunction`, `Scale` | **dropped** | Case-study metadata that leaked into MCQ skeleton. Five per-item strings no engine reads. |
| (absent) | `CrossDomainTags` | Replaces cross-domain phantom pack. Item lives in primary domain, tags secondaries. |
| (absent) | `schema_version` | v1.1. Declares the item's schema revision so audits and backfills are deterministic. |
| (absent) | `source_ids` | v1.1. Approved-source-catalog IDs (formula IDs + P2 authority registry). |
| (absent) | `source_support_for_key` | v1.1. Structured key-support claim (source_id → rule → facts → conclusion). |
| (absent) | `distractor_intent` | v1.1. Wrong-option misconception map; feeds `DistractorTierMap` derivation. |
| (absent) | `uniqueness_note` | v1.1. Falsifiable "one best answer" claim. |
| (absent) | `source_status` / `hold_reason` | v1.1. Source-evidence gate; `HOLD_FOR_SOURCE` quarantines from certification input. |

## 3. ItemStyle Enumeration

| Value | Description |
|-------|-------------|
| `single-select` | Single best answer (A–D). Formerly `"Type": "select"`. |
| `multi-select` | Multiple correct answers. |
| `numeric` | Enter a numeric answer. |
| `fill` | Fill-in-the-blank text entry. |
| `match` | Match left/right items. |

## 4. Pack File Layout (6 Packs, 1 Domain Per Pack)

| Pack File | Domain | Items | QID Range |
|-----------|--------|-------|-----------|
| `pack_p2_a.js` | A — Financial Statement Analysis | 500 | P2-A-001 to P2-A-500 |
| `pack_p2_b.js` | B — Corporate Finance | 500 | P2-B-001 to P2-B-500 |
| `pack_p2_c.js` | C — Decision Analysis | 625 | P2-C-001 to P2-C-625 |
| `pack_p2_d.js` | D — Risk Management | 250 | P2-D-001 to P2-D-250 |
| `pack_p2_e.js` | E — Investment Decisions | 250 | P2-E-001 to P2-E-250 |
| `pack_p2_f.js` | F — Professional Ethics | 375 | P2-F-001 to P2-F-375 |
| **Total** | | **2,500** | |

## 5. QID Format

**Pattern:** `P2-{Section}-{NNN}`  
**Regex:** `^P2-[A-F]-(\d{3})$` (001–625 range for C; 001–500 for A/B; 001–375 for F; 001–250 for D/E)

## 6. Governance Rules Specific to P2

| Rule | Level | Description |
|------|-------|-------------|
| RULE 13 | BLOCK | `Part2OnlyFlag` must be `true` (strict boolean) on every P2 MCQ item with `"Part": 2` |
| RULE 14 | BLOCK | Cross-part QID boundary — P1- prefixed QIDs blocked in P2 packs; P2- prefixed QIDs blocked in P1 packs |

All Part 1 governance rules (1–12) also apply to P2 pack operations.

## 7. Effective Date

**2026-08-04.** All content authored after this date must conform to this schema. The 155 items authored before this date (Pack A:100, Pack B:40, Pack C:15) were migrated to this schema during the Schema Lock session.

**v1.1 (2026-08-24).** New Part 2 drafts must carry `schema_version: "1.1"` and the authoring-evidence fields per §1.1. Legacy v1.0 items are grandfathered per §1.2. `p2_schema_validator.js` v1.1 enforces the evidence fields in report-only mode; the migration gate becomes blocking (`--enforce`) once migration volume is closed.

---

**Revision History:**

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-08-04 | Schema Lock session | Ratified schema from P2_EXPANSION_PLAN.md §1. Migrated 155 items. Added 6-pack layout. |
| 1.1 | 2026-08-24 | P2-050 (v1.1 Amendment) | Added `schema_version` and authoring-evidence fields (`source_ids`, `source_support_for_key`, `distractor_intent`, `uniqueness_note`, `source_status`, `hold_reason`). Conditional rules, HOLD_FOR_SOURCE quarantine, evidence-vs-judgment boundary, legacy grandfather policy. Added `p2_source_catalog.js` allowlist and report-only validator enforcement. |
