# Session 76 — May Layout Implementation Changelog

**Session:** 76 (Governance Light Lane)
**Date:** 2026-07-29
**Files Modified:** `may-core.js`, `styles.css`

---

## Changes Applied

### A. styles.css

| # | Change | Location | Before | After |
|---|--------|----------|--------|-------|
| 1 | Container height | `.may-container` | `height: calc(100vh - 220px)` | `height: 100%` |
| 2 | Sticky input area | `.may-input-area` | No sticky | `position: sticky; bottom: 0; z-index: 5` |
| 3 | Quick-actions scrollable | `.may-quick-actions` | No height limit | `max-height: 70px; overflow-y: auto` |
| 4 | Scroll-to-bottom button | New `.may-scroll-bottom-btn` | Not present | Floating 36px circular button, hidden by default |
| 5 | Sidebar collapsible | New `.may-sidebar-collapsed` | Not present | `width: 48px`, hides all text content |
| 6 | Sidebar toggle button | New `.may-sidebar-toggle` | Not present | 28px toggle at top-right |
| 7 | Focus states (a11y) | `.may-send-btn`, `.may-action-btn`, `.may-scroll-bottom-btn` | No focus styles | `:focus-visible` with `outline: 2px solid var(--accent)` |
| 8 | Word break (a11y) | `.may-msg-content` | Not set | `word-break: break-word; overflow-wrap: break-word` |
| 9 | Touch targets (a11y) | `.may-action-btn` padding | `5px 10px` | `6px 12px` |
| 10 | Touch targets (a11y) | `.may-send-btn` padding | `8px 16px` | `10px 18px` |
| 11 | Primary action chip | New `.may-action-primary` | Not present | Blue-highlighted chip variant |
| 12 | Capability prompts | New `.may-capability-prompts`, `.may-capability-chip` | Not present | Empty-state example prompt chips |

### B. may-core.js

| # | Change | Location | Before | After |
|---|--------|----------|--------|-------|
| 1 | Class name typo | Line 4428 | `may-blocked-goodluck` | `may-preexam-goodluck` |
| 2 | Pending input preservation | ~Line 4400 | Input value lost on re-render | Captured before render, restored after |
| 3 | Intelligent scroll | ~Line 4700 | Brute-force `scrollTop = scrollHeight` always | Only scrolls when near bottom (<50px) or <3 messages |
| 4 | Scroll-to-bottom button | ~Line 4674 | Not present | Added `<button>` with `onscroll` handler |
| 5 | `_updateScrollButton()` | ~Line 4712 | Not present | Shows/hides scroll button based on position |
| 6 | Sidebar collapse toggle | ~Line 4631 | Not present | Toggle button in sidebar header |
| 7 | Quick-actions reduced | ~Line 4677 | 10 static buttons | 6 → now dynamic chips via `_buildSuggestionChips()` |
| 8 | `_buildSuggestionChips()` | ~Line 4725 | Not present | Context-aware dynamic chip builder |
| 9 | Context-aware placeholder | ~Line 4686 | Static text | Changes based on hasQuestion |
| 10 | Empty state improved | ~Line 4493 | Plain text only | Added capability example prompts |
