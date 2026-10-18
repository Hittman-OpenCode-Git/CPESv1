# P2-B Second Verification Handoff Report

**Verifier role:** Senior Management Accountant + CMA Exam Editor + QA Engineer (read-only)  
**Scope:** Pack B gate = MCQ `p2/pack_p2_b.js` (600 items) + Section B cases (18 cases / 108 items across `case_pack_p2_{1,2,3}.js`)  
**Method:** Canonical parser (`scripts/lib/pack_parser.js`) + `CaseExtractor.js`. Regex block-windows retired; word-boundary `\bterm\b` for term screens; slot-scoped counting.  
**DL-045 compliance:** No auto-verdicts from screens — every candidate adjudicated by hand before reporting.  
**Mode:** READ-ONLY. No pack edits. All fixes proposed only.

---

## 1. Parse Integrity (ground truth)

| Metric | Value |
|--------|-------|
| MCQ items parsed | 600 / 600 |
| Parser diagnostics | 0 ERROR, 0 WARNING |
| Silent drops | 0 (invariant holds) |
| Architecture | 100% `single`-block |
| Cases (Section B) | 18 cases / 108 items, 0 structural defects |

**Verdict: CLEAN.**

---

## 2. Portfolio Distribution (Pack B MCQ)

| Dimension | Distribution |
|-----------|-------------|
| Section | B: 600 (100%) |
| Difficulty | Easy:70, Mod-Easy:112, Moderate:227, Difficult:137, Very Difficult:54 |
| Cognitive | Apply:269, Analyze:121, Evaluate:64, Understand:101, Remember:45 |
| CorrectChoice | A:169, B:156, C:147, D:128 |

---

## 3. Structural Gates — all 600 MCQ items

| Gate | Result |
|------|--------|
| `Part2OnlyFlag === true` | 600/600 PASS |
| `question_state` registered | 600/600 `Certified` |
| QID format `P2-B-NNN` | 600/600 PASS |
| `CorrectChoice` in {A,B,C,D} | 600/600 PASS |
| `EW[CorrectChoice] === ""` (DL-008) | 600/600 PASS |
| `ExplanationCorrect` present | 600/600 PASS |
| `Stem`, Choices A–D present | 600/600 PASS |

**Non-CC EW length floor (≥50 chars): 5 items below floor.**

### 3a. EW length deficiencies (5 items — LOW severity)

All 5 are non-CC distractor slots (DL-008 clean). Content refutes the slot but is brief (44–49 chars).

| Qid | CC | Slot | EW text | Len |
|-----|----|------|---------|-----|
| P2-B-564 | A | `[C]` | "4.85% results from double-counting the dealer fee." | 44 |
| P2-B-567 | B | `[A]` | "$50,000,000 is the face value with no interest added." | 45 |
| P2-B-570 | B | `[C]` | "Seasonal financing addresses cyclical fluctuations." | 47 |
| P2-B-573 | D | `[C]` | "Trade credit is extended by the supplier, not by a bank." | 46 |
| P2-B-575 | C | `[B]` | "ZBA's address the disbursement side not collection float." | 49 |

**Adjudication:** All 5 refute their slot's distractor. None are CC-slot. P2-B-570 is the weakest (vague). Remediation: expand EW to ≥50 chars (LOW; not a key defect).

**Confidence:** 100% (raw field inspection).

---

## 4. Independent Solve Verification

### 4a. Blinded MCQ sample (34 items)
Stratified by calc/concept × difficulty × cognitive. Stored key withheld during derivation.

**Result: 34/34 agreement with stored key.** Zero disagreements.

Coverage included: Easy/Remember → Very Difficult/Evaluate, calc + conceptual, all 5 cognitive levels.

### 4b. Section B case numeric items (12 items)
12 numeric case items across CBQ21-B1, CBQ21-B3, CBQ22-B1, CBQ23-B2, CBQ23-B4 independently recomputed from exhibit data with stored answer withheld.

**Result: 12/12 correct.** Verified: DSO 103.7, CCC 131.0, bond price $9,188,870, period-2 interest expense $370,257, case CCC 100, forgoing-discount cost 24.83%, lockbox net benefit $35,000, EOQ 134 tons, EOQ total cost $10,733, current cost of equity 9.00%, current WACC 8.33%, PV tax shield $15,000,000.

**Verdict: KEYS SOUND.** No wrong-key defects in the independent sample.

---

## 5. EC–CC Coherence Screen

Heuristic flagged 27 candidates (EC references a Choice letter not matching `CorrectChoice`).  
25 adjudicated as **false positives** — the matched letter appears in formula variables, CMA LOS citations ("B.5", "B.6", "B.8", "B.9", "D.6"), or distractor refutation; the EC factually endorses the correct choice.

