# Part 1 Section C — Review Handoff Report

**Session:** Independent Section Review — Gate C of 6 (A → B → C → D → E → F)  
**Date:** 2026-09-15  
**Mode:** READ-ONLY  
**Reviewer role:** Senior Management Accountant + CMA Exam Editor + QA Engineer  

---

## 1. Scope Header

| Dimension | Count | Ranges |
|-----------|-------|--------|
| MCQ items reviewed | 643 | Pack A: 130; Pack B: 140; Pack C: 130; Pack D: 105; Pack E: 113 (P1E-C-001 to P1E-C-113) |
| Case items reviewed | 78 | 15 cases tagged Section C (CBQ-C1 through CBQ3-C4) |
| **Total Section C items** | **721** | **Largest section; 100% mechanically scanned; 49 MCQ + 7 case independently solved** |

**Section C topic coverage:** Performance Management — variance analysis (DM/DL/VOH), ROI, residual income, responsibility centers, transfer pricing, balanced scorecard.

---

## 2. Methodology

Same as Sections A/B: full mechanical scan (DL-008/026/043, missing fields, DL-003 forbidden terms with word-boundary checking, SHORT-EW, COG-DIFF), stratified independent solve across all 5 packs, case numeric verification from exhibits.

---

## 3. Findings

### FINDING 1 — MEDIUM: 1 MCQ Item Contains DL-003 Absolute Language (CC-slot keep, 0 actionable) + 2 DL-043 CC-slot keeps

**SEVERITY RECONCILIATION (CORRECTION):** The original Section C report claimed 20 DL-003 items. Independent authoritative word-boundary scan of all 3,070 MCQ items finds only **1 true DL-003** QID in Section C — P1-CD-119, which is a CorrectChoice-slot absolute (legitimate keep, 0 actionable). The other 19 claimed items were false positives from substring matching ("whenever" contains "never" as w-h-e-**n-e-v-e**-r).

**True DL-003 (1 item — CC-slot keep, 0 actionable):**
- P1-CD-119 (pack_d, Choice C="never", CC=C) — correct answer contains "never" ("capability investment...never reach")

**DL-043 ("all of the above") — 2 items, both CC-slot keeps (0 actionable):**
- P1E-C-056 (pack_e, Choice A="All of the above", CC=A) — correct answer IS "all of the above"
- P1E-C-061 (pack_e, Choice D="All of the above", CC=D) — correct answer IS "all of the above"

Both DL-043 items have "all of the above" in the CorrectChoice slot — these are legitimate keeps, not forbidden-choice violations in distractors.

**Severity:** MEDIUM (informational — CorrectChoice-slot absolutes are legitimate, not elimination cues)
**Confidence:** High
**Check:** Standalone "always"/"never"/"impossible" in choice text (strict word-boundary regex `\b(term)\b`); "all of the above" in CorrectChoice vs. distractor slots

**Disposition:** No Batch-2 remediation needed — 0 actionable DL-003, 0 actionable DL-043 in Section C.

---

### FINDING 2 — MEDIUM: 17 MCQ Items Have EW[non-CC] Below 75-Char Floor

**Reconciliation note:** Original count was 18 choice-level entries; P1-C-022 had 2 short EW slots. **17 unique QIDs**.

Same pattern as Sections A and B. 17 unique QIDs with EW 50-74 chars. All present and choice-specific. No action required.

---

## 4. Clean-List Attestation

**MCQ independently verified (49 items):** All keys correct, math recomputes, EW appropriate. Representative: P1-C-018 ($2,475U DL rate ✓), P1-C-021 (19.6% ROI ✓), P1-C-022 ($87,500 RI ✓), P1-C-028 ($3,468U DM price ✓), P1-CC-104, P1-CC-111, P1-CC-115, P1-CC-128, P1-CC-129, P1-CD-112, P1-CD-113, P1-CD-118, P1-CD-119, P1-CD-121, P1-CD-122, P1B-C-131, P1B-C-136, P1B-C-141, P1B-C-154, P1B-C-168, P1B-C-177, P1B-C-201, P1B-C-203, P1B-C-207, P1B-C-209, P1E-C-012, P1E-C-092, P1E-C-S03, plus pack_a stratified sample.

**Case numeric items independently verified (7 items):** CBQ-C1-Q1 ($16,740 ✓), CBQ-C1-Q2 ($8,100 ✓), CBQ-C1-Q3 ($4,800 ✓), CBQ-C2-Q1 ($84,000 RI ✓), CBQ-C2-Q2 (15% ROI ✓), CBQ-C3-Q1 ($60,000 ✓), CBQ-C3-Q2 (5pp ✓).

