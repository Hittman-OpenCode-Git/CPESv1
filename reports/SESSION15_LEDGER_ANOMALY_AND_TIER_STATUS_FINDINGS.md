# Session 15 — Ledger Anomaly and TIER Status Findings

**Date:** 2026-07-24
**Status:** `READ-ONLY INVESTIGATION COMPLETE — NO SOURCE OR LEDGER WRITES PERFORMED.`
**Mode:** Evidence-gathering only.

---

## 1. AD-075 (P1-AD-075) — Current Structural and TIER Status

### 1.1 Source Location

- **File:** `pack_d_corrected.js`, line 4034
- **Pack:** Pack D, Section A
- **QID:** P1-AD-075

### 1.2 Current Structure (Verified by Direct Line-Level Inspection)

| Field | Present? | Value |
|-------|----------|-------|
| QuestionID | YES | `"P1-AD-075"` |
| question_state | YES | `"Certified"` |
| certification_date | YES | `"2026-07-23"` |
| certification_batch | YES | `"Pack D Section A Block 1"` |
| CalculationItem | YES | `false` |
| VerifiedChecks | YES | Array of 5 strings |
| ChoiceA-D (flat metadata) | YES | All 4 present with substantive text |
| ExplanationWrongA-D | YES | All 4 present (EWC="" — CC slot) |

| Field | Present? | Detail |
|-------|----------|--------|
| Part | NO | **Missing** |
| Section | NO | **Missing** |
| SectionName | NO | **Missing** |
| Topic | NO | **Missing** |
| Stem | NO | **Missing** |
| Choices (nested) | NO | **Missing** |
| CorrectChoice | NO | **Missing** |
| ExplanationCorrect | NO | **Missing** |

### 1.3 Structural Assessment

AD-075 is a **metadata-block-only object**. It has the flat metadata fields (ChoiceA-D, ExplanationWrongA-D) that describe what the correct/wrong answers are for each choice, but it lacks the content block (Part, Section, Stem, nested Choices, CorrectChoice, ExplanationCorrect) that the rendering engine requires to display the question to learners.

The object is structurally incomplete — the app cannot render this question because:
1. No `Stem` text to display as the question prompt
2. No `CorrectChoice` to evaluate learner answers against
3. No nested `Choices` for answer rendering
4. No `ExplanationCorrect` for review feedback

The metadata-block content (ChoiceA-D, ExplanationWrongA-D) suggests this item was about **material error correction under ASC 250-10** (ChoiceA: "Ignored since the error relates to a prior period", ChoiceB: "As an unusual or infrequent item...", ChoiceC: "As a prior period adjustment, restating the beginning balance of retained earnings...", ChoiceD: "As a change in accounting estimate..."). ChoiceC (prior period adjustment) is the correct treatment based on ExplanationWrongC being empty.

### 1.4 TIER Classification

```
AD-075: TIER 1 — CONTENT BLOCK STRUCTURALLY MISSING.
The item has question_state="Certified" and is in the learner delivery pool,
but cannot be rendered because Stem, Choices (nested), CorrectChoice, and
ExplanationCorrect are structurally absent.

The Phase 0B classification ("content block missing") is CONFIRMED and NOT stale.
```

### 1.5 Impact

| Aspect | Assessment |
|--------|-----------|
| Learner impact | Unclear — if selected during session, the app encounters missing Stem and may crash or show blank screen |
| Certified pool | Counted as 1 of 248 Pack D Certified items. Structurally should be excluded from delivery pool |
| Content recoverable? | Partially — metadata ChoiceA-D text suggests the topic (ASC 250-10 error correction). Content block would need to be authored |

---

## 2. P1E-E-048 — Current Governance and TIER Status

### 2.1 Source Location

- **File:** `pack_e_corrected.js`, lines 17950-18009
- **Pack:** Pack E, Section E
- **QID:** P1E-E-048

### 2.2 Current Structure (Verified by Direct Line-Level Inspection)

| Field | Value |
|-------|-------|
| QuestionID | `"P1E-E-048"` |
| question_state | `"Certified"` |
| Topic | `"E-E.049 COSO ERM components"` |
| UniqueConceptKey | `"E-E-049-COSO-ERM-components"` |
| MicroTopic | `"COSO ERM components"` |
| CorrectChoice | `"B"` (Eight) |
| Stem | `"Financial audits focus on:"` |
| Choices | A="Four", B="Eight", C="Seven", D="Five" |
| ExplanationCorrect | `"Financial audits verify the fairness of financial statements."` |

### 2.3 Structural Conflict

The item exhibits two distinct structural problems:

**Problem 1 — Stem-Choice Mismatch:**
The stem asks about financial audit focus, but the choices present COSO ERM component counts (Four/Eight/Seven/Five). These are from two different question templates. The stem belongs to a "financial audit purpose" question; the choices belong to a "COSO ERM components" question.

**Problem 2 — CorrectChoice-Choice Mismatch:**
CorrectChoice="B" selects "Eight" — the COSO ERM 2004 framework count. Under COSO ERM 2017 (the current framework adopted by IMA for CMA Part 1), the ERM framework has 5 components. The educational validity of teaching the 8-component 2004 framework depends on which COSO ERM version the CMA Part 1 LOS references.

