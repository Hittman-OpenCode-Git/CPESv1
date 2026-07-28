# Scoring Test Matrix — Execution Plan

**Status:** PREPARED — NOT YET EXECUTED
**Date:** 2026-07-24

---

## Summary

| Total tests | Code-only verifiable | Browser required | Executed | Remaining |
|-------------|---------------------|------------------|----------|-----------|
| 15 | 13 | 2 | **0** | **15** |

## Test Specifications

### SCORE-01: 0% performance → scaled = 0
- **Verification:** `practiceScores()` pure math — mcqPct=0, casePct=0, weighted=0, scaled=0
- **Code-only:** YES
- **Key line:** app.js:1622-1623

### SCORE-02: 49% MCQ → gate blocked (Full mode)
- **Verification:** `s.mode === 'full' && mcqPct < 0.50` → gate HTML rendered
- **Code-only:** YES (logic inspection)
- **Key line:** app.js:1194-1209

### SCORE-03: 50% MCQ → gate allows (Full mode)
- **Verification:** `0.50 < 0.50` = false → gate skipped → cases render
- **Code-only:** YES
- **Key line:** app.js:1198

### SCORE-04: 100% MCQ, 0% CBQ → scaled = 375
- **Verification:** weighted = 1.0*0.75 + 0.0*0.25 = 0.75, scaled = 375
- **Code-only:** YES
- **Key line:** app.js:1622-1623

### SCORE-05: Perfect score → scaled = 500
- **Verification:** weighted = 1.0, scaled = 500, grade = "Strong pass range"
- **Code-only:** YES
- **Key line:** app.js:1622-1624

### SCORE-06: Unanswered → wrong (0 credit)
- **Verification:** `s.answers[q.QuestionID]` = undefined → `undefined === q.CorrectChoice` = false
- **Code-only:** YES
- **Key line:** app.js:1617

### SCORE-07: Wrong answer → no negative marking
- **Verification:** No penalty logic exists; only binary correct/incorrect increment
- **Code-only:** YES
- **Key line:** app.js:1617 (no else/mcqC-- branch)

### SCORE-08: Multi-select partial credit → 0 (all-or-nothing)
- **Verification:** `correctCase()` requires exact length match + all elements present
- **Code-only:** YES
- **Key line:** app.js:1525

### SCORE-09: Match partial credit → 0 (all-or-nothing)
- **Verification:** `every()` key must match; missing key = undefined → mismatch
- **Code-only:** YES
- **Key line:** app.js:1526

### SCORE-10: Wrong Q1 → Q2 independent
- **Verification:** Case items scored in independent `forEach` loop, no dependency
- **Code-only:** YES
- **Key line:** app.js:1618

### SCORE-11: Answer shuffle integrity
- **Verification:** CC letter comparison (not text); Choices rendered by letter index
- **Code-only:** PARTIAL — logic path confirmed, DOM render needs browser
- **Key line:** app.js:1268, 1297

### SCORE-12: Gate only in Full mode
- **Verification:** `s.mode === 'full'` short-circuits for practice/custom/random modes
- **Code-only:** YES
- **Key line:** app.js:1194

### SCORE-13: Pool denominator excludes excluded
- **Verification:** `assignTier()` assigns _tier = -1 for Archived/In Audit/Editorial Queue; filter removes _tier < 1
- **Code-only:** YES
- **Key line:** app.js:117, 992
- **GOV-001 noted:** "Hold" state NOT excluded — falls through to Tier 2/3

### SCORE-14: History scaledScore matches report
- **Verification:** Both `saveHistory()` and `renderSummary()` call same `practiceScores()`
- **Code-only:** YES
- **Key line:** app.js:714, 1634

### SCORE-15: Disclaimer visible
- **Verification:** Hardcoded HTML string "Practice-scaled estimate. Actual CMA uses official scaled scoring."
- **Code-only:** YES
- **Key line:** app.js:1663

## Execution Order

1. Run SCORE-01,04,05 first (basic math — no session state needed)
2. Run SCORE-06,07,08,09,10 next (scoring logic only)
3. Run SCORE-02,03,12 next (gate logic)
4. Run SCORE-13 (pool construction)
5. Run SCORE-14 (history consistency)
6. Run SCORE-11,15 (render verification — may need browser)

---

*Prepared 2026-07-24 — awaiting execution authorization*
