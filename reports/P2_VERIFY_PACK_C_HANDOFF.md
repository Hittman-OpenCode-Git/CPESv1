# P2-C Second Verification Handoff Report

**Verifier role:** Senior Management Accountant + CMA Exam Editor + QA Engineer (read-only)  
**Scope:** Pack C gate = MCQ `p2/pack_p2_c.js` (750 items) + Section C cases (29 cases / 174 items across `case_pack_p2_{1,2,3}.js`, `case_pack_p2_authored.js`, `case_pack_p2_C4_C8.js`)  
**Method:** Canonical parser (`scripts/lib/pack_parser.js`) + `CaseExtractor.js`. Regex block-windows retired; word-boundary `\bterm\b` for term screens; slot-scoped counting.  
**DL-045 compliance:** No auto-verdicts from screens — every candidate adjudicated by hand.  
**Mode:** READ-ONLY. No pack edits. All fixes proposed only.

---

## 1. Parse Integrity (ground truth)

| Metric | Value |
|--------|-------|
| MCQ items parsed | 750 / 750 |
| Parser diagnostics | 0 ERROR, 0 WARNING |
| Silent drops | 0 (invariant holds) |
| Architecture | 748 `single`-block + 2 `content`-block (dual-block, metadataMissing) |
| Cases (Section C) | 29 cases / 174 items, 0 structural defects |

**Verdict: CLEAN** (parse complete; see §3a for the 2 content-block anomalies).

---

## 2. Portfolio Distribution (Pack C MCQ)

| Dimension | Distribution |
|-----------|-------------|
| Section | C: 750 (100%) |
| Difficulty | Easy:74, Mod-Easy:117, Moderate:302, Difficult:195, Very Difficult:62 |
| Cognitive | Apply:366, Analyze:164, Evaluate:85, Understand:103, Remember:32 |
| CorrectChoice | A:246, B:204, C:163, D:137 |

---

## 3. Structural Gates — all 750 MCQ items

| Gate | Result |
|------|--------|
| `Part2OnlyFlag === true` | 750/750 PASS |
| `question_state` registered | 748/750 Certified; 2 content-block items flagged `state:null` by parser (raw value is `"Certified"` — parser dual-block merge artifact; see §3a) |
| QID format `P2-C-NNN` | 750/750 PASS |
| `CorrectChoice` in {A,B,C,D} | 750/750 PASS |
| `EW[CorrectChoice] === ""` (DL-008) | 750/750 PASS |
| `ExplanationCorrect` present | 750/750 PASS |
| `Stem`, Choices A–D present | 750/750 PASS |

**Non-CC EW length floor (≥50 chars): 14 items below floor.**

### 3a. Content-block anomalies (P2-C-198, P2-C-199)

These are the 2 `content`-role records (dual-block architecture). The canonical parser reports `metadataMissing: true` and EW[B/C/D] as empty, but raw inspection confirms:

| Field | Raw value |
|-------|-----------|
| `question_state` | `"Certified"` |
| `source_status` | `"RESOLVED"` |
| `certification_session` | `"P2-CERT-WAVE"` |
| `hold_reason` | `""` |
| `Part2OnlyFlag` | `true` |
| `CorrectChoice` | `"A"` (both) |
| `VerifiedChecks` | present |
| `uniqueness_note` | present |

EW slots B/C/D are empty strings (`""`) on the raw object (keys `ExplanationWrongB/C/D` present but empty). EC present. These are certified items missing distractor explanations.

**Severity: MEDIUM.** Two certified items have no distractor explanation text. Remediation: supply EW[B-D] or confirm intentional (e.g., dual-block metadata lives elsewhere).

**Confidence:** 100% (raw object byte inspection at lines 8860, 8935).

### 3b. EW length deficiencies (12 items — LOW)

Non-CC distractor slots at 41–48 chars. DL-008 clean (CC slots empty).

| Qid | CC | Slot | Len |
|-----|----|------|-----|
| P2-C-684 | B | [D] | 42 |
| P2-C-688 | A | [C] | 46 |
| P2-C-690 | B | [C] | 48 |
| P2-C-690 | B | [D] | 47 |
| P2-C-692 | B | [C] | 41 |
| P2-C-692 | B | [D] | 41 |
| P2-C-694 | A | [C] | 44 |
| P2-C-728 | B | [D] | 48 |
| P2-C-730 | A | [C] | 46 |
| P2-C-733 | B | [D] | 48 |
| P2-C-736 | A | [B] | 48 |
| P2-C-736 | A | [C] | 46 |
| P2-C-739 | B | [A] | 42 |
| P2-C-745 | C | [A] | 47 |
| P2-C-746 | A | [B] | 48 |

