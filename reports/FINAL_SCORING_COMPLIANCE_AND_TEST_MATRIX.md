# Final Scoring Compliance and Test Matrix

**Phase 10 — 2026-07-24**

---

## 1. Scoring Architecture (Verified from app.js)

```
practiceScores() → weighted = mcqPct * 0.75 + casePct * 0.25 → scaled = weighted * 500
```

### Verified Compliance

| Requirement | Status | Evidence |
|-------------|--------|----------|
| 100 MCQs in Full mode | **YES** | app.js:951 |
| 2 CBQs in Full mode | **YES** | app.js:952 |
| MCQ 75% weight | **YES** | app.js:1598 |
| CBQ 25% weight | **YES** | app.js:1598 |
| No negative marking | **YES** | Incorrect/unanswered = 0 |
| Case partial credit | **PARTIAL** | Each task scored independently; no intra-task partial credit |
| Score disclaimer | **YES** | app.js:1639: "Practice-scaled estimate" |
| 50% MCQ gate before CBQ | **NOW YES** | app.js:1192-1209 (added Phase 10) |

---

## 2. Changes Applied (Phase 10)

### Change 1: MCQ_GATE_THRESHOLD constant (app.js:55)
```javascript
const MCQ_GATE_THRESHOLD = 0.50;
```

### Change 2: Gate flag in session (app.js:837)
```javascript
_mcqGatePassed: false,
```

### Change 3: 50% MCQ gate (app.js:1192-1209)
When mode='full' and MCQs exhausted, calculates MCQ score. If <50%, blocks case access with gate-fail UI offering Submit/Review buttons.

### Change 4: History scaledScore fix (app.js:714,723)
Changed from MCQ-only `analyticsSummary.accuracy * 500` to `practiceScores().scaled` (weighted MCQ+Case formula).

---

## 3. Scoring Test Matrix (Documented — Tests Not Yet Run)

| Test | Input | Expected | Status |
|------|-------|----------|--------|
| SCORE-01 | 0% MCQ, 2 cases unanswered | weighted ≈ 0, scaled ≈ 0 | NOT RUN |
| SCORE-02 | 49% MCQ correct | Gate blocks CBQ access in Full mode | NOT RUN |
| SCORE-03 | 50% MCQ correct | Gate allows CBQ access in Full mode | NOT RUN |
| SCORE-04 | 100% MCQ, 0% CBQ | weighted = 75%, scaled = 375 | NOT RUN |
| SCORE-05 | 100% MCQ, 100% CBQ | weighted = 100%, scaled = 500 | NOT RUN |
| SCORE-06 | 100 MCQ unanswered | mcqPct = 0, scaled = 0 (or 0.25*cases-only) | NOT RUN |
| SCORE-07 | Wrong answer selected | Counts as incorrect, no penalty beyond 0 | NOT RUN |
| SCORE-08 | Multi-select: 1 of 2 correct | 0 points (all-or-nothing) | NOT RUN |
| SCORE-09 | Match: 2 of 3 pairs correct | 0 points (all-or-nothing) | NOT RUN |
| SCORE-10 | Wrong Q1, correct Q2 in case | Q2 scored independently | NOT RUN |
| SCORE-11 | Answer shuffle integrity | CC letter maps to correct text post-shuffle | NOT RUN |
| SCORE-12 | Practice mode vs Full mode | Gate only active in Full mode | NOT RUN |
| SCORE-13 | Pool denominator with excluded | Archived/Hold/In Audit items excluded | NOT RUN |
| SCORE-14 | History scaledScore matches report | Both use practiceScores().scaled | NOT RUN |
| SCORE-15 | Disclaimer visibility | "Practice-scaled estimate" visible | NOT RUN |

---

## 4. Remaining Scoring Gaps

1. **Hold state exclusion:** `assignTier()` does not exclude "Hold" items — P1-AD-047, P1-AD-048 served as Tier 2/3 (GOV-001)
2. **No partial credit for multi-select/matching:** All-or-nothing scoring. CMA exams use all-or-nothing on multi-select, so this may be intentional.
3. **No intra-task partial credit:** Each case task is either fully correct or fully wrong. Multi-step tasks cannot award partial correctness without structural changes to `correctCase()`.
4. **"Passing range" label at scaled=360:** The actual CMA pass point is determined by modified-Angoff standard setting, not a fixed 360. The disclaimer covers this but the label may be misleading.

---

*Generated 2026-07-24 — Phase 10 completion*
