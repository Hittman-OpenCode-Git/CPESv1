# S867 — Calibration Preparation Report

**Session:** S867 — Pre-Remediation Preparation  
**Source:** S863 Cognitive Alignment Review findings  
**Date:** 2026-07-27  
**Status:** READ-ONLY — no pack files modified  

---

## Executive Summary

S863 identified 21 misalignment items in Pack C Sections C and D. Independent verification against `pack_c_corrected.js` raw file content **confirms 18 of 21 as genuine definition-match inflations**, finds **2 false positives** (CC-053, CC-054 are calculations, not definitions), and discovers **1 excluded item** (CC-049) in the same rotation groups. Net: **20 items need remediation** across 4 rotation groups plus 2 edge cases (CC-065, DC-005).

### S863 Errors Discovered

| Error | Detail |
|-------|--------|
| CC-053, CC-054 false positives | These are sales price variance CALCULATIONS at Apply/DS=3 — correctly classified. S863 wrongly called them "definition-match." |
| CC-040-044 topic mislabel | S863 labeled all as "investment center." Actually: CC-040 = investment center, CC-041-044 = EVA concept. All ARE definition-match. |
| CC-049 excluded | CC-049 is a benchmarking definition-match in the same rotation group as CC-050-052. S863 missed it. |
| DC-005 vs DC-025 comparison | S863 compared DC-005 to DC-025 (DS=4) for escalation. The items test different cognitive depths. DC-005 does not warrant DS→4. |

---

## Item-by-Item Verification

### Group 1: DuPont ROI (CC-010–CC-014) — All 5 Confirmed Definition-Match

All 5 items share the identical rotation template:  
`"[Company] wants to analyze ROI by breaking it into profit margin and asset turnover components. What approach is being used?"`

| QID | Current CL | Current DS | Current Diff | CC | Definition? | → CL | → DS | → Diff | Change |
|-----|-----------|-----------|-------------|-----|------------|-----|-----|------|--------|
| CC-010 | Understand | 2 | Moderate-Easy | B | YES | Remember | 1 | Easy | Both ↓ |
| CC-011 | Understand | 2 | Moderate-Easy | C | YES | Remember | 1 | Easy | Both ↓ |
| CC-012 | Understand | 1 | Easy | D | YES | Remember | 1 | Easy | CL only ↓ |
| CC-013 | Understand | 2 | Moderate-Easy | A | YES | Remember | 1 | Easy | Both ↓ |
| CC-014 | **Analyze** | **4** | **Difficult** | B | YES | Remember | 1 | Easy | **CRITICAL** Both ↓ |

**CC-014 is the worst offender**: Labeled "Analyze" with DifficultyScore=4 for asking "What approach is being used?" about the DuPont method — literally a term-recall question. This is the only S863 "Critical False Analyze."

---

### Group 2: Cost Center — Responsibility Centers (CC-030–CC-034) — All 5 Confirmed

All 5 share the template: `"[Company]'s production supervisor is evaluated only on the costs incurred in the department, with no control over revenue or investment decisions. What type of responsibility center is this?"`

| QID | Current CL | Current DS | Current Diff | CC | Definition? | → CL | → DS | → Diff | Change |
|-----|-----------|-----------|-------------|-----|------------|-----|-----|------|--------|
| CC-030 | Understand | 2 | Moderate-Easy | C | YES | Remember | 1 | Easy | Both ↓ |
| CC-031 | Understand | 2 | Easy | C | YES | Remember | 1 | Easy | Both ↓ |
| CC-032 | Understand | 2 | Moderate | D | YES | Remember | 1 | Easy | Both ↓ |
| CC-033 | Understand | 2 | Moderate | A | YES | Remember | 1 | Easy | Both ↓ |
| CC-034 | Understand | 2 | Easy | B | YES | Remember | 1 | Easy | Both ↓ |

**Note:** CC-034 content block verified at line 10612 (Topic C.034). Stem confirms cost center definition-match. The content at line 10662 (Topic C.035, investment center) belongs to CC-035 — the rotation group boundary is at CC-034/CC-035.

---

### Group 3: Mixed — Investment Center + EVA (CC-040–CC-044) — All 5 Confirmed Definition-Match

| QID | Actual Topic | Current CL | Current DS | Current Diff | CC | Definition? | → CL | → DS | → Diff | Change |
|-----|-------------|-----------|-----------|-------------|-----|------------|-----|-----|------|--------|
| CC-040 | Investment Center | Understand | 3 | Moderate | D | YES | Remember | 1 | Easy | Both ↓ |
| CC-041 | EVA Concept | Apply | 3 | Moderate | A | YES | Remember | 1 | Easy | Both ↓ |
| CC-042 | EVA Concept | Apply | 3 | Moderate | B | YES | Remember | 1 | Easy | Both ↓ |
| CC-043 | EVA Concept | Apply | 3 | Moderate | C | YES | Remember | 1 | Easy | Both ↓ |
| CC-044 | EVA Concept | Apply | 1 | Easy | D | YES | Remember | 1 | Easy | CL only ↓ |

