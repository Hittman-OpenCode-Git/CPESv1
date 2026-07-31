# S124 — Desktop Application Conversion & Guided Onboarding System

**Date:** 2026-07-31
**Governance Lane:** Full
**Preflight:** PASS — 0 divergences, 66/66 governance PASS
**Preflight Certified:** 2451 (unchanged from baseline)

---

## Summary

Transformed the CMA Learning Platform from a browser-oriented application into a desktop-first experience with Electron packaging, guided onboarding tours, application hub, help center, and controlled admin access.

**No content changes, no certification changes, no scoring changes, no cognitive metadata changes.**

---

## Phase 1 — Electron Desktop Shell

### Files Created
- `main.js` — Electron main process (140 lines)
  - BrowserWindow with 1400x900 default, 1024x700 minimum
  - Native menu bar with File (Export/Import), View, Help menus
  - Single-instance lock
  - macOS menu integration
  - Context isolation enabled, node integration disabled

### Files Modified
- `package.json` — Added `"main": "main.js"`, electron dependency, `npm run electron` and `npm run electron-dev` scripts

### Desktop Branding
- Application Name: "CMA Learning Platform"
- Version: 0.10.1-alpha
- About dialog with feature summary
- Menu shortcuts: Ctrl+E (Export), Ctrl+I (Import)

---

## Phase 2 — First-Run Guided Tour

Triggered automatically on first launch when `profile.onboarding.tourCompleted` is `false`.

### Tour Engine (`GuidedTour` object, ~180 lines)

**9-step beginner tour:**
1. Welcome — application overview
2. Dashboard — readiness, performance, collections
3. Study Mode — session configuration
4. May Coach — AI coaching layer
5. Bookmark Collections — Must Master, Technology Weaknesses, etc.
6. Recovery Sprint — targeted remediation
7. Reports — confidence analytics, readiness
8. Settings — export, import, backup, restore
9. Tour Complete — stores `profile.onboarding.tourCompleted = true`

### Technical Implementation
- Spotlight overlay with cutout highlighting
- Tooltip with step indicator, navigation (prev/next/skip)
- Auto-tab switching to bring target elements into view
- Persistence in `cmaProfile2026.onboarding`
- `checkFirstRun()` called 800ms after DOMContentLoaded

---

## Phase 3 — Contextual Feature Tours

### Tour Types
- **beginner** (9 steps) — Full application walkthrough
- **recovery** (4 steps) — Recovery Sprint guide
- **may** (4 steps) — May coaching guide
- **analytics** (4 steps) — Readiness, confidence, domain breakdown
- **admin** (3 steps) — Governance, content, learner analytics

### Access
- "?" help button added to navigation tab bar (persistent)
- Help Center > Feature Tours section
- Electron menu: Help > Quick Start Guide
- All tours restartable at any time

---

## Phase 4 — Admin Console Protection

### Gate Mechanism
- Operations tab hidden by default (`display: none`)
- Click the version number in Settings 5 times within 3 seconds to activate
- Activation persisted in `profile.onboarding.adminActivated`
- Admin badge ("ADMIN") shown on Operations tab when active
- Admin card appears on Home hub when active

### Permissions
- **Normal User:** Study, May, Collections, Reports, Help
- **Admin User:** + Operations (Governance, Portfolio, Repository, Certification)

---

## Phase 5 — Application Hub

### Home View (`renderHomeView`, ~80 lines)

**Hub cards with navigation:**
- Study — MCQ practice, case studies, full simulations
- May Coach — AI readiness scoring, archetype detection, recovery sprints
- Analytics — Performance, confidence, domain readiness
- Collections — Bookmark collections, Must Master, Recovery Candidates
- Session History — Past sessions, trends
- Administration (conditional on admin activation)

**Stats bar:** Sessions, Readiness, Total MCQs, Total Cases

---

## Phase 6 — Help & Learning Center

### Help View (`renderHelpCenter`, ~100 lines)

**Sections:**
- Quick Start — Guided tour, study start, full exam simulation
- How It Works — Readiness score, May coach, Recovery Sprint, confidence calibration
- Feature Tours — 5 restartable tour buttons
- Data Management — Backup, restore, reset, device migration
- FAQ — 5 common questions with answers

---

## Files Changed

| File | Change | Lines Added |
|------|--------|-------------|
| `main.js` | **Created** | 140 |
| `package.json` | Modified | +3 fields, +2 scripts |
| `app.js` | Modified | +516 lines (guided tour engine, admin gate, home hub, help center) |
| `styles.css` | Modified | +351 lines (tour overlay, home hub, help center, admin badge) |
| `index_updated.html` | Modified | +2 view divs, updated tabs, help button injection |

---

## Governance Verification

| Check | Result |
|-------|--------|
| Preflight QID counts | 500/500/500/500/545 — MATCH |
| Preflight parse | 5/5 OK |
| Certified count | 2451 — matches baseline |
| Governance guard | 66/66 PASS |
| Divergences | 0 |
| Pack content | UNCHANGED |
| Answer keys | UNCHANGED |
| question_state | UNCHANGED |
| Scoring | UNCHANGED |

---

## Success Criteria

- [x] Desktop application launches via `npm run electron`
- [x] No browser chrome visible in Electron mode
- [x] First-run onboarding tour auto-triggers
- [x] 5 interactive feature walkthrough types
- [x] Tour completion persists in profile
- [x] Admin console hidden behind activation gate
- [x] Help Center implemented with FAQ
- [x] Home hub with card navigation
- [x] Import/export still works (Electron menu integration)
- [x] Backups still work (untouched)
- [x] 66/66 governance PASS
- [x] 0 divergences

---

## Installation

```bash
npm install        # Installs electron + playwright
npm run electron   # Launches desktop app
```

For browser-only mode, open `index_updated.html` directly as before.
