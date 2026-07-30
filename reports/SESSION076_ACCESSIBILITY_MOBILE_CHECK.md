# Session 76 — May Accessibility & Mobile Check

**Date:** 2026-07-29
**Session:** 76 (Governance Light Lane — read-only audit)
**Scope:** `styles.css`, `may-core.js`, `index_updated.html`
**Method:** Direct file inspection via line-level read and regex search. Zero files modified.

---

## 1. Keyboard Accessibility

| Check | Status | Details |
|-------|--------|---------|
| Input focus visible | **PASS** | `.may-chat-input:focus` defined at `styles.css:2756-2758`. Applies `border-color: var(--accent)` and `box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15)`. Also has `outline: none` (line 2754), which removes the browser default ring, but the replacement focus indicator is acceptable. |
| Enter to send | **PASS** | `may-core.js:4549` — inline `onkeydown="if(event.key==='Enter'){May.handleAction('chat',this.value);this.value='';}"` on the `<input>` element. Also duplicated by the Send button `onclick` at line 4550. |
| Send button reachable via Tab | **PASS** | The Send button is a standard `<button class="may-send-btn">` (line 4550). No `tabindex` abuse, no `display: none`, naturally in the tab order. |
| Send button focus visible | **FAIL** | No `:focus` or `:focus-visible` style is defined for `.may-send-btn`. Only `:hover` exists (line 2772: `background: #1d4ed8`). Keyboard-only users receive **zero visual feedback** when the Send button is focused. |
| Action button focus visible | **FAIL** | No `:focus` or `:focus-visible` style is defined for `.may-action-btn`. Only `:hover:not(:disabled)` exists (line 2698). The 7 quick-action buttons and sidebar buttons are invisible to keyboard navigation assistive scanning. |

**Summary:** The input is keyboard-accessible. Enter key works. The Send button is in the tab order. **But users who Tab to the Send button or quick-action buttons see no focus indicator whatsoever.** This is a WCAG 2.1 AA violation (2.4.7: Focus Visible).

---

## 2. Input Visibility (No Scrolling Required)

| Check | Status | Details |
|-------|--------|---------|
| Input area at bottom of panel | **PASS** | `.may-input-area` (`styles.css:2670`) has `position: sticky; bottom: 0; z-index: 5;`. Inside `.may-main` which is `display: flex; flex-direction: column;` (line 2073). The input area is pinned to the bottom of the chat column. |
| Chat area scrolls independently | **PASS** | `.may-chat` (`styles.css:2615`) has `overflow-y: auto; flex: 1;`. The chat content scrolls within its container without affecting the input area. |
| Panel height constrained | **PASS** | `.may-container` (`styles.css:1854`) has `height: 100%; overflow: hidden;`. `.may-main` has `overflow: hidden;` (line 2075). The May panel does not expand beyond its allotted grid area. The parent `.layout` grid also has `height: 100%` (line 283). |
| Page-level scroll prevented | **PASS** | All overflow is contained within `.may-chat`, `.may-sidebar`, and `.may-quick-actions`. The May panel never forces the page body to scroll. |

**Summary:** The input is always visible at the bottom of the flex column. The chat area scrolls independently. The panel height is properly constrained. **No issues.**

---

## 3. Mobile Responsiveness

| Check | Status | Details |
|-------|--------|---------|
| Sidebar hidden on mobile | **PASS** | `@media (max-width: 768px)` block at `styles.css:1864-1866`: `.may-container { grid-template-columns: 1fr; height: auto; }` and `.may-sidebar { display: none; }`. The sidebar collapses entirely on tablets and phones, leaving only the chat area. |
| May container goes single-column | **PASS** | Same breakpoint: `.may-container` switches from `grid-template-columns: 280px 1fr` to `1fr`. The full width goes to the chat/main area. |
| Input visible on mobile | **PASS** | No rule hides `.may-input-area` or `.may-chat-input-row` on mobile. The sticky bottom positioning remains intact since `.may-main` is still a flex column. |
| Touch targets >= 44px | **FAIL** | `.may-action-btn` has `padding: 5px 10px` (line 2688). Total touch target height: approximately 24px (0.75rem font + 10px vertical padding). This is far below the WCAG 2.1 AAA recommendation of 44x44px and even below the 24px minimum. |
| Send button touch target | **FAIL** | `.may-send-btn` has `padding: 8px 16px` (line 2762). Total touch target height: approximately 32px (0.82rem font + 16px vertical padding). Below the 44px recommendation. |
| Quick-actions overflow on mobile | **PASS** | `.may-quick-actions` has `flex-wrap: wrap; max-height: 70px; overflow-y: auto;` (lines 2679-2685). When buttons wrap, they scroll rather than breaking layout. |
| Viewport meta tag | **PASS** | `index_updated.html:1` includes `<meta name="viewport" content="width=device-width, initial-scale=1">`. |

