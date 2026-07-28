# DL-013 Remaining Remediation Proposal — Sections B-F (704 QIDs)

**Date:** 2026-07-23
**Session:** Session 5 — Read-only boundary-safe scan
**Status:** Proposal — no execution authorized
**Predecessor:** DL-013 Pack C/D Section A (ALREADY COMPLETE via parallel certification)
**Method:** Boundary-safe QID-indexing per `.opencode/skills/reconciliation-audit.md` §3a
**Cross-reference:** `knowledge/DEFECT_LIBRARY.md` §DL-013, `reports/DL013_REMEDIATION_PROPOSAL.md` (Section A proposal — now superseded)

---

## 1. Pre-Flight Verification

| Check | Result |
|-------|--------|
| Scan method | Boundary-safe: each QuestionID → next QuestionID block |
| Packs scanned | A, C, D (B and E already confirmed template-free) |
| Sections in scope | B, C, D, E, F (Section A already resolved in all packs) |
| **Certified items with template text** | **0** — learner pool clean. No STOP condition. |
| DL-012 archived items overlap | Sections E of Pack C/D — see §2.3 |

### 1.1 Count Reconciliation

| Source | Count | Type |
|--------|-------|------|
| DEFECT_LIBRARY.md DL-013 (original) | 2,587 | ExplanationWrong field occurrences |
| After parallel Section A clear (Pack C: -195, Pack D: -216) | ~2,176 | Field occurrences |
| **This scan (boundary-safe QID-indexing)** | **704** | **Unique QIDs** (~2,112 fields at 3/QID) |
| Difference (stale residues) | ~64 fields | Likely counted items already fixed or in non-B-F sections |

---

## 2. Per-Pack, Per-Section Breakdown

### 2.1 Pack A (116 contaminated QIDs)

| Section | Total Items | Contaminated | Clean | Density |
|---------|------------|-------------|-------|---------|
| B | 100 | 41 | 59 | 41.0% |
| C | 100 | 38 | 62 | 38.0% |
| D | 75 | 24 | 51 | 32.0% |
| E | 75 | 13 | 62 | 17.3% |
| F | 75 | 0 | 75 | 0.0% |
| **Total** | **425** | **116** | **309** | **27.3% avg** |

### 2.2 Pack C (301 contaminated QIDs)

| Section | Total Items | Contaminated | Clean | Density | Notes |
|---------|------------|-------------|-------|---------|-------|
| B | 100 | 57 | 43 | 57.0% | |
| C | 100 | 81 | 19 | **81.0%** | |
| D | 75 | 60 | 15 | **80.0%** | |
| E | 75 | 56 | 19 | 74.7% | **All 56 = DL-012 archived clones** (§2.3) |
| F | 75 | 47 | 28 | 62.7% | |
| **Total** | **425** | **301** | **124** | **70.8% avg** |

### 2.3 Pack D (287 contaminated QIDs)

| Section | Total Items | Contaminated | Clean | Density | Notes |
|---------|------------|-------------|-------|---------|-------|
| B | 100 | 51 | 49 | 51.0% | |
| C | 100 | 86 | 14 | **86.0%** | **Highest density anywhere** |
| D | 75 | 37 | 38 | 49.3% | |
| E | 75 | 61 | 14 | 81.3% | **56 of 61 = DL-012 archived clones**; 5 non-archived contaminated (§2.3) |
| F | 75 | 52 | 23 | 69.3% | |
| **Total** | **425** | **287** | **138** | **67.5% avg** |

---

## 2.3 DL-012 Archived Item Overlap — Sections E

| Pack | Section | Contaminated QIDs | DL-012 Archived | Non-Archived Contaminated | Remediation Priority |
|------|---------|-------------------|----------------|--------------------------|---------------------|
| Pack C | E | 56 | **56** (100%) | 0 | **DEFER** — all archived; template text is documentation debt only |
| Pack D | E | 61 | 56 (91.8%) | **5** | 5 non-archived items need remediation |
| **Total** | | **117** | **112** | **5** | |

The 5 non-archived Pack D Section E items are likely standalone unique items or group leaders that were not part of the DL-012 clone groups. They are in the `Unprocessed` state and block certification.

---

## 3. Density Ranking — Remediation Priority

Excluding DL-012 archived items (112 Pack C/D Section E) and Pack A Section F (0 contaminated):

| Rank | Pack | Section | Total | Contaminated | Density | Priority | Rationale |
|------|------|---------|-------|-------------|---------|----------|-----------|
| 1 | **D** | **C** | 100 | 86 | **86.0%** | P1 | Highest density — mirrors Section A 96% pattern |
| 2 | **C** | **C** | 100 | 81 | **81.0%** | P1 | Second-highest; same section, different pack |
| 3 | **C** | **D** | 75 | 60 | **80.0%** | P1 | Pack C Section D nearly uniform |
| 4 | **D** | **F** | 75 | 52 | **69.3%** | P1 | Technology & Analytics — Section F |
| 5 | **C** | **F** | 75 | 47 | **62.7%** | P1 | Same section, different pack |
| 6 | **C** | **B** | 100 | 57 | **57.0%** | P2 | Planning/Budgeting |
| 7 | **D** | **B** | 100 | 51 | **51.0%** | P2 | |
| 8 | **D** | **D** | 75 | 37 | **49.3%** | P2 | Cost Management |
| 9 | **A** | **B** | 100 | 41 | **41.0%** | P2 | Pack A has mixed certification states |
| 10 | **A** | **C** | 100 | 38 | **38.0%** | P2 | |
| 11 | **A** | **D** | 75 | 24 | **32.0%** | P2 | |
| 12 | **A** | **E** | 75 | 13 | **17.3%** | P3 | Low density; Pack A E has certified seeds |
| — | **D** | **E** | 75 | 5* | 6.7%* | P3 | Only 5 non-archived contaminated |
| — | **C** | **E** | 75 | 0* | 0.0%* | DEFER | All 56 archived |
| — | **A** | **F** | 75 | 0 | 0.0% | DONE | Already clean |

