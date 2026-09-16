# Part 1 Section E — Review Handoff Report

**Session:** Independent Section Review — Gate E of 6 (A → B → C → D → E → F)  
**Date:** 2026-09-15  
**Mode:** READ-ONLY  
**Reviewer role:** Senior Management Accountant + CMA Exam Editor + QA Engineer  

## 1. Scope Header

| Dimension | Count |
|--------|-------|
| MCQ items reviewed | 464 (100% mechanically scanned) |
| Case items reviewed | 68 (13 cases tagged Section E) |
| **Total Section E items** | **532** |
| MCQ independently solved | 28 (6.0% of MCQ) — stratified across all 5 packs |
| Case numeric items independently solved | 5 of 5 (100% of case numerics) |
| Mechanical scan coverage | 464/464 MCQ (100%) |

**Section E topic coverage:** Information Technology (IT general controls, IT application controls, change management, access security, cybersecurity, data privacy, FCPA, internal auditing standards, COSO ERM, business continuity, fraud detection/prevention, Sarbanes-Oxley, audit committee).

**Cases reviewed (13):** CBQ-E1, CBQ-E2, CBQ-F2 (cross-tagged E+F), CBQ2-E1, CBQ2-E2, CBQ3-E1, CBQ3-E2, CBQ4-E1, CBQ4-E2, CBQ4-E3, CBQ5-E1, CBQ5-E2, CBQ5-E3.

## 2. Methodology (3-line note)

Full mechanical scan: DL-008/026/043, missing fields, DL-003 forbidden terms (word-boundary checked), SHORT-EW (50–74 chars), COG-DIFF (Analyze/Evaluate at Easy). Stratified independent solve across packs A–E (6 calculation items per pack + all flagged items). Case numerics independently derived from exhibits before revealing stored keys. All counts reconciled against `section_reconciliation.json` (stable across 2 runs).

## 3. Findings

### FINDING 1 — MEDIUM: 2 MCQ Items Contain DL-003 Forbidden Terms + 2 DL-043 Items (CORRECTED)

**RECONCILIATION NOTE:** The original Section E report claimed 5 actionable DL-003 + 1 legitimate keep = 6 items. An independent re-scan with strict word-boundary regex found only **2 true DL-003** items. The 4 retracted items (P1B-E-154, P1E-E-103, P1E-E-105, P1E-E-116) were false positives from "whenever" substring matching. Additionally, 2 "all of the above" items are DL-043, not DL-003.

**True DL-003 (absolute terms, word-boundary):** 2 items

| QID | Pack | Choice | Term | CorrectChoice | Slot | Disposition |
|-----|------|--------|------|---------------|------|-------------|
| P1B-E-150 | pack_b | D | "always" | C | **Distractor** | **LEGITIMATE KEEP** (user-documented override) — "Management override is always possible" is factually true per COSO Principle 16. User directive: retain as Certified despite being a distractor-slot absolute. |
| P1E-E-124 | pack_e | C | "never" | C | **CorrectChoice** | CC-slot keep — "analytics is the highest-yield leg" (correct answer contains "never"); does not function as elimination cue. |

**DL-043 ("all of the above")** — 2 items, both CC-slot keeps (0 actionable):

| QID | Pack | Choice | Term | CorrectChoice |
|-----|------|--------|------|---------------|
| P1B-E-087 | pack_b | D | "all of the above" | D (CC=D) — correct answer IS "all of the above" |
| P1B-E-150 | pack_b | C | "all of the above" | C (CC=C) — correct answer IS "all of the above"; P1B-E-150 is also DL-003 (Choice D "always" distractor, user-documented keep) |

**Retracted false positives (4):** P1B-E-154, P1E-E-103, P1E-E-105, P1E-E-116 — all false positives from substring matching ("whenever" containing "never"). None contain standalone absolute terms per word-boundary check.