**Mechanical scan clean:** Zero DL-008 (EW[CC] non-empty), DL-026 (empty EW[non-CC]), missing fields. DL-003: 1 CC-slot keep (0 actionable). DL-043: 2 CC-slot keeps (0 actionable).

---

## 5. Section Summary Table

| Metric | Count |
|--------|-------|
| Total Section C items | 721 |
| MCQ items | 643 |
| Case items | 78 |
| Independently solved (MCQ) | 49 (7.6% of MCQ) |
| Independently solved (case) | 7 (9.0% of case) |
| **CRITICAL findings** | **0** |
| **HIGH findings** | **0** |
| **MEDIUM findings** | **20** (1 DL-003 + 2 DL-043 + 17 SHORT-EW) |
| **INFO findings** | 3 (DL-043 items are CC-slot keeps — no remediation required) |
| Items with key/math errors | 0 |

---

## 6. DL-003 QID List (1 item — CC-slot keep, 0 actionable)

**RECONCILIATION NOTE:** Prior version listed 20 DL-003 QIDs. Independent authoritative word-boundary scan of all 3,070 MCQ items finds only **1 true DL-003** item in Section C. The other 19 were false positives from "whenever" being matched as a substring of "never" via `indexOf("never")`.

| QID | Pack | Choice | Term | CorrectChoice | Disposition |
|-----|------|--------|------|---------------|-------------|
| P1-CD-119 | pack_d | C | "never" | C (CC=C) | CC-slot keep — "capability investment...never reach" |

**DL-043 QIDs (2 items — both CC-slot keeps, 0 actionable)** — "all of the above" appears in CorrectChoice slots:

| QID | Pack | Choice | Term | CorrectChoice |
|-----|------|--------|------|---------------|
| P1E-C-056 | pack_e | A | "all of the above" | A (CC=A) |
| P1E-C-061 | pack_e | D | "all of the above" | D (CC=D) |

## 7. SHORT-EW QID List (17 unique QIDs)

**RECONCILIATION NOTE:** Original listed 18 choice-level entries; P1-C-022 had 2 short EW slots (EW[B] + EW[D]). Reconciliation: **17 unique QIDs**.

| QID | Pack | EW slot | Length |
|-----|------|---------|--------|
| P1-C-018 | pack_a | EW[A] | 68 |
| P1-C-021 | pack_a | EW[D] | 73 |
| P1-C-022 | pack_a | EW[B] | 71 |
| P1-C-022 | pack_a | EW[D] | 72 |
| P1-C-028 | pack_a | EW[B] | 70 |
| P1-C-030 | pack_a | EW[A] | 70 |
| P1-C-033 | pack_a | EW[D] | 54 |
| P1-C-034 | pack_a | EW[A] | 74 |
| P1-C-040 | pack_a | EW[C] | 68 |
| P1-C-042 | pack_a | EW[B] | 64 |
| P1-C-054 | pack_a | EW[A] | 70 |
| P1-C-058 | pack_a | EW[D] | 74 |
| P1-C-064 | pack_a | EW[C] | 68 |
| P1-C-066 | pack_a | EW[B] | 68 |
| P1-C-069 | pack_a | EW[C] | 61 |
| P1-C-076 | pack_a | EW[B] | 68 |
| P1-C-100 | pack_a | EW[B] | 69 |
| P1B-C-168 | pack_b | EW[D] | 69 |

**RECONCILIATION NOTE:** The above table lists 18 choice-level entries across 17 unique QIDs (P1-C-022 has both EW[B]=71 and EW[D]=72). The authoritative unique-QID list is in the consolidated report.

---

## 8. APPENDIX: QID Lists (per reviewer request)

**DL-003 QIDs (1):** P1-CD-119.

**DL-043 QIDs (2):** P1E-C-056, P1E-C-061.

**SHORT-EW QIDs (17):** P1-C-018, P1-C-021, P1-C-022, P1-C-028, P1-C-030, P1-C-033, P1-C-034, P1-C-040, P1-C-042, P1-C-054, P1-C-058, P1-C-064, P1-C-066, P1-C-069, P1-C-076, P1-C-100, P1B-C-168.

---

*End of Section C handoff. Awaiting authorization to continue to Section D.*
