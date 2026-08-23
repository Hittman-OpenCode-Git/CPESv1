# Part 2 Case-Study Material Library — Index

**Status:** Active — under construction (volumes ship as built)
**Authority:** PROJECT_CONSTITUTION.md, CAQS_v1.0.md, P2002/P2003 standards (post-remediation, 2026-08-22)
**Purpose:** Single reference library for authoring, reviewing, and certifying CMA Part 2 case studies. Attach the relevant volumes to every case-authoring run.

---

## 1. Volume Map

| Volume | Title | Status | Contents |
|--------|-------|--------|----------|
| 00 | Library Index | Done | This file |
| 01 | Case Schema & Structure | Done | CBQ21 ID conventions, full case/item/exhibit schemas, validation rules, complete case exemplar |
| 02 | Content Map — A: Financial Statement Analysis | Done | LOS → subtopics → theories → formulas → case scenarios → exhibit types |
| 03 | Content Map — B: Corporate Finance | Done | Same structure; carries 7 of 9 zero-hit theory targets |
| 04 | Content Map — C: Decision Analysis | Done | Same structure; deepest case-coverage priority (25% exam weight) |
| 05 | Content Map — D: Risk Management | Done | Same structure |
| 06 | Content Map — E: Investment Decisions | Done | Same structure |
| 07 | Content Map — F: Professional Ethics | Done | Same structure; scenario-first (no computational formulas) |
| 08 | Case Quality Standards | Done | Scenario/exhibit/progression/realism/anti-AI rules + certification blockers |
| 09 | Formula Catalog | Done | All 59 Part 2 formulas (generated from P2005_FORMULA_MASTER.json post-remediation) |
| 10 | Topic Inventory by Section | Done | Complete 495-item MCQ topic vocabulary, by section (generated) |
| 11 | Authoring Cautions & Workflow | Done | Defect-library lessons as authoring cautions + pipeline + external-review handoff |

---

## 2. Source-of-Truth Chain (post-remediation, verified 2026-08-22)

| Layer | Source | Verified |
|-------|--------|----------|
| Blueprint (weights/LOS) | `p2/P2_RESEARCH_SECTIONS_TOPICS_THEORIES.md` + `p2/P2002_BLUEPRINT_EXTRACTION.json` | 43 LOS codes, weights = 100%, IMA CSO Sept 2024 |
| Formulas | `p2/P2005_FORMULA_MASTER.json` (59 formulas) | External review + remediation (DL-P2-012) |
| Case identifiers | `p2/P2002_REPOSITORY_LAYOUT.md` (CBQ2\d- required pack digit) | Collision with Part 1 Pack 2 resolved |
| MCQ QID ranges | `p2/P2003_QID_STANDARD.md` (6 packs, D/E regex fixed) | Regex tested 001–250 |
| Case metadata | `knowledge/QUESTION_METADATA_STANDARD.md` Parts 1–3, 5, 9 | Enums reconciled (Moderate-Easy, Evaluate) |
| Case quality | `knowledge/CAQS_v1.0.md` §3; `knowledge/03_content_authoring/CASE_STUDY_GOLD_STANDARD.md`; `CASE_STUDY_SCORING_RUBRIC.md` | Part 1 precedent + P2 adaptations |
| MCQ schema (cross-ref) | `p2/P2_SCHEMA_STANDARD.md` | — |

**Rule:** if any source above is revised, regenerate volumes 09–10 and re-check every map that references it.

---

## 3. Authoring Workflow (which volume to open, in order)

1. **Pick a section + LOS** — open the section's content map (02–07), choose an uncovered or thin LOS.
2. **Check topics/subtopics** — the map's topic tree + volume 10 for the existing MCQ vocabulary.
3. **Lock the theories** — the map's theory table; zero-hit theories are priority targets.
4. **Lock the formulas** — the map's formula table + volume 09 for notation, rounding, tolerance, traps.
5. **Draft the case skeleton** — volume 01 for schema + ID conventions; use the scenario banks in the map.
6. **Apply quality standards** — volume 08 before, during, and after drafting.
7. **Run the cautions checklist** — volume 11 before declaring an item done.
8. **Certification** — six-dimension verification per CAQS §1.6; log per the governance rules in volume 11.

---

## 4. Coverage Priorities (from the SoT verification)

1. **Zero-hit theories** (must be addressed by case studies): APT, EMH, bird-in-hand, tax-preference, Miller-Orr, shadow price, Treynor, Higgins, Fama — assignments marked in maps B (7), C (1), A (1).
2. **Thin MCQ LOS** needing case reinforcement: A.6 (1 item), A.7 (2), A.8 (1), A.9 (4), C.4 (3), C.7 (3), D.3 (4), E.6 (3).
3. **Section C** carries 25% exam weight with only 75/495 MCQs — deepest case-coverage target.
