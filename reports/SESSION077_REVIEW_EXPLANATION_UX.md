# Session 77 — Review Mode Explanation UX Polish

**Session:** 77 (Governance Light Lane)
**Date:** 2026-07-29
**Files Modified:** `app.js`, `styles.css`

---

## What Changed

### Before
Post-session review cards rendered a single dense explanation block:
```html
<div class="feedback good/bad">
  <div class="feedback-header">...</div>
  <p>Stem text</p>
  <p><b>Your answer:</b> ...</p>
  <p><b>Correct answer:</b> ...</p>
  <div class="explanation"><b>Explanation:</b> [one big block]</div>
  <p>Confidence</p>
  <div class="remediate">Study links</div>
</div>
```

Issues:
- One dense text block with no visual separation between concepts
- No distractor analysis (ExplanationWrong fields completely ignored)
- No structured breakdown of what was tested, why correct, why wrong
- Poor scannability for review sessions

### After
Each review card now has a structured breakdown:

```
┌──────────────────────────────────────────┐
│ [Priority Badge]  QID  |  Section/Topic  │
│                                          │
│ ── Question stem ──                      │
│                                          │
│ Your answer: A. ...              ✗       │
│ Correct answer: C. ...           ✓       │
│                                          │
│ ╔ WHAT WAS TESTED ═════════════════════╗ │
│ ║ This question tests revenue          ║ │
│ ║ recognition under ASC 606...         ║ │
│ ╚══════════════════════════════════════╝ │
│                                          │
│ ╔ WHY THE CORRECT ANSWER WINS ════════╗ │
│ ║ Under ASC 606, performance           ║ │
│ ║ obligations must be...               ║ │
│ ╚══════════════════════════════════════╝ │
│                                          │
│ ╔ WHY YOUR ANSWER WAS WRONG ══════════╗ │
│ ║ Option A confuses revenue timing     ║ │
│ ║ with cash receipt...                 ║ │
│ ╚══════════════════════════════════════╝ │
│                                          │
│ ╔ ALL WRONG CHOICES EXPLAINED ════════╗ │
│ ║ A. ... (distractor reasoning)        ║ │
│ ║ B. ... (distractor reasoning)        ║ │
│ ║ D. ... (distractor reasoning)        ║ │
│ ╚══════════════════════════════════════╝ │
│                                          │
│ ╔ EXAM TAKEAWAY ══════════════════════╗ │
│ ║ A common error is to apply the       ║ │
│ ║ percentage to total sales instead    ║ │
│ ║ of credit sales only...              ║ │
│ ╚══════════════════════════════════════╝ │
│                                          │
│ [Study links]                            │
└──────────────────────────────────────────┘
```

### Changes Detail

#### app.js

| # | Change | Location |
|---|--------|----------|
| 1 | Added `extractExplanationSections()` function | ~line 59 | 
| 2 | Restructured `AdaptiveReviewQueue.render()` card output | ~line 2395 |
| 3 | Added ExplanationWrong field rendering for distractor analysis | ~line 2395 |
| 4 | Added student-specific wrong-answer explanation display | ~line 2395 |
| 5 | Added `studentChoiceLetter` / `correctLetter` tracking for MCQ items | ~line 2395 |
| 6 | Preserved existing `nl2br()` rendering for all text blocks | all sites |

#### styles.css

| # | Change | Location |
|---|--------|----------|
| 1 | Redesigned `.explanation` (improved padding, font-size 13→0.85rem) | ~line 1361 |
| 2 | Added `.review-stem` — question text with bottom border separator | new |
| 3 | Added `.review-answers` flex column layout | new |
| 4 | Added `.review-answer-row` — colored answer rows (green/red) | new |
| 5 | Added `.review-answer-label` — uppercase label styling | new |
| 6 | Added `.review-breakdown` — section container | new |
| 7 | Added `.review-section` — individual breakdown card | new |
| 8 | Added `.review-section-label` — section header bar | new |
| 9 | Added `.review-section-body` — section content area | new |
| 10 | Added color-coded labels: green (correct), red (wrong), blue (tested), accent (takeaway) | new |
| 11 | Added `.review-distractors` + `.review-distractor-item` — distractor list | new |
| 12 | Added dark theme variants for all new classes | ~line 3610 |

### Section Extraction Logic

`extractExplanationSections()` uses three heuristics to parse the single ExplanationCorrect block:

| Section | Heuristic |
|---------|-----------|
| **What was tested** | First sentence mentioning "under ASC/IFRS/COSO/GAAP" or "tests/covers/assesses" |
| **Why correct** | Remaining core explanation text after removing tested + takeaway |
| **Exam takeaway** | Last sentence matching "common error", "exam tip", "key takeaway", "remember", "watch for" — or last short sentence as fallback |

If heuristics find nothing, the full explanation is placed in "Why correct" as a safe fallback.

### Verification

- `node --check app.js` — PASS
- `npm run smoke` — PASS (10/10, all UI surfaces, May panel, MCQ banks)
- Governance: Light Lane — no pack/case/answer-key/registry/baseline files modified
- Dark theme: all new sections have explicit dark theme variants