**S863 error:** S863 labeled entire group as "Investment center." CC-040 is investment-center (stem: "Oleander's division manager controls revenue, costs, and the level of assets invested in the division"). CC-041-044 are EVA concept (stem: "[Company] calculates economic value added... What does a positive EVA indicate?"). Both sub-topics are definition-match.

The EVA stems literally restate the EVA formula in the question prompt, then ask "What does a positive EVA indicate?" — the answer choices include the textbook interpretation. Zero application required.

---

### Group 4: Benchmarking (CC-049–CC-052) — 4 Confirmed; CC-053-054 Excluded

| QID | Current CL | Current DS | Current Diff | CC | Definition? | → CL | → DS | → Diff | Change |
|-----|-----------|-----------|-------------|-----|------------|-----|-----|------|--------|
| CC-049 | Understand | 3 | Moderate | A | YES | Remember | 1 | Easy | Both ↓ |
| CC-050 | Understand | 3 | Moderate | C | YES | Remember | 1 | Easy | Both ↓ |
| CC-051 | Understand | 1 | Easy | D | YES | Remember | 1 | Easy | CL only ↓ |
| CC-052 | Understand | 3 | Moderate | D | YES | Remember | 1 | Easy | Both ↓ |

**CC-049 was NOT in S863's 21-item list.** Discovered during S867 verification at line 11362. Topic C.049 "benchmarking best practices." Stem: "Yorkshire compares its processes and performance metrics against those of best-in-class organizations to identify improvement opportunities. What technique is being used?" — textbook benchmarking definition. Answer IS "Benchmarking."

**CC-053 and CC-054 are S863 FALSE POSITIVES — EXCLUDED:**

| QID | Current CL | Current DS | Stem | Why Excluded |
|-----|-----------|-----------|------|-------------|
| CC-053 | Apply | 3 | "Duskwood discounted a product... budgeted $48, actual $45, 8,400 units. What sales price variance?" | **Calculation**: Formula application (AP-BP)×AQ. Appropriately Apply/DS=3. |
| CC-054 | Apply | 3 | "Everfern sold a premium... budgeted $72, actual $75, 6,200 units. What is the sales price variance?" | **Calculation**: Formula application. Appropriately Apply/DS=3. |

Both items require arithmetic computation and belong to the sales price variance rotation group (CC-053–CC-055). Their current CL/DS classifications are correct.

---

### Edge Case 1: CC-065 — Controllability Principle

| Field | Current | Recommended |
|-------|---------|-------------|
| CognitiveLevel | **Evaluate** | **Understand** |
| DifficultyScore | 2 | **3** |
| Difficulty | Moderate | Moderate |

**Stem:** "Quailrun's regional manager is charged with a corporate overhead allocation over which the manager has no control or influence. What performance evaluation principle is being violated?"

**Analysis:**
- CL=Evaluate is inflated. The question asks "What principle is being violated?" — this tests recognition that a described scenario matches the controllability principle. Not true evaluation (no judgment, no recommendation, no alternative weighing).
- The question is NOT a definition-match: the stem uses a scenario (not a definition) and the distractors present real accounting principles (going concern, matching, materiality) requiring discrimination.
- DS=2 is slightly low given the scenario-based structure. Recommended DS→3 for Understand-level question with multi-principle distractor discrimination.

**S863 recommendation:** DS→3 (keeping CL=Evaluate).  
**S867 assessment:** S863 correctly identifies DS as low, but misses that CL is inflated. Two-field fix recommended: CL→Understand, DS→3.

---

### Edge Case 2: DC-005 — Predetermined Overhead Rate Rationale

| Field | Current | Recommended |
|-------|---------|-------------|
| CognitiveLevel | **Analyze** | **Understand** |
| DifficultyScore | 3 | 3 (keep) |
| Difficulty | Moderate | Moderate |

**Stem:** "Emberton uses job order costing and applies overhead based on a predetermined rate using direct labor hours. Why use a predetermined rate rather than actual overhead?"

**Analysis:**
- CL=Analyze is inflated. The question asks "Why use a predetermined rate?" which tests understanding of a single rationale (timeliness). The correct answer explicitly states: "To allow timely product costing during the period without waiting for actual overhead costs to be known."
- Not analysis: no multi-step computation, no decomposition, no pattern identification.
- Distractors (guaranteeing zero variance, eliminating allocation, compliance mandate) are plausible and require basic concept discrimination — justifying DS=3.

**DC-025 comparison (S863 proposed DS→4):**

| Property | DC-025 | DC-005 |
|----------|--------|--------|
| Topic | Variable vs. absorption costing income effect | Predetermined OH rate rationale |
| Steps required | (1) Inventory change, (2) FOH released, (3) Direction rule, (4) Answer | (1) Identify timeliness as rationale |
| Cognitive demand | Multi-step analysis | Single-concept understanding |
| DS | 4 (appropriate) | 3 (appropriate) |

**These items are not comparable.** DC-025 is genuinely more complex. DC-005 does not warrant DS escalation.

---

## Summary: Items Needing Remediation

### Category A: Definition-Match Downgrades (19 items)

**Change: CL→Remember, DS→1, Diff→Easy**