**Disposition:** 0 actionable DL-003 or DL-043 in Section E. P1E-E-124 is CC-slot (correct answer contains "never", not a distractor). P1B-E-150 Choice D "always" is a distractor-slot absolute but documented as a legitimate keep per user directive (COSO Principle 16). Both DL-043 items (P1B-E-087, P1B-E-150 Choice C) are CC-slot keeps. No remediation required.

### FINDING 2 — MEDIUM: 23 MCQ Items Have EW[non-CC] Below 75-Char Floor

**Reconciliation note:** Original scan reported 27 (choice-level). 4 items have multiple short EW slots. Reconciliation finds **23 unique QIDs** with at least one EW[non-CC] slot in the 50–74 char range. All present and choice-specific (not empty, not DL-026). Meets CAQS EV1 ≥50 floor. No action required.

22 of 23 concentrated in pack_b (P1B-E-082 through P1B-E-150). 1 in pack_e (P1E-E-025).

### FINDING 3 — MEDIUM: 2 Items Have Difficulty-Label/Score Metadata Mismatch

| QID | Pack | Cognitive | Difficulty (label) | DifficultyScore | Topic |
|-----|------|-----------|-------------------|-----------------|-------|
| P1-EC-011 | pack_c | Analyze | Easy | 4 | COSO Principle 7 — risk severity |
| P1-ED-002 | pack_d | Analyze | Easy | 4 | Three lines of defense model |

Both items have `Difficulty: "Easy"` (label) but `DifficultyScore: 4` (which maps to Difficult per S121 §3.3). Per S121 §4.4, Analyze has a DS floor of >=3 — the score of 4 is correct and appropriate for Analyze/Difficult. The label "Easy" is incorrect: the stem complexity (COSO risk severity, three-lines-of-defense model) is clearly Difficult-level analysis. **Fix: change Difficulty label to "Difficult"** to match the score. Not a content defect — metadata alignment only.

## 4. Clean-List Attestation

**No Critical findings.** Zero DL-008 (EW[CC] non-empty), DL-026 (empty EW[non-CC]), zero "all/none of the above" (AOTA) in distractors, zero missing fields. No key errors. No DL-051 patterns in case items. DL-003: 2 QIDs (0 actionable); DL-043: 2 QIDs (0 actionable — both CC-slot keeps).

**MCQ items independently solved — selected examples (6 calculation items):**

| QID | Pack | Diff/Cog | Verified Key | Stored Key | Status |
|-----|------|----------|-------------|------------|--------|
| P1B-E-082 | pack_b | Moderate/Apply | A (17) | A | ✓ Match |
| P1B-E-100 | pack_b | Moderate/Apply | C (Both SOX+Dodd-Frank) | C | ✓ Match |
| P1B-E-103 | pack_b | Easy/Apply | D (password policy = ITGC) | D | ✓ Match |
| P1B-E-125 | pack_b | Moderate/Apply | B (TLS encryption) | B | ✓ Match |
| P1B-E-137 | pack_b | Easy/Apply | C (internal audit independence) | C | ✓ Match |
| P1B-E-150 | pack_b | Easy/Apply | C (COSO monitoring) | C | ✓ Match |

**Case numeric items independently verified (5 of 5):**

| Case / QID | Computation | Derived | Stored | Status |
|-----------|-------------|---------|--------|--------|
| CBQ-E1-Q3 | $180,000 ÷ $6,000,000 = 3.0% | 3.0 | 3.0 | ✓ Match |
| CBQ-E2-Q2 | 12 ÷ 340 = 3.53% → 3.5 | 3.5 | 3.5 | ✓ Match |
| CBQ-F2-Q1 | 9,000 × 9 min ÷ 60 = 1,350 hrs | 1350 | 1350 | ✓ Match |
| CBQ-F2-Q2 | 9,000 × 7% = 630 invoices | 630 | 630 | ✓ Match |
| CBQ5-E2-Q3 | ($18.2M×12%)−($18.2M×3%)−$420K | 1,218,000 | 1218000 | ✓ Match |

