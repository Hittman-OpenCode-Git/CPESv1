# S377 — DL-031 Launch Board — Batch 1 Calibration Baseline

**Session:** S377  
**Date:** 2026-07-28  
**Program:** DL-031 Difficulty Inflation (CAL-001)  
**Status:** Batch 1 Complete — 17 Simple Relabels applied

---

## 1. Methodology Summary

### Extraction
- **Method:** Function constructor parse (`new Function(content + '; return ' + varName + ';')`)  
- **Rationale:** Prior v1 classifier used 500-byte regex windows which captured only ~2% of items (62 of ~850 expected). Pack files are valid JS arrays with `var MCQ_BANK_A = [...]` format.
- **Items scanned:** 2,540 (500 × 5 + 540 Pack E)

### Classification Logic
- **15 definition markers** (e.g., `is known as`, `is best described as`, `this is an example of`, `refers to the concept`)
- **10 calculation exclusion markers** (e.g., `calculate the amount`, `what is the total`, formula-based stems)
- **Numeric-answer bypass:** items whose correct answer choice is purely numeric (`/^-?\d+(\.\d+)?%?$/`) are excluded — they're calculation questions, not definitions
- **Overlap threshold:** Jaccard-like word overlap between stem and correct answer text
  - Simple Relabel: ≥0.20 for Remember/Understand, ≥0.30 for Apply
  - Calibration: Below threshold or borderline
  - Rewrite: Analyze/Evaluate with definition-match (structural mismatch)

---

## 2. Classification Results

| Pack | Total | Flagged | Simple | Calibration | Rewrite |
|------|-------|---------|--------|-------------|---------|
| A | 500 | 0 | 0 | 0 | 0 |
| B | 500 | 5 | **3** | 2 | 0 |
| C | 500 | 20 | **9** | 8 | 3 |
| D | 500 | 12 | **5** | 6 | 1 |
| E | 540 | 2 | 0 | 2 | 0 |
| **Total** | **2,540** | **39** | **17** | **18** | **4** |

**Note on total:** The S372 Session 700 estimate of ~850 items now appears overstated — many items were already recalibrated in S530 (ENHANCED_CASE_BASE) and S716-S718 recalibration sweeps, and Pack A's S892 closure brought remaining items to final state. The 39 flagged represent the residual pool.

---

## 3. Simple Relabels Applied (17)

### Pack B (3 items) — Section E (2) + Section F (1)
| QID | Section | Topic | CL | From | To |
|-----|---------|-------|----|------|----|
| P1B-E-102 | E | Role-based access control | Apply | Moderate(3) | Easy(1) |
| P1B-E-107 | E | Batch total control | Apply | Moderate(3) | Easy(1) |
| P1B-F-116 | F | ERP control implications | Understand | Moderate(3) | Easy(1) |

### Pack C (9 items) — Section D (5) + Section F (4)
| QID | Section | Topic | CL | From | To |
|-----|---------|-------|----|------|----|
| P1-DC-061 | D | Lean manufacturing | Understand | Moderate(3) | Easy(1) |
| P1-DC-062 | D | Lean manufacturing | Understand | Moderate(3) | Easy(1) |
| P1-DC-063 | D | Lean manufacturing | Understand | Moderate(3) | Easy(1) |
| P1-DC-064 | D | Lean manufacturing | Understand | Moderate(3) | Easy(1) |
| P1-DC-065 | D | Lean manufacturing | Understand | Moderate(3) | Easy(1) |
| P1-FC-001 | F | Data governance | Understand | Moderate(3) | Easy(1) |
| P1-FC-002 | F | Data governance | Understand | Moderate(3) | Easy(1) |
| P1-FC-003 | F | Data governance | Understand | Moderate(3) | Easy(1) |
| P1-FC-004 | F | Data governance | Understand | Moderate(3) | Easy(1) |

### Pack D (5 items) — Section F
| QID | Section | Topic | CL | From | To |
|-----|---------|-------|----|------|----|
| P1-FD-061 | F | Cybersecurity risk assessment (NIST) | Understand | Moderate-Easy(3) | Easy(1) |
| P1-FD-062 | F | Cybersecurity risk assessment (NIST) | Understand | Moderate(3) | Easy(1) |
| P1-FD-063 | F | Cybersecurity risk assessment (NIST) | Understand | Moderate(3) | Easy(1) |
| P1-FD-064 | F | Cybersecurity risk assessment (NIST) | Understand | Moderate(3) | Easy(1) |
| P1-FD-065 | F | Cybersecurity risk assessment (NIST) | Understand | Moderate(3) | Easy(1) |

**Cluster notes:** These form 4 rotation groups (positional answer-letter rotation, same stem skeleton):
1. P1B-E-102/107: Different topics, both "This X is known as:" pattern
2. P1-DC-061–065: Lean manufacturing definition, rotated (single seed with 4 clones)
3. P1-FC-001–004: Data governance definition, rotated (single seed with 3 clones)
4. P1-FD-061–065: NIST cybersecurity framework, rotated (single seed with 4 clones)

