# Session 60A — Closure Strategy

**Date:** 2026-07-28
**Authority:** S58 feed-forward rule
**Status:** READ-ONLY STRATEGY — execution authorization required
**Inputs:** S58 closure forecast, SESSION060A_ARCHIVE_INVENTORY.json, CURRENT_BASELINES.md, prior quality reports (S50–S58)

---

## 1. Current State

### 1.1 Archived Inventory by Section

| Section | Pack | QIDs | Count | Domain | Avg Difficulty | Bloom's Range |
|---------|------|------|-------|--------|---------------|---------------|
| EC | C | P1-EC-068,070,071,073,074,075 | 6 | COSO Internal Controls | 2.0 (Easy–Moderate) | Understand only |
| ED | D | P1-ED-041,044,045,047,048,052,053,055,056,057,059,061,062,063,065,068 | 16 | COSO Internal Controls | 2.2 (Easy–Moderate) | Understand–Apply |
| FC | C | P1-FC-002,003,004,008,009,011,013,014,017,018,019,021,022,023,024,027,028,030,032,033,035,037,038,039,040,041,042,044,046,047,049,051,052,054,056,057,059,060,061,062,064,065,066,069,070,071,072 | 47 | Technology & Analytics | 2.5 (Easy–Moderate) | Understand–Apply |
| FD | D | P1-FD-004,008,012,014,019,023,024,029,032,036,037,038,039,042,044,045,048,051,052,053,056,057,058,060,061,062,063,065,066,067,068,070,071,072 | 34 | Technology & Analytics | 2.3 (Easy–Moderate) | Understand–Apply |

| **Total** | | | **103** | | | |

All 103 items are DL-012 rotation clones with the characteristic clone profile: definition-match stems, Understand cognitive level (with a handful of Apply), Easy–Moderate difficulty labels, boilerplate distractor explanations, and 5-item rotation-group structures. **Full content replacement is required for every item** — not just metadata upgrade.

### 1.2 Certified Pool (Post-S58)

| Pack | Total | Certified | Archived | Other (Active) | Sections Closed |
|------|-------|-----------|----------|----------------|-----------------|
| A | 500 | 500 | 0 | 0 | All 6 |
| B | 500 | 500 | 0 | 0 | All 6 |
| C | 500 | 438 | 53 | 9 (Active) | A, B, C, D |
| D | 500 | 439 | 50 | 11 (Active) | A, B, C, D |
| E | 540 | 540 | 0 | 0 | All sections (+ R-series) |
| **Total** | **2,540** | **2,417** | **103** | **20** | 95.2% certified |

**Projected post-closure:** Pack C = 491, Pack D = 489. Total certified = 2,520. Pool certification rate = 99.2%.

### 1.3 Pack C Section Detail

| Section | Total | Certified | Archived | Active |
|---------|-------|-----------|----------|--------|
| A | 75 | 75 | 0 | 0 |
| B | 100 | 100 | 0 | 0 |
| C | 100 | 100 | 0 | 0 |
| D | 75 | 75 | 0 | 0 |
| E | 75 | 64 | 6 | 5 |
| F | 75 | 24 | 47 | 4 |

### 1.4 Pack D Section Detail

| Section | Total | Certified | Archived | Active |
|---------|-------|-----------|----------|--------|
| A | 75 | 75 | 0 | 0 |
| B | 100 | 100 | 0 | 0 |
| C | 100 | 100 | 0 | 0 |
| D | 75 | 75 | 0 | 0 |
| E | 75 | 54 | 16 | 5 |
| F | 75 | 35 | 34 | 6 |

---

## 2. Replacement Velocity

### 2.1 Historical Pace

| Session | Phase | Date | Items | Sections | Clear (DL-008) |
|---------|-------|------|-------|----------|-----------------|
| S899 | 1 | 2026-07-28 | 20 | EC+ED+FC+FD (mix) | ✓ |
| S50 | 2 | 2026-07-28 | 20 | EC+ED | ✓ |
| S51 | 3 | 2026-07-28 | 20 | EC+ED | ✓ |
| S52 | 4 | 2026-07-28 | 20 | EC+ED | ✓ |
| S56 | 5 | 2026-07-28 | 20 | EC+ED | ✓ (0 defects) |
| S58 | 6 | 2026-07-28 | 20 | EC+FD | 1 found + fixed (P1-FD-041) |

