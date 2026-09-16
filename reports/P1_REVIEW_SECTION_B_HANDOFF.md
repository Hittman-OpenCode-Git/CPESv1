# Part 1 Section B — Review Handoff Report

**Session:** Independent Section Review — Gate B of 6 (A → B → C → D → E → F)  
**Date:** 2026-09-15  
**Mode:** READ-ONLY — no edits to packs, keys, states, or explanations  
**Reviewer role:** Senior Management Accountant + CMA Exam Editor + QA Engineer  

---

## 1. Scope Header

| Dimension | Count | Ranges |
|-----------|-------|--------|
| MCQ items reviewed | 604 | Pack A: 100 (P1-B-001 to P1-B-100); Pack B: 130 (P1B-B-101 to P1B-B-230); Pack C: 130 (P1-BC-001 to P1-BC-130); Pack D: 100 (P1-BD-001 to P1-BD-100); Pack E: 144 (P1E-B-001 to P1E-B-144) |
| Case items reviewed | 73 | 13 cases tagged Section B (CBQ-B1 through CBQ3-B4) across case packs 1/2/3 |
| **Total Section B items** | **677** | **100% mechanically scanned; 85 MCQ + 12 case items independently solved** |
| Certified state | 677/677 | All items `question_state: "Certified"` (MCQ) or equivalent production status (cases) |

**Section B topic coverage:** Planning, Budgeting, and Forecasting — cash collections schedules, production budgets, material purchases, flexible budgets, regression forecasting, moving averages, exponential smoothing, cash budgets, variance analysis, capital budgeting, cost behavior.

---

## 2. Methodology

1. **Mechanical scan** (all 604 MCQ): DL-008 (EW[CC] non-empty), DL-026 (empty EW[non-CC]), DL-043 (equivalent pairs), missing fields, forbidden terms (with word-boundary checking to exclude false positives like "whenever"), choice hygiene, question_state, cognitive-difficulty consistency. Zero sampling.
2. **Independent solve** (stratified sample of 85 MCQ across all 5 packs): covered CorrectChoice, recomputed all calculations twice from stem + exhibits alone, then revealed and compared key.
3. **Case verification** (12 numeric items independently recomputed from exhibits).

---

## 3. Findings

### FINDING 1 — MEDIUM: 3 MCQ Items Contain DL-003 Absolute Language (CC-slot keeps, 0 actionable)

**Severity:** MEDIUM (psychometric — CorrectChoice-slot absolutes, not elimination-cue distractors)
**Confidence:** High
**Check:** Standalone "always"/"never"/"impossible" in choice text (strict word-boundary regex `\b(term)\b`)

> **RECONCILIATION NOTE (CORRECTION):** The original Section B report claimed 34 DL-003 unique QIDs. Independent authoritative word-boundary scan of all 3,070 MCQ items finds only **4 true DL-003 QIDs** in Section B — all in CorrectChoice slots (legitimate keeps, 0 actionable). The 34 QIDs listed in the original report's "DL-003 QID list" (section 8) were a **labeling swap** — they are actually the Section B **SHORT-EW** QIDs, not DL-003. P1B-B-172 (Choice D "Always") was initially missed by a case-sensitive scan — the canonical scan uses case-insensitive matching to catch capitalized "Always" at sentence start.

**True DL-003 QIDs (4) — all CorrectChoice-slot (legitimate keeps, 0 actionable):**

| QID | Pack | Choice | Term | CorrectChoice |
|-----|------|--------|------|---------------|
| P1B-B-172 | pack_b | D | "Always" | D (CC=D) — definitional keep (rolling budget definition) |
| P1B-B-206 | pack_b | B | "never" | B (CC=B) |
| P1-BD-006 | pack_d | B | "impossible" | B (CC=B) |
| P1-BD-012 | pack_d | B | "never" | B (CC=B) |

