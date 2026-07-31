# MAY-010 Launch Experience Plan

**Session:** MAY-010 — Session Launch Experience & Responsive UI Modernization
**Phase:** Planner — Launch Experience Planner
**Date:** 2026-07-30
**Governance Lane:** Light

---

## 1. Current State Assessment

### 1.1 Radio-Card Implementation

**Status:** Partially implemented. Four content-type radio cards exist (`mcq`, `case`, `mixed`, `full`) rendered as styled `<label>` elements wrapping hidden `<input type="radio">` elements.

**Strengths:**
- Cards are properly clickable (entire card area is the label, not just the radio)
- Visual selection feedback via `.selected` class (blue border, subtle background, box-shadow halo)
- 2-column grid layout that stacks to single column at ≤480px
- Description text supported via `.content-card-desc` (11px, secondary color)
- Cards sync properly via `syncContentCards()` which bridges hidden `#mode` input → card visual state

**Weaknesses:**
- Selection sync is indirect: onclick → update hidden `#mode` → `updateTimeEstimate()` → `syncContentCards()`. If `updateTimeEstimate()` fails for any reason, the visual card state desyncs.
- No keyboard navigation between cards (Tab → hidden radio receives focus → card visual does not change). The hidden radio gets focus but there's no `:focus-within` styling on the parent `.content-card`.
- `:hover` state works but no `:active` state for touch devices — card instantly snaps to `.selected` without a press-down visual.
- Cards depend on inline `onclick` handlers in HTML — no delegated event listener. Any card added dynamically would need its own inline handler.
- The `blueprintField` is referenced in `updateTimeEstimate()` at `app.js:3994` but does not exist in `index_updated.html`. The `EXAM_MODES` array includes `'blueprint'` but there is no card for it.
- The hidden `<input type="hidden" id="mode">` is a fragile bridge; a direct `.dataset` or reading from the radio group would be cleaner.

### 1.2 Current DOM Architecture (index_updated.html)

```
<form id="sessionForm">
  <!-- MAY QUICK-START BAR -->
  <div class="may-quickstart" id="mayQuickstart">
    4 pill buttons (mcq / case / mixed / full)

  <!-- MODE SELECTION (radio cards) -->
  <label class="field">
    <span>Content</span>
    <input type="hidden" id="mode" value="mcq">   ← fragile bridge
    <div class="content-cards">
      4 radio-card labels
  </label>

  <!-- MCQ COUNT (traditional <select>) -->
  <label class="field" id="countField"> ... </label>

  <!-- CASE COUNT (traditional <select>) -->
  <label class="field" id="caseCountField"> ... </label>

  <!-- PACKS, DIFFICULTY, SECTIONS, WEIGHTING -->
  <!-- SUBMIT -->
</form>
```

### 1.3 May Quick-Start Bar

**Status:** Present and functional. 4 pill-shaped buttons with `onclick="quickStart('...')"` inline handlers.

**Strengths:**
- Visible, self-explanatory, above the fold
- Pill design (999px border-radius) with hover state and primary button treatment for "Full Exam"
- Flexbox with wrap on container and actions