| ID | QIDs | Current CL | Current DS | Items with DS already 1 |
|-----|------|-----------|-----------|------------------------|
| DuPont ROI | CC-010–CC-014 | Understand/Analyze | 1/2/2/2/4 | CC-012 |
| Cost Center | CC-030–CC-034 | Understand | 2/2/2/2/2 | — |
| Invest. Center | CC-040 | Understand | 3 | — |
| EVA Concept | CC-041–CC-044 | Apply/Apply/Apply/Apply | 3/3/3/1 | CC-044 |
| Benchmarking | CC-049–CC-052 | Understand | 3/3/1/3 | CC-051 |

**19 items total.** 3 items only need CL change (DS already 1: CC-012, CC-044, CC-051).

### Category B: Edge Case Corrections (1 item + 1 clarifying)

| QID | Current | Recommended | Rationale |
|-----|---------|-------------|-----------|
| CC-065 | CL=Evaluate, DS=2 | CL=Understand, DS=3 | CL inflated + DS slightly low. Scenario-based principle identification. |
| DC-005 | CL=Analyze, DS=3 | CL=Understand, DS=3 | CL inflated. Single-rationale understanding. DS appropriate. |

### Category C: No Change (2 items)

| QID | Why |
|-----|-----|
| CC-053 | Sales price variance calculation — correctly Apply/DS=3 |
| CC-054 | Sales price variance calculation — correctly Apply/DS=3 |

---

## Risk Assessment

| Risk | Items | Severity | 
|------|-------|----------|
| All 19 definition-match items are **Certified** in learner pool | CC-010-014, CC-030-034, CC-040-044, CC-049-052 | Low — cognitive inflation does not harm learners, but psychometric validity is degraded |
| CC-014 labeled "Analyze" with DS=4 | CC-014 | Low — learners see an easy question labeled difficult; no incorrect content |
| CC-065 CL=Evaluate overstated | CC-065 | Low — educational tag only |
| DC-005 CL=Analyze overstated | DC-005 | Low — educational tag only |
| CorrectChoice/answer correctness | All 23 items | **Zero risk** — all correct answers independently verified |

---

## Remediation Execution Plan

### Changes per item (backup-before-write mandatory per AGENTS.md §3)

| Change Type | Count | Items |
|------------|-------|-------|
| CL + DS + Diff all changed | 15 | CC-010, CC-011, CC-013, CC-014, CC-030-034, CC-040-043, CC-049, CC-050, CC-052 |
| CL only (DS already 1) | 3 | CC-012, CC-044, CC-051 |
| CL + DS (non-definition) | 1 | CC-065 |
| CL only (DS stays) | 1 | DC-005 |
| **No change** | 2 | CC-053, CC-054 |

### Batch Plan (≤28 per governance-guard Rule 5)

| Batch | Size | QIDs | 
|-------|------|------|
| B1 — DuPont | 5 | CC-010, CC-011, CC-012, CC-013, CC-014 |
| B2 — Cost Center | 5 | CC-030, CC-031, CC-032, CC-033, CC-034 |
| B3 — Invest/EVA | 5 | CC-040, CC-041, CC-042, CC-043, CC-044 |
| B4 — Benchmarking | 5 | CC-049, CC-050, CC-051, CC-052, CC-065 |
| B5 — Edge | 1 | DC-005 |

**Total: 21 items, 5 batches.**

### Files Modified

- `pack_c_corrected.js` only (all 21 items are in Pack C)

---

## Verification Checklist (Post-Remediation)

- [ ] All 19 definition-match items have `CognitiveLevel: "Remember"` and `DifficultyScore: 1`
- [ ] CC-065 has `CognitiveLevel: "Understand"` and `DifficultyScore: 3`
- [ ] DC-005 has `CognitiveLevel: "Understand"` and `DifficultyScore: 3`
- [ ] CC-053, CC-054 unchanged (Apply/DS=3)
- [ ] Zero CorrectChoice changes
- [ ] Zero ExplanationWrong/ExplanationCorrect changes
- [ ] question_state remains "Certified" for all items
- [ ] QuantumBody question_count unchanged
- [ ] Governance guard: 0 DL-008 violations introduced
- [ ] Backup files created per BACKUP_PROTOCOL.md
- [ ] REVISION_HISTORY.md entry appended

---

## Confidence Assessment

| Category | Confidence | Notes |
|----------|-----------|-------|
| Definition-match classification | HIGH | All 19 stems independently verified against raw file content |
| Cognitive level downgrade | HIGH | CAQS §6.2: Remember = "Recall facts, terms, definitions." All 19 items test exactly this. |
| Difficulty downgrade | HIGH | CAQS §6.1: Easy (1) = simple recall. DS=2/3 for term recognition is systematic inflation. |
| CC-065 correction | MEDIUM | Reasonable people may argue Understand vs. Apply. Scenario-based discrimination suggests Understand+DS=3. |
| DC-005 correction | MEDIUM | Understanding a rationale could be considered low-Apply. CL=Understand is the conservative choice. |
| S863 group-boundary errors | HIGH | Verified by direct file reads at every content block boundary. |
| No regressions | HIGH | Only metadata fields modified; zero content/answer changes. |