| **Total** | | | **120** | | **1 defect** |

**Observed pace:** 20 items/session, every session, with 99.2% first-pass structural quality (1 DL-008 incident in 120 items = 0.8%).

### 2.2 Pace Options

| Pace | Items/ Session | Sessions Needed | BLOCK-AUTHORIZED Required? | Risk Profile |
|------|---------------|-----------------|---------------------------|--------------|
| Conservative | 20–22 | 6 | No (Rule 5 cap: ≤30) | Lowest. Proven pace. |
| Moderate | 25 | 5 | Partial (2 of 5 sessions) | Acceptable. Close to proven pace. |
| Aggressive | 30 | 4 | Yes (all sessions) | Elevated. Untested at scale. Authoring fatigue risk. |

**Recommendation:** Conservative (20–22/session, 6 sessions). The proven pace has 0 regressions in 5 of 6 waves. No upside to compressing sessions when authoring quality is the binding constraint. Each Technology & Analytics item at Analyze/Evaluate level requires domain expertise across cloud, AI/ML, blockchain, ERP, cybersecurity, data governance, data mining, RPA, NLP, IoT — compressing these into fewer sessions risks quality degradation.

---

## 3. Optimal Replacement Order

### 3.1 Recommended Sequence

```
Wave A — S60B: EC(6) + ED(16) = 22 items — COSO Internal Controls
  |
  v
Wave B — S60C: FC(20) — Technology & Analytics (first half)
  |
  v
Wave C — S60D: FC(20) — Technology & Analytics (second half)
  |
  v
Wave D — S60E: FC(7) + FD(13) = 20 — T&A bridge session
  |
  v
Wave E — S60F: FD(20) — Technology & Analytics (third quarter)
  |
  v
Wave F — S60G: FD(1) + program closeout — final item + finalization
```

### 3.2 Rationale

**1. EC+ED first (22 items, 1 session).**
- **Original clone program scope completion.** The DL-012 clone program was defined around Sections E (EC+ED). Completing these achieves the original charter. The entire clone program's core — Sections E across both Packs C and D — closes in the first session.
- **Momentum builder.** COSO internal controls content is the most practiced authoring domain across all 6 prior waves (S899–S58). Every wave achieved 100% quality pass on COSO items. This is the lowest-risk wave and sets a strong opening tone.
- **Pack C Section E achieves full closure (75/75 certified).** Section E is Pack C's last open section. Pack D Section E closes with 70/75 (5 Active items remain separately).
- **22 items > 20:** marginally above the proven pace but well within 30-item Rule 5 cap. The extra 2 items are low-risk given the COSO authoring is formulaic and well-practiced.

**2. FC next (47 items, 2–3 sessions).**
- **Largest block.** Technology & Analytics is the most cognitively diverse domain: cloud models, AI/ML, blockchain, ERP, cybersecurity frameworks, data governance, data mining, RPA, NLP, IoT. Each sub-topic requires distinct domain expertise. Breaking this into 2+ sessions prevents authoring fatigue.
- **Pack C gets closure momentum.** After FC completes, Pack C Section F closes at 71/75 (4 Active items remain). Pack C becomes effectively closed (only 9 Active items across remaining sections).
- **Concentration benefit.** Working on one domain for 2 consecutive sessions improves authoring rhythm and cross-item consistency.

**3. FD last (34 items, 2 sessions).**
- **Clean finish.** Pack D Section F is the final open section. FD(34) after FC(47) provides a natural ramp-down rather than a mid-program context switch.
- **Pack D Section F closes at 69/75** (6 Active items remain). Pack D reaches effective closure.
- **Program ends on a rising trajectory** — the last items authored benefit from lessons learned across all prior waves.

