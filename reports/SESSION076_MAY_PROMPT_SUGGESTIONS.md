# Session 76 — May Prompt Suggestions Implementation

**Session:** 76 (Governance Light Lane)
**Date:** 2026-07-29
**Files Modified:** `may-core.js`, `styles.css`

---

## What Changed

### Before
10 static quick-action buttons always rendered in the input area:
- Explain answer, Wrong choices, Hint, Simplify, My mistake, Similar question, Recovery set, My progress, Weak areas, Session summary
- 6 disabled when no question loaded (with opacity 0.4)
- No context awareness
- Placeholder: "Ask May anything about this question..." (misleading when no question loaded)

### After
Dynamic context-aware suggestion chips via `_buildSuggestionChips()`:

**When a question is loaded:**
- "Explain this" (primary, highlighted)
- "Give me a hint" (hint-styled)
- "Why is my answer wrong?"
- "Break down wrong choices" (only if MCQ with choices)

**When session history exists:**
- "My progress"
- "What should I study next?"

**When nothing is available:**
- "Start a practice session"
- "What can you help with?"

Max 6 chips. Prevents cognitive overload.

**Placeholder text** now adapts:
- With question: "Ask May about this question..."
- Without question: "Try a suggestion below, or ask May anything"

### Empty State Polish
New users now see a capability card with 4 example prompts:
- "Explain the answer"
- "Give me a hint"
- "What should I study next?"
- "Quiz me"

This immediately teaches the user what May can do.

### CSS Additions
- `.may-action-primary` — highlighted blue chip for the primary action
- `.may-capability-prompts` — flex container for empty-state example chips
- `.may-capability-chip` — subtle chip styling for the onboarding examples
- `:focus-visible` on all interactive elements (Send, action chips, scroll button)

### Design Rationale
- Dynamic chips signal May's capabilities without overwhelming the learner
- Primary chip draws attention to the most useful action
- Context-aware chip selection means no disabled buttons cluttering the UI
- Empty-state prompts reduce the "blank page" problem and guide first interaction