**Weaknesses:**
- Does NOT submit the form — only pre-selects mode. User must scroll down and click "Start Session" as a second step.
- `quickStart()` is undocumented in comments — reading the source is the only way to understand the flow.
- At 480px mobile, label and buttons stack vertically but buttons don't expand to full width.
- No visual connection between clicking a quick-start pill and the corresponding radio card getting highlighted (they're separated by a "Content" label).

---

## 2. Discoverability Audit

| Element | Discoverability | Issue |
|---------|----------------|-------|
| Radio cards | Good | Cards are the first visible form element below the quick-start bar |
| Quick-start bar | Good | Prominent, colored background, above the fold |
| "Content" label | OK | Unstyled `<span>` inside `<label class="field">`, 13px — could be more prominent |
| Card descriptions | Good | Description text visible at 11px below each title |
| Selected state | Good | Blue border + background halo — but no animation |
| Hidden `#mode` input | Invisible | Developer-only concern |
| `syncContentCards()` flow | Invisible | Developer concern — undocumented |
| Blueprint mode | Missing | Referenced in JS but no HTML exists |

---

## 3. Mobile Behavior Audit

| Breakpoint | Radio Cards | Quick-Start Bar | Forms |
|-----------|------------|-----------------|-------|
| 320px | Single column — cards stack vertically | Flex column, items left-aligned | OK |
| 375px | Single column | Same | OK |
| 480px | Single column | Same | OK |
| 768px+ | 2-column grid | Horizontal flex | OK |

**No breakage found at any mobile width.** Cards are short text and all wrap naturally. The switch from 2-column to 1-column at 480px is the only responsive behavior.

**Gap:** No transition animation on the grid collapse. Cards snap from 2-col to 1-col instantly.

---

## 4. Selection Visibility Audit

**Current visual feedback chain:**
1. User clicks a radio card → inline `onclick` fires → updates hidden `#mode` value → calls `updateTimeEstimate()`
2. `updateTimeEstimate()` internally calls `syncContentCards()` (app.js:3996)
3. `syncContentCards()` reads `#mode`.value, finds the matching `.content-card`, adds `.selected` class

**Selected card appearance (styles.css:437-441):**
```css
.content-card.selected {
  border-color: var(--accent);
  background: var(--primary-light);
  box-shadow: 0 0 0 1px var(--accent);
}
```

**Assessment:** The selected state is visually distinct but understated. The accent border and subtle background is clear on desktop but could be missed on:
- Low-contrast displays
- Bright ambient light (outdoor mobile use)
- When color theme is set to a low-saturation palette

**Recommendation:** Add a small checkmark icon or left-border accent on the selected card for redundancy (visual + positional cue).

---

## 5. Scalability Assessment

### Current card labels and their character counts:
| Mode | Title | Chars | Description | Chars |
|------|-------|-------|-------------|-------|
| mcq | "MCQ Practice" | 12 | "500-question bank per pack" | 26 |
| case | "Case Study Practice" | 20 | "Real CMA exam scenarios" | 23 |
| mixed | "Mixed MCQs + Cases" | 19 | "Balanced exam practice" | 23 |
| full | "Full Part 1 Simulation" | 23 | "100 MCQs + 2 cases, 4-hour timer" | 34 |

**Scalability concerns:**
- Card titles are currently very short — no overflow risk at any width.
- The 2-column grid would accommodate 6, 8, or even more cards without layout changes.
- Adding a 5th card (e.g., blueprint mode) to a 2-column grid would create an orphaned last card.
- Description text at 11px may be hard to read for some users — no `min-height` on card ensures consistent sizing.
- Cards have no `max-width` — they grow to fill their grid column equally. This is fine.

### Future mode expansion support:
- The `EXAM_MODES` array has `['full', 'practice', 'custom', 'blueprint', 'random']` (5 values) but only 4 cards exist.
- Adding a new mode requires: (a) HTML card element, (b) update to `syncContentCards()`, (c) update to `updateTimeEstimate()`, (d) update to `quickStart()`, (e) potentially a new quick-start button.
- Those 5 touch points should be reduced to 2 (HTML card + mode config in JS).

---

## 6. Planned Changes — Launch Experience

### L1: Card Selection Architecture Refinement
**File:** `app.js`
- Replace the fragile `hidden input → syncContentCards()` indirection with direct card-to-card selection management
- Add delegated click listener on `.content-cards` container (remove inline `onclick` from each card)
- Remove the hidden `#mode` input and read state directly from checked radio
- Add `aria-selected` attribute for screen readers
- Add `:focus-within` styling on `.content-card` for keyboard accessibility

### L2: Card Visual Enhancement
**File:** `styles.css`
- Add `transition` on `.selected` state for smooth animation
- Add a `::after` checkmark or accent bar on selected card
- Add `:active` state for press-down feedback on touch devices
- Increase description font-size from 11px to 12px for readability

### L3: Quick-Start Flow Improvement
**Files:** `index_updated.html`, `app.js`
- Convert `quickStart()` to optionally auto-submit (add a data attribute `data-autostart` on selected modes)
- Add aria labeling to quick-start pills
- On mobile: make quick-start buttons full-width and stack vertically
- Add visual connection between quick-start pill click and radio card selection (brief highlight animation)

### L4: Blueprint Mode Support
**Files:** `index_updated.html`, `app.js`
- Add a 5th radio card for "Blueprint Practice" if the mode is functional
- OR remove `blueprintField` reference from `updateTimeEstimate()` if the feature is deferred
- Document which `EXAM_MODES` values are active vs. aspirational

---

## 7. Success Criteria — Launch Experience

- [ ] Radio cards respond to keyboard navigation (Tab → focus ring visible on card)
- [ ] Selected card state is visually identified by both border color AND an additional cue (icon/bar)
- [ ] Card selection sync is reliable — no possible desync between hidden input and visual state
- [ ] Quick-start buttons have 44px minimum touch target height (WCAG 2.1 AA)
- [ ] Backward compatibility: smoke test passes with zero pack/case/answer changes
- [ ] Description text at ≥12px (up from 11px) for readability
- [ ] No inline `onclick` handlers — all behavior managed by delegated event listeners
