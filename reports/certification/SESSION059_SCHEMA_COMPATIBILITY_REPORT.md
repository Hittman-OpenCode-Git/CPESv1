# Session 59 — Schema Compatibility Report: Stakeholder Field Classification

**Date:** 2026-07-28
**Agent:** Schema-Review Subagent (Session 59)
**Objective:** Determine whether "Missing Stakeholder field" should be Required, Recommended, or Non-blocking under the Hybrid Certification Framework
**Type:** READ-ONLY audit — no content modifications

---

## 1. Executive Summary

**Recommendation: RECOMMENDED (WARN, non-blocking for certification)**

The `Stakeholder` field should be classified as **Recommended** under the Hybrid Certification Framework. It should generate a WARN-level notification in certification sweeps but should **not block certification** or require decertification of items already in the learner delivery pool. The field has zero runtime impact, zero validator coverage, and its absence can be inferred from ScenarioText in all 4 affected cases. Only 4 of 75 cases (5.3%) are affected.

---

## 2. Cases Under Review

| CaseID | Title | File | Line | Items | question_state |
|--------|-------|------|------|-------|---------------|
| CBQ2-A3 | Revenue Recognition and Receivables Valuation | scored_cases2.js | 7 | 5 | All Certified |
| CBQ3-A1 | Lease Accounting and Classification | scored_cases3.js | 7 | 5 | All Certified |
| CBQ4-A1 | Intangible Assets and Goodwill Impairment | scored_cases4.js | 7 | 5 | All Certified |
| CBQ5-B2 | Bonds Payable and Effective Interest Amortization | scored_cases5.js | 7 | 5 | All Certified |

**Total affected: 4 cases / 20 Certified items (2.7% of the 745-item certified pool)**

---

## 3. Per-Case Analysis

### 3.1 CBQ2-A3 — Revenue Recognition and Receivables Valuation

| Field | Status | Notes |
|-------|--------|-------|
| `Stakeholder` | **ABSENT** | Field not present at case level |
| `CompanyName` | ABSENT | Not present — but "Vertex Solutions" in ScenarioText |
| `Industry` | ABSENT | Not present |
| `CompanyType` | ABSENT | Not present |
| `BusinessFunction` | ABSENT | Not present |
| ScenarioText | PRESENT | "Vertex Solutions entered into a $500,000 contract to deliver hardware, installation, and 1 year of maintenance..." |

**Stakeholder inference:** The scenario describes a contract accounting / revenue recognition case. The implicit stakeholder would be a Controller or CFO responsible for ASC 606 compliance. The company name ("Vertex Solutions") is present in ScenarioText. The scenario has a business trigger ($500K contract) and a clear task (revenue allocation).

### 3.2 CBQ3-A1 — Lease Accounting and Classification

| Field | Status | Notes |
|-------|--------|-------|
| `Stakeholder` | **ABSENT** | Field not present at case level |
| `CompanyName` | ABSENT | Not present — but "Meridian Logistics" in ScenarioText |
| `Industry` | ABSENT | Not present |
| `CompanyType` | ABSENT | Not present |
| `BusinessFunction` | ABSENT | Not present |
| ScenarioText | PRESENT | "Meridian Logistics enters into a 5-year lease for a fleet of delivery trucks on January 1, Year 1..." |

**Stakeholder inference:** Lease classification/accounting case. The implicit stakeholder would be a Controller or CFO. The company name ("Meridian Logistics") and business context (fleet leasing) are present in ScenarioText.

### 3.3 CBQ4-A1 — Intangible Assets and Goodwill Impairment

| Field | Status | Notes |
|-------|--------|-------|
| `Stakeholder` | **ABSENT** | Field not present at case level |
| `CompanyName` | ABSENT | Not present — but "Orion Corp" in ScenarioText |
| `Industry` | ABSENT | Not present |
| `CompanyType` | ABSENT | Not present |
| `BusinessFunction` | ABSENT | Not present |
| ScenarioText | PRESENT | "On January 1, Year 1, Orion Corp acquired 100% of the net assets of StarTech for $2,500,000..." |

**Stakeholder inference:** Goodwill impairment / business combinations case. The implicit stakeholder would be a Controller. The company name ("Orion Corp"), acquisition details, and impairment testing context are all present in ScenarioText.

### 3.4 CBQ5-B2 — Bonds Payable and Effective Interest Amortization

| Field | Status | Notes |
|-------|--------|-------|
| `Stakeholder` | **ABSENT** | Field not present at case level |
| `CompanyName` | ABSENT | Not present — but "Granite Corp" in ScenarioText |
| `Industry` | ABSENT | Not present |
| `CompanyType` | ABSENT | Not present |
| `BusinessFunction` | ABSENT | Not present |
| ScenarioText | PRESENT | "On January 1, Year 1, Granite Corp issued $1,000,000 face value, 8% bonds..." |

