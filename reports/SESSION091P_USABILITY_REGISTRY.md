# Session 91P — Usability Registry

**Session:** 91P | **Lane:** Governance Light | **Date:** 2026-07-30
**Purpose:** Persistent, structured log of all usability issues discovered during nightly testing.
**Use:** Append new entries after each nightly test session. Never delete — resolve and close only.

---

## Registry Schema

Each entry uses the following fields:

| Field | Required | Description |
|-------|----------|-------------|
| **USAB-ID** | Yes | Unique identifier, format: `USAB-###` |
| **Discovered** | Yes | Date first observed (YYYY-MM-DD) |
| **Tester** | Yes | Who reported it |
| **Scenario** | Yes | Which test scenario triggered it |
| **Category** | Yes | See categories below |
| **Description** | Yes | What happened — observed behavior |
| **Steps to Reproduce** | Yes | Exact steps to trigger the issue |
| **Expected Behavior** | Yes | What should have happened |
| **Actual Behavior** | Yes | What actually happened |
| **Severity** | Yes | See ISSUE_SEVERITY_MATRIX.md |
| **Frequency** | Yes | Once / Intermittent / Every Time |
| **Browser** | No | Browser + version |
| **OS** | No | Operating system |
| **Screen Size** | No | Viewport dimensions |
| **Status** | Yes | Open / Investigating / Fixed / WontFix / Duplicate |
| **Resolved Date** | No | When fixed |
| **Resolution** | No | What was changed |
| **Related USAB** | No | Links to related entries |
| **May Impact** | No | Does this affect May coaching? (Yes/No) |

---

## Categories

| Category | Description |
|----------|-------------|
| **Scrolling** | Scroll behavior issues — panels, containers, overflow |
| **Layout** | Element positioning, overlaps, whitespace, responsive breakpoints |
| **Timer** | Timer display, accuracy, pause/resume, warnings |
| **Rendering** | Question display, choice formatting, exhibit rendering |
| **Session Flow** | Navigation, state transitions, submit flow, recovery |
| **May Coaching** | May panel behavior, recommendations, rendering |
| **Theme** | Light/dark mode issues — contrast, color, adaptation |
| **Performance** | Latency, slowness, frame drops, memory |
| **Input** | Keyboard, calculator, text entry, sliders |
| **Accessibility** | Color contrast, screen reader, keyboard nav |
| **Content** | Question text, answer correctness, explanation quality |

---

## Pre-Existing Friction Points (from Session 90P)

These friction points were identified during code audit (not from live testing). They are logged here as baseline entries so that future live-test findings can confirm or refute them.

### USAB-001

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-001 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | All — load-time observation |
| **Category** | Performance |
| **Description** | 38 script tags load at startup with no loading indicator beyond "Loading catalog..." text. On slow connections or cold cache, users see a blank delay. |
| **Steps to Reproduce** | 1. Clear browser cache 2. Open index_updated.html 3. Observe time between page load and catalog render |
| **Expected Behavior** | Spinner or progress indicator during initial bank parse |
| **Actual Behavior** | Text-only "Loading catalog..." placeholder |
| **Severity** | Low |
| **Frequency** | Every Time (but fast on local) |
| **Status** | Open |
| **May Impact** | No |

### USAB-002

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-002 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Session Setup |
| **Category** | Layout |
| **Description** | Session Setup panel at 350px fixed width may be tight when all section checkboxes (A-F) and sliders are visible. Narrow viewport behavior untested. |
| **Steps to Reproduce** | 1. Open app on viewport ~1000px wide 2. Observe Setup panel spacing |
| **Expected Behavior** | Comfortable spacing for all controls |
| **Actual Behavior** | Panel width is fixed; content may feel cramped |
| **Severity** | Low |
| **Frequency** | Every Time (at narrow widths) |
| **Status** | Open |
| **May Impact** | No |

### USAB-003

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-003 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | MCQ-to-Case transition |
| **Category** | Session Flow |
| **Description** | "Review Before Cases" modal when finishing MCQs may not be obvious to all users. Users might not realize they can still review MCQs after seeing the gate. |
| **Steps to Reproduce** | 1. Start Mixed Session 2. Answer all MCQs 3. Observe transition gate |
| **Expected Behavior** | Clear indication that MCQs are still reviewable |
| **Actual Behavior** | Modal may imply forced forward progression |
| **Severity** | Medium |
| **Frequency** | Every Time (Mixed/Full sessions) |
| **Status** | Open |
| **May Impact** | No |

### USAB-004

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-004 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Submit |
| **Category** | Session Flow |
| **Description** | No submit confirmation dialog. Accidental submit is irreversible — score is final and session data is archived. |
| **Steps to Reproduce** | 1. Answer questions 2. Click "Submit Session" 3. Observe — no "Are you sure?" confirmation |
| **Expected Behavior** | Confirmation modal: "Are you sure you want to submit? X answered, Y marked, Z unanswered." |
| **Actual Behavior** | Direct submit with no confirmation |
| **Severity** | Medium |
| **Frequency** | Every Time |
| **Status** | Open |
| **May Impact** | Yes (May only available post-submit) |

