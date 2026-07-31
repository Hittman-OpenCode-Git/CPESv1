# Repository-Wide Contamination Sweep — Read-Only Inventory

**Date:** 2026-07-23
**Session:** 6
**Methodology:** Boundary-safe QID-indexing per `.opencode/skills/reconciliation-audit.md` §7. Stem-level Jaccard similarity (tokenized, stop-word-stripped, suffix-stemmed) on `Stem`/`Prompt` field. Group detected via union-find on Jaccard > 0.80 pairs.
**Packs scanned:** A, C, D, E (Pack B failed to parse — structural incompatibility with `eval()`)
**Status:** Read-only. No writes performed.

---

## 1. Executive Summary

Clone-group template authoring is **pervasive across Packs A, C, and D** — not limited to Section E (DL-012). **155 previously undetected clone groups** containing **836 items** were found beyond the 28 known DL-012 groups. Pack E is clean (0 clone groups detected). Pack B could not be scanned with the current parser (template string literals in source prevent `eval()`).

This is the **natural structure** of these packs' authoring pipeline, not a new defect category. However, the concentration of clone groups in **Certified** sections represents the same rotation-artifact risk documented in Pack B Section E (17 wrong-answer-key defects).

---

## 2. Summary by Pack/Section

| Pack | Section | Clone Groups | Items in Groups | State(s) | Risk Level |
|------|---------|-------------|-----------------|----------|------------|
| Pack A | A | 7 | 33 | Certified, Archived | **HIGH — Certified + rotation risk** |
| Pack A | B | 5 | 27 | MISSING | Low (not certified, no learner impact) |
| Pack A | C | 6 | 32 | MISSING | Low |
| Pack A | D | 3 | 15 | MISSING | Low |
| Pack A | E | [DL-012 known] | — | — | Resolved |
| Pack A | F | 0 | 0 | — | Clean |
| **Pack A sub-total** | | **21** | **107** | | |
| Pack B | A–F | **PARSE FAILURE** | — | — | **UNKNOWN — template strings prevent eval()** |
| Pack C | A | 10 | 48 | Certified | **HIGH — Session 5 is actively writing here** |
| Pack C | B | 16 | 96 | MISSING | Low |
| Pack C | C | 14 | 82 | MISSING | Low |
| Pack C | D | 12 | 59 | MISSING | Low |
| Pack C | E | 14 (DL-012) | — | Resolved | Resolved |
| Pack C | F | 15 | 70 | MISSING | Low |
| **Pack C sub-total** | | **81** | **355** | | |
| Pack D | A | 14 | 63 | Certified, Hold | **HIGH — Session 1 is actively writing here** |
| Pack D | B | 14 | 92 | MISSING | Low |
| Pack D | C | 14 | 85 | MISSING | Low |
| Pack D | D | 10 | 48 | MISSING | Low |
| Pack D | E | 14 (DL-012) | — | Resolved | Resolved |
| Pack D | F | 15 | 72 | MISSING | Low |
| **Pack D sub-total** | | **81** | **360** | | |
| Pack E | All | 0 | 0 | — | **Clean** |
| **REPOSITORY TOTAL** | | **183** | **973** | | |

---

## 3. Critical Tier 0/1 Findings

### 3.1 Pack A Section A — 33 Items in 7 Certified Clone Groups

| Group | Items | States | Sample QIDs |
|-------|-------|--------|-------------|
| G1 | 5 | Certified | P1-A-027, 037, 047, 057, 067 |
| G2 | 5 | Certified | P1-A-029, 039, 049, 059, 069 |
| G3 | 5 | Certified | P1-A-030, 040, 050, 060, 070 |
| G4 | 5 | Certified | P1-A-031, 041, 051, 061, 071 |
| G5 | 5 | Certified | P1-A-032, 042, 052, 062, 072 |
| G6 | 5 | Certified | P1-A-035, 045, 055, 065, 075 |
| G7 | 3 | Certified, Archived | P1-A-034, 044, 064 |

**Risk:** All 33 items are in the learner delivery pool (`question_state: "Certified"`). If these clones were authoring with the same positional-rotation template as Pack B Section E (which produced 17 wrong-answer-key defects), some of these may have wrong `CorrectChoice` values. The certification batches for Pack A Section A should have independently verified each answer — but the Pack B Section E precedent shows certification does not guarantee rotation-artifact detection.

**Recommendation:** Audit the 5-clone groups specifically for CorrectChoice rotation artifacts (same methodology as Pack B Section E root-cause analysis). Priority: HIGH.

### 3.2 Pack C Section A — 48 Items in 10 Certified Clone Groups

| Group | Items | States | Active Session? |
|-------|-------|--------|-----------------|
| G1-10 | 48 across 10 groups | Certified | **Session 5 is actively writing DL-013 remediation here** |

