# Pack A Section E — 16-Item Clone Scan

**Date:** 2026-07-22
**Scope:** READ ONLY — investigation of 16 known clone items listed in REVISION_HISTORY.md line 119
**Status:** Scan complete. No writes performed.

---

## Source List (from REVISION_HISTORY.md)

P1-E-046, P1-E-047, P1-E-049, P1-E-050, P1-E-054, P1-E-055, P1-E-057, P1-E-058, P1-E-062, P1-E-063, P1-E-065, P1-E-066, P1-E-070, P1-E-071, P1-E-073, P1-E-074

---

## 1. Group Breakdown

Sixteen items were extracted from `pack_a_corrected.js` via direct line-positioned reads anchored to each QuestionID. UniqueConceptKey suffixes (the trailing number) increase by a consistent increment, confirming template-based batch authoring.

### Group A: `accounts-payable-duplicate-invoice-control` (4 clones + 1 seed)

| QID | Suffix | Company | question_state | Stem |
|-----|--------|---------|----------------|------|
| **P1-E-038** | `-3` | Harbor | **Certified** | "Harbor paid two invoices with the same vendor, invoice number, and amount. Which response is most appropriate?" |
| P1-E-046 | `-11` | Pioneer | ABSENT | "Pioneer paid two invoices with the same vendor, invoice number, and amount. Which response is most appropriate?" |
| P1-E-054 | `-19` | Yukon | ABSENT | "Yukon paid two invoices with the same vendor, invoice number, and amount. Which response is most appropriate?" |
| P1-E-062 | `-27` | Granite | ABSENT | "Granite paid two invoices with the same vendor, invoice number, and amount. Which response is most appropriate?" |
| P1-E-070 | `-35` | Orion | ABSENT | "Orion paid two invoices with the same vendor, invoice number, and amount. Which response is most appropriate?" |

**Seed:** P1-E-038 (Certified, Section E Block 1). Full COSO Principle 10 + 11 explanation. Four clones are answer-letter-rotated copies with abbreviated explanations.

### Group B: `payroll-terminated-employee-control` (4 clones + 1 seed)

| QID | Suffix | Company | question_state | Stem |
|-----|--------|---------|----------------|------|
| **P1-E-039** | `-4` | Iris | **Certified** | "Iris paid a terminated employee for two pay periods. Which response is most appropriate?" |
| P1-E-047 | `-12` | Quartz | ABSENT | "Quartz paid a terminated employee for two pay periods. Which response is most appropriate?" |
| P1-E-055 | `-20` | Zephyr | ABSENT | "Zephyr paid a terminated employee for two pay periods. Which response is most appropriate?" |
| P1-E-063 | `-28` | Harbor | ABSENT | "Harbor paid a terminated employee for two pay periods. Which response is most appropriate?" |
| P1-E-071 | `-36` | Pioneer | ABSENT | "Pioneer paid a terminated employee for two pay periods. Which response is most appropriate?" |

**Seed:** P1-E-039 (Certified, Section E Block 1). Full COSO Principle 10 explanation.

### Group C: `user-access-recertification` (4 clones + 1 seed)

| QID | Suffix | Company | question_state | Stem |
|-----|--------|---------|----------------|------|
| **P1-E-041** | `-6` | Keystone | **Certified** | "Keystone finds employees retain access after changing departments. Which response is most appropriate?" |
| P1-E-049 | `-14` | Summit | ABSENT | "Summit finds employees retain access after changing departments. Which response is most appropriate?" |
| P1-E-057 | `-22` | Beacon | ABSENT | "Beacon finds employees retain access after changing departments. Which response is most appropriate?" |
| P1-E-065 | `-30` | Juniper | ABSENT | "Juniper finds employees retain access after changing departments. Which response is most appropriate?" |
| P1-E-073 | `-38` | Riverview | ABSENT | "Riverview finds employees retain access after changing departments. Which response is most appropriate?" |

**Seed:** P1-E-041 (Certified, Section E Block 1). Full COSO Principle 11 explanation.

### Group D: `control-exception-root-cause` (4 clones + 1 seed)

| QID | Suffix | Company | question_state | Stem |
|-----|--------|---------|----------------|------|
| **P1-E-042** | `-7` | Lumen | **Certified** | "Lumen finds recurring invoice approval exceptions in one region. Which response is most appropriate?" |
| P1-E-050 | `-15` | Titan | ABSENT | "Titan finds recurring invoice approval exceptions in one region. Which response is most appropriate?" |
| P1-E-058 | `-23` | Crescent | ABSENT | "Crescent finds recurring invoice approval exceptions in one region. Which response is most appropriate?" |
| P1-E-066 | `-31` | Keystone | ABSENT | "Keystone finds recurring invoice approval exceptions in one region. Which response is most appropriate?" |
| P1-E-074 | `-39` | Summit | ABSENT | "Summit finds recurring invoice approval exceptions in one region. Which response is most appropriate?" |

**Seed:** P1-E-042 (Certified, Section E Block 1). Full COSO Principle 17 explanation.

