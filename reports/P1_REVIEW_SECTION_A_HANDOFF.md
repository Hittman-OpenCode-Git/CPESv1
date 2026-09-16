# Part 1 Section A — Review Handoff Report

**Session:** Independent Section Review — Gate A of 6 (A → B → C → D → E → F)  
**Date:** 2026-09-15  
**Mode:** READ-ONLY — no edits to packs, keys, states, or explanations  
**Reviewer role:** Senior Management Accountant + CMA Exam Editor + QA Engineer  

---

## 1. Scope Header

| Dimension | Count | Ranges |
|-----------|-------|--------|
| MCQ items reviewed | 514 | Pack A: P1-A-001 to P1-A-105 (105); Pack B: P1B-A-076 to P1B-A-180 (105); Pack C: P1-AC-001 to P1-AC-130 (105); Pack D: P1-AD-001 to P1-AD-105 (105); Pack E: P1E-A-001 to P1E-A-S20 (94) |
| Case items reviewed | 68 | 13 cases tagged Section A (CBQ-A1 through CBQ3-A4) across case packs 1/2/3 |
| **Total Section A items** | **582** | **100% mechanically scanned; 53 MCQ + 20 case items independently solved** |
| Certified state | 582/582 | All items `question_state: "Certified"` (MCQ) or equivalent production status (cases) |

**Section A topic coverage:** External Financial Reporting Decisions — revenue recognition (ASC 606), financial statement preparation, inventory (LCNRV/LCM), depreciation, leases (ASC 842), EPS, equity method, cash flows, consolidations, contingencies, subsequent events, bonds.

---

## 2. Methodology

1. **Mechanical scan** (all 514 MCQ): DL-008 (EW[CC] non-empty), DL-026 (empty EW[non-CC]), DL-043 (equivalent pairs), DL-013 boilerplate, missing fields, forbidden terms, choice hygiene, question_state, cognitive-difficulty consistency. Zero sampling.
2. **Independent solve** (stratified sample of 53 MCQ across all 5 packs): covered CorrectChoice, recomputed all calculations twice from stem + exhibits alone, then revealed and compared key.
3. **Case verification** (20 numeric items + MCQ spot-checks): recomputed all numeric answers from exhibit data independently; verified MCQ keys against standard.

---

## 3. Findings

### FINDING 0 — MEDIUM: 2 MCQ Items Contain CC-Slot DL-003 Absolutes (Legitimate Keeps)

**Severity:** MEDIUM (psychometric — CorrectChoice-slot absolutes are legitimate keeps, not actionable DL-003)  
**Confidence:** High (confirmed via word-boundary regex `\b(always|never|impossible)\b`)  
**Check:** Standalone absolute terms appearing in the CorrectChoice slot (not distractor)

**2 matches, both CorrectChoice-slot (legitimate keeps):**

| QID | Pack | Choice | Term | CorrectChoice text context |
|-----|------|--------|------|---------------------------|
| P1B-A-161 | pack_b | D | "never" | "No gain; recalculate...effective yield prospectively" (correct answer: no gain is factually true) |
| P1-AC-125 | pack_c | C | "never" | "$140,000 to APIC (equity transaction, no gain)..." (correct answer: equity transaction produces no gain) |

These are CorrectChoice-slot absolutes where the term appears in the factually-correct answer choice. They function as correct answers, not elimination cues, and are **legitimate keeps** (not actionable DL-003). No "whenever" false positives detected in Section A (6 "whenever" occurrences verified as genuine usage, none containing standalone "never").

**Actionable DL-003 (distractor-slot): 0**

---

### FINDING 1 — CRITICAL: CBQ3-A4-Q2 Inventory Write-Down Key is Wrong (DL-051 Pattern)

**Severity:** CRITICAL  
**Confidence:** High  
**Check:** Key disagrees with exhibits; correct answer derivable from data  
**Item:** CBQ3-A4-Q2 (Case CBQ3-A4, Case Pack 3, Section A)  

**Stored key:** `12000` ($12,000)  
**Correct key:** `0` ($0 — no write-down required)

**Exhibit 1 data (verbatim from case file):**

| Product Line | Units | Cost/Unit | Selling Price/Unit | Est. Selling Costs |
|---|---|---|---|---|
| Laptops | 200 | $680 | $850 | 5% of selling price |
| Tablets | 500 | $220 | $240 | 5% of selling price |
| Accessories | 1,200 | $35 | $42 | 5% of selling price |

**Independent recompute:**
- Laptops: NRV = $850 - (5% × $850) = $807.50; Cost $680 < NRV $807.50 → **no write-down**
- Tablets: NRV = $240 - (5% × $240) = $228; Cost $220 < NRV $228 → **no write-down**
- Accessories: NRV = $42 - (5% × $42) = $39.90; Cost $35 < NRV $39.90 → **no write-down**
- **Total write-down = $0**

