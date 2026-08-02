# P4 — Parallel Hardening: Assessment Report

**Session:** S133 (parallel track, Light Lane — app/UI, no content edits)
**Date:** 2026-08-01
**Method:** Two read-only exploration agents; direct file inspection. No files modified.

---

## 1. Table Renderer

**Primary:** `renderMarkdownTables(text)` — `app/app.js:825-875` (consumed via `nl2br` at 877-884 across stems, case text, review screens, May quiz stems).

**Case exhibit renderers (2 duplicated inline sites):**
- `caseExhibitsHtml(c)` — `app/app.js:2906-2912` (practice mode)
- `renderCaseExam(c)` inline — `app/app.js:2833-2840` (exam mode)

**Findings:**
| # | Defect | Location |
|---|--------|----------|
| R1 | Case renderers expect `Headers`+`Rows`; **zero fallback to `Body`** — a malformed table exhibit throws and kills the *entire case* | app.js:2838, 2909 |
| R2 | Rows rendered at raw length (ragged `<td>` vs `<th>`), not normalized to `Headers.length` | app.js:2909 |
| R3 | `renderMarkdownTables` silently truncates over-long rows; no HTML escaping (XSS/dom-breakage vector); `**bold**` renders literally | app.js:851-862 |
| R4 | Non-table Types (dashboard/chart/contract/etc.) fall into `<p>${ex.Body}</p>` → literal `undefined` if Body absent | app.js:2839, 2911 |
| R5 | No HTML escaping anywhere; 17 live `&`/`<`/`>` occurrences in exhibit data today | app.js |
| R6 | `validateCase` validates Items only — **no exhibit-shape validation upstream** | app.js:2717-2764 |

**Exhibit census (today):** 117 exhibits across case_pack_1-3 (99 table + 18 text). DL-023 Body shapes = 0 (normalized). Legacy scored_cases also clean. MCQ packs: zero exhibit fields; 8 embedded markdown tables in Pack A stems, all render correctly.

## 2. Tour Repair

**Engine:** `GuidedTour` — `app/app.js:6158-6451`; CSS `styles.css:5523-5557`.

| # | Defect | Location |
|---|--------|----------|
| T1 | Spotlight never viewport-clamped (tooltip is, spotlight isn't) → off-screen hole on bottom/full-width targets | app.js:6399-6419 |
| T2 | `document.body` fallback → cy = pageHeight/2 below the fold (heavy tab renders miss the 200 ms window) | app.js:6364, 6393-6403 |
| T3 | Fixed 300 ms wait after `smooth` scroll; no scrollend/rAF settle → measures mid-scroll | app.js:6368-6373 |
| T4 | `scrollIntoView` on sticky `#sessionForm` → page jump, spotlight at wrong location | app.js:6348-6349; styles.css:318-323 |
| T5 | z-index (10000-10002) vs May (1050/1100) — no conflict | — |

## 3. Session-Mode Layout

| # | Defect | Location |
|---|--------|----------|
| L1 | Control-hiding is CSS-class-only, no JS toggle → any non-start launch path leaks controls | app.js:2032, 5395 |
| L2 | **Full-exam integrity mode not restored on resume** (resume adds only `session-active`) | app.js:5392-5399 |
| L3 | `html/body` have no height → `height:100%` chain is a no-op; question area doesn't fill viewport | styles.css:94-102, 304, 365, 972 |
| L4 | `.layout{max-width:1400px}` caps work-panel on ultra-wide | styles.css:302 |
| L5 | Navigator (100-item exam → ~20 nav rows) unbounded height | styles.css:1210-1231 |
| L6 | May quiz setup leaves session form visible (by design — "No session required") | app.js:7131-7205 |

## 4. Floating May Assistant

**Code:** `May.Floating` — `app/app.js:6679-6794`; CSS `styles.css:5983-6040`.

| # | Defect | Location |
|---|--------|----------|
| M1 | Panel initial placement only left-clamped → renders off-screen right when dot is at right edge (drag clamp exists, initial doesn't) | app.js:6728 |
| M2 | Panel vertical placement not clamped at open | app.js:6728-6729 |
| M3 | Suppression is CSS-only (`display:none`); programmatic `_showDot()` can reveal mid-exam | app.js:6786-6789; styles.css:6100-6112 |

## 5. Exam Integrity Mode (AI suppression until submission)

| # | Defect | Location |
|---|--------|----------|
| E1 | **`May._examModeActive` is a dead flag — never set anywhere** → `exam_briefing` routing and `ANSWER_LEAKAGE_EXAM` safety check are unreachable | may-context-builder.js:101; may-core.js:6279 |
| E2 | `isFullTabBlocked()` ignores `realConditions` — CSS hides UI but JS answer-revealing actions not blocked for "Real Conditions" MCQ sessions | may-core.js:950-959 |
| E3 | Resume path never re-enters exam integrity mode (same as L2) | app.js:5392-5399 |
| E4 | No cleanup on discard (harmless today) | app.js:5401-5405 |

---

## 6. Prioritized Repair Plan (execution order)

**Wave 1 (highest learner impact, bounded):**
1. Resume path: restore `exam-integrity-mode` class (L2/E3) — 2-line fix
2. Dead flag: set `May._examModeActive` in start/resume/finish (E1) — activates exam_briefing + ANSWER_LEAKAGE_EXAM
3. Extend `isFullTabBlocked()` to `realConditions` (E2)
4. Case exhibit renderer: shared defensive helper with Body fallback + column normalization + HTML escaping (R1/R2/R4/R5)
5. Tour: clamp spotlight + body-fallback centering (T1/T2)

**Wave 2:**
6. `renderMarkdownTables`: escaping + explicit row truncation (R3)
7. `validateCase`: exhibit-shape validation (R6)
8. Session layout: JS-side control hiding + viewport-height question area (L1/L3/L5)
9. Floating May: initial-placement clamping + JS exam guard (M1/M2/M3)

All fixes are app/UI (Light Lane) — no pack/case/content changes. Backups recommended for app.js before edits per §3.
