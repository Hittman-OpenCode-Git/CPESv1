# Sprint 5.6C.1 — Repository Integrity Report

**Date:** 2026-07-21
**Status:** All P0 Defects Resolved — Zero Errors

---

## 1. Duplicate CaseID Analysis

### Root Cause
Three CaseBanks (`scored_cases2.js`, `scored_cases3.js`, `scored_cases4.js`) each contained two cases sharing the same CaseID. In each file, the first case had `SectionTags` = A (External Financial Reporting Decisions) but its `CaseID` used the B prefix (Planning, Budgeting, and Forecasting), indicating a copy-paste error when the case was originally created.

### Repairs Applied

| File | Old CaseID | Old SectionTags | New CaseID | Reason |
|------|-----------|----------------|-----------|--------|
| `scored_cases2.js`[0] | CBQ2-B2 | External Financial Reporting Decisions | **CBQ2-A3** | Topic: ASC 606 Revenue Recognition & Receivables Valuation → Domain A |
| `scored_cases3.js`[0] | CBQ3-B2 | External Financial Reporting Decisions | **CBQ3-A1** | Topic: Lease Accounting & Classification → Domain A |
| `scored_cases4.js`[0] | CBQ4-B2 | External Financial Reporting Decisions | **CBQ4-A1** | Topic: Intangible Assets & Goodwill Impairment → Domain A |

### Changes Per Case
For each repaired case, the following identifiers were updated to match the new CaseID:
- `CaseID` (case-level)
- `ItemID` for each question item (e.g., `CBQ2-A3-Q1`...`CBQ2-A3-Q5`)
- `ExhibitID` (e.g., `CBQ2-A3-EX1`)
- All internal `CaseID` references within case and item objects
- `BlueprintDomain` → `"External Financial Reporting Decisions"`

### Identifier Mapping (Old → New)

| Old ItemID | New ItemID |
|-----------|-----------|
| CBQ2-B2-Q1 → CBQ2-B2-Q5 | CBQ2-A3-Q1 → CBQ2-A3-Q5 |
| CBQ3-B2-Q1 → CBQ3-B2-Q5 | CBQ3-A1-Q1 → CBQ3-A1-Q5 |
| CBQ4-B2-Q1 → CBQ4-B2-Q5 | CBQ4-A1-Q1 → CBQ4-A1-Q5 |

### Verification
- Regex scan of all 5 scored_cases files confirmed **zero remaining occurrences** of the old CaseIDs `CBQ2-B2`, `CBQ3-B2`, `CBQ4-B2` as full `CaseID` values.

---

## 2. Constitution Path Resolution

### Issue
`knowledge/PROJECT_CONSTITUTION.md` was not found by RepositoryValidator, which expects the file at `knowledge/00_PROJECT_CONSTITUTION.md`.

### Fix
Renamed to `knowledge/00_PROJECT_CONSTITUTION.md` to match the expected path pattern.

---

## 3. Final Validation Results

| Validator | Status | Errors | Warnings |
|-----------|--------|--------|----------|
| Repository Validator | **PASS** | 0 | 0 |
| Metadata Validator | WARN | 0 | 209 |
| Blueprint Validator | WARN | 0 | 381 |
| Difficulty Validator | WARN | 0 | 472 |
| Reference Validator | WARN | 0 | 99 |
| **Total** | | **0** | **1161** |

### Warning Breakdown

| Category | Count | Sprint | Notes |
|----------|-------|--------|-------|
| Explanation too short | 209 | Editorial backlog | Pre-existing; requires authoring |
| Topic not in domain list | 381 | Future (Sprint 5.6E) | Taxonomy alignment needed |
| Missing CognitiveLevel | 400 | Future (Sprint 5.6D) | Wave 3 migration target |
| EstimatedMinutes mismatch | 67 | Future (Sprint 5.6D) | Wave 3 calibration |
| Missing DifficultyScore | 4 | Future (Sprint 5.6D) | Wave 3 for CBQ2-A3, CBQ3-A1, CBQ4-A1, CBQ5-B2 |
| Difficulty distribution | 1 | Future (Sprint 5.6D) | Easy cases (25.3%) exceed 15% target |
| Unreferenced exhibits | 99 | Future | Exhibit data consumption rule |

---

## 4. Remaining Risks

### Known (deferred to future sprints)
1. **CBQ5-B2 Section mismatch** — `scored_cases5.js`[0] has `SectionTags` = B (External Financial Reporting Decisions) but CaseID = B2 (Planning, Budgeting, and Forecasting). Same pattern as the three repaired duplicates. Verify whether the first case needs a CaseID change or the SectionTags needs correction.
2. **Placeholder-topic cases** — scored_cases2.js has cases CBQ2-C1–F2 with single-letter topics ("C", "D", "E", "F") that never received content migration. These are flagged by BlueprintValidator as 5 items each with "Topic not in domain list."

### Mitigated
- Duplicate CaseIDs: **Zero remaining** (verified by regex audit)
- Constitution path: **Resolved** (00_PROJECT_CONSTITUTION.md exists and RepositoryValidator PASSES)
- Backups preserved: `.bak2` (Wave 1 original), `.bak3` (Wave 2 original), `.bak4` (pre-repair master)

---

## 5. Recommended Next Steps

1. **Sprint 5.6D** — Populate `CognitiveLevel`, `DifficultyScore`, and `EstimatedMinutes` calibration across all 75 cases (Wave 3 migration)
2. **Sprint 5.6E** — Taxonomy alignment: map existing Topic values to the controlled domain topic list
3. **Review CBQ5-B2 Section mismatch** — Confirm whether it should be CBQ5-A3 or if SectionTags is correct
