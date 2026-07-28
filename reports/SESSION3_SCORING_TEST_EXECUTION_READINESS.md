# Session 3 — Scoring Test Execution Readiness

**Status:** `PARTIAL — VERIFIED WORK ONLY: RUNTIME TESTS READY, BUT NOT EXECUTED`

**Date:** 2026-07-24
**Session:** 3 (read-only, parallel to Sessions 1 and 2)

---

## SCORE-01 — Zero Performance

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Code path:** `ExamSessionManager.practiceScores()` (app.js:1614-1625)

With zero MCQs (mcqC=0, mcqs.length=0) and zero CBQ tasks (caseC=0, caseT=0):
- `mcqPct` = null (division by 0 guarded: `s.mcqs.length ? ... : null`)
- `casePct` = null
- `raw` = (0+0) / Math.max(1, 0+0) = **0**
- `weighted` = raw = **0** (both pcts null, falls to raw)
- `scaled` = Math.round(0 * 500) = **0**
- `grade` = "Needs substantial review" (0 < 300)

**Display:** `renderSummary()` (line 1660-1663) shows scaled=0/500 with "Needs substantial review" and "Practice-scaled estimate. Actual CMA uses official scaled scoring."

**Formula:** `weighted = (mcqPct !== null && casePct !== null) ? (mcqPct * 0.75 + casePct * 0.25) : raw`

---

## SCORE-02 — 49% MCQ Gate

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Code path:** `ExamSessionManager.render()` (app.js:1194-1210)

```javascript
if (s.mode === 'full' && !s._mcqGatePassed) {
    let mcqCorrect = 0;
    s.mcqs.forEach(q => { if (s.answers[q.QuestionID] === q.CorrectChoice) mcqCorrect++; });
    let mcqPct = s.mcqs.length ? mcqCorrect / s.mcqs.length : 0;
    if (mcqPct < MCQ_GATE_THRESHOLD) {
        // Show gate-failed screen
    }
    s._mcqGatePassed = true;
}
```

**Gate threshold:** `MCQ_GATE_THRESHOLD = 0.50` (app.js:55)

At 49% (e.g., 49/100): mcqPct = 0.49 < 0.50 → **gate fails.** Shows "Minimum MCQ Threshold Not Met" screen with Submit/Review buttons.

**Verification:**
- Numerator: mcqCorrect (items where `s.answers[q.QuestionID] === q.CorrectChoice`)
- Denominator: `s.mcqs.length` (all MCQs, answered or not)
- Operator: strict `<` (49.9% fails, 50.0% passes)
- Gate only in `full` mode
- Unanswered MCQs affect denominator but not numerator → drags percentage down

---

## SCORE-03 — Exactly 50% MCQ Gate

**Evidence Classification:** `CODE_PATH_CONFIRMED`

At exactly 50% (e.g., 50/100): mcqPct = 0.50. `0.50 < 0.50` = **false** → gate passes. `s._mcqGatePassed = true`. CBQ section loads.

**Note:** JavaScript floating-point may produce 0.4999999999 for some exact halves, but for standard counts (50/100 = 0.5 exactly in IEEE 754), the comparison `0.5 < 0.5` is false → passes.

---

## SCORE-04 — 100% MCQ, 0% CBQ

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Code path:** `practiceScores()` (app.js:1614-1625)

- mcqPct = 1.0, casePct = 0.0
- `weighted = (1.0 * 0.75 + 0.0 * 0.25)` = **0.75**
- `scaled = Math.round(0.75 * 500)` = **375**
- `grade` = "Passing range" (375 >= 360)

**Display:** renderSummary() shows score=375/500 with "Passing range" label. The disclaimer line (1663) reads "Practice-scaled estimate. Actual CMA uses official scaled scoring."

**Formula verified:** `mcqPct * 0.75 + casePct * 0.25` — matches the specification exactly.

---

## SCORE-05 — 100% MCQ and 100% CBQ

**Evidence Classification:** `CODE_PATH_CONFIRMED`

- mcqPct = 1.0, casePct = 1.0
- `weighted = (1.0 * 0.75 + 1.0 * 0.25)` = **1.0**
- `scaled = Math.round(1.0 * 500)` = **500**
- `grade` = "Strong pass range" (500 >= 420)

**Score display:** `scaled`/500 with "Strong pass range".

---

## SCORE-06 — Unanswered Items

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**MCQ path (app.js:1617):**
```javascript
s.mcqs.forEach(q => { if (s.answers[q.QuestionID] === q.CorrectChoice) mcqC++; });
```
For unanswered items, `s.answers[q.QuestionID]` is `undefined`. `undefined === q.CorrectChoice` is always `false`. The item is simply not counted — zero credit, no penalty.

