# MAY-010 Header Readability Plan

**Session:** MAY-010 — Session Launch Experience & Responsive UI Modernization
**Phase:** Planner — Header Readability Planner
**Date:** 2026-07-30
**Governance Lane:** Light

---

## 1. Problem Inventory

### 1.1 Headers at Risk of Overlap / Cramping

| # | Location | Issue | Severity | File:Lines |
|---|----------|-------|----------|------------|
| H1 | Case exhibit `th` | No explicit font-size, no overflow control, 6px/8px padding. Long headers (up to 42 chars) cramp | **High** | styles.css:1207-1217 |
| H2 | Dashboard section labels | 36-char labels at 13px in 190px-wide cards — can wrap 3+ lines | Medium | app.js:3285, styles.css:1698 |
| H3 | Match left-item labels | No overflow protection; `min-width: 160px` insufficient for long match item text | Medium | styles.css:1783-1787 |
| H4 | May review nav pill | `white-space: nowrap` without overflow guard → horizontal overflow | Medium | styles.css:2504 |
| H5 | Mobile section labels | 9px font-size on `.may-section-label` at ≤480px — below readable threshold | Medium | styles.css:2807-2814 |
| H6 | Diagnostics panel | Collapsed to 0.7rem single line with text-overflow: ellipsis | Low | styles.css:160-178 |
| H7 | Section info names | 36-char labels ("External Financial Reporting Decisions") rendered in multiple places without truncation | Low | app.js:24-31 |

### 1.2 Headers Already Safe (No Action Needed)