### 3.3 Why Not Interleave EC+ED with FC and FD?

Interleaving (e.g., 10 EC + 10 FC per session) increases context-switching cost and reduces domain momentum. The recommended sequence stays within one domain per session except for the single bridge session (S60E: FC→FD transition). This minimizes the cognitive cost of switching between COSO principles and technology analytics topics.

### 3.4 Why Not by Pack?

Processing Pack C first (53 items) then Pack D (50 items) would mean 2.5 sessions on Pack C then 2.5 on Pack D. However, this splits the COSO domain across two non-consecutive windows (EC items in session 1, ED items 3 sessions later). The current ordering keeps all COSO together in session 1, all Technology together in sessions 2–6.

---

## 4. Session Schedule

### 4.1 Detailed Wave Plan

| Session | Sections | Items | Pack(s) | Domain | Cumulative | Notes |
|---------|----------|-------|---------|--------|------------|-------|
| **S60B** | EC(6) + ED(16) | **22** | C + D | COSO Internal Controls | 22 | Clone program closure. Pack C Section E closes. |
| **S60C** | FC batch 1 | **20** | C | Technology & Analytics | 42 | FC first half. |
| **S60D** | FC batch 2 | **20** | C | Technology & Analytics | 62 | FC second half. |
| **S60E** | FC final(7) + FD(13) | **20** | C + D | T&A bridge | 82 | Pack C Section F closes. FD begins. |
| **S60F** | FD batch 2 | **20** | D | Technology & Analytics | 102 | FD penultimate. |
| **S60G** | FD final(1) + closeout | **1 + closeout** | D | — | 103 | Final item. Program closeout. |

**Total: 6 sessions, 103 items, projected same-day completion (2026-07-28).**

### 4.2 Per-Session Governance Checklist

Each session must clear all gates before moving to the next:

| Gate | Check | Tool |
|------|-------|------|
| G1 | Governance guard 51/51 PASS | `node scripts/test_governance_guard.js` |
| G2 | DL-008 scan: 0 non-empty EW[CC] | Boundary-aware object parser |
| G3 | DL-026 scan: 0 empty non-CC EW | Boundary-aware object parser |
| G4 | DL-037 scan: 0 logic inversions | `node scripts/scan_logic_inversions.js` |
| G5 | Parse validation: `node --check` clean | `node --check pack_c_corrected.js` etc. |
| G6 | QID count: C=500, D=500 | `Select-String -Pattern '"QuestionID"' | Measure-Object` |
| G7 | CorrectChoice integrity: no drift on untouched items | Diff against pre-session backup |
| G8 | question_state: all replaced items → "Certified" | Direct grep |
| G9 | Backup: timestamped .bak before write | Per BACKUP_PROTOCOL.md |
| G10 | Slot ledger: written to reports/SESSION0XX_SLOT_LEDGER.json | — |

### 4.3 Content Replacement Standards

Every replaced item must meet:

| Dimension | Target |
|-----------|--------|
| Bloom's | Analyze or Evaluate (no Understand/Remember replacements) |
| Difficulty | Difficult (4) or Very Difficult (5) |
| Stem | Scenario-based with named company + stakeholder |
| Distractors | Plausible CMA-style traps with choice-specific explanations |
| ExplanationCorrect | COSO principle / technology standard reference + reasoning chain + business interpretation |
| ExplanationWrong[non-CC] | All 3 slots populated with ≥50 chars choice-specific text |
| ExplanationWrong[CC] | Empty (DL-008 compliant) |
| DL-037 | Zero binary lead-in polarity mismatches |

---

## 5. Risk Register

### 5.1 Structural Defect Risk