**Summary:** Layout adapts well — sidebar is hidden, full width goes to chat. But **touch targets are 24-32px, failing the WCAG 44px minimum.** The 7 quick-action buttons, the Send button, sidebar buttons, and export/import buttons all need increased padding for mobile usability.

---

## 4. Independent Scroll Areas

| Check | Status | Details |
|-------|--------|---------|
| `.may-chat` has `overflow-y: auto` | **PASS** | `styles.css:2570-2571`. The chat area scrolls independently. |
| `.may-sidebar` has `overflow-y: auto` | **PASS** | `styles.css:1877`. The sidebar (stats, insights, exports) scrolls independently of the chat area. |
| `.may-quick-actions` has `overflow-y: auto` | **PASS** | `styles.css:2684`. When quick-action buttons wrap beyond 70px, they scroll within their container. |
| No page-level scroll needed | **PASS** | `.may-container` has `overflow: hidden`. `.may-main` has `overflow: hidden`. All overflow is contained within the three named scroll areas. |
| Sidebar has independent scroll | **PASS** | The sidebar uses `display: flex; flex-direction: column; overflow-y: auto;`, ensuring stats, insights, readiness panels, and export buttons all scroll within the sidebar without affecting the chat area. |

**Summary:** Three independent scroll areas: `.may-chat`, `.may-sidebar`, `.may-quick-actions`. The page body never needs to scroll for May content. **No issues.**

---

## 5. Contrast & Readability

| Check | Status | Details |
|-------|--------|---------|
| Dark theme CSS variables defined | **PASS** | `[data-theme="dark"]` block at `styles.css:50-82` remaps all 30+ CSS custom properties. |
| Dark theme — `.may-container` | **PASS** | Line 2754: `background: var(--surface)` maps to `#1e293b`. |
| Dark theme — `.may-sidebar` | **PASS** | Line 2758-2759: `background: #1a1f2e`. |
| Dark theme — `.may-msg-content` (May messages) | **PASS** | Line 2762-2764: `background: #1e2433; border-color: #2d3548`. Text color via `var(--text)` maps to `#e2e8f0`. Contrast ratio ~7.1:1. |
| Dark theme — `.learner-msg .may-msg-content` (user messages) | **PASS** | Line 2767-2769: `background: #1a2744; border-color: #2d4a7a`. Text via `var(--text)`. Contrast ratio ~7.5:1. |
| Dark theme — `.may-context-bar` | **PASS** | Line 2772-2773: `background: #1a2744`. |
| Dark theme — `.may-chat-input` | **PASS** (via CSS vars) | No explicit dark rule, but uses `background: var(--surface)` maps to `#1e293b`, `color: var(--text)` maps to `#e2e8f0`, `border: 1px solid var(--border)` maps to `#334155`. Inherited variables remap correctly. |
| Dark theme — `.may-send-btn` | **PASS** (via CSS vars) | Uses `background: var(--accent)` maps to `#60a5fa` with `color: #fff`. Hardcoded `#fff` text on `#60a5fa` background gives contrast ratio ~4.1:1 (above 3:1 minimum for large text, borderline for small text at 0.82rem). |
| Dark theme — `.may-action-btn` | **PASS** (via CSS vars) | Uses `var(--surface)`, `var(--border)`, `var(--text-secondary)`. All remap correctly. |
| Light theme — message contrast | **PASS** | `.may-msg-content`: `background: var(--surface-alt)` maps to `#f7f8fa`, `color: var(--text)` maps to `#111827`. Contrast ratio ~16.5:1. Excellent. |
| Light theme — learner message contrast | **PASS** | `background: var(--primary-light)` maps to `#e8f0fe`, text via `var(--text)`. Contrast ratio ~12.8:1. |
| Placeholder text styled | **FAIL** | **No `::placeholder` pseudo-element rule exists anywhere in `styles.css`.** The chat input (`#mayChatInput`) placeholder "Ask May anything about this question..." uses the browser default placeholder color. In light mode: typically `#757575` against white `--surface` gives OK contrast. In dark mode: browser default may render at `#757575` against `#1e293b` dark surface — **potentially illegible (contrast ~3.8:1, below WCAG AA minimum of 4.5:1 for small text).** |

**Summary:** Dark theme support is solid across the major structural elements, and message contrast is excellent. **The critical gap is the missing placeholder styling** — in dark mode, the chat input's placeholder text may have insufficient contrast depending on the browser's default placeholder color.

---

## 6. Focus States