| Location | Why Safe |
|----------|----------|
| Review table headers (#, Section, Topic, Status, Flag) | All ≤7 chars |
| Nav grid headers | Short, handled by grid sizing |
| Exam header bar (.exam-title, .exam-subtitle) | Fixed height 52px, short text |
| Choice letter badges | 36px fixed, single letter |
| Score tile section labels | Short, in 170px+ grid cells |
| Content card titles | All ≤23 chars |

---

## 2. Targeted Remediation by Location

### 2.1 H1 — Case Exhibit Table Headers

**Current state:**
```css
/* styles.css:1188-1217 */
.case-exhibit {
  overflow-x: auto;          /* horizontal scrollbar fallback */
  padding: 10px;
}
.case-exhibit table {
  width: 100%;
  font-size: 13px;
}
.case-exhibit th, .case-exhibit td {
  padding: 6px 8px;          /* very tight */
}
.case-exhibit th {
  background: var(--toolbar-bg);
  font-weight: 700;
  /* NO font-size, NO text-transform, NO white-space, NO overflow */
}
```

**Longest known headers in scored case data:**
- "Final Sales Value if Processed Further" (42 chars)
- "Time on Machine M7 (minutes per unit)" (37 chars)
- "Max Acceptable Downtime (RTO)" (28 chars)
- "Sales Revenue After Further Processing" (36 chars)

**Plan (Tier 1 — Multi-line wrapping):**
1. Add `white-space: normal; word-wrap: break-word;` to `.case-exhibit th` — headers wrap naturally instead of creating wide columns
2. Increase padding from `6px 8px` to `8px 10px` for breathing room
3. Add explicit `font-size: 13px` (currently inherited, make it explicit for predictability)
4. Add `vertical-align: bottom` so wrapped headers align at the baseline
5. Consider `hyphens: auto` for very long compound words (browser-dependent, Chrome-dominant OK)

**Expected result:** "Final Sales Value if Processed Further" wraps to:
```
Final Sales Value if
Processed Further
```
...instead of forcing a 42-char-wide column.

### 2.2 H2 — Dashboard Section Labels

**Current state:**
```javascript
// app.js:3285
`<b>Section ${sec}: ${SECTION_INFO[sec].name}</b>`
```
Rendered inside `.dashboard-section` (13px, block display).

**Longest label:** "Section A: External Financial Reporting Decisions" (48 chars) → at 13px in a 190px card, wraps to 3 lines.

**Plan (Tier 2 — Intelligent abbreviation):**
1. Create a `SECTION_SHORT` map for compact labels:
   ```
   A: "Ext. Financial Reporting"
   B: "Planning & Budgeting"
   C: "Performance Mgmt"
   D: "Cost Management"
   E: "Internal Controls"
   F: "Technology & Analytics"
   ```
2. Use abbreviated labels only inside dashboard cards (keep full labels for tooltips and headings)
3. Add `title` attribute with full name for hover expansion
4. Reduce `font-weight: 700` → `font-weight: 600` to reduce visual weight of wrapped text

### 2.3 H3 — Match Item Left Labels

**Current state:**
```css
/* styles.css:1775-1799 */
.match-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.match-left {
  flex: 1;
  min-width: 160px;
  /* NO overflow, NO word-break, NO text-overflow */
}
.match-select {
  flex: 1;
  max-width: 260px;
}
```

**Issue:** When a left item has text exceeding the available width (viewport minus 260px right column minus 12px gap minus padding), the left item overflows the row.

**Plan (Tier 1 — Multi-line wrapping):**
1. Add `word-break: break-word; overflow-wrap: break-word;` to `.match-left`
2. Add `flex-wrap: wrap` to `.match-row` as backup at narrow viewports
3. Add `align-items: flex-start` so multi-line left labels don't vertically center awkwardly

### 2.4 H4 — May Review Nav Pill Overflow

**Current state:**
```css
/* styles.css:2504 */
.may-review-nav-pill {
  white-space: nowrap;
  /* NO overflow: hidden, NO text-overflow: ellipsis */
}
```

**Plan (Tier 2 — Abbreviation or truncation):**
1. Add `overflow: hidden; text-overflow: ellipsis;` to prevent horizontal overflow
2. AND add `title` attribute with full text for hover readout
3. OR shorten topic labels at generation time (prefer truncation for safety)

### 2.5 H5 — Mobile Section Labels at 9px

**Current state:**
```css
/* styles.css:2807-2814 */
@media (max-width: 480px) {
  .may-section-grid { grid-template-columns: repeat(2, 1fr); }
  .may-section-label { font-size: 9px; }
}
```

**Issue:** 9px is below the 12px minimum recommended for body text. This is a May coaching layer element.

**Plan (Tier 1 — Minimum font-size floor):**
1. Raise `.may-section-label` font-size at 480px from 9px → 11px
2. Allow text to wrap (remove `white-space: nowrap` if present — line 2799)
3. Use `font-size: clamp(11px, 2.5vw, 13px)` for fluid scaling if needed
4. Accept 2-line labels over unreadable 9px text

---

## 3. Tiered Remediation Strategy

### Tier 1 — Multi-line wrapping (preferred, applied first)
- Add `white-space: normal` + `word-break: break-word` to cramped header contexts
- Increase padding where text touches borders (6px → 8px minimum)
- Allow natural text wrapping instead of shrinking font or forcing single-line truncation

### Tier 2 — Intelligent abbreviation (fallback, applied only where Tier 1 insufficient)
- Create `SECTION_SHORT` abbreviations for dashboard contexts
- Use `title` attributes for hover expansion
- Keep full names in primary contexts (headings, tooltips)

### Tier 3 — Tooltip support (last resort, for edge cases)
- Only apply to headers that STILL overflow after Tier 1 and Tier 2
- Use CSS `title` attribute or a simple `::after` tooltip

### Avoid (never use):
- Rotated headers (poor accessibility, hard to read)
- `font-size` below 11px (fails WCAG readability)
- `text-overflow: ellipsis` on multi-column table headers (cuts off column meaning)
- Shrink-to-fit font scaling (unpredictable across character sets)

---

## 4. File Change Scope

| File | Change Type | Changes |
|------|------------|---------|
| `styles.css` | CSS rules | `.case-exhibit th` — add wrap/padding; `.match-left` — add word-break; `.may-review-nav-pill` — add overflow; `.may-section-label` — raise min font-size; `.dashboard-section b` — reduce weight |
| `app.js` | JS constants | `SECTION_SHORT` map; abbreviated labels in dashboard render; `title` attributes on shortened labels |
| `index_updated.html` | None | No structural changes needed |

**No pack file modifications. No case file modifications. No scoring changes.**

---

## 5. Success Criteria — Header Readability

- [ ] Case exhibit headers with ≥30 chars wrap cleanly to 2+ lines without horizontal scroll
- [ ] Dashboard section labels display legibly without forced 3-line wrapping
- [ ] Match left-item labels never overflow their `.match-row` container
- [ ] No header text rendered below 11px at any viewport width
- [ ] No rotated or vertical text used anywhere
- [ ] No font-size hacks (no shrink-to-fit, no dynamic scaling)
- [ ] All long headers have a `title` attribute or visible full text
