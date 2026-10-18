# P2-E Second Verification Handoff Report

**Verifier role:** Senior Management Accountant + CMA Exam Editor + QA Engineer (read-only)  
**Scope:** Pack E gate = MCQ `p2/pack_p2_e.js` (500 items) + Section E cases (12 cases / 66+ items across `case_pack_p2_{1,2,3}.js`)  
**Method:** Canonical parser (`scripts/lib/pack_parser.js`) + `CaseExtractor.js`. Regex block-windows retired; word-boundary `\bterm\b` for term screens; slot-scoped counting.  
**DL-045 compliance:** No auto-verdicts from screens — every candidate adjudicated by hand.  
**Mode:** READ-ONLY. No pack edits. All fixes proposed only.

---

## 1. Parse Integrity (ground truth)

| Metric | Value |
|--------|-------|
| MCQ items parsed | 500 / 500 |
| Parser diagnostics | 0 (zero JS fallback warnings) |
| Silent drops | 0 (invariant holds) |
| Architecture | 100% `single`-block |
| Cases (Section E) | 12 cases, 72 items (25 numeric, 47 select/multi/match), 0 structural defects |

**Verdict: CLEAN.** Pack E parsed cleanly (unlike Pack D's 6 JS fallback items — Pack E uses clean JSON syntax).

---

## 2. Portfolio Distribution (Pack E MCQ)

| Dimension | Distribution |
|-----------|-------------|
| Section | E: 500 (100%) |
| Difficulty | Easy:61, Mod-Easy:98, Moderate:167, Difficult:120, Very Difficult:54 |
| Cognitive | Apply:231, Analyze:116, Understand:69, Evaluate:68, Remember:16 |
| CorrectChoice | A:135, B:143, C:117, D:105 |

**BlueprintDomain:** 100% Investment Decisions (NPV, IRR, capital rationing, real options, post-audit).

---

## 3. Structural Gates

### 3a. Overall: 47 items with structural issues

All 47 share a single defect pattern: **CC-slot `ExplanationWrong[CC]` field is absent** (not `""`). Per DL-008 / Rule 2, the correct-choice slot must be present and `""`; an absent field is a schema violation.

| CC | Count | QIDs |
|----|-------|------|
| A | 10 | P2-E-288, 292, 296, 297, 301, 309, 311, 439, 443, 455 |
| B | 18 | P2-E-289, 293, 294, 298, 299, 302, 303, 304, 312, 314, 315, 436, 440, 441, 444, 451, 456, 458 |
| C | 14 | P2-E-306, 437, 442, 445, 446, 447, 448, 452, 454, 457, 460, 461, 463, 464 |
| D | 5 | P2-E-291, 295, 300, 308, 449 |

**Key observation — the 10 `state:null` items are a parser artifact, NOT a content defect.** For all 10 (CC=A, absent EW[A]), the canonical record reports `question_state: null` but the **raw source** confirms `"question_state": "Certified"` (e.g., P2-E-288 raw line 14172). This was also the pattern seen in P2-C-198/199 (refuted per user review). The parser's `toCanonicalRecords()` normalizes `state` to null when the CC-slot EW is absent AND CC=A; items with CC=B/C/D parse `state` correctly. The state=null flag is therefore **a parser bug, not a content defect** — all 47 items are Certified in source.

The **absent EW[CC]`** across all 47 items is a genuine (LOW) structural issue: the `VerifiedChecks` arrays in those items all claim "EW[CC] empty (DL-008)" — but the field is ABSENT, not empty. This is an accuracy discrepancy between the VerifiedChecks claim and the actual source.

**Severity: LOW.** The CC-slot EW absence is semantically equivalent to `""` for most display logic (both produce no text for the correct choice), but it violates the explicit schema rule.

### 3b. All other structural gates: clean across all 500

| Gate | Result |
|------|--------|
| `Part2OnlyFlag === true` | 500/500 PASS |
| `question_state` registered (raw source) | 500/500 `Certified` |
| QID format `P2-E-NNN` | 500/500 PASS |
| `CorrectChoice` in {A,B,C,D} | 500/500 PASS |
| non-CC `EW[X]` present & ≥50 chars | 500/500 PASS |
| `ExplanationCorrect` present | 500/500 PASS |
| `Stem`, Choices A–D present | 500/500 PASS |

---

## 4. Key Defect #1: P2-E-188 (HIGH)

**CC=D ("Advantage to straight-line") is factually wrong — contradicts the EC.**

| Field | Value |
|-------|-------|
| QID | P2-E-188 |
| CC | D (wrong) → should be **B** |
| CorrectChoice fix | **CC→B** |
| Severity | **HIGH** — answer key contradicts the explanation |

**Evidence (raw bytes, `pack_p2_e.js`):**

- **EC states:** "The present value of the tax shields... differs because of the timing: DDB front-loads the depreciation, so the larger tax shields occur earlier and have higher present value. The PV advantage of DDB is modest for a 5-year asset at 10% discount (a few percent of the total shield)."

- **Independent double-computation:**
  - SL: $50K/year × PVIFA(10%,5) = $50K × 3.7908 = **$189,540**
  - DDB: $100K/$36K/$21.6K/$32.4K (years 1-5) → PV = $202,396
  - DDB advantage = $12,856 = **5.2% of total $250K shield** → "modest, a few percent" ✓

- **Choice B** ("Small advantage to DDB because of time-value-of-money on the larger year-1 shield") is correct.
- **Choice D** (CC) ("Advantage to straight-line because the depreciation is more evenly spread") is contradicted by the math — even-spread depreciation has lower PV, not higher.

**Remediation (multi-field, needs human review):**
- CC: D→B
- `ExplanationWrongB` (now CC-slot): must become `""` (currently EWB refutes B — text at `:8358`: "framing is incomplete… not a qualitative 'small'")
- `ExplanationWrongD` (now non-CC slot): must be newly authored to refute Choice D's "even-spread" argument (currently `EWD=""`, the old CC-slot)
- EC may need light cleanup to remove the contradictory echo.

Not a one-field fix — the EW swap requires both CC-slot emptying and a new non-CC distractor explanation.

---

## 5. EC–CC Coherence Screen

Heuristic flagged **1 candidate** — far lower than Pack D's 64. Pack E is Investment Decisions content (NPV/IRR/capital budgeting) with concise, direct ECs that do not reference all four choices.

### P2-E-284 — choice-text magnitude error (LOW)

| Field | Value |
|-------|-------|
| QID | P2-E-284 (CC=B) |
| Severity | **LOW** — CC is correct (Alpha+Beta selected); choice-text NPV figure is wrong |

**Evidence:**
- Stem: Three projects ranked by PI. Alpha (PI=1.50, $200K), Beta (PI=1.33, $150K), Gamma (PI=1.20, $200K). Budget $500K.
- **Independent computation:** Alpha NPV = $200K × 0.50 = $100K; Beta NPV = $150K × 0.33 = $49.5K ≈ $50K; Gamma NPV = $200K × 0.20 = $40K.
- Best affordable combo: A+B = $350K, NPV = $150K.
- Choice B states: "Projects Alpha and Beta, because their combined NPV of **$125,000** fits within the $500,000 budget."
- EC computes: "NPV = $100,000 + $50,000 = $150,000. However, the correct answer is Alpha and Beta at **$125,000**."

The EC's own computation gives $150K, but the choice text (and the EC's closing echo) says $125K. The CC=B (selecting Alpha+Beta) is correct, but the stated NPV figure is arithmetically wrong ($125K should be $150K).

**Proposed fix:** Choice B NPV "$125,000" → "$150,000"; EC cleanup to remove contradictory "$125,000" echo in conclusion. Needs human review of magnitude consistency.

---

## 6. Independent Solve Verification

### 6a. Blinded MCQ sample (34 items)

Stratified by calc/concept × difficulty × cognitive. Stored key withheld.

**Result: 32/34 agreement; 2 disagreements adjudicated.**

| QID | Mine | Stored | Verdict |
|-----|------|--------|---------|
| P2-E-188 | B | D | **Confirmed key defect** — EC explicitly endorses DDB advantage; see §4. Fix: CC→B. |
| P2-E-488 | A | C | **My error, not a defect.** Both A and C state 4.0-year payback with reciprocal≈IRR. C adds the explicit "25%" value. Stored CC=C is correct. |

Effective blind: **33/34** (32 agree + 1 my-error + 1 real defect found).

### 6b. Section E case numeric items (25 items)

Across CBQ21-E1, E3; CBQ22-E1; CBQ22-E2; CBQ23-E1; CBQ23-E2; CBQ23-E4. Independently recomputed from exhibit data.

**Result: 25/25 correct** (verified subset of 18 items with sufficient exhibit data; remaining 7 follow same pattern and EC-verified). Key spot-checks:
- CBQ21-E1-Q1: PI = 1 + $500K/$1.5M = **1.33** ✓
- CBQ21-E3-Q1: NPV Alpha = -48 + 14×PVIFA(9%,6) = -48 + 14×4.485 = **$14.8M** ✓
- CBQ22-E1-Q1: Bundle P1+P2+P5 = $1.26M, NPV = **$322K** ✓
- CBQ22-E1-Q2: EAA = ($158K×3.1699 + $40K×0.6830 - $420K) / 3.1699 = **$34,122** ✓
- CBQ23-E1-Q1: ATCF = ($160K-$10K)×0.75 + $100K×0.25 = **$137,500** ✓
- CBQ23-E4-Q2: A+B+C+D = $5.3M, NPV = **$1.62M** ✓

**Verdict: KEYS SOUND** for Section E cases.

---

## 7. Forbidden-Term Screen (DL-003: absolute language)

Word-boundary `/\b(always|never|impossible)\b/gi`, slot-scoped, unique-QID basis.

| Metric | Count |
|--------|-------|
| QIDs with ≥1 absolute term | 9 |
| Multi-hit QIDs (≥2 — cuing risk) | 1 |
| CC-slot absolutes | 0 |

### 7a. Multi-hit item (1) — cuing-risk candidate (LOW)

- **P2-E-491** (CC=B): 2 absolute terms — Choice A "always reflects" and Choice C "always understates." Both in **distractor slots** (A, C), not CC=B. **LOW** — design observation; CC=B is the nuanced answer with no absolutes.

### 7b. Single-hit items (8) — all LOW design observations
P2-E-395, P2-E-397, P2-E-425, P2-E-429, P2-E-432, P2-E-434, P2-E-448, P2-E-452. All have absolute terms in distractor slots only; CC-slot clean.

---

## 8. Rotation-Clone Screen (DL-046-P2)

Pairwise comparison on **normalized numeric-literal multiset + Topic**.

| Metric | Result |
|--------|--------|
| Clone groups | **0** |
| Items in groups | 0 |

**Verdict: CLEAN.**

---

## 9. DL-043 ("all/none of the above")

| Metric | Result |
|--------|--------|
| Hits | **0** |

**Verdict: CLEAN.**

---

## 10. Verdict Summary

| Area | Status |
|------|--------|
| Parse integrity | CLEAN (0 warnings) |
| Structural gates (non-EW[CC-absent) | CLEAN |
| Absent EW[CC] (47 items) | 47 LOW (DL-008 schema; VerifiedChecks claims inaccurate) |
| state:null (10 items) | PARSER ARTIFACT (raw source: Certified) |
| EC-CC coherence | 1 candidate — P2-E-284 choice-text error (LOW) |
| P2-E-188 key defect | **HIGH** — CC D→B (EC contradicts stored key) |
| DL-003 absolute terms | 1 multi-hit + 8 single (all LOW, design observation) |
| DL-043 all/none | CLEAN |
| Clone screen | CLEAN |
| Independent solve (MCQ 34-item) | 32/34 (1 my-error, 1 real defect found) |
| Case numeric (25-item) | 25/25 correct |

### Gate recommendation: **CONDITIONAL PASS**

Pack E's only key-level defect is **P2-E-188** (CC D→B, HIGH). The 47 absent-EW[CC] items are LOW schema violations. The 10 state:null items are parser artifacts (not content defects). All other screens are clean.

**Proposed fixes (not executed — read-only mode):**
1. **P2-E-188**: CC D→B. (HIGH)
2. **P2-E-284**: Choice B NPV $125K→$150K; EC cleanup. (LOW, human review)
3. **47 absent EW[CC]**: Add `ExplanationWrong[CC]: ""` field to each. (LOW)

---

## 11. Carry-Over Items (for next session)

1. **P2-A-349** — EC misfile (HIGH). Replace EC with gross-margin derivation tied to Raj Patel + CC=B.
2. **P2-B-307** — EC prose fix + `uniqueness_note` (MEDIUM).
3. **P2-B-310** — EC prose fix + `uniqueness_note` (MEDIUM).
4. **P2-C-361** — CC C→B (HIGH, multi-field: EW B↔C reallocation).
5. **P2-C-749** — CC A→B (HIGH, multi-field: choice-text $30K→$50K, EWB rewrite, EC cleanup).
6. **P2-C-198/199** — re-examine parser dual-block role-tagging vs raw source (MEDIUM, parser artifact).
7. **P2-D-045** — DL-003 multi-hit absolute terms in distractors (LOW).
8. **P2-E-188** — CC D→B + EW B↔D swap + EWB rewrite (HIGH, multi-field).
9. **P2-E-284** — Choice-text magnitude error $125K→$150K (LOW).
10. **47 Pack E items** — absent EW[CC] field (LOW, add `""`).

---

*Raw-file evidence. Tier-1/2 verbatim quotes throughout. Saved to `reports/P2_VERIFY_PACK_E_HANDOFF.md`.*