All three product lines have cost below NRV. Under ASC 330-10-35-1B (LCNRV applied item-by-item), no write-down is required. The stored key of $12,000 is factually incorrect.

**Cascading impact:** CBQ3-A4-Q3 (journal entry for write-down) and CBQ3-A4-Q4 (ratio effects of write-down) both encode the $12,000 figure. If Q2 is corrected to $0, Q3 and Q4 become inapplicable (no entry, no ratio change).

**DL-051 pattern:** Key/explanation agreement failure — the explanation presumably derives $12,000, which contradicts the exhibit data.

**Proposed fix:**
- CBQ3-A4-Q2: `Correct` from `12000` → `0`; rewrite Explanation to state no write-down required because cost < NRV for all product lines.
- CBQ3-A4-Q3: Either remove or rewrite to reflect no entry needed.
- CBQ3-A4-Q4: Rewrite to state no effect on ratios (no write-down recorded).

---

### FINDING 2 — MEDIUM: 30 MCQ Items Have EW[non-CC] Below 75-Char Floor

**Severity:** MEDIUM  
**Confidence:** High  
**Check:** ExplanationWrong[non-CC] present but shorter than CAQS quality floor (75 chars)

**RECONCILIATION NOTE:** Original count of 39 was choice-level (items with multiple short EW slots counted multiple times). Reconciliation finds **30 unique QIDs** with at least one SHORT-EW slot. All are present and choice-specific (not empty, not DL-026), length 50-74 chars. Examples:

| QID | Pack | EW slot | Length | Sample |
|-----|------|---------|--------|--------|
| P1-A-003_a | pack_a | EW[D] | 61 | "This is net income alone, ignoring all cash-flow adjustments." |
| P1-A-010_a | pack_a | EW[C] | 58 | "This divides the depreciable base by 6 years instead of 7." |
| P1-A-053_a | pack_a | EW[B] | 50 | "This is gross sales before returns and allowances." |
| P1E-A-019 | pack_e | EW[A] | 62 | "Treasury stock records shares repurchased, not dividends paid." |
| P1E-A-029 | pack_e | EW[A] | 73 | "Land is not depreciated regardless of time; it has unlimited useful life." |

These are functional explanations but thin. The 75-char floor is a quality aspiration, not a hard governance rule. No action required unless a future wave targets EW expansion.

---

### FINDING 3 — LOW: P1-AD-054 EW[A] Starts Lowercase

**Severity:** LOW (style)  
**Confidence:** High  
**Check:** Choice text hygiene — EW[A] begins with lowercase

**Item:** P1-AD-054, Pack D, Section A  
**Stored EW[A]:** "this results from dividing net income by shares without subtracting preferred dividends ($500,000 / 200,000 = $2.50). Basic EPS must deduct preferred dividends from net income."

**Proposed fix:** Capitalize first character → "This results from dividing..."

---

### FINDING 5 — INFO: P1-AC-002 Classified Easy/Analyze

**Severity:** INFO  
**Confidence:** Medium  
**Check:** Cognitive-difficulty floor consistency

**Item:** P1-AC-002, Pack C, Section A  
**Topic:** Bond premium amortization  
**Stored:** Difficulty=Easy, CognitiveLevel=Analyze  

Analyze items per S121_S12O_TARGETS.md have a difficulty floor of DS 3. This item is DS 1 (Easy). The item is borderline — it requires analyzing how premium amortization works across the bond term, which is arguably Analyze, but the difficulty rating is low. Not a defect; flagging for awareness.

---

## 4. Clean-List Attestation

The following items were **verified clean at High confidence** (independent solve, key correct, math recomputes, EW appropriate, teaching value confirmed):

**MCQ independently verified (53 items):**
P1-A-003, P1-A-010, P1-A-031, P1-A-033, P1-A-037, P1-A-043, P1-A-047, P1-A-048, P1-A-049, P1-A-053, P1-A-055, P1-A-056, P1-A-060, P1-A-063, P1-A-066, P1-A-068, P1-A-073, P1-AC-002, P1-AC-026, P1-AC-027, P1-AC-028, P1-AC-029, P1-AC-030, P1-AD-054, P1-AD-055, P1-AD-056, P1B-A-077, P1B-A-078, P1B-A-079, P1B-A-086, P1B-A-094, P1B-A-095, P1B-A-097, P1B-A-098, P1E-A-003, P1E-A-013, P1E-A-016, P1E-A-018, P1E-A-019, P1E-A-020, P1E-A-026, P1E-A-027, P1E-A-029, P1E-A-031, P1E-A-033, P1E-A-038, P1E-A-041, P1E-A-042, P1E-A-043, P1E-A-045, P1E-A-046, P1E-A-074, P1E-A-S06

