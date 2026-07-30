# Session 78 — Unify May with Structured Review UX

**Session:** 78 (Governance Light Lane)
**Date:** 2026-07-29
**Files Modified:** `app.js`, `may-core.js`, `styles.css`

---

## What Changed

### Problem
May and the review panel felt like two separate systems. May used her own `_buildTutorExplanation` format. The review used `extractExplanationSections`. There was no bridge between them — a student who wanted coaching on a wrong answer had to manually open the May tab and navigate to the question.

### Solution
Three layers of unification:

#### 1. Bridge buttons in review cards (app.js + styles.css)

Each review card now has a "May bridge" row at the bottom:

```
┌──────────────────────────────────────────┐
│  (... structured review breakdown ...)    │
│                                          │
│  ─────── May coaching ───────            │
│  [Discuss with May] [What went wrong?]  │
│  [Try a similar one]                     │
└──────────────────────────────────────────┘
```

- **Discuss with May** — Opens May tab, sets question context, calls `_discussFromReview()` to present the structured breakdown conversationally
- **What went wrong?** (wrong answers only) — Opens May tab, sets context, calls `handleAction('mymistake')`
- **Try a similar one** — Opens May tab, sets context, calls `handleAction('similar')`

Each button passes the question ID, student's choice letter, correct letter, and correctness flag via `May.setReviewContext()`.

#### 2. May review-context bridge (may-core.js)

Two new methods:

| Method | Purpose |
|--------|---------|
| `setReviewContext(qid, studentLetter, correctLetter, isCorrect)` | Finds the question in the active MCQ banks and stores student answer/result context on `this.context` |
| `_discussFromReview()` | Presents a conversational coaching breakdown using the same section vocabulary as the review card: "What this question was testing", "Why the correct answer wins", "Why your answer was wrong" (personalized per student choice), "Key takeaway for exam day" |

`_discussFromReview()` uses `extractExplanationSections()` from app.js if available (shared function), falling back to the raw explanation if not.

#### 3. Collapsible distractor sections (styles.css + app.js)

The "All wrong choices explained" section in review cards is now collapsible (collapsed by default). Click the header to expand/collapse. Uses a CSS-only toggle with a rotated arrow indicator.

### Visual Unification

| Element | Review Panel | May Dialogue |
|---------|-------------|--------------|
| Section headers | "What was tested" (blue) | "What this question was testing:" (bold) |
| Correct answer logic | "Why the correct answer wins" (green) | "Why the correct answer wins:" |
| Wrong answer logic | "Why your answer was wrong" (red) | "Why your answer (B) was wrong:" |
| Exam takeaway | "Exam takeaway" (accent) | "Key takeaway for exam day:" |
| Distractors | Expandable list | Via "Wrong choices" action |
| Next step | May bridge buttons | Personalized suggestions |

### Verification
- `node --check app.js` — PASS
- `node --check may-core.js` — PASS
- `npm run smoke` — PASS (10/10, all UI surfaces, May panel, MCQ banks)
- Governance: Light Lane — no pack/case/answer-key/registry/baseline files modified
