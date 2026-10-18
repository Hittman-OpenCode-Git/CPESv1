# P2-A Second Verification Handoff Report

**Verifier role:** Senior Management Accountant + CMA Exam Editor + QA Engineer (read-only)  
**Scope:** Pack A gate = MCQ `p2/pack_p2_a.js` (600 items) + Section A cases (19 cases / 114 items across `case_pack_p2_{1,2,3}.js`)  
**Method:** Canonical parser (`scripts/lib/pack_parser.js`) + `CaseExtractor.js`. Regex block-windows retired; word-boundary `\bterm\b` for term screens; slot-scoped counting; two-run stability where applicable.  
**DL-045 compliance:** No auto-verdicts from screens — every candidate adjudicated by hand before reporting.  
**Mode:** READ-ONLY. No pack edits. All fixes proposed only.

---

## 1. Parse Integrity (ground truth)

| Metric | Value |
|--------|-------|
| MCQ items parsed | 600 / 600 |
| Parser diagnostics | 0 ERROR, 0 WARNING |
| Silent drops | 0 (invariant: records + failures === census) |
| Architecture | 100% `single`-block (flat EW + nested Choices + CorrectChoice) |
| Cases (Section A) | 19 cases / 114 items, 0 structural defects |

**Verdict: CLEAN.** Bank parses byte-complete with zero anomalies.

---

## 2. Portfolio Distribution (Pack A MCQ)

| Dimension | Distribution |
|-----------|-------------|
| Section | A: 600 (100%) |
| Calc / Conceptual | 352 calc / 248 conceptual (59% / 41%) |
| Difficulty | Easy:68, Mod-Easy:102, Moderate:218, Difficult:145, Very Difficult:67 |
| Cognitive | Apply:244, Analyze:146, Evaluate:77, Understand:93, Remember:40 |
| CorrectChoice | A:149, B:172, C:148, D:131 |

CC streak / balance within normal psychometric range (B-mode at 28.7% — flagged for downstream monitoring but within tolerance for a 600-item pack).

---

## 3. Structural Gates — all 600 MCQ items

| Gate | Result |
|------|--------|
| `Part2OnlyFlag === true` | 600/600 PASS |
| `question_state` registered value | 600/600 `Certified` |
| QID format `P2-A-NNN` | 600/600 PASS |
| `CorrectChoice` in {A,B,C} | 600/600 PASS |
| `EW[CorrectChoice] === ""` (DL-008) | 600/600 PASS |
| non-CC `EW[X]` present & ≥50 chars | 600/600 PASS |
| `ExplanationCorrect` present | 600/600 PASS |
| `Stem` present, Choices A–D present | 600/600 PASS |

**Verdict: CLEAN.** Zero structural defects across all 600 items.

---

## 4. Independent Solve Verification

### 4a. Blinded MCQ sample (39 items)
Stratified by calc/concept × difficulty × cognitive. Stored key **withheld** during derivation. Each item solved from stem + choices alone; calculations recomputed twice.

**Result: 39/39 agreement with stored key.** Zero disagreements.

Sample included: Easy/Remember → Very Difficult/Evaluate, calc + conceptual, all 5 cognitive levels.

### 4b. Section A case numeric items (13 items)
13 numeric case items (CBQ21-A1, CBQ21-A3, CBQ22-A2, CBQ23-A3, CBQ23-A7) independently recomputed from exhibit data with stored answer withheld during derivation.

**Result: 13/13 correct.** Verified: current ratio 1.63, quick ratio 0.93, DSO 45.5, net margin 6.00%, DuPont ROE 15.63%, quality-of-income 0.60, core earnings $22.5M, current DSO 47.6, forex transaction loss $34,260, lease-adjusted D/E 1.34, DOL 5.00, DFL 1.33, DCL 6.67.

**Verdict: KEYS SOUND.** No wrong-key defects detected in the sample.

---

## 5. EC–CC Coherence Screen

Heuristic: detect ECs that name a Choice letter not matching the stored `CorrectChoice`.  
Screen flagged 8 candidates; **7 adjudicated as false positives** (regex matched trap-mentioning text or qualitative prose; EC in fact endorses the correct choice).

### 5a. TRUE DEFECT

