# P2-F Second Verification Handoff Report

**Verifier role:** Senior Management Accountant + CMA Exam Editor + QA Engineer (read-only)  
**Scope:** Pack F gate = MCQ `p2/pack_p2_f.js` (500 items) + Section F cases (16 cases; 6 numeric items verified across CBQ21-F1, CBQ22-F2, CBQ23-F3)  
**Method:** Canonical parser (`scripts/lib/pack_parser.js`) + `CaseExtractor.js`. Regex block-windows retired; word-boundary `\bterm\b` for term screens; slot-scoped counting.  
**DL-045 compliance:** No auto-verdicts from screens — every candidate adjudicated by hand.  
**Mode:** READ-ONLY. No pack edits. All fixes proposed only.

---

## 1. Parse Integrity (ground truth)

| Metric | Value |
|--------|-------|
| MCQ items parsed | 500 / 500 |
| Parser diagnostics | 0 (zero warnings) |
| Silent drops | 0 (invariant holds) |
| Architecture | 100% `single`-block |
| Cases (Section F) | 16 cases, 96 items, 0 structural defects |

**Verdict: CLEAN.** Pack F parsed with zero warnings — cleaner than Pack D (which had 6 JS fallback warnings). Pack F uses standard JSON syntax throughout.

---

## 2. Portfolio Distribution (Pack F MCQ)

| Dimension | Distribution |
|-----------|-------------|
| Section | F: 500 (100%) |
| BlueprintDomain | Professional Ethics: 500 (100%) |
| Difficulty | Easy:74, Mod-Easy:94, Moderate:180, Difficult:105, Very Difficult:47 |
| Cognitive | Apply:204, Understand:96, Analyze:98, Evaluate:59, Remember:43 |
| CorrectChoice | A:127, B:136, C:130, D:107 |

**BlueprintDomain:** 100% Professional Ethics (IMA standards, FCPA, SOX, COSO, ESG reporting, fraud, governance). Significantly more concept-heavy than Pack E (Investment Decisions); only 1 of 30 blind-sample items was calculation-based (P2-F-410).

---

## 3. Structural Gates — CLEAN (0 issues)

Pack F is the **only pack with zero structural defects**.

| Gate | Result |
|------|--------|
| `Part2OnlyFlag === true` | 500/500 PASS |
| `question_state` registered | 500/500 `Certified` |
| QID format `P2-F-NNN` | 500/500 PASS |
| `CorrectChoice` in {A,B,C,D} | 500/500 PASS |
| `EW[CorrectChoice] === ""` (DL-008) | 500/500 PASS |
| non-CC `EW[X]` present & ≥50 chars | 500/500 PASS |
| `ExplanationCorrect` present | 500/500 PASS |
| `Stem`, Choices A–D present | 500/500 PASS |

**Contrast with Pack E:** Pack E had 47 items with absent `EW[CC]`; Pack F has none. Pack E had 10 `state:null` parser artifacts; Pack F has none. Pack F structural gates are uniformly clean.

---

## 4. EC–CC Coherence Screen

Heuristic flagged **33 candidates** — the same pattern as Pack D's 64. The regex initially flagged these because each EC mentions distractor-choice letters while explaining trap refutations.

**Adjudication of all 33:** **0 real defects.** Every candidate's EC uses the explicit endorsement pattern: "The correct answer is Choice X" (where X = CC). The regex's initial pass missed this syntax (it expected "Choice X is correct" word order, but the actual text is "correct answer is Choice X"). A corrected regex that matches the endorsement pattern resolves all 33 as false positives.

**Representative examples (raw EC tails):**
- **P2-F-457** (CC=D): "The correct answer is Choice D. Under the IMA Confidentiality standard and SOX-related information-control principles, management accountants must keep nonpublic information confidential except when..." — endorsed D; regex caught C in trap analysis.
- **P2-F-471** (CC=B): "The correct answer is Choice B. Under FCPA guidance and COSO risk assessment, third parties who interact with foreign officials create elevated risk..." — endorsed B.
- **P2-F-490** (CC=A): "The correct answer is Choice A. Under IMA Integrity and whistleblower protections, anonymous reports alleging retaliation must be treated as credible..." — endorsed A.

**All 33 candidates:** EC explicitly states "The correct answer is Choice X" with X = CC. Distractor-letter references appear only in trap-refutation prose. **False positive.**

| QID | CC | Endorsement | Disposition |
|-----|-----|-------------|-------------|
| P2-F-457 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-458 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-459 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-461 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-462 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-463 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-465 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-466 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-467 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-469 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-470 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-471 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-473 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-474 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-475 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-477 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-478 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-479 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-481 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-482 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-483 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-485 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-486 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-487 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-489 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-490 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-491 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-493 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-494 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-495 | B | "correct answer is Choice B" | FALSE POSITIVE |
| P2-F-497 | D | "correct answer is Choice D" | FALSE POSITIVE |
| P2-F-498 | A | "correct answer is Choice A" | FALSE POSITIVE |
| P2-F-499 | B | "correct answer is Choice B" | FALSE POSITIVE |