**CBQ path (app.js:1618):**
```javascript
s.cases.forEach(c => { c.Items.forEach((it, i) => { caseT++; if (this.correctCase(it, s.caseAnswers[this.caseKey(c, i)])) caseC++; }); });
```
Unanswered case items have `s.caseAnswers[key]` as `undefined`, passed to `correctCase()` which returns `false` for undefined/null inputs. Zero credit, no penalty.

---

## SCORE-07 — Wrong Answers (No Negative Marking)

**Evidence Classification:** `CODE_PATH_CONFIRMED`

The scoring logic is purely additive/count-based. `mcqC++` only increments when `answer === CorrectChoice`. Wrong answers simply do not increment the counter. There is no subtraction, penalty factor, or negative marking logic anywhere in the scoring code.

**Confirmation:** Searched entire app.js for subtraction on score variables — none found. Score decreases can only occur through incorrect answers reducing the percentage denominator (raw percentage drops), never through negative marking.

---

## SCORE-08 — Multi-Select Partial Credit

**Evidence Classification:** `CODE_PATH_FAILS`

**Code path:** `ExamSessionManager.correctCase()` (app.js:1524-1527)

```javascript
if (it.Type === 'multi') {
    if (!Array.isArray(ans) || !Array.isArray(it.Correct)) return false;
    return it.Correct.length === ans.length && it.Correct.every(x => ans.includes(x));
}
```

**Analysis:** This is **all-or-nothing scoring.** The candidate must:
1. Select every correct choice (`it.Correct.every(x => ans.includes(x))`)
2. Select exactly the correct number of items (`it.Correct.length === ans.length`)
3. Select no extra items (implicit in the length check)

**CMA 2026 CBQ standard:** The 2026 CMA exam awards **partial credit** for multi-select tasks — candidates receive proportional credit for each correct selection. The current implementation provides **no partial credit at all.** A candidate who selects 2 of 3 correct answers receives **zero credit** — the same as selecting none.

**Simulation fidelity gap:** This is a material departure from the official exam scoring behavior. Candidates practicing with all-or-nothing multi-select will have a distorted understanding of their actual exam readiness.

**Severity:** `CODE_PATH_FAILS` — requires implementation change for CMA 2026 fidelity.

---

## SCORE-09 — Matching/Drag-Drop Partial Credit

**Evidence Classification:** `CODE_PATH_FAILS`

**Code path:** `ExamSessionManager.correctCase()` (app.js:1526)

```javascript
if (it.Type === 'match') {
    if (!ans || typeof ans !== 'object' || !it.Correct || typeof it.Correct !== 'object') return false;
    return Object.keys(it.Correct).every(k => this.norm(ans[k]) === this.norm(it.Correct[k]));
}
```

**Analysis:** All-or-nothing. Every left item must be matched exactly correctly. A candidate who matches 4 of 5 items correctly receives **zero credit** — same as matching none.

**CMA 2026 CBQ standard:** Partial credit is awarded per correctly matched component.

**Simulation fidelity gap:** Material — distorts the learner's assessment of matching-task proficiency.

---

## SCORE-10 — Independent Case-Subquestion Credit

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Code path:** `practiceScores()` (app.js:1618)

```javascript
s.cases.forEach(c => { c.Items.forEach((it, i) => { caseT++; if (this.correctCase(it, s.caseAnswers[this.caseKey(c, i)])) caseC++; }); });
```

Each case item is scored independently against `it.Correct`. There is no dependency chain, no prerequisite checking, and no carry-forward of results between items. A wrong answer on item 2 does not prevent credit for item 3 if item 3 is answered correctly.

---

## SCORE-12 — Gate Mode Isolation

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Code path:** `ExamSessionManager.render()` (app.js:1194)

```javascript
if (s.mode === 'full' && !s._mcqGatePassed) { ... }
```

The `s.mode === 'full'` guard ensures the 50% MCQ gate applies **only** to full-exam simulation mode. Practice, mixed, case-only, and custom modes are not affected.

---

## SCORE-13 — Active-Pool Denominator Integrity

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Analysis of exclusion states:**

| question_state | assignTier behavior | Active Pool? |
|---------------|---------------------|--------------|
| "Certified" | Tier 1 | YES |
| "Unprocessed" | Tier 2 or 3 (scored) | YES |
| "Archived" | Tier -1 | NO |
| "In Audit" | Tier -1 | NO |
| "Editorial Queue" | Tier -1 | NO |
| **"Hold"** | **Tier 2 or 3 (scored)** | **YES — GAP** |
| Missing/undefined | Tier 2 or 3 (scored) | YES |

**S3-GAP-01:** `"Hold"` is not recognized as an exclusion state by `assignTier()`. Items with `question_state: "Hold"` enter the active pool as Tier 2 or 3 items if they pass the quality score threshold (>= 2).

