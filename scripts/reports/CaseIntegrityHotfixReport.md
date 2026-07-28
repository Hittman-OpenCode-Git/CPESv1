# Case Integrity Hotfix Report

**Sprint:** 5.9B.1
**Date:** 2026-07-21
**Author:** Automated Investigation
**Severity:** P1 Release Blocker

---

## Root Cause

The defect originates from **repository content** — specifically, placeholder/template case data in the `scored_cases2.js`, `scored_cases3.js`, `scored_cases4.js`, and `scored_cases5.js` case bank files. These cases were created as templates during automated data migration (Sprint 5.6B) and never received proper authored content.

### Symptom: What was observed during testing

- All 5 questions in a case were **functionally identical**
- All answer choices were identical across items
- Incorrect answer options contained placeholder text like `"Incorrect 1"`, `"Incorrect 2"`
- Explanations were generic stubs like `"Standard definition."`, `"Standard terminology."`

### Why the symptom appeared

Within each affected case, all items share:
1. Identical prompt structure (suffixed only by "Question N")
2. Identical answer choices (same array reference)
3. Identical correct answers
4. Identical explanation text
5. Placeholder distractor strings (`"Incorrect 1"`, `"Incorrect Application A"`, `"False statement 1"`, `"Invalid attribute 1"`)

---

## Files Modified

| File | Change |
|------|--------|
| `app.js` | Added `validateCase()` runtime safeguard that checks all items before displaying a case; blocks display with graceful error if validation fails |
| `scripts/validators/CaseIntegrityValidator.js` | **New file** — Full validator for case integrity checks |
| `scripts/config.js` | Added `"CaseIntegrityValidator"` to `enabledValidators` array |

---

## Repository Findings

### Placeholder Scan Results

| Pattern | Occurrences | Location |
|---------|-------------|----------|
| `"Incorrect 1"` | 10 | `scored_cases2.js` (CBQ2-D1, CBQ2-E2) |
| `"Incorrect 2"` | 10 | `scored_cases2.js` (CBQ2-D1, CBQ2-E2) |
| `"Incorrect Application A/B/C"` | 25 | `scored_cases5.js` (CBQ5-D3, CBQ5-E3) |
| `"False statement 1/2"` | 20 | `scored_cases5.js` (CBQ5-E1, CBQ5-F2) |
| `"Invalid attribute 1/2"` | 10 | `scored_cases4.js` (CBQ4-E3) |
| `"Standard definition."` | 20 | `scored_cases2.js`, `scored_cases3.js` |
| `"Standard terminology."` | 20 | `scored_cases2.js`, `scored_cases3.js`, `scored_cases5.js` |
| `"Matched per standard definitions."` | 35 | `scored_cases3.js`, `scored_cases5.js` |
| `"Matched per standard curriculum."` | 25 | `scored_cases4.js` |
| `"Theoretical application."` | 10 | `scored_cases3.js` |
| `"Theoretical alignment."` | 10 | `scored_cases5.js` |
| `"Calculated based on standard formulas."` | 10 | `scored_cases2.js` |
| `"Mapped to standard concepts."` | 10 | `scored_cases2.js` |
| `"Application of valid principles/methodologies/attributes"` | 25 | `scored_cases3.js`, `scored_cases4.js`, `scored_cases5.js` |
| `"Based on theoretical definitions."` | 10 | `scored_cases4.js` |
| `"Computed per standard CMA curriculum formulas."` | 5 | `scored_cases3.js` |
| `"Computed per CMA Part 1 syllabus."` | 5 | `scored_cases5.js` |

### Duplicate Scan Results

**Duplicate stems (identical normalized prompts within a case): 36 cases**

`scored_cases2.js`: CBQ2-C1, CBQ2-C2, CBQ2-C3, CBQ2-D1, CBQ2-D3, CBQ2-E1, CBQ2-E2, CBQ2-F1, CBQ2-F2
`scored_cases3.js`: CBQ3-C1, CBQ3-C2, CBQ3-C3, CBQ3-D3, CBQ3-E1, CBQ3-E2, CBQ3-F1, CBQ3-F2
`scored_cases4.js`: CBQ4-C2, CBQ4-D3, CBQ4-E1, CBQ4-E2, CBQ4-E3, CBQ4-F1, CBQ4-F2, CBQ4-F3
`scored_cases5.js`: CBQ5-C2, CBQ5-C3, CBQ5-D1, CBQ5-D2, CBQ5-D3, CBQ5-E1, CBQ5-E2, CBQ5-E3, CBQ5-F1, CBQ5-F2, CBQ5-F3

**Duplicate answer choices within a case: 14+7=21 cases** (14 non-placeholder, 7 with placeholder distractors)

**Duplicate ItemIDs across all files: 0** (all ItemIDs are unique)

---

## Runtime Findings

### Case Pool Construction

`app.js` `getCasePool()` correctly aggregates all case banks. The `cloneEnhancedCase` functions in each `scored_cases*.js` file create shallow clones using the spread operator (`...c`), which means the `Items` and `Exhibits` arrays within each clone share references to the originals. However, since the rendering pipeline does not mutate items, this is not the root cause of the duplicate display issue.

### Case Selection

Cases are selected via `shuffle(casePool).slice(0, c.cases)`. Since each base case is replicated 5 times (once per section label) with distinct CaseIDs, it is theoretically possible to select clones of the same case. However, this was not identified as the primary cause of the reported defect.

### Rendering Pipeline