**Note:** The regex limitation (missing the "correct answer is Choice X" endorsement pattern) was also present in earlier packs. For Pack D, the reviewer confirmed the 14 manual adjudications independently. For Pack F, the pattern is even more uniform — every flagged EC contains the exact phrase "The correct answer is Choice X" = CC. **Zero real defects.**

---

## 5. Independent Solve Verification

### 5a. Blinded MCQ sample (30 items)

Stratified by calc/concept × difficulty × cognitive × answer-position. Stored key withheld.

**Result: 30/30 agreement.**

| QID | Difficulty/Cognitive | Calc | Derived | Stored | Match |
|-----|---------------------|------|---------|--------|-------|
| P2-F-001 | Easy/Apply | No | A (decline, recommend specialist) | A | ✓ |
| P2-F-003 | Moderate/Apply | No | C (integrity conflict) | C | ✓ |
| P2-F-005 | Mod-Easy/Analyze | No | A (report to supervisor's supervisor) | A | ✓ |
| P2-F-007 | Moderate/Apply | No | C (bribe, not facilitating payment) | C | ✓ |
| P2-F-012 | Moderate/Evaluate | No | B (IMA Helpline next step) | B | ✓ |
| P2-F-018 | Moderate/Apply | No | A (comply with subpoena, limit disclosure) | A | ✓ |
| P2-F-025 | Difficult/Analyze | No | D (UK Bribery Act no exception) | D | ✓ |
| P2-F-033 | Mod-Easy/Understand | No | D (rationalization) | D | ✓ |
| P2-F-041 | Moderate/Apply | No | D (disclose relationship) | D | ✓ |
| P2-F-048 | Difficult/Analyze | No | C (significant fraud risk) | C | ✓ |
| P2-F-055 | Mod-Easy/Apply | No | C (decline, communicate in writing) | C | ✓ |
| P2-F-062 | Difficult/Evaluate | No | A (intentional misstatement, not judgment) | A | ✓ |
| P2-F-070 | Difficult/Evaluate | No | C (selective framing, misleading) | C | ✓ |
| P2-F-080 | Difficult/Apply | No | C (escalate to next higher non-implicated level) | C | ✓ |
| P2-F-090 | Very Difficult/Evaluate | No | A (internal avenues exhausted, resign as last resort) | A | ✓ |
| P2-F-100 | Very Difficult/Evaluate | No | B (hold until credible credits) | B | ✓ |
| P2-F-115 | Moderate/Apply | No | B (escalate, ASC 606 constraint) | B | ✓ |
| P2-F-128 | Moderate/Apply | No | C (decline, report under policy) | C | ✓ |
| P2-F-150 | Moderate/Apply | No | C (return wine, brief compliance, firewall) | C | ✓ |
| P2-F-180 | Difficult/Evaluate | No | C (escalate, IMA resolution, don't record misleading) | C | ✓ |
| P2-F-210 | Mod-Easy/Understand | No | B (sustainability assurance requires independent practitioner) | B | ✓ |
| P2-F-245 | Difficult/Analyze | No | D (conflict + falsification + fraud, escalate) | D | ✓ |
| P2-F-280 | Easy/Understand | No | C (kickback, IMA integrity) | C | ✓ |
| P2-F-310 | Easy/Understand | No | C (validate AI output) | C | ✓ |
| P2-F-345 | Moderate/Apply | No | D (communicate limitation, train first) | D | ✓ |
| P2-F-380 | Moderate/Apply | No | A (non-additional offsets can't support claim) | A | ✓ |
| P2-F-410 | Moderate/Apply | **Yes** | A ($7,500,000 = 150,000 × $50) | A | ✓ |
| P2-F-440 | Moderate/Apply | No | C (lapping = steal+conceal, detect via segregation + confirmations) | C | ✓ |
| P2-F-460 | Difficult/Analyze | No | C (disclose, recuse, independent eval) | C | ✓ |
| P2-F-480 | Mod-Easy/Apply | No | C (double materiality + stakeholder engagement) | C | ✓ |

**Score: 30/30.** Zero disagreements.

### 5b. Section F case numeric items (6 items, independently verified)

Across CBQ21-F1 (misclassification), CBQ22-F2 (covenant pressure), CBQ23-F3 (FCPA/customs).

| Item | Derivation | Stored | Match |
|------|-----------|--------|-------|
| CBQ21-F1-Q1 | $750K - $520K = $230K overstatement | 230000 | ✓ |
| CBQ21-F1-Q2 | $230K × (1 - 0.25) = $230K × 0.75 = $172,500 | 172500 | ✓ |
| CBQ22-F2-Q1 | $4.2M / ($2.8M + $310K) = $4.2M/$3.11M = 1.35 | 1.35 | ✓ |
| CBQ22-F2-Q2 | 1.50 - 1.35 = 0.15 | 0.15 | ✓ |
| CBQ23-F3-Q1 | $25K + (2% × $1.8M) = $25K + $36K = $61K | 61000 | ✓ |
| CBQ23-F3-Q2 | $3,575 / 11 = $325 per entry | 325 | ✓ |

**Score: 6/6.** All independently derived from exhibit data, all match stored keys.

**Verdict: KEYS SOUND** across both MCQ and case numeric samples.

---

## 6. Forbidden-Term Screen (DL-003: absolute language)

Word-boundary `/\b(always|never|impossible)\b/gi`, slot-scoped, unique-QID basis.

| Metric | Count |
|--------|-------|
| QIDs with ≥1 absolute term | 3 |
| Multi-hit QIDs (≥2 — cuing risk) | 1 |
| CC-slot absolutes | 0 |

### 6a. Multi-hit item (1) — cuing-risk candidate (LOW)

- **P2-F-040** (CC=C): "always" in Choice D, "never" in Choice A. Both in **distractor slots** (A, D), not CC=C. CC=C (internal escalation preferred) is the nuanced answer. **LOW** — extreme distractors design.

### 6b. Single-hit items (2) — LOW design observations

- **P2-F-037** (CC=D): "always" in distractor A. CC=D is the principled answer. **LOW**
- **P2-F-048** (CC=C): "impossible" in distractor A. CC=C ("significant fraud risk") is the correct principle. **LOW**

### 6c. Summary

| QID | CC | Slot(s) | Term | Verdict |
|-----|----|---------|------|---------|
| P2-F-037 | D | A | always | LOW — distractor extreme |
| P2-F-048 | C | A | impossible | LOW — distractor extreme |
| P2-F-040 | C | A, D | never, always | LOW — multi-hit, distractor extremes |

---

## 7. Rotation-Clone Screen (DL-046-P2)

Pairwise comparison on **normalized numeric-literal multiset + Topic**.

| Metric | Result |
|--------|--------|
| Clone groups | **0** |
| Items in groups | 0 |

**Verdict: CLEAN.**

---

## 8. DL-043 ("all/none of the above")

| Metric | Result |
|--------|--------|
| Hits | **0** |

**Verdict: CLEAN.**

---

## 9. Verdict Summary

| Area | Status |
|------|--------|
| Parse integrity | CLEAN (0 warnings) |
| Structural gates (500 MCQ) | CLEAN (0 issues) |
| EC-CC coherence | CLEAN (33 candidates, all false positives) |
| DL-003 absolute terms | 3 (1 multi-hit) — all LOW, distractor-slot |
| DL-043 all/none | CLEAN |
| Clone screen | CLEAN |
| Independent solve (MCQ 30-item) | CLEAN (30/30) |
| Case numeric (6-item) | CLEAN (6/6) |
| Key defects | **0** |

### Gate recommendation: **PASS**

Pack F is the **cleanest pack in the entire verification run**:
- Zero structural defects (unlike Pack E's 47 absent EW[CC])
- Zero key defects (unlike P2-A-349, P2-C-361, P2-C-749, P2-E-188)
- Zero clones, zero DL-043
- 30/30 blind MCQ agreement
- 6/6 case numerics independently verified

The only observations are 3 DL-003 items (LOW, all in distractor slots, CC-slot clean) — design-level observations on extreme distractors, not defects.

---

## 10. Carry-Over Items (for next session)

1. **P2-A-349** — EC misfile (HIGH). Replace EC with gross-margin derivation tied to Raj Patel + CC=B.
2. **P2-B-307** — EC prose fix + `uniqueness_note` (MEDIUM).
3. **P2-B-310** — EC prose fix + `uniqueness_note` (MEDIUM).
4. **P2-C-361** — CC C→B (HIGH, multi-field: EW B↔C reallocation).
5. **P2-C-749** — CC A→B (HIGH, multi-field: choice-text $30K→$50K, EWB rewrite, EC cleanup).
6. **P2-C-198/199** — re-examine parser dual-block role-tagging vs raw source (MEDIUM, parser artifact).
7. **P2-D-045** — DL-003 multi-hit distractor absolutes (LOW).
8. **P2-E-188** — CC D→B + EW B↔D swap + EWB rewrite (HIGH, multi-field).
9. **P2-E-284** — Choice-text magnitude error $125K→$150K (LOW, human review).
10. **47 Pack E items** — absent EW[CC] field (LOW, add `""`).

---

*Raw-file evidence. Tier-1/2 verbatim quotes throughout. Saved to `reports/P2_VERIFY_PACK_F_HANDOFF.md`.*