| Risk | Section(s) | Severity | Probability | Mitigation |
|------|-----------|----------|-------------|------------|
| DL-008 — non-empty EW[CC] | All | HIGH | ~5% per wave (1/120 items) | Post-write DL-008 scan on every batch. S58 found 1 instance (P1-FD-041). Treat as expected. |
| DL-026 — empty non-CC EW | All | MEDIUM | ~2% per wave | Post-write DL-026 scan. 39 Certified Domain F items (DL-035) are IN PROGRESS with pre-existing empty slots — these are separate from the replacement program but share the same section pool. |
| DL-016 — metadata-content mismatch | EC, ED, FC, FD | MEDIUM | Unknown | Packs C and D use dual-block architecture. CC must be extracted from the same enclosing JSON object as the EW fields. Prior waves: no DL-016 drift observed on replaced items. |
| DL-037 — logic inversion | All | LOW | ~0.1% (1/2,500 pool-wide) | post-write `scan_logic_inversions.js`. Only 1 instance found across entire 2,500-item pool. |
| JSON corruption | All | LOW | ~1% per wave | Parse validation after every batch. DL-020 (brace-matcher string-awareness) has been fixed. |

### 5.2 Content Quality Risk

| Risk | Sections | Severity | Probability | Mitigation |
|------|----------|----------|-------------|------------|
| Authoring fatigue | FC (47 items) | MEDIUM | Moderate | Break FC into 2 sessions (20+20+7). Technology domain is cognitively diverse — avoid compressing. |
| Technology domain knowledge gaps | FC, FD | MEDIUM | Low–Moderate | Prior S899 wave demonstrated successful T&A authoring (10 FC+FD items at Analyze/Evaluate). Domain expertise exists but 81 T&A items is substantially more than 10. |
| Difficulty miscalibration (DL-031) | All | MEDIUM | Moderate | Verify stem-correct answer overlap < 50% for every item. Archive pool is all Easy–Moderate; replacements must be Difficult–Very Difficult. |
| Explanation boilerplate residue (DL-013) | FC, FD | LOW | 0% | All 103 items are DL-012 clones with boilerplate explanations. Full content replacement eliminates DL-013 by construction. |

### 5.3 Process Risk

| Risk | Severity | Probability | Mitigation |
|------|----------|-------------|------------|
| Concurrent-write collision (DL-019) | HIGH | Low | File-lock discipline. Verify target QIDs immediately before each write. S56 and S58 had a parallel-session collision. |
| Session count underestimation | MEDIUM | Low | 6 sessions is conservative. If any session requires rework, buffer exists in same-day schedule. |
| Backup failure | HIGH | Very Low | Timestamped .bak per BACKUP_PROTOCOL.md. Confirm file exists + non-zero size before edit. |
| Governance guard regression | LOW | Very Low | Guard test suite (51 tests) must pass before every wave. |

### 5.4 DL-035 Co-Location Risk

39 Certified Domain F items (Pack C: 28, Pack D: 11) carry DL-035 (empty distractor EW slots) — separate from the 103 archived items. These 39 are in the S853 WAVE_A certification set and are in the active learner pool with degraded educational feedback.

**Co-location:** The 39 DL-035 items sit in the same sections (FC, FD) where the replacement program operates. There is zero risk of conflating them with the 103 archived items (which are `question_state: "Archived"`, not `"Certified"`). However, the replacement program's post-write scans may encounter DL-035 on the 39 Certified items and report them as "existing pool defects." This is expected and should not block the replacement program — the 39 items are a known, separately tracked backlog.

---

## 6. Minimal Viable Closure

### 6.1 Could We Close After EC+ED Only?

**Yes.** After S60B (EC+ED, 22 items):
- 22 items replaced → certified pool = 2,439
- All COSO Internal Controls archived items are zero. The original DL-012 clone program scope is complete.
- 81 items remain archived (FC=47, FD=34) but are Technology & Analytics domain — separable from the internal controls clone program.

### 6.2 Tradeoffs

| Option | Sessions | Items Replaced | Pool Certified | Archived Remain | State |
|--------|----------|---------------|----------------|-----------------|-------|
| EC+ED only (minimal) | 1 | 22 | 2,439 | 81 | Clone program closed. T&A deferred. |
| Full closure | 6 | 103 | 2,520 | 0 | Complete program closure. |