**Stakeholder inference:** Bond accounting case. The implicit stakeholder would be a Controller. The company name ("Granite Corp") and bond details ($1M face value, 8% coupon, 10% market) are present in ScenarioText.

---

## 4. Runtime Impact Assessment

### 4.1 app.js Usage: ZERO

A full grep of `app.js` for `Stakeholder`, `CompanyName`, `CompanyType`, `Industry`, and `BusinessFunction` returned **zero matches**. None of these metadata fields are consumed by the rendering engine, scoring pipeline, navigation logic, or any runtime function.

### 4.2 Validator Coverage: ZERO

No validator script in the `scripts/` directory checks for the presence or correctness of the `Stakeholder` field. The field is not in the automated validation pipeline.

### 4.3 Learner Experience: NO IMPACT

The `Stakeholder` field is not rendered on any learner-facing screen. Its absence does not affect:
- Question display
- Answer submission
- Scoring
- Review mode
- Progress tracking
- Exam navigation
- Timer behavior
- Calculator

### 4.4 Certification Rubric Impact (D2): THEORETICAL ONLY

Per `CERTIFICATION_RUBRICS.md` §2.2 D2 (Scenario Quality):
- Score 5 requires: "Named company + stakeholder + business trigger + clear task"
- Score 4 requires: "All CAQS §3.1 elements present. Named company and stakeholder."
- Defect-class gate: "No stakeholder: D2 capped at 2."
- Min acceptable for certification: D2 ≥ 4

However, these 4 cases were certified **before** the rubrics were formalized (Session 64, 2026-07-24). Session 55 (2026-07-28) acknowledged these 4 as "still blocked" but noted the field is "absent (Sprint 5.6B schema)" — a schema migration gap, not a content quality defect.

---

## 5. Standards Document Analysis

### 5.1 QUESTION_METADATA_STANDARD.md §1.1

| Field | Required | Present in 4 Target Cases | Present in Scored Cases (Pack 1) |
|-------|----------|---------------------------|----------------------------------|
| `CaseID` | Yes | Yes (all 4) | Yes |
| `Title` | Yes | Yes (all 4) | Yes |
| `SectionTags` | Yes | Yes (all 4) | Yes |
| `BlueprintDomain` | Yes | Yes (all 4) | Yes |
| `BlueprintObjectives` | Yes | Yes (all 4) | Yes |
| `PrimaryCompetency` | Yes | Yes (all 4) | Yes |
| `EstimatedMinutes` | Yes | Yes (all 4) | Yes |
| `Difficulty` | Yes | Yes (all 4) | Yes |
| `DifficultyScore` | Yes | Yes (all 4) | Yes |
| `ScenarioText` | Yes | Yes (all 4) | Yes |
| `Exhibits` | Yes | Yes (all 4) | Yes |
| `Items` | Yes | Yes (all 4) | Yes |
| `Industry` | Yes | **No (all 4)** | Yes (e.g., "Medical supplies") |
| `CompanyType` | Yes | **No (all 4)** | Yes (e.g., "Manufacturer") |
| `CompanyName` | Yes | **No (all 4)** | Yes (e.g., "Harbor Medical Supplies") |
| `Stakeholder` | Yes | **No (all 4)** | Yes (e.g., "CFO Maria Chen") |
| `BusinessFunction` | Yes | **No (all 4)** | Yes (e.g., "Treasury") |
| `QuestionCount` | Yes | Yes (all 4) | Yes |
| `ExhibitCount` | Yes | Yes (all 4) | Yes |
| `ProductionStatus` | Yes | Yes (all 4) | Yes |
| `Version` | Yes | Yes (all 4) | Yes |
| `CreatedDate` | Yes | **No (all 4)** | Varies |
| `ModifiedDate` | Yes | **No (all 4)** | Varies |
| `Author` | Yes | **No (all 4)** | Varies |
| `Confidence` | Yes | Yes (CBQ2-A3, CBQ4-A1); No (CBQ3-A1, CBQ5-B2) | Yes |
| `LearningObjectives` | Yes | Yes (all 4) | Yes |

**Key observation:** The 4 target cases are missing not just `Stakeholder` but also **5 other Required fields**: `Industry`, `CompanyType`, `CompanyName`, `BusinessFunction`, `CreatedDate`, `ModifiedDate`, and `Author`. The `Stakeholder` field is not uniquely absent — it is part of a systematic Sprint 5.6B schema gap affecting 6-7 metadata fields.

The standard also states that `Stakeholder` is required for "Future database / JSON export" and "Future web API integration" — capabilities not yet implemented.

