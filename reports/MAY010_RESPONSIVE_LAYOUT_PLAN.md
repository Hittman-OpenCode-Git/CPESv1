# MAY-010 Responsive Layout Plan

**Session:** MAY-010 — Session Launch Experience & Responsive UI Modernization
**Phase:** Planner — Responsive Layout Planner
**Date:** 2026-07-30
**Governance Lane:** Light

---

## 1. Current Responsive Architecture

### 1.1 Breakpoint Inventory

| Breakpoint | Blocks | What It Does |
|-----------|--------|-------------|
| `max-width: 950px` | 2 | Main layout → 1fr; score hero → 1fr |
| `max-width: 900px` | 3 | Exam shell → 1fr; case layout → 1fr; case exam shell → 1fr; calculator → 220px |
| `max-width: 768px` | 2 | Coach grid → 1fr; May container → 1fr + sidebar hidden |
| `max-width: 480px` | 2 | Content cards → 1fr; quickstart → column; May section grid → 2-col |

**Pattern:** Desktop-first with `max-width` overrides. No mobile-first progressive enhancement. No `min-width` queries.

### 1.2 Modern CSS Function Usage

| Function | Used? | Count |
|----------|-------|-------|
| `minmax()` | Yes | 5 instances |
| `auto-fill` | Yes | 4 instances |
| `auto-fit` | **No** | 0 |
| `clamp()` | **No** | 0 |
| `grid-auto-rows` | **No** | 0 |

---

## 2. Problem Inventory

### 2.1 Touch Target Violations (WCAG 2.1 AA — 44px minimum)

| Element | Approx. Height | CSS Location |
|---------|---------------|-------------|
| Quick-start pill buttons | ~27px | styles.css:485-496 |
| Confidence buttons | ~24px | styles.css:1397 |
| Navigation items (`.navitem`) | ~29px | styles.css:1076-1085 |
| Tab buttons | ~43px | styles.css:336-345 |
| Theme toggle | unknown | styles.css:117-129 |

**Recommendation:** Raise quick-start pills and navitems to ≥44px; confidence buttons raised to ≥36px (acceptable for grouped inline controls).

### 2.2 Navigation Grid Never Collapses

**Current:**
```css
.navgrid { grid-template-columns: repeat(5, 1fr); }    /* at all widths */
.navitem { padding: 7px 0; font-size: 12px; }
```

At 320px viewport: each nav cell = 64px wide, each nav item = ~29px tall. The layout "fits" but 5 columns of 7px-padded 12px text are extremely cramped. No fallback to 3 or 4 columns exists.

**Plan:** Add `grid-template-columns: repeat(auto-fill, minmax(56px, 1fr))` at ≤480px so cells reflow naturally.

### 2.3 Fixed Sidebar Widths — No Fluid Behavior

| Sidebar | Width | Collapses At |
|---------|-------|-------------|
| Main layout sidebar | 340px fixed | 950px |
| Exam shell sidebar | 290px fixed | 900px |
| May container sidebar | 280px fixed | 768px (hidden) |

These are binary — either full sidebar or no sidebar. There's no intermediate state (e.g., narrower sidebar, or sidebar as an overlay).

**Plan for this session:** Keep the binary collapse (it works). Focus on ensuring the collapsed single-column layouts have adequate spacing and don't cramp.

### 2.4 Floating Calculator — Fixed Size

```css
.floating-calculator { width: 244px; }
@media (max-width: 900px) { .floating-calculator { width: 220px; } }
```

No further reduction below 900px. At 320px viewport, 220px calculator is ~69% of viewport width — could overlap content.

**Plan:** Add `width: clamp(200px, 60vw, 244px)` to make calculator fluid between 200px and 244px. At 900px, leave the existing override but add fluid behavior below that.

### 2.5 Hero Card Inflexible Sizing

```css
.hero-card {
  min-width: 280px;
  flex-shrink: 0;       /* NEVER shrinks */
}
```

At 320px viewport, a 280px min-width card with `flex-shrink: 0` will overflow. The parent `.hero-inner` uses `display: flex; justify-content: space-between; gap: 24px` — no wrap.

**Plan:** Add `flex-wrap: wrap` to `.hero-inner` and remove `flex-shrink: 0` on `.hero-card`. Add `min-width: 0` to allow shrinking below 280px.

### 2.6 No `prefers-reduced-motion` Support

No media query for motion preferences. All transitions/animations use `var(--transition)` (150ms ease). This is acceptable for now but should be noted.

### 2.7 Grid: 320px min column

```css
.grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }
```

