# S110P — UX Priority Ranking

**Session:** 110P
**Date:** 2026-07-31

---

## Scoring Methodology

Each candidate improvement is scored on four dimensions:

| Dimension | Scale | Description |
|-----------|-------|-------------|
| **Value** | 1-10 | Learner impact: how much does this improve the study experience? |
| **Effort** | 1-10 | Implementation complexity (1 = trivial, 10 = major architecture change) |
| **Risk** | 1-10 | Risk of regression, bugs, or content spill (1 = none, 10 = high) |
| **Fidelity** | 1-10 | Exam realism impact: does this make the simulator feel more like the CMA exam? |

### Composite Score Formula
```
Score = (Value × 2) + (Fidelity × 2) − (Effort × 0.5) − (Risk × 0.5)
```
Value and Fidelity are weighted 2x because learner experience and exam realism are the primary goals.

---

## Ranked Feature List

### Tier 1 — Do Immediately (Score ≥ 25)

| # | Feature | Value | Effort | Risk | Fidelity | Score |
|---|---------|-------|--------|------|----------|-------|
| 1 | **A/B/C/D letter key selection** | 9 | 2 | 1 | 10 | 36.5 |
| 2 | **Choice strikethrough (right-click)** | 10 | 4 | 2 | 10 | 37.0 |
| 3 | **Submit confirmation dialog** | 7 | 1 | 1 | 8 | 29.0 |
| 4 | **Activate SOCRATIC May mode** | 6 | 1 | 2 | 4 | 18.5 |
| 5 | **Activate MOTIVATE May mode** | 5 | 1 | 2 | 3 | 14.5 |
| 6 | **"All wrong choices" default-expanded** | 6 | 1 | 1 | 6 | 23.5 |
| 7 | **Review Flagged Only pre-submit** | 8 | 3 | 2 | 9 | 31.5 |
| 8 | **Setup presets (Focus A, Weakest)** | 7 | 3 | 2 | 5 | 21.5 |
| 9 | **Keyboard shortcut docs in UI** | 6 | 2 | 1 | 7 | 24.5 |
| 10 | **Difficulty slider numeric readout** | 4 | 1 | 1 | 4 | 15.5 |

### Tier 2 — Next Sprint (Score 15–24)

| # | Feature | Value | Effort | Risk | Fidelity | Score |
|---|---------|-------|--------|------|----------|-------|
| 11 | **Recovery Sprint results comparison** | 7 | 4 | 3 | 6 | 22.5 |
| 12 | **Confidence Dashboard visualization** | 8 | 6 | 4 | 5 | 22.0 |
| 13 | **Domain Readiness visualization** | 7 | 4 | 3 | 4 | 18.5 |
| 14 | **Calculator position preservation** | 5 | 3 | 2 | 7 | 21.5 |
| 15 | **Export/Print results (simple)** | 6 | 5 | 3 | 4 | 18.0 |
| 16 | **Filter review by "correct but guessed"** | 5 | 2 | 2 | 5 | 18.5 |
| 17 | **Navigate to MCQs from case view** | 6 | 3 | 3 | 7 | 22.0 |
| 18 | **Case item detail on review screen** | 5 | 4 | 3 | 6 | 18.5 |
| 19 | **Numeric-pad calculator integration** | 4 | 3 | 2 | 6 | 17.5 |
| 20 | **Unlimited session history** | 5 | 2 | 2 | 4 | 18.0 |

### Tier 3 — Future (Score < 15)

| # | Feature | Value | Effort | Risk | Fidelity | Score |
|---|---------|-------|--------|------|----------|-------|
| 21 | Progress trend charts (visual) | 7 | 8 | 5 | 3 | 13.5 |
| 22 | Session history date-range filter | 5 | 4 | 2 | 3 | 14.5 |
| 23 | Individual history item delete | 4 | 2 | 2 | 2 | 12.0 |
| 24 | `prefers-color-scheme` auto-detect | 3 | 2 | 1 | 3 | 12.5 |
| 25 | May one-click Recovery Session | 6 | 6 | 5 | 4 | 14.5 |
| 26 | Export PDF (full) | 6 | 8 | 5 | 3 | 11.5 |
| 27 | Cloud sync | 8 | 9 | 9 | 2 | 13.0 |
| 28 | TI BA-II Plus calculator | 4 | 9 | 7 | 6 | 12.0 |
| 29 | LLM coaching activation | 9 | 4 | 7 | 3 | 20.5* |

*LLM activation scores high on Value but high on Risk (hallucination, cost, unknown behavior). Recommended: pilot with EXPLAIN only; defer full activation until effectiveness data validates.

---

## Top 10 by Composite Score

| Rank | Feature | Score | Category |
|------|---------|-------|----------|
| 1 | **Choice strikethrough** | 37.0 | Exam Fidelity |
| 2 | **A/B/C/D letter keys** | 36.5 | Exam Fidelity |
| 3 | **Review Flagged pre-submit** | 31.5 | Exam Fidelity |
| 4 | **Submit confirmation dialog** | 29.0 | Safety |
| 5 | **Keyboard shortcut docs in UI** | 24.5 | Discoverability |
| 6 | **"All wrong choices" default open** | 23.5 | Learning |
| 7 | **Recovery Sprint results compare** | 22.5 | Recovery |
| 8 | **Confidence Dashboard** | 22.0 | Analytics |
| 9 | **Navigate MCQs from case view** | 22.0 | Navigation |
| 10 | **Setup presets** | 21.5 | UX |

---

## Impact vs. Effort Quadrant Map

```
HIGH IMPACT
│
│  ★ Strikethrough
│  ★ Letter keys
│  ★ Review Flagged pre-submit
│  ★ Submit confirmation
│
│  LLM activation ◇────── ★ Confidence Dashboard
│  Recovery comparison     ★ Readiness viz
│  Case←MCQ navigation     ★ Export results
│
│  ◇──── Setup presets ──────◇────── ★ Progress charts
│  ◇──── Keyboard docs        ◇────── ★ Cloud sync
│  ◇──── Wrong choices open   ◇────── ◇── TI BA-II Plus
│
│  ◇ Calculator pos           ◇── CSV export
│  ◇ Filter by guessed
│  ◇ Numeric readout
│
└──────────────────────────────────────────
LOW EFFORT                          HIGH EFFORT

★ = Tier 1 (Do immediately)
◇ = Tier 2 (Next sprint)
◇ = Tier 3 (Future)
```

---

## Parallel-Safe Verification

All Tier 1 features are:

| Feature | Touches | Content Safe? | Certification Safe? | May Safe? |
|---------|---------|---------------|---------------------|-----------|
| Strikethrough | app.js, styles.css | ✓ (visual only) | ✓ | ✓ |
| Letter keys | app.js keyboard handler | ✓ | ✓ | ✓ |
| Review Flagged | app.js renderReviewScreen | ✓ | ✓ | ✓ |
| Submit confirm | app.js finish() | ✓ | ✓ | ✓ |
| SOCROTIC mode | may-pilot-activation.js | ✓ | ✓ | May only |
| MOTIVATE mode | may-pilot-activation.js | ✓ | ✓ | May only |
| Wrong choices open | app.js review card render | ✓ | ✓ | ✓ |
| Setup presets | app.js, index_updated.html | ✓ | ✓ | ✓ |
| Keyboard docs | app.js, index_updated.html | ✓ | ✓ | ✓ |
| Slider readout | index_updated.html | ✓ | ✓ | ✓ |

**Zero pack file touches. Zero case file touches. Zero certification changes. Zero May logic changes (except activating existing code).**