#### [P2-A-349] — EC/Key mismatch (HIGH)

**Check:** ExplanationCorrect endorses a different answer and references a different stakeholder than the stem.  
**Evidence:**

- **Stem stakeholder:** "Flash Energy **Raj Patel, Analyst**, is decomposing profitability for the strategic review."
- **Stored CorrectChoice:** **B** — "Gross margin 40.0% using net sales $5,200,000 ($2,080,000 / $5,200,000 where $2,080,000 = $5,200,000 - $3,120,000) on target." (Gross margin: ($5.2M - $3.12M)/$5.2M = $2.08M/$5.2M = **40.0%** ✓ — key B is arithmetically correct.)
- **EC computation:** "Operating margin = Operating Income / Net Sales... Gross ,720,000 = ,800,000 - ,080,000... Margin = ,140,000 / ,800,000 = 16.76%. **Choice D** correctly removes the ,000 restructuring charge to show core recurring margin of 16.8%. Business interpretation: **Project manager Laura Kim** should report core margin near 16.8%..."
- **Stakeholder in EC:** "Project manager **Laura Kim**" (stem has **Raj Patel**).
- **EC's Choice D** in *this* item = "Markup 66.7% computed as $2,080,000 / $3,120,000" — but the EC describes an *operating* margin computation with a restructuring charge that does not appear in this item's exhibits/choices.

**Diagnosis:** ExplanationCorrect is **orphaned/mis-filed from a different item** (an operating-margin/restructuring-charge item). It endorses "Choice D", names "Laura Kim", and computes operating margin (16.76%) — none of which belong to this gross-margin item (CC=B, Raj Patel). The stored key B is arithmetically correct; the EC is wrong.

**Severity:** HIGH — a learner reading the explanation receives factually incorrect guidance. This is a DL-008-class coherence defect (EC does not derive the stored key) plus a content-integrity defect (stakeholder/name mismatch).

**Proposed fix:** Replace EC with a gross-margin derivation tied to Raj Patel and Choice B. Retain CC=B (verified correct: 40.0%).

**Confidence:** 100% (EC prose verbatim quotes mismatch stakeholder + subject matter).

### 5b. False positives (adjudicated CLEAN — not defects)

| Qid | Why flagged | Why clean |
|-----|-------------|-----------|
| P2-A-006 | regex matched "best" near alt text | EC endorses Alternative 3 = CC |
| P2-A-113 | regex matched near distractor | EC's SGR analysis supports CC=D |
| P2-A-174 | regex noise | EC clearly endorses vertical analysis = CC=A |
| P2-A-221 | — | EC opens "The correct answer is D" = CC |
| P2-A-291 | mentions Choice A in trap ref | EC endorses D = CC; A-mention is trap explanation |
| P2-A-318 | regex noise | EC endorses "both methods permitted" = CC=A |
| P2-A-096 | — | EC opens "The correct answer is C" = CC |

---

## 6. Forbidden-Term Screen (DL-003: absolute language)

Word-boundary `/\b(always|never|impossible)\b/gi`, slot-scoped (distractor vs CC), unique-QID basis.

| Metric | Count |
|--------|-------|
| QIDs with ≥1 absolute term (distractor slots) | 36 |
| Multi-hit QIDs (≥2 absolute terms — cuing risk) | **9** |
| Absolute terms in CC slot (legitimate) | 2 |
| DL-043 ("all/none of the above") | 0 |

### 6a. Multi-hit items (9) — cuing-risk candidates

These have 2–3 absolute terms in distractor slots. Pedagogically this is *partly* defensible (the extreme distractor is the trap being tested — "Higher retention ALWAYS creates more shareholder value" is exactly the misconception the item targets). However, ≥2 absolute terms in distractors in one item creates a test-wise cue: a candidate who knows "always/never choices are usually wrong" can eliminate multiple distractors without knowing the content. **Flagged for human adjudication — not auto-confirmed as defects.**