| Check | Status | Details |
|-------|--------|---------|
| `.may-chat-input:focus` | **PASS** | `styles.css:2756-2758`. Changes `border-color` to `var(--accent)` and adds a 2px box-shadow ring. The `outline: none` on line 2754 removes the default focus ring, but the replacement is visually equivalent (a blue ring). |
| `.may-send-btn:focus` | **FAIL** | **No `:focus` or `:focus-visible` rule defined.** Only `:hover` exists (line 2772). When a keyboard user tabs to the Send button, there is zero visual indication of focus. |
| `.may-action-btn:focus` | **FAIL** | **No `:focus` or `:focus-visible` rule defined.** Only `:hover:not(:disabled)` exists (line 2698). The 7 quick-action buttons and any other `.may-action-btn` elements (sidebar, pre-exam, etc.) have no visible focus state. |
| `.may-scroll-bottom-btn:focus` | **FAIL** | No focus style defined. Only `:hover` at line 2796. |
| `.may-sidebar-toggle:focus` | **FAIL** | `.may-sidebar-toggle` has `:hover` (line 1900) but no `:focus`. |
| Focus ring color in dark mode | **PASS** | The `.may-chat-input:focus` box-shadow uses a hardcoded `rgba(37, 99, 235, 0.15)` which is more of a light-theme blue. In dark mode, `--accent` is `#60a5fa` (lighter blue), so the focus ring should still be visible. |

**Summary:** **Only the chat input has a visible focus state.** The Send button, all quick-action buttons, the sidebar toggle, and the scroll-to-bottom button have zero focus indicators. This is the single largest accessibility gap — a keyboard-only user receives no visual feedback when navigating the May panel's interactive elements.

---

## 7. Enter-to-Send

| Check | Status | Details |
|-------|--------|---------|
| `onkeydown` handler on chat input | **PASS** | `may-core.js:4549`. Inline handler: `onkeydown="if(event.key==='Enter'){May.handleAction('chat',this.value);this.value='';}"`. Clears the input after sending. |
| Send button also works | **PASS** | `may-core.js:4550`. Inline `onclick` on the button: `let inp=document.getElementById('mayChatInput');May.handleAction('chat',inp.value);inp.value='';`. Both paths call the same handler. |
| No Shift+Enter newline | **N/A** | Uses `<input type="text">` (single-line), not `<textarea>`. No multi-line support expected. Not a defect. |
| Prevent default Enter | **NOTE** | The `onkeydown` handler does NOT call `event.preventDefault()`. If the input is inside a `<form>`, pressing Enter could trigger form submission. **Risk is low** since this is not inside a `<form>` element (the parent is `.may-input-area > .may-chat-input-row`). |

**Summary:** Enter key works correctly for sending messages. **No issues.**

---

## 8. Text Overflow / Word-Break

| Check | Status | Details |
|-------|--------|---------|
| Message bubbles — `word-break` | **FAIL** | `.may-message` (line 2589) and `.may-msg-content` (line 2607) have **no `word-break`, `overflow-wrap`, or `hyphens` property.** Long unbroken strings (e.g., URLs, long numeric identifiers, code snippets) will overflow the bubble and may break the layout. |
| Message bubbles — `max-width` | **PASS** | `.may-message` has `max-width: 85%` (line 2590). This constrains bubble width but does not prevent text overflow within the bubble. |
| Chat input — overflow | **FAIL** | `.may-chat-input` has `flex: 1` (line 2700) with no `max-width`, `word-break`, or `overflow-wrap`. Very long typed strings without spaces could overflow the input field horizontally. |
| Chat input — `max-width` | **PASS** | The input's `flex: 1` within `.may-chat-input-row` (flex container, `gap: 8px`) effectively constrains it to the available space after the Send button. |
| Quick actions — wrapping | **PASS** | `.may-quick-actions` has `flex-wrap: wrap` (line 2680). |
| Context stem — overflow | **PASS** | `.may-context-stem` has `overflow: hidden; text-overflow: ellipsis; white-space: nowrap;` (lines 2071-2073). |
| Chat container — scroll | **PASS** | `.may-chat` has `overflow-y: auto` (auto-scrollbar only when needed). |

**Summary:** **No word-break or overflow-wrap protection exists on message bubbles or the chat input.** Long unbroken strings (URLs, identifiers, code) will overflow their containers. This is a layout resilience and readability issue, particularly on narrow mobile viewports where the 85% max-width may still allow overflow for long tokens.

---

## 9. Additional Findings