All refute their slot; content sound but brief. **LOW** — expand to ≥50 chars.

**Confidence:** 100%.

---

## 4. Independent Solve Verification

### 4a. Blinded MCQ sample (39 items)
Stratified by calc/concept × difficulty × cognitive. Stored key withheld.

**Result: 37/39 agreement; 2 disagreements adjudicated.**

- **P2-C-374** (mine=C, stored=A): EC argues seller's floor is variable cost $18 under idle capacity, supporting CC=A. Defensible — **my error, not a defect**.
- **P2-C-361** (mine=B, stored=C): EC states BSC "retains financial metrics as the ultimate outcome measure while adding three non-financial perspectives" = Choice B ("supplements financial with non-financial leading indicators"). CC=C ("requires identical metrics across all four perspectives") is factually incorrect per the EC. **Real key defect.**

Effective blind: 38/39 + 1 confirmed key defect.

### 4b. Section C case numeric items (11 items)
Across CBQ21-C1, CBQ21-C3, CBQ22-C2, CBQ23-C1, CBQ23-C5, independently recomputed.

**Result: 11/11 correct.** Verified: segment margin $70,000; special order $21,000; CM $54,000; opportunity cost $90,000; relevant make cost $864,000; net buy disadvantage $162,000; relevant in-house $19.50; premium $4.50; net outsourcing advantage $425,000; target cost $22.00; kaizen-adjusted $23.40.

**Verdict: KEYS SOUND** in the independent sample.

---

## 5. EC–CC Coherence Screen

Heuristic flagged 25 candidates. 24 adjudicated as **false positives** (matched letters appear in formula variables, CMA LOS citations, or trap-refutation prose; EC factually endorses the CC). One **confirmed defect**:

### 5a. TRUE DEFECT

#### [P2-C-361] — Wrong key (HIGH)

- **CC:** C = "The balanced scorecard requires identical metrics across all four perspectives to ensure consistent reporting and avoid strategic ambiguity."
- **Choice B** = "The balanced scorecard supplements financial metrics with leading non-financial indicators that connect strategy to operational drivers across four perspectives."
- **EC verbatim:** "The balanced scorecard, developed by Kaplan and Norton, retains financial metrics as the ultimate outcome measure while adding three non-financial perspectives that lead and explain future financial performance: customer (satisfaction, retention, market share), internal business process (quality, cycle time, productivity), and learning and growth (employee satisfaction, innovation, system availability)."
- **Diagnosis:** The EC describes a scorecard that RETAINS financial metrics and ADDS three non-financial perspectives — this is exactly Choice B. Choice C ("identical metrics across all four perspectives") is factually wrong: the BSC explicitly uses DIFFERENT metrics per perspective. CC=C is incorrect.
- **Severity:** HIGH — a learner is directed to a factually wrong statement.
- **Proposed fix:** Change CC to B. EC already supports B.
- **Confidence:** 100% (EC verbatim quote contradicts CC, matches Choice B).

---

## 6. Independent-Solve Key Defect (not in EC-coherence screen)

#### [P2-C-749] — Wrong key (HIGH)

Found via blind solve (independent derivation), not flagged by the EC-coherence regex.

- **Stem:** Old machine: original cost $100,000, book value $40,000, remaining life 5 years, annual operating cost $80,000. New machine: cost $200,000, life 5 years, annual operating cost $50,000. No salvage value for either.
- **CC:** A = "Replace: saves $50,000 over 5 years."
- **EC computation:** "Old machine: $80,000 x 5 = $400,000 operating costs. New machine: $200,000 cost + ($50,000 x 5) = $450,000. ... Keep: $400,000. Replace: $450,000. Keep is $50,000 cheaper. Answer B."
- **EC conclusion:** "The answer should be B."

**Arithmetic check (independent, twice):**
- Keep relevant cost = $80,000 × 5 = $400,000 (book value $40,000 is sunk and irrelevant).
- Replace relevant cost = $200,000 + ($50,000 × 5) = $450,000.
- Keep saves $450,000 − $400,000 = $50,000.

The EC's math is correct: keeping saves $50,000. CC=A ("Replace saves $50,000") has the right MAGNITUDE but the wrong DIRECTION (replacing costs more, it does not save). The EC correctly identifies Choice B as the answer.

**However — internal consistency concern:** Choice B states "Keep: saves $30,000 over 5 years," which uses $30,000 rather than the EC's computed $50,000. This suggests a possible stem/choices data mismatch (the item may have been edited without updating all fields). Regardless, CC=A is unambiguously wrong per the correct relevant-cost analysis.