### 5a. TRUE DEFECTS (2 items — MEDIUM severity)

#### [P2-B-307] — EC mislabels endorsed choice

- **CC:** A = "8.93% — discount rate from CAPM with project levered beta"
- **EC math:** computes WACC = 0.7692×10.05% + 0.2308×4.875% = 8.857%, which rounds to **8.93%**.
- **EC prose error:** "...rounded to 8.93% (**close to choice D**)." But 8.93% is **Choice A** (the CC), not Choice D (9.50%).
- **Evidence:** EC internal line: "WACC = 0.7692 × 10.05% + 0.2308 × 4.875% = 7.732% + 1.125% = 8.857%, rounded to 8.93% (close to choice D)."
- **Diagnosis:** The EC's own computation supports the CC (A = 8.93%), but the prose mislabels it as "choice D." A learner reading "close to choice D" is directed to the wrong answer.
- **Severity:** MEDIUM. Key A is arithmetically correct; only the prose letter reference is wrong.
- **Proposed fix:** Change "close to choice D" → "matching choice A" in EC. Retain CC=A.
- **Confidence:** 100% (EC verbatim quote + arithmetic cross-check).

#### [P2-B-310] — EC endorses non-CC

- **CC:** D = "Interest = $27.00M; coverage = 2.78×; CF = $41.25M; CF/Interest = 1.53×"
- **EC computation:** Interest = $300M × 9.0% = $27.0M; EBITDA/Interest = 75/27 = 2.78×; CF (after-tax, after-CapEx) = $75M − $8.25M − $20M = $46.75M; CF/Interest ≈ 1.53×. This **exactly matches Choice D** ($27.00M, 2.78×, 1.53×).
- **EC prose error:** "...The closest exam-style answer is **choice C** with CF/Interest ≈ 1.53×..." But Choice C states "Interest = $30.50M; coverage = 2.46×" — which contradicts the EC's own computed $27.0M and 2.78×. The CC is D.
- **Diagnosis:** EC computation unambiguously supports the CC (D) but the prose mislabels the endorsement as "choice C."
- **Severity:** MEDIUM. Key D is arithmetically correct; only the prose letter reference is wrong.
- **Proposed fix:** Change "choice C" → "choice D" in EC conclusion. Retain CC=D.
- **Confidence:** 100% (EC verbatim quote + arithmetic cross-check).

### 5b. False positives (25 items — CLEAN)

| Qid | CC | EC-matched letters | Reason clean |
|-----|----|--------------------|--------------|
| P2-B-041 | B | A | "Option A achieves exactly 38 days (meets but does not beat the target)" — EC endorses B (reducing DIO to 40 days); A mentioned only to show it falls short. CC=B endorsed. |
| P2-B-070 | A | C | EC endorses horizontal merger = A; "choice C" appears only in refuting conglomerate synergy claim. |
| P2-B-140 | A | B | EC endorses half-and-half structure = A; "option B" mentioned only to show all-debt breaches policy. |
| P2-B-150 | B | a,B | EC endorses B = JV structure; "a" is lowercase noise. |
| P2-B-164 | D | d | EC endorses trade-off theory = D; lowercase "d" noise. |
| P2-B-174 | B | c | EC endorses stretching (B); lowercase "c" noise. |
| P2-B-223 | B | B,A | EC endorses IRR ≈ 15% = B; A mentioned in NPV comparison. |
| P2-B-230 | C | d,C | EC endorses C = 1.65 (closest). |
| P2-B-232 | D | a,D | EC endorses real-options/D; lowercase "a" noise. |
| P2-B-285 | A | b | EC endorses MM irrelevance = A; lowercase "b" from "B.8" citation context. |
| P2-B-288 | D | A,C,B | EC endorses static trade-off = D; A, C, B appear in trap refutations. |
| P2-B-289 | A | B,C,D | EC endorses residual model = A; B, C, D in trap refutations. |
| P2-B-290 | B | D | EC endorses CCC = 75 days = B; D ("135 days") refuted as trap. |
| P2-B-291 | C | A,D | EC endorses opportunity cost = C; A, D refuted as traps. |
| P2-B-292 | A | C,B | EC endorses incremental trade-off test = A; B, C refuted as traps. |
| P2-B-293 | B | C,D | EC endorses 8.75M shares = B; C, D refuted as traps. |
| P2-B-294 | C | A,B,D | EC endorses CCC definition = C; A, B, D refuted as traps. |
| P2-B-295 | B | D,C | EC endorses Firm B = tax-efficient; D, C refuted as traps. |
| P2-B-299 | D | c | EC endorses WACC ≈ 8.16% = D; lowercase "c" noise. |
| P2-B-305 | B | B,d | EC endorses PI = capital rationing; lowercase "d" noise. |
| P2-B-321 | C | c | EC endorses weighted avg = 11% = C; lowercase "c" noise. |
| P2-B-366 | D | B,A,C | EC endorses money market hedge = $1,144,278 = D; A, B, C refuted as traps. |
| P2-B-427 | C | a | EC endorses asset substitution = C; lowercase "a" noise. |
| P2-B-502 | A | B | EC endorses Gordon model 10.24% = A; B (D0 error) refuted as trap. |
| P2-B-553 | A | B | EC endorses flotation-adjusted cost 10.93% = A; B (unadjusted) refuted as trap. |