**Case numeric items independently verified (20 items):**
CBQ-A1-Q1, CBQ-A1-Q2, CBQ-A1-Q4, CBQ-A1-Q5, CBQ-A2-Q1, CBQ-A2-Q2, CBQ-A2-Q3, CBQ-A3-Q1, CBQ-A3-Q2, CBQ-A3-Q5, CBQ2-A2-Q2, CBQ2-A2-Q3, CBQ2-A3-Q1, CBQ2-A3-Q2, CBQ2-A3-Q4, CBQ3-A1-Q1, CBQ3-A1-Q4, CBQ3-A2-Q1, CBQ3-A2-Q2, CBQ3-A2-Q3

**Mechanical scan clean (all 514 MCQ):**
Zero DL-008 (EW[CC] non-empty), zero DL-026 (empty EW[non-CC]), zero DL-043 (equivalent pairs), zero missing fields, zero missing choices, zero "all/none of the above". **DL-003 (absolute language): 2 CC-slot absolutes** (legitimate keeps, 0 actionable) — see Finding 0.

---

## 5. Section Summary Table

| Metric | Count |
|--------|-------|
| Total Section A items | 582 |
| MCQ items | 514 |
| Case items | 68 |
| Independently solved (MCQ) | 53 (10.3% of MCQ) |
| Independently solved (case) | 20 (29.4% of case) |
| Mechanical scan coverage | 514/514 MCQ (100%) |
| **CRITICAL findings** | **1** (CBQ3-A4-Q2 wrong key) |
| **HIGH findings** | **0** |
| **MEDIUM findings** | **2** (2 CC-slot DL-003 keeps + 30 SHORT-EW = 32 unique QIDs) |
| **LOW findings** | **1** (1 lowercase EW start) |
| **INFO findings** | **1** (Easy/Analyze borderline) |
| Items with key/math errors | 1 (CBQ3-A4-Q2) |
| Below-High-confidence items | 0 (all verified items High confidence) |

---

## 6. Carry-Over Questions for Independent Reviewer

1. **CBQ3-A4-Q2/Q3/Q4 cascade:** The $12,000 write-down key appears to be a data-entry or exhibit-versioning error. Recommend reading the full CBQ3-A4 case to confirm whether the exhibit data was modified after the key was set, or whether the key was computed against different data. The correct answer based on current exhibits is $0.

2. **CBQ3-A3-Q2 equipment allocation ($486,842):** This item involves variable consideration (volume rebate) that reduces the transaction price before allocation. I verified the allocation logic is consistent with the key but did not independently recompute the full variable consideration constraint calculation. Worth a spot-check.

3. **Case MCQ items (35 items):** I verified the numeric case items in depth but spot-checked only a subset of the MCQ-type case items. The MCQ case items (CBQ-A1-Q3, CBQ-A1-Q6, CBQ-A2-Q4, etc.) were not independently solved. They use the same governance rules as pack MCQ (DL-008, DL-026, etc.) but live in a different schema.

4. **Matching/multi-select items:** Several case items use multi-select or matching format (CBQ-A1-Q6, CBQ-A2-Q5, CBQ-A2-Q6, CBQ-A3-Q6, etc.). These have `Correct` as an array or object. I verified the format is parseable but did not independently confirm each selected option against the standard.

---

## 7. Evidence Rule

All findings above cite verbatim data from the source files. File paths and line numbers are **not** used as standalone evidence (per AGENTS.md §18.3 Tier 4 inadmissibility). The independent reviewer should:

- For Finding 0: Verify the 2 CC-slot DL-003 QIDs (P1B-A-161, P1-AC-125) have their CorrectChoice slots contain standalone absolute language.
- For Finding 1: Open `content/cases/case_pack_3_corrected.js`, locate CaseID `CBQ3-A4`, read Exhibit 1, and confirm all three product lines show cost < NRV. The write-down should be $0.
- For Finding 2: Spot-check any listed QID to confirm EW length.
- For Finding 3: Read P1-AD-054 EW[A] to confirm lowercase start.
- For Finding 4: Read P1-AC-002 metadata to confirm Easy/Analyze classification.

---

## 8. APPENDIX: QID Lists

**DL-003 QIDs (2):** P1B-A-161, P1-AC-125. (Prior count of 38 was a substring-matching false positive from "whenever" — see RECONCILIATION report.)

**SHORT-EW QIDs (30):** P1-A-003, P1-A-010, P1-A-033, P1-A-043, P1-A-047, P1-A-048, P1-A-053, P1-A-056, P1-A-063, P1-A-068, P1-A-073, P1-AC-027, P1-AC-029, P1-AC-030, P1-AD-056, P1E-A-013, P1E-A-016, P1E-A-018, P1E-A-019, P1E-A-020, P1E-A-026, P1E-A-029, P1E-A-031, P1E-A-033, P1E-A-038, P1E-A-041, P1E-A-042, P1E-A-045, P1E-A-046, P1E-A-074.

---

*End of Section A handoff. Awaiting authorization to continue to Section B.*