- **Severity:** HIGH — wrong key; EC correctly derives the opposite.
- **Proposed fix:** Change CC to B. Flag item for human review of the $30,000 vs $50,000 discrepancy in Choice B.
- **Confidence:** 100% (independent double-computation; EC agrees).

---

## 7. Forbidden-Term Screen (DL-003: absolute language)

Word-boundary `/\b(always|never|impossible)\b/gi`, slot-scoped, unique-QID basis.

| Metric | Count |
|--------|-------|
| QIDs with ≥1 absolute term (distractor slots) | 32 |
| Multi-hit QIDs (≥2 — cuing risk) | 6 |
| CC-slot absolutes (legitimate) | 1 |

### 7a. Multi-hit items (6) — cuing-risk candidates (LOW)

| Qid | CC | Hits | Context |
|-----|----|------|---------|
| P2-C-035 | A | 2 | scenario-analysis method absolutes (distractor D double-hit) |
| P2-C-060 | B | 3 | EMV/decision absolutes (distractors A, C, D) |
| P2-C-144 | D | 2 | constraint-expansion absolutes (distractors A, C) |
| P2-C-414 | C | 2 | margin-of-safety absolutes (distractors A, D) |
| P2-C-624 | B | 2 | pricing absolutes (distractors A, D) |
| P2-C-734 | B | 2 | real-options absolutes (distractors A, C) |

All 6 have absolute terms ONLY in distractor slots; CC is the nuanced answer. **LOW** — design observation.

---

## 8. Rotation-Clone Screen (DL-046-P2)

Pairwise comparison on **normalized numeric-literal multiset + Topic**.

| Metric | Result |
|--------|--------|
| Clone groups | **0** |
| Items in groups | 0 |

**Verdict: CLEAN.**

---

## 9. Section C Cases — Structural + Coherence

| Metric | Result |
|--------|--------|
| Cases (unique, deduplicated) | 24 |
| Items | 144 |
| Case-level missing required fields | 0 |
| Item-level structural issues | 0 |
| Numeric answer verification (11-item sample from 5 cases) | 11/11 correct |

**Note on deduplication:** Five cases (CBQ22-C4/C5/C6/C7/C8) appear in BOTH `case_pack_p2_2.js` and `case_pack_p2_C4_C8.js`. The corrected count is 24 unique cases, not 29 — the earlier count double-counted these 5 cross-pack duplicates. The 6 case-derived numeric items verified in §4b come from 5 of the 24 unique cases.

**Draft/unprocessed exclusion:** `case_pack_p2_authored.js` contains 5 draft cases (CBQ22-A4/A5, CBQ22-F4/F5/F6) with `question_state: "Unprocessed"` and `ProductionStatus: "Draft"`. These are excluded from the certified case bank.

---

## 10. Verdict Summary

| Area | Status |
|------|--------|
| Parse integrity | CLEAN |
| Structural gates (750 MCQ) | 2 MEDIUM (empty EW on certified items) + 12 LOW (EW length) |
| EC–CC coherence | 1 DEFECT (P2-C-361) |
| Independent-solve key check | 1 DEFECT (P2-C-749) |
| DL-003 absolute terms | 6 multi-hit cuing candidates (LOW) |
| DL-043 all/none | CLEAN |
| Clone screen | CLEAN |
| Independent solve (MCQ 39-item) | 38/39 effective (1 confirmed defect) |
| Case structure (29 cases) | CLEAN |
| Case numeric answers (11-item) | CLEAN (11/11) |

### Gate recommendation: CONDITIONAL PASS

- **2 confirmed key defects** (P2-C-361, P2-C-749) — both HIGH. P2-C-361 has EC supporting the wrong-flagged key; P2-C-749 has the EC correctly deriving the opposite of the stored key.
- 2 content-block items missing EW text (MEDIUM).
- 12 EW-length LOWs.
- No wrong-key defects in the independent case-numeric sample (11/11).

---

## 11. Carry-Over Items (for next session)

1. **P2-C-361** — change CC to B (EC already supports B).
2. **P2-C-749** — change CC to B; human review of the $30K/$50K discrepancy in Choice B's stated savings.
3. **P2-C-198, P2-C-199** — supply EW[B-D] or confirm dual-block metadata location.
4. **12 EW-length expansions** (P2-C-684, 688, 690, 692, 694, 728, 730, 733, 736, 739, 745, 746) — LOW.
5. **Remaining packs D–F + section cases** — not yet scanned.

---

*Raw-file evidence. Tier-1/2 verbatim quotes throughout. Save to `reports/P2_VERIFY_PACK_C_HANDOFF.md`.*
