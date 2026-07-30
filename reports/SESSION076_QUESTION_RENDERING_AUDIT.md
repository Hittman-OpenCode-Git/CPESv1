# Session 76 — Question Rendering Audit

**Date:** 2026-07-29  
**Status:** Read-Only Audit  
**Authority:** User Request (Read-Only per AGENTS.md §2)  
**Severity Finding:** HIGH — Line-break collapse makes multi-paragraph stems unreadable

---

## 1. Current Rendering Pipeline

### 1.1 Data Loading

Pack files (`pack_a_corrected.js` through `pack_e_corrected.js`) define global variables `MCQ_BANK_A` through `MCQ_BANK_E` using JSON-style JavaScript arrays. These are loaded via `<script>` tags in `index_updated.html` (lines 2-6). Each question object contains a `Stem` field with the question text.

**Critical data characteristic:** The `Stem` fields in source files contain **literal newline characters** (`\n` and `\n\n`) embedded within JSON string values. These represent paragraph breaks in the authored content:

```
// pack_a_corrected.js line 221 — actual source data format:
"Stem": "CONTROLLER'S MEMORANDUM — Apex Industrial Controls\n\n
TO: CFO Priya Mehta\n
FROM: Elena Vasquez, Controller\n
RE: Revenue Recognition for ApexGuard 9000 Customer Contracts\n\n
Apex sells the ApexGuard 9000..."
```

The same pattern is used for `ExplanationCorrect`, `ExplanationWrong*`, and `ScenarioText` fields. When JavaScript loads these strings via the Function constructor, the literal `\n` sequences become real newline characters in memory.

### 1.2 MCQ Rendering — `renderMCQ()` (`app.js:1601`)

```
Stem data (with \n) 
    → innerHTML template literal: `<h2>${q.Stem}</h2>` (line 1634)
    → Browser HTML parser collapses \n → single spaces
    → Multi-paragraph stems become single jumbled block
```

Key code at line 1634:
```javascript
<h2>${q.Stem}</h2>
```

No processing. No `\n`→`<br>` conversion. No `white-space: pre-line` CSS. No helper function.

### 1.3 Review/Summary Rendering — `AdaptiveReviewQueue.render()` (`app.js:2307`)

```
Explanation data (with \n)
    → innerHTML template: `<div class="explanation">...${q.Explanation || q.ExplanationCorrect}</div>` (line 2347)
    → Browser collapses \n → single spaces
    → Explanations become one giant block of text
```

Key code at line 2344, 2347:
```javascript
<p>${q.Prompt || q.Stem || ''}</p>
...
<div class="explanation"><b>Explanation:</b> ${q.Explanation || q.ExplanationCorrect}</div>
```

### 1.4 Case Rendering — `renderCase()` (`app.js:1750`)

Same pattern. Scenario text (line 1775) and case item prompts (lines 1868, 1871, 1883, 1885):
```javascript
<p>${c.ScenarioText}</p>             // Line 1775
<b>${idx + 1}. ${it.Prompt}</b>      // Lines 1868, 1871, 1883, 1885
```

### 1.5 The `$` helper function — `app.js:369`

```javascript
const $ = id => document.getElementById(id);
```

Content is rendered via `$('sessionView').innerHTML = ...` — everything goes through `innerHTML`, which triggers the browser's HTML whitespace normalization (collapsing `\n` to spaces).

---

## 2. Formatting Issues Found