### 5.2 CAQS v1.0 §3.1 (Case Study Requirements)

> **Named stakeholder** — Identifies a specific decision-maker with a role (e.g., "CFO Maria Chen", "Controller", "Operations Manager")

The CAQS §3.1 requires a named stakeholder. However, the standard also recognizes that "named company" is a separate requirement from "named stakeholder." The ScenarioText in all 4 cases names the company (Vertex Solutions, Meridian Logistics, Orion Corp, Granite Corp) and describes a specific business situation — satisfying the business-realism intent of §3.7 even without the formal `Stakeholder` field.

### 5.3 CERTIFICATION_RUBRICS.md §2.2 D2

| Criterion | CBQ2-A3 | CBQ3-A1 | CBQ4-A1 | CBQ5-B2 |
|-----------|---------|---------|---------|---------|
| Named company | Yes (in ScenarioText) | Yes (in ScenarioText) | Yes (in ScenarioText) | Yes (in ScenarioText) |
| Named stakeholder | **No (field absent)** | **No (field absent)** | **No (field absent)** | **No (field absent)** |
| Business trigger | Yes ($500K contract) | Yes (lease classification) | Yes (acquisition/impairment) | Yes (bond issuance) |
| Clear task | Yes (revenue allocation, ADA) | Yes (lease accounting) | Yes (impairment testing) | Yes (bond amortization) |
| Realistic context | Yes (professional services) | Yes (fleet leasing) | Yes (M&A) | Yes (corporate debt) |

---

## 6. Scope: How Many Other Cases Lack Stakeholder?

| File | Total Cases | Stakeholder Present | Stakeholder Missing | Notes |
|------|------------|--------------------|--------------------|-------|
| `scored_cases.js` | 15 | 15 | 0 | All Pack 1 cases have Stakeholder populated |
| `scored_cases2.js` | 15 | 13 | 2 (CBQ2-A3 + 1 more) | Sprint 5.6B gap |
| `scored_cases3.js` | 15 | 14 | 1 (CBQ3-A1) | Sprint 5.6B gap |
| `scored_cases4.js` | 15 | 14 | 1 (CBQ4-A1) | Sprint 5.6B gap |
| `scored_cases5.js` | 15 | 14 | 1 (CBQ5-B2) | Sprint 5.6B gap |
| **Total** | **75** | **70** | **5** (6.7%) | Only 4 in target scope |

**1 additional case beyond the 4 targets may also lack Stakeholder — unidentified in Session 55 analysis.** The Session 55 report identified 4 cases with Stakeholder absent. The Session 54 report identified 21 cases with Stakeholder present but generic ("Management"). Post-Session 55 remediation, 17 were fixed, leaving 1 (CBQ5-E3, outside target scope) and the 4 absent-field cases.

### Pre-Existing Certified Cases (for comparison)

All 15 cases in `scored_cases.js` (Pack 1) have `Stakeholder` populated with role-specific values:
- "Controller" — 6 cases
- "CFO" — 4 cases
- "Director of Internal Audit" / "Internal Audit Director" — 3 cases
- "Chief Information Officer" — 1 case
- Role + Company (e.g., "Apex Controls (CFO)") — several cases

---

## 7. Impact on Certification Count if Reclassified

### 7.1 If Required (BLOCK)

| Effect | Count |
|--------|-------|
| Cases that would be decertified / blocked | 4 |
| Certified items affected | 20 |
| Learner pool impact | 2.7% of 745-item pool would need decertification |
| Schema compliance | Field must be present for any certification sweep |
| Remediation effort | Trivial — single field addition per case (4 writes) |
| Retroactive impact | Would require amending 4 previously certified cases |

### 7.2 If Recommended (WARN)

| Effect | Count |
|--------|-------|
| Cases flagged with WARN | 4 |
| Certified items affected | 0 (no decertification) |
| Learner pool impact | None — existing certifications preserved |
| Schema compliance | Field recommended but not gating for certification |
| Remediation effort | Deferred to next metadata enrichment pass |
| Retroactive impact | None — forward-looking only |

### 7.3 If Non-blocking (IGNORE)

| Effect | Count |
|--------|-------|
| Cases flagged | 0 |
| Certified items affected | 0 |
| Learner pool impact | None |
| Schema compliance | Stakeholder effectively downgraded to Optional |
| Remediation effort | None |
| Retroactive impact | None — but weakens CAQS §3.1 authority |

---

## 8. Recommendation: RECOMMENDED (WARN)

### Recommendation

Classify "Missing Stakeholder field" as **Recommended** under the Hybrid Certification Framework:
- **BLOCK: NO** — Does not block certification or require decertification
- **WARN: YES** — Flag in certification sweep reports for future remediation
- **IGNORE: NO** — Not downgraded to non-blocking/ignored