**Arguments for full closure:**
- All 103 items are DL-012 clones — 81 remaining T&A clones have identical quality problems (definition-match stems, Understand level, boilerplate distractors)
- Partial closure leaves a known backlog that may never be addressed (same pattern as DL-035 — 39 items sitting IN PROGRESS since S814)
- T&A authoring velocity has been demonstrated (S899: 10 T&A items at Analyze/Evaluate). Scaling to 81 is feasible.
- 6 sessions is achievable in one day (prior waves: S899–S52 completed 4 sessions in a single day)

**Arguments for minimal closure (EC+ED only):**
- Declares victory on the original clone program scope
- Saves 5 sessions of authoring effort
- T&A items are in a domain with less practiced authoring patterns — quality risk is real
- 81 T&A clones are Archived and pose zero learner-safety risk (they never appear in the learner pool)

### 6.3 Recommendation

**Full closure is recommended.** The program has demonstrated sustained 20-item/session velocity across 6 consecutive waves with 99.2% first-pass quality. The remaining 81 items are the same DL-012 clone profile as the 120 already replaced. Partial closure creates technical debt — the 81 T&A clones would remain as known-low-quality items in the archive, and the momentum to address them may dissipate. Full closure achieves the cleanest state: zero archived items, maximum certified pool (2,520), and the satisfaction of completing the entire DL-012 clone remediation program in a single sustained effort.

---

## 7. Recommendations

### 7.1 Primary Recommendation

Execute the 6-session full closure plan (S60B through S60G) at the conservative 20-22 items/session pace.

1. **S60B:** EC(6) + ED(16) = 22 items. COSO Internal Controls. Clone program closes.
2. **S60C:** FC(20). Technology & Analytics first half.
3. **S60D:** FC(20). Technology & Analytics second half.
4. **S60E:** FC final(7) + FD(13) = 20. Bridge session. Pack C closes.
5. **S60F:** FD(20). Pack D Section F penultimate.
6. **S60G:** FD final(1) + program closeout. Final item. Write final slot ledger. Update CURRENT_BASELINES.md.

### 7.2 Governance Requirements

- **Rule 5 compliance:** All batches ≤30 items. No BLOCK-AUTHORIZED required at 20–22 items/session.
- **Backup protocol:** Timestamped .bak for pack_c and pack_d before every edit.
- **Post-write audit:** G1–G10 gate checklist per session.
- **Slot ledger:** Write `reports/SESSION06X_SLOT_LEDGER.json` after each session.
- **Quality report:** Write `reports/SESSION06X_QUALITY_REPORT.md` after each session with per-item QC table (CC, difficulty, cognitive, DL-008, DL-026).

### 7.3 Post-Closure Actions

After S60G:
1. Update `knowledge/CURRENT_BASELINES.md` §1: recapture SHA-256 for packs C and D
2. Update `knowledge/CURRENT_BASELINES.md` §2: Certified pool 2,417 → 2,520
3. Write `knowledge/REVISION_HISTORY.md` entry documenting closure
4. Write `reports/SESSION060_CLOSURE_REPORT.md` — final program summary
5. Archive all interim slot ledgers and quality reports under `reports/closure/SESSION060/`
6. Recalculate QID counts: `Select-String -Pattern '"question_state": "Certified"' | Measure-Object` on all 5 packs
7. Governance guard final verification: 51/51 PASS
8. Mark DL-012 as **Resolved** in `knowledge/DEFECT_LIBRARY.md`

### 7.4 Stop Conditions

Halt the program if any of the following occur:
- Governance guard test count drops below 51/51
- Any session introduces >0 DL-008 or >0 DL-026 in replacement items
- Any session causes QID count deviation (C≠500 or D≠500)
- Parse validation fails on either pack file
- Two consecutive sessions show declining quality metrics (authoring fatigue signal)
- Backup file creation fails before any edit

### 7.5 Fallback Position