| # | Issue | Location | Severity | Evidence |
|---|-------|----------|----------|----------|
| 1 | **Newlines in stems collapsed** — `\n\n` paragraph breaks become single spaces in HTML, merging paragraphs into run-on blocks | `app.js:1634` (`renderMCQ`) | **HIGH** | Source data has `\n\n` breaks in `pack_a_corrected.js` lines 221, 325, 377, 429, 533, 585, 637, 689, 793, 1053, 1155, 1207, 1259, 1467, 1519, 1727, 1987, 2767, 3962, 9618, 14883, 19818, 21364, 21411, 21458 — all rendered as single collapsed `<h2>` |
| 2 | **Newlines in explanations collapsed** — post-submission feedback explanations are single monolithic text blocks with no paragraph structure | `app.js:2347` (`renderSummary`) | **HIGH** | `ExplanationCorrect` fields contain `\n` paragraph breaks (see line 229 in pack_a_corrected.js — 2000+ char explanation with embedded newlines) |
| 3 | **Newlines in case scenario text collapsed** | `app.js:1775` (`renderCase`) | **HIGH** | `ScenarioText` fields use `\n\n` paragraph structures; rendered as `<p>${c.ScenarioText}</p>` with no processing |
| 4 | **Newlines in case item prompts collapsed** | `app.js:1868, 1871, 1883, 1885` (`caseItemHtml`) | **MEDIUM** | Item prompts rendered as `<b>...${it.Prompt}</b>` with no newline handling |
| 5 | **`.item-card .stem` CSS rule is dead code** — the `<h2>` wrapping the stem has no `class="stem"`, so the intended styling (15px, 500 weight, 1.6 line-height) never applies | `app.js:1634` vs `styles.css:778-783` | **MEDIUM** | `<h2>${q.Stem}</h2>` has no class attribute; CSS selector `.item-card .stem` requires `class="stem"` descendant; stem gets browser default `<h2>` styling instead |
| 6 | **No `white-space: pre-line` anywhere** — not on stem, not on choices, not on explanations, not on case passage text | `styles.css` (entire file) | **HIGH** | All content areas inherit `white-space: normal` (default), which collapses `\n` → space; 31 `nowrap` declarations exist for nav/header elements but zero `pre-line` or `pre-wrap` for content |
| 7 | **Small font sizes for dense accounting text** | `styles.css` | **LOW-MED** | Body: 15px; `.choice`: 14px; `.explanation`: 13px; `.case-passage`: 14px; For multi-sentence regulatory/accounting text, these strain readability |
| 8 | **`.choice` elements have no explicit `line-height`** | `styles.css:831-844` | **LOW** | Choices inherit body default `line-height: 1.5` (line 100); options with multi-sentence text feel cramped |

---

## 3. Specific CSS Problems

### 3.1 Dead CSS: `.item-card .stem` (line 778-783)

```css
/* styles.css:778 — NEVER APPLIED to MCQ stems */
.item-card .stem {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 18px;
  line-height: 1.6;
}
```

**Why it doesn't work:** The `<h2>` on line 1634 has NO CLASS. The selector `.item-card .stem` looks for elements with `class="stem"` inside `.item-card`. No such element exists. The stem receives browser-default `<h2>` styling instead.

### 3.2 No whitespace preservation on content areas

Every content-text area lacks `white-space: pre-line` or `white-space: pre-wrap`:

| CSS Class | File:Line | Needs `white-space` | Current |
|-----------|-----------|---------------------|---------|
| `.item-card` (parent only) | 770-777 | N/A (parent) | — |
| (h2 inside item-card — unstyled) | 1634 (app.js) | `pre-line` | normal (default) |
| `.choice` | 831-844 | `pre-line` | normal (default) |
| `.explanation` | 1358-1365 | `pre-line` | normal (default) |
| `.case-passage` | 1044-1052 | `pre-line` | normal (default) |
| `.case-question` | 1144-1148 | `pre-line` | normal (default) |
| `.feedback p` | 711 | `pre-line` | normal (default) |

**The CSS that exists near these elements:**

```css
/* 831 — Choices have no line-height at all */
.choice {
  display: grid;
  grid-template-columns: 36px 1fr;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  text-align: left;
  border: 2px solid var(--border-light);
  border-radius: var(--radius);
  background: var(--choice-bg);
  cursor: pointer;
  transition: all var(--transition);
  font-size: 14px;
  /* NO line-height */
  /* NO white-space */
}

/* 1358 — Explanation is cramped at 13px */
.explanation {
  background: var(--primary-light);
  border-radius: var(--radius);
  padding: 10px;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  /* NO white-space */
}

/* 1044 — Case passage has decent line-height but no whitespace preservation */
.case-passage {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 18px;
  box-shadow: var(--shadow);
  line-height: 1.7;
  font-size: 14px;
  /* NO white-space */
}
```

### 3.3 Font-size audit for content text

| Element | Font Size | Line Height | Context |
|---------|-----------|-------------|---------|
| `body` (base) | 15px | 1.5 | Global default |
| `<h2>` in item-card (browser default) | ~24px (1.5em) | ~1.2 | MCQ stem — uncontrolled |
| `.choice` | 14px | **1.5** (inherited) | Answer choices |
| `.explanation` | 13px | 1.6 | Review/feedback |
| `.case-passage` | 14px | 1.7 | Case scenario text |
| `.pill` (metadata) | 10px | N/A | Labels only |
| `.letter` (choice marker) | 14px | N/A | A/B/C/D markers |

