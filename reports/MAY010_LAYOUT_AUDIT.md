# MAY-010 Layout Audit Report

**Session:** MAY-010 — Session Launch Experience & Responsive UI Modernization
**Phase:** Auditor — Layout Auditor
**Date:** 2026-07-30
**Governance Lane:** Light

---

## Executive Summary

| Severity | Count |
|----------|-------|
| HIGH | 6 |
| MEDIUM | 11 |
| LOW | 2 |
| **TOTAL** | **19** |

No blocker-level findings (no crashes or content loss). All issues are visual/UX degradations.

---

## Category 1: Header Text Exceeds Safe Width

### 1.1 Scoretile Section Names Cramped at 170px Min
**File:** `styles.css:780`, `app.js:2133`
**Severity:** MEDIUM
`.scoregrid` uses `minmax(170px, 1fr)`. After 14px×2 padding, content area = 142px. Section names up to 36 chars ("External Financial Reporting Decisions") wrap to 2+ lines in cramped space.
**Fix:** Increase minimum to `minmax(200px, 1fr)` or abbreviate section names for narrow tiles.

### 1.2 Case Exhibit Table Headers Expand Columns
**File:** `styles.css:1205`, `app.js:1891,1962`
**Severity:** MEDIUM
All tables use default `table-layout: auto` — wide header cells like "Final Sales Value if Processed Further" (36 chars) expand columns, pushing tables beyond container. `.case-exhibit` has `overflow-x: auto` as mitigation.
**Fix:** Add `table-layout: fixed` on `.case-exhibit table` with percentage column widths.

---

## Category 2: Column Layouts Become Compressed

### 2.1 Layout Sidebar 340px Squashes Exam-Shell at 901–949px
**File:** `styles.css:298,842`
**Severity:** HIGH
At 901–949px viewport: layout = 340px + 1fr, exam-shell = 1fr + 290px. Question card gets only **207px** at 901px. The navigator (290px) has more space than the actual question.
**Fix:** Move exam-shell breakpoint from 900px to **950px** to match layout collapse, OR use `minmax(280px, 340px)` for sidebar.

### 2.2 Content-Cards 2-Column Cramped at 400–479px
**File:** `styles.css:422`
**Severity:** MEDIUM
At 400–479px, two columns at ~194px each. After padding (14px×2), text area = ~166px. Description text wraps very tightly.
**Fix:** Move breakpoint from 480px to ~550px, or reduce card padding at narrow widths.

### 2.3 Scoregrid 170px Minimum Too Narrow
**File:** `styles.css:780`
**Severity:** MEDIUM
Same root cause as 1.1. The minimum tile size doesn't accommodate section name text.

### 2.4 May Sidebar 280px Leaves 201px Chat at 481px
**File:** `styles.css:2139`
**Severity:** HIGH
At 481–767px, `.may-container` = `280px 1fr`. At 481px, the chat area = **201px** with a 280px fixed sidebar consuming 58% of viewport. Functionally unusable for reading explanations.
**Fix:** Collapse May sidebar at ~900px instead of 768px, OR add icon-only collapsed mode at 900px.

### 2.5 Inline 1fr 1fr on Scoregrid Has No Responsive Fallback
**File:** `app.js:3338`
**Severity:** MEDIUM
Dashboard scoregrid has inline `grid-template-columns:1fr 1fr` overriding the `auto-fill` rule. No media query collapses this to single column at narrow widths.
**Fix:** Use a CSS class with responsive breakpoint instead of inline style.

---

## Category 3: Table Layouts Break Responsiveness

### 3.1 `table-layout` Property Completely Absent
**File:** `styles.css` (entire file)
**Severity:** HIGH
Zero uses of `table-layout` anywhere. All tables default to `auto`, where a single long cell pushes the table past its container. Only `.case-exhibit` has `overflow-x: auto` as mitigation.
**Fix:** Add `table-layout: fixed` to `.case-exhibit table`, `.item-card table`, `.summary-card table`.

### 3.2 Summary-Card Review Table Has No Overflow Protection
**File:** `styles.css:1140`, `app.js:2033`
**Severity:** HIGH
`.summary-card` has `max-width: 900px` but **no `overflow-x: auto`**. The review table (6 columns) can overflow if Topic text is long. This is the only unprotected user-facing table.
**Fix:** Add `overflow-x: auto` + `table-layout: fixed` with percentage column widths.

### 3.3 Item-Card Table Has No Overflow Protection
**File:** `styles.css:911`
**Severity:** MEDIUM
MCQ stems can contain inline HTML tables. `.item-card` has no `overflow-x: auto`.
**Fix:** Add `overflow-x: auto` to `.item-card`.

### 3.4 Match-Left Has No Overflow Handling
**File:** `styles.css:1784`
**Severity:** MEDIUM
`.match-left` has `flex: 1; min-width: 160px` but no `overflow-wrap` or `word-break`. Long left-item text overflows.
**Fix:** Add `overflow-wrap: break-word` to `.match-left`.

---

## Category 4: Responsive Breakpoint Gaps

### 4.1 901–949px Dead Zone — Exam-Shell + Layout
**File:** `styles.css:298,842`
**Severity:** HIGH
Detailed at 2.1. The 950px (layout) and 900px (exam-shell) breakpoints are misaligned, creating a 48px range where the question card is compressed.

### 4.2 481–767px Dead Zone — May Sidebar
**File:** `styles.css:2139`
**Severity:** HIGH
Detailed at 2.4. The May sidebar remains 280px in a range where the chat area gets only 201px.

### 4.3 No Breakpoint for Inline Scoregrid Override
**File:** `app.js:3338`
**Severity:** MEDIUM
Detailed at 2.5. Fixed 2-column grid has no responsive collapse.

---

## Category 5: CSS Function Gaps

### 5.1 Zero Uses of `clamp()`
**File:** `styles.css` (entire file)
**Severity:** MEDIUM
No fluid typography. Font sizes are fixed at all viewport widths.
**Fix:** Add `clamp()` for body text, hero h1, and dashboard stat.

### 5.2 `auto-fill` Used Everywhere Instead of `auto-fit`
**File:** `styles.css:376,780,1435,1698`
**Severity:** LOW
All 4 grid definitions use `auto-fill`. For sparse grids like scoregrid and dashboard-grid, `auto-fit` would center tiles better.
**Fix:** Change `.scoregrid` and `.dashboard-grid` to `auto-fit`.

### 5.3 Zero Uses of `min()`/`max()` for Width Safety
**File:** `styles.css` (entire file)
**Severity:** MEDIUM
Fixed-width elements like `.may-mini` (320px) can overflow on narrow viewports despite `max-width: calc(100vw - 32px)`.
**Fix:** Use `width: min(320px, calc(100vw - 32px))` pattern.

---

## Consolidated Fix Priority

| Priority | Finding | Files | Effort |
|----------|---------|-------|--------|
| P0 | Add `table-layout: fixed` + `overflow-x: auto` to summary-card, item-card tables | styles.css | Low |
| P1 | Align layout/exam-shell breakpoints at 950px | styles.css | Low |
| P1 | Collapse May sidebar at 900px | styles.css | Low |
| P2 | Increase scoregrid minimum to 200px | styles.css | Low |
| P2 | Replace inline scoregrid style with responsive class | styles.css + app.js | Medium |
| P3 | Add `overflow-wrap: break-word` to match-left | styles.css | Low |
| P3 | Add `clamp()` for 1-2 strategic font sizes | styles.css | Low |
| P4 | Change auto-fill → auto-fit on scoregrid/dashboard-grid | styles.css | Low |
| P4 | Add `min()` width guards | styles.css | Low |