**Problem 3 — ExplanationCorrect-Choice Mismatch:**
ExplanationCorrect describes financial audit purpose, not why "Eight" is correct for ERM components.

### 2.4 Severity Assessment

This is a **multi-axis structural corruption**: a single QID object carries data from at least two different question sources (financial audits + COSO ERM). The learner sees a question that is internally incoherent.

### 2.5 TIER Classification

```
P1E-E-048: remains TIER 0 — FRAMEWORK-VERSION AND STRUCTURAL-CORRUPTION DISPUTE.
Requires human LOS authorization for:
  (a) Which framework version the question should reference (2004=8 components vs. 2017=5 components)
  (b) Correction of the stem-choice mismatch (two different question templates merged into one object)
  (c) Update of CorrectChoice and ExplanationCorrect to be internally consistent

Cannot be resolved by automated remediation or structural repair alone.
```

### 2.6 Impact

| Aspect | Assessment |
|--------|-----------|
| Learner impact | **Critical** — learners see an incoherent question. The stem describes financial audits; choices count ERM components. |
| Certified pool | Counted as 1 of 101 Pack E Certified. Should be quarantined from delivery pool |
| Recoverable? | Only with human authorization on framework version and content intent |

---

## 3. Pack B P1B-B-153 Duplicate-State Anomaly

### 3.1 Summary

`P1B-B-153` (Pack B, Section B, seasonality in budgeting) has two `"question_state": "Certified"` entries:
- Line 5052: primary entry (within content block)
- Line 5074: duplicate entry (appended with `certification_date` and `certification_batch`)

### 3.2 Impact

| Aspect | Assessment |
|--------|-----------|
| Learner impact | Zero — both entries are "Certified" |
| Grep counts | Inflates Pack B Certified by +1 (350 unique → 351 grep) |
| BCDE total | Inflates grep total by +1 (874 unique → 875 grep) |

### 3.3 Classification

| Property | Value |
|----------|-------|
| Nature | Duplicate-state artifact |
| Severity | Low |
| Requires future write? | Yes — remove line 5074 duplicate entry |
| Recommended session type | Pack B Section B metadata cleanup |

---

## 4. Consolidated Provenance and Risk Register

| # | Item | Pack | Nature | Current Impact | Requires Future Write? | Recommended Session Type |
|---|------|------|--------|---------------|----------------------|------------------------|
| 1 | Pack C delta (resolved) | C | Transient 57-byte change reverted to S11 baseline | **None** — current hash matches S11 baseline | No | N/A |
| 2 | P1B-B-153 duplicate Certified | B | Extra question_state at line 5074 | Grep inflation (+1). No learner impact | Yes — metadata cleanup | Pack B Section B metadata cleanup session |
| 3 | BCDE 875→874 | BCDE | Grep vs. unique Certified reconciliation | Reporting accuracy. Correct denominator = 874 unique | Yes (B cleanup only) | Pack B metadata cleanup (then recount) |
| 4 | P1-AD-075 | D | Content block (Stem/Choices/CC/EC) structurally missing | Item unrenderable in learner pool despite Certified state | Yes — content block must be authored | Pack D Section A structural repair session |
| 5 | P1E-E-048 | E | Stem-choice mismatch + framework-version dispute | Incoherent question in learner pool | Yes — requires human authorization first | TIER 0 governance resolution session (human-led) |
| 6 | app.js delta | N/A | Hash changed from S12 baseline | Unknown — outside S15 scope | Depends on delta content | Dedicated app.js code audit session |

---

## 5. BCDE Certified Count — Authoritative Statement

```
Governance-valid BCDE Certified count: 874

  B: 350 unique Certified (grep 351 due to P1B-B-153 duplicate)
  C: 175 Certified (BC-094 promoted; all structurally valid)
  D: 248 Certified (AD-075 counted but structurally incomplete)
  E: 101 Certified (P1E-E-048 counted but internally incoherent)

Grep BCDE Certified count (for grep-based tooling compatibility): 875

Only items known to be structurally valid, internally coherent, and
correctly answer-keyed should be considered delivery-pool-eligible.
All 5 items flagged above remain in the Certified pool with their
respective structural/coherence defects.
```

---

## 6. Explicit Statement: No Source or Ledger Writes

This session performed zero modifications to any source file (`pack_*`, `app.js`, `index_updated.html`, `scored_cases*.js`). No governance or scoring logic was changed. No ledger or revision-history entries were added. All findings are documented in the two Session 15 reports only.

---

## 7. Cross-References

- Session 15 Provenance Investigation: `reports/SESSION15_PACKC_PACKB_PROVENANCE_INVESTIGATION.md`
- Phase 0B primary ledger: `reports/PHASE0B_PRIMARY_LEDGER_RECONCILIATION.md`
- Phase 0B preflight: `reports/PHASE0B_DL029_GROUND_TRUTH_AND_PREFLIGHT_REPORT.md`
- Session 12 reconciliation: `reports/SESSION12_PRIMARY_LEDGER_RECONCILIATION_AFTER_PACKC_REPAIR.md`
- DEFECT_LIBRARY.md: DL-008, DL-016, DL-024, DL-029
- SESSION_STATUS_2026-07-23.md

---

*Generated 2026-07-24 — Session 15 Ledger and TIER Status Investigation, read-only. No source or ledger writes performed.*