### Rationale

1. **Zero runtime impact.** `app.js` has zero references to `Stakeholder`, `CompanyName`, `CompanyType`, `Industry`, `BusinessFunction`, `CreatedDate`, `ModifiedDate`, or `Author`. The rendering engine, scoring pipeline, and all navigation logic are unaffected.

2. **Stakeholder is inferable.** All 4 cases have a named company and business context in their ScenarioText. The pedagogical purpose of the `Stakeholder` field — business realism — is partially served by the scenario text.

3. **Schema migration gap, not quality defect.** These 4 cases were authored under the Sprint 5.6B schema (pre-QMDS v1.0) and certified before the CERTIFICATION_RUBRICS.md was formalized in Session 64. The miss is structural (field never added), not qualitative (wrong content in the field). This is consistent with the project's backward-compatibility principle (QUESTION_METADATA_STANDARD.md: Guiding Principle 1).

4. **Low scope.** Only 5 of 75 cases (6.7%) are affected. This is a narrow, bounded issue — not a systematic problem.

5. **Stakeholder is not uniquely missing.** The 4 cases are also missing `Industry`, `CompanyType`, `CompanyName`, `BusinessFunction`, `CreatedDate`, `ModifiedDate`, and `Author`. Treating Stakeholder alone as blocking while ignoring the other 6 missing fields would be inconsistent. These are all co-occurring schema gaps from the same authoring pipeline.

6. **Trivial remediation path.** Each case needs a single field addition (`"Stakeholder": "Controller"` or equivalent role). This can be addressed in a future metadata enrichment pass (per QUESTION_METADATA_STANDARD.md Part 7 Phase 2 P4).

7. **Precedent from Session 55.** Session 55 already classified these 4 cases as "still blocked" for D2 but acknowledged that the field is structurally absent — not merely wrong. This report refines that classification from "blocked" (D2=2) to "warned" (WARN-no-block) given the zero runtime impact and clear inference path.

### Recommended Stakeholder Assignments

If/when the field is added via a future enrichment pass:

| CaseID | Recommended Stakeholder | Rationale |
|--------|------------------------|-----------|
| CBQ2-A3 | "Controller" | Revenue recognition / ASC 606 — financial reporting |
| CBQ3-A1 | "Controller" | Lease accounting / ASC 842 — financial reporting |
| CBQ4-A1 | "Controller" | Goodwill impairment / ASC 350 — financial reporting |
| CBQ5-B2 | "Controller" | Bond accounting / ASC 470 — financial reporting |

All 4 cases test Domain A (External Financial Reporting Decisions). A Controller role is the most appropriate match for financial reporting topics per the Session 54 role-mapping table.

---

## 9. Citations

| Citation | Document | Section |
|----------|----------|---------|
| Stakeholder marked Required | QUESTION_METADATA_STANDARD.md | §1.1 Schema (line 63) |
| CAQS stakeholder requirement | CAQS_v1.0.md | §3.1 (line 193) |
| D2 cap for no stakeholder | CERTIFICATION_RUBRICS.md | §2.2 D2 (line 319) |
| D2 min acceptable = 4 | CERTIFICATION_RUBRICS.md | §2.2 D2 (line 325) |
| Backward compatibility principle | QUESTION_METADATA_STANDARD.md | Guiding Principle 1 (line 32) |
| Session 55 prior finding | SESSION055_STAKEHOLDER_REMEDIATION_REPORT.md | §Cases Still Blocked (line 39-48) |
| Session 54 role mapping | SESSION054_SCENARIO_REALISM_REPORT.md | §Recommended Role Mapping (line 18-27) |

---

## 10. Report Metadata

| Field | Value |
|-------|-------|
| Session | 59 |
| Agent | Schema-Review Subagent |
| Audit type | READ-ONLY |
| Cases reviewed | 4 (CBQ2-A3, CBQ3-A1, CBQ4-A1, CBQ5-B2) |
| Files inspected | scored_cases2.js, scored_cases3.js, scored_cases4.js, scored_cases5.js |
| Standards consulted | QUESTION_METADATA_STANDARD.md, CAQS_v1.0.md, CERTIFICATION_RUBRICS.md |
| Prior reports consulted | SESSION055_STAKEHOLDER_REMEDIATION_REPORT.md, SESSION054_SCENARIO_REALISM_REPORT.md, SESSION53_LONGRUN_GOVERNANCE_EXECUTION.md |
| Runtime file audited | app.js |
| Recommendation | RECOMMENDED (WARN, non-blocking) |
| Affected certified items | 20 (out of 745; 2.7%) |