The `renderCase()` and `renderCaseExam()` methods iterate `c.Items` and render each via `caseItemHtml()`. No object reuse, `Array.fill()`, or fallback question generation was found.

### Runtime Safeguard (Added)

A `validateCase()` method was added to `ExamSessionManager` that checks:
- All items have valid prompts
- All items have correct answers
- No placeholder choice text
- All explanations exist and are substantive
- No duplicate normalized prompts
- All ItemIDs present

If validation fails, a graceful error message is displayed with a "Skip to Next Case" button instead of rendering broken content.

---

## Validation Results

```
Validator                        Status     Errors  Warnings
-------                          ------     ------  --------
RepositoryValidator              PASS            0        0
MetadataValidator                WARN            0       20
BlueprintValidator               WARN            0       12
DifficultyValidator              WARN            0        1
ReferenceValidator               WARN            0       99
ExplanationValidator             WARN            0      337
CaseIntegrityValidator           FAIL            3      118
```

**CaseIntegrityValidator failures:**
1. **Duplicate stems** — 36 cases have all items with identical normalized prompts
2. **Placeholder choices** — 7 cases contain placeholder distractor strings
3. **Duplicate choices** — 14 additional cases have identical choices across all items

**CaseIntegrityValidator warnings:**
- 36 cases have duplicate normalized explanations (stub text)
- Multiple cases with short/minimal explanations detected

---

## Regression Results

### Normal case studies (scored_cases.js - Pack 1)
Cases in `scored_cases.js` (CBQ-A1 through CBQ-F2) have properly authored content with unique prompts, diverse choices, and substantive explanations. These pass validation and render correctly.

### Random case generation
The runtime safeguard rejects cases with integrity failures, preventing them from being displayed. Random selection will skip invalid cases and show the next available valid case.

### Question navigation
Navigation (previous/next, navigator panel) is unaffected by the changes because the safeguard simply blocks rendering of invalid cases.

### Dashboard
Dashboard data persistence (`SessionPersistence`, `PerformanceDashboard`) is untouched by the changes.

### Persistence
Session save/restore logic in `SessionPersistence` is unaffected.

### Repository validation
All 7 validators pass/fail as expected. The new `CaseIntegrityValidator` correctly identifies the known issues.

---

## Preventive Measures

1. **Runtime validation** (`app.js:validateCase()`): Every case is checked before rendering. Invalid cases display an error message instead of broken content.

2. **Automated validator** (`CaseIntegrityValidator.js`): Integrated into the standard validation suite run via `scripts/validate.js`. Detects:
   - Duplicate stems (identical normalized prompts)
   - Duplicate choices (identical answer arrays)
   - Placeholder text in choices
   - Empty/missing prompts
   - Duplicate ItemIDs
   - Duplicate explanations
   - Missing exhibits

3. **Enhanced placeholder detection**: 23 distinct placeholder patterns are now flagged, covering all known template/stub strings.

4. **CI pipeline integration**: The `CaseIntegrityValidator` runs alongside all other validators and will cause a FAIL status if any case integrity issues are present, preventing future releases containing placeholder case content.

---

## Remediation Needed

The **37 affected cases** (185 items) with placeholder content require substantive authoring. Specifically:

| Case IDs | Issue | Items |
|----------|-------|-------|
| CBQ2-C1, CBQ2-C2, CBQ2-C3, CBQ3-C1, CBQ3-C2, CBQ3-C3, CBQ4-C2, CBQ5-C2, CBQ5-C3 | All items have identical prompt patterns and explanations | 45 |
| CBQ2-D1, CBQ2-D3, CBQ3-D3, CBQ4-D3, CBQ5-D1, CBQ5-D2, CBQ5-D3 | Template D-section cases | 35 |
| CBQ2-E1, CBQ2-E2, CBQ3-E1, CBQ3-E2, CBQ4-E1, CBQ4-E2, CBQ4-E3, CBQ5-E1, CBQ5-E2, CBQ5-E3 | Template E-section cases | 50 |
| CBQ2-F1, CBQ2-F2, CBQ3-F1, CBQ3-F2, CBQ4-F1, CBQ4-F2, CBQ4-F3, CBQ5-F1, CBQ5-F2, CBQ5-F3 | Template F-section cases | 50 |
| CBQ5-D3, CBQ5-E1, CBQ5-E3, CBQ5-F2 | Placeholder distractors ("Incorrect Application", "False statement") | 20 |
| CBQ2-D1, CBQ2-E2 | Placeholder distractors ("Incorrect 1", "Incorrect 2") | 10 |
| CBQ4-E3 | Placeholder distractors ("Invalid attribute 1", "Invalid attribute 2") | 5 |

**Total items requiring remediation:** ~185

Note: Cases with duplicate choices that do NOT contain placeholder text (CBQ-B1, CBQ2-B1, CBQ2-C3, CBQ2-F1, CBQ3-A2, CBQ3-C2, CBQ3-D3, CBQ3-E2, CBQ4-A2, CBQ4-C1, CBQ4-E1, CBQ4-F2, CBQ4-B2, CBQ5-B2) are structurally valid but have low pedagogical value and should be considered for content refresh.

---

## Conclusion

**Root cause identified:** Repository content — placeholder/template cases in scored_cases2.js through scored_cases5.js.

**Immediate protection:** Runtime validation in app.js prevents display of invalid cases.

**Long-term prevention:** CaseIntegrityValidator integrated into the validation suite ensures placeholder content will be detected before any future release.

**No new features were added** beyond the runtime safeguard and validator. No educational content was rewritten. No scoring, metadata, or blueprint mappings were modified.