*Excluding DL-012 archived items.

---

## 4. Proposed Batch Plan — Parallel Task-Agent Execution

### 4.1 Strategy

Following the Section A precedent: validate editorial quality on one ~20-25 item batch first, then consolidate remaining batches per section. Each batch processed by a task agent (read stems/choices, write 3 choice-specific distractor explanations, apply edits).

**Batch sizing:** 20-25 items per task agent × 3 ExplanationWrong fields = 60-75 fields per batch. This matches the Section A precedent where ~20-item batches fit within a single task-agent context window.

### 4.2 Priority 1 — Execution Order (374 items, ~16 batches)

| Phase | Batch | Pack | Section | QIDs | Items | Priority |
|-------|-------|------|---------|------|-------|----------|
| **Validate** | **V1** | D | C | P1-DC-001–025 | 25 | First — validate pattern |
| Execute | 1A | D | C | P1-DC-026–050 | 25 | After V1 clean |
| Execute | 1B | D | C | P1-DC-051–075 | 25 | |
| Execute | 1C | D | C | P1-DC-076–100 | 11 | |
| Execute | 2A | C | C | P1-CC-001–025 | 25 | Pack C Section C |
| Execute | 2B | C | C | P1-CC-026–050 | 25 | |
| Execute | 2C | C | C | P1-CC-051–075 | 25 | |
| Execute | 2D | C | C | P1-CC-076–100 | 6 | |
| Execute | 3A | C | D | P1-DC-001–025 | 25 | Pack C Section D |
| Execute | 3B | C | D | P1-DC-026–050 | 25 | |
| Execute | 3C | C | D | P1-DC-051–075 | 10 | |
| Execute | 4A | D | F | P1-FD-001–025 | 25 | Pack D Section F |
| Execute | 4B | D | F | P1-FD-026–050 | 25 | |
| Execute | 4C | D | F | P1-FD-051–075 | 2 | |
| Execute | 5A | C | F | P1-FC-001–025 | 25 | Pack C Section F |
| Execute | 5B | C | F | P1-FC-026–050 | 22 | |

### 4.3 Priority 2 — (352 items, ~14 batches)

| Batch | Pack | Section | QIDs | Items |
|-------|------|---------|------|-------|
| 6A–6D | C | B | P1-BC-001–100 | 57 (25+25+7) |
| 7A–7C | D | B | P1-BD-001–100 | 51 (25+25+1) |
| 8A–8B | D | D | P1-DD-001–075 | 37 (25+12) |
| 9A–9B | A | B | P1-B-001–100 | 41 (25+16) |
| 10A–10B | A | C | P1-C-001–100 | 38 (25+13) |
| 11A | A | D | P1-D-001–075 | 24 |

### 4.4 Priority 3 — Low Density / Deferred (18 items, ~2 batches)

| Batch | Pack | Section | QIDs | Items |
|-------|------|---------|------|-------|
| 12A | A | E | P1-E-001–075 | 13 |
| 13A | D | E | (non-archived only) | 5 |

### 4.5 Total Scope

| Phase | Items | Batches (est.) | Fields |
|-------|-------|---------------|--------|
| Priority 1 | 374 | ~16 | ~1,122 |
| Priority 2 | 352 | ~14 | ~1,056 |
| Priority 3 | 18 | ~2 | ~54 |
| **Total** | **744** | **~32** | **~2,232** |

Note: 744 = 704 QIDs + 5 non-archived Pack D Section E items after full inventory includes all sections.

---

## 5. Governance Guard Compliance

| Rule | Status |
|------|--------|
| Rule 5 (≤30 items/change-set) | Compliant — each batch ≤25 items |
| Rule 2 (DL-008 BLOCK) | N/A — all items already have empty ExplanationWrong[CorrectChoice] |
| Rule 3 (MASTER_QUESTION_REGISTRY) | DO NOT HAND-EDIT |
| Rule 1 (question_state changes) | N/A — content-only rewrites, no state changes |
| Rule 4 (answer-key changes) | N/A — no CorrectChoice or Correct changes |

---

## 6. Validation Baseline

| Metric | Current Baseline |
|--------|-----------------|
| Module errors | 118 |
| Module warnings | 1,675 |

Content-only ExplanationWrong rewrites should not interact with any validator module. Zero regression expected per batch.

---

## 7. STOP Conditions

1. **Any Certified QID found with template text during batch execution** → Halt. Report immediately. Do NOT attempt to edit Certified items.
2. **Validator error-count increase** → Halt the batch, report, do not continue subsequent batches.
3. **DL-008 re-contamination** (ExplanationWrong[CorrectChoice] becoming non-empty) → Halt, report, fix before proceeding.

---

## 8. Recommended Execution Start

**Validate batch V1:** Pack D Section C, QIDs P1-DC-001 through P1-DC-025 (25 items, 75 fields). Execute as a single task-agent pass using the editorial pattern established in Section A. If V1 passes validator and editorial review, consolidate P1 batches 1A-1C into one write, then proceed to Pack C Section C (2A-2D).

**Reasoning:** Pack D Section C has the highest contamination density (86.0%), matching the Section A pattern that made it the original priority target. If the editorial quality holds for 25 items, the remaining 61 items in the section can be consolidated into fewer batches.

---

*Scan performed at: 2026-07-23. Read-only. Boundary-safe QID-indexing per reconciliation-audit.md §3a. No pack file writes.*