**Case Q&A verification (spot-check):**
- **P1B-E-082** ✓: COSO 2013 framework = 5 components, 17 principles. Choice A="17" is correct. EC cites "17 principles" verbatim. EW[A-D] all correct.
- **P1B-E-100** ✓: SOX §806 + Dodd-Frank §922 both provide whistleblower anti-retaliation. Choice C="Both" is correct. EC names both statutes. EW[A] correctly excludes Securities Exchange Act, EW[B] correctly excludes Dodd-Frank alone, EW[D] correctly excludes SOX alone.
- **P1B-E-103** ✓: Password complexity = ITGC access security. Choice D is correct. EC correctly distinguishes ITGC from application controls. EW[A-C] correctly identify application controls.

**Mechanical scan clean:** Zero DL-008 (EW[CC] non-empty), DL-026 (empty EW[non-CC]), missing fields. DL-003: 2 QIDs (1 distractor keep per user, 1 CC-slot); DL-043: 2 CC-slot keeps (0 actionable).

## 5. Section Summary Table

| Metric | Count |
|--------|-------|
| Total Section E items | 532 |
| MCQ items | 464 |
| Case items | 68 |
| Independently solved (MCQ) | 28 (6.0% of MCQ) |
| Independently solved (case numerics) | 5 (100%) |
| **CRITICAL findings** | **0** |
| **HIGH findings** | **0** |
| **MEDIUM findings** | **29** (2 DL-003 + 2 DL-043 + 23 SHORT-EW + 2 metadata mismatch) |
| **INFO findings** | **4** (1 DL-003 CC-slot keep + 1 DL-003 distractor keep [user override] + 2 DL-043 CC-slot keeps — no remediation required) |
| Key/math errors | 0 |

## 6. True DL-003 QID List (2 items — corrected)

**RECONCILIATION NOTE:** Prior list had 6 items (5 "actionable" + 1 keep). Independent authoritative word-boundary scan finds only **2 true DL-003** items in Section E. The 4 retracted items were "whenever" substring false positives. 2 DL-043 ("all of the above") items tracked separately (both CC-slot keeps).

| QID | Pack | Choice | Term | CorrectChoice | Slot | Disposition |
|-----|------|--------|------|---------------|------|-------------|
| P1B-E-150 | pack_b | D | "always" | C | Distractor | **Legitimate keep** (user-documented override per COSO Principle 16) |
| P1E-E-124 | pack_e | C | "never" | C | CorrectChoice | CC-slot keep — "never" in correct answer |

**DL-043 ("all of the above") QID List (2 items — both CC-slot keeps, 0 actionable):**

| QID | Pack | Choice | CorrectChoice |
|-----|------|--------|---------------|
| P1B-E-087 | pack_b | D | D |
| P1B-E-150 | pack_b | C | C (also DL-003 distractor keep) |

**Actionable DL-003 (0):** P1B-E-150 is the sole distractor-slot absolute but was documented as a keep by user directive. P1E-E-124 is CC-slot (not actionable).
**Actionable DL-043 (0):** Both are CC-slot keeps.
**Legitimate keeps (2):** P1B-E-150 (user override), P1E-E-124 (CC-slot).

## 7. SHORT-EW QID List (23 items)