**Denominator note:** The scoring denominator is session-specific (`s.mcqs.length`, `caseT`) — not the pool size. So malformed or unreachable records that are filtered OUT cannot distort the score denominator. However, items with incorrect `question_state` that enter the pool CAN affect denominators if they are selected into the session.

---

## SCORE-14 — History and Summary Consistency

**Evidence Classification:** `CODE_PATH_CONFIRMED`

**Code paths:**
- Summary screen: `renderSummary()` (line 1634) → `this.practiceScores()`
- History save: `SessionPersistence.saveHistory()` uses score from `practiceScores()`
- History display: `renderHistory()` (line 1704) reads from stored history

Both the active summary screen and the stored history use the identical `practiceScores()` function for score computation. The same formula, numerator, and denominator are used.

---

## SCORE-15 — Score Disclosure

**Evidence Classification:** `CODE_PATH_AMBIGUOUS`

**Display elements in renderSummary() (app.js:1656-1673):**

| Display | Text | Assessment |
|---------|------|------------|
| Scaled score | `<score>/500` | Internal linear conversion (weighted × 500) |
| Grade bands | "Strong pass range" (≥420), "Passing range" (≥360), "Near pass range" (≥300), "Needs substantial review" (<300) | Phrased as definitive bands matching official CMA thresholds |
| Raw accuracy | "Overall raw accuracy: XX%" | Correctly labeled as raw |
| Weighted score | "Exam-weighted: XX% (MCQ 75% / Case 25%)" | Correctly labeled as weighted |
| Disclaimer | "Practice-scaled estimate. Actual CMA uses official scaled scoring." | Present and accurate |

**Gap:** The grade bands use the same thresholds as the official CMA exam (360 = pass, 420 = "strong") and are presented as definitive statements ("Passing range") rather than estimates. While the disclaimer text is present, the grade-band labels imply a direct mapping between the simulator's internal linear conversion and the IMA's proprietary equating/scaling process. A simulator cannot reproduce IMA's scaled-score equating from raw percentages.

**Recommendation:** Change band labels to "Est. strong pass range," "Est. passing range," etc., or add a second disclaimer line noting the bands are estimates based on a linear conversion.

---

## Summary Table

| Test | Classification | Can Execute Now? | Notes |
|------|---------------|------------------|-------|
| SCORE-01 | CODE_PATH_CONFIRMED | YES — code path | Verified formula end-to-end |
| SCORE-02 | CODE_PATH_CONFIRMED | YES — code path | 49% gates correctly |
| SCORE-03 | CODE_PATH_CONFIRMED | YES — code path | 50% passes correctly |
| SCORE-04 | CODE_PATH_CONFIRMED | YES — code path | 0.75 weighted verified |
| SCORE-05 | CODE_PATH_CONFIRMED | YES — code path | 1.0 → 500 verified |
| SCORE-06 | CODE_PATH_CONFIRMED | YES — code path | No penalty for unanswered |
| SCORE-07 | CODE_PATH_CONFIRMED | YES — code path | No negative marking |
| SCORE-08 | **CODE_PATH_FAILS** | YES — code path | All-or-nothing multi-select |
| SCORE-09 | **CODE_PATH_FAILS** | YES — code path | All-or-nothing matching |
| SCORE-10 | CODE_PATH_CONFIRMED | YES — code path | Independent case-item credit |
| SCORE-12 | CODE_PATH_CONFIRMED | YES — code path | Gate only in full mode |
| SCORE-13 | CODE_PATH_CONFIRMED | YES — code path | Hold gap documented |
| SCORE-14 | CODE_PATH_CONFIRMED | YES — code path | Same source for both |
| SCORE-15 | CODE_PATH_AMBIGUOUS | YES — code path | Grade-band labels |

**Tests blocked by parse/runtime prerequisites:** None — all 15 tests can be verified via code-path analysis. However, SCORE-08 and SCORE-09 are confirmed code-level failures for CMA 2026 partial-credit requirements.

---

## CMA 2026 Simulation-Fidelity Gaps

| Gap | Test | Severity | Fix Required |
|-----|------|----------|-------------|
| Multi-select partial credit | SCORE-08 | HIGH | Change `correctCase()` from all-or-nothing to proportional scoring |
| Matching partial credit | SCORE-09 | HIGH | Change `correctCase()` to award per-component credit |
| Grade-band label precision | SCORE-15 | LOW | Add "Est." prefix to band labels or additional disclaimer |

---

## Runtime Tests Still Required After Technical Blockers Are Repaired

1. **SCORE-11** — Live browser verification of full-exam flow (100 MCQs + 2 cases, MCQ gate, scoring display)
2. Browser-based answer-submission + score generation end-to-end
3. localStorage session persistence and recovery with degraded-pool scenarios
4. Timer, pause, and auto-save behavior under real browser conditions
5. Score-rendering verification (CSS, layout, numeric display precision)