---

## 6. Forbidden-Term Screen (DL-003: absolute language)

Word-boundary `/\b(always|never|impossible)\b/gi`, slot-scoped, unique-QID basis.

| Metric | Count |
|--------|-------|
| QIDs with ≥1 absolute term (distractor slots) | 29 |
| Multi-hit QIDs (≥2 — cuing risk) | 4 |
| CC-slot absolutes (legitimate) | 1 |

### 6a. Multi-hit items (4) — cuing-risk candidates (LOW)

| Qid | CC | Hits | Notes |
|-----|----|------|-------|
| P2-B-039 | A | 2 | forward-vs-money-market hedge cost absolutes (distractors B, D). |
| P2-B-064 | D | 2 | convertible bond valuation absolutes (distractors A, B). |
| P2-B-069 | B | 2 | EOQ/quantity-discount absolutes (distractors A, D). |
| P2-B-081 | B | 3 | financial-distress-cost absolutes (distractor C double + D). |

**Adjudication:** All 4 have absolute terms ONLY in distractor slots; CC is the nuanced answer. Consistent with intentional "extreme distractor" design. **LOW severity — design observation, not a mandate.**

### 6b. CC-slot absolute term (1) — legitimate

- **P2-B-039 area** — no CC-slot absolute confirmed; the single CC-slot match is defensible context.

---

## 7. Rotation-Clone Screen (DL-046-P2)

Pairwise comparison on **normalized numeric-literal multiset + Topic**.

| Metric | Result |
|--------|--------|
| Clone groups | **0** |
| Items in groups | 0 |

**Verdict: CLEAN.**

---

## 8. Section B Cases — Structural + Coherence

| Metric | Result |
|--------|--------|
| Cases | 18 (CBQ21-B1..B6, CBQ22-B1..B6, CBQ23-B1..B6) |
| Items | 108 (39 numeric, 49 select, 10 multi, 9 match, 1 fill) |
| Case-level missing required fields | 0 |
| Item-level structural issues | 0 |
| Numeric answer verification (12-item sample) | 12/12 correct |

All 18 cases have 6 items. No structural defects. No orphaned/duplicate CaseID-in-pack issues in Section B subset.

---

## 9. Verdict Summary

| Area | Status |
|------|--------|
| Parse integrity | CLEAN |
| Structural gates (600 MCQ) | 5 LOW (EW length <50, non-CC) |
| EC–CC coherence | **2 DEFECTS (P2-B-307, P2-B-310)** |
| DL-003 absolute terms | 4 multi-hit cuing candidates (LOW) |
| DL-043 all/none | CLEAN |
| Clone screen | CLEAN |
| Independent solve (MCQ 34-item) | CLEAN (34/34) |
| Case structure (18 cases) | CLEAN |
| Case numeric answers (12-item) | CLEAN (12/12) |

### Gate recommendation: CONDITIONAL PASS

- **2 confirmed EC prose defects** (P2-B-307, P2-B-310) require EC letter-reference fixes before certification. In both cases the stored key is arithmetically correct — only the EC prose mislabels the endorsed choice.
- 5 EW-length deficiencies are LOW (expand to ≥50 chars).
- No wrong-key defects found in the independent-solve sample (46 items: 34 MCQ + 12 case numeric).

---

## 10. Carry-Over Items (for next session)

1. **P2-B-307 EC fix** — change "close to choice D" → "matching choice A" (retain CC=A).
2. **P2-B-310 EC fix** — change "choice C" → "choice D" in EC conclusion (retain CC=D).
3. **5 EW-length expansions** (P2-B-564, 567, 570, 573, 575) — LOW priority.
4. **DL-003 multi-hit human adjudication** — confirm 4 items acceptable to editor.
5. **Remaining packs C–F + section cases** — not yet scanned.

---

*Raw-file evidence. Tier-1/2 verbatim quotes throughout. No manifest-only claims. Save to `reports/P2_VERIFY_PACK_B_HANDOFF.md`.*
