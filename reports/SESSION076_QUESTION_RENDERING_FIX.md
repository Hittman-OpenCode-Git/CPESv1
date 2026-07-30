# Session 76 — Question Rendering Fix (Newline-to-HTML)

**Date:** 2026-07-29
**Type:** Governance Light Lane — app.js and styles.css only
**Issue:** Question stems, explanations, and case text with embedded `\n` newlines were inserted directly into `innerHTML`, causing the browser to collapse `\n` into spaces.

---

## Fix 1: CSS — `white-space: pre-line` (6 selectors)

### Selectors Modified in `styles.css`

| # | Selector | Styles Line | Property Added |
|---|----------|-------------|----------------|
| 1 | `.item-card .stem` | 778 | `white-space: pre-line;` |
| 2 | `.explanation` | 1358 | `white-space: pre-line;` |
| 3 | `.case-passage` | 1044 | `white-space: pre-line;` |
| 4 | `.feedback p` | 711 | `white-space: pre-line;` |
| 5 | `.choice` | 831 | `white-space: pre-line;` |
| 6 | `.may-msg-content` | 2651 | `white-space: pre-line;` |

**Selector `.item-card h2` was skipped** — does not exist in styles.css per instructions. The stem is rendered as `<h2>` inside `.item-card`; it receives `nl2br()` treatment via the JS fix instead.

---

## Fix 2: JavaScript — `nl2br()` helper

### Step A: Helper function (app.js:52)

```javascript
function nl2br(text) {
    if (!text || typeof text !== 'string') return text || '';
    if (/<[a-z][\s\S]*>/i.test(text)) return text;  // already HTML
    let html = text.replace(/\n\n+/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
}
```

Added after the `CHOICES` constant at line 50.

### Step B–E: `nl2br()` call sites (9 total)

| # | Line | Context | Before | After |
|---|------|---------|--------|-------|
| 1 | 1642 | renderMCQ stem | `q.Stem` | `nl2br(q.Stem)` |
| 2 | 1783 | renderScenario case view | `c.ScenarioText` | `nl2br(c.ScenarioText)` |
| 3 | 1842 | renderCaseExam case view | `c.ScenarioText` | `nl2br(c.ScenarioText)` |
| 4 | 1876 | caseItemHtml — numeric/fill | `it.Prompt` | `nl2br(it.Prompt)` |
| 5 | 1879 | caseItemHtml — multi | `it.Prompt` | `nl2br(it.Prompt)` |
| 6 | 1891 | caseItemHtml — match | `it.Prompt` | `nl2br(it.Prompt)` |
| 7 | 1893 | caseItemHtml — select | `it.Prompt` | `nl2br(it.Prompt)` |
| 8 | 2355 | review feedback explanation | `q.Explanation \|\| q.ExplanationCorrect` | `nl2br(q.Explanation \|\| q.ExplanationCorrect)` |

---

## Verification

- **`node --check app.js`:** Passed (0 errors)
- **CSS selectors modified:** 6 (all existing in styles.css)
- **nl2br call sites:** 9 (1 definition + 8 invocations)
- **No pack files modified**

---

## Notes

- `nl2br()` detects already-HTML text and returns it unchanged, preventing double-encoding on items authored with HTML tags.
- `white-space: pre-line` in CSS serves as an immediate fallback for content that hasn't yet been processed through `nl2br()` — the CSS fix alone makes existing content readable even without the JS fix.
- The `.item-card h2` CSS selector was not created per instructions (selector doesn't exist in styles.css). The h2-rendered stems are covered by `nl2br()` wrapping.