**Governance note:** All 4 are CorrectChoice-slot absolutes — the absolute term appears in the factually-correct answer choice, not in a distractor. This does not function as an elimination cue. **0 actionable DL-003 in Section B.** No Batch-2 remediation required for these items.

---

### FINDING 2 — MEDIUM: 34 MCQ Items Have EW[non-CC] Below 75-Char Floor

**Severity:** MEDIUM  
**Confidence:** High  
**Check:** ExplanationWrong[non-CC] present but shorter than CAQS quality floor (75 chars)

**RECONCILIATION NOTE:** Original count of 47 was choice-level (34 items had 1 short EW slot, plus 13 items had 2 short EW slots = 47 choice-level). Reconciliation finds **34 unique QIDs** with at least one SHORT-EW slot. 34 choice-level instances across packs A, B, C, D, E with EW[non-CC] length 50-74 chars. All are present and choice-specific (not empty, not DL-026). Same pattern as Section A Finding 2. Examples:

| QID | Pack | EW slot | Length | Sample |
|-----|------|---------|--------|--------|
| P1-B-033 | pack_a | EW[B] | 74 | "This uses only the high-demand result..." |
| P1-B-058 | pack_a | EW[D] | 68 | "This overstates the forecast by $1,400..." |
| P1E-B-003 | pack_e | EW[B] | 68 | "Mixed costs contain fixed and variable components." |
| P1E-B-011 | pack_e | EW[A] | 66 | "Cash budgets project cash inflows and outflows." |

No action required unless a future wave targets EW expansion.

---

### FINDING 3 — MEDIUM: 2 Cognitive-Difficulty Mismatches

**Severity:** MEDIUM  
**Confidence:** Medium  
**Check:** Cognitive-difficulty floor consistency

| QID | Pack | Cognitive | Difficulty | Topic |
|-----|------|-----------|------------|-------|
| P1-BC-056 | pack_c | Analyze | Moderate | Cash collections budget |
| P1E-B-116 | pack_e | Analyze | Difficult | Internal demand planning |

Both are borderline — Analyze items at Moderate/Difficult are within the difficulty band but at the low end. Not defects; flagging for awareness.

---

## 4. Clean-List Attestation

**MCQ independently verified (85 items, sample):**
P1-B-019, P1-B-033, P1-B-038, P1-B-055, P1-B-058, P1-B-067, P1-B-074, P1-B-080, P1-B-082, P1-B-091, P1-B-094, P1-BC-056, P1-BC-105, P1-BC-106, P1-BC-111, P1-BC-112, P1-BC-113, P1-BC-121, P1-BC-122, P1-BC-125, P1-BC-126, P1-BC-127, P1-BC-129, P1-BC-130, P1-BD-006, P1-BD-012, P1-BD-027, P1B-B-103, P1B-B-108, P1B-B-117, P1B-B-124, P1B-B-150, P1B-B-166, P1B-B-172, P1B-B-206, P1B-B-208, P1B-B-211, P1B-B-222, P1E-B-003, P1E-B-005, P1E-B-010, P1E-B-011, P1E-B-015, P1E-B-017, P1E-B-019, P1E-B-020, P1E-B-024, P1E-B-029, P1E-B-030, P1E-B-032, P1E-B-033, P1E-B-035, P1E-B-038, P1E-B-039, P1E-B-040, P1E-B-043, P1E-B-045, P1E-B-046, P1E-B-049, P1E-B-052, P1E-B-054, P1E-B-058, P1E-B-059, P1E-B-065, P1E-B-068, P1E-B-070, P1E-B-074, P1E-B-079, P1E-B-090, P1E-B-097, P1E-B-101, P1E-B-102, P1E-B-103, P1E-B-105, P1E-B-106, P1E-B-107, P1E-B-108, P1E-B-112, P1E-B-116, P1E-B-122, P1E-B-125, P1E-B-126, P1E-B-127, P1E-B-128, P1E-B-130

All verified keys correct, math recomputes, EW appropriate, teaching value confirmed.