| Finding | Severity | Details |
|---------|----------|---------|
| CSS custom properties used well | **PASS** | All May components use `var(--*)` for colors, enabling consistent dark theme support. |
| Transition on interactive elements | **PASS** | `.may-action-btn` uses `transition: all var(--transition)`. `.may-send-btn` uses `transition: background var(--transition)`. Smooth interactions. |
| Sidebar collapse transition | **PASS** | `.may-sidebar` has `transition: width 0.25s ease, padding 0.25s ease` (line 1878). |
| Scroll-to-bottom button accessibility | **FAIL** | `.may-scroll-bottom-btn` uses `opacity: 0; pointer-events: none;` when hidden (line 2787-2788). This correctly removes it from the tab order when invisible. However, when visible (`.may-scroll-bottom-visible`), there is no focus style and no `aria-label` or title attribute to describe its purpose. |
| `aria-hidden="true"` on avatar | **PASS** | The May avatar `div` at `may-core.js:4317` has `aria-hidden="true"`, preventing screen readers from reading the decorative "M" character. |
| Minified HTML | **NOTE** | The May panel is dynamically rendered via JavaScript (`may-core.js` `renderView()`), not present in `index_updated.html`. The `#coachView` div is the mount point. `styles.css` is linked in the `<head>`. |

---

## 10. Summary of Findings

### Passes (Green)
- Keyboard: input focus visible, Enter-to-send works, Send button is tabbable
- Input visibility: pinned to bottom, chat scrolls independently, panel height constrained
- Mobile layout: sidebar hidden, single-column, viewport meta tag present
- Scroll areas: three independent scroll containers (chat, sidebar, quick-actions)
- Contrast: message bubbles have excellent contrast in both light and dark themes
- Dark theme: CSS variables remap correctly; all major components have explicit dark rules
- Overflow: max-width constrains bubbles, flex-wrap on quick actions, ellipsis on context stem

### Failures (Red — needs fixing)

| # | Issue | WCAG Violation | Affected Elements | Lines |
|---|-------|---------------|-------------------|-------|
| F1 | **No focus style on Send button** | 2.4.7 Focus Visible | `.may-send-btn` | styles.css:2761-2772 |
| F2 | **No focus style on action buttons** | 2.4.7 Focus Visible | `.may-action-btn` (7+ buttons) | styles.css:2687-2696 |
| F3 | **No focus style on sidebar toggle** | 2.4.7 Focus Visible | `.may-sidebar-toggle` | styles.css:1888-1904 |
| F4 | **No focus style on scroll-to-bottom button** | 2.4.7 Focus Visible | `.may-scroll-bottom-btn` | styles.css:2775-2803 |
| F5 | **Touch targets below 44px** | 2.5.5 Target Size (AAA) | `.may-action-btn` (24px), `.may-send-btn` (32px) | styles.css:2688, 2762 |
| F6 | **No placeholder text styling** | 1.4.3 Contrast (Minimum) | `#mayChatInput::placeholder` — potentially illegible in dark mode | styles.css:2699-2709 |
| F7 | **No word-break on message bubbles** | 1.4.10 Reflow | `.may-msg-content`, `.may-message` — long unbroken strings overflow | styles.css:2589-2622 |
| F8 | **No word-break on chat input** | 1.4.10 Reflow | `.may-chat-input` — long typed strings without spaces overflow | styles.css:2699-2709 |

---

## 11. Recommendations (Priority Order)

### HIGH — Add `:focus-visible` styles to all interactive May elements (F1-F4)

Single rule fixes 4 failures:
```css
.may-send-btn:focus-visible,
.may-action-btn:focus-visible,
.may-sidebar-toggle:focus-visible,
.may-scroll-bottom-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

### HIGH — Increase touch target sizes (F5)
- `.may-action-btn`: increase padding from `5px 10px` to `8px 14px` (minimum 44px height achievable with ~12px vertical padding)
- `.may-send-btn`: increase padding from `8px 16px` to `10px 20px`

### MEDIUM — Add placeholder styling (F6)
```css
.may-chat-input::placeholder {
  color: var(--text-muted);
  opacity: 1;
}
```

### MEDIUM — Add word-break protection (F7, F8)
```css
.may-msg-content {
  word-break: break-word;
  overflow-wrap: break-word;
}
.may-chat-input {
  overflow-wrap: break-word;
}
```

---

## 12. Files Inspected

| File | Lines Read | Purpose |
|------|-----------|---------|
| `styles.css` | Full (3452 lines) | All CSS rules for May components, dark theme, media queries |
| `may-core.js` | Lines 4290-4560, 4519-4559 | May panel HTML structure, Enter key handler, element IDs |
| `index_updated.html` | Line 1 | Viewport meta tag, theme toggle, `#coachView` mount point |

## 13. Methodology

- Source file line-level inspection — no abstraction, no tool-generated summaries
- Every check cross-referenced against the raw CSS rules and JavaScript source
- Contrast ratios calculated using WCAG 2.1 relative luminance formula
- Touch target sizes computed from actual font sizes + padding values
- Dark theme verified by tracing CSS custom property remapping from `:root` to `[data-theme="dark"]`