### USAB-005

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-005 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Timer |
| **Category** | Timer |
| **Description** | Timer warnings (15 min, 5 min, 1 min) use native `alert()` dialogs. These are not themed and may feel jarring or unprofessional. |
| **Steps to Reproduce** | 1. Start session with short timer (or wait) 2. Observe timer warning appearance |
| **Expected Behavior** | Themed inline warning banners or styled modals |
| **Actual Behavior** | Browser-native alert() popups |
| **Severity** | Low |
| **Frequency** | Every Time (when timer hits warning thresholds) |
| **Status** | Open |
| **May Impact** | No |

### USAB-006

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-006 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Review Screen |
| **Category** | Session Flow |
| **Description** | Review screen shows all items but has no filter for "only missed" or "only marked." Users must scroll through all items to find specific ones. |
| **Steps to Reproduce** | 1. Complete a session 2. Click Review 3. Observe — all items shown, no filter buttons |
| **Expected Behavior** | Filter buttons: All / Missed Only / Flagged Only / Unanswered |
| **Actual Behavior** | All items in single list, unfiltered |
| **Severity** | Low |
| **Frequency** | Every Time |
| **Status** | Open |
| **May Impact** | No |

### USAB-007

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-007 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Results Screen |
| **Category** | Layout |
| **Description** | Results screen is dense with information. The grade band (e.g., "Superior" / "Competent") may not be visually prominent enough at first glance. |
| **Steps to Reproduce** | 1. Submit a session 2. Observe results screen layout 3. Note where eyes are drawn first |
| **Expected Behavior** | Grade band is the most prominent element — the first thing a user sees |
| **Actual Behavior** | Grade band is one of many elements; score number may compete for attention |
| **Severity** | Low |
| **Frequency** | Every Time |
| **Status** | Open |
| **May Impact** | No |

### USAB-008

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-008 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Case Exhibits |
| **Category** | Rendering |
| **Description** | Case exhibit tables may overflow horizontally on narrow screens. Already mitigated with `overflow-x: auto` but the scroll experience may be unpleasant at very narrow widths. |
| **Steps to Reproduce** | 1. Start Case Study session 2. Navigate to exhibit with wide table 3. Narrow browser window to ~600px 4. Observe table scrolling |
| **Expected Behavior** | Tables wrap or resize gracefully |
| **Actual Behavior** | Horizontal scrollbar on table container |
| **Severity** | Low |
| **Frequency** | Every Time (narrow screens) |
| **Status** | Open |
| **May Impact** | No |

### USAB-009

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-009 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Empty States |
| **Category** | Rendering |
| **Description** | Several empty states lack helpful messaging: explanation-empty div shows nothing, no-exhibit fallback untested, dashboard at zero sessions shows bare zeros. |
| **Steps to Reproduce** | 1. Start app with no history 2. View Dashboard tab 3. Review a question with no explanation 4. Observe empty states |
| **Expected Behavior** | Friendly empty-state messages: "Complete a session to see your stats" / "No explanation available for this question" |
| **Actual Behavior** | Blank areas or bare zeros |
| **Severity** | Low |
| **Frequency** | Every Time (for affected states) |
| **Status** | Open |
| **May Impact** | No |

### USAB-010

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-010 |
| **Discovered** | 2026-07-30 |
| **Tester** | Code Audit (Session 90P) |
| **Scenario** | Timer Display |
| **Category** | Timer |
| **Description** | No visual distinction between "paused" and "running" in the timer text display. The timer block shows a pulse animation on pause (added S90P), but the text does not change. |
| **Steps to Reproduce** | 1. Start session 2. Click pause — observe timer text 3. Click resume — observe timer text |
| **Expected Behavior** | Timer text changes to "PAUSED" or icon changes when paused |
| **Actual Behavior** | Timer digits freeze but text style unchanged from running state |
| **Severity** | Low |
| **Frequency** | Every Time |
| **Status** | Open |
| **May Impact** | No |

---

## Live-Test Findings

*Entries below are filled from actual nightly test sessions. See SESSION091P_TEST_FEEDBACK_TEMPLATE.md for the capture format.*

### Active Issues

| USAB-ID | Category | Severity | Status | Count |
|---------|----------|----------|--------|-------|
| USAB-001 | Performance | Low | Open | — |
| USAB-002 | Layout | Low | Open | — |
| USAB-003 | Session Flow | Medium | Open | — |
| USAB-004 | Session Flow | Medium | Open | — |
| USAB-005 | Timer | Low | Open | — |
| USAB-006 | Session Flow | Low | Open | — |
| USAB-007 | Layout | Low | Open | — |
| USAB-008 | Rendering | Low | Open | — |
| USAB-009 | Rendering | Low | Open | — |
| USAB-010 | Timer | Low | Open | — |

### Summary

| Metric | Value |
|--------|-------|
| Total entries | 10 |
| Open | 10 |
| Investigating | 0 |
| Fixed | 0 |
| WontFix | 0 |
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 8 |

---

## Entry Template (for new findings)

```markdown
### USAB-NNN

| Field | Value |
|-------|-------|
| **USAB-ID** | USAB-NNN |
| **Discovered** | YYYY-MM-DD |
| **Tester** | |
| **Scenario** | |
| **Category** | |
| **Description** | |
| **Steps to Reproduce** | 1. ... 2. ... 3. ... |
| **Expected Behavior** | |
| **Actual Behavior** | |
| **Severity** | |
| **Frequency** | |
| **Browser** | |
| **OS** | |
| **Screen Size** | |
| **Status** | Open |
| **Related USAB** | |
| **May Impact** | |
```
