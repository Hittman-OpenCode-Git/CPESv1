# Session 79 — Final UI Polish (Wife Testing Readiness)

**Session:** 79 (Governance Light Lane)
**Date:** 2026-07-29
**Files Modified:** `may-core.js`, `styles.css`

---

## Fixes Applied (ranked by impact)

### 1. Dark mode choice button borders — INVISIBLE → VISIBLE
**File:** `styles.css`
**Issue:** In dark mode, `.choice` buttons had `border: 2px solid var(--border-light)` where `--border-light: #1e293b` equals `--choice-bg: #1e293b`. The border was invisible — choice buttons looked like floating text with no visual separation.
**Fix:** Added `[data-theme="dark"] .choice { border-color: #374151; }` — a visible but subtle border.

### 2. May's new-student greeting — 15+ LINE MONOLOGUE → 3-LINE WARM WELCOME
**File:** `may-core.js` line 207
**Issue:** After entering their name, new students got a long paragraph about May being a "study companion," a pre-production warning, and "What would you like to do first?" — overwhelming for a tired student at night.
**Fix:** Shortened to: `"Nice to meet you, [name]! I can explain questions from your practice sessions, give you hints, and help you figure out what to work on next. What would you like to do?"`

### 3. "Welcome back — have we met before?" → WARMER RETURNING-STUDENT GREETING
**File:** `may-core.js` line 225
**Issue:** The returning-student greeting was oddly phrased ("Welcome back — have we met before?"), contradictory because May just said "Welcome back."
**Fix:** Changed to: `"Hi! Have you studied with me before, or is this your first time?"` — clear binary choice, natural language.

### 4. Defect diagnostics panel — ALWAYS VISIBLE → COLLAPSED MINI-BANNER
**File:** `styles.css`
**Issue:** The `#defectDiagnostics` panel at the top of the page showed developer-level pool stats ("Loading diagnostics...") to learners — confusing clutter.
**Fix:** Added `.diag-panel` CSS: collapsed to 22px single-line with ellipsis; hover expands to show full content. Present but unobtrusive.

### 5. "Set up May" → "Meet May"
**File:** `may-core.js` line 6437
**Issue:** The companion card button for new users said "Set up May" — sounded like configuration/settings, not an invitation.
**Fix:** Changed to `"Meet May"` — warmer, more inviting.

---

## Considered but Skipped

| Idea | Why skipped |
|------|-------------|
| Score report reorder | Too complex — the review queue is already at the bottom; moving it up would require restructuring the entire renderSummary() method |
| Mobile touch targets to 44px | Would require redesigning compact action buttons; the 6px→12px bump from S76 already helps |
| Dark mode placeholder contrast | Risk of breaking light mode if `::placeholder` is overridden globally |
| May's onboarding card text | Already clean from S76 — 4 capability chips + simple intro |
| "Loading diagnostics..." text change | The JS that populates it is in app.js; minimizing the panel visually is enough |
