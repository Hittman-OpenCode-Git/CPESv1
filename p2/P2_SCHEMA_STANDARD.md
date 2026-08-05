# CMA Part 2 — MCQ Schema Standard (Ratified)

**Document ID:** P2_SCHEMA_v1.0
**Status:** Ratified — 2026-08-04
**Session:** Schema Lock (P2-020)
**Authority:** P2_EXPANSION_PLAN.md §1
**Supersedes:** P2003_QID_STANDARD.md §1.2 (QID ranges), P2003_CONTENT_LAUNCH_PLAN.md §5 (item template)
**Governance Lane:** Full

---

## 1. MCQ Object Schema (Canonical Field Order)

Every Part 2 MCQ item is a single JSON object in a pack array. Fields marked 🔴 are engine-critical — the shared Part 1/Part 2 scoring, pool, and dedup code reads them by exact name.

```jsonc
{
  "Part": 2,                              // 🔴 int. Drives part routing.
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

## 2. Field Changes from Original Template (P2003)

| Original Field | Ratified Field | Reason |
|---------------|----------------|--------|
| `Type` | `ItemStyle` | `Type` is the case-item scoring discriminator (app.js:1934). MCQs must use `ItemStyle` to avoid mis-scoring. |
| `VerificationChecks` | `VerifiedChecks` | Matches Part 1 convention. One validator serves both parts. |
| (absent) | `UniqueConceptKey` | Highest-precedence dedup signal. Without it, `uniqueByConcept` degrades to Topic/Stem matching. |
| `Industry`, `CompanyType`, `Stakeholder`, `BusinessFunction`, `Scale` | **dropped** | Case-study metadata that leaked into MCQ skeleton. Five per-item strings no engine reads. |
| (absent) | `CrossDomainTags` | Replaces cross-domain phantom pack. Item lives in primary domain, tags secondaries. |

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

---

**Revision History:**

| Version | Date | Author | Summary |
|---------|------|--------|---------|
| 1.0 | 2026-08-04 | Schema Lock session | Ratified schema from P2_EXPANSION_PLAN.md §1. Migrated 155 items. Added 6-pack layout. |