If full closure proves infeasible after 3 sessions (authoring fatigue, quality regression, time constraint):
- Close after EC+ED+FC partial (first 2–3 sessions)
- Declare program closure on COSO clone remediation
- Defer remaining FD items to a separate Technology & Analytics modernization wave
- This preserves the structural gains from the sessions completed without abandoning the program in an intermediate state.

---

## Appendix A — Section-by-Section QID Inventory

### A.1 EC — Pack C Section E (6 items)

P1-EC-068, P1-EC-070, P1-EC-071, P1-EC-073, P1-EC-074, P1-EC-075

Topics: segregation of duties (068, 070), control deficiency remediation (071, 073, 074, 075). All Understand. Difficulty: Easy–Moderate.

### A.2 ED — Pack D Section E (16 items)

P1-ED-041, P1-ED-044, P1-ED-045, P1-ED-047, P1-ED-048, P1-ED-052, P1-ED-053, P1-ED-055, P1-ED-056, P1-ED-057, P1-ED-059, P1-ED-061, P1-ED-062, P1-ED-063, P1-ED-065, P1-ED-068

Topics: risk assessment (041, 044, 045), ethics program (047, 048), authentication controls (052, 053, 055), cost-benefit limitation (056, 057, 059), vendor master file (061, 062, 063, 065), audit committee oversight (068). All Understand or Apply. Difficulty: Easy–Moderate.

### A.3 FC — Pack C Section F (47 items)

P1-FC-002,003,004, 008,009, 011,013,014, 017,018,019, 021,022,023,024, 027,028,030, 032,033,035, 037,038,039,040, 041,042,044, 046,047,049, 051,052,054, 056,057,059,060, 061,062,064,065, 066,069,070, 071,072

Topic clusters: data governance (002,003,004), analytics types (008,009), RPA (011,013,014), cloud models (017,018,019), data visualization (021,022,023,024), cybersecurity CIA (027,028,030), big data 3Vs (032,033,035), data mining (037,038,039,040), blockchain (041,042,044), data quality (046,047,049), AI/ML (051,052,054), phishing social engineering (056,057,059,060), ERP benefits (061,062,064,065), data lake vs warehouse (066,069,070), continuous auditing (071,072).

### A.4 FD — Pack D Section F (34 items)

P1-FD-004, 008, 012,014, 019, 023,024, 029, 032, 036,037,038,039, 042,044, 045,048, 051,052,053, 056,057,058,060, 061,062,063,065, 066,067,068,070, 071,072

Topic clusters: API integration (004), BI reporting (008), encryption (012,014), cloud SaaS (019), model overfitting (023,024), IoT (029), incident response (032), structured vs unstructured (036,037,038,039), digital signature (042,044), MDM (045,048), RPA governance (051,052,053), NLP (056,057,058,060), cybersecurity framework (061,062,063,065), tech cost-benefit (066,067,068,070), data retention (071,072).

---

## Appendix B — Prior Wave Quality Benchmarks

| Session | Items | DL-008 | DL-026 | DL-030 | Cognitive Mix | Difficulty Range |
|---------|-------|--------|--------|--------|--------------|-----------------|
| S899 | 20 | 0 | 0 | 0 | Analyze=13, Evaluate=7 | Difficult=14, V.Diff=6 |
| S50 | 20 | 0 | 0 | 0 | Analyze=10, Evaluate=10 | Difficult=20 |
| S51 | 20 | 0 | 0 | 0 | Analyze=10, Evaluate=10 | Difficult=20 |
| S52 | 20 | 0 | 0 | 0 | Analyze=10, Evaluate=10 | Difficult=20 |
| S56 | 20 | 0 | 0 | 0 | Analyze=10, Evaluate=10 | Difficult=20 |
| S58 | 20 | 1 (fixed) | 0 | 0 | Analyze=10, Evaluate=10 | Difficult=20 |

**Benchmark:** 120 items, 1 DL-008 incident (0.8% defect rate), 0 DL-026, 0 DL-030. Governance guard: 54/54 to 51/51 PASS throughout. All items authored at Analyze/Evaluate + Difficult.

---

*Generated by Session 60A closure board — 2026-07-28.*