For comparison, the IMA's own CMA exam materials use ~16px body text. The simulator's 13-14px choice and explanation text is below standard for long-form reading.

---

## 4. Specific JS Problems

### 4.1 No text-to-HTML conversion function

There is **zero** newline-to-break conversion code anywhere in `app.js`. A grep for `replace`, `\n`, `<br>`, `pre-line`, `nl2br`, `formatText`, `sanitize` returned no results related to text formatting. The only `replace` calls in the codebase are for numeric normalization (e.g., `replace(/[$,\s]/g, '')` in line 1908).

**What's missing:**
```javascript
// Does not exist anywhere in the codebase:
function nl2br(text) {
    return String(text || '').replace(/\n/g, '<br>');
}
// Or:
function paragraphs(text) {
    return String(text || '').split(/\n\n+/).map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
}
```

### 4.2 `innerHTML` with raw data — no escaping or formatting

All five rendering functions use template literals to inject raw data into `innerHTML`:

| Function | File:Line | What's Rendered | Newlines Preserved? |
|----------|-----------|----------------|---------------------|
| `renderMCQ()` | 1634 | `q.Stem` → `<h2>` | NO |
| `renderMCQ()` | 1635-1636 | `q.Choices[c]` → `.choice span` | NO |
| `renderCase()` | 1775 | `c.ScenarioText` → `<p>` | NO |
| `caseItemHtml()` | 1868, 1871, 1883, 1885 | `it.Prompt` → `<b>` | NO |
| `renderSummary()` | 2344 | `q.Prompt \|\| q.Stem` → `<p>` | NO |
| `renderSummary()` | 2347 | `q.Explanation*` → `.explanation` | NO |
| `caseExhibitsHtml()` | 1894 | `ex.Body` → `<p>` | NO |

### 4.3 The `.stem` class exists in CSS but not in markup

```javascript
// app.js:1634 — what it IS:
<h2>${q.Stem}</h2>

// What it SHOULD be to use the existing CSS:
<h2 class="stem">${q.Stem}</h2>
```

---

## 5. Root Cause Analysis

### Why are stems jumbled?

The root cause is a **two-step failure:**

1. **Authoring phase:** Content was authored with `\n` line breaks in JSON strings (e.g., `"memorandum header\n\nbody text\n\nconclusion"`). This is valid JSON/JS and was likely intentional formatting.

2. **Rendering phase:** The rendering code inserts these strings directly into `innerHTML` without converting `\n` to `<br>` or `\n\n` to `</p><p>`. No CSS `white-space: pre-line` exists to tell the browser to honor the newlines. The browser's default HTML whitespace normalization collapses `\n` to a space (or nothing between words).

The result: a stem that was authored as:

```
CONTROLLER'S MEMORANDUM — Apex Industrial Controls

TO: CFO Priya Mehta
FROM: Elena Vasquez, Controller
RE: Revenue Recognition for ApexGuard 9000 Customer Contracts

Apex sells the ApexGuard 9000...
```

Renders as:

```
CONTROLLER'S MEMORANDUM — Apex Industrial Controls TO: CFO Priya Mehta FROM: Elena Vasquez, Controller RE: Revenue Recognition for ApexGuard 9000 Customer Contracts Apex sells the ApexGuard 9000...
```

### Why wasn't this caught?

- No test or smoke test checks stem readability in the browser
- The `npm run smoke` Playwright test checks "UI surfaces" and "MCQ banks present" but doesn't verify text formatting
- The `.stem` CSS class with `white-space` never existed — `.item-card .stem` only sets `font-size` and `line-height`, and is dead code anyway
- The governance guard checks structural correctness (DL-008, DL-026, etc.) but not UI rendering quality

---

## 6. Recommendations (Priority Order)

### Priority 1 — CRITICAL: Fix newline collapse (HIGH impact, low effort)

**Option A (Quick — CSS only, ~5 lines):** Add `white-space: pre-line;` to the content areas. This tells the browser to honor `\n` as line breaks. No JS changes needed.

```css
/* styles.css additions */
.item-card h2 {
  white-space: pre-line;
  font-size: 15px;
  font-weight: 500;
  line-height: 1.6;
  margin-bottom: 18px;
}
.explanation {
  white-space: pre-line; /* addition to existing rule at line 1358 */
}
.case-passage {
  white-space: pre-line; /* addition to existing rule at line 1044 */
}
.feedback p {
  white-space: pre-line; /* addition to existing rule at line 711 */
}
.choice span {
  white-space: pre-line; /* for multi-sentence choices */
}
```