| QID | Pack | EW slot(s) | Length |
|-----|------|-----------|--------|
| P1B-E-082 | pack_b | EW[C] | 69 |
| P1B-E-100 | pack_b | EW[B] | 66 |
| P1B-E-103 | pack_b | EW[A] | 67 |
| P1B-E-115 | pack_b | EW[B] / EW[D] | 74 / 65 |
| P1B-E-123 | pack_b | EW[D] | 72 |
| P1B-E-125 | pack_b | EW[D] | 61 |
| P1B-E-129 | pack_b | EW[C] | 72 |
| P1B-E-130 | pack_b | EW[B] | 70 |
| P1B-E-131 | pack_b | EW[D] | 70 |
| P1B-E-137 | pack_b | EW[C] | 60 |
| P1B-E-142 | pack_b | EW[C] | 60 |
| P1B-E-143 | pack_b | EW[C] | 64 |
| P1B-E-145 | pack_b | EW[C] | 68 |
| P1B-E-146 | pack_b | EW[C] | 72 |
| P1B-E-148 | pack_b | EW[C] | 72 |
| P1B-E-149 | pack_b | EW[A] / EW[C] | 71 / 74 |
| P1B-E-150 | pack_b | EW[D] | 73 |
| P1E-E-001 | pack_e | EW[C] | 67 |
| P1E-E-009 | pack_e | EW[B] | 67 |
| P1E-E-010 | pack_e | EW[A] / EW[C] | 68 / 67 |
| P1E-E-011 | pack_e | EW[A] / EW[C] | 62 / 57 |
| P1E-E-025 | pack_e | EW[C] | 74 |
| P1E-E-063 | pack_e | EW[C] | 74 |

**Full QID list (23):** P1B-E-082, P1B-E-100, P1B-E-103, P1B-E-115, P1B-E-123, P1B-E-125, P1B-E-129, P1B-E-130, P1B-E-131, P1B-E-137, P1B-E-142, P1B-E-143, P1B-E-145, P1B-E-146, P1B-E-148, P1B-E-149, P1B-E-150, P1E-E-001, P1E-E-009, P1E-E-010, P1E-E-011, P1E-E-025, P1E-E-063.

## 8. METADATA MISMATCH QID List (2 items: Difficulty label vs. Score)

| QID | Pack | Cognitive | Difficulty (label) | DifficultyScore | Fix |
|-----|------|-----------|-------------------|-----------------|-----|
| P1-EC-011 | pack_c | Analyze | Easy | 4 | Relabel to "Difficult" |
| P1-ED-002 | pack_d | Analyze | Easy | 4 | Relabel to "Difficult" |

## 9. Carry-Over from Prior Sections

1. **CBQ3-A4 case-level change-set** (Section A Critical): CBQ3-A4-Q2/Q3/Q4 quarantined (Certified→In Audit) and corrected — Q2 key $12K→$0, Q3 "no journal entry," Q4 "no ratio impact." **Remediated & quarantined** per Remediation Wave 1 (2026-09-16). Not affecting Section E.
2. **DL-003 status** (Sections A–E): 10 accumulated unique QIDs (2+3+1+2+2) through Section E. Per independent authoritative scan: 9 are CorrectChoice-slot absolutes (legitimate keeps), 1 is a distractor-slot absolute (P1B-E-150 Choice D "always") documented as a legitimate keep per user directive (COSO Principle 16). **0 actionable DL-003.** After Section F (5 more CC-slot), final total = 15 DL-003 QIDs (14 CC-slot keeps + 1 documented keep, 0 actionable). 5 DL-043 ("all of the above") items also tracked — all CC-slot keeps (0 actionable): P1E-C-056, P1E-C-061, P1B-E-087, P1B-E-150, P1B-F-100. See `reports/P1_REVIEW_CONSOLIDATED_RECONCILED.md`.
3. **SHORT-EW backlog** (through Sections A–E): 144 accumulated unique QIDs (30+34+17+40+23). After Section F reconciliation (22), final consolidated total = 166, matching the consolidated report.

## 10. Evidence Rule

All findings cite verbatim data from source files. The independent reviewer should:

- For Finding 1: Open any listed QID and confirm the choice contains standalone "always"/"never" (not as substring of another word).
- For Finding 2: Spot-check EW length on any listed QID.
- For Finding 3: Read P1-EC-011 and P1-ED-002 metadata fields (`Difficulty` label vs. `DifficultyScore`) to confirm the mismatch.
- For case verification: Open `content/cases/case_pack_{1,2,3}_corrected.js`, locate each CaseID, read Exhibit 1, and confirm the computation matches the derived answer.

---

*End of Section E handoff. Halting per STOP RULE — awaiting authorization to continue to Section F.*