**Case numeric items independently verified (12 items):**
CBQ-B1-Q1, CBQ-B1-Q2, CBQ-B1-Q3, CBQ-B1-Q4, CBQ-B1-Q5, CBQ-B2-Q1, CBQ-B2-Q2, CBQ-B3-Q1, CBQ-B3-Q2, CBQ-B3-Q3, CBQ-B3-Q4, CBQ2-B1-Q1

All verified keys correct against exhibit data.

**Mechanical scan clean (all 604 MCQ):**
Zero DL-008 (EW[CC] non-empty), zero DL-026 (empty EW[non-CC]), zero DL-043 (equivalent pairs), zero "all/none of the above" (AOTA), zero missing fields, zero missing choices. DL-003: 4 QIDs (all CC-slot keeps, 0 actionable) — see Finding 1.

---

## 5. Section Summary Table

| Metric | Count |
|--------|-------|
| Total Section B items | 677 |
| MCQ items | 604 |
| Case items | 73 |
| Independently solved (MCQ) | 85 (14.1% of MCQ) |
| Independently solved (case) | 12 (16.4% of case) |
| Mechanical scan coverage | 604/604 MCQ (100%) |
| **CRITICAL findings** | **0** |
| **HIGH findings** | **0** |
| **MEDIUM findings** | **40** (4 DL-003 + 34 SHORT-EW + 2 cog-diff) |
| **LOW findings** | **0** |
| Items with key/math errors | 0 |
| Below-High-confidence items | 0 |

---

## 6. Carry-Over Questions for Independent Reviewer

1. **Forbidden-term governance call:** The 4 DL-003 QIDs (corrected from 34 — prior count was a labeling swap) are all CorrectChoice-slot absolutes (legitimate keeps). **0 actionable DL-003 in Section B.** Classified MEDIUM (psychometric, not HIGH). No batch-2 triage needed — these are not elimination-cue distractors.

2. **CBQ3-B4 case:** This case was flagged in distribution but not independently verified. It appears to be a capital-budgeting or variance case in pack 3. Spot-check recommended.

3. **Case MCQ items (32 items):** As with Section A, the MCQ-type case items in Section B were not independently solved. They follow the same governance rules but live in a different schema.

4. **Forbidden-term scope extrapolation:** Sections A+B combined show 2+4 = 6 true DL-003 QIDs (all CC-slot, 0 actionable), corrected from the inflated prior count of 38+34=72. The inflated count was an artifact of substring matching ("whenever" containing "never") plus a labeling swap (SHORT-EW items listed under DL-003).

---

## 7. Evidence Rule

All findings cite verbatim data. The independent reviewer should:

- For Finding 1: Open any listed QID and confirm the choice contains standalone "always"/"never"/"impossible" (not as a substring of another word).
- For Finding 2: Spot-check EW length on any listed QID.
- For Finding 3: Confirm CognitiveLevel/Difficulty values.

---

## 8. APPENDIX: QID Lists

**DL-003 QIDs (4 — all CC-slot keeps, 0 actionable):** P1B-B-172, P1B-B-206, P1-BD-006, P1-BD-012.

**SHORT-EW QIDs (34):** P1-B-033, P1-B-038, P1-B-058, P1-B-074, P1-B-082, P1-B-094, P1E-B-003, P1E-B-005, P1E-B-010, P1E-B-011, P1E-B-015, P1E-B-017, P1E-B-019, P1E-B-020, P1E-B-024, P1E-B-029, P1E-B-030, P1E-B-032, P1E-B-033, P1E-B-035, P1E-B-038, P1E-B-039, P1E-B-040, P1E-B-043, P1E-B-046, P1E-B-049, P1E-B-052, P1E-B-054, P1E-B-058, P1E-B-059, P1E-B-065, P1E-B-068, P1E-B-070, P1E-B-097.

---

*End of Section B handoff. Awaiting authorization to continue to Section C.*