The 9 multi-hit QIDs:
- **P2-A-133** (CC=D): 3/3 distractors use "always" (deferred tax classification traps) — all 3 extremes are the trap; CC=D is the nuanced answer.
- **P2-A-134** (CC=B): 2 absolute terms (fiscal year-end comparability).
- **P2-A-145** (CC=B): 2 absolute terms (Non-GAAP manipulative / SBC exclusion).
- **P2-A-160** (CC=A): Choice C contains both "always" + "never" (single slot double-hit — OCI treatment).
- **P2-A-179** (CC=D): 2 absolute terms (auditor changes routine / operations-only).
- **P2-A-180** (CC=A): 2 "never" (tax expense comparability).
- **P2-A-186** (CC=C): always/never (EPS dilution treatment).
- **P2-A-470** (CC=B): always/never (ratio divergence cause).
- **P2-A-499** (CC=A): 2 "always" (benchmark/target fallacies).

**Adjudication note:** In all 9, the absolute terms appear ONLY in distractor slots (slot-scoped confirmation), and the CC is the nuanced, non-absolute answer. This is consistent with intentional "extreme distractor" design rather than authoring sloppiness. **Recommend LOW severity — design-quality observation, not a remediation mandate.** A future authoring wave could diversify distractor language to reduce cuing. The 27 single-hit items are unremarkable.

### 6b. CC-slot absolute terms (2) — legitimate

- **P2-A-551** [D] "The raw gas value never belongs to Summit" — defensible absolute (agent-principal: the agent never controls the commodity). CC slot.
- **P2-A-572** [A] "The balance sheet equation... always holds" — definitional absolute. CC slot.

Both are conceptually true statements; not violations. Confirmed slot-scoped (CC, not distractor).

---

## 7. Rotation-Clone Screen (DL-046-P2)

Pairwise comparison on **normalized numeric-literal multiset + Topic** (Jaccard prose alone is insufficient per methodology).

| Metric | Result |
|--------|--------|
| Clone groups detected | **0** |
| Items in clone groups | 0 |

**Verdict: CLEAN.** No numeric-multiset + Topic collisions in Pack A.

---

## 8. Section A Cases — Structural + Coherence

| Metric | Result |
|--------|--------|
| Cases | 19 (CBQ21-A1..A6, CBQ22-A2..A6, CBQ23-A1..A8) |
| Items | 114 (43 numeric, 51 select, 10 multi, 10 match) |
| Case-level missing required fields | 0 |
| Item-level structural issues (no ItemID/Correct/Explanation/Prompt) | 0 |
| Numeric answer verification (13-item sample) | 13/13 correct |

All 19 cases have 6 items each. Exhibits parse cleanly. No orphaned-item or duplicate-CaseID-in-pack issues detected in the Section A subset.

---

## 9. Verdict Summary

| Area | Status |
|------|--------|
| Parse integrity | CLEAN |
| Structural gates (600 MCQ) | CLEAN |
| EC–CC coherence | **1 DEFECT (P2-A-349)** |
| DL-003 absolute terms | 9 multi-hit cuing candidates (LOW, design observation) |
| DL-043 all/none | CLEAN |
| Clone screen | CLEAN |
| Independent solve (MCQ 39-item) | CLEAN (39/39) |
| Case structure (19 cases) | CLEAN |
| Case numeric answers (13-item) | CLEAN (13/13) |

### Gate recommendation: CONDITIONAL PASS

- **1 confirmed content defect** (P2-A-349) requires EC replacement before any certification action.
- 9 DL-003 multi-hit items are design-quality observations — not blockers, but candidate for a distractor-language diversification pass.
- No wrong-key defects found in the independent-solve sample (52 items: 39 MCQ + 13 case numeric).

---

## 10. Open Carry-Over Items (for next session)

1. **P2-A-349 EC replacement** — needs new gross-margin explanation tied to Raj Patel + CC=B. (Blocker for this item's certifiability.)
2. **DL-003 multi-hit human adjudication** — confirm whether 9 items' extreme-distractor density is acceptable to the editor or warrants language diversification.
3. **Remaining packs B–F + their section cases** — not yet scanned. Pack-gate protocol requires P2-A closeout before proceeding.

---

*Report prepared from raw file evidence. All verbatim quotes are Tier-1/2 evidence (actual file bytes). No manifest-only or line-number-only claims. Save to `reports/P2_VERIFY_PACK_A_HANDOFF.md`.*
