# Session 90P — UX Consistency Plan

**Session:** 90P  
**Lane:** Governance Light  
**Date:** 2026-07-30  
**Status:** Active

---

## 1. Review Scope

### 1.1 Button Placement
| Area | Current State | Notes |
|------|--------------|-------|
| Session form | "Start Session" button at form bottom | Standard placement |
| MCQ toolbar | Prev / Next / Flag / Guess / Confidence | Horizontal toolbar below stem |
| Case toolbar | Prev Task / Next Task / Flag | Consistent with MCQ |
| Review screen | "Submit Session" / "Return to Questions" | Bottom of review |
| Results screen | "Start Another Session" / "Review Missed" | Bottom of results |
| May coaching | Action buttons within coach panel | Already well-positioned |
| Theme toggle | Top-right corner, `position:absolute` | Fixed position — works |
| Quick start | 4 buttons in hero section | Horizontal layout |

**Assessment:** Button placement is consistent across views. No critical issues.

### 1.2 Panel Sizing
| Panel | Current | Issue? |
|-------|---------|--------|
| Hero section | Full width, auto height | Good |
| Setup panel | Left sidebar, ~350px | Fixed width — may be tight on small screens |
| Session view | Main content area | Fills remaining space |
| Navigator panel | Bottom strip, 60px | Collapsed by default — expandable |
| May coaching panel | Floating right panel | Well-designed |
| Results panel | Full width, auto height | Good |

**Assessment:** Setup panel at 350px could be narrow when section checkboxes are visible. Minor.

### 1.3 Typography
| Element | Font Family | Size | Weight |
|---------|-------------|------|--------|
| Headings (h1) | Segoe UI, system-ui | Large | Bold |
| Headings (h2) | Segoe UI, system-ui | 1.4rem | Semibold |
| Body text | Segoe UI, system-ui | 0.95rem | Normal |
| Choice text | Segoe UI, system-ui | 0.95rem | Normal |
| Timer | Monospace (Cascadia Code) | Large | Bold |
| Code/calc | Monospace (Cascadia Code) | 0.9rem | Normal |
| May coaching | Segoe UI, system-ui | 0.9rem | Normal |

**Assessment:** Typography is consistent. Monospace for timer and calculator is appropriate. No issues.

### 1.4 Spacing
| Area | Padding | Margin | Gap |
|------|---------|--------|-----|
| Panel padding | 20px | — | — |
| Card padding | 16px | 12px bottom | — |
| Choice button | 10px 14px | 4px | 4px between |
| Section gap | — | — | 16px |
| Form field gap | — | — | 12px |
| Toolbar button gap | — | — | 8px |

**Assessment:** Spacing is reasonable and consistent. No major whitespace waste.

### 1.5 Scrolling Behavior
| Area | Overflow | Issue? |
|------|----------|--------|
| Session view | `overflow: hidden` on parent | Inner panels scroll independently |
| MCQ stem | Scrolls if long | Good |
| Case exhibits | `overflow-x: auto` for tables | Good — prevents horizontal scroll on page |
| Case tasks | Independent scroll area | Good |
| May coaching | `overflow-y: auto` | Good — has scroll-to-bottom button |
| History panel | Auto scroll | Good |

**Assessment:** Scrolling is well-managed. WebKit scrollbar styling applied globally.

### 1.6 Empty States
| Area | Empty State | Quality |
|------|-------------|---------|
| No session active | "Ready for 2026-aligned practice" with mode cards | Good |
| No history | "No sessions yet" message | Adequate |
| No dashboard data | Default zeros | Adequate |
| Question with no explanation | Empty explanation div | Could show placeholder |
| Case with no exhibits | Fallback text | Untested |

**Assessment:** Most empty states are handled. Explanation-empty and no-exhibit states could be improved.

### 1.7 Warnings & Success Messaging
| Trigger | Message | Style |
|---------|---------|-------|
| Save status | "Saving..." / "Saved" / "Save failed" | Top-right status indicator |
| Timer warning | 15min/5min/1min popup | Alert dialog |
| Session recovery | "You have an unsubmitted session" modal | Modal with Resume/Discard |
| Submission confirmation | (none currently) | Missing — could use confirmation |
| Session complete | Score report shown | Full results view |
| Real conditions active | Inline notice | Warning banner |

**Assessment:** Save status is good. Timer warning uses native alert(). **Missing a submit confirmation.**

---

## 2. Viewport & Responsive Issues

### 2.1 Media Queries in styles.css
| Breakpoint | Target |
|-----------|--------|
| 950px | Main layout → stacked |
| 900px | Navigation, results, May panels |
| 768px | May container collapse |
| 600px | May coaching, history panels |
| 480px | Small device tweaks |
| 400px | Extra small device tweaks |

### 2.2 Known Viewport Issues
| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | Session form sidebar narrow on 900-950px | Low | CSS tweak |
| 2 | Case exhibit tables may overflow on small screens | Low | Already `overflow-x: auto` |
| 3 | Calculator popup positioning on very small screens | Low | Already positioned |
| 4 | Theme toggle may overlap with defect diagnostics on narrow screens | Low | Already at top-right |

**Assessment:** Responsive behavior is adequate. No blocking viewport issues.

---

## 3. Layout Shift Assessment

| Trigger | Risk | Mitigation |
|---------|------|------------|
| Bank loading (initial) | Low | `Loading catalog...` placeholder text |
| Timer bar width changes | Low | Transitions applied |
| Question rendering | Low | Container min-heights set |
| May panel expand/collapse | Medium | `transition: height` on container |
| Review screen render | Low | Single render, no incremental updates |

**Assessment:** Layout shift risk is low. Already mitigated with min-heights and transitions.

---

## 4. CSS-Only Fix Candidates (Allowed — No Content/Logic Changes)

| # | Fix | File | Area | Priority |
|---|-----|------|------|----------|
| 1 | Add submit confirmation modal CSS | styles.css | Modal styles | Medium |
| 2 | Improve pause indicator visibility (pulse/border on timer) | styles.css | Timer | Low |
| 3 | Add loading spinner during initial bank parse | styles.css | Hero | Low |
| 4 | Empty explanation placeholder text styling | styles.css | Review | Low |
| 5 | Grade band result card — make more prominent | styles.css | Results | Low |
| 6 | Section checkbox layout on narrow panels | styles.css | Setup | Low |
| 7 | Timer warning inline banner (alternative to alert) | styles.css | Timer | Low |

---

## 5. Auditor Phase — Checklist

- [ ] **Button placement audit** — all session types (MCQ, Case, Mixed, Full)
- [ ] **Panel sizing audit** — viewport widths 400px to 1920px
- [ ] **Typography audit** — consistent font families, sizes, weights
- [ ] **Spacing audit** — no collapsed margins, consistent gaps
- [ ] **Scroll behavior audit** — all panels independently scrollable
- [ ] **Empty states audit** — all views have appropriate empty states
- [ ] **Warning messages audit** — all warnings visible and themed
- [ ] **Success messages audit** — all confirmations visible
- [ ] **Layout shift audit** — no CLS on render transitions
