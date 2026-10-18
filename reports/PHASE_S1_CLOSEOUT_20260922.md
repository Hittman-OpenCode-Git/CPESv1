# Phase S1 Closeout — 2026-09-22 (E-01, E-02, E-03, E-06)

**Lane:** Governance Light Lane. Zero repo code/content writes (3 temp-dir scripts only).
**Verdict: S1 COMPLETE — 2 findings, 0 new DL filings.**

## Results

| Exercise | Result | Key evidence |
|----------|--------|--------------|
| E-01 UI-state confirm | 3/3 warnings adjudicated non-defects | May float hidden by `styles.css:6318` under exam-integrity (design); calc selectors in torture (`#calcBtn`, `.calculator`) never match real IDs (`floatingCalculator` app/app.js:1628, `calcFloatRestore` :1733) → selector artifact; jump hidden by review `data-filter` re-render (app/app.js:4484) → filter artifact |
| E-02 loader matrix | 12/12 PASS | 0/11–10/11 BLOCK naming missing globals; 11/11 LOADED; empty-array global blocks; both fail-closed catches explicit (app/app.js:2637-2642, 6678-6681) |
| E-03 case pool | 3/3 PASS | P1: 80 cases / 80 unique / 425 items / 80 Certified / A–F covered; P2: 110 cases / 660 items / 110 case-Certified. Torture "no cases" = section-filter mechanism (app/app.js:3116 unmatched → empty) |
| E-06 flapping | 21/21 PASS | report→V, dismiss→H+inactive, source-dedupe, scoped clear, sticky-dismiss-by-design, op sequence `report,report,clear,clear`, visibility `VVHH` |

## Findings (no DL filings — known-family/observations)

1. **WS-D scope stale (board-level):** briefing scoped `isLoaded` as 1-global + silent swallow; current code checks all 11 globals (app/app.js:1408-1433), throws with missing list (:1445), blocks explicitly at both catches. **WS-D as scoped is already implemented** — recommend re-scoping WS-D to verification-only (E-02 re-run post any loader touch) or closing it.
2. **Copy drift (cosmetic):** "nine files/Nine content files" (app/app.js:6673, 6826) vs 11 `_src` entries (:1406). Suggest 1-line copy fix when loader next touched; not a defect.

## Scripts (temp dir, not repo)

`may_8h_sim.js` (prior), `s1_e02_loader_matrix.js`, `s1_e03_casepool.js`, `s1_e06_flap.js` — all in `C:\Users\User\AppData\Local\Temp\opencode\`.

## Next

Phase S2 (E-04 real-item leak/gaming n=40, E-05 resume-integrity fuzz, E-07 cohort aggregation) on authorization.