**Pros:** One-minute fix. Works for ALL current content. No JS changes. No regression risk.

**Cons:** `\n` becomes a soft line break (like `<br>`) but not a paragraph break. `\n\n` creates a blank line but not proper `<p>` paragraph separation with margins. This is a functional improvement but not semantically ideal for the long-term.

**Option B (Better — JS helper, ~15 lines):** Add a `nl2html()` helper function that converts `\n\n` → `</p><p>` and single `\n` → `<br>`. Apply it before inserting into innerHTML.

```javascript
// New utility function (add near line 50, after Constants)
function nl2html(text) {
    return String(text || '')
        .split(/\n{2,}/)
        .map(para => para.replace(/\n/g, '<br>'))
        .join('</p><p>');
}

// Usage in renderMCQ (line 1634):
<h2>${nl2html(q.Stem)}</h2>

// Usage in renderSummary (line 2344):
<p>${nl2html(q.Prompt || q.Stem || '')}</p>
// and line 2347:
${q.Explanation || q.ExplanationCorrect ? `<div class="explanation"><b>Explanation:</b> ${nl2html(q.Explanation || q.ExplanationCorrect)}</div>` : ''}
```

**Pros:** Proper semantic HTML with `<p>` tags. Can add paragraph-level styling (margins).

**Cons:** Requires modifying every rendering function that outputs text content (~7 locations). Slightly more work but produces better output.

**Option C (Best — Both):** Apply CSS `white-space: pre-line` immediately for a fast fix, then implement the `nl2html()` helper for proper paragraph semantics in a follow-up session.

### Priority 2 — HIGH: Apply `.stem` class to the stem element

The existing CSS at `styles.css:778-783` was written to style stems but the `<h2>` element doesn't have the `class="stem"` attribute. Fix:

```javascript
// app.js:1634 — change from:
<h2>${q.Stem}</h2>
// to:
<h2 class="stem">${q.Stem}</h2>
```

Or alternatively, replace the `.item-card .stem` rule with `.item-card h2`:

```css
/* styles.css:778-783 — change from: */
.item-card .stem { ... }
/* to: */
.item-card h2 { ... }
```

### Priority 3 — MEDIUM: Increase font sizes for readability

| Element | Current | Recommended | Reason |
|---------|---------|-------------|--------|
| `.choice` | 14px | 15px | Match body text |
| `.explanation` | 13px | 14px | Long-form reading |
| `.case-passage` | 14px | 15px | Primary reading area |

### Priority 4 — LOW: Add explicit `line-height` to `.choice`

```css
.choice {
  /* existing styles... */
  line-height: 1.5; /* add this */
}
```

### Priority 5 — LOW: Consider font-family for readability

The current font stack is `'Segoe UI', system-ui, -apple-system, sans-serif` (line 44). For long-form accounting text, consider adding `'Georgia', 'Times New Roman'` as a serif option for the explanation/reading mode only (similar to how some CMA prep platforms use serif fonts for explanations because they're proven to improve extended reading comprehension).

---

## 7. Impact Summary

| Rendering Context | Current State | After Fix |
|-------------------|--------------|-----------|
| MCQ stem (short) | Single paragraph — functional but cramped | Unchanged (short stems unaffected) |
| MCQ stem (long/memo) | **Jumbled wall of text — unreadable** | Properly formatted with paragraph breaks |
| Answer choices | Functional but cramped | Better spacing |
| Explanation (review) | **Giant undifferentiated text block** | Properly formatted mini-lesson |
| Case scenario | **Collapsed paragraphs** | Readable business memo format |

The **Priority 1 fix alone** (adding `white-space: pre-line` to CSS) would resolve the critical user complaint — stems and explanations would become readable immediately. The longer content items (memo-format stems, multi-paragraph explanations) benefit most dramatically.

---

## 8. Files Inspected

| File | Lines Reviewed | Purpose |
|------|---------------|---------|
| `app.js` | 1-50, 369, 120-220, 1601-1700, 1701-1780, 1862-1896, 1943-1979, 2038-2155, 2250-2355 | JavaScript rendering pipeline |
| `styles.css` | 1-150, 714-889, 1000-1150, 1340-1390, 2440-3300 | CSS styling for all content areas |
| `index_updated.html` | 1-13 | HTML container structure |
| `pack_a_corrected.js` | 1-15, 220-240 | Source data format with embedded `\n` |
