# Project Overview — CMA Part 1 Exam Simulator

**Version:** 1.0
**Status:** Active
**Authority:** PROJECT_CONSTITUTION.md
**Generated:** 2026-07-24

---

## 1. Purpose

This repository is a professional-quality Certified Management Accountant (CMA) Part 1 examination simulator. It provides a complete examination platform consisting of a question bank, integrated case studies, scoring engine, review engine, knowledge library, and AI-assisted quality assurance framework.

The goal is to produce the highest-quality open, AI-assisted CMA Part 1 examination simulator available — comparable to modern commercial CMA preparation platforms — while maintaining the highest standards of accounting accuracy, educational quality, and long-term maintainability.

---

## 2. Gold-Standard Goal

Every question and case study is subject to the Content & Assessment Quality Standard (CAQS v1.0, `knowledge/CAQS_v1.0.md`). Content that achieves **100/100 on the CAQS rubric** and satisfies every item on the Gold Standard Checklist is designated **Gold Standard**. The long-term goal is ≥50% Gold Standard content.

---

## 3. High-Level Architecture

### Runtime Core

| File | Purpose |
|------|---------|
| `app.js` | Single-page application: exam engine, scoring, session management, review, analytics, AI Review Coach |
| `index_updated.html` | Application shell: navigation tabs, view containers, pack loading |
| `styles.css` | All visual styling — responsive, accessibility-aware |

### Item Bank

| File | Content | Items | Certified |
|------|---------|-------|-----------|
| `pack_a_corrected.js` | MCQ Pack A (Sections A–F) | 500 | 204 |
| `pack_b_corrected.js` | MCQ Pack B (Sections A–F) | 500 | 350 |
| `pack_c_corrected.js` | MCQ Pack C (Sections A–F) | 500 | 175 |
| `pack_d_corrected.js` | MCQ Pack D (Sections A–F) | 500 | 248 |
| `pack_e_corrected.js` | MCQ Pack E (Sections A–F) | 500 | 101 |
| **Total MCQs** | | **2,500** | **1,078 (43.1%)** |

### Case Studies

| File | Content | Cases | Items | Certified |
|------|---------|-------|-------|-----------|
| `scored_cases.js` | Case Pack 1 | 15 | ~85 | 0 |
| `scored_cases2.js` | Case Pack 2 | 15 | ~85 | 0 |
| `scored_cases3.js` | Case Pack 3 | 15 | ~85 | 0 |
| `scored_cases4.js` | Case Pack 4 | 15 | ~85 | 0 |
| `scored_cases5.js` | Case Pack 5 | 15 | ~85 | 0 |
| **Total** | | **75** | **~425** | **0** |

### Scoring Model

- **MCQ component (75%):** Binary 0/1 scoring per item. No partial credit.
- **Case-study component (25%):** Per-item scoring with partial credit on multi-part items.
- **Composite score:** 0–500 scale, 360 passing threshold.
- **Delivery pool:** Only items with `question_state: "Certified"` are eligible for learner sessions (per CAQS v1.0 §1.7.1).

---

## 4. Repository Organization

| Directory | Purpose |
|-----------|---------|
| Root | Runtime application files + essential control files only |
| `docs/` | Documentation: project overview, schema, standards, policies |
| `governance/` | Governance: risk register, repository rules, session types |
| `knowledge/` | AI governance: constitution, CAQS, defect library, taxonomy, revision history, baselines |
| `ai/` | AI collaboration matrix, persona definitions, workflows |
| `reports/` | Session reports, audit reports, defect sweeps, reconciliation |
| `scripts/` | Validation, enrichment, utility scripts |
| `foundation/` | Formula master, exam blueprint |
| `review/` | Decision trees, exam traps, audit protocols |
| `backups/` | Timestamped backups of all pack and application files |
| `assets/` | Static assets (reserved) |
| `.opencode/` | OpenCode tooling configuration |

---

## 5. Current Baseline Status

**Overall Verdict (Session 55, 2026-07-24): MOSTLY STANDARDIZED WITH MINOR SCHEMA/DIFFICULTY DRIFT.**

| Metric | Value |
|--------|-------|
| All pack/case files parse successfully | Yes (10/10) |
| Zero duplicate QuestionIDs | Confirmed |
| Certified MCQ pool | 1,078 / 2,500 (43.1%) |
| Certified case-study pool | 0 / 75 (0%) |
| Items missing `question_state` | 1,101 (44%) |
| Difficulty labels in use | 3 of 5 (Moderate-Easy and Very Difficult absent) |
| Known open defects | DL-008, DL-013, DL-021, DL-025, DL-026, DL-028 |

Key remediation priorities (see Session 55 report and SESSION_STATUS_2026-07-23.md):
1. Pack C DL-008 on Certified items (learner-safety risk)
2. Add `question_state` to 1,101 unlabeled items
3. Rebalance difficulty distribution to 5-tier scale
4. Case-study pool calibration and certification

---

## 6. AI Review Session Rules

Per `docs/AI_REVIEW_SESSION_GUIDELINES.md` and `AGENTS.md`:

1. **Report and analyze first.** No content changes without explicit authorization.
2. **Read-only by default.** Exploratory and audit tasks operate read-only unless explicitly authorized.
3. **Backup before every write.** Mandatory per `knowledge/BACKUP_PROTOCOL.md`.
4. **Log every change.** All content changes, certifications, and defect resolutions must pair with a `knowledge/REVISION_HISTORY.md` entry.
5. **Cross-verify all claims.** Never accept self-reported "complete" or "clean" claims without raw file/line evidence.
6. **Prefer `task` agents over `delegate`.** `delegate` has been observed to fail silently on this project's file sizes.

---

## 7. Key Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Constitution | `knowledge/00_PROJECT_CONSTITUTION.md` | Highest authority — project purpose, principles, immutable rules |
| CAQS v1.0 | `knowledge/CAQS_v1.0.md` | Content quality standard — rubric, gates, Gold Standard definition |
| Metadata Standard | `knowledge/QUESTION_METADATA_STANDARD.md` | Canonical schema for all artifacts |
| Defect Library | `knowledge/DEFECT_LIBRARY.md` | All DL-001 through DL-033 entries |
| Current Baselines | `knowledge/CURRENT_BASELINES.md` | SHA-256 hashes of all runtime-critical files |
| Session Status | `reports/session_status/SESSION_STATUS_2026-07-23.md` | Current handoff log |
| Revision History | `knowledge/REVISION_HISTORY.md` | All certification and content change records |
| Taxonomy Registry | `knowledge/TAXONOMY_REGISTRY.md` | All permitted enumeration values |
| Formula Master | `foundation/FORMULA_MASTER.md` | All canonical formulas |
| Exam Blueprint | `foundation/EXAM_BLUEPRINT.md` | IMA CMA Part 1 Content Specification Outline mapping |