---

## 4. Remaining Items by Classification

### Calibration (18 items) — requires per-item cognitive review before assignment

| Pack | Count | Notes |
|------|-------|-------|
| B | 2 | P1B-F-134, P1B-F-146 — Understand level, low overlap |
| C | 8 | BC-054 (Difficult), FC-041–044 (blockchain), FC-061/063/065 (ERP) |
| D | 6 | CD-053/054 (Understand), FD-071/072/074 (data retention policy) |
| E | 2 | E-Section (analyze-level definition matches) |

### Rewrite Required (4 items) — Analyze/Evaluate with definitional stems

| QID | Pack | Section | Topic | CL | Difficulty |
|-----|------|---------|-------|----|------------|
| P1-EC-019 | C | E | Risk assessment — three business lines | Analyze | Difficult |
| P1-FC-005 | C | F | Data governance | Analyze | Moderate |
| P1-FC-045 | C | F | Blockchain — shared ledger | Analyze | Moderate |
| P1-CD-050 | D | C | Performance measure — goal congruence | Analyze | Moderate |

**Action:** These items have Analyze or Evaluate cognitive labels but stems that are definitional ("X evaluates Y...", "X wants a measure that..."). The cognitive level should be downgraded OR the stem/distractors should be rewritten to genuinely test analysis.

---

## 5. Packs Modified

| Pack | Changes | Backup |
|------|---------|--------|
| `pack_b_corrected.js` | 3 Difficulty + 3 DifficultyScore | `backups/pack_b_corrected.js.bak-DL031-2026-07-28T1939` |
| `pack_c_corrected.js` | 9 Difficulty + 9 DifficultyScore | `backups/pack_c_corrected.js.bak-DL031-2026-07-28T1939` |
| `pack_d_corrected.js` | 5 Difficulty + 5 DifficultyScore | `backups/pack_d_corrected.js.bak-DL031-2026-07-28T1939` |
| `pack_a_corrected.js` | 0 (0 flagged) | N/A |
| `pack_e_corrected.js` | 0 (2 Calibration only) | N/A |

**Verification:** All 17 items confirmed: Difficulty="Easy" AND DifficultyScore=1 via Function constructor parse. QID counts unchanged (500/ea). Syntax check passes. No unintended field modifications.

---

## 6. Paired-Constraint Note (Easy Inflation Risk)

**CAQS §6.1 targets:**
| Difficulty | Target % | Current (approximate) |
|------------|----------|-----------------------|
| Easy | 15% | Increasing (was ~5-8% pre-Batch 1) |
| Moderate-Easy | 20% | Decreasing |
| Moderate | 30% | Still dominant |
| Difficult | 25% | ~20% |
| Very Difficult | 10% | <10% |

**Risk:** Each batch of Simple Relabels shifts items from Moderate→Easy, improving Easy count but without corresponding Difficult/Very Difficult increases. The CAQS target distribution requires a balance. If Easy approaches 25%+ without parallel Analyze/Evaluate upgrades, the pool becomes bottom-heavy.

**Mitigation:** The 4 Rewrite Required items (pack C/D) are candidates for stem/distractor enhancement to maintain higher-Bloom's difficulty. Additionally, 18 Calibration items may require cognitive-level reclassification before difficulty assignment.

---

## 7. Methodology Issues Found

1. **v1 500-byte window:** Items in pack files average 2-3KB with long ExplanationCorrect fields. The 500-byte window captured only 2.4% of items. **Fixed:** Function constructor parse.

2. **Marker `are(\s+the\s+)?[^.]*$`:** Matched every "What are the...?" calculation question (false positive flood — 281 items). **Fixed:** Replaced with 15 targeted definition markers.

3. **Forward-window Difficulty search:** `Difficulty` comes before `QuestionID` in Pack B and dual-block Pack D (content block precedes metadata block). Searching forward from QID misses it. **Fixed:** `lastIndexOf` from QID position.

4. **Rotation-group neighbor collision:** `window.replace()` picks the FIRST match in an 8000-char window, which belongs to a neighbor item when items share the same Difficulty value in a rotation group. **Fixed:** `lastIndexOf` for closest-before-QID + batch reverse order.

5. **DifficultyScore after QID:** Pack B Section F and Pack D dual-block items store DifficultyScore in the metadata block AFTER QID. **Fixed:** Forward search fallback + targeted score fix script.

---

## 8. Scripts

| Script | Location | Purpose |
|--------|----------|---------|
| `classify_dl031.js` | `scripts/` | Combined scan + classify + execute |
| `fix_dl031_scores.js` | `scripts/` | Targeted DifficultyScore fix for post-QID items |
| `verify_dl031_changes.js` | `scripts/` | Post-execution verification |
| `SESSION377_DL031_BATCH1.json` | `scripts/output/` | Structured JSON deliverable |

---

*Generated: 2026-07-28 — Session 377 DL-031 Launch Board Batch 1*