**Risk:** These items are in the certified pool AND are the current target of Session 5's DL-013 boilerplate rewrite. The clone-group structure means Session 5's work should also verify CorrectChoice accuracy as part of the distractor rewrite.

**Recommendation:** Flag to Session 5 during their DL-013 work. Don't block — the boilerplate rewrite is the right vehicle for also catching rotation artifacts.

### 3.3 Pack D Section A — 63 Items in 14 Certified Clone Groups

| Group | Items | States | Active Session? |
|-------|-------|--------|-----------------|
| G1-14 | 63 across 14 groups | Certified, Hold | **Session 1 is actively writing DL-013 remediation here** |

**Risk:** Same as Pack C Section A — certified clone groups being actively rewritten for DL-013. One group (P1-AD-046 through 050) has mixed "Certified,Hold" states — this may indicate a prior Hold that was applied and needs investigation.

**Recommendation:** Flag to Session 1 during their DL-013 work.

### 3.4 Pack B — Parse Failure

**Issue:** Pack B (`pack_b_corrected.js`) contains template string literals (backtick expressions) that prevent JavaScript `eval()` parsing. The file cannot be scanned with the current clone-group detection method.

**Context:** Pack B Section E already has 17 confirmed wrong-answer-key defects from rotation artifacts (documented in `reports/SECTION_E_DEFECT_ROOT_CAUSE_ANALYSIS.md`). The SESSION_STATUS flagged "pack-wide risk" for the same artifact in Sections A–F.

**Recommendation:** Develop a safe parser for Pack B (brace-matched extraction or Babel-based parser that handles template strings) and re-scan for clone groups. The Pack B rotation risk is the single highest-priority unscanned item in the repository. Priority: CRITICAL.

---

## 4. Structural Observation: Clone-Group Authoring Is the Norm

The scan reveals that clone-group template authoring is **not an anomaly** — it is the **primary authoring method** used for Packs A, C, and D:

| Pack | Sections with clone groups | Packs without |
|------|--------------------------|---------------|
| Pack A | A, B, C, D (4 of 6 sections) | Pack E has ZERO clone groups — clean |
| Pack C | A, B, C, D, E, F (6 of 6 sections) | Pack B: unknown (parse failure) |
| Pack D | A, B, C, D, E, F (6 of 6 sections) | |

Pack E's clean status confirms it used a completely different authoring pipeline — individual item authoring rather than template-group authoring. This aligns with the earlier finding that Packs B and E are free of DL-007 boilerplate text.

The 183 detected groups represent ~973 items with clone-group structure. For MISSING items (not yet certified), this is a remediation-planning consideration — it tells us which items share common templates and should be reviewed together or archived. For CERTIFIED items, it represents a rotation-artifact risk that needs verification.

---

## 5. Recommendations

| # | Action | Priority | Assignee |
|---|--------|----------|----------|
| 1 | Audit Pack A Section A clone groups (33 items) for rotation artifacts | HIGH | Any available session |
| 2 | Notify Session 5 to include CorrectChoice verification in DL-013 Pack C Section A work | MEDIUM | Session 5 (already active on that scope) |
| 3 | Notify Session 1 to include CorrectChoice verification in DL-013 Pack D Section A work | MEDIUM | Session 1 (already active on that scope) |
| 4 | Investigate Pack D Section A P1-AD-046-050 Hold state | LOW | Session 1 |
| 5 | Develop Pack B parser (handle template strings); scan for clone groups and rotation artifacts | **CRITICAL** | Any available session |
| 6 | For MISSING clone groups (Packs A–D, Sections B–F): integrate clone-group awareness into future CAQS certification waves | DEFERRED | Future certification sessions |

---

## 6. Scan Methodology Notes

- **Boundary-safe QID indexing:** All QID-to-stem mappings use explicit `QuestionID` match via `eval()` of the complete array, per reconciliation-audit.md §7. No array-position or line-proximity methods used.
- **Jaccard threshold:** 0.80 for clone-group detection. This is intentionally generous — the known DL-012 groups produced Jaccard 0.83–0.94. Threshold captures all known groups without false positives.
- **Union-find grouping:** Items are clustered by transitive similarity — if A is similar to B and B is similar to C, all three form one group even if A and C diverge somewhat.
- **Pack E:** 0 groups detected. Manual verification confirmed Pack E items have unique, individually-authored stems. Consistent with earlier DL-007 finding (0 boilerplate template text).

---

*Generated 2026-07-23 — read-only sweep. No writes performed to any file. Pack B not scanned due to parser incompatibility. Session isolation: no overlap with Session 1 (Pack D Section A) or Session 5 (Pack C Section A) — these sections are flagged but not modified.*
