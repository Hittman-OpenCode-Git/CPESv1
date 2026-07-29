# SESSION066 — Candidate Release Certification Decision

**Session:** S66
**Type:** Release-Board Decision
**Date:** 2026-07-28
**Decision:** **READY WITH WARNINGS**

---

## Decision

The CMA Part 1 Exam Simulator is **READY WITH WARNINGS** for candidate use. A candidate can take a full 100-MCQ + 2-case exam tonight. The learner pool is safe, the application is synchronized, and no blocking defects remain. Two non-blocking caveats are documented below.

---

## Rationale

### Critical Checks — ALL PASS

- **MCQ pack parsing:** All 5 packs (A-E) pass `node --check` clean. All 5 require() successfully.
- **Case pack parsing:** All 3 reconsolidated case packs pass `node --check` clean.
- **app.js parsing:** Passes `node --check` clean.
- **Learner pool safety:**
  - DL-008 (non-empty ExplanationWrong[CorrectChoice]): 0 violations — CLEAN
  - DL-026 (empty distractor ExplanationWrong on Certified items): 0 certified items affected — CLEAN
  - DL-030 (answer-key errors): 0 remaining — CLEAN
  - DL-035 (Certified Domain F with DL-026): 0 remaining — CLEAN
  - DL-037 (logic inversions): 0 remaining — CLEAN
  - Known defective FD-046 is Active/not Certified — excluded from learner pool
- **Governance guard:** 54/54 tests PASS. Rules 1-10 active.
- **Application synchronization:** Pack A restored in index_updated.html. Hero text updated to "2,545 MCQs / 75 cases."
- **Pre-delivery safety check:** PASS — 2,451/2,451 Certified MCQs are safe for delivery.

### Non-Blocking Warnings

1. **Domain F case coverage gap:** CASE_BANK_F is not defined by any of the three reconsolidated case packs. Domains A-E are fully covered (CASE_BANK_A through CASE_BANK_E aliases all defined), but candidates selecting Domain F for case-based practice receive an empty pool. Domain F MCQ content is fully available (section F items in packs A-E). Domain F case studies exist in the original scored_cases files but were not reconsolidated into the loaded case packs.

2. **Original scored_cases files have parse errors:** `scored_cases.js` (line 675: missing comma) and `scored_cases5.js` (line 486: misplaced properties) fail `node --check`. These files are NOT loaded by index_updated.html (which uses the reconsolidated case_pack files), so this is dead-code risk with zero runtime impact. These files violate the PROJECT_CONSTITUTION.md §11 root-directory cleanliness requirement.

---

## Key Metrics

| Metric | Count |
|--------|-------|
| Total MCQ QIDs (all packs) | 2,545 |
| Certified MCQs | 2,451 |
| Non-Certified MCQs | 94 (89 in Packs C/D + 5 EVAL in Pack E) |
| Case packs loaded | 3 (case_pack_1/2/3_corrected.js) |
| Cases available | 75 (25 per pack) — all Certified |
| Case items | 400 — all Certified |
| MCQ sections covered | A-F (all 6) |
| Case sections covered | A-E (5 of 6; F unavailable) |
| DL-008 remaining | 0 |
| DL-026 (Certified) | 0 |
| DL-030 remaining | 0 |
| DL-035 remaining | 0 |
| DL-037 remaining | 0 |
| Governance guard tests | 54 PASS / 0 FAIL |
| Rules active | 1-10 |

---

## Answers to the Five Questions

### Q1: Can a candidate take a full CMA Part 1 exam tonight?

**Yes.** A candidate can select "Full Part 1 Simulation: 100 MCQs + 2 cases" from the session setup form. The delivery pool draws from 2,451 Certified MCQs across all 6 domains and 75 Certified cases across 5 domains. The exam timer, navigator, review-before-submit, score report, and remediation features are all functional.

### Q2: Do application counts and repository counts agree?

**Yes, with one caveat.** The application hero text reports 2,545 MCQs and 75 cases. Repository counts confirm:
- 2,545 MCQ QIDs (Select-String on all 5 pack files)
- 75 case objects across 3 reconsolidated case packs
- 400 case items (Select-String ItemID across all 3 case packs = 400)

Caveat: The original scored_cases files (5 files, not loaded by runtime) have 197 unique CaseIDs. The 75-case count in the reconsolidated packs represents a deliberate consolidation.

### Q3: How many certified MCQs are available?

**2,451.** Direct grep across all 5 pack files: `Select-String -Path pack_*_corrected.js -Pattern '"question_state": "Certified"'`.

Breakdown:
- Pack A: 500
- Pack B: 500
- Pack C: 455
- Pack D: 456
- Pack E: 540 (500 standard + 40 R-series supplemental)

### Q4: How many certified case studies are available?

**75 cases (400 items).** All 75 cases carry `question_state: "Certified"`. All 400 items carry `question_state: "Certified"`. Confirmed: 475 total `"question_state": "Certified"` references in reconsolidated packs = 75 case-level + 400 item-level.

### Q5: Is the build READY FOR EXAM / READY WITH WARNINGS / NOT READY?

**READY WITH WARNINGS.** All critical checks pass. A candidate can take a full CMA Part 1 exam tonight with a safe learner pool and synchronized application. Two non-blocking warnings exist: (1) Domain F has no case-study content loaded, and (2) two dead-code original scored_cases files fail parse checks but are not loaded by the runtime.

---

## Night Rule

**CONTINUE WITH CAVEATS.** Development may continue on post-release items. The two warnings (Domain F case gap, scored_cases parse errors) should be addressed but do not block exam delivery. The learner pool is frozen-safe: any new development that modifies pack files must pass governance guard Rules 1-10.

---

## Verification Evidence

- `node --check` clean: packs A-E, case_packs 1-3, app.js
- `Select-String '"QuestionID"'` on pack_* = 2,545
- `Select-String '"question_state": "Certified"'` on pack_* = 2,451
- `Select-String '"ItemID"'` on case_pack_* = 400
- `Select-String '"question_state": "Certified"'` on case_pack_* = 475
- `node scripts/test_governance_guard.js` = 54 PASS, 0 FAIL
- Pack A present at index_updated.html line 2
- Hero text: "2,545 Part 1 MCQs" / "75 integrated case studies"
