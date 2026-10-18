# May 2.5 Track 1 Closeout — Grounded Coaching + Integrity Hardening

**Date:** 2026-09-21
**Token:** `may_2_5_track1`
**Lane:** Governance Light (app/may only; zero pack/case/answer-key/state writes)
**Scope:** Board-approved 2026-09-21 — W6 indicator, exam-integrity audit, micro-lesson grounding. Nothing else.
**Hard-stops honored:** HS-1/2/4/5/7, DL-045 (positive evidence only), DL-060.
**Status:** COMPLETE — all Tend gates green (one authorized baseline drift reported, recapture deferred).

---

## 1. What shipped (7 May files + 1 probe script, no content touched)

| # | File | Change |
|---|------|--------|
| 1 | `app/may/may-telemetry.js` | `trackDegradation` emits `indicatorVisible` bit (T6 distinguishes DL-060 A/B/C) |
| 2 | `app/may/may-core.js` | New `MayExamGuard` (single HS-4 suppression source over `isExamIntegrityMode`); new `MayDegradation` pill manager (visible IFF a source is active; every report/clear/dismiss emits T6 + appends `window.__mayDegradationLog` with counts); `MayOnPipelineResult` routes through it; `_socraticFollowUp`/`_provideHint`/`handleAction` gated; attempt-gated hints |
| 3 | `app/may/may-learner-state.js` | `_isConfusionAllowed` delegates to `MayExamGuard`; `recordAttempt` stamps `hintAssisted`/`masteryCorrect`; aggregates track `masteryCorrectCount`; `getTopicProgress` exposes `masteryAccuracy` (bands unchanged — no relabeling) |
| 4 | `app/may/may-micro-lesson.js` | `generate()` refuses non-Certified sources (HS-2); re-cites EC excerpt + EW excerpt + FormulaReference + authority per EV3 with `sources{}` provenance and `ev3Compliant` flag (HS-1/HS-5) |
| 5 | `app/may/may-coaching-orchestrator.js` | Direct T6 emit demoted to fallback-only (pill manager owns the bit; no double-count); `chaosClear()` clears the orchestrator source |
| 6 | `app/may/may-llm-provider-registry.js` | `_fallback` reports `llm-fallback` via the truth path (guarded, non-blocking) |
| 7 | `app/may/may-coaching-router.js` | Dispatch *exception* reports `router-fallback`; routine flag-off null explicitly excluded (DL-060 B guard) |
| 8 | `scripts/may_2_5_track1_probes.js` | Tend probes: leak + gaming + HS-4 guard + chaos (see §2) |

Deliberately untouched: `app/app.js` (single source consumed, never duplicated), all pack/case/registry/baseline files, W8 persistence, adaptive selection, W9 enforcement, PII/profiles.

## 2. Tend evidence (DL-045 — counts, not claims)

- **Probes 13/13 PASS** (`node scripts/may_2_5_track1_probes.js`): leak 4/4 hint levels free of correct text; gaming `hintAssisted=true`/`masteryCorrect=false`, mastery 0% vs accuracy 100% on assisted item, HS-2 refuse + EV3 ground; HS-4 5/5 holds suppress Socratic+confusion; chaos report→visible+T6-bit, dismiss→T6-false, clear→0 active with log counts; orchestrator funnel inject/clear verified.
- **`node --check` PASS** on all 7 touched files.
- **`npm run smoke` PASS** — May-alive gate green; W1-A/B resume-integrity scenarios green (full/practice/real-conditions); zero page errors.
- **`npm run preflight` Tend:** counts stable (3052 pool-wide), guard **101/101 PASS** (task gate cited 98/98; suite has grown — superset, all green), all content hashes OK.
- **One reported drift:** coherence flags hash drift on exactly the two baselined May files in this change-set (`may-core.js`, `may-learner-state.js`). Authorized under this token; recapture requires a `rebuild_baselines`-authorized session and is **not** performed here (Light-Lane §13.1 MEDIUM → report, board decides).
- Pipeline not run — correctly omitted: no content/regeneration work occurred (Light Lane rule).

## 3. Residual risks accepted by this change-set

1. **Readiness bands still use legacy accuracy** (mastery is exposed alongside, not substituted) — substituting bands without a 30-day baseline would be portfolio relabeling by another name. Board decision needed in 3.0.
2. **Hint gate keys on `_prevAnswers`** (live-attempt record) — refresh-mid-question edge resets the gate; acceptable (fail-open toward the nudge, never toward the answer).
3. **Pill host falls back to `document.body`** when the May panel is absent — placement CSS is minimal; visual polish deferred to 3.0 shell work.
4. **Lookbehind regex in micro-lesson EC splitter** — modern engines only; `node --check` + smoke pass, but a legacy-WebView learner would throw inside a guarded try (fail-soft to full EC, still compliant).

## 4. Recommendations carried into the May 3.0 debate

- R1: Settle the readiness-band question (mastery-weighted vs legacy accuracy) with the +30d T5 baseline — do not relabel by fiat.
- R2: Authorize per-workstream 3.0 tokens only after the T1–T6 30-day readouts land (no pre-authorization).
- R3: Keep the `rebuild_baselines` recapture for the two drifted May files bundled with the next authorized May change (avoid a standalone Full-Lane session for two hashes).
- R4: Any 3.0 adaptive-selection or item-generation proposal must arrive with its CAQS floor pre-specified (HS-8) — otherwise it is not reviewable.

**Full history:** `knowledge/REVISION_HISTORY.md` entry of 2026-09-21 (token `may_2_5_track1`).
**Design authority:** `reports/MAY_PHASE_2_1_DESIGN_20260920.md` (W6/DL-060) + `reports/MAY_PHASE_2_REPLAN_20260920.md` (§10 HS-1–HS-10, D1–D4).