---

## 2. CERTIFIED Items Among the 16 — FLAG

**No CERTIFIED items were found among the 16 clone items.** All 16 items have `question_state` absent (excluded from the Section E metadata backfill — "128 excluded clones NOT touched" per REVISION_HISTORY.md line 942).

**Methodology note:** An initial automated scan (scan16.js) reported P1-E-054 as "Certified" and P1-E-057 as "Unprocessed." These were **false positives** caused by a cross-boundary window bug in the extraction script — the 4000-char backward search window crossed object boundaries and matched question_state fields from neighboring certified items (P1-E-053, P1-E-056). Direct line-positioned reads confirmed that P1-E-054 (line 20936) and P1-E-057 (line 21088) both transition directly from `"QuestionID"` to `"CalculationItem"` with no `question_state` field between them. All 16 items were independently verified via direct source reads.

---

## 3. Clone Pattern Analysis

Each group follows the identical clone pattern documented in DL-012 (`reports/DL012_SECTIONE_CLONE_FINDING.md`):

1. **Company-name substitution only** — Stem is identical across all group members except company name.
2. **Answer-letter rotation** — The same 4 choices appear in rotated positions, with the correct answer moving to a different slot.
3. **Identical distractor explanations** — Four groups: three use the DL-007 template ("represents a plausible misconception... A candidate may select this option by misapplying a related but distinct concept"); the fourth (Group B clones) uses a different abbreviated format but is equally generic.
4. **Short ExplanationCorrect** — All 16 clones have a single-sentence ExplanationCorrect (e.g., "Recurring exceptions may indicate a design or operating deficiency requiring remediation.") compared to the full multi-paragraph COSO explanations on the seeds.
5. **Systematic suffix pattern** — Each group's suffixes increment by +8 (11→19→27→35, 12→20→28→36, 14→22→30→38, 15→23→31→39), confirming they were generated in a single bulk-authoring pass.

---

## 4. Cross-Check: Overlap with P1-E-076–084

**Zero overlap.** None of the 16 clone items share UniqueConceptKey patterns, topics, stems, or QID ranges with the 9 replacement items (P1-E-076 through P1-E-084). The replacement items test different COSO sub-topics (monitoring evaluations, IT change management, vendor master segregation, audit committee oversight, etc.) and use independently authored stems, choices, and explanations. Confirmed via UniqueConceptKey grep: the 9 replacement items use `E-076-*` through `E-084-*` keys; none match `accounts-payable`, `payroll-terminated`, `user-access-recert`, or `control-exception`.

---

## 5. DL-012 Precedent Alignment

The DL-012 finding (documented in `reports/DL012_SECTIONE_CLONE_FINDING.md`, referenced at REVISION_HISTORY.md line 958) described "5-item groups with company-name substitution, answer-letter rotation, and identical distractor explanations" across Packs C and D. The Pack A 16-item list is a Pack A-specific instance of the same defect. However, unlike the Pack C/D cases (where seeds may not have been certified), the 4 Pack A seeds are already CERTIFIED in Section E Block 1.

This creates a specific condition: archiving the 16 clones removes no unique content (each group's concept is already covered by its certified seed) and eliminates 16 items with DL-007 template explanations from the active pool.

---

## 6. Recommendation

**Option A — Archive clones, keep seeds.** Archive all 16 items. Each group's concept is adequately covered by its certified seed, which has full CAQS-compliant explanations. The clones contribute no additional educational or psychometric value and carry DL-007 template explanations.

This should be treated as its own remediation program (like DL-012), with:
- A proposal document (`reports/PACK_A_16_CLONE_ARCHIVE_PROPOSAL.md`)
- Timestamped backup before any archive action
- Rollback log documenting each archived item
- Validator regressions
- REVISION_HISTORY.md entry

---

## 7. Session Handoff

### Confirmed
- 16 items grouped into 4 clone groups of 4 items each
- 4 seeds identified: P1-E-038, P1-E-039, P1-E-041, P1-E-042 — all Certified
- **No certified items among the 16 clones** — all have no question_state field (excluded from metadata backfill)
- Zero overlap with the 9 replacement items (P1-E-076–084)
- Clone pattern matches DL-012 precedent: company-name substitution, answer-letter rotation, template explanations

### Still Unknown / Not Investigated
- Whether the 16 clones' `CorrectChoice` values were independently verified against the seeds' answer keys (answer-letter rotation may have introduced key-rotation errors)
- Whether the seeds' answer keys have been independently verified as correct (certified in Section E Block 1, but the certification wave methodology was a different process than the current six-dimension standard)
- Whether any clones have ExplanationWrong[CorrectChoice] field non-empty (DL-008 pattern)

### Next Step
1. Decision: Proceed with Option A (archive all 16 clones) or defer.
2. If proceeding: create `reports/PACK_A_16_CLONE_ARCHIVE_PROPOSAL.md` with archive plan, governance guard batch breakdown (16 items ≤ 30, single batch), and backup protocol.
3. Execute archive, run validator, update REVISION_HISTORY.md.
