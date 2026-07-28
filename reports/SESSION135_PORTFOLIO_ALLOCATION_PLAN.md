# SESSION135 — Portfolio Allocation Plan

**Generated:** 2026-07-26
**Status:** Active
**Applies to:** Post-S135 project resource allocation

---

## Allocation Overview

With the 100-series Platform Transition Program closed, project resources shift to the following prioritized lanes:

| Priority | Lane | Status | Scope |
|----------|------|--------|-------|
| **HIGH** | 500-series | Active | Case-bank certification. ENHANCED_CASE_BASE (90 items, wholly unprocessed). MIGRATED_CASE_BASE_D (75 items, partially certified at 30/75). |
| **HIGH** | 700-series | Active | Calibration governance. DL-031/DL-032 complete. DIFFICULTY_CALIBRATION_STANDARD.md maintenance. Cross-lane consistency. |
| **HIGH** | Cross-series defects | Active | DL-008 (67 Certified items blocked). DL-026 (50 In Audit items). DL-013 (~851 fields remaining). |
| **MEDIUM** | 100-series | Maintenance | May bug fixes, polish, governance. Feature-complete. |
| **MEDIUM** | Pack certification | Active | Pack A Sections B/C/F. Pack C Sections C-F. Pack D Sections C/E/F. |
| **LOW** | Application polish | As-needed | UI, CSS, responsive design, accessibility improvements. |

## 500-Series — Case Bank Certification

**Remaining work:**
- MIGRATED_CASE_BASE_D: 45 items remaining (CASE-D7 through CASE-D15, 9 cases × 5 items)
- ENHANCED_CASE_BASE: 90 items wholly unprocessed (19 cases in scored_cases.js)

**Estimated sessions:** 8-12 sessions at 15 items per wave

## 700-Series — Calibration Governance

**Status:** DL-031 (MCQ difficulty calibration) complete. DL-032 (case-bank difficulty calibration) complete.

**Ongoing:**
- DIFFICULTY_CALIBRATION_STANDARD.md maintenance
- Cross-lane consistency audits
- Calibration governance maturity assessments

## Cross-Series Defects

**Highest learner-safety priority:**
1. DL-008 — Clear 67 Certified items with non-empty ExplanationWrong[CorrectChoice]
2. DL-026 — Author distractor explanations for 50 Pack D Section C items
3. DL-013 — Continue boilerplate remediation (~851 fields)

## 100-Series — May Maintenance

**Posture:** Feature-complete. Bug fixes, threshold corrections, defect manifest updates, polish.

**Active files:** may-core.js, may-learner-state.js, test_tutoring_safety.js, test_may_stagec.js

**Governance:** Same rules as S131–S135 — no new coaching features, no prediction/readiness language, 353-test gate, REVISION_HISTORY entries required.

---

*S135 — Portfolio allocation plan active.*