At viewports below 320px (rare but possible on very small screens, foldables in split mode, or 200% zoom), grid items would overflow.

**Plan:** Reduce to `minmax(280px, 1fr)` for safety margin. The `.grid` class is generic and used for catalog/card layouts.

---

## 3. Planned Responsive Changes

### R1: Touch Target Remediation
**File:** `styles.css`

| Element | Before | After |
|---------|--------|-------|
| `.may-quickstart-btn` | `padding: 5px 12px` | `padding: 10px 16px; min-height: 44px` |
| `.navitem` | `padding: 7px 0` | `padding: 10px 0; min-height: 44px` |
| Confidence buttons | `padding: 4px 8px` | `padding: 6px 12px; min-height: 36px` |
| `.tab` | `padding: 12px 20px` | `padding: 14px 20px; min-height: 44px` |

### R2: Navigation Grid — Responsive Columns
**File:** `styles.css`

```css
/* Add at ≤480px: */
@media (max-width: 480px) {
  .navgrid {
    grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
  }
}
```

This lets the 5-column nav grid reflow to 3-4 columns on phones without breaking.

### R3: Floating Calculator — Fluid Sizing
**File:** `styles.css`

```css
.floating-calculator {
  width: clamp(200px, 60vw, 244px);    /* fluid between 200-244px */
}
@media (max-width: 900px) {
  .floating-calculator {
    width: clamp(180px, 55vw, 220px);  /* slightly smaller at narrow widths */
  }
}
```

### R4: Hero Card — Flexible Sizing
**File:** `styles.css`

```css
.hero-inner {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;                      /* ADD: allow wrapping */
}
.hero-card {
  min-width: 0;                         /* CHANGE: was 280px */
  flex: 1 1 280px;                      /* CHANGE: was flex-shrink: 0 */
}
```

### R5: Generic Grid — Smaller Minimum
**File:** `styles.css`

```css
.grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));  /* was 320px */
}
```

### R6: Add `clamp()` for Key Font Sizes
**File:** `styles.css`

Introduce `clamp()` for fluid typography on major headings:

```css
.exam-title { font-size: clamp(13px, 2vw, 15px); }
.hero h1 { font-size: clamp(22px, 5vw, 30px); }
.dashboard-stat { font-size: clamp(24px, 6vw, 36px); }
```

This prevents oversized text on small screens and undersized text on large screens.

### R7: Add `auto-fit` where Appropriate
**File:** `styles.css`

Replace `auto-fill` with `auto-fit` on:
- `.grid` — catalog cards (centers the last row if it has fewer items)
- `.scoregrid` — score tiles (same benefit)

`auto-fit` collapses empty tracks so content is centered, while `auto-fill` reserves empty track space. For card grids with variable item counts, `auto-fit` provides better visual balance.

---

## 4. CSS Architecture — New Patterns to Introduce

### `clamp()` for fluid sizing
```css
/* Font: 14px → 18px between 320px and 1200px viewport */
font-size: clamp(0.875rem, 0.5rem + 1vw, 1.125rem);
```

### `auto-fit` for grid balance
```css
/* Centers last row items when fewer than full row */
grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
```

### `min-height` for touch compliance
```css
/* Ensures 44px minimum even if padding is smaller */
button, .clickable { min-height: 44px; }
```

---

## 5. File Change Scope

| File | Change Type | Sections Affected |
|------|------------|-------------------|
| `styles.css` | CSS rules | Touch targets (4 selectors), navgrid responsive, calculator fluid, hero card flex, grid min size, clamp() typography, auto-fit conversion, match-row wrap |
| `app.js` | None | No JS changes needed for responsive behavior |
| `index_updated.html` | None | No structural changes needed |

**No pack or case file modifications.**

---

## 6. Success Criteria — Responsive Layout

- [ ] All interactive elements have ≥44px touch target height (buttons, tabs, nav items)
- [ ] Navigation grid reflows to fewer columns at ≤480px instead of cramping 5 columns
- [ ] Floating calculator scales fluidly via `clamp()` instead of fixed sizes
- [ ] Hero card does not overflow at 320px viewport
- [ ] Generic grid items fit at 280px viewport (down from 320px min)
- [ ] At least one instance of `clamp()` for font-size introduced
- [ ] At least one `auto-fit` replaces `auto-fill` for grid centering
- [ ] No horizontal scrolling at any viewport ≥320px (except intentional `overflow-x: auto` on case exhibits)
- [ ] No content truncation at any standard viewport width
- [ ] Smoke test passes with zero regressions
